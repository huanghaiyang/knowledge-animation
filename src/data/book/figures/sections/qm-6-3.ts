import { fig, T, BAND, L, A, C, DOT, E, P, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '6.3/overview',
    '钟形阱：有限深、可精确求解',
    '$V=-D/\\cosh^2(\\alpha x)$：光滑有限阱，能级按 $-(\\lambda-n)^2$ 平方律排列，深阱极限回到谐振子。',
    [
      T(320, 24, '钟形阱：有限深、可精确求解', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 238, 200, '势阱 V(x)', { tone: 'mint' }),
      T(160, 64, '光滑、有限深', { size: 9.5, tone: 'faint' }),
      AXIS({ x: 58, y: 84, w: 190, h: 126 }, { xLabel: 'x' }),
      L(58, 89.7, 240, 89.7, { tone: 'faint', dash: true }),
      T(244, 87, 'V → 0', { size: 9.5, tone: 'faint', anchor: 'end' }),
      CURVE((x) => -1 / Math.cosh(x) ** 2, { x: 58, y: 84, w: 190, h: 126 }, [-2.6, 2.6], [-1.05, 0.05], {
        tone: 'mint',
        weight: 2
      }),
      ...LEVEL(135, 171, 181, '', { tone: 'cyan' }),
      ...LEVEL(118, 188, 141, '', { tone: 'cyan' }),
      ...LEVEL(78, 228, 113, '', { tone: 'cyan' }),
      DOT(154, 204.3, { r: 2.6, tone: 'amber' }),
      T(154, 220, '阱底 −D', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      A(58, 228, 248, 228, { tone: 'amber', weight: 1.1 }),
      T(153, 242, '宽度 ~ 1/α', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      ...PANEL(288, 44, 318, 200, '能谱 E_n = −(λ−n)²', { tone: 'violet' }),
      L(306, 84, 480, 84, { tone: 'faint', dash: true }),
      T(486, 86, '0：解离极限', { size: 9.5, tone: 'faint' }),
      ...[
        { y: 194, label: 'n = 0' },
        { y: 146, label: 'n = 1' },
        { y: 112, label: 'n = 2' },
        { y: 91, label: 'n = 3' }
      ].flatMap((lv) => LEVEL(306, 470, lv.y, lv.label, { tone: 'cyan', size: 9.5 })),
      A(560, 190, 560, 152, { tone: 'amber', weight: 1.3 }),
      T(568, 173, 'ΔE 递减', { size: 9.5, tone: 'amber' }),
      T(306, 236, '束缚态数有限：n < λ', { size: 10, tone: 'muted' }),
      T(320, 258, '能级按完全平方排列，不是等间距', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 276, 'λ 很大时回到谐振子', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '6.3/0-0',
      '光滑、有限深、没有硬核奇点',
      '$\\cosh^{-2}$ 在两侧平滑归零：既没有 12-6 势在原点发散，也没有谐振子的无限高壁。',
      [
        T(320, 24, '光滑、有限深、没有硬核奇点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 332, 178, '势阱形状', { tone: 'mint' }),
        AXIS({ x: 58, y: 80, w: 290, h: 118 }, { xLabel: 'x' }),
        L(58, 85.4, 348, 85.4, { tone: 'faint', dash: true }),
        T(340, 79, 'V = 0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        CURVE((x) => -1 / Math.cosh(x) ** 2, { x: 58, y: 80, w: 290, h: 118 }, [-3, 3], [-1.05, 0.05], {
          tone: 'mint',
          weight: 2
        }),
        P('M 155 85 Q 203 300 251 85', { tone: 'amber', dash: true, weight: 1.5 }),
        T(330, 112, '虚线：阱底谐振近似', { size: 9.5, tone: 'amber', anchor: 'end' }),
        DOT(203, 192.6, { r: 2.6, tone: 'amber' }),
        T(203, 207, '−D', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(386, 88, '两侧按 cosh⁻² 归零', { size: 10, tone: 'mint' }),
        T(386, 116, '阱壁光滑：无奇点', { size: 10, tone: 'muted' }),
        T(386, 144, '深度有限：束缚有限', { size: 10, tone: 'violet' }),
        T(386, 172, '谐振子：壁无穷高', { size: 10, tone: 'amber' }),
        T(386, 200, '12-6 势：原点发散', { size: 10, tone: 'danger' }),
        T(320, 244, '普薛耳-特勒势：温和、有限、可解', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '没有硬核，也没有无限高壁', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.3/0-1',
      '阱底展开：曲率给出 ω₀',
      '在极小点作二阶展开，力常数 $k=2D\\alpha^2$，频率随 $\\lambda$ 增大而升高。',
      [
        T(320, 24, '阱底展开：曲率给出 ω₀', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 286, 182, '阱底曲率', { tone: 'amber' }),
        T(58, 72, '虚线：λ = 1 与 λ = 2 的抛物线', { size: 9.5, tone: 'faint' }),
        AXIS({ x: 58, y: 86, w: 238, h: 110 }, { xLabel: 'x' }),
        CURVE((x) => -1 / Math.cosh(x) ** 2, { x: 58, y: 86, w: 238, h: 110 }, [-0.4, 0.4], [-1.05, 0.1], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => -1 + 2 * x * x, { x: 58, y: 86, w: 238, h: 110 }, [-0.4, 0.4], [-1.05, 0.1], {
          tone: 'amber',
          dash: true
        }),
        CURVE((x) => -1 + 6 * x * x, { x: 58, y: 86, w: 238, h: 110 }, [-0.4, 0.4], [-1.05, 0.1], {
          tone: 'violet',
          dash: true
        }),
        DOT(177, 191.2, { r: 2.6, tone: 'mint' }),
        T(334, 80, '二阶展开', { size: 10, tone: 'muted' }),
        T(334, 104, 'V ≈ −D + ½kx²', { size: 10.5, tone: 'mint' }),
        T(334, 128, 'k = 2Dα²', { size: 10.5, tone: 'amber' }),
        T(334, 152, 'λ 越大：曲率越大', { size: 10, tone: 'violet' }),
        T(334, 176, 'ω₀ = √(k/m)', { size: 10.5, tone: 'mint' }),
        T(334, 200, '深阱 ⇒ 接近谐振', { size: 10, tone: 'faint' }),
        T(320, 246, '阱底只认曲率，全局形状定高处命运', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, 'ω₀ = (ħα²/m)√(λ(λ+1))', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '6.3/0-2',
      '深阱里，谱线重新等间距',
      '$\\lambda$ 越大阱越深越宽，低能级间距趋于相同：谐振子只是深阱极限，不是独立模型。',
      [
        T(320, 24, '深阱里，谱线重新等间距', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 286, 196, 'λ = 5：间隔渐变', { tone: 'violet' }),
        L(60, 222, 60, 70, { tone: 'dim' }),
        A(60, 82, 60, 68, { tone: 'dim' }),
        T(52, 62, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...[204, 161, 127, 103, 89].flatMap((y) => LEVEL(76, 250, y, '', { tone: 'cyan' })),
        T(258, 206, 'n = 0', { size: 9.5, tone: 'cyan' }),
        T(258, 163, 'n = 1', { size: 9.5, tone: 'cyan' }),
        T(258, 129, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(258, 105, 'n = 3', { size: 9.5, tone: 'cyan' }),
        T(258, 91, 'n = 4', { size: 9.5, tone: 'cyan' }),
        A(222, 200, 222, 165, { tone: 'amber', weight: 1.2 }),
        T(230, 184, 'ΔE', { size: 9.5, tone: 'amber' }),
        T(60, 234, '越往上越密，直至解离极限', { size: 9.5, tone: 'muted' }),
        ...PANEL(330, 44, 276, 196, '谐振子：严格等间距', { tone: 'cyan' }),
        L(356, 222, 356, 70, { tone: 'dim' }),
        A(356, 82, 356, 68, { tone: 'dim' }),
        T(348, 62, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...[204, 174, 144, 114, 84].flatMap((y) => LEVEL(372, 520, y, '', { tone: 'mint' })),
        T(528, 206, 'n = 0', { size: 9.5, tone: 'mint' }),
        T(528, 176, 'n = 1', { size: 9.5, tone: 'mint' }),
        T(528, 146, 'n = 2', { size: 9.5, tone: 'mint' }),
        T(528, 116, 'n = 3', { size: 9.5, tone: 'mint' }),
        T(528, 86, 'n = 4', { size: 9.5, tone: 'mint' }),
        T(372, 234, 'ΔE = ħω 恒定，能级无限', { size: 9.5, tone: 'muted' }),
        T(320, 258, 'λ 越大，低能级越像谐振子', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '谐振子 = 所有光滑深阱的共同极限', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '6.3/1-0',
      '换成 tanh，方程变成超几何型',
      '令 $y=\\tanh\\alpha x$，两端无穷远映到 $y=\\pm1$；边界衰减条件把连续谱切成离散能级。',
      [
        T(320, 24, '换成 tanh，方程变成超几何型', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 250, 190, 'x → y = tanh αx', { tone: 'mint' }),
        L(64, 188, 268, 188, { tone: 'dim' }),
        A(260, 188, 278, 188, { tone: 'dim' }),
        T(272, 174, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(64, 188, 64, 74, { tone: 'dim' }),
        A(64, 86, 64, 72, { tone: 'dim' }),
        T(56, 66, 'y', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(64, 83.8, 268, 83.8, { tone: 'faint', dash: true }),
        L(64, 188, 268, 188, { tone: 'faint', dash: true }),
        T(272, 81, '+1', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(272, 200, '−1', { size: 9.5, tone: 'faint', anchor: 'end' }),
        CURVE((x) => Math.tanh(x), { x: 64, y: 74, w: 204, h: 114 }, [-3, 3], [-1.1, 1.1], {
          tone: 'mint',
          weight: 2
        }),
        DOT(166, 131, { r: 2.6, tone: 'amber' }),
        T(166, 120, 'x = 0 ⇒ y = 0', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(54, 222, '两端无穷远被压到 ±1', { size: 9.5, tone: 'muted' }),
        T(300, 80, '三步得到精确解', { size: 10.5, tone: 'muted' }),
        T(300, 106, '1  变量替换 y = tanh αx', { size: 10, tone: 'mint' }),
        T(300, 130, '2  方程化为超几何型', { size: 10, tone: 'cyan' }),
        T(300, 154, '3  边界衰减 ⇒ 能级分立', { size: 10, tone: 'violet' }),
        T(300, 178, '解由 Jacobi 多项式给出', { size: 10, tone: 'amber' }),
        T(300, 204, 'y 只在 (−1, 1) 内取值', { size: 9.5, tone: 'faint' }),
        T(320, 246, '边界条件代替了“盒子”', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '波函数在两端衰减，谱才离散', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.3/1-1',
      '平方律：能级越往上越密',
      '$E_n\\propto-(\\lambda-n)^2$：间隔 $\\propto2(\\lambda-n)-1$，随 $n$ 线性缩小，顶部向解离极限收拢。',
      [
        T(320, 24, '平方律：能级越往上越密', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(90, 244, 90, 64, { tone: 'dim' }),
        A(90, 76, 90, 62, { tone: 'dim' }),
        T(82, 56, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(82, 228, '−D', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...[226, 176.5, 136, 104.5, 82, 68.5].flatMap((y) => LEVEL(106, 340, y, '', { tone: 'cyan' })),
        T(348, 228, 'n = 0', { size: 9.5, tone: 'cyan' }),
        T(348, 178, 'n = 1', { size: 9.5, tone: 'cyan' }),
        T(348, 138, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(348, 106, 'n = 3', { size: 9.5, tone: 'cyan' }),
        T(348, 84, 'n = 4', { size: 9.5, tone: 'cyan' }),
        T(348, 70, 'n = 5', { size: 9.5, tone: 'cyan' }),
        A(270, 222, 270, 180, { tone: 'amber', weight: 1.2 }),
        T(278, 203, 'ΔE', { size: 9.5, tone: 'amber' }),
        T(406, 84, 'λ = 6：共 6 个束缚态', { size: 10, tone: 'mint' }),
        T(406, 110, '间隔逐级变小', { size: 10, tone: 'amber' }),
        T(406, 136, '顶部趋近 E = 0', { size: 10, tone: 'faint' }),
        T(406, 162, '没有 n = 6 的束缚态', { size: 10, tone: 'violet' }),
        T(406, 188, 'n < λ 是硬条件', { size: 10, tone: 'muted' }),
        T(320, 258, '相邻间隔 ∝ 2(λ−n)−1，随 n 线性缩小', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '能级按完全平方排列，不是等间距', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '6.3/1-2',
      '束缚态数由 λ 一个参数定死',
      '$n=0,1,\\dots,N$ 且 $N<\\lambda$：整数 $\\lambda$ 恰好给出 $\\lambda$ 个束缚态，$\\lambda\\le0$ 时一个也没有。',
      [
        T(320, 24, '束缚态数由 λ 一个参数定死', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 300, 180, '束缚态数 N = ⌈λ⌉', { tone: 'violet' }),
        AXIS({ x: 74, y: 78, w: 236, h: 124 }, { xLabel: 'λ', yLabel: 'N' }),
        CURVE((x) => Math.ceil(x), { x: 74, y: 78, w: 236, h: 124 }, [0.1, 4.9], [0, 5.2], {
          tone: 'violet',
          weight: 2
        }),
        DOT(74 + (0.9 / 4.8) * 236, 78 + 124 - (1 / 5.2) * 124, { r: 2.6, tone: 'amber' }),
        DOT(74 + (1.9 / 4.8) * 236, 78 + 124 - (2 / 5.2) * 124, { r: 2.6, tone: 'amber' }),
        DOT(74 + (2.9 / 4.8) * 236, 78 + 124 - (3 / 5.2) * 124, { r: 2.6, tone: 'amber' }),
        DOT(74 + (3.9 / 4.8) * 236, 78 + 124 - (4 / 5.2) * 124, { r: 2.6, tone: 'amber' }),
        T(74, 216, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(123, 216, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(172, 216, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(221, 216, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 84, 'λ ≤ 0', { size: 10.5, tone: 'danger' }),
        T(350, 106, '阱消失，无束缚态', { size: 9.5, tone: 'muted' }),
        T(350, 136, 'λ = 1', { size: 10.5, tone: 'mint' }),
        T(350, 158, '只剩 n = 0 一个', { size: 9.5, tone: 'muted' }),
        T(350, 188, 'λ = 4', { size: 10.5, tone: 'violet' }),
        T(350, 210, 'n = 0,1,2,3 共 4 个', { size: 9.5, tone: 'muted' }),
        T(350, 238, 'λ 非整数：末级与顶留空隙', { size: 9.5, tone: 'faint' }),
        T(320, 258, '束缚态数有限，且由 λ 一个参数决定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '这就是“最后一个振动带”的来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.3/2-0',
      'λ 大时，间隔趋于 ħω₀',
      '固定 $n$ 让 $\\lambda$ 增大，比值 $\\Delta E/\\hbar\\omega_0=1-1/(2\\lambda)$ 趋于 1，谱线重新等间距。',
      [
        T(320, 24, 'λ 大时，间隔趋于 ħω₀', { size: 12.5, tone: 'text', anchor: 'middle' }),
        AXIS({ x: 80, y: 80, w: 380, h: 130 }, { xLabel: 'λ', yLabel: 'ΔE/ħω₀' }),
        L(80, 91.8, 460, 91.8, { tone: 'faint', dash: true }),
        T(466, 89, '1', { size: 9.5, tone: 'faint' }),
        CURVE((x) => 1 - 1 / (2 * x), { x: 80, y: 80, w: 380, h: 130 }, [1, 12], [0.4, 1.06], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        DOT(80, 190.3, { r: 3, tone: 'amber' }),
        DOT(218.2, 111.5, { r: 3, tone: 'amber' }),
        T(80, 224, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(218, 224, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(356, 224, '9', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(460, 224, '12', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(72, 191, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(72, 112, '0.9', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(250, 150, '比值单调逼近 1', { size: 10, tone: 'mint' }),
        T(320, 258, 'λ 大：低能级间隔 → ħω₀，谱线等间距', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, 'λ 小：阱只容一两个态，间隔很大', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.3/2-1',
      '特殊 λ：入射波完全透射',
      '对某些特殊 $\\lambda$，势阱不反射任何入射波：$R=0$、$T=1$，形状被“设计”成反射透明。',
      [
        T(320, 24, '特殊 λ：入射波完全透射', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 110, 580, 110, { tone: 'dim' }),
        A(572, 110, 592, 110, { tone: 'dim' }),
        T(590, 96, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(584, 122, 'V = 0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        P('M 150 110 C 220 110 250 212 320 212 C 390 212 420 110 490 110', { tone: 'mint', weight: 2 }),
        T(320, 230, 'V = −D/cosh²(αx)', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        CURVE((x) => Math.sin(x), { x: 64, y: 118, w: 86, h: 26 }, [0, 6.28], [-1, 1], { tone: 'cyan', weight: 1.6 }),
        T(107, 158, '入射波', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        CURVE((x) => Math.sin(x), { x: 492, y: 118, w: 88, h: 26 }, [0, 6.28], [-1, 1], { tone: 'amber', weight: 1.6 }),
        T(536, 158, '透射波', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(188, 190, 86, 190, { tone: 'danger', dash: true, weight: 1.2 }),
        L(128, 182, 138, 198, { tone: 'danger', weight: 1.2 }),
        L(138, 182, 128, 198, { tone: 'danger', weight: 1.2 }),
        T(196, 194, '无反射波', { size: 9.5, tone: 'danger' }),
        T(492, 86, '振幅不变：T = 1', { size: 10, tone: 'amber' }),
        T(60, 250, '一般 λ：R ≠ 0，部分波被反射', { size: 10, tone: 'muted' }),
        T(60, 272, '特殊 λ：R = 0，完全透明', { size: 10, tone: 'mint' })
      ]
    ),
    '2-2': fig(
      '6.3/2-2',
      '孤子、畴壁与波导中的同一形状',
      '$\\cosh^{-2}$ 的局域凹陷既描述孤子与磁性畴壁，也描述光波导中的局域模；它是可解的基准模型。',
      [
        T(320, 24, '孤子、畴壁与波导中的同一形状', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 180, 170, '孤子', { tone: 'mint' }),
        CURVE((x) => 1 / Math.cosh(x) ** 2, { x: 54, y: 88, w: 140, h: 62 }, [-3, 3], [0, 1.05], {
          tone: 'mint',
          weight: 2
        }),
        T(124, 166, '局域脉冲', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(124, 188, '传播中不变形', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(124, 208, '非线性系统的解', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(230, 50, 180, 170, '磁性畴壁', { tone: 'violet' }),
        CURVE((x) => Math.tanh(x), { x: 250, y: 100, w: 140, h: 60 }, [-3, 3], [-1.1, 1.1], {
          tone: 'violet',
          weight: 2
        }),
        A(268, 96, 268, 80, { tone: 'violet', weight: 1.2 }),
        A(372, 164, 372, 180, { tone: 'violet', weight: 1.2 }),
        T(320, 106, '自旋翻转', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 176, '过渡层即畴壁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 200, '宽度由 1/α 给出', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(426, 50, 180, 170, '光波导', { tone: 'cyan' }),
        BAND(440, 104, 152, 30, { tone: 'cyan', opacity: 0.16, r: 4 }),
        CURVE((x) => 1 / Math.cosh(1.6 * x) ** 2, { x: 448, y: 104, w: 136, h: 30 }, [-3, 3], [0, 1.05], {
          tone: 'cyan',
          weight: 2
        }),
        T(516, 154, '芯层局域模', { size: 10, tone: 'cyan', anchor: 'middle' }),
        T(516, 178, '光被横向束缚', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(516, 200, '宽度决定模数', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 242, '同一形状，三种物理场景', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '价值在可解与有限阱特征，不在拟合分子', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '6.3/0-0-f',
      'V = −D/cosh²αx：深度、宽度、形状',
      '$D=\\hbar^2\\alpha^2\\lambda(\\lambda+1)/2m$：$D$ 定阱深，$1/\\alpha$ 定宽度，$\\lambda$ 同时控制两者与束缚态数。',
      [
        T(320, 24, 'V = −D/cosh²αx：深度、宽度、形状', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'V(x) = −D / cosh²(αx)', { size: 12.5, tone: 'text' }),
        T(52, 80, 'D = ħ²α²λ(λ+1) / 2m', { size: 10.5, tone: 'mint' }),
        AXIS({ x: 64, y: 104, w: 300, h: 104 }, { xLabel: 'x' }),
        L(64, 108.7, 364, 108.7, { tone: 'faint', dash: true }),
        T(360, 104, 'V = 0', { size: 9.5, tone: 'faint', anchor: 'end' }),
        CURVE((x) => -1 / Math.cosh(x) ** 2, { x: 64, y: 104, w: 300, h: 104 }, [-3, 3], [-1.05, 0.05], {
          tone: 'mint',
          weight: 2
        }),
        DOT(214, 203.3, { r: 2.6, tone: 'amber' }),
        T(214, 218, '−D', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(64, 228, 364, 228, { tone: 'amber', weight: 1.1 }),
        T(214, 242, '宽度 ~ 1/α', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(390, 108, 'D：阱深，定束缚态数', { size: 10, tone: 'amber' }),
        T(390, 132, '1/α：宽度，定间隔尺度', { size: 10, tone: 'cyan' }),
        T(390, 156, 'λ：深度与宽度一起变', { size: 10, tone: 'violet' }),
        T(390, 180, 'x = 0：V = −D', { size: 9.5, tone: 'mint' }),
        T(390, 200, 'x → ±∞：V → 0', { size: 9.5, tone: 'faint' }),
        T(390, 220, 'cosh 无零点 ⇒ 处处光滑', { size: 9.5, tone: 'muted' }),
        T(320, 258, 'D 越大、1/α 越宽，束缚态越多', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '两端归零、中心取 −D，这就是钟形', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.3/0-1-f',
      'ω₀ = √(V″(0)/m)：阱底曲率定频率',
      "$\\omega_0=\\sqrt{V^{\\prime\\prime}(0)/m}=(\\hbar\\alpha^2/m)\\sqrt{\\lambda(\\lambda+1)}$：曲率越大频率越高，$\\lambda$ 大时 $\\omega_0\\propto\\lambda$。",
      [
        T(320, 24, 'ω₀ = √(V″(0)/m)：阱底曲率定频率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'ω₀ = √(V″(0)/m)', { size: 12.5, tone: 'text' }),
        T(52, 80, '= (ħα²/m)√(λ(λ+1))', { size: 11, tone: 'mint' }),
        AXIS({ x: 70, y: 104, w: 290, h: 104 }, { xLabel: 'λ', yLabel: 'ω₀' }),
        CURVE((x) => Math.sqrt(x * (x + 1)), { x: 70, y: 104, w: 290, h: 104 }, [0, 8], [0, 9], {
          tone: 'mint',
          weight: 2
        }),
        DOT(70 + (1 / 8) * 290, 208 - (Math.sqrt(2) / 9) * 104, { r: 3, tone: 'amber' }),
        DOT(70 + (3 / 8) * 290, 208 - (Math.sqrt(12) / 9) * 104, { r: 3, tone: 'amber' }),
        T(70, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(142, 224, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(215, 224, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(288, 224, '6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(360, 224, '8', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(374, 112, 'V″(0)：阱底曲率', { size: 10, tone: 'amber' }),
        T(374, 138, 'k = 2Dα²', { size: 10, tone: 'amber' }),
        T(374, 164, 'm：质量，定惯性', { size: 10, tone: 'muted' }),
        T(374, 190, 'λ 小：ω₀ 也小', { size: 10, tone: 'cyan' }),
        T(374, 216, 'λ ≫ 1：ω₀ ∝ λ', { size: 10, tone: 'violet' }),
        T(320, 250, '曲率是唯一的局部信息', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '深阱极限：ħω₀ → (ħ²α²/m)λ', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '6.3/1-0-f',
      'E_n = −C(λ−n)²：平方律能谱',
      '$C=\\hbar^2\\alpha^2/2m$：能量按完全平方排，间隔 $C\\cdot2(\\lambda-n-1)$ 逐级缩小，$n$ 只能取到 $N<\\lambda$。',
      [
        T(320, 24, 'E_n = −C(λ−n)²：平方律能谱', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'E_n = −(ħ²α²/2m)(λ−n)²', { size: 12, tone: 'text' }),
        T(52, 80, 'n = 0, 1, …, N < λ', { size: 10.5, tone: 'mint' }),
        L(90, 232, 90, 62, { tone: 'dim' }),
        A(90, 74, 90, 60, { tone: 'dim' }),
        T(82, 54, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...[220, 176, 144, 120, 102].flatMap((y) => LEVEL(106, 242, y, '', { tone: 'cyan' })),
        A(232, 216, 232, 180, { tone: 'amber', weight: 1.2 }),
        T(240, 200, 'ΔE', { size: 9.5, tone: 'amber' }),
        T(300, 222, 'n = 0：25', { size: 9.5, tone: 'cyan' }),
        T(300, 178, 'n = 1：16', { size: 9.5, tone: 'cyan' }),
        T(300, 146, 'n = 2：9', { size: 9.5, tone: 'cyan' }),
        T(300, 122, 'n = 3：4', { size: 9.5, tone: 'cyan' }),
        T(300, 104, 'n = 4：1', { size: 9.5, tone: 'cyan' }),
        T(406, 92, 'C：整体能量尺度', { size: 10, tone: 'mint' }),
        T(406, 118, '(λ−n)²：完全平方', { size: 10, tone: 'cyan' }),
        T(406, 144, '间隔逐级缩小', { size: 10, tone: 'amber' }),
        T(406, 170, 'n 只能到 N < λ', { size: 10, tone: 'violet' }),
        T(406, 196, 'λ 整数：恰好 λ 个态', { size: 10, tone: 'muted' }),
        T(406, 222, 'λ ≤ 0：一个也没有', { size: 9.5, tone: 'danger' }),
        T(320, 258, '平方律：越靠顶越密，最后并入连续谱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '不是被截断的谐振谱，而是整体重排', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.3/1-1-f',
      'ψ_n ∝ P_n(λ−n,λ−n)(tanh αx)',
      'Jacobi 多项式乘 $\\mathrm{sech}^{\\lambda-n}$ 包络：$n$ 给节点数，两端衰减保证归一化，$x\\to\\pm\\infty$ 时 $\\psi\\to0$。',
      [
        T(320, 24, 'ψ_n ∝ P_n(λ−n,λ−n)(tanh αx)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'ψ_n(x) ∝ P_n^(λ−n, λ−n)(tanh αx)', { size: 11.5, tone: 'text' }),
        T(52, 80, '× sech^(λ−n)(αx)', { size: 10.5, tone: 'mint' }),
        L(60, 158, 360, 158, { tone: 'faint', dash: true }),
        L(60, 220, 60, 98, { tone: 'dim' }),
        A(60, 110, 60, 96, { tone: 'dim' }),
        T(52, 90, 'ψ', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(52, 108, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 158, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 208, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        CURVE((x) => 1 / Math.cosh(x) ** 4, { x: 60, y: 98, w: 300, h: 120 }, [-3, 3], [-1.2, 1.2], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => 2.1 * Math.tanh(x) / Math.cosh(x) ** 4, { x: 60, y: 98, w: 300, h: 120 }, [-3, 3], [-1.2, 1.2], {
          tone: 'cyan',
          weight: 1.7
        }),
        CURVE((x) => 0.9 * (1 - 3 * Math.tanh(x) ** 2) / Math.cosh(x) ** 4, {
          x: 60,
          y: 98,
          w: 300,
          h: 120
        }, [-3, 3], [-1.2, 1.2], { tone: 'violet', weight: 1.6 }),
        T(368, 116, 'n = 0', { size: 9.5, tone: 'mint' }),
        T(368, 138, 'n = 1', { size: 9.5, tone: 'cyan' }),
        T(368, 160, 'n = 2', { size: 9.5, tone: 'violet' }),
        T(376, 190, 'P：Jacobi 多项式', { size: 10, tone: 'muted' }),
        T(376, 214, 'α, β = λ−n：两个参数', { size: 10, tone: 'violet' }),
        T(376, 238, 'n 个内部零点', { size: 10, tone: 'cyan' }),
        T(320, 256, '两端按 sech 幂衰减，x → ±∞ 时 ψ → 0', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '归一化后即概率密度 |ψ|²', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.3/2-0-f',
      '间隔 2C(λ−n−1) → ħω₀',
      '$E_{n+1}-E_n=(\\hbar^2\\alpha^2/2m)\\cdot2(\\lambda-n-1)$：随 $n$ 线性收缩；$\\lambda\\gg n$ 时趋于常数 $\\hbar\\omega_0$。',
      [
        T(320, 24, '间隔 2C(λ−n−1) → ħω₀', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'E(n+1) − E(n)', { size: 12, tone: 'text' }),
        T(190, 58, '= (ħ²α²/2m)·2(λ−n−1)', { size: 11.5, tone: 'mint' }),
        T(52, 80, 'λ ≫ n：→ ħ²α²λ/m = ħω₀', { size: 10.5, tone: 'amber' }),
        AXIS({ x: 70, y: 104, w: 300, h: 104 }, { xLabel: 'n', yLabel: 'ΔE' }),
        CURVE((x) => 10 - 2 * x, { x: 70, y: 104, w: 300, h: 104 }, [0, 5], [0, 11], {
          tone: 'mint',
          weight: 2
        }),
        DOT(70, 208 - (10 / 11) * 104, { r: 3, tone: 'amber' }),
        DOT(130, 208 - (8 / 11) * 104, { r: 3, tone: 'amber' }),
        DOT(190, 208 - (6 / 11) * 104, { r: 3, tone: 'amber' }),
        DOT(250, 208 - (4 / 11) * 104, { r: 3, tone: 'amber' }),
        DOT(310, 208 - (2 / 11) * 104, { r: 3, tone: 'amber' }),
        T(70, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(190, 224, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 224, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 112, '2(λ−n−1)：间隔因子', { size: 10, tone: 'cyan' }),
        T(370, 138, 'n 越大，间隔越小', { size: 10, tone: 'mint' }),
        T(370, 164, 'n = λ−1：间隔为零', { size: 10, tone: 'danger' }),
        T(370, 190, 'λ ≫ n：间隔 ≈ ħω₀', { size: 10, tone: 'amber' }),
        T(370, 216, 'ħω₀：深阱的共同间隔', { size: 10, tone: 'violet' }),
        T(320, 250, '顶部收拢，是因为只剩有限个束缚态', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '深阱里低能级重新等间距', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.3/2-1-f',
      'T = 1：反射透明的特殊 λ',
      '一般 $0\\le R<1$、$T<1$；特殊 $\\lambda$ 使反射系数恰为零，$R=0$、$T=1$，入射振幅原样穿过。',
      [
        T(320, 24, 'T = 1：反射透明的特殊 λ', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'T = 1，R = 0', { size: 12.5, tone: 'text' }),
        T(52, 80, 'T + R = 1 恒成立', { size: 10.5, tone: 'mint' }),
        L(60, 128, 580, 128, { tone: 'dim' }),
        A(572, 128, 592, 128, { tone: 'dim' }),
        T(588, 114, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        P('M 190 128 C 250 128 280 200 320 200 C 360 200 390 128 450 128', { tone: 'mint', weight: 2 }),
        CURVE((x) => Math.sin(x), { x: 66, y: 136, w: 96, h: 24 }, [0, 6.28], [-1, 1], { tone: 'cyan', weight: 1.6 }),
        T(114, 174, '入射波', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        CURVE((x) => Math.sin(x), { x: 472, y: 136, w: 96, h: 24 }, [0, 6.28], [-1, 1], { tone: 'amber', weight: 1.6 }),
        T(520, 174, '透射波', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(200, 188, 96, 188, { tone: 'danger', dash: true, weight: 1.2 }),
        L(138, 180, 148, 196, { tone: 'danger', weight: 1.2 }),
        L(148, 180, 138, 196, { tone: 'danger', weight: 1.2 }),
        T(208, 192, '无反射', { size: 9.5, tone: 'danger' }),
        T(320, 220, '特殊 λ：势阱对入射波透明', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(420, 88, 'λ 取特殊整数值', { size: 9.5, tone: 'violet' }),
        T(60, 246, '一般情形：0 ≤ R < 1，T < 1', { size: 10, tone: 'muted' }),
        T(60, 268, '特殊 λ：R = 0，T = 1', { size: 10, tone: 'mint' })
      ]
    )
  }
}
export default set
