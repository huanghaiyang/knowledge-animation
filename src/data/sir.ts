import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const SIR_T_MAX = 160
export const SIR_POP = 1000

export const SIR_DEFAULT_BETA = 0.32
export const SIR_DEFAULT_GAMMA = 0.1
export const SIR_DEFAULT_I0 = 10

const raw = String.raw

export interface SirPoint {
  t: number
  s: number
  i: number
  r: number
}

export interface SirMetrics {
  r0: number
  peakI: number
  peakT: number
  finalS: number
  attackRate: number
}

/** 经典 SIR 方程的 RK4 数值解，比例为总人口份额。 */
export function simulateSir(
  beta: number,
  gamma: number,
  i0: number,
  n = SIR_POP,
  tMax = SIR_T_MAX,
  dt = 0.25
): SirPoint[] {
  const s0 = Math.max(0, 1 - Math.min(1, i0 / n))
  const iStart = Math.min(1, i0 / n)
  let s = s0
  let i = iStart
  let r = 0
  const points: SirPoint[] = [{ t: 0, s, i, r }]

  const step = (s0v: number, i0v: number) => [
    -beta * s0v * i0v,
    beta * s0v * i0v - gamma * i0v,
    gamma * i0v
  ]

  const total = Math.max(1, Math.round(tMax / dt))
  for (let index = 0; index < total; index++) {
    const k1 = step(s, i)
    const s2 = s + (dt / 2) * k1[0]
    const i2 = i + (dt / 2) * k1[1]
    const k2 = step(s2, i2)
    const s3 = s + (dt / 2) * k2[0]
    const i3 = i + (dt / 2) * k2[1]
    const k3 = step(s3, i3)
    const s4 = s + dt * k3[0]
    const i4 = i + dt * k3[1]
    const k4 = step(s4, i4)

    s += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])
    i += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
    r += (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])

    s = Math.max(0, s)
    i = Math.max(0, i)
    r = Math.max(0, r)
    points.push({ t: (index + 1) * dt, s, i, r })
  }

  return points
}

export function sirMetrics(beta: number, gamma: number, i0: number): SirMetrics {
  const points = simulateSir(beta, gamma, i0)
  let peak = points[0]
  for (const point of points) {
    if (point.i > peak.i) peak = point
  }
  const last = points[points.length - 1]
  return {
    r0: beta / gamma,
    peakI: peak.i,
    peakT: peak.t,
    finalS: last.s,
    attackRate: Math.max(0, 1 - last.s)
  }
}

export const sirMeta: LessonMeta = {
  index: '005',
  title: '传染病问题',
  subtitle: '一场疫情，为什么会自己结束。',
  field: '流行病学 · 微分方程组',
  duration: '约 9 分钟',
  year: '1927',
  author: 'Kermack & McKendrick'
}

