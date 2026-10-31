import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const PEN_G = 9.81
export const PEN_DEFAULT_L = 1.5
export const PEN_DEFAULT_THETA = 25
export const PEN_MIN_L = 0.5
export const PEN_MAX_L = 3
export const PEN_MIN_THETA = 5
export const PEN_MAX_THETA = 60

export const PEN_DEG = Math.PI / 180

export interface PendulumSample {
  t: number
  theta: number
  omega: number
}

/** 小角近似下的周期 T₀ = 2π√(L/g)。 */
export function smallPeriod(l: number) {
  return 2 * Math.PI * Math.sqrt(l / PEN_G)
}

/** 保留到 θ₀⁴ 项的非线性周期修正。 */
export function nonlinearPeriod(l: number, thetaDeg: number) {
  const a = thetaDeg * PEN_DEG
  const a2 = a * a
  return smallPeriod(l) * (1 + a2 / 16 + (11 * a2 * a2) / 3072)
}

/** 单位质量的初始势能，最低点取零。 */
export function pendulumEnergy(l: number, thetaDeg: number) {
  return PEN_G * l * (1 - Math.cos(thetaDeg * PEN_DEG))
}

/** 最低点处的最大速度。 */
export function pendulumMaxSpeed(l: number, thetaDeg: number) {
  return Math.sqrt(2 * PEN_G * l * (1 - Math.cos(thetaDeg * PEN_DEG)))
}

/** 对精确方程 θ″ + (g/L)sinθ = 0 做 RK4 积分。 */
export function simulatePendulum(
  l: number,
  thetaDeg: number,
  tMax: number,
  samples = 800
): PendulumSample[] {
  const dt = tMax / samples
  const acc = (theta: number) => -(PEN_G / l) * Math.sin(theta)
  let theta = thetaDeg * PEN_DEG
  let omega = 0

  const points: PendulumSample[] = [{ t: 0, theta, omega }]

  for (let i = 0; i < samples; i++) {
    const k1Theta = omega
    const k1Omega = acc(theta)

    const k2Theta = omega + (dt / 2) * k1Omega
    const k2Omega = acc(theta + (dt / 2) * k1Theta)

    const k3Theta = omega + (dt / 2) * k2Omega
    const k3Omega = acc(theta + (dt / 2) * k2Theta)

    const k4Theta = omega + dt * k3Omega
    const k4Omega = acc(theta + dt * k3Theta)

    theta += (dt / 6) * (k1Theta + 2 * k2Theta + 2 * k3Theta + k4Theta)
    omega += (dt / 6) * (k1Omega + 2 * k2Omega + 2 * k3Omega + k4Omega)

    points.push({ t: (i + 1) * dt, theta, omega })
  }

  return points
}

const raw = String.raw

export const pendulumMeta: LessonMeta = {
  index: '006',
  title: '单摆问题',
  subtitle: '一次摆动里，藏着近似与真实的全部距离。',
  field: '力学 · 非线性振子',
  duration: '约 11 分钟',
  year: '1602 · 伽利略'
}

