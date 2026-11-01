<script setup lang="ts">
import HeroCanvas from '../components/HeroCanvas.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { bookChapters, bookMeta } from '../data/book'

const emit = defineEmits<{
  open: [id: string]
  book: []
}>()

const pad = (value: number) => String(value).padStart(2, '0')

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const upcoming = [
  {
    id: 'logistic',
    index: '002',
    title: '逻辑斯蒂增长',
    field: '生态学 · S 形曲线',
    desc: '当环境容量出现，指数曲线如何被折弯。',
    tag: '已上线'
  },
  {
    id: 'compound',
    index: '003',
    title: '复利与自然常数 e',
    field: '金融数学 · 极限',
    desc: '连续复利如何把离散的利息，收拢成一条光滑曲线。',
    tag: '已上线'
  },
  {
    id: 'graph',
    index: '004',
    title: '知识关系图谱',
    field: '认知工具 · 图结构',
    desc: '让概念之间的依赖关系，变成可以行走的空间。',
    tag: '已上线'
  },
  {
    id: 'sir',
    index: '005',
    title: '传染病问题',
    field: '流行病学 · SIR 模型',
    desc: '一场没有药物的疫情，为什么会自己到达峰值又自行退去。',
    tag: '已上线'
  }
]

const advanced = [
  {
    id: 'pendulum',
    index: '006',
    title: '单摆问题',
    field: '力学 · 非线性振子',
    desc: '摆角不再小，周期公式还成立吗。',
    tag: '已上线'
  },
  {
    id: 'predator',
    index: '007',
    title: '捕食者—被捕食者',
    field: '生态学 · Lotka–Volterra',
    desc: '暴涨与崩溃，被一条闭合的轨道收束。',
    tag: '已上线'
  },
  {
    id: 'vectorops',
    index: '008',
    title: '矢量微分算子',
    field: '数学 · 场论',
    desc: '梯度、散度、旋度：场在每一点给出的三种回答。',
    tag: '已上线'
  },
  {
    id: 'momentum',
    index: '009',
    title: '动量算符的本征函数',
    field: '量子力学 · 算符',
    desc: '为什么一个复指数波就是动量的本征态。',
    tag: '已上线'
  },
  {
    id: 'laplacian',
    index: '010',
    title: '拉普拉斯算子',
    field: '数学 · 偏微分方程',
    desc: '散度作用在梯度上，会得到一个什么样的算子。',
    tag: '已上线'
  },
  {
    id: 'polar',
    index: '011',
    title: '极坐标下的拉普拉斯算子',
    field: '数学 · 坐标变换',
    desc: '把链式法则一层层拆开，直到 r 与 θ 完全分离。',
    tag: '已上线'
  },
  {
    id: 'cylindrical',
    index: '012',
    title: '柱坐标下的拉普拉斯算子',
    field: '数学 · 坐标变换',
    desc: '半径 r 为什么会出现在度量系数里。',
    tag: '已上线'
  }
]
</script>

