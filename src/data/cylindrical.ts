import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export const CYL_DEFAULT_RADIUS = 1.6
export const CYL_DEFAULT_MODE = 1
export const CYL_DEFAULT_HEIGHT = 0.5
export const CYL_HALF_HEIGHT = 1.6

const raw = String.raw

export const cylindricalMeta: LessonMeta = {
  index: '012',
  title: '柱坐标下的拉普拉斯算子',
  subtitle: '在极坐标的平面上再长出一个 z 方向。',
  field: '数学 · 坐标变换',
  duration: '约 13 分钟',
  year: '度量系数 · 柱坐标'
}

export const cylindricalSteps: LessonStep[] = [
  {
    id: 'coords',
    nav: '坐标',
    kicker: '00 · 柱坐标',
    title: '把平面极坐标沿 z 轴拉起来',
    lead: '柱坐标保留极坐标的 r 与 φ，只把高度 z 原样接上。',
    paragraphs: [
      '柱坐标用三个数刻画空间中的点：r 是到 z 轴的距离，φ 是绕 z 轴的方位角，z 是高度。',
      '正变换把 (r, φ, z) 送到 (x, y, z)：x = r cosφ，y = r sinφ，z = z。它在 xy 平面上做极坐标变换，z 方向完全不动。',
      '反变换把 (x, y, z) 送回去：r = √(x²+y²)，φ = arctan(y/x)，z = z。φ 同样要按象限修正。',
      '对正变换求微分：dx = cosφ dr − r sinφ dφ，dy = sinφ dr + r cosφ dφ，dz = dz。把三个微分平方相加，就得到柱坐标的线元。'
    ],
    formulas: [
      {
        math: raw`x = r\cos\phi,\qquad y = r\sin\phi,\qquad z = z`,
        note: '柱坐标的正变换'
      },
      {
        math: raw`r = \sqrt{x^2+y^2},\qquad \phi = \arctan\frac{y}{x},\qquad z = z`,
        note: '反变换：平面部分与极坐标完全相同'
      },
      {
        math: raw`dx = \cos\phi\,dr - r\sin\phi\,d\phi,\qquad dy = \sin\phi\,dr + r\cos\phi\,d\phi,\qquad dz = dz`,
        note: '对正变换逐项求微分'
      },
      {
        math: raw`ds^2 = dx^2 + dy^2 + dz^2 = dr^2 + r^2\,d\phi^2 + dz^2`,
        note: '交叉项 dr dφ 在平方相加时抵消'
      },
      {
        math: raw`h_r = 1,\qquad h_\phi = r,\qquad h_z = 1`,
        note: '三个方向的尺度因子'
      }
    ],
    formulaCaption: 'h_r：径向尺度　h_φ：角向尺度　h_z：轴向尺度',
    insight: '柱坐标不是新东西，它只是把极坐标沿 z 方向平移了一层。',
    annotation: { tag: 'COORDINATES', text: 'xy 平面极坐标 + 独立的 z', tone: 'mint' },
    duration: 22000
  },
  {
    id: 'metric',
    nav: '度量',
    kicker: '01 · 尺度因子',
    title: 'h_φ = r：角向的一弧度有多长',
    lead: '尺度因子决定了拉普拉斯算子里的每一个系数。',
    paragraphs: [
      '在正交坐标里，h_i = ds/dq_i 表示坐标增加一个单位时实际走过的长度。径向走 1 个单位就是 1，所以 h_r = 1。',
      '角向走 1 弧度，实际弧长是半径 r，所以 h_φ = r。轴向走 1 个单位就是 1，所以 h_z = 1。',
      '梯度在正交坐标下写作 (1/h_r)∂r u e_r + (1/h_φ)∂φ u e_φ + (1/h_z)∂z u e_z，于是角向分量自然带上 1/r。',
      '拉普拉斯算子是梯度的散度。对正交坐标使用统一公式，分母出现 h_r h_φ h_z = r，分子里每个方向都要先乘上另外两个尺度因子再求导。',
      '把 h_r = 1、h_φ = r、h_z = 1 代入，立刻得到 (1/r)∂r(r∂r u) + (1/r²)∂φ²u + ∂z²u。下一节会用链式法则独立验证它。'
    ],
    formulas: [
      {
        math: raw`\nabla u = \partial_r u\,e_r + \frac{1}{r}\,\partial_\phi u\,e_\phi + \partial_z u\,e_z`,
        note: '① 梯度：每项除以对应尺度因子'
      },
      {
        math: raw`\Delta u = \frac{1}{h_r h_\phi h_z}\left[\partial_r\left(\frac{h_\phi h_z}{h_r}\partial_r u\right) + \partial_\phi\left(\frac{h_r h_z}{h_\phi}\partial_\phi u\right) + \partial_z\left(\frac{h_r h_\phi}{h_z}\partial_z u\right)\right]`,
        note: '② 正交坐标下的通用拉普拉斯公式'
      },
      {
        math: raw`\Delta u = \frac{1}{r}\,\partial_r\left(r\,\partial_r u\right) + \frac{1}{r^2}\,\partial_\phi^2 u + \partial_z^2 u`,
        note: '③ 代入 h_r = 1，h_φ = r，h_z = 1'
      },
      {
        math: raw`\Delta u = \partial_r^2 u + \frac{1}{r}\,\partial_r u + \frac{1}{r^2}\,\partial_\phi^2 u + \partial_z^2 u`,
        note: '④ 展开括号，前三项与极坐标一致'
      },
      {
        math: raw`dV = h_r h_\phi h_z\,dr\,d\phi\,dz = r\,dr\,d\phi\,dz`,
        note: '⑤ 体积元也被同一个 r 加权'
      }
    ],
    formulaCaption: '同一个尺度因子 h_φ = r，同时出现在梯度、散度与体积元里',
    chips: [
      { label: 'h_r = 1', tone: 'amber' },
      { label: 'h_φ = r', tone: 'violet' },
      { label: 'h_z = 1', tone: 'mint' }
    ],
    insight: '记住 h_φ = r，柱坐标的公式就不需要死背。',
    annotation: { tag: 'METRIC', text: '尺度因子把坐标变化换算成真实长度', tone: 'amber' },
    duration: 23000
  },
  {
    id: 'first',
    nav: '一阶',
    kicker: '02 · 链式法则',
    title: '一阶导：z 方向完全独立',
    lead: 'xy 方向的链式法则与极坐标一样，z 方向直接保持不变。',
    paragraphs: [
      '设 u 是空间中的光滑函数。写成 u(r, φ, z) 后，u 对 x 的变化仍来自 r 与 φ 两条路径。',
      '∂u/∂x = (∂u/∂r)(∂r/∂x) + (∂u/∂φ)(∂φ/∂x)。因为 z 不随 x 变化，z 路径的贡献为零。',
      'r、φ 对 x、y 的偏导与极坐标完全相同：∂r/∂x = cosφ，∂r/∂y = sinφ，∂φ/∂x = −sinφ/r，∂φ/∂y = cosφ/r。',
      '把四个偏导代入，得到 ∂x = cosφ ∂r − (sinφ/r) ∂φ，∂y = sinφ ∂r + (cosφ/r) ∂φ。',
      'z 方向没有任何混合：∂z = ∂z，因为 z 同时是直角坐标与柱坐标的第三个变量。'
    ],
    formulas: [
      {
        math: raw`\frac{\partial r}{\partial x} = \cos\phi,\qquad \frac{\partial r}{\partial y} = \sin\phi`,
        note: '① 径向偏导与极坐标相同'
      },
      {
        math: raw`\frac{\partial\phi}{\partial x} = -\frac{\sin\phi}{r},\qquad \frac{\partial\phi}{\partial y} = \frac{\cos\phi}{r}`,
        note: '② 角向偏导同样带上 1/r'
      },
      {
        math: raw`\frac{\partial}{\partial x} = \cos\phi\,\frac{\partial}{\partial r} - \frac{\sin\phi}{r}\,\frac{\partial}{\partial\phi}`,
        note: '③ x 方向的两条路径相加'
      },
      {
        math: raw`\frac{\partial}{\partial y} = \sin\phi\,\frac{\partial}{\partial r} + \frac{\cos\phi}{r}\,\frac{\partial}{\partial\phi}`,
        note: '④ y 方向同理'
      },
      {
        math: raw`\frac{\partial}{\partial z} = \frac{\partial}{\partial z}`,
        note: '⑤ z 方向不参与坐标混合'
      }
    ],
    formulaCaption: 'xy 平面内是二维链式法则，z 方向是恒等映射',
    chips: [
      { label: '∂x 含两项', tone: 'amber' },
      { label: '∂y 含两项', tone: 'violet' },
      { label: '∂z 不变', tone: 'mint' }
    ],
    insight: '柱坐标的难点只集中在 xy 平面，z 方向可以最后单独补上。',
    annotation: { tag: 'FIRST ORDER', text: 'z 的导数原样保留，其余照搬极坐标', tone: 'amber' },
    duration: 24000
  },
  {
    id: 'compose',
    nav: '合成',
    kicker: '03 · 二阶相加',
    title: '∂²x + ∂²y 再补上 ∂²z',
    lead: '平面对称性让交叉项再次抵消，z 方向只是多加一项。',
    paragraphs: [
      '二阶导仍要处理一阶算子里的函数系数。∂x = cosφ ∂r − (sinφ/r) ∂φ 中的两个系数都依赖 r、φ，因此必须对整个乘积用乘积法则。',
      '展开 ∂²x 得四项：两个系数各自求导，加上两个系数乘上 ∂x 再作用一次。系数导数仍是 cosφ 对 x 求导得 sin²φ/r，sinφ/r 对 x 求导得 −2sinφcosφ/r²。',
      '把 ∂x∂r 与 ∂x∂φ 展开后按类型合并，得到 ∂²x。对 y 方向重复同样四步，得到 ∂²y，两者只差交叉项的符号。',
      '相加时，交叉项 −2sinφcosφ/r 与 +2sinφcosφ/r 抵消，∂φ 项也抵消，剩下 ∂r² + (1/r)∂r + (1/r²)∂φ²。',
      'z 方向没有混合项，∂²z 直接保持。于是 Δ = ∂r² + (1/r)∂r + (1/r²)∂φ² + ∂²z，正好是极坐标结果再加一个轴向项。'
    ],
    formulas: [
      {
        math: raw`\frac{\partial^2}{\partial x^2} = \left(\frac{\partial}{\partial x}\cos\phi\right)\partial_r + \cos\phi\,\frac{\partial}{\partial x}\partial_r - \left(\frac{\partial}{\partial x}\frac{\sin\phi}{r}\right)\partial_\phi - \frac{\sin\phi}{r}\,\frac{\partial}{\partial x}\partial_\phi`,
        note: '① ∂²x 的乘积法则四项'
      },
      {
        math: raw`\frac{\partial}{\partial x}\cos\phi = \frac{\sin^2\phi}{r},\qquad \frac{\partial}{\partial x}\frac{\sin\phi}{r} = -\frac{2\sin\phi\cos\phi}{r^2}`,
        note: '② 两个系数的导数'
      },
      {
        math: raw`\frac{\partial^2}{\partial x^2} = \cos^2\phi\,\partial_r^2 + \frac{\sin^2\phi}{r}\,\partial_r + \frac{\sin^2\phi}{r^2}\,\partial_\phi^2 - \frac{2\sin\phi\cos\phi}{r}\,\partial_r\partial_\phi + \frac{2\sin\phi\cos\phi}{r^2}\,\partial_\phi`,
        note: '③ 合并同类项得到 ∂²x'
      },
      {
        math: raw`\frac{\partial^2}{\partial y^2} = \sin^2\phi\,\partial_r^2 + \frac{\cos^2\phi}{r}\,\partial_r + \frac{\cos^2\phi}{r^2}\,\partial_\phi^2 + \frac{2\sin\phi\cos\phi}{r}\,\partial_r\partial_\phi - \frac{2\sin\phi\cos\phi}{r^2}\,\partial_\phi`,
        note: '④ ∂²y 与 ∂²x 只差符号'
      },
      {
        math: raw`\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} = \partial_r^2 + \frac{1}{r}\,\partial_r + \frac{1}{r^2}\,\partial_\phi^2`,
        note: '⑤ 交叉项与 ∂φ 项成对抵消'
      },
      {
        math: raw`\Delta = \partial_r^2 + \frac{1}{r}\,\partial_r + \frac{1}{r^2}\,\partial_\phi^2 + \partial_z^2`,
        note: '⑥ 补上独立的 ∂²z'
      },
      {
        math: raw`\Delta_{\mathrm{cyl}} = \Delta_{\mathrm{polar}} + \partial_z^2`,
        note: '⑦ 柱坐标算子 = 极坐标算子 + 轴向二阶导'
      }
    ],
    formulaCaption: '先处理 xy 平面的耦合，再把 z 方向直接相加',
    chips: [
      { label: '交叉项抵消', tone: 'cyan' },
      { label: '平面部分', tone: 'violet' },
      { label: '轴向独立', tone: 'mint' }
    ],
    insight: '柱坐标不是另起炉灶，它是极坐标结果的一次直接扩展。',
    annotation: { tag: 'COMPOSE', text: 'xy 平面复用极坐标，z 方向单独相加', tone: 'violet' },
    duration: 26000
  },
  {
    id: 'separation',
    nav: '分离变量',
    kicker: '04 · Bessel 方程',
    title: '让三个方向各自满足一个常微分方程',
    lead: '把解写成 R(r)Φ(φ)Z(z)，拉普拉斯方程会拆成三条独立的方程。',
    paragraphs: [
      '设 u = R(r)Φ(φ)Z(z)。代入 Δu = 0，每一项都含有乘积 u，可以整体除以 u。',
      '除以 u 后得到 R″/R + (1/r)R′/R + (1/r²)Φ″/Φ + Z″/Z = 0。再乘以 r²，把只含 φ 与只含 z 的项分离出来。',
      '由于 φ 方向要求周期解，Φ″/Φ 必须是负常数 −m²；于是 Φ″ + m²Φ = 0，解为 cos mφ 与 sin mφ。',
      '剩下的 z 项必须等于正常数 k²，于是 Z″ − k²Z = 0；若 k = 0，则退化为线性函数。',
      '把这两条常微分方程代回，径向部分满足 r²R″ + rR′ + (k²r² − m²)R = 0，这就是 m 阶 Bessel 方程；k = 0 时退化为欧拉方程。'
    ],
    formulas: [
      {
        math: raw`u = R(r)\,\Phi(\phi)\,Z(z)`,
        note: '① 分离变量的乘积假设'
      },
      {
        math: raw`\frac{R''}{R} + \frac{1}{r}\frac{R'}{R} + \frac{1}{r^2}\frac{\Phi''}{\Phi} + \frac{Z''}{Z} = 0`,
        note: '② 代入并整体除以 u'
      },
      {
        math: raw`r^2\frac{R''}{R} + r\frac{R'}{R} + \frac{\Phi''}{\Phi} + r^2\frac{Z''}{Z} = 0`,
        note: '③ 乘以 r²，把 φ 与 z 的项暴露出来'
      },
      {
        math: raw`\frac{\Phi''}{\Phi} = -m^2,\qquad \frac{Z''}{Z} = k^2`,
        note: '④ 两个分离常数'
      },
      {
        math: raw`r^2 R'' + r R' + \left(k^2r^2 - m^2\right)R = 0`,
        note: '⑤ m 阶 Bessel 方程'
      },
      {
        math: raw`\Phi'' + m^2\Phi = 0,\qquad Z'' - k^2 Z = 0`,
        note: '⑥ 角向与轴向的常微分方程'
      },
      {
        math: raw`\Delta(\ln r) = 0,\qquad \Delta(z) = 0`,
        note: '⑦ 两个最简单的调和例子'
      }
    ],
    formulaCaption: 'm：角向阶数　k：轴向波数　Bessel 解为 J_m(kr) 与 Y_m(kr)',
    chips: [
      { label: 'Φ″ + m²Φ = 0', tone: 'violet' },
      { label: 'Z″ − k²Z = 0', tone: 'amber' },
      { label: 'Bessel 径向方程', tone: 'mint' }
    ],
    insight: '分离变量把偏微分方程拆成三条常微分方程，代价是引入两个常数。',
    annotation: { tag: 'SEPARATION', text: '角向周期给出 m，轴向增长给出 k', tone: 'mint' },
    duration: 26000
  },
  {
    id: 'experiment',
    nav: '实验',
    kicker: '05 · 模型实验',
    title: '把半径、模式与高度交给你',
    lead: '改变三个参数，观察探针、尺度因子与 Δu 读数如何联动。',
    paragraphs: [
      '半径控制圆柱的粗细，也直接决定 h_φ = r 与角向弧长；模式控制螺旋与角向花瓣的数量；高度控制探针在 z 轴上的位置。',
      '实时读数采用 u = r^m z，它的拉普拉斯是 Δu = m² r^{m−2} z，因此高度只做线性缩放，m 决定径向的幂次。',
      '如果改用 u = r^m cos(mφ)，读数会始终为零——这正是第五节的调和结论。试着切换观察角度，确认两种函数在圆柱面上的差别。'
    ],
    formulas: [
      {
        math: raw`\Delta\left(r^m z\right) = m^2 r^{m-2} z`,
        note: '非调和示例：轴向高度线性缩放'
      },
      {
        math: raw`\Delta\left(r^m\cos m\phi\right) = 0`,
        note: '角向模式始终调和，与 z 无关'
      },
      {
        math: raw`\Delta u = \frac{1}{r}\,\partial_r\left(r\,\partial_r u\right) + \frac{1}{r^2}\,\partial_\phi^2 u + \partial_z^2 u`,
        note: '实验使用的实时公式'
      }
    ],
    formulaCaption: 'r：圆柱半径　m：角向模式　z：探针高度',
    insight: '先动模式看螺旋圈数，再动高度看 Δu 如何随 z 线性变化。',
    annotation: { tag: 'BOUNDARY', text: '轴向只贡献 ∂z²，不产生新的耦合项', tone: 'violet' },
    duration: 0
  }
]

