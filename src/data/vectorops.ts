import type { CourseControl, CourseDefinition, LessonStep, Params, Toggles } from './types'

export const VEC_SCALE_DEFAULT = 1
export const VEC_SPIN_DEFAULT = 0.4

const raw = String.raw
const dec = (value: number, digits = 2) => value.toFixed(digits)

export const vectorOpsMeta = {
  index: '008',
  title: '矢量微分算子',
  subtitle: '一个 ∇ 符号，读出场的坡度、源汇与旋涡。',
  field: '数学 · 场论',
  year: '19 世纪 · 矢量分析',
  duration: '约 13 分钟'
}

export const vectorOpsSteps: LessonStep[] = [
  {
    id: 'operator',
    nav: '算子',
    kicker: '序 · 19 世纪',
    title: '∇ 不是箭头，是一台等待输入的机器',
    lead: '把三个偏导装进一个矢量，就得到了场论里最忙碌的符号：∇。',
    paragraphs: [
      '在三维直角坐标里，∇ 被定义成由三个偏导组成的矢量算子：它对 x、y、z 分别求导，再把结果排成一个矢量。它自己不是一个数，也不是一个场，而是一个「等待被喂食」的操作。',
      '单独写出 ∇ 没有意义，必须让它作用在某个对象上。作用在标量函数 φ 上时，三个偏导各自保留，输出的是一个矢量，这就是梯度 ∇φ。',
      '作用在矢量场 F 上则有两种乘法：点乘 ∇·F 把三个分量分别求导后相加，输出一个标量，这就是散度；叉乘 ∇×F 按右手定则组合偏导，输出仍是一个矢量，这就是旋度。',
      '所以 ∇ 的输入与输出类型决定了它的身份：标量进、矢量出是梯度；矢量进、标量出是散度；矢量进、矢量出是旋度。三条主线，恰好对应三种观察场的方式。'
    ],
    formulas: [
      {
        math: raw`\nabla = \left(\frac{\partial}{\partial x},\ \frac{\partial}{\partial y},\ \frac{\partial}{\partial z}\right)`,
        note: '直角坐标下的形式定义：一个矢量算子'
      },
      {
        math: raw`\nabla f = \left(\frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y},\ \frac{\partial f}{\partial z}\right)`,
        note: '作用在标量 f 上：输出矢量（梯度）'
      },
      {
        math: raw`\nabla\cdot\mathbf{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}`,
        note: '点乘矢量 F：输出标量（散度）'
      },
      {
        math: raw`\nabla\times\mathbf{F} = \left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\ \frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\ \frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right)`,
        note: '叉乘矢量 F：输出矢量（旋度）'
      }
    ],
    formulaCaption: '∂x、∂y、∂z 是偏导记号；∇ 本身没有数值，只有作用后才产生意义',
    chips: [
      { label: '标量 → 矢量　梯度', tone: 'mint' },
      { label: '矢量 → 标量　散度', tone: 'amber' },
      { label: '矢量 → 矢量　旋度', tone: 'violet' }
    ],
    insight: '记住输入与输出的类型，比记住三个公式更有用。',
    annotation: { tag: 'OPERATOR', text: '∇ 是算子，不是场；先问它作用在谁身上', tone: 'cyan' },
    duration: 18000
  },
  {
    id: 'gradient',
    nav: '梯度',
    kicker: '01 · 坡度',
    title: '梯度指向标量场上升最快的方向',
    lead: '站在山坡上，梯度告诉你哪一边最陡，以及陡到什么程度。',
    paragraphs: [
      '设标量场 f(x, y, z) 描述每一点的温度、压强或高度。从一点走到邻近一点，位移为 dr = (dx, dy, dz)，函数值的变化由全微分给出：df 等于三个偏导与对应位移乘积之和。',
      '把全微分写成点积，就得到 df = ∇f·dr。这个等式说明：梯度是一个与位移做点积就能读出函数增量的矢量。若 dr 沿着 ∇f 的方向，点积最大，df 也最大。',
      '因此 ∇f 的几何含义是「最陡上升方向」，它的模长是那个方向上的变化率。沿单位方向 u 的方向导数 D_u f = ∇f·u = |∇f|cos θ，在 u 与梯度同向时取最大值 |∇f|。',
      '取例子 f = x² + y²：三个偏导依次是 2x、2y、0，所以 ∇f = (2x, 2y, 0)。在原点是零矢量；离原点越远，箭头越长，并且始终沿半径向外。等值线是同心圆，梯度处处垂直于等值线。'
    ],
    formulas: [
      {
        math: raw`df = \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy + \frac{\partial f}{\partial z}dz = \nabla f\cdot d\mathbf{r}`,
        note: '全微分 = 梯度与位移的点积'
      },
      {
        math: raw`\nabla f = \left(\frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y},\ \frac{\partial f}{\partial z}\right)`,
        note: '梯度：三个偏导装进一个矢量'
      },
      {
        math: raw`D_{\mathbf{u}}f = \nabla f\cdot\mathbf{u} = |\nabla f|\cos\theta`,
        note: '方向导数：沿单位方向 u 的变化率'
      },
      {
        math: raw`f = x^2 + y^2 \;\Longrightarrow\; \nabla f = (2x,\ 2y,\ 0)`,
        note: '示例场：梯度沿半径向外，等值线为同心圆'
      }
    ],
    formulaCaption: 'dr：微小位移　u：单位方向　θ：u 与 ∇f 的夹角',
    chips: [
      { label: '∇f 垂直于等值线', tone: 'mint' },
      { label: '同向时变化最快', tone: 'cyan' },
      { label: '原点处梯度为零', tone: 'violet' }
    ],
    insight: '梯度不是「斜率」这一个数，而是一个带方向的矢量：既告诉你多陡，也告诉你往哪走。',
    annotation: { tag: 'GRADIENT', text: '沿 ∇f 走，函数值上升最快', tone: 'mint' },
    duration: 22000
  },
  {
    id: 'divergence',
    nav: '散度',
    kicker: '02 · 源与汇',
    title: '散度：单位体积里，场往外流了多少',
    lead: '把一个小盒子放进场里，看从表面净流出多少——散度就是这个流量的密度。',
    paragraphs: [
      '取场中一点，用一个小体积 V 把它包住，表面记为 ∂V。场的通量是穿过整个表面的积分 ∮F·dS，向外为正。当 V 缩到该点时，通量与体积之比会趋于一个确定的数，这个极限就是散度。',
      '在直角坐标里可以逐面对算。取一个边长为 Δx、Δy、Δz 的小盒，先看垂直于 x 轴的两个面：右侧流出约 Fx(x+Δx/2)ΔyΔz，左侧流入约 Fx(x−Δx/2)ΔyΔz。两者相减，再用一阶差分近似，就得到 ∂x Fx 乘以体积。',
      'y、z 方向的两对相对面完全同理，各自贡献 ∂y Fy 与 ∂z Fz。把三对相对面的净通量相加再除以体积，就得到散度的直角坐标表达式。',
      '散度为正，说明这一点像一个「源」，净往外吐东西；散度为负，说明它像一个「汇」，净往里吞。以 F = (x, y, 0) 为例，∂x Fx = 1、∂y Fy = 1、∂z Fz = 0，所以 div F ≡ 2，平面上处处是源：箭头从每个点向外指，越远越长。'
    ],
    formulas: [
      {
        math: raw`\operatorname{div}\mathbf{F} = \lim_{V\to 0}\frac{1}{V}\iint_{\partial V}\mathbf{F}\cdot d\mathbf{S}`,
        note: '通量密度：单位体积的净流出量'
      },
      {
        math: raw`\Phi_x \approx \left[F_x\left(x+\frac{\Delta x}{2}\right)-F_x\left(x-\frac{\Delta x}{2}\right)\right]\Delta y\,\Delta z \approx \frac{\partial F_x}{\partial x}\,\Delta x\,\Delta y\,\Delta z`,
        note: '一对相对面的净通量，一阶展开'
      },
      {
        math: raw`\operatorname{div}\mathbf{F} = \frac{\partial F_x}{\partial x}+\frac{\partial F_y}{\partial y}+\frac{\partial F_z}{\partial z}`,
        note: '三对相对面相加，再除以体积'
      },
      {
        math: raw`\mathbf{F} = (x,\ y,\ 0) \;\Longrightarrow\; \operatorname{div}\mathbf{F} = 1+1+0 = 2`,
        note: '示例：平面上处处为正的源'
      }
    ],
    formulaCaption: 'div F > 0：源　|　div F < 0：汇　|　div F = 0：无源无汇',
    chips: [
      { label: 'div F > 0　源', tone: 'amber' },
      { label: 'div F < 0　汇', tone: 'violet' },
      { label: 'div F = 0　无源', tone: 'mint' }
    ],
    insight: '散度不关心场往哪拐，只关心它是否在这一点「凭空多出来」或「凭空消失」。',
    annotation: { tag: 'DIVERGENCE', text: 'F = (x, y, 0) 的散度恒为 2，处处是源', tone: 'amber' },
    duration: 24000
  },
  {
    id: 'curl',
    nav: '旋度',
    kicker: '03 · 环流',
    title: '旋度：单位面积上，场绕得有多紧',
    lead: '把一枚小风车放进流场，旋度衡量它被带着转动的快慢。',
    paragraphs: [
      '散度看的是「穿出表面」，旋度看的是「绕着圈走」。在一点附近取一块小面积 A，边界为闭合曲线 ∂A，场的环量是沿边界的线积分 ∮F·dr。当面积缩到该点时，环量与面积之比就是旋度在法线方向 n 上的分量。',
      '在 xy 平面取一个小矩形，按逆时针绕行。下边沿 +x、右边沿 +y、上边沿 −x、左边沿 −y，四条边的线积分相加，得到环量 ≈ (∂x Fy − ∂y Fx)ΔxΔy。除以面积，就是旋度的 z 分量。',
      '另外两个坐标平面给出旋度的 x 与 y 分量，于是三个分量拼成旋度矢量。它的方向是环流最剧烈的那个平面的法线，模长是最大的环量密度。',
      '以 F = (−y, x, 0) 为例：∂x Fy = 1、∂y Fx = −1，所以 curl F = (0, 0, 2)。这是绕 z 轴的刚性旋转，每一点的箭头都沿圆周切线方向；旋度为常矢量，说明整个场以相同强度旋转，角速度大小为 1，而旋度是其两倍。'
    ],
    formulas: [
      {
        math: raw`(\operatorname{curl}\mathbf{F})\cdot\mathbf{n} = \lim_{A\to 0}\frac{1}{A}\oint_{\partial A}\mathbf{F}\cdot d\mathbf{r}`,
        note: '环量密度：法线方向上的旋度分量'
      },
      {
        math: raw`\Gamma_z \approx \left(\frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right)\Delta x\,\Delta y`,
        note: 'xy 平面小矩形的环量，两项之差'
      },
      {
        math: raw`\operatorname{curl}\mathbf{F} = \left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\ \frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\ \frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right)`,
        note: '三个坐标平面的环量密度拼成矢量'
      },
      {
        math: raw`\mathbf{F} = (-y,\ x,\ 0) \;\Longrightarrow\; \operatorname{curl}\mathbf{F} = (0,\ 0,\ 2)`,
        note: '示例：绕 z 轴的刚性旋转'
      },
      {
        math: raw`\mathbf{F} = \boldsymbol{\omega}\times\mathbf{r} \;\Longrightarrow\; \operatorname{curl}\mathbf{F} = 2\boldsymbol{\omega}`,
        note: '角速度为 ω 的旋转场，旋度是它的两倍'
      }
    ],
    formulaCaption: 'n：小面积的法向单位矢量　∂A：闭合边界　Γ：环量',
    chips: [
      { label: '旋度方向：环流最强平面法向', tone: 'violet' },
      { label: '模长：最大环量密度', tone: 'cyan' },
      { label: 'F = ω × r　旋度 = 2ω', tone: 'mint' }
    ],
    insight: '旋度描述的是局部转动，不是整体平移：箭头可以处处不同，但每一点都在打转。',
    annotation: { tag: 'CURL', text: 'F = (−y, x, 0) 的旋度为 (0, 0, 2)，绕 z 轴环流', tone: 'violet' },
    duration: 24000
  },
  {
    id: 'compose',
    nav: '组合',
    kicker: '04 · 二阶算子',
    title: 'Δ = div(grad)：把梯度再喂给散度',
    lead: '先把标量场变成矢量场，再把这个矢量场「求源」，就得到拉普拉斯算子。',
    paragraphs: [
      '梯度把标量变成矢量，散度把矢量变回标量。把两者串联，输入仍是标量、输出也是标量，这个二阶组合记作 Δf = div(grad f) = ∇·(∇f)，称为拉普拉斯算子。',
      '展开时不要跳步：∇f 的三个分量是 ∂x f、∂y f、∂z f；再对它们分别求散度，就是 ∂x(∂x f) + ∂y(∂y f) + ∂z(∂z f)。每个方向都被连续求导两次。',
      '把括号写成二阶偏导，得到 Δf = f_xx + f_yy + f_zz。它衡量一点与邻域平均值的偏差：碗形的地方 Δf 为正，峰形的地方为负，线性斜坡则处处为零。',
      '以 f = x² + y² 为例：f_xx = 2、f_yy = 2、f_zz = 0，所以 Δf = 4，在整个平面上是常数。曲率均匀，正是这个二次函数的特征；在物理里，Δ 出现在热传导、泊松方程与波动方程中。'
    ],
    formulas: [
      {
        math: raw`\Delta f = \operatorname{div}(\operatorname{grad} f) = \nabla\cdot(\nabla f)`,
        note: '二阶算子：先取梯度，再取散度'
      },
      {
        math: raw`\nabla\cdot(\nabla f) = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial x}\right)+\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial y}\right)+\frac{\partial}{\partial z}\left(\frac{\partial f}{\partial z}\right)`,
        note: '逐项展开：三个方向各求两次导'
      },
      {
        math: raw`\Delta f = \frac{\partial^2 f}{\partial x^2}+\frac{\partial^2 f}{\partial y^2}+\frac{\partial^2 f}{\partial z^2}`,
        note: '拉普拉斯算子的直角坐标形式'
      },
      {
        math: raw`f = x^2+y^2 \;\Longrightarrow\; \Delta f = 2+2+0 = 4`,
        note: '示例：曲率均匀的二次场'
      }
    ],
    formulaCaption: 'Δ 读作拉普拉斯算子；它把「坡度」再取一次「源」',
    chips: [
      { label: '梯度：标量 → 矢量', tone: 'mint' },
      { label: '散度：矢量 → 标量', tone: 'amber' },
      { label: 'Δ：标量 → 标量', tone: 'violet' }
    ],
    insight: 'Δf 不是「梯度的长度」，而是梯度场的散度：先问往哪升，再问这个指向是否在发散。',
    annotation: { tag: 'LAPLACIAN', text: 'Δf = div(grad f)，逐方向求两次导', tone: 'cyan' },
    duration: 20000
  },
  {
    id: 'identities',
    nav: '恒等式',
    kicker: '05 · 逐项相消',
    title: '两条恒等式：梯度无旋，旋度无源',
    lead: '看似复杂的两个组合，其实每一项都会成对抵消。',
    paragraphs: [
      '恒等式一：curl(grad φ) = 0。把梯度记作 g = (φx, φy, φz)，再对 g 取旋度。旋度的 x 分量是 ∂y(φz) − ∂z(φy)，写成混合偏导就是 φ_zy − φ_yz。只要二阶偏导连续，混合偏导可交换，两项相等，差为零。',
      'y 分量是 ∂z(φx) − ∂x(φz) = φ_xz − φ_zx，同样为零；z 分量是 ∂x(φy) − ∂y(φx) = φ_yx − φ_xy，也为零。三个分量各自独立地抵消，所以整个矢量是零矢量。几何上，沿闭合路径走一圈，函数值回到原值，环量必然为零：梯度场不可能有旋涡。',
      '恒等式二：div(curl F) = 0。把旋度的三个分量代进散度，展开后一共六项：∂x∂y Fz、−∂x∂z Fy、∂y∂z Fx、−∂y∂x Fz、∂z∂x Fy、−∂z∂y Fx。',
      '六项恰好两两配对：Fz 的 xy 与 yx 相消，Fx 的 yz 与 zy 相消，Fy 的 zx 与 xz 相消。每一对都因为混合偏导相等而抵消，总和为零。几何上，旋度场没有源与汇，流线只能闭合或延伸到无穷，不会在一点凭空冒出。'
    ],
    formulas: [
      {
        math: raw`\operatorname{curl}(\nabla\varphi) = \mathbf{0}`,
        note: '恒等式一：梯度场无旋'
      },
      {
        math: raw`\left[\operatorname{curl}(\nabla\varphi)\right]_x = \frac{\partial}{\partial y}\left(\frac{\partial\varphi}{\partial z}\right)-\frac{\partial}{\partial z}\left(\frac{\partial\varphi}{\partial y}\right) = \varphi_{zy}-\varphi_{yz} = 0`,
        note: 'x 分量：混合偏导可交换'
      },
      {
        math: raw`\left[\operatorname{curl}(\nabla\varphi)\right]_y = \varphi_{xz}-\varphi_{zx} = 0,\qquad \left[\operatorname{curl}(\nabla\varphi)\right]_z = \varphi_{yx}-\varphi_{xy} = 0`,
        note: 'y、z 分量同样逐项抵消'
      },
      {
        math: raw`\operatorname{div}(\operatorname{curl}\mathbf{F}) = \mathbf{0}`,
        note: '恒等式二：旋度场无源'
      },
      {
        math: raw`\operatorname{div}(\operatorname{curl}\mathbf{F}) = (F_{z,xy}-F_{y,xz})+(F_{x,yz}-F_{z,yx})+(F_{y,zx}-F_{x,zy})`,
        note: '展开成六项'
      },
      {
        math: raw`F_{z,xy}=F_{z,yx},\qquad F_{x,yz}=F_{x,zy},\qquad F_{y,zx}=F_{y,xz}`,
        note: '三对混合偏导相等，六项全部相消'
      }
    ],
    formulaCaption: 'φ：标量场　F：矢量场　混合偏导相等的前提是二阶偏导连续',
    chips: [
      { label: 'curl ∘ grad = 0', tone: 'mint' },
      { label: 'div ∘ curl = 0', tone: 'violet' },
      { label: '每一项都成对抵消', tone: 'cyan' }
    ],
    insight: '这两条恒等式不是记忆技巧，而是「二阶偏导可交换」这一事实的两种写法。',
    annotation: { tag: 'IDENTITY', text: '梯度无旋、旋度无源：两个零矢量恒等式', tone: 'dim' },
    duration: 26000
  },
  {
    id: 'lab',
    nav: '实验',
    kicker: '06 · 模型实验',
    title: '把场强与旋转交给你',
    lead: '拖动场强滑块，观察箭头如何伸长，而散度与旋度同步变化。',
    paragraphs: [
      '实验里同一个 scale 作用在三个示例场上：梯度场 f = x² + y²、散度场 F = (x, y, 0)、旋转场 F = (−y, x, 0)。线性缩放不改变方向，只改变箭头的长度。',
      '缩放对微分算子是完全线性的：∇(s f) = s ∇f，div(s F) = s div F，curl(s F) = s curl F。因此方向、源汇位置与旋转轴都不动，只有读数的数值被整体放大或缩小。',
      '旋转参数 spin 只改变演示动画的相位，不影响场的数学值。把 spin 调大，环流箭头会更快地绕着 z 轴滑过，更容易看出「每一处都在打转」。',
      '试着把 scale 从 0.5 拉到 2.0：梯度箭头从短刺变成长矛，散度箭头从点状变成放射状，旋度箭头则围成一圈更密的切线。再关掉 showLabels，对比有无分量标注时的画面。'
    ],
    formulas: [
      {
        math: raw`\mathbf{F}_s = s\,\mathbf{F}_0 \;\Longrightarrow\; \operatorname{div}\mathbf{F}_s = s\,\operatorname{div}\mathbf{F}_0,\quad \operatorname{curl}\mathbf{F}_s = s\,\operatorname{curl}\mathbf{F}_0`,
        note: '场强缩放：散度与旋度同步按 s 倍变化'
      },
      {
        math: raw`\nabla(s f) = s\,\nabla f,\qquad \Delta(s f) = s\,\Delta f`,
        note: '梯度与拉普拉斯也是线性的（s 为常数）'
      }
    ],
    formulaCaption: 's：场强缩放因子（0.5–2.0）　spin：演示旋转速度，不改变场值',
    chips: [
      { label: 'scale ↑　箭头变长', tone: 'mint' },
      { label: 'div、curl 同倍缩放', tone: 'amber' },
      { label: 'spin 只改观影节奏', tone: 'violet' }
    ],
    insight: '缩放不改变场的「形状」，只改变它的「音量」：源还是源，旋还是旋。',
    annotation: { tag: 'EXPLORE', text: '拖动场强滑块，散度与旋度同步放大', tone: 'violet' },
    duration: 0
  }
]

