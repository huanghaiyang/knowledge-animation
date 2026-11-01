import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const MOMENTUM_DEFAULT_K = 1.6
export const MOMENTUM_DEFAULT_AMP = 1
export const MOMENTUM_BOX = 6.4

const raw = String.raw

export const momentumMeta: LessonMeta = {
  index: '009',
  title: '动量算符的本征函数',
  subtitle: '一次求导，把动量变成波长。',
  field: '量子力学 · 算符',
  duration: '约 12 分钟',
  year: '1926 · 波动力学'
}

export const momentumSteps: LessonStep[] = [
  {
    id: 'operator',
    nav: '算符',
    kicker: '01 · 动量算符',
    title: '把动量变成一次求导',
    lead: '经典力学里动量是一个数；量子力学里，它变成一个作用在波函数上的算符。',
    paragraphs: [
      '在位置表象中，坐标算符只是乘以 x，而动量算符要对波函数求导。三维写法是 p̂ = −iℏ∇，负号与虚数单位共同保证本征值是实数。',
      '一维问题只剩 x 分量：p̂_x = −iℏ d/dx。它是一阶微分算符，作用一次只改变波函数的斜率，不改变它的整体结构。',
      '算符必须厄米，才能让可观测量的本征值为实数、本征函数彼此正交。分部积分可以证明 p̂_x 满足 ⟨f|p̂_x g⟩ = ⟨p̂_x f|g⟩。',
      '位置与动量不对易：[x̂, p̂_x] = iℏ。这条对易关系不是计算技巧，而是不确定性原理的代数源头。'
    ],
    formulas: [
      { math: raw`\hat{p} = -i\hbar\,\nabla`, note: '三维动量算符 · 位置表象' },
      { math: raw`\hat{p}_x = -i\hbar\frac{\partial}{\partial x} = -i\hbar\frac{d}{dx}`, note: '一维情形：只剩一次求导' },
      { math: raw`\langle f|\hat{p}_x\,g\rangle = \langle \hat{p}_x f|g\rangle`, note: '厄米性：保证本征值为实数' },
      { math: raw`[\hat{x},\,\hat{p}_x] = i\hbar`, note: '正则对易关系 · 不确定性的代数根源' }
    ],
    formulaCaption: 'ℏ：约化普朗克常数　∇：梯度算符',
    chips: [
      { label: '算符 = 求导', tone: 'mint' },
      { label: '厄米 → 实本征值', tone: 'cyan' },
      { label: '[x̂, p̂] = iℏ', tone: 'violet' }
    ],
    insight: '动量不再被「读出来」，而是通过求导被「算出来」。',
    annotation: { tag: 'OPERATOR', text: '−iℏ d/dx 把动量写成一次求导', tone: 'amber' },
    duration: 19000
  },
  {
    id: 'eigen',
    nav: '本征方程',
    kicker: '02 · 本征值',
    title: '让算符作用后只剩一个常数',
    lead: '本征方程要求：算符作用在 ψ 上，结果仍是 ψ 本身，只多乘一个数。',
    paragraphs: [
      '本征方程写作 p̂_x ψ = p_x ψ。这里的 p_x 不是算符，而是一个待定的数；满足它的 ψ 称为动量本征函数。',
      '一维展开得到 −iℏ dψ/dx = p_x ψ。这是一个复系数的一阶线性常微分方程，变量可以分离。',
      '把含 ψ 的项移到左边、含 x 的项移到右边：dψ/ψ = (i p_x/ℏ) dx。两边积分得到 ln ψ = i p_x x/ℏ + 常数。',
      '取指数，得到 ψ = A e^{i p_x x/ℏ}。复指数求导后仍是指数本身，正好满足一阶方程，因此它是唯一的通解形式。'
    ],
    formulas: [
      { math: raw`\hat{p}_x\psi = \htmlClass{hl-a}{p_x}\,\psi`, note: '本征方程：作用结果只差一个常数' },
      { math: raw`-i\hbar\frac{d\psi}{dx} = p_x\psi`, note: '代入算符，得到一阶 ODE' },
      { math: raw`\frac{d\psi}{\psi} = \frac{i\,p_x}{\hbar}\,dx`, note: '分离变量' },
      { math: raw`\psi(x) = A\,e^{i p_x x/\hbar}`, note: '两边积分并取指数 · 通解' }
    ],
    formulaCaption: 'A：待定复常数　p_x：本征值',
    insight: '本征函数不会改变形状，只会被乘上一个数。',
    annotation: { tag: 'EIGEN', text: '一阶 ODE 的解是一条复指数', tone: 'mint' },
    duration: 22000
  },
  {
    id: 'plane',
    nav: '平面波',
    kicker: '03 · 德布罗意',
    title: 'k 是动量的另一种写法',
    lead: '把指数里的 p_x/ℏ 记作 k，本征函数就变成最熟悉的平面波。',
    paragraphs: [
      '定义 k = p_x/ℏ，指数写成 i k x，本征函数为 ψ_k = A e^{ikx}。k 称为波数，单位是长度的倒数。',
      '代回算符：p̂_x ψ_k = −iℏ(ik)Ae^{ikx} = ℏk ψ_k。于是 ψ_k 的本征值就是 ℏk，本征值随 k 线性增长。',
      '德布罗意关系把粒子性与波动性接上：p = ℏk = h/λ。动量越大，波数越大，波长越短。',
      '三维情形写成 e^{i k·r}，本征值为 ℏk，波矢 k 的方向与动量方向一致。平面波在空间中是无限延展的。'
    ],
    formulas: [
      { math: raw`k = \frac{p_x}{\hbar},\qquad \psi_k(x) = A\,e^{ikx}`, note: '用波数重写本征函数' },
      { math: raw`\hat{p}_x\psi_k = -i\hbar(ik)\psi_k = \htmlClass{hl-b}{\hbar k}\,\psi_k`, note: '代回验证：本征值 ℏk' },
      { math: raw`p = \hbar k = \frac{h}{\lambda}`, note: '德布罗意关系' },
      { math: raw`k = \frac{2\pi}{\lambda},\qquad \lambda = \frac{2\pi}{k}`, note: '波数与波长的换算' }
    ],
    formulaCaption: 'k：波数　λ：波长　h = 2πℏ',
    chips: [
      { label: '本征值 ℏk', tone: 'mint' },
      { label: 'λ = 2π/k', tone: 'cyan' },
      { label: 'p = h/λ', tone: 'amber' }
    ],
    insight: '平面波是动量的「纯态」：测一次动量，必然得到 ℏk。',
    annotation: { tag: 'PLANE WAVE', text: 'e^{ikx} 就是动量 ℏk 的本征函数', tone: 'cyan' },
    duration: 23000
  },
  {
    id: 'normalize',
    nav: '归一化',
    kicker: '04 · 箱归一化',
    title: '让总概率等于 1',
    lead: '平面波在全空间平方不可积，所以要先把它关进一个长度为 L 的箱子。',
    paragraphs: [
      'e^{ikx} 的模恒为 1，∫|ψ|²dx 在全空间发散，不能直接归一化成 1。物理上我们关心的是有限区域，于是引入箱归一化。',
      '把波限制在长度 L 的箱中，并采用周期性边界条件，k 只能取离散值。归一化条件给出 |A|²L = 1，所以 A = 1/√L。',
      '不同 k 的本征函数在箱内正交：⟨k|k′⟩ = (1/L)∫₀^L e^{i(k′−k)x}dx。当 k′≠k 时积分为零，当 k′=k 时为 1，即 δ_kk′。',
      '让 L → ∞，离散的 δ_kk′ 过渡为狄拉克 δ(k−k′)，归一化因子改成 1/√2π；这是连续谱的标准处理。',
      '坐标波函数与动量波函数通过傅里叶变换互为镜像：ψ(x) 展开成不同 k 的平面波，展开系数就是 φ(k)。'
    ],
    formulas: [
      {
        math: raw`\int_0^L |A|^2 e^{-ikx}e^{ikx}\,dx = |A|^2 L = 1`,
        note: '箱内归一化条件'
      },
      { math: raw`A = \htmlClass{hl-c}{\frac{1}{\sqrt{L}}}`, note: '归一化振幅' },
      {
        math: raw`\langle k|k'\rangle = \frac{1}{L}\int_0^L e^{i(k'-k)x}\,dx = \delta_{kk'}`,
        note: '离散正交归一性'
      },
      {
        math: raw`\langle k|k'\rangle = \delta(k-k'),\qquad \psi_k(x) = \frac{1}{\sqrt{2\pi}}e^{ikx}`,
        note: 'L → ∞ 的连续谱极限'
      },
      {
        math: raw`\psi(x) = \frac{1}{\sqrt{2\pi}}\int \varphi(k)e^{ikx}\,dk,\qquad \varphi(k) = \frac{1}{\sqrt{2\pi}}\int \psi(x)e^{-ikx}\,dx`,
        note: '坐标空间与动量空间的傅里叶变换'
      }
    ],
    formulaCaption: 'L：归一化长度　δ_kk′：克罗内克 δ　δ(k−k′)：狄拉克 δ',
    insight: '归一化不是装饰：它把「波有多强」换算成「概率有多大」。',
    annotation: { tag: 'NORMALIZE', text: '箱归一化 A = 1/√L，连续极限变成 δ(k−k′)', tone: 'violet' },
    duration: 24000
  },
  {
    id: 'superpose',
    nav: '叠加',
    kicker: '05 · 叠加与拍频',
    title: '两个本征态，合成一个会呼吸的波',
    lead: '动量本征态构成一组完备基，任意波函数都可以写成它们的叠加。',
    paragraphs: [
      '一般态可以展开为 ψ(x) = ∫φ(k)e^{ikx}dk；离散情形则是求和。系数 φ(k) 的模平方给出测量到动量 ℏk 的概率密度。',
      '取两个本征态叠加：ψ = c₁e^{ik₁x} + c₂e^{ik₂x}。测量动量时，得到 ℏk₁ 的概率是 |c₁|²，得到 ℏk₂ 的概率是 |c₂|²，且总概率归一化。',
      '计算模平方：|ψ|² = |c₁|² + |c₂|² + 2Re(c₁*c₂ e^{i(k₂−k₁)x})。交叉项随 x 振荡，形成干涉条纹，也就是拍。',
      '拍长由 Δk = k₂−k₁ 决定：Λ = 2π/Δk。两波越接近，拍越长；要让波包在空间上局域，就必须让许多 k 靠得很近地叠加。',
      '单个动量本征态的 |ψ|² = |A|² 是常数，位置完全不确定；位置越确定，动量分布就必须越宽。这正是傅里叶变换下的不确定性。'
    ],
    formulas: [
      { math: raw`\psi(x) = c_1 e^{ik_1x} + c_2 e^{ik_2x}`, note: '两态叠加' },
      {
        math: raw`P(k_1) = |c_1|^2,\qquad P(k_2) = |c_2|^2,\qquad |c_1|^2 + |c_2|^2 = 1`,
        note: '概率由展开系数的模平方给出'
      },
      {
        math: raw`|\psi|^2 = 1 + 2|c_1c_2|\cos\!\left((k_2-k_1)x+\phi\right)`,
        note: '交叉项产生干涉 / 拍'
      },
      {
        math: raw`\Delta k = k_2-k_1,\qquad \Lambda_{\text{beat}} = \frac{2\pi}{\Delta k}`,
        note: '拍长与波数差成反比'
      },
      { math: raw`|\psi_k(x)|^2 = |A|^2 = \text{const}`, note: '单个本征态：位置完全不确定' }
    ],
    formulaCaption: 'c₁、c₂：复叠加系数　φ：相对相位　Λ：拍长',
    insight: '干涉不是两束波「撞」出来的，而是同一个态在不同动量成分之间的自我叠加。',
    annotation: { tag: 'SUPERPOSITION', text: '动量越集中，位置越弥散；拍长就是这种权衡的尺度', tone: 'mint' },
    duration: 22000
  },
  {
    id: 'experiment',
    nav: '实验',
    kicker: '06 · 交互实验',
    title: '转动 k 与振幅，看螺旋展开',
    lead: '下面把波数与振幅交给你：改变参数，观察螺旋、投影与叠加如何同步变化。',
    paragraphs: [
      '拖动 k 会改变波长与动量：螺旋更密，λ = 2π/k 更短，本征值 ℏk 更大。拖动 amp 则改变波的振幅。',
      '打开「实部 / 虚部投影」，可以在 x-y 平面看到余弦投影，在 x-z 平面看到正弦投影；复指数正是这两条实波的组合。',
      '相位随时间整体旋转，螺旋的形状却保持不变——这正是定态本征函数的稳定性：|ψ|² 与时间无关。'
    ],
    formulas: [
      { math: raw`\hat{p}_x\psi_k = \hbar k\,\psi_k`, note: '本征方程始终成立' },
      {
        math: raw`\psi_k(x,t) = A\,e^{i(kx-\omega t)},\qquad \omega = \frac{\hbar k^2}{2m}`,
        note: '加入时间相位 · 自由粒子色散'
      },
      { math: raw`|\psi_k(x,t)|^2 = |A|^2`, note: '定态：概率密度不随时间变化' }
    ],
    formulaCaption: 'k：波数　amp：可视振幅　ω：角频率（演示取 ℏ = m = 1）',
    insight: '先动 k，再看波长与本征值如何联动；最后打开投影，把复数拆成两条实波。',
    annotation: { tag: 'BOUNDARY', text: '螺旋的螺距就是波长，旋转的快慢就是相位', tone: 'amber' },
    duration: 0
  }
]

