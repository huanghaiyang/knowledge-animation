import { fig, T, R, BAND, L, A, DOT, TAG, AXIS, CURVE, LEVEL, PANEL } from './kit'
import type { SectionFigureSet } from './types'

export const ch4aFigures: Record<string, SectionFigureSet> = {
  'qm-4-1': {
    overview: fig(
      '4.1/overview',
      '双势垒围成的一维量子腔',
      '入射电子在两个势垒之间往返反射；只有往返相位回到 2πn 的波才形成腔内驻波，并在共振能量处几乎全部透射。',
      [
        T(320, 24, '两端势垒夹住的量子腔', { size: 13, tone: 'text', anchor: 'middle' }),
        L(42, 208, 598, 208, { tone: 'dim', weight: 1.2 }),
        R(170, 106, 22, 102, { tone: 'amber', r: 2, fill: true, opacity: 0.3 }),
        R(448, 106, 22, 102, { tone: 'amber', r: 2, fill: true, opacity: 0.3 }),
        L(192, 208, 448, 208, { tone: 'mint', weight: 2 }),
        CURVE((x) => Math.sin(x / 9), { x: 44, y: 164, w: 124, h: 42 }, [0, 124], [-1.3, 1.3], { tone: 'mint', weight: 1.6 }),
        CURVE((x) => 2.4 * Math.sin(x / 18), { x: 196, y: 140, w: 248, h: 68 }, [0, 248], [-2.6, 2.6], { tone: 'violet', weight: 1.6 }),
        CURVE((x) => 0.8 * Math.sin(x / 9 + 1), { x: 474, y: 168, w: 122, h: 34 }, [0, 122], [-1, 1], { tone: 'cyan', weight: 1.6, dash: true }),
        A(46, 132, 160, 132, { tone: 'mint', weight: 1.4 }),
        T(104, 118, '入射波', { size: 10, tone: 'mint', anchor: 'middle' }),
        A(160, 100, 52, 100, { tone: 'violet', weight: 1.2 }),
        T(108, 88, '反射波', { size: 9.5, tone: 'violet', anchor: 'middle' }),
        T(158, 94, '势垒 I', { size: 10, tone: 'amber', anchor: 'end' }),
        T(460, 94, '势垒 II', { size: 10, tone: 'amber' }),
        T(320, 130, '腔内往返 → 驻波', { size: 10, tone: 'violet', anchor: 'middle' }),
        A(482, 120, 586, 120, { tone: 'cyan', weight: 1.4 }),
        T(540, 108, '透射波', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
        T(320, 226, '腔长 L', { size: 10, tone: 'mint', anchor: 'middle' }),
        TAG(60, 254, '2kL + 2φ = 2πn → 离散腔模', { tone: 'violet', size: 10 }),
        TAG(348, 254, '共振：T ≈ 1', { tone: 'mint', size: 10 }),
        T(320, 278, '峰外：T 被压低若干量级', { size: 10, tone: 'faint', anchor: 'middle' })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '4.1/0-0',
        '一次入射，分成反射与透射两支',
        '电子打到势垒 I，一支立即反射回左侧，一支进入腔内在两侧势垒之间反复反射，每次碰撞都再分出两支。',
        [
          T(320, 24, '势垒把一束波拆成多支', { size: 12.5, tone: 'text', anchor: 'middle' }),
          R(150, 96, 20, 116, { tone: 'amber', fill: true, opacity: 0.28, r: 2 }),
          R(446, 96, 20, 116, { tone: 'amber', fill: true, opacity: 0.28, r: 2 }),
          A(52, 196, 142, 196, { tone: 'mint', weight: 1.6 }),
          T(96, 184, '入射', { size: 10, tone: 'mint', anchor: 'middle' }),
          A(146, 168, 60, 150, { tone: 'violet', weight: 1.2, dash: true }),
          T(100, 146, '反射支', { size: 9.5, tone: 'violet', anchor: 'middle' }),
          A(174, 190, 404, 132, { tone: 'violet', weight: 1.4 }),
          A(404, 132, 176, 112, { tone: 'violet', weight: 1.4 }),
          A(176, 112, 406, 172, { tone: 'violet', weight: 1.4 }),
          T(320, 84, '腔内多次往返', { size: 10, tone: 'violet', anchor: 'middle' }),
          A(468, 150, 584, 132, { tone: 'cyan', weight: 1.4 }),
          T(530, 120, '漏出', { size: 9.5, tone: 'cyan', anchor: 'middle' }),
          T(320, 242, '每次撞到势垒：反射 + 透射', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          TAG(60, 268, '同相叠加的成分才能留存', { tone: 'mint', size: 10 })
        ]
      ),
      '0-1': fig(
        '4.1/0-1',
        '往返一周的相位必须回到原值',
        '去程与回程各积累 kL，两端反射各带来一份 φ；总相位等于 2πn 的波才能自我加强，其余相位在多次反射中相互抵消。',
        [
          T(320, 24, '相位条件挑出离散腔模', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...PANEL(40, 50, 290, 170, '腔内的一个往返', { tone: 'mint' }),
          BAND(52, 100, 10, 60, { tone: 'amber', opacity: 0.35 }),
          BAND(300, 100, 10, 60, { tone: 'amber', opacity: 0.35 }),
          A(66, 116, 296, 116, { tone: 'mint', weight: 1.6 }),
          A(296, 152, 66, 152, { tone: 'violet', weight: 1.6 }),
          T(182, 104, '+ kL', { size: 10.5, tone: 'mint', anchor: 'middle' }),
          T(182, 170, '+ kL', { size: 10.5, tone: 'violet', anchor: 'middle' }),
          T(182, 192, '两端反射再各加 φ，共 +2φ', { size: 9.5, tone: 'amber', anchor: 'middle' }),
          TAG(40, 232, '一次往返：2kL + 2φ', { tone: 'mint', size: 10.5 }),
          TAG(352, 72, '只取 2π 的整数倍', { tone: 'violet', size: 11 }),
          L(360, 150, 600, 150, { tone: 'dim' }),
          ...[1, 2, 3].map((n) =>
            DOT(368 + n * 44, 150, { r: 3.5, tone: 'mint' })
          ),
          ...[1, 2, 3].map((n) =>
            T(368 + n * 44, 178, String(n) + '×2π', { size: 9.5, tone: 'mint', anchor: 'middle' })
          ),
          T(480, 208, '其余相位：多次反射相消', { size: 10, tone: 'danger', anchor: 'middle' }),
          T(320, 272, '连续波谱被裁剪成一串离散腔模', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-2': fig(
        '4.1/0-2',
        '长腔密、短腔疏',
        '腔长加倍，同一波段能容纳的模式数加倍，模式间距随之减半；若把腔内粒子看作自由粒子，能级按 n² 张开，间隔随 n 变大。',
        [
          T(320, 24, '腔长决定模式间距', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...PANEL(40, 48, 252, 178, '腔长 L', { tone: 'mint' }),
          ...[82, 100, 118, 136, 154, 172, 190].flatMap((y) => LEVEL(64, 250, y)),
          A(266, 190, 266, 172, { tone: 'amber', weight: 1.2 }),
          T(258, 178, 'ΔE 小', { size: 9.5, tone: 'amber', anchor: 'end' }),
          ...PANEL(320, 48, 280, 178, '腔长 L/2', { tone: 'violet' }),
          ...[82, 124, 166, 208].flatMap((y) => LEVEL(344, 536, y, undefined, { tone: 'violet' })),
          A(552, 166, 552, 124, { tone: 'amber', weight: 1.2 }),
          T(544, 142, 'ΔE 大', { size: 9.5, tone: 'amber', anchor: 'end' }),
          T(320, 244, 'L 加倍：同样波段容纳的模式加倍', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          T(320, 266, '间距 ∝ 1/L，能级 ∝ n²', { size: 10.5, tone: 'mint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '4.1/1-0',
        '扫过腔模时透射鼓起峰',
        '能量扫过腔模，透射不再单调，而是在每个腔模附近出现一个峰；峰间失谐区透射按 1/(E-E_r)² 被压低。',
        [
          T(320, 24, '透射谱：共振峰串在低背景上', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 58, y: 52, w: 520, h: 190 }, { xLabel: 'E', yLabel: 'T' }),
          CURVE(
            (x) => 0.08 + 0.9 / (1 + ((x - 90) / 10) ** 2) + 0.94 / (1 + ((x - 260) / 10) ** 2) + 0.9 / (1 + ((x - 430) / 10) ** 2),
            { x: 58, y: 52, w: 520, h: 190 },
            [0, 520],
            [0, 1.05],
            { tone: 'mint', steps: 180 }
          ),
          L(318, 58, 318, 240, { tone: 'dim', dash: true }),
          DOT(318, 58, { r: 3, tone: 'amber' }),
          T(318, 46, 'T ≈ 1', { size: 10.5, tone: 'amber', anchor: 'middle' }),
          T(318, 254, 'E_r', { size: 10.5, tone: 'amber', anchor: 'middle' }),
          L(298, 143, 338, 143, { tone: 'amber', dash: true }),
          T(346, 147, 'Γ', { size: 10, tone: 'amber' }),
          T(420, 96, '峰外：透射被压低', { size: 10, tone: 'muted' }),
          T(320, 274, '每个峰位对应一个腔模能量', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '4.1/1-1',
        '半高宽等于两侧漏出率之和',
        '峰形是洛伦兹型：偏离共振越远，透射按失谐平方衰减；半高处的全宽 Γ 就是左右两侧漏出率之和。',
        [
          T(320, 24, 'Γ 决定峰的宽度', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 64, y: 56, w: 480, h: 180 }, { xLabel: 'E', yLabel: 'T' }),
          CURVE((x) => 0.1 + 0.88 / (1 + (x / 0.34) ** 2), { x: 64, y: 56, w: 480, h: 180 }, [-3, 3], [0, 1.05], { tone: 'mint', steps: 160 }),
          L(304, 68, 304, 236, { tone: 'dim', dash: true }),
          DOT(304, 68, { r: 3, tone: 'mint' }),
          T(304, 52, 'T_max', { size: 10, tone: 'mint', anchor: 'middle' }),
          A(277, 143, 331, 143, { tone: 'amber', weight: 1.6 }),
          T(304, 133, 'Γ', { size: 11, tone: 'amber', anchor: 'middle' }),
          T(370, 82, '分子：Γ_L Γ_R', { size: 10, tone: 'violet' }),
          T(370, 106, '分母：失谐² + Γ²/4', { size: 10, tone: 'muted' }),
          T(370, 130, 'Γ = Γ_L + Γ_R', { size: 10, tone: 'amber' }),
          TAG(64, 244, '半高处取全宽', { tone: 'amber', size: 10 }),
          T(320, 274, '远离共振：按失谐平方衰减', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '4.1/1-2',
        '同相相加，反相抵消',
        '共振时腔内两支波同相，叠加后振幅变大、透射被放大；失谐时两支波反相，叠加几乎为零，透射被抑制。',
        [
          T(320, 24, '腔只做相位选择，不增加粒子数', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...PANEL(34, 44, 286, 200, '同相：相加', { tone: 'mint' }),
          CURVE((x) => Math.sin(x / 16), { x: 52, y: 82, w: 250, h: 30 }, [0, 250], [-1, 1], { tone: 'mint', steps: 80 }),
          CURVE((x) => Math.sin(x / 16), { x: 52, y: 112, w: 250, h: 30 }, [0, 250], [-1, 1], { tone: 'violet', steps: 80, dash: true }),
          CURVE((x) => 2 * Math.sin(x / 16), { x: 52, y: 152, w: 250, h: 56 }, [0, 250], [-2, 2], { tone: 'amber', weight: 2 }),
          T(66, 76, '支路 1', { size: 9.5, tone: 'mint' }),
          T(66, 108, '支路 2', { size: 9.5, tone: 'violet' }),
          T(66, 218, '叠加：振幅加倍', { size: 10, tone: 'amber' }),
          ...PANEL(322, 44, 284, 200, '反相：抵消', { tone: 'danger' }),
          CURVE((x) => Math.sin(x / 16), { x: 340, y: 82, w: 250, h: 30 }, [0, 250], [-1, 1], { tone: 'mint', steps: 80 }),
          CURVE((x) => -Math.sin(x / 16), { x: 340, y: 112, w: 250, h: 30 }, [0, 250], [-1, 1], { tone: 'violet', steps: 80, dash: true }),
          L(342, 190, 590, 190, { tone: 'muted', weight: 1.4 }),
          T(354, 76, '支路 1', { size: 9.5, tone: 'mint' }),
          T(354, 108, '支路 2', { size: 9.5, tone: 'violet' }),
          T(354, 214, '叠加：几乎为零', { size: 10, tone: 'danger' }),
          T(320, 272, '共振靠干涉，而不是靠腔“放大”粒子', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '4.1/2-0',
        '腔内振幅缓慢漏空',
        '准束缚态不是真束缚态：腔内振幅虽大，却按指数包络缓慢衰减，衰减时间常数就是寿命 τ；τ 内完成的振荡次数约为 Q。',
        [
          T(320, 24, '准束缚态：振幅按指数包络漏出', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 60, y: 52, w: 470, h: 186 }, { xLabel: 't', yLabel: 'ψ' }),
          CURVE((x) => Math.exp(-x / 2.6) * Math.sin(x * 2.2), { x: 60, y: 52, w: 470, h: 186 }, [0, 20], [-1, 1], { tone: 'mint', steps: 220 }),
          CURVE((x) => Math.exp(-x / 2.6), { x: 60, y: 52, w: 470, h: 186 }, [0, 20], [-1, 1], { tone: 'amber', steps: 80, dash: true }),
          CURVE((x) => -Math.exp(-x / 2.6), { x: 60, y: 52, w: 470, h: 186 }, [0, 20], [-1, 1], { tone: 'amber', steps: 80, dash: true }),
          L(121, 111, 121, 238, { tone: 'dim', dash: true }),
          DOT(121, 111, { r: 3, tone: 'violet' }),
          T(132, 106, '振幅降到 1/e', { size: 9.5, tone: 'violet' }),
          T(226, 74, '包络衰减 = 漏出率', { size: 10, tone: 'amber' }),
          T(320, 252, 'τ = ħ/Γ，Q = E_r/Γ', { size: 11, tone: 'text', anchor: 'middle' }),
          T(320, 274, 'τ 内约完成 Q 个振荡周期', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '4.1/2-1',
        '势垒越高越漏得慢',
        '势垒加高，两侧漏出率变小：峰变窄、寿命变长、品质因数变大；势垒降低则峰变宽，腔内波很快逸出。',
        [
          T(320, 24, '势垒高度控制峰宽与寿命', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...PANEL(34, 44, 290, 176, '高势垒', { tone: 'amber' }),
          R(92, 68, 16, 86, { tone: 'amber', fill: true, opacity: 0.35, r: 2 }),
          R(244, 68, 16, 86, { tone: 'amber', fill: true, opacity: 0.35, r: 2 }),
          L(108, 154, 244, 154, { tone: 'mint', weight: 2 }),
          CURVE((x) => 0.1 + 0.88 / (1 + ((x - 120) / 12) ** 2), { x: 56, y: 166, w: 250, h: 46 }, [0, 250], [0, 1.05], { tone: 'mint', steps: 120 }),
          T(262, 116, '漏出慢', { size: 9.5, tone: 'muted', anchor: 'end' }),
          T(56, 208, '峰窄 → 寿命长', { size: 10, tone: 'mint' }),
          ...PANEL(346, 44, 260, 176, '低势垒', { tone: 'cyan' }),
          R(392, 96, 16, 58, { tone: 'cyan', fill: true, opacity: 0.35, r: 2 }),
          R(536, 96, 16, 58, { tone: 'cyan', fill: true, opacity: 0.35, r: 2 }),
          L(408, 154, 536, 154, { tone: 'mint', weight: 2 }),
          CURVE((x) => 0.1 + 0.8 / (1 + ((x - 110) / 30) ** 2), { x: 368, y: 166, w: 220, h: 46 }, [0, 220], [0, 1.05], { tone: 'violet', steps: 120 }),
          T(528, 136, '漏出快', { size: 9.5, tone: 'muted', anchor: 'end' }),
          T(368, 208, '峰宽 → 寿命短', { size: 10, tone: 'violet' }),
          T(320, 246, 'Γ 变小 ⇒ τ 与 Q 都变大', { size: 10.5, tone: 'muted', anchor: 'middle' })
        ]
      ),
      '2-2': fig(
        '4.1/2-2',
        '电子、光子与声波共用一套条件',
        '同一套相位条件同时描述双势垒腔、法布里—珀罗腔与声学界面：只要波能在两个反射面之间往返积累相位，就出现离散共振。',
        [
          T(320, 24, '同一条相位条件，三种波', { size: 12.5, tone: 'text', anchor: 'middle' }),
          T(44, 80, '电子波', { size: 10.5, tone: 'mint' }),
          R(210, 50, 14, 50, { tone: 'mint', fill: true, opacity: 0.3, r: 2 }),
          R(370, 50, 14, 50, { tone: 'mint', fill: true, opacity: 0.3, r: 2 }),
          CURVE((x) => Math.sin(x / 12), { x: 224, y: 62, w: 146, h: 26 }, [0, 146], [-1, 1], { tone: 'mint', steps: 70 }),
          T(436, 80, '隧道漏出', { size: 9.5, tone: 'mint' }),
          T(44, 144, '光波', { size: 10.5, tone: 'cyan' }),
          BAND(210, 112, 10, 56, { tone: 'cyan', opacity: 0.4 }),
          BAND(374, 112, 10, 56, { tone: 'cyan', opacity: 0.4 }),
          CURVE((x) => Math.sin(x / 12), { x: 224, y: 124, w: 146, h: 26 }, [0, 146], [-1, 1], { tone: 'cyan', steps: 70 }),
          T(436, 144, '腔镜反射', { size: 9.5, tone: 'cyan' }),
          T(44, 208, '声波', { size: 10.5, tone: 'violet' }),
          BAND(210, 176, 10, 56, { tone: 'violet', opacity: 0.4 }),
          BAND(374, 176, 10, 56, { tone: 'violet', opacity: 0.4 }),
          CURVE((x) => Math.sin(x / 12), { x: 224, y: 188, w: 146, h: 26 }, [0, 146], [-1, 1], { tone: 'violet', steps: 70 }),
          T(436, 208, '界面反射', { size: 9.5, tone: 'violet' }),
          TAG(50, 252, '半导体异质结', { tone: 'mint', size: 9.5 }),
          TAG(196, 252, '量子点', { tone: 'mint', size: 9.5 }),
          TAG(318, 252, '微波谐振腔', { tone: 'cyan', size: 9.5 }),
          TAG(452, 252, '量子信息存储', { tone: 'violet', size: 9.5 }),
          T(320, 276, '共同条件：2kL + 2φ = 2πn', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
    },
    formulas: {
      '0-0': fig(
        '4.1/0-0-f',
        '2kL 加 2φ 正好凑满 2πn',
        '传播项 2kL 是去程与回程各积 kL，反射项 2φ 是两次反射各带来一份相位修正；两项之和必须落在 2π 的整数倍上。',
        [
          T(320, 24, '相位账本：传播 + 反射 = 2πn', { size: 12.5, tone: 'text', anchor: 'middle' }),
          BAND(70, 96, 330, 26, { tone: 'mint', opacity: 0.28, r: 4 }),
          BAND(400, 96, 90, 26, { tone: 'violet', opacity: 0.28, r: 4 }),
          L(70, 88, 70, 132, { tone: 'dim', dash: true }),
          L(400, 88, 400, 132, { tone: 'text', dash: true }),
          L(490, 88, 490, 132, { tone: 'text', dash: true }),
          T(235, 86, '2kL：往返传播', { size: 10.5, tone: 'mint', anchor: 'middle' }),
          T(445, 86, '2φ：两次反射', { size: 10.5, tone: 'violet', anchor: 'middle' }),
          T(504, 116, '= 2πn', { size: 12, tone: 'amber' }),
          CURVE((x) => Math.sin(x / 12), { x: 70, y: 146, w: 330, h: 40 }, [0, 330], [-1, 1], { tone: 'mint', steps: 140 }),
          A(70, 194, 145, 194, { tone: 'amber', weight: 1.2 }),
          T(150, 198, 'λ', { size: 10.5, tone: 'amber' }),
          T(255, 204, 'k = 2π/λ：一个波长积 2π', { size: 10, tone: 'muted', anchor: 'middle' }),
          T(70, 232, 'φ 随势垒升高而增大', { size: 10, tone: 'violet' }),
          TAG(70, 258, 'n = 1, 2, 3 … 只有离散解', { tone: 'violet', size: 11 }),
          T(320, 278, '连续改变 k，只有这些点满足条件', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '4.1/0-1-f',
        '能级按 n² 张开，间隔随 n 增大',
        '能级 E_n 正比于 n² 与 1/L²：n 每加一，间隔增加一份；腔越短，所有能级整体上移，同时模式间距变大。',
        [
          T(320, 24, '自由粒子的腔模能级阶梯', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...LEVEL(76, 300, 220, 'n = 1', { size: 10 }),
          ...LEVEL(76, 300, 202, 'n = 2', { size: 10 }),
          ...LEVEL(76, 300, 172, 'n = 3', { size: 10 }),
          ...LEVEL(76, 300, 130, 'n = 4', { size: 10 }),
          A(352, 202, 352, 220, { tone: 'amber', weight: 1.2 }),
          A(352, 172, 352, 202, { tone: 'amber', weight: 1.2 }),
          A(352, 130, 352, 172, { tone: 'amber', weight: 1.2 }),
          T(362, 214, 'ΔE₁', { size: 9.5, tone: 'amber' }),
          T(362, 190, 'ΔE₂', { size: 9.5, tone: 'amber' }),
          T(362, 154, 'ΔE₃', { size: 9.5, tone: 'amber' }),
          T(430, 86, 'E_n ∝ n² / L²', { size: 11, tone: 'mint' }),
          T(430, 112, 'L 减半：全部能级上移 4 倍', { size: 10, tone: 'muted' }),
          T(430, 138, 'ΔE ∝ n / L', { size: 10, tone: 'violet' }),
          T(430, 162, 'n 越大，相邻间隔越大', { size: 10, tone: 'muted' }),
          TAG(430, 192, '腔越短：模式间距越大', { tone: 'amber', size: 10 }),
          T(320, 254, '腔模能级来自驻波条件，不是外加强制', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '4.1/1-0-f',
        '分子是两份漏出，分母是失谐',
        '分子 Γ_L Γ_R 表示两侧都能漏出才有透射；分母中失谐项把能量偏离共振的惩罚写成平方，再加 Γ²/4 保证峰不会无限高。',
        [
          T(320, 24, '布赖特—维格纳峰的两部分', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 64, y: 52, w: 480, h: 180 }, { xLabel: 'E', yLabel: 'T' }),
          CURVE((x) => 0.1 + 0.88 / (1 + (x / 0.35) ** 2), { x: 64, y: 52, w: 480, h: 180 }, [-3, 3], [0, 1.05], { tone: 'mint', steps: 160 }),
          L(304, 68, 304, 236, { tone: 'dim', dash: true }),
          DOT(304, 68, { r: 3, tone: 'mint' }),
          A(277, 143, 331, 143, { tone: 'amber', weight: 1.6 }),
          T(304, 133, 'Γ', { size: 11, tone: 'amber', anchor: 'middle' }),
          T(370, 82, '分子 = 两侧漏出率之积', { size: 10, tone: 'violet' }),
          T(370, 106, '分母 = 失谐² + (Γ/2)²', { size: 10, tone: 'muted' }),
          T(370, 130, 'Γ = Γ_L + Γ_R', { size: 10, tone: 'amber' }),
          T(304, 252, 'E_r', { size: 10.5, tone: 'amber', anchor: 'middle' }),
          TAG(64, 244, '峰顶 ∝ Γ_L Γ_R / Γ²', { tone: 'violet', size: 10 }),
          T(320, 274, '失谐越大越接近零', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '4.1/1-1-f',
        '对称腔的峰顶正好到 1',
        'T_max = 4Γ_L Γ_R / Γ² 的两侧漏出率相等时取最大值 1；一旦左右不对称，乘积小于 Γ²/4，峰顶必然低于 1。',
        [
          T(320, 24, '两侧漏出率相等 → 完全透明', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 64, y: 52, w: 480, h: 180 }, { xLabel: 'E', yLabel: 'T' }),
          CURVE(
            (x) => 0.04 + 0.96 / (1 + ((x + 1.1) / 0.28) ** 2) + 0.8 / (1 + ((x - 1.1) / 0.28) ** 2),
            { x: 64, y: 52, w: 480, h: 180 },
            [-3, 3],
            [0, 1.05],
            { tone: 'mint', steps: 160 }
          ),
          DOT(216, 60, { r: 3, tone: 'mint' }),
          DOT(392, 88, { r: 3, tone: 'violet' }),
          T(216, 48, 'T_max = 1', { size: 10.5, tone: 'mint', anchor: 'middle' }),
          T(392, 78, 'T_max < 1', { size: 10.5, tone: 'violet', anchor: 'middle' }),
          T(78, 118, '对称：Γ_L = Γ_R', { size: 10, tone: 'mint' }),
          T(78, 142, '入射波全部通过', { size: 10, tone: 'muted' }),
          T(420, 118, '不对称：Γ_L ≠ Γ_R', { size: 10, tone: 'violet' }),
          T(420, 142, '总有一部分被反射', { size: 10, tone: 'muted' }),
          TAG(64, 250, '对称：4Γ_L Γ_R / Γ² = 1', { tone: 'mint', size: 10 }),
          TAG(330, 250, 'Γ = Γ_L + Γ_R', { tone: 'amber', size: 10 }),
          T(320, 274, '峰顶的最大值由两侧漏出率的匹配决定', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '4.1/2-0-f',
        '寿命是线宽的倒数',
        'τ = ħ/Γ 说明峰越窄、留在腔内的时间越长；Q = E_r/Γ 把这个时间换算成振荡周期数，Q 越大腔越“好”。',
        [
          T(320, 24, 'τ 与 Q：同一个 Γ 的两种读法', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 60, y: 52, w: 380, h: 180 }, { xLabel: 't', yLabel: 'ψ' }),
          CURVE((x) => Math.exp(-x / 2.5) * Math.sin(x * 2.4), { x: 60, y: 52, w: 380, h: 180 }, [0, 14], [-1, 1], { tone: 'mint', steps: 200 }),
          CURVE((x) => Math.exp(-x / 2.5), { x: 60, y: 52, w: 380, h: 180 }, [0, 14], [-1, 1], { tone: 'amber', steps: 80, dash: true }),
          CURVE((x) => -Math.exp(-x / 2.5), { x: 60, y: 52, w: 380, h: 180 }, [0, 14], [-1, 1], { tone: 'amber', steps: 80, dash: true }),
          L(128, 111, 128, 232, { tone: 'dim', dash: true }),
          DOT(128, 111, { r: 3, tone: 'violet' }),
          T(136, 106, '振幅 1/e 处 = τ', { size: 9.5, tone: 'violet' }),
          T(460, 86, 'τ = ħ/Γ', { size: 11, tone: 'mint' }),
          T(460, 110, '线宽越窄，寿命越长', { size: 10, tone: 'muted' }),
          T(460, 140, 'Q = E_r/Γ', { size: 11, tone: 'violet' }),
          T(460, 164, 'E_r：共振能量', { size: 10, tone: 'muted' }),
          T(460, 188, 'Q ≈ τ 内振荡次数', { size: 10, tone: 'muted' }),
          TAG(60, 248, 'Γ 减小 ⇒ τ 与 Q 同时变大', { tone: 'amber', size: 10 }),
          T(320, 276, '寿命与线宽互为倒数', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '4.1/2-1-f',
        '态密度：洛伦兹峰的面积归一',
        'ρ(E) = Γ/2π / ((E-E_r)² + Γ²/4) 的峰高等于 2/(πΓ)，半高宽等于 Γ；Γ 变小时峰更高更窄，但曲线下面积始终为 1。',
        [
          T(320, 24, '同一条峰，两种线宽', { size: 12.5, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 70, y: 48, w: 470, h: 190 }, { xLabel: 'E', yLabel: 'ρ(E)' }),
          CURVE((x) => 1 / (1 + (x / 0.8) ** 2), { x: 70, y: 48, w: 470, h: 190 }, [-3, 3], [0, 2.5], { tone: 'mint', steps: 160 }),
          CURVE((x) => 2 / (1 + (x / 0.4) ** 2), { x: 70, y: 48, w: 470, h: 190 }, [-3, 3], [0, 2.5], { tone: 'violet', steps: 160, dash: true }),
          L(305, 86, 305, 238, { tone: 'dim', dash: true }),
          DOT(305, 86, { r: 3, tone: 'violet' }),
          DOT(305, 162, { r: 3, tone: 'mint' }),
          T(318, 80, 'Γ/2：峰高一倍', { size: 10, tone: 'violet' }),
          T(318, 158, 'Γ：基准峰', { size: 10, tone: 'mint' }),
          T(390, 112, '峰高 = 2/(πΓ)', { size: 10, tone: 'violet' }),
          T(390, 136, '半高宽 = Γ', { size: 10, tone: 'amber' }),
          T(390, 160, '面积都等于 1', { size: 10, tone: 'muted' }),
          TAG(70, 248, '归一化：∫ρ dE = 1', { tone: 'mint', size: 11 }),
          T(320, 276, 'Γ 越小，峰越高越窄，面积不变', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      )
    }
  },
  // __NEXT__
}
