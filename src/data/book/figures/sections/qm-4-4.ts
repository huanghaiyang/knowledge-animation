import { fig, T, R, BAND, L, A, C, DOT, TAG, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const V_HIGH = (x: number) => 0.12 + 0.85 * Math.exp(-((x / 0.46) ** 2)) + 0.65 * (Math.abs(x) / 1.5) ** 8

const set: SectionFigureSet = {
  overview: fig(
    '4.4/overview',
    '高垒双阱：近简并，振荡极慢',
    '势垒升高后两阱几乎独立，偶奇态近简并；局域波包以 $\\Delta E/\\hbar$ 的频率在两阱间往返，垒越强振荡越慢，垒无穷时冻结。',
    [
      T(320, 24, '高垒双阱：近简并，振荡极慢', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 176, 196, '近简并', { tone: 'mint' }),
      L(54, 104, 54, 196, { tone: 'amber', weight: 2 }),
      L(54, 196, 112, 196, { tone: 'amber', weight: 2 }),
      L(112, 196, 112, 104, { tone: 'amber', weight: 2 }),
      L(112, 104, 128, 104, { tone: 'amber', weight: 2 }),
      L(128, 104, 128, 196, { tone: 'amber', weight: 2 }),
      L(128, 196, 186, 196, { tone: 'amber', weight: 2 }),
      L(186, 196, 186, 104, { tone: 'amber', weight: 2 }),
      ...LEVEL(64, 176, 150, '', { tone: 'mint' }),
      ...LEVEL(64, 176, 143, '', { tone: 'violet', dash: true }),
      T(120, 216, 'ΔE 很小', { size: 10, tone: 'amber', anchor: 'middle' }),
      T(326, 64, '布居振荡', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      ...AXIS({ x: 240, y: 78, w: 172, h: 112 }, { xLabel: 't', yLabel: 'P' }),
      CURVE((t) => 0.5 + 0.5 * Math.cos((2 * Math.PI * t) / 86), { x: 240, y: 78, w: 172, h: 112 }, [0, 172], [0, 1.05], {
        tone: 'mint',
        weight: 2
      }),
      T(240, 204, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
      T(283, 204, 'T/2', { size: 9.5, tone: 'dim', anchor: 'middle' }),
      T(326, 204, 'T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
      T(522, 64, '分裂收缩', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      ...AXIS({ x: 452, y: 78, w: 140, h: 112 }, { yLabel: 'ΔE' }),
      CURVE((x) => Math.exp(-x / 45), { x: 452, y: 78, w: 140, h: 112 }, [0, 140], [0, 1.05], {
        tone: 'violet',
        weight: 2
      }),
      T(596, 206, 'V_b', { size: 9.5, tone: 'dim', anchor: 'end' }),
      T(566, 140, '→ 0', { size: 9.5, tone: 'violet', anchor: 'end' }),
      T(320, 250, '高垒：两条能级贴近，布居缓慢来回', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 270, '垒趋无穷：ΔE → 0，振荡冻结', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '4.4/0-0',
      '经典两个等价位置，量子解除简并',
      '经典双阱有两个等能的最低位置；量子力学中两阱通过隧穿耦合，简并被解除，形成略低的偶态与略高的奇态。',
      [
        T(320, 24, '经典两个等价位置，量子解除简并', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 278, 188, '经典：两个等价位置', { tone: 'muted' }),
        L(60, 196, 60, 124, { tone: 'dim', weight: 1.6 }),
        L(60, 196, 120, 196, { tone: 'dim', weight: 1.6 }),
        L(120, 196, 120, 110, { tone: 'dim', weight: 1.6 }),
        L(120, 110, 152, 110, { tone: 'dim', weight: 1.6 }),
        L(152, 110, 152, 196, { tone: 'dim', weight: 1.6 }),
        L(152, 196, 212, 196, { tone: 'dim', weight: 1.6 }),
        L(212, 196, 212, 124, { tone: 'dim', weight: 1.6 }),
        DOT(90, 184, { r: 4, tone: 'violet' }),
        DOT(182, 184, { r: 4, tone: 'violet' }),
        L(60, 184, 212, 184, { tone: 'dim', dash: true }),
        T(218, 188, 'E', { size: 9.5, tone: 'dim' }),
        T(136, 216, '同一能量，可任选一侧', { size: 10, tone: 'muted', anchor: 'middle' }),
        ...PANEL(328, 44, 278, 188, '量子：隧穿解除简并', { tone: 'mint' }),
        L(354, 196, 354, 124, { tone: 'mint', weight: 1.6 }),
        L(354, 196, 414, 196, { tone: 'mint', weight: 1.6 }),
        L(414, 196, 414, 110, { tone: 'mint', weight: 1.6 }),
        L(414, 110, 446, 110, { tone: 'mint', weight: 1.6 }),
        L(446, 110, 446, 196, { tone: 'mint', weight: 1.6 }),
        L(446, 196, 506, 196, { tone: 'mint', weight: 1.6 }),
        L(506, 196, 506, 124, { tone: 'mint', weight: 1.6 }),
        ...LEVEL(366, 496, 158, '', { tone: 'mint' }),
        ...LEVEL(366, 496, 146, '', { tone: 'violet' }),
        T(424, 216, '偶态低，奇态高', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(320, 252, '经典没有分裂，量子分裂来自耦合', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '两条能级几乎贴在一起', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.4/0-1',
      '分裂由垒下衰减积分控制',
      '分裂 $\\Delta E=E_o-E_e$ 正比于隧穿振幅，由 WKB 作用量 $S=\\int\\sqrt{2m(V-E)}\\,dx$ 控制；垒越高或越宽，分裂指数减小。',
      [
        T(320, 24, '分裂由垒下衰减积分控制', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(231, 110, 166, 98, { tone: 'amber', opacity: 0.14 }),
        CURVE(V_HIGH, { x: 64, y: 92, w: 500, h: 116 }, [-1.5, 1.5], [0, 1.15], { tone: 'amber', weight: 2 }),
        CURVE((x) => Math.exp(-x / 50), { x: 231, y: 120, w: 166, h: 60 }, [0, 166], [0, 1], { tone: 'cyan', weight: 2 }),
        T(314, 150, 'S', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(320, 192, 'exp(−κa)', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(64, 228, 'S = ∫√(2m(V−E)) dx', { size: 10, tone: 'mint', mono: true }),
        T(64, 250, '垒越高、越宽，S 越大', { size: 10, tone: 'muted' }),
        T(408, 228, '分裂随 S 指数下降', { size: 10, tone: 'violet' }),
        T(408, 250, '垒宽加一层，分裂降一档', { size: 10, tone: 'muted' }),
        T(320, 276, '分裂虽小，却是动力学的全部来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '4.4/0-2',
      '能级贴在一起，时间上却决定一切',
      '分裂很小，在能级图上只是两条几乎重合的线；但时间演化完全由它驱动：半个周期后粒子出现在另一侧。',
      [
        T(320, 24, '能级图上贴在一起，时间上决定一切', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 190, 180, '能级：几乎重合', { tone: 'violet' }),
        ...LEVEL(54, 180, 150, '', { tone: 'mint' }),
        ...LEVEL(54, 180, 144, '', { tone: 'violet' }),
        T(46, 194, 'e 与 o 相差极小', { size: 10, tone: 'muted' }),
        T(46, 213, '能级图上难分辨', { size: 10, tone: 'faint' }),
        T(294, 104, 't = 0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        BAND(250, 116, 36, 52, { tone: 'mint', opacity: 0.3 }),
        R(250, 116, 36, 52, { tone: 'dim', dash: true }),
        R(302, 116, 36, 52, { tone: 'dim', dash: true }),
        T(268, 190, '左', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(416, 104, 't = T/2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        R(372, 116, 36, 52, { tone: 'dim', dash: true }),
        BAND(424, 116, 36, 52, { tone: 'mint', opacity: 0.3 }),
        R(424, 116, 36, 52, { tone: 'dim', dash: true }),
        T(442, 190, '右', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(538, 104, 't = T', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        BAND(494, 116, 36, 52, { tone: 'mint', opacity: 0.3 }),
        R(494, 116, 36, 52, { tone: 'dim', dash: true }),
        R(546, 116, 36, 52, { tone: 'dim', dash: true }),
        T(512, 190, '左', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 236, '同一初态，三个时刻的布居', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, 't = T/2 完全转到右阱', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, 't = T 又回到左阱', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.4/1-0',
      '两个本征态相位不同步',
      '左阱局域态 $|L\\rangle=(|e\\rangle+|o\\rangle)/\\sqrt{2}$：两个分量以不同相位因子演化，相位差随 $t$ 线性增长，相对符号周期性翻转。',
      [
        T(320, 24, '两个本征态相位不同步 ⇒ 符号翻转', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE((x) => Math.cos(x / 14), { x: 70, y: 64, w: 500, h: 78 }, [0, 220], [-1.1, 1.1], { tone: 'mint', weight: 2 }),
        CURVE((x) => Math.cos(x / 14 - 0.031 * x), { x: 70, y: 64, w: 500, h: 78 }, [0, 220], [-1.1, 1.1], {
          tone: 'violet',
          dash: true
        }),
        T(70, 56, '两个本征态，频率略不同', { size: 9.5, tone: 'muted' }),
        T(320, 160, '相位差 = ΔE·t/ħ', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        L(70, 200, 550, 200, { tone: 'dim' }),
        A(542, 200, 562, 200, { tone: 'dim' }),
        T(552, 216, 't', { size: 9.5, tone: 'dim' }),
        DOT(70, 200, { r: 3, tone: 'amber' }),
        DOT(300, 200, { r: 3, tone: 'amber' }),
        DOT(530, 200, { r: 3, tone: 'amber' }),
        T(70, 190, '同相', { size: 9.5, tone: 'mint' }),
        T(300, 190, '反相', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(530, 190, '同相', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(320, 240, '同相 → 左阱；反相 → 右阱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, '翻转来自相位差，不是能量转移', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '相位差每增 π 翻一次', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.4/1-1',
      '左阱布居：cos² 的半周期换阱',
      '概率密度在两阱间转移：$P_L(t)=\\cos^2(\\Delta E\\,t/2\\hbar)$。经过半个周期粒子完全到右阱，整个周期后完整回到左阱。',
      [
        T(320, 24, '左阱布居：半周期换阱，整周期回位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 64, w: 480, h: 130 }, { xLabel: 't', yLabel: 'P' }),
        CURVE((x) => 0.5 + 0.5 * Math.cos((2 * Math.PI * x) / 160), { x: 70, y: 64, w: 480, h: 130 }, [0, 330], [0, 1.05], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => 0.5 - 0.5 * Math.cos((2 * Math.PI * x) / 160), { x: 70, y: 64, w: 480, h: 130 }, [0, 330], [0, 1.05], {
          tone: 'violet',
          dash: true
        }),
        T(62, 68, '1', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(62, 198, '0', { size: 9.5, tone: 'dim', anchor: 'end' }),
        DOT(186, 194, { r: 3, tone: 'amber' }),
        DOT(303, 64, { r: 3, tone: 'amber' }),
        DOT(419, 194, { r: 3, tone: 'amber' }),
        T(70, 208, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(186, 208, 'T/2', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(303, 208, 'T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(419, 208, '3T/2', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(536, 208, '2T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(186, 224, '全在右阱', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(303, 86, '回到左阱', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 242, 'P_L = cos²(ΔE t / 2ħ)', { size: 10.5, tone: 'mint', anchor: 'middle', mono: true }),
        T(320, 262, '半周期换阱，整周期回位', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '虚线：右阱布居 1 − P_L', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '4.4/1-2',
      '不是翻越势垒，而是相位在调度',
      '粒子并没有获得翻越势垒的能量：两个本征态的相对相位决定叠加符号，于是概率在左阱与右阱之间周期性转移。',
      [
        T(320, 24, '不是翻越势垒，而是相位在调度', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 270, 148, '势垒不参与', { tone: 'cyan' }),
        L(70, 176, 70, 110, { tone: 'dim', weight: 1.6 }),
        L(70, 176, 130, 176, { tone: 'dim', weight: 1.6 }),
        L(130, 176, 130, 120, { tone: 'dim', weight: 1.6 }),
        L(130, 120, 166, 120, { tone: 'dim', weight: 1.6 }),
        L(166, 120, 166, 176, { tone: 'dim', weight: 1.6 }),
        L(166, 176, 226, 176, { tone: 'dim', weight: 1.6 }),
        L(226, 176, 226, 110, { tone: 'dim', weight: 1.6 }),
        A(120, 96, 180, 96, { tone: 'faint', dash: true }),
        L(142, 88, 158, 104, { tone: 'danger', weight: 1.6 }),
        L(142, 104, 158, 88, { tone: 'danger', weight: 1.6 }),
        T(170, 186, '没有额外能量', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(318, 44, 288, 148, '相对相位在调度', { tone: 'violet' }),
        C(390, 120, 30, { tone: 'mint' }),
        A(390, 120, 412, 102, { tone: 'mint' }),
        C(500, 120, 30, { tone: 'violet' }),
        A(500, 120, 478, 138, { tone: 'violet' }),
        T(390, 170, 'e 的相角', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(500, 170, 'o 的相角', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        TAG(40, 210, '氨反转：24 GHz', { tone: 'cyan', size: 10 }),
        TAG(240, 210, '超导量子比特', { tone: 'violet', size: 10 }),
        TAG(430, 210, '超冷原子双阱', { tone: 'mint', size: 10 }),
        T(320, 240, '同一套两能级语言', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '机制是相对相位，不是撞墙', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.4/2-0',
      '垒越高，分裂越小、振荡越慢',
      '提高势垒，$\\kappa=\\sqrt{2m(V_b-E)}/\\hbar$ 增大，隧穿振幅按 $e^{-\\kappa a}$ 下降，分裂指数减小，振荡周期被拉长。',
      [
        T(320, 24, '垒越高：分裂越小，周期越长', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE((x) => Math.exp(-x / 70), { x: 70, y: 74, w: 210, h: 112 }, [0, 210], [0, 1.05], { tone: 'mint', weight: 2 }),
        CURVE((x) => Math.exp(-x / 28), { x: 70, y: 74, w: 210, h: 112 }, [0, 210], [0, 1.05], {
          tone: 'violet',
          dash: true
        }),
        T(70, 68, '垒内衰减', { size: 9.5, tone: 'muted' }),
        T(292, 100, 'κ 小：慢', { size: 9.5, tone: 'mint' }),
        T(292, 124, 'κ 大：快', { size: 9.5, tone: 'violet' }),
        ...AXIS({ x: 380, y: 74, w: 212, h: 112 }, { yLabel: 'T' }),
        CURVE((x) => Math.exp(x / 45), { x: 380, y: 74, w: 212, h: 112 }, [0, 160], [0, 40], { tone: 'amber', weight: 2 }),
        T(392, 106, '周期指数拉长', { size: 10, tone: 'amber' }),
        T(586, 202, 'V_b', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(380, 202, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(470, 202, '中', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(560, 202, '高', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 230, 'κ = √(2m(V_b − E)) / ħ', { size: 10.5, tone: 'mint', anchor: 'middle', mono: true }),
        T(320, 252, '振幅按 exp(−κa) 下降', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '分裂与周期随之改变', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.4/2-1',
      '势垒无穷：两阱独立，振荡冻结',
      '当势垒趋于无穷，$\\Delta E\\to0$，两阱成为严格简并、彼此独立的子系统；振荡停止，粒子留在被制备的阱中。',
      [
        T(320, 24, '势垒无穷：两阱独立，振荡冻结', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE((x) => 0.5 + 0.5 * Math.cos((2 * Math.PI * x) / 90), { x: 70, y: 80, w: 210, h: 100 }, [0, 210], [0, 1.05], {
          tone: 'mint',
          weight: 2
        }),
        T(70, 72, '有限垒：振荡', { size: 9.5, tone: 'mint' }),
        CURVE(() => 1, { x: 370, y: 80, w: 210, h: 100 }, [0, 210], [0, 1.2], { tone: 'violet', weight: 2 }),
        T(370, 72, '垒无穷：冻结', { size: 9.5, tone: 'violet' }),
        A(288, 130, 356, 130, { tone: 'amber' }),
        T(322, 118, 'V_b → ∞', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 206, 'ΔE → 0：周期趋于无穷', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 228, '两阱严格简并、彼此独立', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 250, '粒子留在被制备的阱中', { size: 10, tone: 'faint', anchor: 'middle' }),
        TAG(70, 276, '独立双阱极限', { tone: 'violet', size: 10 })
      ]
    ),
    '2-2': fig(
      '4.4/2-2',
      '真实体系：退相干让振荡衰减',
      '真实体系介于两个极限之间：环境噪声与退相干压低有效分裂，振荡幅度随时间衰减；器件设计需在可操控与保相干之间折中。',
      [
        T(320, 24, '真实体系：退相干让振荡衰减', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 70, w: 480, h: 120 }, { xLabel: 't', yLabel: 'P' }),
        L(70, 133, 550, 133, { tone: 'dim', dash: true }),
        T(556, 137, '0.5', { size: 9.5, tone: 'dim' }),
        CURVE(
          (x) => 0.5 + 0.5 * Math.cos((2 * Math.PI * x) / 90) * Math.exp(-x / 260),
          { x: 70, y: 70, w: 480, h: 120 },
          [0, 480],
          [0, 1.05],
          { tone: 'amber', weight: 2 }
        ),
        T(70, 204, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(420, 100, '包络指数收缩', { size: 10, tone: 'amber' }),
        T(420, 122, '退相干压低有效分裂', { size: 10, tone: 'muted' }),
        T(320, 222, '环境噪声让振荡衰减', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 242, '长时趋于 0.5：完全混合', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '器件：可操控与保相干折中', { size: 10, tone: 'faint', anchor: 'middle' }),
        TAG(70, 278, '振幅趋零，振荡消失', { tone: 'amber', size: 9.5 })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '4.4/0-0-f',
      '分裂 = 奇减偶 ≈ 2|t|',
      '$\\Delta E=E_o-E_e\\approx2|t|$：奇态在上、偶态在下，差值为正；隧穿耦合越大，分裂越宽。',
      [
        T(320, 24, '分裂 = 奇态减偶态 ≈ 2|t|', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...LEVEL(70, 250, 184, 'E_e', { tone: 'mint' }),
        ...LEVEL(70, 250, 116, 'E_o', { tone: 'violet' }),
        L(70, 150, 250, 150, { tone: 'dim', dash: true }),
        T(62, 154, 'E₀', { size: 10, tone: 'dim', anchor: 'end' }),
        A(290, 184, 290, 116, { tone: 'amber' }),
        T(298, 146, 'ΔE', { size: 10, tone: 'amber' }),
        T(298, 166, '= 2|t|', { size: 10, tone: 'amber' }),
        T(360, 80, '每侧各移 |t|', { size: 10, tone: 'muted' }),
        L(360, 150, 560, 150, { tone: 'dim', dash: true }),
        L(360, 116, 560, 116, { tone: 'violet', dash: true }),
        L(360, 184, 560, 184, { tone: 'mint', dash: true }),
        T(566, 154, 'E₀', { size: 9.5, tone: 'dim' }),
        A(400, 150, 400, 116, { tone: 'violet' }),
        T(408, 128, '+|t|', { size: 9.5, tone: 'violet' }),
        A(400, 150, 400, 184, { tone: 'mint' }),
        T(408, 176, '−|t|', { size: 9.5, tone: 'mint' }),
        T(360, 214, '间距 = 2|t|', { size: 10, tone: 'amber' }),
        T(320, 244, 't → 0：ΔE → 0，回到简并', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '低垒时 |t| 大，分裂显著', { size: 10, tone: 'faint', anchor: 'middle' }),
        TAG(70, 278, '奇减偶，差为正', { tone: 'mint', size: 10 })
      ]
    ),
    '0-1': fig(
      '4.4/0-1-f',
      '指数因子：ħω₀ 乘 e 的负 S/ħ',
      '$\\Delta E\\propto\\hbar\\omega_0 e^{-S/\\hbar}$：$\\hbar\\omega_0$ 是尝试频率，$S$ 是垒下作用量；$S\\gg\\hbar$ 时分裂指数趋于零。',
      [
        T(320, 24, '指数因子决定分裂大小', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 50, 110, 24, { tone: 'amber', opacity: 0.24, r: 5 }),
        T(115, 66, 'ħω₀', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(178, 66, '×', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(196, 50, 150, 24, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(271, 66, 'exp(−S/ħ)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(360, 64, 'S 为垒下作用量', { size: 9.5, tone: 'muted' }),
        ...AXIS({ x: 70, y: 96, w: 230, h: 110 }, { xLabel: 'S/ħ', yLabel: 'ΔE' }),
        CURVE((x) => Math.exp(-x), { x: 70, y: 96, w: 230, h: 110 }, [0, 4], [0, 1.05], { tone: 'mint', weight: 2 }),
        T(70, 222, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(185, 222, '2', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(300, 222, '4', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(350, 112, 'S = ∫√(2m(V−E)) dx', { size: 10, tone: 'mint', mono: true }),
        T(350, 136, '方垒：S/ħ = κa', { size: 10, tone: 'muted' }),
        T(350, 160, 'S ≫ ħ ⇒ ΔE → 0', { size: 10, tone: 'violet' }),
        T(350, 184, '垒越高，S 越大', { size: 10, tone: 'muted' }),
        T(320, 248, '指数因子把分裂压到极小', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '这就是“近简并”的来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.4/1-0-f',
      'cos² 展开：常值一半加余弦',
      '$P_L=\\cos^2(\\Delta E\\,t/2\\hbar)=\\frac{1}{2}[1+\\cos(\\Delta E\\,t/\\hbar)]$：平均值 $1/2$，振荡项周期由 $\\Delta E/\\hbar$ 给出。',
      [
        T(320, 24, 'cos² 展开：常值一半 + 一个余弦', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 50, 160, 24, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(140, 66, 'cos²(ΔE t/2ħ)', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(230, 66, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(246, 50, 180, 24, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(336, 66, '[1 + cos(ΔE t/ħ)]/2', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 92, w: 470, h: 120 }, { xLabel: 't', yLabel: 'P' }),
        CURVE((x) => 0.5 + 0.5 * Math.cos((2 * Math.PI * x) / 160), { x: 70, y: 92, w: 470, h: 120 }, [0, 320], [0, 1.05], {
          tone: 'mint',
          weight: 2
        }),
        L(70, 155, 540, 155, { tone: 'dim', dash: true }),
        T(76, 149, '1/2', { size: 9.5, tone: 'dim' }),
        T(70, 84, 'P = 1', { size: 9.5, tone: 'mint' }),
        T(305, 84, 'P = 1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        DOT(187, 210, { r: 3, tone: 'violet' }),
        DOT(422, 210, { r: 3, tone: 'violet' }),
        T(70, 226, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(187, 226, 'T/2', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(305, 226, 'T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(422, 226, '3T/2', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(540, 226, '2T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 246, '取值范围 0 ≤ P_L ≤ 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, 'ΔE → 0：cos² → 1，不再转移', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.4/1-1-f',
      '周期与频率都由分裂锁定',
      '$T=2\\pi\\hbar/\\Delta E$，$\\nu=\\Delta E/h$：分裂越小周期越长；$\\Delta E\\to0$ 时周期发散，振荡彻底停止。',
      [
        T(320, 24, '周期与频率都由分裂锁定', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 64, w: 250, h: 140 }, { xLabel: 'ΔE', yLabel: 'T' }),
        CURVE((x) => 0.8 / x, { x: 70, y: 64, w: 250, h: 140 }, [0.1, 1], [0, 8], { tone: 'mint', weight: 2 }),
        T(70, 220, '0.1', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(181, 220, '0.5', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 220, '1', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(62, 68, '8', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(62, 208, '0', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(370, 92, 'ΔE = 1.0×10⁻⁴ eV', { size: 10, tone: 'mint' }),
        T(370, 118, 'ν ≈ 24 GHz', { size: 10.5, tone: 'cyan' }),
        T(370, 144, 'T ≈ 4.1×10⁻¹¹ s', { size: 10.5, tone: 'cyan' }),
        T(370, 170, '落在微波波段', { size: 10, tone: 'muted' }),
        T(370, 196, 'ΔE → 0：T → ∞', { size: 10, tone: 'violet' }),
        T(370, 222, '周期由分裂锁定', { size: 10, tone: 'faint' }),
        T(320, 246, '分裂越小，振荡越慢', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 'ν = ΔE / h', { size: 10.5, tone: 'mint', anchor: 'middle', mono: true })
      ]
    ),
    '2-0': fig(
      '4.4/2-0-f',
      '矩形势垒：分裂随 κa 指数衰减',
      '$\\Delta E\\propto e^{-\\kappa a}$，$\\kappa=\\sqrt{2m(V_b-E)}/\\hbar$：$\\kappa a$ 无量纲，势垒越高、越宽，分裂越小。',
      [
        T(320, 24, '矩形势垒：分裂随 κa 指数衰减', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(80, 92, 190, 88, { tone: 'amber', opacity: 0.14 }),
        CURVE((x) => Math.exp(-x / 55), { x: 82, y: 100, w: 186, h: 72 }, [0, 186], [0, 1], { tone: 'cyan', weight: 2 }),
        T(80, 86, '矩形势垒', { size: 9.5, tone: 'amber' }),
        T(266, 110, 'exp(−κx)', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        A(80, 196, 270, 196, { tone: 'amber' }),
        T(175, 212, 'a', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        ...AXIS({ x: 370, y: 80, w: 210, h: 120 }, { xLabel: 'a', yLabel: 'ln ΔE' }),
        CURVE((x) => 1 - x / 210, { x: 370, y: 80, w: 210, h: 120 }, [0, 210], [0, 1.1], { tone: 'violet', weight: 2 }),
        T(400, 116, '斜率 = −κ', { size: 10, tone: 'violet' }),
        T(370, 214, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(580, 214, '大', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 230, 'V_b ↑ 或 a ↑ ⇒ ΔE 指数减小', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 250, 'κ = √(2m(V_b − E)) / ħ', { size: 10, tone: 'mint', anchor: 'middle', mono: true }),
        TAG(80, 276, 'a → 0：垒消失，分裂大', { tone: 'cyan', size: 9.5 })
      ]
    ),
    '2-1': fig(
      '4.4/2-1-f',
      '垒趋于无穷：ω 降到零',
      '$\\omega=\\Delta E/\\hbar$ 随 $V_b$ 单调下降；$V_b\\to\\infty$ 时 $\\Delta E\\to0$、$\\omega\\to0$，布居不再变化。',
      [
        T(320, 24, '垒趋于无穷：ω 降到零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 70, w: 300, h: 130 }, { xLabel: 'V_b', yLabel: 'ω' }),
        CURVE((x) => Math.exp(-x / 70), { x: 70, y: 70, w: 300, h: 130 }, [0, 240], [0, 1.05], { tone: 'amber', weight: 2 }),
        T(70, 216, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(190, 216, '120', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(310, 216, '240', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(316, 96, 'ω → 0', { size: 10, tone: 'amber', anchor: 'end' }),
        ...PANEL(400, 70, 192, 126, '隧穿关闭', { tone: 'mint' }),
        CURVE(() => 1, { x: 412, y: 104, w: 168, h: 60 }, [0, 168], [0, 1.3], { tone: 'mint', weight: 2 }),
        T(496, 102, 'P_L ≡ 1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(496, 150, '布居不再变化', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 224, 'V_b → ∞：ΔE → 0，ω → 0', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 244, '两阱独立：振荡冻结', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '粒子留在原阱', { size: 10, tone: 'faint', anchor: 'middle' }),
        TAG(70, 278, '独立双阱极限', { tone: 'violet', size: 10 })
      ]
    )
  }
}
export default set
