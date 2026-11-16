import { fig, T, R, BAND, L, A, DOT, TAG, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '4.5/overview',
    'sech² 势：束缚态与无反射',
    '势阱深度由 $\\lambda$ 决定；实指标给出有限个束缚态，整数 $\\lambda$ 时散射态无反射。',
    [
      T(320, 24, 'sech² 势：束缚态 + 无反射', { size: 13, tone: 'text', anchor: 'middle' }),
      L(44, 120, 408, 120, { tone: 'dim' }),
      T(44, 108, 'V = 0', { size: 9.5, tone: 'muted' }),
      CURVE(
        (x) => -1 / Math.cosh((x - 175) / 55) ** 2,
        { x: 52, y: 120, w: 350, h: 90 },
        [0, 350],
        [-1, 0],
        { tone: 'mint', weight: 2 }
      ),
      ...LEVEL(124, 330, 128, 'n = 0', { size: 10 }),
      ...LEVEL(164, 290, 150, 'n = 1', { size: 10 }),
      ...LEVEL(196, 258, 187, 'n = 2', { size: 10 }),
      ...PANEL(424, 46, 182, 150, '散射态', { tone: 'violet' }),
      CURVE((x) => Math.sin(x / 9), { x: 440, y: 76, w: 150, h: 26 }, [0, 150], [-1, 1], { tone: 'mint', steps: 80 }),
      T(440, 116, '入射波', { size: 9.5, tone: 'mint' }),
      CURVE((x) => Math.sin(x / 9), { x: 440, y: 128, w: 150, h: 26 }, [0, 150], [-1, 1], {
        tone: 'cyan',
        steps: 80
      }),
      T(440, 168, '透射：同振幅', { size: 9.5, tone: 'cyan' }),
      T(320, 244, '一个参数 λ：深度、宽度、束缚态数', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      TAG(44, 268, '整数 λ：R = 0，T = 1', { tone: 'violet', size: 10 }),
      TAG(340, 268, 'E_n ∝ −(λ−n)²（ħ²α²/2m）', { tone: 'mint', size: 9.5 })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '4.5/0-0',
      '光滑势阱：处处连续',
      '势在中心最深，向两侧按 $\\mathrm{sech}^2$ 指数趋零；没有尖角、没有突变，只有一个参数。',
      [
        T(320, 24, '光滑势阱：处处连续、导数有界', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(48, 86, 596, 86, { tone: 'dim' }),
        T(48, 74, 'V = 0', { size: 9.5, tone: 'muted' }),
        CURVE((x) => -1 / Math.cosh(1.35 * x) ** 2, { x: 50, y: 86, w: 540, h: 140 }, [-3.2, 3.2], [-1, 0], {
          tone: 'mint',
          weight: 2
        }),
        A(320, 222, 320, 96, { tone: 'amber', weight: 1.2 }),
        T(330, 164, 'V₀', { size: 10, tone: 'amber' }),
        T(320, 60, '中心最深，两侧指数趋零', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(84, 116, '无尖角', { size: 10, tone: 'mint' }),
        T(466, 112, '指数尾巴', { size: 9.5, tone: 'cyan' }),
        T(556, 110, 'V → 0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(320, 248, '只有一个耦合参数 λ 控制深度与宽度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        TAG(52, 272, 'sech²：无突变、无尖角', { tone: 'mint', size: 9.5 })
      ]
    ),
    '0-1': fig(
      '4.5/0-1',
      'λ 越大，阱越深、束缚态越多',
      '深度与宽度由同一个 $\\lambda$ 联系：$\\lambda$ 越大阱越深，能容纳的束缚态越多；一个参数统管全局。',
      [
        T(320, 24, 'λ 越大：阱越深，束缚态越多', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 272, 204, 'λ = 1', { tone: 'mint' }),
        L(46, 112, 294, 112, { tone: 'dim' }),
        CURVE((x) => -1 / Math.cosh(1.5 * x) ** 2, { x: 46, y: 112, w: 248, h: 62 }, [-2.6, 2.6], [-1, 0], {
          tone: 'mint',
          weight: 2
        }),
        ...LEVEL(142, 198, 143, 'n = 0', { size: 10 }),
        T(170, 232, '1 个束缚态', { size: 10, tone: 'muted', anchor: 'middle' }),
        ...PANEL(322, 44, 284, 204, 'λ = 3', { tone: 'violet' }),
        L(334, 112, 594, 112, { tone: 'dim' }),
        CURVE((x) => -1 / Math.cosh(1.2 * x) ** 2, { x: 330, y: 112, w: 220, h: 120 }, [-2.6, 2.6], [-1, 0], {
          tone: 'violet',
          weight: 2
        }),
        ...LEVEL(372, 508, 122, 'n = 2', { size: 10, tone: 'violet' }),
        ...LEVEL(400, 480, 152, 'n = 1', { size: 10, tone: 'violet' }),
        ...LEVEL(421, 459, 202, 'n = 0', { size: 10, tone: 'violet' }),
        T(464, 240, '3 个束缚态', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '束缚态数目由 λ 的整数部分给出', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '4.5/0-2',
      '特定参数下完全透明',
      '整数 $\\lambda$ 时势阱对入射波完全透明：没有反射支，透射波只多一个相位移动，波形不变。',
      [
        T(320, 24, '特定参数下，势阱对入射波完全透明', { size: 12.5, tone: 'text', anchor: 'middle' }),
        A(176, 70, 104, 70, { tone: 'faint', dash: true }),
        T(196, 70, '无反射支', { size: 9.5, tone: 'faint' }),
        L(48, 150, 592, 150, { tone: 'dim' }),
        CURVE((x) => -1 / Math.cosh(1.2 * x) ** 2, { x: 170, y: 150, w: 300, h: 90 }, [-3, 3], [-1, 0], {
          tone: 'amber',
          weight: 2
        }),
        CURVE((x) => Math.sin(x / 13), { x: 60, y: 96, w: 520, h: 34 }, [0, 520], [-1, 1], {
          tone: 'mint',
          weight: 1.6,
          steps: 160
        }),
        A(60, 180, 170, 180, { tone: 'mint', weight: 1.4 }),
        T(112, 168, '入射', { size: 10, tone: 'mint', anchor: 'middle' }),
        A(470, 180, 590, 180, { tone: 'cyan', weight: 1.4 }),
        T(530, 168, '透射', { size: 10, tone: 'cyan', anchor: 'middle' }),
        T(320, 214, 'V(x) = −V₀ sech²(αx)', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(320, 246, '波形穿过势阱，形状不变', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        TAG(60, 272, 'λ = 1, 2, 3 …：R = 0', { tone: 'violet', size: 10 })
      ]
    ),
    '1-0': fig(
      '4.5/1-0',
      'tanh 把实轴压进 (−1, 1)',
      '令 $u=\\tanh(\\alpha x)$，$x$ 从 −∞ 到 +∞ 对应 $u$ 从 −1 到 +1；方程随之变成连带勒让德方程。',
      [
        T(320, 24, 'tanh 把整条实轴压进 (−1, 1)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 90, 580, 90, { tone: 'dim' }),
        A(560, 90, 596, 90, { tone: 'dim' }),
        T(60, 78, 'x = −∞', { size: 9.5, tone: 'muted' }),
        T(580, 78, 'x = +∞', { size: 9.5, tone: 'muted', anchor: 'end' }),
        L(60, 195, 580, 195, { tone: 'dim', dash: true }),
        T(60, 195, 'u = 0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        CURVE((x) => Math.tanh(x), { x: 60, y: 140, w: 520, h: 110 }, [-3, 3], [-1, 1], { tone: 'mint', weight: 2 }),
        T(584, 128, 'u = +1', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(584, 258, 'u = −1', { size: 9.5, tone: 'mint', anchor: 'end' }),
        DOT(320, 195, { r: 3, tone: 'amber' }),
        T(330, 212, 'x = 0 → u = 0', { size: 9.5, tone: 'amber' }),
        T(320, 272, '单调映射：x 与 u 一一对应', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.5/1-1',
      '束缚态：有限个离散能级',
      '实指标下波函数在 $u=\\pm1$ 必须正则，只允许 $n=0,1,\\dots,N<\\lambda$，于是能谱有限而离散。',
      [
        T(320, 24, '束缚态：有限、离散、整数编号', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 86, 380, 86, { tone: 'dim' }),
        T(386, 86, 'V = 0', { size: 9.5, tone: 'muted' }),
        CURVE((x) => -1 / Math.cosh(1.1 * x) ** 2, { x: 60, y: 96, w: 320, h: 130 }, [-3, 3], [-1, 0], {
          tone: 'amber',
          dash: true,
          opacity: 0.55
        }),
        ...LEVEL(127, 313, 107),
        ...LEVEL(161, 279, 139),
        ...LEVEL(193, 247, 193),
        T(220, 100, 'E₂ = −1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(220, 132, 'E₁ = −4', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(220, 186, 'E₀ = −9', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(340, 96, 'E_n = −(λ−n)²（ħ²α²/2m）', { size: 10, tone: 'mint' }),
        T(340, 122, 'λ = 3：E = −9、−4、−1', { size: 10, tone: 'muted' }),
        T(340, 148, 'N < λ：束缚态个数有限', { size: 10, tone: 'violet' }),
        T(340, 174, 'n 只能取整数', { size: 10, tone: 'muted' }),
        T(340, 200, 'n → λ：能量趋于零', { size: 10, tone: 'amber' }),
        T(320, 250, '能级由整数编号，没有连续取值', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(60, 274, '间隔 = (2(λ−n)−1)·ħ²α²/2m', { size: 10, tone: 'faint' })
      ]
    ),
    '1-2': fig(
      '4.5/1-2',
      '纯虚指标描写散射态',
      '散射态取 $\\mu=ik/\\alpha$，阶数变成复数；连带勒让德函数在 $u=\\pm1$ 附近化为振荡相位因子。',
      [
        T(320, 24, '实指标给束缚态，虚指标给散射态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 250, 180, '指标 μ 平面', { tone: 'violet' }),
        L(64, 192, 268, 192, { tone: 'dim' }),
        A(250, 192, 272, 192, { tone: 'dim' }),
        L(140, 192, 140, 78, { tone: 'dim' }),
        A(140, 96, 140, 78, { tone: 'dim' }),
        T(262, 206, 'Re μ', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(152, 84, 'Im μ', { size: 9.5, tone: 'muted' }),
        DOT(102, 192, { r: 3.5, tone: 'mint' }),
        T(102, 212, '实轴：束缚', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        DOT(140, 110, { r: 3.5, tone: 'cyan' }),
        T(152, 110, 'μ = ik/α', { size: 9.5, tone: 'cyan' }),
        T(150, 168, '虚轴：散射', { size: 9.5, tone: 'cyan' }),
        ...PANEL(304, 46, 302, 180, '两端都变成行波', { tone: 'mint' }),
        T(318, 78, 'u → −1：振荡相位', { size: 9.5, tone: 'mint' }),
        CURVE((x) => Math.sin(x / 8), { x: 318, y: 88, w: 274, h: 28 }, [0, 274], [-1, 1], {
          tone: 'mint',
          steps: 120
        }),
        T(318, 136, 'u → +1：振荡相位', { size: 9.5, tone: 'violet' }),
        CURVE((x) => Math.sin(x / 8), { x: 318, y: 146, w: 274, h: 28 }, [0, 274], [-1, 1], {
          tone: 'violet',
          steps: 120
        }),
        T(318, 202, '相位因子 → 入射与出射行波', { size: 9.5, tone: 'muted' }),
        T(320, 248, '指标从实轴转到虚轴，解从束缚变散射', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        TAG(60, 274, 'μ = i k / α（纯虚）', { tone: 'cyan', size: 10 })
      ]
    ),
    '2-0': fig(
      '4.5/2-0',
      '整数 λ：反射被精确抵消',
      '整数 $\\lambda$ 时反射分量完全相消，$R=0$、$T=1$；透射波只留下一个相位移动，波形不畸变。',
      [
        T(320, 24, '整数 λ：反射被精确抵消', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 56, w: 430, h: 170 }, { xLabel: 'λ', yLabel: 'R' }),
        CURVE((x) => 0.8 * Math.sin(Math.PI * x) ** 2, { x: 64, y: 56, w: 430, h: 170 }, [0.9, 4.1], [0, 1], {
          tone: 'mint',
          steps: 240
        }),
        DOT(77.4, 226, { r: 3, tone: 'mint' }),
        DOT(211.8, 226, { r: 3, tone: 'mint' }),
        DOT(346.2, 226, { r: 3, tone: 'mint' }),
        DOT(480.6, 226, { r: 3, tone: 'mint' }),
        T(77, 240, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(212, 240, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(346, 240, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(481, 240, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 150, '峰间：R > 0', { size: 9.5, tone: 'muted' }),
        T(520, 84, 'T = 1', { size: 11, tone: 'amber' }),
        T(520, 108, '只差相位移动', { size: 10, tone: 'muted' }),
        T(520, 132, '波形不畸变', { size: 10, tone: 'muted' }),
        TAG(64, 264, 'λ = 1, 2, 3 …：R = 0', { tone: 'violet', size: 10 })
      ]
    ),
    '2-1': fig(
      '4.5/2-1',
      '无反射势是一层层叠出来的',
      '这种透明性与孤子、KdV 方程和达布变换相关：无反射势可看成一串“被挖掉反射”的势阱叠加。',
      [
        T(320, 24, '无反射势：一层层挖掉反射', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 300, 190, '达布链', { tone: 'mint' }),
        R(46, 72, 250, 26, { tone: 'mint', fill: true, opacity: 0.14, r: 6 }),
        T(58, 88, 'λ = 1：消去一层', { size: 10, tone: 'mint' }),
        R(46, 110, 250, 26, { tone: 'violet', fill: true, opacity: 0.14, r: 6 }),
        T(58, 126, 'λ = 2：再消一层', { size: 10, tone: 'violet' }),
        R(46, 148, 250, 26, { tone: 'cyan', fill: true, opacity: 0.14, r: 6 }),
        T(58, 164, 'λ = 3：完全透明', { size: 10, tone: 'cyan' }),
        TAG(46, 200, 'R = 0', { tone: 'mint', size: 10 }),
        ...PANEL(348, 44, 262, 190, '孤子：波形不变', { tone: 'violet' }),
        L(360, 168, 596, 168, { tone: 'dim' }),
        CURVE((x) => 1 / Math.cosh(1.6 * x) ** 2, { x: 366, y: 110, w: 220, h: 58 }, [-3, 3], [0, 1], {
          tone: 'violet',
          weight: 2
        }),
        T(366, 92, '振幅不变，无拖尾', { size: 9.5, tone: 'muted' }),
        A(400, 186, 520, 186, { tone: 'violet', weight: 1.3 }),
        T(440, 200, '传播方向', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 258, '有势场，不必有散射', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '4.5/2-2',
      '改 λ 就能连续调反射',
      '$\\lambda$ 不是整数时反射不再为零，强弱由 $\\sinh(\\pi k/\\alpha)$ 控制，可从透明连续调到不透明。',
      [
        T(320, 24, '改 λ：从透明连续调到不透明', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 52, w: 440, h: 180 }, { xLabel: 'λ', yLabel: 'R' }),
        CURVE((x) => 0.95 * Math.abs(Math.sin(Math.PI * x)), { x: 64, y: 52, w: 440, h: 180 }, [0, 4], [0, 1], {
          tone: 'mint',
          steps: 240
        }),
        CURVE((x) => 0.35 * Math.abs(Math.sin(Math.PI * x)), { x: 64, y: 52, w: 440, h: 180 }, [0, 4], [0, 1], {
          tone: 'violet',
          steps: 240,
          dash: true
        }),
        DOT(174, 232, { r: 3, tone: 'mint' }),
        DOT(284, 232, { r: 3, tone: 'mint' }),
        DOT(394, 232, { r: 3, tone: 'mint' }),
        T(174, 246, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(284, 246, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(394, 246, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(512, 70, 'k/α 小', { size: 10, tone: 'mint' }),
        T(512, 92, '反射强', { size: 10, tone: 'mint' }),
        T(512, 116, 'k/α 大', { size: 10, tone: 'violet' }),
        T(512, 138, '反射弱', { size: 10, tone: 'violet' }),
        T(320, 254, '整数 λ：R = 0；非整数：R > 0', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        TAG(64, 274, 'sinh(πk/α) 越大，反射越小', { tone: 'violet', size: 9.5 })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '4.5/0-0-f',
      '三个因子：刻度、耦合、形状',
      '$V(x)=-\\frac{\\hbar^2\\alpha^2}{2m}\\lambda(\\lambda+1)\\,\\mathrm{sech}^2(\\alpha x)$：前因子给出深度，$\\mathrm{sech}^2$ 给出形状。',
      [
        T(320, 24, '三个因子：量子刻度 × 耦合 × 形状', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(48, 54, 150, 26, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(123, 67, 'ħ²α²/2m', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(212, 67, '×', { size: 12, tone: 'text' }),
        BAND(230, 54, 110, 26, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(285, 67, 'λ(λ+1)', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(356, 67, '×', { size: 12, tone: 'text' }),
        BAND(374, 54, 150, 26, { tone: 'amber', opacity: 0.24, r: 5 }),
        T(449, 67, 'sech²(αx)', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(538, 67, '= −V(x)', { size: 11, tone: 'text' }),
        CURVE((x) => -1 / Math.cosh(1.1 * x) ** 2, { x: 60, y: 120, w: 520, h: 110 }, [-3.4, 3.4], [-1, 0], {
          tone: 'mint',
          weight: 2
        }),
        L(320, 120, 320, 230, { tone: 'dim', dash: true }),
        T(330, 224, '中心：−V₀', { size: 10, tone: 'amber' }),
        T(64, 110, 'x → ±∞：V → 0', { size: 9.5, tone: 'muted' }),
        T(470, 104, 'α 越大，阱越窄', { size: 9.5, tone: 'violet' }),
        T(320, 262, '形状固定，深度由 λ 决定', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.5/0-1-f',
      '深度随 λ 二次增大',
      '$V_0=\\frac{\\hbar^2\\alpha^2}{2m}\\lambda(\\lambda+1)$，$\\lambda>0$：$\\lambda\\to0$ 时阱消失，$\\lambda\\gg1$ 时深度按 $\\lambda^2$ 增长。',
      [
        T(320, 24, '深度随 λ 单调增大', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 56, w: 430, h: 170 }, { xLabel: 'λ', yLabel: 'V₀' }),
        CURVE((x) => x * (x + 1), { x: 64, y: 56, w: 430, h: 170 }, [0, 4.2], [0, 28], { tone: 'mint', weight: 2 }),
        DOT(166.4, 213.9, { r: 3.5, tone: 'mint' }),
        DOT(268.8, 189.6, { r: 3.5, tone: 'mint' }),
        DOT(371.2, 153.1, { r: 3.5, tone: 'mint' }),
        T(166, 202, '2', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(269, 178, '6', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(371, 141, '12', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(166, 240, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(269, 240, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(371, 240, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(420, 172, 'λ ≫ 1：V₀ ∝ λ²', { size: 10, tone: 'violet' }),
        T(420, 194, 'λ → 0：V₀ → 0', { size: 10, tone: 'muted' }),
        T(420, 216, 'λ = 1, 2, 3 → 2, 6, 12', { size: 10, tone: 'mint' }),
        T(320, 262, 'λ 同时决定深度与束缚态数目', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.5/1-0-f',
      '映射有界，指标可虚可实',
      '$u=\\tanh(\\alpha x)\\in(-1,1)$ 单调有界；束缚态 $\\mu$ 为实数，散射态 $\\mu=ik/\\alpha$ 落在虚轴上。',
      [
        T(320, 24, '一个替换同时管住两端', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE((x) => Math.tanh(x * 1.2), { x: 56, y: 84, w: 280, h: 120 }, [-3, 3], [-1, 1], {
          tone: 'mint',
          weight: 2
        }),
        T(56, 74, 'u = +1', { size: 9.5, tone: 'mint' }),
        T(190, 60, 'u = tanh(αx)', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(56, 216, 'u = −1', { size: 9.5, tone: 'mint' }),
        T(370, 80, 'x → −∞ 时 u → −1', { size: 10, tone: 'muted' }),
        T(370, 104, 'x → +∞ 时 u → +1', { size: 10, tone: 'muted' }),
        T(370, 128, 'x = 0 时 u = 0', { size: 10, tone: 'muted' }),
        T(370, 160, '散射态：u = i k/α', { size: 10, tone: 'cyan' }),
        T(370, 184, '纯虚指标 ⇒ 两端振荡', { size: 10, tone: 'cyan' }),
        T(370, 208, '而不是指数升降', { size: 10, tone: 'faint' }),
        T(320, 252, '单调、有界：映射不丢信息', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '同一变量把方程变成勒让德方程', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.5/1-1-f',
      '能级公式：平方把能级拉向零',
      '$E_n=-\\frac{\\hbar^2\\alpha^2}{2m}(\\lambda-n)^2$：记 $m=\\lambda-n$，能量正比于 $m^2$，$m$ 只取整数，故能谱有限、间隔按奇数递减。',
      [
        T(320, 24, '能级公式：平方把能级拉向零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 52, 150, 26, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(135, 69, 'ħ²α²/2m', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(222, 69, '×', { size: 12, tone: 'text' }),
        BAND(238, 52, 130, 26, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(303, 69, '(λ−n)²', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(380, 69, '= −E_n', { size: 11, tone: 'text' }),
        ...AXIS({ x: 70, y: 100, w: 300, h: 110 }, { xLabel: 'm = λ−n', yLabel: '−E' }),
        CURVE((x) => x * x, { x: 70, y: 100, w: 300, h: 110 }, [0, 3.3], [0, 11], { tone: 'violet', weight: 2 }),
        DOT(343, 120, { r: 3.5, tone: 'mint' }),
        DOT(252, 170, { r: 3.5, tone: 'mint' }),
        DOT(161, 200, { r: 3.5, tone: 'mint' }),
        T(336, 114, '9', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(245, 164, '4', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(154, 194, '1', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(70, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(161, 224, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(252, 224, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(343, 224, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 106, 'n = 0 对应最大的 m', { size: 10, tone: 'mint' }),
        T(400, 130, 'n 增大：能量向零靠拢', { size: 10, tone: 'muted' }),
        T(400, 154, '相邻间隔按奇数递减', { size: 10, tone: 'amber' }),
        T(400, 178, 'm 只能取整数', { size: 10, tone: 'violet' }),
        T(400, 202, 'n ≤ N < λ：能级个数有限', { size: 10, tone: 'muted' }),
        T(320, 244, '平方压低：越深的能级间隔越大', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, 'n → λ：能量趋于零，束缚态消失', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.5/2-0-f',
      '整数 λ 使 R 恒为零',
      '$R(k)=0$、$T(k)=1$（$\\lambda=1,2,3,\\dots$）：透射率始终为一，反射项在每个整数 $\\lambda$ 上归零。',
      [
        T(320, 24, '透明条件：R 归零、T 撑满', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 86, 570, 86, { tone: 'dim' }),
        T(70, 72, '0', { size: 9.5, tone: 'muted' }),
        T(570, 72, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        BAND(70, 96, 500, 22, { tone: 'mint', opacity: 0.32, r: 5 }),
        T(320, 107, 'T = 1', { size: 11, tone: 'mint', anchor: 'middle' }),
        R(70, 130, 500, 20, { tone: 'violet', dash: true, r: 5 }),
        T(320, 140, 'R = 0', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(70, 168, '每个整数 λ 都满足', { size: 10, tone: 'muted' }),
        L(150, 196, 530, 196, { tone: 'dim' }),
        DOT(190, 196, { r: 3.5, tone: 'mint' }),
        DOT(320, 196, { r: 3.5, tone: 'mint' }),
        DOT(450, 196, { r: 3.5, tone: 'mint' }),
        T(190, 214, 'λ = 1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 214, 'λ = 2', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(450, 214, 'λ = 3', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 240, '反射与透射之和恒为一', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        TAG(70, 266, '只留下一个相位移动 δ', { tone: 'mint', size: 10 })
      ]
    ),
    '2-1': fig(
      '4.5/2-1-f',
      '分子为零 ⇒ 反射为零',
      '$|R|^2=\\frac{\\sin^2(\\pi\\lambda/2)}{\\sinh^2(\\pi k/\\alpha)+\\sin^2(\\pi\\lambda/2)}$：分子只在整数 $\\lambda$ 取零，比值始终不超过一。',
      [
        T(320, 24, '分子管 λ，分母再加波数项', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(56, 52, 210, 26, { tone: 'mint', opacity: 0.26, r: 5 }),
        T(161, 65, 'sin²(πλ/2)', { size: 11, tone: 'mint', anchor: 'middle' }),
        L(56, 88, 300, 88, { tone: 'text' }),
        BAND(56, 96, 120, 26, { tone: 'violet', opacity: 0.26, r: 5 }),
        T(116, 109, 'sinh²(πk/α)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(192, 109, '+', { size: 12, tone: 'text' }),
        BAND(206, 96, 110, 26, { tone: 'amber', opacity: 0.26, r: 5 }),
        T(261, 109, 'sin²(πλ/2)', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(56, 150, '分子：λ 的调制项', { size: 10, tone: 'mint' }),
        T(56, 174, '分母：波数项 + 同一调制', { size: 10, tone: 'violet' }),
        T(56, 198, '整数 λ：分子为零 ⇒ R = 0', { size: 10, tone: 'amber' }),
        T(56, 222, 'k → 0：两项相等 ⇒ R → 1', { size: 10, tone: 'cyan' }),
        TAG(56, 248, '0 ≤ |R|² ≤ 1', { tone: 'mint', size: 10 }),
        T(330, 60, 'R 随波数 k 衰减', { size: 10, tone: 'text' }),
        ...AXIS({ x: 340, y: 84, w: 230, h: 130 }, { xLabel: 'k', yLabel: 'R' }),
        CURVE((x) => 1 / (1 + (x * 1.7) ** 2), { x: 340, y: 84, w: 230, h: 130 }, [0, 4], [0, 1], {
          tone: 'cyan',
          weight: 2
        }),
        T(348, 196, 'k 小：R 接近 1', { size: 9.5, tone: 'cyan' }),
        T(500, 110, 'k 大：R → 0', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(320, 274, '分母不小于分子，比值不会超过一', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}

export default set