<template>
  <div id="top" class="library">
    <SiteHeader @start="emit('open', 'malthus')" />

    <main>
      <section class="hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <div class="eyebrow reveal" style="--delay: 0s">
              <span class="eyebrow-line" />
              ANIMA · 交互式知识动画
            </div>
            <h1 class="reveal" style="--delay: 0.08s">
              <span>让抽象的公式，</span>
              <span class="hl">在<em>时间</em>里长出来。</span>
            </h1>
            <p class="hero-sub reveal" style="--delay: 0.16s">
              把数理知识还原成可以看见的过程：三维空间、逐行推演、可拨动的参数。
              第一课，从一条 1798 年的方程开始。
            </p>
            <div class="hero-actions reveal" style="--delay: 0.24s">
              <button class="btn-primary" type="button" @click="emit('open', 'malthus')">
                <span>进入第一课</span>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <button class="btn-ghost" type="button" @click="scrollTo('courses')">
                浏览课程库
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
            <div class="hero-facts reveal" style="--delay: 0.32s">
              <div>
                <strong class="mono">12</strong>
                <span>已上线课程</span>
              </div>
              <div>
                <strong class="mono">45</strong>
                <span>书籍精读讲次</span>
              </div>
              <div>
                <strong class="mono">3D</strong>
                <span>实时三维演绎</span>
              </div>
              <div>
                <strong class="mono">∞</strong>
                <span>可调参数</span>
              </div>
            </div>
          </div>

          <div class="hero-visual reveal" style="--delay: 0.18s">
            <div class="plate">
              <div class="plate-grid" />
              <HeroCanvas />
              <div class="plate-top">
                <span class="live-tag"><i /> LIVE / THREE.JS</span>
                <span class="mono plate-no">FIG. 001</span>
              </div>
              <div class="plate-caption">
                <span class="mono">PLOT / 00</span>
                <span>dN/dt = rN 的生长曲线场</span>
              </div>
              <div class="formula-chip">
                <span class="chip-label">本课核心方程</span>
                <span class="chip-math">dN/dt = rN</span>
              </div>
              <span class="corner tl" />
              <span class="corner tr" />
              <span class="corner bl" />
              <span class="corner br" />
            </div>
            <div class="plate-side-note">
              <span>人口学</span>
              <span class="side-line" />
              <span class="mono">1798 — 2026</span>
            </div>
          </div>
        </div>

        <div class="scroll-cue">
          <span class="mono">SCROLL</span>
          <span class="cue-line" />
        </div>
      </section>

      <section id="courses" class="section courses">
        <div class="section-inner">
          <header class="section-head">
            <div class="section-index mono">01 — 课程库</div>
            <h2>从一个公式开始。</h2>
            <p>每节课只回答一个问题，用动画把它拆到底。</p>
          </header>

          <div class="course-layout">
            <article class="feature-card" role="button" tabindex="0" @click="emit('open', 'malthus')" @keydown.enter="emit('open', 'malthus')">
              <div class="feature-art">
                <div class="art-grid" />
                <svg class="art-svg" viewBox="0 0 640 270" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="art-curve" x1="90" y1="230" x2="590" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#74f0c2" stop-opacity="0.5" />
                      <stop offset="1" stop-color="#a9ffe6" />
                    </linearGradient>
                    <filter id="art-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g stroke="rgba(150,179,212,0.09)" stroke-width="1">
                    <path d="M80 40v200M180 40v200M280 40v200M380 40v200M480 40v200M580 40v200" />
                    <path d="M80 230h520M80 190h520M80 150h520M80 110h520M80 70h520" />
                  </g>
                  <path d="M80 228H620" stroke="rgba(150,179,212,0.28)" />
                  <path d="M80 30V240" stroke="rgba(150,179,212,0.28)" />
                  <path class="art-food" d="M80 213 610 137" stroke="#ffbd70" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.8" />
                  <path
                    class="art-exp"
                    d="M80 228C210 225 300 207 375 168C447 130 500 84 545 56C568 41 592 30 610 25"
                    stroke="url(#art-curve)"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    pathLength="1"
                    filter="url(#art-glow)"
                  />
                  <circle class="art-dot" cx="610" cy="25" r="4" fill="#baffeb" />
                  <text x="86" y="256" fill="rgba(150,179,212,0.5)" font-size="10" font-family="monospace">t / 年</text>
                  <text x="628" y="243" fill="rgba(150,179,212,0.5)" font-size="10" font-family="monospace" text-anchor="end">N</text>
                  <text x="470" y="118" fill="rgba(255,189,112,0.75)" font-size="11" font-family="monospace">F(t)</text>
                  <text x="538" y="42" fill="rgba(169,255,230,0.8)" font-size="11" font-family="monospace">N(t)</text>
                </svg>
                <span class="art-label mono">EXPONENTIAL GROWTH</span>
              </div>

              <div class="feature-body">
                <div class="feature-meta">
                  <span class="feature-index mono">001</span>
                  <span class="meta-dot" />
                  <span>人口学 · 微分方程</span>
                  <span class="meta-right">1798 · 约 8 分钟</span>
                </div>
                <h3>马尔萨斯人口模型</h3>
                <p class="feature-desc">
                  一条极简的微分方程，如何推出指数增长的曲线？又为什么说，人口与粮食的竞赛注定失衡？
                </p>
                <div class="feature-footer">
                  <div class="tags">
                    <span>微分方程</span>
                    <span>指数增长</span>
                    <span>可交互参数</span>
                  </div>
                  <span class="enter-link">
                    开始学习
                    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>

            <div class="side-list">
              <article
                v-for="item in upcoming"
                :key="item.index"
                class="ghost-card"
                role="button"
                tabindex="0"
                @click="emit('open', item.id)"
                @keydown.enter="emit('open', item.id)"
              >
                <div class="ghost-top">
                  <span class="mono ghost-index">{{ item.index }}</span>
                  <span class="status">{{ item.tag }}</span>
                </div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
                <div class="ghost-foot">
                  <span class="mono">{{ item.field }}</span>
                  <span class="arrow-dim">↗</span>
                </div>
              </article>
            </div>

            <div class="course-more">
              <header class="more-head">
                <span class="mono">延伸课程 · 006—012</span>
                <span>推导全文可在课程页导出为 Markdown</span>
              </header>
              <div class="course-grid">
                <article
                  v-for="item in advanced"
                  :key="item.index"
                  class="ghost-card"
                  role="button"
                  tabindex="0"
                  @click="emit('open', item.id)"
                  @keydown.enter="emit('open', item.id)"
                >
                  <div class="ghost-top">
                    <span class="mono ghost-index">{{ item.index }}</span>
                    <span class="status">{{ item.tag }}</span>
                  </div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.desc }}</p>
                  <div class="ghost-foot">
                    <span class="mono">{{ item.field }}</span>
                    <span class="arrow-dim">↗</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book" class="section book-section">
        <div class="section-inner">
          <header class="section-head">
            <div class="section-index mono">02 — 书籍阅读</div>
            <h2>把一本教科书，读成 45 节课。</h2>
            <p>按原书章节重写讲义，每一章配一个可拨动的实验场景。</p>
          </header>

          <article class="book-banner" role="button" tabindex="0" @click="emit('book')" @keydown.enter="emit('book')">
            <div class="banner-copy">
              <div class="banner-top">
                <span class="banner-badge mono">NEW · {{ bookMeta.pages }} 页</span>
                <span class="mono banner-author">[德] {{ bookMeta.author }} · {{ bookMeta.volume }}</span>
              </div>

              <h3>{{ bookMeta.title }}</h3>
              <p class="banner-desc">{{ bookMeta.description }}</p>

              <div class="banner-facts">
                <div>
                  <strong class="mono">{{ pad(bookMeta.chapterCount) }}</strong>
                  <span>章</span>
                </div>
                <div>
                  <strong class="mono">{{ bookMeta.sectionCount }}</strong>
                  <span>节讲义</span>
                </div>
                <div>
                  <strong class="mono">{{ pad(bookMeta.chapterCount) }}</strong>
                  <span>章实验</span>
                </div>
              </div>

              <span class="banner-cta">
                进入书籍
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>

            <div class="banner-preview">
              <div class="preview-head">
                <span class="mono">TABLE OF CONTENTS</span>
                <span class="mono">{{ bookMeta.sectionCount }} SECTIONS</span>
              </div>

              <div class="preview-list">
                <div v-for="chapter in bookChapters" :key="chapter.id" class="preview-row">
                  <span class="mono preview-no">{{ pad(chapter.no) }}</span>
                  <span class="preview-title">{{ chapter.title }}</span>
                  <span class="mono preview-pages">{{ chapter.pages }}</span>
                </div>
              </div>

              <div class="preview-foot">
                <span class="mono">1.1 → 8.6</span>
                <span class="mono">每章一个交互实验</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="method" class="section method">
        <div class="section-inner">
          <header class="section-head">
            <div class="section-index mono">03 — 方法</div>
            <h2>一节课，三层设计。</h2>
            <p>不是为了好看，而是为了让「理解」这件事有可以抓住的形状。</p>
          </header>

          <div class="method-grid">
            <div class="method-item">
              <span class="method-no mono">01</span>
              <h3>公式逐行生长</h3>
              <p>推导不是一次性摊开，而是像笔尖一样逐行出现。关键项被单独点亮，跟着动画走完每一步。</p>
            </div>
            <div class="method-item">
              <span class="method-no mono">02</span>
              <h3>三维空间承载直觉</h3>
              <p>坐标、曲线与差距都在同一个空间里发生。你能看见「增长率的增长」，而不只是读到一句话。</p>
            </div>
            <div class="method-item">
              <span class="method-no mono">03</span>
              <h3>参数由你亲手拨动</h3>
              <p>改变初始人口与增长率，曲线、翻倍时间与粮食缺口即时回应。知识从结论变成实验。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="about">
        <div class="section-inner about-inner">
          <div class="about-mark mono">04 — ANIMA</div>
          <blockquote>
            <span class="quote-mark">“</span>
            理解一个公式，<br />
            最好的方式，是看它发生。
          </blockquote>
          <p class="about-text">
            ANIMA 是一个以三维动画讲解数理知识的实验场。这里不堆叠术语，只把每一条公式还原成它原本描述的过程。
          </p>
          <button class="btn-primary about-cta" type="button" @click="emit('open', 'malthus')">
            <span>从马尔萨斯开始</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <footer class="footer">
          <div class="section-inner footer-inner">
            <div class="footer-brand mono">ANIMA · KNOWLEDGE IN MOTION</div>
            <div class="footer-meta">
              <span>Vue · Three.js · KaTeX</span>
              <span class="mono">2026</span>
            </div>
          </div>
        </footer>
      </section>
    </main>
  </div>
