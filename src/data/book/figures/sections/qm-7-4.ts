import { fig, T, BAND, L, A, DOT, CURVE, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '7.4/overview',
    '箱归一化：连续谱切成离散',
    '周期边界 $\\psi(x+L)=\\psi(x)$ 要求 $k=2\\pi n/L$：连续动量谱被切成等间距离散点；$L\\to\\infty$ 时点距趋零，求和回到积分与 δ 归一化。',
    [
      T(320, 24, '箱归一化：连续谱切成离散', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 44, 188, 190, '连续谱', { tone: 'violet' }),
      L(44, 128, 196, 128, { tone: 'dim' }),
      A(188, 128, 204, 128, { tone: 'dim' }),
      BAND(44, 112, 152, 32, { tone: 'violet', opacity: 0.18, r: 6 }),
      T(120, 166, 'k 连续取值', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(44, 196, '平面波不可归一', { size: 9.5, tone: 'muted' }),
      T(44, 216, '只能靠 δ 归一化', { size: 9.5, tone: 'faint' }),
      A(218, 140, 234, 140, { tone: 'dim' }),
      ...PANEL(236, 44, 188, 190, '周期箱', { tone: 'mint' }),
      L(252, 168, 408, 168, { tone: 'dim' }),
      L(252, 168, 252, 86, { tone: 'amber' }),
      L(408, 168, 408, 86, { tone: 'amber' }),
      ...[268, 300, 332, 364, 396].map((x) => DOT(x, 168, { r: 2.8, tone: 'mint' })),
      T(330, 92, 'k = 2πn/L', { size: 10.5, tone: 'mint', anchor: 'middle' }),
      T(330, 196, '等间距离散', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(330, 216, 'ψ(x+L) = ψ(x)', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      A(426, 140, 442, 140, { tone: 'dim' }),
      ...PANEL(444, 44, 168, 190, 'L → ∞', { tone: 'cyan' }),
      L(456, 168, 594, 168, { tone: 'dim' }),
      ...[456, 467, 478, 489, 500, 511, 522, 533, 544, 555, 566, 577, 588].map((x) =>
        DOT(x, 168, { r: 1.8, tone: 'cyan' })
      ),
      T(524, 92, 'Δk → 0', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
      T(524, 196, '求和 → 积分', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(524, 216, 'δ 函数重现', { size: 9.5, tone: 'faint', anchor: 'middle' }),
      T(320, 254, '周期边界把连续谱切成离散', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 274, 'L → ∞ 又平滑回到积分', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '7.4/0-0',
      '波函数在两端必须接上',
      '周期条件 $\\psi(x+L)=\\psi(x)$：把同一段波形逐箱复制，两端取值与斜率都必须连续接上。',
      [
        T(320, 24, '波函数在两端必须接上', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 150, 548, 150, { tone: 'dim' }),
        A(540, 150, 558, 150, { tone: 'dim' }),
        T(564, 136, 'x', { size: 9.5, tone: 'dim' }),
        L(70, 88, 70, 192, { tone: 'amber', weight: 2 }),
        L(298, 88, 298, 192, { tone: 'amber', weight: 2 }),
        L(526, 88, 526, 192, { tone: 'amber', weight: 2 }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 228), { x: 70, y: 110, w: 228, h: 80 }, [0, 228], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 228), { x: 298, y: 110, w: 228, h: 80 }, [0, 228], [-1, 1], {
          tone: 'cyan',
          weight: 1.8,
          dash: true
        }),
        T(62, 113, '+1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 153, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 193, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 208, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(298, 208, 'L', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(526, 208, '2L', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(70, 228, 298, 228, { tone: 'mint', weight: 1.2 }),
        T(184, 222, 'x + L', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(70, 252, '同一段波形逐箱复制', { size: 9.5, tone: 'muted' }),
        T(70, 272, '两端取值与斜率都接上', { size: 9.5, tone: 'faint' })
      ]
    ),
    '0-1': fig(
      '7.4/0-1',
      'e^{ikL} = 1 只允许离散 k',
      '平面波要求 $e^{ikL}=1$，于是 $kL=2\\pi n$：原本处处可取的连续谱，只剩等间距的离散点。',
      [
        T(320, 24, 'exp(ikL) = 1 只允许离散 k', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 44, 180, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(150, 61, 'exp(ikL) = 1', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(252, 60, '⇒', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(272, 44, 180, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(362, 61, 'kL = 2πn', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        L(70, 176, 596, 176, { tone: 'dim' }),
        A(588, 176, 606, 176, { tone: 'dim' }),
        T(600, 162, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...[100, 155, 210, 265, 320, 375, 430, 485, 540].flatMap((x) => [
          L(x, 176, x, 168, { tone: 'dim' }),
          DOT(x, 176, { r: 3, tone: 'mint' })
        ]),
        T(100, 196, '−4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(155, 196, '−3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(210, 196, '−2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(265, 196, '−1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(375, 196, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(430, 196, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(485, 196, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(540, 196, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(375, 214, 430, 214, { tone: 'amber', weight: 1.2 }),
        T(402, 230, 'Δk = 2π/L', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(70, 130, '原本连续谱处处可取', { size: 9.5, tone: 'violet' }),
        T(470, 130, '现在只剩离散点', { size: 9.5, tone: 'mint' }),
        T(70, 254, 'n 为整数，含 0 与负值', { size: 9.5, tone: 'muted' }),
        T(70, 274, '相邻间隔由箱长唯一决定', { size: 9.5, tone: 'faint' })
      ]
    ),
    '0-2': fig(
      '7.4/0-2',
      '归一化：振幅取 1/√L',
      '取 $\\psi_n=L^{-1/2}e^{ik_nx}$，使 $\\int_0^L|\\psi_n|^2dx=1$：每个本征函数都真正平方可积。',
      [
        T(320, 24, '归一化：振幅取 1/√L', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 286, 190, '波函数', { tone: 'mint' }),
        L(56, 136, 292, 136, { tone: 'faint', dash: true }),
        CURVE((x) => Math.cos(2 * Math.PI * x), { x: 56, y: 96, w: 236, h: 80 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(46, 99, '+1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(46, 139, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(46, 179, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(292, 196, 'L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(56, 218, '实部像驻波，振幅 = 1/√L', { size: 9.5, tone: 'mint' }),
        T(56, 240, '端点在箱壁处仍要接上', { size: 9.5, tone: 'faint' }),
        ...PANEL(328, 44, 284, 190, '概率密度', { tone: 'cyan' }),
        BAND(352, 136, 236, 40, { tone: 'cyan', opacity: 0.16, r: 2 }),
        L(352, 176, 588, 176, { tone: 'dim' }),
        L(352, 136, 588, 136, { tone: 'cyan', weight: 1.8 }),
        T(592, 139, '1/L', { size: 9.5, tone: 'cyan' }),
        T(344, 179, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(352, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(588, 196, 'L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(470, 158, '矩形面积 = 1', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(352, 218, '箱内每点概率相同', { size: 9.5, tone: 'muted' }),
        T(352, 232, 'L 越大，振幅越小', { size: 9.5, tone: 'faint' }),
        T(320, 258, '平方可积：概率总和恰好为 1', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '7.4/1-0',
      '不同 n 的本征函数正交',
      '$\\int_0^L\\psi_m^*\\psi_n\\,dx=\\delta_{mn}$：不同态的内积为零，同一个态的内积为一。',
      [
        T(320, 24, '不同 n 的本征函数正交', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 286, 192, 'm ≠ n', { tone: 'violet' }),
        L(52, 138, 288, 138, { tone: 'faint', dash: true }),
        T(46, 103, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(46, 141, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(46, 179, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        CURVE((x) => 0.5 * (Math.cos(5 * Math.PI * x) + Math.cos(Math.PI * x)), { x: 52, y: 100, w: 236, h: 76 }, [0, 1], [-1, 1], {
          tone: 'violet',
          weight: 1.7,
          steps: 140
        }),
        T(76, 112, '+', { size: 11, tone: 'violet' }),
        T(112, 158, '−', { size: 11, tone: 'violet' }),
        T(164, 112, '+', { size: 11, tone: 'violet' }),
        T(216, 158, '−', { size: 11, tone: 'violet' }),
        T(270, 112, '+', { size: 11, tone: 'violet' }),
        T(52, 200, '正负面积逐段抵消', { size: 9.5, tone: 'violet' }),
        T(52, 220, '内积 = 0', { size: 9.5, tone: 'muted' }),
        ...PANEL(328, 44, 284, 192, 'm = n', { tone: 'mint' }),
        L(352, 176, 588, 176, { tone: 'dim' }),
        CURVE((x) => Math.cos(2 * Math.PI * x) ** 2, { x: 352, y: 96, w: 236, h: 80 }, [0, 1], [0, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(344, 99, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(344, 179, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(352, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(588, 196, 'L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 218, '处处非负，面积 = 1', { size: 9.5, tone: 'mint' }),
        T(352, 232, '归一化已被振幅吸收', { size: 9.5, tone: 'faint' }),
        T(320, 256, '∫₀ᴸ ψm*ψn dx = δmn', { size: 12, tone: 'text', anchor: 'middle' }),
        T(320, 276, '正交：不同态彼此完全不重叠', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '7.4/1-1',
      '完备性：求和给出 δ 函数',
      '$\\sum_n\\psi_n(x)\\psi_n^*(x\')=\\delta(x-x\')$：箱本征函数是一组完整基，$L$ 越大峰越尖。',
      [
        T(320, 24, '完备性：求和给出 δ 函数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 176, 596, 176, { tone: 'dim' }),
        T(64, 100, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 179, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        CURVE((x) => 0.5 * Math.exp(-(((x - 0.5) / 0.09) ** 2)), { x: 70, y: 96, w: 520, h: 80 }, [0, 1], [0, 1.15], {
          tone: 'cyan',
          weight: 1.8
        }),
        CURVE((x) => 1.08 * Math.exp(-(((x - 0.5) / 0.012) ** 2)), { x: 70, y: 96, w: 520, h: 80 }, [0, 1], [0, 1.15], {
          tone: 'mint',
          weight: 2,
          steps: 220
        }),
        L(330, 176, 330, 98, { tone: 'amber', dash: true }),
        T(338, 92, 'x′', { size: 9.5, tone: 'amber' }),
        T(70, 194, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 194, 'x′', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(590, 194, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 216, 'L 有限：求和是有限宽的峰', { size: 9.5, tone: 'cyan' }),
        T(70, 238, 'L → ∞：只剩 x = x′ 的尖峰', { size: 9.5, tone: 'mint' }),
        T(452, 130, '峰高 ∝ L', { size: 9.5, tone: 'muted' }),
        T(320, 258, 'Σn ψn(x)ψn*(x′) = δ(x−x′)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        T(320, 276, '任一波函数都能由这组基拼出', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '7.4/1-2',
      '任意态按箱本征函数展开',
      '$\\psi=\\sum_n c_n\\psi_n$，$c_n=\\int\\psi_n^*\\psi\\,dx$：展开系数就是各本征态的概率振幅。',
      [
        T(320, 24, '任意态按箱本征函数展开', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 286, 192, '任意态 ψ', { tone: 'mint' }),
        L(52, 140, 288, 140, { tone: 'faint', dash: true }),
        CURVE((x) => 0.55 * Math.sin(2 * Math.PI * x) + 0.28 * Math.sin(6 * Math.PI * x), { x: 52, y: 100, w: 236, h: 80 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8,
          steps: 140
        }),
        T(44, 103, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(44, 143, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(44, 183, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 198, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(288, 198, 'L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 220, '形状任意，但必须满足周期条件', { size: 9.5, tone: 'muted' }),
        ...PANEL(328, 44, 284, 192, '系数 |cₙ|²', { tone: 'violet' }),
        L(352, 176, 588, 176, { tone: 'dim' }),
        L(352, 176, 352, 76, { tone: 'dim' }),
        BAND(376, 106, 24, 70, { tone: 'violet', opacity: 0.3, r: 2 }),
        BAND(424, 128, 24, 48, { tone: 'violet', opacity: 0.3, r: 2 }),
        BAND(472, 150, 24, 26, { tone: 'violet', opacity: 0.3, r: 2 }),
        BAND(520, 160, 24, 16, { tone: 'violet', opacity: 0.3, r: 2 }),
        T(388, 194, 'n=1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(436, 194, 'n=2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(484, 194, 'n=3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(532, 194, 'n=4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 220, '低阶系数大，高阶很快变小', { size: 9.5, tone: 'violet' }),
        T(320, 256, 'ψ = Σ cn ψn，cn = ∫ψn*ψ dx', { size: 11.5, tone: 'text', anchor: 'middle' }),
        T(320, 276, '概率按 |cn|² 分配，与离散谱一致', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '7.4/2-0',
      '箱越长，k 的点距越小',
      '$\\Delta k=2\\pi/L$：箱长加倍，相邻波数间隔减半；$L\\to\\infty$ 时间隔趋于零。',
      [
        T(320, 24, '箱越长，k 的点距越小', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(70, 62, 'L 小：点稀疏', { size: 9.5, tone: 'violet' }),
        A(70, 84, 190, 84, { tone: 'violet', weight: 1.2 }),
        T(130, 76, 'Δk = 2π/L', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        L(70, 104, 596, 104, { tone: 'dim' }),
        ...[70, 190, 310, 430, 550].map((x) => DOT(x, 104, { r: 3, tone: 'violet' })),
        T(70, 120, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(590, 120, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 152, 'L 大：点密集', { size: 9.5, tone: 'cyan' }),
        A(70, 174, 100, 174, { tone: 'cyan', weight: 1.2 }),
        T(85, 166, 'Δk/4', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        L(70, 194, 596, 194, { tone: 'dim' }),
        ...[70, 100, 130, 160, 190, 220, 250, 280, 310, 340, 370, 400, 430, 460, 490, 520, 550, 580].map((x) =>
          DOT(x, 194, { r: 2.2, tone: 'cyan' })
        ),
        T(70, 210, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(590, 210, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 238, '同样一段 k，L 越大装下越多点', { size: 9.5, tone: 'muted' }),
        T(70, 258, '点距按 1/L 收缩', { size: 9.5, tone: 'faint' }),
        T(320, 278, 'Δk → 0 时，离散谱看起来就是连续谱', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '7.4/2-1',
      '求和过渡为积分：数密度 L/2π',
      '$\\sum_n\\to(L/2\\pi)\\int dk$：每个离散点占据 $\\Delta k=2\\pi/L$ 的宽度，求和自然长成积分。',
      [
        T(320, 24, '求和过渡为积分：数密度 L/2π', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(52, 44, 120, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(112, 61, 'Σn', { size: 11, tone: 'violet', anchor: 'middle' }),
        A(180, 57, 224, 57, { tone: 'dim', weight: 1.3 }),
        BAND(232, 44, 230, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(347, 61, '(L/2π) ∫ dk', { size: 11, tone: 'mint', anchor: 'middle' }),
        L(80, 190, 540, 190, { tone: 'dim' }),
        A(532, 190, 550, 190, { tone: 'dim' }),
        T(548, 176, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => Math.exp(-0.5 * (((x - 0.5) / 0.18) ** 2)), { x: 80, y: 80, w: 460, h: 110 }, [0, 1], [0, 1.2], {
          tone: 'mint',
          weight: 1.8
        }),
        ...[0.1, 0.22, 0.34, 0.46, 0.58, 0.7, 0.82, 0.94].flatMap((u) => {
          const h = 88 * Math.exp(-0.5 * (((u - 0.5) / 0.18) ** 2))
          const x = 80 + u * 460
          return [BAND(x - 5, 190 - h, 10, h, { tone: 'violet', opacity: 0.24, r: 1 })]
        }),
        T(80, 206, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 206, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(540, 206, '2π/L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(80, 232, '每个点代表一个态，分得 Δk 的宽度', { size: 9.5, tone: 'violet' }),
        T(80, 254, '点越密，阶梯越贴近曲线', { size: 9.5, tone: 'mint' }),
        T(320, 276, 'L 越大，权重 L/2π 越大，但单点贡献越小', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '7.4/2-2',
      'L → ∞：求和收敛为 δ',
      '$\\lim_{L\\to\\infty}\\sum_n\\psi_n(x)\\psi_n^*(x\')=\\delta(x-x\')$：面积恒为一，峰越窄越高。',
      [
        T(320, 24, 'L → ∞：求和收敛为 δ', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 186, 160, 'L 小', { tone: 'violet' }),
        L(48, 176, 194, 176, { tone: 'dim' }),
        CURVE((x) => 0.42 * Math.exp(-(((x - 0.5) / 0.16) ** 2)), { x: 48, y: 96, w: 146, h: 80 }, [0, 1], [0, 1], {
          tone: 'violet',
          weight: 1.8
        }),
        T(121, 194, '峰宽 ~ 1/L', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        ...PANEL(226, 44, 186, 160, 'L 中', { tone: 'cyan' }),
        L(246, 176, 392, 176, { tone: 'dim' }),
        CURVE((x) => 0.72 * Math.exp(-(((x - 0.5) / 0.07) ** 2)), { x: 246, y: 96, w: 146, h: 80 }, [0, 1], [0, 1], {
          tone: 'cyan',
          weight: 1.8
        }),
        T(319, 194, '峰变高变窄', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        ...PANEL(424, 44, 188, 160, 'L → ∞', { tone: 'mint' }),
        L(444, 176, 592, 176, { tone: 'dim' }),
        A(518, 176, 518, 84, { tone: 'mint', weight: 2.2 }),
        T(526, 100, 'δ(x−x′)', { size: 9.5, tone: 'mint' }),
        T(518, 194, '宽度 → 0', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(28, 224, '三种箱长共用同一横轴，峰下面积都等于 1', { size: 9.5, tone: 'muted' }),
        T(28, 246, '箱越大，峰越挤向 x = x′ 一点', { size: 9.5, tone: 'faint' }),
        T(320, 270, 'lim Σ ψn(x)ψn*(x′) = δ(x−x′)', { size: 11, tone: 'text', anchor: 'middle' })
      ]
    ),
    // PARAGRAPHS
  },
  formulas: {
    '0-0': fig(
      '7.4/0-0-f',
      'ψ(x+L)=ψ(x)：箱首尾是同一点',
      '$\\psi(x+L)=\\psi(x)$：波形以 $L$ 为周期重复；它把连续 $k$ 筛成 $2\\pi n/L$，$L\\to\\infty$ 时筛孔消失。',
      [
        T(320, 24, 'ψ(x+L)=ψ(x)：箱首尾是同一点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 226, 190, '周期复制', { tone: 'mint' }),
        L(48, 142, 248, 142, { tone: 'dim' }),
        L(48, 142, 48, 80, { tone: 'amber' }),
        L(148, 142, 148, 80, { tone: 'amber' }),
        L(248, 142, 248, 80, { tone: 'amber' }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 100), { x: 48, y: 106, w: 100, h: 72 }, [0, 100], [-1, 1], {
          tone: 'mint',
          weight: 1.7
        }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 100), { x: 148, y: 106, w: 100, h: 72 }, [0, 100], [-1, 1], {
          tone: 'cyan',
          weight: 1.7,
          dash: true
        }),
        T(98, 158, 'L', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(198, 158, '2L', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(48, 184, '波形逐箱复制', { size: 9.5, tone: 'muted' }),
        T(48, 204, '首尾取值与斜率都接上', { size: 9.5, tone: 'faint' }),
        BAND(272, 50, 320, 28, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(432, 68, 'ψ(x+L) = ψ(x)', { size: 11.5, tone: 'mint', anchor: 'middle' }),
        T(272, 104, '含义：箱的两端是同一个物理点', { size: 9.5, tone: 'mint' }),
        T(272, 128, '后果：k 只能取 2πn/L', { size: 9.5, tone: 'violet' }),
        T(272, 152, '几何：波形按 L 无缝平移', { size: 9.5, tone: 'amber' }),
        T(272, 176, '极限：L → ∞ 时约束消失', { size: 9.5, tone: 'cyan' }),
        T(272, 200, '连续谱与 δ 归一化重新出现', { size: 9.5, tone: 'faint' }),
        T(272, 224, '箱子是计算工具，不是真实墙', { size: 9.5, tone: 'muted' }),
        T(320, 254, '边界条件不是细节，它决定谱的结构', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '换一种边界，就换一套离散 k', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '7.4/0-1-f',
      'k_n = 2πn/L：等间距的动量格点',
      '$k_n=2\\pi n/L$，$n=0,\\pm1,\\pm2,\\dots$：所有整数都允许，相邻间隔恒为 $2\\pi/L$。',
      [
        T(320, 24, 'k_n = 2πn/L：等间距的动量格点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(52, 48, 190, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(147, 65, 'k_n = 2πn/L', { size: 11, tone: 'mint', anchor: 'middle' }),
        BAND(258, 48, 150, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(333, 65, 'n ∈ ℤ', { size: 11, tone: 'violet', anchor: 'middle' }),
        BAND(424, 48, 188, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(518, 65, 'Δk = 2π/L', { size: 11, tone: 'amber', anchor: 'middle' }),
        L(70, 160, 596, 160, { tone: 'dim' }),
        A(588, 160, 606, 160, { tone: 'dim' }),
        T(600, 146, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...[-4, -3, -2, -1, 0, 1, 2, 3, 4].flatMap((n) => [
          DOT(320 + n * 52, 160, { r: 3, tone: 'mint' }),
          T(320 + n * 52, 178, String(n), { size: 9.5, tone: 'muted', anchor: 'middle' })
        ]),
        A(320, 198, 372, 198, { tone: 'amber', weight: 1.3 }),
        T(346, 214, 'Δk', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(70, 126, '每个点是一个允许的动量', { size: 9.5, tone: 'muted' }),
        T(70, 236, 'n 取所有整数，含 0 与负值', { size: 9.5, tone: 'violet' }),
        T(70, 256, 'L 越小，点距越大', { size: 9.5, tone: 'amber' }),
        T(70, 276, 'L → ∞，点距 → 0，谱变连续', { size: 9.5, tone: 'cyan' })
      ]
    ),
    '0-2': fig(
      '7.4/0-2-f',
      'ψn = 1/√L·exp(iknx)：振幅与密度',
      '$\\psi_n=L^{-1/2}e^{ik_nx}$：振幅 $1/\\sqrt L$ 保证归一，$|\\psi_n|^2=1/L$ 在箱内均匀。',
      [
        T(320, 24, 'ψn = 1/√L·exp(iknx)：振幅与密度', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 48, 180, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(130, 65, '振幅 1/√L', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        BAND(232, 48, 180, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(322, 65, '相位 exp(ikx)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        BAND(424, 48, 180, 26, { tone: 'cyan', opacity: 0.22, r: 5 }),
        T(514, 65, '密度 1/L', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
        ...PANEL(28, 86, 286, 134, '波函数', { tone: 'mint' }),
        L(52, 154, 288, 154, { tone: 'faint', dash: true }),
        CURVE((x) => Math.cos(2 * Math.PI * x), { x: 52, y: 110, w: 236, h: 88 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(44, 113, '+1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(44, 157, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...PANEL(328, 86, 284, 134, '概率密度', { tone: 'cyan' }),
        L(352, 190, 588, 190, { tone: 'dim' }),
        BAND(352, 128, 236, 62, { tone: 'cyan', opacity: 0.16, r: 2 }),
        L(352, 128, 588, 128, { tone: 'cyan', weight: 1.8 }),
        T(592, 131, '1/L', { size: 9.5, tone: 'cyan' }),
        T(344, 193, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(352, 208, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(588, 208, 'L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(28, 238, 'L 加倍：振幅除以 √2，密度减半', { size: 9.5, tone: 'muted' }),
        T(28, 258, '但区间也加倍，积分仍是 1', { size: 9.5, tone: 'faint' }),
        T(320, 278, 'L → ∞：振幅 → 0，密度配合测度才有限', { size: 9.5, tone: 'cyan', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '7.4/1-0-f',
      '∫ψ_m*ψ_n dx = δ_mn：正交归一',
      '$\\delta_{mn}$ 只取 0 或 1：$m\\ne n$ 时整周期振荡相消，$m=n$ 时只剩模方积分。',
      [
        T(320, 24, '∫ψm*ψn dx = δmn：正交归一', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 286, 190, 'm ≠ n：整周期振荡', { tone: 'violet' }),
        L(52, 136, 288, 136, { tone: 'faint', dash: true }),
        CURVE((x) => Math.cos(2 * Math.PI * x) * Math.cos(3 * Math.PI * x), { x: 52, y: 96, w: 236, h: 80 }, [0, 1], [-1, 1], {
          tone: 'violet',
          weight: 1.7,
          steps: 160
        }),
        T(52, 190, '正半周与负半周逐段抵消', { size: 9.5, tone: 'violet' }),
        T(52, 212, '内积 = 0：两个态正交', { size: 9.5, tone: 'muted' }),
        ...PANEL(328, 44, 284, 190, 'm = n：模方积分', { tone: 'mint' }),
        L(352, 176, 588, 176, { tone: 'dim' }),
        CURVE((x) => Math.cos(2 * Math.PI * x) ** 2, { x: 352, y: 96, w: 236, h: 80 }, [0, 1], [0, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(344, 99, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(344, 179, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(352, 194, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(588, 194, 'L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 214, '面积 = 1：态已归一', { size: 9.5, tone: 'mint' }),
        T(320, 254, 'δmn：正交为 0，归一为 1', { size: 11, tone: 'text', anchor: 'middle' }),
        T(320, 274, '离散基的内积只有两个取值', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '7.4/1-1-f',
      'Σψ_nψ_n* = δ：完备性',
      '$\\sum_n\\psi_n(x)\\psi_n^*(x\')=\\delta(x-x\')$：本征函数组完整，任一点都能被精确重建。',
      [
        T(320, 24, 'Σψnψn* = δ：完备性', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(52, 48, 256, 28, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(180, 66, 'Σn ψn(x)ψn*(x′)', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(320, 66, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(338, 48, 220, 28, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(448, 66, 'δ(x − x′)', { size: 11, tone: 'violet', anchor: 'middle' }),
        L(70, 190, 596, 190, { tone: 'dim' }),
        CURVE((x) => 0.46 * Math.exp(-(((x - 0.5) / 0.1) ** 2)), { x: 70, y: 104, w: 520, h: 86 }, [0, 1], [0, 1.1], {
          tone: 'cyan',
          weight: 1.8
        }),
        CURVE((x) => 1.05 * Math.exp(-(((x - 0.5) / 0.01) ** 2)), { x: 70, y: 104, w: 520, h: 86 }, [0, 1], [0, 1.1], {
          tone: 'mint',
          weight: 2,
          steps: 240
        }),
        L(330, 190, 330, 100, { tone: 'amber', dash: true }),
        T(70, 208, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 208, 'x′', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(590, 208, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 232, '有限 L：求和给出有限宽峰', { size: 9.5, tone: 'cyan' }),
        T(70, 252, 'L → ∞：峰收成一点，只剩 δ', { size: 9.5, tone: 'mint' }),
        T(70, 274, 'δ 的宽度为零、高度发散，面积仍为 1', { size: 9.5, tone: 'faint' })
      ]
    ),
    '1-2': fig(
      '7.4/1-2-f',
      'ψ = Σc_nψ_n：投影展开',
      '$c_n=\\int\\psi_n^*\\psi\\,dx$ 是投影；$|c_n|^2$ 是测得该本征态的概率，$L\\to\\infty$ 时求和换成积分。',
      [
        T(320, 24, 'ψ = Σcnψn：投影展开', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(44, 48, 250, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(169, 65, 'ψ = Σn cn ψn', { size: 11, tone: 'mint', anchor: 'middle' }),
        BAND(310, 48, 286, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(453, 65, 'cn = ∫ψn*ψ dx', { size: 11, tone: 'violet', anchor: 'middle' }),
        ...PANEL(28, 86, 286, 134, '原波形', { tone: 'mint' }),
        L(52, 148, 288, 148, { tone: 'faint', dash: true }),
        CURVE((x) => 0.6 * Math.sin(2 * Math.PI * x) + 0.3 * Math.sin(6 * Math.PI * x), { x: 52, y: 106, w: 236, h: 84 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8,
          steps: 140
        }),
        ...PANEL(328, 86, 284, 134, '投影系数', { tone: 'violet' }),
        L(352, 200, 588, 200, { tone: 'dim' }),
        BAND(376, 132, 22, 68, { tone: 'violet', opacity: 0.3, r: 2 }),
        BAND(424, 152, 22, 48, { tone: 'violet', opacity: 0.3, r: 2 }),
        BAND(472, 174, 22, 26, { tone: 'violet', opacity: 0.3, r: 2 }),
        BAND(520, 184, 22, 16, { tone: 'violet', opacity: 0.3, r: 2 }),
        T(387, 216, 'c1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(435, 216, 'c2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(483, 216, 'c3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(531, 216, 'c4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(28, 238, 'cn 由内积投影得到，展开唯一', { size: 9.5, tone: 'muted' }),
        T(28, 258, '|cn|² 就是该结果的概率', { size: 9.5, tone: 'faint' }),
        T(320, 278, 'L → ∞：Σn 换成 (L/2π)∫dk', { size: 9.5, tone: 'cyan', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '7.4/2-0-f',
      'Δk = 2π/L：格点随箱长变密',
      '$\\Delta k=2\\pi/L$：箱长翻倍，格点间隔减半、可容纳态数翻倍；$L\\to\\infty$ 时格点无限密。',
      [
        T(320, 24, 'Δk = 2π/L：格点随箱长变密', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(200, 46, 240, 30, { tone: 'amber', opacity: 0.24, r: 5 }),
        T(320, 66, 'Δk = 2π/L', { size: 12.5, tone: 'amber', anchor: 'middle' }),
        ...PANEL(28, 92, 270, 120, '箱长 L', { tone: 'violet' }),
        L(48, 176, 288, 176, { tone: 'dim' }),
        ...[48, 108, 168, 228, 288].map((x) => DOT(x, 176, { r: 3, tone: 'violet' })),
        T(48, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(288, 196, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(168, 150, '5 个格点', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        ...PANEL(318, 92, 294, 120, '箱长 2L', { tone: 'cyan' }),
        L(338, 176, 588, 176, { tone: 'dim' }),
        ...[338, 368, 398, 428, 458, 488, 518, 548, 578].map((x) => DOT(x, 176, { r: 2.6, tone: 'cyan' })),
        T(338, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(578, 196, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(463, 150, '同样区间 9 个格点', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(28, 232, 'L 加倍 ⇒ Δk 减半', { size: 9.5, tone: 'muted' }),
        T(28, 252, '同样一段 k 内，态数 ∝ L', { size: 9.5, tone: 'faint' }),
        T(320, 276, 'L → ∞：Δk → 0，离散格点铺成连续谱', { size: 9.5, tone: 'cyan', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '7.4/2-1-f',
      'Σ_n → (L/2π)∫dk：数密度登场',
      '$\\sum_n\\to(L/2\\pi)\\int dk$：每个态占据 $2\\pi/L$ 的 $k$ 宽度，$L/2\\pi$ 就是态密度。',
      [
        T(320, 24, 'Σn → (L/2π)∫dk：数密度登场', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(52, 46, 150, 28, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(127, 64, 'Σn', { size: 11.5, tone: 'violet', anchor: 'middle' }),
        A(208, 60, 250, 60, { tone: 'dim', weight: 1.4 }),
        BAND(258, 46, 250, 28, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(383, 64, '(L/2π) ∫ dk', { size: 11, tone: 'mint', anchor: 'middle' }),
        L(70, 190, 570, 190, { tone: 'dim' }),
        A(562, 190, 580, 190, { tone: 'dim' }),
        T(576, 176, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => Math.exp(-0.5 * (((x - 0.5) / 0.19) ** 2)), { x: 70, y: 84, w: 500, h: 106 }, [0, 1], [0, 1.2], {
          tone: 'mint',
          weight: 1.8
        }),
        ...[0.1, 0.22, 0.34, 0.46, 0.58, 0.7, 0.82, 0.94].flatMap((u) => {
          const h = 86 * Math.exp(-0.5 * (((u - 0.5) / 0.19) ** 2))
          const x = 70 + u * 500
          return [BAND(x - 5, 190 - h, 10, h, { tone: 'violet', opacity: 0.26, r: 1 })]
        }),
        T(70, 208, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 208, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(570, 208, '2π/L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 232, '每个柱是一个态，宽度 2π/L', { size: 9.5, tone: 'violet' }),
        T(70, 252, '柱越密，阶梯越贴近光滑曲线', { size: 9.5, tone: 'mint' }),
        T(320, 274, '1/√L 与 L 的测度相抵，归一化保持', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '7.4/2-2-f',
      '极限给出 δ(x−x′)，而不是普通函数',
      '$\\lim_{L\\to\\infty}\\sum_n\\psi_n\\psi_n^*=\\delta(x-x\')$：峰高随 $L$ 增长、宽度按 $1/L$ 收缩，面积恒为一。',
      [
        T(320, 24, '极限给出 δ(x−x′)，而不是普通函数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 46, 300, 28, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(210, 64, 'Σn ψn(x)ψn*(x′)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(384, 64, '→', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(404, 46, 180, 28, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(494, 64, 'δ(x − x′)', { size: 11, tone: 'mint', anchor: 'middle' }),
        L(70, 200, 500, 200, { tone: 'dim' }),
        A(492, 200, 510, 200, { tone: 'dim' }),
        CURVE((x) => 1.06 * Math.exp(-(((x - 0.5) / 0.016) ** 2)), { x: 70, y: 92, w: 430, h: 108 }, [0, 1], [0, 1.15], {
          tone: 'mint',
          weight: 2,
          steps: 240
        }),
        A(285, 120, 285, 190, { tone: 'amber', weight: 1.6 }),
        T(70, 216, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(285, 216, 'x′', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(500, 216, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(516, 110, '峰高 ∝ L', { size: 9.5, tone: 'mint' }),
        T(516, 134, '峰宽 ∝ 1/L', { size: 9.5, tone: 'cyan' }),
        T(516, 158, '面积恒为 1', { size: 9.5, tone: 'amber' }),
        T(516, 182, 'δ 是测度，不是函数', { size: 9.5, tone: 'muted' }),
        T(70, 240, '任何含 x′ 的积分都被这张峰筛出', { size: 9.5, tone: 'faint' }),
        T(70, 262, '连续谱理论只是离散谱的无限体积极限', { size: 9.5, tone: 'muted' }),
        T(320, 278, '完备性在极限下保持形式不变', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
