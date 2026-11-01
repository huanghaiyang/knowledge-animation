<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import BookLab from '../components/BookLab.vue'
import FormulaBlock from '../components/FormulaBlock.vue'
import InlineMath from '../components/InlineMath.vue'
import { bookChapters, bookMeta, bookNeighbors, chapterOfSection, getBookSection, labsForSection } from '../data/book'

const props = defineProps<{
  sectionId: string
}>()

const emit = defineEmits<{
  back: []
  navigate: [sectionId: string]
}>()

const tab = ref<'notes' | 'lab'>('notes')
const hintOpen = ref(false)
const tocRef = ref<HTMLElement | null>(null)
const activeLabIndex = ref(0)

const section = computed(() => getBookSection(props.sectionId))
const chapter = computed(() => chapterOfSection(props.sectionId))
const neighbors = computed(() => bookNeighbors(props.sectionId))

const sectionLabs = computed(() => labsForSection(props.sectionId))
const activeLab = computed(() => sectionLabs.value[activeLabIndex.value] ?? sectionLabs.value[0])
const labKey = computed(() => `${section.value.id}-${activeLabIndex.value}`)
const chapterEntries = computed(() =>
  chapter.value.sections.map((entry) => ({
    ...entry,
    labCount: labsForSection(entry.id).length
  }))
)

const pad = (value: number | string) => String(value).padStart(2, '0')

function goTo(sectionId: string) {
  if (sectionId === props.sectionId) {
    tab.value = 'notes'
    hintOpen.value = false
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }
  tab.value = 'notes'
  hintOpen.value = false
  emit('navigate', sectionId)
}