</template>

<style scoped>
.library {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero {
  position: relative;
  min-height: 100vh;
  padding: 150px 44px 96px;
  display: flex;
  align-items: center;
  background:
    radial-gradient(1200px 700px at 78% 18%, rgba(28, 82, 82, 0.2), transparent 65%),
    radial-gradient(900px 600px at 12% 82%, rgba(20, 46, 74, 0.16), transparent 70%);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.035) 1px, transparent 1px);
  background-size: 92px 92px;
  mask-image: radial-gradient(90% 80% at 60% 40%, #000 10%, transparent 80%);
}

.hero-inner {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  align-items: center;
  gap: 56px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: var(--mint);
  text-transform: uppercase;
}

.eyebrow-line {
  width: 34px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--mint));
}

.hero h1 {
  margin-top: 28px;
  font-size: clamp(44px, 5vw, 76px);
  font-weight: 300;
  line-height: 1.16;
  letter-spacing: -0.015em;
  color: #eef4fb;
}

.hero h1 span {
  display: block;
}

.hero h1 .hl {
  color: #dffcf1;
}

.hero h1 em {
  font-family: var(--font-serif);
  font-style: normal;
  font-weight: 500;
  color: var(--mint);
  position: relative;
  padding: 0 2px;
}

.hero h1 em::after {
  content: '';
  position: absolute;
  left: 0;
  right: 6px;
  bottom: 0.06em;
  height: 1px;
  background: linear-gradient(90deg, rgba(116, 240, 194, 0.75), rgba(116, 240, 194, 0));
}

