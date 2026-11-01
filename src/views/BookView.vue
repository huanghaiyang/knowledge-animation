<script setup lang="ts">
import { allBookSections, bookChapters, bookMeta, labsForSection } from '../data/book'

const emit = defineEmits<{
  back: []
  'open-section': [sectionId: string]
}>()

const pad = (value: number) => String(value).padStart(2, '0')
const labCount = allBookSections.reduce((sum, section) => sum + labsForSection(section.id).length, 0)

function firstSectionId() {
  return bookChapters[0]?.sections[0]?.id ?? 'qm-1-1'
}

function scrollToChapters() {
  document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div id="book-top" class="book-page">
    <header class="book-header">
      <div class="header-inner">
        <button class="back-btn" type="button" @click="emit('back')">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14.5 9h-11M8 4.5 3.5 9 8 13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>返回课程库</span>
        </button>

        <div class="header-brand">
          <span class="mono">ANIMA / BIBLIOTHECA</span>
          <strong>书籍阅读</strong>
        </div>

        <div class="header-meta mono">
          {{ pad(bookMeta.chapterCount) }} CHAPTERS · {{ bookMeta.sectionCount }} SECTIONS
        </div>
      </div>
    </header>

    <main>
      <section class="book-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <div class="eyebrow">
              <span class="eyebrow-line" />
              教材精读 · 量子物理
            </div>

            <h1>
              <span class="hero-volume">{{ bookMeta.volume }}</span>
              <span class="hero-title">{{ bookMeta.title }}</span>
            </h1>

            <p class="hero-author">
              [德] {{ bookMeta.author }}
              <span class="mono">{{ bookMeta.authorNote }}</span>
            </p>

            <p class="hero-desc">{{ bookMeta.description }}</p>

            <div class="hero-actions">
              <button class="btn-primary" type="button" @click="emit('open-section', firstSectionId())">
                <span>从 1.1 开始阅读</span>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <button class="btn-ghost" type="button" @click="scrollToChapters">
                查看章节目录
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <div class="hero-facts">
              <div>
                <strong class="mono">{{ pad(bookMeta.chapterCount) }}</strong>
                <span>章</span>
              </div>
              <div>
                <strong class="mono">{{ bookMeta.sectionCount }}</strong>
                <span>节课程</span>
              </div>
              <div>
                <strong class="mono">{{ bookMeta.pages }}</strong>
                <span>页原书</span>
              </div>
              <div>
                <strong class="mono">{{ labCount }}</strong>
                <span>个交互实验</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="cover-plate">
              <div class="cover-grid" />
              <svg class="cover-art" viewBox="0 0 560 560" fill="none" aria-hidden="true">
                <defs>
                  <radialGradient id="cover-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#baffeb" stop-opacity="0.55" />
                    <stop offset="45%" stop-color="#74f0c2" stop-opacity="0.16" />
                    <stop offset="100%" stop-color="#74f0c2" stop-opacity="0" />
                  </radialGradient>
                  <linearGradient id="cover-ring" x1="90" y1="470" x2="470" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#62c9ff" stop-opacity="0.1" />
                    <stop offset="0.5" stop-color="#74f0c2" stop-opacity="0.72" />
                    <stop offset="1" stop-color="#b8a2ff" stop-opacity="0.16" />
                  </linearGradient>
                  <linearGradient id="cover-ring-soft" x1="80" y1="120" x2="480" y2="440" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#74f0c2" stop-opacity="0.06" />
                    <stop offset="0.55" stop-color="#62c9ff" stop-opacity="0.42" />
                    <stop offset="1" stop-color="#62c9ff" stop-opacity="0.04" />
                  </linearGradient>
                  <filter id="cover-blur" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="12" />
                  </filter>
                </defs>

                <circle cx="280" cy="280" r="188" fill="url(#cover-glow)" opacity="0.55" />

                <g class="orbit orbit-a">
                  <ellipse cx="280" cy="280" rx="196" ry="72" stroke="url(#cover-ring)" stroke-width="1.1" />
                  <circle cx="476" cy="280" r="4" fill="#baffeb" />
                  <circle cx="84" cy="280" r="2.4" fill="#74f0c2" opacity="0.6" />
                </g>
                <g class="orbit orbit-b">
                  <ellipse cx="280" cy="280" rx="196" ry="72" stroke="url(#cover-ring-soft)" stroke-width="1" stroke-dasharray="3 7" transform="rotate(60 280 280)" />
                  <circle cx="280" cy="468" r="3" fill="#62c9ff" opacity="0.9" />
                </g>
                <g class="orbit orbit-c">
                  <ellipse cx="280" cy="280" rx="196" ry="72" stroke="url(#cover-ring-soft)" stroke-width="1" transform="rotate(120 280 280)" opacity="0.7" />
                  <circle cx="280" cy="92" r="2.6" fill="#b8a2ff" opacity="0.85" />
                </g>

                <g class="cloud">
                  <circle cx="208" cy="196" r="2" fill="#74f0c2" opacity="0.5" />
                  <circle cx="350" cy="168" r="1.6" fill="#62c9ff" opacity="0.55" />
                  <circle cx="402" cy="322" r="1.8" fill="#74f0c2" opacity="0.4" />
                  <circle cx="292" cy="384" r="2.2" fill="#b8a2ff" opacity="0.45" />
                  <circle cx="166" cy="320" r="1.5" fill="#74f0c2" opacity="0.35" />
                  <circle cx="332" cy="252" r="1.4" fill="#baffeb" opacity="0.6" />
                  <circle cx="232" cy="246" r="1.2" fill="#62c9ff" opacity="0.5" />
                  <circle cx="262" cy="342" r="1.6" fill="#74f0c2" opacity="0.45" />
                </g>

                <circle cx="280" cy="280" r="26" fill="#74f0c2" opacity="0.22" filter="url(#cover-blur)" />
                <circle cx="280" cy="280" r="5.5" fill="#d9fff1" />
                <circle cx="280" cy="280" r="12" stroke="#74f0c2" stroke-opacity="0.32" />

                <text x="34" y="52" fill="rgba(150,179,212,0.52)" font-size="12" font-family="monospace" letter-spacing="2">ψ(r, θ, φ)</text>
                <text x="34" y="522" fill="rgba(150,179,212,0.4)" font-size="11" font-family="monospace" letter-spacing="1.4">H ψ = E ψ</text>
                <text x="526" y="522" fill="rgba(150,179,212,0.34)" font-size="10" font-family="monospace" text-anchor="end" letter-spacing="1.6">FIG. B-001</text>
              </svg>

              <div class="cover-top">
                <span class="live-tag"><i /> VOL. I / 基础与一维问题</span>
                <span class="mono cover-no">8 × 45</span>
              </div>

              <div class="cover-caption">
                <span class="mono">SCHRÖDINGER PICTURE</span>
                <span>波函数在中心势场中的驻态</span>
              </div>

              <div class="cover-formula">
                <span class="chip-label">全书主线</span>
                <span class="chip-math">iħ ∂ψ/∂t = Ĥψ</span>
              </div>

              <span class="corner tl" />
              <span class="corner tr" />
              <span class="corner bl" />
              <span class="corner br" />
            </div>

            <div class="cover-side">
              <span>量子力学</span>
              <span class="side-line" />
              <span class="mono">QIAO GU</span>
            </div>
          </div>
        </div>
      </section>

      <section id="chapters" class="chapters">
        <div class="section-inner">
          <header class="section-head">
            <div class="section-index mono">01 — 章节目录</div>
            <h2>八章，四十五节。</h2>
            <p>{{ bookMeta.approach }}</p>
          </header>

          <div class="chapter-grid">
            <article v-for="chapter in bookChapters" :key="chapter.id" class="chapter-card">
              <header class="chapter-head">
                <span class="mono chapter-no">CHAPTER {{ pad(chapter.no) }}</span>
                <span class="mono chapter-pages">pp. {{ chapter.pages }}</span>
              </header>

              <h3>{{ chapter.title }}</h3>
              <p class="chapter-tagline">{{ chapter.tagline }}</p>
              <p class="chapter-abstract">{{ chapter.abstract }}</p>

              <div class="chapter-sections">
                <button
                  v-for="section in chapter.sections"
                  :key="section.id"
                  class="section-row"
                  type="button"
                  @click="emit('open-section', section.id)"
                >
                  <span class="mono section-no">{{ section.no }}</span>
                  <span class="section-title">{{ section.title }}</span>
                  <span class="section-arrow">↗</span>
                </button>
              </div>

              <footer class="chapter-foot">
                <span class="lab-tag mono">LAB</span>
                <span class="lab-name">{{ chapter.lab.title }}</span>
                <button class="chapter-enter" type="button" @click="emit('open-section', chapter.sections[0].id)">
                  开始本章
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <footer class="book-footer">
        <div class="section-inner footer-inner">
          <div class="footer-note">
            <span class="mono">SOURCE</span>
            <p>{{ bookMeta.author }}《{{ bookMeta.title }}》· {{ bookMeta.volume }}。课程按原书章节结构重写，保留推导骨架与例题方向。</p>
          </div>
          <div class="footer-brand mono">ANIMA · KNOWLEDGE IN MOTION</div>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.book-page {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(1000px 620px at 74% 6%, rgba(24, 72, 72, 0.2), transparent 66%),
    radial-gradient(800px 520px at 8% 68%, rgba(20, 46, 74, 0.14), transparent 70%),
    #04070c;
}

.book-header {
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid rgba(150, 179, 212, 0.12);
  background: rgba(4, 7, 12, 0.86);
  backdrop-filter: blur(18px);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 15px 40px;
  display: flex;
  align-items: center;
  gap: 26px;
}

.back-btn {
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

.back-btn:hover {
  color: var(--text);
  border-color: rgba(116, 240, 194, 0.35);
}

.back-btn svg {
  width: 13px;
  height: 13px;
}

.header-brand {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.header-brand .mono {
  font-size: 8.5px;
  letter-spacing: 0.18em;
  color: var(--faint);
}

.header-brand strong {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--text);
}

.header-meta {
  margin-left: auto;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.book-hero {
  position: relative;
  padding: 84px 40px 104px;
}

.book-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.032) 1px, transparent 1px);
  background-size: 92px 92px;
  mask-image: radial-gradient(88% 80% at 62% 40%, #000 8%, transparent 82%);
}

.hero-inner {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.04fr 0.96fr;
  align-items: center;
  gap: 64px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--mint);
}

