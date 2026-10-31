import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const COMP_T_MAX = 40
export const COMP_DEFAULT_A0 = 100
export const COMP_DEFAULT_R = 0.08
export const COMP_DEFAULT_N = 12

const raw = String.raw

export const compoundMeta: LessonMeta = {
  index: '003',
  title: '复利与自然常数 e',
  subtitle: '离散的利息，如何收拢成一条光滑的指数曲线。',
  field: '金融数学 · 极限',
  duration: '约 8 分钟',
  year: '1683',
  author: 'Jacob Bernoulli'
}

export const compoundSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 1683',
    title: '利息，什么时候变成本金？',
    lead: '如果利息每年结算一次，它会在年末才加入本金；如果每半年结算一次，它会更早开始「生息」。',
    paragraphs: [
      '一年结算一次，年末的金额是 A₀(1+r)。第二年，利息将基于这个更大的本金继续计算。',
      '这看起来只是一个记账细节，却引出了一个尖锐的问题：如果把一年拆成越来越短的区间，最终会发生什么？'
    ],
    formulas: [
      { math: raw`A_1 = A_0(1+r)`, note: '一年一次复利' },
      { math: raw`A_2 = A_1(1+r) = A_0(1+r)^2`, note: '利息加入本金，继续生息' }
    ],
    formulaCaption: 'A₀：本金　r：年利率　A_t：第 t 年的金额',
    insight: '复利的本质：让收益也成为投入。',
    annotation: { tag: 'COMPOUND', text: '利息加入本金，开始自我复制', tone: 'dim' },
    duration: 15000
  },
  {
    id: 'discrete',
    nav: '离散',
    kicker: '01 · 计息频率',
    title: '一年分成 n 次，公式开始变形',
    lead: '每次的利率变成 r/n，但一年会结算 n 次，于是指数上多了一个 n。',
    paragraphs: [
      '每月计息一次，n = 12；每天计息一次，n = 365。频率越高，利息加入本金越早，年末金额越大。',
      '把 t 年也计入，金额公式变成 A₀(1 + r/n)^(nt)。n 出现在分母，同时出现在指数上——它同时在削弱单次利率、放大结算次数。'
    ],
    formulas: [
      {
        math: raw`A(t) = A_0\left(1+\frac{r}{n}\right)^{nt}`,
        note: '一年计息 n 次的复利公式'
      }
    ],
    formulaCaption: 'n：每年计息次数　t：年数',
    chips: [
      { label: 'n = 1　每年', tone: 'amber' },
      { label: 'n = 12　每月', tone: 'cyan' },
      { label: 'n = 365　每天', tone: 'mint' }
    ],
    insight: '计息频率越高，阶梯越细，但每一级仍在「跳」。',
    annotation: { tag: 'DISCRETE', text: 'n 次结算，n 级阶梯', tone: 'amber' },
    duration: 18000
  },
  {
    id: 'limit',
    nav: '极限',
    kicker: '02 · 让 n 走向无穷',
    title: '极限里，跳出来一个常数',
    lead: '当 n 越来越大，(1 + 1/n)^n 并没有爆炸，而是收敛到一个固定的数。',
    paragraphs: [
      '令 r = 1，n → ∞，这个表达式收敛到约 2.71828。数学家用字母 e 来记住它。',
      '更一般地，(1 + r/n)^n 收敛到 e^r。于是「无限频繁计息」不再是一个无法计算的极限，而是一个可以写成指数函数的答案。'
    ],
    formulas: [
      {
        math: raw`e = \lim_{n\to\infty}\left(1+\frac{1}{n}\right)^{n} \approx \htmlClass{hl-a}{2.71828}`,
        note: '自然常数 e 的定义'
      },
      {
        math: raw`\lim_{n\to\infty}\left(1+\frac{r}{n}\right)^{nt} = \htmlClass{hl-b}{e^{rt}}`,
        note: '计息次数趋于无穷时的极限'
      }
    ],
    formulaCaption: 'e 是复利在无限细分下的必然结果，不是人为选定的常数',
    insight: 'e 不是被定义的装饰，它是离散复利在极限处的固定落点。',
    annotation: { tag: 'LIMIT', text: 'n → ∞ 时，(1 + r/n)ⁿᵗ 收敛到 eʳᵗ', tone: 'mint' },
    duration: 21000
  },
  {
    id: 'continuous',
    nav: '连续',
    kicker: '03 · 连续复利',
    title: '阶梯消失，只剩一条光滑曲线',
    lead: '当 n 趋于无穷，离散的阶梯收敛成连续的指数曲线。',
    paragraphs: [
      '连续复利的公式是 A(t) = A₀ e^{rt}。它不再记录「哪一天结息」，而是假设增长每时每刻都在发生。',
      '实际年利率也从 (1 + r/n)^n − 1 变为 e^r − 1。例如 r = 8%，连续复利的实际年利率约为 8.33%。'
    ],
    formulas: [
      {
        math: raw`A(t) = A_0\,\htmlClass{hl-c}{e^{rt}}`,
        note: '连续复利'
      },
      {
        math: raw`r_{\text{eff}} = e^{r} - 1`,
        note: '连续复利下的实际年利率'
      }
    ],
    formulaCaption: 'e^r − 1：连续复利相对本金的年增幅',
    chips: [
      { label: '阶梯 → 光滑', tone: 'mint' },
      { label: '离散 → 连续', tone: 'cyan' }
    ],
    insight: '无限频繁地结息，并不会带来无限收益，而是收敛到一个有限的上限。',
    annotation: { tag: 'CONTINUOUS', text: '离散阶梯收拢成 A₀ eʳᵗ', tone: 'mint' },
    duration: 20000
  },
  {
    id: 'self',
    nav: '性质',
    kicker: '04 · e 的独特之处',
    title: 'e 是「增长等于自身」的那条曲线',
    lead: 'e^{rt} 的导数等于它自己乘以 r。这意味着增长速度始终与当前规模成正比。',
    paragraphs: [
      '这正是所有指数增长模型共同的语言：人口、利息、放射性衰变，都可以写成某个量对时间的导数正比于自身。',
      '也正因如此，e 出现在微分方程的解里，而不是只在金融公式里。它是「连续自我复制」的数学签名。'
    ],
    formulas: [
      {
        math: raw`\frac{d}{dt}\,\htmlClass{pulse}{e^{rt}} = r\,e^{rt}`,
        note: '增长速率始终正比于当前值'
      }
    ],
    formulaCaption: '这条性质，把复利与人口、生态模型连接在一起',
    insight: '复利、人口增长与放射性衰变，共享同一个微分方程骨架。',
    annotation: { tag: 'PROPERTY', text: '增长速率 ∝ 当前规模', tone: 'violet' },
    duration: 18000
  },
  {
    id: 'explore',
    nav: '实验',
    kicker: '05 · 参数实验',
    title: '把利率与计息频率交给你',
    lead: '拖动 n，看阶梯如何一点点贴合连续曲线；再拖动 r，看整条曲线如何抬升。',
    paragraphs: [
      '利率决定曲线的陡峭程度，计息频率只决定曲线离极限有多近。',
      '试着把 n 从 1 拉到 365，再打开「只看连续极限」对照：两者之间的差距，就是离散与连续的距离。'
    ],
    formulas: [
      {
        math: raw`A(t) = A_0\left(1+\frac{r}{n}\right)^{nt} \;\xrightarrow[n\to\infty]{}\; A_0 e^{rt}`,
        note: '从离散到连续'
      }
    ],
    formulaCaption: '阶梯：离散复利　光滑：连续极限',
    insight: '下面把参数交给你：先看 n 的收敛，再动 r 的斜率。',
    annotation: { tag: 'CONVERGENCE', text: '阶梯随 n 增大而收拢', tone: 'amber' },
    duration: 0
  }
]