.hero-sub {
  margin-top: 26px;
  max-width: 470px;
  font-size: 14px;
  line-height: 1.95;
  color: var(--text-dim);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 36px;
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
  flex-wrap: wrap;
  gap: 26px;
  margin-top: 54px;
  padding-top: 22px;
  border-top: 1px solid rgba(150, 179, 212, 0.09);
  max-width: 560px;
}

.hero-facts div {
  display: flex;
  align-items: baseline;
  gap: 9px;
}

.hero-facts strong {
  font-size: 15px;
  font-weight: 500;
  color: var(--mint);
  letter-spacing: 0.03em;
}

.hero-facts span {
  font-size: 10.5px;
  color: var(--faint);
  letter-spacing: 0.04em;
}

.hero-visual {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: stretch;
}

.plate {
  position: relative;
  flex: 1;
  min-height: clamp(420px, 62vh, 630px);
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 20px;
  overflow: hidden;
  background:
    radial-gradient(90% 90% at 60% 20%, rgba(16, 54, 55, 0.55), transparent 70%),
    linear-gradient(160deg, #08111a 0%, #04070c 70%);
  box-shadow: 0 40px 100px -50px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.plate-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.35) 60%, transparent);
}

.plate-top {
  position: absolute;
  top: 20px;
  left: 22px;
  right: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 3;
}

