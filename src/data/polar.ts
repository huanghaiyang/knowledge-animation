import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const POLAR_DEFAULT_R0 = 1.0
export const POLAR_DEFAULT_M = 2
export const POLAR_R_MAX = 3.2

const raw = String.raw

export const polarMeta: LessonMeta = {
  index: '011',
  title: '极坐标下的拉普拉斯算子',
  subtitle: '把二阶导数拆成径向、角向，以及它们的耦合。',
  field: '数学 · 坐标变换',
  duration: '约 13 分钟',
  year: '链式法则 · 极坐标'
}

export const polarSteps: LessonStep[] = [
  {
    id: 'coords',
    nav: '坐标',
    kicker: '00 · 坐标变换',
    title: '先把直角坐标换成极坐标',
    lead: '极坐标用两个数刻画平面：到原点的距离 r，以及与 x 轴正方向的夹角 θ。',
    paragraphs: [
      '正变换把 (r, θ) 送到 (x, y)：x = r cosθ，y = r sinθ。它把「多远、什么方向」翻译成「横多少、纵多少」。',
      '反变换把 (x, y) 送回去：r = √(x²+y²)，θ = arctan(y/x)，并要按象限修正角度。两个方向都需要，因为拉普拉斯算子原本活在直角坐标里。',
      '拉普拉斯算子写作 ∂²/∂x² + ∂²/∂y²。要在极坐标里使用它，就必须把 ∂/∂x、∂/∂y 用 ∂/∂r、∂/∂θ 表示。',
      '第一步是把反变换求偏导：r 对 x、y 的导数来自 √(x²+y²)，θ 对 x、y 的导数来自 arctan(y/x)。这四个结果就是后面所有链式法则的砖块。'
    ],
    formulas: [
      {
        math: raw`x = r\cos\theta,\qquad y = r\sin\theta`,
        note: '正变换：由极径与极角生成直角坐标'
      },
      {
        math: raw`r = \sqrt{x^2+y^2},\qquad \theta = \arctan\frac{y}{x}`,
        note: '反变换：由直角坐标还原极径与极角'
      },
      {
        math: raw`\frac{\partial r}{\partial x} = \frac{x}{r} = \cos\theta,\qquad \frac{\partial r}{\partial y} = \frac{y}{r} = \sin\theta`,
        note: '对 r = √(x²+y²) 求偏导'
      },
      {
        math: raw`\frac{\partial\theta}{\partial x} = -\frac{y}{r^2} = -\frac{\sin\theta}{r},\qquad \frac{\partial\theta}{\partial y} = \frac{x}{r^2} = \frac{\cos\theta}{r}`,
        note: '对 θ = arctan(y/x) 求偏导'
      }
    ],
    formulaCaption: 'r：极径　θ：极角　四个偏导是链式法则的起点',
    insight: '坐标变换不只是换字母，它会把导数也一起改写。',
    annotation: { tag: 'COORDINATES', text: 'x、y 与 r、θ 之间的双向映射', tone: 'mint' },
    duration: 22000
  },
  {
    id: 'first',
    nav: '一阶',
    kicker: '01 · 链式法则',
    title: '一阶导：两条路径相加',
    lead: 'f 对 x 的变化有两条来源：r 在变，θ 也在变。',
    paragraphs: [
      '设 f 是平面上的光滑函数，写成 f(r, θ)。当 x 变化时，r 与 θ 都随之变化，因此 f 的变化是两条路径的贡献之和。',
      '一元链式法则在这里升级为两项相加：∂f/∂x = (∂f/∂r)(∂r/∂x) + (∂f/∂θ)(∂θ/∂x)。',
      '把上一节的四个偏导代入，就得到作用在任何 f 上的算子恒等式：∂x = cosθ ∂r − (sinθ/r) ∂θ。右边不再含 x、y，只剩 r、θ。',
      '同理，∂y = sinθ ∂r + (cosθ/r) ∂θ。注意 θ 的系数是 1/r：越靠近原点，同样的角度变化对应的弧长越短，角向导数越剧烈。',
      '反过来也可以把 ∂r、∂θ 用 ∂x、∂y 表示，这正是梯度在极坐标下的两个分量。'
    ],
    formulas: [
      {
        math: raw`\frac{\partial f}{\partial x} = \frac{\partial f}{\partial r}\frac{\partial r}{\partial x} + \frac{\partial f}{\partial\theta}\frac{\partial\theta}{\partial x}`,
        note: '① 二维链式法则：两条路径相加'
      },
      {
        math: raw`\frac{\partial}{\partial x} = \cos\theta\,\frac{\partial}{\partial r} - \frac{\sin\theta}{r}\,\frac{\partial}{\partial\theta}`,
        note: '② 代入四个偏导，得到 x 方向算子'
      },
      {
        math: raw`\frac{\partial f}{\partial y} = \frac{\partial f}{\partial r}\frac{\partial r}{\partial y} + \frac{\partial f}{\partial\theta}\frac{\partial\theta}{\partial y}`,
        note: '③ 对 y 方向重复同一件事'
      },
      {
        math: raw`\frac{\partial}{\partial y} = \sin\theta\,\frac{\partial}{\partial r} + \frac{\cos\theta}{r}\,\frac{\partial}{\partial\theta}`,
        note: '④ 得到 y 方向算子'
      },
      {
        math: raw`\frac{\partial}{\partial r} = \cos\theta\,\frac{\partial}{\partial x} + \sin\theta\,\frac{\partial}{\partial y},\qquad \frac{\partial}{\partial\theta} = -r\sin\theta\,\frac{\partial}{\partial x} + r\cos\theta\,\frac{\partial}{\partial y}`,
        note: '⑤ 逆变换：由直角分量反解径向与角向'
      }
    ],
    formulaCaption: '同一条链式法则，对 x 与 y 各用一次',
    chips: [
      { label: '径向路径', tone: 'amber' },
      { label: '角向路径', tone: 'violet' },
      { label: '系数 1/r', tone: 'cyan' }
    ],
    insight: '角向导数前面的 1/r，是极坐标所有「额外项」的来源。',
    annotation: { tag: 'FIRST ORDER', text: '∂x 与 ∂y 被改写成 ∂r 与 ∂θ 的组合', tone: 'amber' },
    duration: 24000
  },
  {
    id: 'second',
    nav: '二阶',
    kicker: '02 · 乘积法则',
    title: '二阶导：对乘积再作用一次',
    lead: '∂x 里含有 r、θ 的函数系数，再作用一次时必须对整个乘积求导。',
    paragraphs: [
      '二阶导就是把一阶算子再作用一次。现在 ∂x = cosθ ∂r − (sinθ/r) ∂θ 中，cosθ 与 sinθ/r 都依赖 r、θ，所以不能只把 ∂r 换成 ∂x，必须对整个乘积用乘积法则。',
      '展开 ∂²x 会得到四项：两个系数各自求导，加上两个系数乘上 ∂x 再作用于 ∂r、∂θ。这一步没有任何捷径，四项一个都不能漏。',
      '两个系数的导数仍由链式法则给出：cosθ 对 x 的导数是 sin²θ/r；sinθ/r 对 x 的导数是 −2sinθcosθ/r²。',
      '再把 ∂x∂r 与 ∂x∂θ 逐项展开，代入后按 ∂r²、∂r、∂θ²、∂r∂θ、∂θ 五类合并，就得到 ∂²x 的完整表达式。'
    ],
    formulas: [
      {
        math: raw`\frac{\partial^2}{\partial x^2} = \frac{\partial}{\partial x}\left(\cos\theta\,\partial_r - \frac{\sin\theta}{r}\,\partial_\theta\right)`,
        note: '① 对一阶算子再作用一次'
      },
      {
        math: raw`\frac{\partial^2}{\partial x^2} = \left(\frac{\partial}{\partial x}\cos\theta\right)\partial_r + \cos\theta\,\frac{\partial}{\partial x}\partial_r - \left(\frac{\partial}{\partial x}\frac{\sin\theta}{r}\right)\partial_\theta - \frac{\sin\theta}{r}\,\frac{\partial}{\partial x}\partial_\theta`,
        note: '② 乘积法则展开为四项'
      },
      {
        math: raw`\frac{\partial}{\partial x}\cos\theta = \frac{\sin^2\theta}{r},\qquad \frac{\partial}{\partial x}\frac{\sin\theta}{r} = -\frac{2\sin\theta\cos\theta}{r^2}`,
        note: '③ 两个系数的导数仍靠链式法则'
      },
      {
        math: raw`\frac{\partial}{\partial x}\partial_r = \cos\theta\,\partial_r^2 - \frac{\sin\theta}{r}\,\partial_\theta\partial_r`,
        note: '④ 展开 ∂x∂r'
      },
      {
        math: raw`\frac{\partial}{\partial x}\partial_\theta = \cos\theta\,\partial_r\partial_\theta - \frac{\sin\theta}{r}\,\partial_\theta^2`,
        note: '⑤ 展开 ∂x∂θ'
      },
      {
        math: raw`\frac{\partial^2}{\partial x^2} = \cos^2\theta\,\partial_r^2 + \frac{\sin^2\theta}{r}\,\partial_r + \frac{\sin^2\theta}{r^2}\,\partial_\theta^2 - \frac{2\sin\theta\cos\theta}{r}\,\partial_r\partial_\theta + \frac{2\sin\theta\cos\theta}{r^2}\,\partial_\theta`,
        note: '⑥ 合并同类项后的完整结果'
      }
    ],
    formulaCaption: '先乘积法则，再链式展开，最后按导数类型合并',
    chips: [
      { label: '系数求导', tone: 'amber' },
      { label: '四项乘积', tone: 'cyan' },
      { label: '交叉项', tone: 'violet' }
    ],
    insight: '二阶导的难点不在求导，而在记住系数本身也要被求导。',
    annotation: { tag: 'SECOND ORDER', text: '乘积法则让系数也参与求导', tone: 'cyan' },
    duration: 26000
  },
  {
    id: 'compose',
    nav: '合成',
    kicker: '03 · 交叉项抵消',
    title: '把两块拼成拉普拉斯算子',
    lead: '∂²x 与 ∂²y 相加，所有交叉项都会成对消失。',
    paragraphs: [
      '对 y 方向重复同样的四步：乘积法则、系数求导、链式展开、合并同类项。∂²y 与 ∂²x 只差符号：交叉项 ∂r∂θ 取正，∂θ 项取负。',
      '把 ∂²x 与 ∂²y 相加，两个交叉项恰好互为相反数；两个 ∂θ 项也互为相反数，一起消失。这不是巧合，而是坐标系正交性的代数表现。',
      '剩下的只有 ∂r²、∂r、∂θ² 三块：∂²r 的系数是 cos²θ + sin²θ = 1，∂r 的系数是 (sin²θ + cos²θ)/r = 1/r，∂θ² 的系数是 1/r²。',
      '于是 Δ = ∂r² + (1/r)∂r + (1/r²)∂θ²。径向的 1/r 与角向的 1/r² 正是极坐标度量的痕迹。',
      '用尺度因子可以写同一件事：h_r = 1、h_θ = r。代入一般公式后展开，结果与逐项相加完全一致。'
    ],
    formulas: [
      {
        math: raw`\frac{\partial^2}{\partial y^2} = \left(\frac{\partial}{\partial y}\sin\theta\right)\partial_r + \sin\theta\,\frac{\partial}{\partial y}\partial_r + \left(\frac{\partial}{\partial y}\frac{\cos\theta}{r}\right)\partial_\theta + \frac{\cos\theta}{r}\,\frac{\partial}{\partial y}\partial_\theta`,
        note: '① y 方向同样用乘积法则'
      },
      {
        math: raw`\frac{\partial}{\partial y}\sin\theta = \frac{\cos^2\theta}{r},\qquad \frac{\partial}{\partial y}\frac{\cos\theta}{r} = -\frac{2\sin\theta\cos\theta}{r^2}`,
        note: '② 两个系数的导数'
      },
      {
        math: raw`\frac{\partial^2}{\partial y^2} = \sin^2\theta\,\partial_r^2 + \frac{\cos^2\theta}{r}\,\partial_r + \frac{\cos^2\theta}{r^2}\,\partial_\theta^2 + \frac{2\sin\theta\cos\theta}{r}\,\partial_r\partial_\theta - \frac{2\sin\theta\cos\theta}{r^2}\,\partial_\theta`,
        note: '③ 合并后与 ∂²x 只差符号'
      },
      {
        math: raw`\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} = \partial_r^2 + \frac{1}{r}\,\partial_r + \frac{1}{r^2}\,\partial_\theta^2`,
        note: '④ 交叉项与 ∂θ 项全部抵消'
      },
      {
        math: raw`\Delta f = \frac{1}{h_r h_\theta}\left[\partial_r\left(\frac{h_\theta}{h_r}\partial_r f\right) + \partial_\theta\left(\frac{h_r}{h_\theta}\partial_\theta f\right)\right]`,
        note: '⑤ 尺度因子 h_r = 1，h_θ = r'
      },
      {
        math: raw`\Delta f = \frac{1}{r}\left[\partial_r\left(r\,\partial_r f\right) + \partial_\theta\left(\frac{1}{r}\,\partial_\theta f\right)\right] = \partial_r^2 f + \frac{1}{r}\partial_r f + \frac{1}{r^2}\partial_\theta^2 f`,
        note: '⑥ 展开后与链式法则的结果一致'
      }
    ],
    formulaCaption: '两条路得到同一个算子，说明推导自洽',
    insight: '拉普拉斯算子在极坐标下没有交叉项，但多了两个度量修正。',
    annotation: { tag: 'COMPOSE', text: '交叉项成对抵消，只剩径向与角向', tone: 'violet' },
    duration: 26000
  },
  {
    id: 'example',
    nav: '例子',
    kicker: '04 · 调和函数',
    title: '用 ln r 与 rᵐ cos mθ 验算',
    lead: '把候选函数代进公式，是不是调和立刻见分晓。',
    paragraphs: [
      '判断一个函数是否调和，只要把它写成 r、θ，代入刚得到的算子。',
      'f = ln r 看起来不平凡，但 ∂r ln r = 1/r，∂r² ln r = −1/r²，两项刚好抵消，所以 Δ(ln r) = 0。',
      'f = r^n 给出 Δ = n² r^{n−2}；只有 n = 0 与 n = 1 时它才调和，对应常数与线性函数。',
      'f = r^m cos(mθ) 的径向与角向贡献逐项相消，因此对任意整数 m 都是调和函数，它也是分离变量解的基本砖块。',
      '令 u = R(r)Θ(θ) 代入 Δu = 0，乘以 r² 后得到欧拉方程 r²R″ + rR′ − m²R = 0，其解正是 r^m 与 r^{−m}。'
    ],
    formulas: [
      {
        math: raw`\Delta(\ln r) = -\frac{1}{r^2} + \frac{1}{r}\cdot\frac{1}{r} + 0 = 0`,
        note: 'ln r 在整个 r > 0 上调和'
      },
      {
        math: raw`\Delta(r^n) = n(n-1)r^{n-2} + \frac{1}{r}\cdot n r^{n-1} = n^2 r^{n-2}`,
        note: '幂函数的拉普拉斯仍是幂函数'
      },
      {
        math: raw`\Delta\left(r^m\cos m\theta\right) = \left[m(m-1) + m - m^2\right] r^{m-2}\cos m\theta = 0`,
        note: '三个系数相加恰好为零'
      },
      {
        math: raw`r^2 R'' + r R' - m^2 R = 0`,
        note: '分离变量得到的欧拉方程，解为 r^m 与 r^{-m}'
      }
    ],
    formulaCaption: '调和判定：Δf = 0　m 为整数时角向函数周期闭合',
    chips: [
      { label: 'ln r 调和', tone: 'mint' },
      { label: 'rⁿ 仅 n = 0, 1', tone: 'amber' },
      { label: 'rᵐ cos mθ 调和', tone: 'violet' }
    ],
    insight: '最像「极坐标产物」的函数，反而最容易满足 Δf = 0。',
    annotation: { tag: 'HARMONIC', text: 'ln r 与 rᵐ cos mθ 都是调和函数', tone: 'mint' },
    duration: 24000
  },
  {
    id: 'experiment',
    nav: '实验',
    kicker: '05 · 模型实验',
    title: '把半径与模式交给你',
    lead: '改变观察半径与角向模式，观察尺度因子与高度场如何重排。',
    paragraphs: [
      '把观察半径 r₀ 与角向模式 m 交给你。r₀ 控制探针位置，也直接决定尺度因子 h_θ = r₀。',
      'm 控制平面上的函数 f = r^m cos(mθ)：m = 0 是常数，m 增大时花瓣变多、起伏变密。',
      '下方读数同步给出 Δ(r^m) = m² r^{m−2} 的数值，以及调和判定与当前模式。试着让 m 改变，看看极坐标网格上的高度场如何重排。'
    ],
    formulas: [
      {
        math: raw`\Delta\left(r^m\right) = m^2 r^{m-2}`,
        note: '实时读数采用这个非调和示例'
      },
      {
        math: raw`\Delta\left(r^m\cos m\theta\right) = 0`,
        note: '无论 m 取何值，角向模式始终调和'
      },
      {
        math: raw`\Delta f = \partial_r^2 f + \frac{1}{r}\partial_r f + \frac{1}{r^2}\partial_\theta^2 f`,
        note: '实验的实时公式'
      }
    ],
    formulaCaption: 'r₀：观察半径　m：角向模式',
    insight: '先动 m 看花瓣数量，再动 r₀ 看同一处的 Δ 值如何缩放。',
    annotation: { tag: 'BOUNDARY', text: '尺度因子随半径线性变化', tone: 'violet' },
    duration: 0
  }
]