export const sirSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 1927',
    title: '一场疫情，为什么会自己结束？',
    lead: '没有疫苗，也没有特效药，感染人数却会在某个时刻自行回落。答案不在病毒，而在人群。',
    paragraphs: [
      '1927 年，Kermack 与 McKendrick 想回答一个看似简单的问题：为什么传染病不会把所有人都感染一遍？',
      '他们发现，疫情能否继续扩散，取决于还有多少人「可以被感染」。当易感者被消耗到一定程度，增长就会自己停下。'
    ],
    formulas: [
      {
        math: raw`N = S + I + R`,
        note: '把人群分成三个仓：易感、感染、移出'
      }
    ],
    formulaCaption: 'S：易感者　I：感染者　R：移出者（康复或死亡）',
    insight: '疫情不是被消灭的，是把易感者用完了。',
    annotation: { tag: 'PROBLEM', text: '感染为何先升后降', tone: 'dim' },
    duration: 16000
  },
  {
    id: 'compartments',
    nav: '分仓',
    kicker: '01 · 三个仓',
    title: '把人群分成 S、I、R 三个仓',
    lead: '每个人在任一时刻只属于一个仓，仓与仓之间只有单向的流动。',
    paragraphs: [
      'S 仓是易感者：他们还没被感染，接触病毒后可能被传染。I 仓是感染者：他们正在传播病毒。R 仓是移出者：康复或死亡，不再参与传播。',
      'S → I 的速度取决于接触，I → R 的速度取决于康复。三个仓的水位一起变化，但总人数守恒。'
    ],
    formulas: [
      {
        math: raw`\frac{dS}{dt}+\frac{dI}{dt}+\frac{dR}{dt}=0`,
        note: '总人数守恒：N 不随时间改变'
      }
    ],
    formulaCaption: 'S 只出不进　I 有进有出　R 只进不出',
    chips: [
      { label: 'S 易感者', tone: 'cyan' },
      { label: 'I 感染者', tone: 'amber' },
      { label: 'R 移出者', tone: 'violet' }
    ],
    insight: 'SIR 不追踪个体，只追踪三个仓的水位。',
    annotation: { tag: 'EXPOSURE', text: '一次接触，就是 S 流向 I 的一次搬运', tone: 'cyan' },
    duration: 18000
  },
  {
    id: 'equations',
    nav: '方程',
    kicker: '02 · 逐项写出',
    title: '三行方程，描述整场疫情',
    lead: '感染项 βSI/N 是双线性的：感染者越多，易感者越多，新增感染就越快。',
    paragraphs: [
      '第一行描述 S 的流失：每发生一次有效接触，就有一个人从 S 仓搬到 I 仓。β 是单位时间内一个感染者在全员易感环境中平均制造的感染人数。',
      '第二行描述 I 的变化：它从 S 仓获得新增感染，又以 γ 的速率流向 R 仓。第三行只有流入，因为移出者不再回来。'
    ],
    formulas: [
      {
        math: raw`\frac{dS}{dt} = -\htmlClass{pulse}{\frac{\beta SI}{N}}`,
        note: '① 易感者被感染而减少'
      },
      {
        math: raw`\frac{dI}{dt} = \frac{\beta SI}{N} - \gamma I`,
        note: '② 感染者：新增减去康复'
      },
      {
        math: raw`\frac{dR}{dt} = \gamma I`,
        note: '③ 移出者只增不减'
      }
    ],
    formulaCaption: 'β：传染率　γ：移出率　1/γ：平均感染期',
    insight: '新增感染 = β × 感染者 × 易感者比例。',
    annotation: { tag: 'TRANSMISSION', text: 'βSI/N 把「接触」写成了乘积', tone: 'mint' },
    duration: 24000
  },
  {
    id: 'threshold',
    nav: '阈值',
    kicker: '03 · 群体免疫',
    title: 'R₀ 是一道分水岭',
    lead: '基本再生数 R₀ = β/γ：一个感染者，在全是易感者的人群里平均能传染多少人。',
    paragraphs: [
      '把第二行提出 I，得到 dI/dt = I(βS/N − γ)。括号里的符号决定疫情扩散还是消退：只要 S/N 大于 1/R₀，感染就继续增长。',
      '当 R₀ > 1，疫情可以自持；当 R₀ < 1，每个感染者传染不到一个人，链条自然断裂。这也是群体免疫阈值的来源。'
    ],
    formulas: [
      {
        math: raw`\mathcal{R}_0 = \frac{\beta}{\gamma}`,
        note: '基本再生数：一个感染者的平均传播人数'
      },
      {
        math: raw`\frac{dI}{dt} > 0 \iff \frac{S}{N} > \htmlClass{hl-a}{\frac{1}{\mathcal{R}_0}}`,
        note: '易感比例高于阈值，感染才会增长'
      },
      {
        math: raw`1 - \frac{1}{\mathcal{R}_0}`,
        note: '需要免疫的人口比例（群体免疫阈值）'
      }
    ],
    formulaCaption: 'R₀ > 1：扩散　|　R₀ < 1：消退',
    insight: '决定疫情走向的，是剩余易感者的比例，而不是绝对感染人数。',
    annotation: { tag: 'THRESHOLD', text: 'S/N 跌破 1/R₀，增长立刻转为衰减', tone: 'amber' },
    duration: 22000
  },
  {
    id: 'peak',
    nav: '峰值',
    kicker: '04 · 感染高峰',
    title: '峰值出现在易感者跌破阈值的那一天',
    lead: '当 S/N = 1/R₀ 时，dI/dt 恰好为零，感染人数达到最大值，随后开始下降。',
    paragraphs: [
      '峰值不是由药物或封控决定的，而是由易感者被消耗的速度决定的。R₀ 越大，峰值越高，也来得越早。',
      '峰值之后，移出项 γI 仍然大于新增感染，曲线于是向下走。下降不代表病毒变弱，只代表能感染的人变少了。'
    ],
    formulas: [
      {
        math: raw`S_{\text{peak}} = \frac{N}{\mathcal{R}_0}`,
        note: '峰值处的易感者人数'
      },
      {
        math: raw`\left.\frac{dI}{dt}\right|_{\text{peak}} = 0`,
        note: '新增感染与康复速度在峰值处相等'
      }
    ],
    formulaCaption: '峰值之后，I(t) 单调下降，直到疫情结束',
    chips: [
      { label: 'R₀ ↑　峰值更高更早', tone: 'amber' },
      { label: 'R₀ ↓　曲线被压平', tone: 'mint' }
    ],
    insight: '曲线下降，不代表病毒变弱，只代表易感者变少。',
    annotation: { tag: 'PEAK', text: 'I 的峰值恰好落在 S = N/R₀', tone: 'violet' },
    duration: 20000
  },
  {
    id: 'explore',
    nav: '实验',
    kicker: '05 · 模型实验',
    title: '把 β、γ 与初始感染交给你',
    lead: '改变传染率、康复速度与初始感染者数量，观察 R₀ 如何移动峰值与终点。',
    paragraphs: [
      'β 决定传播速度，γ 决定感染者离开 I 仓的快慢。它们的比值 R₀ 决定疫情能否扩散。',
      '试试把 β 调小或把 γ 调大，让 R₀ 跌破 1：感染曲线不再出现高峰，而是从起点直接衰减。'
    ],
    formulas: [
      {
        math: raw`\frac{dI}{dt} = I\left(\frac{\beta S}{N} - \gamma\right)`,
        note: '把 I 提出来，就能看出净增长率'
      }
    ],
    formulaCaption: 'β：传染率　γ：移出率　I₀：初始感染者',
    insight: '先动 γ，再动 β，观察 R₀ 如何改变整条曲线的形状。',
    annotation: { tag: 'THRESHOLD', text: 'R₀ 由 β/γ 决定', tone: 'violet' },
    duration: 0
  }
]