.eyebrow-line {
  width: 34px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--mint));
}

.hero-copy h1 {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-volume {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  color: var(--text-dim);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(48px, 5.2vw, 78px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: 0.02em;
  color: #eef7f4;
}

.hero-author {
  margin-top: 20px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 13px;
  color: var(--text-dim);
}

.hero-author .mono {
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--faint);
}

.hero-desc {
  margin-top: 18px;
  max-width: 560px;
  font-size: 13.5px;
  line-height: 2;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #baffeb, #74f0c2 60%, #62d9b9);
  color: #05130e;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  box-shadow: 0 10px 34px -14px rgba(116, 240, 194, 0.85);
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 44px -14px rgba(116, 240, 194, 0.95);
}

.btn-primary svg {
  width: 18px;
  height: 18px;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 20px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 12.5px;
  color: var(--text-dim);
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.btn-ghost:hover {
  color: var(--text);
  border-color: var(--line-strong);
  background: rgba(150, 179, 212, 0.05);
}

.btn-ghost svg {
  width: 14px;
  height: 14px;
}

.hero-facts {
  display: flex;
  gap: 34px;
  margin-top: 46px;
  padding-top: 20px;
  border-top: 1px solid rgba(150, 179, 212, 0.09);
  max-width: 560px;
  flex-wrap: wrap;
}

.hero-facts div {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.hero-facts strong {
  font-size: 15px;
  font-weight: 500;
  color: var(--mint);
  letter-spacing: 0.03em;
}

.hero-facts span {
  font-size: 10px;
  color: var(--faint);
  letter-spacing: 0.04em;
}

.hero-visual {
  display: flex;
  align-items: stretch;
  gap: 14px;
}

.cover-plate {
  position: relative;
  flex: 1;
  min-height: clamp(430px, 58vh, 570px);
  overflow: hidden;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 20px;
  background:
    radial-gradient(80% 80% at 56% 34%, rgba(16, 54, 55, 0.62), transparent 72%),
    linear-gradient(160deg, #08111a 0%, #04070c 72%);
  box-shadow: 0 40px 100px -50px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.cover-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.048) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.048) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(80% 90% at 50% 50%, #000 20%, transparent 88%);
}

.cover-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.orbit {
  transform-origin: 280px 280px;
  animation: orbit-spin 34s linear infinite;
}

.orbit-b {
  animation-duration: 48s;
  animation-direction: reverse;
}

.orbit-c {
  animation-duration: 62s;
}

.cloud circle {
  animation: cloud-pulse 4.6s ease-in-out infinite;
}

.cloud circle:nth-child(2n) {
  animation-delay: 1.2s;
}

.cloud circle:nth-child(3n) {
  animation-delay: 2.4s;
}

.cover-top {
  position: absolute;
  top: 20px;
  left: 22px;
  right: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  pointer-events: none;
}

.live-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  color: rgba(186, 255, 235, 0.72);
}

.live-tag i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px rgba(116, 240, 194, 0.9);
}

.cover-no {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.cover-caption {
  position: absolute;
  left: 22px;
  bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 3;
}

.cover-caption .mono {
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.cover-caption span:last-child {
  font-size: 11px;
  color: var(--text-dim);
}

.cover-formula {
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  padding: 11px 15px;
  border: 1px solid rgba(116, 240, 194, 0.16);
  border-radius: 12px;
  background: rgba(5, 12, 16, 0.66);
  backdrop-filter: blur(8px);
}

.chip-label {
  font-size: 8.5px;
  letter-spacing: 0.12em;
  color: var(--faint);
}

.chip-math {
  font-family: var(--font-mono);
  font-size: 13px;
  color: #d9fff1;
  letter-spacing: 0.02em;
}

.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: rgba(116, 240, 194, 0.45);
  border-style: solid;
  z-index: 2;
}
.corner.tl {
  top: 10px;
  left: 10px;
  border-width: 1px 0 0 1px;
  border-top-left-radius: 5px;
}
.corner.tr {
  top: 10px;
  right: 10px;
  border-width: 1px 1px 0 0;
  border-top-right-radius: 5px;
}
.corner.bl {
  bottom: 10px;
  left: 10px;
  border-width: 0 0 1px 1px;
  border-bottom-left-radius: 5px;
}
.corner.br {
  bottom: 10px;
  right: 10px;
  border-width: 0 1px 1px 0;
  border-bottom-right-radius: 5px;
}

.cover-side {
  writing-mode: vertical-rl;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--faint);
}

.side-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(180deg, rgba(150, 179, 212, 0.28), transparent);
}