const lambdaOf = (k: number) => (2 * Math.PI) / Math.max(k, 1e-6)

export const momentumCourse: CourseDefinition = {
  id: 'momentum',
  scene: 'momentum',
  stageId: 'ANIMA · LESSON 009 / 量子力学',
  meta: momentumMeta,
  steps: momentumSteps,
  controls: [
    {
      key: 'k',
      label: '波数 k',
      min: 0.5,
      max: 4,
      step: 0.05,
      default: MOMENTUM_DEFAULT_K,
      format: (value) => value.toFixed(2)
    },
    {
      key: 'amp',
      label: '振幅 A',
      min: 0.5,
      max: 1.5,
      step: 0.05,
      default: MOMENTUM_DEFAULT_AMP,
      format: (value) => value.toFixed(2)
    }
  ],
  toggles: [
    {
      key: 'realImag',
      label: '实部 / 虚部投影',
      caption: '在 x-y 与 x-z 平面显示两条实波',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      return {
        tag: 'BOUNDARY',
        text: `k = ${params.k.toFixed(2)}，λ = ${lambdaOf(params.k).toFixed(2)}，本征值 p = ${params.k.toFixed(2)} ℏ`,
        tone: 'violet'
      }
    }
    return momentumSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '波数 k', value: (p) => p.k.toFixed(2) },
      { label: '动量 p = ℏk', value: (p) => `${p.k.toFixed(2)} ℏ` },
      { label: '波长 λ = 2π/k', value: (p) => lambdaOf(p.k).toFixed(2) },
      { label: '相速度 vₚ = ω/k', value: (p) => (p.k / 2).toFixed(2) }
    ],
    foot: {
      label: '能量 E = ℏω',
      value: (p) => `${((p.k * p.k) / 2).toFixed(2)} ℏ`
    }
  },
  liveFormula: (p) =>
    String.raw`\psi_k(x,t) = ${p.amp.toFixed(2)}\,e^{i\left(${p.k.toFixed(2)}x - ${((p.k * p.k) / 2).toFixed(2)}t\right)}`,
  stats: [
    { label: '本征值 pₓ', value: (p) => `${p.k.toFixed(2)} ℏ` },
    { label: '德布罗意波长 λ', value: (p) => lambdaOf(p.k).toFixed(2) },
    { label: '归一化长度 L', value: () => MOMENTUM_BOX.toFixed(2) }
  ],
  exploreTitle: '把波数与振幅交给你'
}
