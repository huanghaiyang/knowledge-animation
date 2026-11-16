import { fig, T, R, BAND, L, A, DOT, TAG, CURVE, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '4.2/overview',
    '线性势 → 艾里方程 → 行波',
    '均匀电场给线性势，方程精确化为艾里方程；允许区是 1/3 阶汉克尔行波，禁戒区指数衰减，概率流沿程守恒。',
    [
      T(320, 24, '线性势 → 艾里方程 → 行波', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 180, 180, '线性势', { tone: 'amber' }),
      L(46, 86, 202, 86, { tone: 'dim' }),
      A(194, 86, 210, 86, { tone: 'dim' }),
      L(50, 100, 196, 190, { tone: 'amber', weight: 2 }),
      L(50, 160, 196, 160, { tone: 'mint', dash: true }),
      T(52, 150, 'E', { size: 9.5, tone: 'mint' }),
      DOT(146, 160, { r: 3, tone: 'cyan' }),
      T(150, 174, 'x_t', { size: 9.5, tone: 'cyan' }),
      T(80, 78, 'V = −eℰx', { size: 9.5, tone: 'amber' }),
      ...PANEL(232, 44, 180, 180, '艾里解', { tone: 'mint' }),
      L(244, 190, 400, 190, { tone: 'dim' }),
      L(322, 100, 322, 190, { tone: 'dim', dash: true }),
      T(322, 202, 'z = 0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
      CURVE((x) => Math.exp(-x / 22), { x: 246, y: 130, w: 72, h: 26 }, [0, 72], [0, 1], { tone: 'violet' }),
      CURVE((x) => Math.sin((x / 7) ** 1.5), { x: 326, y: 146, w: 70, h: 30 }, [0, 70], [-1, 1], {
        tone: 'mint',
        steps: 80
      }),
      T(250, 118, 'z < 0 衰减', { size: 9.5, tone: 'violet' }),
      T(330, 128, 'z > 0 振荡', { size: 9.5, tone: 'mint' }),
      ...PANEL(430, 44, 182, 180, '行波', { tone: 'cyan' }),
      L(442, 190, 600, 190, { tone: 'dim' }),
      CURVE((x) => Math.sin((x / 6) ** 1.4), { x: 444, y: 128, w: 150, h: 44 }, [0, 150], [-1, 1], {
        tone: 'cyan',
        steps: 140
      }),
      A(450, 206, 590, 206, { tone: 'mint', weight: 1.2 }),
      T(520, 216, '电子加速', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(444, 112, '波长越来越短', { size: 9.5, tone: 'cyan' }),
      T(320, 240, '线性势把方程化为艾里方程', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 264, '允许区行波，禁戒区指数尾', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '4.2/0-0',
      '受力沿 +x，势能线性下降',
      '电子带负电，受力沿 +x；势能 $V=-e\\mathcal{E}x$ 随 x 线性下降，电子向右走动能增大。',
      [
        T(320, 24, '受力 +x：势能一路下滑', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 210, 588, 210, { tone: 'dim' }),
        A(580, 210, 600, 210, { tone: 'dim' }),
        T(594, 196, 'x', { size: 9.5, tone: 'dim' }),
        L(56, 210, 56, 60, { tone: 'dim' }),
        A(56, 72, 56, 56, { tone: 'dim' }),
        L(70, 96, 560, 204, { tone: 'amber', weight: 2 }),
        T(400, 124, 'V = −eℰx', { size: 9.5, tone: 'amber' }),
        L(70, 150, 560, 150, { tone: 'mint', dash: true }),
        T(74, 140, 'E', { size: 9.5, tone: 'mint' }),
        DOT(315, 150, { r: 3, tone: 'cyan' }),
        T(315, 164, 'x_t', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        A(120, 64, 220, 64, { tone: 'mint', weight: 1.4 }),
        T(170, 50, '受力沿 +x', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(430, 184, '允许区', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(150, 184, '禁戒区', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 236, '势能线性下降 ⇒ 动能线性上升', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, '均匀场：连续谱，没有束缚态', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.2/0-1',
      '系数随 x 变，仍可精确解',
      "方程 $\\psi''+\\frac{2m}{\\hbar^2}(E+e\\mathcal{E}x)\\psi=0$ 的系数线性增长；它仍是二阶线性方程，可以精确求解。",
      [
        T(320, 24, 'k²(x) 线性增长：转折点归零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(90, 200, 540, 200, { tone: 'dim' }),
        A(532, 200, 552, 200, { tone: 'dim' }),
        L(90, 200, 90, 70, { tone: 'dim' }),
        A(90, 82, 90, 66, { tone: 'dim' }),
        T(76, 66, 'k²', { size: 10, tone: 'dim', anchor: 'end' }),
        T(556, 202, 'x', { size: 9.5, tone: 'dim' }),
        BAND(90, 82, 150, 116, { tone: 'violet', opacity: 0.1 }),
        BAND(240, 82, 290, 116, { tone: 'mint', opacity: 0.1 }),
        L(90, 200, 520, 82, { tone: 'amber', weight: 2 }),
        DOT(240, 200, { r: 3, tone: 'cyan' }),
        T(240, 214, 'x_t：k² = 0', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(120, 120, 'E+eℰx < 0', { size: 9.5, tone: 'violet' }),
        T(350, 110, 'E+eℰx > 0', { size: 9.5, tone: 'mint' }),
        T(300, 168, '斜率 = 2meℰ/ħ²', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 236, '系数随 x 变，方程仍是线性的', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, '转折点两侧解的类型不同', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '4.2/0-2',
      '无量纲化：标准艾里方程',
      "令 $z\\propto x+E/e\\mathcal{E}$，方程化为 $\\psi''+z\\psi=0$；$z>0$ 振荡，$z<0$ 指数变化。",
      [
        T(320, 24, '一个无量纲变量，方程标准化', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 200, 580, 200, { tone: 'dim' }),
        A(572, 200, 592, 200, { tone: 'dim' }),
        T(586, 186, 'z', { size: 9.5, tone: 'dim' }),
        L(320, 92, 320, 200, { tone: 'dim', dash: true }),
        T(320, 212, 'z = 0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        CURVE((z) => (z < 0 ? Math.exp(z * 1.3) : Math.sin((z * 2.4) ** 1.5)), {
          x: 60,
          y: 100,
          w: 520,
          h: 90
        }, [-1.5, 1.5], [-1, 1], { tone: 'mint', steps: 160 }),
        CURVE((z) => (z < 0 ? 0.22 * Math.exp(-z * 0.9) : 0.45 * Math.sin((z * 2.4) ** 1.5 + 0.7)), {
          x: 60,
          y: 100,
          w: 520,
          h: 90
        }, [-1.5, 1.5], [-1, 1], { tone: 'violet', dash: true, steps: 160 }),
        T(140, 86, 'Bi(−z)', { size: 10, tone: 'violet' }),
        T(430, 86, 'Ai(−z)', { size: 10, tone: 'mint' }),
        T(80, 150, 'z < 0：指数', { size: 9.5, tone: 'violet' }),
        T(440, 150, 'z > 0：振荡', { size: 9.5, tone: 'mint' }),
        T(320, 238, 'ψ″ + zψ = 0：标准艾里方程', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(320, 262, '两个独立解：Ai(−z) 与 Bi(−z)', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.2/1-0',
      '1/3 阶：x^(3/2) 相位的指纹',
      '允许区艾里函数写成 $J_{1/3}$ 与 $J_{-1/3}$ 的组合；阶数 1/3 来自 WKB 相位 $\\int p\\,dx\\propto x^{3/2}$。',
      [
        T(320, 24, '阶数 1/3 从 x^(3/2) 相位来', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 190, 370, 190, { tone: 'dim' }),
        A(362, 190, 382, 190, { tone: 'dim' }),
        T(376, 176, 'ζ', { size: 9.5, tone: 'dim' }),
        L(60, 190, 60, 76, { tone: 'dim' }),
        A(60, 88, 60, 72, { tone: 'dim' }),
        CURVE((z) => Math.sqrt(2 / (Math.PI * z)) * Math.cos(z - (5 * Math.PI) / 12), {
          x: 60,
          y: 80,
          w: 300,
          h: 108
        }, [1, 12], [-1, 1], { tone: 'mint', steps: 160 }),
        CURVE((z) => Math.sqrt(2 / (Math.PI * z)) * Math.cos(z + (5 * Math.PI) / 12), {
          x: 60,
          y: 80,
          w: 300,
          h: 108
        }, [1, 12], [-1, 1], { tone: 'cyan', dash: true, steps: 160 }),
        T(240, 72, 'J₁/₃ 与 J₋₁/₃', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        L(420, 190, 580, 190, { tone: 'dim' }),
        A(572, 190, 592, 190, { tone: 'dim' }),
        L(420, 190, 420, 86, { tone: 'dim' }),
        A(420, 98, 420, 82, { tone: 'dim' }),
        CURVE((x) => x ** 1.5, { x: 420, y: 86, w: 160, h: 104 }, [0, 1], [0, 1], { tone: 'violet' }),
        T(500, 80, 'ζ ∝ z^(3/2)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(500, 204, 'z', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 238, '相位 ∝ x^(3/2)，贝塞尔阶数 1/3', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '两支贝塞尔叠加成实艾里函数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.2/1-1',
      '汉克尔函数给出传播方向',
      '$H^{(1)}=J+iY$ 携带 $e^{i\\zeta}$，向右；$H^{(2)}=J-iY$ 携带 $e^{-i\\zeta}$，向左；方向不因波长改变。',
      [
        T(320, 24, 'H⁽¹⁾ 向右，H⁽²⁾ 向左', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 9), { x: 70, y: 78, w: 480, h: 36 }, [0, 480], [-1, 1], { tone: 'mint' }),
        A(80, 130, 552, 130, { tone: 'mint', weight: 1.4 }),
        T(90, 144, 'H⁽¹⁾ ∝ e^(iζ)：+x', { size: 9.5, tone: 'mint' }),
        CURVE((x) => Math.sin(x / 9 + 1), { x: 70, y: 160, w: 480, h: 36 }, [0, 480], [-1, 1], {
          tone: 'violet',
          dash: true
        }),
        A(552, 214, 80, 214, { tone: 'violet', weight: 1.4 }),
        T(90, 228, 'H⁽²⁾ ∝ e^(−iζ)：−x', { size: 9.5, tone: 'violet' }),
        T(320, 250, 'H⁽¹⁾ 与 H⁽²⁾ 区分两个传播方向', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '组合系数由边界条件定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '4.2/1-2',
      '禁戒区只留衰减支',
      '在 $z<0$ 区域，艾里函数变成指数衰减与指数增长两支；只保留衰减支，波函数才不会在深处发散。',
      [
        T(320, 24, '禁戒区：舍去增长支', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 210, 588, 210, { tone: 'dim' }),
        A(580, 210, 600, 210, { tone: 'dim' }),
        L(56, 80, 560, 210, { tone: 'amber', weight: 2 }),
        L(56, 140, 560, 140, { tone: 'mint', dash: true }),
        T(60, 124, 'E', { size: 9.5, tone: 'mint' }),
        DOT(289, 140, { r: 3, tone: 'cyan' }),
        T(289, 154, 'x_t', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        BAND(56, 84, 233, 122, { tone: 'violet', opacity: 0.08 }),
        BAND(289, 84, 299, 122, { tone: 'mint', opacity: 0.08 }),
        CURVE((x) => Math.exp(-(225 - x) / 50), { x: 60, y: 150, w: 225, h: 52 }, [0, 225], [0, 1], {
          tone: 'violet'
        }),
        A(90, 190, 90, 154, { tone: 'danger', weight: 1.2 }),
        CURVE((x) => Math.sin(x / 8), { x: 296, y: 160, w: 270, h: 40 }, [0, 270], [-1, 1], { tone: 'mint' }),
        T(96, 148, '增长支舍去', { size: 9.5, tone: 'danger' }),
        T(150, 184, '衰减支', { size: 9.5, tone: 'violet' }),
        T(420, 196, '允许区振荡', { size: 9.5, tone: 'mint' }),
        T(320, 236, '只保留深入禁戒区衰减的解', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, '与隧穿的指数尾巴同一图像', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.2/2-0',
      '动量变大，波长变短',
      '$p(x)=\\sqrt{2m(E+e\\mathcal{E}x)}$，$\\lambda=h/p$；电子越往右走越快，德布罗意波长按 $1/\\sqrt{x}$ 缩短。',
      [
        T(320, 24, 'p 升 λ 降：同一份动能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 190, 280, 190, { tone: 'dim' }),
        A(272, 190, 292, 190, { tone: 'dim' }),
        L(60, 190, 60, 76, { tone: 'dim' }),
        A(60, 88, 60, 72, { tone: 'dim' }),
        CURVE((x) => Math.sqrt(x), { x: 60, y: 80, w: 212, h: 108 }, [0, 1], [0, 1], { tone: 'mint' }),
        T(160, 70, 'p ∝ √x', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(294, 192, 'x', { size: 9.5, tone: 'dim' }),
        T(48, 70, 'p', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(340, 190, 560, 190, { tone: 'dim' }),
        A(552, 190, 572, 190, { tone: 'dim' }),
        L(340, 190, 340, 76, { tone: 'dim' }),
        A(340, 88, 340, 72, { tone: 'dim' }),
        CURVE((x) => 0.3 / Math.sqrt(x), { x: 340, y: 80, w: 212, h: 108 }, [0.09, 1], [0, 1], {
          tone: 'violet'
        }),
        T(440, 70, 'λ = h/p', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(574, 192, 'x', { size: 9.5, tone: 'dim' }),
        T(328, 70, 'λ', { size: 9.5, tone: 'dim', anchor: 'end' }),
        A(296, 140, 330, 140, { tone: 'amber', weight: 1.2 }),
        T(320, 232, '越走越快，波峰越挤越密', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '累积相位 φ = ∫p dx/ħ', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.2/2-1',
      '概率流守恒：每个截面一样多',
      '概率流 $j=\\frac{\\hbar}{m}\\mathrm{Im}(\\psi^*\\partial_x\\psi)$ 满足 $dj/dx=0$；波长变短、速度变大，密度相应变小。',
      [
        T(320, 24, '波长变短，通量不变', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 110, 580, 110, { tone: 'dim' }),
        L(60, 190, 580, 190, { tone: 'dim' }),
        ...[80, 140, 195, 245, 290, 330, 365, 395, 420, 442, 461, 477, 491, 503, 513, 522].map((x) =>
          L(x, 110, x, 190, { tone: 'cyan', opacity: 0.45 })
        ),
        A(70, 150, 560, 150, { tone: 'mint', weight: 1.4 }),
        T(90, 136, '电子流', { size: 9.5, tone: 'mint' }),
        L(140, 96, 140, 204, { tone: 'amber', dash: true }),
        L(456, 96, 456, 204, { tone: 'amber', dash: true }),
        T(160, 86, 'v 小，密度大', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(500, 86, 'v 大，密度小', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 216, '波前间距 = λ(x)', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 244, 'dj/dx = 0：无源区电流恒定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '定态流不随时间改变', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '4.2/2-2',
      '从电子枪到超快衍射',
      '同一套公式用于电子枪、加速器与超快电子衍射：加速场同时改变动量与相位，需要一起计算能量展宽、到达时间与相干长度。',
      [
        T(320, 24, '应用：加速场里的电子束', { size: 12.5, tone: 'text', anchor: 'middle' }),
        R(60, 120, 24, 60, { tone: 'mint', fill: true, opacity: 0.18, r: 2 }),
        T(72, 106, '阴极', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        L(190, 104, 190, 196, { tone: 'amber', weight: 2 }),
        T(190, 98, '阳极', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(92, 150, 540, 150, { tone: 'cyan', weight: 1.4 }),
        CURVE((x) => Math.sin((x / 6) ** 1.3), { x: 200, y: 132, w: 300, h: 36 }, [0, 300], [-1, 1], {
          tone: 'cyan',
          steps: 160
        }),
        R(430, 122, 20, 56, { tone: 'violet', fill: true, opacity: 0.18, r: 2 }),
        T(440, 112, '样品', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        R(544, 126, 22, 48, { tone: 'amber', fill: true, opacity: 0.18, r: 2 }),
        T(555, 116, '探测器', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(120, 138, '加速', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(330, 206, '波长压缩', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(470, 206, '衍射', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 234, '电子枪、加速器、超快衍射', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '动量与相位必须一起算', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '4.2/0-0-f',
      '线性势与定态方程',
      '$V=-e\\mathcal{E}x$，方程 $\\psi\'\'+\\frac{2m}{\\hbar^2}(E+e\\mathcal{E}x)\\psi=0$；转折点 $x_t=-E/e\\mathcal{E}$，x>x_t 允许，x<x_t 禁戒。',
      [
        T(320, 24, '转折点 x_t 把空间分成两类', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 230, 588, 230, { tone: 'dim' }),
        A(580, 230, 600, 230, { tone: 'dim' }),
        T(590, 216, 'x', { size: 9.5, tone: 'dim' }),
        L(56, 230, 56, 56, { tone: 'dim' }),
        A(56, 68, 56, 52, { tone: 'dim' }),
        L(70, 96, 560, 224, { tone: 'amber', weight: 2 }),
        T(410, 128, 'V = −eℰx', { size: 9.5, tone: 'amber' }),
        L(70, 150, 560, 150, { tone: 'mint', dash: true }),
        T(72, 140, 'E', { size: 9.5, tone: 'mint' }),
        DOT(277, 150, { r: 3, tone: 'cyan' }),
        T(286, 138, 'x_t = −E/(eℰ)', { size: 9.5, tone: 'cyan' }),
        T(120, 184, '禁戒区：E < V', { size: 9.5, tone: 'violet' }),
        T(430, 190, '允许区：E > V', { size: 9.5, tone: 'mint' }),
        T(80, 78, 'x → −∞：V → +∞', { size: 9.5, tone: 'faint' }),
        T(430, 72, 'x → +∞：V → −∞', { size: 9.5, tone: 'faint' }),
        T(320, 250, '任意 E 都有解：连续谱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '线性势没有束缚态', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.2/0-1-f',
      '无量纲化：一个尺度 ℓ',
      "$z=(2me\\mathcal{E}/\\hbar^2)^{1/3}(x+E/e\\mathcal{E})$，$\\psi''+z\\psi=0$；特征长度 $\\ell=(\\hbar^2/2me\\mathcal{E})^{1/3}$，z=0 即转折点。",
      [
        T(320, 24, '一个尺度 ℓ，把 x 换成 z', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 96, 260, 110, { tone: 'violet', opacity: 0.08 }),
        BAND(320, 96, 268, 110, { tone: 'mint', opacity: 0.08 }),
        L(60, 206, 588, 206, { tone: 'dim' }),
        A(580, 206, 600, 206, { tone: 'dim' }),
        T(590, 192, 'x', { size: 9.5, tone: 'dim' }),
        L(320, 100, 320, 206, { tone: 'dim', dash: true }),
        T(320, 218, 'x_t（z = 0）', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        L(420, 120, 420, 206, { tone: 'dim', dash: true }),
        A(320, 128, 420, 128, { tone: 'amber', weight: 1.2 }),
        T(370, 118, 'ℓ', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(120, 170, 'z < 0：指数', { size: 9.5, tone: 'violet' }),
        T(460, 170, 'z > 0：振荡', { size: 9.5, tone: 'mint' }),
        T(320, 72, 'x = x_t + ℓ z', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 246, 'ℓ = (ħ²/2meℰ)^(1/3)', { size: 10.5, tone: 'text', anchor: 'middle' }),
        T(320, 270, 'ψ″ + zψ = 0', { size: 10.5, tone: 'mint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.2/1-0-f',
      '艾里函数由两支贝塞尔组成',
      '$\\mathrm{Ai}(-z)=\\frac{\\sqrt{z}}{3}[J_{1/3}(\\zeta)+J_{-1/3}(\\zeta)]$，$\\zeta=\\frac{2}{3}z^{3/2}$；两支同阶不同号，求和给出实的振荡解。',
      [
        T(320, 24, '两支贝塞尔相加得实 Ai', { size: 12.5, tone: 'text', anchor: 'middle' }),
        TAG(72, 58, 'ζ = (2/3)z^(3/2)', { tone: 'cyan', size: 9.5 }),
        L(70, 200, 540, 200, { tone: 'dim' }),
        A(532, 200, 552, 200, { tone: 'dim' }),
        T(546, 186, 'z', { size: 9.5, tone: 'dim' }),
        CURVE((z) => Math.sin((2 / 3) * z ** 1.5 + Math.PI / 4) / (Math.sqrt(Math.PI) * z ** 0.25), {
          x: 70,
          y: 74,
          w: 470,
          h: 120
        }, [0.05, 14], [-1, 1], { tone: 'mint', steps: 260 }),
        CURVE((z) => 1 / (Math.sqrt(Math.PI) * z ** 0.25), { x: 70, y: 74, w: 470, h: 120 }, [0.05, 14], [-1, 1], {
          tone: 'violet',
          dash: true,
          opacity: 0.55
        }),
        CURVE((z) => -1 / (Math.sqrt(Math.PI) * z ** 0.25), { x: 70, y: 74, w: 470, h: 120 }, [0.05, 14], [-1, 1], {
          tone: 'violet',
          dash: true,
          opacity: 0.55
        }),
        T(300, 66, '包络 ∝ z^(−1/4)', { size: 9.5, tone: 'violet' }),
        T(400, 214, '节点间距越来越小', { size: 9.5, tone: 'muted' }),
        T(320, 240, 'J₁/₃ 与 J₋₁/₃ 组合成实解', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, 'z → 0：Ai(0) ≈ 0.355', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.2/1-1-f',
      '汉克尔函数：实部 J，虚部 Y',
      '$H_{1/3}^{(1,2)}=J_{1/3}\\pm iY_{1/3}$；$H^{(1)}\\sim e^{i\\zeta}$ 为出射波，$H^{(2)}\\sim e^{-i\\zeta}$ 为入射波，适用条件 ζ≫1。',
      [
        T(320, 24, '实部 J、虚部 Y：组合出行波', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 200, 370, 200, { tone: 'dim' }),
        A(362, 200, 382, 200, { tone: 'dim' }),
        T(376, 186, 'ζ', { size: 9.5, tone: 'dim' }),
        CURVE((z) => Math.sqrt(2 / (Math.PI * z)) * Math.cos(z - (5 * Math.PI) / 12), {
          x: 70,
          y: 78,
          w: 300,
          h: 116
        }, [0.4, 10], [-1.6, 1.2], { tone: 'mint', steps: 160 }),
        CURVE((z) => Math.sqrt(2 / (Math.PI * z)) * Math.sin(z - (5 * Math.PI) / 12), {
          x: 70,
          y: 78,
          w: 300,
          h: 116
        }, [0.4, 10], [-1.6, 1.2], { tone: 'violet', dash: true, steps: 160 }),
        T(230, 70, 'J₁/₃', { size: 9.5, tone: 'mint' }),
        T(230, 218, 'Y₁/₃', { size: 9.5, tone: 'violet' }),
        T(456, 92, 'H⁽¹⁾ = J + iY', { size: 10, tone: 'mint' }),
        T(456, 116, '→ 出射行波', { size: 9.5, tone: 'muted' }),
        T(456, 156, 'H⁽²⁾ = J − iY', { size: 10, tone: 'violet' }),
        T(456, 180, '← 入射行波', { size: 9.5, tone: 'muted' }),
        T(456, 212, 'ζ ≫ 1 时成立', { size: 9.5, tone: 'faint' }),
        T(320, 242, '振幅 ∝ ζ^(−1/2)，两支共轭', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '方向由 e^(±iζ) 决定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '4.2/1-2-f',
      '允许区渐近：振幅与相位',
      '$\\mathrm{Ai}(-z)\\sim\\frac{1}{\\sqrt{\\pi}z^{1/4}}\\sin(\\zeta+\\frac{\\pi}{4})$：振幅按 $z^{-1/4}$ 衰减，相位固定偏 π/4，节点间距随 z 缩小。',
      [
        T(320, 24, '振幅 z^(−1/4)，相位偏 π/4', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 200, 540, 200, { tone: 'dim' }),
        A(532, 200, 552, 200, { tone: 'dim' }),
        T(546, 186, 'z', { size: 9.5, tone: 'dim' }),
        CURVE((z) => Math.sin((2 / 3) * z ** 1.5 + Math.PI / 4) / (Math.sqrt(Math.PI) * z ** 0.25), {
          x: 70,
          y: 76,
          w: 470,
          h: 118
        }, [0.3, 16], [-1, 1], { tone: 'mint', steps: 280 }),
        CURVE((z) => 1 / (Math.sqrt(Math.PI) * z ** 0.25), { x: 70, y: 76, w: 470, h: 118 }, [0.3, 16], [-1, 1], {
          tone: 'violet',
          dash: true,
          opacity: 0.55
        }),
        CURVE((z) => -1 / (Math.sqrt(Math.PI) * z ** 0.25), { x: 70, y: 76, w: 470, h: 118 }, [0.3, 16], [-1, 1], {
          tone: 'violet',
          dash: true,
          opacity: 0.55
        }),
        T(90, 68, '包络 ±z^(−1/4)/√π', { size: 9.5, tone: 'violet' }),
        T(120, 216, '节点间距 ∝ z^(−1/2)', { size: 9.5, tone: 'muted' }),
        T(420, 216, '相位 +π/4', { size: 9.5, tone: 'cyan' }),
        T(320, 244, 'z 越大，振荡越快、振幅越小', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '渐近式只在 z ≫ 1 成立', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.2/2-0-f',
      '局域动量与波长的取值范围',
      '$p=\\sqrt{2m(E+e\\mathcal{E}x)}$，$\\lambda=h/p$；转折点 x_t 处 p→0、λ→∞；远处 p∝√x，λ∝x^{-1/2}。',
      [
        T(320, 24, '转折点：p 归零，λ 发散', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 200, 540, 200, { tone: 'dim' }),
        A(532, 200, 552, 200, { tone: 'dim' }),
        T(546, 186, 'x', { size: 9.5, tone: 'dim' }),
        L(80, 200, 80, 70, { tone: 'dim' }),
        A(80, 82, 80, 66, { tone: 'dim' }),
        CURVE((x) => Math.sqrt(x), { x: 80, y: 78, w: 440, h: 112 }, [0, 1], [0, 1], { tone: 'mint' }),
        CURVE((x) => 0.32 / Math.sqrt(x), { x: 80, y: 78, w: 440, h: 112 }, [0.1, 1], [0, 1], {
          tone: 'violet'
        }),
        T(440, 88, 'p ∝ √x', { size: 9.5, tone: 'mint' }),
        T(300, 140, 'λ ∝ x^(−1/2)', { size: 9.5, tone: 'violet' }),
        T(84, 214, 'x_t：p = 0，λ → ∞', { size: 9.5, tone: 'cyan' }),
        T(320, 240, 'p 与 λ 互为倒数：一归零一发散', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '远场：p ∝ √x，λ ∝ x^(−1/2)', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.2/2-1-f',
      '概率流：密度乘速度',
      '$j=\\frac{\\hbar}{m}\\mathrm{Im}(\\psi^*\\psi^{\\prime})$，$dj/dx=0$；平面波给 $j=|A|^2\\hbar k/m=\\rho v$，密度与速度反比。',
      [
        T(320, 24, 'ρ 降、v 升，乘积恒定', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 200, 470, 200, { tone: 'dim' }),
        A(462, 200, 482, 200, { tone: 'dim' }),
        T(476, 186, 'x', { size: 9.5, tone: 'dim' }),
        L(70, 200, 70, 76, { tone: 'dim' }),
        A(70, 88, 70, 72, { tone: 'dim' }),
        CURVE((x) => Math.sqrt(x), { x: 70, y: 80, w: 400, h: 112 }, [0, 1], [0, 1], { tone: 'mint' }),
        CURVE((x) => 0.4 / Math.sqrt(x), { x: 70, y: 80, w: 400, h: 112 }, [0.16, 1], [0, 1], {
          tone: 'cyan'
        }),
        L(70, 155, 470, 155, { tone: 'amber', weight: 1.8 }),
        T(400, 84, 'v ∝ √x', { size: 9.5, tone: 'mint' }),
        T(120, 120, 'ρ ∝ 1/√x', { size: 9.5, tone: 'cyan' }),
        TAG(496, 80, 'j = ρv', { tone: 'amber', size: 10 }),
        T(496, 116, '无源区：j 不变', { size: 9.5, tone: 'muted' }),
        T(496, 140, '密度与速度反比', { size: 9.5, tone: 'muted' }),
        T(320, 240, '每个截面电子数相同', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, 'ψ = A e^(ikx) 时 j = |A|²ħk/m', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