const int = (value: number) => Math.round(value).toLocaleString('en-US')
const pct = (value: number) => `${(value * 100).toFixed(2)}%`

function discrete(a0: number, r: number, n: number, t: number) {
  return a0 * Math.pow(1 + r / n, n * t)
}

function continuous(a0: number, r: number, t: number) {
  return a0 * Math.exp(r * t)
}

export const compoundCourse: CourseDefinition = {
  id: 'compound',
  scene: 'compound',
  stageId: 'ANIMA · LESSON 003 / 金融数学',
  meta: compoundMeta,
  steps: compoundSteps,
  controls: [
    { key: 'a0', label: '本金 A₀', min: 50, max: 500, step: 10, default: COMP_DEFAULT_A0 },
    {
      key: 'r',
      label: '年利率 r',
      min: 0.02,
      max: 0.2,
      step: 0.005,
      default: COMP_DEFAULT_R,
      format: pct
    },
    {
      key: 'n',
      label: '每年计息次数 n',
      min: 1,
      max: 365,
      step: 1,
      default: COMP_DEFAULT_N,
      format: (value) => `${Math.round(value)} 次`
    }
  ],
  toggles: [
    {
      key: 'continuousOnly',
      label: '只看连续极限',
      caption: '隐藏离散阶梯，对照 A₀ eʳᵗ',
      default: false
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      const limit = continuous(params.a0, params.r, COMP_T_MAX)
      return {
        tag: 'CONVERGENCE',
        text: `n = ${Math.round(params.n)} 时，阶梯与极限相差 ${Math.abs(limit - discrete(params.a0, params.r, params.n, COMP_T_MAX)).toFixed(1)}`,
        tone: 'amber'
      }
    }
    return compoundSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '本金 A₀', value: (p) => int(p.a0) },
      { label: '年利率 r', value: (p) => pct(p.r) },
      { label: '计息频率 n', value: (p) => `${Math.round(p.n)} 次/年` },
      {
        label: '第 40 年 A',
        value: (p) => int(discrete(p.a0, p.r, p.n, COMP_T_MAX))
      }
    ],
    foot: {
      label: '连续极限 A₀eʳᵗ',
      value: (p) => int(continuous(p.a0, p.r, COMP_T_MAX))
    }
  },
  liveFormula: (p) =>
    String.raw`A(t) = ${Math.round(p.a0)}\left(1+\frac{${p.r.toFixed(3)}}{${Math.round(p.n)}}\right)^{${Math.round(p.n)}t}`,
  stats: [
    {
      label: '实际年利率',
      value: (p) => pct(Math.pow(1 + p.r / p.n, p.n) - 1)
    },
    {
      label: '连续极限 A(40)',
      value: (p) => int(continuous(p.a0, p.r, COMP_T_MAX))
    },
    {
      label: '阶梯 / 极限',
      value: (p) =>
        `${(discrete(p.a0, p.r, p.n, COMP_T_MAX) / continuous(p.a0, p.r, COMP_T_MAX)).toFixed(3)}×`
    }
  ],
  exploreTitle: '把利率与计息频率交给你'
}
