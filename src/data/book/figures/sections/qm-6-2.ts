import { fig, T, BAND, L, A, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const A0 = 2.2
const MORSE = (r: number) => (1 - Math.exp(-A0 * (r - 1))) ** 2

const set: SectionFigureSet = {
  overview: fig(
    '6.2/overview',
    '莫尔斯势：会断的化学键',
    '$V=D_e[1-e^{-a(r-r_e)}]^2$：阱底像谐振子，$r\\to\\infty$ 停在 $D_e$，能级越往上越密。',
    [
      T(320, 24, '莫尔斯势：会断的化学键', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 300, 196, '势的走向', { tone: 'mint' }),
      L(50, 83.6, 330, 83.6, { tone: 'faint', dash: true }),
      T(330, 78, 'D_e：解离极限', { size: 9.5, tone: 'faint', anchor: 'end' }),
      CURVE(MORSE, { x: 50, y: 64, w: 270, h: 150 }, [0.7, 2.6], [0, 1.15], { tone: 'mint', weight: 2 }),
      DOT(92.6, 214, { r: 2.8, tone: 'amber' }),
      T(84, 234, 'r_e：V = 0', { size: 9.5, tone: 'amber' }),
      T(150, 108, '拉伸方向趋平', { size: 9.5, tone: 'mint' }),
      T(56, 152, '压缩：陡', { size: 9.5, tone: 'violet' }),
      T(150, 196, '阱底：近似抛物', { size: 9.5, tone: 'muted' }),
      ...PANEL(348, 44, 258, 196, '能级对比', { tone: 'amber' }),
      L(366, 84, 596, 84, { tone: 'faint', dash: true }),
      T(592, 80, 'D_e', { size: 9.5, tone: 'faint', anchor: 'end' }),
      ...[214, 190, 166, 142, 118, 94].flatMap((y) => LEVEL(366, 506, y, '', { tone: 'cyan', dash: true })),
      ...[214, 192, 164, 128, 88].flatMap((y) => LEVEL(366, 506, y, '', { tone: 'mint' })),
      T(512, 112, '虚线：等间距', { size: 9.5, tone: 'cyan' }),
      T(512, 150, '实线：渐密', { size: 9.5, tone: 'mint' }),
      T(512, 190, '顶部收拢', { size: 9.5, tone: 'faint' }),
      T(320, 258, '阱底像谐振子，高处向解离极限收拢', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 278, '非谐性来自有限的阱深 D_e', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '6.2/0-0',
      '谐振子永不断键，莫尔斯会',
      '谐振子势随 $r$ 无限上升；莫尔斯势指数趋平，$r\\to\\infty$ 时停在 $D_e$。',
      [
        T(320, 24, '谐振子永不断键，莫尔斯会', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 384, 180, '两种势', { tone: 'mint' }),
        L(64, 126.25, 414, 126.25, { tone: 'faint', dash: true }),
        CURVE(MORSE, { x: 64, y: 70, w: 350, h: 150 }, [0.66, 2.8], [0, 1.6], { tone: 'mint', weight: 2 }),
        CURVE((r) => 4.84 * (r - 1) ** 2, { x: 64, y: 70, w: 350, h: 150 }, [0.66, 1.57], [0, 1.6], {
          tone: 'violet',
          dash: true,
          weight: 1.7
        }),
        DOT(119.6, 220, { r: 2.6, tone: 'amber' }),
        T(112, 236, 'r_e', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(392, 80, '无限上升', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(400, 118, '趋于 D_e', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(430, 78, '谐振子', { size: 10.5, tone: 'violet' }),
        T(430, 104, '势能随 r 无限涨', { size: 9.5, tone: 'faint' }),
        T(430, 124, '化学键永不断裂', { size: 9.5, tone: 'muted' }),
        T(430, 158, '莫尔斯势', { size: 10.5, tone: 'mint' }),
        T(430, 184, '指数壁逐渐趋平', { size: 9.5, tone: 'faint' }),
        T(430, 204, 'r → ∞ 时 V → D_e', { size: 9.5, tone: 'muted' }),
        T(320, 252, '真实分子拉伸到极限必然解离', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '有限解离能 D_e 是莫尔斯的第一个优点', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.2/0-1',
      'a 越大，阱越窄，振得越快',
      '在 $r_e$ 附近指数近似为线性，二次项给出 $k=2D_ea^2$；$a$ 控制阱宽，也就控制频率。',
      [
        T(320, 24, 'a 越大，阱越窄，振得越快', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 180, 176, 'a 小：阱宽', { tone: 'cyan' }),
        CURVE((r) => (1 - Math.exp(-1.2 * (r - 1))) ** 2, { x: 46, y: 76, w: 156, h: 110 }, [0.8, 2.2], [0, 1.05], {
          tone: 'cyan',
          weight: 2
        }),
        T(124, 204, 'k 小、ω 低', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(124, 220, '拉伸很长才解离', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(230, 50, 180, 176, 'a 中：标准', { tone: 'mint' }),
        CURVE((r) => (1 - Math.exp(-2 * (r - 1))) ** 2, { x: 242, y: 76, w: 156, h: 110 }, [0.8, 2.2], [0, 1.05], {
          tone: 'mint',
          weight: 2
        }),
        T(320, 204, 'k 中、ω 中', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 220, '低能级近谐振', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(426, 50, 180, 176, 'a 大：阱窄', { tone: 'violet' }),
        CURVE((r) => (1 - Math.exp(-3.2 * (r - 1))) ** 2, { x: 438, y: 76, w: 156, h: 110 }, [0.8, 2.2], [0, 1.05], {
          tone: 'violet',
          weight: 2
        }),
        T(516, 204, 'k 大、ω 高', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(516, 220, '阱壁又陡又窄', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 250, 'k = 2D_e a²：a 加倍，频率加倍', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, 'a 只改宽度，不改阱深 D_e', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '6.2/0-2',
      '拉伸变软：同一能量，外侧更远',
      '真实键在拉伸方向变软：同一能级的外侧转折点比内侧远，谐振近似只低量子数可靠。',
      [
        T(320, 24, '拉伸变软：同一能量，外侧更远', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(64, 136.7, 404, 136.7, { tone: 'faint', dash: true }),
        CURVE(MORSE, { x: 64, y: 70, w: 340, h: 150 }, [0.72, 2], [0, 0.9], { tone: 'mint', weight: 2 }),
        L(138.4, 220, 138.4, 136.7, { tone: 'dim', dash: true }),
        DOT(73.8, 136.7, { r: 2.6, tone: 'cyan' }),
        DOT(286.6, 136.7, { r: 2.6, tone: 'amber' }),
        DOT(138.4, 220, { r: 2.6, tone: 'violet' }),
        T(72, 228, 'r_e', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(100, 118, '内侧：陡', { size: 9.5, tone: 'cyan' }),
        T(230, 118, '外侧：缓', { size: 9.5, tone: 'amber' }),
        A(92, 124, 132, 124, { tone: 'cyan', weight: 1.1 }),
        A(146, 124, 280, 124, { tone: 'amber', weight: 1.1 }),
        T(64, 160, 'E', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(300, 86, '同一能量高度', { size: 9.5, tone: 'muted' }),
        T(320, 250, '外侧转折点更远：弹性随拉伸下降', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '所以谐振近似只对低量子数可靠', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '6.2/1-0',
      '换元后化为拉盖尔方程',
      '令 $z=2\\lambda e^{-a(r-r_e)}$，径向方程变成拉盖尔方程；边界衰减条件把能级切成离散值。',
      [
        T(320, 24, '换元后化为拉盖尔方程', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 58, '径向薛定谔方程', { size: 10.5, tone: 'text' }),
        T(46, 82, '↓ z = 2λe^(−a(r−re))', { size: 9.5, tone: 'cyan' }),
        T(46, 108, '拉盖尔方程', { size: 10.5, tone: 'mint' }),
        T(46, 132, '↓ 要求 ψ 在 z = 0 有限', { size: 9.5, tone: 'cyan' }),
        T(46, 158, 'ψn ∝ e^(−z/2) z^(λ−n−½) L(…)', { size: 10, tone: 'violet' }),
        T(46, 186, 'n 只能取到 λ − ½ 以下', { size: 9.5, tone: 'amber' }),
        T(46, 214, '波函数 = 指数因子 × 拉盖尔多项式', { size: 9.5, tone: 'muted' }),
        AXIS({ x: 360, y: 86, w: 230, h: 130 }, { xLabel: 'r' }),
        CURVE((r) => Math.exp(-A0 * (r - 1)), { x: 360, y: 86, w: 230, h: 130 }, [1, 2.6], [0, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 120
        }),
        DOT(360, 86, { r: 2.8, tone: 'amber' }),
        DOT(590, 212.2, { r: 2.8, tone: 'violet' }),
        T(370, 104, 'r = re ⇒ z = 2λ', { size: 9.5, tone: 'amber' }),
        T(586, 200, 'r → ∞ ⇒ z → 0', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(320, 252, '换元把半无限区间压成 0 < z < 2λ', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'z = 0 处的边界条件决定离散能谱', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.2/1-1',
      '精确谱：等距台阶被逐级压低',
      '$E_n=-D_e+\\hbar\\omega(n+\\tfrac12)-\\dfrac{(\\hbar\\omega)^2}{4D_e}(n+\\tfrac12)^2$：修正随 $n$ 增大。',
      [
        T(320, 24, '精确谱：等距台阶被逐级压低', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 58, 'E_n =', { size: 10.5, tone: 'text' }),
        BAND(96, 44, 92, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(142, 62, '−D_e', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(46, 86, '+ ħω(n + ½)', { size: 10.5, tone: 'mint' }),
        T(46, 112, '− (ħω)²(n+½)² / 4D_e', { size: 10, tone: 'amber' }),
        T(46, 146, '−D_e：整体下沉', { size: 9.5, tone: 'muted' }),
        T(46, 170, 'ħω 项：等间距台阶', { size: 9.5, tone: 'mint' }),
        T(46, 194, '二次项：越往上压得越狠', { size: 9.5, tone: 'amber' }),
        T(46, 218, 'D_e → ∞ ⇒ 回到谐振子', { size: 9.5, tone: 'violet' }),
        L(340, 84, 600, 84, { tone: 'faint', dash: true }),
        T(596, 80, '0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        ...[206.7, 182.3, 160.5, 141.4, 125.1, 111.5].flatMap((y) => LEVEL(340, 430, y, '', { tone: 'amber' })),
        ...[206.4, 179.2, 152, 124.8, 97.6].flatMap((y) => LEVEL(458, 492, y, '', { tone: 'violet', dash: true })),
        A(445, 179.2, 445, 182.3, { tone: 'violet', weight: 1.1 }),
        A(445, 152, 445, 160.5, { tone: 'violet', weight: 1.1 }),
        A(445, 124.8, 445, 141.4, { tone: 'violet', weight: 1.1 }),
        T(498, 210, 'n = 0', { size: 9.5, tone: 'amber' }),
        T(498, 186, 'n = 1', { size: 9.5, tone: 'amber' }),
        T(498, 164, 'n = 2', { size: 9.5, tone: 'amber' }),
        T(498, 145, 'n = 3', { size: 9.5, tone: 'amber' }),
        T(498, 129, 'n = 4', { size: 9.5, tone: 'amber' }),
        T(498, 115, 'n = 5', { size: 9.5, tone: 'amber' }),
        T(330, 232, '实线：莫尔斯  虚线：谐振', { size: 9.5, tone: 'muted' }),
        T(320, 256, '修正项虽小，却决定能级的终点', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, 'ħω ≪ D_e 时，低能级几乎等间距', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '6.2/1-2',
      'λ 是态的配额：n < λ − ½',
      '$\\lambda=\\sqrt{2\\mu D_e}/(a\\hbar)$ 越大，能容纳的束缚态越多；λ 非整数时末级与顶部留有空隙。',
      [
        T(320, 24, 'λ 是态的配额：n < λ − ½', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 58, 'λ = √(2μD_e) / (aħ)', { size: 12, tone: 'mint' }),
        T(60, 86, 'n < λ − ½：允许的量子数', { size: 10.5, tone: 'amber' }),
        BAND(60, 140, 420, 40, { tone: 'mint', opacity: 0.1, r: 4 }),
        BAND(480, 140, 100, 40, { tone: 'danger', opacity: 0.1, r: 4 }),
        L(60, 160, 580, 160, { tone: 'dim' }),
        A(572, 160, 590, 160, { tone: 'dim' }),
        T(590, 176, 'n', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((i) => [
          L(80 + i * 40, 160, 80 + i * 40, 154, { tone: 'mint' }),
          DOT(80 + i * 40, 160, { r: 2.4, tone: 'mint' })
        ]),
        L(480, 160, 480, 154, { tone: 'danger' }),
        L(480, 136, 480, 184, { tone: 'danger', dash: true }),
        T(480, 128, 'λ − ½', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        T(80, 196, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(240, 196, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 196, '8', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(520, 196, '11', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(260, 132, '允许：n = 0 … 9', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(530, 132, '无束缚态', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        T(60, 220, 'λ 大：阱深或 μ 大 ⇒ 态多', { size: 10, tone: 'muted' }),
        T(60, 242, 'λ 小：只剩一两个态', { size: 10, tone: 'muted' }),
        T(60, 264, 'λ 非整数：末级与顶部留缝隙', { size: 10, tone: 'faint' }),
        T(380, 220, '这就是最后一个振动带的来历', { size: 10, tone: 'mint' }),
        T(380, 242, 'λ < ½：一个束缚态也没有', { size: 10, tone: 'danger' }),
        T(320, 258, '束缚态有限，数量由 λ 一个参数定死', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.2/2-0',
      'xe：非谐修正只有百分之几',
      '$x_e=\\hbar\\omega_e/(4D_e)$：修正项相对大小由阱深决定；$x_e\\ll1$，低能级近似等间距。',
      [
        T(320, 24, 'xe：非谐修正只有百分之几', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(46, 52, 190, 26, { tone: 'mint', opacity: 0.2, r: 5 }),
        T(141, 70, 'ħωe(n + ½)', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        BAND(46, 86, 140, 26, { tone: 'amber', opacity: 0.2, r: 5 }),
        T(116, 104, 'ħωe xe(n + ½)²', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(196, 104, '占比约 2%', { size: 9.5, tone: 'faint' }),
        T(46, 146, 'HCl：ωe ≈ 2990 cm⁻¹', { size: 10.5, tone: 'mint' }),
        T(46, 172, 'D_e ≈ 4.61 eV ≈ 37 200 cm⁻¹', { size: 9.5, tone: 'muted' }),
        T(46, 198, 'xe = ħωe / 4D_e ≈ 0.020', { size: 10.5, tone: 'amber' }),
        T(46, 224, 'ωe xe ≈ 53 cm⁻¹', { size: 10.5, tone: 'violet' }),
        L(360, 120, 580, 120, { tone: 'mint', weight: 10 }),
        L(360, 120, 363.9, 120, { tone: 'violet', weight: 10 }),
        T(360, 102, '一阶项：ωe ≈ 2990', { size: 9.5, tone: 'mint' }),
        T(360, 148, '二阶项：ωe xe ≈ 53', { size: 9.5, tone: 'violet' }),
        A(420, 176, 372, 134, { tone: 'faint', weight: 1.1 }),
        T(424, 190, '放大看才有长度：约 2%', { size: 9.5, tone: 'faint' }),
        T(360, 218, 'xe 小 ⇒ 低能级几乎等间距', { size: 10, tone: 'muted' }),
        T(320, 252, 'xe 就是“非谐性有多强”的刻度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'HCl 的 xe ≈ 0.02，谐振子是好近似', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.2/2-1',
      '谱线间距随 n 线性变短',
      '$\\Delta E_n=\\hbar\\omega_e[1-2x_e(n+1)]$：每升高一级，间距缩短 $2\\hbar\\omega_e x_e$，直到归零。',
      [
        T(320, 24, '谱线间距随 n 线性变短', { size: 12.5, tone: 'text', anchor: 'middle' }),
        AXIS({ x: 64, y: 84, w: 330, h: 136 }, { xLabel: 'n', yLabel: 'ΔE / cm⁻¹' }),
        CURVE((n) => 2990 * (1 - 0.04 * (n + 1)), { x: 64, y: 84, w: 330, h: 136 }, [0, 26], [0, 3000], {
          tone: 'mint',
          weight: 2
        }),
        DOT(64, 89.9, { r: 3, tone: 'amber' }),
        DOT(368.6, 220, { r: 3, tone: 'violet' }),
        T(64, 236, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(127, 236, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(191, 236, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(254, 236, '15', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(318, 236, '20', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(381, 236, '25', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(56, 224, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 179, '1000', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 133, '2000', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 88, '3000', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(96, 78, '2870：起点', { size: 9.5, tone: 'amber' }),
        T(378, 200, 'n ≈ 24：归零', { size: 9.5, tone: 'violet' }),
        T(420, 100, 'ΔE = ħωe[1 − 2xe(n+1)]', { size: 9.5, tone: 'mint' }),
        T(420, 128, '斜率 = −2ħωe xe', { size: 10, tone: 'amber' }),
        T(420, 152, '≈ −120 cm⁻¹ / 级', { size: 9.5, tone: 'amber' }),
        T(420, 180, '越往上，间距越小', { size: 10, tone: 'muted' }),
        T(420, 204, '归零处即解离极限', { size: 9.5, tone: 'violet' }),
        T(320, 256, '间距线性缩小，是有限阱深的直接证据', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '谐振子给不出这条下降的直线', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '6.2/2-2',
      '低处重合，高处分道扬镳',
      '谐振子预言无穷多等间距能级；莫尔斯谱只给有限个，并在 $D_e$ 处收拢。',
      [
        T(320, 24, '低处重合，高处分道扬镳', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 96, 570, 96, { tone: 'faint', dash: true }),
        T(566, 90, 'D_e', { size: 9.5, tone: 'faint', anchor: 'end' }),
        ...[214, 186, 158, 130, 102, 74].flatMap((y) => LEVEL(90, 250, y, '', { tone: 'cyan', dash: true })),
        T(170, 236, '谐振子', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
        T(170, 256, '等间距、无穷多', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...[214, 188, 158, 124, 100].flatMap((y) => LEVEL(300, 460, y, '', { tone: 'mint' })),
        T(380, 236, '莫尔斯', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(380, 256, '渐密、有限个', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        A(264, 214, 288, 214, { tone: 'dim', weight: 1.1 }),
        T(276, 202, '重合', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(490, 90, '顶部收拢', { size: 9.5, tone: 'mint' }),
        BAND(478, 108, 118, 30, { tone: 'danger', opacity: 0.12, r: 4 }),
        T(537, 127, '谐振子越界', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        T(320, 272, '只有莫尔斯谱在解离极限处收拢', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '6.2/0-0-f',
      'V(r)：指数壁 + 有限阱深',
      '$V=D_e[1-e^{-a(r-r_e)}]^2$：平方保证 $V\\ge0$，$r=r_e$ 取零，$r\\to\\infty$ 趋于 $D_e$。',
      [
        T(320, 24, 'V(r)：指数壁 + 有限阱深', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 58, 'V(r) =', { size: 11, tone: 'text' }),
        BAND(112, 42, 66, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(145, 60, 'D_e', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(182, 60, '×', { size: 12, tone: 'text' }),
        BAND(196, 42, 186, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(289, 60, '[1 − e^(−a(r−re))]²', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        L(64, 224, 390, 224, { tone: 'dim' }),
        A(382, 224, 400, 224, { tone: 'dim' }),
        T(390, 238, 'r', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        L(64, 105.9, 390, 105.9, { tone: 'faint', dash: true }),
        T(64, 100, 'D_e', { size: 9.5, tone: 'faint' }),
        CURVE(MORSE, { x: 64, y: 100, w: 300, h: 124 }, [0.7, 2.4], [0, 1.05], { tone: 'mint', weight: 2 }),
        DOT(116.9, 224, { r: 2.8, tone: 'amber' }),
        T(116, 240, 'r_e：V = 0', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(94, 192, '指数壁', { size: 9.5, tone: 'violet' }),
        T(260, 128, '缓慢趋平', { size: 9.5, tone: 'mint' }),
        T(404, 106, 'V ≥ 0：平方保证', { size: 10, tone: 'cyan' }),
        T(404, 130, 'r = re：V = 0', { size: 10, tone: 'amber' }),
        T(404, 154, 'r → ∞：V → D_e', { size: 10, tone: 'mint' }),
        T(404, 178, 'a 大：壁更陡、阱更窄', { size: 10, tone: 'violet' }),
        T(404, 202, 'r < re：指数上升，无奇点', { size: 9.5, tone: 'muted' }),
        T(404, 226, '两个参数：D_e 与 a', { size: 9.5, tone: 'faint' }),
        T(320, 254, 'V 只有一个谷，且永远不为负', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'D_e 定终值，a 定到达终值的快慢', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.2/0-1-f',
      'k = 2D_e a²：曲率的来源',
      '$V\'\'(r_e)=2D_ea^2$，故 $\\omega=a\\sqrt{2D_e/\\mu}$：$D_e$ 与 $a$ 一起定频率。',
      [
        T(320, 24, 'k = 2D_e a²：曲率的来源', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 56, 'V = D_e[1 − e^(−a(r−re))]²', { size: 9.5, tone: 'mint' }),
        T(46, 82, '记 x = a(r − re)', { size: 9.5, tone: 'muted' }),
        T(46, 108, 'V″ = 2D_e a² e^(−x)(2e^(−x) − 1)', { size: 9.5, tone: 'cyan' }),
        T(46, 136, '在 r = re：x = 0', { size: 9.5, tone: 'muted' }),
        T(46, 162, 'k = 2D_e a²(2 − 1) = 2D_e a²', { size: 11, tone: 'amber' }),
        T(46, 190, 'ω = a√(2D_e/μ)', { size: 11, tone: 'violet' }),
        T(46, 216, 'D_e 大：键更深更硬', { size: 9.5, tone: 'muted' }),
        AXIS({ x: 360, y: 86, w: 220, h: 120 }, { xLabel: 'a', yLabel: 'k' }),
        CURVE((x) => x * x, { x: 360, y: 86, w: 220, h: 120 }, [0, 2], [0, 4], { tone: 'mint', weight: 2 }),
        DOT(580, 86, { r: 3, tone: 'amber' }),
        T(470, 222, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(580, 222, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 150, '2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(352, 88, '4', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(470, 100, 'k ∝ a²', { size: 10, tone: 'mint' }),
        T(430, 132, 'a 加倍 ⇒ k 四倍', { size: 9.5, tone: 'amber' }),
        T(320, 252, '阱底曲率由 D_e 与 a² 共同决定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '再加约化质量 μ，才得到振动频率', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '6.2/1-0-f',
      '三段能谱：下沉、等距、收缩',
      '$E_n=-D_e+\\hbar\\omega(n+\\tfrac12)-\\dfrac{(\\hbar\\omega)^2}{4D_e}(n+\\tfrac12)^2$：二次项随 $n^2$ 增长。',
      [
        T(320, 24, '三段能谱：下沉、等距、收缩', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 56, 'E_n = −D_e + ħω(n+½)', { size: 10.5, tone: 'mint' }),
        T(46, 80, '− (ħω)²(n+½)²/(4D_e)', { size: 10.5, tone: 'amber' }),
        T(46, 110, '−D_e：零点整体下移', { size: 9.5, tone: 'muted' }),
        T(46, 134, 'ħω：等距台阶', { size: 9.5, tone: 'mint' }),
        T(46, 158, '二次项：随 n 迅速变大', { size: 9.5, tone: 'amber' }),
        T(46, 182, 'D_e → ∞：二次项消失', { size: 9.5, tone: 'violet' }),
        T(46, 206, '谱从“等距”变为“渐密”', { size: 9.5, tone: 'faint' }),
        L(64, 126.1, 390, 126.1, { tone: 'faint', dash: true }),
        T(386, 122, '0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        CURVE((n) => -1 + 0.15 * (n + 0.5), { x: 64, y: 90, w: 320, h: 130 }, [0, 9.4], [-1.3, 0.5], {
          tone: 'violet',
          dash: true,
          weight: 1.7
        }),
        CURVE((n) => -1 + 0.15 * (n + 0.5) - 0.005625 * (n + 0.5) ** 2, { x: 64, y: 90, w: 320, h: 130 }, [0, 12], [-1.3, 0.5], {
          tone: 'amber',
          weight: 2
        }),
        T(300, 100, '谐振子：直线上冲', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(250, 170, '莫尔斯：弯向 0', { size: 9.5, tone: 'amber' }),
        T(368, 88, '12', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(56, 96, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 214, '−1.3', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(320, 250, '第一项给骨架，第二项给终点', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, 'ħω/4D_e 越小，越接近等间距', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.2/1-1-f',
      'λ = √(2μD_e)/(aħ)：态的上限',
      '$\\lambda$ 的分子越大（阱深、约化质量），或分母越小（阱宽），能装的束缚态就越多。',
      [
        T(320, 24, 'λ = √(2μD_e)/(aħ)：态的上限', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 56, 'λ = √(2μD_e) / (aħ)', { size: 12, tone: 'mint' }),
        T(46, 86, '分子：阱深或 μ 大 ⇒ λ 大', { size: 9.5, tone: 'cyan' }),
        T(46, 110, '分母：a 大（阱窄）⇒ λ 小', { size: 9.5, tone: 'amber' }),
        T(46, 136, '束缚态数 N ≈ ⌈λ − ½⌉', { size: 10.5, tone: 'violet' }),
        T(46, 164, 'D_e → 0 ⇒ λ → 0：无束缚态', { size: 9.5, tone: 'muted' }),
        T(46, 188, 'D_e → ∞ ⇒ λ → ∞：谱趋连续', { size: 9.5, tone: 'muted' }),
        T(46, 212, 'λ 非整数：末级与顶部留空隙', { size: 9.5, tone: 'faint' }),
        AXIS({ x: 350, y: 84, w: 250, h: 126 }, { xLabel: 'D_e', yLabel: 'λ' }),
        CURVE((x) => Math.sqrt(x), { x: 350, y: 84, w: 250, h: 126 }, [0, 4], [0, 4], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        DOT(475, 126, { r: 3, tone: 'amber' }),
        T(412, 214, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(475, 214, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(537, 214, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(600, 214, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(342, 148, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(342, 88, '4', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(450, 100, 'λ ∝ √D_e', { size: 10, tone: 'mint' }),
        T(320, 252, '同一口阱：越深装得越多，越窄装得越少', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'λ 的整数部分，决定最后的振动带', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.2/2-0-f',
      'xe = ħωe/(4D_e)：修正的刻度',
      '$E_n=\\hbar\\omega_e(n+\\tfrac12)-\\hbar\\omega_e x_e(n+\\tfrac12)^2$：$x_e$ 无量纲，阱越深它越小。',
      [
        T(320, 24, 'xe = ħωe/(4D_e)：修正的刻度', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(46, 56, 'E_n = ħωe(n+½)', { size: 10.5, tone: 'mint' }),
        T(46, 80, '− ħωe xe(n+½)²', { size: 10.5, tone: 'amber' }),
        T(46, 108, 'xe = ħωe / (4D_e)', { size: 11, tone: 'violet' }),
        T(46, 138, 'ωe：谐振频率，单位 cm⁻¹', { size: 9.5, tone: 'muted' }),
        T(46, 162, 'xe：无量纲非谐性常数', { size: 9.5, tone: 'muted' }),
        T(46, 186, 'xe ≪ 1 ⇒ 低能级近等间距', { size: 9.5, tone: 'cyan' }),
        T(46, 210, 'xe 越大 ⇒ 修正越早生效', { size: 9.5, tone: 'amber' }),
        AXIS({ x: 380, y: 96, w: 210, h: 112 }, { xLabel: 'D_e', yLabel: 'xe' }),
        CURVE((x) => 0.08 / x, { x: 380, y: 96, w: 210, h: 112 }, [1, 5], [0, 0.085], {
          tone: 'mint',
          weight: 2,
          steps: 120
        }),
        DOT(406, 176.6, { r: 3, tone: 'amber' }),
        T(406, 194, 'HCl', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(494, 214, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(590, 214, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(372, 172, '0.02', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(372, 120, '0.06', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(470, 110, 'xe ∝ 1/D_e', { size: 10, tone: 'mint' }),
        T(440, 150, '阱越深，修正越弱', { size: 9.5, tone: 'muted' }),
        T(320, 252, 'xe 是“非谐有多强”的刻度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'HCl 的 xe ≈ 0.02：低能级几乎等距', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.2/2-1-f',
      'ΔE_n 线性递减：斜率就是 xe',
      '$\\Delta E_n=\\hbar\\omega_e[1-2x_e(n+1)]$：截距 $\\hbar\\omega_e$，斜率 $-2\\hbar\\omega_e x_e$，归零即解离。',
      [
        T(320, 24, 'ΔE_n 线性递减：斜率就是 xe', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 220, 420, 220, { tone: 'dim' }),
        A(412, 220, 430, 220, { tone: 'dim' }),
        T(420, 236, 'n', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        L(80, 220, 80, 88, { tone: 'dim' }),
        A(80, 100, 80, 86, { tone: 'dim' }),
        T(72, 84, 'ΔE', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((n) => 2990 * (1 - 0.04 * (n + 1)), { x: 80, y: 88, w: 340, h: 132 }, [0, 24], [0, 3000], {
          tone: 'mint',
          weight: 2
        }),
        DOT(80, 93.7, { r: 3, tone: 'amber' }),
        DOT(393.8, 220, { r: 3, tone: 'violet' }),
        L(80, 93.7, 393.8, 93.7, { tone: 'faint', dash: true }),
        L(393.8, 93.7, 393.8, 220, { tone: 'faint', dash: true }),
        T(84, 84, 'ħωe ≈ 2990', { size: 9.5, tone: 'amber' }),
        T(400, 216, 'n*≈24', { size: 9.5, tone: 'violet' }),
        T(180, 108, '下降 2870', { size: 9.5, tone: 'faint' }),
        T(200, 204, '跨度约 24 级', { size: 9.5, tone: 'faint' }),
        T(72, 224, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(72, 96, '3000', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(320, 250, '截距给频率，斜率给非谐性', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '间距归零处，就是最后一个振动带', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
