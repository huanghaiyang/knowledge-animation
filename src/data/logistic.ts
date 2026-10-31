import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const LOG_T_MAX = 100
export const LOG_DEFAULT_N0 = 80
export const LOG_DEFAULT_R = 0.06
export const LOG_DEFAULT_K = 1000

const raw = String.raw

export const logisticMeta: LessonMeta = {
  index: '002',
  title: '逻辑斯蒂增长',
  subtitle: '当环境容量出现，指数曲线如何被折弯。',
  field: '生态学 · S 形曲线',
  duration: '约 9 分钟',
  year: '1838',
  author: 'Pierre-François Verhulst'
}

export const logisticSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 1840',
    title: '指数增长，会在哪里停下？',
    lead: '如果一片草原上的兔子每年增长 6%，它们迟早会占满整个星球——除非有什么东西先让增长慢下来。',
    paragraphs: [
      '马尔萨斯模型假设资源无限，增长率恒定。短期看它很准，长期看它必然撞上现实：食物、空间、疾病，都不会无限供应。',
      '逻辑斯蒂增长只加了一个变量：环境最多能容纳多少。曲线便从失控的指数，变成了收敛的 S 形。'
    ],
    formulas: [
      { math: raw`N(t) = N_0\,e^{rt}`, note: '旧模型：没有上限的指数增长' }
    ],
    formulaCaption: 'N₀：初始数量　r：人均增长率',
    insight: '问题不在「长得快」，而在「一直没有减速」。',
    annotation: { tag: 'PROBLEM', text: '资源被默认成无限', tone: 'dim' },
    duration: 16000
  },
  {
    id: 'ceiling',
    nav: '容量',
    kicker: '01 · 环境容量',
    title: '给增长画一条天花板',
    lead: 'K 是环境能够长期承载的最大种群数量，也叫环境容量。',
    paragraphs: [
      '当种群远小于 K 时，资源充足，增长几乎和指数模型一样快；当种群接近 K 时，剩余空间越来越少，增长被一点点掐灭。',
      '这条上限不是数学假设，而是生态学事实：一片森林能养的鸟、一缸水能养的鱼，都有上限。'
    ],
    formulas: [
      {
        math: raw`\frac{dN}{dt} = rN\,\htmlClass{pulse}{\left(1-\frac{N}{K}\right)}`,
        note: '逻辑斯蒂方程 · Verhulst 1838'
      }
    ],
    formulaCaption: 'K：环境容量　N：当前种群数量',
    chips: [
      { label: 'K 由资源决定', tone: 'amber' },
      { label: 'N → K 时增长归零', tone: 'violet' }
    ],
    insight: '括号里的 (1 − N/K)，就是指数增长缺失的那只刹车。',
    annotation: { tag: 'CAPACITY', text: 'K 是环境容量，也是曲线的天花板', tone: 'amber' },
    duration: 18000
  },
  {
    id: 'crowding',
    nav: '拥挤项',
    kicker: '02 · 剩余空间',
    title: '(1 − N/K) 是一个会变化的刹车',
    lead: '括号内的值，代表还剩多少比例的资源空间。',
    paragraphs: [
      'N 很小时，N/K 接近 0，括号接近 1，种群几乎指数增长；N 接近 K 时，括号接近 0，增长停滞。',
      '最微妙的是 N = K/2：此时剩余空间一半，种群规模一半，两者的乘积达到最大——增长速度在这里达到峰值。'
    ],
    formulas: [
      {
        math: raw`\left(1-\frac{N}{\htmlClass{hl-a}{K}}\right) \in [0,\,1]`,
        note: '剩余空间比例，随 N 增大而减小'
      }
    ],
    formulaCaption: 'N ≪ K：近似指数　|　N = K/2：增速最大　|　N → K：停止增长',
    chips: [
      { label: 'N ≪ K　几乎指数', tone: 'mint' },
      { label: 'N = K/2　增速最大', tone: 'cyan' },
      { label: 'N → K　增长归零', tone: 'violet' }
    ],
    insight: '刹车不是突然踩下的，而是随着拥挤程度线性加深。',
    annotation: { tag: 'FEEDBACK', text: '种群越多，剩余空间越少，增长越慢', tone: 'mint' },
    duration: 19000
  },
  {
    id: 'solution',
    nav: '求解',
    kicker: '03 · 逐行推导',
    title: '解出一条 S 形曲线',
    lead: '分离变量、部分分式、再取指数，方程的解会自己长出形状。',
    paragraphs: [
      '把方程两边拆开，含 N 的项留在左边，时间移到右边，然后对两边积分。',
      '积分后的对数通过部分分式化简，最后取指数，得到一条从 N₀ 出发、在 K 处收敛的 S 形曲线。'
    ],
    formulas: [
      {
        math: raw`\frac{dN}{N\left(1-\frac{N}{K}\right)} = r\,dt`,
        note: '① 分离变量'
      },
      {
        math: raw`\int\left(\frac{1}{N}+\frac{1}{K-N}\right)dN = \int r\,dt`,
        note: '② 部分分式'
      },
      {
        math: raw`\ln\frac{N}{K-N} = rt + C`,
        note: '③ 两边积分并合并对数'
      },
      {
        math: raw`N(t) = \frac{K}{1 + \htmlClass{hl-c}{A\,e^{-rt}}}, \quad A = \frac{K-N_0}{N_0}`,
        note: '④ 代入初值 N(0) = N₀'
      }
    ],
    formulaCaption: 'A 由初始数量确定；t → ∞ 时，N → K',
    insight: '指数项 e^{-rt} 会随时间衰减，于是分母趋于 1，人口趋于 K。',
    annotation: { tag: 'SOLUTION', text: 'S 曲线：先加速，后减速，最终收敛', tone: 'mint' },
    duration: 26000
  },
  {
    id: 'inflection',
    nav: '拐点',
    kicker: '04 · 最大增速',
    title: '增长最快的一天，恰好在一半处',
    lead: 'S 形曲线有一个拐点：在此之前加速，在此之后减速。',
    paragraphs: [
      '把增长速率再对时间求导，令加速度为零，可以解出 N = K/2。此时增长速度达到最大值 rK/4。',
      '这也是为什么生态学家盯着种群数量是否越过 K/2：越过后，增长的惯性开始减弱，曲线开始向 K 俯冲。'
    ],
    formulas: [
      {
        math: raw`\frac{d^2N}{dt^2} = r\,\frac{dN}{dt}\left(1-\htmlClass{hl-b}{\frac{2N}{K}}\right)`,
        note: '加速度为零时：N = K/2'
      },
      {
        math: raw`\left.\frac{dN}{dt}\right|_{\max} = \htmlClass{pulse}{\frac{rK}{4}}`,
        note: '拐点处的最大增长速率'
      }
    ],
    formulaCaption: '拐点横坐标 t* = (1/r) · ln((K − N₀) / N₀)',
    chips: [
      { label: '前半段　加速', tone: 'mint' },
      { label: 'K/2　增速峰值', tone: 'cyan' },
      { label: '后半段　减速', tone: 'violet' }
    ],
    insight: 'S 形曲线不是「越来越慢」，而是先加速到峰值，再减速收敛。',
    annotation: {
      tag: 'INFLECTION',
      text: 'N = K/2，增长速度在这里达到峰值',
      tone: 'cyan'
    },
    duration: 21000
  },
  {
    id: 'explore',
    nav: '实验',
    kicker: '05 · 模型实验',
    title: '把 K、r 与 N₀ 交给你',
    lead: '改变环境容量、增长率与初始数量，观察拐点与收敛速度如何移动。',
    paragraphs: [
      'K 决定最终高度，r 决定曲线爬升的陡峭程度，N₀ 决定起点位置。',
      '下方的滑块会同步改变三维曲线、拐点标记与实时读数。试着把 K 调低，看看「天花板」如何压扁整条曲线。'
    ],
    formulas: [
      {
        math: raw`N(t)=\frac{K}{1+\left(\frac{K-N_0}{N_0}\right)e^{-rt}}`,
        note: '逻辑斯蒂解 · 三参数版本'
      }
    ],
    formulaCaption: 'K：环境容量　r：内禀增长率　N₀：初始数量',
    insight: '下面把参数交给你：先动 K，再动 r，观察拐点的位置。',
    annotation: { tag: 'BOUNDARY', text: '环境容量决定最终规模', tone: 'violet' },
    duration: 0
  }
]