const fmt = (value: number, digits = 2) => value.toFixed(digits)

export const cylindricalCourse: CourseDefinition = {
  id: 'cylindrical',
  scene: 'cylindrical',
  stageId: 'ANIMA · LESSON 012 / 数学',
  meta: cylindricalMeta,
  steps: cylindricalSteps,
  controls: [
    {
      key: 'radius',
      label: '圆柱半径 r',
      min: 1.0,
      max: 3.0,
      step: 0.05,
      default: CYL_DEFAULT_RADIUS,
      format: (value) => fmt(value)
    },
    {
      key: 'mode',
      label: '角向模式 m',
      min: 0,
      max: 4,
      step: 1,
      default: CYL_DEFAULT_MODE,
      format: (value) => `${Math.round(value)}`
    },
    {
      key: 'height',
      label: '探针高度 z',
      min: -1.5,
      max: 1.5,
      step: 0.05,
      default: CYL_DEFAULT_HEIGHT,
      format: (value) => fmt(value)
    }
  ],
  toggles: [
    {
      key: 'showGrid',
      label: '显示极坐标网格',
      caption: '底面同心圆与辐射线构成参考系',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      const m = Math.round(params.mode)
      return {
        tag: 'BOUNDARY',
        text: `r = ${fmt(params.radius)}，z = ${fmt(params.height)}，Δu = ${fmt(m * m * Math.pow(params.radius, m - 2) * params.height)}`,
        tone: 'violet'
      }
    }
    return cylindricalSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '半径 r', value: (p) => fmt(p.radius) },
      { label: '方位角 φ', value: () => '45°' },
      { label: '尺度因子 h_φ', value: (p) => fmt(p.radius) },
      {
        label: 'Δu 示例',
        value: (p) => fmt(p.mode * p.mode * Math.pow(p.radius, p.mode - 2) * p.height)
      }
    ],
    foot: {
      label: 'Δ(ln r)',
      value: () => '0 · 调和'
    }
  },
  liveFormula: (p) => {
    const m = Math.round(p.mode)
    return raw`\Delta\left(r^{${m}}z\right) = ${m * m}\,r^{${m - 2}}z,\qquad r = ${fmt(p.radius)},\; z = ${fmt(p.height)}`
  },
  stats: [
    {
      label: 'Δu 数值',
      value: (p) => fmt(p.mode * p.mode * Math.pow(p.radius, p.mode - 2) * p.height)
    },
    {
      label: '角向模式 m',
      value: (p) => `${Math.round(p.mode)}`
    },
    {
      label: '探针处 u = rᵐz',
      value: (p) => fmt(Math.pow(p.radius, Math.round(p.mode)) * p.height)
    }
  ],
  exploreTitle: '把半径、模式与高度交给你'
}