const fmt = (value: number, digits = 2) => value.toFixed(digits)

export const polarCourse: CourseDefinition = {
  id: 'polar',
  scene: 'polar',
  stageId: 'ANIMA · LESSON 011 / 数学',
  meta: polarMeta,
  steps: polarSteps,
  controls: [
    {
      key: 'r0',
      label: '观察半径 r₀',
      min: 0.2,
      max: 2.5,
      step: 0.05,
      default: POLAR_DEFAULT_R0,
      format: (value) => fmt(value)
    },
    {
      key: 'm',
      label: '角向模式 m',
      min: 0,
      max: 4,
      step: 1,
      default: POLAR_DEFAULT_M,
      format: (value) => `${Math.round(value)}`
    }
  ],
  toggles: [
    {
      key: 'showGrid',
      label: '显示极坐标网格',
      caption: '同心圆与辐射线构成参考系',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      const m = Math.round(params.m)
      return {
        tag: 'BOUNDARY',
        text: `r₀ = ${fmt(params.r0)}，h_θ = ${fmt(params.r0)}，Δ(r^${m}) = ${fmt(m * m * Math.pow(params.r0, m - 2))}`,
        tone: 'violet'
      }
    }
    return polarSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '半径 r', value: (p) => fmt(p.r0) },
      { label: '极角 θ', value: () => '45°' },
      { label: '尺度因子 h_θ', value: (p) => fmt(p.r0) },
      {
        label: 'Δ(rᵐ) 示例',
        value: (p) => fmt(p.m * p.m * Math.pow(p.r0, p.m - 2))
      }
    ],
    foot: {
      label: 'Δ(ln r)',
      value: () => '0 · 调和'
    }
  },
  liveFormula: (p) => {
    const m = Math.round(p.m)
    return raw`\Delta\left(r^{${m}}\right) = ${m * m}\,r^{${m - 2}},\qquad r = ${fmt(p.r0)}`
  },
  stats: [
    {
      label: 'Δ(rᵐ) 数值',
      value: (p) => fmt(p.m * p.m * Math.pow(p.r0, p.m - 2))
    },
    {
      label: '调和判定',
      value: () => 'Δf = 0 · 是'
    },
    {
      label: '角向模式 m',
      value: (p) => `${Math.round(p.m)}`
    }
  ],
  exploreTitle: '把观察半径与角向模式交给你'
}
