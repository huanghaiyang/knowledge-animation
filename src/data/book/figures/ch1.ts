import { fig, flat, T, R, BAND, L, A, C, DOT, E, P, TAG, AXIS, CURVE, PANEL } from './kit'
import type { SectionFigureSet } from './types'

const box = { x: 58, y: 42, w: 520, h: 210 }

export const ch1Figures: Record<string, SectionFigureSet> = {
  'qm-1-1': {
    overview: fig(
      '1.1/overview',
      '经典物理的四根支柱与三处裂痕',
      '力学、热统、光学与电磁学各自完备；黑体辐射、光电效应与原子光谱正好落在它们的接缝上。',
      [
        T(320, 24, '四根支柱撑起的确定性世界', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(22, 40, 134, 168, '力学', { tone: 'mint' }),
        ...PANEL(176, 40, 134, 168, '热统', { tone: 'violet' }),
        ...PANEL(330, 40, 134, 168, '光学', { tone: 'cyan' }),
        ...PANEL(484, 40, 134, 168, '电磁', { tone: 'amber' }),
        // 力学：确定轨道
        DOT(89, 118, { r: 6, tone: 'amber' }),
        E(89, 118, 42, 24, { tone: 'mint', dash: true }),
        DOT(127, 130, { tone: 'mint', r: 3 }),
        A(127, 130, 118, 144, { tone: 'mint' }),
        T(89, 158, '轨道唯一', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        // 热统：熵增
        ...Array.from({ length: 5 }, (_, i) =>
          R(232 + i * 12, 176 - (i + 1) * 14, 9, (i + 1) * 14, { tone: 'violet', fill: true, opacity: 0.4, r: 2 })
        ),
        A(226, 164, 292, 120, { tone: 'violet' }),
        T(272, 112, 'S ↑', { size: 10, tone: 'violet' }),
        // 光学：双缝条纹
        L(352, 76, 352, 164, { tone: 'cyan' }),
        L(366, 76, 366, 164, { tone: 'cyan' }),
        BAND(350, 100, 4, 14, { tone: 'dim', opacity: 0.5 }),
        BAND(364, 78, 4, 14, { tone: 'dim', opacity: 0.5 }),
        L(352, 96, 436, 128, { tone: 'cyan', dash: true }),
        L(366, 96, 436, 128, { tone: 'cyan', dash: true }),
        ...Array.from({ length: 5 }, (_, i) =>
          BAND(436, 78 + i * 20, 4, i % 2 === 0 ? 10 : 4, { tone: 'cyan', opacity: i % 2 === 0 ? 0.6 : 0.2 })
        ),
        T(402, 196, '明暗条纹', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        // 电磁：横波
        CURVE((x) => Math.sin(x / 18), { x: 500, y: 120, w: 104, h: 32 }, [0, 208], [-1.6, 1.6], { tone: 'amber' }),
        A(556, 88, 600, 88, { tone: 'amber', weight: 1.2 }),
        T(578, 78, 'c', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(552, 168, 'E ⊥ B', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 236, '三处裂痕', { size: 10, tone: 'danger', anchor: 'middle', mono: true }),
        TAG(84, 266, '黑体辐射 · 紫外灾难', { tone: 'danger', size: 10 }),
        TAG(286, 266, '光电效应 · 瞬时性', { tone: 'danger', size: 10 }),
        TAG(486, 266, '原子光谱 · 离散线', { tone: 'danger', size: 10 })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '1.1/0-0',
        '初始条件决定唯一轨迹',
        '给定质量、初位置与初速度，合力决定加速度；轨迹不是“选择”出来的，而是被方程唯一地推演出来。',
        [
          ...AXIS({ x: 60, y: 60, w: 520, h: 200 }, { xLabel: 'x', yLabel: 'y' }),
          CURVE((x) => 0.5 - 0.0000112 * (x - 130) ** 2, { x: 60, y: 60, w: 520, h: 200 }, [0, 520], [-1.4, 0.7], { tone: 'mint', steps: 120 }),
          DOT(94, 214, { r: 3.5, tone: 'mint' }),
          A(94, 214, 140, 168, { tone: 'violet', weight: 1.6 }),
          TAG(58, 246, '初态 (r₀, v₀)', { tone: 'mint', size: 10 }),
          T(160, 150, 'F 决定曲率', { size: 10.5, tone: 'violet' }),
          ...[130, 260, 390, 520].map((x) => {
            const y = 60 + 200 - ((0.5 - 0.0000112 * (x - 130) ** 2 + 1.4) / 2.1) * 200
            return DOT(x, y, { r: 2.4, tone: 'dim' })
          }),
          ...[130, 260, 390, 520].map((x, i) =>
            T(x - 60, 60 + 200 - ((0.5 - 0.0000112 * (x - 130) ** 2 + 1.4) / 2.1) * 200 - 12, `t${i + 1}`, { size: 9, tone: 'dim' })
          ),
          T(320, 284, '同一初值 + 同一力场 → 只有一条允许的轨迹', { size: 10.5, tone: 'muted', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '1.1/0-1',
        '相空间里的轨道与能量分解',
        '哈密顿量把动能与势能同时编码；相空间中的闭合曲线记录体系的全部历史，而 $H$ 在这条曲线上保持不变。',
        [
          ...AXIS({ x: 70, y: 46, w: 300, h: 196 }, { xLabel: 'q', yLabel: 'p' }),
          E(220, 142, 104, 54, { tone: 'mint', dash: true }),
          DOT(220, 142, { r: 3, tone: 'violet' }),
          A(220, 142, 300, 118, { tone: 'violet' }),
          T(304, 124, '状态 (q, p)', { size: 10, tone: 'violet' }),
          T(220, 230, '一条曲线 = 全部历史', { size: 10, tone: 'dim', anchor: 'middle' }),
          T(406, 62, 'H = K + V', { size: 11, tone: 'text', mono: true }),
          BAND(404, 90, 168, 34, { tone: 'mint', opacity: 0.16 }),
          BAND(404, 124, 168, 48, { tone: 'amber', opacity: 0.16 }),
          T(416, 108, 'K = p²/2m', { size: 10, tone: 'mint' }),
          T(416, 152, 'V(q)', { size: 10, tone: 'amber' }),
          L(404, 124, 572, 124, { tone: 'dim', dash: true }),
          A(586, 90, 586, 172, { tone: 'text', weight: 1.2 }),
          T(622, 132, 'H 守恒', { size: 10.5, tone: 'text', anchor: 'end' }),
          T(488, 214, '动能与势能交换，总高度不变', { size: 10, tone: 'muted', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '1.1/1-0',
        '宏观量、熵与时间箭头',
        '温度、压强、体积都可直接测量；第二定律只说熵不减，却不回答“为什么”，把解释留给统计物理。',
        [
          ...PANEL(40, 58, 150, 130, '可观测量', { tone: 'cyan' }),
          T(60, 92, 'T 温度', { size: 11, tone: 'cyan' }),
          T(60, 118, 'P 压强', { size: 11, tone: 'cyan' }),
          T(60, 144, 'V 体积', { size: 11, tone: 'cyan' }),
          T(60, 170, 'S 熵', { size: 11, tone: 'cyan' }),
          A(206, 122, 300, 122, { tone: 'violet', weight: 1.8 }),
          ...PANEL(312, 58, 150, 130, '时间箭头', { tone: 'violet' }),
          A(330, 160, 444, 92, { tone: 'violet', weight: 2 }),
          T(388, 112, 'S 不减', { size: 11, tone: 'violet', anchor: 'middle' }),
          T(488, 74, '？ 为什么', { size: 12, tone: 'danger' }),
          T(488, 98, '热力学不回答', { size: 10, tone: 'muted' }),
          T(320, 226, '宏观定律只描述“会发生什么”，不解释“为什么发生”', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '1.1/1-1',
        '微观状态数如何给出宏观熵',
        '把 $W$ 个等概率微观状态归并成一个宏观态，熵就是这团可能性的对数；$W$ 指数增长，$S$ 只线性增长。',
        [
          T(140, 44, '微观状态', { size: 10.5, tone: 'dim', anchor: 'middle' }),
          ...Array.from({ length: 24 }, (_, i) =>
            R(62 + (i % 6) * 26, 62 + Math.floor(i / 6) * 24, 18, 16, { tone: i % 3 === 0 ? 'mint' : 'dim', fill: i % 3 === 0, opacity: 0.22, r: 3 })
          ),
          TAG(60, 190, 'W = 8 个可达状态', { tone: 'mint', size: 10 }),
          A(240, 130, 330, 130, { tone: 'mint', weight: 1.8 }),
          T(285, 116, '取对数', { size: 10, tone: 'dim', anchor: 'middle' }),
          ...PANEL(342, 70, 230, 120, '宏观态', { tone: 'violet' }),
          T(358, 110, 'S = k_B ln W', { size: 13, tone: 'violet', mono: true }),
          T(358, 140, 'W ↑ ⇒ S ↑', { size: 10.5, tone: 'muted' }),
          T(358, 162, '但增长被 ln 压缩', { size: 10.5, tone: 'muted' }),
          CURVE((x) => Math.log(1 + x * 3), { x: 76, y: 262, w: 200, h: 44 }, [0, 1], [0, 4.2], { tone: 'violet', steps: 60 }),
          T(292, 282, 'S ∝ ln W', { size: 10, tone: 'violet' })
        ]
      ),
      '1-2': fig(
        '1.1/1-2',
        '能量均分与紫外灾难',
        '每个模式都分到 $k_{\\mathrm B}T$，而模式密度按 $\\nu^2$ 增长；短波端模式数没有上限，总能量因此发散。',
        [
          ...AXIS({ x: 56, y: 44, w: 520, h: 200 }, { xLabel: 'ν', yLabel: 'u(ν)' }),
          CURVE((x) => 0.0000044 * x * x, { x: 56, y: 44, w: 520, h: 200 }, [0, 520], [0, 1.2], { tone: 'danger', steps: 100 }),
          CURVE((x) => 0.0078 * x * Math.exp(-((x - 172) ** 2) / 9000), { x: 56, y: 44, w: 520, h: 200 }, [0, 520], [0, 1.2], { tone: 'mint', steps: 120 }),
          T(430, 84, '实验谱', { size: 10.5, tone: 'mint' }),
          T(470, 208, '瑞利—金斯 ∝ ν²', { size: 10.5, tone: 'danger', anchor: 'end' }),
          BAND(430, 44, 146, 200, { tone: 'danger', opacity: 0.08 }),
          T(504, 60, '紫外灾难', { size: 11, tone: 'danger', anchor: 'middle' }),
          A(86, 168, 86, 108, { tone: 'amber' }),
          T(96, 140, '按 k_BT 分配', { size: 10, tone: 'amber' }),
          T(320, 276, '短波端：模式数 × k_BT → ∞', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '1.1/2-0',
        '双缝：光程差决定明暗',
        '两条缝到屏幕某点的光程差为 $d\\sin\\theta$；差为整数个波长时相长，半波长奇数倍时相消。',
        [
          L(60, 150, 250, 150, { tone: 'dim' }),
          L(250, 96, 250, 204, { tone: 'cyan', weight: 2 }),
          BAND(246, 118, 8, 20, { tone: 'dim', opacity: 0.7 }),
          BAND(246, 162, 8, 20, { tone: 'dim', opacity: 0.7 }),
          T(232, 82, '双缝', { size: 10, tone: 'cyan', anchor: 'end' }),
          L(250, 118, 540, 74, { tone: 'mint', dash: true }),
          L(250, 182, 540, 74, { tone: 'violet', dash: true }),
          L(250, 118, 250, 182, { tone: 'amber' }),
          T(240, 150, 'd', { size: 10, tone: 'amber', anchor: 'end' }),
          T(392, 86, 'r₁', { size: 10, tone: 'mint' }),
          T(392, 148, 'r₂', { size: 10, tone: 'violet' }),
          L(540, 60, 540, 240, { tone: 'dim' }),
          ...Array.from({ length: 7 }, (_, i) =>
            BAND(532, 68 + i * 24, 5, i % 2 === 0 ? 12 : 5, { tone: 'cyan', opacity: i % 2 === 0 ? 0.55 : 0.2 })
          ),
          T(566, 152, '屏', { size: 10, tone: 'dim' }),
          T(320, 276, 'Δ = d sinθ = nλ → 亮纹', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '1.1/2-1',
        '电磁波：E 与 B 同相垂直',
        '麦克斯韦方程导出的横波中，电场与磁场相互垂直、共同垂直于传播方向，速度由介质常数决定。',
        [
          ...AXIS({ x: 64, y: 44, w: 500, h: 196 }, { xLabel: 'z', yLabel: 'E, B' }),
          CURVE((x) => Math.sin(x / 26), { x: 64, y: 44, w: 500, h: 196 }, [0, 500], [-2, 2], { tone: 'mint', steps: 120, weight: 2 }),
          CURVE((x) => Math.cos(x / 26), { x: 64, y: 44, w: 500, h: 196 }, [0, 500], [-2, 2], { tone: 'violet', steps: 120, dash: true }),
          A(64, 236, 64, 120, { tone: 'mint' }),
          T(52, 132, 'E', { size: 11, tone: 'mint', anchor: 'end' }),
          A(140, 236, 140, 190, { tone: 'violet' }),
          T(128, 202, 'B', { size: 11, tone: 'violet', anchor: 'end' }),
          A(200, 230, 346, 230, { tone: 'amber', weight: 2 }),
          T(272, 218, 'c', { size: 11, tone: 'amber', anchor: 'middle' }),
          T(360, 72, 'λ', { size: 11, tone: 'text' }),
          L(326, 88, 326, 62, { tone: 'text', dash: true }),
          L(490, 88, 490, 62, { tone: 'text', dash: true }),
          A(326, 68, 490, 68, { tone: 'text', weight: 1 }),
          T(320, 276, 'E ⊥ B ⊥ 传播方向；c = 1/√(μ₀ε₀)', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-2': fig(
        '1.1/2-2',
        '连续吸收与整份交换',
        '经典图景允许任意小的能量交换；量子图景只允许一次交换一个量子，光谱因此出现离散结构。',
        [
          ...PANEL(44, 56, 250, 164, '经典：连续', { tone: 'dim' }),
          CURVE((x) => x, { x: 66, y: 200, w: 206, h: 90 }, [0, 1], [0, 1], { tone: 'muted', steps: 40, weight: 2 }),
          T(76, 94, '任意能量可交换', { size: 10.5, tone: 'muted' }),
          ...PANEL(346, 56, 250, 164, '量子：整份', { tone: 'mint' }),
          ...[0, 1, 2, 3].map((i) => L(368, 190 - i * 28, 552, 190 - i * 28, { tone: 'mint', weight: 2 })),
          T(378, 94, '只允许 hν 的整数倍', { size: 10.5, tone: 'mint' }),
          T(320, 156, '？', { size: 18, tone: 'danger', anchor: 'middle' }),
          T(320, 246, '经典电磁学没有回答：能量如何被离散地吸收与发射', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      )
    },
    formulas: {
      '0-0': fig(
        '1.1/0-0-f',
        '牛顿方程的三项',
        '左侧 $m$ 是惯性，$d^2\\mathbf r/dt^2$ 是加速度；右侧 $\\mathbf F$ 是合力。箭头方向与轨迹弯曲方向一致。',
        [
          C(214, 140, 16, { tone: 'amber', fill: true, opacity: 0.24 }),
          T(214, 140, 'm', { size: 11, tone: 'amber', anchor: 'middle' }),
          A(236, 140, 350, 140, { tone: 'danger', weight: 2 }),
          T(292, 124, 'F', { size: 12, tone: 'danger', anchor: 'middle' }),
          P('M 240 180 C 320 180, 400 200, 520 236', { tone: 'mint', weight: 2 }),
          DOT(520, 236, { tone: 'mint' }),
          T(430, 152, '轨迹弯曲 = 有加速度', { size: 10, tone: 'muted' }),
          TAG(60, 84, 'm：惯性大小', { tone: 'amber', size: 10 }),
          TAG(60, 216, 'd²r/dt²：加速度', { tone: 'mint', size: 10 }),
          TAG(320, 274, 'F：合力', { tone: 'danger', size: 10 })
        ]
      ),
      '0-1': fig(
        '1.1/0-1-f',
        '哈密顿量 = 动能 + 势能',
        '同一轨道上取三点：$p^2/2m$ 与 $V(q)$ 互换，但两者之和（总柱高）保持不变。',
        [
          T(56, 40, '总高度 H = 常数', { size: 11, tone: 'text' }),
          ...[0, 1, 2].map((i) => {
            const x = 92 + i * 170
            const kinetic = [120, 74, 36][i]
            const potential = [40, 86, 124][i]
            return [
              BAND(x, 210 - kinetic - potential, 86, kinetic, { tone: 'mint', opacity: 0.3 }),
              BAND(x, 210 - potential, 86, potential, { tone: 'amber', opacity: 0.3 }),
              L(x, 210 - kinetic - potential, x + 86, 210 - kinetic - potential, { tone: 'text', weight: 1.2 }),
              T(x + 43, 236, ['q₁', 'q₂', 'q₃'][i], { size: 10, tone: 'dim', anchor: 'middle' }),
              T(x + 43, 210 - kinetic - potential - 12, 'H', { size: 10, tone: 'text', anchor: 'middle' })
            ]
          }).flat(),
          TAG(60, 274, 'K = p²/2m', { tone: 'mint', size: 10 }),
          TAG(260, 274, 'V(q)', { tone: 'amber', size: 10 }),
          TAG(430, 274, 'K + V = 常数', { tone: 'violet', size: 10 })
        ]
      ),
      '1-0': fig(
        '1.1/1-0-f',
        '熵：微观可能性的对数',
        '$W$ 是给定宏观态下的微观状态数；$k_{\\mathrm B}$ 只是把“状态数”换算成热力学单位的常数。',
        [
          ...Array.from({ length: 5 }, (_, i) => R(66 + i * 26, 180 - (i + 1) * 22, 18, (i + 1) * 22, { tone: 'violet', fill: true, opacity: 0.3, r: 3 })),
          A(200, 190, 300, 120, { tone: 'violet', weight: 1.8 }),
          T(250, 140, '取 ln', { size: 10.5, tone: 'muted' }),
          TAG(310, 110, 'S = k_B ln W', { tone: 'violet', size: 12 }),
          T(66, 216, 'W：可达微观状态数', { size: 10.5, tone: 'muted' }),
          T(310, 156, 'k_B：单位换算常数', { size: 10.5, tone: 'muted' }),
          T(310, 180, 'ln：把乘法变成加法', { size: 10.5, tone: 'muted' }),
          T(320, 262, 'W 越大 → S 越大，但增长被对数压缩', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '1.1/1-1-f',
        '每个二次型自由度分到 ½k_BT',
        '单原子气体的三个平动方向都是二次型自由度；三份 $\\tfrac12 k_{\\mathrm B}T$ 相加给出 $\\tfrac32 k_{\\mathrm B}T$。',
        [
          ...[0, 1, 2].map((i) => [
            ...PANEL(70 + i * 170, 70, 140, 120, ['x 方向', 'y 方向', 'z 方向'][i], { tone: 'mint' }),
            T(140 + i * 170, 120, '½ k_BT', { size: 12, tone: 'mint', anchor: 'middle', mono: true }),
            A(140 + i * 170, 172, 140 + i * 170, 202, { tone: 'dim' })
          ]).flat(),
          TAG(190, 232, '½ k_BT × 3 = 3/2 k_BT', { tone: 'amber', size: 11 }),
          T(320, 274, '每个二次型自由度贡献相同的一份', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '1.1/2-0-f',
        '波方程：空间弯曲与时间加速度',
        '左侧 $\\nabla^2 E$ 描述波形在空间中的弯曲；右侧 $\\partial^2E/\\partial t^2$ 描述场的时间加速度；两者相差 $1/c^2$。',
        [
          ...PANEL(40, 54, 250, 150, '空间二阶导：弯曲', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 26), { x: 58, y: 86, w: 210, h: 100 }, [0, 5], [-1, 1], { tone: 'mint', steps: 60, weight: 2 }),
          A(160, 116, 160, 96, { tone: 'amber' }),
          T(166, 106, '曲率为负', { size: 9.5, tone: 'amber' }),
          ...PANEL(350, 54, 250, 150, '时间二阶导：加速度', { tone: 'violet' }),
          CURVE((x) => -Math.sin(x / 26), { x: 368, y: 86, w: 210, h: 100 }, [0, 5], [-1, 1], { tone: 'violet', steps: 60, weight: 2, dash: true }),
          A(490, 138, 490, 164, { tone: 'danger' }),
          T(498, 154, '场的“回复加速度”', { size: 9.5, tone: 'danger' }),
          T(320, 232, '两者成正比 → 波以有限速度 c 传播', { size: 11, tone: 'text', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '1.1/2-1-f',
        '光速由 μ₀ 与 ε₀ 决定',
        '介电常数越大，电场越难建立；磁导率越大，磁场越难建立；两者的乘积给出 $c^2$ 的分母。',
        [
          TAG(60, 76, 'μ₀ = 4π×10⁻⁷', { tone: 'violet', size: 11 }),
          T(60, 100, '真空磁导率', { size: 10, tone: 'muted' }),
          TAG(60, 150, 'ε₀ = 8.85×10⁻¹²', { tone: 'mint', size: 11 }),
          T(60, 174, '真空介电常数', { size: 10, tone: 'muted' }),
          A(206, 96, 300, 130, { tone: 'violet', weight: 1.6 }),
          A(206, 170, 300, 136, { tone: 'mint', weight: 1.6 }),
          ...PANEL(312, 80, 270, 96, 'c = 1 / √(μ₀ε₀)', { tone: 'amber' }),
          T(320, 132, '≈ 2.998×10⁸ m/s', { size: 12, tone: 'amber', mono: true }),
          TAG(312, 216, '与介质无关的真空常数', { tone: 'amber', size: 10 }),
          T(320, 268, '光速不是“测出来再代入”，而是方程的直接要求', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      )
    }
  }
}
