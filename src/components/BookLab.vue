<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { BookLab } from '../data/book/types'
import type { CourseControl, Params, Toggles } from '../data/types'
import { QuantumLabScene } from '../three/QuantumLabScene'

const props = defineProps<{
  lab: BookLab
}>()

const MODE_LABEL: Record<BookLab['mode'], string> = {
  duality: '双缝干涉',
  wavepacket: '自由波包',
  well: '无限深势阱',
  tunneling: '势垒贯穿',
  oscillator: '量子谐振子',
  coherent: '相干态',
  operator: '动量算符',
  hydrogen: '氢原子电子云'
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const params = reactive<Params>({})
const toggles = reactive<Toggles>({})

for (const control of props.lab.controls) params[control.key] = control.default
for (const toggle of props.lab.toggles ?? []) toggles[toggle.key] = toggle.default

let scene: QuantumLabScene | null = null

const readouts = computed(() =>
  props.lab.readouts.map((cell) => ({
    label: cell.label,
    value: cell.value(params, toggles)
  }))
)

const note = computed(() => props.lab.liveNote(params, toggles))

const pad = (value: number) => `${Math.round(value * 1000) / 1000}`

function formatValue(control: CourseControl) {
  const value = params[control.key]
  return control.format ? control.format(value) : pad(value)
}

function fillStyle(control: CourseControl) {
  const ratio = (params[control.key] - control.min) / (control.max - control.min)
  return { '--fill': `${Math.max(0, Math.min(1, ratio)) * 100}%` }
}

function flipToggle(key: string) {
  toggles[key] = !toggles[key]
}

function reset() {
  for (const control of props.lab.controls) params[control.key] = control.default
  for (const toggle of props.lab.toggles ?? []) toggles[toggle.key] = toggle.default
}

watch(
  params,
  () => scene?.setParams({ ...params }),
  { deep: true }
)

watch(
  toggles,
  (next) => {
    for (const key of Object.keys(next)) scene?.setToggle(key, next[key])
  },
  { deep: true }
)

onMounted(() => {
  if (!canvasRef.value) return
  scene = new QuantumLabScene(canvasRef.value, props.lab.mode)
  scene.setParams({ ...params })
  for (const key of Object.keys(toggles)) scene.setToggle(key, toggles[key])
})

onBeforeUnmount(() => {
  scene?.dispose()
  scene = null
})
</script>

<template>
  <section class="lab-card">
    <header class="lab-head">
      <div class="lab-tag mono">
        <span class="live-dot" />
        INTERACTIVE LAB · {{ MODE_LABEL[lab.mode] }}
      </div>
      <button class="reset-btn" type="button" @click="reset">重置参数</button>
    </header>

    <div class="lab-title-row">
      <h2>{{ lab.title }}</h2>
      <span class="drag-hint mono">拖拽旋转 · 双击复位</span>
    </div>

    <div class="stage-wrap">
      <canvas ref="canvasRef" class="lab-canvas" />
      <div class="stage-corner tl" />
      <div class="stage-corner tr" />
      <div class="stage-corner bl" />
      <div class="stage-corner br" />
      <div class="stage-badge mono">LIVE / THREE.JS</div>
    </div>

    <p class="lab-caption">{{ lab.caption }}</p>

    <div class="readouts">
      <div v-for="cell in readouts" :key="cell.label" class="readout">
        <span>{{ cell.label }}</span>
        <b class="mono">{{ cell.value }}</b>
      </div>
    </div>

    <div class="control-grid">
      <div v-for="control in lab.controls" :key="control.key" class="control">
        <div class="control-head">
          <label :for="`lab-${lab.mode}-${control.key}`">{{ control.label }}</label>
          <b class="mono">{{ formatValue(control) }}</b>
        </div>
        <input
          :id="`lab-${lab.mode}-${control.key}`"
          v-model.number="params[control.key]"
          type="range"
          :min="control.min"
          :max="control.max"
          :step="control.step"
          :style="fillStyle(control)"
        />
      </div>

      <div v-if="lab.toggles?.length" class="toggle-grid">
        <button
          v-for="toggle in lab.toggles"
          :key="toggle.key"
          class="lab-toggle"
          type="button"
          :class="{ on: toggles[toggle.key] }"
          @click="flipToggle(toggle.key)"
        >
          <span class="toggle-copy">
            <strong>{{ toggle.label }}</strong>
            <em>{{ toggle.caption }}</em>
          </span>
          <span class="switch"><i /></span>
        </button>
      </div>
    </div>

    <footer class="lab-note">
      <span class="mono">OBSERVE</span>
      <p>{{ note }}</p>
    </footer>
  </section>
</template>

<style scoped>
.lab-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 18px;
  background:
    radial-gradient(120% 130% at 100% 0%, rgba(116, 240, 194, 0.06), transparent 55%),
    linear-gradient(160deg, rgba(10, 17, 28, 0.86), rgba(5, 9, 15, 0.9));
  box-shadow: 0 30px 80px -50px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.lab-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px 0;
}

