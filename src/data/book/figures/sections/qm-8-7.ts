import { fig, T, R, BAND, L, A, C, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '8.7/overview',
    '原子实屏蔽 → 量子缺 → 能级顺序',
    '$V_{\\mathrm{eff}}$ 随 $r$ 与 $l$ 变化，穿透深的 s 电子屏蔽最少；用一个量子缺 $\\delta_l$ 修正主量子数，就得到 $E_{nl}=-13.6\\,\\mathrm{eV}/(n-\\delta_l)^2$ 与 $4s<3d$。',
    [
      T(320, 24, '原子实屏蔽 → 量子缺 → 能级顺序', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 42, 186, 192, '① 原子实', { tone: 'mint' }),
      C(104, 142, 5, { tone: 'danger', fill: true }),
      C(104, 142, 20, { tone: 'mint', dash: true }),
      C(104, 142, 34, { tone: 'faint', dash: true }),
      DOT(62, 126, { r: 3, tone: 'cyan' }),
      DOT(158, 116, { r: 3, tone: 'violet' }),
      DOT(150, 172, { r: 3, tone: 'amber' }),
      T(56, 118, 's', { size: 9.5, tone: 'cyan' }),
      T(164, 110, 'p', { size: 9.5, tone: 'violet' }),
      T(158, 186, 'd', { size: 9.5, tone: 'amber' }),
      T(104, 200, '内层电子屏蔽', { size: 9.5, tone: 'muted', anchor: 'middle' }),
      T(104, 220, 'Z_eff 随 l 与 r 变', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
      ...PANEL(220, 42, 186, 192, '② 量子缺 δ_l', { tone: 'violet' }),
      L(238, 84, 238, 196, { tone: 'dim' }),
      L(238, 196, 396, 196, { tone: 'dim' }),
      R(246, 96, 122, 18, { tone: 'mint', fill: true, opacity: 0.3, r: 3 }),
      R(246, 132, 76, 18, { tone: 'violet', fill: true, opacity: 0.3, r: 3 }),
      R(246, 168, 36, 18, { tone: 'amber', fill: true, opacity: 0.3, r: 3 }),
      T(374, 110, 'δ_s', { size: 9.5, tone: 'mint' }),
      T(328, 146, 'δ_p', { size: 9.5, tone: 'violet' }),
      T(288, 182, 'δ_d', { size: 9.5, tone: 'amber' }),
      T(236, 68, '同一 n：l 越小 δ 越大', { size: 9.5, tone: 'violet' }),
      T(236, 218, '穿透越深，δ 越大', { size: 9.5, tone: 'muted' }),
      ...PANEL(412, 42, 186, 192, '③ 4s < 3d', { tone: 'amber' }),
      ...([
        [186, '4s', 'mint'],
        [148, '3d', 'violet'],
        [118, '4p', 'cyan']
      ] as const).flatMap(([y, label, tone]) => LEVEL(432, 546, y, label, { tone, size: 9.5 })),
      A(424, 190, 424, 150, { tone: 'muted', weight: 1.2 }),
      T(414, 84, 'n−δ 决定能量', { size: 9.5, tone: 'muted' }),
      T(414, 212, '4s：δ 大，n−δ 小', { size: 9.5, tone: 'mint' }),
      T(414, 230, '3d：δ 小，能级高', { size: 9.5, tone: 'violet' }),
      T(320, 254, '屏蔽 + 穿透 → 量子缺 → 能级顺序', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 274, '4s 低于 3d 由此得到解释', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '8.7/0-0',
      '闭合内壳层 + 一个价电子',
      '碱金属的闭合内壳层形成原子实，最外层只剩一个价电子；它感受到的不是完整核电荷，而是被内层削弱的有效势。',
      [
        T(320, 24, '闭合内壳层 + 一个价电子', { size: 12.5, tone: 'text', anchor: 'middle' }),
        C(168, 152, 6, { tone: 'danger', fill: true }),
        C(168, 152, 28, { tone: 'mint', dash: true }),
        C(168, 152, 48, { tone: 'violet', dash: true }),
        C(168, 152, 68, { tone: 'faint', dash: true }),
        DOT(230, 110, { r: 3, tone: 'cyan' }),
        T(238, 106, '价电子', { size: 9.5, tone: 'cyan' }),
        T(168, 76, '内壳层', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(168, 238, '原子实', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 70, '闭合内壳层形成原子实', { size: 10, tone: 'text' }),
        T(300, 96, '价电子只感受部分核电荷', { size: 10, tone: 'muted' }),
        T(300, 122, '内层电子把核电荷屏蔽掉', { size: 10, tone: 'violet' }),
        T(300, 148, '剩余电荷让势更浅', { size: 9.5, tone: 'cyan' }),
        T(300, 174, '严格处理需自洽场', { size: 9.5, tone: 'muted' }),
        T(300, 200, '最外层只有一个价电子', { size: 9.5, tone: 'amber' }),
        T(300, 226, '原子实像一个整体', { size: 9.5, tone: 'faint' }),
        T(320, 258, '多电子问题化为单电子 + 有效势', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 276, '内层只留下屏蔽效应', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.7/0-1',
      '穿透：s 靠核，p、d 在外',
      's 电子的径向分布有近核小峰，穿透内层、感受更强吸引；p、d 被离心势挡在外面，几乎被完全屏蔽。',
      [
        T(320, 24, '穿透：s 靠核，p、d 在外', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 80, w: 300, h: 120 }, { xLabel: 'r', yLabel: 'P', tone: 'dim' }),
        CURVE(
          (x) => 0.14 * Math.exp(-((x - 1.0) ** 2) / 0.06) + (0.6 * x ** 2 * Math.exp(-x / 1.8)) / 2.0,
          { x: 70, y: 80, w: 300, h: 120 },
          [0, 12],
          [0, 1.1],
          { tone: 'mint', weight: 2, steps: 160 }
        ),
        CURVE((x) => (0.85 * x ** 3 * Math.exp(-x / 1.3)) / 2.8, { x: 70, y: 80, w: 300, h: 120 }, [0, 12], [0, 1.1], {
          tone: 'violet',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => (0.8 * x ** 4 * Math.exp(-x / 1.1)) / 5.5, { x: 70, y: 80, w: 300, h: 120 }, [0, 12], [0, 1.1], {
          tone: 'amber',
          weight: 2,
          steps: 160
        }),
        T(110, 158, 's 近核小峰', { size: 9.5, tone: 'mint' }),
        T(176, 104, 'p', { size: 9.5, tone: 'violet' }),
        T(200, 86, 'd', { size: 9.5, tone: 'amber' }),
        L(70, 200, 70, 206, { tone: 'dim' }),
        L(170, 200, 170, 206, { tone: 'dim' }),
        L(270, 200, 270, 206, { tone: 'dim' }),
        L(370, 200, 370, 206, { tone: 'dim' }),
        T(70, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(170, 218, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(270, 218, '8', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 218, '12', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(64, 80, 70, 80, { tone: 'dim' }),
        T(56, 84, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(400, 84, 's：有近核小峰', { size: 10, tone: 'mint' }),
        T(400, 108, 'p：被离心势推开', { size: 10, tone: 'violet' }),
        T(400, 132, 'd：更远离核', { size: 10, tone: 'amber' }),
        T(400, 156, '穿透越深，屏蔽越少', { size: 9.5, tone: 'cyan' }),
        T(400, 180, 's 感受的 Z_eff 最大', { size: 9.5, tone: 'muted' }),
        T(400, 204, 'p、d 几乎被屏蔽完', { size: 9.5, tone: 'muted' }),
        T(400, 228, '曲线为示意', { size: 9.5, tone: 'faint' }),
        T(320, 246, '穿透越深，感受的 Z_eff 越大', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 's 电子因此被拉得最低', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '8.7/0-2',
      'Z_eff(r)：从 Z 平滑降到 1',
      '有效核电荷不是常数：近核处看到全部 Z，远离后内层完成屏蔽，只剩 +1；不同 l 的过渡快慢不同。',
      [
        T(320, 24, 'Z_eff(r)：从 Z 平滑降到 1', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 80, w: 320, h: 120 }, { xLabel: 'r', yLabel: 'Z_eff', tone: 'dim' }),
        CURVE((x) => 1 + 2 * Math.exp(-x / 4.2), { x: 80, y: 80, w: 320, h: 120 }, [0, 10], [0, 3.2], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => 1 + 2 * Math.exp(-x / 2.4), { x: 80, y: 80, w: 320, h: 120 }, [0, 10], [0, 3.2], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => 1 + 2 * Math.exp(-x / 1.2), { x: 80, y: 80, w: 320, h: 120 }, [0, 10], [0, 3.2], {
          tone: 'amber',
          weight: 2,
          steps: 140
        }),
        T(214, 132, 's', { size: 9.5, tone: 'mint' }),
        T(214, 148, 'p', { size: 9.5, tone: 'violet' }),
        T(214, 162, 'd', { size: 9.5, tone: 'amber' }),
        L(80, 200, 80, 206, { tone: 'dim' }),
        L(240, 200, 240, 206, { tone: 'dim' }),
        L(400, 200, 400, 206, { tone: 'dim' }),
        T(80, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(240, 218, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 218, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(74, 162, 80, 162, { tone: 'dim' }),
        L(74, 88, 80, 88, { tone: 'dim' }),
        T(66, 166, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(66, 92, '3', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(430, 90, '近核：看到全部 Z', { size: 9.5, tone: 'violet' }),
        T(430, 114, 'r 大：只剩 +1', { size: 9.5, tone: 'amber' }),
        T(430, 138, '屏蔽随 r 逐渐完成', { size: 9.5, tone: 'muted' }),
        T(430, 162, 'l 不同，过渡快慢不同', { size: 9.5, tone: 'cyan' }),
        T(430, 186, '严格求解用自洽场', { size: 9.5, tone: 'muted' }),
        T(430, 210, '屏蔽不是常数', { size: 9.5, tone: 'faint' }),
        T(320, 246, '同一个 Z_eff(r) 概括全部内层效应', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 's 的曲线下降最慢', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.7/1-0',
      '量子缺：把复杂势压成一个参数',
      '把屏蔽与穿透的全部效应压缩进 $\\delta_l$，能级仍写成类氢形式，只把主量子数换成 $n-\\delta_l$。',
      [
        T(320, 24, '量子缺：把复杂势压成一个参数', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 32, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 65, 'E_nl = −13.6 eV / (n − δ_l)²', { size: 11.5, tone: 'text', anchor: 'middle' }),
        T(48, 100, '氢：主量子数 n', { size: 10, tone: 'mint' }),
        L(160, 96, 340, 96, { tone: 'mint', weight: 2.2 }),
        L(160, 92, 160, 100, { tone: 'mint' }),
        L(340, 92, 340, 100, { tone: 'mint' }),
        T(48, 138, '碱金属：n − δ_l', { size: 10, tone: 'violet' }),
        L(160, 134, 280, 134, { tone: 'violet', weight: 2.2 }),
        L(160, 130, 160, 138, { tone: 'violet' }),
        L(280, 130, 280, 138, { tone: 'violet' }),
        A(300, 100, 300, 134, { tone: 'amber', weight: 1.4 }),
        T(308, 120, 'δ_l 修正', { size: 9.5, tone: 'amber' }),
        T(48, 164, '同一 n：δ 越大，能量越低', { size: 9.5, tone: 'muted' }),
        T(48, 186, 'δ_l 随 l 变：s 最大，d 最小', { size: 9.5, tone: 'cyan' }),
        T(48, 208, '4s 与 3d 因此可以直接比较', { size: 9.5, tone: 'amber' }),
        T(400, 108, 'δ 不是常数', { size: 10, tone: 'violet' }),
        T(400, 132, '它随 l 变化', { size: 9.5, tone: 'muted' }),
        T(400, 156, 's 穿透最深', { size: 9.5, tone: 'mint' }),
        T(400, 180, 'δ_s 最大', { size: 9.5, tone: 'mint' }),
        T(400, 204, 'd 几乎不穿透', { size: 9.5, tone: 'amber' }),
        T(320, 238, '原来多体问题 → 一个可查表的参数', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, '仍保留类氢公式的骨架', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 278, 'δ = 0 时回到氢', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.7/1-1',
      'δ_s > δ_p > δ_d：同 n 下 l 小者低',
      '量子缺随 l 递减：s 最大、p 次之、d 最小；同一 n 下 l 越小屏蔽越少，能量越低。',
      [
        T(320, 24, 'δ_s > δ_p > δ_d：同 n 下 l 小者低', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(80, 196, 320, 196, { tone: 'dim' }),
        L(80, 196, 80, 84, { tone: 'dim' }),
        R(96, 94, 160, 20, { tone: 'mint', fill: true, opacity: 0.3, r: 3 }),
        R(96, 132, 96, 20, { tone: 'violet', fill: true, opacity: 0.3, r: 3 }),
        R(96, 170, 48, 20, { tone: 'amber', fill: true, opacity: 0.3, r: 3 }),
        T(266, 108, 'δ_s', { size: 9.5, tone: 'mint' }),
        T(202, 146, 'δ_p', { size: 9.5, tone: 'violet' }),
        T(154, 184, 'δ_d', { size: 9.5, tone: 'amber' }),
        T(80, 214, '同一 n 的三个量子缺', { size: 9.5, tone: 'muted' }),
        ...([
          [176, '4s', 'mint'],
          [140, '4p', 'violet'],
          [112, '4d', 'amber']
        ] as const).flatMap(([y, label, tone]) => LEVEL(400, 510, y, label, { tone, size: 9.5 })),
        A(524, 180, 524, 136, { tone: 'muted', weight: 1.2 }),
        T(394, 84, '能量随 l 升高', { size: 9.5, tone: 'muted' }),
        T(394, 208, 'l 越大，δ 越小', { size: 9.5, tone: 'cyan' }),
        T(394, 228, '能级越高', { size: 9.5, tone: 'faint' }),
        T(320, 250, '同 n 下 l 越小，屏蔽越少，能量越低', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, 'δ_l 把三个能级排成顺序', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '8.7/1-2',
      '4s 低于 3d：钾、钙的填充顺序',
      '在氢原子中 3d 低于 4s；碱金属里 4s 的量子缺远大于 3d，$n-\\delta_l$ 更小，能级顺序被翻转。',
      [
        T(320, 24, '4s 低于 3d：钾、钙的填充顺序', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 270, 200, '① 氢：只认 n', { tone: 'mint' }),
        ...([
          [164, '3d', 'mint'],
          [116, '4s', 'cyan']
        ] as const).flatMap(([y, label, tone]) => LEVEL(48, 250, y, label, { tone, size: 9.5 })),
        T(44, 218, '3d 低于 4s', { size: 9.5, tone: 'mint' }),
        T(44, 236, 'n 小者能量低', { size: 9.5, tone: 'muted' }),
        ...PANEL(312, 44, 300, 200, '② 碱金属：看 n − δ', { tone: 'violet' }),
        ...([
          [164, '4s', 'mint'],
          [116, '3d', 'violet']
        ] as const).flatMap(([y, label, tone]) => LEVEL(332, 540, y, label, { tone, size: 9.5 })),
        T(328, 218, '4s 反而更低', { size: 9.5, tone: 'mint' }),
        T(328, 236, 'δ_s 远大于 δ_d', { size: 9.5, tone: 'amber' }),
        A(300, 160, 300, 120, { tone: 'amber', weight: 1.2 }),
        T(320, 256, '同样是 4s 与 3d，顺序被量子缺翻转', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 274, '钾、钙的基态因此填 4s', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.7/2-0',
      '基态价电子：主峰 + 若干小峰',
      '基态径向概率分布有一个主峰与几个内侧小峰；主峰位置决定原子半径，小峰则暴露了原子实与穿透的痕迹。',
      [
        T(320, 24, '基态价电子：主峰 + 若干小峰', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 80, w: 330, h: 120 }, { xLabel: 'r', yLabel: 'P', tone: 'dim' }),
        CURVE(
          (x) =>
            0.92 * Math.exp(-((x - 7.2) ** 2) / 2.0) +
            0.12 * Math.exp(-((x - 1.9) ** 2) / 0.12) +
            0.16 * Math.exp(-((x - 3.7) ** 2) / 0.25) +
            0.13 * Math.exp(-((x - 5.2) ** 2) / 0.3),
          { x: 70, y: 80, w: 330, h: 120 },
          [0, 12],
          [0, 1.1],
          { tone: 'mint', weight: 2, steps: 180 }
        ),
        DOT(268, 100, { r: 3, tone: 'amber' }),
        T(276, 94, '主峰', { size: 9.5, tone: 'amber' }),
        T(104, 172, '小峰', { size: 9.5, tone: 'cyan' }),
        L(70, 200, 70, 206, { tone: 'dim' }),
        L(235, 200, 235, 206, { tone: 'dim' }),
        L(400, 200, 400, 206, { tone: 'dim' }),
        T(70, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(235, 218, '6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 218, '12', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(64, 80, 70, 80, { tone: 'dim' }),
        T(56, 84, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(420, 88, '主峰定原子半径', { size: 9.5, tone: 'mint' }),
        T(420, 112, '内侧小峰：穿透', { size: 9.5, tone: 'cyan' }),
        T(420, 136, '小峰间接近节点', { size: 9.5, tone: 'violet' }),
        T(420, 160, '主峰面积最大', { size: 9.5, tone: 'muted' }),
        T(420, 184, '峰位随 l 变化', { size: 9.5, tone: 'amber' }),
        T(420, 208, '基态仍有内层结构', { size: 9.5, tone: 'faint' }),
        T(320, 246, '主峰位置就是通常说的原子半径', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '小峰暴露了原子实的痕迹', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '8.7/2-1',
      'n 大：量子缺变淡，回归类氢',
      '$n\\to\\infty$ 时 $\\delta_l/n\\to0$，带量子缺的能级与 $E=-13.6\\,\\mathrm{eV}/n^2$ 逐渐重合，高激发态越来越像氢。',
      [
        T(320, 24, 'n 大：量子缺变淡，回归类氢', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 80, w: 320, h: 120 }, { xLabel: 'n', yLabel: 'E', tone: 'dim' }),
        CURVE((x) => -13.6 / (x * x), { x: 80, y: 80, w: 320, h: 120 }, [5, 14], [-1.2, 0], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => -13.6 / ((x - 1.5) * (x - 1.5)), { x: 80, y: 80, w: 320, h: 120 }, [5, 14], [-1.2, 0], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        T(134, 178, '类氢', { size: 9.5, tone: 'mint' }),
        T(136, 110, '有量子缺', { size: 9.5, tone: 'violet' }),
        L(80, 200, 80, 206, { tone: 'dim' }),
        L(222, 200, 222, 206, { tone: 'dim' }),
        L(400, 200, 400, 206, { tone: 'dim' }),
        T(80, 218, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(222, 218, '9', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 218, '14', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(74, 100, 80, 100, { tone: 'dim' }),
        T(66, 104, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(66, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(430, 90, 'n→∞：δ 相对可忽略', { size: 9.5, tone: 'violet' }),
        T(430, 114, 'n−δ ≈ n', { size: 10, tone: 'amber' }),
        T(430, 138, '两条曲线趋于重合', { size: 9.5, tone: 'muted' }),
        T(430, 162, '极限为 −13.6/n²', { size: 9.5, tone: 'mint' }),
        T(430, 186, '高激发态像氢原子', { size: 9.5, tone: 'cyan' }),
        T(430, 210, '能级越挤越密', { size: 9.5, tone: 'faint' }),
        T(320, 246, 'n 越大，原子实的指纹越淡', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '回到纯库仑的 −13.6/n²', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '8.7/2-2',
      'l → n−1：δ → 0，态接近氢',
      '离心势随 l 增强，把电子推离原子实；屏蔽随之变弱，量子缺递减，$l=n-1$ 时趋于零，态回到氢原子。',
      [
        T(320, 24, 'l → n−1：δ → 0，态接近氢', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 90, y: 80, w: 300, h: 120 }, { xLabel: 'l', yLabel: 'δ_l', tone: 'dim' }),
        CURVE((x) => 0.85 * (1 - x / 4) ** 1.4, { x: 90, y: 80, w: 300, h: 120 }, [0, 4], [0, 1], {
          tone: 'amber',
          weight: 2,
          steps: 120
        }),
        DOT(390, 200, { r: 4, tone: 'mint' }),
        T(350, 186, 'δ→0', { size: 9.5, tone: 'mint', anchor: 'end' }),
        L(90, 200, 90, 206, { tone: 'dim' }),
        L(165, 200, 165, 206, { tone: 'dim' }),
        L(240, 200, 240, 206, { tone: 'dim' }),
        L(315, 200, 315, 206, { tone: 'dim' }),
        L(390, 200, 390, 206, { tone: 'dim' }),
        T(90, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(165, 218, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(240, 218, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(315, 218, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(390, 218, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(84, 84, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(84, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(410, 90, 'l 越大，离心势越强', { size: 9.5, tone: 'violet' }),
        T(410, 118, '电子被推离原子实', { size: 9.5, tone: 'muted' }),
        T(410, 146, '屏蔽变弱，δ 变小', { size: 9.5, tone: 'cyan' }),
        T(410, 174, 'l = n−1 时 δ→0', { size: 9.5, tone: 'mint' }),
        T(410, 202, '圆轨道，无穿透', { size: 9.5, tone: 'amber' }),
        T(410, 226, '态回到氢原子', { size: 9.5, tone: 'faint' }),
        T(320, 246, '离心势是挡板，把电子留在外面', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, 'δ 随 l 递减，直到消失', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '8.7/0-0-f',
      'V_eff：核电荷被内层逐步削弱',
      '$V_{\\mathrm{eff}}(r)=-Z_{\\mathrm{eff}}(r)e^2/(4\\pi\\varepsilon_0r)$：$Z_{\\mathrm{eff}}$ 从近核的 $Z$ 过渡到远场的 $1$，势比纯库仑更浅。',
      [
        T(320, 24, 'V_eff：核电荷被内层逐步削弱', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 64, 'V_eff(r) = −Z_eff(r) e² / (4πε₀ r)', { size: 11.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 96, w: 280, h: 110 }, { xLabel: 'r', yLabel: 'V', tone: 'dim' }),
        CURVE((x) => -1 / x, { x: 70, y: 96, w: 280, h: 110 }, [1, 6], [-2.5, 0], {
          tone: 'amber',
          weight: 2,
          steps: 120
        }),
        CURVE((x) => -1 / x - (2.2 * Math.exp(-x / 1.1)) / x, { x: 70, y: 96, w: 280, h: 110 }, [1, 6], [-2.5, 0], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        T(84, 108, '近核：−Z e²/r', { size: 9.5, tone: 'violet' }),
        T(230, 172, '远场：−e²/r', { size: 9.5, tone: 'amber' }),
        L(70, 206, 70, 212, { tone: 'dim' }),
        L(182, 206, 182, 212, { tone: 'dim' }),
        L(350, 206, 350, 212, { tone: 'dim' }),
        T(70, 224, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(182, 224, '3', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(350, 224, '6', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        L(64, 162, 70, 162, { tone: 'dim' }),
        L(64, 118, 70, 118, { tone: 'dim' }),
        T(56, 166, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(56, 122, '−2', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(376, 92, 'r→0：Z_eff→Z', { size: 9.5, tone: 'violet' }),
        T(376, 116, 'r→∞：Z_eff→1', { size: 9.5, tone: 'amber' }),
        T(376, 140, '屏蔽随 r 逐渐完成', { size: 9.5, tone: 'muted' }),
        T(376, 164, '势比纯库仑更浅', { size: 9.5, tone: 'cyan' }),
        T(376, 188, '束缚能因此变小', { size: 9.5, tone: 'muted' }),
        T(376, 212, 'Z_eff 是函数不是常数', { size: 9.5, tone: 'faint' }),
        T(320, 244, '同一个公式，把多体效应藏进 Z_eff(r)', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '近核看到全部核电荷', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.7/1-0-f',
      'E_nl：主量子数被 δ_l 修正',
      '$E_{nl}=-13.6\\,\\mathrm{eV}/(n-\\delta_l)^2$：$n$ 定壳层，$\\delta_l$ 定屏蔽；$\\delta_l$ 越大分母越小，能级越深，$\\delta_l=0$ 回到氢。',
      [
        T(320, 24, 'E_nl：主量子数被 δ_l 修正', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_nl = −13.6 eV / (n − δ_l)²', { size: 11.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 80, w: 300, h: 120 }, { xLabel: 'δ_l', yLabel: 'E', tone: 'dim' }),
        CURVE((x) => -13.6 / ((3 - x) * (3 - x)), { x: 70, y: 80, w: 300, h: 120 }, [0, 2], [-14, 0], {
          tone: 'amber',
          weight: 2,
          steps: 140
        }),
        DOT(70, 187, { r: 4, tone: 'mint' }),
        T(80, 180, 'δ=0：氢', { size: 9.5, tone: 'mint' }),
        L(70, 200, 70, 206, { tone: 'dim' }),
        L(220, 200, 220, 206, { tone: 'dim' }),
        L(370, 200, 370, 206, { tone: 'dim' }),
        T(70, 218, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(220, 218, '1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(370, 218, '2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(64, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 88, '−13.6', { size: 9.5, tone: 'muted', anchor: 'end' }),
        L(64, 84, 70, 84, { tone: 'dim' }),
        T(390, 96, 'δ_l 越大，能级越深', { size: 9.5, tone: 'violet' }),
        T(390, 120, 'n 固定时 δ 是唯一修正', { size: 9.5, tone: 'muted' }),
        T(390, 144, 'δ 由 l 决定：s 最大', { size: 9.5, tone: 'mint' }),
        T(390, 168, 'δ=0 回到 −13.6/n²', { size: 9.5, tone: 'amber' }),
        T(390, 192, '分母变小，束缚更深', { size: 9.5, tone: 'cyan' }),
        T(390, 216, '能量仍旧离散', { size: 9.5, tone: 'faint' }),
        T(320, 246, 'δ_l 只动分母，不动公式的形状', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '类氢骨架 + 一个经验参数', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.7/1-1-f',
      '4s < 3d：比较 n − δ_l',
      '$E_{4s}<E_{3d}$（钾、钙）：4s 的 $\\delta_s$ 大、$n-\\delta_l$ 小，分母小则能量更低；3d 的 $\\delta_d$ 小，反而更高。',
      [
        T(320, 24, '4s < 3d：比较 n − δ_l', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'amber', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_4s < E_3d　（钾、钙）', { size: 11.5, tone: 'text', anchor: 'middle' }),
        L(70, 200, 300, 200, { tone: 'dim' }),
        L(70, 200, 70, 92, { tone: 'dim' }),
        R(100, 108, 70, 24, { tone: 'mint', fill: true, opacity: 0.3, r: 4 }),
        R(100, 154, 150, 24, { tone: 'violet', fill: true, opacity: 0.3, r: 4 }),
        T(180, 124, '4s：n−δ 小', { size: 9.5, tone: 'mint' }),
        T(258, 170, '3d：n−δ 大', { size: 9.5, tone: 'violet' }),
        T(70, 220, '比的是有效主量子数', { size: 9.5, tone: 'muted' }),
        ...([
          [180, '4s', 'mint'],
          [130, '3d', 'violet']
        ] as const).flatMap(([y, label, tone]) => LEVEL(380, 500, y, label, { tone, size: 9.5 })),
        A(516, 184, 516, 126, { tone: 'muted', weight: 1.2 }),
        T(380, 84, '分母越大，|E| 越小', { size: 9.5, tone: 'muted' }),
        T(380, 210, '4s 更负，能量更低', { size: 9.5, tone: 'mint' }),
        T(380, 230, '钾、钙基态填 4s', { size: 9.5, tone: 'amber' }),
        T(320, 252, '同一条公式，两个不同的分母', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '能级顺序由 n−δ 翻转', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.7/2-0-f',
      '高激发：n→∞，回到类氢',
      '$\\lim_{n\\to\\infty}E_{nl}\\to-13.6\\,\\mathrm{eV}/n^2$：$\\delta_l$ 固定而 $n$ 变大，$\\delta_l/n\\to0$，修正项被稀释。',
      [
        T(320, 24, '高激发：n→∞，回到类氢', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'cyan', opacity: 0.14, r: 5 }),
        T(320, 64, 'n→∞：E_nl → −13.6 eV / n²', { size: 11.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 80, w: 320, h: 120 }, { xLabel: 'n', yLabel: 'E', tone: 'dim' }),
        CURVE((x) => -13.6 / (x * x), { x: 80, y: 80, w: 320, h: 120 }, [5, 14], [-1, 0], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => -13.6 / ((x - 0.9) * (x - 0.9)), { x: 80, y: 80, w: 320, h: 120 }, [5, 14], [-1, 0], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        T(122, 162, '类氢', { size: 9.5, tone: 'mint' }),
        T(122, 120, '有量子缺', { size: 9.5, tone: 'violet' }),
        L(80, 200, 80, 206, { tone: 'dim' }),
        L(222, 200, 222, 206, { tone: 'dim' }),
        L(400, 200, 400, 206, { tone: 'dim' }),
        T(80, 218, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(222, 218, '9', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 218, '14', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(74, 204, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(74, 104, '−1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        L(74, 100, 80, 100, { tone: 'dim' }),
        T(430, 92, 'δ 固定，n 变大', { size: 9.5, tone: 'violet' }),
        T(430, 116, 'δ/n → 0：修正变淡', { size: 9.5, tone: 'cyan' }),
        T(430, 140, 'n−δ ≈ n', { size: 10, tone: 'amber' }),
        T(430, 164, '极限为 −13.6/n²', { size: 9.5, tone: 'mint' }),
        T(430, 188, '能级差 ∝ 1/n³', { size: 9.5, tone: 'muted' }),
        T(430, 212, '高 n 态近氢', { size: 9.5, tone: 'faint' }),
        T(320, 246, 'n 是大数时，δ 只占分母的一小截', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 268, '极限回到纯库仑谱', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
