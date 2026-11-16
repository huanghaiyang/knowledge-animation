import { fig, T, R, BAND, L, A, DOT, P, AXIS, CURVE, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '4.6/overview',
    'tanh 台阶：抹平突变后的精确反射',
    '用 $V(x)=\\frac{V_0}{2}(1+\\tanh\\alpha x)$ 把台阶抹平，过渡宽度约 $1/\\alpha$；变量替换后方程化为超几何方程，反射率随过渡变缓而指数下降。',
    [
      T(320, 24, 'tanh 台阶：抹平突变后的精确反射', { size: 13, tone: 'text', anchor: 'middle' }),
      L(56, 208, 310, 208, { tone: 'dim' }),
      L(56, 208, 186, 208, { tone: 'violet', dash: true }),
      L(186, 208, 186, 86, { tone: 'violet', dash: true }),
      L(186, 86, 310, 86, { tone: 'violet', dash: true }),
      CURVE((x) => (1 + Math.tanh(1.5 * x)) / 2, { x: 56, y: 86, w: 250, h: 122 }, [-3, 3], [0, 1], {
        tone: 'amber',
        weight: 2,
        steps: 120
      }),
      T(60, 222, 'V = 0', { size: 9.5, tone: 'muted' }),
      T(238, 80, 'V₀', { size: 10, tone: 'muted' }),
      T(186, 232, 'x = 0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
      A(150, 246, 222, 246, { tone: 'amber', weight: 1.2 }),
      T(186, 260, '宽 ≈ 1/α', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      ...AXIS({ x: 352, y: 86, w: 236, h: 122 }, { xLabel: 'α', yLabel: '|R|²' }),
      T(346, 90, '0.5', { size: 9.5, tone: 'dim', anchor: 'end' }),
      T(346, 212, '0', { size: 9.5, tone: 'dim', anchor: 'end' }),
      L(352, 120, 588, 120, { tone: 'dim', dash: true }),
      T(584, 112, '方阶极限', { size: 9.5, tone: 'muted', anchor: 'end' }),
      CURVE((x) => 0.36 * (1 - Math.exp(-2 * x)), { x: 352, y: 86, w: 236, h: 122 }, [0, 3.2], [0, 0.5], {
        tone: 'mint',
        weight: 2
      }),
      T(360, 196, 'α → 0：R → 0', { size: 9.5, tone: 'mint' }),
      T(320, 250, '缓台阶几乎不反射，陡台阶回到方阶', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 272, 'V(x) = V₀(1 + tanh αx)/2', { size: 10.5, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '4.6/0-0',
      '把突变面抹平：处处连续的台阶',
      '左侧趋于 0，右侧趋于 $V_0$，过渡区宽度约 $1/\\alpha$；曲线没有尖角，也没有竖直段。',
      [
        T(320, 24, '把突变面抹平：处处连续的台阶', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 208, 320, 208, { tone: 'violet', dash: true }),
        L(320, 208, 320, 78, { tone: 'violet', dash: true }),
        L(320, 78, 580, 78, { tone: 'violet', dash: true }),
        CURVE((x) => (1 + Math.tanh(1.5 * x)) / 2, { x: 60, y: 78, w: 520, h: 130 }, [-3.4, 3.4], [0, 1], {
          tone: 'amber',
          weight: 2,
          steps: 160
        }),
        T(64, 222, 'V = 0', { size: 9.5, tone: 'muted' }),
        T(500, 70, 'V₀', { size: 10, tone: 'muted' }),
        T(320, 60, 'x = 0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(84, 178, 'tanh 曲线', { size: 10, tone: 'amber' }),
        T(430, 116, '一段光滑过渡', { size: 10, tone: 'mint' }),
        A(258, 238, 382, 238, { tone: 'amber', weight: 1.2 }),
        T(320, 252, '过渡宽度 ≈ 1/α', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 274, '无尖角、无突变：导数处处有界', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.6/0-1',
      '连续性的好处：场强有限',
      '方势阶在突变处场强发散，tanh 台阶的导数是一个有界鼓包；金属—半导体界面、渐变折射率与中子散射势都更接近后者。',
      [
        T(320, 24, '连续性的好处：场强不再发散', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 250, 190, '方势阶', { tone: 'danger' }),
        L(52, 118, 150, 118, { tone: 'amber', weight: 2 }),
        L(150, 118, 150, 72, { tone: 'amber', weight: 2 }),
        L(150, 72, 266, 72, { tone: 'amber', weight: 2 }),
        T(238, 66, 'V₀', { size: 9.5, tone: 'amber' }),
        L(52, 220, 266, 220, { tone: 'dim' }),
        P('M 142 220 L 150 158 L 158 220', { tone: 'danger', weight: 1.6 }),
        T(60, 180, '场强成尖峰', { size: 9.5, tone: 'danger' }),
        T(60, 206, '|dV/dx|', { size: 9.5, tone: 'faint' }),
        ...PANEL(320, 44, 286, 190, 'tanh 台阶', { tone: 'mint' }),
        CURVE((x) => (1 + Math.tanh(1.5 * x)) / 2, { x: 338, y: 72, w: 250, h: 46 }, [-3, 3], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        L(338, 220, 588, 220, { tone: 'dim' }),
        CURVE((x) => 1 / Math.cosh(1.5 * x) ** 2, { x: 338, y: 176, w: 250, h: 44 }, [-3, 3], [0, 1], {
          tone: 'cyan',
          weight: 1.5
        }),
        T(338, 166, '导数：一个鼓包', { size: 9.5, tone: 'cyan' }),
        T(338, 66, 'V(x)', { size: 9.5, tone: 'muted' }),
        T(320, 252, '处处连续 ⇒ 场强有限，界面势可描述', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '金属—半导体、折射率渐变、中子散射', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '4.6/0-2',
      '陡则多反射，缓则跟着走',
      '台阶越陡，粒子越容易在界面被反射；台阶越缓，波越能跟着势能变化平滑通过。这个直觉稍后由精确公式定量确认。',
      [
        T(320, 24, '陡则多反射，缓则跟着势能走', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 272, 190, 'α 大：陡', { tone: 'amber' }),
        L(48, 104, 150, 104, { tone: 'amber', weight: 2 }),
        L(150, 104, 150, 70, { tone: 'amber', weight: 2 }),
        L(150, 70, 290, 70, { tone: 'amber', weight: 2 }),
        A(56, 150, 144, 150, { tone: 'mint', weight: 1.4 }),
        T(100, 138, '入射', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        A(144, 178, 64, 178, { tone: 'violet', weight: 2 }),
        T(104, 192, '反射强', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        A(162, 150, 284, 150, { tone: 'cyan', weight: 1, dash: true }),
        T(224, 138, '透射弱', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        ...PANEL(320, 44, 286, 190, 'α 小：缓', { tone: 'mint' }),
        CURVE((x) => (1 + Math.tanh(1.1 * x)) / 2, { x: 334, y: 70, w: 258, h: 34 }, [-3, 3], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        A(342, 150, 430, 150, { tone: 'mint', weight: 1.4 }),
        T(386, 138, '入射', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        A(430, 178, 352, 178, { tone: 'violet', weight: 1, dash: true }),
        T(392, 192, '反射弱', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        A(444, 150, 588, 150, { tone: 'cyan', weight: 1.4 }),
        T(516, 138, '透射强', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 252, '台阶越缓，波越能跟着势能走', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '定量结论留待精确反射系数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.6/1-0',
      '变量替换：实轴压进 (0,1)',
      '令 $\\xi=(1+\\tanh\\alpha x)/2$，把 $x$ 从 −∞ 到 +∞ 映到 $\\xi$ 从 0 到 1；提取两端渐近相位后，方程变成标准超几何方程。',
      [
        T(320, 24, '变量替换：把两端变成两个奇点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 210, 306, 210, { tone: 'dim' }),
        L(56, 86, 306, 86, { tone: 'faint', dash: true }),
        CURVE((x) => (1 + Math.tanh(1.6 * x)) / 2, { x: 56, y: 86, w: 250, h: 124 }, [-3, 3], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        DOT(181, 148, { r: 3, tone: 'amber' }),
        T(56, 76, 'ξ = 1', { size: 9.5, tone: 'mint' }),
        T(56, 224, 'ξ = 0', { size: 9.5, tone: 'faint' }),
        T(316, 224, 'x', { size: 9.5, tone: 'dim' }),
        T(190, 166, 'x = 0：ξ = 1/2', { size: 9.5, tone: 'amber' }),
        ...PANEL(340, 44, 266, 190, '超几何方程', { tone: 'violet' }),
        T(354, 88, 'ξ(1−ξ) ψ″ + [c−(a+b+1)ξ] ψ′', { size: 9.5, tone: 'text', mono: true }),
        T(354, 108, '− ab ψ = 0', { size: 9.5, tone: 'text', mono: true }),
        T(354, 140, '奇点：ξ = 0、1、∞', { size: 10, tone: 'violet' }),
        T(354, 164, '每端各留一支行波', { size: 10, tone: 'muted' }),
        T(354, 188, '参数由 k₁、k₂、α 组合', { size: 10, tone: 'cyan' }),
        T(320, 252, '同一方程，两端各给一支行波', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '映射单调有界，端点只是极限', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.6/1-1',
      '两支解与三个参数',
      '两个独立解为 ${}_2F_1(a,b;c;\\xi)$ 与 $\\xi^{1-c}{}_2F_1(\\dots)$；参数由 $k_1$、$k_2$、$\\alpha$ 组合，$c$ 与 $1-c$ 分别管住两端。',
      [
        T(320, 24, '两支解与三个参数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 286, 190, '两个独立解', { tone: 'mint' }),
        T(48, 84, 'ψ₁ = ₂F₁(a, b; c; ξ)', { size: 10.5, tone: 'mint', mono: true }),
        T(48, 114, 'ψ₂ = ξ^(1−c) ₂F₁(…)', { size: 10.5, tone: 'violet', mono: true }),
        T(48, 148, 'c 的虚部管 ξ → 0 端', { size: 9.5, tone: 'muted' }),
        T(48, 172, '1 − c 管另一端', { size: 9.5, tone: 'muted' }),
        T(48, 196, 'c 非整数 ⇒ 两支独立', { size: 9.5, tone: 'cyan' }),
        T(48, 218, 'ξ → 1 处两者都光滑', { size: 9.5, tone: 'faint' }),
        ...PANEL(320, 44, 286, 190, '参数从哪来', { tone: 'violet' }),
        DOT(338, 80, { r: 3, tone: 'mint' }),
        T(348, 84, 'k₁ = √(2mE)/ħ', { size: 10, tone: 'mint', mono: true }),
        DOT(338, 112, { r: 3, tone: 'cyan' }),
        T(348, 116, 'k₂ = √(2m(E−V₀))/ħ', { size: 10, tone: 'cyan', mono: true }),
        DOT(338, 144, { r: 3, tone: 'amber' }),
        T(348, 148, 'α：过渡区宽度的倒数', { size: 10, tone: 'amber' }),
        T(336, 178, 'a、b、c 由三者组合', { size: 10, tone: 'muted' }),
        T(336, 202, 'c 直接出现在幂次上', { size: 10, tone: 'violet' }),
        T(320, 252, '三个参数概括两端的匹配信息', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '参数定下，两支解就定下', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '4.6/1-2',
      '连接公式：从 ξ = 0 走到 ξ = 1',
      '把解从 $\\xi=0$ 解析延拓到 $\\xi=1$，连接系数是一组伽马函数的比值；反射与透射的振幅就藏在这些比值里。',
      [
        T(320, 24, '连接公式：从 ξ = 0 走到 ξ = 1', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(150, 64, 150, 216, { tone: 'dim', dash: true }),
        L(490, 64, 490, 216, { tone: 'dim', dash: true }),
        T(146, 58, 'ξ = 0', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(494, 58, 'ξ = 1', { size: 9.5, tone: 'dim' }),
        CURVE((x) => Math.sin(x / 9), { x: 52, y: 96, w: 88, h: 34 }, [0, 88], [-1, 1], { tone: 'mint', steps: 90 }),
        T(44, 148, '入射侧：相位振荡', { size: 9.5, tone: 'mint' }),
        CURVE((x) => Math.sin(x / 9), { x: 500, y: 96, w: 90, h: 34 }, [0, 90], [-1, 1], {
          tone: 'cyan',
          steps: 90
        }),
        T(500, 148, '出射侧：相位振荡', { size: 9.5, tone: 'cyan' }),
        A(162, 78, 478, 78, { tone: 'amber', weight: 1.4, dash: true }),
        T(320, 70, '解析延拓', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        R(170, 158, 300, 52, { tone: 'violet', fill: true, opacity: 0.14, r: 8 }),
        T(320, 180, '连接系数：伽马函数之比', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(320, 200, '振幅藏在比值里', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 240, 'C₁、C₂ 决定 R 与 T 的振幅', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '延拓走通，反射系数就出来了', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.6/2-0',
      '精确反射系数：两种能量区间',
      '分子是两侧波数差的 $\\sinh^2$，分母是波数和的 $\\sinh^2$；$E>V_0$ 时 $k_2$ 为实数，$E<V_0$ 时 $k_2=i\\kappa$，分子分母模相等，反射率自动为 1。',
      [
        T(320, 24, '两种能量区间，同一个公式', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 272, 180, 'E > V₀', { tone: 'mint' }),
        L(170, 68, 170, 196, { tone: 'dim', dash: true }),
        CURVE((x) => Math.sin(x / 8), { x: 52, y: 92, w: 110, h: 26 }, [0, 110], [-1, 1], { tone: 'mint' }),
        CURVE((x) => 0.6 * Math.sin(-x / 8 + 0.8), { x: 52, y: 132, w: 110, h: 26 }, [0, 110], [-1, 1], {
          tone: 'violet',
          dash: true
        }),
        CURVE((x) => Math.sin(x / 11), { x: 180, y: 92, w: 96, h: 26 }, [0, 96], [-1, 1], { tone: 'cyan' }),
        T(52, 176, 'k₂ 为实：两边都振荡', { size: 9.5, tone: 'muted' }),
        T(52, 202, 'R < 1：仍有透射', { size: 9.5, tone: 'muted' }),
        ...PANEL(320, 44, 286, 180, 'E < V₀', { tone: 'violet' }),
        L(460, 68, 460, 196, { tone: 'dim', dash: true }),
        CURVE((x) => Math.sin(x / 8), { x: 336, y: 92, w: 118, h: 26 }, [0, 118], [-1, 1], { tone: 'mint' }),
        CURVE((x) => Math.sin(-x / 8 + 0.6), { x: 336, y: 132, w: 118, h: 26 }, [0, 118], [-1, 1], {
          tone: 'violet'
        }),
        CURVE((x) => Math.exp(-x / 32), { x: 470, y: 92, w: 120, h: 52 }, [0, 120], [0, 1], { tone: 'amber' }),
        T(474, 158, 'k₂ = iκ：倏逝尾巴', { size: 9.5, tone: 'amber' }),
        T(336, 202, 'R = 1：没有出射通道', { size: 9.5, tone: 'amber' }),
        T(320, 250, 'k₂ 变虚后，分子分母模相等', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '低于台阶顶部：反射率满格', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.6/2-1',
      '两个极限：宽过渡透明，陡过渡退化',
      'α→0 时 sinh 的自变量很大，反射率按 $e^{-2\\pi k_2/\\alpha}$ 迅速趋零；α→∞ 时自变量很小，退化为方势阶的 $(k_1-k_2)^2/(k_1+k_2)^2$。',
      [
        T(320, 24, '两个极限：宽过渡透明，陡过渡退化', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 286, 186, 'α → 0：指数趋零', { tone: 'mint' }),
        ...AXIS({ x: 68, y: 76, w: 224, h: 118 }, { xLabel: 'α', yLabel: '|R|²' }),
        CURVE((x) => Math.exp(-1.2 / x), { x: 68, y: 76, w: 224, h: 118 }, [0, 3], [0, 1], { tone: 'mint', weight: 2 }),
        T(76, 92, 'α 小：几乎透明', { size: 9.5, tone: 'mint' }),
        T(60, 218, '衰减 ~ e^(−2πk₂/α)', { size: 9.5, tone: 'muted' }),
        ...PANEL(320, 44, 286, 186, 'α → ∞：回到方阶', { tone: 'amber' }),
        R(336, 78, 254, 32, { tone: 'amber', fill: true, opacity: 0.14, r: 6 }),
        T(463, 98, 'sinh x ≈ x', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        L(336, 128, 590, 128, { tone: 'dim' }),
        T(463, 150, '|R|² → (k₁−k₂)²/(k₁+k₂)²', { size: 10.5, tone: 'text', anchor: 'middle' }),
        T(336, 180, '方势阶的旧结果', { size: 9.5, tone: 'muted' }),
        T(336, 206, '陡台阶：突变极限', { size: 9.5, tone: 'muted' }),
        T(320, 252, '极限由 sinh 的自变量大小决定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '过渡越陡，越接近突变台阶', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '4.6/2-2',
      '反射量度的是过渡，不是高度差',
      '同样的高度差，界面越缓反射越弱：反射来自势能变化的突变程度，而不是势能差本身；这是渐变涂层与阻抗匹配的量子版本。',
      [
        T(320, 24, '反射量度的是过渡，不是高度差', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 210, 588, 210, { tone: 'dim' }),
        L(56, 84, 588, 84, { tone: 'dim', dash: true }),
        T(56, 224, 'V = 0', { size: 9.5, tone: 'muted' }),
        T(470, 76, '高度差相同', { size: 9.5, tone: 'muted' }),
        CURVE((x) => (1 + Math.tanh(0.7 * x)) / 2, { x: 56, y: 84, w: 520, h: 126 }, [-3.4, 3.4], [0, 1], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => (1 + Math.tanh(3.2 * x)) / 2, { x: 56, y: 84, w: 520, h: 126 }, [-3.4, 3.4], [0, 1], {
          tone: 'violet',
          weight: 2,
          dash: true,
          steps: 160
        }),
        T(70, 152, '缓：反射弱', { size: 9.5, tone: 'mint' }),
        T(404, 168, '陡：反射强', { size: 9.5, tone: 'violet' }),
        T(320, 252, '同样的高度差，界面越缓反射越弱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '渐变涂层与阻抗匹配的原型', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '4.6/0-0-f',
      '公式解剖：高度 V₀ 与过渡宽度',
      '$V(x)=\\frac{V_0}{2}(1+\\tanh\\alpha x)$：$V_0$ 给高度，$1/2$ 保证两端取 0 与 $V_0$，$\\alpha$ 给过渡宽度的倒数。',
      [
        T(320, 24, '公式解剖：高度、形状、过渡宽度', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'V(x) = (V₀/2) · [1 + tanh(αx)]', { size: 11.5, tone: 'text', anchor: 'middle', mono: true }),
        T(56, 76, 'V₀：台阶总高度', { size: 10, tone: 'amber' }),
        T(240, 76, '1/2：两端落在 0 与 V₀', { size: 10, tone: 'violet' }),
        T(432, 76, 'α：宽度的倒数', { size: 10, tone: 'mint' }),
        L(60, 204, 560, 204, { tone: 'dim' }),
        L(60, 96, 560, 96, { tone: 'dim', dash: true }),
        CURVE((x) => (1 + Math.tanh(0.5 * x)) / 2, { x: 60, y: 96, w: 500, h: 108 }, [-3, 3], [0, 1], {
          tone: 'cyan',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => (1 + Math.tanh(1.4 * x)) / 2, { x: 60, y: 96, w: 500, h: 108 }, [-3, 3], [0, 1], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => (1 + Math.tanh(3.2 * x)) / 2, { x: 60, y: 96, w: 500, h: 108 }, [-3, 3], [0, 1], {
          tone: 'violet',
          weight: 2,
          dash: true,
          steps: 160
        }),
        L(310, 150, 310, 204, { tone: 'faint', dash: true }),
        DOT(310, 150, { r: 3, tone: 'amber' }),
        T(318, 170, 'V₀/2', { size: 9.5, tone: 'amber' }),
        T(60, 220, 'V = 0', { size: 9.5, tone: 'muted' }),
        T(520, 88, 'V₀', { size: 9.5, tone: 'muted' }),
        T(66, 176, 'α 小：斜坡缓', { size: 9.5, tone: 'cyan' }),
        T(520, 124, 'α 大：接近方阶', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(320, 242, 'x = 0 处正好升到一半', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, 'α → 0 趋于斜坡，α → ∞ 趋于方阶', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.6/0-1-f',
      'ξ 映射：取值范围是 (0,1)',
      '$\\xi=\\frac{1+\\tanh\\alpha x}{2}\\in(0,1)$：单调映射，端点只是极限不可达；反解 $x=\\ln[\\xi/(1-\\xi)]/2\\alpha$。',
      [
        T(320, 24, 'ξ 映射：取值范围是 (0,1)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(56, 54, 'ξ = (1 + tanh αx) / 2', { size: 11.5, tone: 'text', mono: true }),
        L(56, 202, 306, 202, { tone: 'dim' }),
        L(56, 92, 306, 92, { tone: 'faint', dash: true }),
        CURVE((x) => (1 + Math.tanh(1.6 * x)) / 2, { x: 56, y: 92, w: 250, h: 110 }, [-3, 3], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        L(181, 147, 181, 202, { tone: 'dim', dash: true }),
        DOT(181, 147, { r: 3, tone: 'amber' }),
        T(188, 176, 'ξ = 1/2', { size: 9.5, tone: 'amber' }),
        T(56, 84, 'ξ = 1', { size: 9.5, tone: 'mint' }),
        T(56, 216, 'ξ = 0', { size: 9.5, tone: 'faint' }),
        T(316, 216, 'x', { size: 9.5, tone: 'dim' }),
        T(332, 96, '端点 0、1：只是极限', { size: 10, tone: 'muted' }),
        T(332, 120, '单调：x 与 ξ 一一对应', { size: 10, tone: 'muted' }),
        T(332, 144, '反解含 ln[ξ/(1−ξ)]', { size: 10, tone: 'cyan' }),
        T(332, 168, '区间内光滑，无奇点', { size: 10, tone: 'muted' }),
        T(332, 192, '两端行为由幂次决定', { size: 10, tone: 'violet' }),
        T(320, 242, '有界的 ξ 把两端变成方程奇点', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '取值范围本身就是解的支点', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.6/1-0-f',
      '方程本身：三个奇点，两种指数',
      '超几何方程在 $\\xi=0$、$1$、$\\infty$ 处退化，每处给出一对指数；$c$ 与 $1-c$ 就是 $\\xi\\to0$ 那一端的两个指数。',
      [
        T(320, 24, '方程本身：三个奇点，两种指数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 110, 520, 110, { tone: 'dim' }),
        A(512, 110, 542, 110, { tone: 'dim' }),
        DOT(100, 110, { r: 3.5, tone: 'mint' }),
        DOT(330, 110, { r: 3.5, tone: 'violet' }),
        DOT(554, 110, { r: 3.5, tone: 'amber' }),
        T(100, 96, 'ξ = 0', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(330, 96, 'ξ = 1', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(554, 96, 'ξ → ∞', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(100, 134, '指数 0 与 1−c', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(330, 134, '指数 0 与 c−a−b', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(554, 134, '指数 a 与 b', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(70, 172, '[c − (a+b+1)ξ] ψ′：一阶项', { size: 10, tone: 'muted' }),
        T(70, 196, '−ab ψ：常数项，管大 ξ 行为', { size: 10, tone: 'muted' }),
        T(70, 220, 'ξ(1−ξ)：两个端点都退化', { size: 10, tone: 'muted' }),
        T(320, 252, '奇点处方程退化，必须单独匹配', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '三个奇点对应三个渐近区域', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.6/1-1-f',
      '解的三个因子：两个相位 + 一个级数',
      '$\\psi=\\xi^{ik_1/2\\alpha}(1-\\xi)^{-ik_2/2\\alpha}{}_2F_1(a,b;c;\\xi)$：左端相位给入射，右端相位给出射，级数在中间光滑。',
      [
        T(320, 24, '解的三个因子：两个相位 + 一个级数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 58, 168, 28, { tone: 'mint', opacity: 0.2 }),
        T(124, 77, 'ξ^(ik₁/2α)', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(216, 77, '×', { size: 12, tone: 'text' }),
        BAND(230, 58, 190, 28, { tone: 'cyan', opacity: 0.2 }),
        T(325, 77, '(1−ξ)^(−ik₂/2α)', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
        T(428, 77, '×', { size: 12, tone: 'text' }),
        BAND(442, 58, 150, 28, { tone: 'violet', opacity: 0.2 }),
        T(517, 77, '₂F₁(a,b;c;ξ)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(40, 110, '左端相位：入射波', { size: 9.5, tone: 'mint' }),
        T(230, 110, '右端相位：出射波', { size: 9.5, tone: 'cyan' }),
        T(442, 110, '级数在中间光滑', { size: 9.5, tone: 'violet' }),
        T(40, 146, 'ξ → 0：|ψ| 恒定，只有相位', { size: 10, tone: 'muted' }),
        T(40, 170, 'ξ → 1：幂次给出另一支行波', { size: 10, tone: 'muted' }),
        T(40, 194, 'c 的虚部：两端的振荡快慢', { size: 10, tone: 'violet' }),
        T(40, 224, '振幅不随 ξ 变，只差一个相位', { size: 10, tone: 'text' }),
        T(320, 252, '三个因子各管一段，合起来管全程', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'c 决定幂次，也就决定反射相位', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.6/2-0-f',
      '|R|²：分子分母同一种结构',
      '$|R|^2=\\frac{\\sinh^2[\\pi(k_1-k_2)/2\\alpha]}{\\sinh^2[\\pi(k_1+k_2)/2\\alpha]}$：波数差进分子，波数和进分母，比值恒在 0 与 1 之间。',
      [
        T(320, 24, '|R|²：分子分母同一种结构', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 56, 250, 26, { tone: 'mint', opacity: 0.22 }),
        T(185, 73, 'sinh²[π(k₁−k₂)/2α]', { size: 10, tone: 'mint', anchor: 'middle' }),
        L(60, 90, 310, 90, { tone: 'text' }),
        BAND(60, 96, 250, 26, { tone: 'violet', opacity: 0.22 }),
        T(185, 113, 'sinh²[π(k₁+k₂)/2α]', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(60, 148, 'k₁ = k₂：无界面 ⇒ R = 0', { size: 9.5, tone: 'muted' }),
        T(60, 170, 'k₂ → 0：分母 → 分子 ⇒ R → 1', { size: 9.5, tone: 'muted' }),
        T(60, 192, 'k₂ = iκ：模相等 ⇒ R = 1', { size: 9.5, tone: 'violet' }),
        T(60, 214, 'π/2α：过渡区的波数量级', { size: 9.5, tone: 'faint' }),
        T(60, 238, '比值恒在 0 与 1 之间', { size: 10, tone: 'amber' }),
        ...AXIS({ x: 374, y: 78, w: 206, h: 132 }, { yLabel: '|R|²' }),
        CURVE((x) => ((1 - x) / (1 + x)) ** 2, { x: 374, y: 78, w: 206, h: 132 }, [0, 1], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        T(580, 226, 'k₂/k₁', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(368, 82, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(368, 214, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(374, 226, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(480, 116, 'k₂ 增大：R 下降', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 252, '分子与分母同阶：比值不超过一', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '两个波数差决定反射强弱', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.6/2-1-f',
      '两个极限：自变量大与小',
      'α→0 时 $\\sinh$ 自变量很大，$|R|^2$ 按 $e^{-2\\pi k_2/\\alpha}$ 趋零；α→∞ 时自变量很小，$\\sinh x\\approx x$，退化为方阶比值。',
      [
        T(320, 24, '两个极限：自变量大与小', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 286, 190, 'α → 0：自变量大', { tone: 'mint' }),
        T(48, 80, 'sinh x ≈ e^x / 2', { size: 10.5, tone: 'mint', mono: true }),
        T(48, 106, '分子分母相差 e^(−2πk₂/α)', { size: 9.5, tone: 'muted' }),
        T(48, 132, '⇒ |R|² → 0', { size: 11, tone: 'amber' }),
        CURVE((x) => Math.exp(-1.5 * x), { x: 48, y: 154, w: 240, h: 40 }, [0, 3], [0, 1], { tone: 'mint' }),
        T(48, 214, '过渡极宽：几乎无反射', { size: 9.5, tone: 'muted' }),
        ...PANEL(320, 44, 286, 190, 'α → ∞：自变量小', { tone: 'amber' }),
        T(334, 80, 'sinh x ≈ x', { size: 10.5, tone: 'amber', mono: true }),
        T(334, 106, '比值化为波数差的平方比', { size: 9.5, tone: 'muted' }),
        T(334, 136, '|R|² → (k₁−k₂)²/(k₁+k₂)²', { size: 10.5, tone: 'text', mono: true }),
        T(334, 164, '回到方势阶的旧结果', { size: 9.5, tone: 'muted' }),
        T(334, 190, '陡台阶：突变极限', { size: 9.5, tone: 'muted' }),
        T(334, 214, '两侧波数相等时仍为零', { size: 9.5, tone: 'faint' }),
        T(320, 252, '同一个公式，两种 sinh 近似', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '反射由突变程度决定，不由高度差决定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
