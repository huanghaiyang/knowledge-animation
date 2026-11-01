<script setup lang="ts">
import { computed } from 'vue'
import type { CourseDefinition } from '../data/types'
import { notesFor } from '../data/notes'
import { extractHeadings, renderMarkdown } from '../utils/markdown'

const props = defineProps<{
  course: CourseDefinition
}>()

const emit = defineEmits<{
  back: []
  quiz: []
}>()

const source = computed(() => notesFor(props.course.id))
const html = computed(() => renderMarkdown(source.value))
const headings = computed(() => extractHeadings(source.value))

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function exportNotes() {
  if (!source.value) return
  const blob = new Blob([source.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${props.course.meta.index}-${props.course.id}-notes.md`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1200)
}
</script>

<template>
  <div class="notes-page">
    <header class="notes-header">
      <div class="header-inner">
        <button class="ghost-btn" type="button" @click="emit('back')">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14.5 9h-11M8 4.5 3.5 9 8 13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>返回课程</span>
        </button>

        <div class="title-stack">
          <span class="mono kicker">{{ course.meta.index }} · LECTURE NOTES</span>
          <h1>{{ course.meta.title }}</h1>
          <span class="meta">{{ course.meta.field }} · 完整推导讲义</span>
        </div>

        <div class="actions">
          <button class="ghost-btn" type="button" @click="emit('quiz')">自测</button>
          <button class="ghost-btn" type="button" @click="exportNotes">导出 MD</button>
        </div>
      </div>
    </header>

    <main class="notes-main">
      <aside v-if="headings.length" class="toc">
        <span class="mono toc-title">目录</span>
        <button
          v-for="heading in headings"
          :key="heading.id"
          type="button"
          class="toc-link"
          :class="{ sub: heading.level >= 3 }"
          @click="scrollTo(heading.id)"
        >
          {{ heading.text }}
        </button>
      </aside>

      <article v-if="html" class="paper" v-html="html" />
      <article v-else class="paper empty">
        <span class="mono">NOTES PENDING</span>
        <h2>讲义正在整理</h2>
        <p>这节课的完整推导文档尚未生成。</p>
      </article>
    </main>
  </div>
</template>

<style scoped>
.notes-page {
  min-height: 100vh;
  background:
    radial-gradient(90% 60% at 70% -10%, rgba(116, 240, 194, 0.05), transparent 60%),
    #04070c;
}

.notes-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(150, 179, 212, 0.12);
  background: rgba(4, 7, 12, 0.88);
  backdrop-filter: blur(18px);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.ghost-btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 13px;
  border: 1px solid rgba(150, 179, 212, 0.18);
  border-radius: 8px;
  background: rgba(150, 179, 212, 0.05);
  font-size: 11px;
  color: var(--text-dim);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.ghost-btn:hover {
  color: var(--text);
  border-color: rgba(116, 240, 194, 0.35);
}

.ghost-btn svg {
  width: 13px;
  height: 13px;
}

.title-stack {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.kicker {
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.title-stack h1 {
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text);
}

.meta {
  font-size: 10.5px;
  color: var(--muted);
}

.actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.notes-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 36px 32px 96px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 40px;
  align-items: start;
}

.toc {
  position: sticky;
  top: 108px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding-right: 10px;
  scrollbar-width: thin;
}

.toc-title {
  margin-bottom: 10px;
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.toc-link {
  padding: 6px 8px;
  border-radius: 6px;
  text-align: left;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--text-dim);
  transition: color 0.2s ease, background 0.2s ease;
}

.toc-link:hover {
  color: var(--mint);
  background: rgba(116, 240, 194, 0.06);
}

.toc-link.sub {
  padding-left: 20px;
  font-size: 10.5px;
  color: var(--muted);
}

.paper {
  min-width: 0;
  padding: 38px 44px 56px;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 16px;
  background:
    radial-gradient(110% 60% at 100% 0%, rgba(116, 240, 194, 0.04), transparent 55%),
    rgba(7, 12, 20, 0.66);
  color: #c8d6e4;
  font-size: 14px;
  line-height: 1.95;
}

.paper.empty {
  text-align: center;
  padding: 90px 40px;
  color: var(--muted);
}

.paper.empty h2 {
  margin: 12px 0 8px;
  color: var(--text);
  font-size: 20px;
}

.paper :deep(h1) {
  margin: 0 0 18px;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.4;
  color: #f1f6fd;
}

.paper :deep(h2) {
  margin: 42px 0 14px;
  padding-top: 18px;
  border-top: 1px solid rgba(150, 179, 212, 0.12);
  font-size: 19px;
  font-weight: 500;
  line-height: 1.5;
  color: #edf4fc;
}

.paper :deep(h3) {
  margin: 28px 0 10px;
  font-size: 15.5px;
  font-weight: 500;
  color: #dfeaf6;
}

.paper :deep(h4) {
  margin: 22px 0 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: #cfdeed;
}

.paper :deep(p) {
  margin: 10px 0;
}

.paper :deep(strong) {
  color: #ecf4fc;
  font-weight: 500;
}

.paper :deep(a) {
  color: var(--mint);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.paper :deep(code) {
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(150, 179, 212, 0.12);
  font-family: var(--font-mono);
  font-size: 0.88em;
  color: #d7ecf7;
}

.paper :deep(pre) {
  margin: 16px 0;
  padding: 14px 16px;
  overflow-x: auto;
  border: 1px solid rgba(150, 179, 212, 0.14);
  border-radius: 10px;
  background: rgba(3, 8, 14, 0.8);
}

.paper :deep(pre code) {
  padding: 0;
  background: none;
  font-size: 12px;
  line-height: 1.7;
}

.paper :deep(blockquote) {
  margin: 16px 0;
  padding: 10px 16px;
  border-left: 2px solid rgba(116, 240, 194, 0.4);
  border-radius: 0 8px 8px 0;
  background: rgba(116, 240, 194, 0.05);
  color: #b8c9d8;
  font-size: 13px;
}

.paper :deep(ul),
.paper :deep(ol) {
  margin: 12px 0;
  padding-left: 22px;
}

.paper :deep(li) {
  margin: 6px 0;
}

.paper :deep(table) {
  width: 100%;
  margin: 18px 0;
  border-collapse: collapse;
  font-size: 12.5px;
}

.paper :deep(th),
.paper :deep(td) {
  padding: 8px 12px;
  border: 1px solid rgba(150, 179, 212, 0.14);
  text-align: left;
  vertical-align: top;
}

.paper :deep(th) {
  background: rgba(150, 179, 212, 0.07);
  color: #e4eef8;
  font-weight: 500;
}

.paper :deep(hr) {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid rgba(150, 179, 212, 0.14);
}

.paper :deep(.katex-display) {
  margin: 18px 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 0;
  text-align: left;
}

.paper :deep(.katex-display > .katex) {
  display: inline-block;
  text-align: left;
}

.paper :deep(.katex) {
  font-size: 1.02em;
  color: #f1f6fd;
}

.paper :deep(.hl-a),
.paper :deep(.hl-b),
.paper :deep(.pulse) {
  color: var(--mint);
}

.paper :deep(.hl-d) {
  color: var(--violet);
}

@media (max-width: 980px) {
  .notes-main {
    grid-template-columns: 1fr;
    padding: 24px 20px 80px;
  }
  .toc {
    position: static;
    max-height: none;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
  }
  .toc-title {
    width: 100%;
  }
  .toc-link.sub {
    padding-left: 8px;
  }
  .paper {
    padding: 26px 22px 40px;
  }
}

@media (max-width: 720px) {
  .header-inner {
    padding: 14px 16px;
    gap: 12px;
  }
  .title-stack h1 {
    font-size: 16px;
  }
  .meta {
    display: none;
  }
  .actions .ghost-btn:first-child {
    display: none;
  }
  .ghost-btn span {
    display: none;
  }
}
</style>
