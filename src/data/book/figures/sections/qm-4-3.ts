import { fig, T, R, BAND, L, A, DOT, TAG, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const V_LOW = (x: number) => 0.12 + 0.3 * Math.exp(-((x / 0.5) ** 2)) + 0.65 * (Math.abs(x) / 1.5) ** 8

const set: SectionFigureSet = {
  overview: fig(
    '4.3/overview',
    '低垒双阱：两阱连通，偶奇分裂大',
    '低势垒下波函数几乎不衰减，两阱强耦合：偶态无节点、奇态一个节点，分裂与阱内间距同量级；束缚谱仍离散，垒消失后趋于连续谱。',
    [
      T(320, 24, '低垒双阱：两阱连通，偶奇分裂大', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 332, 196, '低垒：波函数连通', { tone: 'mint' }),
      CURVE(
        (x) => Math.exp(-(((x - 88) / 34) ** 2)) + Math.exp(-(((x - 212) / 34) ** 2)),
        { x: 52, y: 74, w: 300, h: 26 },
        [0, 300],
        [-1, 1],
        { tone: 'mint', weight: 1.8 }
      ),
      CURVE(
        (x) => Math.exp(-(((x - 88) / 34) ** 2)) - Math.exp(-(((x - 212) / 34) ** 2)),
        { x: 52, y: 104, w: 300, h: 26 },
        [0, 300],
        [-1, 1],
        { tone: 'violet', dash: true }
      ),
      T(46, 220, '实线：偶态无节点', { size: 9.5, tone: 'mint' }),
      T(46, 236, '虚线：奇态一个节点', { size: 9.5, tone: 'violet' }),
      CURVE(V_LOW, { x: 52, y: 138, w: 300, h: 72 }, [-1.5, 1.5], [0, 0.9], { tone: 'amber', weight: 2 }),
      T(320, 152, 'V(x)', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      ...PANEL(380, 44, 226, 202, '能级：分裂大', { tone: 'violet' }),
      BAND(396, 76, 130, 20, { tone: 'cyan', opacity: 0.2 }),
      T(532, 90, '连续谱', { size: 9.5, tone: 'cyan' }),
      ...[
        { e: 204, o: 192 },
        { e: 172, o: 156 },
        { e: 132, o: 112 }
      ].flatMap((p) => [...LEVEL(396, 516, p.e, '', { tone: 'mint' }), ...LEVEL(396, 516, p.o, '', { tone: 'violet' })]),
      T(392, 226, '偶态在下，奇态在上', { size: 10, tone: 'muted' }),
      T(392, 242, '高能并入连续谱', { size: 10, tone: 'faint' }),
      T(320, 262, '两阱连通：分裂与阱内间距同量级', { size: 10.5, tone: 'muted', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '4.3/0-0',
      '对称势：偶、奇两支本征态',
      '势满足 $V(-x)=V(x)$，哈密顿量与宇称对易，本征态可选为偶态 $\\psi(-x)=\\psi(x)$ 或奇态 $\\psi(-x)=-\\psi(x)$。',
      [
        T(320, 24, '势对称 ⇒ 本征态可按宇称分类', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 278, 202, '偶态：镜像不变', { tone: 'mint' }),
        L(171, 72, 171, 204, { tone: 'dim', dash: true }),
        CURVE(
          (x) => Math.exp(-(((x - 68) / 32) ** 2)) + Math.exp(-(((x - 170) / 32) ** 2)),
          { x: 52, y: 80, w: 238, h: 32 },
          [0, 238],
          [-1, 1],
          { tone: 'mint', weight: 2 }
        ),
        CURVE(V_LOW, { x: 52, y: 120, w: 238, h: 80 }, [-1.5, 1.5], [0, 0.9], { tone: 'amber', weight: 2 }),
        T(56, 122, 'V(x)', { size: 9.5, tone: 'amber' }),
        T(171, 230, '镜像不变：ψ(−x) = ψ(x)', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        ...PANEL(328, 44, 278, 202, '奇态：镜像反号', { tone: 'violet' }),
        L(465, 72, 465, 204, { tone: 'dim', dash: true }),
        CURVE(
          (x) => Math.exp(-(((x - 68) / 32) ** 2)) - Math.exp(-(((x - 170) / 32) ** 2)),
          { x: 346, y: 80, w: 238, h: 32 },
          [0, 238],
          [-1, 1],
          { tone: 'violet', weight: 2 }
        ),
        DOT(465, 96, { r: 3, tone: 'violet' }),
        T(471, 90, '节点', { size: 9.5, tone: 'violet' }),
        CURVE(V_LOW, { x: 346, y: 120, w: 238, h: 80 }, [-1.5, 1.5], [0, 0.9], { tone: 'amber', weight: 2 }),
        T(465, 230, '镜像反号：ψ(−x) = −ψ(x)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 266, '宇称是守恒量子数，不是数学标签', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.3/0-1',
      '偶态无节点，奇态多一个节点',
      '偶态在两阱中同相，中间没有节点；奇态反相，中间必有一个节点。节点多一个，曲率更大，因此奇态能量略高。',
      [
        T(320, 24, '多一个节点 ⇒ 曲率更大 ⇒ 能量更高', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 278, 132, '偶：零节点', { tone: 'mint' }),
        L(50, 146, 296, 146, { tone: 'dim' }),
        CURVE(
          (x) => Math.exp(-(((x - 60) / 32) ** 2)) + Math.exp(-(((x - 186) / 32) ** 2)),
          { x: 50, y: 92, w: 246, h: 48 },
          [0, 246],
          [0, 1.05],
          { tone: 'mint', weight: 2 }
        ),
        T(172, 160, '两阱同相', { size: 10, tone: 'mint', anchor: 'middle' }),
        ...PANEL(328, 44, 278, 132, '奇：一个节点', { tone: 'violet' }),
        L(344, 146, 590, 146, { tone: 'dim' }),
        CURVE(
          (x) => Math.exp(-(((x - 60) / 32) ** 2)) - Math.exp(-(((x - 186) / 32) ** 2)),
          { x: 344, y: 92, w: 246, h: 48 },
          [0, 246],
          [-1, 1],
          { tone: 'violet', weight: 2 }
        ),
        DOT(467, 116, { r: 3, tone: 'violet' }),
        T(467, 84, '一个节点', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(467, 160, '两阱反相', { size: 10, tone: 'violet', anchor: 'middle' }),
        ...LEVEL(150, 430, 208, 'E_e', { tone: 'mint' }),
        ...LEVEL(150, 430, 190, 'E_o', { tone: 'violet' }),
        A(500, 208, 500, 190, { tone: 'amber' }),
        T(508, 202, 'ΔE > 0', { size: 10, tone: 'amber' }),
        T(320, 244, '节点数只差一个，能量差为正', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '低垒时这个差值很大', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '4.3/0-2',
      '偶奇相加得局域波包',
      '把偶态与奇态线性组合，就得到局域在左阱或右阱的波包：相加偏左，相减偏右；与能级图像是同一组本征态的两种读法。',
      [
        T(320, 24, '偶奇相加 → 局域在左；相减 → 局域在右', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE(
          (x) => Math.exp(-(((x - 140) / 55) ** 2)) + Math.exp(-(((x - 340) / 55) ** 2)),
          { x: 80, y: 52, w: 480, h: 28 },
          [0, 480],
          [-1, 1],
          { tone: 'mint', weight: 1.8 }
        ),
        T(84, 46, '偶：同相', { size: 9.5, tone: 'mint' }),
        CURVE(
          (x) => Math.exp(-(((x - 140) / 55) ** 2)) - Math.exp(-(((x - 340) / 55) ** 2)),
          { x: 80, y: 96, w: 480, h: 28 },
          [0, 480],
          [-1, 1],
          { tone: 'violet', dash: true }
        ),
        T(84, 90, '奇：反相', { size: 9.5, tone: 'violet' }),
        A(250, 130, 190, 154, { tone: 'dim' }),
        A(390, 130, 450, 154, { tone: 'dim' }),
        R(60, 158, 250, 78, { tone: 'mint', r: 10, fill: true, opacity: 0.12 }),
        T(70, 176, '|L⟩ = (|e⟩ + |o⟩)/√2', { size: 9.5, tone: 'mint' }),
        CURVE((x) => Math.exp(-(((x - 55) / 34) ** 2)), { x: 70, y: 186, w: 230, h: 40 }, [0, 230], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        T(185, 232, '左阱', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        R(330, 158, 250, 78, { tone: 'violet', r: 10, fill: true, opacity: 0.12 }),
        T(340, 176, '|R⟩ = (|e⟩ − |o⟩)/√2', { size: 9.5, tone: 'violet' }),
        CURVE((x) => Math.exp(-(((x - 175) / 34) ** 2)), { x: 340, y: 186, w: 230, h: 40 }, [0, 230], [0, 1], {
          tone: 'violet',
          weight: 2
        }),
        T(455, 232, '右阱', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(320, 256, '线性组合：两种读法，同一组本征态', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '静态看能级，动态看定域', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.3/1-0',
      '低垒：中间区域不衰减',
      '势垒很低时波函数在中间几乎不衰减，两个阱不能再看作独立子系统；隧穿矩阵元很大，两阱已合成为一个量子系统。',
      [
        T(320, 24, '低垒：中间不衰减，两阱已连通', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(232, 78, 176, 130, { tone: 'amber', opacity: 0.08 }),
        CURVE(V_LOW, { x: 64, y: 76, w: 512, h: 134 }, [-1.5, 1.5], [0, 1.15], { tone: 'amber', weight: 2 }),
        CURVE(
          (x) => 0.62 + 0.34 * (Math.exp(-(((x - 0.85) / 0.35) ** 2)) + Math.exp(-(((x + 0.85) / 0.35) ** 2))),
          { x: 64, y: 76, w: 512, h: 134 },
          [-1.5, 1.5],
          [0, 1.15],
          { tone: 'mint', weight: 2 }
        ),
        T(70, 88, 'V(x)', { size: 9.5, tone: 'amber' }),
        T(320, 118, '垒顶仍有振幅', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 236, '隧穿矩阵元 |t| 大：分裂与间距同量级', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '两阱不能再分别命名', { size: 10, tone: 'faint', anchor: 'middle' }),
        TAG(64, 278, '波函数在垒顶并不趋零', { tone: 'mint', size: 10 })
      ]
    ),
    '1-1': fig(
      '4.3/1-1',
      '近简并微扰失效，需整体求解',
      '低垒下分裂与阱内能级间距同量级，“先简并再加微扰”的小参数前提不成立；正确做法是把整条双阱势当作整体，直接匹配边界条件。',
      [
        T(320, 24, '小参数不成立：不能先简并再微扰', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 278, 190, '微扰图像', { tone: 'muted' }),
        L(70, 150, 270, 150, { tone: 'dim', dash: true }),
        ...LEVEL(70, 160, 150, 'E₁', { tone: 'mint' }),
        ...LEVEL(190, 270, 150, 'E₂', { tone: 'violet' }),
        T(172, 118, '假设两阱简并', { size: 10, tone: 'muted', anchor: 'middle' }),
        TAG(60, 182, '前提：|t| ≪ 间距', { tone: 'danger', size: 9.5 }),
        T(172, 210, '波函数已渗入中间', { size: 10, tone: 'faint', anchor: 'middle' }),
        ...PANEL(328, 44, 278, 190, '整体求解', { tone: 'mint' }),
        ...[
          { e: 186, o: 132 },
          { e: 88, o: 64 }
        ].flatMap((p) => [...LEVEL(360, 520, p.e, '', { tone: 'mint' }), ...LEVEL(360, 520, p.o, '', { tone: 'violet' })]),
        A(530, 186, 530, 132, { tone: 'amber' }),
        T(536, 162, 'ΔE', { size: 9.5, tone: 'amber' }),
        T(340, 206, '分裂 ≈ 能级间距', { size: 10, tone: 'mint' }),
        T(340, 224, '能级重新排列', { size: 10, tone: 'muted' }),
        T(320, 256, '条件不成立时，不要先简并再微扰', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '把整条双阱势当作一个整体', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '4.3/1-2',
      '垒顶概率密度不为零',
      '低垒时概率密度在势垒顶部明显不为零，两个阱持续交换概率幅；隧穿不是“偶尔漏过”，而是持续的连通。',
      [
        T(320, 24, '隧穿不是偶尔漏过，而是持续连通', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE(V_LOW, { x: 70, y: 80, w: 500, h: 124 }, [-1.5, 1.5], [0, 1.1], { tone: 'amber', weight: 2, opacity: 0.8 }),
        CURVE(
          (x) => 0.58 + 0.3 * (Math.exp(-(((x - 0.85) / 0.35) ** 2)) + Math.exp(-(((x + 0.85) / 0.35) ** 2))),
          { x: 70, y: 80, w: 500, h: 124 },
          [-1.5, 1.5],
          [0, 1.1],
          { tone: 'mint', weight: 2 }
        ),
        A(250, 92, 390, 92, { tone: 'mint' }),
        A(390, 102, 250, 102, { tone: 'cyan' }),
        T(320, 118, '垒顶不为零，双向连通', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(240, 157, 400, 157, { tone: 'amber', dash: true }),
        T(404, 161, 'V_b', { size: 9.5, tone: 'amber' }),
        T(320, 236, '两个阱持续交换概率幅', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '隧穿强度随垒高、垒宽变化', { size: 10, tone: 'faint', anchor: 'middle' }),
        TAG(70, 278, '垒越低，连通越强', { tone: 'mint', size: 10 })
      ]
    ),
    '2-0': fig(
      '4.3/2-0',
      '束缚谱：无穷远衰减挑出离散 k',
      '束缚态要求 $\\psi\\to0$（$x\\to\\pm\\infty$），这个边界条件只允许一组离散的 k，因而只允许一组离散的能量。',
      [
        T(320, 24, 'ψ 在两端趋于零 ⇒ 只允许离散 k', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(120, 104, 120, 206, { tone: 'amber', weight: 2 }),
        L(120, 206, 360, 206, { tone: 'amber', weight: 2 }),
        L(360, 104, 360, 206, { tone: 'amber', weight: 2 }),
        [196, 171, 146].flatMap((y) => LEVEL(128, 320, y, '', { tone: 'mint' })),
        T(240, 122, 'ψ(±∞) → 0', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(240, 230, '离散的 E', { size: 10, tone: 'muted', anchor: 'middle' }),
        L(400, 176, 580, 176, { tone: 'dim' }),
        A(572, 176, 592, 176, { tone: 'dim' }),
        T(598, 180, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        DOT(424, 176, { r: 3.5, tone: 'mint' }),
        DOT(468, 176, { r: 3.5, tone: 'mint' }),
        DOT(512, 176, { r: 3.5, tone: 'mint' }),
        DOT(556, 176, { r: 3.5, tone: 'mint' }),
        T(424, 196, 'k₁', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(468, 196, 'k₂', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(512, 196, 'k₃', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(556, 196, 'k₄', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 120, '允许的 k 是离散点', { size: 10, tone: 'mint' }),
        T(400, 142, '间隔 π/L', { size: 10, tone: 'amber' }),
        T(320, 254, '无穷远衰减条件挑选 k，也挑选能量', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '束缚谱因此是分立的', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.3/2-1',
      '垒消失：两阱合成宽 2L 的单阱',
      '势垒高度趋于零时，两个阱合并为一个宽度约 $2L$ 的单阱，能级变为 $n^2\\pi^2\\hbar^2/(2m(2L)^2)$，间距减小、能级变密。',
      [
        T(320, 24, '垒消失：两阱合成宽 2L 的单阱', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 120, 60, 206, { tone: 'amber', weight: 2 }),
        L(60, 206, 148, 206, { tone: 'amber', weight: 2 }),
        L(148, 206, 148, 158, { tone: 'amber', weight: 2 }),
        L(148, 158, 168, 158, { tone: 'amber', weight: 2 }),
        L(168, 158, 168, 206, { tone: 'amber', weight: 2 }),
        L(168, 206, 250, 206, { tone: 'amber', weight: 2 }),
        L(250, 206, 250, 120, { tone: 'amber', weight: 2 }),
        [196, 188, 172, 162].flatMap((y) => LEVEL(68, 242, y, '', { tone: 'mint' })),
        T(150, 230, '双阱：成对', { size: 10, tone: 'muted', anchor: 'middle' }),
        A(262, 166, 336, 166, { tone: 'amber' }),
        T(298, 154, '垒 → 0', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        L(354, 120, 354, 206, { tone: 'violet', weight: 2 }),
        L(354, 206, 592, 206, { tone: 'violet', weight: 2 }),
        L(592, 206, 592, 120, { tone: 'violet', weight: 2 }),
        [198, 192, 180, 164].flatMap((y) => LEVEL(362, 584, y, '', { tone: 'violet' })),
        T(473, 230, '单阱：变密', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(320, 252, '阱宽从 L 变成 2L', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '间距缩小四倍，偶奇成对消失', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '4.3/2-2',
      '边界一改，离散谱挤成连续谱',
      '若一侧势垒完全消失或阱宽趋于无穷，边界条件从“两端衰减”变成“一端入射、一端出射”，束缚态问题过渡为散射态问题。',
      [
        T(320, 24, '边界条件一改，离散谱挤成连续谱', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 278, 178, '束缚：两端衰减', { tone: 'mint' }),
        [196, 168, 134].flatMap((y) => LEVEL(60, 250, y, '', { tone: 'mint' })),
        T(46, 212, '离散谱', { size: 9.5, tone: 'muted' }),
        ...PANEL(328, 44, 278, 178, '散射：一端入射', { tone: 'cyan' }),
        BAND(342, 72, 250, 34, { tone: 'cyan', opacity: 0.18 }),
        T(467, 92, '连续带', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 9), { x: 346, y: 116, w: 242, h: 36 }, [0, 242], [-1, 1], { tone: 'mint', steps: 140 }),
        A(342, 178, 382, 178, { tone: 'mint' }),
        T(362, 168, '入射', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        A(528, 178, 568, 178, { tone: 'cyan' }),
        T(548, 168, '出射', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(340, 210, '边界条件改写了问题', { size: 9.5, tone: 'muted' }),
        A(150, 238, 470, 238, { tone: 'amber' }),
        T(320, 230, '一侧垒消失、阱宽发散', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(320, 260, '离散能级挤成连续谱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '束缚态问题过渡为散射态问题', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '4.3/0-0-f',
      '宇称本征值：+1 与 −1',
      '$V(-x)=V(x)\\Rightarrow[H,P]=0$，$P^2=1$ 只允许本征值 $\\pm1$：偶态取 $+1$，奇态取 $-1$。',
      [
        T(320, 24, '势对称 ⇒ 宇称是守恒量子数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(56, 48, 152, 26, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(132, 65, 'V(−x) = V(x)', { size: 11, tone: 'mint', anchor: 'middle' }),
        BAND(240, 48, 132, 26, { tone: 'amber', opacity: 0.24, r: 5 }),
        T(306, 65, '[H, P] = 0', { size: 11, tone: 'amber', anchor: 'middle' }),
        BAND(404, 48, 176, 26, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(492, 65, 'P ψ = ±ψ', { size: 11, tone: 'violet', anchor: 'middle' }),
        L(320, 94, 320, 240, { tone: 'dim', dash: true }),
        CURVE(
          (x) => Math.exp(-(((x - 140) / 60) ** 2)) + Math.exp(-(((x - 280) / 60) ** 2)),
          { x: 110, y: 100, w: 420, h: 56 },
          [0, 420],
          [0, 1.05],
          { tone: 'mint', weight: 2 }
        ),
        T(84, 118, '偶', { size: 9.5, tone: 'mint' }),
        T(540, 126, '镜像不变', { size: 9.5, tone: 'mint', anchor: 'end' }),
        CURVE(
          (x) => Math.exp(-(((x - 140) / 60) ** 2)) - Math.exp(-(((x - 280) / 60) ** 2)),
          { x: 110, y: 180, w: 420, h: 52 },
          [0, 420],
          [-1, 1],
          { tone: 'violet', weight: 2 }
        ),
        DOT(320, 206, { r: 3, tone: 'violet' }),
        T(84, 198, '奇', { size: 9.5, tone: 'violet' }),
        T(540, 238, '镜像反号', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(320, 258, '本征值 +1 与 −1 同时出现', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '势不对称时宇称不再是好量子数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.3/0-1-f',
      '奇态为什么略高：节点与曲率',
      '偶态无节点，奇态多一个节点；节点越多曲率越大，动能项越大，所以 $E_o>E_e$，差值 $\\Delta E\\ge0$。',
      [
        T(320, 24, '节点数决定能量高低', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE(
          (x) => Math.exp(-(((x - 55) / 34) ** 2)) + Math.exp(-(((x - 145) / 34) ** 2)),
          { x: 60, y: 52, w: 200, h: 30 },
          [0, 200],
          [0, 1.05],
          { tone: 'mint', weight: 2 }
        ),
        CURVE(
          (x) => Math.exp(-(((x - 55) / 34) ** 2)) - Math.exp(-(((x - 145) / 34) ** 2)),
          { x: 60, y: 96, w: 200, h: 30 },
          [0, 200],
          [-1, 1],
          { tone: 'violet', weight: 2 }
        ),
        DOT(160, 111, { r: 3, tone: 'violet' }),
        T(60, 48, '零节点', { size: 9.5, tone: 'mint' }),
        T(60, 92, '一个节点', { size: 9.5, tone: 'violet' }),
        T(330, 78, '节点多一个', { size: 10, tone: 'muted' }),
        T(330, 102, '曲率更大', { size: 10, tone: 'muted' }),
        T(330, 126, '动能更高', { size: 10, tone: 'mint' }),
        T(330, 150, '所以 E_o > E_e', { size: 10, tone: 'violet' }),
        T(330, 178, '差值 ΔE ≥ 0', { size: 10, tone: 'amber' }),
        ...LEVEL(80, 220, 232, 'E_e', { tone: 'mint' }),
        ...LEVEL(80, 220, 188, 'E_o', { tone: 'violet' }),
        A(280, 232, 280, 188, { tone: 'amber' }),
        T(288, 212, 'ΔE > 0', { size: 10, tone: 'amber' }),
        T(320, 262, '节点数只差一个，符号确定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '低垒时 ΔE 与能级间距相当', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.3/1-0-f',
      '精确本征值：平均值加减平方和',
      '$E_\\pm=\\frac{E_1+E_2}{2}\\pm\\sqrt{\\left(\\frac{E_1-E_2}{2}\\right)^2+|t|^2}$：均值决定中心，失谐与耦合共同决定劈裂。',
      [
        T(320, 24, '两支能级：平均、失谐、耦合', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(64, 66, 'E± =', { size: 11, tone: 'text' }),
        BAND(116, 50, 108, 24, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(170, 66, '平均能', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(238, 66, '±', { size: 12, tone: 'text', anchor: 'middle' }),
        BAND(258, 50, 170, 24, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(343, 66, '√(δ² + |t|²)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(606, 64, 'δ = (E₁−E₂)/2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...AXIS({ x: 80, y: 96, w: 340, h: 126 }, { xLabel: 'δ', yLabel: 'E' }),
        CURVE((d) => d, { x: 80, y: 96, w: 340, h: 126 }, [-1.2, 1.2], [-1.4, 1.4], { tone: 'faint', dash: true }),
        CURVE((d) => -d, { x: 80, y: 96, w: 340, h: 126 }, [-1.2, 1.2], [-1.4, 1.4], { tone: 'faint', dash: true }),
        CURVE((d) => Math.sqrt(d * d + 0.2), { x: 80, y: 96, w: 340, h: 126 }, [-1.2, 1.2], [-1.4, 1.4], {
          tone: 'violet',
          weight: 2
        }),
        CURVE((d) => -Math.sqrt(d * d + 0.2), { x: 80, y: 96, w: 340, h: 126 }, [-1.2, 1.2], [-1.4, 1.4], {
          tone: 'mint',
          weight: 2
        }),
        BAND(240, 138, 20, 42, { tone: 'amber', opacity: 0.18 }),
        T(266, 154, '2|t|', { size: 10, tone: 'amber' }),
        T(108, 240, '−1', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(250, 240, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(392, 240, '1', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(440, 118, 'δ = 0：间距 2|t|', { size: 10, tone: 'mint' }),
        T(440, 142, 'δ 大：趋于 E₁、E₂', { size: 10, tone: 'violet' }),
        T(440, 166, 't = 0：两支交叉', { size: 10, tone: 'muted' }),
        T(440, 190, 't > 0：交叉被避开', { size: 10, tone: 'cyan' }),
        T(320, 264, '耦合让两条能级互相排斥', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '失谐大时回到独立值', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.3/1-1-f',
      '对称双阱：分裂恰好是 2|t|',
      '$E_1=E_2=E_0\\Rightarrow E_\\pm=E_0\\pm|t|$：两态各移 $|t|$，间距为 $2|t|$；耦合越强，分裂越大。',
      [
        T(320, 24, '对称双阱：分裂等于耦合的两倍', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...LEVEL(90, 290, 110, 'E+', { tone: 'violet' }),
        L(90, 170, 290, 170, { tone: 'dim', dash: true }),
        T(82, 166, 'E₀', { size: 10, tone: 'dim', anchor: 'end' }),
        ...LEVEL(90, 290, 236, 'E−', { tone: 'mint' }),
        L(72, 110, 72, 236, { tone: 'amber' }),
        T(64, 176, '2|t|', { size: 10, tone: 'amber', anchor: 'end' }),
        A(330, 170, 330, 110, { tone: 'violet' }),
        T(338, 136, '+|t|', { size: 9.5, tone: 'violet' }),
        A(330, 170, 330, 236, { tone: 'mint' }),
        T(338, 208, '−|t|', { size: 9.5, tone: 'mint' }),
        ...AXIS({ x: 410, y: 96, w: 170, h: 126 }, { xLabel: '|t|', yLabel: 'ΔE' }),
        CURVE((t) => 2 * t, { x: 410, y: 96, w: 170, h: 126 }, [0, 1], [0, 2], { tone: 'cyan', weight: 2 }),
        T(424, 232, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(580, 232, '1', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(470, 126, '斜率 2', { size: 10, tone: 'cyan' }),
        T(320, 260, '分裂只由耦合大小决定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '低垒时 2|t| 与间距同量级', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.3/2-0-f',
      '合并后的能级：n² 乘常数',
      '$E_n=\\frac{n^2\\pi^2\\hbar^2}{2m(2L)^2}$，$n=1,2,3,\\dots$：能量按 $n^2$ 增长，阱宽从 $L$ 变成 $2L$ 使整体除以 4。',
      [
        T(320, 24, '宽阱能级：按 n² 增长', { size: 12.5, tone: 'text', anchor: 'middle' }),
        [1, 2, 3, 4].flatMap((n) => LEVEL(84, 258, 240 - ((n * n) / 16) * 170, 'n = ' + n, { tone: 'mint' })),
        L(84, 244, 84, 58, { tone: 'dim', dash: true }),
        T(76, 60, 'E', { size: 10, tone: 'dim', anchor: 'end' }),
        T(340, 62, 'E_n = n² × 常数', { size: 10.5, tone: 'mint' }),
        T(340, 86, '常数 = π²ħ²/2m(2L)²', { size: 10, tone: 'cyan' }),
        T(340, 112, '间距 ∝ (2n + 1)', { size: 10, tone: 'violet' }),
        T(340, 136, 'n 越大，能级越稀', { size: 10, tone: 'muted' }),
        T(340, 172, '2L 代替 L', { size: 10, tone: 'amber' }),
        T(340, 194, '整体除以 4，能级变密', { size: 10, tone: 'amber' }),
        T(320, 264, 'n = 1, 2, 3 …，从 1 开始', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '阱越宽，能级越密', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '4.3/2-1-f',
      '边界条件给 k 打卡：kL = nπ',
      '$kL=n\\pi$ 等价于 $\\psi(\\pm L)=0$：只有让两端成为节点的 k 才被允许，因此 k 与 E 都取离散值。',
      [
        T(320, 24, '边界条件给 k 打卡：kL = nπ', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(64, 60, 64, 204, { tone: 'dim', dash: true }),
        L(296, 60, 296, 204, { tone: 'dim', dash: true }),
        T(64, 54, 'n = 1', { size: 9.5, tone: 'mint' }),
        T(64, 102, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(64, 150, 'n = 3', { size: 9.5, tone: 'violet' }),
        CURVE((x) => Math.sin((Math.PI * (x + 1)) / 2), { x: 64, y: 66, w: 232, h: 28 }, [-1, 1], [-1, 1], {
          tone: 'mint',
          weight: 2
        }),
        CURVE((x) => Math.sin(Math.PI * (x + 1)), { x: 64, y: 114, w: 232, h: 28 }, [-1, 1], [-1, 1], {
          tone: 'cyan',
          weight: 2
        }),
        CURVE((x) => Math.sin((3 * Math.PI * (x + 1)) / 2), { x: 64, y: 162, w: 232, h: 28 }, [-1, 1], [-1, 1], {
          tone: 'violet',
          weight: 2
        }),
        T(64, 208, 'ψ(±L) = 0', { size: 10, tone: 'mint' }),
        L(340, 176, 580, 176, { tone: 'dim' }),
        A(572, 176, 592, 176, { tone: 'dim' }),
        T(598, 180, 'k', { size: 9.5, tone: 'dim', anchor: 'end' }),
        DOT(360, 176, { r: 3.5, tone: 'mint' }),
        DOT(400, 176, { r: 3.5, tone: 'mint' }),
        DOT(440, 176, { r: 3.5, tone: 'mint' }),
        DOT(480, 176, { r: 3.5, tone: 'mint' }),
        DOT(520, 176, { r: 3.5, tone: 'mint' }),
        T(360, 196, 'π/L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(440, 196, '3π/L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(520, 196, '5π/L', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(340, 100, '允许的 k 等间隔', { size: 10, tone: 'mint' }),
        T(340, 122, '间隔 = π/L', { size: 10, tone: 'amber' }),
        T(340, 144, 'L 越大，间隔越小', { size: 10, tone: 'muted' }),
        T(320, 240, 'ψ(±L) = 0 只允许 kL = nπ', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, 'n = 0 对应 ψ ≡ 0，被排除', { size: 10, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '分立谱来自边界条件', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
