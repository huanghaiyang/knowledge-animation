import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const LV_DELTA = 0.1
export const LV_DEFAULT_ALPHA = 0.8
export const LV_DEFAULT_BETA = 0.4
export const LV_DEFAULT_GAMMA = 0.6
export const LV_MIN_ALPHA = 0.2
export const LV_MAX_ALPHA = 1.5
export const LV_MIN_BETA = 0.05
export const LV_MAX_BETA = 0.6
export const LV_MIN_GAMMA = 0.2
export const LV_MAX_GAMMA = 1.5

export interface LvPoint {
  x: number
  y: number
  t: number
}

export interface LvOrbit {
  points: LvPoint[]
  period: number
}

export interface LvSummary {
  period: number
  xAmp: number
  yAmp: number
}

/** 非平凡平衡点：猎物 x* = γ/δ，捕食者 y* = α/β。 */
export function lvEquilibrium(alpha: number, beta: number, gamma: number, delta: number) {
  return { xStar: gamma / delta, yStar: alpha / beta }
}

/** 场景与读数使用同一条标准初值轨道，保证「当前种群」可对应。 */
export function lvInitial(alpha: number, beta: number, gamma: number, delta: number) {
  const { xStar, yStar } = lvEquilibrium(alpha, beta, gamma, delta)
  return { x0: xStar * 1.55, y0: yStar * 0.62 }
}

/** Lotka–Volterra 的首次积分。 */
export function lvInvariant(
  x: number,
  y: number,
  alpha: number,
  beta: number,
  gamma: number,
  delta: number
) {
  return delta * x - gamma * Math.log(x) + beta * y - alpha * Math.log(y)
}

/**
 * 用 RK4 积分 Lotka–Volterra 方程。
 * 从不同初值出发的轨道都闭合，积分到首次回到初值附近即停止并返回周期。
 */
export function simulateLotkaVolterra(
  alpha: number,
  beta: number,
  gamma: number,
  delta: number,
  x0: number,
  y0: number,
  dt = 0.02,
  maxPeriods = 5
): LvOrbit {
  const { xStar, yStar } = lvEquilibrium(alpha, beta, gamma, delta)
  const tLinear = (2 * Math.PI) / Math.sqrt(alpha * gamma)
  const maxT = tLinear * maxPeriods
  const steps = Math.ceil(maxT / dt)
  const startDist = Math.max(1e-6, Math.hypot(x0 - xStar, y0 - yStar))
  const tol = startDist * 0.02

  const derive = (x: number, y: number): [number, number] => [
    alpha * x - beta * x * y,
    -gamma * y + delta * x * y
  ]

  let x = x0
  let y = y0
  let period = maxT
  const points: LvPoint[] = [{ x, y, t: 0 }]

  for (let i = 1; i <= steps; i++) {
    const k1 = derive(x, y)
    const k2 = derive(x + (dt / 2) * k1[0], y + (dt / 2) * k1[1])
    const k3 = derive(x + (dt / 2) * k2[0], y + (dt / 2) * k2[1])
    const k4 = derive(x + dt * k3[0], y + dt * k3[1])

    x += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])
    y += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
    x = Math.max(1e-6, x)
    y = Math.max(1e-6, y)

    const t = i * dt
    points.push({ x, y, t })

    if (t > tLinear * 0.55 && Math.hypot(x - x0, y - y0) < tol) {
      period = t
      break
    }
  }

  return { points, period }
}

const summaryCache = new Map<string, LvSummary>()

/** 标准初值轨道的周期与相对振幅，按参数缓存，供 HUD / stats 复用。 */
export function lvSummary(alpha: number, beta: number, gamma: number, delta: number): LvSummary {
  const key = `${alpha.toFixed(3)}|${beta.toFixed(3)}|${gamma.toFixed(3)}|${delta.toFixed(3)}`
  const cached = summaryCache.get(key)
  if (cached) return cached

  const { xStar, yStar } = lvEquilibrium(alpha, beta, gamma, delta)
  const { x0, y0 } = lvInitial(alpha, beta, gamma, delta)
  const orbit = simulateLotkaVolterra(alpha, beta, gamma, delta, x0, y0)

  let xMax = x0
  let yMax = y0
  for (const point of orbit.points) {
    if (point.x > xMax) xMax = point.x
    if (point.y > yMax) yMax = point.y
  }

  const summary: LvSummary = {
    period: orbit.period,
    xAmp: Math.max(0, (xMax - xStar) / xStar),
    yAmp: Math.max(0, (yMax - yStar) / yStar)
  }

  if (summaryCache.size > 32) {
    const first = summaryCache.keys().next().value
    if (first) summaryCache.delete(first)
  }
  summaryCache.set(key, summary)
  return summary
}

