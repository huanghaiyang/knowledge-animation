import { fig, T, R, BAND, L, A, C, DOT, E, P, TAG, AXIS, CURVE, LEVEL, PANEL } from './kit'
import type { SectionFigureSet } from './types'

export const ch2Figures: Record<string, SectionFigureSet> = {
  '2.1': {
    overview: fig(
      '2.1/overview',
      '从确定轨迹到概率平均',
      '经典轨道被放弃，状态改由复波函数 ψ 描述；|ψ|² 给出概率密度，归一化与算符把概率变成可比较的平均。',
      [
        T(320, 26, '从确定轨迹到概率平均', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 54, 170, 166, '经典：轨道', { tone: 'mint' }),
        P('M 48 196 C 74 132, 112 102, 182 102', { tone: 'mint', weight: 2 }),
        DOT(48, 196, { tone: 'mint', r: 3 }),
        DOT(182, 102, { tone: 'mint', r: 3 }),
        ...PANEL(230, 54, 170, 166, '量子：概率幅 ψ', { tone: 'violet' }),
        C(315, 138, 34, { tone: 'violet', dash: true }),
        A(315, 138, 340, 112, { tone: 'violet', weight: 1.8 }),
        T(348, 108, '|ψ|', { size: 10.5, tone: 'violet' }),
        T(334, 166, 'θ', { size: 10.5, tone: 'violet' }),
        ...PANEL(432, 54, 170, 166, '可测：密度与平均', { tone: 'cyan' }),
        CURVE((x) => Math.exp(-((x - 70) ** 2) / 1200), { x: 448, y: 86, w: 138, h: 80 }, [0, 140], [0, 1], {
          tone: 'cyan',
          steps: 80
        }),
        L(518, 90, 518, 164, { tone: 'amber', dash: true }),
        T(518, 78, '⟨x⟩', { size: 10, tone: 'amber', anchor: 'middle' }),
        A(202, 136, 226, 136, { tone: 'muted' }),
        A(404, 136, 428, 136, { tone: 'muted' }),
        TAG(30, 246, 'ψ 不可直接观测', { tone: 'mint', size: 10 }),
        TAG(238, 246, '|ψ|² 是概率密度', { tone: 'violet', size: 10 }),
        TAG(452, 246, '归一化 + 期待值', { tone: 'cyan', size: 10 })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '2.1/0-0',
        '经典轨迹与双缝干涉',
        '经典理论能追踪一条确定轨迹；电子逐个通过双缝却只累积出条纹，逼我们放弃“经过哪条缝”的问题。',
        [
          ...PANEL(28, 48, 272, 176, '经典：轨迹可追踪', { tone: 'mint' }),
          P('M 48 198 C 88 122, 160 100, 286 150', { tone: 'mint', weight: 2 }),
          DOT(48, 198, { tone: 'mint', r: 3 }),
          A(48, 198, 84, 164, { tone: 'violet' }),
          TAG(42, 238, '初值 (r₀, v₀)', { tone: 'mint', size: 10 }),
          T(118, 84, '每时刻都有确定位置', { size: 10, tone: 'muted' }),
          ...PANEL(340, 48, 272, 176, '量子：只有干涉条纹', { tone: 'violet' }),
          L(392, 70, 392, 190, { tone: 'cyan' }),
          BAND(388, 96, 7, 16, { tone: 'dim', opacity: 0.7 }),
          BAND(388, 146, 7, 16, { tone: 'dim', opacity: 0.7 }),
          L(392, 104, 558, 116, { tone: 'mint', dash: true }),
          L(392, 154, 558, 116, { tone: 'violet', dash: true }),
          L(558, 64, 558, 204, { tone: 'dim' }),
          ...[0, 1, 2, 3, 4].map((i) =>
            BAND(550, 74 + i * 24, 5, i % 2 === 0 ? 12 : 5, { tone: 'cyan', opacity: i % 2 === 0 ? 0.55 : 0.2 })
          ),
          T(428, 238, '无法知道经过哪条缝', { size: 10, tone: 'muted' })
        ]
      ),
      '0-1': fig(
        '2.1/0-1',
        '叠加：两列波合成一个新态',
        'ψ₁ 与 ψ₂ 都是允许的态；线性组合仍是允许态，相对相位决定合成波加强还是削弱。',
        [
          T(320, 34, '两列同频波，相位差约 2.2 rad', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          L(100, 92, 570, 92, { tone: 'dim', dash: true }),
          CURVE((x) => Math.sin(x / 40), { x: 100, y: 58, w: 470, h: 64 }, [0, 480], [-1.4, 1.4], { tone: 'mint' }),
          T(44, 96, 'ψ₁', { size: 11, tone: 'mint' }),
          T(58, 132, '+', { size: 12, tone: 'dim', anchor: 'middle' }),
          L(100, 164, 570, 164, { tone: 'dim', dash: true }),
          CURVE((x) => 0.7 * Math.sin(x / 40 + 2.2), { x: 100, y: 130, w: 470, h: 64 }, [0, 480], [-1.4, 1.4], {
            tone: 'violet',
            dash: true
          }),
          T(44, 168, 'ψ₂', { size: 11, tone: 'violet' }),
          T(58, 204, '=', { size: 12, tone: 'dim', anchor: 'middle' }),
          L(100, 236, 570, 236, { tone: 'dim', dash: true }),
          CURVE((x) => Math.sin(x / 40) + 0.7 * Math.sin(x / 40 + 2.2), { x: 100, y: 202, w: 470, h: 64 }, [0, 480], [-1.4, 1.4], {
            tone: 'amber',
            weight: 1.8
          }),
          T(44, 240, 'ψ', { size: 11, tone: 'amber' }),
          TAG(320, 274, '合成振幅变小，但仍是同一个允许态', { tone: 'mint', size: 10, anchor: 'middle' })
        ]
      ),
      '0-2': fig(
        '2.1/0-2',
        '波函数回答概率，不回答位置',
        '单次测量只落在一个点；重复制备并测量，点阵才显出 |ψ|² 的轮廓。',
        [
          ...AXIS({ x: 60, y: 56, w: 520, h: 190 }, { xLabel: 'x', yLabel: '次数', tone: 'dim' }),
          CURVE((x) => Math.exp(-((x - 250) ** 2) / 14000), { x: 60, y: 56, w: 520, h: 190 }, [0, 520], [0, 1.1], {
            tone: 'cyan',
            steps: 100
          }),
          DOT(120, 190, { tone: 'mint', r: 2.6 }),
          DOT(150, 170, { tone: 'mint', r: 2.6 }),
          DOT(185, 148, { tone: 'mint', r: 2.6 }),
          DOT(220, 132, { tone: 'mint', r: 2.6 }),
          DOT(250, 126, { tone: 'mint', r: 2.6 }),
          DOT(285, 132, { tone: 'mint', r: 2.6 }),
          DOT(320, 150, { tone: 'mint', r: 2.6 }),
          DOT(355, 172, { tone: 'mint', r: 2.6 }),
          DOT(390, 194, { tone: 'mint', r: 2.6 }),
          T(86, 84, '单次：一个点', { size: 10, tone: 'cyan' }),
          T(394, 84, '多次：轮廓显现', { size: 10, tone: 'mint' }),
          TAG(60, 274, '测量之前，位置没有确定值', { tone: 'muted', size: 10 })
        ]
      ),
      '1-0': fig(
        '2.1/1-0',
        '概率密度不是概率',
        '|ψ|² 是单位体积的概率；窄区域密度高未必概率大，宽区域密度低也可能概率大。',
        [
          ...AXIS({ x: 64, y: 50, w: 520, h: 196 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
          CURVE(
            (x) => 0.35 + 0.6 * Math.exp(-((x - 180) ** 2) / 2600) + 0.3 * Math.exp(-((x - 370) ** 2) / 12000),
            { x: 64, y: 50, w: 520, h: 196 },
            [0, 520],
            [0, 1.1],
            { tone: 'mint', steps: 110 }
          ),
          BAND(146, 96, 36, 150, { tone: 'mint', opacity: 0.22 }),
          BAND(330, 166, 90, 80, { tone: 'amber', opacity: 0.2 }),
          L(146, 246, 146, 92, { tone: 'dim', dash: true }),
          L(182, 246, 182, 92, { tone: 'dim', dash: true }),
          L(330, 246, 330, 162, { tone: 'dim', dash: true }),
          L(420, 246, 420, 162, { tone: 'dim', dash: true }),
          T(164, 80, 'V₁ 窄而高', { size: 10, tone: 'mint', anchor: 'middle' }),
          T(375, 150, 'V₂ 宽而低', { size: 10, tone: 'amber', anchor: 'middle' }),
          TAG(70, 274, 'P(V₁) 小', { tone: 'mint', size: 10 }),
          TAG(300, 274, 'P(V₂) 大', { tone: 'amber', size: 10 }),
          T(470, 274, '概率 = 密度 × 体积', { size: 10, tone: 'muted' })
        ]
      ),
      '1-1': fig(
        '2.1/1-1',
        '归一化与全局相位',
        '各区域概率相加必须等于一；整体乘上 e^{iα} 只转动相位，不改变任何概率。',
        [
          ...PANEL(34, 52, 320, 150, '总概率 = 1', { tone: 'mint' }),
          R(54, 118, 112, 32, { tone: 'mint', fill: true, opacity: 0.3, r: 3 }),
          R(166, 118, 98, 32, { tone: 'violet', fill: true, opacity: 0.3, r: 3 }),
          R(264, 118, 70, 32, { tone: 'cyan', fill: true, opacity: 0.3, r: 3 }),
          T(110, 108, '0.40', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(215, 108, '0.35', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(299, 108, '0.25', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(194, 180, '0.40 + 0.35 + 0.25 = 1', { size: 10.5, tone: 'mint', anchor: 'middle' }),
          T(356, 136, '=', { size: 13, tone: 'text', anchor: 'middle' }),
          ...PANEL(384, 52, 222, 150, '全局相位', { tone: 'violet' }),
          C(495, 125, 34, { tone: 'violet', dash: true }),
          A(495, 125, 520, 101, { tone: 'violet', weight: 1.8 }),
          T(538, 96, 'e^{iα}', { size: 10.5, tone: 'violet' }),
          T(495, 184, '|ψ|² 不变', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(320, 258, '归一化固定幅度，全局相位不改变物理状态', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '2.1/1-2',
        '平方可积：波包可以，平面波不行',
        '局域波包在远处迅速衰减，积分有限；理想平面波处处等幅，积分随范围无限增长。',
        [
          ...PANEL(28, 50, 276, 172, '波包：可归一化', { tone: 'mint' }),
          L(48, 190, 292, 190, { tone: 'dim' }),
          CURVE((x) => Math.exp(-((x - 120) ** 2) / 2200), { x: 48, y: 70, w: 244, h: 120 }, [0, 240], [0, 1.05], {
            tone: 'mint',
            steps: 90
          }),
          TAG(46, 242, '∫|ψ|² dx 有限', { tone: 'mint', size: 10 }),
          T(170, 78, '远处迅速衰减', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          ...PANEL(336, 50, 276, 172, '平面波：不可归一化', { tone: 'danger' }),
          L(356, 190, 604, 190, { tone: 'dim' }),
          L(356, 76, 604, 76, { tone: 'danger', dash: true, opacity: 0.4 }),
          L(356, 160, 604, 160, { tone: 'danger', dash: true, opacity: 0.4 }),
          CURVE((x) => Math.sin(x / 16), { x: 356, y: 76, w: 236, h: 114 }, [0, 240], [-1.1, 1.1], {
            tone: 'danger',
            steps: 90
          }),
          T(474, 66, '振幅处处不减', { size: 9.5, tone: 'danger', anchor: 'middle' }),
          TAG(354, 242, '积分随范围发散', { tone: 'danger', size: 10 }),
          T(320, 274, '实际体系总用有限波包替代理想平面波', { size: 10, tone: 'muted', anchor: 'middle' })
        ]
      )
    },
    formulas: {
      '0-0': fig(
        '2.1/0-0-f',
        '复概率幅：模与相位',
        'ψ 的模给出振幅大小，辐角 θ 给出相位；整体相位可以转动，只有相对相位影响干涉。',
        [
          A(215, 150, 470, 150, { tone: 'dim' }),
          A(320, 232, 320, 58, { tone: 'dim' }),
          T(480, 154, 'Re', { size: 10, tone: 'dim' }),
          T(320, 50, 'Im', { size: 10, tone: 'dim', anchor: 'middle' }),
          C(320, 150, 80, { tone: 'violet', dash: true }),
          A(320, 150, 386, 105, { tone: 'mint', weight: 2 }),
          L(386, 105, 386, 150, { tone: 'dim', dash: true }),
          L(320, 105, 386, 105, { tone: 'dim', dash: true }),
          P('M 350 150 A 30 30 0 0 0 346 125', { tone: 'amber' }),
          T(358, 140, 'θ', { size: 11, tone: 'amber' }),
          T(365, 112, '|ψ|', { size: 10.5, tone: 'mint' }),
          DOT(386, 105, { tone: 'mint', r: 3 }),
          T(60, 72, 'ψ = |ψ| e^{iθ}', { size: 12, tone: 'text' }),
          T(60, 100, '模 |ψ|：振幅大小', { size: 10, tone: 'dim' }),
          T(60, 122, '辐角 θ：相位角', { size: 10, tone: 'dim' }),
          T(60, 252, 'θ 随时间增大 = 相位在转', { size: 10, tone: 'muted' }),
          T(320, 274, '整体相位不可观测，相对相位才可观测', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '2.1/0-1-f',
        '系数是态矢量在基上的分量',
        '把 ψ₁、ψ₂ 看成两个坐标轴，c₁ 与 c₂ 就是态矢量在两个方向上的投影；组合仍是同一空间里的态。',
        [
          ...AXIS({ x: 90, y: 60, w: 360, h: 180 }, { xLabel: 'ψ₁', yLabel: 'ψ₂', tone: 'dim' }),
          A(90, 240, 300, 120, { tone: 'mint', weight: 2 }),
          L(300, 120, 300, 240, { tone: 'dim', dash: true }),
          L(300, 120, 90, 120, { tone: 'dim', dash: true }),
          DOT(300, 120, { tone: 'mint', r: 3 }),
          T(300, 260, 'c₁', { size: 11, tone: 'mint', anchor: 'middle' }),
          T(72, 124, 'c₂', { size: 11, tone: 'mint', anchor: 'end' }),
          T(478, 90, '线性组合', { size: 10.5, tone: 'text' }),
          T(478, 114, '仍是一个允许态', { size: 10, tone: 'muted' }),
          TAG(478, 152, 'c₁, c₂ 可复', { tone: 'violet', size: 10 }),
          T(320, 276, 'c₁ψ₁ + c₂ψ₂：系数决定权重与相对相位', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '2.1/1-0-f',
        '区域概率：密度在体积上积分',
        '把 |ψ|² 在每个小体积元 d³r 上的贡献累加，才是区域 V 内的总概率；阴影面积就是积分结果。',
        [
          ...AXIS({ x: 64, y: 50, w: 520, h: 190 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
          CURVE((x) => 0.3 + 0.6 * Math.exp(-((x - 260) ** 2) / 5000), { x: 64, y: 50, w: 520, h: 190 }, [0, 520], [0, 1.05], {
            tone: 'mint',
            steps: 100
          }),
          BAND(300, 138, 70, 102, { tone: 'cyan', opacity: 0.24 }),
          L(300, 240, 300, 134, { tone: 'cyan', dash: true }),
          L(370, 240, 370, 134, { tone: 'cyan', dash: true }),
          P('M 300 250 L 300 258 L 370 258 L 370 250', { tone: 'cyan' }),
          T(335, 154, 'V', { size: 11, tone: 'cyan', anchor: 'middle' }),
          T(78, 74, 'd³r：小体积元', { size: 10, tone: 'muted' }),
          T(335, 274, 'P(V)', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
          T(470, 274, '积分 = 阴影面积', { size: 10, tone: 'muted' })
        ]
      ),
      '1-1': fig(
        '2.1/1-1-f',
        '归一化把整体幅度定死',
        '同一条曲线乘以不同的 A，积分面积随之改变；只有让总面积等于一，A 才被唯一确定。',
        [
          ...AXIS({ x: 64, y: 50, w: 520, h: 190 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
          CURVE((x) => 2 * Math.exp(-((x - 260) ** 2) / 9000), { x: 64, y: 50, w: 520, h: 190 }, [0, 520], [0, 2.4], {
            tone: 'muted',
            dash: true,
            steps: 100
          }),
          CURVE((x) => Math.exp(-((x - 260) ** 2) / 9000), { x: 64, y: 50, w: 520, h: 190 }, [0, 520], [0, 2.4], {
            tone: 'mint',
            steps: 100
          }),
          T(96, 66, '未归一：面积 = 4', { size: 10, tone: 'muted' }),
          T(96, 92, '归一后：面积 = 1', { size: 10, tone: 'mint' }),
          A(470, 66, 470, 132, { tone: 'amber' }),
          T(482, 102, 'A 由面积定', { size: 10, tone: 'amber' }),
          T(320, 274, '调整 A，使 ∫|ψ|² d³r = 1', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '2.1/1-2-f',
        '平方可积看累积面积是否收敛',
        '把积分上限推到 R：指数衰减的累积面积趋于常数，衰减太慢的曲线则持续增长。',
        [
          ...AXIS({ x: 64, y: 50, w: 520, h: 190 }, { xLabel: 'R', yLabel: 'S(R)', tone: 'dim' }),
          CURVE((x) => 1 - Math.exp(-x / 90), { x: 64, y: 50, w: 520, h: 190 }, [0, 500], [0, 2.2], {
            tone: 'mint',
            steps: 100,
            weight: 2
          }),
          CURVE((x) => 0.5 * Math.log(1 + x / 25), { x: 64, y: 50, w: 520, h: 190 }, [0, 500], [0, 2.2], {
            tone: 'danger',
            steps: 100,
            weight: 2
          }),
          T(110, 78, '指数衰减：S 趋于常数', { size: 10, tone: 'mint' }),
          T(330, 104, '缓慢衰减：S 持续增长', { size: 10, tone: 'danger' }),
          A(560, 128, 560, 92, { tone: 'danger' }),
          T(320, 274, '∫|ψ|² d³r 有界，才可归一化', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      )
    }
  },
  '2.2': {
    overview: fig(
      '2.2/overview',
      '从平面波到定态本征方程',
      '德布罗意波给出 p 与 E 的波形式；薛定谔方程规定演化；势场不显含时间时，问题化为定态本征值方程。',
      [
        T(320, 26, '从平面波到定态本征方程', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 54, 170, 164, '自由波 e^{i(kx−ωt)}', { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 20), { x: 44, y: 88, w: 140, h: 96 }, [0, 140], [-1.2, 1.2], { tone: 'mint' }),
        A(80, 200, 160, 200, { tone: 'amber' }),
        T(166, 204, 'k', { size: 10.5, tone: 'amber' }),
        ...PANEL(230, 54, 170, 164, '薛定谔方程', { tone: 'violet' }),
        C(315, 126, 28, { tone: 'violet', dash: true }),
        A(315, 126, 335, 106, { tone: 'violet', weight: 1.8 }),
        TAG(244, 192, 'iħ∂tψ = Ĥψ', { tone: 'violet', size: 10 }),
        ...PANEL(432, 54, 170, 164, '定态本征问题', { tone: 'amber' }),
        ...LEVEL(452, 520, 116, 'E₃', { tone: 'amber' }),
        ...LEVEL(452, 520, 152, 'E₂', { tone: 'amber' }),
        ...LEVEL(452, 520, 188, 'E₁', { tone: 'amber' }),
        A(202, 136, 226, 136, { tone: 'muted' }),
        A(404, 136, 428, 136, { tone: 'muted' }),
        T(320, 244, '波 → 演化 → 本征值', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '2.2/0-0',
        '平面波：波长、频率与传播方向',
        '波矢 k 指向传播方向，相邻同相面间距为 λ；角频率 ω 决定相位随时间的转动快慢。',
        [
          ...AXIS({ x: 64, y: 56, w: 500, h: 170 }, { xLabel: 'x', yLabel: 'ψ', tone: 'dim' }),
          CURVE((x) => Math.sin(x / 24), { x: 64, y: 56, w: 500, h: 170 }, [0, 500], [-1.2, 1.2], { tone: 'mint', steps: 100 }),
          L(150, 78, 150, 200, { tone: 'dim', dash: true }),
          L(300, 78, 300, 200, { tone: 'dim', dash: true }),
          L(450, 78, 450, 200, { tone: 'dim', dash: true }),
          L(150, 72, 150, 58, { tone: 'amber' }),
          L(300, 72, 300, 58, { tone: 'amber' }),
          A(150, 64, 300, 64, { tone: 'amber' }),
          T(225, 54, 'λ', { size: 11, tone: 'amber', anchor: 'middle' }),
          C(556, 84, 22, { tone: 'violet', dash: true }),
          A(556, 84, 568, 70, { tone: 'violet' }),
          T(584, 88, 'ω', { size: 10.5, tone: 'violet' }),
          A(330, 210, 430, 210, { tone: 'amber', weight: 1.8 }),
          T(380, 200, 'k', { size: 11, tone: 'amber', anchor: 'middle' }),
          T(320, 32, '波矢 k 指向传播方向', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          T(320, 276, '相位 = kx − ωt；ω 决定相位转动', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '2.2/0-1',
        '色散关系：不同 k 有不同的速度',
        '自由粒子的 ω 正比于 k²；曲线上各点的切线斜率就是群速度，斜率随 k 增大而变大。',
        [
          ...AXIS({ x: 64, y: 48, w: 500, h: 190 }, { xLabel: 'k', yLabel: 'ω', tone: 'dim' }),
          CURVE((x) => 0.000008 * x * x, { x: 64, y: 48, w: 500, h: 190 }, [0, 460], [0, 1.4], { tone: 'mint', steps: 100 }),
          L(151, 235, 281, 199, { tone: 'cyan', dash: true, weight: 1.6 }),
          L(325, 182, 499, 64, { tone: 'danger', dash: true, weight: 1.6 }),
          DOT(216, 217, { tone: 'cyan', r: 3 }),
          DOT(412, 127, { tone: 'danger', r: 3 }),
          T(132, 116, 'k₁：斜率小', { size: 9.5, tone: 'cyan' }),
          T(372, 82, 'k₂：斜率大', { size: 9.5, tone: 'danger' }),
          T(320, 274, '不同 k 分量速度不同 → 波包逐渐展宽', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-2': fig(
        '2.2/0-2',
        '单一平面波铺满空间，波包才能局域',
        '一个平面波在全空间等幅延展，无法归一化；把不同 k 的分量叠加，才得到一个有限的波包。',
        [
          L(60, 82, 580, 82, { tone: 'dim', dash: true }),
          CURVE((x) => Math.sin(x / 14), { x: 60, y: 56, w: 510, h: 52 }, [0, 510], [-1.2, 1.2], { tone: 'muted', steps: 100 }),
          T(40, 86, '平面波', { size: 10.5, tone: 'muted' }),
          A(320, 98, 320, 138, { tone: 'violet' }),
          T(330, 118, '叠加不同 k', { size: 9.5, tone: 'violet' }),
          L(60, 200, 580, 200, { tone: 'dim', dash: true }),
          E(320, 200, 90, 26, { tone: 'cyan', dash: true }),
          CURVE((x) => Math.sin(x / 14) * Math.exp(-((x - 250) ** 2) / 12000), { x: 60, y: 150, w: 510, h: 50 }, [0, 510], [-1.2, 1.2], {
            tone: 'mint',
            steps: 110
          }),
          T(40, 204, '波包', { size: 10.5, tone: 'mint' }),
          T(320, 270, '平面波是理想基元，局域粒子要用波包', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '2.2/1-0',
        '从平面波反推微分方程',
        '对时间求导带出 −iω，对空间求二阶导带出 −k²；再用 E = ħω、p = ħk 替换，方程自然出现。',
        [
          ...PANEL(28, 56, 172, 110, '对时间求导', { tone: 'mint' }),
          T(44, 102, '∂ψ/∂t → −iωψ', { size: 10.5, tone: 'mint' }),
          T(44, 126, '带出能量 E = ħω', { size: 9.5, tone: 'dim' }),
          ...PANEL(226, 56, 172, 110, '对空间求二阶导', { tone: 'violet' }),
          T(242, 102, '∇²ψ → −k²ψ', { size: 10.5, tone: 'violet' }),
          T(242, 126, '带出动量 p = ħk', { size: 9.5, tone: 'dim' }),
          A(200, 110, 222, 110, { tone: 'muted' }),
          A(398, 110, 420, 110, { tone: 'muted' }),
          ...PANEL(424, 56, 186, 110, '用 E = p²/2m 替换', { tone: 'amber' }),
          T(440, 98, 'iħ∂tψ', { size: 12, tone: 'amber', mono: true }),
          T(440, 126, '= −(ħ²/2m)∇²ψ', { size: 10.5, tone: 'amber', mono: true }),
          T(320, 204, '方程由平面波的相位结构反推', { size: 10, tone: 'muted', anchor: 'middle' }),
          TAG(320, 238, '线性 + 时间一阶 → 叠加原理', { tone: 'mint', size: 10, anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '2.2/1-1',
        '哈密顿算符：动能加势能',
        '动能项由波函数的空间曲率给出，势能项只与位置有关；两者相加构成总能量算符。',
        [
          ...PANEL(28, 54, 270, 150, '动能：曲率', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 24), { x: 48, y: 90, w: 230, h: 90 }, [0, 230], [-1.2, 1.2], { tone: 'mint', steps: 90 }),
          T(160, 222, '−ħ²∇²/2m', { size: 10.5, tone: 'mint', anchor: 'middle' }),
          T(320, 132, '+', { size: 13, tone: 'text', anchor: 'middle' }),
          ...PANEL(342, 54, 270, 150, '势能：V(r,t)', { tone: 'amber' }),
          CURVE((x) => 0.15 + 0.95 * ((x - 115) / 115) ** 2, { x: 362, y: 90, w: 230, h: 90 }, [0, 230], [0, 1.2], {
            tone: 'amber',
            steps: 90
          }),
          T(477, 222, 'V(r,t)', { size: 10.5, tone: 'amber', anchor: 'middle' }),
          TAG(320, 248, 'Ĥ = T + V', { size: 12, tone: 'text', anchor: 'middle' }),
          T(320, 276, '动能与势能共同决定演化', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '2.2/1-2',
        '线性方程让叠加保持，且初态足够',
        '演化算符 U(t) 对线性组合逐项作用：系数不变，两个分量各自带走自己的相位；一阶时间导数只需一个初态。',
        [
          TAG(60, 84, 'ψ₁(0)', { tone: 'mint', size: 10.5 }),
          TAG(60, 144, 'ψ₂(0)', { tone: 'violet', size: 10.5 }),
          A(120, 88, 196, 88, { tone: 'mint' }),
          A(120, 148, 196, 148, { tone: 'violet' }),
          ...PANEL(200, 60, 200, 120, 'U(t)：线性演化', { tone: 'text' }),
          TAG(432, 84, 'c₁ψ₁(t)', { tone: 'mint', size: 10.5 }),
          TAG(432, 144, 'c₂ψ₂(t)', { tone: 'violet', size: 10.5 }),
          T(320, 220, '任意线性组合仍是解', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          TAG(320, 252, '一阶时间导数：初态唯一决定未来', { tone: 'text', size: 10, anchor: 'middle' })
        ]
      )
    },
    formulas: {
      '0-0': fig(
        '2.2/0-0-f',
        '平面波的三个要素',
        'A 是振幅，k 给出波前方向与间距，ω 给出相位随时间的转速；三者共同确定一列平面波。',
        [
          L(130, 90, 170, 200, { tone: 'mint' }),
          L(210, 84, 250, 194, { tone: 'mint' }),
          L(290, 78, 330, 188, { tone: 'mint' }),
          A(330, 150, 430, 120, { tone: 'amber', weight: 1.8 }),
          T(438, 116, 'k', { size: 11, tone: 'amber' }),
          L(160, 72, 160, 58, { tone: 'amber' }),
          L(250, 72, 250, 58, { tone: 'amber' }),
          A(160, 64, 250, 64, { tone: 'amber' }),
          T(205, 52, 'λ', { size: 11, tone: 'amber', anchor: 'middle' }),
          T(60, 68, 'A：振幅', { size: 10, tone: 'muted' }),
          T(320, 244, '相位 = k·r − ωt', { size: 11, tone: 'text', anchor: 'middle' }),
          T(320, 274, '波前垂直于 k，相邻波前相距 λ', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '2.2/0-1-f',
        '德布罗意关系：波参数换算成力学量',
        '波矢 k 乘 ħ 给出动量，角频率 ω 乘 ħ 给出能量；非相对论色散再把两者连成抛物线。',
        [
          TAG(50, 80, 'k', { tone: 'mint', size: 13 }),
          T(50, 102, '波矢', { size: 10, tone: 'dim' }),
          A(82, 84, 160, 84, { tone: 'mint' }),
          TAG(174, 88, 'p = ħk', { tone: 'mint', size: 12 }),
          T(174, 110, '动量', { size: 10, tone: 'dim' }),
          TAG(50, 148, 'ω', { tone: 'violet', size: 13 }),
          T(50, 170, '角频率', { size: 10, tone: 'dim' }),
          A(82, 152, 160, 152, { tone: 'violet' }),
          TAG(174, 156, 'E = ħω', { tone: 'amber', size: 12 }),
          T(174, 178, '能量', { size: 10, tone: 'dim' }),
          ...PANEL(360, 56, 244, 160, '非相对论色散', { tone: 'amber' }),
          L(380, 190, 580, 190, { tone: 'dim' }),
          L(380, 190, 380, 86, { tone: 'dim' }),
          CURVE((x) => x * x, { x: 382, y: 90, w: 196, h: 98 }, [0, 1], [0, 1.2], { tone: 'amber', steps: 70 }),
          T(500, 208, 'ω ∝ k²', { size: 10, tone: 'amber', anchor: 'middle' }),
          T(320, 274, '同一组关系连接波参数与粒子力学量', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '2.2/1-0-f',
        '含时方程：相位转速等于能量',
        '左边是波函数的时间变化率，右边是哈密顿算符给出的能量；ħ 把能量的量纲换成相位角频率。',
        [
          T(50, 64, 'iħ ∂ψ/∂t', { size: 13, tone: 'text', mono: true }),
          C(110, 148, 36, { tone: 'mint', dash: true }),
          A(110, 148, 132, 122, { tone: 'mint' }),
          T(150, 120, '相位转 E/ħ', { size: 9.5, tone: 'mint' }),
          T(50, 230, '左边：演化的快慢', { size: 10, tone: 'muted' }),
          T(320, 130, '=', { size: 14, tone: 'text', anchor: 'middle' }),
          T(400, 64, 'Ĥψ', { size: 13, tone: 'amber', mono: true }),
          ...LEVEL(400, 500, 110, 'E₃', { tone: 'amber' }),
          ...LEVEL(400, 500, 150, 'E₂', { tone: 'amber' }),
          ...LEVEL(400, 500, 190, 'E₁', { tone: 'amber' }),
          T(400, 230, '右边：能量算符', { size: 10, tone: 'muted' }),
          T(320, 272, '方程规定 ψ 如何随时间演化', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '2.2/1-1-f',
        '哈密顿量：曲率项加势能项',
        '空间二阶导数测量波函数的弯曲程度，前面带负号；势能项只按位置取值。两者相加就是 Ĥ。',
        [
          ...PANEL(28, 54, 250, 150, '−ħ²∇²/2m', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 20), { x: 46, y: 92, w: 214, h: 92 }, [0, 214], [-1.2, 1.2], { tone: 'mint', steps: 90 }),
          A(153, 112, 153, 88, { tone: 'mint' }),
          T(162, 102, '曲率', { size: 9.5, tone: 'mint' }),
          T(320, 128, '+', { size: 14, tone: 'text', anchor: 'middle' }),
          ...PANEL(342, 54, 250, 150, 'V(r,t)', { tone: 'amber' }),
          CURVE((x) => 0.15 + 0.95 * ((x - 107) / 107) ** 2, { x: 360, y: 92, w: 214, h: 92 }, [0, 214], [0, 1.2], {
            tone: 'amber',
            steps: 90
          }),
          T(60, 228, '动能：空间弯曲', { size: 10, tone: 'muted' }),
          T(400, 228, '势能：位置相关', { size: 10, tone: 'muted' }),
          TAG(320, 254, 'Ĥ = 动能 + 势能', { size: 11, tone: 'text', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '2.2/2-0-f',
        '定态：空间部分乘一个时间相位',
        'φ 只由空间方程决定，e^{−iEt/ħ} 只是整体相位；相乘后概率密度 |φ|² 不随时间改变。',
        [
          ...PANEL(40, 54, 200, 150, '空间部分 φ(r)', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 22), { x: 58, y: 84, w: 164, h: 96 }, [0, 164], [-1.2, 1.2], { tone: 'mint', steps: 80 }),
          T(140, 220, '节点位置固定', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(260, 132, '×', { size: 14, tone: 'text', anchor: 'middle' }),
          ...PANEL(286, 54, 150, 150, '时间相位', { tone: 'violet' }),
          C(361, 124, 30, { tone: 'violet', dash: true }),
          A(361, 124, 380, 104, { tone: 'violet' }),
          T(361, 188, 'e^{−iEt/ħ}', { size: 10.5, tone: 'violet', anchor: 'middle' }),
          T(320, 262, '|Ψ|² = |φ|²，与 t 无关', { size: 10.5, tone: 'muted', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '2.2/2-1-f',
        '本征方程：算符作用只给出能量标度',
        'Ĥ 作用在 φ 上不改变它的形状，只把它乘以 E；满足这一条件的 φ 就是能量的本征函数。',
        [
          ...PANEL(40, 56, 150, 110, '本征函数 φ', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 18), { x: 50, y: 90, w: 130, h: 62 }, [0, 130], [-1.2, 1.2], { tone: 'mint', steps: 70 }),
          A(196, 110, 250, 110, { tone: 'violet' }),
          ...LEVEL(270, 430, 100, 'E₃', { tone: 'amber' }),
          ...LEVEL(270, 430, 145, 'E₂', { tone: 'amber' }),
          ...LEVEL(270, 430, 190, 'E₁', { tone: 'amber' }),
          TAG(270, 232, 'Ĥφ = Eφ', { tone: 'text', size: 13 }),
          T(320, 274, '形状不变，只多一个能量因子', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      )
    }
  },
  'qm-2-3': {
    overview: fig(
      '2.3/overview',
      '一般解：离散求和与连续积分',
      '束缚态按离散本征态求和，散射态按连续平面波积分；两者都是同一叠加原理的不同谱结构。',
      [
        T(320, 26, '一般解按谱结构叠加', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 52, 250, 156, '束缚态 · 离散谱', { tone: 'mint' }),
        ...LEVEL(48, 118, 92, 'E₄', { tone: 'mint' }),
        ...LEVEL(48, 118, 120, 'E₃', { tone: 'mint' }),
        ...LEVEL(48, 118, 148, 'E₂', { tone: 'mint' }),
        ...LEVEL(48, 118, 176, 'E₁', { tone: 'mint' }),
        T(48, 202, '求和：Σ c_n φ_n', { size: 10, tone: 'muted' }),
        A(288, 128, 344, 128, { tone: 'muted' }),
        ...PANEL(362, 52, 250, 156, '散射态 · 连续谱', { tone: 'cyan' }),
        L(390, 200, 390, 78, { tone: 'dim' }),
        A(390, 96, 390, 78, { tone: 'dim' }),
        BAND(400, 96, 150, 104, { tone: 'cyan', opacity: 0.18 }),
        T(408, 90, 'E 连续', { size: 10, tone: 'cyan' }),
        T(408, 128, '任意能量都允许', { size: 9.5, tone: 'muted' }),
        T(408, 152, '基元：e^{ikx}', { size: 9.5, tone: 'muted' }),
        T(390, 222, '积分：∫ φ(k) … dk', { size: 10, tone: 'muted' }),
        TAG(28, 246, '离散谱：束缚，可求和', { tone: 'mint', size: 10 }),
        TAG(362, 246, '连续谱：散射，需积分', { tone: 'cyan', size: 10 })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '2.3/0-0',
        '完备基把初态拆成分量',
        '任意平方可积初始态都能写成 φ_n 的线性组合；系数由内积逐项提取。',
        [
          ...PANEL(28, 46, 240, 170, '初始态 Ψ(x,0)', { tone: 'violet', size: 10 }),
          CURVE(
            (x) => Math.exp(-((x - 100) ** 2) / 2600) + 0.5 * Math.exp(-((x - 180) ** 2) / 900),
            { x: 44, y: 84, w: 208, h: 100 },
            [0, 208],
            [0, 1.6],
            { tone: 'violet', steps: 80 }
          ),
          T(160, 204, '不是单个本征态', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(276, 132, 330, 132, { tone: 'muted', weight: 1.6 }),
          T(303, 120, '内积', { size: 9.5, tone: 'dim', anchor: 'middle' }),
          ...PANEL(336, 46, 276, 170, '完备基 φ₁ … φ₄', { tone: 'mint', size: 10.5 }),
          CURVE((x) => Math.sin(Math.PI * x / 50), { x: 356, y: 100, w: 50, h: 40 }, [0, 50], [-1.2, 1.2], {
            tone: 'mint',
            steps: 40
          }),
          CURVE((x) => Math.sin(2 * Math.PI * x / 50), { x: 416, y: 100, w: 50, h: 40 }, [0, 50], [-1.2, 1.2], {
            tone: 'violet',
            steps: 40
          }),
          CURVE((x) => Math.sin(3 * Math.PI * x / 50), { x: 476, y: 100, w: 50, h: 40 }, [0, 50], [-1.2, 1.2], {
            tone: 'cyan',
            steps: 50
          }),
          CURVE((x) => Math.sin(4 * Math.PI * x / 50), { x: 536, y: 100, w: 50, h: 40 }, [0, 50], [-1.2, 1.2], {
            tone: 'amber',
            steps: 60
          }),
          T(381, 166, 'c₁φ₁', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(441, 166, 'c₂φ₂', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(501, 166, 'c₃φ₃', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(561, 166, 'c₄φ₄', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          T(474, 196, 'c_n = ∫ φ_n* Ψ dx', { size: 10, tone: 'mint', anchor: 'middle', mono: true }),
          T(320, 238, '完备性：任何平方可积初态都能这样展开', { size: 10, tone: 'muted', anchor: 'middle' }),
          TAG(320, 266, '解方程变成求一组系数', { tone: 'mint', size: 10, anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '2.3/0-1',
        '系数模平方就是概率清单',
        '每个 c_n 是测得 E_n 的振幅，模平方给出概率；所有概率相加必须为一。',
        [
          ...AXIS({ x: 70, y: 56, w: 490, h: 180 }, { xLabel: 'n', yLabel: 'P_n', tone: 'dim' }),
          T(90, 84, '一次测量只给一个 E_n', { size: 9.5, tone: 'dim' }),
          BAND(120, 106, 40, 130, { tone: 'mint', opacity: 0.45 }),
          BAND(220, 149, 40, 87, { tone: 'violet', opacity: 0.45 }),
          BAND(320, 184, 40, 52, { tone: 'cyan', opacity: 0.45 }),
          BAND(420, 216, 40, 20, { tone: 'amber', opacity: 0.45 }),
          T(140, 96, '0.45', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(240, 139, '0.30', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(340, 174, '0.18', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(440, 206, '0.07', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          T(140, 254, 'E₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(240, 254, 'E₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(340, 254, 'E₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(440, 254, 'E₄', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(500, 88, '概率之和 = 1', { size: 10, tone: 'text', anchor: 'end' }),
          T(320, 275, '归一化：Σ|c_n|² = 1', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-2': fig(
        '2.3/0-2',
        '完备性把解方程变成求系数',
        '方程难解但谱已知：把初态投影到完备基得到一组系数，再由系数重建任意时刻的态。',
        [
          ...PANEL(28, 58, 168, 134, '① 任意初态', { tone: 'mint' }),
          CURVE((x) => Math.exp(-((x - 68) ** 2) / 2200), { x: 44, y: 92, w: 136, h: 64 }, [0, 136], [0, 1.1], {
            tone: 'mint',
            steps: 80
          }),
          T(112, 186, 'Ψ(x,0)', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          A(200, 124, 228, 124, { tone: 'muted' }),
          ...PANEL(232, 58, 168, 134, '② 求内积', { tone: 'violet' }),
          T(246, 100, 'c_n = ∫ φ_n* Ψ dx', { size: 10, tone: 'violet' }),
          T(246, 128, '逐项提取', { size: 9.5, tone: 'muted' }),
          A(404, 124, 432, 124, { tone: 'muted' }),
          ...PANEL(436, 58, 176, 134, '③ 系数重建态', { tone: 'amber' }),
          L(446, 176, 592, 176, { tone: 'dim' }),
          BAND(452, 148, 20, 28, { tone: 'mint', opacity: 0.4 }),
          BAND(478, 156, 20, 20, { tone: 'violet', opacity: 0.4 }),
          BAND(504, 164, 20, 12, { tone: 'cyan', opacity: 0.4 }),
          BAND(530, 168, 20, 8, { tone: 'amber', opacity: 0.4 }),
          T(462, 188, 'c₁', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(488, 188, 'c₂', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(514, 188, 'c₃', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(540, 188, 'c₄', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          T(320, 226, '谱已知，解就由一组系数决定', { size: 10, tone: 'muted', anchor: 'middle' }),
          TAG(320, 254, '求解 → 投影', { tone: 'mint', size: 10, anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '2.3/1-0',
        '时间因子只转相位，不改权重',
        '每项 e^{−iE_n t/ħ} 的模恒为一；能量越高转得越快，相对相位随时间变化。',
        [
          ...PANEL(28, 50, 270, 160, '模恒为 1，相位在转', { tone: 'violet' }),
          C(96, 132, 38, { tone: 'violet', dash: true }),
          A(96, 132, 120, 106, { tone: 'violet', weight: 1.8 }),
          T(96, 192, 'E₁：转速慢', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          C(220, 132, 38, { tone: 'cyan', dash: true }),
          A(220, 132, 252, 120, { tone: 'cyan', weight: 1.8 }),
          T(220, 192, 'E₂：转速快', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          ...PANEL(318, 50, 294, 160, '权重 |c_n|² 恒定', { tone: 'mint' }),
          L(336, 178, 592, 178, { tone: 'dim' }),
          BAND(352, 108, 26, 70, { tone: 'mint', opacity: 0.4 }),
          BAND(404, 130, 26, 48, { tone: 'violet', opacity: 0.4 }),
          BAND(456, 148, 26, 30, { tone: 'cyan', opacity: 0.4 }),
          T(365, 100, '|c₁|²', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(417, 122, '|c₂|²', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(469, 140, '|c₃|²', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          A(540, 150, 540, 112, { tone: 'amber' }),
          T(552, 132, 't 增大', { size: 9.5, tone: 'amber' }),
          T(470, 198, '高度不随时间改变', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(320, 232, '各分量概率不变，相对相位却在变', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(320, 258, '相对相位才决定干涉', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '2.3/1-1',
        '两态叠加：概率随时间振荡',
        '对角项给出平均分布，交叉项按 cos[(E₂−E₁)t/ħ] 振荡，概率以 ΔE/ħ 呼吸。',
        [
          ...AXIS({ x: 64, y: 52, w: 520, h: 186 }, { xLabel: 't', yLabel: 'P', tone: 'dim' }),
          L(64, 141, 584, 141, { tone: 'muted', dash: true }),
          T(90, 132, '无交叉项：恒定', { size: 9.5, tone: 'muted' }),
          CURVE((x) => 0.55 + 0.28 * Math.cos((x - 186) / 30), { x: 64, y: 52, w: 520, h: 186 }, [0, 520], [0, 1.05], {
            tone: 'amber',
            steps: 110,
            weight: 1.8
          }),
          L(249, 91, 249, 238, { tone: 'cyan', dash: true }),
          L(438, 91, 438, 238, { tone: 'cyan', dash: true }),
          A(249, 80, 438, 80, { tone: 'cyan' }),
          T(343, 72, 'T = 2πħ/ΔE', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(470, 110, '振荡项 ∝ cos(ΔE t/ħ)', { size: 9.5, tone: 'amber' }),
          T(320, 264, '固定位置 x，概率随时间周期性起伏', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '2.3/1-2',
        '能级差写进相位差，也写进光谱',
        '两分量相位差以 ΔE/ħ 线性累积；概率拍频与跃迁谱线频率都等于同一 ω₂₁。',
        [
          T(320, 30, '两分量的相位差随时间线性累积', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          L(60, 88, 570, 88, { tone: 'dim', dash: true }),
          CURVE((x) => Math.sin(x / 18), { x: 60, y: 64, w: 500, h: 44 }, [0, 500], [-1.2, 1.2], {
            tone: 'mint',
            steps: 110
          }),
          CURVE((x) => Math.sin(x / 16), { x: 60, y: 64, w: 500, h: 44 }, [0, 500], [-1.2, 1.2], {
            tone: 'violet',
            steps: 110,
            dash: true
          }),
          T(44, 68, 'ψ₁', { size: 9.5, tone: 'mint' }),
          T(44, 108, 'ψ₂', { size: 9.5, tone: 'violet' }),
          A(320, 112, 320, 142, { tone: 'muted' }),
          T(334, 132, '相位差增大', { size: 9.5, tone: 'muted' }),
          L(60, 186, 570, 186, { tone: 'dim', dash: true }),
          CURVE((x) => 0.55 + 0.45 * Math.cos(x / 40), { x: 60, y: 150, w: 500, h: 76 }, [0, 500], [0, 1.05], {
            tone: 'amber',
            steps: 120,
            weight: 1.8
          }),
          DOT(311, 154, { tone: 'amber', r: 2.8 }),
          T(70, 142, '拍：概率明暗交替', { size: 9.5, tone: 'amber' }),
          T(320, 244, '拍频 ω₂₁ = ΔE/ħ = 谱线频率', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          TAG(60, 268, 'E₂ − E₁ 决定拍频', { tone: 'amber', size: 10 })
        ]
      ),
      '2-0': fig(
        '2.3/2-0',
        '平面波不能归一化，波包才可以',
        '散射态能量连续、平面波全空间等幅；乘上权重包络后成为有限波包，才能描述入射粒子。',
        [
          ...PANEL(28, 50, 272, 156, '平面波：处处等幅', { tone: 'muted' }),
          CURVE((x) => Math.sin(x / 12), { x: 44, y: 82, w: 242, h: 56 }, [0, 242], [-1.3, 1.3], {
            tone: 'muted',
            steps: 110
          }),
          L(44, 96, 286, 96, { tone: 'danger', dash: true, opacity: 0.5 }),
          L(44, 124, 286, 124, { tone: 'danger', dash: true, opacity: 0.5 }),
          T(160, 190, '延伸到无穷，不可归一化', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(304, 126, 342, 126, { tone: 'muted' }),
          T(323, 114, '× 包络', { size: 9.5, tone: 'text', anchor: 'middle' }),
          ...PANEL(350, 50, 264, 156, '波包：可归一化', { tone: 'mint' }),
          CURVE(
            (x) => Math.sin(x / 12) * Math.exp(-((x - 117) ** 2) / 1500),
            { x: 366, y: 82, w: 234, h: 56 },
            [0, 234],
            [-1.3, 1.3],
            { tone: 'mint', steps: 110 }
          ),
          E(483, 110, 84, 24, { tone: 'cyan', dash: true }),
          T(482, 190, '局域、可归一化', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(320, 228, '散射态：能量连续取值，不能离散求和', { size: 10, tone: 'muted', anchor: 'middle' }),
          TAG(320, 256, '用连续 k 的积分替代求和', { tone: 'cyan', size: 10, anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '2.3/2-1',
        'φ(k) 是波包的动量分布',
        '波包按权重 φ(k) 叠加不同 k 的平面波；|φ(k)|² 是测得动量 ħk 的概率密度。',
        [
          ...PANEL(28, 50, 264, 150, '空间：ψ(x)', { tone: 'mint' }),
          CURVE(
            (x) => Math.sin(x / 10) * Math.exp(-((x - 116) ** 2) / 2000),
            { x: 44, y: 86, w: 232, h: 80 },
            [0, 232],
            [-1.2, 1.2],
            { tone: 'mint', steps: 110 }
          ),
          T(160, 190, '局域波包', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          A(300, 108, 340, 108, { tone: 'violet' }),
          A(340, 140, 300, 140, { tone: 'violet' }),
          T(320, 94, '傅里叶', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          ...PANEL(352, 50, 260, 150, '动量：|φ(k)|²', { tone: 'violet' }),
          ...AXIS({ x: 372, y: 74, w: 220, h: 96 }, { xLabel: 'k', tone: 'dim' }),
          CURVE((x) => Math.exp(-((x - 110) ** 2) / 2600), { x: 372, y: 74, w: 220, h: 96 }, [0, 220], [0, 1.05], {
            tone: 'violet',
            steps: 100
          }),
          L(482, 170, 482, 78, { tone: 'cyan', dash: true }),
          DOT(482, 76, { tone: 'cyan', r: 2.6 }),
          T(490, 88, 'ħk₀', { size: 9.5, tone: 'cyan' }),
          T(482, 192, '动量分布峰值', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(320, 224, '|φ(k)|² 是测得 ħk 的概率密度', { size: 10, tone: 'muted', anchor: 'middle' }),
          TAG(320, 252, '权重 φ(k) 决定各 k 分量', { tone: 'violet', size: 10, anchor: 'middle' })
        ]
      ),
      '2-2': fig(
        '2.3/2-2',
        '群速度推动波包，弥散让它变宽',
        '波包中心以 dω/dk 匀速平移；不同 k 分量速度不同，包络随时间展宽。',
        [
          ...PANEL(28, 54, 180, 120, 't₁', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 9) * Math.exp(-((x - 58) ** 2) / 500), { x: 40, y: 78, w: 156, h: 74 }, [0, 156], [-1.2, 1.2], {
            tone: 'mint',
            steps: 100
          }),
          T(118, 166, 'Δx 小', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          ...PANEL(230, 54, 180, 120, 't₂', { tone: 'violet' }),
          CURVE((x) => Math.sin(x / 9) * Math.exp(-((x - 80) ** 2) / 1100), { x: 242, y: 78, w: 156, h: 74 }, [0, 156], [-1.2, 1.2], {
            tone: 'violet',
            steps: 100
          }),
          T(320, 166, '包络变宽', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          ...PANEL(432, 54, 180, 120, 't₃', { tone: 'amber' }),
          CURVE((x) => Math.sin(x / 9) * Math.exp(-((x - 96) ** 2) / 1900), { x: 444, y: 78, w: 156, h: 74 }, [0, 156], [-1.2, 1.2], {
            tone: 'amber',
            steps: 100
          }),
          T(522, 166, '继续展宽', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          A(40, 196, 590, 196, { tone: 'cyan', weight: 1.6 }),
          T(315, 188, 'v_g = ħk₀/m', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(320, 222, '中心匀速前进，宽度持续增长', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(320, 248, '不同 k 分量速度不同 → 量子弥散', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      )
    },
    formulas: {
      '0-0': fig(
        '2.3/0-0-f',
        '一般解 = 本征解 × 各自时间相位',
        '$c_n$ 只定权重，$e^{-iE_nt/\\hbar}$ 只转相位；不同 n 的转速由能级决定。',
        [
          T(40, 36, '每一项 = 本征解 × 时间相位', { size: 10.5, tone: 'muted' }),
          CURVE((x) => Math.sin(Math.PI * x / 180), { x: 44, y: 60, w: 180, h: 44 }, [0, 180], [-1.2, 1.2], {
            tone: 'mint',
            steps: 80
          }),
          T(44, 54, 'φ₁', { size: 10, tone: 'mint' }),
          C(292, 82, 18, { tone: 'violet', dash: true }),
          A(292, 82, 306, 70, { tone: 'violet', weight: 1.6 }),
          T(320, 86, 'E₁ 最慢', { size: 9.5, tone: 'violet' }),
          CURVE((x) => Math.sin(2 * Math.PI * x / 180), { x: 44, y: 118, w: 180, h: 44 }, [0, 180], [-1.2, 1.2], {
            tone: 'mint',
            steps: 90
          }),
          T(44, 112, 'φ₂', { size: 10, tone: 'mint' }),
          C(292, 140, 18, { tone: 'violet', dash: true }),
          A(292, 140, 302, 126, { tone: 'violet', weight: 1.6 }),
          T(320, 144, 'E₂ 较快', { size: 9.5, tone: 'violet' }),
          CURVE((x) => Math.sin(3 * Math.PI * x / 180), { x: 44, y: 176, w: 180, h: 44 }, [0, 180], [-1.2, 1.2], {
            tone: 'mint',
            steps: 100
          }),
          T(44, 170, 'φ₃', { size: 10, tone: 'mint' }),
          C(292, 198, 18, { tone: 'violet', dash: true }),
          A(292, 198, 306, 184, { tone: 'violet', weight: 1.6 }),
          T(320, 202, 'E₃ 最快', { size: 9.5, tone: 'violet' }),
          T(420, 74, 'c_n：由初态定', { size: 10, tone: 'muted' }),
          T(420, 100, '时间因子只转相位', { size: 10, tone: 'muted' }),
          T(420, 126, 'E 越大转得越快', { size: 10, tone: 'muted' }),
          T(420, 170, '求和覆盖全部 n', { size: 10.5, tone: 'text' }),
          TAG(420, 198, '离散谱 → 离散求和', { tone: 'mint', size: 10 }),
          T(320, 246, '模不变，只有相对相位在积累', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '2.3/0-1-f',
        '内积取出分量，模平方给出概率',
        '$c_n$ 是 Ψ 在 $\\phi_n$ 上的投影；$|c_n|^2$ 是这次投影的面积，即测得 $E_n$ 的概率。',
        [
          ...PANEL(30, 52, 300, 152, '投影：c_n = ∫ φ_n* Ψ dx', { tone: 'mint' }),
          L(50, 158, 314, 158, { tone: 'dim' }),
          CURVE((x) => 0.7 * Math.sin(Math.PI * x / 120) + 0.2, { x: 50, y: 96, w: 264, h: 62 }, [0, 264], [-1.4, 1.4], {
            tone: 'mint',
            steps: 90
          }),
          CURVE((x) => 0.7 * Math.sin(Math.PI * x / 120 + 0.8), { x: 50, y: 96, w: 264, h: 62 }, [0, 264], [-1.4, 1.4], {
            tone: 'violet',
            steps: 90,
            dash: true
          }),
          T(58, 76, 'φ_n', { size: 9.5, tone: 'mint' }),
          T(200, 76, 'Ψ', { size: 9.5, tone: 'violet' }),
          A(340, 130, 384, 130, { tone: 'muted' }),
          ...PANEL(392, 52, 220, 152, 'P_n = |c_n|²', { tone: 'amber' }),
          R(452, 88, 64, 64, { tone: 'amber', fill: true, opacity: 0.22, r: 2 }),
          T(484, 80, '|c_n|', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          T(484, 172, '面积 = 概率', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          T(320, 226, '投影系数逐项独立', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(320, 252, '正交基上，各分量概率相加 = 1', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '2.3/1-0-f',
        '对角项稳定，交叉项振荡',
        '把 |Ψ|² 展开：同能级项给出不动的分布，跨能级项带着 $e^{i(E_m-E_n)t/\\hbar}$ 来回摆动。',
        [
          ...PANEL(30, 52, 266, 158, '对角项：|c_n|²|φ_n|²', { tone: 'mint' }),
          L(46, 178, 280, 178, { tone: 'dim' }),
          CURVE(
            (x) => Math.exp(-((x - 90) ** 2) / 2500) + 0.7 * Math.exp(-((x - 200) ** 2) / 9000),
            { x: 46, y: 96, w: 234, h: 78 },
            [0, 234],
            [0, 1.1],
            { tone: 'mint', steps: 100 }
          ),
          T(163, 192, '与 t 无关', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(320, 128, '+', { size: 14, tone: 'text', anchor: 'middle' }),
          ...PANEL(354, 52, 258, 158, '交叉项：2 Re[...]', { tone: 'amber' }),
          L(374, 150, 596, 150, { tone: 'dim', dash: true }),
          CURVE((x) => Math.cos(x / 26), { x: 374, y: 110, w: 222, h: 80 }, [0, 222], [-1.1, 1.1], {
            tone: 'amber',
            steps: 110
          }),
          T(483, 192, '∝ cos[(E₂−E₁)t/ħ]', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          T(320, 228, '对角项给出稳定的概率分布', { size: 10, tone: 'muted', anchor: 'middle' }),
          TAG(320, 256, '交叉项平均为零：涨落', { tone: 'amber', size: 10, anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '2.3/1-1-f',
        '能级差就是相位旋转频率',
        '$\\omega_{mn}=(E_n-E_m)/\\hbar$：能级差越大相位差累积越快，差为零则没有振荡。',
        [
          ...LEVEL(60, 220, 104, 'E₂', { tone: 'amber' }),
          ...LEVEL(60, 220, 178, 'E₁', { tone: 'amber' }),
          A(140, 108, 140, 174, { tone: 'violet', weight: 1.8 }),
          T(150, 146, 'ΔE', { size: 11, tone: 'violet' }),
          ...AXIS({ x: 330, y: 70, w: 240, h: 110 }, { xLabel: 't', yLabel: 'Δφ', tone: 'dim' }),
          CURVE((x) => x / 200, { x: 330, y: 70, w: 240, h: 110 }, [0, 240], [0, 1.2], {
            tone: 'cyan',
            steps: 50,
            weight: 1.8
          }),
          T(440, 88, '斜率 = ω_mn', { size: 9.5, tone: 'cyan' }),
          TAG(60, 238, 'ω_mn = (E_n − E_m)/ħ', { tone: 'amber', size: 10 }),
          T(330, 212, 'ΔE 越大，相位差累积越快', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(330, 236, 'ΔE → 0：简并且无拍', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '2.3/2-0-f',
        '连续 k 分量的叠加就是积分',
        '$\\Psi(x,t)=\\int\\phi(k)e^{i(kx-\\omega t)}dk$；每个 k 分量按色散 $\\omega=\\hbar k^2/2m$ 转相位。',
        [
          ...PANEL(28, 48, 250, 158, 'k 连续取值', { tone: 'cyan' }),
          CURVE((x) => Math.sin(x / 14), { x: 44, y: 82, w: 212, h: 26 }, [0, 212], [-1.2, 1.2], {
            tone: 'mint',
            steps: 90
          }),
          CURVE((x) => Math.sin(x / 9), { x: 44, y: 116, w: 212, h: 26 }, [0, 212], [-1.2, 1.2], {
            tone: 'violet',
            steps: 90
          }),
          CURVE((x) => Math.sin(x / 6), { x: 44, y: 150, w: 212, h: 26 }, [0, 212], [-1.2, 1.2], {
            tone: 'cyan',
            steps: 100
          }),
          T(150, 192, '每个 k 一个独立分量', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(286, 126, 326, 126, { tone: 'muted' }),
          ...PANEL(344, 48, 268, 158, '色散 ω = ħk²/2m', { tone: 'amber' }),
          ...AXIS({ x: 368, y: 82, w: 224, h: 100 }, { xLabel: 'k', tone: 'dim' }),
          T(360, 88, 'ω', { size: 9.5, tone: 'amber', anchor: 'end' }),
          CURVE((x) => 0.0000248 * x * x, { x: 368, y: 82, w: 224, h: 100 }, [0, 220], [0, 1.2], {
            tone: 'amber',
            steps: 80
          }),
          DOT(492, 150, { tone: 'amber', r: 2.8 }),
          T(500, 146, 'k₀', { size: 9.5, tone: 'amber' }),
          T(320, 228, '积分 = 连续 k 的贡献相加', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(320, 254, '每个分量自带 ω(k) 的相位', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '2.3/2-1-f',
        '群速度是色散曲线的斜率',
        '$v_g=\\left.d\\omega/dk\\right|_{k_0}=\\hbar k_0/m$：切线越陡，波包中心走得越快。',
        [
          ...AXIS({ x: 70, y: 56, w: 340, h: 180 }, { xLabel: 'k', yLabel: 'ω', tone: 'dim' }),
          CURVE((x) => 0.0000225 * x * x, { x: 70, y: 56, w: 340, h: 180 }, [0, 330], [0, 2.45], {
            tone: 'mint',
            steps: 100
          }),
          L(216, 208, 336, 131, { tone: 'cyan', dash: true, weight: 1.6 }),
          L(276, 170, 276, 236, { tone: 'dim', dash: true }),
          L(70, 170, 276, 170, { tone: 'dim', dash: true }),
          DOT(276, 170, { tone: 'cyan', r: 3 }),
          T(282, 254, 'k₀', { size: 9.5, tone: 'cyan' }),
          T(60, 174, 'ω₀', { size: 9.5, tone: 'dim', anchor: 'end' }),
          T(440, 84, '切线斜率 = v_g', { size: 10.5, tone: 'text' }),
          T(440, 110, '= dω/dk 在 k₀', { size: 10, tone: 'muted' }),
          T(440, 136, '= ħk₀/m', { size: 10.5, tone: 'amber' }),
          T(440, 164, '恰等于经典粒子速度', { size: 9.5, tone: 'muted' }),
          TAG(440, 196, '斜率越大，波包越快', { tone: 'mint', size: 10 })
        ]
      )
    }
  },
  // __NEXT__
}
