import { fig, T, R, BAND, L, A, C, DOT, AXIS, CURVE, LEVEL, PANEL } from '../kit'
import type { SectionFigureSet } from '../types'

const set: SectionFigureSet = {
  overview: fig(
    '8.6/overview',
    '硬球势阱：零点表就是能级表',
    '$j_l(ka)=0$ 把 $k$ 筛成离散值，$E=\\hbar^2k^2/2m$；$l=0$ 回到一维势阱。',
    [
      T(320, 24, '硬球势阱：零点表就是能级表', { size: 13, tone: 'text', anchor: 'middle' }),
      ...PANEL(28, 44, 186, 190, '① 硬球 V(r)', { tone: 'danger' }),
      L(44, 196, 198, 196, { tone: 'dim' }),
      L(44, 196, 44, 84, { tone: 'dim' }),
      BAND(44, 176, 106, 20, { tone: 'mint', opacity: 0.14, r: 4 }),
      L(44, 176, 150, 176, { tone: 'mint', weight: 2 }),
      A(150, 176, 150, 88, { tone: 'danger', dash: true }),
      T(60, 166, 'V = 0', { size: 9.5, tone: 'mint' }),
      T(158, 90, 'V→∞', { size: 9.5, tone: 'danger' }),
      T(150, 212, 'r=a', { size: 9.5, tone: 'amber', anchor: 'middle' }),
      T(44, 226, '球内自由，球外为零', { size: 9.5, tone: 'muted' }),
      ...PANEL(220, 44, 186, 190, '② j_l(ka)=0', { tone: 'violet' }),
      CURVE((x) => Math.sin(x) / x, { x: 244, y: 94, w: 148, h: 96 }, [0.05, 10], [-0.4, 1.05], {
        tone: 'mint',
        weight: 2,
        steps: 160
      }),
      L(290, 100, 290, 190, { tone: 'violet', dash: true }),
      L(337, 100, 337, 190, { tone: 'violet', dash: true }),
      T(248, 88, 'j₀', { size: 9.5, tone: 'mint' }),
      T(290, 204, 'π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(337, 204, '2π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
      T(244, 222, '零点：k 只能取离散值', { size: 9.5, tone: 'muted' }),
      ...PANEL(412, 44, 186, 190, '③ E ∝ k²', { tone: 'amber' }),
      ...([
        [190, '1s', 'mint'],
        [156, '2s', 'mint'],
        [130, '3s', 'mint'],
        [174, '1p', 'violet'],
        [138, '2p', 'violet'],
        [112, '3p', 'violet']
      ] as const).flatMap(([y, label, tone]) => LEVEL(430, 520, y, label, { tone, size: 9.5 })),
      T(424, 222, '同一 n：p 高于 s', { size: 9.5, tone: 'muted' }),
      T(320, 252, '球内自由，球面定为零点', { size: 10.5, tone: 'muted', anchor: 'middle' }),
      T(320, 274, '零点表决定能级：E ∝ k²', { size: 10, tone: 'faint', anchor: 'middle' })
    ]
  ),
  paragraphs: {
    '0-0': fig(
      '8.6/0-0',
      '硬球：球内自由，球面为零',
      '球内 $V=0$，球外 $V=\\infty$；连续性要求球面上 $\\psi=0$。',
      [
        T(320, 24, '硬球：球内自由，球面为零', { size: 12.5, tone: 'text', anchor: 'middle' }),
        C(170, 150, 70, { tone: 'mint', fill: true, opacity: 0.10 }),
        C(170, 150, 70, { tone: 'amber', dash: true }),
        DOT(240, 150, { r: 3, tone: 'amber' }),
        A(170, 150, 240, 150, { tone: 'dim' }),
        T(205, 142, 'a', { size: 9.5, tone: 'amber' }),
        T(170, 136, 'V = 0', { size: 11, tone: 'mint', anchor: 'middle' }),
        T(170, 160, '自由粒子', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(300, 104, '球内：V = 0，自由粒子', { size: 10, tone: 'mint' }),
        T(300, 128, '球外：V = ∞，ψ = 0', { size: 10, tone: 'danger' }),
        T(300, 152, '连续性要求球面 ψ = 0', { size: 10, tone: 'amber' }),
        T(300, 176, '边界条件筛掉连续 k', { size: 9.5, tone: 'cyan' }),
        T(300, 200, '球形势阱是可解模型', { size: 9.5, tone: 'muted' }),
        T(320, 232, '球内方程自由，球面条件严苛', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 254, '一个边界，把连续谱切成离散谱', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '半径 a 是唯一的尺度', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.6/0-1',
      '球贝塞尔方程与正则解',
      '$V=0$ 时径向方程化为球贝塞尔方程，原点有限的解是 $j_l(kr)$，第二个解在原点发散。',
      [
        T(320, 24, '球贝塞尔方程与正则解', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(40, 44, 560, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'j_l″ + (2/r)j_l′ + [k² − l(l+1)/r²] j_l = 0', { size: 10.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 92, w: 320, h: 106 }, { xLabel: 'kr', yLabel: 'j_l', tone: 'dim' }),
        CURVE((x) => Math.sin(x) / x, { x: 70, y: 92, w: 320, h: 106 }, [0.05, 10], [-0.35, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        CURVE((x) => Math.sin(x) / (x * x) - Math.cos(x) / x, { x: 70, y: 92, w: 320, h: 106 }, [0.05, 10], [-0.35, 1.05], {
          tone: 'violet',
          weight: 2,
          steps: 180
        }),
        CURVE((x) => (3 / (x * x * x) - 1 / x) * Math.sin(x) - (3 / (x * x)) * Math.cos(x), { x: 70, y: 92, w: 320, h: 106 }, [0.05, 10], [-0.35, 1.05], {
          tone: 'amber',
          weight: 2,
          steps: 180
        }),
        T(80, 86, 'j₀', { size: 9.5, tone: 'mint' }),
        T(176, 136, 'j₁', { size: 9.5, tone: 'violet' }),
        T(252, 146, 'j₂', { size: 9.5, tone: 'amber' }),
        T(70, 214, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(198, 214, '4', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(326, 214, '8', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(390, 214, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(64, 172, '0', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(64, 96, '1', { size: 9.5, tone: 'muted', anchor: 'end' }),
        T(430, 100, '正则解：原点有限', { size: 10, tone: 'mint' }),
        T(430, 124, 'j₀(0) = 1', { size: 9.5, tone: 'mint' }),
        T(430, 148, 'j_l(0) = 0（l > 0）', { size: 9.5, tone: 'violet' }),
        T(430, 172, 'r→0：j_l ∝ r^l', { size: 9.5, tone: 'amber' }),
        T(430, 196, 'r→∞：正弦衰减', { size: 9.5, tone: 'cyan' }),
        T(430, 220, '第二解在原点发散，舍去', { size: 9.5, tone: 'danger' }),
        T(320, 244, 'V=0 时径向方程就是球贝塞尔方程', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, '原点有限挑出正则解 j_l(kr)', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-2': fig(
      '8.6/0-2',
      'j_l(ka)=0：连续 k 变离散',
      '边界条件 $j_l(ka)=0$ 把连续的 $k$ 切成离散值，每个零点对应一个能级。',
      [
        T(320, 24, 'j_l(ka)=0：连续 k 变离散', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 80, y: 80, w: 380, h: 118 }, { xLabel: 'kr', yLabel: 'j₀', tone: 'dim' }),
        CURVE((x) => Math.sin(x) / x, { x: 80, y: 80, w: 380, h: 118 }, [0.05, 10], [-0.4, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        L(199, 100, 199, 196, { tone: 'violet', dash: true }),
        L(319, 100, 319, 196, { tone: 'violet', dash: true }),
        L(438, 100, 438, 196, { tone: 'violet', dash: true }),
        DOT(199, 165, { r: 3.2, tone: 'violet' }),
        DOT(319, 165, { r: 3.2, tone: 'violet' }),
        DOT(438, 165, { r: 3.2, tone: 'violet' }),
        T(199, 92, 'π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(319, 92, '2π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(438, 92, '3π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(199, 224, 'k₁', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(319, 224, 'k₂', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(438, 224, 'k₃', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(484, 104, '边界：j₀(ka)=0', { size: 10, tone: 'amber' }),
        T(484, 128, '零点：ka = π, 2π, …', { size: 9.5, tone: 'violet' }),
        T(484, 152, 'k_n = nπ/a', { size: 9.5, tone: 'mint' }),
        T(484, 176, '每个零点一个能级', { size: 9.5, tone: 'cyan' }),
        T(484, 200, '零点间距 → π', { size: 9.5, tone: 'muted' }),
        T(484, 224, 'k 越大，E 越高', { size: 9.5, tone: 'faint' }),
        T(320, 244, '连续参数被边界条件切成离散值', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 266, 'k_n 是零点乘以 1/a', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.6/1-0',
      'l=0：球势阱里的弦',
      '$l=0$ 时 $u=rR$ 满足 $u^{\\prime\\prime}+k^2u=0$，解为 $\\sin(kr)$。',
      [
        T(320, 24, 'l=0：球势阱里的弦', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 286, 180, '① 径向：u = sin(kr)', { tone: 'mint' }),
        L(44, 196, 300, 196, { tone: 'dim' }),
        L(44, 196, 44, 100, { tone: 'dim' }),
        CURVE((x) => Math.sin(Math.PI * x), { x: 44, y: 100, w: 256, h: 96 }, [0, 1], [-1.1, 1.1], {
          tone: 'mint',
          weight: 2,
          steps: 120
        }),
        CURVE((x) => Math.sin(2 * Math.PI * x), { x: 44, y: 100, w: 256, h: 96 }, [0, 1], [-1.1, 1.1], {
          tone: 'violet',
          weight: 1.8,
          dash: true,
          steps: 160
        }),
        DOT(44, 148, { r: 3, tone: 'amber' }),
        DOT(300, 148, { r: 3, tone: 'amber' }),
        T(50, 210, 'u(0) = 0', { size: 9.5, tone: 'amber' }),
        T(292, 210, 'u(a) = 0', { size: 9.5, tone: 'amber', anchor: 'end' }),
        T(340, 84, 'l=0：离心项消失', { size: 10, tone: 'mint' }),
        T(340, 108, 'u″ + k²u = 0', { size: 10, tone: 'text' }),
        T(340, 132, '解：sin(kr)', { size: 9.5, tone: 'violet' }),
        T(340, 156, 'u(0)=0 自动满足', { size: 9.5, tone: 'muted' }),
        T(340, 180, 'u(a)=0 ⇒ sin(ka)=0', { size: 9.5, tone: 'amber' }),
        T(340, 204, '只剩径向驻波', { size: 9.5, tone: 'cyan' }),
        T(340, 228, '没有角向节点', { size: 9.5, tone: 'faint' }),
        T(320, 252, '三维 s 态退化成一根弦', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '两端固定，中间可以有一个峰', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.6/1-1',
      '边界 u(a)=0：k a = nπ',
      '边界 $u(a)=0$ 给出 $\\sin(ka)=0$，于是 $k_na=n\\pi$，$n$ 是弦上的半波数。',
      [
        T(320, 24, '边界 u(a)=0：k a = nπ', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 80, w: 360, h: 120 }, { xLabel: 'r/a', yLabel: 'u', tone: 'dim' }),
        L(70, 140, 430, 140, { tone: 'faint', dash: true }),
        CURVE((x) => Math.sin(Math.PI * x), { x: 70, y: 80, w: 360, h: 120 }, [0, 1], [-1.1, 1.1], {
          tone: 'mint',
          weight: 2,
          steps: 120
        }),
        CURVE((x) => Math.sin(2 * Math.PI * x), { x: 70, y: 80, w: 360, h: 120 }, [0, 1], [-1.1, 1.1], {
          tone: 'violet',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => Math.sin(3 * Math.PI * x), { x: 70, y: 80, w: 360, h: 120 }, [0, 1], [-1.1, 1.1], {
          tone: 'amber',
          weight: 2,
          steps: 200
        }),
        DOT(430, 140, { r: 3.5, tone: 'amber' }),
        T(254, 86, 'n=1', { size: 9.5, tone: 'mint' }),
        T(136, 86, 'n=2', { size: 9.5, tone: 'violet' }),
        T(96, 86, 'n=3', { size: 9.5, tone: 'amber' }),
        T(70, 208, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(250, 208, '0.5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(430, 208, 'a', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(462, 100, 'n = 1, 2, 3, …', { size: 10, tone: 'mint' }),
        T(462, 124, 'k_n a = nπ', { size: 10, tone: 'violet' }),
        T(462, 148, 'k_n = nπ / a', { size: 9.5, tone: 'cyan' }),
        T(462, 172, 'λ_n = 2a/n', { size: 9.5, tone: 'amber' }),
        T(462, 196, 'n 越大，波长越短', { size: 9.5, tone: 'muted' }),
        T(462, 220, 'n−1 个内部节点', { size: 9.5, tone: 'faint' }),
        T(320, 240, '所有曲线都在 r=a 处归零', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 262, 'n 是弦上的半波个数', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '边界条件把 k 锁成 nπ/a', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '8.6/1-2',
      '能级 E_n ∝ n²：越往上越稀',
      '$E_n=n^2\\pi^2\\hbar^2/2ma^2$：能级比 $1:4:9:\\dots$，间隔随 $n$ 增大。',
      [
        T(320, 24, '能级 E_n ∝ n²：越往上越稀', { size: 12.5, tone: 'text', anchor: 'middle' }),
        L(88, 236, 88, 70, { tone: 'dim' }),
        A(88, 82, 88, 66, { tone: 'dim' }),
        T(80, 60, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...([
          [221, 'E₁', 'mint'],
          [194, '4E₁', 'cyan'],
          [149, '9E₁', 'violet'],
          [86, '16E₁', 'amber']
        ] as const).flatMap(([y, label, tone]) => LEVEL(100, 300, y, label, { tone, size: 10 })),
        T(360, 94, 'E₁ = π²ħ² / (2ma²)', { size: 10, tone: 'mint' }),
        T(360, 118, '能级比：1 : 4 : 9 : 16', { size: 9.5, tone: 'violet' }),
        T(360, 142, '间隔随 n 增大', { size: 9.5, tone: 'amber' }),
        T(360, 166, 'a→0：E₁→∞', { size: 9.5, tone: 'cyan' }),
        T(360, 190, 'a→∞：能级连成连续谱', { size: 9.5, tone: 'muted' }),
        T(360, 214, 'n=1 是零点态', { size: 9.5, tone: 'faint' }),
        T(320, 248, 'n² 让高能级迅速拉远', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '能量尺度由 1/a² 决定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.6/2-0',
      'l>0：零点要查表',
      '$l>0$ 的 $j_l(ka)=0$ 没有简单解析式，零点需要数值表或渐近公式。',
      [
        T(320, 24, 'l>0：零点要查表', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 84, w: 330, h: 112 }, { xLabel: 'kr', yLabel: 'j_l', tone: 'dim' }),
        CURVE((x) => Math.sin(x) / (x * x) - Math.cos(x) / x, { x: 70, y: 84, w: 330, h: 112 }, [0.05, 10], [-0.3, 0.45], {
          tone: 'violet',
          weight: 2,
          steps: 180
        }),
        CURVE((x) => (3 / (x * x * x) - 1 / x) * Math.sin(x) - (3 / (x * x)) * Math.cos(x), { x: 70, y: 84, w: 330, h: 112 }, [0.05, 10], [-0.3, 0.45], {
          tone: 'amber',
          weight: 2,
          steps: 180
        }),
        DOT(218, 151, { r: 3.2, tone: 'violet' }),
        DOT(325, 151, { r: 3.2, tone: 'violet' }),
        DOT(260, 151, { r: 3.2, tone: 'amber' }),
        DOT(370, 151, { r: 3.2, tone: 'amber' }),
        T(120, 94, 'j₁', { size: 9.5, tone: 'violet' }),
        T(150, 112, 'j₂', { size: 9.5, tone: 'amber' }),
        T(70, 212, '0', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(235, 212, '5', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(400, 212, '10', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(430, 100, 'l=0：ka = π, 2π, …', { size: 9.5, tone: 'mint' }),
        T(430, 124, 'l=1：4.49, 7.73, …', { size: 9.5, tone: 'violet' }),
        T(430, 148, 'l=2：5.76, 9.10, …', { size: 9.5, tone: 'amber' }),
        T(430, 172, '无简单解析式', { size: 9.5, tone: 'muted' }),
        T(430, 196, '高阶零点 ≈ (n+l/2)π', { size: 9.5, tone: 'cyan' }),
        T(430, 220, 'l 越大，首个零点越远', { size: 9.5, tone: 'faint' }),
        T(320, 242, '零点只能数值求或查表', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 264, '每个零点对应一个 (n,l) 能级', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-1': fig(
      '8.6/2-1',
      '离心项：球心的软墙',
      '离心项 $l(l+1)\\hbar^2/2mr^2$ 正定，把波函数推离原点，并抬高同一序号的能级。',
      [
        T(320, 24, '离心项：球心的软墙', { size: 12.5, tone: 'text', anchor: 'middle' }),
        ...PANEL(28, 44, 300, 180, '① 波函数在球心被压低', { tone: 'mint' }),
        L(44, 184, 312, 184, { tone: 'dim' }),
        L(44, 184, 44, 88, { tone: 'dim' }),
        CURVE((x) => Math.sin(x) / x, { x: 44, y: 88, w: 268, h: 96 }, [0.05, 4], [-0.22, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => Math.sin(x) / (x * x) - Math.cos(x) / x, { x: 44, y: 88, w: 268, h: 96 }, [0.05, 4], [-0.22, 1.05], {
          tone: 'violet',
          weight: 2,
          steps: 140
        }),
        CURVE((x) => (3 / (x * x * x) - 1 / x) * Math.sin(x) - (3 / (x * x)) * Math.cos(x), { x: 44, y: 88, w: 268, h: 96 }, [0.05, 4], [-0.22, 1.05], {
          tone: 'amber',
          weight: 2,
          steps: 140
        }),
        T(50, 82, 'l=0', { size: 9.5, tone: 'mint' }),
        T(110, 104, 'l=1', { size: 9.5, tone: 'violet' }),
        T(150, 126, 'l=2', { size: 9.5, tone: 'amber' }),
        T(44, 214, 'l=0 在原点不为零', { size: 9.5, tone: 'mint' }),
        T(346, 88, '同一零点序号：l 越大越高', { size: 10.5, tone: 'violet' }),
        ...([
          [220, '1s', 'mint'],
          [186, '2s', 'mint'],
          [158, '3s', 'mint'],
          [206, '1p', 'violet'],
          [172, '2p', 'violet'],
          [144, '3p', 'violet']
        ] as const).flatMap(([y, label, tone]) => LEVEL(346, 470, y, label, { tone, size: 9.5 })),
        T(346, 242, '离心项正定，零点整体上移', { size: 9.5, tone: 'muted' }),
        T(320, 266, '同一 n：l 越大，能量越高', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-2': fig(
      '8.6/2-2',
      '每个能级 2l+1 重简并',
      '每个 $(n,l)$ 有 $2l+1$ 重简并；计入自旋后容量为 $2(2l+1)$。',
      [
        T(320, 24, '每个能级 2l+1 重简并', { size: 12.5, tone: 'text', anchor: 'middle' }),
        T(140, 84, 'm = −l … +l', { size: 9.5, tone: 'muted' }),
        T(300, 84, '2l+1', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(440, 84, '×2', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        T(44, 112, 'l = 0', { size: 9.5, tone: 'mint' }),
        R(140, 105, 12, 14, { tone: 'mint', fill: true, opacity: 0.22, r: 2 }),
        T(300, 112, '1', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(440, 112, '2', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(44, 142, 'l = 1', { size: 9.5, tone: 'violet' }),
        R(140, 135, 12, 14, { tone: 'violet', fill: true, opacity: 0.22, r: 2 }),
        R(158, 135, 12, 14, { tone: 'violet', fill: true, opacity: 0.22, r: 2 }),
        R(176, 135, 12, 14, { tone: 'violet', fill: true, opacity: 0.22, r: 2 }),
        T(300, 142, '3', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(440, 142, '6', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(44, 172, 'l = 2', { size: 9.5, tone: 'amber' }),
        R(140, 165, 12, 14, { tone: 'amber', fill: true, opacity: 0.22, r: 2 }),
        R(158, 165, 12, 14, { tone: 'amber', fill: true, opacity: 0.22, r: 2 }),
        R(176, 165, 12, 14, { tone: 'amber', fill: true, opacity: 0.22, r: 2 }),
        R(194, 165, 12, 14, { tone: 'amber', fill: true, opacity: 0.22, r: 2 }),
        R(212, 165, 12, 14, { tone: 'amber', fill: true, opacity: 0.22, r: 2 }),
        T(300, 172, '5', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(440, 172, '10', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(44, 202, 'l = 3', { size: 9.5, tone: 'cyan' }),
        R(140, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        R(158, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        R(176, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        R(194, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        R(212, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        R(230, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        R(248, 195, 12, 14, { tone: 'cyan', fill: true, opacity: 0.22, r: 2 }),
        T(300, 202, '7', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(440, 202, '14', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 240, '简并来自球对称', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, 'm 与自旋都不进能量', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '壳层填充顺序由此展开', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    )
  },
  formulas: {
    '0-0': fig(
      '8.6/0-0-f',
      '球贝塞尔方程的三项',
      '$j_l$ 的球贝塞尔方程：$k^2$ 管振荡，离心项 $\\propto l(l+1)/r^2$ 管近核。',
      [
        T(320, 24, '球贝塞尔方程的三项', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'j_l″ + (2/r)j_l′ + [k² − l(l+1)/r²] j_l = 0', { size: 10, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 96, w: 250, h: 100 }, { xLabel: 'kr', yLabel: 'j_l', tone: 'dim' }),
        CURVE((x) => Math.sin(x) / x, { x: 60, y: 96, w: 250, h: 100 }, [0.05, 10], [-0.22, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        CURVE((x) => Math.sin(x) / (x * x) - Math.cos(x) / x, { x: 60, y: 96, w: 250, h: 100 }, [0.05, 10], [-0.22, 1.05], {
          tone: 'violet',
          weight: 1.8,
          steps: 180
        }),
        T(70, 90, 'j₀', { size: 9.5, tone: 'mint' }),
        T(130, 132, 'j₁', { size: 9.5, tone: 'violet' }),
        T(340, 100, 'k²：球内能量项', { size: 10, tone: 'mint' }),
        T(340, 124, 'l(l+1)/r²：离心项', { size: 10, tone: 'violet' }),
        T(340, 148, '2/r j_l′：球坐标几何项', { size: 10, tone: 'amber' }),
        T(340, 172, 'r→0：j_l ∝ r^l', { size: 9.5, tone: 'cyan' }),
        T(340, 196, 'r→∞：正弦衰减', { size: 9.5, tone: 'muted' }),
        T(340, 220, 'l=0：方程化为正弦', { size: 9.5, tone: 'faint' }),
        T(320, 248, '曲率由 k² 定，离心项只管近核', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 270, '原点有限把解筛成 j_l', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '0-1': fig(
      '8.6/0-1-f',
      'j_l(ka)=0：边界定零点',
      '$j_l(ka)=0$ 定义零点 $\\alpha_{nl}$，$k_{nl}=\\alpha_{nl}/a$。',
      [
        T(320, 24, 'j_l(ka)=0：边界定零点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'amber', opacity: 0.14, r: 5 }),
        T(320, 64, 'j_l(k a) = 0', { size: 11, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 60, y: 92, w: 300, h: 104 }, { xLabel: 'kr', yLabel: 'j₀', tone: 'dim' }),
        CURVE((x) => Math.sin(x) / x, { x: 60, y: 92, w: 300, h: 104 }, [0.05, 10], [-0.4, 1.05], {
          tone: 'mint',
          weight: 2,
          steps: 180
        }),
        L(154, 104, 154, 192, { tone: 'violet', dash: true }),
        L(249, 104, 249, 192, { tone: 'violet', dash: true }),
        L(343, 104, 343, 192, { tone: 'violet', dash: true }),
        DOT(154, 167, { r: 3.2, tone: 'violet' }),
        DOT(249, 167, { r: 3.2, tone: 'violet' }),
        DOT(343, 167, { r: 3.2, tone: 'violet' }),
        T(154, 96, 'π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(249, 96, '2π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(343, 96, '3π', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(390, 100, 'ka 无量纲', { size: 10, tone: 'muted' }),
        T(390, 124, '零点 α：k = α / a', { size: 9.5, tone: 'mint' }),
        T(390, 148, 'l=0：α = nπ', { size: 9.5, tone: 'violet' }),
        T(390, 172, 'l>0：α 更大', { size: 9.5, tone: 'amber' }),
        T(390, 196, 'a 越大：k 越小', { size: 9.5, tone: 'cyan' }),
        T(390, 220, 'a→∞：k 连续', { size: 9.5, tone: 'muted' }),
        T(390, 244, 'a→0：E→∞', { size: 9.5, tone: 'danger' }),
        T(320, 262, 'k_nl = α_nl / a，α 由 l 与序号定', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-0': fig(
      '8.6/1-0-f',
      'u = sin(kr)：一根两端固定的弦',
      '$l=0$：$u=rR$ 满足 $u^{\\prime\\prime}+k^2u=0$，解为 $\\sin(kr)$。',
      [
        T(320, 24, 'u = sin(kr)：一根两端固定的弦', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'mint', opacity: 0.14, r: 5 }),
        T(320, 64, 'u(r) = sin(kr)，l = 0', { size: 11, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 94, w: 360, h: 100 }, { xLabel: 'r/a', yLabel: 'u', tone: 'dim' }),
        CURVE((x) => Math.sin(Math.PI * x), { x: 70, y: 94, w: 360, h: 100 }, [0, 1], [-1.1, 1.1], {
          tone: 'mint',
          weight: 2,
          steps: 120
        }),
        CURVE((x) => Math.sin(2 * Math.PI * x), { x: 70, y: 94, w: 360, h: 100 }, [0, 1], [-1.1, 1.1], {
          tone: 'violet',
          weight: 1.8,
          dash: true,
          steps: 160
        }),
        DOT(70, 144, { r: 3, tone: 'amber' }),
        DOT(430, 144, { r: 3, tone: 'amber' }),
        T(462, 104, 'u = rR：去掉 r 因子', { size: 9.5, tone: 'muted' }),
        T(462, 128, 'u(0)=0 自动满足', { size: 9.5, tone: 'mint' }),
        T(462, 152, 'u(a)=0：sin(ka)=0', { size: 9.5, tone: 'amber' }),
        T(462, 176, '振幅由归一化定', { size: 9.5, tone: 'cyan' }),
        T(462, 200, '边界前 k 连续', { size: 9.5, tone: 'violet' }),
        T(462, 224, 'k 可为任意正值', { size: 9.5, tone: 'faint' }),
        T(320, 236, 'l=0 的径向方程没有离心项', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 258, '解就是一根弦的驻波', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, '两端为零，中间自由', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-1': fig(
      '8.6/1-1-f',
      'k_n a = nπ：半波数就是 n',
      '$k_na=n\\pi$：$n$ 决定半波数，$k_n=n\\pi/a$，$\\lambda_n=2a/n$。',
      [
        T(320, 24, 'k_n a = nπ：半波数就是 n', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'k_n a = nπ，n = 1, 2, 3, …', { size: 11, tone: 'text', anchor: 'middle' }),
        ...AXIS({ x: 70, y: 94, w: 340, h: 100 }, { xLabel: 'r/a', yLabel: 'u', tone: 'dim' }),
        L(70, 144, 410, 144, { tone: 'faint', dash: true }),
        CURVE((x) => Math.sin(Math.PI * x), { x: 70, y: 94, w: 340, h: 100 }, [0, 1], [-1.1, 1.1], {
          tone: 'mint',
          weight: 2,
          steps: 120
        }),
        CURVE((x) => Math.sin(2 * Math.PI * x), { x: 70, y: 94, w: 340, h: 100 }, [0, 1], [-1.1, 1.1], {
          tone: 'violet',
          weight: 2,
          steps: 160
        }),
        CURVE((x) => Math.sin(3 * Math.PI * x), { x: 70, y: 94, w: 340, h: 100 }, [0, 1], [-1.1, 1.1], {
          tone: 'amber',
          weight: 2,
          steps: 200
        }),
        DOT(410, 144, { r: 3.5, tone: 'amber' }),
        T(446, 104, 'n=1', { size: 9.5, tone: 'mint' }),
        T(446, 128, 'n=2', { size: 9.5, tone: 'violet' }),
        T(446, 152, 'n=3', { size: 9.5, tone: 'amber' }),
        T(446, 178, 'k_n = nπ / a', { size: 9.5, tone: 'cyan' }),
        T(446, 202, 'λ_n = 2a / n', { size: 9.5, tone: 'muted' }),
        T(446, 226, 'n−1 个内部节点', { size: 9.5, tone: 'faint' }),
        T(320, 238, '边界 u(a)=0 给出 sin(ka)=0', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 260, 'ka 必须是 π 的整数倍', { size: 10, tone: 'faint', anchor: 'middle' }),
        T(320, 274, 'n 就是弦上的半波数', { size: 9.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '1-2': fig(
      '8.6/1-2-f',
      'E_n = n²π²ħ²/2ma²：平方阶梯',
      '$E_n=n^2\\pi^2\\hbar^2/2ma^2$：$n^2$ 决定阶梯，$1/a^2$ 决定整体高度。',
      [
        T(320, 24, 'E_n = n²π²ħ²/2ma²：平方阶梯', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'amber', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_n = n² π² ħ² / (2 m a²)', { size: 11, tone: 'text', anchor: 'middle' }),
        L(108, 234, 108, 70, { tone: 'dim' }),
        A(108, 82, 108, 66, { tone: 'dim' }),
        T(100, 60, 'E', { size: 9.5, tone: 'dim', anchor: 'end' }),
        ...([
          [221, 'E₁', 'mint'],
          [194, '4E₁', 'cyan'],
          [149, '9E₁', 'violet'],
          [86, '16E₁', 'amber']
        ] as const).flatMap(([y, label, tone]) => LEVEL(100, 320, y, label, { tone, size: 10 })),
        T(380, 100, 'n = 1,2,3,…：能级序号', { size: 9.5, tone: 'muted' }),
        T(380, 124, 'E₁ = π²ħ²/(2ma²)', { size: 10, tone: 'mint' }),
        T(380, 148, '比值 1 : 4 : 9 : 16', { size: 9.5, tone: 'violet' }),
        T(380, 172, '间隔 3E₁, 5E₁, 7E₁', { size: 9.5, tone: 'amber' }),
        T(380, 196, 'a→0：E₁→∞', { size: 9.5, tone: 'cyan' }),
        T(380, 220, 'a→∞：能级连续', { size: 9.5, tone: 'muted' }),
        T(380, 244, 'n→∞：E→∞', { size: 9.5, tone: 'faint' }),
        T(320, 250, 'n² 让高能级迅速拉开', { size: 10.5, tone: 'muted', anchor: 'middle' }),
        T(320, 272, '1/a² 让阱越窄能量越高', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    '2-0': fig(
      '8.6/2-0-f',
      'E_nl = ħ²k_nl²/2m：零点即能量',
      '$E_{nl}=\\hbar^2k_{nl}^2/2m$，$k_{nl}=\\alpha_{nl}/a$，零点表就是能级表。',
      [
        T(320, 24, 'E_nl = ħ²k_nl²/2m：零点即能量', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'violet', opacity: 0.14, r: 5 }),
        T(320, 64, 'E_nl = ħ² k_nl² / (2m)，j_l(k_nl a) = 0', { size: 10.5, tone: 'text', anchor: 'middle' }),
        T(50, 100, 'l = 0', { size: 9.5, tone: 'mint' }),
        T(140, 100, 'ka = π, 2π, 3π', { size: 9.5, tone: 'mint' }),
        T(50, 130, 'l = 1', { size: 9.5, tone: 'violet' }),
        T(140, 130, '4.49, 7.73, 10.90', { size: 9.5, tone: 'violet' }),
        T(50, 160, 'l = 2', { size: 9.5, tone: 'amber' }),
        T(140, 160, '5.76, 9.10, 12.32', { size: 9.5, tone: 'amber' }),
        T(50, 190, 'l = 3', { size: 9.5, tone: 'cyan' }),
        T(140, 190, '6.99, 10.42, 13.70', { size: 9.5, tone: 'cyan' }),
        T(400, 104, 'α_nl = k_nl a：无量纲', { size: 9.5, tone: 'cyan' }),
        T(400, 128, '每个零点一个能级', { size: 9.5, tone: 'mint' }),
        T(400, 152, '2l+1 重简并', { size: 9.5, tone: 'violet' }),
        T(400, 176, 'l 固定：n 越大 E 越高', { size: 9.5, tone: 'amber' }),
        T(400, 200, 'a 越大：能级越密', { size: 9.5, tone: 'muted' }),
        T(400, 224, 'l 越大：零点越远', { size: 9.5, tone: 'faint' }),
        T(50, 222, '同一 n：l 越大 → k 越大 → E 越高', { size: 9.5, tone: 'cyan' }),
        T(50, 244, 'k 量纲 1/长度；E ∝ k² ∝ 1/a²', { size: 9.5, tone: 'muted' }),
        T(50, 266, 'a→∞：k→0，能级趋连续', { size: 9.5, tone: 'faint' })
      ]
    ),
    '2-1': fig(
      '8.6/2-1-f',
      'k_nl 随 l 增大：离心项抬高零点',
      '$k_{nl}=\\alpha_{nl}/a$；$\\alpha_{nl}$ 随 $l$ 增大，故同一序号下 $E$ 随 $l$ 抬高。',
      [
        T(320, 24, 'k_nl 随 l 增大：离心项抬高零点', { size: 12.5, tone: 'text', anchor: 'middle' }),
        BAND(36, 44, 568, 30, { tone: 'amber', opacity: 0.14, r: 5 }),
        T(320, 64, 'k_nl 随 l 增大 ⇒ E_nl = ħ²k²/2m 抬高', { size: 10.5, tone: 'text', anchor: 'middle' }),
        L(60, 200, 300, 200, { tone: 'dim' }),
        L(60, 200, 60, 90, { tone: 'dim' }),
        T(60, 84, 'α', { size: 9.5, tone: 'dim' }),
        R(80, 156, 26, 44, { tone: 'mint', fill: true, opacity: 0.22, r: 3 }),
        R(130, 137, 26, 63, { tone: 'violet', fill: true, opacity: 0.22, r: 3 }),
        R(180, 119, 26, 81, { tone: 'amber', fill: true, opacity: 0.22, r: 3 }),
        R(230, 102, 26, 98, { tone: 'cyan', fill: true, opacity: 0.22, r: 3 }),
        T(93, 148, '3.14', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(143, 129, '4.49', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(193, 111, '5.76', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(243, 94, '6.99', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(93, 214, 'l=0', { size: 9.5, tone: 'mint', anchor: 'middle' }),
        T(143, 214, 'l=1', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(193, 214, 'l=2', { size: 9.5, tone: 'amber', anchor: 'middle' }),
        T(243, 214, 'l=3', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(330, 104, '零点 α_nl 随 l 增大', { size: 10, tone: 'violet' }),
        T(330, 128, 'l=0：3.14（π）', { size: 9.5, tone: 'mint' }),
        T(330, 152, 'l=1：4.49', { size: 9.5, tone: 'violet' }),
        T(330, 176, 'l=2：5.76', { size: 9.5, tone: 'amber' }),
        T(330, 200, 'l=3：6.99', { size: 9.5, tone: 'cyan' }),
        T(330, 224, '高阶：α ≈ (n+l/2)π', { size: 9.5, tone: 'muted' }),
        T(330, 248, 'l→∞：离心墙越远', { size: 9.5, tone: 'faint' }),
        T(320, 266, '同一 n：l 越大，能量越高', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    )
  }
}
export default set