.live-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: rgba(186, 255, 235, 0.72);
}

.live-tag i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px rgba(116, 240, 194, 0.9);
}

.plate-no {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.plate-caption {
  position: absolute;
  left: 22px;
  bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 3;
}

.plate-caption .mono {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.plate-caption span:last-child {
  font-size: 11.5px;
  color: var(--text-dim);
}

.formula-chip {
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  padding: 12px 16px;
  border: 1px solid rgba(116, 240, 194, 0.16);
  border-radius: 12px;
  background: rgba(5, 12, 16, 0.66);
  backdrop-filter: blur(8px);
}

.chip-label {
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--faint);
}

.chip-math {
  font-family: var(--font-mono);
  font-size: 15px;
  color: #d9fff1;
  letter-spacing: 0.03em;
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

.plate-side-note {
  writing-mode: vertical-rl;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--faint);
  padding: 8px 0;
}

.side-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(180deg, rgba(150, 179, 212, 0.28), transparent);
}

.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 8.5px;
  letter-spacing: 0.24em;
  color: var(--faint);
}

.cue-line {
  width: 46px;
  height: 1px;
  background: linear-gradient(90deg, var(--faint), transparent);
}

.section {
  position: relative;
  padding: 120px 44px;
}

.section-inner {
  max-width: 1360px;
  margin: 0 auto;
}

.section-head {
  display: flex;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 46px;
  flex-wrap: wrap;
}

.section-index {
  width: 150px;
  flex: none;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--faint);
  padding-bottom: 9px;
}

.section-head h2 {
  font-size: clamp(30px, 3.4vw, 44px);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: #e9f1fb;
}

.section-head p {
  flex: 1;
  min-width: 260px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
  text-align: right;
}

.courses {
  border-top: 1px solid rgba(150, 179, 212, 0.07);
}

.course-layout {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 22px;
}

.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(165deg, rgba(12, 20, 32, 0.85), rgba(6, 10, 17, 0.9));
  transition: transform 0.5s var(--ease-out), border-color 0.4s ease, box-shadow 0.5s ease;
  cursor: pointer;
  outline: none;
}

.feature-card:hover,
.feature-card:focus-visible {
  transform: translateY(-5px);
  border-color: rgba(116, 240, 194, 0.32);
  box-shadow: 0 30px 80px -40px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(116, 240, 194, 0.08);
}

