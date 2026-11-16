import { fig, T, R, BAND, L, A, C, DOT, E, P, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '6.4/overview',
    '不扩散的波包，最精确的钟',
    '相干态宽度恒定、中心按 $x=A\\cos\\omega t$ 振荡；光学钟把这种稳定相位累积变成时间基准。',
    [
      T(320, 24, '不扩散的波包，最精确的钟', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 320, 196, '相干态波包', { tone: 'mint' }),
      L(58, 150, 330, 150, { tone: 'faint', dash: true }),
      E(94, 150, 22, 13, { tone: 'mint', fill: true, opacity: 0.3 }),
      E(194, 150, 22, 13, { tone: 'violet', fill: true, opacity: 0.3 }),
      E(294, 150, 22, 13, { tone: 'cyan', fill: true, opacity: 0.3 }),
      T(94, 118, 't = 0', { size: 9.5, tone: 'mint', anchor: 'middle' }),
      T(194, 118, 'T/2', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(294, 118, 'T', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
      T(194, 88, '宽度始终不变', { size: 10, tone: 'mint', anchor: 'middle' }),
      A(116, 178, 272, 178, { tone: 'amber', weight: 1.2 }),
      A(272, 190, 116, 190, { tone: 'faint', weight: 1.1 }),
      T(194, 208, 'x(t) = A cos ωt', { size: 10, tone: 'amber', anchor: 'middle' }),
      ...PANEL(370, 44, 236, 196, '光学钟', { tone: 'cyan' }),
      ...LEVEL(396, 500, 194, '基态', { tone: 'dim', size: 9.5 }),
      ...LEVEL(396, 500, 106, '长寿命激发态', { tone: 'cyan', size: 9.5 }),
      A(470, 188, 470, 112, { tone: 'amber', weight: 1.3 }),
      T(478, 152, 'ν₀ = ΔE/h', { size: 10, tone: 'amber' }),
      T(396, 86, '谱线越窄，Q 越高', { size: 9.5, tone: 'faint' }),
      T(396, 216, '把跃迁频率锁成时间刻度', { size: 9.5, tone: 'muted' }),
      T(320, 258, '波包不扩散 ⇒ 相位稳定累积', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 276, '量子振荡成为最精确的时间标尺', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '6.4/0-0',
      '平移基态，就是相干态',
      '基态在相空间平移得到相干态；它按泊松权重叠加各 $n$ 态，平均量子数为 $|\\alpha|^2$。',
      [
        T(320, 24, '平移基态，就是相干态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 270, 190, '相空间平移', { tone: 'mint' }),
        L(54, 144, 284, 144, { tone: 'dim' }),
        A(276, 144, 292, 144, { tone: 'dim' }),
        L(169, 214, 169, 70, { tone: 'dim' }),
        A(169, 82, 169, 68, { tone: 'dim' }),
        T(290, 162, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(178, 66, 'p', { size: 9.5, tone: 'dim' }),
        C(169, 144, 18, { tone: 'faint', dash: true }),
        C(240, 144, 18, { tone: 'mint' }),
        T(169, 118, '|0⟩', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(240, 118, '|α⟩', { size: 10, tone: 'mint', anchor: 'middle' }),
        A(190, 144, 219, 144, { tone: 'amber', weight: 1.2 }),
        T(205, 166, '平移', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(60, 222, '半径不变：不确定度相同', { size: 9.5, tone: 'muted' }),
        ...PANEL(320, 44, 286, 190, '泊松权重', { tone: 'violet' }),
        ...[4.6, 18, 37, 49, 49, 39, 26, 15, 7, 3].flatMap((h, i) =>
          BAND(338 + i * 24, 204 - h, 16, h, { tone: 'mint', opacity: 0.32, r: 2 })
        ),
        L(334, 204, 588, 204, { tone: 'dim' }),
        T(346, 220, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(418, 220, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(490, 220, '6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(562, 220, '9', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(334, 80, 'P(n) 随 n 先升后降', { size: 9.5, tone: 'muted' }),
        T(334, 100, '⟨n⟩ = |α|² = 4', { size: 10, tone: 'violet' }),
        T(320, 244, '平移基态，不确定度不变', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '权重是泊松分布，平均量子数 |α|²', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.4/0-1',
      '本征态：中心绕圈，形状不变',
      '$\\hat a|\\alpha\\rangle=\\alpha|\\alpha\\rangle$：湮灭算符只给出数，不改变态；中心在相空间绕圈，形状始终不变。',
      [
        T(320, 24, '本征态：中心绕圈，形状不变', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 144, 330, 144, { tone: 'dim' }),
        A(322, 144, 338, 144, { tone: 'dim' }),
        L(195, 216, 195, 66, { tone: 'dim' }),
        A(195, 78, 195, 64, { tone: 'dim' }),
        T(336, 162, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(204, 60, 'p', { size: 9.5, tone: 'dim' }),
        C(195, 143, 68, { tone: 'violet', dash: true }),
        E(257, 143, 9, 17, { tone: 'mint', fill: true, opacity: 0.3 }),
        E(195, 81, 17, 9, { tone: 'cyan', fill: true, opacity: 0.3 }),
        E(133, 143, 9, 17, { tone: 'amber', fill: true, opacity: 0.3 }),
        E(195, 205, 17, 9, { tone: 'violet', fill: true, opacity: 0.3 }),
        T(268, 126, 't = 0', { size: 9.5, tone: 'mint' }),
        T(218, 72, 'T/4', { size: 9.5, tone: 'cyan' }),
        T(88, 147, 'T/2', { size: 9.5, tone: 'amber', anchor: 'end' }),
        T(208, 222, '3T/4', { size: 9.5, tone: 'violet' }),
        A(228, 86, 250, 100, { tone: 'dim', weight: 1.2 }),
        T(360, 96, 'â|α⟩ = α|α⟩', { size: 12, tone: 'mint' }),
        T(360, 126, '本征值 α 只是数', { size: 10, tone: 'muted' }),
        T(360, 152, '态的形状不被改变', { size: 10, tone: 'cyan' }),
        T(360, 178, '中心绕相空间转圈', { size: 10, tone: 'violet' }),
        T(360, 204, '一圈 = 一个周期 T', { size: 10, tone: 'amber' }),
        T(320, 246, '相干态在演化中只是整体平移', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '这就是它最接近经典运动的原因', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '6.4/0-2',
      '能量 = 经典振动 + 零点能',
      '$\\langle E\\rangle=\\hbar\\omega(|\\alpha|^2+1/2)$：前半是经典振动，后半是不可消除的零点能。',
      [
        T(320, 24, '能量 = 经典振动 + 零点能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(80, 112, '⟨E⟩ = 4.5 ħω（|α|² = 4）', { size: 11, tone: 'text' }),
        R(80, 130, 360, 34, { tone: 'amber', fill: true, opacity: 0.3, r: 4 }),
        R(440, 130, 45, 34, { tone: 'violet', fill: true, opacity: 0.3, r: 4 }),
        T(260, 152, '经典振动 4ħω', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(492, 152, '½ħω 零点能', { size: 9.5, tone: 'violet' }),
        L(80, 200, 560, 200, { tone: 'dim' }),
        A(552, 200, 572, 200, { tone: 'dim' }),
        L(80, 200, 80, 206, { tone: 'dim' }),
        L(170, 200, 170, 206, { tone: 'dim' }),
        L(260, 200, 260, 206, { tone: 'dim' }),
        L(350, 200, 350, 206, { tone: 'dim' }),
        L(440, 200, 440, 206, { tone: 'dim' }),
        L(530, 200, 530, 206, { tone: 'dim' }),
        T(80, 220, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(170, 220, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(260, 220, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 220, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(440, 220, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(530, 220, '5 ħω', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(80, 244, 'α = 0：只剩 ½ħω 零点能', { size: 10, tone: 'violet' }),
        T(80, 266, 'α 大：经典项主导，量子修正可忽略', { size: 10, tone: 'muted' })
      ]
    ),
    '1-0': fig(
      '6.4/1-0',
      '一般波包会散开，相干态不会',
      '不同频率分量相位错开，普通波包越走越宽；相干态各分量相位锁定，展宽被精确抵消。',
      [
        T(320, 24, '一般波包会散开，相干态不会', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 280, 180, '一般波包：展宽', { tone: 'danger' }),
        CURVE((x) => Math.exp(-(((x - 0.28) / 0.05) ** 2)), { x: 50, y: 86, w: 248, h: 100 }, [0, 1], [0, 1.05], {
          tone: 'faint',
          weight: 1.6
        }),
        CURVE((x) => 0.8 * Math.exp(-(((x - 0.5) / 0.08) ** 2)), { x: 50, y: 86, w: 248, h: 100 }, [0, 1], [0, 1.05], {
          tone: 'amber',
          weight: 1.6
        }),
        CURVE((x) => 0.55 * Math.exp(-(((x - 0.72) / 0.12) ** 2)), { x: 50, y: 86, w: 248, h: 100 }, [0, 1], [0, 1.05], {
          tone: 'danger',
          weight: 1.6
        }),
        T(68, 112, 't₁', { size: 9.5, tone: 'faint' }),
        T(160, 96, 't₂', { size: 9.5, tone: 'amber' }),
        T(248, 112, 't₃', { size: 9.5, tone: 'danger' }),
        T(50, 208, '宽度随 t 增大', { size: 9.5, tone: 'muted' }),
        ...PANEL(330, 44, 276, 180, '相干态：宽度不变', { tone: 'mint' }),
        CURVE((x) => Math.exp(-(((x - 0.28) / 0.055) ** 2)), { x: 346, y: 86, w: 244, h: 100 }, [0, 1], [0, 1.05], {
          tone: 'mint',
          weight: 1.6
        }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.055) ** 2)), { x: 346, y: 86, w: 244, h: 100 }, [0, 1], [0, 1.05], {
          tone: 'cyan',
          weight: 1.6
        }),
        CURVE((x) => Math.exp(-(((x - 0.72) / 0.055) ** 2)), { x: 346, y: 86, w: 244, h: 100 }, [0, 1], [0, 1.05], {
          tone: 'violet',
          weight: 1.6
        }),
        T(346, 208, '宽度逐帧相同', { size: 9.5, tone: 'muted' }),
        T(320, 244, '普通波包：频率分量相位错开 ⇒ 展宽', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '相干态：相位锁定 ⇒ 宽度不增长', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.4/1-1',
      '中心按经典余弦走，宽度不动',
      '$\\Delta x=\\sqrt{\\hbar/2m\\omega}$ 与 $\\alpha$、$t$ 都无关；中心 $\\langle x\\rangle$ 按 $\\cos(\\omega t-\\phi)$ 振荡。',
      [
        T(320, 24, '中心按经典余弦走，宽度不动', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 56, '⟨x⟩(t) = A cos(ωt − φ)', { size: 11.5, tone: 'text' }),
        AXIS({ x: 80, y: 84, w: 440, h: 120 }, { xLabel: 'ωt', yLabel: 'x' }),
        L(80, 104, 520, 104, { tone: 'faint', dash: true }),
        L(80, 184, 520, 184, { tone: 'faint', dash: true }),
        CURVE((x) => Math.cos(x), { x: 80, y: 84, w: 440, h: 120 }, [0, 12.566], [-1.5, 1.5], {
          tone: 'mint',
          weight: 2,
          steps: 200
        }),
        CURVE((x) => Math.cos(x) + 0.18, { x: 80, y: 84, w: 440, h: 120 }, [0, 12.566], [-1.5, 1.5], {
          tone: 'mint',
          dash: true,
          opacity: 0.5,
          steps: 200
        }),
        CURVE((x) => Math.cos(x) - 0.18, { x: 80, y: 84, w: 440, h: 120 }, [0, 12.566], [-1.5, 1.5], {
          tone: 'mint',
          dash: true,
          opacity: 0.5,
          steps: 200
        }),
        T(72, 102, 'A', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(72, 186, '−A', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(300, 72, '两条虚线：中心 ±Δx', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(80, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 224, '2π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(520, 224, '4π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 250, '包络宽度恒定，中心照经典轨迹走', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, 'Δx = √(ħ/2mω)，不随时间增长', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '6.4/1-2',
      '一个周期，相位转一整圈',
      '$T=2\\pi/\\omega$：相位每积累 $2\\pi$，时间前进一个周期；量子“钟”就是这台相位计数器。',
      [
        T(320, 24, '一个周期，相位转一整圈', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(64, 152, 264, 152, { tone: 'dim' }),
        A(256, 152, 272, 152, { tone: 'dim' }),
        L(164, 234, 164, 70, { tone: 'dim' }),
        A(164, 82, 164, 68, { tone: 'dim' }),
        C(164, 152, 66, { tone: 'violet', dash: true }),
        DOT(230, 152, { r: 3.2, tone: 'amber' }),
        A(150, 84, 182, 84, { tone: 'amber', weight: 1.2 }),
        T(166, 72, '2π', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(164, 244, '相位转满一圈 = 一个周期', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(290, 60, 'x(t) = A cos(ωt − φ)', { size: 10.5, tone: 'text' }),
        AXIS({ x: 300, y: 84, w: 280, h: 116 }, { xLabel: 't' }),
        CURVE((x) => Math.cos(x), { x: 300, y: 84, w: 280, h: 116 }, [0, 12.566], [-1.3, 1.3], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        L(440, 84, 440, 200, { tone: 'faint', dash: true }),
        T(440, 72, 'T = 2π/ω', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(300, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(440, 218, 'T', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(580, 218, '2T', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(320, 248, '周期只由 ω 决定，与振幅无关', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '相位每转一圈，时间前进一个 T', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.4/2-0',
      '两条长寿命能级，一把激光尺',
      '原子在两条长寿命能级间跃迁，频率 $\\nu_0=\\Delta E/h$ 由能级差定死；把激光锁定上去，就得到时间刻度。',
      [
        T(320, 24, '两条长寿命能级，一把激光尺', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...LEVEL(90, 360, 210, '基态', { tone: 'dim', size: 10 }),
        ...LEVEL(90, 360, 90, '激发态', { tone: 'cyan', size: 10 }),
        T(368, 106, '长寿命', { size: 9.5, tone: 'violet' }),
        A(230, 204, 230, 96, { tone: 'amber', weight: 1.4 }),
        T(240, 150, 'ν₀', { size: 10.5, tone: 'amber' }),
        T(240, 170, '激光', { size: 9.5, tone: 'amber' }),
        P('M 300 118 C 316 108 332 128 348 118', { tone: 'amber', weight: 1.3 }),
        T(324, 142, '锁定', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(430, 86, 'ΔE：两能级之差', { size: 10, tone: 'cyan' }),
        T(430, 112, 'ν₀ = ΔE/h：跃迁频率', { size: 10, tone: 'amber' }),
        T(430, 138, '长寿命 ⇒ 谱线窄', { size: 10, tone: 'violet' }),
        T(430, 164, '频率由能级差定死', { size: 10, tone: 'muted' }),
        T(430, 190, '与外界扰动无关', { size: 10, tone: 'faint' }),
        T(320, 244, '原子是振子，激光是读数器', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '跃迁频率稳定，时间刻度才稳定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.4/2-1',
      'Q = ν₀/Δν：谱线越窄越准',
      '品质因数 $Q=\\nu_0/\\Delta\\nu$ 把“频率高”和“谱线窄”合成一个数；$Q$ 越大，相位积累越久、分辨越细。',
      [
        T(320, 24, 'Q = ν₀/Δν：谱线越窄越准', { size: 12.5, tone: 'text', anchor: 'middle' }),
        AXIS({ x: 80, y: 86, w: 380, h: 116 }, { xLabel: 'ν', yLabel: '强度' }),
        CURVE((x) => Math.exp(-(((x - 0.6) / 0.13) ** 2)), { x: 80, y: 86, w: 380, h: 116 }, [0, 1], [0, 1.05], {
          tone: 'amber',
          dash: true,
          weight: 1.7
        }),
        CURVE((x) => Math.exp(-(((x - 0.6) / 0.032) ** 2)), { x: 80, y: 86, w: 380, h: 116 }, [0, 1], [0, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        L(80, 147, 460, 147, { tone: 'faint', dash: true }),
        T(210, 138, 'Δν 宽', { size: 9.5, tone: 'amber' }),
        T(330, 138, 'Δν 窄', { size: 9.5, tone: 'mint' }),
        T(308, 82, 'ν₀', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 92, 'Q = ν₀ / Δν', { size: 11, tone: 'text' }),
        T(400, 118, 'Q 无量纲，越大越好', { size: 10, tone: 'mint' }),
        T(400, 144, 'ν₀ 高、Δν 小 ⇒ Q 大', { size: 10, tone: 'amber' }),
        T(400, 170, '相位可积累更久', { size: 10, tone: 'violet' }),
        T(400, 196, 'δν/ν₀ ~ 1/(Q√N)', { size: 10, tone: 'cyan' }),
        T(320, 246, '谱线窄，才分得清相邻频率', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, 'N 个原子再给 1/√N 的统计改善', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '6.4/2-2',
      'Q 到 10¹⁵：宇宙年龄误差不足 1 秒',
      '现代光钟 $Q\\sim10^{14}$–$10^{15}$、相对不确定度 $10^{-18}$：即使运行宇宙年龄，累积误差也只有约 0.4 秒。',
      [
        T(320, 24, 'Q 到 10¹⁵：宇宙年龄误差不足 1 秒', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 180, 170, '品质因数', { tone: 'cyan' }),
        T(124, 116, '10¹⁴–10¹⁵', { size: 13, tone: 'cyan', anchor: 'middle' }),
        T(124, 146, 'Q = ν₀/Δν', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(124, 176, 'Sr、Yb、Al⁺', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(230, 50, 180, 170, '相对不确定度', { tone: 'violet' }),
        T(320, 116, '10⁻¹⁸', { size: 13, tone: 'violet', anchor: 'middle' }),
        T(320, 146, 'δν / ν₀', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 176, '已进入 10⁻¹⁸ 量级', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(426, 50, 180, 170, '宇宙年龄累积', { tone: 'amber' }),
        T(516, 116, '≈ 0.4 s', { size: 13, tone: 'amber', anchor: 'middle' }),
        T(516, 146, '4.3×10¹⁷ s', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(516, 176, '误差不到一秒', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 244, '品质因数把频率精度变成时间精度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '光钟不是走得更快，而是谱线更窄', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '6.4/0-0-f',
      '|α⟩：泊松叠加，湮灭算符的本征态',
      '$|\\alpha\\rangle=e^{-|\\alpha|^2/2}\\sum\\alpha^n/\\sqrt{n!}\\,|n\\rangle$：$|\\alpha|^2$ 是平均量子数，$\\alpha$ 是复数，本征值可任取。',
      [
        T(320, 24, '|α⟩：泊松叠加，湮灭算符的本征态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 56, '|α⟩ = e^(−|α|²/2) Σ (α^n/√n!) |n⟩', { size: 11, tone: 'text' }),
        T(52, 78, 'â|α⟩ = α|α⟩', { size: 11.5, tone: 'mint' }),
        L(70, 160, 270, 160, { tone: 'dim' }),
        A(262, 160, 278, 160, { tone: 'dim' }),
        L(170, 236, 170, 96, { tone: 'dim' }),
        A(170, 108, 170, 94, { tone: 'dim' }),
        T(266, 176, 'Re α', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(180, 92, 'Im α', { size: 9.5, tone: 'dim' }),
        A(170, 160, 232, 120, { tone: 'amber', weight: 1.4 }),
        L(232, 120, 232, 160, { tone: 'faint', dash: true }),
        L(170, 120, 232, 120, { tone: 'faint', dash: true }),
        T(204, 122, '|α|', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(190, 232, '模定振幅，辐角定相位', { size: 9.5, tone: 'muted' }),
        T(300, 98, 'e^(−|α|²/2)：归一化因子', { size: 10, tone: 'mint' }),
        T(300, 122, 'α^n/√n!：第 n 项系数', { size: 10, tone: 'cyan' }),
        T(300, 146, '|α|²：平均量子数', { size: 10, tone: 'amber' }),
        T(300, 170, 'α = 0：回到基态 |0⟩', { size: 10, tone: 'muted' }),
        T(300, 194, '本征值 α 可任意复数', { size: 10, tone: 'violet' }),
        T(300, 218, '不是能量本征态', { size: 9.5, tone: 'danger' }),
        T(320, 256, '权重是泊松分布：⟨n⟩ = |α|²', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '本征方程只给数，不改态的形状', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.4/0-1-f',
      '⟨E⟩ = ħω(|α|²+½)：两项各司其职',
      '$|\\alpha|^2\\hbar\\omega$ 是经典振动能，$\\hbar\\omega/2$ 是零点能；$\\alpha=0$ 时只剩后者，$\\alpha$ 大时前者主导。',
      [
        T(320, 24, '⟨E⟩ = ħω(|α|²+½)：两项各司其职', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 56, '⟨E⟩ = ħω(|α|² + ½)', { size: 12, tone: 'text' }),
        T(52, 78, '以 ħω 为单位：|α|² + ½', { size: 10.5, tone: 'mint' }),
        AXIS({ x: 70, y: 92, w: 300, h: 116 }, { xLabel: '|α|²', yLabel: '⟨E⟩/ħω' }),
        CURVE((x) => x + 0.5, { x: 70, y: 92, w: 300, h: 116 }, [0, 4], [0, 5], { tone: 'mint', weight: 2 }),
        DOT(70, 196.4, { r: 3, tone: 'amber' }),
        DOT(370, 103.6, { r: 3, tone: 'amber' }),
        T(64, 196, '½', { size: 9.5, tone: 'amber', anchor: 'end' }),
        T(378, 104, '4.5', { size: 9.5, tone: 'amber' }),
        T(70, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(145, 224, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(220, 224, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(295, 224, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 224, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 96, '|α|²ħω：经典振动', { size: 10, tone: 'amber' }),
        T(400, 122, '½ħω：零点能', { size: 10, tone: 'violet' }),
        T(400, 148, 'α = 0：⟨E⟩ = ½ħω', { size: 10, tone: 'cyan' }),
        T(400, 174, 'α 大：零点项可忽略', { size: 10, tone: 'muted' }),
        T(400, 200, '能量连续可调', { size: 10, tone: 'faint' }),
        T(400, 222, '不是一条能级', { size: 9.5, tone: 'danger' }),
        T(320, 252, '斜率 ħω：每多一个量子，多一格能量', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '截距 ½ħω：真空也不是零能量', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '6.4/1-0-f',
      'Δx 恒定，中心按余弦振荡',
      '$\\Delta x=\\sqrt{\\hbar/2m\\omega}$ 只依赖 $m$、$\\omega$；振幅 $A=\\sqrt{2\\hbar/m\\omega}\\,|\\alpha|$ 随 $\\alpha$ 增大，宽度不变。',
      [
        T(320, 24, 'Δx 恒定，中心按余弦振荡', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 56, 'Δx = √(ħ/2mω)', { size: 12, tone: 'text' }),
        T(52, 78, '⟨x⟩(t) = √(2ħ/mω)·|α| cos(ωt−φ)', { size: 11, tone: 'mint' }),
        AXIS({ x: 70, y: 92, w: 260, h: 106 }, { xLabel: '|α|', yLabel: 'Δx' }),
        CURVE(() => 0.5, { x: 70, y: 92, w: 260, h: 106 }, [0, 4], [0, 1.4], { tone: 'mint', weight: 2 }),
        T(200, 130, '宽度与 |α| 无关', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(70, 212, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(200, 212, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 212, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(360, 96, 'Δx：由 m、ω 定死', { size: 10, tone: 'mint' }),
        T(360, 120, '|α| 只改振幅 A', { size: 10, tone: 'amber' }),
        T(360, 144, 'φ：初始相位', { size: 10, tone: 'cyan' }),
        T(360, 168, 'α = 0：宽度仍在', { size: 10, tone: 'muted' }),
        T(360, 192, '中心不动，只剩零点涨落', { size: 9.5, tone: 'faint' }),
        T(360, 216, 'mω 大 ⇒ 波包更窄', { size: 10, tone: 'violet' }),
        T(320, 248, '宽度不随时间变，是本征方程的结论', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, 'mω → ∞：Δx → 0，趋于经典质点', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.4/1-1-f',
      'T = 2π/ω：周期只认频率',
      '$T=2\\pi/\\omega$ 与振幅 $A$ 无关；$\\omega=\\sqrt{k/m}$，弹簧越硬周期越短，$\\omega\\to0$ 时周期发散。',
      [
        T(320, 24, 'T = 2π/ω：周期只认频率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 56, 'T = 2π / ω', { size: 12.5, tone: 'text' }),
        T(52, 78, 'ω = √(k/m)', { size: 10.5, tone: 'mint' }),
        AXIS({ x: 70, y: 94, w: 260, h: 108 }, { xLabel: 'ω', yLabel: 'T' }),
        CURVE((x) => 6.283 / x, { x: 70, y: 94, w: 260, h: 108 }, [0.6, 4], [0, 12], { tone: 'mint', weight: 2, steps: 140 }),
        DOT(177, 92 + (12 - 3.14) / 12 * 108, { r: 3, tone: 'amber' }),
        T(177, 220, 'ω = 2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 220, '0.6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 220, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(360, 96, 'T：一个完整周期', { size: 10, tone: 'mint' }),
        T(360, 120, '与振幅 A 无关', { size: 10, tone: 'cyan' }),
        T(360, 144, 'ω → 0：T → ∞', { size: 10, tone: 'violet' }),
        T(360, 168, 'ω → ∞：T → 0', { size: 10, tone: 'amber' }),
        T(360, 192, '频率 ν = 1/T', { size: 10, tone: 'muted' }),
        T(360, 216, '一周期相位走 2π', { size: 9.5, tone: 'faint' }),
        T(320, 248, '等时性：摆幅变了，周期不变', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '量子相干态的周期与经典振子相同', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.4/2-0-f',
      'Q = ν₀/Δν：窄线才有高 Q',
      '$Q$ 无量纲：$\\Delta\\nu$ 是半高全宽，$\\nu_0$ 是中心频率；线越窄、频率越高，$Q$ 越大，$\\delta\\nu/\\nu_0$ 越小。',
      [
        T(320, 24, 'Q = ν₀/Δν：窄线才有高 Q', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 56, 'Q = ν₀ / Δν', { size: 12.5, tone: 'text' }),
        T(52, 78, 'δν/ν₀ ~ 1/(Q√N)', { size: 11, tone: 'mint' }),
        AXIS({ x: 80, y: 100, w: 320, h: 104 }, { xLabel: 'ν', yLabel: '强度' }),
        CURVE((x) => Math.exp(-(((x - 0.55) / 0.08) ** 2)), { x: 80, y: 100, w: 320, h: 104 }, [0, 1], [0, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        L(80, 154, 400, 154, { tone: 'faint', dash: true }),
        L(235, 154, 235, 100, { tone: 'amber', dash: true }),
        L(277, 154, 277, 100, { tone: 'amber', dash: true }),
        A(235, 154, 277, 154, { tone: 'amber', weight: 1.3 }),
        T(256, 168, 'Δν', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(256, 92, 'ν₀', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(410, 104, 'ν₀：中心频率', { size: 10, tone: 'muted' }),
        T(410, 128, 'Δν：半高全宽', { size: 10, tone: 'amber' }),
        T(410, 152, 'Q 无量纲，越大越好', { size: 10, tone: 'mint' }),
        T(410, 176, 'N：参与原子数', { size: 10, tone: 'violet' }),
        T(410, 200, '1/√N：统计改善', { size: 10, tone: 'cyan' }),
        T(410, 224, 'Q 大 + N 多 ⇒ 更稳', { size: 9.5, tone: 'faint' }),
        T(320, 250, 'Q 是“频率 ÷ 线宽”，不是频率本身', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '线宽越窄，相邻频率越分得开', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.4/2-1-f',
      'δt = (δν/ν₀)·t：误差随时间长出来',
      '相对频率误差乘以累积时间得到绝对误差：$10^{-18}\\times4.3\\times10^{17}\\,\\mathrm s\\approx0.4\\,\\mathrm s$，低于一秒。',
      [
        T(320, 24, 'δt = (δν/ν₀)·t：误差随时间长出来', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(52, 58, 'δt = (δν/ν₀) × t', { size: 12, tone: 'text' }),
        T(52, 80, '10⁻¹⁸ × 4.3×10¹⁷ s ≈ 0.4 s', { size: 10.5, tone: 'mint' }),
        T(52, 108, 'δν/ν₀：相对频率误差', { size: 10, tone: 'muted' }),
        T(52, 132, 't：累积运行时间', { size: 10, tone: 'muted' }),
        T(52, 156, '相乘得绝对时间误差', { size: 10, tone: 'mint' }),
        T(52, 180, '10⁻¹⁸ 是当前光钟水平', { size: 10, tone: 'violet' }),
        L(60, 212, 580, 212, { tone: 'dim' }),
        A(572, 212, 592, 212, { tone: 'dim' }),
        R(80, 202, 460, 18, { tone: 'amber', opacity: 0.24, r: 3 }),
        L(80, 202, 80, 218, { tone: 'dim' }),
        L(540, 202, 540, 218, { tone: 'dim' }),
        T(80, 232, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(540, 232, '4.3×10¹⁷ s', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(80, 250, '误差 0.4 s：放大后才看得见', { size: 10, tone: 'amber' }),
        T(320, 274, '宇宙年龄量级的运行，累积误差不到一秒', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