const pct = (value: number) => `${(value * 100).toFixed(1)}%`

export const sirCourse: CourseDefinition = {
  id: 'sir',
  scene: 'sir',
  stageId: 'ANIMA · LESSON 005 / 流行病学',
  meta: sirMeta,
  steps: sirSteps,
  controls: [
    {
      key: 'beta',
      label: '传染率 β',
      min: 0.05,
      max: 0.6,
      step: 0.01,
      default: SIR_DEFAULT_BETA,
      format: (value) => value.toFixed(2)
    },
    {
      key: 'gamma',
      label: '移出率 γ',
      min: 0.02,
      max: 0.3,
      step: 0.005,
      default: SIR_DEFAULT_GAMMA,
      format: (value) => value.toFixed(3)
    },
    {
      key: 'i0',
      label: '初始感染者 I₀',
      min: 1,
      max: 100,
      step: 1,
      default: SIR_DEFAULT_I0,
      format: (value) => `${Math.round(value)} 人`
    }
  ],
  toggles: [
    {
      key: 'threshold',
      label: '显示阈值与峰值',
      caption: '标记 R₀ 决定的分水岭',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      const metrics = sirMetrics(params.beta, params.gamma, params.i0)
      return {
        tag: 'THRESHOLD',
        text: `R₀ = ${metrics.r0.toFixed(2)}，峰值感染 ${pct(metrics.peakI)}，第 ${metrics.peakT.toFixed(0)} 天`,
        tone: 'violet'
      }
    }
    return sirSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '基本再生数 R₀', value: (p) => (p.beta / p.gamma).toFixed(2) },
      {
        label: '峰值感染 I_max',
        value: (p) => pct(sirMetrics(p.beta, p.gamma, p.i0).peakI)
      },
      {
        label: '峰值时间',
        value: (p) => `第 ${sirMetrics(p.beta, p.gamma, p.i0).peakT.toFixed(0)} 天`
      },
      {
        label: '最终未感染 S∞',
        value: (p) => pct(sirMetrics(p.beta, p.gamma, p.i0).finalS)
      }
    ],
    foot: {
      label: '群体免疫阈值 1 − 1/R₀',
      value: (p) =>
        p.beta / p.gamma > 1 ? pct(1 - p.gamma / p.beta) : 'R₀ < 1，无需阈值'
    }
  },
  liveFormula: (p) => {
    const metrics = sirMetrics(p.beta, p.gamma, p.i0)
    return String.raw`\mathcal{R}_0=\frac{${p.beta.toFixed(2)}}{${p.gamma.toFixed(3)}}=${metrics.r0.toFixed(2)},\quad I_{\max}=${pct(metrics.peakI)}`
  },
  stats: [
    {
      label: '基本再生数 R₀',
      value: (p) => (p.beta / p.gamma).toFixed(2)
    },
    {
      label: '峰值感染比例',
      value: (p) => pct(sirMetrics(p.beta, p.gamma, p.i0).peakI)
    },
    {
      label: '最终感染比例',
      value: (p) => pct(sirMetrics(p.beta, p.gamma, p.i0).attackRate),
      warn: (p) => sirMetrics(p.beta, p.gamma, p.i0).attackRate > 0.5
    }
  ],
  exploreTitle: '把 β、γ 与 I₀ 交给你'
}
