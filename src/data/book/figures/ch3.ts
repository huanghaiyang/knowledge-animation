import { fig, T, R, BAND, L, A, DOT, TAG, AXIS, CURVE, LEVEL, PANEL } from './kit'
import type { SectionFigureSet } from './types'

export const ch3Figures: Record<string, SectionFigureSet> = {
  'qm-3-1': {
    overview: fig(
      '3.1/overview',
      '无限深势阱：边界条件筛出能级',
      '势阱把粒子限制在 $0<x<L$；$\\psi$ 在两侧壁必须为零，这条要求把连续波数筛成 $kL=n\\pi$，能级随之变成 $n^2$ 的离散阶梯。',
      [
        T(320, 24, '无限深势阱：边界条件筛出能级', { size: 13, tone: 'text', anchor: 'middle' }),
        R(96, 64, 10, 170, { tone: 'amber', fill: true, opacity: 0.26 }),
        R(300, 64, 10, 170, { tone: 'amber', fill: true, opacity: 0.26 }),
        L(96, 234, 310, 234, { tone: 'dim' }),
        CURVE((x) => Math.sin(Math.PI * x), { x: 106, y: 140, w: 194, h: 88 }, [0, 1], [-1.3, 1.3], { tone: 'mint', weight: 2 }),
        CURVE((x) => 0.76 * Math.sin(2 * Math.PI * x), { x: 106, y: 140, w: 194, h: 88 }, [0, 1], [-1.3, 1.3], { tone: 'violet', dash: true }),
        T(101, 106, '∞', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(305, 106, '∞', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(106, 254, '0', { size: 10, tone: 'dim', anchor: 'middle' }),
        T(300, 254, 'L', { size: 10, tone: 'dim', anchor: 'middle' }),
        A(334, 150, 370, 150, { tone: 'violet', weight: 1.5 }),
        T(352, 138, '筛成离散', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        ...LEVEL(388, 512, 220, 'E₁', { tone: 'mint' }),
        ...LEVEL(388, 512, 184, 'E₂', { tone: 'mint' }),
        ...LEVEL(388, 512, 136, 'E₃', { tone: 'mint' }),
        ...LEVEL(388, 512, 76, 'E₄', { tone: 'mint' }),
        T(450, 44, 'E_n ∝ n²', { size: 11, tone: 'text', anchor: 'middle' }),
        T(320, 272, 'ψ(0)=ψ(L)=0 → kL=nπ → E_n ∝ n²', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '3.1/0-0',
        '把势场关进无限高盒子',
        '壁外波函数恒为零，阱内势能为零；两条竖直的无穷高势壁把粒子的活动范围锁死在 $0<x<L$。',
        [
          ...AXIS({ x: 60, y: 50, w: 520, h: 190 }, { xLabel: 'x', yLabel: 'V(x)' }),
          L(150, 240, 150, 80, { tone: 'amber', weight: 2 }),
          L(430, 240, 430, 80, { tone: 'amber', weight: 2 }),
          A(150, 80, 150, 56, { tone: 'amber', weight: 1.6 }),
          A(430, 80, 430, 56, { tone: 'amber', weight: 1.6 }),
          T(141, 72, '∞', { size: 11, tone: 'amber', anchor: 'end' }),
          T(439, 72, '∞', { size: 11, tone: 'amber', anchor: 'start' }),
          L(150, 240, 430, 240, { tone: 'mint', weight: 2 }),
          CURVE((x) => Math.sin(Math.PI * x), { x: 150, y: 170, w: 280, h: 70 }, [0, 1], [0, 1], { tone: 'mint', weight: 2 }),
          DOT(150, 240, { r: 2.5, tone: 'mint' }),
          DOT(430, 240, { r: 2.5, tone: 'mint' }),
          T(290, 160, 'ψ₁', { size: 11, tone: 'mint', anchor: 'middle' }),
          T(150, 258, '0', { size: 10, tone: 'dim', anchor: 'middle' }),
          T(430, 258, 'L', { size: 10, tone: 'dim', anchor: 'middle' }),
          T(74, 232, 'ψ ≡ 0', { size: 9.5, tone: 'dim' }),
          T(448, 232, 'ψ ≡ 0', { size: 9.5, tone: 'dim' }),
          T(320, 276, '壁外 ψ 恒为零；阱内 V = 0', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '3.1/0-1',
        '通解 = 两个反向行波，或一对实函数',
        '阱内是自由粒子方程，两个反向行波叠加后可以改写成 $A\\sin kx+B\\cos kx$，用实函数代入边界条件更方便。',
        [
          ...PANEL(36, 48, 272, 184, '两个反向行波', { tone: 'cyan' }),
          CURVE((x) => Math.sin(x), { x: 54, y: 86, w: 238, h: 54 }, [0, 6.28], [-1.2, 1.2], { tone: 'mint', steps: 80 }),
          CURVE((x) => Math.sin(x + 2.2), { x: 54, y: 86, w: 238, h: 54 }, [0, 6.28], [-1.2, 1.2], { tone: 'violet', steps: 80, dash: true }),
          A(56, 192, 244, 192, { tone: 'mint' }),
          A(244, 212, 56, 212, { tone: 'violet' }),
          T(60, 180, 'exp(ikx) →', { size: 9.5, tone: 'mint' }),
          T(240, 224, '← exp(−ikx)', { size: 9.5, tone: 'violet', anchor: 'end' }),
          ...PANEL(330, 48, 274, 184, '合成：驻波', { tone: 'violet' }),
          CURVE((x) => Math.sin(Math.PI * x), { x: 348, y: 100, w: 238, h: 76 }, [0, 1], [-1.25, 1.25], { tone: 'mint', weight: 2 }),
          CURVE((x) => Math.cos(Math.PI * x), { x: 348, y: 100, w: 238, h: 76 }, [0, 1], [-1.25, 1.25], { tone: 'violet', dash: true }),
          T(350, 90, 'A sin kx', { size: 9.5, tone: 'mint' }),
          T(584, 90, 'B cos kx', { size: 9.5, tone: 'violet', anchor: 'end' }),
          T(320, 252, 'ψ = A sin kx + B cos kx', { size: 11.5, tone: 'text', anchor: 'middle', mono: true }),
          T(320, 276, '两种写法等价，实函数形式专为代入 ψ(0) = ψ(L) = 0', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-2': fig(
        '3.1/0-2',
        '一个边界要求切出离散波数',
        'x=L 处要求 sin kL = 0，于是 kL 只能是 π 的整数倍；原本连续的波数轴被切成间隔 π/L 的格点。',
        [
          CURVE((x) => Math.sin(x), { x: 120, y: 56, w: 380, h: 88 }, [0, 9.4248], [-1.2, 1.2], { tone: 'mint', steps: 120, weight: 2 }),
          T(124, 48, 'sin kL', { size: 10, tone: 'mint' }),
          L(246.7, 100, 246.7, 250, { tone: 'faint', dash: true }),
          L(373.3, 100, 373.3, 250, { tone: 'faint', dash: true }),
          L(500, 100, 500, 250, { tone: 'faint', dash: true }),
          DOT(246.7, 100, { r: 3, tone: 'mint' }),
          DOT(373.3, 100, { r: 3, tone: 'mint' }),
          DOT(500, 100, { r: 3, tone: 'mint' }),
          ...AXIS({ x: 120, y: 190, w: 380, h: 60 }, { xLabel: 'k' }),
          DOT(246.7, 250, { r: 3.5, tone: 'violet' }),
          DOT(373.3, 250, { r: 3.5, tone: 'violet' }),
          DOT(500, 250, { r: 3.5, tone: 'violet' }),
          T(246.7, 268, 'π/L', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(373.3, 268, '2π/L', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          T(500, 268, '3π/L', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          TAG(68, 66, 'kL = nπ', { tone: 'violet', size: 11 }),
          TAG(68, 92, 'n = 1, 2, 3, …', { tone: 'dim', size: 9.5 }),
          T(320, 278, '连续 k 被切成间隔 π/L 的离散格点', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '3.1/1-0',
        '能级按 n² 增长，盒越大越密',
        '把 $k=n\\pi/L$ 代回 $E=\\hbar^2k^2/2m$，得到 $E_n\\propto n^2$：间隔越往上越大；盒宽增大时，整条能级阶梯下移并压密。',
        [
          T(166, 38, '能级按 n² 增长', { size: 11, tone: 'text', anchor: 'middle' }),
          ...LEVEL(64, 240, 232, 'E₁', { tone: 'mint' }),
          ...LEVEL(64, 240, 200, 'E₂', { tone: 'mint' }),
          ...LEVEL(64, 240, 152, 'E₃', { tone: 'mint' }),
          ...LEVEL(64, 240, 88, 'E₄', { tone: 'mint' }),
          T(166, 268, '间隔 ΔE = (2n+1)E₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          T(470, 38, '阱宽 L 与 2L', { size: 10.5, tone: 'text', anchor: 'middle' }),
          ...LEVEL(360, 470, 244),
          ...LEVEL(360, 470, 220),
          ...LEVEL(360, 470, 180),
          ...LEVEL(360, 470, 124),
          T(415, 266, 'L', { size: 10, tone: 'mint', anchor: 'middle' }),
          ...LEVEL(500, 600, 250, undefined, { tone: 'violet' }),
          ...LEVEL(500, 600, 244, undefined, { tone: 'violet' }),
          ...LEVEL(500, 600, 234, undefined, { tone: 'violet' }),
          ...LEVEL(500, 600, 220, undefined, { tone: 'violet' }),
          T(550, 266, '2L', { size: 10, tone: 'violet', anchor: 'middle' }),
          T(320, 278, 'L 增大 → 能级整体下移并被压密', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '3.1/1-1',
        '本征函数：n−1 个节点',
        '归一化系数 $\\sqrt{2/L}$ 保证概率总和为一；第 n 个态在阱内有 n−1 个节点，节点越多波形弯折越厉害，动能也越大。',
        [
          ...AXIS({ x: 70, y: 50, w: 480, h: 200 }, { xLabel: 'x' }),
          L(96, 88, 504, 88, { tone: 'faint', dash: true }),
          L(96, 154, 504, 154, { tone: 'faint', dash: true }),
          L(96, 220, 504, 220, { tone: 'faint', dash: true }),
          CURVE((x) => Math.sin(Math.PI * x), { x: 96, y: 68, w: 408, h: 40 }, [0, 1], [-1.2, 1.2], { tone: 'mint', weight: 2 }),
          CURVE((x) => Math.sin(2 * Math.PI * x), { x: 96, y: 134, w: 408, h: 40 }, [0, 1], [-1.2, 1.2], { tone: 'violet', weight: 2 }),
          CURVE((x) => Math.sin(3 * Math.PI * x), { x: 96, y: 200, w: 408, h: 40 }, [0, 1], [-1.2, 1.2], { tone: 'amber', weight: 2 }),
          DOT(300, 154, { r: 2.6, tone: 'violet' }),
          DOT(232, 220, { r: 2.6, tone: 'amber' }),
          DOT(368, 220, { r: 2.6, tone: 'amber' }),
          T(84, 86, 'ψ₁', { size: 11, tone: 'mint', anchor: 'end' }),
          T(84, 152, 'ψ₂', { size: 11, tone: 'violet', anchor: 'end' }),
          T(84, 218, 'ψ₃', { size: 11, tone: 'amber', anchor: 'end' }),
          T(512, 64, 'n−1 个节点', { size: 9.5, tone: 'dim', anchor: 'end' }),
          T(320, 278, '节点数 = n−1；弯折越剧烈，对应动能越大', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '3.1/1-2',
        '经典可以静止，量子不能',
        '经典粒子能停在阱底、位置概率均匀；量子基态却有零点能，概率密度是中间高、两端为零的驻波形状。',
        [
          ...PANEL(40, 52, 252, 172, '经典粒子', { tone: 'dim' }),
          L(60, 206, 272, 206, { tone: 'dim' }),
          DOT(110, 206, { r: 4, tone: 'muted' }),
          T(124, 196, '可静止于阱底', { size: 9.5, tone: 'muted' }),
          L(60, 124, 272, 124, { tone: 'muted', dash: true }),
          T(60, 114, '位置概率处处相同', { size: 9.5, tone: 'muted' }),
          ...PANEL(340, 52, 262, 172, '量子粒子', { tone: 'mint' }),
          BAND(360, 128, 222, 78, { tone: 'mint', opacity: 0.1 }),
          CURVE((x) => Math.sin(Math.PI * x) ** 2, { x: 360, y: 128, w: 222, h: 78 }, [0, 1], [0, 1], { tone: 'mint', weight: 2 }),
          L(360, 206, 582, 206, { tone: 'dim' }),
          ...LEVEL(360, 582, 190, 'E₁', { tone: 'amber' }),
          T(368, 178, '零点能 E₁ > 0', { size: 9.5, tone: 'amber' }),
          T(470, 220, '概率在中央最大', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          T(320, 276, '经典可静止且概率均匀；量子有零点能，概率呈驻波分布', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '3.1/2-0',
        '阱宽减半，能级四倍',
        '由 $E_n\\propto1/L^2$，宽度由 L 压到 L/2 时每个能级都变成原来的四倍；把粒子挤得更紧必然抬高它的能量。',
        [
          T(172, 40, '原阱宽 L', { size: 10.5, tone: 'text', anchor: 'middle' }),
          ...LEVEL(70, 280, 232, 'E₁', { tone: 'mint' }),
          ...LEVEL(70, 280, 200, '4E₁', { tone: 'mint' }),
          ...LEVEL(70, 280, 152, '9E₁', { tone: 'mint' }),
          T(172, 264, 'E₁ = π²ħ²/2mL²', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(318, 176, 368, 176, { tone: 'danger', weight: 1.6 }),
          T(343, 164, '压缩', { size: 9.5, tone: 'danger', anchor: 'middle' }),
          TAG(304, 196, '能级 ×4', { tone: 'danger', size: 10 }),
          T(470, 40, '阱宽 L/2', { size: 10.5, tone: 'text', anchor: 'middle' }),
          ...LEVEL(390, 560, 232, '4E₁', { tone: 'amber' }),
          ...LEVEL(390, 560, 168, '16E₁', { tone: 'amber' }),
          ...LEVEL(390, 560, 64, '36E₁', { tone: 'amber' }),
          T(320, 278, '宽度减半 → 全部能级变为 4 倍', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-1': fig('3.1/2-1', '__T__', '__C__', []),
      '2-2': fig('3.1/2-2', '__T__', '__C__', []),
      '2-3': fig('3.1/2-3', '__T__', '__C__', [])
    },
    formulas: {
      '0-0': fig('3.1/0-0-f', '__T__', '__C__', []),
      '0-1': fig('3.1/0-1-f', '__T__', '__C__', []),
      '1-0': fig('3.1/1-0-f', '__T__', '__C__', []),
      '1-1': fig('3.1/1-1-f', '__T__', '__C__', []),
      '2-0': fig('3.1/2-0-f', '__T__', '__C__', []),
      '2-1': fig('3.1/2-1-f', '__T__', '__C__', [])
    }
  },
  // __NEXT__
}