export const pendulumSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 1602',
    title: '摆动的钟，为什么等时？',
    lead: '伽利略在比萨教堂看着吊灯来回摆动——摆幅大一点、小一点，时间好像都一样。',
    paragraphs: [
      '单摆是最简单的周期运动：一根不可伸长的细线，一端固定，另一端挂一个质量。把摆球拉到一个角度后松手，它会在重力作用下绕支点来回摆动。',
      '直觉告诉我们，摆得越高，回来得越快；但伽利略观察到，只要摆幅不太大，来回一次的时间几乎不变——摆长固定时，周期与振幅无关。',
      '这个「等时性」不是巧合，而是小角近似下简谐运动的直接结果。要看清它从哪里来、又在哪里失效，得先把摆动的几何与受力写清楚。'
    ],
    formulas: [
      { math: raw`F_{\theta} = -mg\sin\theta`, note: '沿圆弧切向的回复力' },
      { math: raw`\tau = -mgL\sin\theta`, note: '关于支点的力矩：力臂为 L' },
      { math: raw`s = L\theta`, note: '弧长与摆角的几何关系（θ 用弧度）' },
      { math: raw`m\ddot{s} = -mg\sin\theta`, note: '把牛顿第二定律投影到切向' }
    ],
    formulaCaption: 'θ：摆角　L：摆长　m：摆球质量',
    insight: '同一个摆，摆幅越大，周期只会略微变长——这正是「近似」的边界。',
    annotation: { tag: 'PROBLEM', text: '摆幅不同，时间为什么几乎一样', tone: 'dim' },
    duration: 16000
  },
  {
    id: 'model',
    nav: '模型',
    kicker: '01 · 力矩',
    title: '先写力矩，再写转动',
    lead: '摆球不是沿直线运动，而是绕支点转动。用转动定律，比分解切向力更干净。',
    paragraphs: [
      '摆球受两个力：重力 mg 竖直向下，绳子的张力沿绳指向支点。张力穿过支点，对支点的力矩为零，因此只有重力产生力矩。',
      '重力作用线到支点的垂直距离（力臂）是 L sinθ；力矩方向总是把摆球拉回平衡位置，所以写成 τ = −mgL sinθ，负号表示回复。',
      '把摆球看作质量集中在一点的质点，它绕支点的转动惯量是 I = mL²。代入转动定律 Iθ″ = τ，两边约去 L，就得到与质量无关的方程。',
      '这一步很关键：方程里只剩下 g 和 L。单摆周期与摆球质量无关，正是从「重力正比于 m、转动惯量也正比于 m」的相互抵消里来的。'
    ],
    formulas: [
      { math: raw`I\ddot{\theta} = \tau`, note: '转动定律：力矩等于转动惯量乘角加速度' },
      { math: raw`I = mL^{2}`, note: '质点绕支点的转动惯量' },
      { math: raw`mL^{2}\ddot{\theta} = -mgL\sin\theta`, note: '代入力矩并写出完整方程' },
      { math: raw`\ddot{\theta} + \frac{g}{L}\sin\theta = 0`, note: '消去 L 与 m，得到精确运动方程' }
    ],
    formulaCaption: 'I：转动惯量　τ：合力矩　θ：相对竖直方向的摆角',
    insight: '张力不产生力矩，因为它始终穿过支点。',
    annotation: { tag: 'TORQUE', text: '只有重力对支点产生力矩', tone: 'amber' },
    duration: 20000
  },
  {
    id: 'approximation',
    nav: '近似',
    kicker: '02 · 小角',
    title: '把 sinθ 换成一个更简单的自己',
    lead: '精确方程里有一个 sinθ，它让方程变成非线性；小角近似只保留第一项，就把非线性换成了简谐。',
    paragraphs: [
      '把 sinθ 在 θ = 0 处展开：sinθ = θ − θ³/6 + θ⁵/120 − …。θ 必须用弧度表示，这个展开在 θ 很小时收敛得很快。',
      '当 |θ| ≪ 1 时，三次项及以后可以丢掉，sinθ ≈ θ，相对误差约为 θ²/6。θ = 10° ≈ 0.175 rad 时误差约 0.5%；θ = 30° 时误差已经到 4% 左右。',
      '代回方程得到 θ″ + ω₀²θ = 0，这就是简谐振子的标准形式，ω₀ = √(g/L) 是角频率。它的解是正弦或余弦，周期 T₀ = 2π/ω₀。',
      '所以「等时性」只在 θ₀ 足够小时成立。摆幅一大，被丢掉的三次项开始起作用，周期就会随振幅缓慢变长。'
    ],
    formulas: [
      {
        math: raw`\sin\theta = \theta - \frac{\theta^{3}}{6} + \frac{\theta^{5}}{120} - \cdots`,
        note: '在平衡点处的泰勒展开'
      },
      { math: raw`\sin\theta \approx \theta \quad (|\theta| \ll 1)`, note: '小角近似：只保留一次项' },
      {
        math: raw`\ddot{\theta} + \htmlClass{hl-a}{\omega_0^{2}}\theta = 0, \quad \omega_0 = \sqrt{\frac{g}{L}}`,
        note: '线性化后的简谐方程'
      },
      { math: raw`\theta(t) = \theta_0\cos(\omega_0 t)`, note: '初速为零时的解析解' },
      {
        math: raw`\left|\frac{\sin\theta-\theta}{\theta}\right| \approx \frac{\theta^{2}}{6}`,
        note: '小角近似的相对误差量级'
      }
    ],
    formulaCaption: 'θ 用弧度　小角近似在 θ₀ < 10° 时相当可靠',
    chips: [
      { label: 'θ₀ < 10°　误差 < 1%', tone: 'mint' },
      { label: 'θ₀ ≈ 30°　误差约 4%', tone: 'amber' },
      { label: 'θ₀ = 60°　等时性明显失效', tone: 'violet' }
    ],
    insight: '小角近似不是「忽略重力」，而是把回复力在平衡点附近线性化。',
    annotation: { tag: 'LINEARIZE', text: 'sinθ ≈ θ，非线性被换成简谐', tone: 'mint' },
    duration: 24000
  },
  {
    id: 'energy',
    nav: '能量',
    kicker: '03 · 能量',
    title: '能量守恒，能把方程重新推出来',
    lead: '如果方程写对了，能量应当不随时间变化；反过来，从能量守恒也能还原运动方程。',
    paragraphs: [
      '单摆的动能是 ½mL²θ′²，势能取最低点为零是 mgL(1−cosθ)。总能量 E 是两者之和，不含时间，是一个守恒量。',
      '把 E 对时间求导，会得到两项：一项来自角速度的变化，一项来自角度的变化。提取公因子 mL²θ′，括号里剩下的恰好是运动方程左边。',
      '因此 dE/dt = 0 与 θ″ + (g/L)sinθ = 0 完全等价。能量守恒不是额外假设，而是方程的一个积分。',
      '给定初始摆角 θ₀ 且初速为零，E₀ = mgL(1−cosθ₀)。摆球到最低点时势能最小、动能最大，由能量等式可解出最大速度。'
    ],
    formulas: [
      {
        math: raw`E = \frac{1}{2}mL^{2}\dot{\theta}^{2} + mgL(1-\cos\theta)`,
        note: '动能 + 势能，最低点取势能零点'
      },
      {
        math: raw`\frac{dE}{dt} = mL^{2}\dot{\theta}\ddot{\theta} + mgL\sin\theta\,\dot{\theta}`,
        note: '对时间逐项求导'
      },
      {
        math: raw`\frac{dE}{dt} = mL^{2}\dot{\theta}\left(\ddot{\theta} + \frac{g}{L}\sin\theta\right) = 0`,
        note: '代入方程，能量守恒'
      },
      { math: raw`E_0 = mgL(1-\cos\theta_0)`, note: '静止释放时能量全是势能' },
      {
        math: raw`v_{\max} = \sqrt{2gL(1-\cos\theta_0)}`,
        note: '最低点处的最大速度'
      }
    ],
    formulaCaption: 'E：总机械能　v_max：最低点速度',
    insight: '方程与守恒量是同一件事的两种写法。',
    annotation: { tag: 'ENERGY', text: '把 dE/dt 展开，括号里就是运动方程', tone: 'cyan' },
    duration: 22000
  },
  {
    id: 'period',
    nav: '周期',
    kicker: '04 · 周期',
    title: 'T₀ 只是起点，真实周期更长一点',
    lead: '小角给出 T₀ = 2π√(L/g)，摆幅变大后，周期以 θ₀² 的量级缓慢增加。',
    paragraphs: [
      '小角近似下，周期完全由摆长和重力决定：T₀ = 2π√(L/g)。摆长翻倍，周期变为 √2 倍——这也是摆钟调时的原理。',
      '不做近似时，周期要写成椭圆积分：T = 4√(L/g)∫₀^{θ₀} dθ/√(2(cosθ−cosθ₀))。被积函数在 θ→θ₀ 时发散，但积分本身有限。',
      '把椭圆积分按 θ₀ 展开，得到 T ≈ T₀(1 + θ₀²/16 + 11θ₀⁴/3072 + …)。第一修正项是二次的，所以小摆幅下几乎看不出来，大摆幅下才明显。',
      '两边相减再除以 T₀，得到相对修正 (T−T₀)/T₀ ≈ θ₀²/16：30° 时约 2.4%，60° 时约 8.6%。这就是「等时性」失效的量级。'
    ],
    formulas: [
      { math: raw`T_0 = 2\pi\sqrt{\frac{L}{g}}`, note: '小角近似下的周期' },
      {
        math: raw`T = 4\sqrt{\frac{L}{g}}\int_0^{\theta_0}\frac{d\theta}{\sqrt{2(\cos\theta-\cos\theta_0)}}`,
        note: '精确周期的椭圆积分形式'
      },
      {
        math: raw`T \approx T_0\left(1 + \frac{\theta_0^{2}}{16} + \frac{11\theta_0^{4}}{3072} + \cdots\right)`,
        note: '非线性周期修正，依次保留到 θ₀⁴'
      },
      {
        math: raw`\frac{T-T_0}{T_0} \approx \frac{\theta_0^{2}}{16}`,
        note: '相对修正量随振幅平方增长'
      }
    ],
    formulaCaption: 'θ₀ 用弧度　修正项随振幅平方增长',
    insight: '摆钟要准，摆幅就得小；这也是老式摆钟把摆幅设计得很克制的原因。',
    annotation: { tag: 'PERIOD', text: 'T ≈ T₀(1 + θ₀²/16)，修正随振幅平方增长', tone: 'violet' },
    duration: 26000
  },
  {
    id: 'experiment',
    nav: '实验',
    kicker: '05 · 模型实验',
    title: '把摆长与初始摆角交给你',
    lead: '改变 L 与 θ₀，观察真实曲线如何偏离小角近似，周期怎样一点点被拉长。',
    paragraphs: [
      '摆长 L 决定 ω₀ 与 T₀，也决定摆球在场景中的实际长度；初始摆角 θ₀ 决定振幅，也决定非线性修正的大小。',
      '右侧 θ(t) 曲线由 RK4 对精确方程积分得到，琥珀色虚线是小角近似的解析解。两条曲线在起始处重合，随后相位逐渐错开。',
      '把 θ₀ 推到 60°，再对比小角周期：你会看到周期读数明显大于 T₀，而曲线形状也不再是标准余弦。'
    ],
    formulas: [
      {
        math: raw`\ddot{\theta} + \frac{g}{L}\sin\theta = 0`,
        note: '场景中积分的是这条精确方程'
      },
      {
        math: raw`T \approx 2\pi\sqrt{\frac{L}{g}}\left(1 + \frac{\theta_0^{2}}{16} + \frac{11\theta_0^{4}}{3072}\right)`,
        note: '实时显示的周期近似'
      },
      {
        math: raw`E = \frac{1}{2}mL^{2}\dot{\theta}^{2} + mgL(1-\cos\theta)`,
        note: '摆球运动始终满足这条能量等式'
      }
    ],
    formulaCaption: 'L：摆长　θ₀：初始摆角　g = 9.81 m/s²',
    insight: '先动 θ₀，观察相位差；再动 L，观察整体时间尺度。',
    annotation: { tag: 'NONLINEAR', text: '真实单摆由 RK4 数值积分', tone: 'violet' },
    duration: 0
  }
]

