<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import katex from 'katex'
import type { FormulaLine } from '../data/types'

const props = defineProps<{
  lines: FormulaLine[]
  caption?: string
}>()

const root = ref<HTMLElement | null>(null)

const rendered = computed(() =>
  props.lines.map((line) => ({
    ...line,
    html: katex.renderToString(line.math, {
      displayMode: true,
      throwOnError: false,
      trust: true,
      strict: false,
      output: 'html'
    })
  }))
)

const delayOf = (index: number) => 0.16 + index * 0.58

/** 公式宽度超出容器时等比缩小；过长的公式保留原尺寸并允许横向滚动。 */
function fitFormulas() {
  const rootEl = root.value
  if (!rootEl) return

  const clips = rootEl.querySelectorAll<HTMLElement>('.math-clip')
  for (const clip of clips) {
    const inner = clip.querySelector<HTMLElement>('.math-inner')
    const math = clip.querySelector<HTMLElement>('.katex')
    if (!inner || !math) continue

    clip.classList.remove('is-scrollable')
    inner.style.transform = ''
    inner.style.transformOrigin = ''
    inner.style.width = ''
    clip.style.height = ''

    const available = clip.clientWidth
    const content = math.getBoundingClientRect().width
    if (!available || content <= available + 1) continue

    const scale = available / content
    if (scale >= 0.72) {
      inner.style.transform = `scale(${scale})`
      inner.style.transformOrigin = 'left top'
      clip.style.height = `${Math.ceil(inner.offsetHeight * scale) + 6}px`
    } else {
      inner.style.width = `${Math.ceil(content)}px`
      clip.classList.add('is-scrollable')
    }
  }
}

function scheduleFit() {
  nextTick(() => {
    fitFormulas()
    document.fonts?.ready.then(() => fitFormulas()).catch(() => {})
  })
}

watch(rendered, scheduleFit, { flush: 'post' })

onMounted(() => {
  scheduleFit()
  window.addEventListener('resize', fitFormulas)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', fitFormulas)
})
</script>

<template>
  <div ref="root" class="formula-block">
    <div class="rows">
      <div v-for="(line, i) in rendered" :key="`${i}-${line.math}`" class="row">
        <span v-if="rendered.length > 1" class="row-index mono">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <div class="main">
          <div class="math-clip">
            <span
              class="math-inner"
              :style="{ animationDelay: `${delayOf(i)}s` }"
              v-html="line.html"
            />
            <span class="sheen" :style="{ animationDelay: `${delayOf(i)}s` }" />
          </div>
          <span
            v-if="line.note"
            class="note"
            :style="{ animationDelay: `${delayOf(i) + 0.3}s` }"
          >
            {{ line.note }}
          </span>
        </div>
      </div>
    </div>
    <p v-if="caption" class="caption" :style="{ animationDelay: `${delayOf(rendered.length - 1) + 0.5}s` }">
      {{ caption }}
    </p>
  </div>
</template>

<style scoped>
.formula-block {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 15px 16px 13px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(116, 240, 194, 0.055), transparent 55%),
    linear-gradient(155deg, rgba(13, 21, 33, 0.82), rgba(7, 12, 20, 0.62));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.formula-block::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.045) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: radial-gradient(120% 110% at 80% 0%, #000 10%, transparent 78%);
}

.rows {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.row {
  display: flex;
  gap: 11px;
  align-items: flex-start;
}

.row-index {
  padding-top: 10px;
  font-size: 9.5px;
  letter-spacing: 0.08em;
  color: var(--faint);
  user-select: none;
}

.main {
  flex: 1;
  min-width: 0;
}

.math-clip {
  position: relative;
  overflow: hidden;
  padding: 2px 0 3px;
}

.math-clip.is-scrollable {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(116, 240, 194, 0.32) transparent;
}

.math-clip.is-scrollable::-webkit-scrollbar {
  height: 3px;
}

.math-clip.is-scrollable::-webkit-scrollbar-track {
  background: rgba(150, 179, 212, 0.08);
  border-radius: 999px;
}

.math-clip.is-scrollable::-webkit-scrollbar-thumb {
  background: rgba(116, 240, 194, 0.32);
  border-radius: 999px;
}

.math-inner {
  display: block;
  clip-path: inset(-12% 100% -18% 0);
  animation: formula-wipe 0.92s var(--ease-out) both;
}

.formula-block :deep(.katex-display) {
  margin: 0;
  text-align: left;
}

.formula-block :deep(.katex-display > .katex) {
  display: inline-block;
  text-align: left;
}

.formula-block :deep(.katex) {
  font-size: 1.04rem;
  color: #f1f6fd;
}

.formula-block :deep(.hl-a),
.formula-block :deep(.hl-b),
.formula-block :deep(.hl-c),
.formula-block :deep(.pulse) {
  color: var(--mint);
  animation: term-glow 2.8s ease-in-out 0.9s infinite;
}

.formula-block :deep(.hl-d) {
  color: var(--violet);
  animation: term-glow-violet 2.8s ease-in-out 0.9s infinite;
}

.sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    100deg,
    transparent 28%,
    rgba(116, 240, 194, 0.13) 48%,
    rgba(116, 240, 194, 0.2) 52%,
    transparent 72%
  );
  background-size: 260% 100%;
  animation: sheen-sweep 1.35s var(--ease-io) both;
  opacity: 0;
}

.note {
  display: block;
  margin-top: 3px;
  font-size: 10.5px;
  letter-spacing: 0.02em;
  color: var(--muted);
  opacity: 0;
  animation: note-in 0.55s ease forwards;
}

.caption {
  position: relative;
  margin-top: 11px;
  padding-top: 9px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
  font-size: 10.5px;
  line-height: 1.7;
  color: var(--faint);
  opacity: 0;
  animation: note-in 0.6s ease forwards;
}

@keyframes formula-wipe {
  0% {
    clip-path: inset(-12% 100% -18% 0);
    filter: blur(1.5px);
    opacity: 0.4;
  }
  30% {
    opacity: 1;
  }
  100% {
    clip-path: inset(-12% 0 -18% 0);
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes sheen-sweep {
  0% {
    opacity: 0;
    background-position: 150% 0;
  }
  25% {
    opacity: 0.85;
  }
  100% {
    opacity: 0;
    background-position: -70% 0;
  }
}

@keyframes note-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes term-glow {
  0%,
  100% {
    text-shadow: 0 0 0 rgba(116, 240, 194, 0);
  }
  50% {
    text-shadow: 0 0 18px rgba(116, 240, 194, 0.52);
  }
}

@keyframes term-glow-violet {
  0%,
  100% {
    text-shadow: 0 0 0 rgba(184, 162, 255, 0);
  }
  50% {
    text-shadow: 0 0 18px rgba(184, 162, 255, 0.5);
  }
}
</style>