.feature-art {
  position: relative;
  height: 268px;
  overflow: hidden;
  background:
    radial-gradient(80% 100% at 70% 100%, rgba(33, 95, 89, 0.28), transparent 65%),
    linear-gradient(180deg, #081018, #060b12);
  border-bottom: 1px solid rgba(150, 179, 212, 0.1);
}

.art-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(150, 179, 212, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 179, 212, 0.055) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(90% 100% at 45% 60%, #000, transparent 85%);
}

.art-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.art-exp {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: art-draw 2.4s var(--ease-out) 0.4s forwards;
}

.art-food {
  opacity: 0;
  animation: art-fade 1s ease 2.1s forwards;
}

.art-dot {
  opacity: 0;
  animation: art-dot 0.8s ease 2.4s forwards;
}

.art-label {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.feature-body {
  padding: 28px 30px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.feature-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.feature-index {
  color: var(--mint);
  font-size: 11px;
}

.meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--faint);
}

.meta-right {
  margin-left: auto;
  color: var(--faint);
}

.feature-body h3 {
  margin-top: 18px;
  font-size: 29px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #f0f6fd;
}

.feature-desc {
  margin-top: 12px;
  max-width: 520px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--muted);
}

.feature-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
  padding-top: 26px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags span {
  padding: 5px 10px;
  border: 1px solid rgba(150, 179, 212, 0.13);
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: 0.03em;
  color: var(--muted);
}

.enter-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
  font-size: 12px;
  color: var(--mint);
  letter-spacing: 0.04em;
}

.enter-link svg {
  width: 16px;
  height: 16px;
  transition: transform 0.35s var(--ease-out);
}

.feature-card:hover .enter-link svg {
  transform: translateX(5px);
}

.side-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 22px;
}

.course-more {
  grid-column: 1 / -1;
  margin-top: 40px;
}

.more-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--faint);
}

.more-head .mono {
  color: var(--text-dim);
  letter-spacing: 0.12em;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

@media (max-width: 1180px) {
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
  .more-head span:last-child {
    display: none;
  }
}

.ghost-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  border: 1px solid rgba(150, 179, 212, 0.1);
  border-radius: 16px;
  background: linear-gradient(160deg, rgba(10, 16, 26, 0.6), rgba(5, 9, 15, 0.7));
  transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s var(--ease-out);
  cursor: pointer;
  outline: none;
}

.ghost-card:hover,
.ghost-card:focus-visible {
  border-color: rgba(116, 240, 194, 0.28);
  background: rgba(13, 21, 33, 0.7);
  transform: translateY(-3px);
}

.ghost-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ghost-index {
  font-size: 10.5px;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.status {
  padding: 4px 8px;
  border-radius: 5px;
  background: rgba(116, 240, 194, 0.09);
  font-size: 9px;
  letter-spacing: 0.06em;
  color: rgba(186, 255, 235, 0.8);
}

.ghost-card h3 {
  margin-top: 16px;
  font-size: 19px;
  font-weight: 400;
  color: var(--text);
}

.ghost-card p {
  margin-top: 8px;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--muted);
}

.ghost-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--faint);
}

.ghost-card:hover .arrow-dim {
  color: var(--mint);
}

.arrow-dim {
  font-size: 13px;
  color: rgba(150, 179, 212, 0.24);
  transition: color 0.3s ease;
}

.book-section {
  border-top: 1px solid rgba(150, 179, 212, 0.07);
  background:
    radial-gradient(900px 480px at 78% 12%, rgba(25, 72, 69, 0.13), transparent 68%),
    linear-gradient(180deg, rgba(9, 15, 24, 0.35), transparent 72%);
}

.book-banner {
  position: relative;
  display: grid;
  grid-template-columns: 1.06fr 0.94fr;
  border: 1px solid rgba(150, 179, 212, 0.14);
  border-radius: 20px;
  overflow: hidden;
  background:
    radial-gradient(120% 120% at 6% 0%, rgba(116, 240, 194, 0.06), transparent 52%),
    linear-gradient(160deg, rgba(11, 18, 29, 0.86), rgba(5, 9, 15, 0.9));
  cursor: pointer;
  outline: none;
  transition: transform 0.5s var(--ease-out), border-color 0.4s ease, box-shadow 0.5s ease;
}

