import { fig, T, R, BAND, L, A, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '7.1/overview',
    '算符：把力学量写成规则',
    '算符是作用在波函数上的线性规则：坐标是乘法、动量是微分；乘法顺序不可交换，对易子 $[\\hat x,\\hat p]=i\\hbar$ 携带量子信息。',
    [
      T(320, 24, '算符：把力学量写成规则', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(30, 42, 180, 184, '作用', { tone: 'violet' }),
      T(70, 86, 'ψ', { size: 12, tone: 'mint', anchor: 'middle' }),
      A(70, 94, 70, 108, { tone: 'dim' }),
      BAND(42, 112, 56, 26, { tone: 'violet', opacity: 0.22, r: 5 }),
      T(70, 130, 'Â', { size: 12, tone: 'violet', anchor: 'middle' }),
      A(70, 144, 70, 160, { tone: 'dim' }),
      T(70, 180, 'Âψ', { size: 11, tone: 'amber', anchor: 'middle' }),
      T(44, 206, '规则，不是数', { size: 9, tone: 'faint' }),
      ...PANEL(220, 42, 180, 184, '代数', { tone: 'cyan' }),
      T(240, 82, 'ÂB̂ψ', { size: 11, tone: 'mint' }),
      T(240, 106, '≠ B̂Âψ', { size: 11, tone: 'violet' }),
      L(236, 120, 384, 120, { tone: 'faint' }),
      T(236, 142, '[Â,B̂] = ÂB̂ − B̂Â', { size: 10, tone: 'amber' }),
      T(236, 166, '顺序不同 ⇒ 结果不同', { size: 9, tone: 'muted' }),
      T(236, 188, '[x̂,p̂] = iħ ≠ 0', { size: 10, tone: 'cyan' }),
      T(236, 210, 'iħ 就是不确定性来源', { size: 9, tone: 'faint' }),
      ...PANEL(410, 42, 200, 184, '本征与测量', { tone: 'mint' }),
      T(428, 84, 'Âψₙ = aₙψₙ', { size: 10.5, tone: 'cyan' }),
      ...LEVEL(428, 548, 124, 'aₙ', { tone: 'mint', size: 9.5 }),
      ...LEVEL(428, 548, 162, 'aₙ₊₁', { tone: 'mint', size: 9.5 }),
      T(428, 196, '一次测量只得某个 aₙ', { size: 9, tone: 'muted' }),
      T(428, 216, '|cₙ|² 给出概率', { size: 9, tone: 'violet' }),
      T(320, 248, '线性 + 顺序 + 本征值：算符的三条语法', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 268, '力学量从此有了代数结构', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '7.1/0-0',
      '坐标是乘法，动量是微分',
      '$\\hat x\\psi(x)=x\\psi(x)$，$\\hat p\\psi(x)=-i\\hbar\\,d\\psi/dx$：同一个符号，作用对象从粒子换成了波函数。',
      [
        T(320, 24, '坐标是乘法，动量是微分', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 42, 282, 190, '坐标：乘法', { tone: 'mint' }),
        T(44, 82, 'x̂ψ(x) = x·ψ(x)', { size: 10.5, tone: 'mint' }),
        L(44, 149, 296, 149, { tone: 'faint', dash: true }),
        CURVE((x) => Math.exp(-3 * x * x), { x: 44, y: 96, w: 252, h: 106 }, [-1, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        CURVE((x) => x * Math.exp(-3 * x * x), { x: 44, y: 96, w: 252, h: 106 }, [-1, 1], [-1, 1], {
          tone: 'violet',
          dash: true
        }),
        T(44, 166, '−1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(170, 166, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(296, 166, '+1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(44, 188, 'ψ', { size: 9.5, tone: 'mint' }),
        T(64, 188, 'xψ：按 x 伸缩', { size: 9.5, tone: 'violet' }),
        T(44, 210, '每点乘上自己的 x', { size: 9.5, tone: 'muted' }),
        ...PANEL(328, 42, 284, 190, '动量：微分', { tone: 'cyan' }),
        T(344, 82, 'p̂ψ(x) = −iħ·dψ/dx', { size: 10.5, tone: 'cyan' }),
        L(344, 149, 596, 149, { tone: 'faint', dash: true }),
        CURVE((x) => Math.exp(-3 * x * x), { x: 344, y: 96, w: 252, h: 106 }, [-1, 1], [-1, 1], {
          tone: 'cyan',
          weight: 1.8
        }),
        L(494, 100, 548, 133, { tone: 'amber', weight: 1.5, dash: true }),
        DOT(520, 116, { r: 3, tone: 'amber' }),
        T(556, 96, '斜率', { size: 9.5, tone: 'amber' }),
        T(344, 188, '算符取的是曲线的斜率', { size: 9.5, tone: 'muted' }),
        T(344, 210, '−iħ 只定尺度与相位', { size: 9.5, tone: 'faint' }),
        T(320, 254, '同一个符号，作用对象从粒子换成了波函数', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '7.1/0-1',
      '线性：叠加可以提出去',
      '线性保证叠加原理在测量层面成立：$\\hat A(c_1\\psi_1+c_2\\psi_2)=c_1\\hat A\\psi_1+c_2\\hat A\\psi_2$。',
      [
        T(320, 24, '线性：叠加可以提出去', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(56, 70, '两个分量与它们的叠加', { size: 9.5, tone: 'muted' }),
        L(56, 94, 280, 94, { tone: 'dim' }),
        CURVE((x) => Math.sin(2 * Math.PI * x), { x: 56, y: 78, w: 224, h: 32 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(286, 100, 'ψ₁', { size: 10, tone: 'mint' }),
        L(56, 142, 280, 142, { tone: 'dim' }),
        CURVE((x) => 0.6 * Math.sin(6 * Math.PI * x), { x: 56, y: 126, w: 224, h: 32 }, [0, 1], [-1, 1], {
          tone: 'cyan',
          weight: 1.8
        }),
        T(286, 148, 'ψ₂', { size: 10, tone: 'cyan' }),
        L(56, 194, 280, 194, { tone: 'dim' }),
        CURVE((x) => Math.sin(2 * Math.PI * x) + 0.6 * Math.sin(6 * Math.PI * x), {
          x: 56,
          y: 178,
          w: 224,
          h: 32
        }, [0, 1], [-1.7, 1.7], { tone: 'violet', weight: 1.8 }),
        T(286, 200, '叠加', { size: 10, tone: 'violet' }),
        A(300, 150, 330, 150, { tone: 'dim' }),
        T(345, 86, 'Â(c₁ψ₁ + c₂ψ₂)', { size: 10.5, tone: 'violet' }),
        T(345, 112, '= c₁Âψ₁ + c₂Âψ₂', { size: 10.5, tone: 'mint' }),
        T(345, 142, '叠加原理在测量层面成立', { size: 9.5, tone: 'muted' }),
        T(345, 164, '非线性算符会破坏它', { size: 9.5, tone: 'faint' }),
        T(345, 190, '例：取平方 ψ² 不再线性', { size: 9.5, tone: 'dim' }),
        T(320, 240, '线性 = 叠加原理的代数版本', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, '系数可以直接提到算符外面', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '7.1/0-2',
      '能量算符 = 动能 + 势能',
      '$\\hat H=\\hat p^2/2m+V(\\hat x)$；代入动量的微分形式，就得到熟悉的 $-\\hbar^2/2m\\,d^2/dx^2+V(x)$。',
      [
        T(320, 24, '能量算符 = 动能 + 势能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(40, 58, 'Ĥ = p̂²/2m + V(x̂)', { size: 12, tone: 'text' }),
        A(72, 70, 72, 92, { tone: 'dim' }),
        T(40, 110, 'p̂ = −iħ d/dx', { size: 10, tone: 'cyan' }),
        A(72, 122, 72, 142, { tone: 'dim' }),
        T(40, 162, 'Ĥ = −ħ²/2m·∂²/∂x² + V(x)', { size: 11, tone: 'mint' }),
        T(40, 188, '第一项：动能，二阶导（曲率）', { size: 9.5, tone: 'cyan' }),
        T(40, 210, '第二项：势能，只做乘法', { size: 9.5, tone: 'violet' }),
        T(40, 232, '两项都线性，可以直接相加', { size: 9.5, tone: 'muted' }),
        ...AXIS({ x: 352, y: 84, w: 230, h: 120 }, { xLabel: 'x', yLabel: 'V' }),
        CURVE((x) => -Math.exp(-2 * x * x), { x: 352, y: 84, w: 230, h: 120 }, [-2, 2], [-1.2, 0.2], {
          tone: 'violet',
          weight: 2
        }),
        T(352, 220, '−2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(467, 220, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(582, 220, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 240, '势阱：V 的最小值', { size: 9.5, tone: 'muted' }),
        T(320, 262, 'Ĥ 的本征方程就是定态薛定谔方程', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '7.1/1-0',
      '和逐点相加，积按序作用',
      '$(\\hat A+\\hat B)\\psi=\\hat A\\psi+\\hat B\\psi$，而 $(\\hat A\\hat B)\\psi=\\hat A(\\hat B\\psi)$：加法没有顺序问题，乘法有。',
      [
        T(320, 24, '和逐点相加，积按序作用', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 42, 272, 190, '加法', { tone: 'cyan' }),
        T(44, 82, '(Â+B̂)ψ = Âψ + B̂ψ', { size: 10, tone: 'text' }),
        BAND(44, 108, 84, 26, { tone: 'cyan', opacity: 0.2, r: 4 }),
        T(86, 126, 'Âψ', { size: 10, tone: 'cyan', anchor: 'middle' }),
        T(136, 126, '+', { size: 12, tone: 'text' }),
        BAND(150, 108, 84, 26, { tone: 'violet', opacity: 0.2, r: 4 }),
        T(192, 126, 'B̂ψ', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(44, 158, '逐点相加，次序无关', { size: 9.5, tone: 'muted' }),
        T(44, 182, '和仍然是线性算符', { size: 9.5, tone: 'faint' }),
        T(44, 206, 'Â+B̂ 与 B̂+Â 相同', { size: 9.5, tone: 'mint' }),
        ...PANEL(316, 42, 296, 190, '乘积', { tone: 'violet' }),
        BAND(330, 96, 54, 30, { tone: 'faint', opacity: 0.2, r: 5 }),
        T(357, 116, 'ψ', { size: 11, tone: 'muted', anchor: 'middle' }),
        A(388, 111, 410, 111, { tone: 'dim' }),
        BAND(414, 96, 54, 30, { tone: 'cyan', opacity: 0.22, r: 5 }),
        T(441, 116, 'B̂', { size: 11, tone: 'cyan', anchor: 'middle' }),
        A(472, 111, 494, 111, { tone: 'dim' }),
        BAND(498, 96, 54, 30, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(525, 116, 'Â', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(330, 150, '先右后左：ÂB̂ ≠ B̂Â', { size: 9.5, tone: 'amber' }),
        T(330, 172, '顺序改变 ⇒ 结果改变', { size: 9.5, tone: 'muted' }),
        T(330, 196, '加法无关顺序，乘法有关', { size: 9.5, tone: 'mint' }),
        T(320, 250, '和逐点相加，积从右向左依次作用', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '顺序是量子力学的新信息', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '7.1/1-1',
      '先乘后导，多出 iħψ',
      '$\\hat x\\hat p\\psi=-i\\hbar x\\psi^{\\prime}$，而 $\\hat p\\hat x\\psi=-i\\hbar(x\\psi)^{\\prime}=\\hat x\\hat p\\psi-i\\hbar\\psi$：两者恰好差一个常数项。',
      [
        T(320, 24, '先乘后导，多出 iħψ', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 70, 'x̂p̂ψ = −iħ·x·dψ/dx', { size: 11, tone: 'mint' }),
        T(50, 102, 'p̂x̂ψ = −iħ·d(xψ)/dx', { size: 11, tone: 'cyan' }),
        T(50, 134, '= −iħ·x·dψ/dx − iħψ', { size: 11, tone: 'violet' }),
        T(300, 134, '← 多出的一项', { size: 9.5, tone: 'amber' }),
        L(50, 152, 590, 152, { tone: 'faint' }),
        T(50, 180, 'x̂p̂ψ − p̂x̂ψ = iħψ', { size: 12, tone: 'amber' }),
        T(50, 206, '乘积法则多出的那一项', { size: 9.5, tone: 'muted' }),
        T(50, 228, 'ħ 不为零 ⇒ 两个顺序不等价', { size: 9.5, tone: 'faint' }),
        T(360, 180, '几何：先缩放再求斜率', { size: 9.5, tone: 'mint' }),
        T(360, 202, '与先求斜率再缩放不同', { size: 9.5, tone: 'cyan' }),
        T(360, 224, '差值固定为 iħψ', { size: 9.5, tone: 'amber' }),
        T(360, 246, '与 ψ 的具体形状无关', { size: 9.5, tone: 'faint' }),
        T(320, 272, '常数差项来自乘积法则', { size: 9.5, tone: 'dim', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '7.1/1-2',
      '对易子 iħ：不对易的后果',
      '$[\\hat x,\\hat p]=i\\hbar$：顺序差异不是零而是一个常数；不对易意味着两个力学量不能同时具有确定值。',
      [
        T(320, 24, '对易子 iħ：不对易的后果', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, '[x̂,p̂] = x̂p̂ − p̂x̂ = iħ', { size: 12.5, tone: 'amber' }),
        T(50, 96, 'iħ 是常数，不是零', { size: 10, tone: 'amber' }),
        T(50, 120, '⇒ Δx·Δp ≥ ħ/2', { size: 10.5, tone: 'violet' }),
        T(50, 146, '⇒ 两量不能同时确定', { size: 9.5, tone: 'muted' }),
        T(50, 170, 'ħ → 0：对易子消失', { size: 9.5, tone: 'cyan' }),
        T(50, 194, '回到可同时确定的经典', { size: 9.5, tone: 'faint' }),
        T(50, 218, '这个常数就是不确定性原理', { size: 9.5, tone: 'dim' }),
        ...AXIS({ x: 350, y: 88, w: 240, h: 110 }, { xLabel: 'Δx', yLabel: 'Δp' }),
        CURVE((x) => 0.5 / x, { x: 350, y: 88, w: 240, h: 110 }, [0.25, 2], [0, 2], {
          tone: 'violet',
          weight: 2,
          steps: 160
        }),
        T(360, 104, '允许区在曲线上方', { size: 9, tone: 'muted' }),
        T(350, 214, '0.25', { size: 9, tone: 'muted', anchor: 'middle' }),
        T(456, 214, '1', { size: 9, tone: 'muted', anchor: 'middle' }),
        T(590, 214, '2', { size: 9, tone: 'muted', anchor: 'middle' }),
        T(342, 195, '0', { size: 9, tone: 'muted', anchor: 'end' }),
        T(342, 140, '1', { size: 9, tone: 'muted', anchor: 'end' }),
        T(320, 252, '对易子的值不是零，而是 iħ', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '7.1/2-0',
      '本征方程：形状不变，只差一个数',
      '$\\hat A\\psi_n=a_n\\psi_n$：$\\psi_n$ 是本征函数，$a_n$ 是本征值；一次测量该力学量，只能得到某个 $a_n$。',
      [
        T(320, 24, '本征方程：形状不变，只差一个数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 196, 306, 196, { tone: 'dim' }),
        CURVE((x) => Math.exp(-6 * x * x), { x: 56, y: 96, w: 244, h: 100 }, [-1, 1], [0, 1.3], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => 1.25 * Math.exp(-6 * x * x), { x: 56, y: 96, w: 244, h: 100 }, [-1, 1], [0, 1.3], {
          tone: 'violet',
          dash: true
        }),
        T(56, 216, '−x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(180, 216, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(304, 216, '+x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(48, 100, 'aₙ', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(48, 192, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(200, 112, 'aₙψₙ', { size: 10, tone: 'violet' }),
        T(232, 156, 'ψₙ', { size: 10, tone: 'mint' }),
        T(56, 234, '形状不变，只是整体放大', { size: 9.5, tone: 'muted' }),
        T(330, 96, 'Âψₙ = aₙψₙ', { size: 11.5, tone: 'cyan' }),
        T(330, 122, '只乘一个数，形状不变', { size: 9.5, tone: 'muted' }),
        T(330, 146, '⇒ 该力学量有确定值', { size: 9.5, tone: 'mint' }),
        T(330, 170, '厄米 ⇒ aₙ 必为实数', { size: 9.5, tone: 'amber' }),
        T(330, 194, '谱可离散，也可连续', { size: 9.5, tone: 'violet' }),
        T(330, 218, '一次测量只得某个 aₙ', { size: 9.5, tone: 'faint' }),
        T(320, 254, '本征值给出一次测量的可能读数', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '形状不变是“确定值”的几何表达', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '7.1/2-1',
      '按本征函数展开任意态',
      '$\\psi=\\sum c_n\\psi_n$，归一化要求 $\\sum|c_n|^2=1$；系数由内积 $c_n=\\int\\psi_n^*\\psi\\,d\\tau$ 直接算出。',
      [
        T(320, 24, '按本征函数展开任意态', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 96, 256, 96, { tone: 'dim' }),
        CURVE((x) => Math.exp(-14 * (x - 0.5) ** 2), { x: 56, y: 80, w: 200, h: 32 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(264, 90, 'ψ₀', { size: 10, tone: 'mint' }),
        T(278, 90, 'c₀', { size: 9.5, tone: 'muted' }),
        L(56, 142, 256, 142, { tone: 'dim' }),
        CURVE((x) => 6 * (x - 0.5) * Math.exp(-10 * (x - 0.5) ** 2), { x: 56, y: 126, w: 200, h: 32 }, [0, 1], [-1, 1], {
          tone: 'cyan',
          weight: 1.8
        }),
        T(264, 136, 'ψ₁', { size: 10, tone: 'cyan' }),
        T(278, 136, 'c₁', { size: 9.5, tone: 'muted' }),
        L(56, 188, 256, 188, { tone: 'dim' }),
        CURVE((x) => (1 - 30 * (x - 0.5) ** 2) * Math.exp(-9 * (x - 0.5) ** 2), {
          x: 56,
          y: 172,
          w: 200,
          h: 32
        }, [0, 1], [-1, 1], { tone: 'violet', weight: 1.8 }),
        T(264, 182, 'ψ₂', { size: 10, tone: 'violet' }),
        T(278, 182, 'c₂', { size: 9.5, tone: 'muted' }),
        T(300, 84, 'ψ = Σ cₙψₙ', { size: 11, tone: 'mint' }),
        T(300, 110, 'cₙ = ∫ψₙ*ψ dτ', { size: 10, tone: 'cyan' }),
        T(300, 136, 'Σ|cₙ|² = 1', { size: 10, tone: 'violet' }),
        T(300, 162, '基组完备 ⇒ 任意态可展开', { size: 9.5, tone: 'muted' }),
        T(300, 188, '系数由内积算出', { size: 9.5, tone: 'amber' }),
        T(300, 214, 'c₁ = 1 时 ψ 就是 ψ₁', { size: 9.5, tone: 'faint' }),
        T(320, 250, '完备性让任意态被一组读数描述', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '系数决定各读数的权重', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '7.1/2-2',
      '期待值是本征值的加权平均',
      '$\\langle A\\rangle=\\int\\psi^*\\hat A\\psi\\,d\\tau=\\sum|c_n|^2a_n$：它是多次测量的平均，而不是单次必然得到的数。',
      [
        T(320, 24, '期待值是本征值的加权平均', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 88, w: 410, h: 122 }, { xLabel: 'A 的读数', yLabel: '|cₙ|²' }),
        R(95, 199, 30, 11, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        R(185, 166, 30, 44, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        R(275, 171.5, 30, 38.5, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        R(365, 193.5, 30, 16.5, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        T(110, 226, 'a₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(200, 226, 'a₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(290, 226, 'a₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(380, 226, 'a₄', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(249, 90, 249, 210, { tone: 'amber', dash: true }),
        T(254, 100, '⟨A⟩', { size: 10, tone: 'amber' }),
        T(490, 100, '|cₙ|² 是概率', { size: 9.5, tone: 'mint' }),
        T(490, 124, 'Σ|cₙ|² = 1', { size: 10, tone: 'cyan' }),
        T(490, 148, '单次只给一个 aₙ', { size: 9.5, tone: 'violet' }),
        T(490, 172, '平均才是 ⟨A⟩', { size: 9.5, tone: 'amber' }),
        T(490, 196, '不是单次必然读数', { size: 9.5, tone: 'faint' }),
        T(320, 252, '本征值给读数，系数给概率', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '重复测量才收敛到期待值', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '7.1/0-0-f',
      'x̂ψ = xψ：逐点乘以坐标',
      '乘法算符不改变曲线的形状类型，只把每一点按 $x$ 伸缩：$x=0$ 处归零，$x<0$ 处反号，$x$ 大处放大。',
      [
        T(320, 24, 'x̂ψ = xψ：逐点乘以坐标', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, 'x̂ψ(x) = x·ψ(x)', { size: 12.5, tone: 'text' }),
        L(50, 158, 300, 158, { tone: 'faint', dash: true }),
        CURVE((x) => Math.exp(-3 * x * x), { x: 50, y: 80, w: 250, h: 120 }, [-1, 1], [-0.6, 1.1], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => x * Math.exp(-3 * x * x), { x: 50, y: 80, w: 250, h: 120 }, [-1, 1], [-0.6, 1.1], {
          tone: 'violet',
          dash: true
        }),
        T(50, 226, '−1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(175, 226, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 226, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(42, 162, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(50, 246, 'ψ', { size: 9.5, tone: 'mint' }),
        T(68, 246, 'xψ', { size: 9.5, tone: 'violet' }),
        T(330, 84, 'x 是乘数，不是微分', { size: 9.5, tone: 'mint' }),
        T(330, 108, '取值：x 取全体实数', { size: 9.5, tone: 'cyan' }),
        T(330, 132, '本征函数 δ(x−x′)', { size: 9.5, tone: 'violet' }),
        T(330, 156, '本征值 x′ 连续分布', { size: 9.5, tone: 'muted' }),
        T(330, 180, '几何：曲线逐点按 x 伸缩', { size: 9.5, tone: 'muted' }),
        T(330, 204, 'x = 0 归零，x < 0 反号', { size: 9.5, tone: 'faint' }),
        T(330, 228, '极限：x 大处放大，x 小处压平', { size: 9.5, tone: 'dim' }),
        T(320, 268, '乘法算符的作用就是逐点缩放', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '7.1/0-1-f',
      'p̂ψ = −iħ ∂ψ/∂x：取斜率',
      '微分算符量的是斜率：$\\hbar$ 定动量的尺度，$-i$ 只带来相位；本征函数是平面波 $e^{ikx}$，本征值 $\\hbar k$ 连续。',
      [
        T(320, 24, 'p̂ψ = −iħ ∂ψ/∂x：取斜率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, 'p̂ψ(x) = −iħ·∂ψ/∂x', { size: 12.5, tone: 'text' }),
        L(50, 151, 300, 151, { tone: 'faint', dash: true }),
        CURVE((x) => Math.exp(-3 * x * x), { x: 50, y: 80, w: 250, h: 120 }, [-1, 1], [-1.6, 1.1], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => -6 * x * Math.exp(-3 * x * x), { x: 50, y: 80, w: 250, h: 120 }, [-1, 1], [-1.6, 1.1], {
          tone: 'cyan',
          weight: 2
        }),
        T(50, 226, '−1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(175, 226, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 226, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(42, 155, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(50, 246, 'ψ', { size: 9.5, tone: 'mint' }),
        T(68, 246, 'ψ′', { size: 9.5, tone: 'cyan' }),
        T(330, 84, 'ħ 定尺度：动量 ∝ 斜率', { size: 9.5, tone: 'cyan' }),
        T(330, 108, '−i 只带来相位，不改形状', { size: 9.5, tone: 'muted' }),
        T(330, 132, '本征函数 e^{ikx}，值 ħk', { size: 9.5, tone: 'violet' }),
        T(330, 156, 'k 连续 ⇒ 动量谱连续', { size: 9.5, tone: 'muted' }),
        T(330, 180, '几何：曲线越陡斜率越大', { size: 9.5, tone: 'mint' }),
        T(330, 204, 'ħ → 0：微分项退场', { size: 9.5, tone: 'faint' }),
        T(320, 268, '动量算符读的是波函数的局部斜率', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '7.1/0-2-f',
      'Ĥ：二阶导加势能',
      '$\\hat H=-\\hbar^2/2m\\,\\partial^2/\\partial x^2+V(x)$：第一项由曲率给动能，第二项只做乘法；束缚时谱离散，$V=0$ 时连续。',
      [
        T(320, 24, 'Ĥ：二阶导加势能', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 50, 180, 26, { tone: 'cyan', opacity: 0.2, r: 5 }),
        T(130, 67, '−ħ²/2m·∂²/∂x²', { size: 10.5, tone: 'cyan', anchor: 'middle' }),
        T(232, 67, '+', { size: 12, tone: 'text' }),
        BAND(248, 50, 110, 26, { tone: 'violet', opacity: 0.2, r: 5 }),
        T(303, 67, 'V(x)', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(368, 67, '= Ĥ', { size: 12, tone: 'text' }),
        ...AXIS({ x: 60, y: 92, w: 240, h: 110 }, { xLabel: 'x', yLabel: 'V' }),
        CURVE((x) => -Math.exp(-2 * x * x), { x: 60, y: 92, w: 240, h: 110 }, [-2, 2], [-1.2, 0.2], {
          tone: 'violet',
          weight: 2
        }),
        T(60, 220, '−2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(180, 220, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 220, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 200, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(330, 96, '第一项：曲率越大，动能越高', { size: 9.5, tone: 'cyan' }),
        T(330, 120, '第二项：势能只做乘法', { size: 9.5, tone: 'violet' }),
        T(330, 144, '束缚态 ⇒ 能量离散', { size: 9.5, tone: 'mint' }),
        T(330, 168, 'V = 0 ⇒ 自由粒子连续谱', { size: 9.5, tone: 'muted' }),
        T(330, 192, 'm → ∞ 时动能项消失', { size: 9.5, tone: 'faint' }),
        T(330, 216, 'Ĥ 的本征方程即定态方程', { size: 9.5, tone: 'dim' }),
        T(320, 252, '一个算符同时管曲率与乘法', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '这就是定态薛定谔方程的左侧', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '7.1/1-0-f',
      '加法：逐点相加，与顺序无关',
      '$(\\hat A+\\hat B)\\psi=\\hat A\\psi+\\hat B\\psi$：和仍是线性算符，交换两个加数不改变结果；但和的本征值一般不是两者本征值之和。',
      [
        T(320, 24, '加法：逐点相加，与顺序无关', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, '(Â+B̂)ψ = Âψ + B̂ψ', { size: 12, tone: 'text' }),
        A(80, 190, 240, 190, { tone: 'cyan', weight: 2 }),
        A(240, 190, 300, 130, { tone: 'violet', weight: 2 }),
        A(80, 190, 300, 130, { tone: 'amber', weight: 1.6, dash: true }),
        T(150, 208, 'Âψ', { size: 10, tone: 'cyan' }),
        T(276, 168, 'B̂ψ', { size: 10, tone: 'violet' }),
        T(118, 138, 'Âψ + B̂ψ', { size: 10, tone: 'amber' }),
        T(340, 84, '逐点相加，无顺序问题', { size: 9.5, tone: 'muted' }),
        T(340, 108, 'Â+B̂ 仍是线性算符', { size: 9.5, tone: 'mint' }),
        T(340, 132, '和的本征值一般不是和', { size: 9.5, tone: 'cyan' }),
        T(340, 156, '对易时才共享本征函数', { size: 9.5, tone: 'violet' }),
        T(340, 180, 'Â = B̂ 时和为 2Â', { size: 9.5, tone: 'faint' }),
        T(340, 204, '极限：Â + 0 = Â', { size: 9.5, tone: 'dim' }),
        T(320, 250, '加法只要求两个算符都线性', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '7.1/1-1-f',
      '乘积：从右向左依次作用',
      '$(\\hat A\\hat B)\\psi=\\hat A(\\hat B\\psi)$：先让 $\\hat B$ 作用；结合律成立，交换律一般不成立，单位算符 $\\hat I$ 不改变态。',
      [
        T(320, 24, '乘积：从右向左依次作用', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, '(ÂB̂)ψ = Â(B̂ψ)', { size: 12, tone: 'text' }),
        BAND(50, 96, 60, 32, { tone: 'faint', opacity: 0.2, r: 5 }),
        T(80, 116, 'ψ', { size: 11, tone: 'muted', anchor: 'middle' }),
        A(116, 112, 140, 112, { tone: 'dim' }),
        BAND(144, 96, 60, 32, { tone: 'cyan', opacity: 0.22, r: 5 }),
        T(174, 116, 'B̂', { size: 11, tone: 'cyan', anchor: 'middle' }),
        A(210, 112, 234, 112, { tone: 'dim' }),
        BAND(238, 96, 60, 32, { tone: 'violet', opacity: 0.22, r: 5 }),
        T(268, 116, 'Â', { size: 11, tone: 'violet', anchor: 'middle' }),
        T(310, 116, '= ÂB̂ψ', { size: 10.5, tone: 'amber' }),
        T(50, 158, '反向：B̂Âψ 一般不同', { size: 9.5, tone: 'muted' }),
        T(50, 182, '结合律：(ÂB̂)Ĉ = Â(B̂Ĉ)', { size: 9.5, tone: 'mint' }),
        T(50, 206, '交换律不成立：ÂB̂ ≠ B̂Â', { size: 9.5, tone: 'amber' }),
        T(50, 230, '单位算符：ÎÂ = ÂÎ = Â', { size: 9.5, tone: 'cyan' }),
        T(330, 158, '序 = 先让谁作用', { size: 9.5, tone: 'violet' }),
        T(330, 182, '本征值一般不是 aₙbₙ', { size: 9.5, tone: 'faint' }),
        T(330, 206, '次序差异由对易子量化', { size: 9.5, tone: 'dim' }),
        T(320, 258, '算符的“乘法”其实是不一定可交换的作用链', { size: 9.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '7.1/1-2-f',
      '对易子 = iħ：常数不是零',
      '$[\\hat x,\\hat p]=i\\hbar$：乘积法则留下的常数项；它给出 $\\Delta x\\Delta p\\ge\\hbar/2$，并在 $\\hbar\\to0$ 时退回经典。',
      [
        T(320, 24, '对易子 = iħ：常数不是零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, '[x̂,p̂] = x̂p̂ − p̂x̂ = iħ', { size: 12.5, tone: 'amber' }),
        T(50, 96, 'x̂p̂ψ = −iħ·x·ψ′', { size: 11, tone: 'mint' }),
        T(50, 122, 'p̂x̂ψ = −iħ·x·ψ′ − iħψ', { size: 11, tone: 'cyan' }),
        T(50, 148, '相减 ⇒ iħψ', { size: 11, tone: 'violet' }),
        L(50, 166, 590, 166, { tone: 'faint' }),
        T(50, 192, 'iħ ≠ 0 ⇒ 不可同时确定', { size: 10.5, tone: 'amber' }),
        T(50, 216, '⇒ Δx·Δp ≥ ħ/2', { size: 10.5, tone: 'violet' }),
        T(50, 240, 'ħ → 0：对易子消失，回到经典', { size: 9.5, tone: 'faint' }),
        ...AXIS({ x: 350, y: 88, w: 240, h: 110 }, { xLabel: 'Δx', yLabel: 'Δp' }),
        CURVE((x) => 0.5 / x, { x: 350, y: 88, w: 240, h: 110 }, [0.25, 2], [0, 2], {
          tone: 'violet',
          weight: 2,
          steps: 160
        }),
        T(360, 104, '允许区在曲线上方', { size: 9, tone: 'muted' }),
        T(350, 214, '0.25', { size: 9, tone: 'muted', anchor: 'middle' }),
        T(456, 214, '1', { size: 9, tone: 'muted', anchor: 'middle' }),
        T(590, 214, '2', { size: 9, tone: 'muted', anchor: 'middle' }),
        T(342, 195, '0', { size: 9, tone: 'muted', anchor: 'end' }),
        T(342, 140, '1', { size: 9, tone: 'muted', anchor: 'end' }),
        T(320, 252, '对易子的数值就是不确定性原理的种子', { size: 10, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '7.1/2-0-f',
      '本征值：谱线位置就是读数',
      '$\\hat A\\psi_n=a_n\\psi_n$：$a_n$ 是一次测量可能得到的读数；厄米性保证它取实值，简并时一个读数对应多个态。',
      [
        T(320, 24, '本征值：谱线位置就是读数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, 'Âψₙ = aₙψₙ', { size: 12.5, tone: 'text' }),
        L(56, 196, 306, 196, { tone: 'dim' }),
        CURVE((x) => Math.exp(-6 * x * x), { x: 56, y: 96, w: 244, h: 100 }, [-1, 1], [0, 1.3], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => 1.2 * Math.exp(-6 * x * x), { x: 56, y: 96, w: 244, h: 100 }, [-1, 1], [0, 1.3], {
          tone: 'violet',
          dash: true
        }),
        T(56, 216, '−x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(180, 216, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(304, 216, '+x', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(48, 100, 'aₙ', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(48, 192, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(200, 112, 'aₙψₙ', { size: 10, tone: 'violet' }),
        T(232, 156, 'ψₙ', { size: 10, tone: 'mint' }),
        T(56, 234, '形状不变，只是整体放大', { size: 9.5, tone: 'muted' }),
        ...LEVEL(340, 530, 110, 'a₀', { tone: 'mint', size: 9.5 }),
        ...LEVEL(340, 530, 150, 'a₁', { tone: 'mint', size: 9.5 }),
        ...LEVEL(340, 530, 190, 'a₂', { tone: 'mint', size: 9.5 }),
        T(340, 228, '谱线位置就是可能读数', { size: 9.5, tone: 'muted' }),
        T(340, 250, '简并：一个 aₙ 对多个 ψₙ', { size: 9.5, tone: 'faint' }),
        T(320, 274, '本征值谱是测量结果的清单', { size: 9.5, tone: 'dim', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '7.1/2-1-f',
      '展开系数：内积给出权重',
      '$\\psi=\\sum c_n\\psi_n$，$c_n=\\int\\psi_n^*\\psi\\,d\\tau$：基组完备，系数由内积算出，归一化要求 $\\sum|c_n|^2=1$。',
      [
        T(320, 24, '展开系数：内积给出权重', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, 'ψ = Σ cₙψₙ', { size: 12.5, tone: 'text' }),
        L(56, 96, 236, 96, { tone: 'dim' }),
        CURVE((x) => Math.exp(-14 * (x - 0.5) ** 2), { x: 56, y: 80, w: 180, h: 32 }, [0, 1], [-1, 1], {
          tone: 'mint',
          weight: 1.8
        }),
        T(244, 90, 'c₀ψ₀', { size: 9.5, tone: 'mint' }),
        L(56, 142, 236, 142, { tone: 'dim' }),
        CURVE((x) => 6 * (x - 0.5) * Math.exp(-10 * (x - 0.5) ** 2), { x: 56, y: 126, w: 180, h: 32 }, [0, 1], [-1, 1], {
          tone: 'cyan',
          weight: 1.8
        }),
        T(244, 136, 'c₁ψ₁', { size: 9.5, tone: 'cyan' }),
        L(56, 188, 236, 188, { tone: 'dim' }),
        CURVE((x) => (1 - 30 * (x - 0.5) ** 2) * Math.exp(-9 * (x - 0.5) ** 2), {
          x: 56,
          y: 172,
          w: 180,
          h: 32
        }, [0, 1], [-1, 1], { tone: 'violet', weight: 1.8 }),
        T(244, 182, 'c₂ψ₂', { size: 9.5, tone: 'violet' }),
        T(290, 86, 'cₙ = ∫ψₙ*ψ dτ', { size: 10.5, tone: 'cyan' }),
        T(290, 112, '归一化 Σ|cₙ|² = 1', { size: 9.5, tone: 'violet' }),
        T(290, 138, '基组完备 ⇒ 任意态可展开', { size: 9.5, tone: 'muted' }),
        T(290, 164, '|cₙ|² 是得到 aₙ 的概率', { size: 9.5, tone: 'mint' }),
        T(290, 190, 'c₁ = 1 时 ψ 就是 ψ₁', { size: 9.5, tone: 'faint' }),
        T(290, 216, '连续谱：求和换成积分', { size: 9.5, tone: 'dim' }),
        T(320, 250, '求和展开与离散谱的展开完全同形', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '只是把 Σ 换成 ∫ dk', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '7.1/2-2-f',
      '期待值：概率做权重的平均',
      '$\\langle A\\rangle=\\sum|c_n|^2a_n$：$|c_n|^2$ 是读到 $a_n$ 的概率；某次测量只给一个 $a_n$，平均才收敛到 $\\langle A\\rangle$。',
      [
        T(320, 24, '期待值：概率做权重的平均', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 58, '⟨A⟩ = Σ |cₙ|² aₙ', { size: 12.5, tone: 'text' }),
        ...AXIS({ x: 50, y: 92, w: 250, h: 110 }, { xLabel: 'A', yLabel: '|cₙ|²' }),
        R(77, 191, 26, 11, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        R(127, 158, 26, 44, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        R(177, 163.5, 26, 38.5, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        R(227, 185.5, 26, 16.5, { tone: 'mint', fill: true, opacity: 0.35, r: 2 }),
        T(90, 220, 'a₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(140, 220, 'a₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(190, 220, 'a₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(240, 220, 'a₄', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(167.5, 94, 167.5, 202, { tone: 'amber', dash: true }),
        T(172, 102, '⟨A⟩', { size: 10, tone: 'amber' }),
        T(340, 96, '权重 |cₙ|² 是概率', { size: 9.5, tone: 'mint' }),
        T(340, 120, '求和 = 加权平均', { size: 9.5, tone: 'amber' }),
        T(340, 144, '单次只得一个 aₙ', { size: 9.5, tone: 'violet' }),
        T(340, 168, '多次测量才逼近 ⟨A⟩', { size: 9.5, tone: 'muted' }),
        T(340, 192, '某 cₙ = 1 ⇒ 读数确定', { size: 9.5, tone: 'faint' }),
        T(340, 216, '概率之和必须为 1', { size: 9.5, tone: 'dim' }),
        T(320, 250, '期待值是多次测量的平均，不是单次读数', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '系数给概率，本征值给读数', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
