import { fig, T, R, BAND, L, A, DOT, E, P, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '5.1/overview',
    '谐振子：抛物线势里的等间距阶梯',
    '$V=\\tfrac12 m\\omega^2x^2$ 加两端衰减，把连续振动换成 $E_n=(n+\\tfrac12)\\hbar\\omega$ 的阶梯。',
    [
      T(320, 24, '谐振子：抛物线势里的等间距阶梯', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 48, 176, 196, '经典', { tone: 'mint' }),
      T(46, 72, 'F = −k x', { size: 10.5, tone: 'mint' }),
      T(46, 92, 'V(x) = ½mω²x²', { size: 9.5, tone: 'violet' }),
      L(50, 186, 192, 186, { tone: 'dim' }),
      CURVE((x) => x * x, { x: 50, y: 100, w: 140, h: 86 }, [-1.15, 1.15], [0, 1.4], {
        tone: 'violet',
        weight: 1.8
      }),
      DOT(59.1, 124.6, { r: 3, tone: 'amber' }),
      DOT(180.9, 124.6, { r: 3, tone: 'amber' }),
      T(120, 202, 'x = 0：势能最低', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(46, 222, '正弦振动', { size: 9.5, tone: 'amber' }),
      T(46, 240, '周期与振幅无关', { size: 9.5, tone: 'faint' }),
      ...PANEL(224, 48, 176, 196, '量子', { tone: 'violet' }),
      T(236, 72, '−ħ²ψ″/2m + Vψ = Eψ', { size: 9.5, tone: 'violet' }),
      L(240, 166, 388, 166, { tone: 'dim' }),
      CURVE((x) => Math.exp(-x * x), { x: 240, y: 118, w: 148, h: 44 }, [-2.5, 2.5], [0, 1.05], {
        tone: 'mint',
        weight: 1.8
      }),
      T(236, 188, 'ψ₀ 无节点', { size: 9.5, tone: 'mint' }),
      T(236, 210, 'ξ = x √(mω/ħ)', { size: 9.5, tone: 'amber' }),
      T(236, 232, 'λ = 2E/(ħω)', { size: 9.5, tone: 'faint' }),
      ...PANEL(414, 48, 192, 196, '能级', { tone: 'cyan' }),
      ...[218, 194, 170, 146].flatMap((y) => LEVEL(452, 540, y, '', { tone: 'cyan' })),
      T(446, 221, 'n = 0', { size: 9.5, tone: 'cyan', anchor: 'end' }),
      T(446, 197, 'n = 1', { size: 9.5, tone: 'cyan', anchor: 'end' }),
      T(446, 173, 'n = 2', { size: 9.5, tone: 'cyan', anchor: 'end' }),
      T(446, 149, 'n = 3', { size: 9.5, tone: 'cyan', anchor: 'end' }),
      T(548, 221, '½ħω', { size: 9.5, tone: 'amber' }),
      T(548, 197, '3/2ħω', { size: 9.5, tone: 'amber' }),
      T(548, 173, '5/2ħω', { size: 9.5, tone: 'amber' }),
      T(548, 149, '7/2ħω', { size: 9.5, tone: 'amber' }),
      A(500, 212, 500, 198, { tone: 'amber', weight: 1.2 }),
      T(508, 212, 'ħω', { size: 9.5, tone: 'amber' }),
      T(320, 264, '抛物线势 + 边界条件 = 等间距能级', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 278, '最低能级仍是 ½ħω', { size: 9.5, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '5.1/0-0',
      '弹簧振子：力与位移反向',
      '回复力 $F=-kx$ 与位移成正比且反向，势能是开口向上的抛物线；解是正弦振动，角频率 $\\omega=\\sqrt{k/m}$。',
      [
        T(320, 24, '弹簧振子：力与位移反向', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(68, 50, '回复力与位移反向', { size: 10, tone: 'mint' }),
        T(68, 68, 'F = −k x', { size: 10.5, tone: 'violet' }),
        L(68, 100, 68, 164, { tone: 'dim', weight: 2.6 }),
        P('M68 132 L80 116 L92 148 L104 116 L116 148 L128 116 L140 148 L152 116 L164 148 L176 116 L188 148 L200 116 L212 148 L224 132 L232 132', {
          tone: 'mint',
          weight: 1.6
        }),
        R(232, 114, 46, 36, { tone: 'violet', fill: true, opacity: 0.22, r: 5 }),
        L(280, 106, 280, 158, { tone: 'faint', dash: true }),
        A(270, 132, 238, 132, { tone: 'danger', weight: 1.4 }),
        T(240, 178, '回复力指向平衡', { size: 9.5, tone: 'danger' }),
        A(255, 196, 305, 196, { tone: 'amber', weight: 1.2 }),
        T(255, 214, '位移 x', { size: 9.5, tone: 'amber' }),
        L(370, 196, 588, 196, { tone: 'dim' }),
        A(580, 196, 596, 196, { tone: 'dim' }),
        L(370, 196, 370, 86, { tone: 'dim' }),
        A(370, 98, 370, 84, { tone: 'dim' }),
        T(596, 210, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(362, 78, 'V', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => x * x, { x: 370, y: 88, w: 218, h: 108 }, [-1.3, 1.3], [0, 1.7], {
          tone: 'mint',
          weight: 1.8
        }),
        DOT(554.7, 144.5, { r: 3.2, tone: 'amber' }),
        T(486, 122, 'V ∝ x²', { size: 9.5, tone: 'mint' }),
        T(320, 240, 'ω = √(k/m) 由系统本身决定', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '振幅与初相位由初始条件决定', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '5.1/0-1',
      '动能与势能互换，总能量守恒',
      '振动中动能与势能不断交换，$E=\\tfrac12kA^2$ 保持不变；转折点速度为零，平衡点速度最大，相空间轨迹是椭圆。',
      [
        T(320, 24, '动能与势能互换，总能量守恒', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 52, 'E 不变，两项互相转换', { size: 10, tone: 'muted' }),
        L(60, 210, 390, 210, { tone: 'dim' }),
        A(382, 210, 398, 210, { tone: 'dim' }),
        L(60, 210, 60, 62, { tone: 'dim' }),
        A(60, 74, 60, 60, { tone: 'dim' }),
        T(398, 224, 'x', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(52, 54, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => x * x, { x: 60, y: 62, w: 330, h: 148 }, [-1.5, 1.5], [0, 2.4], {
          tone: 'mint',
          weight: 1.9
        }),
        L(60, 117.5, 390, 117.5, { tone: 'amber', dash: true }),
        T(398, 121, 'E = ½kA²', { size: 9.5, tone: 'amber' }),
        DOT(90.3, 117.5, { r: 3.4, tone: 'amber' }),
        DOT(359.7, 117.5, { r: 3.4, tone: 'amber' }),
        T(84, 108, '−A', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(360, 108, 'A', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(225, 202, 225, 126, { tone: 'mint', weight: 1.2 }),
        T(233, 168, '动能', { size: 9.5, tone: 'mint' }),
        ...PANEL(420, 54, 182, 160, '相空间', { tone: 'cyan' }),
        L(443, 134, 579, 134, { tone: 'dim' }),
        A(571, 134, 585, 134, { tone: 'dim' }),
        L(511, 176, 511, 92, { tone: 'dim' }),
        A(511, 104, 511, 90, { tone: 'dim' }),
        E(511, 134, 62, 38, { tone: 'cyan' }),
        T(583, 148, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(503, 88, 'p', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(432, 200, '面积 ∝ 能量', { size: 9.5, tone: 'faint' }),
        T(320, 238, '转折点：速度为零，动能全转为势能', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 260, '平衡点：势能为零，速度最大', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '5.1/0-2',
      '任何稳定势阱在极小点近似抛物线',
      '在极小点做泰勒展开，一次项为零，二次项最先出现；振幅足够小时，几乎所有振动系统都近似为谐振子。',
      [
        T(320, 24, '任何稳定势阱在极小点近似抛物线', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(70, 50, '泰勒展开：一次项为零', { size: 10, tone: 'mint' }),
        L(70, 212, 470, 212, { tone: 'dim' }),
        A(462, 212, 478, 212, { tone: 'dim' }),
        T(478, 226, 'x', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        CURVE((x) => x * x * (1 - 0.3 * x), { x: 70, y: 76, w: 400, h: 136 }, [-1.6, 1.6], [0, 3.9], {
          tone: 'violet',
          weight: 1.9
        }),
        CURVE((x) => x * x, { x: 70, y: 76, w: 400, h: 136 }, [-1.6, 1.6], [0, 3.9], {
          tone: 'mint',
          dash: true
        }),
        DOT(270, 212, { r: 3.2, tone: 'amber' }),
        T(70, 230, '一次项为零 ⇒ 二次项主导', { size: 10, tone: 'muted' }),
        T(70, 252, '实线：真实势阱', { size: 9.5, tone: 'violet' }),
        T(70, 272, '虚线：极小点附近的抛物线', { size: 9.5, tone: 'mint' }),
        T(486, 96, 'V(x) ≈ ½k x²', { size: 10, tone: 'mint' }),
        T(486, 120, 'k = V″(0)', { size: 9.5, tone: 'violet' }),
        T(486, 144, '只在小振幅成立', { size: 9.5, tone: 'muted' }),
        T(486, 168, '振幅大则偏离', { size: 9.5, tone: 'faint' })
      ]
    ),
    '1-0': fig(
      '5.1/1-0',
      '把抛物线势代入定态方程',
      '势能 $V=\\tfrac12m\\omega^2x^2$ 代入定态薛定谔方程；束缚态要求波函数在两端足够快地衰减，否则无法归一化。',
      [
        T(320, 24, '把抛物线势代入定态方程', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, '−(ħ²/2m)ψ″ + ½mω²x²ψ = Eψ', { size: 11.5, tone: 'text', anchor: 'middle' }),
        L(60, 224, 360, 224, { tone: 'dim' }),
        A(352, 224, 368, 224, { tone: 'dim' }),
        T(368, 238, 'x', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        BAND(110, 112, 200, 112, { tone: 'mint', opacity: 0.1 }),
        BAND(60, 112, 50, 112, { tone: 'danger', opacity: 0.1 }),
        BAND(310, 112, 50, 112, { tone: 'danger', opacity: 0.1 }),
        CURVE((x) => x * x, { x: 60, y: 112, w: 300, h: 112 }, [-1.5, 1.5], [0, 2.4], {
          tone: 'violet',
          weight: 1.8
        }),
        L(60, 177.3, 360, 177.3, { tone: 'amber', dash: true }),
        T(366, 181, 'E', { size: 9.5, tone: 'amber' }),
        T(66, 106, '经典禁区', { size: 9.5, tone: 'danger' }),
        T(150, 106, '允许区 E > V', { size: 9.5, tone: 'mint' }),
        T(316, 106, '经典禁区', { size: 9.5, tone: 'danger' }),
        T(60, 242, '转折点：E = V', { size: 9.5, tone: 'muted' }),
        T(388, 116, 'ψ(±∞) → 0 才可归一', { size: 10, tone: 'cyan' }),
        T(388, 142, '远处势能主导', { size: 9.5, tone: 'muted' }),
        T(388, 166, '只有离散 E 通过', { size: 9.5, tone: 'amber' }),
        T(388, 190, 'E < V 处波函数衰减', { size: 9.5, tone: 'faint' }),
        T(320, 266, '束缚态：两端都指数衰减', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '5.1/1-1',
      '四个量换成两个无量纲量',
      '引入 $\\xi=\\sqrt{m\\omega/\\hbar}\\,x$ 与 $\\lambda=2E/(\\hbar\\omega)$，方程化为 $\\psi^{\\prime\\prime}+(\\lambda-\\xi^2)\\psi=0$。',
      [
        T(320, 24, '四个量换成两个无量纲量', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(160, 56, 'ξ = x √(mω/ħ)', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(452, 56, 'λ = 2E/(ħω)', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(48, 76, '长度单位：零点振幅', { size: 9.5, tone: 'faint' }),
        T(360, 76, '能量单位：以 ħω 计', { size: 9.5, tone: 'faint' }),
        L(70, 200, 350, 200, { tone: 'dim' }),
        A(342, 200, 358, 200, { tone: 'dim' }),
        L(70, 200, 70, 96, { tone: 'dim' }),
        A(70, 108, 70, 94, { tone: 'dim' }),
        CURVE((x) => Math.exp(-x * x), { x: 70, y: 100, w: 280, h: 100 }, [-2.5, 2.5], [0, 1.05], {
          tone: 'mint',
          weight: 1.9
        }),
        T(70, 216, '−2.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(210, 216, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 216, '2.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(62, 104, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 238, 'ψ = e^(−ξ²/2)：ξ 大时衰减', { size: 9.5, tone: 'mint' }),
        T(360, 104, 'ψ″ + (λ − ξ²)ψ = 0', { size: 11, tone: 'violet' }),
        T(360, 132, 'λ 在这里只是常数', { size: 9.5, tone: 'muted' }),
        T(360, 156, 'ξ 大时 λ 可忽略', { size: 9.5, tone: 'muted' }),
        T(360, 180, '方程近似 ψ″ ≈ ξ²ψ', { size: 9.5, tone: 'cyan' }),
        T(360, 204, '解为 e^(±ξ²/2)', { size: 9.5, tone: 'cyan' }),
        T(360, 228, '只保留衰减的一支', { size: 9.5, tone: 'faint' }),
        T(320, 260, '长度标准交给 √(ħ/mω)', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, 'E 变成无量纲 λ', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '5.1/1-2',
      '先提出高斯因子，再解剩下的部分',
      'ξ 很大时方程近似为 $\\psi^{\\prime\\prime}-\\xi^2\\psi=0$，可归一解像 $e^{-\\xi^2/2}$；令 $\\psi=e^{-\\xi^2/2}u(\\xi)$ 后只剩 u 的方程。',
      [
        T(320, 24, '先提出高斯因子，再解剩下的部分', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 62, '|ξ| 很大：ξ² 压过 λ', { size: 10, tone: 'muted' }),
        T(60, 86, 'ψ″ − ξ²ψ = 0', { size: 10.5, tone: 'violet' }),
        A(150, 96, 150, 112, { tone: 'dim' }),
        T(60, 130, '可归一解：e^(−ξ²/2)', { size: 10, tone: 'mint' }),
        A(150, 140, 150, 156, { tone: 'dim' }),
        T(60, 174, 'ψ = e^(−ξ²/2) u(ξ)', { size: 10.5, tone: 'amber' }),
        A(150, 184, 150, 200, { tone: 'dim' }),
        T(60, 218, 'u 的方程只含一阶项', { size: 9.5, tone: 'cyan' }),
        CURVE((x) => Math.exp(-x * x * 0.5), { x: 360, y: 70, w: 200, h: 120 }, [-3, 3], [0, 1.05], {
          tone: 'mint',
          weight: 1.8
        }),
        T(360, 206, '−3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(460, 206, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(560, 206, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 78, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(360, 232, '高斯因子保证两端压得住', { size: 9.5, tone: 'faint' }),
        T(320, 258, '先扣掉渐近行为，方程才变温和', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '这一步不改变物理，只换变量', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '5.1/2-0',
      '级数不能无限延续',
      '把 $u(\\xi)$ 展开成幂级数并逐项代入，得到系数递推；若级数无限延续，其增长像 $e^{\\xi^2}$，乘上高斯后仍然发散。',
      [
        T(320, 24, '级数不能无限延续', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 60, 'u(ξ) = Σ aₖ ξᵏ', { size: 10.5, tone: 'mint' }),
        A(140, 70, 140, 88, { tone: 'dim' }),
        T(60, 106, '逐项代入得递推', { size: 9.5, tone: 'muted' }),
        A(140, 116, 140, 134, { tone: 'dim' }),
        T(60, 152, 'aₖ₊₂ / aₖ ~ 2/k', { size: 10.5, tone: 'violet' }),
        A(140, 162, 140, 180, { tone: 'dim' }),
        T(60, 198, 'k 大时系数几乎不降', { size: 9.5, tone: 'amber' }),
        A(140, 208, 140, 226, { tone: 'dim' }),
        T(60, 244, 'u ~ e^(ξ²)：波函数发散', { size: 10, tone: 'danger' }),
        ...PANEL(300, 56, 130, 150, '无限级数', { tone: 'danger' }),
        CURVE((x) => Math.exp(x * x * 0.16), { x: 312, y: 92, w: 106, h: 90 }, [-2, 2], [0, 2], {
          tone: 'danger',
          weight: 1.8
        }),
        T(365, 194, '远处爆掉', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        ...PANEL(452, 56, 130, 150, '截断后', { tone: 'mint' }),
        CURVE((x) => Math.exp(-x * x * 0.6), { x: 464, y: 92, w: 106, h: 90 }, [-2, 2], [0, 2], {
          tone: 'mint',
          weight: 1.8
        }),
        T(517, 194, '可归一', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(60, 268, '“级数必须停” 翻译成物理就是 “能量只能离散”', { size: 9.5, tone: 'muted' })
      ]
    ),
    '2-1': fig(
      '5.1/2-1',
      '截断条件 λ = 2n+1 锁住能量',
      '递推在某整数处给出零系数，要求 $\\lambda=2n+1$；代回定义即得 $E_n=(n+\\tfrac12)\\hbar\\omega$，能级等间距。',
      [
        T(320, 24, '截断条件 λ = 2n+1 锁住能量', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'λ = 2n + 1 ⇒ E = (λ/2)ħω', { size: 11, tone: 'violet', anchor: 'middle' }),
        ...[214, 186, 158, 130].flatMap((y) => LEVEL(80, 280, y, '', { tone: 'cyan' })),
        T(72, 217, 'n = 0', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 189, 'n = 1', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 161, 'n = 2', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(72, 133, 'n = 3', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(288, 217, '½ħω', { size: 9.5, tone: 'amber' }),
        T(288, 189, '3/2ħω', { size: 9.5, tone: 'amber' }),
        T(288, 161, '5/2ħω', { size: 9.5, tone: 'amber' }),
        T(288, 133, '7/2ħω', { size: 9.5, tone: 'amber' }),
        A(180, 206, 180, 192, { tone: 'amber', weight: 1.2 }),
        T(188, 202, 'ħω', { size: 9.5, tone: 'amber' }),
        T(360, 112, '级数截断 = 能量量子化', { size: 10, tone: 'mint' }),
        T(360, 138, '间隔固定为 ħω', { size: 10, tone: 'amber' }),
        T(360, 164, 'n 从 0 开始', { size: 9.5, tone: 'cyan' }),
        T(360, 190, '最低不是零，而是 ½ħω', { size: 9.5, tone: 'muted' }),
        T(360, 216, 'n 越大，相邻间隔不变', { size: 9.5, tone: 'faint' }),
        T(320, 252, '一条截断条件给出整个能谱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '能级像梯子一样等间距', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '5.1/2-2',
      '厄米多项式与零点能',
      '截断后的多项式正是厄米多项式：$H_0=1$、$H_1=2\\xi$、$H_2=4\\xi^2-2$；零点能来自不确定性原理。',
      [
        T(320, 24, '厄米多项式与零点能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(80, 58, 'H₀ = 1', { size: 10.5, tone: 'mint' }),
        T(80, 82, 'H₁ = 2ξ', { size: 10.5, tone: 'violet' }),
        T(80, 106, 'H₂ = 4ξ² − 2', { size: 10.5, tone: 'amber' }),
        T(80, 138, '乘以 e^(−ξ²/2)', { size: 9.5, tone: 'muted' }),
        T(80, 160, '再乘归一化常数', { size: 9.5, tone: 'muted' }),
        CURVE((x) => Math.exp(-x * x * 0.5), { x: 300, y: 56, w: 120, h: 60 }, [-2.5, 2.5], [0, 1.05], {
          tone: 'mint',
          weight: 1.6
        }),
        CURVE((x) => 1.4 * x * Math.exp(-x * x * 0.5), { x: 300, y: 124, w: 120, h: 60 }, [-2.5, 2.5], [-1.1, 1.1], {
          tone: 'violet',
          weight: 1.6
        }),
        CURVE((x) => 0.8 * (2 * x * x - 1) * Math.exp(-x * x * 0.5), { x: 300, y: 192, w: 120, h: 60 }, [-2.5, 2.5], [-1.1, 1.1], {
          tone: 'amber',
          weight: 1.6
        }),
        T(432, 90, 'ψ₀：0 节点', { size: 9.5, tone: 'mint' }),
        T(432, 158, 'ψ₁：1 节点', { size: 9.5, tone: 'violet' }),
        T(432, 226, 'ψ₂：2 节点', { size: 9.5, tone: 'amber' }),
        BAND(80, 186, 180, 44, { tone: 'cyan', opacity: 0.14, r: 8 }),
        T(170, 204, 'E₀ = ½ ħω', { size: 11, tone: 'cyan', anchor: 'middle' }),
        T(170, 222, '零点能：停不下来', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(80, 252, 'Δx · Δp ≥ ħ/2：不能同时静止在阱底', { size: 9.5, tone: 'muted' }),
        T(320, 276, '本征函数 = 常数 × 厄米多项式 × 高斯', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '5.1/0-0-f',
      'm x″ = −k x：线性的回复力',
      '$m$ 是惯性，$k$ 是回复强度，负号表示指向平衡；由此得 $\\omega=\\sqrt{k/m}$，周期 $T=2\\pi/\\omega$ 只由 $m$、$k$ 决定。',
      [
        T(320, 24, 'm x″ = −k x：线性的回复力', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'm x″ = −k x', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(46, 62, 150, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(121, 80, 'm：惯性', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(212, 62, 166, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(295, 80, 'k：回复强度', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        BAND(394, 62, 188, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(488, 80, '负号：指向平衡', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        L(64, 210, 314, 210, { tone: 'dim' }),
        A(306, 210, 322, 210, { tone: 'dim' }),
        L(64, 210, 64, 106, { tone: 'dim' }),
        A(64, 118, 64, 104, { tone: 'dim' }),
        T(322, 224, 't', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(56, 98, 'x', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => Math.cos((2 * Math.PI * x) / 1.2), { x: 64, y: 106, w: 250, h: 104 }, [0, 2.4], [-1.15, 1.15], {
          tone: 'mint',
          weight: 1.9,
          steps: 140
        }),
        L(64, 112.6, 314, 112.6, { tone: 'faint', dash: true }),
        T(318, 116, 'A', { size: 9.5, tone: 'faint' }),
        A(64, 224, 189, 224, { tone: 'amber', weight: 1.1 }),
        T(126, 238, 'T = 2π/ω', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(340, 112, 'ω = √(k/m)', { size: 11.5, tone: 'amber' }),
        T(340, 140, 'k ↑ ⇒ 振动更快', { size: 9.5, tone: 'muted' }),
        T(340, 162, 'm ↑ ⇒ 振动更慢', { size: 9.5, tone: 'muted' }),
        T(340, 188, 'T = 2π/ω 与 A 无关', { size: 9.5, tone: 'cyan' }),
        T(340, 212, '振幅只定能量，不定周期', { size: 9.5, tone: 'faint' }),
        T(320, 252, '周期不依赖振幅 ⇒ 经典没有能级', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 274, 'ω 由 m 与 k 唯一决定', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '5.1/0-1-f',
      'E = ½kA²：能量由振幅决定',
      '$E=\\tfrac12m\\omega^2A^2=\\tfrac12kA^2$：能量与振幅平方成正比；$A$ 加倍则 $E$ 变四倍，转折点在 $x=\\pm A$。',
      [
        T(320, 24, 'E = ½kA²：能量由振幅决定', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'E = ½mω²A² = ½kA²', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(60, 60, 150, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(135, 78, 'k：弹簧刚度', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        BAND(226, 60, 150, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(301, 78, 'A²：振幅平方', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        BAND(392, 60, 180, 26, { tone: 'cyan', opacity: 0.22, r: 5 }),
        T(482, 78, 'E 与 A² 成正比', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        L(64, 208, 284, 208, { tone: 'dim' }),
        A(276, 208, 292, 208, { tone: 'dim' }),
        L(64, 208, 64, 104, { tone: 'dim' }),
        A(64, 116, 64, 102, { tone: 'dim' }),
        T(292, 222, 'A', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(56, 98, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        CURVE((x) => x * x, { x: 64, y: 104, w: 220, h: 104 }, [0, 2], [0, 4.2], {
          tone: 'mint',
          weight: 1.9
        }),
        DOT(174, 183.2, { r: 3, tone: 'amber' }),
        DOT(284, 109, { r: 3, tone: 'amber' }),
        T(174, 222, 'A', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(284, 222, '2A', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(56, 183, 'E', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 109, '4E', { size: 9.5, tone: 'muted', anchor: 'end' }),
        L(356, 208, 566, 208, { tone: 'dim' }),
        A(558, 208, 574, 208, { tone: 'dim' }),
        CURVE((x) => x * x, { x: 356, y: 104, w: 210, h: 104 }, [-1.4, 1.4], [0, 2.1], {
          tone: 'violet',
          weight: 1.8
        }),
        L(356, 158.5, 566, 158.5, { tone: 'amber', dash: true }),
        DOT(176, 158.5, { r: 3, tone: 'amber' }),
        DOT(536, 158.5, { r: 3, tone: 'amber' }),
        T(170, 150, '−A', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(536, 150, 'A', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(452, 148, 'E', { size: 9.5, tone: 'amber' }),
        T(356, 226, '转折点：v = 0', { size: 9.5, tone: 'faint' }),
        T(320, 244, 'A 加倍 ⇒ E 变四倍', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(320, 266, '转折点：动能全转为势能', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '5.1/1-0-f',
      '定态方程：三项分别代表什么',
      '第一项是动能，第二项是势能，右边是总能量；$\\psi(\\pm\\infty)\\to0$ 是可归一的前提，E 与 V 的交点就是转折点。',
      [
        T(320, 24, '定态方程：三项分别代表什么', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, '−(ħ²/2m)ψ″ + ½mω²x²ψ = Eψ', { size: 11.5, tone: 'text', anchor: 'middle' }),
        BAND(56, 60, 180, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(146, 78, '−(ħ²/2m)ψ″：动能', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(250, 60, 180, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(340, 78, '½mω²x²ψ：势能', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        BAND(444, 60, 140, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(514, 78, 'E：本征值', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        L(60, 224, 360, 224, { tone: 'dim' }),
        A(352, 224, 368, 224, { tone: 'dim' }),
        BAND(110, 112, 200, 112, { tone: 'mint', opacity: 0.1 }),
        BAND(60, 112, 50, 112, { tone: 'danger', opacity: 0.1 }),
        BAND(310, 112, 50, 112, { tone: 'danger', opacity: 0.1 }),
        CURVE((x) => x * x, { x: 60, y: 112, w: 300, h: 112 }, [-1.5, 1.5], [0, 2.4], {
          tone: 'violet',
          weight: 1.8
        }),
        L(60, 177.3, 360, 177.3, { tone: 'amber', dash: true }),
        T(66, 106, '经典禁区', { size: 9.5, tone: 'danger' }),
        T(150, 106, '允许区 E > V', { size: 9.5, tone: 'mint' }),
        T(316, 106, '经典禁区', { size: 9.5, tone: 'danger' }),
        T(366, 181, 'E', { size: 9.5, tone: 'amber' }),
        T(60, 240, 'E = V 处即转折点 ±A', { size: 9.5, tone: 'muted' }),
        T(388, 116, 'ψ(±∞) → 0', { size: 10, tone: 'cyan' }),
        T(388, 140, '两端衰减才可归一', { size: 9.5, tone: 'muted' }),
        T(388, 164, 'ψ″ 的符号决定弯曲方向', { size: 9.5, tone: 'violet' }),
        T(388, 188, 'E < V 处向外弯', { size: 9.5, tone: 'faint' }),
        T(388, 212, 'E > V 处向里弯', { size: 9.5, tone: 'faint' }),
        T(320, 264, '只有少数 E 能让两端同时衰减', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '5.1/1-1-f',
      'ξ 与 λ：把方程洗成无量纲',
      '$\\xi=x\\sqrt{m\\omega/\\hbar}$ 用零点振幅作长度单位，$\\lambda=2E/\\hbar\\omega$ 用 $\\hbar\\omega$ 作能量单位；两者都不再带量纲。',
      [
        T(320, 24, 'ξ 与 λ：把方程洗成无量纲', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(160, 54, 'ξ = x √(mω/ħ)', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(452, 54, 'λ = 2E/(ħω)', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(48, 74, '长度单位：零点振幅', { size: 9.5, tone: 'faint' }),
        T(360, 74, '能量单位：以 ħω 计', { size: 9.5, tone: 'faint' }),
        L(70, 198, 350, 198, { tone: 'dim' }),
        A(342, 198, 358, 198, { tone: 'dim' }),
        L(70, 198, 70, 96, { tone: 'dim' }),
        A(70, 108, 70, 94, { tone: 'dim' }),
        CURVE((x) => Math.exp(-x * x), { x: 70, y: 100, w: 280, h: 98 }, [-2.5, 2.5], [0, 1.05], {
          tone: 'mint',
          weight: 1.9
        }),
        T(70, 214, '−2.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(210, 214, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 214, '2.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(62, 104, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 236, '横轴以 √(ħ/mω) 为单位', { size: 9.5, tone: 'muted' }),
        T(360, 104, 'ψ″ + (λ − ξ²)ψ = 0', { size: 11, tone: 'violet' }),
        T(360, 132, 'ξ 无量纲 ⇒ ψ 可归一', { size: 9.5, tone: 'muted' }),
        T(360, 156, 'λ 大 ⇒ 能量高', { size: 9.5, tone: 'amber' }),
        T(360, 180, 'λ 是待定的本征值', { size: 9.5, tone: 'cyan' }),
        T(360, 204, 'E = λħω/2', { size: 9.5, tone: 'mint' }),
        T(360, 228, 'ħω 是能量的自然刻度', { size: 9.5, tone: 'faint' }),
        T(320, 260, '无量纲化把 “多长算长” 交给量子尺度', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '5.1/2-0-f',
      'Eₙ = (n + ½)ħω：等间距带零点',
      '$\\lambda=2n+1$ 代回 $E=\\lambda\\hbar\\omega/2$；$n$ 取 $0,1,2,\\dots$，间隔恒为 $\\hbar\\omega$，最低为 $\\tfrac12\\hbar\\omega$。',
      [
        T(320, 24, 'Eₙ = (n + ½)ħω：等间距带零点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 52, 'λ = 2n + 1', { size: 12, tone: 'violet', anchor: 'middle' }),
        A(320, 62, 320, 76, { tone: 'dim' }),
        T(320, 94, 'Eₙ = (n + ½) ħω', { size: 12, tone: 'amber', anchor: 'middle' }),
        ...[214, 182, 150, 118].flatMap((y) => LEVEL(70, 280, y, '', { tone: 'cyan' })),
        T(62, 217, 'n = 0', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(62, 185, 'n = 1', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(62, 153, 'n = 2', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(62, 121, 'n = 3', { size: 9.5, tone: 'cyan', anchor: 'end' }),
        T(288, 217, 'E₀ = ½ħω', { size: 9.5, tone: 'amber' }),
        T(288, 185, 'E₁ = 3/2ħω', { size: 9.5, tone: 'amber' }),
        T(288, 153, 'E₂ = 5/2ħω', { size: 9.5, tone: 'amber' }),
        T(288, 121, 'E₃ = 7/2ħω', { size: 9.5, tone: 'amber' }),
        A(180, 206, 180, 190, { tone: 'amber', weight: 1.2 }),
        T(188, 200, 'ħω', { size: 9.5, tone: 'amber' }),
        T(410, 120, 'n = 0, 1, 2, …', { size: 10, tone: 'cyan' }),
        T(410, 146, '间隔恒为 ħω', { size: 10, tone: 'amber' }),
        T(410, 172, '零点能 ½ħω 去不掉', { size: 9.5, tone: 'mint' }),
        T(410, 198, 'ħω → 0 才是连续谱', { size: 9.5, tone: 'faint' }),
        T(410, 224, 'E 的下限由不确定性定', { size: 9.5, tone: 'faint' }),
        T(320, 254, '等间距阶梯，最低一级不为零', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '截断条件 λ = 2n+1 就是量子化', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '5.1/2-1-f',
      'ψₙ = Nₙ Hₙ(ξ) e^(−ξ²/2)',
      '归一化常数 $N_n$ 定权重，厄米多项式 $H_n$ 给出 $n$ 个节点，高斯因子保证两端衰减；三者缺一不可。',
      [
        T(320, 24, 'ψₙ = Nₙ Hₙ(ξ) e^(−ξ²/2)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 50, 'ψₙ(x) = Nₙ · Hₙ(ξ) · e^(−ξ²/2)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        BAND(50, 60, 160, 26, { tone: 'amber', opacity: 0.22, r: 5 }),
        T(130, 78, 'Nₙ：归一化', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        BAND(226, 60, 160, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(306, 78, 'Hₙ(ξ)：n 次多项式', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        BAND(402, 60, 190, 26, { tone: 'mint', opacity: 0.22, r: 5 }),
        T(497, 78, 'e^(−ξ²/2)：高斯包络', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        L(56, 168, 366, 168, { tone: 'dim', dash: true }),
        CURVE((x) => Math.exp((-x * x) / 2), { x: 56, y: 112, w: 310, h: 112 }, [-3, 3], [-2.4, 2.4], {
          tone: 'mint',
          weight: 1.8,
          steps: 150
        }),
        CURVE((x) => 2 * x * Math.exp((-x * x) / 2), { x: 56, y: 112, w: 310, h: 112 }, [-3, 3], [-2.4, 2.4], {
          tone: 'violet',
          weight: 1.7,
          steps: 150
        }),
        CURVE((x) => 0.8 * (4 * x * x - 2) * Math.exp((-x * x) / 2), { x: 56, y: 112, w: 310, h: 112 }, [-3, 3], [-2.4, 2.4], {
          tone: 'amber',
          weight: 1.7,
          steps: 150
        }),
        T(56, 230, '−3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(211, 230, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(366, 230, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(48, 122, 'ψ', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 250, 'ψ₀', { size: 9.5, tone: 'mint' }),
        T(96, 250, 'ψ₁', { size: 9.5, tone: 'violet' }),
        T(136, 250, 'ψ₂', { size: 9.5, tone: 'amber' }),
        T(384, 116, 'Nₙ 保证 ∫|ψ|² = 1', { size: 9.5, tone: 'amber' }),
        T(384, 142, 'Hₙ 给出 n 个零点', { size: 9.5, tone: 'violet' }),
        T(384, 166, '高斯因子压住两端', { size: 9.5, tone: 'mint' }),
        T(384, 192, 'n 定节点数与宇称', { size: 9.5, tone: 'cyan' }),
        T(384, 218, 'n 大时禁区尾巴更长', { size: 9.5, tone: 'faint' }),
        T(320, 272, '三个因子各管一件事', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    )
  }
}
export default set
