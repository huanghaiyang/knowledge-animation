import { fig, T, R, BAND, L, A, C, DOT, P, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '5.2/overview',
    '量子谐振子：节点、宇称与经典极限',
    '打靶法挑出离散 $E_n$，本征函数有确定宇称，概率密度在大量子数下平均回到经典分布。',
    [
      T(320, 24, '量子谐振子：节点、宇称与经典极限', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(30, 46, 178, 196, '打靶法', { tone: 'cyan' }),
      T(42, 88, 'E 偏小：一端爆掉', { size: 9.5, tone: 'amber' }),
      CURVE((x) => Math.sinh(1.1 * x) / Math.sinh(2.42), { x: 42, y: 94, w: 154, h: 26 }, [-2.2, 2.2], [-1, 1], {
        tone: 'amber',
        weight: 1.5
      }),
      T(42, 134, 'E = E₀：两侧衰减', { size: 9.5, tone: 'mint' }),
      CURVE((x) => Math.exp(-x * x * 0.8), { x: 42, y: 140, w: 154, h: 26 }, [-2.2, 2.2], [-1, 1], {
        tone: 'mint',
        weight: 1.6
      }),
      T(42, 180, 'E 偏大：另一端爆掉', { size: 9.5, tone: 'danger' }),
      CURVE((x) => Math.sinh(1.9 * x) / Math.sinh(4.18), { x: 42, y: 186, w: 154, h: 26 }, [-2.2, 2.2], [-1, 1], {
        tone: 'danger',
        weight: 1.5
      }),
      T(42, 232, '只有少数 E 被留下', { size: 9.5, tone: 'faint' }),
      ...PANEL(222, 46, 178, 196, '本征函数', { tone: 'violet' }),
      CURVE((x) => Math.exp((-x * x) / 2), { x: 234, y: 80, w: 154, h: 40 }, [-2.8, 2.8], [-1.1, 1.1], {
        tone: 'mint',
        weight: 1.6
      }),
      CURVE((x) => 1.7 * x * Math.exp((-x * x) / 2), { x: 234, y: 126, w: 154, h: 40 }, [-2.8, 2.8], [-1.1, 1.1], {
        tone: 'violet',
        weight: 1.6
      }),
      CURVE((x) => 0.9 * (2 * x * x - 1) * Math.exp((-x * x) / 2), { x: 234, y: 172, w: 154, h: 40 }, [-2.8, 2.8], [-1.1, 1.1], {
        tone: 'amber',
        weight: 1.6
      }),
      T(234, 232, '节点数 = n，宇称 = (−1)ⁿ', { size: 9.5, tone: 'faint' }),
      ...PANEL(414, 46, 192, 196, '经典极限', { tone: 'amber' }),
      L(428, 80, 428, 200, { tone: 'faint', dash: true }),
      L(598, 80, 598, 200, { tone: 'faint', dash: true }),
      CURVE((x) => 1 / (Math.PI * Math.sqrt(Math.max(1e-4, 1 - x * x))), { x: 428, y: 80, w: 170, h: 120 }, [-1, 1], [0, 3.3], {
        tone: 'amber',
        weight: 1.9,
        steps: 200
      }),
      T(432, 74, '−A', { size: 9.5, tone: 'faint' }),
      T(594, 74, 'A', { size: 9.5, tone: 'faint', anchor: 'end' }),
      T(428, 216, '转折点处发散', { size: 9.5, tone: 'amber' }),
      T(428, 236, '量子：有限峰 + 尾巴', { size: 9.5, tone: 'mint' }),
      T(320, 258, '节点、宇称、概率分布连成一体', { size: 10, tone: 'muted', anchor: 'middle' }),
      T(320, 276, '大量子数时平均回到经典', { size: 9.5, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '5.2/0-0',
      '打靶法：把 E 当参数试',
      '从 $x=0$ 出发给定试探能量 $E$，向两侧积分薛定谔方程；多数 $E$ 使波函数一侧指数增长，只有少数能让两侧都衰减。',
      [
        T(320, 24, '打靶法：把 E 当参数试', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(40, 58, '给一个试探能量', { size: 9.5, tone: 'muted' }),
        R(40, 70, 150, 26, { tone: 'amber', fill: true, opacity: 0.2, r: 5 }),
        T(115, 87, '给试探能量 E', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(115, 98, 115, 110, { tone: 'dim' }),
        R(40, 112, 150, 26, { tone: 'violet', fill: true, opacity: 0.2, r: 5 }),
        T(115, 129, '从 x = 0 向两侧积分', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        A(115, 140, 115, 152, { tone: 'dim' }),
        R(40, 154, 150, 26, { tone: 'cyan', fill: true, opacity: 0.2, r: 5 }),
        T(115, 171, '看 x → ±∞ 的行为', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(40, 206, '多数 E：一侧指数增长', { size: 9.5, tone: 'muted' }),
        T(40, 228, '少数 E：两侧都衰减', { size: 9.5, tone: 'mint' }),
        T(40, 250, '被留下的才是能级', { size: 9.5, tone: 'faint' }),
        L(270, 139, 580, 139, { tone: 'dim', dash: true }),
        L(425, 76, 425, 202, { tone: 'faint', dash: true }),
        T(425, 216, 'x = 0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        CURVE((x) => Math.exp(-x * x * 0.9), { x: 270, y: 76, w: 310, h: 126 }, [-2.2, 2.2], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        CURVE((x) => Math.sinh(1.2 * x) / Math.sinh(2.64), { x: 270, y: 76, w: 310, h: 126 }, [-2.2, 2.2], [-1, 1], {
          tone: 'amber',
          weight: 1.5,
          dash: true
        }),
        CURVE((x) => Math.cosh(1.2 * x) / Math.cosh(2.64), { x: 270, y: 76, w: 310, h: 126 }, [-2.2, 2.2], [-1, 1], {
          tone: 'danger',
          weight: 1.5,
          dash: true
        }),
        T(276, 232, '绿：E = E₀，两端收敛', { size: 9.5, tone: 'mint' }),
        T(276, 252, '橙、红：E ≠ E₀，一端发散', { size: 9.5, tone: 'amber' }),
        T(320, 274, '边界条件把 E 筛成离散值', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '5.2/0-1',
      '第 n 个态恰有 n 个节点',
      '能量最低的态没有节点，每升高一级多一个零点；第 $n$ 个态恰好有 $n$ 个节点，与解析解给出的量子数一致。',
      [
        T(320, 24, '第 n 个态恰有 n 个节点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(56, 50, '节点数随能量单调增加', { size: 10, tone: 'mint' }),
        L(100, 90, 440, 90, { tone: 'dim' }),
        L(100, 136, 440, 136, { tone: 'dim' }),
        L(100, 182, 440, 182, { tone: 'dim' }),
        L(100, 228, 440, 228, { tone: 'dim' }),
        CURVE((x) => Math.exp((-x * x) / 2), { x: 100, y: 72, w: 340, h: 36 }, [-2.5, 2.5], [-1.1, 1.1], {
          tone: 'mint',
          weight: 1.6
        }),
        CURVE((x) => 1.7 * x * Math.exp((-x * x) / 2), { x: 100, y: 118, w: 340, h: 36 }, [-2.5, 2.5], [-1.1, 1.1], {
          tone: 'violet',
          weight: 1.6
        }),
        CURVE((x) => 0.9 * (2 * x * x - 1) * Math.exp((-x * x) / 2), { x: 100, y: 164, w: 340, h: 36 }, [-2.5, 2.5], [-1.1, 1.1], {
          tone: 'amber',
          weight: 1.6
        }),
        CURVE((x) => 0.55 * (2 * x * x * x - 3 * x) * Math.exp((-x * x) / 2), { x: 100, y: 210, w: 340, h: 36 }, [-2.5, 2.5], [-1.1, 1.1], {
          tone: 'cyan',
          weight: 1.6
        }),
        DOT(270, 136, { r: 2.6, tone: 'danger' }),
        DOT(218, 182, { r: 2.6, tone: 'danger' }),
        DOT(322, 182, { r: 2.6, tone: 'danger' }),
        DOT(270, 228, { r: 2.6, tone: 'danger' }),
        DOT(186.7, 228, { r: 2.6, tone: 'danger' }),
        DOT(353.3, 228, { r: 2.6, tone: 'danger' }),
        T(94, 94, 'ψ₀', { size: 10.5, tone: 'mint', anchor: 'end' }),
        T(94, 140, 'ψ₁', { size: 10.5, tone: 'violet', anchor: 'end' }),
        T(94, 186, 'ψ₂', { size: 10.5, tone: 'amber', anchor: 'end' }),
        T(94, 232, 'ψ₃', { size: 10.5, tone: 'cyan', anchor: 'end' }),
        T(448, 94, '0 个节点', { size: 9.5, tone: 'muted' }),
        T(448, 140, '1 个节点', { size: 9.5, tone: 'muted' }),
        T(448, 186, '2 个节点', { size: 9.5, tone: 'muted' }),
        T(448, 232, '3 个节点', { size: 9.5, tone: 'muted' }),
        T(320, 266, '红点：波函数过零的位置', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '5.2/0-2',
      '等间距阶梯，最低一级不为零',
      '相邻能级严格等间距，间隔为 $\\hbar\\omega$；经典振子可以任意振幅，量子振子只能停在阶梯上，最低一级高出阱底 $\\tfrac12\\hbar\\omega$。',
      [
        T(320, 24, '等间距阶梯，最低一级不为零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, '量子：阶梯；经典：连续', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        ...[214, 184, 154, 124, 94].flatMap((y) => LEVEL(80, 250, y, '', { tone: 'cyan' })),
        T(72, 217, 'n = 0', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 187, 'n = 1', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 157, 'n = 2', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 127, 'n = 3', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 97, 'n = 4', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(258, 217, '½ħω', { size: 9.5, tone: 'amber' }),
        T(258, 187, '3/2ħω', { size: 9.5, tone: 'amber' }),
        T(258, 157, '5/2ħω', { size: 9.5, tone: 'amber' }),
        T(258, 127, '7/2ħω', { size: 9.5, tone: 'amber' }),
        T(258, 97, '9/2ħω', { size: 9.5, tone: 'amber' }),
        A(180, 206, 180, 192, { tone: 'amber', weight: 1.2 }),
        T(188, 202, 'ħω', { size: 9.5, tone: 'amber' }),
        L(80, 240, 320, 240, { tone: 'faint', dash: true }),
        T(80, 256, '势阱底 E = 0', { size: 9.5, tone: 'faint' }),
        A(112, 236, 112, 220, { tone: 'mint', weight: 1.2 }),
        T(120, 230, '½ħω', { size: 9.5, tone: 'mint' }),
        BAND(360, 96, 204, 64, { tone: 'faint', opacity: 0.16 }),
        T(462, 120, '经典：E 连续', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(462, 144, '振幅任意', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(360, 190, '经典可以停在任意高度', { size: 9.5, tone: 'muted' }),
        T(360, 214, '量子只能停在阶梯上', { size: 9.5, tone: 'mint' }),
        T(360, 238, '间隔恒为 ħω', { size: 9.5, tone: 'cyan' }),
        T(320, 272, '量子化来自边界条件，不是外加规则', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '5.2/1-0',
      '本征函数：高斯乘厄米多项式',
      '本征函数是高斯因子与厄米多项式的乘积；归一化常数随 $n$ 变化，$n$ 越大，经典禁区里的尾巴越明显。',
      [
        T(320, 24, '本征函数：高斯乘厄米多项式', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'ψₙ(x) = Nₙ Hₙ(ξ) e^(−ξ²/2)', { size: 11, tone: 'text', anchor: 'middle' }),
        BAND(52, 66, 170, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(137, 84, 'Hₙ(ξ)：振荡部分', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(238, 66, 170, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(323, 84, 'e^(−ξ²/2)：衰减', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        BAND(424, 66, 170, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(509, 84, 'Nₙ：归一化', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        L(60, 216, 370, 216, { tone: 'dim' }),
        L(60, 120, 60, 216, { tone: 'dim' }),
        CURVE((x) => Math.exp(-x * x * 0.5), { x: 60, y: 106, w: 310, h: 110 }, [-3, 3], [0, 2.2], {
          tone: 'mint',
          weight: 1.7
        }),
        CURVE((x) => 2.2 * Math.exp(-x * x * 0.5), { x: 60, y: 106, w: 310, h: 110 }, [-3, 3], [0, 2.2], {
          tone: 'amber',
          weight: 1.6,
          dash: true
        }),
        T(60, 232, '−3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(215, 232, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 232, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 126, 'ψ', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(388, 116, 'n 大：峰更多更密', { size: 9.5, tone: 'muted' }),
        T(388, 142, '虚线：高斯包络', { size: 9.5, tone: 'amber' }),
        T(388, 168, '整体仍指数衰减', { size: 9.5, tone: 'cyan' }),
        T(388, 194, 'Nₙ 随之变小', { size: 9.5, tone: 'amber' }),
        T(388, 220, 'ξ = x √(mω/ħ)', { size: 9.5, tone: 'faint' }),
        T(320, 258, '峰变多，包络仍被高斯压住', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '经典禁区里只剩指数尾巴', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '5.2/1-1',
      '每个态有确定的宇称',
      '$H_n(-\\xi)=(-1)^nH_n(\\xi)$，高斯因子是偶函数，所以 $\\psi_n(-x)=(-1)^n\\psi_n(x)$：基态与第二激发态偶，第一与第三激发态奇。',
      [
        T(320, 24, '每个态有确定的宇称', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'ψₙ(−x) = (−1)ⁿ ψₙ(x)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        L(70, 162, 370, 162, { tone: 'dim', dash: true }),
        L(220, 92, 220, 232, { tone: 'faint', dash: true }),
        CURVE((x) => Math.exp((-x * x) / 2), { x: 70, y: 104, w: 300, h: 116 }, [-2.8, 2.8], [-1.6, 1.6], {
          tone: 'mint',
          weight: 1.8
        }),
        CURVE((x) => 1.5 * x * Math.exp((-x * x) / 2), { x: 70, y: 104, w: 300, h: 116 }, [-2.8, 2.8], [-1.6, 1.6], {
          tone: 'violet',
          weight: 1.7
        }),
        CURVE((x) => 0.75 * (2 * x * x - 1) * Math.exp((-x * x) / 2), { x: 70, y: 104, w: 300, h: 116 }, [-2.8, 2.8], [-1.6, 1.6], {
          tone: 'amber',
          weight: 1.7
        }),
        T(70, 248, '−x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(220, 248, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 248, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 268, 'ψ₀ 偶', { size: 9.5, tone: 'mint' }),
        T(140, 268, 'ψ₁ 奇', { size: 9.5, tone: 'violet' }),
        T(210, 268, 'ψ₂ 偶', { size: 9.5, tone: 'amber' }),
        T(390, 116, '势能左右对称', { size: 9.5, tone: 'muted' }),
        T(390, 142, 'ψ₁ 正负相消', { size: 9.5, tone: 'violet' }),
        T(390, 168, 'ψ₂ 两端同号', { size: 9.5, tone: 'amber' }),
        T(390, 194, '偶态与奇态自动正交', { size: 9.5, tone: 'cyan' }),
        T(390, 216, '镜像后只差一个符号', { size: 9.5, tone: 'faint' }),
        T(320, 278, '奇偶由 n 的奇偶决定', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '5.2/1-2',
      '宇称来自抛物线势的对称性',
      '$V(x)=\\tfrac12m\\omega^2x^2$ 在 $x\\to-x$ 下不变，哈密顿量与该变换对易，本征态因此可以选为宇称的本征态，不同宇称自动正交。',
      [
        T(320, 24, '宇称来自抛物线势的对称性', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(36, 52, 180, 172, '镜像不变', { tone: 'mint' }),
        CURVE((x) => x * x, { x: 48, y: 90, w: 156, h: 100 }, [-1.3, 1.3], [0, 1.7], {
          tone: 'mint',
          weight: 1.8
        }),
        L(126, 190, 126, 86, { tone: 'faint', dash: true }),
        T(52, 82, 'V(x) = V(−x)', { size: 9.5, tone: 'mint' }),
        T(48, 210, '左右完全一样', { size: 9.5, tone: 'faint' }),
        ...PANEL(238, 52, 180, 172, '算符对易', { tone: 'cyan' }),
        T(252, 90, '[H, P] = 0', { size: 11, tone: 'cyan' }),
        T(252, 118, 'P：x → −x', { size: 9.5, tone: 'muted' }),
        T(252, 146, '可同时对角化', { size: 9.5, tone: 'mint' }),
        T(252, 174, '本征态有确定宇称', { size: 9.5, tone: 'amber' }),
        T(252, 202, 'Pψ = ±ψ', { size: 9.5, tone: 'faint' }),
        ...PANEL(440, 52, 164, 172, '正交性', { tone: 'violet' }),
        L(456, 92, 588, 92, { tone: 'dim' }),
        L(456, 118, 588, 118, { tone: 'dim' }),
        L(456, 144, 588, 144, { tone: 'dim' }),
        T(462, 88, '偶', { size: 9.5, tone: 'mint' }),
        T(462, 114, '奇', { size: 9.5, tone: 'violet' }),
        T(462, 140, '偶', { size: 9.5, tone: 'mint' }),
        T(520, 88, 'ψ₀', { size: 9.5, tone: 'muted' }),
        T(520, 114, 'ψ₁', { size: 9.5, tone: 'muted' }),
        T(520, 140, 'ψ₂', { size: 9.5, tone: 'muted' }),
        T(456, 176, '奇 × 偶 积分为零', { size: 9.5, tone: 'violet' }),
        T(456, 200, '同宇称靠 Hₙ 正交', { size: 9.5, tone: 'faint' }),
        T(320, 246, '宇称不是偶然，是势能的对称性', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '不同宇称的本征函数必然正交', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '5.2/2-0',
      '概率密度：节点为零，两侧成峰',
      '$|\\psi_n|^2$ 在节点处为零，在两侧形成若干峰；量子数越大峰越密，粗粒化平均后趋近经典概率分布。',
      [
        T(320, 24, '概率密度：节点为零，两侧成峰', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, '|ψₙ|² 的峰随 n 变密', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        L(60, 220, 360, 220, { tone: 'dim' }),
        CURVE((x) => Math.exp(-x * x) * 1.6, { x: 60, y: 100, w: 300, h: 120 }, [-3, 3], [0, 1.7], {
          tone: 'mint',
          weight: 1.6
        }),
        CURVE((x) => 1.55 * x * x * Math.exp(-x * x), { x: 60, y: 100, w: 300, h: 120 }, [-3, 3], [0, 1.7], {
          tone: 'violet',
          weight: 1.6
        }),
        CURVE((x) => 1.1 * (2 * x * x - 1) * (2 * x * x - 1) * Math.exp(-x * x), { x: 60, y: 100, w: 300, h: 120 }, [-3, 3], [0, 1.7], {
          tone: 'amber',
          weight: 1.5
        }),
        T(60, 236, '−3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(210, 236, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(360, 236, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 108, '|ψ|²', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 90, 'n = 0', { size: 9.5, tone: 'mint' }),
        T(120, 90, 'n = 1', { size: 9.5, tone: 'violet' }),
        T(176, 90, 'n = 2', { size: 9.5, tone: 'amber' }),
        T(380, 112, '节点处概率为零', { size: 9.5, tone: 'amber' }),
        T(380, 138, '峰数随 n 增加', { size: 9.5, tone: 'violet' }),
        T(380, 164, '包络仍被高斯压住', { size: 9.5, tone: 'mint' }),
        T(380, 190, '平均后趋近经典分布', { size: 9.5, tone: 'cyan' }),
        T(320, 262, '零点只是相干相消，不是粒子消失', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '5.2/2-1',
      '经典密度在转折点发散',
      '经典振子停留时间与速度成反比，$x=\\pm A$ 处速度为 0，$P_{\\mathrm{cl}}$ 因此发散；量子密度不发散，却在转折点附近留下最后一个峰和隧穿尾巴。',
      [
        T(320, 24, '经典密度在转折点发散', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'P(x) = 1/(π v(x)) = 1/(π√(A²−x²))', { size: 10, tone: 'muted', anchor: 'middle' }),
        L(70, 214, 370, 214, { tone: 'dim' }),
        L(70, 214, 70, 84, { tone: 'dim' }),
        L(70, 84, 70, 214, { tone: 'faint', dash: true }),
        L(370, 84, 370, 214, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (Math.PI * Math.sqrt(Math.max(1e-4, 1 - x * x))), { x: 70, y: 86, w: 300, h: 128 }, [-1, 1], [0, 3], {
          tone: 'amber',
          weight: 1.9,
          steps: 200
        }),
        T(70, 76, '−A', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(370, 76, 'A', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(62, 218, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 152, '1.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 90, '3', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 236, '慢速停留 ⇒ 密度堆高', { size: 9.5, tone: 'amber' }),
        T(386, 102, 'v = 0：时间 → ∞', { size: 9.5, tone: 'amber' }),
        T(386, 128, '|x| > A：概率为零', { size: 9.5, tone: 'muted' }),
        T(386, 154, '量子：最后峰 + 尾巴', { size: 9.5, tone: 'mint' }),
        T(386, 180, '量子密度处处有限', { size: 9.5, tone: 'cyan' }),
        T(386, 206, '粗粒化后两者吻合', { size: 9.5, tone: 'faint' }),
        T(320, 262, '发散来自慢速停留，不是概率被放大', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '5.2/2-2',
      '含时解：本征态按相位叠加',
      '$\\psi(x,t)=\\sum_n c_n\\psi_n(x)e^{-iE_nt/\\hbar}$：每个分量带自己的相位，$|c_n|^2$ 是测到 $E_n$ 的概率；相干态下波包像经典振子摆动。',
      [
        T(320, 24, '含时解：本征态按相位叠加', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'ψ(x,t) = Σₙ cₙ ψₙ(x) e^(−iEₙt/ħ)', { size: 11, tone: 'text', anchor: 'middle' }),
        T(56, 88, 'c₀ ψ₀ e^(−iE₀t/ħ)', { size: 9.5, tone: 'mint' }),
        T(56, 112, 'c₁ ψ₁ e^(−iE₁t/ħ)', { size: 9.5, tone: 'violet' }),
        T(56, 136, 'c₂ ψ₂ e^(−iE₂t/ħ)', { size: 9.5, tone: 'amber' }),
        C(270, 84, 15, { tone: 'mint' }),
        A(270, 84, 281, 75, { tone: 'mint', weight: 1.3 }),
        C(270, 108, 15, { tone: 'violet' }),
        A(270, 108, 260, 96, { tone: 'violet', weight: 1.3 }),
        C(270, 132, 15, { tone: 'amber' }),
        A(270, 132, 283, 132, { tone: 'amber', weight: 1.3 }),
        A(270, 150, 270, 166, { tone: 'dim' }),
        BAND(56, 170, 300, 40, { tone: 'mint', opacity: 0.14, r: 8 }),
        T(206, 194, 'Σ：相位差决定波包位置', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(56, 230, '相位因子 e^(−iEₙt/ħ)', { size: 9.5, tone: 'muted' }),
        T(56, 252, '|cₙ|²：测到 Eₙ 的概率', { size: 9.5, tone: 'amber' }),
        T(390, 84, '干涉出运动的波包', { size: 9.5, tone: 'muted' }),
        CURVE((x) => Math.exp(-x * x * 1.2), { x: 390, y: 96, w: 200, h: 100 }, [-2.5, 2.5], [0, 1.1], {
          tone: 'mint',
          weight: 1.8
        }),
        A(400, 216, 470, 216, { tone: 'amber', weight: 1.2 }),
        A(580, 216, 510, 216, { tone: 'amber', weight: 1.2 }),
        T(490, 234, '波包来回摆动', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(390, 258, '相干态最接近经典振子', { size: 9.5, tone: 'faint' }),
        T(320, 278, '能量分布由系数 cₙ 决定', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '5.2/0-0-f',
      '束缚条件挑出离散能级',
      '$\\psi_n\\to0$ 当 $x\\to\\pm\\infty$，且 $E_n=(n+\\tfrac12)\\hbar\\omega$：能级不是外加的，而是边界条件筛出来的结果。',
      [
        T(320, 24, '束缚条件挑出离散能级', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'ψₙ(x) → 0（x → ±∞）', { size: 11, tone: 'cyan', anchor: 'middle' }),
        T(320, 74, 'Eₙ = (n + ½) ħω', { size: 11, tone: 'amber', anchor: 'middle' }),
        BAND(60, 100, 40, 118, { tone: 'danger', opacity: 0.1 }),
        BAND(320, 100, 40, 118, { tone: 'danger', opacity: 0.1 }),
        L(60, 218, 360, 218, { tone: 'dim' }),
        L(60, 218, 60, 100, { tone: 'dim' }),
        CURVE((x) => x * x, { x: 60, y: 100, w: 300, h: 118 }, [-1.5, 1.5], [0, 2.4], {
          tone: 'violet',
          weight: 1.7
        }),
        L(60, 159, 360, 159, { tone: 'cyan', weight: 1.4 }),
        CURVE((x) => 1.2 + 0.55 * (2 * x * x - 1) * Math.exp(-x * x * 0.5), { x: 60, y: 100, w: 300, h: 118 }, [-1.6, 1.6], [0, 2.4], {
          tone: 'mint',
          weight: 1.8
        }),
        L(320, 159, 320, 218, { tone: 'faint', dash: true }),
        L(100, 159, 100, 218, { tone: 'faint', dash: true }),
        T(66, 94, '禁区', { size: 9.5, tone: 'danger' }),
        T(326, 94, '禁区', { size: 9.5, tone: 'danger' }),
        T(366, 163, 'E₂', { size: 9.5, tone: 'cyan' }),
        T(60, 238, '转折点外：指数衰减的尾巴', { size: 9.5, tone: 'faint' }),
        T(378, 110, 'ψ 必须在两端衰减', { size: 9.5, tone: 'cyan' }),
        T(378, 136, '否则无法归一化', { size: 9.5, tone: 'muted' }),
        T(378, 162, '只有特定 E 能做到', { size: 9.5, tone: 'amber' }),
        T(378, 188, '这就是能级离散的原因', { size: 9.5, tone: 'mint' }),
        T(378, 214, 'n 从 0 起，间隔 ħω', { size: 9.5, tone: 'faint' }),
        T(320, 262, '边界条件 = 量子化条件', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '5.2/0-1-f',
      'ΔE = ħω：所有间隔相同',
      '$\\Delta E=E_{n+1}-E_n=\\hbar\\omega$ 与 $n$ 无关；所有相邻跃迁同频率，$\\hbar\\to0$ 时谱线才连成一片。',
      [
        T(320, 24, 'ΔE = ħω：所有间隔相同', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'ΔE = Eₙ₊₁ − Eₙ = ħω', { size: 12, tone: 'text', anchor: 'middle' }),
        ...[216, 184, 152, 120].flatMap((y) => LEVEL(80, 280, y, '', { tone: 'cyan' })),
        T(72, 219, 'n = 0', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 187, 'n = 1', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 155, 'n = 2', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 123, 'n = 3', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(288, 219, '½ħω', { size: 9.5, tone: 'amber' }),
        T(288, 187, '3/2ħω', { size: 9.5, tone: 'amber' }),
        T(288, 155, '5/2ħω', { size: 9.5, tone: 'amber' }),
        T(288, 123, '7/2ħω', { size: 9.5, tone: 'amber' }),
        A(170, 208, 170, 192, { tone: 'amber', weight: 1.2 }),
        T(178, 202, 'ħω', { size: 9.5, tone: 'amber' }),
        A(170, 176, 170, 160, { tone: 'amber', weight: 1.2 }),
        T(178, 170, 'ħω', { size: 9.5, tone: 'amber' }),
        A(170, 144, 170, 128, { tone: 'amber', weight: 1.2 }),
        T(178, 138, 'ħω', { size: 9.5, tone: 'amber' }),
        T(340, 110, '间隔与 n 无关', { size: 10.5, tone: 'amber' }),
        T(340, 136, '所有跃迁同频率 ω', { size: 10, tone: 'mint' }),
        T(340, 162, '吸收或发射同一条谱线', { size: 9.5, tone: 'muted' }),
        T(340, 188, 'ħ → 0 时谱线连成一片', { size: 9.5, tone: 'cyan' }),
        T(340, 214, '零点能在差值中抵消', { size: 9.5, tone: 'faint' }),
        T(320, 252, '经典谱连续，量子谱只有一条线', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '等间距源自抛物线势', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '5.2/1-0-f',
      'Nₙ：随 n 迅速变小',
      '$N_n=(m\\omega/\\pi\\hbar)^{1/4}/\\sqrt{2^nn!}$：前一个因子定长度标度，$1/\\sqrt{2^nn!}$ 让权重随 $n$ 迅速下降。',
      [
        T(320, 24, 'Nₙ：随 n 迅速变小', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'Nₙ = (mω/πħ)^¼ · 1/√(2ⁿ n!)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 62, 180, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(150, 80, '(mω/πħ)^¼：长度标度', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        BAND(252, 62, 180, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(342, 80, '1/√(2ⁿn!)：权重', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(444, 62, 140, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(514, 80, 'n 越大越小', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        L(70, 222, 410, 222, { tone: 'dim' }),
        R(80, 72, 46, 150, { tone: 'amber', fill: true, opacity: 0.28, r: 3 }),
        R(150, 116, 46, 106, { tone: 'amber', fill: true, opacity: 0.28, r: 3 }),
        R(220, 169, 46, 53, { tone: 'amber', fill: true, opacity: 0.28, r: 3 }),
        R(290, 200, 46, 22, { tone: 'amber', fill: true, opacity: 0.28, r: 3 }),
        R(360, 214, 46, 8, { tone: 'amber', fill: true, opacity: 0.28, r: 3 }),
        T(103, 236, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(173, 236, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(243, 236, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(313, 236, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(383, 236, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(62, 222, 'Nₙ', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(430, 110, 'n = 0 时最大', { size: 9.5, tone: 'mint' }),
        T(430, 136, 'n = 2 已降到 0.35', { size: 9.5, tone: 'muted' }),
        T(430, 162, 'n 大 ⇒ 峰更矮', { size: 9.5, tone: 'muted' }),
        T(430, 188, '归一化代价随 n 变大', { size: 9.5, tone: 'faint' }),
        T(320, 258, '归一化常数按 1/√(2ⁿn!) 迅速减小', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '厄米多项式的增长抵消不了它', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '5.2/1-1-f',
      'ψₙ(−x) = (−1)ⁿ ψₙ(x)',
      '偶态 $n$ 给偶函数，奇 $n$ 给奇函数；镜像只差一个符号，所以不同宇称的本征函数积分为零。',
      [
        T(320, 24, 'ψₙ(−x) = (−1)ⁿ ψₙ(x)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'ψₙ(−x) = (−1)ⁿ ψₙ(x)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        L(70, 160, 370, 160, { tone: 'dim', dash: true }),
        L(220, 92, 220, 230, { tone: 'faint', dash: true }),
        CURVE((x) => Math.exp((-x * x) / 2), { x: 70, y: 104, w: 300, h: 112 }, [-2.8, 2.8], [-1.6, 1.6], {
          tone: 'mint',
          weight: 1.8
        }),
        CURVE((x) => 1.5 * x * Math.exp((-x * x) / 2), { x: 70, y: 104, w: 300, h: 112 }, [-2.8, 2.8], [-1.6, 1.6], {
          tone: 'violet',
          weight: 1.7
        }),
        CURVE((x) => 0.75 * (2 * x * x - 1) * Math.exp((-x * x) / 2), { x: 70, y: 104, w: 300, h: 112 }, [-2.8, 2.8], [-1.6, 1.6], {
          tone: 'amber',
          weight: 1.7
        }),
        T(70, 246, '−x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(220, 246, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 246, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 266, 'ψ₀ 偶', { size: 9.5, tone: 'mint' }),
        T(140, 266, 'ψ₁ 奇', { size: 9.5, tone: 'violet' }),
        T(210, 266, 'ψ₂ 偶', { size: 9.5, tone: 'amber' }),
        T(388, 112, 'n 偶 ⇒ ψ 偶', { size: 9.5, tone: 'mint' }),
        T(388, 138, 'n 奇 ⇒ ψ 奇', { size: 9.5, tone: 'violet' }),
        T(388, 164, '偶 × 奇 ⇒ 积分为零', { size: 9.5, tone: 'amber' }),
        T(388, 190, '不同宇称自动正交', { size: 9.5, tone: 'cyan' }),
        T(388, 216, '(−1)ⁿ 只是一个符号', { size: 9.5, tone: 'faint' }),
        T(320, 272, '宇称由势能的左右对称性决定', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '5.2/2-0-f',
      'P_cl 在两端发散',
      '$P_{\\mathrm{cl}}=1/(\\pi\\sqrt{A^2-x^2})$：速度 $v\\propto\\sqrt{A^2-x^2}$，越靠转折点越慢，停留时间越长；$|x|>A$ 时概率为零。',
      [
        T(320, 24, 'P_cl 在两端发散', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'P_cl(x) = 1 / (π √(A² − x²))', { size: 11.5, tone: 'text', anchor: 'middle' }),
        L(70, 214, 370, 214, { tone: 'dim' }),
        L(70, 214, 70, 86, { tone: 'dim' }),
        L(70, 86, 70, 214, { tone: 'faint', dash: true }),
        L(370, 86, 370, 214, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (Math.PI * Math.sqrt(Math.max(1e-4, 1 - x * x))), { x: 70, y: 86, w: 300, h: 128 }, [-1, 1], [0, 3], {
          tone: 'amber',
          weight: 1.9,
          steps: 200
        }),
        T(70, 78, '−A', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(370, 78, 'A', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(62, 218, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 152, '1.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 92, '3', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 236, 'v = 0 处停留最久', { size: 9.5, tone: 'amber' }),
        T(386, 104, '速度 v = 0', { size: 10, tone: 'amber' }),
        T(386, 130, '停留时间 → ∞', { size: 10, tone: 'amber' }),
        T(386, 156, '|x| > A 概率为零', { size: 9.5, tone: 'muted' }),
        T(386, 182, '量子：最后峰 + 隧穿尾', { size: 9.5, tone: 'mint' }),
        T(386, 208, '粗粒化后趋近它', { size: 9.5, tone: 'faint' }),
        T(320, 254, '发散来自慢速停留，不是概率被凭空放大', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '量子概率密度处处有限', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '5.2/2-1-f',
      '含时解：相位决定运动',
      '$e^{-iE_nt/\\hbar}$ 给每个分量不同的转动速度，叠加后的相位差决定波包位置；$|c_n|^2$ 给出能量测量概率。',
      [
        T(320, 24, '含时解：相位决定运动', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'ψ(x,t) = Σₙ cₙ ψₙ(x) e^(−iEₙt/ħ)', { size: 11, tone: 'text', anchor: 'middle' }),
        T(56, 90, 'c₀ ψ₀ e^(−iE₀t/ħ)', { size: 9.5, tone: 'mint' }),
        T(56, 116, 'c₁ ψ₁ e^(−iE₁t/ħ)', { size: 9.5, tone: 'violet' }),
        T(56, 142, 'c₂ ψ₂ e^(−iE₂t/ħ)', { size: 9.5, tone: 'amber' }),
        C(280, 85, 15, { tone: 'mint' }),
        A(280, 85, 291, 76, { tone: 'mint', weight: 1.3 }),
        C(280, 111, 15, { tone: 'violet' }),
        A(280, 111, 270, 99, { tone: 'violet', weight: 1.3 }),
        C(280, 137, 15, { tone: 'amber' }),
        A(280, 137, 293, 137, { tone: 'amber', weight: 1.3 }),
        A(280, 156, 280, 172, { tone: 'dim' }),
        BAND(56, 176, 300, 38, { tone: 'mint', opacity: 0.14, r: 8 }),
        T(206, 199, 'Σ：相位差决定波包位置', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(56, 236, 'Eₙ 越大，转得越快', { size: 9.5, tone: 'muted' }),
        T(56, 258, '系数 cₙ 定能量分布', { size: 9.5, tone: 'amber' }),
        T(390, 86, '波包像经典振子', { size: 9.5, tone: 'muted' }),
        CURVE((x) => Math.exp(-x * x * 1.2), { x: 390, y: 100, w: 200, h: 96 }, [-2.5, 2.5], [0, 1.1], {
          tone: 'mint',
          weight: 1.8
        }),
        A(400, 216, 470, 216, { tone: 'amber', weight: 1.2 }),
        A(580, 216, 510, 216, { tone: 'amber', weight: 1.2 }),
        T(490, 234, '来回摆动', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(390, 258, '相干态最接近经典', { size: 9.5, tone: 'faint' }),
        T(320, 276, '相位差让各分量轮流对齐', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