const int = (value: number) => Math.round(value).toLocaleString('en-US')
const pct = (value: number) => `${(value * 100).toFixed(1)}%`

function inflectionTime(n0: number, r: number, k: number) {
  if (n0 <= 0 || n0 >= k) return 0
  return Math.max(0, Math.log((k - n0) / n0) / r)
}

function timeTo(n0: number, r: number, k: number, ratio: number) {
  if (n0 <= 0 || n0 >= k * ratio) return 0
  return Math.max(0, Math.log((ratio * (k - n0)) / ((1 - ratio) * n0)) / r)
}

export const logisticCourse: CourseDefinition = {
  id: 'logistic',
  scene: 'logistic',
  stageId: 'ANIMA · LESSON 002 / 生态学',
  meta: logisticMeta,
  steps: logisticSteps,
  controls: [
    { key: 'n0', label: '初始数量 N₀', min: 20, max: 300, step: 10, default: LOG_DEFAULT_N0 },
    {
      key: 'r',
      label: '内禀增长率 r',
      min: 0.02,
      max: 0.12,
      step: 0.005,
      default: LOG_DEFAULT_R,
      format: pct
    },
    {
      key: 'k',
      label: '环境容量 K',
      min: 600,
      max: 1600,
      step: 50,
      default: LOG_DEFAULT_K,
      format: int
    }
  ],
  toggles: [
    {
      key: 'compare',
      label: '叠加指数曲线',
      caption: '保留没有上限的对照曲线',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      return {
        tag: 'BOUNDARY',
        text: `K = ${int(params.k)}，拐点约在第 ${inflectionTime(params.n0, params.r, params.k).toFixed(0)} 年`,
        tone: 'violet'
      }
    }
    return logisticSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '环境容量 K', value: (p) => int(p.k) },
      { label: '增长率 r', value: (p) => pct(p.r) },
      { label: '拐点人口 K/2', value: (p) => int(p.k / 2) },
      {
        label: '第 100 年 N',
        value: (p) => int(p.k / (1 + ((p.k - p.n0) / p.n0) * Math.exp(-p.r * LOG_T_MAX)))
      }
    ],
    foot: {
      label: '最大增长速率 rK/4',
      value: (p) => `${int(p.r * p.k / 4)} / 年`
    }
  },
  liveFormula: (p) => {
    const a = (p.k - p.n0) / p.n0
    return String.raw`N(t) = \frac{${Math.round(p.k)}}{1 + ${a.toFixed(1)}\,e^{-${p.r.toFixed(3)}t}}`
  },
  stats: [
    {
      label: '拐点时间 t*',
      value: (p) => `${inflectionTime(p.n0, p.r, p.k).toFixed(0)} 年`
    },
    {
      label: '最大增长速率',
      value: (p) => `${int(p.r * p.k / 4)} / 年`
    },
    {
      label: '达到 90% K',
      value: (p) => `${timeTo(p.n0, p.r, p.k, 0.9).toFixed(0)} 年`
    }
  ],
  exploreTitle: '把 K、r 与 N₀ 交给你'
}