.book-banner:hover,
.book-banner:focus-visible {
  transform: translateY(-4px);
  border-color: rgba(116, 240, 194, 0.3);
  box-shadow: 0 30px 80px -40px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(116, 240, 194, 0.07);
}

.banner-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 36px 34px;
}

.banner-top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.banner-badge {
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(116, 240, 194, 0.09);
  font-size: 8.5px;
  letter-spacing: 0.08em;
  color: rgba(186, 255, 235, 0.82);
}

.banner-author {
  font-size: 8.5px;
  letter-spacing: 0.08em;
  color: var(--faint);
}

.banner-copy h3 {
  margin-top: 22px;
  font-family: var(--font-serif);
  font-size: clamp(32px, 3.2vw, 46px);
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.15;
  color: #f0f7fb;
}

.banner-desc {
  margin-top: 14px;
  max-width: 580px;
  font-size: 12.5px;
  line-height: 2;
  color: var(--muted);
}

.banner-facts {
  display: flex;
  gap: 28px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(150, 179, 212, 0.09);
  width: 100%;
}

.banner-facts div {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.banner-facts strong {
  font-size: 14px;
  font-weight: 500;
  color: var(--mint);
  letter-spacing: 0.03em;
}

.banner-facts span {
  font-size: 10px;
  color: var(--faint);
  letter-spacing: 0.04em;
}

.banner-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  padding: 10px 18px;
  border: 1px solid rgba(116, 240, 194, 0.3);
  border-radius: 999px;
  background: rgba(116, 240, 194, 0.06);
  font-size: 12px;
  color: #d7f8ec;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.book-banner:hover .banner-cta {
  background: rgba(116, 240, 194, 0.13);
  border-color: rgba(116, 240, 194, 0.46);
}

.banner-cta svg {
  width: 15px;
  height: 15px;
  transition: transform 0.35s var(--ease-out);
}

.book-banner:hover .banner-cta svg {
  transform: translateX(4px);
}

.banner-preview {
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 0;
  padding: 18px 20px 16px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 14px;
  background:
    radial-gradient(100% 100% at 100% 0%, rgba(116, 240, 194, 0.03), transparent 60%),
    rgba(4, 8, 14, 0.72);
}

.preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(150, 179, 212, 0.1);
  font-size: 8px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.preview-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 4px;
}

.preview-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 9px 3px;
  border-bottom: 1px solid rgba(150, 179, 212, 0.06);
}

.preview-row:last-child {
  border-bottom: none;
}

.preview-no {
  flex: none;
  font-size: 8.5px;
  letter-spacing: 0.06em;
  color: rgba(116, 240, 194, 0.6);
}

.preview-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 11.5px;
  color: var(--text-dim);
  letter-spacing: 0.02em;
}

.preview-pages {
  flex: none;
  font-size: 8px;
  letter-spacing: 0.04em;
  color: var(--faint);
}

.preview-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 11px;
  border-top: 1px solid rgba(150, 179, 212, 0.09);
  font-size: 8px;
  letter-spacing: 0.08em;
  color: var(--faint);
}

.method {
  border-top: 1px solid rgba(150, 179, 212, 0.07);
  background: linear-gradient(180deg, rgba(9, 15, 24, 0.4), transparent 70%);
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(150, 179, 212, 0.1);
  border: 1px solid rgba(150, 179, 212, 0.1);
  border-radius: 18px;
  overflow: hidden;
}

.method-item {
  padding: 34px 30px 38px;
  background: #060b12;
  transition: background 0.4s ease;
}

.method-item:hover {
  background: #081018;
}

.method-no {
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--mint);
}

.method-item h3 {
  margin-top: 34px;
  font-size: 19px;
  font-weight: 400;
  color: #e4edf7;
}