const controls: CourseControl[] = [
  {
    key: 'scale',
    label: '场强 scale',
    min: 0.5,
    max: 2,
    step: 0.05,
    default: VEC_SCALE_DEFAULT,
    format: (value: number) => `${value.toFixed(2)}×`
  },
  {
    key: 'spin',
    label: '演示旋转 spin',
    min: 0,
    max: 1,
    step: 0.05,
    default: VEC_SPIN_DEFAULT,
    format: (value: number) => `${(value * 100).toFixed(0)}%`
  }
]

export const vectorOpsCourse: CourseDefinition = {
  id: 'vectorops',
  scene: 'vectorops',
  stageId: 'ANIMA · LESSON 008 / 数学',
  meta: vectorOpsMeta,
  steps: vectorOpsSteps,
  controls,
  toggles: [
    {
      key: 'showLabels',
      label: '显示分量标注',
      caption: '在箭头旁标出 Fx、Fy 与场名',
      default: true
    }
  ],
  annotationFor(index: number, params: Params, toggles: Toggles) {
    if (index === 6) {
      const scale = params.scale ?? VEC_SCALE_DEFAULT
      return {
        tag: 'EXPLORE',
        text: `scale = ${scale.toFixed(2)}×，散度与旋度同步为 ${dec(2 * scale)}`,
        tone: 'violet'
      }
    }
    void toggles
    return vectorOpsSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '∇f 示例 (1,1)', value: (p) => `(${dec(2 * p.scale)}, ${dec(2 * p.scale)}, 0)` },
      { label: 'div F', value: (p) => dec(2 * p.scale) },
      { label: 'curl F', value: (p) => `(0, 0, ${dec(2 * p.scale)})` },
      { label: 'Δf', value: (p) => dec(4 * p.scale) }
    ]
  },
  liveFormula: (p) => {
    const s = p.scale ?? VEC_SCALE_DEFAULT
    return raw`\operatorname{div}\mathbf{F} = ${dec(2 * s)}\quad \operatorname{curl}\mathbf{F} = (0,\ 0,\ ${dec(2 * s)})`
  },
  stats: [
    {
      label: '散度 div F',
      value: (p) => `${dec(2 * p.scale)}（源）`
    },
    {
      label: '旋度模 |curl F|',
      value: (p) => dec(2 * p.scale)
    },
    {
      label: '是否无旋 / 无源',
      value: () => '梯度无旋 · 旋度无源'
    }
  ],
  exploreTitle: '把场强与旋转交给你'
}


