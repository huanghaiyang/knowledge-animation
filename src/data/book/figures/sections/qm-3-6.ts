import { fig, T, R, BAND, L, A, DOT, TAG, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '3.6/overview',
    'δ 势：零宽、单位面积、一条跳变',
    'δ 函数把短程相互作用压成一个边界条件：δ 势阱只有一个束缚态，δ 势垒只有幂律透射，放进盒中则给出能级移动与劈裂。',
    [
      T(320, 24, 'δ 势：零宽、单位面积、一条跳变', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 44, 180, 172, 'δ 函数', { tone: 'amber' }),
      L(46, 186, 200, 186, { tone: 'dim' }),
      A(192, 186, 208, 186, { tone: 'dim' }),
      A(124, 186, 124, 92, { tone: 'amber', weight: 2 }),
      T(124, 74, '仅在原点非零', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(134, 106, 'δ(x)', { size: 10, tone: 'amber' }),
      BAND(112, 194, 24, 6, { tone: 'amber', opacity: 0.3, r: 1 }),
      T(124, 210, '面积 = 1', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      ...PANEL(232, 44, 180, 172, 'δ 势阱', { tone: 'violet' }),
      L(244, 86, 398, 86, { tone: 'dim' }),
      A(322, 86, 322, 140, { tone: 'violet', weight: 2 }),
      T(322, 78, 'V = −αδ(x)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      L(280, 130, 314, 130, { tone: 'mint', dash: true }),
      L(330, 130, 364, 130, { tone: 'mint', dash: true }),
      T(276, 120, 'E < 0', { size: 9.5, tone: 'mint', anchor: 'end' }),
      CURVE((x) => Math.exp(-Math.abs(x - 75) / 34), { x: 246, y: 158, w: 150, h: 46 }, [0, 150], [0, 1], {
        tone: 'mint'
      }),
      T(322, 210, '唯一束缚态', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      ...PANEL(430, 44, 182, 172, 'δ 势垒', { tone: 'cyan' }),
      L(442, 196, 598, 196, { tone: 'dim' }),
      A(520, 196, 520, 104, { tone: 'amber', weight: 2 }),
      T(520, 96, '+αδ(x)', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      CURVE((x) => Math.sin(x / 7), { x: 444, y: 130, w: 68, h: 26 }, [0, 68], [-1, 1], { tone: 'mint' }),
      CURVE((x) => 0.55 * Math.sin(x / 8), { x: 530, y: 140, w: 64, h: 18 }, [0, 64], [-1, 1], { tone: 'cyan' }),
      A(452, 178, 504, 178, { tone: 'mint', weight: 1.2 }),
      T(478, 168, '入射', { size: 9.5, tone: 'mint', anchor: 'middle' }),
      T(562, 172, '透射', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
      T(520, 208, '连续谱', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      T(320, 238, '同一条导数跳变条件贯穿阱与垒', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 262, '零宽度只有幂律，没有指数压制', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '3.6/0-0',
      '零宽度、单位面积的峰',
      '$\\delta(x)=0\\ (x\\neq0)$，$\\int\\delta\\,dx=1$；把峰宽 ε 压到零、高度升到 1/ε，面积保持不变。',
      [
        T(320, 24, '同一个面积，宽度不断变窄', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(56, 208, 588, 208, { tone: 'dim' }),
        A(580, 208, 600, 208, { tone: 'dim' }),
        T(590, 194, 'x', { size: 9.5, tone: 'dim' }),
        CURVE((x) => Math.exp(-(((x - 200) / 62) ** 2)), { x: 100, y: 172, w: 200, h: 36 }, [0, 200], [0, 1], {
          tone: 'faint'
        }),
        CURVE((x) => Math.exp(-(((x - 330) / 27) ** 2)), { x: 270, y: 140, w: 120, h: 68 }, [0, 120], [0, 1], {
          tone: 'amber'
        }),
        CURVE((x) => Math.exp(-(((x - 500) / 11) ** 2)), { x: 470, y: 88, w: 60, h: 120 }, [0, 60], [0, 1], {
          tone: 'violet'
        }),
        T(200, 164, 'ε 大', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(330, 132, 'ε 中', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(500, 80, 'ε → 0', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        A(238, 196, 272, 196, { tone: 'dim', weight: 1.2 }),
        A(362, 196, 456, 196, { tone: 'dim', weight: 1.2 }),
        TAG(452, 60, '∫δ dx = 1', { tone: 'mint', size: 10 }),
        T(320, 236, '面积 = 高度 × 宽度，始终为 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, 'ε → 0：峰高发散，积分不变', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '3.6/0-1',
      '有限宽度势化为 δ 势',
      '真实作用范围 b 远小于波长时，势的具体形状不再重要，只剩面积 $\\alpha$；δ 势是这一极限的数学表达。',
      [
        T(320, 24, '波长很长时，看不出势的宽度', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 272, 166, '真实势：宽度 b', { tone: 'muted' }),
        L(46, 196, 292, 196, { tone: 'dim' }),
        L(46, 150, 140, 150, { tone: 'amber', weight: 2 }),
        L(140, 150, 140, 196, { tone: 'amber', weight: 2 }),
        L(140, 196, 190, 196, { tone: 'amber', weight: 2 }),
        L(190, 196, 190, 150, { tone: 'amber', weight: 2 }),
        L(190, 150, 292, 150, { tone: 'amber', weight: 2 }),
        CURVE((x) => Math.sin(x / 16), { x: 50, y: 82, w: 238, h: 38 }, [0, 238], [-1, 1], { tone: 'mint' }),
        T(60, 80, '波长 λ ≫ b', { size: 9.5, tone: 'muted' }),
        T(165, 186, 'b', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        ...PANEL(322, 44, 286, 166, 'δ 势：只剩面积', { tone: 'violet' }),
        L(334, 196, 596, 196, { tone: 'dim' }),
        A(460, 196, 460, 110, { tone: 'violet', weight: 2 }),
        T(460, 102, '−αδ(x)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 10), { x: 336, y: 134, w: 106, h: 34 }, [0, 106], [-1, 1], { tone: 'mint' }),
        CURVE((x) => Math.sin(x / 10 + 0.5), { x: 476, y: 134, w: 118, h: 34 }, [0, 118], [-1, 1], {
          tone: 'cyan'
        }),
        T(390, 186, 'λ 不变', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(534, 186, '相位微跳', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(360, 80, '只剩面积 α', { size: 9.5, tone: 'muted' }),
        T(320, 232, '波长远大于作用范围，只看面积', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '真实势与 δ 势给出同一散射结果', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '3.6/0-2',
      'ψ 连续，ψ′ 跳变',
      '把方程在原点两侧积分一个无穷小区间：动能项留下导数差，势能项留下 $\\alpha\\psi(0)$，于是得到跳变条件。',
      [
        T(320, 24, '波函数连续，斜率被 δ 势折断', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 266, 166, 'ψ：连续', { tone: 'mint' }),
        L(46, 188, 282, 188, { tone: 'dim' }),
        A(274, 188, 290, 188, { tone: 'dim' }),
        L(160, 116, 160, 188, { tone: 'dim', dash: true }),
        L(60, 172, 160, 124, { tone: 'mint', weight: 2 }),
        L(160, 124, 260, 176, { tone: 'mint', weight: 2 }),
        DOT(160, 124, { r: 3, tone: 'mint' }),
        T(160, 200, 'x = 0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(52, 80, '无跳变', { size: 9.5, tone: 'mint' }),
        T(198, 152, '斜率变号', { size: 9.5, tone: 'muted' }),
        ...PANEL(322, 44, 286, 166, 'ψ′：跳变', { tone: 'cyan' }),
        L(334, 188, 596, 188, { tone: 'dim' }),
        A(588, 188, 604, 188, { tone: 'dim' }),
        L(340, 136, 470, 136, { tone: 'cyan', weight: 2 }),
        L(484, 166, 590, 166, { tone: 'cyan', weight: 2 }),
        L(477, 136, 477, 166, { tone: 'danger', dash: true }),
        T(405, 124, 'κA', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(536, 178, '−κA', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(477, 200, 'x = 0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(477, 112, '−2mαψ(0)/ħ²', { size: 9.5, tone: 'danger', anchor: 'middle' }),
        T(320, 232, 'ψ 连续，导数差由 δ 势给定', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 256, '微分方程被压成一条边界条件', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '3.6/1-0',
      'δ 阱：两侧同一条衰减尾巴',
      '$E<0$，两侧取同一系数 $A$：$\\psi=A e^{\\kappa x}$（x<0）与 $A e^{-\\kappa x}$（x>0）；波函数连续，顶点是折角。',
      [
        T(320, 24, '同一个 A，把两侧接成一条曲线', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(60, 64, 580, 64, { tone: 'dim' }),
        T(60, 52, 'V', { size: 9.5, tone: 'violet' }),
        A(320, 64, 320, 104, { tone: 'violet', weight: 2 }),
        T(332, 110, '−αδ(x)', { size: 9.5, tone: 'violet' }),
        L(60, 224, 580, 224, { tone: 'dim' }),
        A(572, 224, 592, 224, { tone: 'dim' }),
        T(586, 210, 'x', { size: 9.5, tone: 'dim' }),
        L(320, 130, 320, 224, { tone: 'dim', dash: true }),
        CURVE((x) => Math.exp(-Math.abs(x - 260) / 70), { x: 60, y: 130, w: 520, h: 94 }, [0, 520], [0, 1], {
          tone: 'mint'
        }),
        T(320, 120, 'ψ(0) = A', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(180, 200, 'e^(κx)', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(440, 202, 'e^(−κx)', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        L(390, 209, 390, 224, { tone: 'dim', dash: true }),
        T(394, 232, '1/κ', { size: 9.5, tone: 'amber' }),
        T(320, 248, 'E = −mα²/2ħ²：唯一能级', { size: 10.5, tone: 'mint', anchor: 'middle' }),
        T(320, 272, '波函数无节点，没有激发态', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '3.6/1-1',
      '代入跳变条件，消去 A',
      '左侧斜率 $+A\\kappa$，右侧 $-A\\kappa$，差 $-2A\\kappa$；与 $-2m\\alpha A/\\hbar^2$ 相等，A 被消去，κ 唯一确定。',
      [
        T(320, 24, '振幅被消去，只剩一个 κ', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 180, 130, '① 两侧解', { tone: 'mint' }),
        L(56, 152, 104, 120, { tone: 'mint', weight: 1.8 }),
        L(104, 120, 152, 152, { tone: 'mint', weight: 1.8 }),
        DOT(104, 120, { r: 2.6, tone: 'mint' }),
        L(104, 120, 104, 160, { tone: 'dim', dash: true }),
        T(64, 168, '左 +Aκ', { size: 9.5, tone: 'mint' }),
        T(118, 168, '右 −Aκ', { size: 9.5, tone: 'cyan' }),
        A(216, 116, 244, 116, { tone: 'amber', weight: 1.4 }),
        ...PANEL(248, 50, 148, 130, '② 差值', { tone: 'amber' }),
        T(322, 112, '−2Aκ', { size: 12, tone: 'amber', anchor: 'middle' }),
        T(322, 140, '导数差', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(398, 116, 426, 116, { tone: 'amber', weight: 1.4 }),
        ...PANEL(430, 50, 180, 130, '③ 等于势项', { tone: 'violet' }),
        T(520, 112, '−2mαA/ħ²', { size: 10.5, tone: 'violet', anchor: 'middle' }),
        T(520, 140, 'A 可消去', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 204, '−2Aκ = −2mαA/ħ²', { size: 11.5, tone: 'text', anchor: 'middle' }),
        T(320, 230, '→ κ = mα/ħ²', { size: 12, tone: 'mint', anchor: 'middle' }),
        T(320, 258, 'κ 与归一化无关', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '3.6/1-2',
      '零宽度容不下节点',
      '有限深势阱可以有多个束缚态，每个多一个节点；δ 势阱宽度为零，只能容下一个无节点基态。',
      [
        T(320, 24, '宽度为零，节点无处安放', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 266, 190, '有限深阱', { tone: 'amber' }),
        L(60, 100, 80, 100, { tone: 'amber', weight: 2 }),
        L(80, 100, 80, 200, { tone: 'amber', weight: 2 }),
        L(80, 200, 260, 200, { tone: 'amber', weight: 2 }),
        L(260, 200, 260, 100, { tone: 'amber', weight: 2 }),
        L(260, 100, 286, 100, { tone: 'amber', weight: 2 }),
        L(84, 152, 256, 152, { tone: 'mint', dash: true }),
        T(264, 152, 'n = 1', { size: 9.5, tone: 'mint' }),
        L(84, 124, 256, 124, { tone: 'cyan', dash: true }),
        T(264, 124, 'n = 2', { size: 9.5, tone: 'cyan' }),
        CURVE((x) => Math.sin((Math.PI * x) / 172), { x: 84, y: 132, w: 172, h: 40 }, [0, 172], [-1, 1], {
          tone: 'mint'
        }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 172), { x: 84, y: 106, w: 172, h: 36 }, [0, 172], [-1, 1], {
          tone: 'cyan'
        }),
        T(170, 218, '节点递增', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(322, 44, 286, 190, 'δ 阱', { tone: 'violet' }),
        L(334, 212, 596, 212, { tone: 'dim' }),
        A(462, 212, 462, 116, { tone: 'violet', weight: 2 }),
        T(462, 108, '−αδ(x)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        CURVE((x) => Math.exp(-Math.abs(x - 125) / 40), { x: 340, y: 150, w: 250, h: 52 }, [0, 250], [0, 1], {
          tone: 'mint'
        }),
        L(414, 182, 510, 182, { tone: 'mint', dash: true }),
        T(514, 182, 'E', { size: 9.5, tone: 'mint' }),
        T(462, 226, '唯一束缚态', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(320, 250, '宽度为零，容不下节点', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '所以只有一个基态', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-3': fig(
      '3.6/1-3',
      '归一化与衰减长度',
      '归一化给 $A=\\sqrt{m\\alpha}/\\hbar$；衰减长度 $\\hbar^2/m\\alpha$ 随 α 增大而缩短，吸引越强束缚越紧。',
      [
        T(320, 24, 'α 越大：峰更高，尾巴更短', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(50, 212, 370, 212, { tone: 'dim' }),
        A(362, 212, 382, 212, { tone: 'dim' }),
        T(376, 198, 'x', { size: 9.5, tone: 'dim' }),
        L(190, 96, 190, 212, { tone: 'dim', dash: true }),
        CURVE((x) => Math.exp(-Math.abs(x - 130) / 55), { x: 60, y: 150, w: 260, h: 56 }, [0, 260], [0, 1], {
          tone: 'violet',
          dash: true
        }),
        CURVE((x) => Math.exp(-Math.abs(x - 130) / 22), { x: 60, y: 96, w: 260, h: 110 }, [0, 260], [0, 1], {
          tone: 'mint'
        }),
        T(262, 142, 'α 小：尾巴长', { size: 9.5, tone: 'violet' }),
        T(200, 88, 'α 大：峰更高', { size: 9.5, tone: 'mint' }),
        TAG(402, 60, 'A = √(mα)/ħ', { tone: 'mint', size: 10 }),
        TAG(402, 96, 'ℓ = ħ²/(mα)', { tone: 'violet', size: 10 }),
        T(402, 128, '振幅随 √α 增大', { size: 9.5, tone: 'muted' }),
        T(402, 152, '衰减长度随 1/α 缩短', { size: 9.5, tone: 'muted' }),
        T(402, 178, 'α ↑：束缚更紧', { size: 9.5, tone: 'mint' }),
        T(320, 240, '归一化面积始终为 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, 'α 同时决定峰高与衰减长度', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '3.6/2-0',
      'δ 垒：两侧都是平面波',
      '$V=+\\alpha\\delta(x)$，没有束缚态；两侧都是平面波，原点处只有导数跳变，解得反射与透射。',
      [
        T(320, 24, '排斥 δ 势：只有散射', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(50, 200, 590, 200, { tone: 'dim' }),
        A(582, 200, 602, 200, { tone: 'dim' }),
        T(596, 186, 'x', { size: 9.5, tone: 'dim' }),
        A(320, 200, 320, 100, { tone: 'amber', weight: 2 }),
        T(330, 92, '+αδ(x)', { size: 9.5, tone: 'amber' }),
        CURVE((x) => Math.sin(x / 8), { x: 60, y: 130, w: 250, h: 44 }, [0, 250], [-1, 1], { tone: 'mint' }),
        A(300, 110, 208, 110, { tone: 'violet', weight: 1.2 }),
        T(236, 98, '反射', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        CURVE((x) => 0.8 * Math.sin(x / 9), { x: 332, y: 136, w: 240, h: 36 }, [0, 240], [-1, 1], {
          tone: 'cyan'
        }),
        T(150, 120, '入射', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(500, 120, '透射', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 236, 'E > 0：任意能量都是散射态', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, 'δ 垒排斥，没有束缚态', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '3.6/2-1',
      '低能全反射，高能透明',
      '$\\beta=m\\alpha/\\hbar^2k$ 随能量升高而变小；k→0 时 β→∞，T→0；k→∞ 时 β→0，T→1。',
      [
        T(320, 24, '能量越高，越容易穿过 δ 垒', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 210, 560, 210, { tone: 'dim' }),
        A(552, 210, 572, 210, { tone: 'dim' }),
        L(80, 210, 80, 64, { tone: 'dim' }),
        A(80, 76, 80, 58, { tone: 'dim' }),
        T(66, 58, 'T', { size: 10, tone: 'dim', anchor: 'end' }),
        T(576, 210, 'k', { size: 10, tone: 'dim' }),
        CURVE((k) => 1 / (1 + (0.35 / k) ** 2), { x: 80, y: 60, w: 480, h: 150 }, [0.02, 1], [0, 1.05], {
          tone: 'mint',
          steps: 200
        }),
        DOT(243, 135, { r: 3, tone: 'amber' }),
        T(250, 124, 'T = 1/2', { size: 9.5, tone: 'amber' }),
        T(88, 196, 'T → 0', { size: 9.5, tone: 'violet' }),
        T(470, 72, 'T → 1', { size: 9.5, tone: 'mint' }),
        T(300, 172, '幂律，无指数压制', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(80, 222, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 222, '能量增大 →', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 246, '低能：β 大，几乎全反射', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '高能：β 小，近乎透明', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '3.6/2-2',
      '盒中 δ 垒：节点处看不见',
      '盒中 $x_0=L/2$ 处放 δ 垒；在 $x_0$ 有节点的态感受不到它，能级不动；在 $x_0$ 取极大的态能级上移。',
      [
        T(320, 24, '盒中 δ 垒：节点处“看不见”', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(70, 210, 370, 210, { tone: 'amber', weight: 2 }),
        L(70, 210, 70, 90, { tone: 'amber', weight: 2 }),
        L(370, 210, 370, 90, { tone: 'amber', weight: 2 }),
        L(220, 210, 220, 120, { tone: 'violet', weight: 2 }),
        T(220, 112, '+αδ(x−x₀)', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 300), { x: 70, y: 150, w: 300, h: 44 }, [0, 300], [-1, 1], {
          tone: 'cyan'
        }),
        CURVE((x) => Math.sin((Math.PI * x) / 300), { x: 70, y: 110, w: 300, h: 44 }, [0, 300], [-1, 1], {
          tone: 'faint',
          dash: true
        }),
        CURVE((x) => Math.sin((Math.PI * x) / 300) - 0.28 * Math.exp(-Math.abs(x - 150) / 20), {
          x: 70,
          y: 110,
          w: 300,
          h: 44
        }, [0, 300], [-1, 1], { tone: 'mint' }),
        T(378, 124, 'n = 1', { size: 9.5, tone: 'mint' }),
        T(378, 166, 'n = 2', { size: 9.5, tone: 'cyan' }),
        L(430, 140, 570, 140, { tone: 'cyan', weight: 1.8 }),
        T(576, 140, 'E₂', { size: 9.5, tone: 'cyan' }),
        L(430, 180, 570, 180, { tone: 'faint', dash: true }),
        T(576, 180, 'E₁', { size: 9.5, tone: 'faint' }),
        L(430, 158, 570, 158, { tone: 'mint', weight: 1.8 }),
        A(500, 176, 500, 162, { tone: 'amber', weight: 1.2 }),
        T(512, 170, 'ΔE', { size: 9.5, tone: 'amber' }),
        T(320, 240, 'x₀ 处有节点 ⇒ ΔE = 0', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, 'x₀ 处有波峰 ⇒ 能级上移', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-3': fig(
      '3.6/2-3',
      '简并微扰：两个态劈裂',
      '当 $n$ 为偶数、$x_0=L/2$ 时，两个相邻态在 δ 势下简并；普通微扰失效，必须对角化矩阵，得到劈裂的两支。',
      [
        T(320, 24, '对称性保护简并，δ 垒解除', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 250, 180, '简并对', { tone: 'mint' }),
        L(60, 140, 250, 140, { tone: 'mint', weight: 1.8 }),
        T(256, 140, 'E₁', { size: 9.5, tone: 'mint' }),
        T(150, 120, 'E₁ = E₂', { size: 10, tone: 'mint', anchor: 'middle' }),
        T(155, 190, '两个态同能', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        A(292, 140, 332, 140, { tone: 'amber', weight: 1.4 }),
        T(312, 124, 'δ 势', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        ...PANEL(340, 44, 268, 180, '对角化后', { tone: 'violet' }),
        ...[124, 168].flatMap((y) =>
          LEVEL(366, 570, y, y === 124 ? 'E₊' : 'E₋', { tone: y === 124 ? 'amber' : 'cyan' })
        ),
        A(478, 162, 478, 130, { tone: 'violet', weight: 1.2 }),
        T(490, 146, '劈裂', { size: 9.5, tone: 'violet' }),
        T(470, 196, '2×2 矩阵', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 244, '简并子空间里普通微扰失效', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '劈裂宽度随 α 增大', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '3.6/0-0-f',
      'δ 函数：单位面积',
      '$\\delta(x)=0\\ (x\\neq0)$，$\\int_{-\\infty}^{\\infty}\\delta(x)\\,dx=1$；宽度 ε→0 时高度 1/ε→∞，面积恒为 1。',
      [
        T(320, 24, '∫δ dx = 1：面积不随宽度变', { size: 12.5, tone: 'text', anchor: 'middle' }),
        TAG(64, 56, '∫δ dx = 1', { tone: 'mint', size: 10.5 }),
        L(60, 200, 548, 200, { tone: 'dim' }),
        A(540, 200, 560, 200, { tone: 'dim' }),
        T(552, 186, 'x', { size: 9.5, tone: 'dim' }),
        R(90, 164, 72, 36, { tone: 'amber', fill: true, opacity: 0.2, r: 1 }),
        R(240, 128, 36, 72, { tone: 'violet', fill: true, opacity: 0.2, r: 1 }),
        R(366, 56, 18, 144, { tone: 'cyan', fill: true, opacity: 0.2, r: 1 }),
        T(126, 216, 'ε', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(258, 216, 'ε/2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(375, 216, 'ε/4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(170, 158, '1/ε', { size: 9.5, tone: 'amber' }),
        T(284, 120, '2/ε', { size: 9.5, tone: 'violet' }),
        T(390, 70, '4/ε', { size: 9.5, tone: 'cyan' }),
        A(300, 80, 348, 80, { tone: 'dim', weight: 1.2 }),
        T(324, 68, '宽度 → 0', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        A(500, 200, 500, 44, { tone: 'mint', weight: 2 }),
        T(508, 50, 'δ(x)', { size: 10, tone: 'mint' }),
        T(320, 240, '宽度压到零，高度发散，面积仍为 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '分布只在积分下才有意义', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '3.6/0-1-f',
      '跳变条件：导数差',
      "$\\psi'(0^+)-\\psi'(0^-)=-\\frac{2m\\alpha}{\\hbar^2}\\psi(0)$；α 越大跳变越陡，α→0 时恢复连续导数。",
      [
        T(320, 24, '导数跳变：α 越大，折角越尖', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 266, 172, 'α 小：折角缓', { tone: 'mint' }),
        L(46, 192, 288, 192, { tone: 'dim' }),
        A(280, 192, 296, 192, { tone: 'dim' }),
        L(60, 168, 150, 140, { tone: 'mint', weight: 2 }),
        L(150, 140, 240, 168, { tone: 'mint', weight: 2 }),
        DOT(150, 140, { r: 3, tone: 'mint' }),
        L(150, 140, 150, 192, { tone: 'dim', dash: true }),
        T(150, 204, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(88, 130, 'ψ(0)', { size: 9.5, tone: 'mint' }),
        T(210, 158, '斜率差小', { size: 9.5, tone: 'muted' }),
        ...PANEL(322, 44, 286, 172, 'α 大：折角尖', { tone: 'violet' }),
        L(334, 192, 596, 192, { tone: 'dim' }),
        A(588, 192, 604, 192, { tone: 'dim' }),
        L(372, 182, 472, 104, { tone: 'violet', weight: 2 }),
        L(472, 104, 572, 182, { tone: 'violet', weight: 2 }),
        DOT(472, 104, { r: 3, tone: 'violet' }),
        L(472, 104, 472, 192, { tone: 'dim', dash: true }),
        T(472, 204, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(404, 124, 'ψ(0)', { size: 9.5, tone: 'violet' }),
        T(500, 158, '斜率差大', { size: 9.5, tone: 'muted' }),
        T(320, 234, '跳变 = −2mαψ(0)/ħ²', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(320, 258, 'α → 0 时折角消失，导数连续', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '3.6/1-0-f',
      'E 随 α 二次下降',
      '$E=-m\\alpha^2/2\\hbar^2$：能量是 α 的二次函数，α→0 时从下方趋于 0，α 越大束缚越深；只有一个能级。',
      [
        T(320, 24, 'E 随 α 二次下降', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 220, 400, 220, { tone: 'dim' }),
        A(392, 220, 412, 220, { tone: 'dim' }),
        L(80, 220, 80, 70, { tone: 'dim' }),
        A(80, 82, 80, 66, { tone: 'dim' }),
        T(66, 66, 'E', { size: 10, tone: 'dim', anchor: 'end' }),
        T(412, 222, 'α', { size: 10, tone: 'dim' }),
        L(80, 89, 392, 89, { tone: 'dim', dash: true }),
        T(344, 84, 'E = 0', { size: 9.5, tone: 'dim' }),
        CURVE((a) => -a * a, { x: 80, y: 70, w: 320, h: 150 }, [0, 1], [-1.05, 0.15], { tone: 'mint', steps: 60 }),
        DOT(336, 169, { r: 3, tone: 'mint' }),
        T(140, 170, 'E = −mα²/2ħ²', { size: 10, tone: 'mint' }),
        T(96, 80, 'α → 0：E → 0⁻', { size: 9.5, tone: 'amber' }),
        T(300, 190, 'α → ∞：E → −∞', { size: 9.5, tone: 'amber' }),
        T(250, 236, 'α 越大，束缚越深', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        ...PANEL(432, 64, 166, 152, '只有一个解', { tone: 'violet' }),
        L(456, 150, 566, 150, { tone: 'mint', weight: 1.8 }),
        T(570, 150, 'E₀', { size: 10, tone: 'mint' }),
        T(515, 190, '无激发态', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(515, 212, '没有第二个能级', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 246, '二次依赖：α 翻倍，能量深四倍', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, 'κ = mα/ħ² 定出唯一能量', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '3.6/1-1-f',
      '波函数：振幅 √α，宽度 1/α',
      '$\\psi(x)=\\frac{\\sqrt{m\\alpha}}{\\hbar}e^{-m\\alpha|x|/\\hbar^2}$：振幅 ∝ √α，衰减长度 ∝ 1/α，归一化积分恒为 1。',
      [
        T(320, 24, '振幅 √α，宽度 1/α，面积不变', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(50, 204, 450, 204, { tone: 'dim' }),
        A(442, 204, 462, 204, { tone: 'dim' }),
        T(456, 190, 'x', { size: 9.5, tone: 'dim' }),
        L(250, 96, 250, 204, { tone: 'dim', dash: true }),
        CURVE((x) => Math.exp(-Math.abs(x - 190) / 80), { x: 60, y: 146, w: 380, h: 58 }, [0, 380], [0, 1], {
          tone: 'violet',
          dash: true
        }),
        CURVE((x) => Math.exp(-Math.abs(x - 190) / 28), { x: 60, y: 96, w: 380, h: 108 }, [0, 380], [0, 1], {
          tone: 'mint'
        }),
        T(262, 88, 'α 大：高而窄', { size: 9.5, tone: 'mint' }),
        T(330, 150, 'α 小：矮而宽', { size: 9.5, tone: 'violet' }),
        A(250, 218, 278, 218, { tone: 'amber', weight: 1.2 }),
        T(282, 222, '1/α', { size: 9.5, tone: 'amber' }),
        TAG(478, 56, 'A = √(mα)/ħ', { tone: 'mint', size: 10 }),
        TAG(478, 92, '∫|ψ|² dx = 1', { tone: 'cyan', size: 10 }),
        T(478, 124, '振幅随 √α 增大', { size: 9.5, tone: 'muted' }),
        T(478, 148, '宽度随 1/α 收缩', { size: 9.5, tone: 'muted' }),
        T(478, 176, 'α → ∞：趋近 δ 形', { size: 9.5, tone: 'violet' }),
        T(320, 240, '两条曲线下面积都等于 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '归一化把高度与宽度绑在一起', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '3.6/2-0-f',
      '透射率：只有幂律衰减',
      '$T=1/(1+\\beta^2)$，$\\beta=m\\alpha/\\hbar^2k$；β=1 时 T=1/2，β≫1 时 T≈1/β²，没有指数因子。',
      [
        T(320, 24, 'T = 1/(1+β²)：只有幂律', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 210, 560, 210, { tone: 'dim' }),
        A(552, 210, 572, 210, { tone: 'dim' }),
        L(80, 210, 80, 60, { tone: 'dim' }),
        A(80, 72, 80, 54, { tone: 'dim' }),
        T(66, 54, 'T', { size: 10, tone: 'dim', anchor: 'end' }),
        T(576, 210, 'β', { size: 10, tone: 'dim' }),
        CURVE((b) => 1 / (1 + b * b), { x: 80, y: 60, w: 480, h: 150 }, [0, 4], [0, 1.05], {
          tone: 'mint',
          steps: 200
        }),
        DOT(200, 135, { r: 3, tone: 'amber' }),
        T(208, 124, 'β = 1，T = 1/2', { size: 9.5, tone: 'amber' }),
        T(90, 72, 'T = 1', { size: 9.5, tone: 'mint' }),
        T(470, 92, 'T ≈ 1/β²', { size: 9.5, tone: 'violet' }),
        T(80, 222, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 222, 'β 增大 →', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(320, 246, 'R = β²/(1+β²)，R + T = 1', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '无宽度 ⇒ 只有幂律', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '3.6/2-1-f',
      '能级移动：sin² 的节点',
      '$\\Delta E_n=\\alpha|\\psi_n(x_0)|^2=\\frac{2\\alpha}{L}\\sin^2\\frac{n\\pi x_0}{L}$；在波节处为零，在波腹处最大。',
      [
        T(320, 24, 'ΔE 随 x₀：波节处归零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 200, 560, 200, { tone: 'dim' }),
        A(552, 200, 572, 200, { tone: 'dim' }),
        L(80, 200, 80, 66, { tone: 'dim' }),
        A(80, 78, 80, 60, { tone: 'dim' }),
        T(66, 60, 'ΔE', { size: 10, tone: 'dim', anchor: 'end' }),
        T(576, 200, 'x₀', { size: 10, tone: 'dim' }),
        CURVE((x) => Math.sin((Math.PI * x) / 300) ** 2, { x: 80, y: 70, w: 460, h: 130 }, [0, 300], [0, 1.05], {
          tone: 'mint',
          steps: 200
        }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 300) ** 2, {
          x: 80,
          y: 70,
          w: 460,
          h: 130
        }, [0, 300], [0, 1.05], { tone: 'cyan', dash: true, steps: 220 }),
        T(86, 62, 'n = 1', { size: 9.5, tone: 'mint' }),
        T(300, 62, 'n = 2', { size: 9.5, tone: 'cyan' }),
        T(80, 212, '0', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(540, 212, 'L', { size: 9.5, tone: 'dim', anchor: 'middle' }),
        T(195, 214, '波腹：ΔE 最大', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(310, 214, 'n=2 波节：ΔE = 0', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 240, '最大移动 2α/L，正比于 α', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '在波节处 δ 势完全不起作用', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
