import { fig, T, R, BAND, L, A, DOT, P, CURVE, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '7.3/overview',
    '连续谱：用 δ 函数重新归一',
    '动量本征函数是平面波，无法平方归一；改用 δ 函数归一后，求和换成积分，概率变成概率密度。',
    [
      T(320, 24, '连续谱：用 δ 函数重新归一', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(30, 42, 180, 196, '平面波', { tone: 'mint' }),
      L(46, 190, 194, 190, { tone: 'dim' }),
      CURVE((x) => Math.cos(2 * Math.PI * x), { x: 46, y: 100, w: 148, h: 70 }, [0, 1], [-1.2, 1.2], {
        tone: 'mint',
        weight: 1.8
      }),
      T(120, 84, 'exp(ikx)', { size: 10, tone: 'mint', anchor: 'middle' }),
      T(46, 202, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(194, 202, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(48, 218, '遍布全空间', { size: 9.5, tone: 'muted' }),
      T(48, 232, '面积无限 ⇒ 不可归一', { size: 9.5, tone: 'danger' }),
      ...PANEL(224, 42, 180, 196, 'δ 归一', { tone: 'violet' }),
      L(240, 190, 386, 190, { tone: 'dim' }),
      P('M240 190 L 300 190 L 310 96 L 320 190 L 386 190', { tone: 'violet', weight: 2 }),
      T(310, 84, 'δ(k−k′)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(238, 202, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(240, 218, '不同 k 互不重叠', { size: 9.5, tone: 'muted' }),
      T(240, 232, '内积是一个分布', { size: 9.5, tone: 'faint' }),
      ...PANEL(418, 42, 190, 196, '换基', { tone: 'amber' }),
      A(440, 116, 584, 116, { tone: 'amber' }),
      A(584, 152, 440, 152, { tone: 'cyan' }),
      T(512, 102, 'ψ(x)', { size: 10, tone: 'amber', anchor: 'middle' }),
      T(512, 134, '1/√2π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(512, 170, 'φ(k)', { size: 10, tone: 'cyan', anchor: 'middle' }),
      T(432, 202, '傅里叶变换 = 换基', { size: 9.5, tone: 'amber' }),
      T(432, 222, '求和变成积分', { size: 9.5, tone: 'faint' }),
      T(320, 256, '连续谱：不归一化到 1，而归一化到 δ', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 273, '求和换积分，概率换密度', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '7.3/0-0',
      '平面波是动量本征态',
      '动量算符 $\\hat p=-i\\hbar\\,d/dx$ 作用在 $e^{ikx}$ 上只取出一个系数 $\\hbar k$；$k$ 取任意实数，本征值连续分布。',
      [
        T(320, 24, '平面波是动量本征态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(30, 44, 250, 186, '本征函数', { tone: 'mint' }),
        L(46, 135, 266, 135, { tone: 'dim' }),
        A(254, 135, 266, 135, { tone: 'dim' }),
        CURVE((x) => Math.cos(2 * Math.PI * 2.5 * x), { x: 46, y: 104, w: 220, h: 62 }, [0, 1], [-1.2, 1.2], {
          tone: 'mint',
          weight: 1.9
        }),
        A(60, 116, 140, 116, { tone: 'amber', weight: 1.2 }),
        T(100, 106, 'λ = 2π/k', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(46, 147, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(270, 131, 'x', { size: 9.5, tone: 'muted' }),
        T(46, 222, '实部画出来是余弦', { size: 9.5, tone: 'muted' }),
        A(288, 130, 326, 130, { tone: 'dim' }),
        T(306, 118, 'p̂', { size: 10, tone: 'violet', anchor: 'middle' }),
        ...PANEL(334, 44, 274, 186, '本征值', { tone: 'violet' }),
        T(352, 78, 'p = ħk', { size: 12, tone: 'violet' }),
        L(352, 140, 590, 140, { tone: 'dim' }),
        A(578, 140, 590, 140, { tone: 'dim' }),
        [368, 392, 416, 440, 464, 488, 512, 536, 564].map((x) => DOT(x, 140, { r: 2.6, tone: 'violet' })),
        T(352, 162, 'k 取任意实数 ⇒ 谱连续', { size: 9.5, tone: 'muted' }),
        T(352, 184, 'ħk 随之连续变化', { size: 9.5, tone: 'faint' }),
        T(352, 208, 'exp(ikx) 就是本征态', { size: 9.5, tone: 'cyan' }),
        T(320, 252, '对任意实数 k 都成立', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '本征值是一整段实轴', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '7.3/0-1',
      '不能归一：积分发散',
      '平面波的模处处为 1：$\\int|e^{ikx}|^2dx=\\int dx$ 发散；它描述的是理想化的、空间上无限延展的粒子。',
      [
        T(320, 24, '不能归一：积分发散', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(50, 196, 590, 196, { tone: 'dim' }),
        A(578, 196, 590, 196, { tone: 'dim' }),
        BAND(50, 112, 540, 84, { tone: 'mint', opacity: 0.14 }),
        L(50, 112, 590, 112, { tone: 'mint', weight: 2 }),
        T(320, 98, '|exp(ikx)|² = 1，处处为 1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(50, 210, 'x₁', { size: 9.5, tone: 'muted' }),
        T(590, 210, 'x₂', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(320, 232, '宽度无限 ⇒ 面积无限', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        T(50, 254, '∫|exp(ikx)|²dx = ∫dx = ∞', { size: 10, tone: 'danger' }),
        T(50, 274, '物理上：无限延展的理想化', { size: 9.5, tone: 'muted' })
      ]
    ),
    '0-2': fig(
      '7.3/0-2',
      '换一把尺子：δ(k − k′)',
      '放弃平方可积，改用 $\\delta$ 函数归一：不同 $k$ 的平面波内积为零，相同 $k$ 时为无穷，面积为 1。',
      [
        T(320, 24, '换一把尺子：δ(k − k′)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(46, 146, 290, 146, { tone: 'dim' }),
        T(290, 160, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => Math.cos(2 * Math.PI * 4 * x), { x: 46, y: 116, w: 244, h: 60 }, [0, 1], [-1.4, 1.4], {
          tone: 'violet',
          weight: 1.6
        }),
        T(46, 92, 'k ≠ k′：振荡', { size: 9.5, tone: 'violet' }),
        T(46, 210, '正负抵消 ⇒ 0', { size: 9.5, tone: 'muted' }),
        T(46, 230, '但 k = k′ 时处处为 1', { size: 9.5, tone: 'faint' }),
        L(350, 182, 600, 182, { tone: 'dim' }),
        T(600, 196, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        P('M350 182 L 440 182 L 456 88 L 472 182 L 600 182', { tone: 'violet', weight: 2 }),
        T(456, 78, 'δ(k−k′)', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(350, 210, '峰高无穷、宽度为零', { size: 9.5, tone: 'muted' }),
        T(350, 230, '积分恰好是 1', { size: 9.5, tone: 'cyan' }),
        T(320, 254, '同一个积分，两种 k 取值两种命运', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'δ 函数把“无穷”装进一个符号', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '7.3/1-0',
      'δ(x−x′)：坐标的本征函数',
      '坐标算符作用在 $\\delta(x-x^{\\prime})$ 上等于乘以 $x^{\\prime}$；尖峰位置就是本征值，谱覆盖整条实轴。',
      [
        T(320, 24, 'δ(x−x′)：坐标的本征函数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 182, 200, 182, { tone: 'dim' }),
        P('M60 182 L 140 182 L 148 96 L 156 182 L 200 182', { tone: 'mint', weight: 1.8 }),
        T(120, 210, 'x·δ(x−x′)', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(230, 150, '=', { size: 13, tone: 'text', anchor: 'middle' }),
        L(280, 182, 420, 182, { tone: 'dim' }),
        P('M280 182 L 360 182 L 368 96 L 376 182 L 420 182', { tone: 'cyan', weight: 1.8 }),
        T(340, 210, 'x′·δ(x−x′)', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(450, 70, '在 x ≠ x′ 处：δ = 0', { size: 9.5, tone: 'muted' }),
        T(450, 94, '在 x = x′ 处：x 换成 x′', { size: 9.5, tone: 'muted' }),
        T(450, 124, 'x′ 只是一个数', { size: 9.5, tone: 'amber' }),
        T(450, 148, '所以 x′ 是本征值', { size: 10, tone: 'amber' }),
        T(450, 176, '尖峰位置 = 本征值', { size: 9.5, tone: 'cyan' }),
        T(450, 200, '谱：整条实轴，连续', { size: 9.5, tone: 'faint' }),
        T(320, 240, '两个表达式只在尖峰处非零', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '乘以 x 与乘以常数 x′ 效果相同', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '7.3/1-1',
      'ψ(x) = ⟨x|ψ⟩：波函数是投影',
      '位置表象波函数是态矢量在坐标基上的投影：$\\psi(x)=\\langle x|\\psi\\rangle$，它是一组连续分量的取值。',
      [
        T(320, 24, 'ψ(x) = ⟨x|ψ⟩：波函数是投影', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 220, 282, 220, { tone: 'dim' }),
        A(270, 220, 282, 220, { tone: 'dim' }),
        [86, 100, 114, 128, 142, 156, 170, 184, 198, 212, 226, 240, 254].flatMap((x) => [
          L(x, 220, x, 220 - Math.round(74 * Math.exp(-(((x - 170) / 52) ** 2))), { tone: 'mint', weight: 2 })
        ]),
        T(176, 236, '每条竖线是一个分量', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        ...PANEL(320, 52, 280, 180, '投影后', { tone: 'mint' }),
        L(338, 202, 582, 202, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.16) ** 2)), { x: 338, y: 100, w: 244, h: 102 }, [0, 1], [0, 1.02], {
          tone: 'mint',
          weight: 2
        }),
        T(338, 84, 'ψ(x)', { size: 10, tone: 'mint' }),
        T(338, 220, '连续的 x 给出连续分量', { size: 9.5, tone: 'muted' }),
        T(320, 258, '波函数不是概率，是分量', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '|ψ(x)|² 才是概率密度', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '7.3/1-2',
      '连续正交基：δ(x − x′)',
      '离散的 $\\delta_{mn}$ 在连续谱里变成 $\\delta(x-x^{\\prime})$：只有同一个 $x$ 才配得上，其余全为零。',
      [
        T(320, 24, '连续正交基：δ(x − x′)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(30, 48, 240, 170, '离散', { tone: 'violet' }),
        [0, 1, 2].flatMap((i) =>
          [0, 1, 2].map((j) => R(60 + 30 * j, 86 + 30 * i, 30, 30, { tone: i === j ? 'mint' : 'faint' }))
        ),
        [0, 1, 2].flatMap((i) => [BAND(60 + 30 * i, 86 + 30 * i, 30, 30, { tone: 'mint', opacity: 0.22 })]),
        [0, 1, 2].map((i) => T(75 + 30 * i, 101 + 30 * i, '1', { size: 9.5, tone: 'mint', anchor: 'middle' })),
        [0, 1, 2].flatMap((i) =>
          [0, 1, 2]
            .filter((j) => j !== i)
            .map((j) => T(75 + 30 * j, 101 + 30 * i, '0', { size: 9.5, tone: 'faint', anchor: 'middle' }))
        ),
        T(52, 204, 'δₘₙ：表里只有对角线', { size: 9.5, tone: 'muted' }),
        ...PANEL(300, 48, 300, 170, '连续', { tone: 'mint' }),
        R(345, 80, 150, 110, { tone: 'faint' }),
        L(345, 190, 495, 80, { tone: 'mint', weight: 3 }),
        T(505, 88, 'δ(x−x′)', { size: 9.5, tone: 'mint' }),
        T(345, 208, '只有对角线非零', { size: 9.5, tone: 'muted' }),
        T(320, 240, '求和 δₘₙ → 积分 δ(x−x′)', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(320, 264, '归一化对象从数变成分布', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '7.3/2-0',
      'ψ(x) 与 φ(k)：一对变换',
      '同一个态在两组基下的分量：$\\psi(x)$ 与 $\\varphi(k)$ 互为傅里叶变换，一个变窄另一个就变宽。',
      [
        T(320, 24, 'ψ(x) 与 φ(k)：一对变换', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(30, 48, 236, 164, '坐标空间', { tone: 'mint' }),
        L(48, 178, 250, 178, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.1) ** 2)), { x: 48, y: 98, w: 202, h: 80 }, [0, 1], [0, 1.02], {
          tone: 'mint',
          weight: 2
        }),
        T(48, 82, '局域在 x₀', { size: 9.5, tone: 'muted' }),
        T(48, 202, 'ψ(x)', { size: 10, tone: 'mint' }),
        T(250, 196, 'x', { size: 9.5, tone: 'dim' }),
        A(278, 110, 344, 110, { tone: 'amber' }),
        A(344, 142, 278, 142, { tone: 'cyan' }),
        T(310, 98, '1/√2π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(364, 48, 242, 164, '动量空间', { tone: 'cyan' }),
        L(382, 178, 588, 178, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.26) ** 2)), { x: 382, y: 98, w: 206, h: 80 }, [0, 1], [0, 1.02], {
          tone: 'cyan',
          weight: 2
        }),
        T(382, 82, '弥散在 k 上', { size: 9.5, tone: 'muted' }),
        T(382, 202, 'φ(k)', { size: 10, tone: 'cyan' }),
        T(588, 196, 'k', { size: 9.5, tone: 'dim' }),
        T(320, 238, '一对傅里叶变换：同一态的两种坐标', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, 'x 越窄，k 越宽；反之亦然', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '7.3/2-1',
      '|φ(k)|²dk：概率变成密度',
      '连续谱里 $|\\varphi(k)|^2dk$ 才是概率：动量落在 $(k,k+dk)$ 内的机会，等于该区间的面积。',
      [
        T(320, 24, '|φ(k)|²dk：概率变成密度', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 192, 570, 192, { tone: 'dim' }),
        A(558, 192, 570, 192, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.13) ** 2)), { x: 70, y: 104, w: 480, h: 88 }, [0, 1], [0, 1.02], {
          tone: 'cyan',
          weight: 2
        }),
        BAND(291, 116, 38, 76, { tone: 'amber', opacity: 0.28 }),
        T(340, 150, '条带面积 = 概率', { size: 9.5, tone: 'amber' }),
        T(70, 214, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 214, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(560, 214, 'k_max', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 238, '总面积为 1：∫|φ|²dk = 1', { size: 10, tone: 'mint' }),
        T(70, 262, '单点无宽度 ⇒ 单点概率为零', { size: 10, tone: 'muted' })
      ]
    ),
    '2-2': fig(
      '7.3/2-2',
      '单点概率为零，只能问区间',
      '离散谱里单个 $|c_n|^2$ 就是概率；连续谱里单点概率为零，只能对一段区间积分。',
      [
        T(320, 24, '单点概率为零，只能问区间', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(30, 46, 250, 164, '离散谱', { tone: 'violet' }),
        L(50, 188, 260, 188, { tone: 'dim' }),
        R(70, 142, 20, 46, { tone: 'violet', fill: true, opacity: 0.3 }),
        R(120, 128, 20, 60, { tone: 'violet', fill: true, opacity: 0.3 }),
        R(170, 158, 20, 30, { tone: 'violet', fill: true, opacity: 0.3 }),
        T(80, 204, 'a₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(130, 204, 'a₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(180, 204, 'a₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(50, 74, '单个 |cₙ|² 就是概率', { size: 9.5, tone: 'muted' }),
        ...PANEL(320, 46, 290, 164, '连续谱', { tone: 'cyan' }),
        L(340, 184, 590, 184, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.16) ** 2)), { x: 340, y: 112, w: 250, h: 72 }, [0, 1], [0, 1.02], {
          tone: 'cyan',
          weight: 2
        }),
        DOT(465, 112, { r: 3.4, tone: 'danger' }),
        T(465, 96, '单点：0', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        BAND(432, 124, 66, 60, { tone: 'cyan', opacity: 0.2 }),
        T(465, 206, '区间：非零', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(340, 74, '只有区间才有概率', { size: 9.5, tone: 'muted' }),
        T(320, 236, '连续谱只能问“落在哪一段”', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '概率密度 × 区间长度 = 概率', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '这是求和换积分后的必然结果', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '7.3/0-0-f',
      '本征方程：p̂ 只提出系数 ħk',
      '$\\hat p\\,e^{ikx}=\\hbar k\\,e^{ikx}$：求导只带出 $ik$，乘上 $-i\\hbar$ 得 $\\hbar k$；$k$ 任意实数，谱连续。',
      [
        T(320, 24, '本征方程：p̂ 只提出系数 ħk', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 50, 150, 28, { tone: 'violet', opacity: 0.2, r: 5 }),
        T(115, 69, 'p̂ exp(ikx)', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(202, 69, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(216, 50, 160, 28, { tone: 'mint', opacity: 0.2, r: 5 }),
        T(296, 69, 'ħk · exp(ikx)', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(400, 60, 'p = ħk = h/λ', { size: 10.5, tone: 'amber' }),
        T(400, 82, 'k 越大，动量越大', { size: 9.5, tone: 'muted' }),
        L(60, 156, 300, 156, { tone: 'dim' }),
        A(288, 156, 300, 156, { tone: 'dim' }),
        CURVE((x) => Math.cos(2 * Math.PI * 2 * x), { x: 60, y: 124, w: 240, h: 64 }, [0, 1], [-1.2, 1.2], {
          tone: 'mint',
          weight: 1.8
        }),
        A(70, 96, 190, 96, { tone: 'cyan', weight: 1.2 }),
        T(130, 86, 'λ = 2π/k', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(60, 172, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 172, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 120, 'p̂ = −iħ d/dx：一次求导', { size: 9.5, tone: 'muted' }),
        T(330, 142, '求导只把系数 ħk 提出来', { size: 9.5, tone: 'muted' }),
        T(330, 168, 'k 可为负：反向传播', { size: 9.5, tone: 'faint' }),
        T(330, 192, 'k → 0：常数态，p = 0', { size: 9.5, tone: 'amber' }),
        T(330, 216, 'k 取任意实数 ⇒ 谱连续', { size: 10, tone: 'cyan' }),
        T(320, 252, '本征值是一串连续实数', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '这是“连续谱”的第一个例子', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '7.3/0-1-f',
      '正交关系：2πδ(k − k′)',
      '$\\int e^{i(k-k^{\\prime})x}dx=2\\pi\\delta(k-k^{\\prime})$：$k=k^{\\prime}$ 时被积函数恒为 1，积分发散，δ 峰把无穷吸收进来。',
      [
        T(320, 24, '正交关系：2πδ(k − k′)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 52, 220, 28, { tone: 'mint', opacity: 0.2, r: 5 }),
        T(146, 71, '∫exp(i(k−k′)x)dx', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(268, 71, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(282, 52, 150, 28, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(357, 71, '2πδ(k−k′)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(442, 58, 'k = k′：被积函数恒为 1', { size: 9.5, tone: 'muted' }),
        T(442, 80, 'δ 峰吸收无穷', { size: 9.5, tone: 'amber' }),
        BAND(70, 116, 180, 30, { tone: 'faint', opacity: 0.2 }),
        T(160, 136, 'k ≠ k′ ⇒ 0', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(70, 160, '振荡互相抵消', { size: 9.5, tone: 'faint' }),
        BAND(300, 116, 180, 30, { tone: 'violet', opacity: 0.22 }),
        T(390, 136, 'k = k′ ⇒ ∞', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(300, 160, '但面积为 2π', { size: 9.5, tone: 'amber' }),
        P('M486 196 L 540 196 L 552 108 L 564 196 L 598 196', { tone: 'violet', weight: 2 }),
        T(552, 98, 'δ', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(70, 196, '2π 不是随手写的：来自 ∫dx 的尺度', { size: 10, tone: 'muted' }),
        T(320, 244, '正交关系变成“一个峰”', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, 'k ≠ k′ 时为零，k = k′ 时无穷', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '7.3/0-2-f',
      'δ 归一：内积不再是一个数',
      '$\\langle k|k^{\\prime}\\rangle=\\delta(k-k^{\\prime})$：离散的 $\\delta_{mn}$ 换成狄拉克 δ，内积可以是无穷，面积恒为 1。',
      [
        T(320, 24, 'δ 归一：内积不再是一个数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 54, 220, 30, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(170, 74, '⟨k|k′⟩ = δ(k−k′)', { size: 11, tone: 'mint', anchor: 'middle' }),
        ...PANEL(50, 108, 240, 104, '离散', { tone: 'cyan' }),
        T(68, 146, '⟨m|n⟩ = δₘₙ', { size: 10, tone: 'cyan' }),
        T(68, 172, '取值 1 或 0', { size: 9.5, tone: 'muted' }),
        ...PANEL(330, 108, 250, 104, '连续', { tone: 'violet' }),
        T(348, 146, '⟨k|k′⟩ = δ(k−k′)', { size: 10, tone: 'violet' }),
        T(348, 172, '取值 ∞ 或 0', { size: 9.5, tone: 'muted' }),
        T(50, 236, '相同的只有“只跟自己配”这一条', { size: 9.5, tone: 'muted' }),
        T(50, 258, '归一化的对象从数变成了分布', { size: 9.5, tone: 'amber' }),
        T(320, 274, 'δ 是这套语言的语法符号', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '7.3/1-0-f',
      '坐标本征：尖峰位置就是 x′',
      '$\\hat x\\,\\delta(x-x^{\\prime})=x^{\\prime}\\,\\delta(x-x^{\\prime})$：除 $x=x^{\\prime}$ 外两边都是零，尖峰处乘 $x$ 等于乘常数 $x^{\\prime}$。',
      [
        T(320, 24, '坐标本征：尖峰位置就是 x′', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 52, 200, 30, { tone: 'mint', opacity: 0.2, r: 5 }),
        T(136, 72, 'x̂ δ(x−x′)', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(254, 72, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(270, 52, 190, 30, { tone: 'violet', opacity: 0.2, r: 5 }),
        T(365, 72, 'x′ δ(x−x′)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        L(60, 200, 580, 200, { tone: 'dim' }),
        A(568, 200, 580, 200, { tone: 'dim' }),
        P('M60 200 L 290 200 L 300 96 L 310 200 L 580 200', { tone: 'mint', weight: 2 }),
        P('M60 200 L 292 200 L 302 96 L 312 200 L 580 200', { tone: 'violet', dash: true }),
        T(300, 84, 'x′', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(60, 216, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(580, 216, 'x', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(430, 112, 'x ≠ x′：两边都是 0', { size: 9.5, tone: 'muted' }),
        T(430, 136, 'x = x′：x 换成 x′', { size: 9.5, tone: 'muted' }),
        T(320, 240, '两条曲线完全重合', { size: 10, tone: 'cyan', anchor: 'middle' }),
        T(320, 262, '本征值 x′ 是实数且连续可变', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '7.3/1-1-f',
      '波函数 = 态在位置基上的分量',
      '$\\psi(x)=\\langle x|\\psi\\rangle$：ket 是态，bra 是坐标基，投影下来得到一组连续分量，一般取复数值。',
      [
        T(320, 24, '波函数 = 态在位置基上的分量', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 52, 200, 30, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(160, 72, 'ψ(x) = ⟨x|ψ⟩', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(70, 104, '|ψ⟩', { size: 11, tone: 'amber' }),
        R(70, 112, 44, 50, { tone: 'amber', fill: true, opacity: 0.18, r: 6 }),
        A(120, 137, 196, 137, { tone: 'dim' }),
        T(158, 126, '⟨x|', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(228, 204, 450, 204, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.16) ** 2)), { x: 228, y: 104, w: 222, h: 100 }, [0, 1], [0, 1.02], {
          tone: 'mint',
          weight: 2
        }),
        T(228, 90, '投影结果', { size: 9.5, tone: 'muted' }),
        T(228, 222, 'x', { size: 9.5, tone: 'dim' }),
        T(470, 80, '|x⟩：位置本征态', { size: 9.5, tone: 'cyan' }),
        T(470, 104, '⟨x|：把态投影下来', { size: 9.5, tone: 'muted' }),
        T(470, 128, '结果一般是复数', { size: 9.5, tone: 'faint' }),
        T(470, 156, '所以波函数不是概率', { size: 10, tone: 'amber' }),
        T(470, 180, '|ψ(x)|² 才是概率密度', { size: 9.5, tone: 'mint' }),
        T(320, 250, '换一组基，分量就换一套', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '傅里叶变换就是换基的操作', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '7.3/1-2-f',
      '连续基的正交归一：δ(x − x′)',
      '$\\langle x|x^{\\prime}\\rangle=\\delta(x-x^{\\prime})$：连续指标无法编号，归一化只能落在对角线上，值仍是 0 或无穷。',
      [
        T(320, 24, '连续基的正交归一：δ(x − x′)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 54, 240, 30, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(180, 74, '⟨x|x′⟩ = δ(x−x′)', { size: 11, tone: 'mint', anchor: 'middle' }),
        L(230, 220, 540, 220, { tone: 'dim' }),
        A(528, 220, 540, 220, { tone: 'dim' }),
        T(544, 218, 'x', { size: 9.5, tone: 'dim' }),
        L(230, 220, 230, 84, { tone: 'dim' }),
        A(230, 96, 230, 84, { tone: 'dim' }),
        T(222, 102, 'x′', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(240, 210, 530, 96, { tone: 'mint', weight: 3 }),
        T(452, 88, 'x = x′', { size: 9.5, tone: 'mint' }),
        T(40, 96, '连续指标无法逐个编号', { size: 9.5, tone: 'muted' }),
        T(40, 120, '归一化用 δ 代替 1', { size: 9.5, tone: 'muted' }),
        T(40, 150, 'δ 的峰随 x′ 连续移动', { size: 9.5, tone: 'amber' }),
        T(244, 104, '偏离对角线 ⇒ 0', { size: 9.5, tone: 'faint' }),
        T(250, 140, '只有对角线上才有值', { size: 9.5, tone: 'muted' }),
        T(320, 248, '离散的 δₘₙ 变成 δ(x−x′)', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '形式不变，含义从表变成分布', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '7.3/2-0-f',
      '展开：从 φ(k) 回到 ψ(x)',
      '$\\psi(x)=\\frac{1}{\\sqrt{2\\pi}}\\int\\varphi(k)e^{ikx}dk$：把连续本征态按权重叠加，积分代替了离散的求和。',
      [
        T(320, 24, '展开：从 φ(k) 回到 ψ(x)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 50, 170, 28, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(121, 69, 'ψ(x)', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(220, 69, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(234, 50, 200, 28, { tone: 'amber', opacity: 0.2, r: 5 }),
        T(334, 69, '(1/√2π)∫φ(k)exp(ikx)dk', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(452, 58, '1/√2π：归一常数', { size: 9.5, tone: 'muted' }),
        T(452, 80, 'φ(k)：每个 k 的权重', { size: 9.5, tone: 'muted' }),
        T(452, 102, '积分代替 Σ', { size: 9.5, tone: 'amber' }),
        CURVE((x) => Math.cos(2 * Math.PI * x), { x: 56, y: 124, w: 150, h: 24 }, [0, 1], [-1.2, 1.2], {
          tone: 'cyan'
        }),
        CURVE((x) => Math.cos(4 * Math.PI * x), { x: 56, y: 152, w: 150, h: 24 }, [0, 1], [-1.2, 1.2], {
          tone: 'violet'
        }),
        CURVE((x) => Math.cos(6 * Math.PI * x), { x: 56, y: 180, w: 150, h: 24 }, [0, 1], [-1.2, 1.2], {
          tone: 'mint'
        }),
        T(212, 136, 'k₁', { size: 9.5, tone: 'cyan' }),
        T(212, 164, 'k₂', { size: 9.5, tone: 'violet' }),
        T(212, 192, 'k₃', { size: 9.5, tone: 'mint' }),
        T(240, 160, '+', { size: 12, tone: 'text', anchor: 'middle' }),
        L(280, 170, 550, 170, { tone: 'faint', dash: true }),
        CURVE(
          (x) => Math.exp(-(((x - 0.5) / 0.18) ** 2)) * Math.cos(2 * Math.PI * 5 * x),
          { x: 280, y: 120, w: 270, h: 100 },
          [0, 1],
          [-1.1, 1.1],
          { tone: 'mint', weight: 1.6 }
        ),
        T(280, 184, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(550, 184, 'x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(415, 206, '叠加成波包', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '积分把连续本征态缝成一个态', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'φ 集中在 k₀ ⇒ ψ 是长波包', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '7.3/2-1-f',
      '逆变换：从 ψ(x) 提取每个 k',
      '$\\varphi(k)=\\frac{1}{\\sqrt{2\\pi}}\\int\\psi(x)e^{-ikx}dx$：与展开式互逆，负号只是约定，系数保证内积是 δ 函数。',
      [
        T(320, 24, '逆变换：从 ψ(x) 提取每个 k', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 50, 170, 28, { tone: 'cyan', opacity: 0.22, r: 5 }),
        T(121, 69, 'φ(k)', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
        T(220, 69, '=', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(234, 50, 220, 28, { tone: 'violet', opacity: 0.2, r: 5 }),
        T(344, 69, '(1/√2π)∫ψ(x)exp(−ikx)dx', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(70, 126, 150, 34, { tone: 'mint', opacity: 0.2, r: 6 }),
        T(145, 148, 'ψ(x)', { size: 11, tone: 'mint', anchor: 'middle' }),
        BAND(400, 126, 150, 34, { tone: 'cyan', opacity: 0.2, r: 6 }),
        T(475, 148, 'φ(k)', { size: 11, tone: 'cyan', anchor: 'middle' }),
        A(228, 134, 392, 134, { tone: 'cyan' }),
        A(392, 154, 228, 154, { tone: 'amber' }),
        T(310, 112, '正变换：带负号', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 190, '逆变换：带正号', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 224, '负号只是约定，两式互逆', { size: 9.5, tone: 'muted' }),
        T(70, 246, '系数 1/√2π 保证 δ 归一', { size: 9.5, tone: 'faint' }),
        T(320, 270, '同一信息，两种坐标下的写法', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '7.3/2-2-f',
      '归一化：概率密度的总面积是 1',
      '$\\int|\\varphi(k)|^2dk=1$：连续谱的归一化写在积分上，与离散的 $\\sum|c_n|^2=1$ 完全对应。',
      [
        T(320, 24, '归一化：概率密度的总面积是 1', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 52, 250, 30, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(185, 72, '∫|φ(k)|² dk = 1', { size: 11, tone: 'amber', anchor: 'middle' }),
        L(70, 192, 570, 192, { tone: 'dim' }),
        A(558, 192, 570, 192, { tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 0.5) / 0.14) ** 2)), { x: 70, y: 104, w: 480, h: 88 }, [0, 1], [0, 1.02], {
          tone: 'cyan',
          weight: 2
        }),
        T(70, 214, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 214, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(560, 214, 'k_max', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 238, '曲线下的面积 = 1', { size: 10, tone: 'mint' }),
        T(70, 260, '离散版：Σ|cₙ|² = 1', { size: 10, tone: 'muted' }),
        T(320, 274, '单点无概率，只能对区间积分', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
