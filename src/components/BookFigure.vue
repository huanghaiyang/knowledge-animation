<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import InlineMath from './InlineMath.vue'
import type { FigureSpec } from '../data/book/figures/types'
import { renderFigure } from '../data/book/figures/render'

const props = defineProps<{
  spec: FigureSpec
  label: string
  compact?: boolean
}>()

const root = ref<HTMLElement | null>(null)
const mounted = ref(false)
const failed = ref(false)
const zoomOpen = ref(false)
let observer: IntersectionObserver | null = null

const ratio = computed(() => `${props.spec.w ?? 640} / ${props.spec.h ?? 300}`)

const svg = computed(() => {
  if (!mounted.value || failed.value) return ''
  try {
    return renderFigure(props.spec)
  } catch {
    failed.value = true
    return ''
  }
})

function mount() {
  if (mounted.value) return
  mounted.value = true
  if (!svg.value) failed.value = true
}

function openZoom() {
  if (!mounted.value || failed.value) return
  zoomOpen.value = true
}

function closeZoom() {
  zoomOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') zoomOpen.value = false
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    mount()
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          mount()
          observer?.disconnect()
          observer = null
        }
      },
      { rootMargin: '600px 0px', threshold: 0.01 }
    )
    if (root.value) observer.observe(root.value)
  }
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  window.removeEventListener('keydown', onKeydown)
})

watch(
  () => props.spec.id,
  () => {
    failed.value = false
    if (mounted.value) nextTick(() => { if (!svg.value) failed.value = true })
  }
)
</script>

<template>
  <figure ref="root" class="book-figure" :class="{ compact }">
    <div class="fig-frame">
      <span class="mono fig-badge">{{ label }}</span>
      <button class="fig-zoom mono" type="button" aria-label="放大查看插图" @click="openZoom">
        放大查看
      </button>

      <div v-if="!mounted" class="fig-placeholder" :style="{ aspectRatio: ratio }">
        <span class="mono">RENDERING FIGURE</span>
      </div>
      <div v-else-if="failed" class="fig-placeholder failed" :style="{ aspectRatio: ratio }">
        <span class="mono">FIGURE UNAVAILABLE</span>
        <p>图示资源不可用，已保留图注文本。</p>
      </div>
      <div v-else class="fig-canvas" :style="{ aspectRatio: ratio }" v-html="svg" @click="openZoom" />
    </div>

    <figcaption class="fig-caption">
      <span class="mono fig-no">{{ label }}</span>
      <strong><InlineMath :text="spec.title" /></strong>
      <span class="fig-desc"><InlineMath :text="spec.caption" /></span>
    </figcaption>

    <Teleport to="body">
      <div v-if="zoomOpen" class="figure-modal" @click.self="closeZoom">
        <div class="modal-card">
          <header class="modal-head">
            <span class="mono">{{ label }} · {{ spec.title }}</span>
            <button type="button" class="modal-close" @click="closeZoom">关闭</button>
          </header>
          <div class="modal-canvas" v-html="svg" />
          <p class="modal-caption"><InlineMath :text="spec.caption" /></p>
        </div>
      </div>
    </Teleport>
  </figure>
</template>

<style scoped>
.book-figure {
  position: relative;
  margin: 14px 0 18px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(116, 240, 194, 0.05), transparent 55%),
    linear-gradient(155deg, rgba(13, 21, 33, 0.8), rgba(7, 12, 20, 0.6));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
}

.book-figure.compact {
  margin: 10px 0 12px;
  border-radius: 12px;
}

.fig-frame {
  position: relative;
  padding: 22px 14px 10px;
}

.fig-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.045) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(120% 110% at 50% 0%, #000 12%, transparent 80%);
}

.fig-badge {
  position: absolute;
  top: 8px;
  left: 14px;
  z-index: 2;
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: rgba(186, 255, 235, 0.62);
}

.fig-zoom {
  position: absolute;
  top: 6px;
  right: 10px;
  z-index: 2;
  padding: 3px 8px;
  border: 1px solid rgba(150, 179, 212, 0.2);
  border-radius: 6px;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--muted);
  background: rgba(6, 10, 17, 0.7);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.fig-zoom:hover {
  color: var(--mint);
  border-color: rgba(116, 240, 194, 0.4);
}

.fig-placeholder {
  display: grid;
  place-content: center;
  gap: 6px;
  width: 100%;
  border: 1px dashed rgba(150, 179, 212, 0.2);
  border-radius: 10px;
  color: var(--faint);
  text-align: center;
}

.fig-placeholder p {
  margin: 0;
  font-size: 11px;
  color: var(--faint);
}

.fig-placeholder.failed {
  border-color: rgba(255, 132, 146, 0.28);
  color: var(--danger);
}

.fig-canvas {
  position: relative;
  width: 100%;
  cursor: zoom-in;
}

.fig-canvas :deep(.figure-svg) {
  display: block;
  width: 100%;
  height: 100%;
}

.fig-caption {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 8px;
  padding: 9px 14px 11px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
  font-size: 10.8px;
  line-height: 1.7;
  color: var(--faint);
}

.fig-no {
  padding: 1px 6px;
  border: 1px solid rgba(116, 240, 194, 0.28);
  border-radius: 4px;
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--mint);
}

.fig-caption strong {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text-dim);
}

.fig-desc {
  flex: 1 1 100%;
  color: var(--faint);
}

.figure-modal {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 30px;
  background: rgba(3, 7, 12, 0.76);
  backdrop-filter: blur(14px);
}

.modal-card {
  width: min(1040px, 95vw);
  max-height: 88vh;
  overflow: auto;
  padding: 16px 20px 18px;
  border: 1px solid rgba(116, 240, 194, 0.22);
  border-radius: 16px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(116, 240, 194, 0.07), transparent 55%),
    linear-gradient(155deg, rgba(13, 21, 33, 0.97), rgba(7, 12, 20, 0.96));
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.9);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--faint);
}

.modal-close {
  padding: 5px 10px;
  border: 1px solid rgba(150, 179, 212, 0.2);
  border-radius: 6px;
  font-size: 10.5px;
  color: var(--text-dim);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.modal-close:hover {
  color: var(--text);
  border-color: rgba(150, 179, 212, 0.42);
}

.modal-canvas :deep(.figure-svg) {
  display: block;
  width: 100%;
  height: auto;
}

.modal-caption {
  margin: 10px 0 0;
  padding-top: 9px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
  font-size: 11px;
  line-height: 1.7;
  color: var(--muted);
}
</style>
