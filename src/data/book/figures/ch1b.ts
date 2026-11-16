import { fig, T, R, BAND, L, A, DOT, TAG, AXIS, CURVE, LEVEL, PANEL } from './kit'
import type { SectionFigureSet } from './types'

const planck = (x: number) => (x ** 3 / (Math.exp(x / 60) - 1)) / 306000
const rjLow = (x: number) => x * x / 5100
const wienTail = (x: number) => (x / 170) ** 3 * Math.exp(3 - (x / 170) * 3)

export const ch1bFigures: Record<string, SectionFigureSet> = {
  'qm-1-2': {
    overview: fig(
      '1.2/overview',
      '从恒温空腔到作用量子',
      '空腔小孔给出只依赖温度的黑体谱；两条经典公式各守一端，普朗克用 $h\\nu$ 的整数倍同时压住短波端并保住长波端。',
      [
        T(320, 24, '黑体谱：两条定律、两次失败、一次量化', { size: 13, tone: 'text', anchor: 'middle' }),
        ...PANEL(30, 40, 142, 150, '空腔', { tone: 'amber' }),
        R(44, 64, 114, 106, { tone: 'amber', fill: true, opacity: 0.1, r: 9 }),
        T(101, 96, '恒温 T', { size: 11, tone: 'amber', anchor: 'middle' }),
        T(101, 118, '只由温度决定', { size: 9.5, tone: 'muted', anchor: 'middle' }),
        BAND(154, 108, 8, 28, { tone: 'amber', opacity: 0.55 }),
        A(162, 114, 186, 96, { tone: 'amber' }),
        A(162, 130, 186, 146, { tone: 'amber' }),
        ...PANEL(194, 40, 418, 150, '谱密度 u(ν)', { tone: 'mint' }),
        BAND(496, 56, 98, 114, { tone: 'danger', opacity: 0.07 }),
        ...AXIS({ x: 208, y: 64, w: 386, h: 110 }, { xLabel: 'ν' }),
        CURVE(planck, { x: 208, y: 64, w: 386, h: 110 }, [0, 520], [0, 1.15], { tone: 'mint', steps: 120, weight: 2 }),
        CURVE((x) => (x > 200 ? NaN : rjLow(x)), { x: 208, y: 64, w: 386, h: 110 }, [0, 520], [0, 1.15], { tone: 'danger', dash: true }),
        T(545, 76, '紫外灾难', { size: 10.5, tone: 'danger', anchor: 'middle' }),
        TAG(38, 216, '维恩：短波对', { tone: 'violet', size: 10 }),
        TAG(236, 216, '瑞利—金斯：长波对', { tone: 'danger', size: 10 }),
        TAG(444, 216, '普朗克：两端都对', { tone: 'mint', size: 10 }),
        T(320, 254, '两条经典公式各守一端，只有量子假设覆盖全谱', { size: 10.5, tone: 'faint', anchor: 'middle' })
      ]
    ),
    paragraphs: {
      '0-0': fig(
        '1.2/0-0',
        '空腔小孔就是一具黑体',
        '射入的辐射被腔壁全部吸收，腔内达到热平衡；从小孔漏出的那一点点辐射只记录温度，不记得腔壁用什么材料做的。',
        [
          R(100, 66, 250, 132, { tone: 'dim', r: 14, fill: true, opacity: 0.08 }),
          T(225, 96, '恒温空腔', { size: 12, tone: 'amber', anchor: 'middle' }),
          T(225, 122, '腔内达到热平衡', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(40, 92, 96, 92, { tone: 'violet' }),
          A(40, 132, 96, 132, { tone: 'violet' }),
          A(40, 172, 96, 172, { tone: 'violet' }),
          T(42, 216, '入射辐射全部吸收', { size: 10, tone: 'violet' }),
          BAND(350, 118, 8, 36, { tone: 'amber', opacity: 0.55 }),
          T(350, 96, '小孔', { size: 9.5, tone: 'amber' }),
          A(360, 136, 432, 96, { tone: 'amber' }),
          A(360, 136, 452, 136, { tone: 'amber' }),
          A(360, 136, 432, 176, { tone: 'amber' }),
          T(452, 86, '出射辐射', { size: 10, tone: 'mint' }),
          T(320, 244, '孔内辐射只由温度决定', { size: 11, tone: 'text', anchor: 'middle' }),
          T(320, 266, '与腔壁材料、几何细节无关', { size: 10, tone: 'dim', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '1.2/0-1',
        'T⁴ 与 1/T：两条稳固的实验规律',
        '总辐射按温度四次方增长，曲线在高温端陡峭上扬；峰值波长随温度反比移动，温度越高，谱峰越靠短波。',
        [
          T(320, 24, '总辐射 T⁴，峰值 1/T', { size: 13, tone: 'text', anchor: 'middle' }),
          ...AXIS({ x: 52, y: 54, w: 230, h: 154 }, { xLabel: 'T', yLabel: 'M' }),
          CURVE((x) => (x / 220) ** 4, { x: 52, y: 54, w: 230, h: 154 }, [0, 220], [0, 1.1], { tone: 'mint', steps: 100 }),
          DOT(167, 199, { r: 3, tone: 'mint' }),
          DOT(272, 92, { r: 3, tone: 'mint' }),
          T(167, 222, 'T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
          T(272, 222, '2T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
          TAG(52, 248, '温度翻倍，M 增 16 倍', { tone: 'amber', size: 10 }),
          ...AXIS({ x: 340, y: 70, w: 250, h: 138 }, { xLabel: 'λ', yLabel: 'u' }),
          CURVE((x) => 0.92 * (x / 100) ** 2.5 * Math.exp(2.5 * (1 - x / 100)), { x: 340, y: 70, w: 250, h: 138 }, [0, 500], [0, 1], { tone: 'amber', steps: 100 }),
          CURVE((x) => 0.86 * (x / 170) ** 2.5 * Math.exp(2.5 * (1 - x / 170)), { x: 340, y: 70, w: 250, h: 138 }, [0, 500], [0, 1], { tone: 'violet', steps: 100 }),
          CURVE((x) => 0.78 * (x / 280) ** 2.5 * Math.exp(2.5 * (1 - x / 280)), { x: 340, y: 70, w: 250, h: 138 }, [0, 500], [0, 1], { tone: 'mint', steps: 100 }),
          T(474, 54, 'λmax 左移', { size: 9.5, tone: 'muted' }),
          A(500, 62, 404, 62, { tone: 'text', weight: 1 }),
          T(320, 268, '同一温度下整条谱形由 T 唯一决定', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '1.2/1-0',
        '模式数乘每模 kT，短波端必然发散',
        '瑞利—金斯把腔壁振子当成连续振子：模式密度按 ν² 增长，能量均分又给每个模式一份 kT，两者相乘在短波端没有上限。',
        [
          T(320, 24, '模式数 × 每模 kT，短波端失控', { size: 13, tone: 'text', anchor: 'middle' }),
          ...PANEL(32, 46, 192, 164, '模式密度 ∝ ν²', { tone: 'danger' }),
          BAND(56, 180, 34, 16, { tone: 'danger', opacity: 0.28 }),
          BAND(110, 156, 34, 40, { tone: 'danger', opacity: 0.28 }),
          BAND(164, 118, 34, 78, { tone: 'danger', opacity: 0.28 }),
          T(44, 214, 'ν 越大，模式越密', { size: 9.5, tone: 'muted' }),
          T(232, 128, '×', { size: 18, tone: 'text', anchor: 'middle' }),
          ...PANEL(240, 46, 140, 164, '每模 kT', { tone: 'amber' }),
          BAND(256, 150, 76, 22, { tone: 'amber', opacity: 0.12 }),
          BAND(256, 180, 76, 22, { tone: 'amber', opacity: 0.12 }),
          T(248, 214, '能量均分', { size: 9.5, tone: 'muted' }),
          A(388, 128, 424, 128, { tone: 'violet' }),
          ...PANEL(432, 46, 176, 164, '总能量', { tone: 'danger' }),
          BAND(452, 180, 32, 16, { tone: 'danger', opacity: 0.26 }),
          BAND(498, 152, 32, 44, { tone: 'danger', opacity: 0.26 }),
          BAND(544, 112, 32, 84, { tone: 'danger', opacity: 0.26 }),
          T(588, 76, '∞', { size: 15, tone: 'danger', anchor: 'end' }),
          T(320, 246, '短波端：模式无上限，总能量发散', { size: 10.5, tone: 'danger', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '1.2/1-1',
        '两条经典公式，各守住曲线的一端',
        '维恩公式在短波端与实验贴合，却在长波端偏低；瑞利—金斯在长波端吻合，一进中段就冲出图外。中段无人接管。',
        [
          ...AXIS({ x: 58, y: 48, w: 500, h: 180 }, { xLabel: 'ν', yLabel: 'u' }),
          BAND(212, 52, 96, 172, { tone: 'danger', opacity: 0.06 }),
          CURVE(planck, { x: 58, y: 48, w: 500, h: 180 }, [0, 520], [0, 1.15], { tone: 'mint', steps: 120, weight: 2 }),
          CURVE((x) => (rjLow(x) > 1.1 ? NaN : rjLow(x)), { x: 58, y: 48, w: 500, h: 180 }, [0, 520], [0, 1.15], { tone: 'cyan', steps: 60, dash: true }),
          CURVE((x) => (x < 250 ? NaN : wienTail(x)), { x: 58, y: 48, w: 500, h: 180 }, [0, 520], [0, 1.15], { tone: 'violet', steps: 90, dash: true }),
          T(62, 244, '长波：瑞利—金斯吻合', { size: 9.5, tone: 'cyan' }),
          T(246, 244, '中段：两式都失守', { size: 9.5, tone: 'danger' }),
          T(428, 244, '短波：维恩吻合', { size: 9.5, tone: 'violet' }),
          T(320, 270, '实验曲线由实线给出：没有任何经典公式能整段贴合', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-2': fig(
        '1.2/1-2',
        '病根在“能量可任意小”',
        '若一个短波模式能接受任意小的能量，它就会被热激发；波长越短，这样的模式越多，总能量于是被推向无穷。',
        [
          T(320, 26, 'ε 任意小 ⇒ 短波模式永远能被激发', { size: 13, tone: 'text', anchor: 'middle' }),
          ...PANEL(34, 48, 240, 170, '能量：连续取值', { tone: 'dim' }),
          A(70, 198, 70, 76, { tone: 'dim' }),
          T(60, 86, 'ε', { size: 11, tone: 'dim', anchor: 'end' }),
          ...Array.from({ length: 5 }, (_, i) =>
            BAND(86 + i * 14, 84, 13, 114, { tone: 'muted', opacity: 0.06 + i * 0.04 })
          ),
          T(168, 96, '任意小步长', { size: 10, tone: 'muted' }),
          T(168, 122, '没有最小刻度', { size: 10, tone: 'dim' }),
          A(282, 132, 330, 132, { tone: 'violet' }),
          ...PANEL(340, 48, 266, 170, '模式数：无上限', { tone: 'danger' }),
          ...[0, 1, 2, 3, 4].map((i) =>
            BAND(356 + i * 46, 198 - [20, 34, 52, 74, 100][i], 28, [20, 34, 52, 74, 100][i], { tone: 'danger', opacity: 0.2 })
          ),
          T(596, 80, '∞', { size: 14, tone: 'danger', anchor: 'end' }),
          T(320, 242, '模式数随 ν² 增长：总能找到更短的波长', { size: 10.5, tone: 'muted', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '1.2/2-0',
        '能量改成等间距台阶',
        '腔壁振子的能量被限定为 εn = nhν；配分函数变成几何级数，平均能量从 kT 掉到 hν/(e^{hν/kT}−1)，短波端因此被指数压住。',
        [
          T(320, 26, '能量只取 hν 的整数倍', { size: 13, tone: 'text', anchor: 'middle' }),
          ...PANEL(34, 44, 176, 202, '经典：连续', { tone: 'dim' }),
          R(58, 72, 128, 140, { tone: 'muted', fill: true, opacity: 0.16 }),
          T(122, 200, '任意 ε', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(222, 138, 266, 138, { tone: 'mint' }),
          ...PANEL(274, 44, 332, 202, '量子：等间距', { tone: 'mint' }),
          ...LEVEL(300, 470, 190, 'n=0', { tone: 'mint', size: 10 }),
          ...LEVEL(300, 470, 150, 'n=1', { tone: 'mint', size: 10 }),
          ...LEVEL(300, 470, 110, 'n=2', { tone: 'mint', size: 10 }),
          ...LEVEL(300, 470, 70, 'n=3', { tone: 'mint', size: 10 }),
          L(296, 190, 296, 150, { tone: 'amber', dash: true }),
          T(292, 170, 'hν', { size: 10, tone: 'amber', anchor: 'end' }),
          BAND(544, 184, 48, 12, { tone: 'violet', opacity: 0.3 }),
          BAND(544, 144, 34, 12, { tone: 'violet', opacity: 0.3 }),
          BAND(544, 104, 20, 12, { tone: 'violet', opacity: 0.3 }),
          BAND(544, 64, 10, 12, { tone: 'violet', opacity: 0.3 }),
          TAG(292, 232, '平均能量 = hν/(e^x−1)', { tone: 'amber', size: 10 }),
          T(320, 264, '布居按 e^{−nhν/kT} 递减，平均能量被压低', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '1.2/2-1',
        '一条公式接管整条曲线',
        '普朗克谱在长波端回到 kT 平台，在短波端被指数因子切断；峰位自动走 1/T，曲线下面积正好给出 T⁴。两端与两条定律同时吻合。',
        [
          ...AXIS({ x: 56, y: 44, w: 520, h: 196 }, { xLabel: 'ν', yLabel: 'u' }),
          BAND(56, 50, 104, 184, { tone: 'amber', opacity: 0.07 }),
          BAND(470, 50, 106, 184, { tone: 'danger', opacity: 0.07 }),
          CURVE(planck, { x: 56, y: 44, w: 520, h: 196 }, [0, 520], [0, 1.15], { tone: 'mint', steps: 140, weight: 2 }),
          L(226, 48, 226, 236, { tone: 'text', dash: true }),
          DOT(226, 66, { r: 3, tone: 'text' }),
          T(64, 236, '长波 → k_BT', { size: 9.5, tone: 'amber' }),
          T(236, 42, '峰值 ∝ 1/T', { size: 9.5, tone: 'text' }),
          T(572, 236, '短波 → 指数截断', { size: 9.5, tone: 'danger', anchor: 'end' }),
          TAG(224, 262, '面积 → σT⁴', { tone: 'mint', size: 10 }),
          T(320, 282, '同一个式子同时满足两端极限', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-2': fig(
        '1.2/2-2',
        'h 不是拟合参数，而是新的刻度',
        '把 h 取成 6.626×10⁻³⁴ J·s 之后，微观振子的 hν 远大于 kT，能量只能整份跳；宏观振子的 hν 远小于 kT，台阶细到看不见。',
        [
          T(320, 26, 'h：给“连续”划出的最小刻度', { size: 13, tone: 'text', anchor: 'middle' }),
          TAG(44, 66, 'h = 6.626×10⁻³⁴ J·s', { tone: 'amber', size: 12 }),
          T(44, 92, '作用量子：无法被消掉的常数', { size: 10, tone: 'muted' }),
          ...PANEL(34, 112, 270, 130, '微观：hν ≫ kT', { tone: 'mint' }),
          BAND(58, 170, 26, 46, { tone: 'amber', opacity: 0.28 }),
          T(96, 176, 'hν ≈ 2 eV', { size: 10, tone: 'amber' }),
          T(96, 200, 'kT ≈ 0.026 eV', { size: 10, tone: 'dim' }),
          ...PANEL(324, 112, 282, 130, '宏观：hν ≪ kT', { tone: 'dim' }),
          BAND(350, 152, 230, 58, { tone: 'dim', opacity: 0.12 }),
          T(350, 228, '能量近似连续', { size: 9.5, tone: 'muted' }),
          T(320, 264, 'h 趋于零 = 经典极限；h 保留 = 量子图景', { size: 10.5, tone: 'faint', anchor: 'middle' })
        ]
      )
    },
    formulas: {
      '0-0': fig(
        '1.2/0-0-f',
        'σT⁴：温度的四次方放大器',
        'σ = 5.67×10⁻⁸ W/(m²·K⁴) 只负责单位换算；T 必须用开尔文。温度翻倍，辐射本领变成 16 倍，而不是 2 倍。',
        [
          ...AXIS({ x: 64, y: 50, w: 300, h: 178 }, { xLabel: 'T', yLabel: 'M' }),
          CURVE((x) => (x / 300) ** 4, { x: 64, y: 50, w: 300, h: 178 }, [0, 300], [0, 1.1], { tone: 'mint', steps: 120, weight: 2 }),
          DOT(214, 212, { r: 3, tone: 'mint' }),
          DOT(300, 142, { r: 3, tone: 'mint' }),
          T(150, 74, '1×', { size: 9.5, tone: 'dim' }),
          T(268, 128, '16×', { size: 9.5, tone: 'mint' }),
          L(64, 232, 364, 232, { tone: 'dim' }),
          T(214, 246, 'T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
          T(300, 246, '2T', { size: 9.5, tone: 'dim', anchor: 'middle' }),
          TAG(400, 78, 'σ = 5.67×10⁻⁸', { tone: 'amber', size: 11 }),
          T(400, 104, 'W/(m²·K⁴)', { size: 10, tone: 'muted' }),
          T(400, 140, 'T 用开尔文', { size: 10.5, tone: 'text' }),
          T(400, 164, '四次方来自模式与能量的双重放大', { size: 9.5, tone: 'dim' }),
          T(320, 274, '温度稍升，总辐射就急剧变亮', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '0-1': fig(
        '1.2/0-1-f',
        'λmax T = b：峰值反比移动',
        'b = 2.898×10⁻³ m·K。T 越高 λmax 越短：3000 K 在红外，5800 K 落在可见光，10000 K 已偏到紫外。',
        [
          ...AXIS({ x: 64, y: 50, w: 380, h: 178 }, { xLabel: 'T (K)', yLabel: 'λmax (μm)' }),
          BAND(64, 142, 380, 16, { tone: 'cyan', opacity: 0.12 }),
          T(74, 138, '可见窗口', { size: 9, tone: 'cyan' }),
          CURVE((x) => 2.898 / (x / 1000) , { x: 64, y: 50, w: 380, h: 178 }, [900, 10000], [0, 3.4], { tone: 'mint', steps: 100, weight: 2 }),
          DOT(184, 138, { r: 3, tone: 'amber' }),
          DOT(304, 126, { r: 3, tone: 'cyan' }),
          DOT(420, 96, { r: 3, tone: 'violet' }),
          T(184, 160, '3000 K', { size: 9, tone: 'amber', anchor: 'middle' }),
          T(304, 154, '5800 K', { size: 9, tone: 'cyan', anchor: 'middle' }),
          T(420, 126, '10000 K', { size: 9, tone: 'violet', anchor: 'middle' }),
          TAG(468, 72, 'b = 2.898×10⁻³ m·K', { tone: 'text', size: 10 }),
          T(468, 100, 'λmax = b / T', { size: 11, tone: 'mint' }),
          T(468, 210, 'T ↑ ⇒ λmax ↓', { size: 10.5, tone: 'muted' }),
          T(320, 266, '峰值位置是温度的直接读数', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '1-0': fig(
        '1.2/1-0-f',
        '瑞利—金斯：两个因子的乘积',
        '8πν²/c³ 是单位频率间隔内的模式数，k_BT 是每个模式分到的能量；两者相乘，长波端尚可，短波端按 ν² 冲向无穷。',
        [
          T(320, 24, 'u_ν = 模式密度 × 每模能量', { size: 12.5, tone: 'text', anchor: 'middle' }),
          TAG(40, 56, 'u_ν = 8πν²kT/c³', { tone: 'danger', size: 12 }),
          ...PANEL(40, 78, 172, 118, 'ν²：模式密度', { tone: 'cyan' }),
          CURVE((x) => x * x, { x: 54, y: 100, w: 144, h: 84 }, [0, 1], [0, 1], { tone: 'cyan', steps: 60, weight: 2 }),
          T(48, 218, '8π/c³ 只是常数', { size: 9.5, tone: 'muted' }),
          T(240, 132, '×', { size: 18, tone: 'text', anchor: 'middle' }),
          ...PANEL(268, 78, 128, 118, 'k_BT', { tone: 'amber' }),
          BAND(282, 150, 100, 20, { tone: 'amber', opacity: 0.2 }),
          T(276, 218, '与 ν 无关', { size: 9.5, tone: 'muted' }),
          A(402, 132, 448, 132, { tone: 'danger' }),
          T(500, 118, 'ν → ∞', { size: 12, tone: 'danger', anchor: 'middle' }),
          T(500, 148, 'u → ∞', { size: 11, tone: 'danger', anchor: 'middle' }),
          T(320, 258, '无指数因子兜底：短波端没有上限', { size: 10.5, tone: 'danger', anchor: 'middle' })
        ]
      ),
      '1-1': fig(
        '1.2/1-1-f',
        '维恩公式：指数压住高 ν，却缺了 ν²',
        'ν³e^{−hν/kT} 在短波端靠指数衰减，与实验吻合；长波端展开后是 ν³，比实验的 ν² 多一个 ν，于是偏低。',
        [
          ...AXIS({ x: 58, y: 48, w: 340, h: 176 }, { xLabel: 'ν', yLabel: 'u' }),
          CURVE(planck, { x: 58, y: 48, w: 340, h: 176 }, [0, 520], [0, 1.15], { tone: 'mint', steps: 120 }),
          CURVE(wienTail, { x: 58, y: 48, w: 340, h: 176 }, [0, 520], [0, 1.15], { tone: 'violet', steps: 120, weight: 2, dash: true }),
          T(64, 234, '实线：实验', { size: 9, tone: 'mint' }),
          T(160, 234, '虚线：维恩', { size: 9, tone: 'violet' }),
          T(390, 78, '短波端', { size: 10.5, tone: 'violet' }),
          T(390, 100, '指数衰减正确', { size: 10, tone: 'muted' }),
          T(390, 152, '长波端', { size: 10.5, tone: 'danger' }),
          T(390, 174, '∝ ν³ 而非 ν²', { size: 10, tone: 'muted' }),
          TAG(390, 218, '∝ ν³ e^{−hν/kT}', { tone: 'violet', size: 11 }),
          T(320, 272, '多出的一个 ν 让长波端整体偏低', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      ),
      '2-0': fig(
        '1.2/2-0-f',
        '等间距能级：Δε = hν',
        'n 从 0 起算，ε₀ = 0；相邻能级差恒为 hν。经典的能量斜坡被换成一架等距梯子，正是这个台阶让配分函数可求和。',
        [
          ...PANEL(34, 50, 208, 190, '经典斜坡', { tone: 'dim' }),
          BAND(62, 84, 116, 130, { tone: 'muted', opacity: 0.16 }),
          T(120, 228, 'ε 连续', { size: 9.5, tone: 'muted', anchor: 'middle' }),
          A(252, 140, 296, 140, { tone: 'mint' }),
          T(274, 124, '量子化', { size: 9.5, tone: 'mint', anchor: 'middle' }),
          ...PANEL(306, 50, 300, 190, '等距能级', { tone: 'mint' }),
          ...LEVEL(326, 470, 208, '0', { tone: 'mint', size: 10 }),
          ...LEVEL(326, 470, 176, 'hν', { tone: 'mint', size: 10 }),
          ...LEVEL(326, 470, 144, '2hν', { tone: 'mint', size: 10 }),
          ...LEVEL(326, 470, 112, '3hν', { tone: 'mint', size: 10 }),
          L(500, 208, 500, 176, { tone: 'amber' }),
          T(508, 192, 'Δε = hν', { size: 10, tone: 'amber' }),
          T(320, 262, 'εn = nhν，n = 0, 1, 2, …', { size: 11, tone: 'text', anchor: 'middle' })
        ]
      ),
      '2-1': fig(
        '1.2/2-1-f',
        '普朗克谱：前因子与玻色因子',
        '前因子 8πhν³/c³ 随 ν³ 增长，玻色因子 1/(e^x−1) 随 ν 指数衰减。两者相乘，才得到先升后降的单峰曲线。',
        [
          T(320, 24, '两个因子的拉锯', { size: 12.5, tone: 'text', anchor: 'middle' }),
          TAG(36, 54, 'u_ν = (8πhν³/c³) · 1/(e^x−1)', { tone: 'mint', size: 11 }),
          ...PANEL(38, 84, 178, 126, '前因子 ∝ ν³', { tone: 'mint' }),
          CURVE((x) => x * x * x, { x: 52, y: 106, w: 150, h: 86 }, [0, 1], [0, 1], { tone: 'mint', steps: 50, weight: 2 }),
          T(232, 140, '×', { size: 18, tone: 'text', anchor: 'middle' }),
          ...PANEL(258, 84, 342, 126, '玻色因子 1/(e^x−1)', { tone: 'violet' }),
          ...AXIS({ x: 272, y: 108, w: 300, h: 82 }, { xLabel: 'x = hν/kT' }),
          CURVE((x) => 1 / (Math.exp(x) - 1), { x: 272, y: 108, w: 300, h: 82 }, [0.35, 6], [0, 3.4], { tone: 'violet', steps: 90, weight: 2 }),
          CURVE((x) => 1 / x, { x: 272, y: 108, w: 300, h: 82 }, [0.35, 6], [0, 3.4], { tone: 'dim', steps: 60, dash: true }),
          T(452, 118, 'x ≪ 1 → 1/x', { size: 9, tone: 'dim' }),
          T(452, 176, 'x ≫ 1 → e^{−x}', { size: 9, tone: 'violet' }),
          T(320, 244, 'x 小时回到瑞利—金斯，x 大时被指数切断', { size: 10.5, tone: 'muted', anchor: 'middle' }),
          T(320, 268, '峰值由两因子斜率相抵的位置决定', { size: 10, tone: 'faint', anchor: 'middle' })
        ]
      )
    }
  }
  // __NEXT__
}