function setTab(next: 'notes' | 'lab') {
  if (tab.value === next) return
  tab.value = next
  hintOpen.value = false
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function pickLab(index: number) {
  if (activeLabIndex.value === index) return
  activeLabIndex.value = index
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function jumpTo(sectionId?: string | null) {
  if (sectionId) goTo(sectionId)
}

function scrollActiveToc() {
  nextTick(() => {
    const aside = tocRef.value
    if (!aside) return
    const active = aside.querySelector<HTMLElement>('.toc-link.active')
    if (!active) return
    const rect = active.getBoundingClientRect()
    const frame = aside.getBoundingClientRect()
    if (rect.top < frame.top + 34 || rect.bottom > frame.bottom - 14) {
      aside.scrollTop += rect.top - frame.top - aside.clientHeight / 2
    }
  })
}

watch(
  () => props.sectionId,
  () => {
    tab.value = 'notes'
    hintOpen.value = false
    activeLabIndex.value = 0
    scrollActiveToc()
  }
)

onMounted(scrollActiveToc)
</script>

<template>
  <div class="reader-page">
    <header class="reader-header">
      <div class="header-inner">
        <button class="ghost-btn back-btn" type="button" @click="emit('back')">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14.5 9h-11M8 4.5 3.5 9 8 13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>书籍目录</span>
        </button>

        <div class="title-stack">
          <span class="mono kicker">第 {{ pad(chapter.no) }} 章 · {{ chapter.title }}</span>
          <h1><span class="mono title-no">{{ section.no }}</span>{{ section.title }}</h1>
        </div>

        <div class="header-tools">
          <div class="mode-tabs">
            <button type="button" :class="{ active: tab === 'notes' }" @click="setTab('notes')">讲义</button>
            <button type="button" :class="{ active: tab === 'lab' }" @click="setTab('lab')">本节实验室</button>
          </div>

          <div class="pager">
            <button class="pager-btn" type="button" :disabled="!neighbors.prev" aria-label="上一节" @click="jumpTo(neighbors.prev?.id)">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <span class="mono pager-count">{{ neighbors.index + 1 }} / {{ neighbors.total }}</span>
            <button class="pager-btn" type="button" :disabled="!neighbors.next" aria-label="下一节" @click="jumpTo(neighbors.next?.id)">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="reader-main">
      <aside ref="tocRef" class="toc">
        <div class="toc-head">
          <span class="mono">全书目录</span>
          <span class="mono toc-count">{{ bookMeta.sectionCount }} 节</span>
        </div>

        <div v-for="item in bookChapters" :key="item.id" class="toc-chapter" :class="{ current: item.id === chapter.id }">
          <button class="toc-chapter-head" type="button" @click="goTo(item.sections[0].id)">
            <span class="mono">{{ pad(item.no) }}</span>
            <span>{{ item.title }}</span>
          </button>
          <div class="toc-links">
            <button
              v-for="entry in item.sections"
              :key="entry.id"
              class="toc-link"
              :class="{ active: entry.id === section.id }"
              type="button"
              @click="goTo(entry.id)"
            >
              <span class="mono">{{ entry.no }}</span>
              <span>{{ entry.title }}</span>
            </button>
          </div>
        </div>
      </aside>

      <div class="reader-body">
        <div class="chapter-strip">
          <span class="mono strip-label">{{ pad(chapter.no) }} / {{ bookChapters.length }}</span>
          <div class="strip-scroll">
            <button
              v-for="entry in chapter.sections"
              :key="entry.id"
              class="strip-chip"
              :class="{ active: entry.id === section.id }"
              type="button"
              @click="goTo(entry.id)"
            >
              {{ entry.no }} {{ entry.title }}
            </button>
          </div>
        </div>

        <Transition name="panel" mode="out-in">
          <article v-if="tab === 'notes'" key="notes" class="paper">
            <header class="paper-head">
              <div class="paper-breadcrumb mono">CHAPTER {{ pad(chapter.no) }} — {{ chapter.tagline }}</div>

              <div class="paper-title-row">
                <span class="paper-no mono">{{ section.no }}</span>
                <h1>{{ section.title }}</h1>
              </div>

              <div class="paper-tag-row">
                <span class="paper-tag">{{ section.tag }}</span>
                <span class="paper-pages mono">原书 pp. {{ section.pages }}</span>
              </div>

              <p class="paper-abstract"><InlineMath :text="section.abstract" /></p>

              <div class="key-ideas">
                <div v-for="(idea, index) in section.keyIdeas" :key="idea" class="idea-card">
                  <span class="mono idea-no">{{ String(index + 1).padStart(2, '0') }}</span>
                  <p><InlineMath :text="idea" /></p>
                </div>
              </div>
            </header>

            <section
              v-for="(beat, index) in section.beats"
              :key="`${section.id}-${index}`"
              class="beat"
            >
              <header class="beat-head">
                <span class="beat-index mono">{{ pad(index + 1) }}</span>
                <h2><InlineMath :text="beat.title" /></h2>
              </header>

              <div class="beat-body">
                <p v-for="(paragraph, pIndex) in beat.paragraphs" :key="pIndex">
                  <InlineMath :text="paragraph" />
                </p>
                <FormulaBlock v-if="beat.formulas?.length" :lines="beat.formulas" />
                <div v-if="beat.insight" class="insight">
                  <span class="mono">INSIGHT</span>
                  <p><InlineMath :text="beat.insight" /></p>
                </div>
              </div>
            </section>

            <section class="takeaways">
              <header class="block-head">
                <span class="mono">TAKEAWAYS</span>
                <h3>本讲结论</h3>
              </header>
              <ul>
                <li v-for="item in section.takeaways" :key="item"><InlineMath :text="item" /></li>
              </ul>
            </section>

            <section v-if="section.exercise" class="exercise">
              <header class="block-head">
                <span class="mono">EXERCISE</span>
                <h3>留给自己的问题</h3>
              </header>
              <p class="exercise-q"><InlineMath :text="section.exercise.question" /></p>
              <button class="hint-btn" type="button" @click="hintOpen = !hintOpen">
                {{ hintOpen ? '收起提示' : '查看提示' }}
              </button>
              <Transition name="hint">
                <p v-if="hintOpen" class="hint"><InlineMath :text="section.exercise.hint" /></p>
              </Transition>
            </section>

            <nav class="paper-nav">
              <button v-if="neighbors.prev" class="nav-card prev" type="button" @click="goTo(neighbors.prev.id)">
                <span class="mono">上一节 · {{ neighbors.prev.no }}</span>
                <strong>{{ neighbors.prev.title }}</strong>
              </button>
              <span v-else class="nav-card empty" />

              <button v-if="neighbors.next" class="nav-card next" type="button" @click="goTo(neighbors.next.id)">
                <span class="mono">下一节 · {{ neighbors.next.no }}</span>
                <strong>{{ neighbors.next.title }}</strong>
              </button>
              <span v-else class="nav-card empty" />
            </nav>
          </article>

          <section v-else key="lab" class="lab-panel">
            <header class="lab-head">
              <span class="mono">SECTION LAB · {{ section.no }}</span>
              <h2>{{ section.title }} · 本节实验</h2>
              <p>
                本节共 {{ sectionLabs.length }} 个专属实验。拖动参数、切换开关，看结论怎样随假设改变；场景可拖拽旋转，双击复位。
              </p>
            </header>

            <div class="lab-picker">
              <button
                v-for="(entry, index) in sectionLabs"
                :key="`${section.id}-${index}-${entry.title}`"
                type="button"
                class="lab-pick"
                :class="{ active: index === activeLabIndex }"
                @click="pickLab(index)"
              >
                <span class="mono lab-pick-no">{{ pad(index + 1) }}</span>
                <span class="lab-pick-body">
                  <strong>{{ entry.title }}</strong>
                  <span>{{ entry.caption }}</span>
                </span>
              </button>
            </div>

            <BookLab :key="labKey" :lab="activeLab" />

            <div class="lab-links">
              <span class="mono lab-links-title">本章各节实验</span>
              <div class="lab-section-list">
                <button
                  v-for="entry in chapterEntries"
                  :key="entry.id"
                  type="button"
                  :class="{ active: entry.id === section.id }"
                  @click="goTo(entry.id)"
                >
                  <span class="mono">{{ entry.no }}</span>
                  <span>{{ entry.title }}</span>
                  <span class="mono lab-count">{{ entry.labCount }} 个实验</span>
                </button>
              </div>
            </div>
          </section>
        </Transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
.reader-page {
  min-height: 100vh;
  background:
    radial-gradient(900px 560px at 72% -8%, rgba(24, 72, 72, 0.16), transparent 62%),
    #04070c;
}

.reader-header {
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid rgba(150, 179, 212, 0.12);
  background: rgba(4, 7, 12, 0.88);
  backdrop-filter: blur(18px);
}

.header-inner {
  max-width: 1260px;
  margin: 0 auto;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  gap: 22px;
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
  min-width: 0;
}

.kicker {
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: var(--faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-stack h1 {
  display: flex;
  align-items: baseline;
  gap: 9px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-no {
  font-size: 10px;
  color: var(--mint);
  letter-spacing: 0.06em;
}

.header-tools {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.mode-tabs {
  display: inline-flex;
  padding: 3px;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 999px;
  background: rgba(150, 179, 212, 0.04);
}

.mode-tabs button {
  padding: 6px 13px;
  border-radius: 999px;
  font-size: 10.5px;
  letter-spacing: 0.02em;
  color: var(--muted);
  transition: color 0.25s ease, background 0.25s ease;
}

.mode-tabs button.active {
  background: rgba(116, 240, 194, 0.12);
  color: #d7f8ec;
}

.pager {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pager-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 7px;
  color: var(--text-dim);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.pager-btn svg {
  width: 13px;
  height: 13px;
}

.pager-btn:hover:not(:disabled) {
  color: var(--mint);
  border-color: rgba(116, 240, 194, 0.36);
}

.pager-btn:disabled {
  opacity: 0.28;
  cursor: default;
}

.pager-count {
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--faint);
  min-width: 44px;
  text-align: center;
}

.reader-main {
  max-width: 1260px;
  margin: 0 auto;
  padding: 30px 32px 96px;
  display: grid;
  grid-template-columns: 226px minmax(0, 1fr);
  gap: 30px;
  align-items: start;
}

.toc {
  position: sticky;
  top: 82px;
  max-height: calc(100vh - 112px);
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(116, 240, 194, 0.24) transparent;
}

.toc::-webkit-scrollbar {
  width: 3px;
}

.toc::-webkit-scrollbar-thumb {
  background: rgba(116, 240, 194, 0.24);
  border-radius: 999px;
}

.toc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 12px;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.toc-count {
  font-size: 8px;
  letter-spacing: 0.1em;
  color: rgba(150, 179, 212, 0.32);
}

.toc-chapter {
  margin-bottom: 4px;
  padding-bottom: 4px;
}

.toc-chapter-head {
  display: flex;
  align-items: baseline;
  gap: 9px;
  width: 100%;
  padding: 7px 8px;
  border-radius: 6px;
  text-align: left;
  transition: background 0.2s ease;
}

.toc-chapter-head:hover {
  background: rgba(150, 179, 212, 0.05);
}

.toc-chapter-head .mono {
  font-size: 8.5px;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.toc-chapter-head span:last-child {
  font-size: 11.5px;
  color: var(--text-dim);
  letter-spacing: 0.02em;
}

.toc-chapter.current .toc-chapter-head .mono {
  color: var(--mint);
}

.toc-chapter.current .toc-chapter-head span:last-child {
  color: #e3f2f7;
}

.toc-links {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 14px;
  border-left: 1px solid rgba(150, 179, 212, 0.1);
  margin-left: 12px;
}

.toc-link {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 5px 7px;
  border-radius: 5px;
  text-align: left;
  transition: background 0.2s ease, color 0.2s ease;
}

.toc-link .mono {
  flex: none;
  font-size: 8.5px;
  color: rgba(150, 179, 212, 0.38);
}

.toc-link span:last-child {
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--muted);
}

.toc-link:hover {
  background: rgba(116, 240, 194, 0.05);
}

.toc-link:hover span:last-child {
  color: var(--text);
}

.toc-link.active {
  background: rgba(116, 240, 194, 0.08);
}

.toc-link.active .mono {
  color: var(--mint);
}

.toc-link.active span:last-child {
  color: var(--mint);
}

.reader-body {
  min-width: 0;
}

.chapter-strip {
  display: none;
}

.paper {
  min-width: 0;
  padding: 42px 48px 40px;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 18px;
  background:
    radial-gradient(110% 56% at 100% 0%, rgba(116, 240, 194, 0.04), transparent 55%),
    rgba(7, 12, 20, 0.66);
  color: #c6d4e3;
}

.paper-head {
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(150, 179, 212, 0.12);
}

.paper-breadcrumb {
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.paper-title-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-top: 16px;
}

.paper-no {
  flex: none;
  padding: 3px 7px;
  border: 1px solid rgba(116, 240, 194, 0.24);
  border-radius: 5px;
  font-size: 9.5px;
  letter-spacing: 0.06em;
  color: var(--mint);
}

.paper-title-row h1 {
  font-family: var(--font-serif);
  font-size: clamp(28px, 2.6vw, 36px);
  font-weight: 500;
  line-height: 1.32;
  letter-spacing: 0.02em;
  color: #f2f8fc;
}

.paper-tag-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
}

.paper-tag {
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(184, 162, 255, 0.08);
  font-size: 9.5px;
  letter-spacing: 0.04em;
  color: rgba(196, 174, 255, 0.9);
}

.paper-pages {
  font-size: 8.5px;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.paper-abstract {
  margin-top: 20px;
  font-size: 14px;
  line-height: 2;
  color: #b9c9d9;
}

.key-ideas {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin-top: 24px;
  border: 1px solid rgba(150, 179, 212, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(150, 179, 212, 0.08);
}

.idea-card {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(5, 9, 15, 0.78);
}

.idea-no {
  flex: none;
  padding-top: 1px;
  font-size: 8px;
  letter-spacing: 0.06em;
  color: rgba(116, 240, 194, 0.6);
}

.idea-card p {
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--text-dim);
}

.beat {
  padding-top: 30px;
}

.beat-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 14px;
}

.beat-index {
  flex: none;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: rgba(116, 240, 194, 0.62);
}

.beat-head h2 {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #e6eff8;
}

.beat-body p {
  margin: 12px 0;
  font-size: 13.8px;
  line-height: 2.05;
  color: #bfcedd;
}

.beat-body :deep(.formula-block) {
  margin: 18px 0;
}

.insight {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin: 20px 0 6px;
  padding: 13px 16px;
  border-left: 2px solid rgba(116, 240, 194, 0.45);
  border-radius: 0 9px 9px 0;
  background: rgba(116, 240, 194, 0.05);
}

.insight .mono {
  flex: none;
  padding-top: 2px;
  font-size: 7.5px;
  letter-spacing: 0.16em;
  color: rgba(116, 240, 194, 0.68);
}

.insight p {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.9;
  color: #cfe5dc;
}

.takeaways {
  margin-top: 40px;
  padding: 22px 24px 20px;
  border: 1px solid rgba(116, 240, 194, 0.16);
  border-radius: 12px;
  background:
    radial-gradient(120% 120% at 100% 0%, rgba(116, 240, 194, 0.055), transparent 60%),
    rgba(6, 13, 16, 0.7);
}

.block-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.block-head .mono {
  font-size: 8px;
  letter-spacing: 0.16em;
  color: rgba(116, 240, 194, 0.68);
}

.block-head h3 {
  font-size: 15px;
  font-weight: 500;
  color: #e4f4ee;
}

.takeaways ul {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 16px;
  list-style: none;
}

.takeaways li {
  position: relative;
  padding-left: 18px;
  font-size: 12.5px;
  line-height: 1.9;
  color: var(--text-dim);
}

.takeaways li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.78em;
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background: var(--mint);
  transform: rotate(45deg);
  opacity: 0.7;
}

.exercise {
  margin-top: 22px;
  padding: 22px 24px 20px;
  border: 1px dashed rgba(255, 189, 112, 0.26);
  border-radius: 12px;
  background: rgba(255, 189, 112, 0.035);
}

.exercise .block-head .mono {
  color: rgba(255, 189, 112, 0.68);
}

.exercise .block-head h3 {
  color: #f4ebdf;
}

.exercise-q {
  margin-top: 14px;
  font-size: 13px;
  line-height: 2;
  color: #d6c7b2;
}

.hint-btn {
  margin-top: 14px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 189, 112, 0.24);
  border-radius: 6px;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: rgba(255, 189, 112, 0.86);
  transition: background 0.25s ease, border-color 0.25s ease;
}

.hint-btn:hover {
  background: rgba(255, 189, 112, 0.08);
  border-color: rgba(255, 189, 112, 0.42);
}

.hint {
  margin-top: 12px;
  padding: 11px 14px;
  border-radius: 8px;
  background: rgba(255, 189, 112, 0.06);
  font-size: 12px;
  line-height: 1.9;
  color: #cbbba5;
}

.paper-nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 38px;
  padding-top: 22px;
  border-top: 1px solid rgba(150, 179, 212, 0.12);
}

.nav-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 13px 16px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 9px;
  text-align: left;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.nav-card .mono {
  font-size: 8px;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.nav-card strong {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-dim);
}

.nav-card.next {
  align-items: flex-end;
  text-align: right;
}

.nav-card:hover {
  border-color: rgba(116, 240, 194, 0.28);
  background: rgba(116, 240, 194, 0.04);
}

.nav-card:hover strong {
  color: var(--mint);
}

.nav-card.empty {
  border-color: transparent;
  pointer-events: none;
}

.lab-panel {
  min-width: 0;
}

.lab-head {
  margin-bottom: 18px;
  padding: 4px 2px;
}

.lab-head .mono {
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: rgba(116, 240, 194, 0.68);
}

.lab-head h2 {
  margin-top: 12px;
  font-family: var(--font-serif);
  font-size: clamp(24px, 2.2vw, 30px);
  font-weight: 500;
  color: #eff6fa;
}

.lab-head p {
  margin-top: 10px;
  max-width: 680px;
  font-size: 12px;
  line-height: 1.9;
  color: var(--muted);
}

.lab-picker {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.lab-pick {
  display: flex;
  gap: 11px;
  padding: 12px 14px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 11px;
  text-align: left;
  background: rgba(6, 11, 18, 0.6);
  transition: border-color 0.25s ease, background 0.25s ease;
}

.lab-pick:hover {
  border-color: rgba(116, 240, 194, 0.28);
}

.lab-pick.active {
  border-color: rgba(116, 240, 194, 0.4);
  background:
    radial-gradient(120% 130% at 0% 0%, rgba(116, 240, 194, 0.08), transparent 62%),
    rgba(6, 13, 16, 0.75);
}

.lab-pick-no {
  flex: none;
  padding-top: 2px;
  font-size: 8.5px;
  letter-spacing: 0.08em;
  color: rgba(150, 179, 212, 0.42);
}

.lab-pick.active .lab-pick-no {
  color: var(--mint);
}

.lab-pick-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.lab-pick-body strong {
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--text-dim);
}

.lab-pick.active .lab-pick-body strong {
  color: #e8fbf4;
}

.lab-pick-body span {
  font-size: 10.5px;
  line-height: 1.7;
  color: var(--faint);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lab-links {
  margin-top: 22px;
  padding: 16px 18px;
  border: 1px solid rgba(150, 179, 212, 0.1);
  border-radius: 12px;
  background: rgba(6, 11, 18, 0.6);
}

.lab-links-title {
  display: block;
  margin-bottom: 10px;
  font-size: 8px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.lab-section-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.lab-section-list button {
  display: inline-flex;
  align-items: baseline;
  gap: 7px;
  padding: 7px 11px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 999px;
  font-size: 10.5px;
  color: var(--muted);
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.lab-section-list button .mono {
  font-size: 8px;
  color: var(--faint);
}

.lab-section-list .lab-count {
  padding-left: 7px;
  border-left: 1px solid rgba(150, 179, 212, 0.14);
  font-size: 7.5px;
  letter-spacing: 0.04em;
}

.lab-section-list button:hover {
  color: var(--text);
  border-color: rgba(116, 240, 194, 0.28);
}

.lab-section-list button.active {
  color: var(--mint);
  border-color: rgba(116, 240, 194, 0.32);
  background: rgba(116, 240, 194, 0.06);
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.24s ease, transform 0.24s var(--ease-out);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.hint-enter-active,
.hint-leave-active {
  transition: opacity 0.2s ease;
}

.hint-enter-from,
.hint-leave-to {
  opacity: 0;
}

@media (max-width: 1080px) {
  .reader-main {
    grid-template-columns: 1fr;
    padding: 22px 22px 80px;
  }

  .toc {
    display: none;
  }

  .chapter-strip {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding: 0 2px;
  }

  .strip-label {
    flex: none;
    font-size: 8px;
    letter-spacing: 0.12em;
    color: var(--faint);
  }

  .strip-scroll {
    display: flex;
    gap: 6px;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .strip-scroll::-webkit-scrollbar {
    display: none;
  }

  .strip-chip {
    flex: none;
    padding: 6px 10px;
    border: 1px solid rgba(150, 179, 212, 0.12);
    border-radius: 999px;
    font-size: 10px;
    color: var(--muted);
    white-space: nowrap;
  }

  .strip-chip.active {
    color: var(--mint);
    border-color: rgba(116, 240, 194, 0.32);
    background: rgba(116, 240, 194, 0.06);
  }
}

@media (max-width: 860px) {
  .header-inner {
    flex-wrap: wrap;
    padding: 10px 16px;
    gap: 10px 12px;
  }

  .kicker {
    display: none;
  }

  .title-stack h1 {
    font-size: 15px;
  }

  .header-tools {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }

  .mode-tabs button {
    padding: 6px 11px;
    font-size: 10px;
  }

  .pager-count {
    display: none;
  }

  .paper {
    padding: 26px 22px 28px;
    border-radius: 14px;
  }

  .paper-title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .paper-title-row h1 {
    font-size: 26px;
  }

  .key-ideas {
    grid-template-columns: 1fr;
  }

  .beat-head h2 {
    font-size: 16.5px;
  }

  .beat-body p {
    font-size: 13.2px;
  }

  .paper-nav {
    grid-template-columns: 1fr;
  }

  .nav-card.next {
    align-items: flex-start;
    text-align: left;
  }

  .nav-card.empty {
    display: none;
  }

  .lab-head h2 {
    font-size: 23px;
  }

  .lab-picker {
    grid-template-columns: 1fr;
  }
}
</style>