const raw = String.raw

export const predatorMeta: LessonMeta = {
  index: '007',
  title: '捕食者—被捕食者',
  subtitle: '两个种群，一条闭合的循环。',
  field: '生态学 · Lotka–Volterra',
  duration: '约 12 分钟',
  year: '1925 · Lotka / Volterra'
}

export const predatorSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 1925',
    title: '为什么两个种群会一起起伏？',
    lead: '在哈德逊湾的毛皮记录里，雪兔与猞猁的数量周期性地错峰起伏——捕食者总慢半拍。',
    paragraphs: [
      '1925 年前后，Lotka 与 Volterra 各自注意到同一件事：捕食者与被捕食者的数量不是各自独立变化，而是互相驱动。',
      '猎物多，捕食者食物充足，数量上升；捕食者多，猎物被大量捕食，数量下降；猎物少了，捕食者又因饥饿减少——循环由此闭合。',
      '这套机制不需要外部周期，也不需要季节变化：只要两个种群互相制约，系统自己就能产生持续振荡。'
    ],
    formulas: [
      {
        math: raw`\frac{dx}{dt} = \alpha x - \beta xy`,
        note: '猎物：自然增长减去被捕食'
      },
      {
        math: raw`\frac{dy}{dt} = -\gamma y + \delta xy`,
        note: '捕食者：自然死亡加上捕食收益'
      },
      {
        math: raw`\frac{1}{x}\frac{dx}{dt} = \alpha - \beta y`,
        note: '猎物的人均增长率随捕食者数量线性下降'
      },
      {
        math: raw`\frac{1}{y}\frac{dy}{dt} = -\gamma + \delta x`,
        note: '捕食者的人均增长率随猎物数量线性上升'
      }
    ],
    formulaCaption: 'x：猎物数量　y：捕食者数量　α, β, γ, δ 均为正参数',
    chips: [
      { label: '猎物多　捕食者上升', tone: 'mint' },
      { label: '捕食者多　猎物下降', tone: 'amber' },
      { label: '相位相差约四分之一周期', tone: 'violet' }
    ],
    insight: '振荡不是被外界推动的，而是系统内部反馈的产物。',
    annotation: { tag: 'PROBLEM', text: '两个种群为何错峰起伏', tone: 'dim' },
    duration: 16000
  },
  {
    id: 'equations',
    nav: '方程',
    kicker: '01 · 两条方程',
    title: '把增长与捕食写进同一个乘积',
    lead: '每一个种群的变化率，都由「自身项」和「相遇项」组成；相遇项是双线性的。',
    paragraphs: [
      '猎物单独存在时按 α 指数增长；每发生一次「捕食者遇见猎物」，猎物减少 βxy，捕食者增加 δxy。相遇概率正比于两者数量之积。',
      '捕食者单独存在时按 γ 死亡；捕食带来的收益是 δxy。所以猎物的净变化是 αx − βxy，捕食者的净变化是 −γy + δxy。',
      '把每个方程除以对应的种群数量，得到人均增长率：猎物的 (1/x)dx/dt = α − βy，捕食者的 (1/y)dy/dt = −γ + δx。这两条直线是理解平衡与循环的钥匙。',
      'α、β、γ、δ 都是正数：α 是猎物内禀增长率，β 是捕食效率，γ 是捕食者死亡率，δ 是把猎物转化为捕食者的效率。'
    ],
    formulas: [
      { math: raw`\dot{x} = x(\alpha - \beta y)`, note: '把猎物方程写成因式形式' },
      { math: raw`\dot{y} = y(-\gamma + \delta x)`, note: '把捕食者方程写成因式形式' },
      { math: raw`\alpha,\ \beta,\ \gamma,\ \delta > 0`, note: '四个参数都是正数' },
      {
        math: raw`\frac{\dot{x}}{x} = 0 \iff y = \frac{\alpha}{\beta}`,
        note: '猎物种群不变的等值线'
      }
    ],
    formulaCaption: 'α：猎物增长率　β：捕食效率　γ：捕食者死亡率　δ：转化效率',
    insight: '双线性项 βxy 是整套模型的心脏：数量越多，相遇越频繁。',
    annotation: { tag: 'EQUATIONS', text: '相遇项 βxy 同时出现在两条方程里', tone: 'mint' },
    duration: 24000
  },
  {
    id: 'equilibrium',
    nav: '平衡',
    kicker: '02 · 平衡点',
    title: '让两条变化率同时归零',
    lead: '平衡点不是「静止的生态」，而是出生与死亡、增长与捕食恰好抵消的位置。',
    paragraphs: [
      '令 dx/dt = 0，得到 x(α − βy) = 0。x = 0 是平凡平衡（没有猎物就没有一切）；非平凡情形要求 α − βy = 0，即 y = α/β。',
      '令 dy/dt = 0，得到 y(−γ + δx) = 0。非平凡情形要求 x = γ/δ。两条等值线相交，就得到唯一的非平凡平衡点 (x*, y*) = (γ/δ, α/β)。',
      '在平衡点附近做线性化，把右端写成雅可比矩阵 J。代入平衡值后，对角元恰好归零，只剩反对角元 −βx* 与 δy*。',
      '特征方程是 λ² + αγ = 0，特征值为纯虚数 ±i√(αγ)。实部为零意味着既不吸引也不排斥，平衡点是「中心型」的。',
      '中心型平衡解释了为什么轨道是闭合的而不是螺旋：线性化看不出衰减，系统在平衡点周围持续绕圈。'
    ],
    formulas: [
      { math: raw`0 = x(\alpha - \beta y)`, note: '令猎物变化率为零' },
      { math: raw`0 = y(-\gamma + \delta x)`, note: '令捕食者变化率为零' },
      {
        math: raw`x^{*} = \frac{\gamma}{\delta}, \quad y^{*} = \frac{\alpha}{\beta}`,
        note: '唯一的非平凡平衡点'
      },
      {
        math: raw`J = \begin{pmatrix} \alpha-\beta y & -\beta x \\ \delta y & -\gamma+\delta x \end{pmatrix}`,
        note: '在平衡点附近线性化'
      },
      {
        math: raw`J^{*} = \begin{pmatrix} 0 & -\beta\gamma/\delta \\ \delta\alpha/\beta & 0 \end{pmatrix}`,
        note: '代入平衡值后的雅可比矩阵'
      },
      {
        math: raw`\lambda^{2} = -\alpha\gamma \Rightarrow \lambda = \pm i\sqrt{\alpha\gamma}`,
        note: '特征值为纯虚数，平衡点为中心型'
      }
    ],
    formulaCaption: 'J：雅可比矩阵　λ：特征值',
    insight: '纯虚特征值意味着中性稳定，轨道因此闭合。',
    annotation: { tag: 'CENTER', text: '平衡点 (γ/δ, α/β) 是中心型平衡', tone: 'amber' },
    duration: 26000
  },
  {
    id: 'invariant',
    nav: '守恒量',
    kicker: '03 · 首次积分',
    title: '存在一个沿轨道不变的量',
    lead: 'Lotka–Volterra 有一个隐藏的守恒量：把两个方程相除、分离变量再积分，就能把它找出来。',
    paragraphs: [
      '把两个方程相除，消去 dt：dy/dx = (−γy + δxy)/(αx − βxy)。分离变量后，含 x 的项与含 y 的项可以各自积分。',
      '积分结果为 δx − γln x + βy − αln y = 常数。把这个量记作 V(x,y)，它只依赖位置，不依赖时间。',
      '要证明它守恒，直接对时间求导：∂V/∂x = δ − γ/x，∂V/∂y = β − α/y，再分别乘以 ẋ 与 ẏ。',
      '展开后每一项都能找到相反的对应项：δαx 与 −αδx 抵消，−δβxy 与 βδxy 抵消，−αγ 与 αγ 抵消，βγy 与 −βγy 抵消。总和为零。',
      '所以 V 是运动的第一积分：轨道不能穿过不同的 V 等值线，只能沿着某一条 V = 常数的曲线走。'
    ],
    formulas: [
      {
        math: raw`V(x,y) = \delta x - \gamma\ln x + \beta y - \alpha\ln y`,
        note: '首次积分（守恒量）'
      },
      {
        math: raw`\frac{\partial V}{\partial x} = \delta - \frac{\gamma}{x}, \quad \frac{\partial V}{\partial y} = \beta - \frac{\alpha}{y}`,
        note: '分别对 x 与 y 求偏导'
      },
      {
        math: raw`\frac{dV}{dt} = \left(\delta - \frac{\gamma}{x}\right)\dot{x} + \left(\beta - \frac{\alpha}{y}\right)\dot{y}`,
        note: '链式法则展开'
      },
      {
        math: raw`= \delta\alpha x - \delta\beta xy - \alpha\gamma + \beta\gamma y`,
        note: '代入 ẋ 后的前一半'
      },
      {
        math: raw`\quad - \beta\gamma y + \beta\delta xy + \alpha\gamma - \alpha\delta x = 0`,
        note: '代入 ẏ 后逐项相消'
      },
      {
        math: raw`V(x(t),y(t)) \equiv V(x_0,y_0)`,
        note: '沿轨道守恒，轨道被锁在一条等值线上'
      }
    ],
    formulaCaption: 'V：首次积分　x₀, y₀：初始种群',
    insight: '守恒量把二维流变成一族一维闭合曲线。',
    annotation: { tag: 'INVARIANT', text: 'δx − γln x + βy − αln y 沿轨道不变', tone: 'violet' },
    duration: 26000
  },
  {
    id: 'phase',
    nav: '相图',
    kicker: '04 · 相平面',
    title: '每条闭合轨道，都是一条 V 等值线',
    lead: '把 x 与 y 当作平面坐标，方程就变成一张方向场；解曲线在其中绕平衡点闭合。',
    paragraphs: [
      '相平面上的每一点给出一个速度向量 (ẋ, ẏ)。方向场只决定「往哪走」，首次积分 V 决定「走在哪条曲线上」。',
      '由于 V 守恒，从不同初值出发的解落在不同的 V 等值线上；这些等值线是一圈圈套在平衡点外的闭合曲线。',
      '闭合意味着周期运动：系统绕一圈回到原状态，时间长度就是周期。精确周期要对闭合轨道做积分，平衡点附近可近似为 2π/√(αγ)。',
      '参数改变时，平衡点 (γ/δ, α/β) 会移动，等值线的形状也随之改变；但「中心型 + 闭合轨道」的结构在正参数范围内保持不变。'
    ],
    formulas: [
      {
        math: raw`V(x,y) = V(x_0,y_0)`,
        note: '每一条轨道就是一条 V 等值线'
      },
      {
        math: raw`T = \oint \frac{dx}{\alpha x - \beta xy}`,
        note: '沿闭合轨道积分得到精确周期'
      },
      {
        math: raw`T \approx \frac{2\pi}{\sqrt{\alpha\gamma}}`,
        note: '平衡点附近的线性化周期'
      },
      {
        math: raw`V \approx V^{*} + \frac{\delta}{2x^{*}}(x-x^{*})^{2} + \frac{\beta}{2y^{*}}(y-y^{*})^{2}`,
        note: '二次型近似：平衡点附近是椭圆'
      }
    ],
    formulaCaption: '相图中的闭合曲线对应周期解',
    insight: '相图把「时间演化」压成了「几何形状」。',
    annotation: { tag: 'PHASE', text: '闭合轨道 = 周期解 = V 等值线', tone: 'cyan' },
    duration: 22000
  },
  {
    id: 'experiment',
    nav: '实验',
    kicker: '05 · 模型实验',
    title: '把 α、β、γ 交给你',
    lead: '改变增长率、捕食效率与死亡率，观察平衡点移动、轨道变形与周期变化。',
    paragraphs: [
      'α 抬高平衡捕食者 y* = α/β；γ 抬高平衡猎物 x* = γ/δ；β 则把 y* 压低。三个滑块各自搬动平衡点的一个坐标。',
      'δ 固定为 0.1，所以 x* 只随 γ 变化。拖动 γ，竖直虚线会左右移动；拖动 α 或 β，水平虚线会上下移动。',
      '轨道不会因为参数改变而失去闭合性，但周期会变：α 与 γ 越大，线性化周期 2π/√(αγ) 越短。'
    ],
    formulas: [
      {
        math: raw`x^{*} = \frac{\gamma}{\delta}, \quad y^{*} = \frac{\alpha}{\beta}`,
        note: '平衡点随参数移动'
      },
      {
        math: raw`V = \delta x - \gamma\ln x + \beta y - \alpha\ln y`,
        note: '守恒量决定每条轨道的形状'
      },
      {
        math: raw`T \approx \frac{2\pi}{\sqrt{\alpha\gamma}}`,
        note: 'α 与 γ 越大，周期越短'
      },
      { math: raw`\delta = 0.10\ \text{(fixed)}`, note: '捕食效率在实验中保持不变' }
    ],
    formulaCaption: 'δ 固定为 0.1：x* = γ/δ　y* = α/β　T ≈ 2π/√(αγ)',
    insight: '先动 γ，再动 α，观察平衡点与周期如何分别响应。',
    annotation: { tag: 'CENTER', text: '在正参数范围内，轨道始终闭合', tone: 'violet' },
    duration: 0
  }
]