.method-item p {
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.9;
  color: var(--muted);
}

.about {
  position: relative;
  border-top: 1px solid rgba(150, 179, 212, 0.07);
  background:
    radial-gradient(800px 500px at 60% 20%, rgba(25, 72, 69, 0.14), transparent 70%),
    linear-gradient(180deg, #05090f, #04070c);
}

.about-inner {
  padding: 120px 44px 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.about-mark {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.about-inner blockquote {
  position: relative;
  margin: 40px 0 0;
  font-family: var(--font-serif);
  font-size: clamp(32px, 4.4vw, 56px);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: #e8f3f1;
}

.quote-mark {
  color: var(--mint);
  opacity: 0.6;
  margin-right: 6px;
}

.about-text {
  margin-top: 30px;
  max-width: 520px;
  font-size: 13px;
  line-height: 2;
  color: var(--muted);
}

.about-cta {
  margin-top: 34px;
}

.footer {
  border-top: 1px solid rgba(150, 179, 212, 0.08);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 44px 34px;
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--faint);
}

.footer-brand {
  font-size: 9px;
}

.footer-meta {
  display: flex;
  gap: 26px;
}

@keyframes art-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes art-fade {
  to {
    opacity: 0.8;
  }
}

@keyframes art-dot {
  0% {
    opacity: 0;
    transform: scale(0.4);
    transform-origin: 610px 25px;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(22px);
  animation: reveal-up 0.9s var(--ease-out) forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes reveal-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1180px) {
  .course-layout {
    grid-template-columns: 1fr;
  }
  .side-list {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
  }
  .hero-inner {
    gap: 34px;
  }
  .section-head p {
    text-align: left;
  }
  .book-banner {
    grid-template-columns: 1fr;
  }
  .banner-preview {
    margin: 0 20px 20px;
  }
}

@media (max-width: 960px) {
  .hero {
    padding: 126px 24px 80px;
  }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 52px;
  }
  .hero-facts {
    margin-top: 38px;
  }
  .plate {
    min-height: 440px;
  }
  .plate-side-note {
    display: none;
  }
  .section {
    padding: 90px 24px;
  }
  .section-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }
  .section-index {
    width: auto;
    padding-bottom: 0;
  }
  .section-head p {
    min-width: 0;
  }
  .side-list {
    grid-template-columns: 1fr;
  }
  .ghost-card {
    min-height: 148px;
  }
  .method-grid {
    grid-template-columns: 1fr;
  }
  .method-item {
    padding: 28px 24px 30px;
  }
  .about-inner {
    padding: 90px 24px 70px;
  }
  .footer-inner {
    padding: 24px;
  }
}

@media (max-width: 640px) {
  .hero h1 {
    font-size: 39px;
  }
  .hero-sub {
    font-size: 13px;
  }
  .hero-actions {
    flex-wrap: wrap;
    gap: 10px;
  }
  .hero-facts {
    gap: 24px;
    flex-wrap: wrap;
  }
  .plate {
    min-height: 360px;
    border-radius: 16px;
  }
  .formula-chip {
    display: none;
  }
  .feature-art {
    height: 200px;
  }
  .banner-copy {
    padding: 24px 20px 26px;
  }
  .banner-copy h3 {
    font-size: 30px;
  }
  .banner-facts {
    gap: 20px;
    flex-wrap: wrap;
  }
  .banner-preview {
    margin: 0 14px 14px;
    padding: 14px 14px 12px;
  }
  .feature-body {
    padding: 22px 20px;
  }
  .feature-meta {
    flex-wrap: wrap;
    gap: 8px;
  }
  .meta-right {
    margin-left: 0;
  }
  .feature-body h3 {
    font-size: 24px;
  }
  .feature-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  .section {
    padding: 80px 20px;
  }
  .about-inner blockquote {
    font-size: 30px;
  }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-meta {
    gap: 16px;
  }
}
</style>
