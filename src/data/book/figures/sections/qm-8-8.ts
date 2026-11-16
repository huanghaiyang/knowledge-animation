import { fig, T, BAND, L, A, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '8.8/overview',
    '克拉策势：振动与转动的一个精确模型',
    '$V(r)=D[(r_e/r)^2-2(r_e/r)]$ 在 $r_e$ 处取 $-D$，底部近似谐振子；$1/r^2$ 项与离心项合并后仍可精确求解，得到振动带与 P/R 支。',
    [
      T(320, 24, '克拉策势：振动与转动的一个精确模型', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 42, 186, 192, '① V(r)', { tone: 'mint' }),
      L(44, 150, 198, 150, { tone: 'faint', dash: true }),
      CURVE((x) => 1 / (x * x) - 2 / x, { x: 44, y: 74, w: 154, h: 118 }, [0.5, 6], [-1.2, 2.2], {
        tone: 'mint',
        weight: 2,
        steps: 140
      }),
      DOT(58, 185, { r: 4, tone: 'amber' }),
      T(66, 180, '−D', { size: 9.5, tone: 'amber' }),
      T(58, 204, 'r_e', { size: 9.5, tone: 'mint', anchor: 'middle' }),
      T(44, 88, 'r→0：+∞', { size: 9.5, tone: 'violet' }),
      T(120, 138, 'r→∞：0', { size: 9.5, tone: 'faint' }),
      T(78, 112, '单谷', { size: 9.5, tone: 'muted' }),
      ...PANEL(220, 42, 186, 192, '② 谐振子近似', { tone: 'violet' }),
      L(236, 154, 390, 154, { tone: 'faint', dash: true }),
      CURVE((x) => 1 / (x * x) - 2 / x, { x: 236, y: 74, w: 154, h: 118 }, [0.4, 3], [-1.2, 2.5], {
        tone: 'mint',
        weight: 2,
        steps: 120
      }),
      CURVE((x) => -1 + (x - 1) ** 2, { x: 236, y: 74, w: 154, h: 118 }, [0.4, 3], [-1.2, 2.5], {
        tone: 'violet',
        dash: true,
        weight: 2,
        steps: 120
      }),
      DOT(271, 185, { r: 4, tone: 'amber' }),
      T(250, 96, '抛物线', { size: 9.5, tone: 'violet' }),
      T(300, 126, '精确势', { size: 9.5, tone: 'mint' }),
      T(250, 216, '底部只要 k = 2D/r_e²', { size: 9.5, tone: 'muted' }),
      ...PANEL(412, 42, 186, 192, '③ 能级与 P/R 支', { tone: 'amber' }),
      ...([
        [190, 'v=0', 'mint'],
        [160, 'v=1', 'violet'],
        [136, 'v=2', 'amber']
      ] as const).flatMap(([y, label, tone]) => LEVEL(432, 540, y, label, { tone, size: 9.5 })),
      A(578, 186, 578, 140, { tone: 'muted', weight: 1.2 }),
      T(414, 84, '振动 + 转动', { size: 9.5, tone: 'muted' }),
      T(414, 214, 'R 支 / P 支', { size: 9.5, tone: 'amber' }),
      T(414, 232, 'ΔJ = ±1', { size: 9.5, tone: 'cyan' }),
      T(320, 254, '1/r² 项让方程仍可精确求解', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 274, '振动与转动被焊在一起', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '8.8/0-0',
      '势能：极小在 r_e，远零近陡',
      '双原子分子的势能在平衡距离 $r_e$ 处有极小，远处趋于零，近距离急剧上升；单谷形状支撑振动与转动。',
      [
        T(320, 24, '势能：极小在 r_e，远零近陡', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 80, w: 320, h: 120 }, { xLabel: 'r', yLabel: 'V', tone: 'dim' }),
        L(80, 166, 400, 166, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (x * x) - 2 / x, { x: 80, y: 80, w: 320, h: 120 }, [0.5, 7], [-1.2, 3], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        DOT(105, 194, { r: 4, tone: 'amber' }),
        T(112, 212, '−D', { size: 9.5, tone: 'amber' }),
        T(105, 232, 'r_e', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(84, 92, 'r→0：势垒', { size: 9.5, tone: 'violet' }),
        T(300, 154, 'r→∞：0⁻', { size: 9.5, tone: 'faint' }),
        T(238, 112, '吸引区', { size: 9.5, tone: 'mint' }),
        T(94, 140, '排斥区', { size: 9.5, tone: 'violet' }),
        T(420, 92, '平衡距离 r_e', { size: 9.5, tone: 'mint' }),
        T(420, 116, '此处 V = −D', { size: 9.5, tone: 'amber' }),
        T(420, 140, '近处 1/r² 排斥', { size: 9.5, tone: 'violet' }),
        T(420, 164, '远处 −2D r_e/r 吸引', { size: 9.5, tone: 'cyan' }),
        T(420, 188, '单谷，存在束缚态', { size: 9.5, tone: 'muted' }),
        T(420, 212, '转折点之间来回振动', { size: 9.5, tone: 'faint' }),
        T(320, 246, '单谷势：振动有边界，转动有离心墙', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '两端行为都由 1/r² 项控制', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.8/0-1',
      'Kratzer：一个 1/r² 项管两头',
      '$V=D[(r_e/r)^2-2(r_e/r)]$：平方项负责短程排斥，一次项负责长程吸引，两者在 $r_e$ 处相消得到 $-D$。',
      [
        T(320, 24, 'Kratzer：一个 1/r² 项管两头', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(48, 58, 'V(r) = D (r_e/r)² − 2D (r_e/r)', { size: 10.5, tone: 'text' }),
        ...AXIS({ x: 70, y: 84, w: 290, h: 116 }, { xLabel: 'r', yLabel: 'V', tone: 'dim' }),
        L(70, 167, 360, 167, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (x * x), { x: 70, y: 84, w: 290, h: 116 }, [0.5, 6], [-1.2, 3], {
          tone: 'amber',
          dash: true,
          weight: 2,
          steps: 140
        }),
        CURVE((x) => -2 / x, { x: 70, y: 84, w: 290, h: 116 }, [0.5, 6], [-1.2, 3], {
          tone: 'cyan',
          dash: true,
          weight: 2,
          steps: 140
        }),
        CURVE((x) => 1 / (x * x) - 2 / x, { x: 70, y: 84, w: 290, h: 116 }, [0.5, 6], [-1.2, 3], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        T(84, 112, '平方项：排斥', { size: 9.5, tone: 'amber' }),
        T(230, 192, '一次项：吸引', { size: 9.5, tone: 'cyan' }),
        T(250, 108, '总势：单谷', { size: 9.5, tone: 'mint' }),
        T(374, 92, '两项都随 r_e/r 变化', { size: 9.5, tone: 'muted' }),
        T(374, 116, '平方项短程、为正', { size: 9.5, tone: 'amber' }),
        T(374, 140, '一次项长程、为负', { size: 9.5, tone: 'cyan' }),
        T(374, 164, '在 r_e 处相消', { size: 9.5, tone: 'mint' }),
        T(374, 188, 'r→∞：V→0⁻', { size: 9.5, tone: 'muted' }),
        T(374, 212, 'r→0：平方项主导', { size: 9.5, tone: 'faint' }),
        T(320, 246, '两项一正一负，合成单个势阱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '形式简单，还可精确求解', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '8.8/0-2',
      '泰勒展开：二次项定频率',
      '在 $r_e$ 附近展开，一次项为零、二次项给出回复力；力常数 $k=2D/r_e^2$，频率 $\\omega=\\sqrt{k/\\mu}$。',
      [
        T(320, 24, '泰勒展开：二次项定频率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(48, 58, 'V(r_e+x) ≈ −D + (D/r_e²)x²', { size: 10.5, tone: 'mint' }),
        T(48, 78, 'k = 2D/r_e²，ω = √(k/μ)', { size: 10, tone: 'amber' }),
        ...AXIS({ x: 80, y: 100, w: 300, h: 100 }, { xLabel: 'r', yLabel: 'V', tone: 'dim' }),
        L(80, 150, 380, 150, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (x * x) - 2 / x, { x: 80, y: 100, w: 300, h: 100 }, [0.5, 2.2], [-1.2, 1.2], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => -1 + (x - 1) ** 2, { x: 80, y: 100, w: 300, h: 100 }, [0.5, 2.2], [-1.2, 1.2], {
          tone: 'violet',
          dash: true,
          weight: 2,
          steps: 120
        }),
        DOT(168, 192, { r: 4, tone: 'amber' }),
        T(178, 184, '−D', { size: 9.5, tone: 'amber' }),
        T(160, 214, 'r_e', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(120, 122, '抛物线', { size: 9.5, tone: 'violet' }),
        T(220, 132, '精确 V', { size: 9.5, tone: 'mint' }),
        T(400, 96, '只用二阶导数', { size: 9.5, tone: 'muted' }),
        T(400, 120, '力常数 k = 2D/r_e²', { size: 9.5, tone: 'amber' }),
        T(400, 144, '约化质量 μ', { size: 9.5, tone: 'cyan' }),
        T(400, 168, 'ω = √(2D/(μ r_e²))', { size: 9.5, tone: 'mint' }),
        T(400, 192, '只在阱底有效', { size: 9.5, tone: 'violet' }),
        T(400, 216, '振幅大时偏离', { size: 9.5, tone: 'faint' }),
        T(320, 246, '底部抛物线，给出简谐振动', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 'D 越大、r_e 越小，频率越高', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.8/1-0',
      '1/r² 项与离心项同阶，可合并',
      '克拉策势的 $1/r^2$ 项与离心项同阶，径向方程仍是合流超几何型；把两个系数合并，问题就与库仑问题平行。',
      [
        T(320, 24, '1/r² 项与离心项同阶，可合并', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(320, 56, '势的 1/r²：D r_e²/r²', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(320, 76, '离心 1/r²：l(l+1)ħ²/(2μr²)', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(320, 96, '同阶 → 合并成一个 1/r² 系数', { size: 10, tone: 'mint', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 112, w: 280, h: 88 }, { xLabel: 'r', yLabel: 'U', tone: 'dim' }),
        CURVE((x) => 0.6 / (x * x), { x: 70, y: 112, w: 280, h: 88 }, [0.6, 4], [0, 3], {
          tone: 'amber',
          dash: true,
          weight: 2,
          steps: 120
        }),
        CURVE((x) => 0.9 / (x * x), { x: 70, y: 112, w: 280, h: 88 }, [0.6, 4], [0, 3], {
          tone: 'violet',
          dash: true,
          weight: 2,
          steps: 120
        }),
        CURVE((x) => 1.5 / (x * x), { x: 70, y: 112, w: 280, h: 88 }, [0.6, 4], [0, 3], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        T(102, 118, '势', { size: 9.5, tone: 'amber' }),
        T(150, 146, '离心', { size: 9.5, tone: 'violet' }),
        T(210, 158, '合并', { size: 9.5, tone: 'mint' }),
        T(70, 218, '0.6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(185, 218, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 218, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(64, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(390, 92, '两项同阶，方程仍可解', { size: 9.5, tone: 'muted' }),
        T(390, 116, '合并后与库仑问题平行', { size: 9.5, tone: 'mint' }),
        T(390, 140, '势项来自分子吸引', { size: 9.5, tone: 'amber' }),
        T(390, 164, '离心项来自转动', { size: 9.5, tone: 'violet' }),
        T(390, 188, '系数变大，离心墙更高', { size: 9.5, tone: 'cyan' }),
        T(390, 212, '这是精确解的关键', { size: 9.5, tone: 'faint' }),
        T(320, 246, '两个同阶的 1/r² 项可以握手', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '方程因此保持可解形式', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.8/1-1',
      '有效角量子数 l′：把 J 并进离心项',
      '把离心项与势的 $1/r^2$ 部分合并，定义有效角量子数 $l^{\\prime}$；它只由转动量子数 $J$ 与耦合参数 $B$ 决定。',
      [
        T(320, 24, '有效角量子数 l′：把 J 并进离心项', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'l′ = −1/2 + ½√(1 + 4J(J+1) + 4B)', { size: 11, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 86, w: 300, h: 110 }, { xLabel: 'J', yLabel: 'l′', tone: 'dim' }),
        CURVE((x) => -0.5 + 0.5 * Math.sqrt(1 + 4 * x * (x + 1) + 4), { x: 80, y: 86, w: 300, h: 110 }, [0, 10], [0, 11], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => x, { x: 80, y: 86, w: 300, h: 110 }, [0, 10], [0, 11], {
          tone: 'faint',
          dash: true,
          steps: 40
        }),
        T(96, 186, 'J=0 时 l′ 不为零', { size: 9.5, tone: 'mint' }),
        T(246, 106, 'J 大时 l′≈J', { size: 9.5, tone: 'violet' }),
        L(80, 200, 80, 206, { tone: 'dim' }),
        L(230, 200, 230, 206, { tone: 'dim' }),
        L(380, 200, 380, 206, { tone: 'dim' }),
        T(80, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(230, 218, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(380, 218, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(74, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(74, 94, '10', { size: 9.5, tone: 'muted', anchor: 'end' }),
        L(74, 90, 80, 90, { tone: 'dim' }),
        T(420, 94, 'J：转动量子数', { size: 9.5, tone: 'violet' }),
        T(420, 118, 'B：振动-转动耦合', { size: 9.5, tone: 'amber' }),
        T(420, 142, 'l′ 随 J 增大', { size: 9.5, tone: 'mint' }),
        T(420, 166, '转动并入离心项', { size: 9.5, tone: 'muted' }),
        T(420, 190, 'J=0 时 l′ 仍为正', { size: 9.5, tone: 'cyan' }),
        T(420, 214, 'J 大时 l′ 接近 J', { size: 9.5, tone: 'faint' }),
        T(320, 246, '一个 l′ 把转动与 1/r² 势焊在一起', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '方程形式与库仑问题平行', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '8.8/1-2',
      '截断给出 v 与 J 的组合',
      '截断条件同时限制振动量子数 $v$ 与转动量子数 $J$，允许组合写进闭式能量 $E_{vJ}$，每对 $(v,J)$ 对应一个分子态。',
      [
        T(320, 24, '截断给出 v 与 J 的组合', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_vJ = −DB / (v + ½ + l′ + ½)²', { size: 11, tone: 'text', anchor: 'middle' }),
        L(100, 210, 100, 84, { tone: 'dim' }),
        A(100, 96, 100, 82, { tone: 'dim' }),
        ...([
          [190, 'v=0', 'mint'],
          [146, 'v=1', 'violet'],
          [112, 'v=2', 'amber']
        ] as const).flatMap(([y, label, tone]) => LEVEL(120, 280, y, label, { tone, size: 9.5 })),
        L(146, 190, 146, 182, { tone: 'mint', weight: 1.2 }),
        L(164, 190, 164, 178, { tone: 'mint', weight: 1.2 }),
        L(182, 190, 182, 174, { tone: 'mint', weight: 1.2 }),
        L(146, 146, 146, 138, { tone: 'violet', weight: 1.2 }),
        L(164, 146, 164, 134, { tone: 'violet', weight: 1.2 }),
        L(182, 146, 182, 130, { tone: 'violet', weight: 1.2 }),
        T(88, 92, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        T(330, 134, 'v = 0,1,2,…：振动', { size: 9.5, tone: 'mint' }),
        T(330, 158, 'J = 0,1,2,…：转动', { size: 9.5, tone: 'violet' }),
        T(330, 182, '截断同时限制两者', { size: 9.5, tone: 'amber' }),
        T(330, 206, '每对 (v,J) 一个态', { size: 9.5, tone: 'muted' }),
        T(330, 230, '能量写成闭式', { size: 9.5, tone: 'faint' }),
        T(320, 252, '振动与转动不是简单相加', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '截断把它们绑成一个组合', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.8/2-0',
      '低 J：振动项 + 转动项',
      '低 $J$ 时能级近似成振动项 $(v+1/2)\\hbar\\omega$ 与转动项 $B_eJ(J+1)$ 的叠加，每条振动带内排着一串转动能级。',
      [
        T(320, 24, '低 J：振动项 + 转动项', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 64, 'E ≈ −D + ħω(v+½) + B_e J(J+1)', { size: 11, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 90, w: 310, h: 104 }, { xLabel: 'J', yLabel: 'E', tone: 'dim' }),
        CURVE((x) => 0.5 + 0.12 * x * (x + 1), { x: 70, y: 90, w: 310, h: 104 }, [0, 6], [0, 10], {
          tone: 'mint',
          weight: 2,
          steps: 80
        }),
        CURVE((x) => 2.5 + 0.12 * x * (x + 1), { x: 70, y: 90, w: 310, h: 104 }, [0, 6], [0, 10], {
          tone: 'violet',
          weight: 2,
          steps: 80
        }),
        CURVE((x) => 4.5 + 0.12 * x * (x + 1), { x: 70, y: 90, w: 310, h: 104 }, [0, 6], [0, 10], {
          tone: 'amber',
          weight: 2,
          steps: 80
        }),
        T(82, 184, 'v=0', { size: 9.5, tone: 'mint' }),
        T(82, 156, 'v=1', { size: 9.5, tone: 'violet' }),
        T(82, 130, 'v=2', { size: 9.5, tone: 'amber' }),
        L(70, 194, 70, 200, { tone: 'dim' }),
        L(225, 194, 225, 200, { tone: 'dim' }),
        L(380, 194, 380, 200, { tone: 'dim' }),
        T(70, 212, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(225, 212, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(380, 212, '6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(64, 198, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 94, '10', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(410, 94, 'ħω：振动间隔大', { size: 9.5, tone: 'mint' }),
        T(410, 118, 'B_e J(J+1)：转动小', { size: 9.5, tone: 'violet' }),
        T(410, 142, '低 J 时可分离', { size: 9.5, tone: 'cyan' }),
        T(410, 166, 'v 决定整条带', { size: 9.5, tone: 'amber' }),
        T(410, 190, 'J 在带内展开', { size: 9.5, tone: 'muted' }),
        T(410, 214, '高 J 需耦合修正', { size: 9.5, tone: 'faint' }),
        T(320, 244, '先分层：振动带套转动细线', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '低 J 时两项可以相加', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '8.8/2-1',
      '两种尺度：几千 vs 几十 cm⁻¹',
      '振动能级间隔约几千 $\\mathrm{cm^{-1}}$，转动间隔只有几十 $\\mathrm{cm^{-1}}$；尺度相差两个量级，光谱因此呈带状。',
      [
        T(320, 24, '两种尺度：几千 vs 几十 cm⁻¹', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 200, 80, 92, { tone: 'dim' }),
        ...([
          [190, 'v=0', 'mint'],
          [150, 'v=1', 'violet'],
          [110, 'v=2', 'amber']
        ] as const).flatMap(([y, label, tone]) => LEVEL(96, 220, y, label, { tone, size: 9.5 })),
        A(252, 186, 252, 154, { tone: 'mint', weight: 1.2 }),
        T(262, 172, '几千 cm⁻¹', { size: 9.5, tone: 'mint' }),
        T(330, 90, '振动带间距大', { size: 10, tone: 'mint' }),
        T(330, 112, '转动细线间距小', { size: 10, tone: 'violet' }),
        T(330, 134, '相差约两个量级', { size: 9.5, tone: 'cyan' }),
        T(330, 156, '高分辨才能分开', { size: 9.5, tone: 'muted' }),
        T(420, 216, '转动态', { size: 9.5, tone: 'faint' }),
        L(420, 200, 540, 200, { tone: 'cyan', weight: 1.6 }),
        L(420, 188, 540, 188, { tone: 'cyan', weight: 1.6 }),
        L(420, 176, 540, 176, { tone: 'cyan', weight: 1.6 }),
        L(420, 164, 540, 164, { tone: 'cyan', weight: 1.6 }),
        T(556, 204, 'J', { size: 9.5, tone: 'dim' }),
        T(420, 148, '几十 cm⁻¹', { size: 9.5, tone: 'cyan' }),
        T(320, 236, '大间隔立起振动带，小间隔铺成细线', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '带状光谱由此而来', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 276, '单位：cm⁻¹，波数', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '8.8/2-2',
      'ΔJ = ±1：P 支与 R 支',
      '振动跃迁同时改变转动量子数：$\\Delta J=+1$ 给出向高波数的 R 支，$\\Delta J=-1$ 给出向低波数的 P 支。',
      [
        T(320, 24, 'ΔJ = ±1：P 支与 R 支', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 210, 570, 210, { tone: 'dim' }),
        A(562, 210, 582, 210, { tone: 'dim' }),
        T(576, 226, '波数', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(320, 210, 320, 88, { tone: 'faint', dash: true }),
        T(320, 82, 'ν̃₀', { size: 10, tone: 'muted', anchor: 'middle' }),
        L(350, 210, 350, 184, { tone: 'amber', weight: 2 }),
        L(382, 210, 382, 176, { tone: 'amber', weight: 2 }),
        L(414, 210, 414, 168, { tone: 'amber', weight: 2 }),
        L(446, 210, 446, 160, { tone: 'amber', weight: 2 }),
        L(290, 210, 290, 184, { tone: 'violet', weight: 2 }),
        L(258, 210, 258, 176, { tone: 'violet', weight: 2 }),
        L(226, 210, 226, 168, { tone: 'violet', weight: 2 }),
        L(194, 210, 194, 160, { tone: 'violet', weight: 2 }),
        T(430, 104, 'R 支：ΔJ=+1', { size: 10, tone: 'amber' }),
        T(170, 104, 'P 支：ΔJ=−1', { size: 10, tone: 'violet' }),
        T(430, 128, '向高波数', { size: 9.5, tone: 'amber' }),
        T(170, 128, '向低波数', { size: 9.5, tone: 'violet' }),
        T(320, 132, '带原点', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 236, 'R 支向高波数，P 支向低波数', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '中间缺 ΔJ=0 的线', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 276, '每条线对应一个 J', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '8.8/0-0-f',
      'V(r)：平衡点 −D，两端极限',
      '$V(r)=D[(r_e/r)^2-2(r_e/r)]$：第一项是正排斥，第二项是负吸引；$r=r_e$ 时取最小值 $-D$，$r\\to0$ 发散，$r\\to\\infty$ 趋于零。',
      [
        T(320, 24, 'V(r)：平衡点 −D，两端极限', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 64, 'V(r) = D [(r_e/r)² − 2(r_e/r)]', { size: 11.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 90, w: 280, h: 110 }, { xLabel: 'r', yLabel: 'V', tone: 'dim' }),
        L(70, 169, 350, 169, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (x * x) - 2 / x, { x: 70, y: 90, w: 280, h: 110 }, [0.5, 7], [-1.2, 3], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        DOT(92, 195, { r: 4, tone: 'amber' }),
        T(100, 212, '−D', { size: 9.5, tone: 'amber' }),
        T(92, 232, 'r_e', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(74, 102, 'r→0：+∞', { size: 9.5, tone: 'violet' }),
        T(280, 158, 'r→∞：0⁻', { size: 9.5, tone: 'faint' }),
        L(70, 200, 70, 206, { tone: 'dim' }),
        L(178, 200, 178, 206, { tone: 'dim' }),
        L(350, 200, 350, 206, { tone: 'dim' }),
        T(70, 218, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(178, 218, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 218, '7', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(64, 172, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 100, '3', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(370, 94, 'D：势阱深度', { size: 9.5, tone: 'mint' }),
        T(370, 118, 'r_e：平衡距离', { size: 9.5, tone: 'amber' }),
        T(370, 142, 'r→0：平方项发散', { size: 9.5, tone: 'violet' }),
        T(370, 166, 'r→∞：V 从负侧趋零', { size: 9.5, tone: 'cyan' }),
        T(370, 190, '极小处 dV/dr = 0', { size: 9.5, tone: 'muted' }),
        T(370, 214, '束缚态都在 −D 之上', { size: 9.5, tone: 'faint' }),
        T(320, 246, '一个极小、两个极端，构成分子势阱', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 'D 与 r_e 是两个形状参数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.8/0-1-f',
      'V(r_e) 与 ω：底部参数',
      '$V(r_e)=-D$ 定阱底，$\\omega=\\sqrt{2D/(\\mu r_e^2)}$ 定振动频率：$D$ 是深度，$r_e$ 是位置，$\\mu$ 是约化质量。',
      [
        T(320, 24, 'V(r_e) 与 ω：底部参数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'amber', opacity: 0.14, r: 5 }),
        T(320, 64, 'V(r_e) = −D　　ω = √(2D/(μ r_e²))', { size: 11, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 100, w: 240, h: 100 }, { xLabel: 'r', yLabel: 'V', tone: 'dim' }),
        L(70, 125, 310, 125, { tone: 'faint', dash: true }),
        CURVE((x) => 1 / (x * x) - 2 / x, { x: 70, y: 100, w: 240, h: 100 }, [0.6, 2.6], [-1.2, 0.4], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        L(118, 187, 118, 118, { tone: 'faint', dash: true }),
        DOT(118, 187, { r: 4, tone: 'amber' }),
        T(126, 180, '−D', { size: 9.5, tone: 'amber' }),
        T(118, 216, 'r_e', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        A(300, 125, 300, 187, { tone: 'amber', weight: 1.2 }),
        T(292, 158, 'D', { size: 9.5, tone: 'amber', anchor: 'end' }),
        T(330, 96, 'D：阱深，决定键能', { size: 9.5, tone: 'mint' }),
        T(330, 120, 'r_e：平衡距离', { size: 9.5, tone: 'amber' }),
        T(330, 144, 'μ：约化质量', { size: 9.5, tone: 'cyan' }),
        T(330, 168, '底部曲率 ∝ D/r_e²', { size: 9.5, tone: 'violet' }),
        T(330, 192, 'D→0：频率→0', { size: 9.5, tone: 'muted' }),
        T(330, 216, 'μ→∞：频率→0', { size: 9.5, tone: 'faint' }),
        T(320, 246, '阱越深越窄，振动越快', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '重分子振动更慢', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.8/1-0-f',
      'B 与 l′：把转动并进离心项',
      '$B=2\\mu Dr_e^2/\\hbar^2$ 无量纲；$l^{\\prime}$ 由 $J(J+1)$ 与 $B$ 共同决定，$J=0$ 时 $l^{\\prime}$ 就由 $B$ 抬起。',
      [
        T(320, 24, 'B 与 l′：把转动并进离心项', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 52, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'B = 2μD r_e²/ħ²', { size: 11, tone: 'text', anchor: 'middle' }),
        T(320, 84, 'l′ = −1/2 + ½√(1 + 4J(J+1) + 4B)', { size: 10.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 106, w: 300, h: 90 }, { xLabel: 'J', yLabel: 'l′', tone: 'dim' }),
        CURVE((x) => -0.5 + 0.5 * Math.sqrt(1 + 4 * x * (x + 1)), { x: 80, y: 106, w: 300, h: 90 }, [0, 10], [0, 11], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => -0.5 + 0.5 * Math.sqrt(1 + 4 * x * (x + 1) + 16), { x: 80, y: 106, w: 300, h: 90 }, [0, 10], [0, 11], {
          tone: 'amber',
          weight: 2,
          steps: 140
        }),
        T(110, 186, 'B=0：l′ 从 0 起', { size: 9.5, tone: 'mint' }),
        T(110, 158, 'B 大：整体抬高', { size: 9.5, tone: 'amber' }),
        T(296, 126, 'J 大时两线靠拢', { size: 9.5, tone: 'muted' }),
        L(80, 196, 80, 202, { tone: 'dim' }),
        L(230, 196, 230, 202, { tone: 'dim' }),
        L(380, 196, 380, 202, { tone: 'dim' }),
        T(80, 214, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(230, 214, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(380, 214, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(74, 200, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(400, 92, 'B 无量纲', { size: 9.5, tone: 'violet' }),
        T(400, 116, 'B 越大，l′ 抬得越高', { size: 9.5, tone: 'amber' }),
        T(400, 140, 'J 大时 B 被淹没', { size: 9.5, tone: 'muted' }),
        T(400, 164, 'l′ 随 J 单调增大', { size: 9.5, tone: 'mint' }),
        T(400, 188, 'J=0 时 l′ 由 B 定', { size: 9.5, tone: 'cyan' }),
        T(400, 212, 'J 大时 l′≈J', { size: 9.5, tone: 'faint' }),
        T(320, 246, 'B 是转动与振动的耦合强度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 'l′ 把 J 翻译成角量子数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.8/1-1-f',
      'E_vJ：分母里的三个量子数',
      '$E_{vJ}=-DB/(v+1/2+l^{\\prime}+1/2)^2$：$DB$ 定整体深度，$v$ 与 $l^{\\prime}$ 都进分母；$v$ 增大时分母变大，能级从下方挤向零。',
      [
        T(320, 24, 'E_vJ：分母里的三个量子数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'cyan', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_vJ = −DB / (v + ½ + l′ + ½)²', { size: 11, tone: 'text', anchor: 'middle' }),
        L(100, 200, 100, 80, { tone: 'dim' }),
        A(100, 92, 100, 78, { tone: 'dim' }),
        T(88, 88, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...([
          [100, 'v=0', 'mint'],
          [156, 'v=1', 'violet'],
          [175, 'v=2', 'amber'],
          [184, 'v=3', 'cyan'],
          [189, 'v=4', 'mint'],
          [192, 'v=5', 'violet']
        ] as const).flatMap(([y, label, tone]) => LEVEL(120, 290, y, label, { tone, size: 9.5 })),
        T(390, 92, 'DB：整体深度', { size: 9.5, tone: 'mint' }),
        T(390, 116, 'v：振动量子数', { size: 9.5, tone: 'violet' }),
        T(390, 140, 'l′：转动藏在这里', { size: 9.5, tone: 'amber' }),
        T(390, 164, '分母大 ⇒ |E| 小', { size: 9.5, tone: 'muted' }),
        T(390, 188, 'v 增大：E→0⁻', { size: 9.5, tone: 'cyan' }),
        T(390, 212, 'J 通过 l′ 改分母', { size: 9.5, tone: 'faint' }),
        T(320, 246, '三个量子数共同写进一个分母', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '振动与转动不能简单拆开', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.8/2-0-f',
      '低 J 近似：三项相加',
      '$E_{vJ}\\approx-D+\\hbar\\omega(v+1/2)+B_eJ(J+1)$：$-D$ 是阱底，振动项是主间隔，转动项是小修正。',
      [
        T(320, 24, '低 J 近似：三项相加', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_vJ ≈ −D + ħω(v+½) + B_e J(J+1)', { size: 11, tone: 'text', anchor: 'middle' }),
        L(120, 200, 320, 200, { tone: 'mint', weight: 1.8 }),
        L(120, 130, 320, 130, { tone: 'violet', weight: 1.8 }),
        L(120, 108, 320, 108, { tone: 'amber', weight: 1.8 }),
        T(112, 204, '−D', { size: 9.5, tone: 'mint', anchor: 'end' }),
        T(112, 134, '−D + ħω', { size: 9.5, tone: 'violet', anchor: 'end' }),
        T(112, 112, 'E_vJ', { size: 9.5, tone: 'amber', anchor: 'end' }),
        A(340, 196, 340, 134, { tone: 'violet', weight: 1.2 }),
        A(340, 126, 340, 112, { tone: 'amber', weight: 1.2 }),
        T(350, 170, 'ħω(v+½)：主间隔', { size: 9.5, tone: 'violet' }),
        T(350, 106, 'B_eJ(J+1)：小修正', { size: 9.5, tone: 'amber' }),
        T(350, 200, '低 J：两项可分离', { size: 9.5, tone: 'muted' }),
        T(350, 222, 'J 大：耦合显现', { size: 9.5, tone: 'cyan' }),
        T(350, 244, '选择定则管跃迁', { size: 9.5, tone: 'faint' }),
        T(320, 260, '先加振动，再加转动', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 278, '这就是带状光谱的层级', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '8.8/2-1-f',
      'ΔJ = ±1：R 支与 P 支',
      '$\\Delta J=+1$ 给 R 支，谱线向高波数；$\\Delta J=-1$ 给 P 支，谱线向低波数；$\\Delta J=0$ 的线不出现。',
      [
        T(320, 24, 'ΔJ = ±1：R 支与 P 支', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'ΔJ = +1 → R 支　　ΔJ = −1 → P 支', { size: 11, tone: 'text', anchor: 'middle' }),
        L(70, 210, 570, 210, { tone: 'dim' }),
        A(562, 210, 582, 210, { tone: 'dim' }),
        T(576, 226, '波数', { size: 9.5, tone: 'dim', anchor: 'end' }),
        L(320, 210, 320, 88, { tone: 'faint', dash: true }),
        T(320, 82, 'ν̃₀', { size: 10, tone: 'muted', anchor: 'middle' }),
        L(350, 210, 350, 184, { tone: 'amber', weight: 2 }),
        L(382, 210, 382, 176, { tone: 'amber', weight: 2 }),
        L(414, 210, 414, 168, { tone: 'amber', weight: 2 }),
        L(446, 210, 446, 160, { tone: 'amber', weight: 2 }),
        L(290, 210, 290, 184, { tone: 'violet', weight: 2 }),
        L(258, 210, 258, 176, { tone: 'violet', weight: 2 }),
        L(226, 210, 226, 168, { tone: 'violet', weight: 2 }),
        L(194, 210, 194, 160, { tone: 'violet', weight: 2 }),
        T(430, 108, 'R 支：ΔJ=+1', { size: 10, tone: 'amber' }),
        T(170, 108, 'P 支：ΔJ=−1', { size: 10, tone: 'violet' }),
        T(430, 132, '向高波数', { size: 9.5, tone: 'amber' }),
        T(170, 132, '向低波数', { size: 9.5, tone: 'violet' }),
        T(320, 136, '带原点', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 238, '同时 Δv = +1，才有振动带', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, 'ΔJ=0 的线不出现', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 278, '每条线对应一个 J', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
