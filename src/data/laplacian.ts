import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const LAPLACIAN_DEFAULT_AMP = 1
export const LAPLACIAN_DEFAULT_K = 1.4

const raw = String.raw

export const laplacianMeta: LessonMeta = {
  index: '010',
  title: '拉普拉斯算子',
  subtitle: '二阶导数如何长成散度与梯度。',
  field: '数学 · 偏微分方程',
  duration: '约 12 分钟',
  year: '1785 · 拉普拉斯',
  author: 'Pierre-Simon Laplace'
}

export const laplacianSteps: LessonStep[] = [
  {
    id: 'second',
    nav: '二阶导数',
    kicker: '01 · 一维曲率',
    title: '先看一条曲线弯得多厉害',
    lead: '一维的拉普拉斯就是二阶导数：它不问斜率多大，只问斜率变化得多快。',
    paragraphs: [
      '函数 f 的一阶导数给出每一点的斜率，二阶导数给出斜率本身的变化率。曲线在哪里向上弯、哪里向下弯，都由二阶导数的符号决定。',
      '二阶导数不是凭空定义，而是差商的极限：先算一阶差商，再对差商取差商，就得到中心差分公式。',
      '中心差分 [f(x+h) − 2f(x) + f(x−h)]/h² 用左右两个邻居估计弯曲程度；把 h 缩小时，误差以 h² 的速度消失。',
      '符号决定凹凸：f″ > 0 时曲线凹向上，f″ < 0 时凹向下，f″ = 0 处可能是拐点。拉普拉斯算子在一维做的就是这件事。'
    ],
    formulas: [
      { math: raw`\Delta f = \frac{d^2 f}{dx^2}`, note: '一维拉普拉斯算子' },
      {
        math: raw`f''(x) = \lim_{h\to0}\frac{f(x+h)-2f(x)+f(x-h)}{h^2}`,
        note: '二阶导数的中心差商定义'
      },
      {
        math: raw`f''(x) \approx \frac{f(x+h)-2f(x)+f(x-h)}{h^2} + \mathcal{O}(h^2)`,
        note: '离散近似 · 二阶精度'
      },
      {
        math: raw`f''(x) > 0 \;\Rightarrow\; \text{convex up},\qquad f''(x) < 0 \;\Rightarrow\; \text{convex down}`,
        note: '二阶导数的符号给出凹凸方向'
      }
    ],
    formulaCaption: 'h：采样步长　O(h²)：截断误差量级',
    chips: [
      { label: '二阶导 = 曲率', tone: 'mint' },
      { label: 'f″ > 0 凹向上', tone: 'cyan' },
      { label: 'f″ 变号 → 拐点', tone: 'violet' }
    ],
    insight: '拉普拉斯算子不测量高度，只测量「比邻居高还是低」。',
    annotation: { tag: 'CURVATURE', text: '一维的 Δf 就是 f″，符号决定凹凸', tone: 'mint' },
    duration: 20000
  },
  {
    id: 'divgrad',
    nav: '散度与梯度',
    kicker: '02 · 两个算子',
    title: 'Δ 是梯度的散度',
    lead: '梯度把标量场变成箭头，散度再把这些箭头收拢成一个数。',
    paragraphs: [
      '梯度 ∇f 指向 f 增长最快的方向，它的长度是那个方向上的最大变化率。把标量场变成向量场，这是第一步。',
      '散度 ∇·F 度量向量场在一点向外发散的程度：取一个很小的盒子，看净流出量除以体积。',
      '把 F = ∇f 代回散度定义，就得到 Δf = ∇·(∇f)：先取梯度，再取散度，两步合起来就是拉普拉斯算子。',
      '在直角坐标中逐项展开：x 方向对 ∂f/∂x 再求一次 ∂/∂x，y、z 方向同理。三项相加，正是三个纯二阶偏导之和。'
    ],
    formulas: [
      {
        math: raw`\nabla f = \left(\frac{\partial f}{\partial x},\,\frac{\partial f}{\partial y},\,\frac{\partial f}{\partial z}\right)`,
        note: '梯度：标量场 → 向量场'
      },
      {
        math: raw`\nabla\cdot F = \frac{\partial F_x}{\partial x}+\frac{\partial F_y}{\partial y}+\frac{\partial F_z}{\partial z}`,
        note: '散度：向量场的净流出密度'
      },
      { math: raw`\Delta f = \nabla\cdot(\nabla f)`, note: '拉普拉斯 = 梯度的散度' },
      {
        math: raw`\Delta f = \frac{\partial}{\partial x}\!\left(\frac{\partial f}{\partial x}\right)+\frac{\partial}{\partial y}\!\left(\frac{\partial f}{\partial y}\right)+\frac{\partial}{\partial z}\!\left(\frac{\partial f}{\partial z}\right)`,
        note: '逐项展开 · 复合算子'
      },
      {
        math: raw`\Delta = \nabla\cdot\nabla = \frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}+\frac{\partial^2}{\partial z^2}`,
        note: '直角坐标下的拉普拉斯算子'
      }
    ],
    formulaCaption: '∇：梯度 / 散度算符　F：向量场',
    insight: 'Δ 是「二阶」的，因为它把「变化」又求了一次「变化」。',
    annotation: { tag: 'DIVERGENCE', text: '先 ∇ 再 ∇·，两个一阶算子合起来就是二阶的 Δ', tone: 'cyan' },
    duration: 22000
  },
  {
    id: 'cartesian',
    nav: '直角坐标',
    kicker: '03 · 逐项展开',
    title: '把符号拆成可计算的式子',
    lead: '在直角坐标里，三个方向彼此独立，拉普拉斯算子就是三个二阶偏导相加。',
    paragraphs: [
      '直角坐标的基向量方向不变，所以 Δ 作用在 f 上不会产生混合偏导，也不会冒出一阶项。',
      '换成极坐标或球坐标后，基向量随位置转动，展开式会出现度量因子与一阶导数项；但 Δf = ∇·∇f 的结构始终不变。',
      '取 f = x² + y² + z²。分别求三次二阶偏导都得到 2，三项相加得到 Δf = 6，与坐标位置无关。',
      '同一例子里 ∇f = 2(x, y, z)，再求散度得到 2 + 2 + 2 = 6，正好验证 Δf = ∇·∇f。',
      '另一个重要例子是 f = 1/r：在原点以外，三项二阶偏导恰好互相抵消，得到 Δf = 0。'
    ],
    formulas: [
      {
        math: raw`\Delta f = \frac{\partial^2 f}{\partial x^2}+\frac{\partial^2 f}{\partial y^2}+\frac{\partial^2 f}{\partial z^2}`,
        note: '直角坐标展开式'
      },
      { math: raw`f = x^2+y^2+z^2`, note: '取一个二次型例子' },
      { math: raw`\nabla f = 2(x,\,y,\,z)`, note: '先求梯度' },
      { math: raw`\Delta f = 2+2+2 = 6`, note: '再求散度 · 与位置无关' },
      { math: raw`\Delta\!\left(\frac{1}{r}\right) = 0 \qquad (r\neq0)`, note: '原点外的重要调和例子' }
    ],
    formulaCaption: 'r = √(x² + y² + z²)　原点处 1/r 奇异，需单独处理',
    chips: [
      { label: '三项相加', tone: 'mint' },
      { label: '无混合偏导', tone: 'cyan' },
      { label: 'Δ(1/r) = 0', tone: 'violet' }
    ],
    insight: '坐标选择改变展开式，但不改变 Δ = ∇·∇ 这个几何事实。',
    annotation: { tag: 'CARTESIAN', text: 'f = x²+y²+z² 给出 Δf = 6，验证逐项展开', tone: 'violet' },
    duration: 24000
  },
  {
    id: 'mean',
    nav: '物理意义',
    kicker: '04 · 均值定理',
    title: '一点的值，与邻居的平均差多少',
    lead: '拉普拉斯算子的核心图像：它衡量一点比周围平均值高多少，或低多少。',
    paragraphs: [
      '把 f 在以 r 为中心的球面上做泰勒展开。一阶项 s·∇f 在球面上正负对称，积分后消失；奇数次项都消失，只剩偶数阶项。',
      '二阶项积分后给出 (r²/6)Δf（三维；一维系数是 1/2，二维是 1/4）。所以球面平均值等于中心值加上一个正比于 Δf 的修正。',
      '移项取极限得到 Δf = lim 6(⟨f⟩ − f)/r²。若 Δf > 0，中心低于邻域平均，像一个「坑」，热方程会把它填高。',
      '热方程 ∂t u = αΔu 正是这条图像的动力学版本：Δu > 0 处温度上升，Δu < 0 处温度下降，热量从高处流向低处。',
      '波动方程、拉普拉斯方程与泊松方程都围绕 Δ 展开：前者含时间二阶导，后两者描述平衡态与源。'
    ],
    formulas: [
      {
        math: raw`f(\mathbf{r}+\mathbf{s}) = f(\mathbf{r})+\mathbf{s}\cdot\nabla f+\frac{1}{2}s_i s_j\,\partial_i\partial_j f+\cdots`,
        note: '球面邻域内的泰勒展开'
      },
      {
        math: raw`\langle f\rangle_{\partial B_r} = \frac{1}{4\pi r^2}\oint_{\partial B_r} f\,dS`,
        note: '球面平均值'
      },
      {
        math: raw`\langle f\rangle = f + \frac{r^2}{6}\,\Delta f + \mathcal{O}(r^4)`,
        note: '均值定理：偏差正比于 Δf·r²'
      },
      {
        math: raw`\Delta f = \lim_{r\to0}\frac{6\left(\langle f\rangle-f\right)}{r^2}`,
        note: '拉普拉斯 = 与邻域平均的偏差率'
      },
      { math: raw`\partial_t u = \alpha\,\Delta u`, note: '热方程：扩散由 Δu 驱动' },
      { math: raw`\partial_t^2 u = c^2\,\Delta u`, note: '波动方程：Δu 提供空间曲率' }
    ],
    formulaCaption: '⟨f⟩：球面平均　α：热扩散系数',
    insight: 'Δf 为正，说明这一点比周围「空」，周围的量会流进来。',
    annotation: { tag: 'MEAN VALUE', text: 'Δf 度量中心值与邻域平均的差，热方程据此演化', tone: 'amber' },
    duration: 23000
  },
  {
    id: 'harmonic',
    nav: '调和函数',
    kicker: '05 · Δf = 0',
    title: '没有源，也没有汇',
    lead: '当 Δf = 0 时，每一点都恰好等于邻域平均，函数没有任何局部的凸起或凹陷。',
    paragraphs: [
      '满足 Δf = 0 的函数称为调和函数，它满足拉普拉斯方程。均值定理此时变成严格等式：球面平均值等于中心值。',
      '三维的 f = 1/r 在原点以外是调和函数。直接计算三个二阶偏导，交叉项符号相反，恰好互相抵消。',
      '调和函数由边界值唯一确定，这就是狄利克雷问题；极值原理还告诉我们，最大值和最小值只能出现在边界上。',
      '一维只有线性函数调和；二维有 ln r、x + iy 的实部与虚部等，它们构成复分析调和理论的起点。',
      '在无源的稳态热传导中，温度分布就是调和函数；没有内部热源，也就没有局部的最高温或最低温。'
    ],
    formulas: [
      { math: raw`\Delta f = 0`, note: '调和函数定义 · 拉普拉斯方程' },
      { math: raw`f(\mathbf{r}) = \frac{1}{r},\qquad \Delta\!\left(\frac{1}{r}\right) = 0\quad(r\neq0)`, note: '经典三维调和函数' },
      {
        math: raw`\frac{\partial^2}{\partial x^2}\frac{1}{r}+\frac{\partial^2}{\partial y^2}\frac{1}{r}+\frac{\partial^2}{\partial z^2}\frac{1}{r} = 0`,
        note: '三项二阶偏导逐项抵消'
      },
      {
        math: raw`\Delta f = 0 \;\Rightarrow\; f(\mathbf{r}) = \mathbf{a}\cdot\mathbf{r}+b \quad (\text{1D})`,
        note: '一维调和函数只能是线性函数'
      },
      { math: raw`\Delta u = -\rho \quad (\text{Poisson})`, note: '有源时推广为泊松方程' }
    ],
    formulaCaption: 'ρ：源密度　无源时 ρ = 0 退化为拉普拉斯方程',
    chips: [
      { label: 'Δf = 0', tone: 'mint' },
      { label: '等于邻域平均', tone: 'cyan' },
      { label: '极值只在边界', tone: 'violet' }
    ],
    insight: '调和函数没有「内部山头」：任何一点都只是邻居的平静平均。',
    annotation: { tag: 'HARMONIC', text: 'Δf = 0：中心值等于球面平均，内部没有极值', tone: 'mint' },
    duration: 21000
  },
  {
    id: 'experiment',
    nav: '实验',
    kicker: '06 · 交互实验',
    title: '拖动探针，看曲率变号',
    lead: '下面把振幅与波数交给你：探针沿曲线移动，切线、二阶差分与曲率圆会同步更新。',
    paragraphs: [
      '拖动 k 改变波长，拖动 amp 改变起伏高度。曲线颜色按曲率符号分开：mint 表示 f″ > 0，amber 表示 f″ < 0。',
      '打开「二阶差分 / 曲率」，可以看到三个采样点、连接它们的弦，以及曲率圆如何随探针滚动。',
      '用公式核对：取 f = A sin(kx)，则 Δf = −A k² sin(kx)；振幅随 k² 增长，波长 λ = 2π/k 随 k 缩短。'
    ],
    formulas: [
      { math: raw`f(x) = A\sin(kx)`, note: '实验使用的光滑曲线' },
      { math: raw`\Delta f = -A k^2\sin(kx)`, note: '二阶导数随 k² 放大' },
      { math: raw`\Delta f = \nabla\cdot\nabla f`, note: '高维形式仍然成立' },
      { math: raw`\partial_t u = \alpha\,\Delta u`, note: '拉普拉斯在热方程中的角色' }
    ],
    formulaCaption: 'A：振幅　k：波数　λ = 2π/k',
    insight: '先动 k，看 Δf 如何按 k² 增长；再动探针，找到曲率变号的位置。',
    annotation: { tag: 'BOUNDARY', text: 'mint 正曲率 · amber 负曲率，探针处曲率圆随斜率滚动', tone: 'violet' },
    duration: 0
  }
]

