import { fig, flat, T, R, BAND, L, A, DOT, AXIS, CURVE, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '1.5/overview',
    '从一条关系走到一个方程',
    '德布罗意把 $\\lambda=h/p$ 从光子推广到所有粒子，电子衍射与双缝实验给出证据，薛定谔再把物质波写成演化方程。',
    [
      T(320, 24, '物质波：一条关系串起三个环节', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 180, 176, '① 德布罗意', { tone: 'mint' }),
      CURVE((x) => Math.sin(x / 9), { x: 52, y: 84, w: 144, h: 32 }, [0, 144], [-1, 1], { tone: 'mint' }),
      A(56, 136, 192, 136, { tone: 'amber', weight: 1.4 }),
      T(124, 126, 'p', { size: 10, tone: 'amber', anchor: 'middle' }),
      T(124, 162, 'λ = h/p', { size: 11, tone: 'mint', anchor: 'middle', mono: true }),
      T(124, 188, '波与粒子同体', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      ...PANEL(230, 44, 180, 176, '② 衍射证据', { tone: 'cyan' }),
      A(238, 62, 258, 74, { tone: 'amber', weight: 1 }),
      R(260, 76, 10, 24, { tone: 'cyan', fill: true, opacity: 0.4, r: 2 }),
      R(260, 108, 10, 24, { tone: 'cyan', fill: true, opacity: 0.4, r: 2 }),
      ...[0, 1, 2, 3, 4, 5].flatMap((i) => [
        BAND(320, 66 + i * 22, 72, 12, { tone: i % 2 ? 'cyan' : 'faint', opacity: i % 2 ? 0.45 : 0.2 })
      ]),
      T(356, 58, '双缝', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
      T(277, 190, '单电子也干涉', { size: 9.5, tone: 'faint', anchor: 'middle' }),
      T(356, 200, '亮暗相间', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      ...PANEL(426, 44, 180, 176, '③ 薛定谔方程', { tone: 'violet' }),
      CURVE((x) => Math.sin(x / 8), { x: 442, y: 84, w: 150, h: 30 }, [0, 150], [-1, 1], { tone: 'violet' }),
      CURVE((x) => Math.cos(x / 8), { x: 442, y: 84, w: 150, h: 30 }, [0, 150], [-1, 1], { tone: 'cyan', dash: true }),
      T(518, 126, 'ψ 是复数', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      CURVE((x) => Math.sin(x / 8) ** 2, { x: 442, y: 152, w: 150, h: 30 }, [0, 150], [0, 1], { tone: 'mint' }),
      T(448, 146, '|ψ|²', { size: 9.5, tone: 'mint' }),
      T(516, 196, '概率密度', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(320, 240, '德布罗意关系 → 衍射证据 → 薛定谔方程', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 266, '量子化从光的特权变成普遍规则', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '1.5/0-0',
      '光子有两副面孔，物质也应如此',
      '光子既以 $E=h\\nu$ 表现能量，又以 $p=h/\\lambda$ 携带动量；德布罗意把这对关系原样搬到有质量的粒子上，波长由动量决定。',
      [
        T(320, 24, '把光的两副面孔借给所有粒子', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 268, 176, '光子', { tone: 'amber' }),
        CURVE((x) => Math.sin(x / 7), { x: 54, y: 82, w: 228, h: 38 }, [0, 228], [-1, 1], { tone: 'amber' }),
        A(60, 140, 268, 140, { tone: 'mint', weight: 1.5 }),
        DOT(160, 140, { r: 3.5, tone: 'mint' }),
        T(168, 130, 'p', { size: 10, tone: 'mint' }),
        T(164, 166, 'E = hν，p = h/λ', { size: 10, tone: 'amber', anchor: 'middle', mono: true }),
        T(164, 194, '波动性与粒子性同体', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(330, 44, 276, 176, '物质粒子', { tone: 'mint' }),
        DOT(360, 96, { r: 5, tone: 'violet' }),
        T(360, 80, 'm', { size: 10, tone: 'violet', anchor: 'middle' }),
        A(372, 96, 474, 96, { tone: 'violet', weight: 1.4 }),
        T(420, 86, 'v', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 8), { x: 352, y: 128, w: 238, h: 34 }, [0, 238], [-1, 1], { tone: 'mint' }),
        T(470, 180, 'λ = h/p = h/mv', { size: 11, tone: 'mint', anchor: 'middle', mono: true }),
        T(470, 202, '波长由动量唯一决定', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(302, 118, 326, 118, { tone: 'faint', weight: 1.4 }),
        T(320, 246, '假设：波粒二象不是光独有', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '德布罗意只是换了一个对象', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '1.5/0-1',
      '加速电压把电子波长压到埃量级',
      '电子经电压 $U$ 加速后动量约 $\\sqrt{2m_eU}$，代入 $\\lambda=h/p$ 得 $\\lambda\\approx1.23\\,\\mathrm{nm}/\\sqrt{U/\\mathrm{kV}}$，正好与原子的间距相当。',
      [
        T(320, 24, '电压越高，电子波长越短', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 236, 168, '加速间隙', { tone: 'cyan' }),
        DOT(52, 96, { r: 3, tone: 'mint' }),
        A(56, 96, 98, 96, { tone: 'mint', weight: 1.2 }),
        L(104, 64, 104, 132, { tone: 'amber', weight: 1.8 }),
        L(134, 64, 134, 132, { tone: 'amber', weight: 1.8 }),
        A(106, 96, 132, 96, { tone: 'amber', weight: 1, dash: true }),
        A(140, 96, 246, 96, { tone: 'cyan', weight: 1.5 }),
        T(119, 56, 'U', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(150, 84, 'e⁻', { size: 9.5, tone: 'mint' }),
        T(150, 144, '电场加速', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(150, 170, 'p = √(2m_eU)', { size: 10, tone: 'cyan', anchor: 'middle', mono: true }),
        T(150, 194, 'λ 落在埃量级', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        ...AXIS({ x: 310, y: 70, w: 262, h: 126 }, { xLabel: 'U/kV', yLabel: 'λ/nm' }),
        CURVE((x) => 1.23 / Math.sqrt(x), { x: 310, y: 70, w: 262, h: 126 }, [0.25, 10], [0, 3], {
          tone: 'mint',
          steps: 140
        }),
        DOT(310, 93, { r: 2.5, tone: 'amber' }),
        DOT(362, 161, { r: 2.5, tone: 'cyan' }),
        T(330, 86, 'U 小：λ 大', { size: 9.5, tone: 'amber' }),
        T(452, 158, 'U 大：λ 小', { size: 9.5, tone: 'cyan' }),
        T(430, 214, 'λ ∝ 1/√U', { size: 10, tone: 'mint', anchor: 'middle', mono: true }),
        T(320, 244, '1 kV → 1.23 nm，100 V → 3.9 nm', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '与晶格常数同量级：可以衍射', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '1.5/0-2',
      '从光的特权到普遍规则',
      '普朗克与爱因斯坦的量子化条件原本只属于光；德布罗意把它写成所有运动粒子的通行规则，质量越大波长越短，波动性越难显现。',
      [
        T(320, 24, '同一条规则，轻重物体都适用', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 572, 150, 'λ = h/mv：质量越大，波长越短', { tone: 'mint' }),
        T(56, 86, '电子', { size: 9.5, tone: 'mint' }),
        DOT(470, 82, { r: 3, tone: 'mint' }),
        T(482, 86, '10⁻¹⁰ m', { size: 9.5, tone: 'mint' }),
        T(56, 112, '热中子', { size: 9.5, tone: 'cyan' }),
        DOT(428, 108, { r: 3, tone: 'cyan' }),
        T(440, 112, '0.18 nm', { size: 9.5, tone: 'cyan' }),
        T(56, 138, 'C₆₀ 分子', { size: 9.5, tone: 'violet' }),
        DOT(306, 134, { r: 3, tone: 'violet' }),
        T(318, 138, '10⁻¹² m', { size: 9.5, tone: 'violet' }),
        T(56, 164, '尘埃 1 μm', { size: 9.5, tone: 'muted' }),
        DOT(120, 160, { r: 3, tone: 'muted' }),
        T(132, 164, '10⁻²² m', { size: 9.5, tone: 'muted' }),
        L(400, 58, 400, 170, { tone: 'amber', dash: true }),
        T(404, 62, '原子尺度 0.1 nm', { size: 9.5, tone: 'amber' }),
        L(72, 186, 584, 186, { tone: 'dim' }),
        A(576, 186, 596, 186, { tone: 'dim' }),
        T(74, 202, '波长更长', { size: 9.5, tone: 'faint' }),
        T(588, 202, 'λ', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(320, 226, '质量越大，波长越短', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '一切运动粒子都携带一列波', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '1.5/1-0',
      '戴维孙—革末：晶体把电子散射成峰',
      '低速电子轰击镍单晶，散射强度在特定角度出现峰值；峰位符合布拉格条件 $2d\\sin\\theta=n\\lambda$，说明电子像波一样被晶格散射。',
      [
        T(320, 24, '镍单晶把电子散射成一组峰', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 268, 168, '镍单晶', { tone: 'cyan' }),
        ...Array.from({ length: 4 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => DOT(72 + i * 30, 88 + j * 26, { r: 1.8, tone: 'faint' }))
        ).flat(),
        A(48, 198, 108, 148, { tone: 'mint', weight: 1.4 }),
        A(118, 140, 240, 112, { tone: 'amber', weight: 1.3 }),
        A(118, 140, 240, 150, { tone: 'amber', weight: 1, dash: true }),
        T(196, 130, 'θ', { size: 10, tone: 'amber' }),
        T(52, 210, '电子束', { size: 9.5, tone: 'mint' }),
        T(214, 92, '散射束', { size: 9.5, tone: 'amber' }),
        T(86, 60, 'd 为晶面间距', { size: 9.5, tone: 'faint' }),
        ...AXIS({ x: 318, y: 70, w: 276, h: 126 }, { xLabel: 'θ', yLabel: 'I' }),
        CURVE(
          (x) => 0.1 + 0.85 / (1 + ((x - 45) / 7) ** 2) + 0.55 / (1 + ((x - 95) / 7) ** 2) + 0.32 / (1 + ((x - 145) / 7) ** 2),
          { x: 318, y: 70, w: 276, h: 126 },
          [0, 170],
          [0, 1.05],
          { tone: 'mint', steps: 220 }
        ),
        T(391, 78, 'n = 1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(472, 108, 'n = 2', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(553, 138, 'n = 3', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 232, '峰位满足 2d sinθ = nλ', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '加速电压改变波长，峰位随之移动', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '1.5/1-1',
      '单电子成点，多电子成条纹',
      '电子一个一个通过双缝时，每次只在屏上留下一个点；累积足够多以后，点的分布自动显出干涉条纹，关掉一条缝条纹便消失。',
      [
        T(320, 24, '一个一个来，条纹自己长出来', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 268, 180, '单个电子', { tone: 'muted' }),
        DOT(46, 96, { r: 3, tone: 'mint' }),
        A(52, 96, 92, 96, { tone: 'mint', weight: 1.2 }),
        L(100, 62, 100, 80, { tone: 'amber', weight: 1.8 }),
        L(100, 92, 100, 104, { tone: 'amber', weight: 1.8 }),
        L(100, 116, 100, 150, { tone: 'amber', weight: 1.8 }),
        A(104, 86, 238, 78, { tone: 'cyan', weight: 1, dash: true }),
        A(104, 110, 238, 118, { tone: 'cyan', weight: 1, dash: true }),
        L(244, 60, 244, 162, { tone: 'dim' }),
        DOT(246, 84, { r: 2, tone: 'mint' }),
        DOT(247, 112, { r: 2, tone: 'mint' }),
        DOT(246, 132, { r: 2, tone: 'mint' }),
        T(104, 166, '双缝', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(250, 166, '屏', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(170, 196, '三个点：看不出条纹', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(330, 46, 276, 180, '大量电子累积', { tone: 'mint' }),
        ...Array.from({ length: 26 }, (_, i) =>
          DOT(368 + 100 * Math.abs(Math.sin(i * 2.3)), 70 + ((i * 37) % 128), { r: 1.6, tone: 'mint' })
        ),
        ...[0, 1, 2, 3, 4, 5, 6, 7].flatMap((i) => [
          BAND(496, 62 + i * 20, 100, 12, { tone: i % 2 ? 'mint' : 'faint', opacity: i % 2 ? 0.42 : 0.16 })
        ]),
        T(548, 216, '明暗相间', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 246, '关掉一条缝，条纹立刻消失', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(320, 270, '干涉来自单个粒子自身的概率幅', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '1.5/1-2',
      '分子也干涉，重物却几乎不',
      '大分子穿过光栅同样出现干涉条纹；质量越大、动量越大，波长越短，当波长远小于物体尺度时，波动性被彻底平均掉。',
      [
        T(320, 24, '越重越难看到波动性', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 268, 168, 'C₆₀ 分子干涉', { tone: 'violet' }),
        DOT(58, 112, { r: 6, tone: 'violet' }),
        T(58, 92, 'C₆₀', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        A(70, 112, 146, 112, { tone: 'violet', weight: 1.4 }),
        R(152, 76, 6, 18, { tone: 'amber', fill: true, opacity: 0.35 }),
        R(152, 103, 6, 18, { tone: 'amber', fill: true, opacity: 0.35 }),
        R(152, 130, 6, 18, { tone: 'amber', fill: true, opacity: 0.35 }),
        A(160, 85, 236, 78, { tone: 'cyan', weight: 1, dash: true }),
        A(160, 112, 236, 112, { tone: 'cyan', weight: 1, dash: true }),
        A(160, 139, 236, 148, { tone: 'cyan', weight: 1, dash: true }),
        ...[0, 1, 2, 3, 4, 5].flatMap((i) => [
          BAND(250, 66 + i * 24, 44, 12, { tone: i % 2 ? 'violet' : 'faint', opacity: i % 2 ? 0.4 : 0.16 })
        ]),
        T(272, 200, '条纹仍在', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        ...PANEL(320, 46, 280, 168, '波长随质量下降', { tone: 'mint' }),
        ...AXIS({ x: 344, y: 74, w: 238, h: 116 }, { xLabel: 'm', yLabel: 'λ' }),
        CURVE((x) => 1.1 / (x + 0.22), { x: 344, y: 74, w: 238, h: 116 }, [0, 1], [0, 1.2], {
          tone: 'mint',
          steps: 120
        }),
        T(356, 88, '电子：λ 大', { size: 9.5, tone: 'mint' }),
        T(452, 164, '宏观物体：λ 极小', { size: 9.5, tone: 'muted' }),
        T(320, 238, '干涉是概率幅自身的叠加', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '质量越大，波动性越难显现', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '1.5/2-0',
      '波函数是复数，模平方才是概率',
      '薛定谔引入的 $\\psi(x,t)$ 一般是复数，本身没有直接物理意义；模平方 $|\\psi|^2$ 给出在 $x$ 处发现粒子的概率密度。',
      [
        T(320, 24, 'ψ 是复数，|ψ|² 才可测量', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 46, 268, 170, '波函数 ψ(x,t)', { tone: 'violet' }),
        ...AXIS({ x: 56, y: 76, w: 226, h: 112 }, { xLabel: 'x', yLabel: 'ψ' }),
        CURVE((x) => Math.sin(x), { x: 56, y: 76, w: 226, h: 112 }, [0, 6.28], [-1, 1], {
          tone: 'violet',
          steps: 120
        }),
        CURVE((x) => Math.cos(x), { x: 56, y: 76, w: 226, h: 112 }, [0, 6.28], [-1, 1], {
          tone: 'cyan',
          dash: true,
          steps: 120
        }),
        T(70, 66, '实部', { size: 9.5, tone: 'violet' }),
        T(120, 66, '虚部', { size: 9.5, tone: 'cyan' }),
        T(168, 200, '复数：不可直接测量', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(320, 46, 280, 170, '概率密度 |ψ|²', { tone: 'mint' }),
        ...AXIS({ x: 340, y: 76, w: 240, h: 112 }, { xLabel: 'x', yLabel: '|ψ|²' }),
        CURVE((x) => Math.sin(x) ** 2, { x: 340, y: 76, w: 240, h: 112 }, [0, 6.28], [0, 1], {
          tone: 'mint',
          steps: 120
        }),
        T(470, 196, '峰值处最可能找到粒子', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 238, '模平方给出概率密度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '相位不可测，但相对相位决定干涉', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '1.5/2-1',
      '线性方程保证叠加原理',
      '波函数满足线性偏微分方程，时间演化由哈密顿量生成；两个允许的态相加仍是允许的态，这正是干涉能够发生的原因。',
      [
        T(320, 24, '两个解相加，仍是解', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 160, 132, 'ψ₁', { tone: 'mint' }),
        CURVE((x) => Math.sin(x), { x: 46, y: 84, w: 136, h: 68 }, [0, 12.56], [-1, 1], {
          tone: 'mint',
          steps: 120
        }),
        ...PANEL(216, 50, 160, 132, 'ψ₂', { tone: 'cyan' }),
        CURVE((x) => 0.75 * Math.sin(1.3 * x), { x: 228, y: 84, w: 136, h: 68 }, [0, 12.56], [-1, 1], {
          tone: 'cyan',
          steps: 120
        }),
        A(198, 116, 212, 116, { tone: 'faint' }),
        A(380, 116, 394, 116, { tone: 'faint' }),
        ...PANEL(398, 50, 210, 132, 'ψ₁ + ψ₂', { tone: 'violet' }),
        CURVE((x) => Math.sin(x) + 0.75 * Math.sin(1.3 * x), { x: 410, y: 84, w: 186, h: 68 }, [0, 12.56], [-2, 2], {
          tone: 'violet',
          steps: 180
        }),
        T(504, 200, '相加后出现拍', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 224, '线性结构把叠加原理写进方程', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 250, '允许态之和仍是允许态', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(320, 274, '这就是干涉的代数来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '1.5/2-2',
      '方程地位相当于牛顿第二定律',
      '给定势场后，薛定谔方程决定波函数如何随时间演化；解出 $\\psi$ 之后，能量、动量与测量概率都由它读出。',
      [
        T(320, 24, '量子力学的运动方程', { size: 12.5, tone: 'text', anchor: 'middle' }),
        R(38, 74, 114, 64, { tone: 'amber', fill: true, opacity: 0.16, r: 8 }),
        T(95, 100, '给定势场 V(x)', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(95, 120, '加边界条件', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(156, 106, 174, 106, { tone: 'faint' }),
        R(178, 74, 114, 64, { tone: 'violet', fill: true, opacity: 0.16, r: 8 }),
        T(235, 100, '薛定谔方程', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(235, 120, '线性演化', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(296, 106, 314, 106, { tone: 'faint' }),
        R(318, 74, 114, 64, { tone: 'mint', fill: true, opacity: 0.16, r: 8 }),
        T(375, 100, '波函数 ψ', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(375, 120, '一般取复数', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(436, 106, 454, 106, { tone: 'faint' }),
        R(458, 74, 144, 64, { tone: 'cyan', fill: true, opacity: 0.16, r: 8 }),
        T(530, 100, 'E、p、概率', { size: 10, tone: 'cyan', anchor: 'middle' }),
        T(530, 120, '测量结果', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 9), { x: 60, y: 162, w: 240, h: 34 }, [0, 240], [-1, 1], { tone: 'mint' }),
        T(180, 208, '先解出 ψ', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 9) ** 2, { x: 348, y: 162, w: 240, h: 34 }, [0, 240], [0, 1], { tone: 'cyan' }),
        T(468, 208, '再读出概率', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 240, '地位等同于牛顿第二定律', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '下一步：解出各种势场中的 ψ', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
  },
  formulas: {
    '0-0': fig(
      '1.5/0-0-f',
      'λ = h/p 与 ν = E/h：同一枚常数',
      '$\\lambda=h/p$ 说动量越大波长越短，$\\nu=E/h$ 说能量与频率成正比；两式共用普朗克常数，是波粒二象的换算表。',
      [
        T(320, 24, '波长随动量反比下降', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 270, 150, 'λ 与 p', { tone: 'mint' }),
        ...AXIS({ x: 56, y: 78, w: 230, h: 104 }, { xLabel: 'p', yLabel: 'λ' }),
        CURVE((x) => 0.6 / x, { x: 56, y: 78, w: 230, h: 104 }, [0.28, 1], [0, 2.2], {
          tone: 'mint',
          steps: 140
        }),
        DOT(94, 111, { r: 3, tone: 'amber' }),
        DOT(286, 154, { r: 3, tone: 'cyan' }),
        T(100, 102, 'p 小 ⇒ λ 长', { size: 9.5, tone: 'amber' }),
        T(196, 172, 'p 大 ⇒ λ 短', { size: 9.5, tone: 'cyan' }),
        ...PANEL(320, 50, 280, 150, 'E 与 ν', { tone: 'amber' }),
        ...AXIS({ x: 344, y: 78, w: 238, h: 104 }, { xLabel: 'ν', yLabel: 'E' }),
        L(344, 182, 570, 100, { tone: 'amber', weight: 1.8 }),
        L(470, 132, 470, 182, { tone: 'dim', dash: true }),
        T(478, 128, '斜率 = h', { size: 9.5, tone: 'amber' }),
        T(430, 196, 'h = 6.63×10⁻³⁴ J·s', { size: 9.5, tone: 'muted', anchor: 'middle', mono: true }),
        T(320, 228, 'p → ∞：λ → 0，波动性消失', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 254, 'h → 0：两式都退回经典', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '1.5/0-1-f',
      '电子波长随电压按 1/√U 下降',
      '$\\lambda_e=h/\\sqrt{2m_eeU}=1.23\\,\\mathrm{nm}/\\sqrt{U/\\mathrm{kV}}$；电压变四倍，波长只减半，这是平方根压低的缘故。',
      [
        T(320, 24, '电压翻四倍，波长才减半', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 156, 'λ 随 U 下降', { tone: 'mint' }),
        ...AXIS({ x: 56, y: 80, w: 260, h: 110 }, { xLabel: 'U/kV', yLabel: 'λ/nm' }),
        CURVE((x) => 1.23 / Math.sqrt(x), { x: 56, y: 80, w: 260, h: 110 }, [0.1, 10], [0, 4], {
          tone: 'mint',
          steps: 180
        }),
        DOT(56, 83, { r: 2.5, tone: 'amber' }),
        DOT(80, 156, { r: 2.5, tone: 'cyan' }),
        DOT(316, 179, { r: 2.5, tone: 'violet' }),
        T(64, 74, '100 V：3.9 nm', { size: 9.5, tone: 'amber' }),
        T(170, 146, '1 kV：1.23 nm', { size: 9.5, tone: 'cyan' }),
        T(240, 196, '10 kV：0.39 nm', { size: 9.5, tone: 'violet' }),
        ...PANEL(352, 50, 248, 156, 'U → 4U', { tone: 'amber' }),
        BAND(370, 92, 200, 18, { tone: 'mint', opacity: 0.3, r: 4 }),
        T(374, 86, 'U：1.23 nm', { size: 9.5, tone: 'mint' }),
        BAND(370, 140, 100, 18, { tone: 'amber', opacity: 0.35, r: 4 }),
        T(374, 134, '4U：0.62 nm', { size: 9.5, tone: 'amber' }),
        T(486, 154, '长度减半', { size: 9.5, tone: 'muted' }),
        T(376, 190, 'λ ∝ U^(−1/2)', { size: 10, tone: 'muted', mono: true }),
        T(320, 232, 'U → 0：λ 发散，U → ∞：λ → 0', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '高压电子显微镜因此分辨更高', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '1.5/1-0-f',
      '布拉格条件：光程差等于整数个波长',
      '两条相邻晶面反射的波，光程差为 $2d\\sin\\theta$；它等于 $n\\lambda$ 时相长，扫描角度就得到一组离散的峰。',
      [
        T(320, 24, '光程差 2d sinθ 决定峰位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 330, 164, '相邻晶面', { tone: 'cyan' }),
        L(56, 110, 340, 110, { tone: 'cyan', weight: 1.4 }),
        L(56, 170, 340, 170, { tone: 'cyan', weight: 1.4 }),
        A(120, 60, 180, 110, { tone: 'mint', weight: 1.3 }),
        A(180, 110, 240, 60, { tone: 'mint', weight: 1.1 }),
        A(180, 120, 240, 170, { tone: 'violet', weight: 1.3 }),
        A(240, 170, 300, 120, { tone: 'violet', weight: 1.1 }),
        L(120, 110, 120, 170, { tone: 'dim', dash: true }),
        T(126, 144, 'd', { size: 10, tone: 'dim' }),
        T(196, 102, 'θ', { size: 10, tone: 'amber' }),
        L(184, 124, 236, 168, { tone: 'amber', weight: 3, opacity: 0.7 }),
        T(256, 190, '多走 2d sinθ', { size: 9.5, tone: 'amber' }),
        ...PANEL(374, 50, 226, 164, '峰位离散', { tone: 'mint' }),
        ...AXIS({ x: 392, y: 78, w: 192, h: 106 }, { xLabel: 'n', yLabel: 'sinθ' }),
        L(392, 184, 540, 92, { tone: 'mint', weight: 1.6 }),
        DOT(434, 156, { r: 3, tone: 'mint' }),
        DOT(478, 124, { r: 3, tone: 'mint' }),
        DOT(520, 94, { r: 3, tone: 'mint' }),
        T(470, 76, 'sinθ = nλ/2d', { size: 9.5, tone: 'muted', anchor: 'middle', mono: true }),
        T(320, 230, 'n 越大，衍射角越大', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, 'sinθ ≤ 1 限制可用的级次', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '1.5/1-1-f',
      'λ = h/mv：质量在分母上',
      '$\\lambda=h/p=h/mv$；速度越小、质量越小，波长越长。对宏观物体，$m$ 巨大使 $\\lambda$ 小到 10⁻³⁶ m，波动性完全无法观测。',
      [
        T(320, 24, '同一条公式，量级相差几十阶', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 160, 'λ 与 v', { tone: 'mint' }),
        ...AXIS({ x: 56, y: 82, w: 260, h: 112 }, { xLabel: 'v', yLabel: 'λ' }),
        CURVE((x) => 0.45 / (x + 0.15), { x: 56, y: 82, w: 260, h: 112 }, [0, 1], [0, 3], {
          tone: 'mint',
          steps: 140
        }),
        CURVE((x) => 0.12 / (x + 0.15), { x: 56, y: 82, w: 260, h: 112 }, [0, 1], [0, 3], {
          tone: 'violet',
          dash: true,
          steps: 140
        }),
        T(78, 96, '电子', { size: 9.5, tone: 'mint' }),
        T(180, 172, '宏观物体', { size: 9.5, tone: 'violet' }),
        ...PANEL(344, 50, 256, 160, '两个量级', { tone: 'cyan' }),
        T(360, 88, '电子 v ~ 10⁶ m/s', { size: 9.5, tone: 'mint' }),
        T(360, 112, 'λ ≈ 0.7 nm', { size: 10, tone: 'mint', mono: true }),
        T(360, 146, '人 70 kg，v = 1 m/s', { size: 9.5, tone: 'violet' }),
        T(360, 170, 'λ ≈ 10⁻³⁶ m', { size: 10, tone: 'violet', mono: true }),
        T(360, 196, '远小于任何可测尺度', { size: 9.5, tone: 'muted' }),
        T(320, 226, 'm 在分母：质量压抑波动性', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '波长必须与障碍尺度相当才可见', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '1.5/2-0-f',
      '方程三项：时间演化、动能、势能',
      '$i\\hbar\\partial_t\\psi=-\\frac{\\hbar^2}{2m}\\nabla^2\\psi+V\\psi$：左边给出时间演化，右边第一项是动能，第二项是势能；$V$ 越大曲率越大，波长越短。',
      [
        T(320, 24, '把方程拆成三件东西', { size: 12.5, tone: 'text', anchor: 'middle' }),
        R(34, 52, 300, 54, { tone: 'violet', fill: true, opacity: 0.16, r: 8 }),
        T(184, 86, 'iħ ∂ψ/∂t', { size: 12, tone: 'violet', anchor: 'middle', mono: true }),
        T(346, 76, '时间演化项', { size: 10.5, tone: 'violet' }),
        T(346, 96, '等于总能量乘 ψ', { size: 9.5, tone: 'muted' }),
        R(34, 116, 300, 54, { tone: 'mint', fill: true, opacity: 0.16, r: 8 }),
        T(184, 150, '−(ħ²/2m) ∇²ψ', { size: 12, tone: 'mint', anchor: 'middle', mono: true }),
        T(346, 140, '动能项', { size: 10.5, tone: 'mint' }),
        T(346, 160, '曲率越大，动能越高', { size: 9.5, tone: 'muted' }),
        R(34, 180, 300, 54, { tone: 'amber', fill: true, opacity: 0.16, r: 8 }),
        T(184, 214, 'V(r) ψ', { size: 12, tone: 'amber', anchor: 'middle', mono: true }),
        T(346, 204, '势能项', { size: 10.5, tone: 'amber' }),
        T(346, 224, '只与位置有关', { size: 9.5, tone: 'muted' }),
        A(320, 232, 320, 236, { tone: 'faint' }),
        T(320, 258, 'V 大 ⇒ 曲率大 ⇒ 波长短', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 278, 'ħ → 0 时退回经典轨迹', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '1.5/2-1-f',
      '归一化：把总概率钉在一',
      '$\\int|\\psi|^2d^3r=1$；概率密度在全空间积分必须为一，未归一化的解只差一个常数因子，除以 $\\sqrt{N}$ 即可。',
      [
        T(320, 24, '总概率必须为一', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 160, '归一化之后', { tone: 'mint' }),
        ...AXIS({ x: 56, y: 82, w: 260, h: 112 }, { xLabel: 'x', yLabel: '|ψ|²' }),
        CURVE((x) => Math.sin(x) ** 2, { x: 56, y: 82, w: 260, h: 112 }, [0, 6.28], [0, 1.1], {
          tone: 'mint',
          steps: 140
        }),
        L(56, 182, 316, 182, { tone: 'amber', weight: 1.4 }),
        T(186, 196, '曲线下总面积 = 1', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        ...PANEL(344, 50, 256, 160, '未归一化', { tone: 'violet' }),
        CURVE((x) => 1.7 * Math.sin(x) ** 2, { x: 362, y: 74, w: 220, h: 52 }, [0, 6.28], [0, 1.8], {
          tone: 'violet',
          steps: 140
        }),
        T(362, 68, '面积 = 1.7', { size: 9.5, tone: 'violet' }),
        A(472, 132, 472, 150, { tone: 'faint', weight: 1.2 }),
        CURVE((x) => Math.sin(x) ** 2, { x: 362, y: 154, w: 220, h: 44 }, [0, 6.28], [0, 1.1], {
          tone: 'mint',
          steps: 140
        }),
        T(362, 148, '面积 = 1', { size: 9.5, tone: 'mint' }),
        T(482, 176, '除以 √1.7', { size: 9.5, tone: 'muted' }),
        T(320, 230, '整体常数不改变物理', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '归一化只是选定那个常数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