.chapters {
  padding: 104px 40px 96px;
  border-top: 1px solid rgba(150, 179, 212, 0.07);
}

.section-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.section-head {
  display: flex;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 42px;
  flex-wrap: wrap;
}

.section-index {
  width: 150px;
  flex: none;
  padding-bottom: 8px;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.section-head h2 {
  font-size: clamp(30px, 3.2vw, 42px);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: #e9f1fb;
}

.section-head p {
  flex: 1;
  min-width: 260px;
  font-size: 12.5px;
  line-height: 1.9;
  color: var(--muted);
  text-align: right;
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.chapter-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 28px 22px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 18px;
  background:
    radial-gradient(120% 120% at 100% 0%, rgba(116, 240, 194, 0.035), transparent 55%),
    linear-gradient(160deg, rgba(10, 17, 28, 0.72), rgba(5, 9, 15, 0.82));
  transition: border-color 0.4s ease, transform 0.4s var(--ease-out);
}

.chapter-card:hover {
  border-color: rgba(116, 240, 194, 0.22);
  transform: translateY(-3px);
}

.chapter-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.chapter-no {
  font-size: 9.5px;
  letter-spacing: 0.16em;
  color: var(--mint);
  opacity: 0.78;
}

.chapter-pages {
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.chapter-card h3 {
  margin-top: 18px;
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #f0f7fb;
}

.chapter-tagline {
  margin-top: 7px;
  font-size: 11px;
  letter-spacing: 0.05em;
  color: rgba(116, 240, 194, 0.76);
}

.chapter-abstract {
  margin-top: 13px;
  font-size: 12px;
  line-height: 1.95;
  color: var(--muted);
}

.chapter-sections {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
}

.section-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 8px 9px;
  border-radius: 7px;
  text-align: left;
  transition: background 0.25s ease, color 0.25s ease;
}

.section-row:hover {
  background: rgba(116, 240, 194, 0.06);
}

.section-no {
  flex: none;
  width: 26px;
  font-size: 9.5px;
  color: var(--faint);
  transition: color 0.25s ease;
}

.section-title {
  flex: 1;
  min-width: 0;
  font-size: 12.5px;
  color: var(--text-dim);
  transition: color 0.25s ease;
}

.section-arrow {
  flex: none;
  font-size: 10px;
  color: rgba(150, 179, 212, 0.24);
  opacity: 0;
  transition: opacity 0.25s ease, color 0.25s ease;
}

.section-row:hover .section-no,
.section-row:hover .section-title {
  color: var(--mint);
}

.section-row:hover .section-arrow {
  opacity: 1;
  color: var(--mint);
}

.chapter-foot {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid rgba(150, 179, 212, 0.1);
}

.lab-tag {
  flex: none;
  padding: 3px 6px;
  border: 1px solid rgba(184, 162, 255, 0.22);
  border-radius: 4px;
  font-size: 8px;
  letter-spacing: 0.12em;
  color: rgba(184, 162, 255, 0.8);
}

.lab-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 10.5px;
  color: var(--muted);
}

