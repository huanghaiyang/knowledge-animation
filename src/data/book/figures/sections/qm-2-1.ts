import { fig, T, BAND, L, A, C, DOT, P, AXIS, CURVE, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '2.1/overview',
    '从轨道到概率：波函数的主线',
    '$\\psi$ 是复概率幅，$|\\psi|^2$ 给出概率密度；归一化固定幅度，算符把概率分布变成期待值。',
    [
      T(320, 24, '从轨道到概率：一条主线', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 46, 178, 176, '① 经典轨道', { tone: 'mint' }),
      P('M 48 192 C 76 138, 120 104, 188 96', { tone: 'mint', weight: 2 }),
      DOT(48, 192, { r: 3, tone: 'mint' }),
      DOT(188, 96, { r: 3, tone: 'mint' }),
      T(42, 214, '初值定出唯一轨迹', { size: 9.5, tone: 'muted' }),
      T(42, 232, '每时刻位置都确定', { size: 9.5, tone: 'faint' }),
      ...PANEL(228, 46, 178, 176, '② 概率幅 ψ', { tone: 'violet' }),
      C(317, 126, 34, { tone: 'violet', dash: true }),
      A(317, 126, 341, 102, { tone: 'violet', weight: 1.8 }),
      T(348, 98, '|ψ|', { size: 10.5, tone: 'violet' }),
      T(330, 148, 'θ', { size: 10.5, tone: 'violet' }),
      T(242, 214, '复值：振幅加相位', { size: 9.5, tone: 'muted' }),
      T(242, 232, '线性叠加仍允许', { size: 9.5, tone: 'faint' }),
      ...PANEL(428, 46, 184, 176, '③ 概率密度', { tone: 'cyan' }),
      L(446, 192, 592, 192, { tone: 'dim' }),
      CURVE((x) => Math.exp(-((x - 100) ** 2) / 1600), { x: 446, y: 96, w: 146, h: 96 }, [0, 146], [0, 1.05], {
        tone: 'cyan',
        steps: 80
      }),
      T(446, 214, '|ψ|² 才是可测量', { size: 9.5, tone: 'muted' }),
      T(446, 232, '归一化后总概率为 1', { size: 9.5, tone: 'faint' }),
      T(320, 252, 'ψ → |ψ|² → 归一化 → ⟨A⟩', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 274, '复概率幅经由模平方变成可比较的平均', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '2.1/0-0',
      '经典轨迹与双缝干涉',
      '经典理论能追踪确定轨迹；电子逐个通过双缝，只累积出干涉条纹，逼迫我们放弃“经过哪条缝”的问题。',
      [
        T(320, 24, '经典轨迹与双缝干涉', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 48, 268, 174, '经典：轨迹可追踪', { tone: 'mint' }),
        P('M 48 196 C 84 132, 148 108, 276 150', { tone: 'mint', weight: 2 }),
        DOT(48, 196, { r: 3, tone: 'mint' }),
        DOT(276, 150, { r: 3, tone: 'mint' }),
        A(48, 196, 84, 160, { tone: 'violet', weight: 1.3 }),
        T(96, 86, '每时刻位置确定', { size: 9.5, tone: 'muted' }),
        T(42, 238, '初值 (r₀, v₀)', { size: 9.5, tone: 'mint' }),
        ...PANEL(344, 48, 268, 174, '量子：只有干涉条纹', { tone: 'violet' }),
        L(400, 70, 400, 190, { tone: 'cyan' }),
        BAND(396, 98, 8, 16, { tone: 'dim', opacity: 0.7 }),
        BAND(396, 144, 8, 16, { tone: 'dim', opacity: 0.7 }),
        L(400, 106, 552, 120, { tone: 'mint', dash: true }),
        L(400, 152, 552, 120, { tone: 'violet', dash: true }),
        L(552, 66, 552, 204, { tone: 'dim' }),
        ...[0, 1, 2, 3, 4].map((i) =>
          BAND(546, 74 + i * 24, 6, i % 2 === 0 ? 12 : 5, { tone: 'cyan', opacity: i % 2 === 0 ? 0.55 : 0.2 })
        ),
        T(430, 238, '无法说经过哪条缝', { size: 9.5, tone: 'muted' }),
        T(320, 252, '量子力学放弃连续轨迹', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '只保留重复实验累积的分布', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '2.1/0-1',
      '叠加：两个态合成新态',
      '$\\psi_1$ 与 $\\psi_2$ 都是允许的态；线性组合仍是允许态，相对相位决定合成波加强还是削弱。',
      [
        T(320, 26, '两个态相加，仍是允许的态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(90, 44, '同频、相位差约 2.1 rad', { size: 9.5, tone: 'muted' }),
        L(96, 86, 570, 86, { tone: 'dim', dash: true }),
        CURVE((x) => Math.sin(x / 40), { x: 96, y: 58, w: 470, h: 56 }, [0, 470], [-1.3, 1.3], { tone: 'mint', steps: 120 }),
        T(44, 90, 'ψ₁', { size: 11, tone: 'mint' }),
        L(96, 150, 570, 150, { tone: 'dim', dash: true }),
        CURVE((x) => 0.75 * Math.sin(x / 40 + 2.1), { x: 96, y: 122, w: 470, h: 56 }, [0, 470], [-1.3, 1.3], {
          tone: 'violet',
          dash: true,
          steps: 120
        }),
        T(44, 154, 'ψ₂', { size: 11, tone: 'violet' }),
        L(96, 222, 570, 222, { tone: 'dim', dash: true }),
        CURVE((x) => Math.sin(x / 40) + 0.75 * Math.sin(x / 40 + 2.1), { x: 96, y: 194, w: 470, h: 56 }, [0, 470], [-1.3, 1.3], {
          tone: 'amber',
          weight: 1.8,
          steps: 120
        }),
        T(44, 226, 'ψ', { size: 11, tone: 'amber' }),
        T(320, 258, '相对相位决定相长或相消', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '系数与相位一起决定合成结果', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '2.1/0-2',
      '波函数不回答位置，只回答概率',
      '单次测量只落在一个点；重复制备并测量，离散点阵才显出 $|\\psi|^2$ 的轮廓。',
      [
        T(320, 24, '波函数不回答位置，只回答概率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 58, w: 516, h: 178 }, { xLabel: 'x', yLabel: '计数', tone: 'dim' }),
        ...[22, 36, 54, 76, 96, 104, 90, 72, 50, 32].map((h, i) =>
          BAND(92 + i * 46, 236 - h, 24, h, { tone: 'mint', opacity: 0.22, r: 2 })
        ),
        CURVE((x) => Math.exp(-((x - 270) ** 2) / 11000), { x: 64, y: 58, w: 516, h: 178 }, [0, 516], [0, 1.05], {
          tone: 'cyan',
          steps: 120
        }),
        DOT(150, 206, { r: 2.4, tone: 'amber' }),
        DOT(196, 186, { r: 2.4, tone: 'amber' }),
        DOT(242, 160, { r: 2.4, tone: 'amber' }),
        DOT(288, 140, { r: 2.4, tone: 'amber' }),
        DOT(334, 150, { r: 2.4, tone: 'amber' }),
        DOT(380, 172, { r: 2.4, tone: 'amber' }),
        DOT(426, 196, { r: 2.4, tone: 'amber' }),
        T(78, 78, '单次：一个点', { size: 9.5, tone: 'cyan' }),
        T(388, 78, '多次：轮廓显现', { size: 9.5, tone: 'mint' }),
        T(56, 162, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 82, '1.0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 240, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 252, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(193, 252, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(322, 252, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(451, 252, '15', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(580, 252, '20', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '重复测量才显出 |ψ|² 的轮廓', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '2.1/1-0',
      '概率密度不是概率',
      '$|\\psi|^2$ 是单位体积的概率；窄区域密度高未必概率大，宽区域密度低也可能概率大。',
      [
        T(320, 24, '概率密度高，不等于概率大', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 54, w: 510, h: 170 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
        CURVE(
          (x) => 0.28 + 0.62 * Math.exp(-((x - 103) ** 2) / 700) + 0.26 * Math.exp(-((x - 326) ** 2) / 7000),
          { x: 64, y: 54, w: 510, h: 170 },
          [0, 510],
          [0, 1.05],
          { tone: 'mint', steps: 120 }
        ),
        BAND(150, 80, 34, 144, { tone: 'cyan', opacity: 0.18 }),
        BAND(330, 138, 120, 86, { tone: 'amber', opacity: 0.16 }),
        L(150, 224, 150, 76, { tone: 'cyan', dash: true }),
        L(184, 224, 184, 76, { tone: 'cyan', dash: true }),
        L(330, 224, 330, 134, { tone: 'amber', dash: true }),
        L(450, 224, 450, 134, { tone: 'amber', dash: true }),
        T(167, 92, 'V₁ 窄而高', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(390, 138, 'V₂ 宽而低', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(70, 262, 'P(V₁) 小', { size: 10, tone: 'cyan' }),
        T(250, 262, 'P(V₂) 大', { size: 10, tone: 'amber' }),
        T(440, 262, '概率 = 密度积分', { size: 10, tone: 'muted' }),
        T(320, 280, '密度是局域量，概率要看积分范围', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '2.1/1-1',
      '归一化与全局相位',
      '各区域概率相加必须等于一；整体乘上 $e^{i\\alpha}$ 只转动相位，不改变任何概率。',
      [
        T(320, 24, '归一化与全局相位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 320, 164, '总概率 = 1', { tone: 'mint' }),
        BAND(54, 124, 112, 34, { tone: 'mint', opacity: 0.3, r: 3 }),
        BAND(166, 124, 98, 34, { tone: 'violet', opacity: 0.3, r: 3 }),
        BAND(264, 124, 70, 34, { tone: 'cyan', opacity: 0.3, r: 3 }),
        T(110, 114, '0.40', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(215, 114, '0.35', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(299, 114, '0.25', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(194, 188, '0.40 + 0.35 + 0.25 = 1', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(356, 132, '=', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(372, 50, 236, 164, '全局相位', { tone: 'violet' }),
        C(490, 128, 36, { tone: 'violet', dash: true }),
        A(490, 128, 514, 102, { tone: 'violet', weight: 1.8 }),
        T(526, 98, 'e^{iα}', { size: 10.5, tone: 'violet' }),
        T(490, 190, '|ψ|² 不变', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 246, '归一化固定幅度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '全局相位不改变物理状态', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '2.1/1-2',
      '平方可积：波包可以，平面波不行',
      '局域波包在远处迅速衰减，积分有限；理想平面波处处等幅，积分随范围无限增长。',
      [
        T(320, 24, '平方可积：波包可以，平面波不行', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 50, 272, 168, '波包：可归一化', { tone: 'mint' }),
        L(46, 192, 286, 192, { tone: 'dim' }),
        CURVE((x) => Math.exp(-((x - 120) ** 2) / 2200), { x: 46, y: 74, w: 240, h: 118 }, [0, 240], [0, 1.05], {
          tone: 'mint',
          steps: 100
        }),
        T(160, 210, '远处迅速衰减', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(42, 238, '∫|ψ|² dx 有限', { size: 10, tone: 'mint' }),
        ...PANEL(340, 50, 272, 168, '平面波：不可归一化', { tone: 'danger' }),
        L(358, 192, 594, 192, { tone: 'dim' }),
        L(358, 78, 594, 78, { tone: 'danger', dash: true, opacity: 0.4 }),
        L(358, 158, 594, 158, { tone: 'danger', dash: true, opacity: 0.4 }),
        CURVE((x) => Math.sin(x / 14), { x: 358, y: 78, w: 236, h: 114 }, [0, 236], [-1.1, 1.1], {
          tone: 'danger',
          steps: 110
        }),
        T(476, 68, '振幅处处不减', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        T(356, 238, '积分随范围发散', { size: 10, tone: 'danger' }),
        T(320, 262, '只有平方可积的函数才能描述单粒子', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '理想平面波只是有用的基元', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '2.1/2-0',
      '位置平均：密度加权求重心',
      '$\\langle x\\rangle=\\int x\\,|\\psi|^2\\,d^3r$：把每一点的 x 按概率密度加权，得到平均位置。',
      [
        T(320, 24, '位置平均：密度加权求重心', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 76, y: 56, w: 320, h: 168 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
        CURVE((x) => Math.exp(-((x - 165) ** 2) / 6000), { x: 76, y: 56, w: 320, h: 168 }, [0, 320], [0, 1.05], {
          tone: 'mint',
          steps: 110
        }),
        L(241, 224, 241, 74, { tone: 'amber', dash: true }),
        DOT(241, 74, { r: 3, tone: 'amber' }),
        T(241, 64, '⟨x⟩', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(90, 78, '密度加权的重心', { size: 9.5, tone: 'muted' }),
        T(68, 148, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(68, 76, '1.0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...PANEL(414, 52, 198, 172, '经典量 → 算符', { tone: 'violet' }),
        T(430, 86, 'x → x', { size: 10, tone: 'muted' }),
        T(430, 112, 'p → −iħ∇', { size: 10.5, tone: 'violet' }),
        T(430, 138, 'T → −ħ²∇²/2m', { size: 10, tone: 'violet' }),
        T(430, 168, '先换算符，再取平均', { size: 9.5, tone: 'muted' }),
        T(320, 250, '⟨x⟩ = ∫ x |ψ|² d³r', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '位置期望值就是概率分布的重心', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '2.1/2-1',
      '期待值是平均值，不是单次结果',
      '重复测量得到一组本征值，按概率 $|c_n|^2$ 加权才是期待值；单次测量只给出其中一个值。',
      [
        T(320, 24, '期待值是平均值，不是单次结果', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 58, w: 506, h: 166 }, { xLabel: 'a', yLabel: 'P', tone: 'dim' }),
        BAND(130, 197, 46, 27, { tone: 'mint', opacity: 0.4 }),
        BAND(240, 161, 46, 63, { tone: 'violet', opacity: 0.4 }),
        BAND(350, 179, 46, 45, { tone: 'cyan', opacity: 0.4 }),
        BAND(460, 209, 46, 15, { tone: 'amber', opacity: 0.4 }),
        T(153, 190, '0.18', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(263, 154, '0.42', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(373, 172, '0.30', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(483, 202, '0.10', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(153, 240, 'a₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(263, 240, 'a₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(373, 240, 'a₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(483, 240, 'a₄', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(298, 200, 298, 120, { tone: 'amber', dash: true }),
        T(298, 112, '⟨A⟩', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(78, 78, '|cₙ|² 加权', { size: 9.5, tone: 'mint' }),
        T(56, 153, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 78, '1.0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(320, 266, '单次只给一个本征值，平均才叫期待值', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '2.1/2-2',
      '期待值跟随经典运动',
      '埃伦费斯特定理给出 $\\langle x\\rangle$ 与 $\\langle p\\rangle$ 的演化方程；宏观极限下，概率平均回到牛顿轨迹。',
      [
        T(320, 24, '期待值跟随经典运动', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 66, y: 56, w: 340, h: 166 }, { xLabel: 't', yLabel: '⟨x⟩', tone: 'dim' }),
        CURVE((x) => 15 + x / 4, { x: 66, y: 56, w: 340, h: 166 }, [0, 340], [0, 110], { tone: 'mint', weight: 2, steps: 60 }),
        DOT(186, 129, { r: 3, tone: 'mint' }),
        DOT(306, 84, { r: 3, tone: 'mint' }),
        DOT(406, 71, { r: 3, tone: 'mint' }),
        T(106, 132, '⟨x⟩(t)', { size: 10, tone: 'mint' }),
        T(250, 88, '经典轨迹', { size: 9.5, tone: 'amber' }),
        T(70, 78, '直线：匀速前进', { size: 9.5, tone: 'muted' }),
        ...PANEL(426, 54, 186, 168, '宏观极限', { tone: 'cyan' }),
        T(442, 84, '⟨x⟩、⟨p⟩ 按经典演化', { size: 9.5, tone: 'cyan' }),
        T(442, 110, '量子 = 概率平均', { size: 9.5, tone: 'muted' }),
        T(442, 136, '单次仍随机', { size: 9.5, tone: 'muted' }),
        T(442, 162, '宏观 → 牛顿方程', { size: 9.5, tone: 'muted' }),
        T(442, 188, '埃伦费斯特定理', { size: 9.5, tone: 'faint' }),
        T(320, 248, '期待值跟随经典运动', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '量子并不排斥经典图像', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '2.1/0-0-f',
      'ψ = |ψ|e^{iθ}：模与相位',
      '$\\psi=|\\psi|e^{i\\theta}$：模给出振幅，相位是复平面上的转角；整体转动不改变任何概率。',
      [
        T(320, 24, 'ψ = |ψ|e^{iθ}：模与相位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(90, 164, 410, 164, { tone: 'dim' }),
        A(398, 164, 418, 164, { tone: 'dim' }),
        L(250, 238, 250, 56, { tone: 'dim' }),
        A(250, 70, 250, 52, { tone: 'dim' }),
        T(422, 168, 'Re', { size: 10, tone: 'dim' }),
        T(250, 44, 'Im', { size: 10, tone: 'dim', anchor: 'middle' }),
        C(250, 164, 72, { tone: 'violet', dash: true }),
        A(250, 164, 299, 111, { tone: 'mint', weight: 2 }),
        L(299, 111, 299, 164, { tone: 'dim', dash: true }),
        L(250, 111, 299, 111, { tone: 'dim', dash: true }),
        P('M 286 164 A 36 36 0 0 0 275 138', { tone: 'amber' }),
        T(292, 150, 'θ', { size: 11, tone: 'amber' }),
        T(306, 102, '|ψ|', { size: 10.5, tone: 'mint' }),
        DOT(299, 111, { r: 3, tone: 'mint' }),
        T(64, 96, '模定大小', { size: 10, tone: 'muted' }),
        T(64, 118, '相位定方向', { size: 10, tone: 'muted' }),
        ...PANEL(432, 62, 168, 150, '读法', { tone: 'mint' }),
        T(446, 92, '|ψ| ≥ 0：振幅', { size: 9.5, tone: 'mint' }),
        T(446, 118, 'θ：复平面转角', { size: 9.5, tone: 'amber' }),
        T(446, 144, 'θ 加 2π：同一态', { size: 9.5, tone: 'muted' }),
        T(446, 170, '整体转动不改概率', { size: 9.5, tone: 'faint' }),
        T(446, 196, '相对相位才有干涉', { size: 9.5, tone: 'violet' }),
        T(320, 252, '模给振幅，相位给转角', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'e^{iθ} 在复平面上转一圈', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '2.1/0-1-f',
      '线性组合仍是允许的态',
      '$\\psi=c_1\\psi_1+c_2\\psi_2$：系数可取复数，决定权重与相对相位；$c_2=0$ 时退回单个态。',
      [
        T(320, 24, 'c₁ψ₁ + c₂ψ₂：系数定权重与相位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 60, w: 300, h: 172 }, { xLabel: 'ψ₁', yLabel: 'ψ₂', tone: 'dim' }),
        A(80, 232, 300, 232, { tone: 'mint', weight: 2 }),
        A(80, 232, 80, 100, { tone: 'violet', weight: 2 }),
        L(300, 232, 300, 100, { tone: 'dim', dash: true }),
        L(80, 100, 300, 100, { tone: 'dim', dash: true }),
        DOT(300, 100, { r: 3, tone: 'amber' }),
        T(300, 252, 'c₁', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(64, 104, 'c₂', { size: 10.5, tone: 'violet', anchor: 'end' }),
        T(308, 92, 'ψ', { size: 10, tone: 'amber' }),
        T(90, 74, '系数可复', { size: 9.5, tone: 'muted' }),
        ...PANEL(410, 56, 192, 166, '两个极限', { tone: 'violet' }),
        T(424, 86, 'c₂ = 0 → 只剩 ψ₁', { size: 9.5, tone: 'mint' }),
        T(424, 112, 'c₁ = 0 → 只剩 ψ₂', { size: 9.5, tone: 'violet' }),
        T(424, 138, '|c₁|²+|c₂|² = 1', { size: 9.5, tone: 'cyan' }),
        T(424, 164, '相对相位 → 干涉', { size: 9.5, tone: 'amber' }),
        T(424, 190, '线性组合仍允许', { size: 9.5, tone: 'muted' }),
        T(320, 246, '线性组合仍是同一空间里的态', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '系数决定权重，相位决定强弱', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '2.1/1-0-f',
      'P(V) = ∫_V |ψ|² d³r：密度在体积上积分',
      '$P(V,t)=\\int_V|\\psi(\\mathbf r,t)|^2\\,d^3r$：$V$ 越小越接近密度，$V$ 取全空间则回到 1。',
      [
        T(320, 24, '区域概率：密度在体积上积分', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 56, w: 350, h: 168 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
        CURVE(
          (x) => 0.55 * Math.exp(-((x - 120) ** 2) / 1200) + 0.3 * Math.exp(-((x - 260) ** 2) / 8000),
          { x: 64, y: 56, w: 350, h: 168 },
          [0, 350],
          [0, 0.8],
          { tone: 'mint', steps: 120 }
        ),
        BAND(200, 152, 70, 72, { tone: 'cyan', opacity: 0.22 }),
        L(200, 224, 200, 146, { tone: 'cyan', dash: true }),
        L(270, 224, 270, 146, { tone: 'cyan', dash: true }),
        T(235, 140, 'V', { size: 11, tone: 'cyan', anchor: 'middle' }),
        T(235, 216, '阴影 = P(V)', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(56, 148, '0.4', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 60, '0.8', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 240, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(181, 240, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(298, 240, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(414, 240, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(470, 220, 470, 70, { tone: 'dim' }),
        A(470, 82, 470, 66, { tone: 'dim' }),
        L(466, 146, 474, 146, { tone: 'dim' }),
        T(482, 74, 'P', { size: 10, tone: 'dim' }),
        T(462, 224, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(462, 150, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(462, 76, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(482, 106, 'V → 全空间：P → 1', { size: 9.5, tone: 'mint' }),
        T(482, 132, '小区域：P ≈ |ψ|²dV', { size: 9.5, tone: 'muted' }),
        T(482, 158, '密度是局域量', { size: 9.5, tone: 'faint' }),
        T(320, 262, '窄区域密度高，概率未必大', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 280, '积分范围决定概率大小', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '2.1/1-1-f',
      '∫|ψ|² d³r = 1：归一化定死幅度',
      '$\\int|\\psi|^2\\,d^3r=1$：只有总面积为一的幅度才被接受；整体相位仍完全自由。',
      [
        T(320, 24, '归一化把整体幅度定死', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 56, w: 360, h: 168 }, { xLabel: 'x', yLabel: '|ψ|²', tone: 'dim' }),
        CURVE((x) => 1.9 * Math.exp(-((x - 180) ** 2) / 7000), { x: 64, y: 56, w: 360, h: 168 }, [0, 360], [0, 2.2], {
          tone: 'muted',
          dash: true,
          steps: 120
        }),
        CURVE((x) => Math.exp(-((x - 180) ** 2) / 7000), { x: 64, y: 56, w: 360, h: 168 }, [0, 360], [0, 2.2], {
          tone: 'mint',
          steps: 120
        }),
        T(74, 80, '未归一：面积过大', { size: 9.5, tone: 'muted' }),
        T(74, 104, '归一后：面积 = 1', { size: 9.5, tone: 'mint' }),
        A(430, 80, 430, 140, { tone: 'amber' }),
        T(442, 110, 'A 由面积定', { size: 10, tone: 'amber' }),
        T(442, 160, '整体相位 e^{iα} 仍自由', { size: 9.5, tone: 'muted' }),
        T(442, 186, '发散 ⇒ 不可归一化', { size: 9.5, tone: 'faint' }),
        T(56, 152, '1.0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 76, '2.0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 240, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(154, 240, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(244, 240, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(334, 240, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(424, 240, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '调整 A，使总面积等于 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 280, '相位不参与归一化', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '2.1/2-0-f',
      '⟨A⟩ = ∫ ψ*Âψ d³r：夹住算符再积分',
      '$\\langle A\\rangle=\\int\\psi^*\\hat A\\psi\\,d^3r$：左边取共轭，中间作用算符，积分给出实数平均。',
      [
        T(320, 24, '期待值 = 波函数夹住算符', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(36, 102, '∫', { size: 13, tone: 'dim', anchor: 'middle' }),
        BAND(56, 72, 110, 42, { tone: 'violet', opacity: 0.22, r: 6 }),
        T(111, 99, 'ψ*', { size: 12, tone: 'violet', anchor: 'middle' }),
        T(184, 100, 'Â', { size: 13, tone: 'amber', anchor: 'middle' }),
        BAND(204, 72, 110, 42, { tone: 'mint', opacity: 0.22, r: 6 }),
        T(259, 99, 'ψ', { size: 12, tone: 'mint', anchor: 'middle' }),
        T(326, 100, 'd³r', { size: 11, tone: 'dim' }),
        T(360, 100, '=', { size: 12, tone: 'text' }),
        T(382, 100, '实数', { size: 11.5, tone: 'cyan' }),
        L(70, 160, 566, 160, { tone: 'dim' }),
        A(554, 160, 574, 160, { tone: 'dim' }),
        L(120, 160, 120, 156, { tone: 'dim' }),
        L(240, 160, 240, 156, { tone: 'dim' }),
        L(360, 160, 360, 156, { tone: 'dim' }),
        L(480, 160, 480, 156, { tone: 'dim' }),
        DOT(120, 160, { r: 3, tone: 'cyan' }),
        DOT(240, 160, { r: 3, tone: 'cyan' }),
        DOT(360, 160, { r: 3, tone: 'cyan' }),
        DOT(480, 160, { r: 3, tone: 'cyan' }),
        T(120, 178, 'a₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(240, 178, 'a₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(360, 178, 'a₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(480, 178, 'a₄', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(300, 152, 300, 124, { tone: 'amber', weight: 1.4 }),
        T(300, 116, '⟨A⟩', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(70, 104, 'Â 的本征值谱', { size: 10, tone: 'dim' }),
        T(70, 208, 'Â = 1 ⇒ ⟨A⟩ = 1', { size: 10, tone: 'muted' }),
        T(300, 208, 'Â = x ⇒ ⟨x⟩', { size: 10, tone: 'muted' }),
        T(70, 234, '积分把局部贡献累加成平均值', { size: 10.5, tone: 'text' }),
        T(70, 258, '单次测量只落在某个本征值上', { size: 10, tone: 'faint' }),
        T(320, 278, '重复测量才得到期待值', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '2.1/2-1-f',
      '⟨p⟩ = −iħ∫ψ*∇ψ d³r：动量期待值',
      '$\\langle\\mathbf p\\rangle=-i\\hbar\\int\\psi^*\\nabla\\psi\\,d^3r$：对平面波给出 $\\hbar\\mathbf k$，与经典 $m\\mathbf v$ 对应。',
      [
        T(320, 24, '动量期待值：梯度算符', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 54, w: 360, h: 150 }, { xLabel: 'x', yLabel: 'ψ', tone: 'dim' }),
        CURVE((x) => Math.sin(x / 22), { x: 64, y: 54, w: 360, h: 150 }, [0, 360], [-1.2, 1.2], { tone: 'mint', steps: 120 }),
        A(120, 222, 300, 222, { tone: 'amber', weight: 1.4 }),
        T(210, 240, '波前推进方向', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(420, 80, '−iħ∇：动量算符', { size: 9.5, tone: 'violet' }),
        T(420, 104, '∇ 测空间变化率', { size: 9.5, tone: 'muted' }),
        T(420, 128, '平面波 ⇒ ⟨p⟩ = ħk', { size: 9.5, tone: 'mint' }),
        T(420, 152, 'k = 0 ⇒ ⟨p⟩ = 0', { size: 9.5, tone: 'muted' }),
        T(420, 176, '反向 k ⇒ 负动量', { size: 9.5, tone: 'amber' }),
        T(420, 200, '对应经典 p = mv', { size: 9.5, tone: 'muted' }),
        T(420, 224, '∇ 越陡，动量越大', { size: 9.5, tone: 'faint' }),
        T(320, 258, '动量期待值是概率加权的平均', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '单次测量给出某个本征值', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
