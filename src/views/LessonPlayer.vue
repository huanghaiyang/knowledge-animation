<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import katex from 'katex'
import FormulaBlock from '../components/FormulaBlock.vue'
import type { CourseControl, CourseDefinition, Params, Toggles } from '../data/types'
import { MalthusScene } from '../three/MalthusScene'
import { LogisticScene } from '../three/LogisticScene'
import { CompoundScene } from '../three/CompoundScene'
import { GraphScene } from '../three/GraphScene'
import { SirScene } from '../three/SirScene'
import { PendulumScene } from '../three/PendulumScene'
import { PredatorScene } from '../three/PredatorScene'
import { VectorOpsScene } from '../three/VectorOpsScene'
import { MomentumScene } from '../three/MomentumScene'
import { LaplacianScene } from '../three/LaplacianScene'
import { PolarScene } from '../three/PolarScene'
import { CylindricalScene } from '../three/CylindricalScene'
import type { LessonScene } from '../three/sceneKit'

const props = defineProps<{
  course: CourseDefinition
  startIndex?: number
}>()

const emit = defineEmits<{
  back: []
  notes: []
  quiz: []
  step: [index: number]
}>()

const SCENES: Record<CourseDefinition['scene'], new (canvas: HTMLCanvasElement) => LessonScene> = {
  malthus: MalthusScene,
  logistic: LogisticScene,
  compound: CompoundScene,
  graph: GraphScene,
  sir: SirScene,
  pendulum: PendulumScene,
  predator: PredatorScene,
  vectorops: VectorOpsScene,
  momentum: MomentumScene,
  laplacian: LaplacianScene,
  polar: PolarScene,
  cylindrical: CylindricalScene
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const narrativeRef = ref<HTMLElement | null>(null)
let scene: LessonScene | null = null

const safeStart = Math.min(Math.max(props.startIndex ?? 0, 0), props.course.steps.length - 1)
const index = ref(safeStart)
const progress = ref(0)
const playing = ref(true)
const replayKey = ref(0)
let raf = 0
let lastFrame = 0

const params = reactive<Params>({})
const toggles = reactive<Toggles>({})
for (const control of props.course.controls) params[control.key] = control.default
for (const toggle of props.course.toggles ?? []) toggles[toggle.key] = toggle.default

const step = computed(() => props.course.steps[index.value])
const isLast = computed(() => index.value === props.course.steps.length - 1)

const hud = computed(() => ({
  cells: props.course.hud.cells.map((cell) => ({
    label: cell.label,
    value: cell.value(params, toggles)
  })),
  foot: props.course.hud.foot
    ? {
        label: props.course.hud.foot.label,
        value: props.course.hud.foot.value(params, toggles)
      }
    : null
}))

const stats = computed(() =>
  props.course.stats.map((stat) => ({
    label: stat.label,
    value: stat.value(params, toggles),
    warn: stat.warn ? stat.warn(params, toggles) : false
  }))
)

const liveFormulaHtml = computed(() =>
  katex.renderToString(props.course.liveFormula(params, toggles), {
    displayMode: true,
    throwOnError: false,
    trust: true,
    strict: false,
    output: 'html'
  })
)

const overall = computed(() => {
  const numerator = index.value + (isLast.value ? 1 : progress.value)
  return (numerator / props.course.steps.length) * 100
})

const displayProgress = computed(() => (isLast.value ? 1 : progress.value))

const annotation = computed(
  () =>
    props.course.annotationFor?.(index.value, params, toggles) ??
    step.value.annotation ?? { tag: '', text: '', tone: 'dim' as const }
)

const pad = (value: number) => String(value).padStart(2, '0')

function formatValue(control: CourseControl) {
  const value = params[control.key]
  return control.format ? control.format(value) : `${Math.round(value * 1000) / 1000}`
}

function fillStyle(control: CourseControl) {
  const ratio = (params[control.key] - control.min) / (control.max - control.min)
  return { '--fill': `${THREE_CLAMP(ratio) * 100}%` }
}

function THREE_CLAMP(value: number) {
  return Math.max(0, Math.min(1, value))
}

function flipToggle(key: string) {
  toggles[key] = !toggles[key]
}

function go(target: number) {
  const next = Math.max(0, Math.min(props.course.steps.length - 1, target))
  index.value = next
  progress.value = 0
  replayKey.value += 1
  playing.value = props.course.steps[next].duration > 0
  lastFrame = 0
  scene?.setStep(next, 0)
  emit('step', next)
  nextTick(() => narrativeRef.value?.scrollTo({ top: 0, behavior: 'auto' }))
}

function togglePlay() {
  if (isLast.value) {
    index.value = 0
    progress.value = 0
    replayKey.value += 1
    playing.value = true
    lastFrame = 0
    scene?.setStep(0, 0)
    emit('step', 0)
    return
  }
  playing.value = !playing.value
  if (playing.value && progress.value >= 0.999) {
    progress.value = 0
    replayKey.value += 1
  }
  lastFrame = 0
}

function replayStep() {
  progress.value = 0
  replayKey.value += 1
  if (props.course.steps[index.value].duration > 0) playing.value = true
  lastFrame = 0
  scene?.setStep(index.value, 0)
}

function resetParams() {
  for (const control of props.course.controls) params[control.key] = control.default
  for (const toggle of props.course.toggles ?? []) toggles[toggle.key] = toggle.default
}

/** 去掉 KaTeX 里的高亮标记，导出为普通 LaTeX。 */
function stripHighlights(math: string) {
  const token = '\\htmlClass{'
  let result = ''
  let cursor = 0

  const skipGroup = (start: number) => {
    let index = start
    let depth = 0
    while (index < math.length) {
      if (math[index] === '{') depth += 1
      else if (math[index] === '}') {
        depth -= 1
        if (depth === 0) return index + 1
      }
      index += 1
    }
    return index
  }

  while (true) {
    const start = math.indexOf(token, cursor)
    if (start === -1) {
      result += math.slice(cursor)
      break
    }
    result += math.slice(cursor, start)
    const classEnd = skipGroup(start + token.length - 1)
    let index = classEnd
    while (index < math.length && /\s/.test(math[index])) index += 1
    if (math[index] !== '{') {
      cursor = index
      continue
    }
    const contentEnd = skipGroup(index)
    result += math.slice(index + 1, contentEnd - 1)
    cursor = contentEnd
  }

  return result
}

function buildMarkdown() {
  const course = props.course
  const lines: string[] = []
  lines.push(`# ${course.meta.index} · ${course.meta.title}`)
  if (course.meta.subtitle) lines.push('', course.meta.subtitle)
  lines.push(
    '',
    `> ${course.meta.field}　|　${course.meta.year}　|　${course.meta.duration}`,
    ''
  )

  course.steps.forEach((item, i) => {
    lines.push(`## ${pad(i + 1)} · ${item.nav} — ${item.title}`, '')
    lines.push(item.lead, '')
    for (const paragraph of item.paragraphs) lines.push(paragraph, '')

    if (item.formulas?.length) {
      lines.push('### 公式与推导', '')
      for (const formula of item.formulas) {
        lines.push('$$', stripHighlights(formula.math), '$$', '')
        if (formula.note) lines.push(`> ${formula.note}`, '')
      }
    }

    if (item.formulaCaption) lines.push(`*${item.formulaCaption}*`, '')
    if (item.chips?.length) {
      for (const chip of item.chips) lines.push(`- ${chip.label}`)
      lines.push('')
    }
    if (item.insight) lines.push(`**洞察：** ${item.insight}`, '')
    if (item.annotation?.text) lines.push(`**标注：** ${item.annotation.text}`, '')
  })

  lines.push('## 参数与实验', '')
  lines.push('| 参数 | 当前值 | 可调范围 |', '| --- | --- | --- |')
  for (const control of course.controls) {
    const value = control.format ? control.format(params[control.key]) : params[control.key]
    lines.push(`| ${control.label} | ${value} | ${control.min} – ${control.max} |`)
  }
  for (const toggle of course.toggles ?? []) {
    lines.push(`| ${toggle.label} | ${toggles[toggle.key] ? '开启' : '关闭'} | 开关 |`)
  }
  lines.push('')
  lines.push('$$', stripHighlights(course.liveFormula(params, toggles)), '$$', '')
  lines.push(`**${course.exploreTitle}**`, '')

  lines.push('### 实时读数', '')
  lines.push('| 指标 | 数值 |', '| --- | --- |')
  for (const stat of stats.value) lines.push(`| ${stat.label} | ${stat.value} |`)
  for (const cell of hud.value.cells) lines.push(`| ${cell.label} | ${cell.value} |`)
  if (hud.value.foot) lines.push(`| ${hud.value.foot.label} | ${hud.value.foot.value} |`)
  lines.push('')

  return lines.join('\n')
}

function exportMarkdown() {
  const text = buildMarkdown()
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${props.course.meta.index}-${props.course.id}.md`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1200)
}

function onKeydown(event: KeyboardEvent) {
  if (document.querySelector('.formula-modal')) return
  const target = event.target as HTMLElement | null
  if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
  if (event.code === 'Space') {
    event.preventDefault()
    togglePlay()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    go(index.value + 1)
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    go(index.value - 1)
  } else if (event.key === 'Escape') {
    emit('back')
  }
}

function loop(now: number) {
  if (!lastFrame) lastFrame = now
  const dt = Math.min(now - lastFrame, 60)
  lastFrame = now

  const current = props.course.steps[index.value]
  if (playing.value) {
    if (current.duration > 0) {
      progress.value = Math.min(1, progress.value + dt / current.duration)
      if (progress.value >= 1 && index.value < props.course.steps.length - 1) {
        go(index.value + 1)
      } else if (progress.value >= 1) {
        playing.value = false
      }
    } else {
      playing.value = false
    }
  }

  scene?.setStep(index.value, progress.value)
  raf = requestAnimationFrame(loop)
}

watch(
  params,
  () => {
    scene?.setParams({ ...params })
  },
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
  if (canvasRef.value) {
    const SceneClass = SCENES[props.course.scene]
    scene = new SceneClass(canvasRef.value)
    scene.setParams({ ...params })
    for (const key of Object.keys(toggles)) scene.setToggle(key, toggles[key])
    scene.setStep(index.value, progress.value)
  }
  window.addEventListener('keydown', onKeydown)
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('keydown', onKeydown)
  scene?.dispose()
  scene = null
})
</script>

<template>
  <div class="lesson">
    <header class="lesson-header">
      <div class="header-inner">
        <button class="back-btn" type="button" aria-label="返回课程库" @click="emit('back')">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14.5 9h-11M8 4.5 3.5 9 8 13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>课程库</span>
        </button>

        <div class="lesson-title">
          <span class="lesson-no mono">{{ course.meta.index }}</span>
          <div class="title-stack">
            <h1>{{ course.meta.title }}</h1>
            <span class="title-meta">{{ course.meta.field }} · {{ course.meta.year }}</span>
          </div>
        </div>

        <nav class="chapter-nav" aria-label="章节导航">
          <button
            v-for="(item, i) in course.steps"
            :key="item.id"
            type="button"
            class="chapter-tab"
            :class="{ active: i === index, passed: i < index }"
            @click="go(i)"
          >
            <span class="tab-dot" />
            <span class="tab-no mono">{{ pad(i + 1) }}</span>
            <span class="tab-label">{{ item.nav }}</span>
          </button>
        </nav>

        <div class="header-count mono">
          <strong>{{ pad(index + 1) }}</strong>
          <span>/</span>
          <span>{{ pad(course.steps.length) }}</span>
        </div>

        <div class="study-actions">
          <button class="study-btn notes-btn" type="button" @click="emit('notes')">
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 2.8h7.2L14.5 6v9.2H4z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
              <path d="M11 2.8v3.4h3.5M6.4 9h5.2M6.4 11.8h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>完整推导</span>
          </button>
          <button class="study-btn" type="button" @click="emit('quiz')">
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6.2" stroke="currentColor" stroke-width="1.2" />
              <path d="m6.2 9.2 2 2 3.7-4.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>自测</span>
          </button>
        </div>

        <button class="export-btn" type="button" aria-label="导出 Markdown" @click="exportMarkdown">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 2.5v9M5.5 8 9 11.5 12.5 8M3.5 13.5v2h11v-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>导出 MD</span>
        </button>
      </div>
      <div class="header-progress">
        <i :style="{ width: `${overall}%` }" />
      </div>
    </header>

    <main ref="stageRef" class="stage">
      <canvas ref="canvasRef" class="stage-canvas" />
      <div class="stage-vignette" aria-hidden="true" />

      <div class="stage-id mono">{{ course.stageId }}</div>

      <div class="annotation" :key="annotation.tag">
        <span class="anno-tag mono">{{ annotation.tag }}</span>
        <div class="anno-row">
          <span class="anno-dot" :class="`tone-${annotation.tone}`" />
          <span class="anno-text">{{ annotation.text }}</span>
        </div>
      </div>

      <aside class="hud" aria-label="实时参数读数">
        <div class="hud-head">
          <span class="hud-dot" />
          <span>实时读数</span>
          <span class="mono hud-live">LIVE</span>
        </div>
        <div class="hud-grid">
          <div v-for="cell in hud.cells" :key="cell.label" class="hud-cell">
            <span>{{ cell.label }}</span>
            <b class="mono">{{ cell.value }}</b>
          </div>
        </div>
        <div v-if="hud.foot" class="hud-foot">
          <span>{{ hud.foot.label }}</span>
          <span class="mono">{{ hud.foot.value }}</span>
        </div>
      </aside>

      <aside ref="narrativeRef" class="narrative">
        <Transition name="step" mode="out-in">
          <div class="step-content" :key="step.id">
            <div class="step-top">
              <span class="step-num mono">{{ pad(index + 1) }}</span>
              <span class="step-line" />
              <span class="step-kicker">{{ step.kicker }}</span>
            </div>

            <h2 class="step-title">{{ step.title }}</h2>
            <p class="step-lead">{{ step.lead }}</p>

            <div class="step-copy">
              <p v-for="paragraph in step.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>

            <FormulaBlock
              v-if="step.formulas"
              :key="`${step.id}-${replayKey}`"
              :lines="step.formulas"
              :caption="step.formulaCaption"
            />

            <div v-if="step.chips" class="chips">
              <span
                v-for="chip in step.chips"
                :key="chip.label"
                class="chip"
                :class="`tone-${chip.tone ?? 'mint'}`"
              >
                <i />{{ chip.label }}
              </span>
            </div>

            <div v-if="step.insight" class="insight">
              <span class="insight-label mono">INSIGHT</span>
              <p>{{ step.insight }}</p>
            </div>

            <section v-if="isLast" class="explore">
              <div class="explore-head">
                <span class="mono explore-label">INTERACTIVE</span>
                <button class="reset-btn" type="button" @click="resetParams">重置</button>
              </div>
              <h3>{{ course.exploreTitle }}</h3>
              <div class="live-formula" v-html="liveFormulaHtml" />

              <div v-for="control in course.controls" :key="control.key" class="control">
                <div class="control-head">
                  <label :for="`${course.id}-${control.key}-range`">{{ control.label }}</label>
                  <b class="mono">{{ formatValue(control) }}</b>
                </div>
                <input
                  :id="`${course.id}-${control.key}-range`"
                  v-model.number="params[control.key]"
                  type="range"
                  :min="control.min"
                  :max="control.max"
                  :step="control.step"
                  :style="fillStyle(control)"
                />
              </div>

              <button
                v-for="toggle in course.toggles"
                :key="toggle.key"
                class="logistic-toggle"
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

              <div class="live-stats">
                <div v-for="stat in stats" :key="stat.label" class="stat">
                  <span>{{ stat.label }}</span>
                  <b class="mono" :class="{ warn: stat.warn }">{{ stat.value }}</b>
                </div>
              </div>
            </section>
          </div>
        </Transition>
      </aside>

      <div class="shortcut-hint mono">SPACE 暂停 / ← → 切换 / 拖拽旋转 · 双击复位</div>

      <div class="transport" role="group" aria-label="播放控制">
        <button class="tbtn" type="button" aria-label="上一节" :disabled="index === 0" @click="go(index - 1)">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13 5 8 10l5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          class="tbtn play"
          type="button"
          :aria-label="playing ? '暂停' : '播放'"
          @click="togglePlay"
        >
          <svg v-if="playing" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="6" y="4.5" width="2.6" height="11" rx="1" fill="currentColor" />
            <rect x="11.4" y="4.5" width="2.6" height="11" rx="1" fill="currentColor" />
          </svg>
          <svg v-else viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 4.8 15 10 7.5 15.2Z" fill="currentColor" />
          </svg>
        </button>
        <button
          class="tbtn"
          type="button"
          aria-label="下一节"
          :disabled="isLast"
          @click="go(index + 1)"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m7 5 5 5-5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <span class="t-divider" />

        <div class="t-progress" aria-hidden="true">
          <i :style="{ width: `${displayProgress * 100}%` }" />
        </div>
        <span class="t-count mono">{{ pad(index + 1) }}<em>/</em>{{ pad(course.steps.length) }}</span>

        <button
          v-if="step.duration > 0"
          class="tbtn replay-btn"
          type="button"
          aria-label="重播本节"
          @click="replayStep"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4.5 9.5a5.5 5.5 0 1 1 1.8 4.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
            <path d="M4 5.5v4h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.lesson {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
}

.lesson-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 76px;
  background: linear-gradient(180deg, rgba(4, 7, 12, 0.94) 0%, rgba(4, 7, 12, 0.7) 100%);
  backdrop-filter: blur(18px);
}

.header-inner {
  height: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 34px;
  display: flex;
  align-items: center;
  gap: 26px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: none;
  padding: 8px 13px 8px 10px;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 999px;
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
}

.back-btn:hover {
  color: var(--text);
  border-color: var(--line-strong);
  background: rgba(150, 179, 212, 0.06);
}

.back-btn svg {
  width: 15px;
  height: 15px;
}

.lesson-title {
  display: flex;
  align-items: center;
  gap: 13px;
  flex: none;
}

.lesson-no {
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--mint);
  padding: 4px 7px;
  border: 1px solid rgba(116, 240, 194, 0.22);
  border-radius: 5px;
}

.title-stack {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.title-stack h1 {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #eef5fd;
  line-height: 1.2;
}

.title-meta {
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--faint);
}

.chapter-nav {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: auto;
  margin-right: auto;
  padding: 4px;
  border: 1px solid rgba(150, 179, 212, 0.1);
  border-radius: 999px;
  background: rgba(8, 13, 21, 0.5);
}

.chapter-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 10px;
  color: var(--faint);
  transition: color 0.25s ease, background 0.25s ease;
}

.chapter-tab:hover {
  color: var(--text-dim);
  background: rgba(150, 179, 212, 0.06);
}

.chapter-tab.active {
  color: #dcfff1;
  background: rgba(116, 240, 194, 0.09);
}

.chapter-tab.passed .tab-dot {
  background: rgba(116, 240, 194, 0.35);
}

.tab-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(150, 179, 212, 0.2);
}

.chapter-tab.active .tab-dot {
  background: var(--mint);
  box-shadow: 0 0 8px rgba(116, 240, 194, 0.8);
}

.tab-no {
  font-size: 8.5px;
  opacity: 0.7;
}

.tab-label {
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.header-count {
  flex: none;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 10px;
  color: var(--faint);
  letter-spacing: 0.05em;
}

.header-count strong {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dim);
}

.study-actions {
  flex: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.study-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border: 1px solid rgba(150, 179, 212, 0.18);
  border-radius: 7px;
  background: rgba(150, 179, 212, 0.045);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.study-btn:hover {
  color: var(--text);
  border-color: rgba(150, 179, 212, 0.4);
  background: rgba(150, 179, 212, 0.09);
}

.study-btn.notes-btn {
  color: #c9f6e6;
  border-color: rgba(116, 240, 194, 0.22);
  background: rgba(116, 240, 194, 0.05);
}

.study-btn.notes-btn:hover {
  border-color: rgba(116, 240, 194, 0.42);
  background: rgba(116, 240, 194, 0.12);
}

.study-btn svg {
  width: 13px;
  height: 13px;
}

.export-btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border: 1px solid rgba(116, 240, 194, 0.22);
  border-radius: 7px;
  background: rgba(116, 240, 194, 0.05);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: #c9f6e6;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.export-btn:hover {
  background: rgba(116, 240, 194, 0.12);
  border-color: rgba(116, 240, 194, 0.42);
}

.export-btn svg {
  width: 13px;
  height: 13px;
}

.header-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: rgba(150, 179, 212, 0.1);
}

.header-progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, rgba(116, 240, 194, 0.35), var(--mint));
  box-shadow: 0 0 10px rgba(116, 240, 194, 0.55);
  transition: width 0.35s var(--ease-out);
}

.stage {
  position: relative;
  height: 100vh;
  height: 100dvh;
  min-height: 660px;
  overflow: hidden;
  background: #04070c;
}

.stage-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.stage-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(4, 7, 12, 0.66) 0%, rgba(4, 7, 12, 0.18) 36%, transparent 55%),
    linear-gradient(180deg, rgba(4, 7, 12, 0.42) 0%, transparent 18%, transparent 82%, rgba(4, 7, 12, 0.5) 100%);
}

.stage-id {
  position: absolute;
  top: 94px;
  left: 40px;
  z-index: 4;
  font-size: 8.5px;
  letter-spacing: 0.18em;
  color: rgba(150, 179, 212, 0.42);
  pointer-events: none;
}

.annotation {
  position: absolute;
  top: 94px;
  right: 38px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  animation: anno-in 0.6s var(--ease-out) both;
  pointer-events: none;
}

.anno-tag {
  font-size: 8px;
  letter-spacing: 0.2em;
  color: var(--faint);
}

.anno-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 12px;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 8px;
  background: rgba(6, 11, 18, 0.62);
  backdrop-filter: blur(8px);
}

.anno-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px rgba(116, 240, 194, 0.7);
}

.anno-dot.tone-amber {
  background: var(--amber);
  box-shadow: 0 0 8px rgba(255, 189, 112, 0.7);
}

.anno-dot.tone-violet {
  background: var(--violet);
  box-shadow: 0 0 8px rgba(184, 162, 255, 0.7);
}

.anno-dot.tone-dim {
  background: var(--faint);
  box-shadow: none;
}

.anno-text {
  font-size: 10.5px;
  letter-spacing: 0.03em;
  color: var(--text-dim);
}

@keyframes anno-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hud {
  position: absolute;
  right: 38px;
  bottom: 104px;
  z-index: 4;
  width: 226px;
  border: 1px solid rgba(150, 179, 212, 0.14);
  border-radius: 14px;
  background: rgba(7, 12, 20, 0.68);
  backdrop-filter: blur(14px);
  padding: 13px 15px 12px;
  box-shadow: 0 18px 50px -30px rgba(0, 0, 0, 0.9);
}

.hud-head {
  display: flex;
  align-items: center;
  gap: 7px;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(150, 179, 212, 0.1);
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.hud-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mint);
  animation: hud-pulse 2.2s ease-in-out infinite;
}

.hud-live {
  margin-left: auto;
  font-size: 8px;
  letter-spacing: 0.12em;
  color: rgba(116, 240, 194, 0.6);
}

@keyframes hud-pulse {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 7px rgba(116, 240, 194, 0.7);
  }
}

.hud-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px 12px;
  padding: 12px 0;
}

.hud-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hud-cell span {
  font-size: 8.5px;
  letter-spacing: 0.03em;
  color: var(--faint);
}

.hud-cell b {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.02em;
}

.hud-cell b.warn {
  color: var(--amber);
}

.hud-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 9px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
  font-size: 8.5px;
  color: var(--faint);
}

.hud-foot .mono {
  color: var(--amber);
  font-size: 11px;
}

.narrative {
  position: absolute;
  z-index: 6;
  top: 104px;
  left: 38px;
  bottom: 106px;
  width: 424px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid rgba(150, 179, 212, 0.14);
  border-radius: 18px;
  background:
    radial-gradient(130% 90% at 100% 0%, rgba(116, 240, 194, 0.045), transparent 55%),
    rgba(5, 10, 17, 0.68);
  backdrop-filter: blur(20px);
  box-shadow: 0 34px 80px -40px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  scrollbar-width: thin;
}

.step-content {
  padding: 22px 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-num {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--mint);
}

.step-line {
  width: 24px;
  height: 1px;
  background: linear-gradient(90deg, rgba(116, 240, 194, 0.45), transparent);
}

.step-kicker {
  font-size: 9.5px;
  letter-spacing: 0.12em;
  color: var(--faint);
}

.step-title {
  margin-top: 15px;
  font-size: 27px;
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: #f0f6fd;
}

.step-lead {
  margin-top: 12px;
  font-size: 12.5px;
  line-height: 1.8;
  color: #a9e4d2;
}

.step-copy {
  margin-top: 13px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-copy p {
  font-size: 11.8px;
  line-height: 1.85;
  color: var(--muted);
}

.step-content :deep(.formula-block) {
  margin-top: 18px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 15px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 9px;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 6px;
  font-size: 9.5px;
  letter-spacing: 0.02em;
  color: var(--text-dim);
  background: rgba(150, 179, 212, 0.035);
}

.chip i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mint);
  flex: none;
}

.chip.tone-cyan i {
  background: var(--cyan);
}
.chip.tone-amber i {
  background: var(--amber);
}
.chip.tone-violet i {
  background: var(--violet);
}

.insight {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding: 11px 13px;
  border-left: 2px solid rgba(116, 240, 194, 0.35);
  border-radius: 0 8px 8px 0;
  background: linear-gradient(90deg, rgba(116, 240, 194, 0.055), transparent 80%);
}

.insight-label {
  flex: none;
  padding-top: 2px;
  font-size: 8px;
  letter-spacing: 0.16em;
  color: rgba(116, 240, 194, 0.7);
}

.insight p {
  font-size: 10.8px;
  line-height: 1.8;
  color: var(--text-dim);
}

.explore {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(150, 179, 212, 0.12);
}

.explore-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.explore-label {
  font-size: 8px;
  letter-spacing: 0.18em;
  color: var(--mint);
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

.explore h3 {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #e7f0fa;
}

.live-formula {
  margin-top: 10px;
  padding: 9px 12px;
  min-height: 48px;
  border: 1px solid rgba(116, 240, 194, 0.14);
  border-radius: 8px;
  background: rgba(116, 240, 194, 0.035);
  overflow: hidden;
}

.live-formula :deep(.katex-display) {
  margin: 0;
  text-align: left;
}

.live-formula :deep(.katex) {
  font-size: 0.92rem;
  color: #d5fff1;
}

.control {
  margin-top: 14px;
}

.control-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.control-head label {
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.03em;
}

.control-head b {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-dim);
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 18px;
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
  width: 12px;
  height: 12px;
  margin-top: -5px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 0 4px rgba(116, 240, 194, 0.1), 0 0 12px rgba(116, 240, 194, 0.45);
}

input[type='range']::-moz-range-track {
  height: 2px;
  border-radius: 2px;
  background: rgba(150, 179, 212, 0.16);
}

input[type='range']::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: var(--mint);
}

.logistic-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  padding: 10px 12px;
  border: 1px solid rgba(150, 179, 212, 0.14);
  border-radius: 9px;
  text-align: left;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.logistic-toggle.on {
  border-color: rgba(184, 162, 255, 0.3);
  background: rgba(184, 162, 255, 0.055);
}

.toggle-copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.toggle-copy strong {
  font-size: 10.5px;
  font-weight: 400;
  color: var(--text-dim);
  letter-spacing: 0.03em;
}

.toggle-copy em {
  font-style: normal;
  font-size: 9px;
  color: var(--faint);
}

.switch {
  position: relative;
  width: 30px;
  height: 16px;
  border-radius: 999px;
  background: rgba(150, 179, 212, 0.16);
  flex: none;
  transition: background 0.3s ease;
}

.switch i {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--muted);
  transition: transform 0.3s var(--ease-out), background 0.3s ease;
}

.logistic-toggle.on .switch {
  background: rgba(184, 162, 255, 0.32);
}

.logistic-toggle.on .switch i {
  transform: translateX(14px);
  background: var(--violet);
}

.live-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin-top: 16px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(150, 179, 212, 0.08);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 9px 10px;
  background: rgba(6, 10, 17, 0.85);
}

.stat span {
  font-size: 8.5px;
  letter-spacing: 0.02em;
  color: var(--faint);
}

.stat b {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--mint);
  letter-spacing: 0.02em;
}

.stat b.warn {
  color: var(--amber);
}

.step-enter-active {
  transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
}

.step-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.step-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.shortcut-hint {
  position: absolute;
  left: 40px;
  bottom: 36px;
  z-index: 4;
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: rgba(150, 179, 212, 0.4);
  pointer-events: none;
}

.transport {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 8;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  border: 1px solid rgba(150, 179, 212, 0.18);
  border-radius: 999px;
  background: rgba(7, 12, 20, 0.8);
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.9);
}

.tbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: var(--muted);
  transition: color 0.25s ease, background 0.25s ease;
}

.tbtn svg {
  width: 17px;
  height: 17px;
}

.tbtn:hover:not(:disabled) {
  color: var(--text);
  background: rgba(150, 179, 212, 0.09);
}

.tbtn:disabled {
  opacity: 0.25;
  cursor: default;
}

.tbtn.play {
  width: 38px;
  height: 38px;
  margin: 0 4px;
  border: 1px solid rgba(116, 240, 194, 0.35);
  background: rgba(116, 240, 194, 0.1);
  color: var(--mint);
  box-shadow: 0 0 22px -8px rgba(116, 240, 194, 0.6);
}

.tbtn.play:hover {
  background: rgba(116, 240, 194, 0.18);
  color: #d9fff3;
}

.tbtn.play svg {
  width: 18px;
  height: 18px;
}

.t-divider {
  width: 1px;
  height: 20px;
  background: rgba(150, 179, 212, 0.14);
  margin: 0 6px;
}

.t-progress {
  width: 100px;
  height: 3px;
  border-radius: 3px;
  background: rgba(150, 179, 212, 0.14);
  overflow: hidden;
}

.t-progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, rgba(116, 240, 194, 0.45), var(--mint));
  transition: width 0.12s linear;
}

.t-count {
  margin-left: 6px;
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.t-count em {
  font-style: normal;
  color: var(--faint);
  margin: 0 3px;
}

.replay-btn {
  width: 28px;
  height: 28px;
  margin-left: 2px;
}

@media (max-width: 1380px) {
  .chapter-tab {
    padding: 7px 9px;
  }
  .tab-label {
    display: none;
  }
}

@media (max-width: 1180px) {
  .hud,
  .annotation {
    display: none;
  }
  .narrative {
    width: 402px;
  }
}

@media (max-width: 980px) {
  .stage-id,
  .shortcut-hint {
    display: none;
  }
  .narrative {
    top: auto;
    left: 18px;
    right: 18px;
    bottom: 100px;
    width: auto;
    max-height: 46vh;
    border-radius: 16px;
  }
  .stage {
    min-height: 0;
  }
  .transport {
    bottom: 18px;
  }
  .title-meta,
  .chapter-nav {
    display: none;
  }
  .study-btn span,
  .export-btn span {
    display: none;
  }
  .study-btn {
    padding: 7px 9px;
  }
  .header-count {
    margin-left: auto;
  }
}

@media (max-width: 700px) {
  .header-inner {
    padding: 0 16px;
    gap: 12px;
  }
  .lesson-header {
    height: 64px;
  }
  .back-btn {
    padding: 9px;
  }
  .back-btn span {
    display: none;
  }
  .lesson-title {
    gap: 9px;
  }
  .lesson-no {
    font-size: 9px;
    padding: 3px 6px;
  }
  .title-stack h1 {
    font-size: 14px;
  }
  .narrative {
    top: auto;
    left: 12px;
    right: 12px;
    bottom: 84px;
    max-height: 48vh;
  }
  .step-content {
    padding: 18px 18px 22px;
  }
  .step-title {
    font-size: 23px;
  }
  .transport {
    bottom: 14px;
    padding: 6px 8px;
  }
  .t-progress {
    width: 62px;
  }
  .live-stats {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .stat {
    padding: 8px;
  }
  .stat b {
    font-size: 10.5px;
  }
}

@media (max-height: 760px) and (min-width: 981px) {
  .narrative {
    top: 92px;
    bottom: 96px;
  }
  .step-content {
    padding: 18px 22px 20px;
  }
  .step-title {
    margin-top: 12px;
    font-size: 24px;
  }
  .step-lead {
    margin-top: 9px;
    font-size: 12px;
  }
  .step-copy {
    margin-top: 10px;
  }
  .step-content :deep(.formula-block) {
    margin-top: 14px;
  }
  .insight {
    margin-top: 12px;
  }
}
</style>