.lab-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: rgba(186, 255, 235, 0.7);
}

.live-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px rgba(116, 240, 194, 0.9);
}

.reset-btn {
  padding: 4px 9px;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 5px;
  font-size: 9px;
  color: var(--muted);
  transition: color 0.25s ease, border-color 0.25s ease;
}

.reset-btn:hover {
  color: var(--text-dim);
  border-color: var(--line-strong);
}

.lab-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 18px 12px;
}

.lab-title-row h2 {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.005em;
  color: #eff7fd;
}

.drag-hint {
  flex: none;
  font-size: 8px;
  letter-spacing: 0.1em;
  color: rgba(150, 179, 212, 0.36);
}

.stage-wrap {
  position: relative;
  height: clamp(280px, 42vh, 420px);
  margin: 0 12px;
  overflow: hidden;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 12px;
  background:
    radial-gradient(90% 90% at 62% 30%, rgba(16, 54, 55, 0.42), transparent 68%),
    #04070c;
}

.lab-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.stage-badge {
  position: absolute;
  right: 10px;
  bottom: 8px;
  font-size: 7.5px;
  letter-spacing: 0.14em;
  color: rgba(150, 179, 212, 0.42);
  pointer-events: none;
}

.stage-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: rgba(116, 240, 194, 0.4);
  border-style: solid;
  pointer-events: none;
}
.stage-corner.tl {
  top: 7px;
  left: 7px;
  border-width: 1px 0 0 1px;
}
.stage-corner.tr {
  top: 7px;
  right: 7px;
  border-width: 1px 1px 0 0;
}
.stage-corner.bl {
  bottom: 7px;
  left: 7px;
  border-width: 0 0 1px 1px;
}
.stage-corner.br {
  bottom: 7px;
  right: 7px;
  border-width: 0 1px 1px 0;
}

.lab-caption {
  margin: 12px 18px 0;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--muted);
}

.readouts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin: 14px 18px 0;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 9px;
  overflow: hidden;
  background: rgba(150, 179, 212, 0.08);
}

.readout {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 9px;
  background: rgba(5, 9, 15, 0.86);
}

.readout span {
  font-size: 8px;
  letter-spacing: 0.02em;
  color: var(--faint);
}

.readout b {
  font-size: 11px;
  font-weight: 500;
  color: var(--mint);
  letter-spacing: 0.01em;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 18px;
  padding: 15px 18px 4px;
}

.control {
  min-width: 0;
}

.control-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 4px;
}

.control-head label {
  font-size: 10px;
  color: var(--muted);
}

.control-head b {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-dim);
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 16px;
  background: transparent;
  outline: none;
  cursor: pointer;
}

input[type='range']::-webkit-slider-runnable-track {
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(116, 240, 194, 0.7) var(--fill, 50%),
    rgba(150, 179, 212, 0.16) var(--fill, 50%)
  );
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  margin-top: -4px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 0 3px rgba(116, 240, 194, 0.1), 0 0 10px rgba(116, 240, 194, 0.45);
}

input[type='range']::-moz-range-track {
  height: 2px;
  border-radius: 2px;
  background: rgba(150, 179, 212, 0.16);
}

input[type='range']::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 50%;
  background: var(--mint);
}

.toggle-grid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 2px;
}

.lab-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 8px;
  text-align: left;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.lab-toggle.on {
  border-color: rgba(184, 162, 255, 0.28);
  background: rgba(184, 162, 255, 0.05);
}

.toggle-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.toggle-copy strong {
  font-size: 9.5px;
  font-weight: 400;
  color: var(--text-dim);
}

.toggle-copy em {
  font-style: normal;
  font-size: 8px;
  line-height: 1.5;
  color: var(--faint);
}

.switch {
  position: relative;
  width: 26px;
  height: 14px;
  border-radius: 999px;
  background: rgba(150, 179, 212, 0.16);
  flex: none;
  transition: background 0.3s ease;
}

.switch i {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  transition: transform 0.3s var(--ease-out), background 0.3s ease;
}

.lab-toggle.on .switch {
  background: rgba(184, 162, 255, 0.32);
}

.lab-toggle.on .switch i {
  transform: translateX(12px);
  background: var(--violet);
}

.lab-note {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 10px 18px 0;
  padding: 11px 0 15px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
}

.lab-note .mono {
  flex: none;
  padding-top: 2px;
  font-size: 7.5px;
  letter-spacing: 0.16em;
  color: rgba(116, 240, 194, 0.65);
}

.lab-note p {
  font-size: 10.5px;
  line-height: 1.8;
  color: var(--text-dim);
}

@media (max-width: 720px) {
  .lab-title-row {
    flex-direction: column;
    gap: 4px;
  }
  .drag-hint {
    display: none;
  }
  .readouts {
    grid-template-columns: repeat(2, 1fr);
  }
  .control-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .toggle-grid {
    grid-template-columns: 1fr;
  }
}
</style>