const lambdaOf = (k: number) => (2 * Math.PI) / Math.max(k, 1e-6)
const amplitudeOf = (amp: number, k: number) => amp * k * k

export const laplacianCourse: CourseDefinition = {
  id: 'laplacian',
  scene: 'laplacian',
  stageId: 'ANIMA · LESSON 010 / 数学',
  meta: laplacianMeta,
  steps: laplacianSteps,
  controls: [
    {
      key: 'amp',
      label: '振幅 A',
      min: 0.5,
      max: 2,
      step: 0.05,
      default: LAPLACIAN_DEFAULT_AMP,
      format: (value) => value.toFixed(2)
    },
    {
      key: 'k',
      label: '波数 k',
      min: 0.5,
      max: 3,
      step: 0.05,
      default: LAPLACIAN_DEFAULT_K,
      format: (value) => value.toFixed(2)
    }
  ],
  toggles: [
    {
      key: 'showSecond',
      label: '显示二阶差分 / 曲率',
      caption: '叠加差分三角形、曲率圆与 Δf 直方条',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      return {
        tag: 'BOUNDARY',
        text: `A = ${params.amp.toFixed(2)}，k = ${params.k.toFixed(2)}，Δf 峰值 = ${amplitudeOf(params.amp, params.k).toFixed(2)}`,
        tone: 'violet'
      }
    }
    return laplacianSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '波数 k', value: (p) => p.k.toFixed(2) },
      { label: 'Δf 峰值', value: (p) => amplitudeOf(p.amp, p.k).toFixed(2) },
      { label: '曲率符号 f″', value: () => '正负交替' },
      { label: '波长 λ = 2π/k', value: (p) => lambdaOf(p.k).toFixed(2) }
    ],
    foot: {
      label: '球平均偏差 Δf·r²/6',
      value: (p) => (amplitudeOf(p.amp, p.k) * 0.36 / 6).toFixed(2)
    }
  },
  liveFormula: (p) =>
    String.raw`f(x)=${p.amp.toFixed(2)}\sin(${p.k.toFixed(2)}x),\quad \Delta f=-${amplitudeOf(p.amp, p.k).toFixed(2)}\sin(${p.k.toFixed(2)}x)`,
  stats: [
    { label: '二阶导幅值', value: (p) => amplitudeOf(p.amp, p.k).toFixed(2) },
    { label: 'Δf', value: (p) => `−${amplitudeOf(p.amp, p.k).toFixed(2)} sin(kx)` },
    { label: '是否调和', value: () => '否 · Δf ≠ 0' }
  ],
  exploreTitle: '把振幅与波数交给你'
}
