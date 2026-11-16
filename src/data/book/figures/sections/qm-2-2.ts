import { fig, T, BAND, L, A, C, DOT, E, TAG, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '2.2/overview',
    '从平面波到定态本征方程',
    '德布罗意波给出 $p$ 与 $E$ 的波形式；薛定谔方程规定演化；势场不显含时间时，问题化为定态本征值方程。',
    [
      T(320, 24, '从平面波到定态方程', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 46, 170, 178, '① 平面波', { tone: 'mint' }),
      CURVE((x) => Math.sin(x / 16), { x: 44, y: 78, w: 138, h: 64 }, [0, 138], [-1.2, 1.2], { tone: 'mint', steps: 80 }),
      A(52, 160, 166, 160, { tone: 'amber', weight: 1.2 }),
      T(109, 176, 'k', { size: 10, tone: 'amber', anchor: 'middle' }),
      T(44, 204, 'ω 定相位转速', { size: 9.5, tone: 'muted' }),
      T(44, 222, 'E = ħω，p = ħk', { size: 9.5, tone: 'faint' }),
      ...PANEL(230, 46, 170, 178, '② 含时方程', { tone: 'violet' }),
      C(315, 120, 30, { tone: 'violet', dash: true }),
      A(315, 120, 336, 100, { tone: 'violet', weight: 1.8 }),
      T(342, 96, 'ψ', { size: 10.5, tone: 'violet' }),
      T(315, 166, 'iħ∂tψ = Ĥψ', { size: 10.5, tone: 'violet', anchor: 'middle' }),
      T(244, 204, '线性：叠加成立', { size: 9.5, tone: 'muted' }),
      T(244, 222, '一阶：初态足够', { size: 9.5, tone: 'faint' }),
      ...PANEL(432, 46, 170, 178, '③ 定态方程', { tone: 'amber' }),
      ...[110, 146, 182].flatMap((y, i) => LEVEL(452, 520, y, ['E₃', 'E₂', 'E₁'][i], { tone: 'amber' })),
      A(202, 136, 226, 136, { tone: 'muted' }),
      A(404, 136, 428, 136, { tone: 'muted' }),
      T(320, 248, '波 → 演化 → 本征值', { size: 10.5, tone: 'faint', anchor: 'middle' }),
      T(320, 270, '定态把动力学变成本征值问题', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '2.2/0-0',
      '平面波：波矢、波长与频率',
      '波矢 $\\mathbf k$ 指向传播方向，相邻同相面间距为 $\\lambda$；角频率 $\\omega$ 决定相位随时间的转动快慢。',
      [
        T(320, 24, '平面波：波矢、波长与频率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 56, w: 470, h: 150 }, { xLabel: 'x', yLabel: 'ψ', tone: 'dim' }),
        CURVE((x) => Math.sin(x / 24), { x: 60, y: 56, w: 470, h: 150 }, [0, 470], [-1.2, 1.2], { tone: 'mint', steps: 120 }),
        L(98, 74, 98, 206, { tone: 'dim', dash: true }),
        L(248, 74, 248, 206, { tone: 'dim', dash: true }),
        L(399, 74, 399, 206, { tone: 'dim', dash: true }),
        L(98, 74, 98, 66, { tone: 'amber' }),
        L(248, 74, 248, 66, { tone: 'amber' }),
        A(98, 70, 248, 70, { tone: 'amber' }),
        T(173, 62, 'λ', { size: 11, tone: 'amber', anchor: 'middle' }),
        A(300, 196, 400, 196, { tone: 'violet', weight: 1.6 }),
        T(350, 212, 'k 指向传播方向', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        C(547, 116, 24, { tone: 'cyan', dash: true }),
        A(547, 116, 563, 100, { tone: 'cyan', weight: 1.5 }),
        T(576, 118, 'ω', { size: 10.5, tone: 'cyan' }),
        T(66, 44, 'A：振幅', { size: 9.5, tone: 'muted' }),
        T(60, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(177, 224, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(294, 224, '20', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(411, 224, '30', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(528, 224, '40', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 240, '相位 = kx − ωt', { size: 10.5, tone: 'text', anchor: 'middle' }),
        T(320, 262, 'k 定波长 2π/k，ω 定相位转速', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '2.2/0-1',
      '色散：ω 正比于 k 的平方',
      '自由粒子的 $\\omega$ 正比于 $k^2$；曲线上各点切线的斜率就是群速度，斜率随 $k$ 增大而变大。',
      [
        T(320, 24, '色散：ω 正比于 k 的平方', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 64, y: 54, w: 400, h: 160 }, { yLabel: 'ω', tone: 'dim' }),
        CURVE((x) => 0.000018 * x * x, { x: 64, y: 54, w: 400, h: 160 }, [0, 400], [0, 2.9], { tone: 'mint', steps: 110 }),
        L(104, 219, 264, 181, { tone: 'cyan', dash: true }),
        L(314, 154, 414, 94, { tone: 'danger', dash: true }),
        DOT(184, 200, { r: 3, tone: 'cyan' }),
        DOT(364, 125, { r: 3, tone: 'danger' }),
        T(150, 182, 'k₁ 斜率小', { size: 9.5, tone: 'cyan' }),
        T(330, 110, 'k₂ 斜率大', { size: 9.5, tone: 'danger' }),
        T(64, 228, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(164, 228, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(264, 228, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(364, 228, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(464, 228, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(456, 246, 'k', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(56, 135, '1.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...PANEL(474, 54, 138, 160, '群速度', { tone: 'amber' }),
        T(488, 84, 'v_g = dω/dk', { size: 10, tone: 'amber' }),
        T(488, 110, '斜率 = 速度', { size: 9.5, tone: 'muted' }),
        T(488, 136, 'k 越大越快', { size: 9.5, tone: 'muted' }),
        T(488, 162, '波包会散开', { size: 9.5, tone: 'faint' }),
        T(320, 244, '不同 k 分量速度不同', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '波包在传播中逐渐展宽', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '2.2/0-2',
      '平面波铺满空间，波包才局域',
      '一个平面波在全空间等幅延展，无法归一化；把不同 $k$ 的分量叠加，才得到一个有限的波包。',
      [
        T(320, 24, '平面波铺满空间，波包才局域', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 50, 272, 160, '平面波：处处等幅', { tone: 'muted' }),
        L(46, 70, 282, 70, { tone: 'dim', dash: true }),
        L(46, 142, 282, 142, { tone: 'dim', dash: true }),
        CURVE((x) => Math.sin(x / 12), { x: 46, y: 82, w: 236, h: 48 }, [0, 236], [-1.2, 1.2], {
          tone: 'muted',
          steps: 110
        }),
        T(160, 186, '延伸到无穷，不可归一化', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(340, 50, 272, 160, '波包：局域可归一', { tone: 'mint' }),
        L(358, 150, 594, 150, { tone: 'dim', dash: true }),
        CURVE((x) => Math.sin(x / 10) * Math.exp(-((x - 118) ** 2) / 2400), { x: 358, y: 96, w: 236, h: 64 }, [0, 236], [-1.2, 1.2], {
          tone: 'mint',
          steps: 120
        }),
        E(476, 128, 70, 26, { tone: 'cyan', dash: true }),
        T(476, 186, '包络有限，可以归一', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        A(304, 128, 336, 128, { tone: 'muted', weight: 1.4 }),
        T(320, 116, '叠加', { size: 9.5, tone: 'text', anchor: 'middle' }),
        T(320, 230, '平面波是理想基元', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '局域粒子必须用波包描述', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '不同 k 的分量叠加成包', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '2.2/1-0',
      '对时间与空间求导，反推出方程',
      '对时间求导带出 $-i\\omega$，对空间求二阶导带出 $-k^2$；再用 $E=\\hbar\\omega$、$p=\\hbar k$ 替换，自由粒子方程自然出现。',
      [
        T(320, 24, '对时间与空间求导，反推出方程', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 52, 174, 116, '对时间求导', { tone: 'mint' }),
        T(44, 88, '∂ψ/∂t → −iωψ', { size: 10, tone: 'mint' }),
        T(44, 112, '带出 E = ħω', { size: 9.5, tone: 'muted' }),
        T(44, 136, '一阶时间导数', { size: 9.5, tone: 'faint' }),
        A(206, 108, 226, 108, { tone: 'muted' }),
        ...PANEL(230, 52, 174, 116, '对空间求二阶导', { tone: 'violet' }),
        T(246, 88, '∇²ψ → −k²ψ', { size: 10, tone: 'violet' }),
        T(246, 112, '带出 p = ħk', { size: 9.5, tone: 'muted' }),
        T(246, 136, '二阶空间导数', { size: 9.5, tone: 'faint' }),
        A(408, 108, 428, 108, { tone: 'muted' }),
        ...PANEL(432, 52, 180, 116, '用 E = p²/2m 合并', { tone: 'amber' }),
        T(446, 86, 'iħ∂tψ', { size: 12, tone: 'amber', mono: true }),
        T(446, 110, '= −(ħ²/2m)∇²ψ', { size: 10, tone: 'amber', mono: true }),
        T(446, 134, '自由粒子方程', { size: 9.5, tone: 'muted' }),
        T(80, 196, '时间导数给出能量', { size: 10, tone: 'muted' }),
        T(260, 196, '空间曲率给出动能', { size: 10, tone: 'muted' }),
        T(470, 196, '两者相等即成方程', { size: 10, tone: 'muted' }),
        T(320, 226, '这不是推导出的定理，而是基本假设', { size: 10.5, tone: 'text', anchor: 'middle' }),
        T(320, 250, '它规定 ψ 如何随时间演化', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 272, '地位类似牛顿第二定律', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '2.2/1-1',
      '哈密顿算符：动能加势能',
      '动能项由波函数的空间曲率给出，势能项只与位置有关；两者相加构成总能量算符。',
      [
        T(320, 24, '哈密顿算符：动能加势能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 52, 262, 150, '动能：空间曲率', { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 22), { x: 46, y: 84, w: 226, h: 88 }, [0, 226], [-1.2, 1.2], { tone: 'mint', steps: 100 }),
        A(146, 104, 146, 80, { tone: 'mint' }),
        T(154, 94, '弯曲越强，动能越高', { size: 9.5, tone: 'mint' }),
        T(140, 190, '−(ħ²/2m)∇²', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(320, 128, '+', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(342, 52, 262, 150, '势能：按位置取值', { tone: 'amber' }),
        CURVE((x) => 0.86 - 0.72 * Math.exp(-((x - 113) ** 2) / 1600), { x: 360, y: 84, w: 226, h: 88 }, [0, 226], [0, 1.1], {
          tone: 'amber',
          steps: 100
        }),
        T(470, 190, 'V(r,t)', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(80, 224, 'Ĥ = −(ħ²/2m)∇² + V(r,t)', { size: 12, tone: 'text' }),
        T(320, 252, 'V = 0 时退回自由粒子', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '势场决定束缚还是散射', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '2.2/1-2',
      '线性方程：叠加保持，初态足够',
      '演化算符 $U(t)$ 对线性组合逐项作用：系数不变，两个分量各自带走自己的相位；一阶时间导数只需一个初态。',
      [
        T(320, 24, '线性方程：叠加保持，初态足够', { size: 12.5, tone: 'text', anchor: 'middle' }),
        TAG(60, 86, 'ψ₁(0)', { tone: 'mint', size: 10.5 }),
        TAG(60, 150, 'ψ₂(0)', { tone: 'violet', size: 10.5 }),
        A(126, 90, 196, 90, { tone: 'mint' }),
        A(126, 154, 196, 154, { tone: 'violet' }),
        ...PANEL(200, 62, 220, 120, 'U(t)：线性演化', { tone: 'text' }),
        T(212, 114, '系数不变', { size: 9.5, tone: 'muted' }),
        T(212, 138, '各自带相位', { size: 9.5, tone: 'muted' }),
        TAG(446, 86, 'c₁ψ₁(t)', { tone: 'mint', size: 10.5 }),
        TAG(446, 150, 'c₂ψ₂(t)', { tone: 'violet', size: 10.5 }),
        A(420, 90, 440, 90, { tone: 'mint' }),
        A(420, 154, 440, 154, { tone: 'violet' }),
        ...PANEL(28, 204, 290, 56, '一阶：只需 ψ(0)', { tone: 'mint' }),
        T(44, 244, '初态唯一决定此后演化', { size: 9.5, tone: 'muted' }),
        ...PANEL(334, 204, 278, 56, '二阶：还需 ψ′(0)', { tone: 'danger' }),
        T(350, 244, '牛顿方程要多给一个初速度', { size: 9.5, tone: 'muted' }),
        T(320, 274, '线性加一阶，才同时有叠加与唯一演化', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '2.2/2-0',
      '分离变量：空间部分乘时间相位',
      '令 $\\psi(\\mathbf r,t)=\\phi(\\mathbf r)e^{-iEt/\\hbar}$，时间因子只提供全局相位；代入后 $\\phi$ 满足定态方程。',
      [
        T(320, 24, '分离变量：空间部分乘时间相位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 50, 170, 160, '空间部分 φ(r)', { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 24), { x: 44, y: 84, w: 138, h: 72 }, [0, 138], [-1.2, 1.2], { tone: 'mint', steps: 90 }),
        T(44, 190, '节点位置固定', { size: 9.5, tone: 'muted' }),
        T(210, 130, '×', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(224, 50, 160, 160, '时间相位', { tone: 'violet' }),
        C(304, 124, 32, { tone: 'violet', dash: true }),
        A(304, 124, 326, 102, { tone: 'violet', weight: 1.6 }),
        T(304, 186, 'e^{−iEt/ħ}', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(396, 130, '=', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(410, 50, 202, 160, '概率密度 |ψ|²', { tone: 'cyan' }),
        L(426, 184, 596, 184, { tone: 'dim' }),
        CURVE((x) => Math.cos((Math.PI * x) / 150) ** 2, { x: 426, y: 96, w: 170, h: 84 }, [0, 170], [0, 1.1], {
          tone: 'cyan',
          steps: 110
        }),
        T(511, 190, '与 t 无关', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 240, '时间因子只提供全局相位', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '|ψ|² = |φ|²，不随时间改变', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '2.2/2-1',
      '定态：概率分布静止，相位在转',
      '定态的概率密度 $|\\phi|^2$ 不随时间改变，但波函数本身仍带着整体相位 $e^{-iEt/\\hbar}$ 在振荡。',
      [
        T(320, 24, '定态：概率分布静止，相位在转', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 50, 300, 170, '|φ|² 三个时刻', { tone: 'mint' }),
        L(44, 198, 316, 198, { tone: 'dim' }),
        CURVE((x) => Math.abs(Math.sin((Math.PI * x) / 120)), { x: 60, y: 78, w: 240, h: 36 }, [0, 240], [0, 1.1], {
          tone: 'mint',
          steps: 110
        }),
        CURVE((x) => Math.abs(Math.sin((Math.PI * x) / 120)), { x: 60, y: 122, w: 240, h: 36 }, [0, 240], [0, 1.1], {
          tone: 'mint',
          steps: 110
        }),
        CURVE((x) => Math.abs(Math.sin((Math.PI * x) / 120)), { x: 60, y: 166, w: 240, h: 36 }, [0, 240], [0, 1.1], {
          tone: 'cyan',
          steps: 110
        }),
        T(42, 74, 't₁', { size: 9.5, tone: 'muted' }),
        T(42, 118, 't₂', { size: 9.5, tone: 'muted' }),
        T(42, 162, 't₃', { size: 9.5, tone: 'muted' }),
        T(160, 208, '三条曲线完全重合', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        A(332, 130, 348, 130, { tone: 'muted' }),
        ...PANEL(352, 50, 260, 170, '波函数相位在转', { tone: 'violet' }),
        C(482, 120, 40, { tone: 'violet', dash: true }),
        A(482, 120, 510, 92, { tone: 'violet', weight: 1.8 }),
        T(524, 90, 'E/ħ', { size: 10, tone: 'violet' }),
        T(482, 188, '整体相位均匀旋转', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 246, '定态不是不动，是分布不动', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '相位在转，但 |ψ|² 不变', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '2.2/2-2',
      '厄米性给实能级，边界给离散谱',
      '哈密顿算符的厄米性保证 $E$ 为实数、不同本征函数正交；一维束缚态的边界条件再把能量限制为离散谱。',
      [
        T(320, 24, '厄米性给实能级，边界给离散谱', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 50, 290, 170, '一维束缚态：离散能级', { tone: 'mint' }),
        L(50, 196, 50, 74, { tone: 'dim' }),
        A(50, 86, 50, 72, { tone: 'dim' }),
        T(40, 64, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...[78, 116, 150, 180].flatMap((y, i) => LEVEL(68, 240, y, ['E₄', 'E₃', 'E₂', 'E₁'][i], { tone: 'mint' })),
        T(62, 212, '边界条件筛出分立能级', { size: 9.5, tone: 'muted' }),
        ...PANEL(332, 50, 280, 170, '厄米性与谱结构', { tone: 'violet' }),
        T(348, 84, 'E 为实数', { size: 9.5, tone: 'mint' }),
        T(348, 110, '不同本征函数正交', { size: 9.5, tone: 'violet' }),
        T(348, 136, '束缚态：离散谱', { size: 9.5, tone: 'cyan' }),
        T(348, 162, '边界决定谱结构', { size: 9.5, tone: 'amber' }),
        T(348, 188, '本征函数可选为实', { size: 9.5, tone: 'muted' }),
        T(320, 240, 'E 实数来自厄米性', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '能级离散来自边界条件', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '2.2/0-0-f',
      '平面波：振幅、波矢与频率',
      '$\\psi=Ae^{i(\\mathbf k\\cdot\\mathbf r-\\omega t)}$：$A$ 定振幅，$\\mathbf k$ 定方向与波长，$\\omega$ 定相位转速。',
      [
        T(320, 24, '平面波：振幅、波矢与频率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 100, 220, 47, { tone: 'mint' }),
        L(100, 130, 250, 77, { tone: 'mint' }),
        L(130, 160, 280, 107, { tone: 'mint' }),
        L(160, 190, 310, 137, { tone: 'mint' }),
        A(145, 74, 175, 104, { tone: 'cyan', weight: 1.3 }),
        T(184, 84, 'λ', { size: 10.5, tone: 'cyan' }),
        A(160, 210, 195, 110, { tone: 'amber', weight: 1.8 }),
        T(203, 104, 'k', { size: 11, tone: 'amber' }),
        T(70, 236, '波前垂直于 k', { size: 10, tone: 'muted' }),
        T(70, 258, '相邻波前相距 λ = 2π/k', { size: 10, tone: 'faint' }),
        ...PANEL(348, 56, 254, 150, '读法', { tone: 'mint' }),
        T(362, 86, 'A：振幅，|ψ|² = A²', { size: 9.5, tone: 'mint' }),
        T(362, 112, 'k：方向与波长', { size: 9.5, tone: 'amber' }),
        T(362, 138, 'ω：相位随时间转速', { size: 9.5, tone: 'violet' }),
        T(362, 164, '相位 = k·r − ωt', { size: 9.5, tone: 'cyan' }),
        T(362, 190, 'A → 0：波幅趋零', { size: 9.5, tone: 'faint' }),
        T(320, 252, '三者共同确定一列平面波', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '平面波在全空间等幅', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '2.2/0-1-f',
      'p = ħk、E = ħω：波参数换力学量',
      '$\\mathbf p=\\hbar\\mathbf k$、$E=\\hbar\\omega$，代入 $E=p^2/2m$ 得 $\\omega=\\hbar k^2/2m$。',
      [
        T(320, 24, 'p = ħk、E = ħω：波参数换力学量', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(50, 58, 120, 34, { tone: 'mint', opacity: 0.2, r: 6 }),
        T(110, 80, 'k', { size: 12, tone: 'mint', anchor: 'middle' }),
        A(178, 75, 216, 75, { tone: 'mint' }),
        T(197, 63, '×ħ', { size: 10, tone: 'mint', anchor: 'middle' }),
        BAND(224, 58, 120, 34, { tone: 'mint', opacity: 0.28, r: 6 }),
        T(284, 80, 'p = ħk', { size: 11, tone: 'mint', anchor: 'middle' }),
        BAND(50, 112, 120, 34, { tone: 'violet', opacity: 0.2, r: 6 }),
        T(110, 134, 'ω', { size: 12, tone: 'violet', anchor: 'middle' }),
        A(178, 129, 216, 129, { tone: 'violet' }),
        T(197, 117, '×ħ', { size: 10, tone: 'violet', anchor: 'middle' }),
        BAND(224, 112, 120, 34, { tone: 'violet', opacity: 0.28, r: 6 }),
        T(284, 134, 'E = ħω', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(50, 172, 'k 连续 ⇒ E 连续', { size: 9.5, tone: 'muted' }),
        T(50, 194, '非相对论：E = p²/2m', { size: 9.5, tone: 'cyan' }),
        ...PANEL(368, 54, 232, 150, '色散曲线', { tone: 'amber' }),
        L(386, 184, 584, 184, { tone: 'dim' }),
        A(576, 184, 592, 184, { tone: 'dim' }),
        L(386, 184, 386, 78, { tone: 'dim' }),
        A(386, 92, 386, 74, { tone: 'dim' }),
        CURVE((x) => 0.9 * (x / 196) ** 2, { x: 388, y: 80, w: 196, h: 100 }, [0, 196], [0, 1.3], {
          tone: 'amber',
          steps: 100
        }),
        DOT(520, 149, { r: 2.8, tone: 'amber' }),
        T(528, 144, 'k', { size: 9.5, tone: 'amber' }),
        T(486, 202, 'ω ∝ k²', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 236, '同一组关系连接波与粒子', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '代入 E = p²/2m 得色散关系', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '2.2/1-0-f',
      'iħ∂tψ = Ĥψ：量子态的演化规则',
      '$i\\hbar\\partial\\psi/\\partial t=\\hat H\\psi$：左边是相位转速，右边是能量；线性保证叠加原理。',
      [
        T(320, 24, 'iħ∂tψ = Ĥψ：量子态的演化规则', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 54, 240, 152, '左边：时间变化率', { tone: 'mint' }),
        T(48, 88, 'iħ ∂ψ/∂t', { size: 12, tone: 'text', mono: true }),
        C(140, 140, 30, { tone: 'mint', dash: true }),
        A(140, 140, 160, 120, { tone: 'mint', weight: 1.6 }),
        T(170, 118, '转速 E/ħ', { size: 9.5, tone: 'mint' }),
        T(48, 196, 'ħ 把能量换成相位速度', { size: 9.5, tone: 'muted' }),
        T(276, 130, '=', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(300, 54, 312, 152, '右边：能量算符', { tone: 'amber' }),
        ...[104, 140, 176].flatMap((y, i) => LEVEL(320, 450, y, ['E₃', 'E₂', 'E₁'][i], { tone: 'amber' })),
        T(320, 196, 'Ĥ 作用给出能量', { size: 9.5, tone: 'muted' }),
        T(320, 228, '线性 ⇒ 叠加原理成立', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 250, '厄米 ⇒ 总概率保持为 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, 'ψ 的演化由 Ĥ 唯一规定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '2.2/1-1-f',
      'Ĥ = −(ħ²/2m)∇² + V：动能加势能',
      '$\\hat H=-\\frac{\\hbar^2}{2m}\\nabla^2+V(\\mathbf r,t)$：曲率项测动能，$V$ 按位置给势能。',
      [
        T(320, 24, 'Ĥ = −(ħ²/2m)∇² + V：动能加势能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 54, 262, 150, '动能：曲率', { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 20), { x: 46, y: 86, w: 226, h: 84 }, [0, 226], [-1.2, 1.2], { tone: 'mint', steps: 100 }),
        A(150, 100, 150, 76, { tone: 'mint' }),
        T(158, 88, '弯曲越强，动能越高', { size: 9.5, tone: 'mint' }),
        T(140, 192, '−(ħ²/2m)∇²', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(320, 130, '+', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(342, 54, 262, 150, '势能：按位置取值', { tone: 'amber' }),
        CURVE((x) => 0.86 - 0.72 * Math.exp(-((x - 113) ** 2) / 1600), { x: 360, y: 86, w: 226, h: 84 }, [0, 226], [0, 1.1], {
          tone: 'amber',
          steps: 100
        }),
        T(470, 192, 'V(r,t)', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(70, 226, '动能项量的是空间弯曲', { size: 10, tone: 'muted' }),
        T(330, 226, '势能项只与位置有关', { size: 10, tone: 'muted' }),
        T(320, 252, 'V = 0：自由粒子方程', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'V 越大：波函数越局域', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '2.2/2-0-f',
      'ψ = φ(r)e^{−iEt/ħ}：空间乘相位',
      '$\\psi(\\mathbf r,t)=\\phi(\\mathbf r)e^{-iEt/\\hbar}$：时间因子模为 1，只转动相位；$|\\psi|^2=|\\phi|^2$。',
      [
        T(320, 24, 'ψ = φ(r)e^{−iEt/ħ}：空间乘相位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 50, 170, 160, '空间部分 φ', { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 24), { x: 44, y: 84, w: 138, h: 72 }, [0, 138], [-1.2, 1.2], { tone: 'mint', steps: 90 }),
        T(44, 190, '节点固定', { size: 9.5, tone: 'muted' }),
        T(210, 130, '×', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(224, 50, 160, 160, '时间相位', { tone: 'violet' }),
        C(304, 122, 32, { tone: 'violet', dash: true }),
        A(304, 122, 326, 100, { tone: 'violet', weight: 1.6 }),
        T(304, 186, 'e^{−iEt/ħ}', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(396, 130, '=', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(410, 50, 202, 160, '概率密度 |ψ|²', { tone: 'cyan' }),
        L(426, 184, 596, 184, { tone: 'dim' }),
        CURVE((x) => Math.cos((Math.PI * x) / 150) ** 2, { x: 426, y: 96, w: 170, h: 84 }, [0, 170], [0, 1.1], {
          tone: 'cyan',
          steps: 110
        }),
        T(511, 190, '与 φ 完全相同', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 240, '时间因子模为 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '只转相位，不改概率密度', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '2.2/2-1-f',
      'Ĥφ = Eφ：算符作用只乘一个数',
      '$\\hat H\\phi=E\\phi$：算符作用只把本征函数乘以常数 $E$；离散的 $E$ 对应束缚态。',
      [
        T(320, 24, 'Ĥφ = Eφ：算符作用只乘一个数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 56, 176, 140, '输入 φ', { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 22), { x: 42, y: 90, w: 146, h: 64 }, [0, 146], [-1.2, 1.2], { tone: 'mint', steps: 90 }),
        A(212, 114, 240, 114, { tone: 'violet', weight: 1.4 }),
        T(226, 100, 'Ĥ', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        ...PANEL(248, 56, 176, 140, '输出 Eφ', { tone: 'amber' }),
        CURVE((x) => 1.3 * Math.sin(x / 22), { x: 262, y: 90, w: 146, h: 64 }, [0, 146], [-1.4, 1.4], { tone: 'amber', steps: 90 }),
        T(336, 186, '形状不变，幅度 ×E', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(432, 88, 'E 实数：可测量', { size: 9.5, tone: 'cyan' }),
        ...[104, 142, 180].flatMap((y, i) => LEVEL(470, 568, y, ['E₃', 'E₂', 'E₁'][i], { tone: 'cyan' })),
        T(432, 206, '离散谱：束缚态', { size: 9.5, tone: 'mint' }),
        T(432, 228, '边界决定离散谱', { size: 9.5, tone: 'amber' }),
        T(320, 250, '本征函数形状不变', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '只多一个能量因子 E', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
