import { fig, T, R, BAND, L, A, C, DOT, E, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '6.5/overview',
    '微悬臂：把力变成频移',
    '微悬臂是 $\\omega_0=\\sqrt{k/m}$ 的机械振子；热噪声与零点涨落限制位移分辨，力梯度把频移变成原子级图像。',
    [
      T(320, 24, '微悬臂：把力变成频移', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(30, 42, 196, 184, '悬臂 + 光学杠杆', { tone: 'mint' }),
      R(32, 122, 14, 50, { tone: 'dim', fill: true, opacity: 0.2 }),
      L(44, 134, 190, 134, { tone: 'mint', weight: 2.6 }),
      L(190, 134, 196, 158, { tone: 'violet', weight: 1.6 }),
      L(196, 158, 184, 158, { tone: 'violet', weight: 1.6 }),
      L(184, 158, 190, 134, { tone: 'violet', weight: 1.6 }),
      L(44, 170, 214, 170, { tone: 'dim' }),
      ...[60, 88, 116, 144, 172, 200].flatMap((x) => C(x, 178, 6, { tone: 'faint' })),
      A(60, 74, 184, 130, { tone: 'amber', weight: 1.2 }),
      A(192, 132, 206, 84, { tone: 'amber', weight: 1.2 }),
      R(198, 66, 24, 18, { tone: 'violet', fill: true, opacity: 0.2, r: 3 }),
      T(146, 60, '探测器', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(46, 192, '弯曲几 nm', { size: 9.5, tone: 'muted' }),
      T(46, 210, '光斑走几十 μm', { size: 9.5, tone: 'amber' }),
      ...PANEL(238, 42, 168, 184, '两种涨落', { tone: 'cyan' }),
      T(250, 82, '热噪声', { size: 9.5, tone: 'cyan' }),
      L(250, 98, 398, 98, { tone: 'cyan', weight: 2.4 }),
      T(250, 116, '零点涨落', { size: 9.5, tone: 'violet' }),
      L(250, 132, 300, 132, { tone: 'violet', weight: 2.4 }),
      T(250, 158, '温度↓ ⇒ 热噪声↓', { size: 9.5, tone: 'muted' }),
      T(250, 178, '到零点就停住', { size: 9.5, tone: 'violet' }),
      T(250, 200, '量子极限不可绕', { size: 9.5, tone: 'faint' }),
      ...PANEL(424, 42, 186, 184, '力梯度 → 频移', { tone: 'amber' }),
      L(438, 180, 596, 180, { tone: 'dim' }),
      L(438, 180, 438, 88, { tone: 'dim' }),
      CURVE((x) => Math.exp(-(((x - 0.55) / 0.09) ** 2)), { x: 438, y: 88, w: 158, h: 92 }, [0, 1], [0, 1.05], {
        tone: 'mint',
        weight: 1.8
      }),
      CURVE((x) => 0.8 * Math.exp(-(((x - 0.4) / 0.09) ** 2)), { x: 438, y: 88, w: 158, h: 92 }, [0, 1], [0, 1.05], {
        tone: 'amber',
        dash: true
      }),
      A(524, 100, 504, 100, { tone: 'amber', weight: 1.2 }),
      T(530, 96, 'Δω', { size: 9.5, tone: 'amber' }),
      T(438, 198, '峰左移：吸引力', { size: 9.5, tone: 'muted' }),
      T(438, 216, '频移 ∝ 力梯度', { size: 9.5, tone: 'amber' }),
      T(320, 248, '微悬臂：把力翻译成频率', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 268, '原子级相互作用变成可读的频移', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '6.5/0-0',
      '微米梁与纳米针尖',
      '几百微米长、几微米厚的梁末端带一个纳米级针尖；针尖受力使梁弯曲，等效弹簧常数 $k$ 约 $0.1$–$10\\,\\mathrm{N/m}$。',
      [
        T(320, 24, '微米梁与纳米针尖', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(60, 70, '微米梁 + 纳米针尖', { size: 10, tone: 'mint' }),
        T(60, 92, '等效弹簧 k ≈ 0.1–10 N/m', { size: 9.5, tone: 'muted' }),
        R(44, 120, 18, 54, { tone: 'dim', fill: true, opacity: 0.18 }),
        L(60, 132, 420, 132, { tone: 'mint', weight: 2.8 }),
        L(420, 132, 428, 160, { tone: 'violet', weight: 1.6 }),
        L(428, 160, 412, 160, { tone: 'violet', weight: 1.6 }),
        L(412, 160, 420, 132, { tone: 'violet', weight: 1.6 }),
        L(60, 200, 580, 200, { tone: 'dim' }),
        ...[80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560].flatMap((x) =>
          C(x, 208, 7, { tone: 'faint' })
        ),
        C(420, 200, 7, { tone: 'amber', fill: true, opacity: 0.5 }),
        A(420, 166, 420, 190, { tone: 'amber', weight: 1.4 }),
        T(430, 180, 'F', { size: 9.5, tone: 'amber' }),
        T(60, 236, '针尖受力 ⇒ 梁弯曲', { size: 10, tone: 'muted' }),
        T(60, 258, '弯曲量被放大成光斑位移', { size: 10, tone: 'faint' })
      ]
    ),
    '0-1': fig(
      '6.5/0-1',
      '悬臂就是一个谐振子',
      '平衡位置附近振动为谐振子，$\\omega_0=\\sqrt{k/m}$；质量只有皮克到纳克，共振频率因此在几十千赫到几兆赫。',
      [
        T(320, 24, '悬臂就是一个谐振子', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 78, y: 78, w: 296, h: 132 }, { xLabel: 'x', yLabel: 'E' }),
        CURVE((x) => x * x, { x: 78, y: 78, w: 296, h: 132 }, [-3, 3], [0, 9], { tone: 'mint', weight: 2 }),
        ...[1, 3, 5, 7].flatMap((e) => LEVEL(130, 300, 210 - (e / 9) * 132, '', { tone: 'cyan' })),
        T(308, 196, 'n = 0', { size: 9.5, tone: 'cyan' }),
        T(308, 167, 'n = 1', { size: 9.5, tone: 'cyan' }),
        T(308, 138, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(308, 108, 'n = 3', { size: 9.5, tone: 'cyan' }),
        T(78, 226, '−3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(226, 226, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(374, 226, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 205, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 141, '5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(70, 84, '9', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(392, 88, 'V(x) = ½kx²', { size: 11.5, tone: 'mint' }),
        T(392, 112, 'ω₀ = √(k/m)', { size: 11, tone: 'cyan' }),
        T(392, 138, '能级等间距 ħω₀', { size: 9.5, tone: 'muted' }),
        T(392, 158, 'n = 0 也有零点能', { size: 9.5, tone: 'violet' }),
        T(392, 180, 'm 小 ⇒ ω₀ 高', { size: 9.5, tone: 'faint' }),
        T(392, 202, 'k 大 ⇒ ω₀ 高', { size: 9.5, tone: 'faint' }),
        T(320, 252, '微悬臂就是一个被量子化的弹簧', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '质量越小，零点能越显眼', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '6.5/0-2',
      '量子化：每级再抬 ½ħω₀',
      '$E_n=\\hbar\\omega_0(n+1/2)$：能级等间距，但基态并不落在阱底，而是高出 $\\hbar\\omega_0/2$ 的零点能。',
      [
        T(320, 24, '量子化：每级再抬 ½ħω₀', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(120, 244, 120, 66, { tone: 'dim' }),
        A(120, 78, 120, 64, { tone: 'dim' }),
        T(108, 58, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(126, 233, 312, 233, { tone: 'faint', dash: true }),
        T(318, 236, '势阱底', { size: 9, tone: 'faint' }),
        ...[215, 180, 145, 110].flatMap((y) => LEVEL(136, 300, y, '', { tone: 'cyan' })),
        T(308, 218, 'n = 0', { size: 9.5, tone: 'cyan' }),
        T(308, 183, 'n = 1', { size: 9.5, tone: 'cyan' }),
        T(308, 148, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(308, 113, 'n = 3', { size: 9.5, tone: 'cyan' }),
        A(210, 214, 210, 182, { tone: 'amber', weight: 1.3 }),
        T(218, 200, 'ħω₀', { size: 9.5, tone: 'amber' }),
        A(160, 232, 160, 217, { tone: 'violet', weight: 1.3 }),
        T(112, 226, '½ħω₀', { size: 9, tone: 'violet', anchor: 'end' }),
        T(340, 92, 'Eₙ = ħω₀(n + ½)', { size: 11.5, tone: 'cyan' }),
        T(340, 118, 'n = 0, 1, 2, …', { size: 9.5, tone: 'muted' }),
        T(340, 142, 'n = 0 仍留 ½ħω₀', { size: 9.5, tone: 'violet' }),
        T(340, 164, '零点能不可消除', { size: 9.5, tone: 'muted' }),
        T(340, 188, 'ω₀ 越高，零点能越大', { size: 9.5, tone: 'faint' }),
        T(340, 212, '这就是量子极限的来源', { size: 9.5, tone: 'faint' }),
        T(320, 252, '能级等间距，基态却不在阱底', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '零点能是位置测量的硬下限', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '6.5/1-0',
      '热噪声：位移均方根 √(kBT/k)',
      '与 $T$ 的环境热平衡给出 $\\langle x^2\\rangle=k_{\\mathrm B}T/k$；$k=1\\,\\mathrm{N/m}$、$300\\,\\mathrm K$ 时位移均方根约 $64\\,\\mathrm{pm}$。',
      [
        T(320, 24, '热噪声：位移均方根 √(kBT/k)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 88, y: 78, w: 300, h: 130 }, { xLabel: 'T / K', yLabel: 'x_rms / pm' }),
        CURVE((t) => 3.7 * Math.sqrt(t), { x: 88, y: 78, w: 300, h: 130 }, [0, 320], [0, 72], {
          tone: 'cyan',
          weight: 2,
          steps: 120
        }),
        DOT(369, 92, { r: 3, tone: 'amber' }),
        T(378, 84, '300 K', { size: 9.5, tone: 'amber' }),
        T(378, 104, '≈ 64 pm', { size: 9.5, tone: 'amber' }),
        T(88, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(182, 224, '100', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(275, 224, '200', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(369, 224, '300', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(80, 206, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(80, 152, '30', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(80, 97, '60', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(430, 92, 'k = 1 N/m', { size: 10, tone: 'mint' }),
        T(430, 116, 'x_rms = √(kBT/k)', { size: 10, tone: 'cyan' }),
        T(430, 142, '室温约几十 pm', { size: 9.5, tone: 'muted' }),
        T(430, 164, '≈ 单个原子尺度', { size: 9.5, tone: 'muted' }),
        T(430, 188, '降温或加大 k 可压小', { size: 9.5, tone: 'faint' }),
        T(430, 210, 'T = 0 才归零', { size: 9.5, tone: 'faint' }),
        T(320, 250, '热噪声随 √T 增长', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '室温下已达原子尺度', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.5/1-1',
      '零点涨落：不可消除的地板',
      '降温能把热噪声压下去，但 $x_{\\mathrm{zp}}=\\sqrt{\\hbar/2m\\omega_0}$ 与温度无关；它是海森堡关系给出的位移硬下限。',
      [
        T(320, 24, '零点涨落：不可消除的地板', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(96, 222, 600, 222, { tone: 'dim' }),
        T(96, 238, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(264, 238, '20', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(432, 238, '40', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(600, 238, '60', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(600, 206, '位移噪声 / pm', { size: 9.5, tone: 'dim', anchor: 'end' }),
        R(96, 84, 504, 16, { tone: 'cyan', fill: true, opacity: 0.3 }),
        R(96, 116, 260, 16, { tone: 'cyan', fill: true, opacity: 0.22 }),
        R(96, 148, 58, 16, { tone: 'cyan', fill: true, opacity: 0.16 }),
        L(96, 188, 102, 188, { tone: 'violet', weight: 3 }),
        T(86, 96, '300 K', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(86, 128, '77 K', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(86, 160, '4 K', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(86, 192, '零点', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(588, 96, '60 pm', { size: 9.5, tone: 'text', anchor: 'end' }),
        T(364, 128, '31 pm', { size: 9.5, tone: 'cyan' }),
        T(162, 160, '7 pm', { size: 9.5, tone: 'cyan' }),
        T(110, 192, '≈ 0.02 pm', { size: 9.5, tone: 'violet' }),
        A(150, 196, 108, 196, { tone: 'violet', weight: 1.1, dash: true }),
        T(96, 258, '热噪声 ∝ √T，降温可压', { size: 10, tone: 'muted' }),
        T(96, 276, '零点涨落与温度无关，压不掉', { size: 9.5, tone: 'faint' })
      ]
    ),
    '1-2': fig(
      '6.5/1-2',
      'Q 越高，力噪声越集中',
      '热噪声同时转化为力噪声；高品质因数把噪声挤进窄带，最小可测力 $\\delta F_{\\min}$ 因而下降，这正是真空低温 AFM 追求 $Q$ 的原因。',
      [
        T(320, 24, 'Q 越高，力噪声越集中', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 208, 380, 208, { tone: 'dim' }),
        L(80, 208, 80, 82, { tone: 'dim' }),
        CURVE((x) => 1 / (1 + ((x - 0.5) / 0.03) ** 2), { x: 80, y: 82, w: 300, h: 126 }, [0, 1], [0, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 200
        }),
        CURVE((x) => 0.6 / (1 + ((x - 0.5) / 0.11) ** 2), { x: 80, y: 82, w: 300, h: 126 }, [0, 1], [0, 1.05], {
          tone: 'faint',
          dash: true,
          steps: 200
        }),
        T(238, 96, '高 Q：窄而高', { size: 9.5, tone: 'mint' }),
        T(104, 176, '低 Q：宽而矮', { size: 9.5, tone: 'faint' }),
        T(388, 200, 'f', { size: 9.5, tone: 'dim' }),
        T(70, 86, '振幅', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(408, 88, 'δF_min ∝ 1/√(ω₀Q)', { size: 10.5, tone: 'cyan' }),
        T(408, 114, 'Q 高：噪声挤进窄带', { size: 9.5, tone: 'muted' }),
        T(408, 138, '力灵敏度随之提高', { size: 9.5, tone: 'muted' }),
        T(408, 162, '超高真空 + 低温', { size: 9.5, tone: 'faint' }),
        T(408, 186, '就是为了把 Q 拉高', { size: 9.5, tone: 'faint' }),
        T(320, 248, '噪声谱宽度由 Q 决定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '窄带换来更高的力灵敏度', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.5/2-0',
      '光学杠杆把弯曲放大',
      '激光打在悬臂末端再反射到位置敏感探测器：弯曲只有几纳米，光斑却移动几十微米，纳米位移被放大成易测的读数。',
      [
        T(320, 24, '光学杠杆把弯曲放大', { size: 12.5, tone: 'text', anchor: 'middle' }),
        R(48, 136, 16, 52, { tone: 'dim', fill: true, opacity: 0.2 }),
        L(64, 148, 306, 148, { tone: 'mint', weight: 2.6 }),
        L(306, 148, 312, 172, { tone: 'violet', weight: 1.6 }),
        L(312, 172, 300, 172, { tone: 'violet', weight: 1.6 }),
        L(300, 172, 306, 148, { tone: 'violet', weight: 1.6 }),
        L(64, 188, 420, 188, { tone: 'dim' }),
        A(72, 72, 300, 144, { tone: 'amber', weight: 1.3 }),
        A(310, 146, 556, 84, { tone: 'amber', weight: 1.3 }),
        R(548, 68, 52, 30, { tone: 'violet', fill: true, opacity: 0.18, r: 4 }),
        DOT(574, 84, { r: 3.5, tone: 'amber' }),
        T(574, 60, '位置探测器', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(72, 58, '激光', { size: 9.5, tone: 'amber' }),
        T(410, 66, '反射光被偏转', { size: 9.5, tone: 'amber' }),
        T(64, 214, '弯曲 1 nm ⇒ 光斑移动几十 μm', { size: 10, tone: 'muted' }),
        T(64, 236, '光学杠杆：纳米弯成微米读数', { size: 10, tone: 'faint' }),
        T(320, 264, '针尖—样品距离变化被放大成光斑位移', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.5/2-1',
      '恒力或恒振幅，逐行记录形貌',
      '扫描时反馈回路调节 z 保持恒力（接触模式）或恒振幅（轻敲模式），记录下来的 z 曲线就是表面形貌。',
      [
        T(320, 24, '恒力或恒振幅，逐行记录形貌', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(30, 42, 380, 180, '逐行扫描', { tone: 'cyan' }),
        A(70, 76, 380, 76, { tone: 'amber', weight: 1.3 }),
        T(225, 66, '扫描方向', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        L(196, 96, 204, 122, { tone: 'violet', weight: 1.6 }),
        L(204, 122, 188, 122, { tone: 'violet', weight: 1.6 }),
        L(188, 122, 196, 96, { tone: 'violet', weight: 1.6 }),
        L(48, 172, 392, 172, { tone: 'dim' }),
        ...[64, 104, 144, 184, 224, 264, 304, 344, 384].flatMap((x) =>
          E(x, 172, 18, 10, { tone: 'faint', fill: true, opacity: 0.25 })
        ),
        A(340, 100, 340, 146, { tone: 'cyan', weight: 1.2, dash: true }),
        T(348, 118, '反馈 z', { size: 9.5, tone: 'cyan' }),
        T(48, 200, '恒力或恒振幅模式', { size: 9.5, tone: 'muted' }),
        T(48, 216, '记录 z 就得到形貌', { size: 9.5, tone: 'muted' }),
        ...PANEL(426, 42, 186, 180, '高度曲线', { tone: 'mint' }),
        L(440, 196, 596, 196, { tone: 'dim' }),
        L(440, 196, 440, 70, { tone: 'dim' }),
        CURVE(
          (x) =>
            0.2 +
            0.55 * Math.exp(-(((x - 0.2) / 0.09) ** 2)) +
            0.42 * Math.exp(-(((x - 0.5) / 0.09) ** 2)) +
            0.6 * Math.exp(-(((x - 0.8) / 0.09) ** 2)),
          { x: 440, y: 70, w: 156, h: 126 },
          [0, 1],
          [0, 1],
          { tone: 'mint', weight: 1.8, steps: 160 }
        ),
        T(440, 212, 'x', { size: 9.5, tone: 'dim' }),
        T(430, 76, 'z', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(440, 234, '原子起伏 → 高度曲线', { size: 9.5, tone: 'mint' }),
        T(320, 258, '反馈把力的变化翻译成高度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '逐行拼接就是表面形貌图', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '6.5/2-2',
      '力梯度：从看形状到测身份',
      '力梯度改变有效弹簧常数，从而移动共振频率；频移与 $\\partial F/\\partial z$ 成正比，于是 AFM 能不接触样品就分辨原子种类。',
      [
        T(320, 24, '力梯度：从看形状到测身份', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 78, w: 280, h: 130 }, { xLabel: 'z', yLabel: 'F' }),
        L(70, 182, 350, 182, { tone: 'faint', dash: true }),
        CURVE((x) => 0.95 * Math.exp(-x / 0.16) - 0.12, { x: 70, y: 78, w: 280, h: 130 }, [0, 1], [-0.25, 1], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        L(126, 166, 200, 189, { tone: 'amber', weight: 1.5, dash: true }),
        DOT(163, 182, { r: 3, tone: 'amber' }),
        T(200, 158, '切线斜率 = ∂F/∂z', { size: 9.5, tone: 'amber' }),
        T(70, 226, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(210, 226, '0.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 226, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(62, 206, '−0.25', { size: 9, tone: 'muted', anchor: 'end' }),
        T(62, 130, '0.5', { size: 9, tone: 'muted', anchor: 'end' }),
        T(372, 86, '同一高度，力可不同', { size: 9.5, tone: 'muted' }),
        T(372, 110, '差别藏在斜率里', { size: 9.5, tone: 'mint' }),
        T(372, 136, '斜率 ⇒ 频移 Δω', { size: 9.5, tone: 'amber' }),
        T(372, 160, '不同元素斜率不同', { size: 9.5, tone: 'cyan' }),
        T(372, 184, '于是能分辨化学成分', { size: 9.5, tone: 'violet' }),
        T(320, 250, 'AFM 读的是力随距离的变化率', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '微分让微弱的原子级作用变得可测', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '6.5/0-0-f',
      'V = ½kx²：曲率定 ω₀',
      '$E_n=\\hbar\\omega_0(n+1/2)$，$\\omega_0=\\sqrt{k/m}$：$k$ 是阱的曲率，$m$ 是惯性，两者一起定出等间距的能级阶梯。',
      [
        T(320, 24, 'V = ½kx² ⇒ ω₀ = √(k/m)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 50, 104, 26, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(92, 67, '½kx²', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(156, 67, '⇒', { size: 12, tone: 'text' }),
        BAND(174, 50, 124, 26, { tone: 'cyan', opacity: 0.24, r: 5 }),
        T(236, 67, 'ω₀ = √(k/m)', { size: 11, tone: 'cyan', anchor: 'middle' }),
        T(312, 67, '⇒', { size: 12, tone: 'text' }),
        BAND(330, 50, 148, 26, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(404, 67, 'Eₙ = ħω₀(n+½)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(488, 67, 'n = 0,1,2,…', { size: 9.5, tone: 'muted' }),
        ...AXIS({ x: 60, y: 92, w: 250, h: 120 }, { xLabel: 'x', yLabel: 'E' }),
        CURVE((x) => x * x, { x: 60, y: 92, w: 250, h: 120 }, [-3, 3], [0, 9], { tone: 'mint', weight: 2 }),
        ...[1, 3, 5, 7].flatMap((e) => LEVEL(112, 262, 212 - (e / 9) * 120, '', { tone: 'cyan' })),
        T(270, 201, 'n = 0', { size: 9.5, tone: 'cyan' }),
        T(270, 174, 'n = 1', { size: 9.5, tone: 'cyan' }),
        T(270, 147, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(270, 120, 'n = 3', { size: 9.5, tone: 'cyan' }),
        T(330, 100, '½kx²：抛物阱，曲率定硬度', { size: 9.5, tone: 'mint' }),
        T(330, 124, 'k 越大 ⇒ ω₀ 越高', { size: 9.5, tone: 'cyan' }),
        T(330, 148, 'm 越小 ⇒ ω₀ 越高', { size: 9.5, tone: 'cyan' }),
        T(330, 172, 'n 从 0 起，间隔恒为 ħω₀', { size: 9.5, tone: 'violet' }),
        T(330, 196, 'n → ∞ 无上界（无限深阱）', { size: 9.5, tone: 'muted' }),
        T(330, 220, 'k → 0：能级挤成连续谱', { size: 9.5, tone: 'faint' }),
        T(320, 248, 'k 定曲率，m 定惯性，合起来定 ω₀', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '量子化后每级再抬 ½ħω₀', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '6.5/0-1-f',
      'm 与 ω₀ 的典型量级',
      '$m\\sim10^{-13}\\,\\mathrm{kg}$，$\\omega_0/2\\pi\\sim10^{5}$–$10^{6}\\,\\mathrm{Hz}$：质量固定时，频率只能靠 $k$ 调，周期落在 $1$–$10\\,\\mu\\mathrm s$。',
      [
        T(320, 24, 'm 与 ω₀ 的典型量级', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(56, 44, 204, 28, { tone: 'mint', opacity: 0.2, r: 5 }),
        T(158, 63, 'm ~ 10⁻¹³ kg', { size: 11, tone: 'mint', anchor: 'middle' }),
        BAND(280, 44, 272, 28, { tone: 'cyan', opacity: 0.2, r: 5 }),
        T(416, 63, 'ω₀/2π ~ 10⁵–10⁶ Hz', { size: 11, tone: 'cyan', anchor: 'middle' }),
        L(70, 140, 580, 140, { tone: 'dim' }),
        L(70, 140, 70, 146, { tone: 'dim' }),
        L(240, 140, 240, 146, { tone: 'dim' }),
        L(410, 140, 410, 146, { tone: 'dim' }),
        L(580, 140, 580, 146, { tone: 'dim' }),
        BAND(240, 112, 170, 46, { tone: 'amber', opacity: 0.14, r: 4 }),
        T(325, 104, 'AFM 悬臂', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(70, 162, '10⁴', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(240, 162, '10⁵', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(410, 162, '10⁶', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(580, 162, '10⁷ Hz', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 196, 'k 与 m 一起决定 ω₀', { size: 9.5, tone: 'mint' }),
        T(70, 218, '高频 ⇒ 测量带宽大，扫描快', { size: 9.5, tone: 'muted' }),
        T(70, 240, '周期 T = 2π/ω₀ ≈ 1–10 μs', { size: 9.5, tone: 'cyan' }),
        T(70, 262, '质量固定，频率只能靠 k 调', { size: 9.5, tone: 'faint' })
      ]
    ),
    '1-0': fig(
      '6.5/1-0-f',
      '热项与量子项：谁会先归零',
      '$\\langle x^2\\rangle=k_{\\mathrm B}T/k$ 随温度下降而缩小；$x_{\\mathrm{zp}}=\\sqrt{\\hbar/2m\\omega_0}$ 与 $T$ 无关，温度归零后只剩它。',
      [
        T(320, 24, '⟨x²⟩ = kBT/k 与 x_zp = √(ħ/2mω₀)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(50, 44, 196, 28, { tone: 'cyan', opacity: 0.2, r: 5 }),
        T(148, 63, '⟨x²⟩ = kBT/k', { size: 11, tone: 'cyan', anchor: 'middle' }),
        BAND(266, 44, 220, 28, { tone: 'violet', opacity: 0.2, r: 5 }),
        T(376, 63, 'x_zp = √(ħ/2mω₀)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 88, w: 250, h: 124 }, { xLabel: 'T', yLabel: 'x_rms' }),
        CURVE((t) => 3.7 * Math.sqrt(t), { x: 60, y: 88, w: 250, h: 124 }, [0, 320], [0, 72], {
          tone: 'cyan',
          weight: 2,
          steps: 120
        }),
        L(60, 210, 306, 210, { tone: 'violet', dash: true }),
        T(314, 212, 'x_zp 地板', { size: 9, tone: 'violet' }),
        T(60, 224, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(138, 224, '100', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(216, 224, '200', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(294, 224, '300', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 212, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 150, '36', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 90, '72', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(330, 96, '第一项：热驱动，正比 T', { size: 9.5, tone: 'cyan' }),
        T(330, 120, 'T ↓ ⇒ 热噪声 ↓', { size: 9.5, tone: 'muted' }),
        T(330, 144, '第二项：与 T 无关', { size: 9.5, tone: 'violet' }),
        T(330, 168, 'x_zp ∝ 1/√(mω₀)', { size: 9.5, tone: 'violet' }),
        T(330, 192, 'T → 0：量子项留下', { size: 9.5, tone: 'cyan' }),
        T(330, 216, '量级 ≈ 10⁻¹⁴ m', { size: 9.5, tone: 'faint' }),
        T(320, 250, '热项可以压低，量子项压不掉', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '零点涨落才是最终极限', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '6.5/1-1-f',
      'δF_min：带宽开方，Q 在分母',
      '$\\delta F_{\\min}=\\sqrt{4kk_{\\mathrm B}TB/(\\omega_0Q)}$：带宽 $B$ 在根号内放大噪声，品质因数 $Q$ 在分母上压低噪声。',
      [
        T(320, 24, 'δF_min = √(4kkBTB/(ω₀Q))', { size: 12, tone: 'text', anchor: 'middle' }),
        T(44, 80, 'k：悬臂刚度', { size: 10, tone: 'mint' }),
        T(44, 104, 'B：测量带宽', { size: 10, tone: 'cyan' }),
        T(44, 128, 'Q：品质因数', { size: 10, tone: 'violet' }),
        T(44, 152, 'T：环境温度', { size: 10, tone: 'amber' }),
        T(44, 182, 'B 加倍 ⇒ 噪声 √2 倍', { size: 9.5, tone: 'cyan' }),
        T(44, 204, 'Q 增 4 倍 ⇒ 噪声减半', { size: 9.5, tone: 'violet' }),
        T(44, 226, 'T → 0 时热噪声归零', { size: 9.5, tone: 'amber' }),
        T(44, 248, '零点涨落不在这个式子里', { size: 9.5, tone: 'faint' }),
        ...AXIS({ x: 320, y: 80, w: 270, h: 126 }, { xLabel: 'Q', yLabel: 'δF_min' }),
        CURVE((q) => 1 / Math.sqrt(q), { x: 320, y: 80, w: 270, h: 126 }, [1, 16], [0, 1.05], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        T(320, 220, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(374, 220, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(464, 220, '9', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(590, 220, '16', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(312, 206, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(312, 84, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(320, 254, 'Q 越高，热噪声越集中在窄带', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '最小可测力随之下降', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '6.5/2-0-f',
      'Δω/ω₀ = −(1/2k)∂F/∂z',
      '力梯度使有效弹簧常数改变：$k_{\\mathrm{eff}}=k-\\partial F/\\partial z$，于是频移与梯度成正比，分母 $2k$ 越硬越钝。',
      [
        T(320, 24, 'Δω/ω₀ = −(1/2k)·∂F/∂z', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 96, w: 250, h: 116 }, { xLabel: '∂F/∂z', yLabel: 'Δω/ω₀' }),
        L(60, 154, 310, 154, { tone: 'faint', dash: true }),
        L(185, 96, 185, 212, { tone: 'faint', dash: true }),
        CURVE((x) => -0.9 * x, { x: 60, y: 96, w: 250, h: 116 }, [-1, 1], [-1, 1], { tone: 'violet', weight: 2 }),
        T(72, 124, 'Δω > 0', { size: 9.5, tone: 'mint' }),
        T(246, 190, 'Δω < 0', { size: 9.5, tone: 'violet' }),
        T(60, 228, '−1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(185, 228, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 228, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 212, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 154, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(52, 98, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(330, 104, '分母 2k：越硬越不敏感', { size: 9.5, tone: 'mint' }),
        T(330, 128, '软悬臂灵敏度更高', { size: 9.5, tone: 'muted' }),
        T(330, 152, '∂F/∂z 可正可负', { size: 9.5, tone: 'cyan' }),
        T(330, 176, '|Δω/ω₀| « 1，一阶微扰够用', { size: 9.5, tone: 'muted' }),
        T(330, 200, '梯度为零 ⇒ 没有频移', { size: 9.5, tone: 'faint' }),
        T(330, 224, '符号决定频移往哪边跑', { size: 9.5, tone: 'dim' }),
        T(320, 258, '频移是力梯度的线性读数', { size: 10.5, tone: 'muted', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '6.5/2-1-f',
      '力是势的斜率，频移是力的斜率',
      '$F=-\\partial U/\\partial z$ 与 $\\delta f\\sim(f_0/2k)\\,\\partial F/\\partial z$：两次求导把势的曲率变成频率读数。',
      [
        T(320, 24, 'F = −∂U/∂z，δf ≈ (f₀/2k)·∂F/∂z', { size: 12, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 96, w: 250, h: 116 }, { xLabel: 'z', yLabel: 'F' }),
        L(60, 189, 310, 189, { tone: 'faint', dash: true }),
        CURVE((x) => 0.95 * Math.exp(-x / 0.16) - 0.12, { x: 60, y: 96, w: 250, h: 116 }, [0, 1], [-0.25, 1], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        L(122, 128, 258, 190, { tone: 'amber', weight: 1.5, dash: true }),
        T(200, 118, '切线 = ∂F/∂z', { size: 9.5, tone: 'amber' }),
        T(60, 226, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(185, 226, '0.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(310, 226, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(52, 212, '−0.25', { size: 9, tone: 'muted', anchor: 'end' }),
        T(52, 134, '0.5', { size: 9, tone: 'muted', anchor: 'end' }),
        T(330, 104, 'U 的负斜率就是力', { size: 9.5, tone: 'mint' }),
        T(330, 128, 'F 的斜率给出频移', { size: 9.5, tone: 'amber' }),
        T(330, 152, '两次求导 ⇒ 二阶信息', { size: 9.5, tone: 'muted' }),
        T(330, 176, 'f₀/2k 把斜率换成 Hz', { size: 9.5, tone: 'cyan' }),
        T(330, 200, '斜率 → 0 时频移消失', { size: 9.5, tone: 'faint' }),
        T(330, 224, '弱力要靠微分才被放大', { size: 9.5, tone: 'dim' }),
        T(320, 250, '势二阶导给出可测的频率变化', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '这就是原子级化学识别的来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