const fixed1 = (value: number) => value.toFixed(1)
const fixed2 = (value: number) => value.toFixed(2)

export const pendulumCourse: CourseDefinition = {
  id: 'pendulum',
  scene: 'pendulum',
  stageId: 'ANIMA · LESSON 006 / 力学',
  meta: pendulumMeta,
  steps: pendulumSteps,
  controls: [
    {
      key: 'l',
      label: '摆长 L',
      min: PEN_MIN_L,
      max: PEN_MAX_L,
      step: 0.1,
      default: PEN_DEFAULT_L,
      format: (value) => `${fixed1(value)} m`
    },
    {
      key: 'theta0',
      label: '初始摆角 θ₀',
      min: PEN_MIN_THETA,
      max: PEN_MAX_THETA,
      step: 1,
      default: PEN_DEFAULT_THETA,
      format: (value) => `${Math.round(value)}°`
    }
  ],
  toggles: [
    {
      key: 'smallAngle',
      label: '叠加小角近似',
      caption: '用虚线保留线性化单摆的对照曲线',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      return {
        tag: 'NONLINEAR',
        text: `L = ${fixed1(params.l)} m，T ≈ ${nonlinearPeriod(params.l, params.theta0).toFixed(2)} s`,
        tone: 'violet'
      }
    }
    return pendulumSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '小角周期 T₀', value: (p) => `${fixed2(smallPeriod(p.l))} s` },
      { label: '角频率 ω₀', value: (p) => `${fixed2((2 * Math.PI) / smallPeriod(p.l))} rad/s` },
      { label: '最大速度 v_max', value: (p) => `${fixed2(pendulumMaxSpeed(p.l, p.theta0))} m/s` },
      { label: '初始能量 E（每千克）', value: (p) => `${fixed2(pendulumEnergy(p.l, p.theta0))} J/kg` }
    ],
    foot: {
      label: '非线性修正 (T − T₀)/T₀',
      value: (p) => `${((nonlinearPeriod(p.l, p.theta0) / smallPeriod(p.l) - 1) * 100).toFixed(1)}%`
    }
  },
  liveFormula: (p) => {
    const t0 = smallPeriod(p.l)
    const tn = nonlinearPeriod(p.l, p.theta0)
    return String.raw`T_0 = 2\pi\sqrt{\frac{${fixed1(p.l)}}{${PEN_G}}} = ${t0.toFixed(2)}\,\text{s}, \quad T \approx ${tn.toFixed(2)}\,\text{s}`
  },
  stats: [
    { label: '小角周期 T₀', value: (p) => `${fixed2(smallPeriod(p.l))} s` },
    { label: '当前周期 T', value: (p) => `${fixed2(nonlinearPeriod(p.l, p.theta0))} s` },
    {
      label: '摆角 / 振幅',
      value: (p) => `${Math.round(p.theta0)}°`,
      warn: (p) => p.theta0 > 40
    }
  ],
  exploreTitle: '把摆长与初始摆角交给你'
}