const fixed1 = (value: number) => value.toFixed(1)
const fixed2 = (value: number) => value.toFixed(2)

export const predatorCourse: CourseDefinition = {
  id: 'predator',
  scene: 'predator',
  stageId: 'ANIMA · LESSON 007 / 生态学',
  meta: predatorMeta,
  steps: predatorSteps,
  controls: [
    {
      key: 'alpha',
      label: '猎物增长率 α',
      min: LV_MIN_ALPHA,
      max: LV_MAX_ALPHA,
      step: 0.05,
      default: LV_DEFAULT_ALPHA,
      format: (value) => fixed2(value)
    },
    {
      key: 'beta',
      label: '捕食效率 β',
      min: LV_MIN_BETA,
      max: LV_MAX_BETA,
      step: 0.01,
      default: LV_DEFAULT_BETA,
      format: (value) => fixed2(value)
    },
    {
      key: 'gamma',
      label: '捕食者死亡率 γ',
      min: LV_MIN_GAMMA,
      max: LV_MAX_GAMMA,
      step: 0.05,
      default: LV_DEFAULT_GAMMA,
      format: (value) => fixed2(value)
    }
  ],
  toggles: [
    {
      key: 'field',
      label: '显示方向场',
      caption: '在相平面上叠加采样箭头',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      const { xStar, yStar } = lvEquilibrium(params.alpha, params.beta, params.gamma, LV_DELTA)
      const summary = lvSummary(params.alpha, params.beta, params.gamma, LV_DELTA)
      return {
        tag: 'CENTER',
        text: `平衡点 (${fixed1(xStar)}, ${fixed1(yStar)})，周期约 ${summary.period.toFixed(1)} s`,
        tone: 'violet'
      }
    }
    return predatorSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      {
        label: '平衡猎物 x*',
        value: (p) => fixed1(lvEquilibrium(p.alpha, p.beta, p.gamma, LV_DELTA).xStar)
      },
      {
        label: '平衡捕食者 y*',
        value: (p) => fixed1(lvEquilibrium(p.alpha, p.beta, p.gamma, LV_DELTA).yStar)
      },
      {
        label: '闭合轨道周期 T',
        value: (p) => `${lvSummary(p.alpha, p.beta, p.gamma, LV_DELTA).period.toFixed(1)} s`
      },
      {
        label: '当前种群 x₀ / y₀',
        value: (p) => {
          const { x0, y0 } = lvInitial(p.alpha, p.beta, p.gamma, LV_DELTA)
          return `${fixed1(x0)} / ${fixed1(y0)}`
        }
      }
    ],
    foot: {
      label: '固定捕食效率 δ',
      value: () => fixed1(LV_DELTA)
    }
  },
  liveFormula: (p) => {
    const { xStar, yStar } = lvEquilibrium(p.alpha, p.beta, p.gamma, LV_DELTA)
    return String.raw`x^{*} = \frac{\gamma}{\delta} = \frac{${fixed2(p.gamma)}}{0.1} = ${fixed1(xStar)}, \quad y^{*} = \frac{\alpha}{\beta} = \frac{${fixed2(p.alpha)}}{${fixed2(p.beta)}} = ${fixed1(yStar)}`
  },
  stats: [
    {
      label: '平衡点 (x*, y*)',
      value: (p) => {
        const { xStar, yStar } = lvEquilibrium(p.alpha, p.beta, p.gamma, LV_DELTA)
        return `${fixed1(xStar)} / ${fixed1(yStar)}`
      }
    },
    {
      label: '相位 / 周期',
      value: (p) => `中心 · ${lvSummary(p.alpha, p.beta, p.gamma, LV_DELTA).period.toFixed(1)} s`
    },
    {
      label: '振幅 x / y',
      value: (p) => {
        const summary = lvSummary(p.alpha, p.beta, p.gamma, LV_DELTA)
        return `${(summary.xAmp * 100).toFixed(0)}% / ${(summary.yAmp * 100).toFixed(0)}%`
      },
      warn: (p) => lvSummary(p.alpha, p.beta, p.gamma, LV_DELTA).period > 25
    }
  ],
  exploreTitle: '把 α、β 与 γ 交给你'
}
