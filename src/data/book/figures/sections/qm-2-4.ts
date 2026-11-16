import { fig, flat, T, R, BAND, L, A, C, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '2.4/overview',
    '四条性质撑起束缚态的本征值问题',
    '一维规则势场中，束缚态能级非简并、本征函数可取实、不同能级正交归一、全体本征函数完备；四者合一，任意态都能展开并算出能量期待值。',
    [
      T(320, 24, '四条性质，一套可计算的工具', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 272, 84, '① 非简并', { tone: 'mint' }),
      ...LEVEL(56, 196, 106, 'E', { size: 9.5, tone: 'mint' }),
      T(56, 82, '一个能级只配一个态', { size: 9.5, tone: 'muted' }),
      ...PANEL(334, 44, 272, 84, '② 可取实', { tone: 'cyan' }),
      CURVE((x) => Math.sin(x / 40), { x: 356, y: 82, w: 140, h: 32 }, [0, 140], [-1, 1], { tone: 'cyan' }),
      T(506, 76, '没有整体相位', { size: 9.5, tone: 'muted' }),
      ...PANEL(34, 136, 272, 84, '③ 正交归一', { tone: 'violet' }),
      A(60, 196, 60, 160, { tone: 'violet', weight: 1.3 }),
      A(60, 196, 150, 196, { tone: 'violet', weight: 1.3 }),
      T(64, 152, 'φ₁', { size: 9.5, tone: 'violet' }),
      T(154, 200, 'φ₂', { size: 9.5, tone: 'violet' }),
      T(196, 172, '〈φₘ|φₙ〉 = δ', { size: 9.5, tone: 'muted', mono: true }),
      ...PANEL(334, 136, 272, 84, '④ 完备', { tone: 'amber' }),
      BAND(356, 164, 116, 8, { tone: 'amber', opacity: 0.35 }),
      BAND(356, 180, 116, 8, { tone: 'amber', opacity: 0.25 }),
      BAND(356, 196, 116, 8, { tone: 'amber', opacity: 0.15 }),
      T(490, 176, '任意态可展开', { size: 9.5, tone: 'muted' }),
      T(320, 244, '本征态成为状态空间的坐标轴', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 268, '⟨E⟩ = Σ|cₙ|²Eₙ', { size: 10.5, tone: 'faint', anchor: 'middle', mono: true })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '2.4/0-0',
      '束缚边界：两端为零，斜率也被约束',
      '束缚态被两侧势垒关在有限区域，波函数在两端趋于零；边界条件同时约束函数值与斜率，只留下可数的解。',
      [
        T(320, 24, '波函数被关在有限区域里', { size: 12.5, tone: 'text', anchor: 'middle' }),
        R(120, 64, 10, 140, { tone: 'dim', fill: true, opacity: 0.25, r: 2 }),
        R(510, 64, 10, 140, { tone: 'dim', fill: true, opacity: 0.25, r: 2 }),
        L(130, 180, 510, 180, { tone: 'faint', dash: true }),
        CURVE((x) => Math.sin((Math.PI * x) / 380), { x: 130, y: 90, w: 380, h: 90 }, [0, 380], [0, 1], {
          tone: 'mint',
          steps: 160
        }),
        DOT(130, 180, { r: 3, tone: 'amber' }),
        DOT(510, 180, { r: 3, tone: 'amber' }),
        T(112, 198, 'ψ = 0', { size: 9.5, tone: 'amber', anchor: 'end' }),
        T(528, 198, 'ψ = 0', { size: 9.5, tone: 'amber' }),
        T(320, 206, '两端为零：斜率不能任意取', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 232, '边界条件把连续谱筛成离散谱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '这也是能级离散的几何来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '2.4/0-1',
      '非简并：一个能级只配一个态',
      '若 $E$ 对应两个线性无关的解，束缚边界会让它们的朗斯基行列式既为常数又趋于零，只能为零，于是两解线性相关。',
      [
        T(320, 24, '一个能量只对应一个独立解', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 268, 160, '允许', { tone: 'mint' }),
        L(56, 160, 282, 160, { tone: 'mint', weight: 1.8 }),
        CURVE((x) => Math.sin((Math.PI * x) / 216), { x: 60, y: 98, w: 216, h: 62 }, [0, 216], [0, 1], {
          tone: 'mint',
          steps: 120
        }),
        T(292, 164, 'E', { size: 10, tone: 'mint' }),
        T(62, 180, '唯一的 φ(x)', { size: 9.5, tone: 'muted' }),
        ...PANEL(320, 50, 280, 160, '不允许', { tone: 'danger' }),
        L(340, 160, 586, 160, { tone: 'danger', weight: 1.8 }),
        CURVE((x) => Math.sin((Math.PI * x) / 220), { x: 344, y: 98, w: 220, h: 62 }, [0, 220], [0, 1], {
          tone: 'violet',
          steps: 120
        }),
        CURVE((x) => 0.6 + 0.4 * Math.cos((Math.PI * x) / 110), { x: 344, y: 98, w: 220, h: 62 }, [0, 220], [0, 1], {
          tone: 'cyan',
          dash: true,
          steps: 120
        }),
        L(410, 92, 540, 158, { tone: 'danger', weight: 1.6 }),
        L(410, 158, 540, 92, { tone: 'danger', weight: 1.6 }),
        T(346, 180, '同一 E 的两个解：被排除', { size: 9.5, tone: 'danger' }),
        T(320, 232, '非简并：能级与态一一对应', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '这是后面正交关系更简单的前提', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '2.4/0-2',
      '实部与虚部都满足同一方程',
      '若 $\\varphi$ 是复本征函数，其实部与虚部满足同一个实系数方程；非简并意味着二者只能相差常数，适当组合总能选出实本征函数。',
      [
        T(320, 24, '复解可以拆成两个实解', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 180, 156, '复解 φ', { tone: 'violet' }),
        CURVE((x) => Math.sin(x), { x: 46, y: 82, w: 156, h: 92 }, [0, 6.28], [-1, 1], {
          tone: 'violet',
          steps: 120
        }),
        CURVE((x) => Math.cos(x), { x: 46, y: 82, w: 156, h: 92 }, [0, 6.28], [-1, 1], {
          tone: 'cyan',
          dash: true,
          steps: 120
        }),
        T(124, 192, '实线 + 虚线', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(228, 50, 180, 156, '实部', { tone: 'mint' }),
        CURVE((x) => Math.sin(x), { x: 240, y: 82, w: 156, h: 92 }, [0, 6.28], [-1, 1], {
          tone: 'mint',
          steps: 120
        }),
        T(318, 192, '满足同一方程', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(422, 50, 184, 156, '虚部', { tone: 'cyan' }),
        CURVE((x) => Math.cos(x), { x: 434, y: 82, w: 160, h: 92 }, [0, 6.28], [-1, 1], {
          tone: 'cyan',
          steps: 120
        }),
        T(514, 192, '与实部只差常数', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 230, '非简并 ⇒ 两部分线性相关', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '取实部就得到实本征函数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '2.4/1-0',
      '厄米性把内积挪到另一边',
      '对 $\\hat H\\varphi_m=E_m\\varphi_m$ 与 $\\hat H\\varphi_n=E_n\\varphi_n$ 分别左乘、相减，厄米性让左边为零，右边只剩 $(E_m-E_n)$ 乘以内积。',
      [
        T(320, 24, '厄米性给出一个零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        R(34, 54, 250, 66, { tone: 'violet', fill: true, opacity: 0.16, r: 8 }),
        T(159, 80, 'Ĥφₘ = Eₘφₘ', { size: 11, tone: 'violet', anchor: 'middle', mono: true }),
        T(159, 100, 'Ĥφₙ = Eₙφₙ', { size: 11, tone: 'violet', anchor: 'middle', mono: true }),
        A(159, 122, 159, 138, { tone: 'faint' }),
        R(34, 142, 250, 66, { tone: 'cyan', fill: true, opacity: 0.16, r: 8 }),
        T(159, 168, '左乘 φₙ* 与 φₘ*', { size: 10, tone: 'cyan', anchor: 'middle' }),
        T(159, 188, '再把两式相减', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(290, 175, 324, 175, { tone: 'faint' }),
        R(330, 54, 272, 66, { tone: 'mint', fill: true, opacity: 0.16, r: 8 }),
        T(466, 80, '左边：厄米性使两项相等', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(466, 100, '相减后化为零', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(466, 122, 466, 138, { tone: 'faint' }),
        R(330, 142, 272, 66, { tone: 'amber', fill: true, opacity: 0.16, r: 8 }),
        T(466, 166, '(Eₘ−Eₙ)∫φₘ*φₙ dx = 0', { size: 10, tone: 'amber', anchor: 'middle', mono: true }),
        T(466, 188, '右边只剩这一项', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 230, 'Eₘ ≠ Eₙ ⇒ 内积必为零', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '正交性是厄米性的推论', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '2.4/1-1',
      '正交归一：态空间里的垂直坐标轴',
      '归一化后 $\\int\\varphi_m^*\\varphi_n\\,dx=\\delta_{mn}$：同一能级内积为一，不同能级内积为零，本征态于是像互相垂直的坐标轴。',
      [
        T(320, 24, '不同能级在态空间里互相垂直', { size: 12.5, tone: 'text', anchor: 'middle' }),
        A(170, 214, 268, 214, { tone: 'mint', weight: 1.3 }),
        A(170, 214, 170, 108, { tone: 'cyan', weight: 1.3 }),
        A(170, 214, 104, 168, { tone: 'violet', weight: 1.3 }),
        T(276, 218, 'φ₁', { size: 10, tone: 'mint' }),
        T(176, 104, 'φ₂', { size: 10, tone: 'cyan' }),
        T(94, 162, 'φ₃', { size: 10, tone: 'violet' }),
        L(170, 202, 184, 202, { tone: 'dim', dash: true }),
        L(184, 202, 184, 214, { tone: 'dim', dash: true }),
        T(206, 190, '内积为零', { size: 9.5, tone: 'muted' }),
        ...PANEL(330, 50, 272, 156, '〈φₘ|φₙ〉', { tone: 'violet' }),
        ...Array.from({ length: 3 }, (_, i) =>
          Array.from({ length: 3 }, (_, j) => [
            R(392 + j * 54, 96 + i * 34, 54, 34, {
              tone: i === j ? 'mint' : 'faint',
              fill: true,
              opacity: i === j ? 0.3 : 0.1,
              r: 3
            }),
            T(419 + j * 54, 117 + i * 34, i === j ? '1' : '0', {
              size: 10,
              tone: i === j ? 'mint' : 'muted',
              anchor: 'middle',
              mono: true
            })
          ])
        ).flat(2),
        T(384, 117, 'm = 1', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(384, 151, 'm = 2', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(384, 185, 'm = 3', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(320, 230, '对角为一：归一化', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(320, 256, '非对角为零：正交', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '2.4/1-2',
      '正交让概率逐项相加',
      '把态展开为 $\\sum c_n\\varphi_n$，总概率为 $\\sum|c_n|^2$；交叉项因不同能级正交而全部为零，概率可以逐项相加而不互相污染。',
      [
        T(320, 24, '概率相加为一，交叉项消失', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 160, '|cₙ|² 的分布', { tone: 'mint' }),
        L(56, 196, 320, 196, { tone: 'dim' }),
        R(80, 120, 44, 76, { tone: 'mint', fill: true, opacity: 0.3, r: 4 }),
        R(150, 150, 44, 46, { tone: 'cyan', fill: true, opacity: 0.3, r: 4 }),
        R(220, 164, 44, 32, { tone: 'violet', fill: true, opacity: 0.3, r: 4 }),
        T(102, 112, '0.5', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(172, 142, '0.3', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(242, 156, '0.2', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(102, 214, 'E₁', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(172, 214, 'E₂', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(242, 214, 'E₃', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        ...PANEL(344, 50, 256, 160, '总概率', { tone: 'amber' }),
        T(472, 84, 'Σ|cₙ|² = 0.5 + 0.3 + 0.2', { size: 9.5, tone: 'muted', anchor: 'middle', mono: true }),
        T(472, 114, '= 1', { size: 12, tone: 'amber', anchor: 'middle', mono: true }),
        T(472, 148, '交叉项 ∫φₘ*φₙ dx = 0', { size: 9.5, tone: 'mint', anchor: 'middle', mono: true }),
        T(472, 176, '所以全部消失', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 230, '正交使概率可逐项相加', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '不同能级互不污染', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '2.4/2-0',
      '完备性：任意初态都能拆开',
      '一维束缚态的本征函数组完备，任意平方可积的初态都能写成 $\\Psi(x,0)=\\sum c_n\\varphi_n(x)$，而且展开唯一。',
      [
        T(320, 24, '任意初态都能拆成本征态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 252, 150, '任意初态 Ψ(x,0)', { tone: 'violet' }),
        CURVE(
          (x) => Math.sin(x) + 0.5 * Math.sin(2 * x) + 0.3 * Math.sin(3 * x),
          { x: 48, y: 80, w: 224, h: 94 },
          [0, 6.28],
          [-2, 2],
          { tone: 'violet', steps: 160 }
        ),
        T(160, 198, '形状不规则', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(160, 216, '但平方可积', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(318, 50, 288, 150, '拆成三个本征态', { tone: 'mint' }),
        T(334, 74, 'c₁', { size: 9.5, tone: 'mint' }),
        CURVE((x) => Math.sin(x), { x: 358, y: 76, w: 236, h: 26 }, [0, 6.28], [-1, 1], { tone: 'mint', steps: 120 }),
        T(334, 116, 'c₂', { size: 9.5, tone: 'cyan' }),
        CURVE((x) => 0.5 * Math.sin(2 * x), { x: 358, y: 118, w: 236, h: 26 }, [0, 6.28], [-1, 1], {
          tone: 'cyan',
          steps: 120
        }),
        T(334, 158, 'c₃', { size: 9.5, tone: 'amber' }),
        CURVE((x) => 0.3 * Math.sin(3 * x), { x: 358, y: 160, w: 236, h: 26 }, [0, 6.28], [-1, 1], {
          tone: 'amber',
          steps: 120
        }),
        T(320, 226, '系数由内积逐项提取', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '完备性让本征态成为坐标系', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '2.4/2-1',
      '各分量自行转相，期望值不动',
      '把 $\\Psi(x,t)=\\sum c_n\\varphi_n e^{-iE_nt/\\hbar}$ 代入能量期待值，交叉项因正交消失，只剩 $\\sum|c_n|^2E_n$，不随时间变化。',
      [
        T(320, 24, '相位各自旋转，平均值不变', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 288, 156, '各分量的相位', { tone: 'violet' }),
        C(110, 128, 40, { tone: 'violet', dash: true }),
        A(110, 128, 138, 100, { tone: 'violet', weight: 1.4 }),
        T(138, 92, 'e^(−iE₁t/ħ)', { size: 9.5, tone: 'violet', mono: true }),
        C(244, 128, 40, { tone: 'cyan', dash: true }),
        A(244, 128, 216, 100, { tone: 'cyan', weight: 1.4 }),
        T(196, 92, 'e^(−iE₂t/ħ)', { size: 9.5, tone: 'cyan', anchor: 'end', mono: true }),
        T(110, 188, 'ω₁ = E₁/ħ', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(244, 188, 'ω₂ = E₂/ħ', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        ...PANEL(336, 50, 264, 156, '能量期望值', { tone: 'mint' }),
        ...LEVEL(360, 500, 100, 'E₂', { size: 9.5, tone: 'cyan' }),
        ...LEVEL(360, 500, 152, 'E₁', { size: 9.5, tone: 'violet' }),
        L(430, 100, 430, 152, { tone: 'dim', dash: true }),
        DOT(430, 132, { r: 4, tone: 'mint' }),
        T(442, 136, '⟨E⟩', { size: 10, tone: 'mint' }),
        T(360, 190, '交叉项为零，平均数固定', { size: 9.5, tone: 'muted' }),
        T(320, 228, '⟨E⟩ = |c₁|²E₁ + |c₂|²E₂', { size: 10.5, tone: 'muted', anchor: 'middle', mono: true }),
        T(320, 254, '期望值不随时间变化', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '2.4/2-2',
      '四条性质收束成一件工具',
      '非简并保证能级与态一一对应，实函数保证图像清晰，正交性保证展开无交叉，完备性保证任意态都能被表示。',
      [
        T(320, 24, '四条性质，一个结论', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 56, 330, 28, { tone: 'mint', opacity: 0.16, r: 4 }),
        T(52, 75, '非简并：能级与态一一对应', { size: 10, tone: 'mint' }),
        BAND(40, 98, 330, 28, { tone: 'cyan', opacity: 0.16, r: 4 }),
        T(52, 117, '实函数：图像与节点清晰', { size: 10, tone: 'cyan' }),
        BAND(40, 140, 330, 28, { tone: 'violet', opacity: 0.16, r: 4 }),
        T(52, 159, '正交：展开没有交叉项', { size: 10, tone: 'violet' }),
        BAND(40, 182, 330, 28, { tone: 'amber', opacity: 0.16, r: 4 }),
        T(52, 201, '完备：任意态都能展开', { size: 10, tone: 'amber' }),
        A(376, 70, 444, 148, { tone: 'faint', weight: 1.1 }),
        A(376, 112, 444, 154, { tone: 'faint', weight: 1.1 }),
        A(376, 154, 444, 160, { tone: 'faint', weight: 1.1 }),
        A(376, 196, 444, 166, { tone: 'faint', weight: 1.1 }),
        R(450, 122, 152, 68, { tone: 'mint', fill: true, opacity: 0.18, r: 10 }),
        T(526, 148, '本征值问题', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(526, 168, '变成可算的工具', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 238, '四者合力，束缚态问题可计算', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '结构清晰，图像也随之稳定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '2.4/0-0-f',
      '朗斯基行列式：常数被边界压成零',
      '$W[\\varphi_1,\\varphi_2]=\\varphi_1\\varphi_2\'-\\varphi_1\'\\varphi_2$ 与 $x$ 无关；束缚边界要求两端波函数趋零，于是 $W=0$，两解线性相关。',
      [
        T(320, 24, 'W 是常数，边界把它压成零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 270, 152, '两个同能量解', { tone: 'violet' }),
        CURVE((x) => Math.sin(x), { x: 48, y: 82, w: 240, h: 88 }, [0, Math.PI], [-1, 1], {
          tone: 'violet',
          steps: 120
        }),
        CURVE((x) => 0.8 * Math.sin(2 * x), { x: 48, y: 82, w: 240, h: 88 }, [0, Math.PI], [-1, 1], {
          tone: 'cyan',
          dash: true,
          steps: 120
        }),
        T(60, 74, 'φ₁', { size: 9.5, tone: 'violet' }),
        T(120, 74, 'φ₂', { size: 9.5, tone: 'cyan' }),
        T(168, 196, '两端都趋于零', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(320, 50, 280, 152, 'W(x)', { tone: 'mint' }),
        ...AXIS({ x: 342, y: 80, w: 240, h: 96 }, { xLabel: 'x', yLabel: 'W' }),
        L(342, 112, 502, 112, { tone: 'mint', weight: 1.8 }),
        L(342, 172, 582, 172, { tone: 'amber', dash: true }),
        A(540, 112, 540, 166, { tone: 'faint', weight: 1.2 }),
        T(506, 106, '常数', { size: 9.5, tone: 'mint' }),
        T(452, 188, '边界要求 W → 0', { size: 9.5, tone: 'amber' }),
        T(320, 226, '常数又为零 ⇒ 两解线性相关', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '同一能级只留一个独立解', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '2.4/0-1-f',
      '实本征函数：实部虚部只差常数',
      '$\\varphi_n(x)$ 可选取为实函数：复解的实部与虚部满足同一方程，非简并迫使两者线性相关，组合后虚部可以完全消去。',
      [
        T(320, 24, '实部虚部只差一个常数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 156, '复解', { tone: 'violet' }),
        ...AXIS({ x: 54, y: 82, w: 260, h: 100 }, { xLabel: 'x', yLabel: 'φ' }),
        CURVE((x) => Math.sin(x), { x: 54, y: 82, w: 260, h: 100 }, [0, 6.28], [-1, 1], {
          tone: 'violet',
          steps: 120
        }),
        CURVE((x) => 0.7 * Math.cos(x), { x: 54, y: 82, w: 260, h: 100 }, [0, 6.28], [-1, 1], {
          tone: 'cyan',
          dash: true,
          steps: 120
        }),
        T(70, 76, '实部', { size: 9.5, tone: 'violet' }),
        T(118, 76, '虚部', { size: 9.5, tone: 'cyan' }),
        ...PANEL(352, 50, 248, 156, '实解', { tone: 'mint' }),
        ...AXIS({ x: 370, y: 82, w: 212, h: 100 }, { xLabel: 'x', yLabel: 'φ' }),
        CURVE((x) => Math.sin(x), { x: 370, y: 82, w: 212, h: 100 }, [0, 6.28], [-1, 1], {
          tone: 'mint',
          steps: 120
        }),
        DOT(370, 132, { r: 2.5, tone: 'amber' }),
        DOT(476, 132, { r: 2.5, tone: 'amber' }),
        DOT(582, 132, { r: 2.5, tone: 'amber' }),
        T(452, 200, '节点清晰可见', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 230, '实解没有整体复相位', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '概率密度与节点位置都稳定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '2.4/1-0-f',
      'δ_mn：同为一，异为零',
      '$\\int\\varphi_m^*(x)\\varphi_n(x)\\,dx=\\delta_{mn}$；同一本征函数归一化为一，不同能级的内积为零，归一与正交被一条式子写完。',
      [
        T(320, 24, '内积只承认同一能级', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 156, 'm ≠ n：积分为零', { tone: 'violet' }),
        CURVE((x) => Math.sin(x), { x: 54, y: 82, w: 260, h: 98 }, [0, 6.28], [-1, 1], {
          tone: 'violet',
          steps: 140
        }),
        CURVE((x) => Math.sin(2 * x), { x: 54, y: 82, w: 260, h: 98 }, [0, 6.28], [-1, 1], {
          tone: 'cyan',
          dash: true,
          steps: 140
        }),
        T(64, 76, 'φ₁', { size: 9.5, tone: 'violet' }),
        T(104, 76, 'φ₂', { size: 9.5, tone: 'cyan' }),
        T(184, 196, '正负面积恰好抵消', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(352, 50, 248, 156, 'δ_mn 表', { tone: 'mint' }),
        R(410, 86, 64, 40, { tone: 'mint', fill: true, opacity: 0.3, r: 4 }),
        R(474, 86, 64, 40, { tone: 'faint', fill: true, opacity: 0.1, r: 4 }),
        R(410, 126, 64, 40, { tone: 'faint', fill: true, opacity: 0.1, r: 4 }),
        R(474, 126, 64, 40, { tone: 'mint', fill: true, opacity: 0.3, r: 4 }),
        T(442, 110, '1', { size: 11, tone: 'mint', anchor: 'middle', mono: true }),
        T(506, 110, '0', { size: 11, tone: 'muted', anchor: 'middle', mono: true }),
        T(442, 150, '0', { size: 11, tone: 'muted', anchor: 'middle', mono: true }),
        T(506, 150, '1', { size: 11, tone: 'mint', anchor: 'middle', mono: true }),
        T(442, 80, 'n = 1', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(506, 80, 'n = 2', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(400, 110, 'm = 1', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(400, 150, 'm = 2', { size: 9.5, tone: 'faint', anchor: 'end' }),
        T(320, 230, '同为一，异为零', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '归一与正交合并成一条式子', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '2.4/1-1-f',
      '能量差把内积逼成零',
      '$(E_m-E_n)\\int\\varphi_m^*\\varphi_n\\,dx=0$；只要 $m\\neq n$，两个能级不同，第一个因子不为零，内积只能为零。',
      [
        T(320, 24, '能量不同，内积只能为零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 156, '两个能级', { tone: 'mint' }),
        ...LEVEL(60, 270, 90, 'Eₘ', { size: 9.5, tone: 'cyan' }),
        ...LEVEL(60, 270, 168, 'Eₙ', { size: 9.5, tone: 'violet' }),
        A(250, 92, 250, 164, { tone: 'amber', weight: 1.2 }),
        T(258, 132, '≠ 0', { size: 10, tone: 'amber' }),
        T(64, 200, '能级不同：差值不为零', { size: 9.5, tone: 'muted' }),
        ...PANEL(352, 50, 248, 156, '于是', { tone: 'amber' }),
        T(476, 84, '(Eₘ−Eₙ) ∫φₘ*φₙ dx = 0', { size: 9.5, tone: 'muted', anchor: 'middle', mono: true }),
        T(476, 114, '第一个因子 ≠ 0', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(476, 144, '⇒ ∫φₘ*φₙ dx = 0', { size: 10, tone: 'amber', anchor: 'middle', mono: true }),
        T(476, 174, '两个能级正交', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 228, '能量差把内积逼成零', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 254, '这是正交性最直接的来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '2.4/2-0-f',
      '封闭关系：只在同一点有尖峰',
      '$\\sum_n\\varphi_n(x)\\varphi_n^*(x\')=\\delta(x-x\')$；$x\\neq x\'$ 时右边为零，只有同一点才出现尖峰，这是完备性的等价表述。',
      [
        T(320, 24, 'x ≠ x′ 时向右边的零看齐', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 156, 'δ(x − x′)', { tone: 'mint' }),
        ...AXIS({ x: 56, y: 82, w: 260, h: 100 }, { xLabel: 'x' }),
        A(300, 182, 300, 86, { tone: 'mint', weight: 1.8 }),
        T(308, 78, 'x = x′', { size: 9.5, tone: 'mint' }),
        T(96, 168, '其余处处为零', { size: 9.5, tone: 'muted' }),
        ...PANEL(352, 50, 248, 156, '完备性的另一种写法', { tone: 'amber' }),
        T(476, 86, 'Σ φₙ(x) φₙ*(x′) = δ(x−x′)', { size: 9.5, tone: 'amber', anchor: 'middle', mono: true }),
        T(476, 118, '两边夹住 Ψ 取内积', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(476, 144, '就得到展开系数', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(476, 174, '函数空间自洽', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 230, '完备性等价于封闭关系', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '任意态因此都能被表示', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '2.4/2-1-f',
      '能量期待值：概率加权求和',
      '$\\langle E\\rangle=\\sum_n|c_n|^2E_n$，权重 $|c_n|^2$ 是测得 $E_n$ 的概率；权重总和为一，若只有一个分量非零，期待值就是该能级。',
      [
        T(320, 24, '⟨E⟩ 是能级的概率加权', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 300, 160, '能级与权重', { tone: 'mint' }),
        ...LEVEL(60, 286, 96, 'E₃', { size: 9.5, tone: 'cyan' }),
        ...LEVEL(60, 286, 128, 'E₂', { size: 9.5, tone: 'violet' }),
        ...LEVEL(60, 286, 172, 'E₁', { size: 9.5, tone: 'mint' }),
        DOT(210, 96, { r: 3, tone: 'cyan' }),
        DOT(210, 128, { r: 4, tone: 'violet' }),
        DOT(210, 172, { r: 5, tone: 'mint' }),
        T(222, 100, '|c₃|² = 0.2', { size: 9.5, tone: 'cyan' }),
        T(222, 132, '|c₂|² = 0.3', { size: 9.5, tone: 'violet' }),
        T(222, 176, '|c₁|² = 0.5', { size: 9.5, tone: 'mint' }),
        L(60, 144, 320, 144, { tone: 'amber', dash: true }),
        T(316, 138, '⟨E⟩', { size: 10, tone: 'amber', anchor: 'end' }),
        T(64, 202, '虚线高于 E₁，低于 E₂', { size: 9.5, tone: 'muted' }),
        ...PANEL(352, 50, 248, 160, '加权平均', { tone: 'amber' }),
        T(476, 86, '⟨E⟩ = Σ|cₙ|²Eₙ', { size: 11, tone: 'amber', anchor: 'middle', mono: true }),
        T(476, 116, 'Σ|cₙ|² = 1', { size: 9.5, tone: 'mint', anchor: 'middle', mono: true }),
        T(476, 148, '单一分量：⟨E⟩ = Eₙ', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(476, 176, '多次测量才见平均值', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 232, '概率做权重，能级做取值', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '单次测量仍只得到某一个 Eₙ', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
