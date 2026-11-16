import { fig, T, BAND, L, A, C, DOT, E, P, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '8.2/overview',
    '角向解：球面上筛出两个量子数',
    '角向方程拆成方位角与极角：$\\Phi=e^{im\\varphi}$ 的单值性给整数 $m$，极角方程的正则性给 $l$ 与 $|m|\\le l$。',
    [
      T(320, 24, '角向解：球面上筛出两个量子数', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 42, 186, 192, '① 方位角', { tone: 'mint' }),
      T(40, 74, 'd²Φ/dφ² = −m²Φ', { size: 9.5, tone: 'mint' }),
      C(118, 152, 34, { tone: 'faint' }),
      DOT(118, 152, { r: 2, tone: 'dim' }),
      L(118, 152, 152, 152, { tone: 'faint' }),
      A(118, 152, 148, 136, { tone: 'amber' }),
      P('M152 152 A 34 34 0 0 0 146 137', { tone: 'amber', opacity: 0.8 }),
      T(146, 166, 'φ', { size: 9.5, tone: 'amber' }),
      T(84, 204, '2π 后回到自身', { size: 9.5, tone: 'muted' }),
      T(40, 224, '⇒ m 取整数', { size: 9.5, tone: 'amber' }),
      ...PANEL(220, 42, 186, 192, '② 极角', { tone: 'violet' }),
      T(232, 74, 'x = cos θ', { size: 9.5, tone: 'violet' }),
      L(238, 192, 340, 192, { tone: 'dim' }),
      A(332, 192, 344, 192, { tone: 'dim' }),
      L(238, 192, 238, 116, { tone: 'dim' }),
      A(238, 124, 238, 114, { tone: 'dim' }),
      CURVE((x) => Math.sin(x), { x: 238, y: 116, w: 100, h: 76 }, [0, Math.PI], [0, 1.05], {
        tone: 'mint',
        weight: 1.8
      }),
      L(238, 192, 238, 198, { tone: 'dim' }),
      L(288, 192, 288, 198, { tone: 'dim' }),
      L(338, 192, 338, 198, { tone: 'dim' }),
      T(238, 210, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(288, 210, 'π/2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(338, 210, 'π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(232, 112, 'P', { size: 9.5, tone: 'muted', anchor: 'end' }),
      T(232, 228, '两极正则 ⇒ l 为整数', { size: 9.5, tone: 'muted' }),
      ...PANEL(412, 42, 186, 192, '③ 球谐', { tone: 'cyan' }),
      T(424, 74, 'Y_lm = N · P · e^(imφ)', { size: 9.5, tone: 'cyan' }),
      C(470, 148, 10, { tone: 'mint', fill: true, opacity: 0.3 }),
      E(534, 128, 13, 24, { tone: 'violet', fill: true, opacity: 0.24 }),
      E(534, 172, 13, 24, { tone: 'violet', fill: true, opacity: 0.24 }),
      T(464, 190, 'l=0', { size: 9.5, tone: 'mint', anchor: 'middle' }),
      T(534, 204, 'l=1', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(424, 226, '宇称 (−1)^l，只由 l 定', { size: 9.5, tone: 'amber' }),
      T(320, 252, 'φ 给 m，θ 给 l，合起来是 Y_lm', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 272, '球谐函数是球面上的驻波', { size: 9.5, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '8.2/0-0',
      'φ 方向：最简单的本征方程',
      '角向方程里的 $\\varphi$ 部分为 $d^2\\Phi/d\\varphi^2=-m^2\\Phi$，解是 $e^{\\pm im\\varphi}$，正负对应两种绕向。',
      [
        T(320, 24, 'φ 方向：最简单的本征方程', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 60, 'd²Φ/dφ² = −m²Φ', { size: 11, tone: 'violet' }),
        T(60, 86, '解：Φ = e^(±imφ)', { size: 10, tone: 'mint' }),
        T(60, 120, 'm² 是分离常数', { size: 9.5, tone: 'muted' }),
        T(60, 144, '正负号 = 两个旋转方向', { size: 9.5, tone: 'amber' }),
        T(60, 168, '|Φ| 恒定，只有相位在转', { size: 9.5, tone: 'cyan' }),
        C(440, 150, 56, { tone: 'faint' }),
        P('M440 94 A 56 56 0 0 1 492 122', { tone: 'mint', weight: 1.5 }),
        A(486, 114, 494, 126, { tone: 'mint', weight: 1.5 }),
        P('M440 206 A 56 56 0 0 1 388 178', { tone: 'violet', weight: 1.5 }),
        A(394, 186, 386, 176, { tone: 'violet', weight: 1.5 }),
        DOT(440, 150, { r: 2.5, tone: 'dim' }),
        T(452, 96, '+m', { size: 10, tone: 'mint' }),
        T(398, 216, '−m', { size: 10, tone: 'violet' }),
        T(440, 232, '绕 z 轴的两个方向', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '方程只含二阶导，m 只在系数里', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.2/0-1',
      '单值性把 m 锁成整数',
      '波函数转一圈必须回到自身，$\\Phi(\\varphi+2\\pi)=\\Phi(\\varphi)$ 要求 $e^{i2\\pi m}=1$，故 $m$ 为整数。',
      [
        T(320, 24, '单值性：转一圈必须回到原位', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(48, 58, 'Φ(φ + 2π) = Φ(φ)', { size: 11, tone: 'mint' }),
        T(48, 84, '⇒ e^(i2πm) = 1', { size: 10.5, tone: 'amber' }),
        T(48, 108, '⇒ m 为整数', { size: 10.5, tone: 'violet' }),
        C(200, 180, 46, { tone: 'faint' }),
        P('M200 134 A 46 46 0 0 1 244 168', { tone: 'mint', weight: 1.5 }),
        A(238, 160, 246, 170, { tone: 'mint' }),
        DOT(200, 134, { r: 3, tone: 'amber' }),
        T(190, 126, 'φ=0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(250, 172, '2π', { size: 9.5, tone: 'muted' }),
        T(300, 140, '整数 m：首尾接得上', { size: 10, tone: 'mint' }),
        T(300, 164, '非整数：出现缺口', { size: 10, tone: 'danger' }),
        T(300, 188, '波函数必须单值', { size: 9.5, tone: 'muted' }),
        T(300, 212, '这是拓扑约束，不是近似', { size: 9.5, tone: 'faint' }),
        T(48, 238, '振幅与相位在 2π 后必须重合', { size: 9.5, tone: 'muted' }),
        T(48, 260, '于是 m = 0, ±1, ±2, …', { size: 10.5, tone: 'cyan' })
      ]
    ),
    '0-2': fig(
      '8.2/0-2',
      'm 就是角动量的 z 投影',
      '$m$ 是 $\\hat L_z$ 的投影量子数：正负号对应绕 $z$ 轴的两个旋转方向，同一 $l$ 共有 $2l+1$ 种朝向。',
      [
        T(320, 24, 'm 就是角动量的 z 投影', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(48, 58, 'L̂_z Φ = mħ Φ', { size: 11, tone: 'cyan' }),
        T(48, 82, '正负号对应两种绕向', { size: 10, tone: 'muted' }),
        T(48, 116, 'm = +l：投影朝上', { size: 9.5, tone: 'mint' }),
        T(48, 140, 'm = −l：投影朝下', { size: 9.5, tone: 'violet' }),
        T(48, 164, '同一 l 有 2l+1 种朝向', { size: 9.5, tone: 'amber' }),
        T(48, 188, '朝向不同，能量相同', { size: 9.5, tone: 'muted' }),
        T(48, 212, '外加磁场才会把它们分开', { size: 9.5, tone: 'cyan' }),
        T(48, 240, 'm 由边界条件定，不是自由参数', { size: 9.5, tone: 'faint' }),
        L(440, 96, 386, 200, { tone: 'faint' }),
        L(440, 96, 494, 200, { tone: 'faint' }),
        E(440, 200, 54, 14, { tone: 'faint' }),
        L(440, 96, 440, 214, { tone: 'cyan', dash: true }),
        A(440, 96, 470, 180, { tone: 'amber', weight: 1.6 }),
        T(476, 178, 'L', { size: 10, tone: 'amber' }),
        T(446, 220, 'L_z = mħ', { size: 9.5, tone: 'cyan' }),
        T(320, 268, '一个整数，标记一种绕 z 轴的转法', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.2/1-0',
      'x = cos θ：极角方程化成标准形',
      '令 $x=\\cos\\theta$，极角方程变成连带勒让德方程；解在 $\\theta=0$、$\\pi$ 正则，就要求 $l$ 为非负整数且 $|m|\\le l$。',
      [
        T(320, 24, 'x = cos θ：把极角方程变标准形', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(48, 58, 'θ ∈ [0, π] ⇒ x ∈ [−1, 1]', { size: 10, tone: 'violet' }),
        T(48, 82, '方程化为连带勒让德方程', { size: 9.5, tone: 'muted' }),
        L(120, 90, 120, 210, { tone: 'dim' }),
        T(120, 80, 'θ=0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(120, 226, 'θ=π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(260, 90, 260, 210, { tone: 'dim' }),
        T(276, 92, 'x=1', { size: 9.5, tone: 'muted' }),
        T(276, 212, 'x=−1', { size: 9.5, tone: 'muted' }),
        A(126, 90, 254, 90, { tone: 'mint', dash: true }),
        A(126, 210, 254, 210, { tone: 'violet', dash: true }),
        T(186, 80, 'cos', { size: 9.5, tone: 'mint' }),
        T(186, 200, 'cos', { size: 9.5, tone: 'violet' }),
        T(330, 96, '两极是方程的奇点', { size: 10, tone: 'amber' }),
        T(330, 122, '(1−x²) 在 x=±1 归零', { size: 9.5, tone: 'mint' }),
        T(330, 148, '−m²/(1−x²) 在此发散', { size: 9.5, tone: 'violet' }),
        T(330, 174, '正则 ⇒ l 为非负整数', { size: 9.5, tone: 'cyan' }),
        T(330, 200, '且必须 |m| ≤ l', { size: 9.5, tone: 'violet' }),
        T(48, 250, '两极点各筛一次，l 与 m 都被锁住', { size: 9.5, tone: 'muted' }),
        T(320, 274, '换元不改物理，只把区间摆平', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.2/1-1',
      'P_l^m 带因子，两极才平滑',
      '满足条件的解是 $P_l^m(x)$，它带 $(1-x^2)^{|m|/2}$ 因子；$|m|=l$ 时只剩单瓣 $\\sin^{l}\\theta$。',
      [
        T(320, 24, 'P_l^m 带 (1−x²)^(|m|/2)：两极平滑', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 104, w: 250, h: 100 }, { xLabel: 'θ', yLabel: 'P', tone: 'dim' }),
        CURVE((t) => Math.cos(t), { x: 60, y: 104, w: 250, h: 100 }, [0, Math.PI], [-1.1, 1.1], {
          tone: 'mint',
          weight: 1.9
        }),
        CURVE((t) => Math.sin(t), { x: 60, y: 104, w: 250, h: 100 }, [0, Math.PI], [-1.1, 1.1], {
          tone: 'violet',
          weight: 1.9
        }),
        T(66, 114, '|m|=0：cos θ', { size: 9.5, tone: 'mint' }),
        T(66, 194, '|m|=1：sin θ', { size: 9.5, tone: 'violet' }),
        T(60, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(185, 218, 'π/2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 218, 'π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(340, 100, '|m|=0：不额外压零点', { size: 9.5, tone: 'mint' }),
        T(340, 126, '|m|=l：单瓣 sin^l', { size: 9.5, tone: 'violet' }),
        T(340, 152, '因子在两极为零', { size: 9.5, tone: 'cyan' }),
        T(340, 178, '所以解在极点收敛', { size: 9.5, tone: 'muted' }),
        T(340, 204, 'l 定次数，m 定零点结构', { size: 9.5, tone: 'amber' }),
        T(340, 230, 'x=±1 处必须有限', { size: 9.5, tone: 'faint' }),
        T(320, 256, '零点数由 l − |m| 决定', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '极点正则把 l、m 一起定下', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '8.2/1-2',
      'l(l+1) 成了角动量的本征值',
      '分离常数 $l(l+1)$ 有了物理含义：$\\hat L^2$ 的本征值；同一 $l$ 的 $2l+1$ 个 $m$ 共享同一 $L^2$。',
      [
        T(320, 24, 'l(l+1)：分离常数变成本征值', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 56, 'L̂² Y_lm = l(l+1)ħ² Y_lm', { size: 11.5, tone: 'violet', anchor: 'middle' }),
        ...[236, 196, 156, 116].flatMap((y) => LEVEL(110, 300, y, '', { tone: 'violet' })),
        T(104, 239, 'l=0', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(104, 199, 'l=1', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(104, 159, 'l=2', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(104, 119, 'l=3', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(308, 239, '0', { size: 9.5, tone: 'amber' }),
        T(308, 199, '2ħ²', { size: 9.5, tone: 'amber' }),
        T(308, 159, '6ħ²', { size: 9.5, tone: 'amber' }),
        T(308, 119, '12ħ²', { size: 9.5, tone: 'amber' }),
        T(380, 100, '间隔越来越大', { size: 9.5, tone: 'muted' }),
        T(380, 124, 'l 越大，角动量越大', { size: 9.5, tone: 'violet' }),
        T(380, 148, 'ħ√(l(l+1))：不是 lħ', { size: 9.5, tone: 'cyan' }),
        T(380, 172, '同一 l，能量都一样', { size: 9.5, tone: 'amber' }),
        T(380, 196, 'm 不进入 L² 的本征值', { size: 9.5, tone: 'muted' }),
        T(380, 220, '这就是 2l+1 重简并的来源', { size: 9.5, tone: 'faint' }),
        T(320, 258, '分离常数获得离散含义', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '角动量平方只能取这些值', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.2/2-0',
      '球谐函数：三个因子相乘',
      '把归一化的 $\\Phi$ 与 $P_l^m$ 相乘得到 $Y_{lm}$；归一化要求在整个球面上积分为 1。',
      [
        T(320, 24, '球谐函数：三个因子相乘', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'Y_lm = N_lm · P_l^|m|(cosθ) · e^(imφ)', { size: 10.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 64, 170, 26, { tone: 'amber', opacity: 0.18, r: 5 }),
        T(121, 80, 'N：归一化', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        BAND(222, 64, 190, 26, { tone: 'violet', opacity: 0.18, r: 5 }),
        T(317, 80, 'P：极角形状', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(428, 64, 176, 26, { tone: 'mint', opacity: 0.18, r: 5 }),
        T(516, 80, 'e^(imφ)：方位相位', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        E(180, 148, 16, 30, { tone: 'violet', fill: true, opacity: 0.24, rotate: -25 }),
        E(180, 196, 16, 30, { tone: 'violet', fill: true, opacity: 0.24, rotate: -25 }),
        T(340, 116, 'N 使 ∫|Y|²dΩ = 1', { size: 9.5, tone: 'amber' }),
        T(340, 142, 'P 给出 l−|m| 个零点', { size: 9.5, tone: 'violet' }),
        T(340, 168, 'e^(imφ) 给出方位花纹', { size: 9.5, tone: 'mint' }),
        T(340, 194, 'θ→0 或 π：P 收敛', { size: 9.5, tone: 'cyan' }),
        T(340, 220, '|m| 越大，方位越密', { size: 9.5, tone: 'muted' }),
        T(320, 252, '(l, m) 决定一种球面花纹', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '球谐函数是球面上的驻波', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '8.2/2-1',
      '不同 (l,m) 的球谐函数彼此正交',
      '$\\int Y_{lm}^*Y_{l^{\\prime}m^{\\prime}}\\,d\\Omega=\\delta_{ll^{\\prime}}\\delta_{mm^{\\prime}}$：同一个积分为 1，不同的积分为 0。',
      [
        T(320, 24, '球面上正交归一', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, '∫ Y*_lm Y_l′m′ dΩ = δ_ll′ δ_mm′', { size: 11, tone: 'text', anchor: 'middle' }),
        T(320, 72, 'dΩ = sinθ dθ dφ，积分遍及球面', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(60, 90, 240, 120, '同一 (l,m)', { tone: 'mint' }),
        T(180, 150, '∫|Y|²dΩ = 1', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(70, 176, '概率总和归到 1', { size: 9.5, tone: 'muted' }),
        ...PANEL(340, 90, 240, 120, '不同 (l,m)', { tone: 'violet' }),
        T(460, 150, '∫Y*Y′dΩ = 0', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(350, 176, '正负区域相消', { size: 9.5, tone: 'muted' }),
        L(302, 150, 336, 150, { tone: 'amber', dash: true }),
        T(319, 138, '0', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(60, 236, 'δ 符号：同则 1，异则 0', { size: 10, tone: 'amber' }),
        T(60, 258, '归一化常数 N 就由此确定', { size: 9.5, tone: 'faint' }),
        T(320, 278, '正交性是展开任意角向函数的基', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '8.2/2-2',
      '宇称只由 l 决定，与 m 无关',
      '在空间反演 $(\\theta,\\varphi)\\to(\\pi-\\theta,\\varphi+\\pi)$ 下，$Y_{lm}$ 乘 $(-1)^l$；这是光谱选择定则的来源之一。',
      [
        T(320, 24, '宇称 (−1)^l：只由 l 决定', { size: 12.5, tone: 'text', anchor: 'middle' }),
        C(320, 158, 70, { tone: 'faint', dash: true }),
        L(250, 158, 390, 158, { tone: 'faint' }),
        DOT(372, 122, { r: 3.5, tone: 'mint' }),
        DOT(268, 194, { r: 3.5, tone: 'violet' }),
        A(368, 126, 272, 190, { tone: 'dim', dash: true }),
        T(378, 114, '(θ,φ)', { size: 9.5, tone: 'mint' }),
        T(236, 210, '(π−θ, φ+π)', { size: 9.5, tone: 'violet' }),
        T(420, 104, 'l 偶：Y → +Y', { size: 10, tone: 'mint' }),
        T(420, 130, 'l 奇：Y → −Y', { size: 10, tone: 'danger' }),
        T(420, 156, '与 m 无关', { size: 9.5, tone: 'muted' }),
        T(420, 182, '偶极跃迁要求宇称改变', { size: 9.5, tone: 'amber' }),
        T(420, 208, '偶极跃迁：Δl = ±1', { size: 9.5, tone: 'cyan' }),
        T(420, 234, '这是选择定则的来源', { size: 9.5, tone: 'faint' }),
        T(48, 246, '空间反演等价于 x,y,z 全部变号', { size: 9.5, tone: 'muted' }),
        T(320, 272, '宇称只看 l，与 m 无关', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '8.2/0-0-f',
      'Φ = e^(imφ)/√(2π)：只有相位在转',
      '$\\Phi=(2\\pi)^{-1/2}e^{im\\varphi}$：$1/\\sqrt{2\\pi}$ 保证 $\\int|\\Phi|^2d\\varphi=1$，$m$ 决定绕圈快慢，$m=0$ 时全场同相位。',
      [
        T(320, 24, 'Φ = e^(imφ)/√(2π)：只有相位在转', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'Φ(φ) = (1/√(2π)) e^(imφ)', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(60, 62, 190, 26, { tone: 'amber', opacity: 0.18, r: 5 }),
        T(155, 78, '1/√(2π)：归一化', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        BAND(280, 62, 210, 26, { tone: 'mint', opacity: 0.18, r: 5 }),
        T(385, 78, 'e^(imφ)：单位相量', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        C(150, 170, 56, { tone: 'faint' }),
        L(94, 170, 206, 170, { tone: 'faint' }),
        L(150, 114, 150, 226, { tone: 'faint' }),
        A(150, 170, 190, 144, { tone: 'mint', weight: 1.5 }),
        DOT(190, 144, { r: 3, tone: 'mint' }),
        P('M166 170 A 16 16 0 0 0 160 156', { tone: 'amber' }),
        T(166, 168, 'mφ', { size: 9.5, tone: 'amber' }),
        T(150, 244, '|Φ| = 1/√(2π)', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(236, 116, '模长恒定，只有相位变', { size: 10, tone: 'mint' }),
        T(236, 142, '∫|Φ|²dφ = 1（0→2π）', { size: 9.5, tone: 'amber' }),
        T(236, 168, 'm = 0：全场同相位', { size: 9.5, tone: 'cyan' }),
        T(236, 194, '|m| 大：转一圈绕多圈', { size: 9.5, tone: 'violet' }),
        T(236, 220, '负 m：反向旋转', { size: 9.5, tone: 'muted' }),
        T(236, 246, 'φ 的区间必须是 0 到 2π', { size: 9.5, tone: 'faint' }),
        T(320, 272, '归一化常数把总概率钉成 1', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.2/0-1-f',
      'm = 0, ±1, ±2, …：整数从哪来',
      '$m$ 只能取整数：转一圈相位要多绕整圈才接得上；给 $l$ 后 $m$ 只有 $2l+1$ 个，$+m$ 与 $-m$ 互为复共轭。',
      [
        T(320, 24, 'm = 0, ±1, ±2, …：整数的来历', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'm = 0, ±1, ±2, …', { size: 12, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 96, w: 240, h: 96 }, { xLabel: 'φ', yLabel: 'Φ', tone: 'dim' }),
        CURVE((x) => Math.cos(0 * x), { x: 60, y: 96, w: 240, h: 96 }, [0, 2 * Math.PI], [-1.15, 1.15], {
          tone: 'faint',
          dash: true
        }),
        CURVE((x) => Math.cos(x), { x: 60, y: 96, w: 240, h: 96 }, [0, 2 * Math.PI], [-1.15, 1.15], {
          tone: 'mint',
          weight: 1.8
        }),
        CURVE((x) => Math.cos(2 * x), { x: 60, y: 96, w: 240, h: 96 }, [0, 2 * Math.PI], [-1.15, 1.15], {
          tone: 'violet',
          weight: 1.8,
          steps: 140
        }),
        L(60, 192, 60, 198, { tone: 'dim' }),
        L(180, 192, 180, 198, { tone: 'dim' }),
        L(300, 192, 300, 198, { tone: 'dim' }),
        T(60, 210, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(180, 210, 'π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 210, '2π', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(60, 226, 84, 226, { tone: 'faint', dash: true }),
        T(90, 226, 'm=0', { size: 9.5, tone: 'faint' }),
        L(130, 226, 154, 226, { tone: 'mint' }),
        T(160, 226, 'm=1', { size: 9.5, tone: 'mint' }),
        L(206, 226, 230, 226, { tone: 'violet' }),
        T(236, 226, 'm=2', { size: 9.5, tone: 'violet' }),
        T(340, 104, 'm 必须是整数', { size: 10, tone: 'amber' }),
        T(340, 130, '否则 φ→φ+2π 接不上', { size: 9.5, tone: 'muted' }),
        T(340, 156, 'm=0：无方位变化', { size: 9.5, tone: 'faint' }),
        T(340, 182, '|m| 越大，绕圈越多', { size: 9.5, tone: 'violet' }),
        T(340, 208, '给定 l，m 只有 2l+1 个', { size: 9.5, tone: 'cyan' }),
        T(340, 234, '−m 与 +m 互为复共轭', { size: 9.5, tone: 'mint' }),
        T(320, 260, '周期边界条件给出整数', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.2/1-0-f',
      '连带勒让德方程：极点决定一切',
      '$(1-x^2)P^{\\prime\\prime}-2xP^{\\prime}+[l(l+1)-\\frac{m^2}{1-x^2}]P=0$：$1-x^2$ 在极点归零，$m^2/(1-x^2)$ 在极点发散。',
      [
        T(320, 24, '连带勒让德方程：极点决定一切', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 48, '(1−x²)P″ − 2xP′ + [l(l+1) − m²/(1−x²)]P = 0', { size: 10.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 60, 150, 24, { tone: 'mint', opacity: 0.18, r: 5 }),
        T(111, 74, '1−x²：极点归零', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        BAND(196, 60, 150, 24, { tone: 'violet', opacity: 0.18, r: 5 }),
        T(271, 74, 'l(l+1)：本征值', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(356, 60, 178, 24, { tone: 'amber', opacity: 0.18, r: 5 }),
        T(445, 74, '−m²/(1−x²)：奇性', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        BAND(544, 60, 68, 24, { tone: 'cyan', opacity: 0.18, r: 5 }),
        T(578, 74, 'x∈[−1,1]', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 104, w: 250, h: 100 }, { xLabel: 'x', yLabel: 'P', tone: 'dim' }),
        CURVE((x) => x, { x: 60, y: 104, w: 250, h: 100 }, [-1, 1], [-1.05, 1.05], { tone: 'violet', weight: 1.9 }),
        CURVE((x) => Math.sqrt(Math.max(0, 1 - x * x)), { x: 60, y: 104, w: 250, h: 100 }, [-1, 1], [-1.05, 1.05], {
          tone: 'mint',
          weight: 1.9
        }),
        T(72, 120, 'P_1^1 ∝ sinθ', { size: 9.5, tone: 'mint' }),
        T(72, 192, 'P_1^0 = x', { size: 9.5, tone: 'violet' }),
        T(60, 218, '−1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(185, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 218, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(54, 154, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(340, 108, 'x=±1 是方程的三个奇点', { size: 9.5, tone: 'danger' }),
        T(340, 134, 'P 必须在两极有限', { size: 9.5, tone: 'muted' }),
        T(340, 160, 'l(l+1) 由这根方程定', { size: 9.5, tone: 'violet' }),
        T(340, 186, 'l = 0,1,2,…；|m| ≤ l', { size: 9.5, tone: 'cyan' }),
        T(340, 212, 'm=0 退化为勒让德方程', { size: 9.5, tone: 'mint' }),
        T(340, 238, 'l 定次数，m 定零点', { size: 9.5, tone: 'faint' }),
        T(320, 266, '极点正则把 l 从连续筛成离散', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.2/1-1-f',
      'l 与 m 的允许范围',
      '$l=0,1,2,\\dots$，$|m|\\le l$：每个 $l$ 有 $2l+1$ 个 $m$；越界的格子对应极点发散的解，必须舍去。',
      [
        T(320, 24, 'l 与 m 的允许范围', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'l = 0, 1, 2, …    |m| ≤ l', { size: 12, tone: 'text', anchor: 'middle' }),
        T(180, 88, 'l=0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(260, 88, 'l=1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(340, 88, 'l=2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(420, 88, 'l=3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(160, 111, 'm=2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(160, 145, 'm=1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(160, 179, 'm=0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(160, 213, 'm=−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(160, 247, 'm=−2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...[0, 1, 2, 3].flatMap((l) =>
          [2, 1, 0, -1, -2].flatMap((m, i) =>
            Math.abs(m) <= l
              ? [DOT(180 + l * 80, 108 + i * 34, { r: 5, tone: 'mint' })]
              : [C(180 + l * 80, 108 + i * 34, 5, { tone: 'faint', dash: true })]
          )
        ),
        T(448, 110, '左上角不允许', { size: 9.5, tone: 'faint' }),
        T(448, 136, '|m| ≤ l 是硬约束', { size: 9.5, tone: 'amber' }),
        T(448, 162, '每列共 2l+1 个格', { size: 9.5, tone: 'cyan' }),
        T(448, 188, 'l 越大，整列越长', { size: 9.5, tone: 'muted' }),
        T(448, 214, 'm 可正可负', { size: 9.5, tone: 'violet' }),
        T(448, 240, '上界来自极点正则', { size: 9.5, tone: 'faint' }),
        T(320, 272, '两个整数，一条不等式', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.2/2-0-f',
      'Y_lm = N·P·e^(imφ)：三因子分工',
      '$Y_{lm}=N_{lm}P_l^{|m|}(\\cos\\theta)e^{im\\varphi}$：$N$ 管归一，$P$ 管极角零点，$e^{im\\varphi}$ 管方位相位。',
      [
        T(320, 24, 'Y_lm = N·P·e^(imφ)：三因子分工', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'Y_lm(θ,φ) = N_lm P_l^|m|(cosθ) e^(imφ)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        BAND(48, 62, 170, 24, { tone: 'amber', opacity: 0.18, r: 5 }),
        T(133, 76, 'N：归一化', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        BAND(232, 62, 190, 24, { tone: 'violet', opacity: 0.18, r: 5 }),
        T(327, 76, 'P：极角零点', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(436, 62, 168, 24, { tone: 'mint', opacity: 0.18, r: 5 }),
        T(520, 76, 'e^(imφ)：方位相位', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        ...PANEL(48, 94, 170, 130, '① P(cosθ)', { tone: 'violet' }),
        CURVE((t) => Math.sin(t), { x: 60, y: 116, w: 146, h: 96 }, [0, Math.PI], [0, 1.05], {
          tone: 'violet',
          weight: 1.8
        }),
        T(60, 220, 'θ: 0 → π', { size: 9.5, tone: 'faint' }),
        ...PANEL(236, 94, 170, 130, '② e^(imφ)', { tone: 'mint' }),
        E(321, 148, 10, 22, { tone: 'mint', fill: true, opacity: 0.26 }),
        E(321, 204, 10, 22, { tone: 'mint', fill: true, opacity: 0.26 }),
        E(289, 176, 22, 10, { tone: 'mint', fill: true, opacity: 0.26 }),
        E(353, 176, 22, 10, { tone: 'mint', fill: true, opacity: 0.26 }),
        T(246, 220, 'm=2：两对花瓣', { size: 9.5, tone: 'faint' }),
        ...PANEL(424, 94, 184, 130, '③ 合成', { tone: 'cyan' }),
        E(516, 152, 14, 26, { tone: 'cyan', fill: true, opacity: 0.26, rotate: -30 }),
        E(516, 200, 14, 26, { tone: 'cyan', fill: true, opacity: 0.26, rotate: -30 }),
        T(434, 220, 'l=1, m=0', { size: 9.5, tone: 'faint' }),
        T(320, 244, 'N 把球面总概率归到 1', { size: 10, tone: 'amber', anchor: 'middle' }),
        T(320, 264, 'θ→0 与 θ→π 两端都被 P 压住', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '8.2/2-1-f',
      '正交归一：不同 (l,m) 互不重叠',
      '$\\int Y_{lm}^*Y_{l^{\\prime}m^{\\prime}}d\\Omega=\\delta_{ll^{\\prime}}\\delta_{mm^{\\prime}}$：同则 1、异则 0；归一化常数就由此确定。',
      [
        T(320, 24, '正交归一：不同 (l,m) 互不重叠', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, '∫ Y*_lm Y_l′m′ dΩ = δ_ll′ δ_mm′', { size: 12, tone: 'text', anchor: 'middle' }),
        T(320, 72, 'dΩ = sinθ dθ dφ，积分遍及整个球面', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(60, 94, 240, 120, '同一 (l,m)', { tone: 'mint' }),
        T(180, 148, '∫|Y|²dΩ = 1', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(70, 174, '概率总和为 1', { size: 9.5, tone: 'muted' }),
        ...PANEL(340, 94, 240, 120, '不同 (l,m)', { tone: 'violet' }),
        T(460, 148, '∫Y*Y′dΩ = 0', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(350, 174, '正负区域相消', { size: 9.5, tone: 'muted' }),
        T(60, 238, 'δ 符号：同则 1，异则 0', { size: 10, tone: 'amber' }),
        T(60, 260, '归一化常数 N 就由此确定', { size: 9.5, tone: 'faint' }),
        T(320, 276, '正交性是展开角向函数的基', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '8.2/2-2-f',
      '宇称 (−1)^l：反演只乘一个符号',
      '$\\hat P Y_{lm}=(-1)^lY_{lm}$：$l$ 偶不变号，$l$ 奇翻号；宇称与 $m$ 无关，这是光谱选择定则（如 $\\Delta l=\\pm1$）的来源之一。',
      [
        T(320, 24, '宇称 (−1)^l：反演只乘一个符号', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'P̂ Y_lm = (−1)^l Y_lm', { size: 12, tone: 'text', anchor: 'middle' }),
        T(320, 72, '(θ,φ) → (π−θ, φ+π)', { size: 10, tone: 'muted', anchor: 'middle' }),
        ...PANEL(48, 92, 250, 124, 'l 偶：对称', { tone: 'mint' }),
        E(150, 132, 14, 26, { tone: 'mint', fill: true, opacity: 0.26 }),
        E(150, 172, 14, 26, { tone: 'mint', fill: true, opacity: 0.26 }),
        DOT(150, 152, { r: 2, tone: 'dim' }),
        T(200, 132, '+', { size: 11, tone: 'mint' }),
        T(200, 176, '+', { size: 11, tone: 'mint' }),
        T(60, 204, '符号不变', { size: 9.5, tone: 'muted' }),
        ...PANEL(322, 92, 266, 124, 'l 奇：反对称', { tone: 'violet' }),
        E(430, 132, 14, 26, { tone: 'violet', fill: true, opacity: 0.26 }),
        E(430, 172, 14, 26, { tone: 'violet', fill: true, opacity: 0.26 }),
        DOT(430, 152, { r: 2, tone: 'dim' }),
        T(480, 132, '+', { size: 11, tone: 'mint' }),
        T(480, 176, '−', { size: 11, tone: 'danger' }),
        T(334, 204, '符号翻一次', { size: 9.5, tone: 'muted' }),
        T(48, 240, '只有 l 决定宇称，m 不参与', { size: 10, tone: 'amber' }),
        T(48, 262, '偶极跃迁要求首末宇称相反', { size: 9.5, tone: 'muted' })
      ]
    )
  }
}
export default set
