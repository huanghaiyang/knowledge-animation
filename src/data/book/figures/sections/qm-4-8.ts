import { fig, T, BAND, L, A, C, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '4.8/overview',
    '隧穿：同一个指数，三类场景',
    '透射概率由 $\\exp(-2\\int\\kappa\\,dx)$ 控制：场发射压薄三角势垒，STM 把间距变成电流，聚变让质子穿过库仑壁。',
    [
      T(320, 24, '隧穿：同一个指数，三类场景', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(34, 50, 186, 150, '场发射', { tone: 'amber' }),
      BAND(48, 92, 14, 90, { tone: 'amber', opacity: 0.2, r: 2 }),
      L(62, 92, 62, 182, { tone: 'amber', weight: 1.6 }),
      L(62, 104, 190, 178, { tone: 'amber', weight: 1.6 }),
      L(46, 144, 96, 144, { tone: 'mint', dash: true }),
      DOT(56, 144, { r: 2.4, tone: 'mint' }),
      A(74, 148, 168, 166, { tone: 'mint', dash: true, weight: 1.1 }),
      T(100, 112, 'φ', { size: 9.5, tone: 'amber' }),
      T(120, 194, '隧穿逸出', { size: 9.5, tone: 'mint' }),
      ...PANEL(232, 50, 186, 150, 'STM', { tone: 'cyan' }),
      L(252, 70, 318, 148, { tone: 'cyan', weight: 1.6 }),
      L(384, 70, 318, 148, { tone: 'cyan', weight: 1.6 }),
      L(244, 180, 406, 180, { tone: 'amber', weight: 2 }),
      L(318, 148, 318, 180, { tone: 'dim', dash: true }),
      T(272, 86, '针尖', { size: 9.5, tone: 'cyan' }),
      T(326, 164, 'd', { size: 9.5, tone: 'amber' }),
      A(340, 176, 340, 152, { tone: 'violet', weight: 1.1 }),
      T(348, 164, 'I', { size: 9.5, tone: 'violet' }),
      T(250, 192, '样品', { size: 9.5, tone: 'amber' }),
      ...PANEL(430, 50, 176, 150, '聚变', { tone: 'violet' }),
      CURVE((x) => 1 / (Math.abs(x - 0.5) + 0.16), { x: 442, y: 78, w: 150, h: 86 }, [0, 1], [0, 7], {
        tone: 'amber',
        weight: 1.8
      }),
      C(448, 150, 7, { tone: 'violet', fill: true }),
      T(448, 150, '+', { size: 9.5, tone: 'text', anchor: 'middle' }),
      C(586, 150, 7, { tone: 'violet', fill: true }),
      T(586, 150, '+', { size: 9.5, tone: 'text', anchor: 'middle' }),
      A(458, 146, 512, 104, { tone: 'mint', weight: 1.1, dash: true }),
      T(516, 112, '库仑势垒', { size: 9.5, tone: 'amber' }),
      T(456, 190, '质子隧穿', { size: 9.5, tone: 'violet' }),
      T(320, 222, '同一个指数因子：e^(−2κd)', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 244, '宽度、高度、质量都写在指数里', { size: 10, tone: 'faint', anchor: 'middle' }),
      T(320, 266, '场发射、STM、聚变与原子钟', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '4.8/0-0',
      '强电场把势垒压成三角形',
      '金属电子被功函数 $\\phi$ 困住；加上强电场后势垒变成窄三角形，电子不升温也能直接隧穿逸出。',
      [
        T(320, 24, '强电场把势垒压成三角形', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(60, 100, 64, 104, { tone: 'amber', opacity: 0.16, r: 2 }),
        T(70, 92, '金属', { size: 9.5, tone: 'amber' }),
        L(124, 100, 124, 204, { tone: 'amber', weight: 1.8 }),
        L(60, 158, 150, 158, { tone: 'mint', dash: true }),
        T(58, 148, 'E_F', { size: 9.5, tone: 'mint', anchor: 'end' }),
        DOT(92, 158, { r: 2.6, tone: 'mint' }),
        L(124, 108, 560, 204, { tone: 'violet', dash: true, weight: 1.5 }),
        L(124, 108, 330, 204, { tone: 'amber', weight: 1.8 }),
        T(360, 120, '弱电场：垒宽', { size: 9.5, tone: 'violet' }),
        T(230, 142, '强电场：垒窄', { size: 9.5, tone: 'amber' }),
        A(100, 172, 300, 172, { tone: 'mint', dash: true, weight: 1.2 }),
        T(200, 186, '电子隧穿逸出', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        L(60, 204, 560, 204, { tone: 'dim' }),
        T(570, 204, 'x', { size: 9.5, tone: 'dim' }),
        T(420, 86, '真空', { size: 9.5, tone: 'faint' }),
        T(320, 236, '温度不变，电场把势垒压薄', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '场离子显微镜、场发射显示', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '都是三角势垒的直接应用', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.8/0-1',
      'J 随电场急剧上升',
      '福勒—诺德海姆公式里 $\\mathcal{E}^2$ 只是前因子，真正的主角是 $\\exp(-b/\\mathcal{E})$：电场越强，发射越猛。',
      [
        T(320, 24, 'J 随电场急剧上升', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 70, w: 330, h: 150 }, { xLabel: 'E', yLabel: 'J' }),
        CURVE((x) => (x * x * Math.exp(-4 / x)) / 20, { x: 80, y: 70, w: 330, h: 150 }, [1, 6], [0, 1.02], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        DOT(146, 216, { r: 3, tone: 'mint' }),
        DOT(278, 177, { r: 3, tone: 'mint' }),
        T(146, 228, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(278, 228, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(410, 228, '6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(72, 145, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(436, 86, 'J ∝ E² e^(−b/E)', { size: 10, tone: 'mint' }),
        T(436, 112, 'E²：幂次前因子', { size: 10, tone: 'violet' }),
        T(436, 136, '指数项：真正的推手', { size: 10, tone: 'amber' }),
        T(436, 160, 'E 增大 ⇒ 指数 → 1', { size: 10, tone: 'muted' }),
        T(436, 184, 'φ 增大 ⇒ 发射骤减', { size: 10, tone: 'cyan' }),
        T(436, 208, '低温也能发射：冷发射', { size: 10, tone: 'faint' }),
        T(320, 248, '电流对电场极端敏感', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '场发射显示由此而来', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '4.8/0-2',
      '库仑势垒挡不住少数质子',
      '两个质子靠近时库仑能升高；经典粒子到转折点就返回，量子粒子却能穿过禁戒区进入核力范围。',
      [
        T(320, 24, '库仑势垒挡不住少数质子', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(90, 204, 570, 204, { tone: 'dim' }),
        T(580, 204, 'r', { size: 9.5, tone: 'dim' }),
        CURVE((x) => 1 / (Math.abs(x - 0.5) + 0.13), { x: 90, y: 76, w: 480, h: 128 }, [0, 1], [0, 8], {
          tone: 'amber',
          weight: 2
        }),
        BAND(272, 76, 116, 64, { tone: 'violet', opacity: 0.1, r: 4 }),
        T(330, 100, '禁戒区', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        L(90, 140, 570, 140, { tone: 'mint', dash: true }),
        T(82, 140, 'E', { size: 9.5, tone: 'mint', anchor: 'end' }),
        C(96, 168, 7, { tone: 'violet', fill: true }),
        T(96, 168, '+', { size: 9.5, tone: 'text', anchor: 'middle' }),
        C(564, 168, 7, { tone: 'violet', fill: true }),
        T(564, 168, '+', { size: 9.5, tone: 'text', anchor: 'middle' }),
        A(300, 132, 360, 132, { tone: 'mint', weight: 1.2, dash: true }),
        T(330, 120, '隧穿', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(130, 186, '经典：到转折点返回', { size: 9.5, tone: 'muted' }),
        T(360, 186, '量子：少数穿透', { size: 9.5, tone: 'mint' }),
        T(320, 232, '伽莫夫因子压低概率，但不会归零', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 254, '恒星核心因此持续燃烧', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '4.8/1-0',
      '隧道二极管：电流先升后降',
      '重掺杂 p–n 结极薄，电子直接隧穿；偏压改变可填充态与空态的重叠，电流出现峰值后回落。',
      [
        T(320, 24, '隧道二极管：电流先升后降', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 64, w: 380, h: 150 }, { xLabel: 'V', yLabel: 'I' }),
        BAND(213, 64, 95, 150, { tone: 'violet', opacity: 0.08, r: 0 }),
        CURVE(
          (x) => 0.9 * Math.exp(-(((x - 0.3) / 0.17) ** 2)) + 0.12 + 0.55 * Math.max(0, x - 0.62),
          { x: 80, y: 64, w: 380, h: 150 },
          [0, 1],
          [0, 1.1],
          { tone: 'mint', weight: 2, steps: 200 }
        ),
        DOT(194, 74.9, { r: 3.5, tone: 'amber' }),
        DOT(315.6, 194.1, { r: 3.5, tone: 'cyan' }),
        T(260, 112, '负微分电阻', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(156, 226, '0.2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(232, 226, '0.4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(308, 226, '0.6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(384, 226, '0.8', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(72, 146, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(490, 84, '峰值电流', { size: 10, tone: 'amber' }),
        T(490, 108, '谷值电流', { size: 10, tone: 'cyan' }),
        T(490, 136, '偏压调节态重叠', { size: 10, tone: 'muted' }),
        T(490, 160, '电流先升后降', { size: 10, tone: 'violet' }),
        T(490, 184, '直流偏置 → 高频振荡', { size: 10, tone: 'mint' }),
        T(490, 208, '最早的两端量子器件', { size: 10, tone: 'faint' }),
        T(320, 250, '负微分电阻可做微波与太赫兹源', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '隧穿概率被偏压调制', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.8/1-1',
      '负微分电阻把直流变成高频',
      '负阻区给谐振回路补充能量，抵消损耗；直流偏置因此转成稳定高频振荡，可作微波与太赫兹源。',
      [
        T(320, 24, '负微分电阻把直流变成高频', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(50, 86, 110, 44, { tone: 'mint', opacity: 0.14, r: 6 }),
        T(105, 108, '直流偏置', { size: 10, tone: 'mint', anchor: 'middle' }),
        A(164, 108, 196, 108, { tone: 'dim', weight: 1.2 }),
        BAND(200, 86, 120, 44, { tone: 'amber', opacity: 0.14, r: 6 }),
        T(260, 108, '隧道二极管', { size: 10, tone: 'amber', anchor: 'middle' }),
        A(324, 108, 356, 108, { tone: 'dim', weight: 1.2 }),
        BAND(360, 86, 110, 44, { tone: 'violet', opacity: 0.14, r: 6 }),
        T(415, 108, 'LC 谐振', { size: 10, tone: 'violet', anchor: 'middle' }),
        A(474, 108, 506, 108, { tone: 'dim', weight: 1.2 }),
        BAND(510, 86, 90, 44, { tone: 'cyan', opacity: 0.14, r: 6 }),
        T(555, 108, '高频输出', { size: 10, tone: 'cyan', anchor: 'middle' }),
        CURVE((x) => Math.sin(x / 12), { x: 200, y: 158, w: 250, h: 44 }, [0, 250], [-1, 1], {
          tone: 'mint',
          weight: 1.8,
          steps: 160
        }),
        T(325, 220, '稳定振荡', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(320, 244, '负阻抵消回路损耗', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '直流偏置 → 微波与太赫兹', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '4.8/1-2',
      '针尖—样品：电流按指数变',
      '真空间隙是势垒，隧穿电流 $I\\propto V e^{-2\\kappa d}$；间距每变 $0.1\\,\\mathrm{nm}$，电流约差一个数量级。',
      [
        T(320, 24, '针尖—样品：电流按指数变', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 44, 274, 196, '隧道结', { tone: 'cyan' }),
        L(56, 72, 160, 150, { tone: 'cyan', weight: 1.6 }),
        L(264, 72, 160, 150, { tone: 'cyan', weight: 1.6 }),
        L(48, 180, 290, 180, { tone: 'amber', weight: 2 }),
        L(160, 150, 160, 180, { tone: 'dim', dash: true }),
        A(172, 178, 172, 152, { tone: 'violet', weight: 1.1 }),
        T(180, 164, 'd', { size: 9.5, tone: 'violet' }),
        DOT(160, 165, { r: 2.4, tone: 'mint' }),
        T(130, 88, '针尖', { size: 9.5, tone: 'cyan' }),
        T(54, 192, '样品', { size: 9.5, tone: 'amber' }),
        T(196, 214, '真空：势垒', { size: 9.5, tone: 'muted' }),
        ...AXIS({ x: 340, y: 60, w: 220, h: 150 }, { xLabel: 'd / nm', yLabel: 'I' }),
        CURVE((x) => Math.exp(-22 * x), { x: 340, y: 60, w: 220, h: 150 }, [0, 0.2], [0, 1], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        T(395, 228, '0.05', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(450, 228, '0.10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(505, 228, '0.15', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(332, 135, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(340, 240, '0.1 nm ⇒ 电流约降到 1/10', { size: 10, tone: 'amber' }),
        T(340, 258, '2κ ≈ 22 nm⁻¹，κ = √(2mφ)/ħ', { size: 9.5, tone: 'mint' }),
        T(340, 274, '指数灵敏度换取原子级分辨', { size: 9.5, tone: 'faint' })
      ]
    ),
    '2-0': fig(
      '4.8/2-0',
      '氨反转：23.87 GHz 的时间标准',
      '氮原子在两个等价位置间隧穿，反转能级分裂约 $9.9\\times10^{-5}\\,\\mathrm{eV}$，对应 23.87 GHz 微波。',
      [
        T(320, 24, '氨反转：23.87 GHz 的时间标准', { size: 12.5, tone: 'text', anchor: 'middle' }),
        CURVE((x) => ((x * x - 1) ** 2) * 0.85, { x: 80, y: 70, w: 300, h: 150 }, [-1.5, 1.5], [0, 2.4], {
          tone: 'mint',
          weight: 2
        }),
        ...LEVEL(130, 330, 208, '', { tone: 'cyan' }),
        ...LEVEL(130, 330, 190, '', { tone: 'amber' }),
        T(338, 208, 'ν₀', { size: 9.5, tone: 'cyan' }),
        T(338, 190, 'ν₁', { size: 9.5, tone: 'amber' }),
        A(280, 204, 280, 194, { tone: 'violet', weight: 1.1 }),
        T(286, 186, 'ΔE', { size: 9.5, tone: 'violet' }),
        T(238, 158, '势垒', { size: 9.5, tone: 'amber' }),
        T(130, 232, 'N 在上', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(330, 232, 'N 在下', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 84, '两个等价构型', { size: 10, tone: 'violet' }),
        T(400, 108, '氮原子隧穿反转', { size: 10, tone: 'muted' }),
        T(400, 132, 'hν ≈ 9.9×10⁻⁵ eV', { size: 10, tone: 'amber' }),
        T(400, 156, '频率 ≈ 23.87 GHz', { size: 10, tone: 'mint' }),
        T(400, 180, '波长 ≈ 1.26 cm', { size: 9.5, tone: 'cyan' }),
        T(400, 204, '1949 氨微波激射器', { size: 9.5, tone: 'faint' }),
        T(400, 228, '第一代原子钟', { size: 9.5, tone: 'faint' }),
        T(56, 228, 'hν ≈ 9.9×10⁻⁵ eV', { size: 10, tone: 'amber' }),
        T(56, 250, '波长 ≈ 1.26 cm（微波）', { size: 10, tone: 'cyan' }),
        T(56, 272, '频率稳 ⇒ 时间标准', { size: 9.5, tone: 'muted' })
      ]
    ),
    '2-1': fig(
      '4.8/2-1',
      '低温反应为何没有冻结',
      '阿伦尼乌斯公式预言低温速率指数衰减；实验却出现平台，同位素取代又显著改变速率，这是隧穿的直接证据。',
      [
        T(320, 24, '低温反应为何没有冻结', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 70, w: 380, h: 150 }, { xLabel: '1/T', yLabel: 'ln k' }),
        CURVE((x) => Math.max(1.6 - 1.6 * x, 0.72), { x: 80, y: 70, w: 380, h: 150 }, [0, 1], [0, 1.8], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => Math.max(1.35 - 1.6 * x, 0.45), { x: 80, y: 70, w: 380, h: 150 }, [0, 1], [0, 1.8], {
          tone: 'violet',
          weight: 1.8,
          dash: true,
          steps: 160
        }),
        T(130, 88, '阿伦尼乌斯直线', { size: 9.5, tone: 'cyan' }),
        T(410, 118, '低温平台', { size: 9.5, tone: 'mint' }),
        T(160, 224, '高 T', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(430, 224, '低 T', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(70, 248, '低温下速率不再继续下降', { size: 10, tone: 'muted' }),
        T(70, 270, '同位素效应是隧穿的证据', { size: 10, tone: 'faint' })
      ]
    ),
    '2-2': fig(
      '4.8/2-2',
      '生命过程里的隧穿',
      'DNA 碱基对的质子隧穿可能引发突变，呼吸链与光合作用中的电子隧穿则支撑能量转换。',
      [
        T(320, 24, '生命过程里的隧穿', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(34, 50, 186, 150, 'DNA 质子隧穿', { tone: 'mint' }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 158), { x: 48, y: 82, w: 158, h: 18 }, [0, 158], [-1, 1], {
          tone: 'mint'
        }),
        CURVE((x) => Math.sin((2 * Math.PI * x) / 158 + 0.8), { x: 48, y: 126, w: 158, h: 18 }, [0, 158], [-1, 1], {
          tone: 'cyan'
        }),
        L(70, 88, 70, 128, { tone: 'dim' }),
        L(112, 88, 112, 128, { tone: 'dim' }),
        L(154, 88, 154, 128, { tone: 'dim' }),
        L(196, 88, 196, 128, { tone: 'dim' }),
        DOT(130, 108, { r: 2.6, tone: 'amber' }),
        A(120, 108, 140, 108, { tone: 'amber', weight: 1.1 }),
        T(127, 158, '碱基对间转移', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(127, 180, '可能引发突变', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(226, 50, 186, 150, '呼吸链电子隧穿', { tone: 'violet' }),
        L(240, 100, 398, 100, { tone: 'amber' }),
        L(240, 140, 398, 140, { tone: 'amber' }),
        C(262, 120, 8, { tone: 'mint' }),
        C(319, 120, 8, { tone: 'violet' }),
        C(376, 120, 8, { tone: 'cyan' }),
        A(270, 120, 310, 120, { tone: 'mint', weight: 1.1 }),
        T(319, 160, '跨膜电子传递', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(319, 180, '提供细胞能量', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        ...PANEL(418, 50, 186, 150, '光合电荷分离', { tone: 'amber' }),
        A(432, 70, 468, 96, { tone: 'amber', weight: 1.2 }),
        T(444, 66, 'hν', { size: 9.5, tone: 'amber' }),
        C(492, 112, 10, { tone: 'mint', fill: true }),
        C(542, 112, 10, { tone: 'violet', fill: true }),
        A(504, 112, 530, 112, { tone: 'mint', weight: 1.1 }),
        T(511, 158, '光激发后电荷分开', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(511, 180, '转化为化学能', { size: 9.5, tone: 'faint', anchor: 'middle' }),
        T(320, 218, '同一套势垒穿透，写进生命化学', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 240, '质子和电子的隧穿都在室温发生', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 262, '量子力学不只属于实验室', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '4.8/0-0-f',
      'J ∝ E² e^(−b/E)：指数项说了算',
      '$J\\propto\\mathcal{E}^2e^{-b/\\mathcal{E}}$，$b=4\\sqrt{2m}\\,\\phi^{3/2}/3e\\hbar$：$\\ln(J/\\mathcal{E}^2)$ 对 $1/\\mathcal{E}$ 是直线，斜率就是 $-b$。',
      [
        T(320, 24, 'J ∝ E² e^(−b/E)：指数项说了算', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(52, 52, 90, 26, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(97, 65, 'E²', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(154, 65, '×', { size: 12, tone: 'text' }),
        BAND(170, 52, 140, 26, { tone: 'amber', opacity: 0.24, r: 5 }),
        T(240, 65, 'e^(−b/E)', { size: 10.5, tone: 'amber', anchor: 'middle' }),
        T(324, 65, '= J', { size: 11, tone: 'text' }),
        T(380, 65, 'b = 4√(2m)φ³/²/3eħ', { size: 9.5, tone: 'muted' }),
        ...AXIS({ x: 70, y: 96, w: 300, h: 120 }, { xLabel: '1/E', yLabel: 'ln J' }),
        CURVE((x) => 4 - 1.6 * x, { x: 70, y: 96, w: 300, h: 120 }, [0, 2], [0, 4.2], {
          tone: 'mint',
          weight: 2
        }),
        T(145, 228, '0.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(220, 228, '1.0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(295, 228, '1.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(392, 108, '直线斜率 = −b', { size: 10, tone: 'mint' }),
        T(392, 132, 'b ∝ φ³/²：功函数越大越难', { size: 9.5, tone: 'amber' }),
        T(392, 156, 'E → 0：J → 0', { size: 10, tone: 'muted' }),
        T(392, 180, 'E 增大：J 急剧上升', { size: 10, tone: 'cyan' }),
        T(392, 204, '纵轴取 ln(J/E²)', { size: 10, tone: 'violet' }),
        T(320, 250, '指数项主导，前因子只改刻度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '强电场下指数趋近 1', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '4.8/0-1-f',
      '伽莫夫因子：P = e^(−2πη)',
      '$P\\propto\\exp(-2\\pi Z_1Z_2e^2/\\hbar v)=e^{-2\\pi\\eta}$：$\\eta\\propto Z_1Z_2/v$，速度越小、电荷越大，穿透概率越低。',
      [
        T(320, 24, '伽莫夫因子：P = e^(−2πη)', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(56, 60, 'η = Z₁Z₂e²/(ħv)', { size: 11, tone: 'mint' }),
        T(56, 84, 'P = exp(−2πη)', { size: 11, tone: 'amber' }),
        ...AXIS({ x: 70, y: 110, w: 180, h: 120 }, { xLabel: 'v', yLabel: 'η' }),
        CURVE((x) => 1 / x, { x: 70, y: 110, w: 180, h: 120 }, [0.35, 3], [0, 3], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        T(114, 242, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(182, 242, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(250, 242, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(62, 190, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(62, 150, '2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        ...AXIS({ x: 340, y: 110, w: 200, h: 120 }, { xLabel: 'η', yLabel: 'P' }),
        CURVE((x) => Math.exp(-2 * x), { x: 340, y: 110, w: 200, h: 120 }, [0, 3], [0, 1], {
          tone: 'amber',
          weight: 2,
          steps: 140
        }),
        T(407, 242, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(473, 242, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(332, 170, '0.5', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(256, 100, 'v 越小 ⇒ η 越大', { size: 9.5, tone: 'muted' }),
        T(70, 252, 'Z 越大 ⇒ 库仑耦合强 ⇒ P 更小', { size: 10, tone: 'muted' }),
        T(70, 274, 'v → 0：P → 0；v → ∞：P → 1', { size: 9.5, tone: 'faint' }),
        T(340, 252, '太阳：P 极小但质子极多', { size: 10, tone: 'mint' }),
        T(340, 274, '聚变缓慢而持续', { size: 10, tone: 'faint' })
      ]
    ),
    '1-0': fig(
      '4.8/1-0-f',
      'I ∝ V e^(−2κd)：指数是主角',
      '$I\\propto Ve^{-2\\kappa d}$，$\\kappa=\\sqrt{2m\\phi}/\\hbar$：偏压只改幅度，间距进入指数；$\\ln I$ 对 $d$ 是斜率 $-2\\kappa$ 的直线。',
      [
        T(320, 24, 'I ∝ V e^(−2κd)：指数是主角', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(56, 56, 'I ∝ V · e^(−2κd)', { size: 12, tone: 'text' }),
        T(56, 78, 'κ = √(2mφ)/ħ', { size: 11, tone: 'mint' }),
        T(56, 100, 'φ = 4.5 eV ⇒ κ ≈ 1.09×10¹⁰ m⁻¹', { size: 9.5, tone: 'amber' }),
        ...AXIS({ x: 330, y: 80, w: 240, h: 140 }, { xLabel: 'd', yLabel: 'ln I' }),
        CURVE((x) => 4 - 20 * x, { x: 330, y: 80, w: 240, h: 140 }, [0, 0.2], [0, 4.2], {
          tone: 'mint',
          weight: 2
        }),
        T(390, 242, '0.05', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(450, 242, '0.10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(510, 242, '0.15', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(570, 242, '0.20', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(322, 187, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(322, 153, '2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(322, 120, '3', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 142, 'V：偏压，只改整体幅度', { size: 10, tone: 'muted' }),
        T(56, 164, '2κd：往返的衰减指数', { size: 10, tone: 'cyan' }),
        T(56, 186, 'd 增 0.1 nm ⇒ I 约降 10 倍', { size: 10, tone: 'amber' }),
        T(56, 208, 'd → 0：I ∝ V', { size: 10, tone: 'faint' }),
        T(56, 230, 'φ → 0：κ → 0，不再衰减', { size: 10, tone: 'faint' }),
        T(320, 254, '指数因子把距离变成电流对比度', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '这是 STM 原子级分辨的来源', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '4.8/1-1-f',
      'δI/I ≈ −2κδd：微小位移被放大',
      '$\\delta I/I\\approx-2\\kappa\\,\\delta d$：一阶展开把间距的微小变化放大 $2\\kappa$ 倍，$\\kappa\\approx11\\,\\mathrm{nm^{-1}}$。',
      [
        T(320, 24, 'δI/I ≈ −2κδd：微小位移被放大', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 70, w: 280, h: 140 }, { xLabel: 'd', yLabel: 'I' }),
        CURVE((x) => Math.exp(-3 * x), { x: 70, y: 70, w: 280, h: 140 }, [0, 1.2], [0, 1], {
          tone: 'mint',
          weight: 2,
          steps: 160
        }),
        L(170, 175, 250, 199, { tone: 'amber', weight: 1.4 }),
        DOT(210, 186.9, { r: 3.5, tone: 'amber' }),
        T(190, 168, '切线', { size: 9.5, tone: 'amber' }),
        A(210, 214, 230, 214, { tone: 'violet', weight: 1.1 }),
        T(220, 226, 'δd', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(380, 84, '一阶展开：斜率乘位移', { size: 10, tone: 'muted' }),
        T(380, 108, '2κ：放大倍数（≈22 nm⁻¹）', { size: 9.5, tone: 'amber' }),
        T(380, 132, 'δd = 0.1 nm ⇒ δI/I ≈ −2.2', { size: 10, tone: 'mint' }),
        T(380, 156, '即电流降到约 11%', { size: 10, tone: 'cyan' }),
        T(380, 180, 'δd 变号 ⇒ δI 反号', { size: 10, tone: 'violet' }),
        T(380, 204, 'δd 过大需用指数原式', { size: 10, tone: 'faint' }),
        T(380, 228, 'κ 随 φ 增大 ⇒ 更灵敏', { size: 10, tone: 'muted' }),
        T(320, 254, '线性化只在 δd ≪ 1/κ 时成立', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, 'STM 正是靠这一放大读到原子', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '4.8/2-0-f',
      'ΔE = hν：反转分裂给出频率',
      '$\\Delta E=h\\nu$，$\\nu\\approx23.87\\,\\mathrm{GHz}$：分裂只有约 $9.9\\times10^{-5}\\,\\mathrm{eV}$，对应 $\\lambda\\approx1.26\\,\\mathrm{cm}$ 的微波。',
      [
        T(320, 24, 'ΔE = hν：反转分裂给出频率', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(56, 60, 'ΔE = hν', { size: 12, tone: 'text' }),
        T(56, 82, 'h = 4.136×10⁻¹⁵ eV·s', { size: 9.5, tone: 'muted' }),
        T(56, 104, 'ν = 23.87 GHz', { size: 10, tone: 'mint' }),
        ...LEVEL(70, 300, 150, '', { tone: 'cyan' }),
        ...LEVEL(70, 300, 140, '', { tone: 'amber' }),
        T(310, 156, 'ν₀', { size: 9.5, tone: 'cyan' }),
        T(310, 136, 'ν₁', { size: 9.5, tone: 'amber' }),
        A(280, 148, 280, 142, { tone: 'violet', weight: 1.1 }),
        T(286, 128, 'ΔE', { size: 9.5, tone: 'violet' }),
        T(56, 186, '分裂 ≈ 9.9×10⁻⁵ eV', { size: 10, tone: 'amber' }),
        T(56, 208, '波长 ≈ 1.26 cm（微波）', { size: 10, tone: 'cyan' }),
        T(56, 230, '频率极稳 ⇒ 可作时间标准', { size: 10, tone: 'muted' }),
        ...AXIS({ x: 360, y: 70, w: 210, h: 140 }, { xLabel: 'ν', yLabel: 'ΔE' }),
        CURVE((x) => 4.136 * x, { x: 360, y: 70, w: 210, h: 140 }, [0, 60], [0, 250], {
          tone: 'mint',
          weight: 2
        }),
        DOT(443.5, 154.7, { r: 3.5, tone: 'amber' }),
        T(380, 140, '23.87 GHz', { size: 9.5, tone: 'amber' }),
        T(430, 232, '20', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(500, 232, '40', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(570, 232, '60', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(352, 154, '100', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(352, 98, '200', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(360, 244, '斜率就是 h', { size: 10, tone: 'mint' }),
        T(360, 266, 'ν 越高 ⇒ 分裂越大', { size: 10, tone: 'muted' })
      ]
    ),
    '2-1': fig(
      '4.8/2-1-f',
      'k ∝ e^(−2∫κdx)：整段禁戒区的累积',
      '$k\\propto\\exp[-\\frac{2}{\\hbar}\\int\\sqrt{2m(V-E)}\\,dx]$：被积函数是局部 $\\kappa(x)$，指数是整段势垒的累积。',
      [
        T(320, 24, 'k ∝ e^(−2∫κdx)：整段禁戒区的累积', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(50, 56, 'k ∝ exp(−(2/ħ)∫√(2m(V−E)) dx)', { size: 10.5, tone: 'text' }),
        BAND(50, 74, 120, 24, { tone: 'violet', opacity: 0.24, r: 5 }),
        T(110, 86, 'κ(x)', { size: 10, tone: 'violet', anchor: 'middle' }),
        T(184, 86, '=', { size: 10, tone: 'text' }),
        BAND(198, 74, 170, 24, { tone: 'mint', opacity: 0.24, r: 5 }),
        T(283, 86, '√(2m(V−E))/ħ', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 110, w: 300, h: 120 }, { xLabel: 'x', yLabel: 'V' }),
        BAND(170, 130, 120, 70, { tone: 'amber', opacity: 0.1, r: 0 }),
        L(170, 200, 170, 130, { tone: 'amber', weight: 1.6 }),
        L(170, 130, 290, 130, { tone: 'amber', weight: 1.6 }),
        L(290, 130, 290, 200, { tone: 'amber', weight: 1.6 }),
        L(110, 170, 320, 170, { tone: 'mint', dash: true }),
        T(104, 158, 'E', { size: 9.5, tone: 'mint', anchor: 'end' }),
        ...[190, 215, 240, 265].flatMap((x) => A(x, 176, x, 186, { tone: 'violet', weight: 1 })),
        T(200, 212, '积分：宽度 × 平均 κ', { size: 9.5, tone: 'muted' }),
        T(380, 90, '宽度进入指数', { size: 10, tone: 'amber' }),
        ...AXIS({ x: 380, y: 110, w: 190, h: 120 }, { xLabel: 'L', yLabel: 'k' }),
        CURVE((x) => Math.exp(-1.6 * x), { x: 380, y: 110, w: 190, h: 120 }, [0, 2.4], [0, 1], {
          tone: 'mint',
          weight: 2
        }),
        T(60, 252, '势垒越宽、越高、粒子越重，指数越小', { size: 10, tone: 'muted' }),
        T(60, 274, 'V ≤ E 时 κ = 0，不衰减', { size: 10, tone: 'faint' }),
        T(380, 252, 'L → 0：因子 → 1', { size: 9.5, tone: 'faint' }),
        T(380, 274, 'm 大 ⇒ 衰减更快', { size: 9.5, tone: 'faint' })
      ]
    )
  }
}
export default set