.chapter-enter {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  color: rgba(116, 240, 194, 0.78);
  transition: color 0.25s ease;
}

.chapter-enter:hover {
  color: #baffeb;
}

.chapter-enter svg {
  width: 13px;
  height: 13px;
  transition: transform 0.3s var(--ease-out);
}

.chapter-enter:hover svg {
  transform: translateX(4px);
}

.book-footer {
  border-top: 1px solid rgba(150, 179, 212, 0.08);
  background: linear-gradient(180deg, rgba(9, 15, 24, 0.4), transparent 70%);
}

.footer-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 40px 40px 48px;
}

.footer-note {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  max-width: 720px;
}

.footer-note .mono {
  flex: none;
  padding-top: 2px;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.footer-note p {
  font-size: 11px;
  line-height: 1.9;
  color: var(--muted);
}

.footer-brand {
  flex: none;
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes cloud-pulse {
  0%,
  100% {
    opacity: 0.28;
  }
  50% {
    opacity: 0.7;
  }
}

@media (max-width: 1080px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .cover-plate {
    min-height: 460px;
  }
  .chapter-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .header-inner {
    padding: 12px 18px;
    gap: 14px;
  }
  .header-brand .mono,
  .header-meta {
    display: none;
  }
  .book-hero {
    padding: 56px 20px 72px;
  }
  .hero-actions {
    flex-wrap: wrap;
    gap: 10px;
  }
  .hero-facts {
    gap: 22px;
  }
  .cover-plate {
    min-height: 360px;
  }
  .cover-side {
    display: none;
  }
  .cover-formula {
    display: none;
  }
  .chapters {
    padding: 72px 20px 64px;
  }
  .section-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
  .section-index {
    width: auto;
    padding-bottom: 0;
  }
  .section-head p {
    text-align: left;
  }
  .chapter-card {
    padding: 22px 20px 18px;
  }
  .chapter-card h3 {
    font-size: 23px;
  }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px 20px 40px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 41px;
  }
  .hero-desc {
    font-size: 12.5px;
  }
  .cover-plate {
    min-height: 300px;
  }
  .chapter-foot {
    flex-wrap: wrap;
  }
  .lab-name {
    white-space: normal;
  }
}
</style>
