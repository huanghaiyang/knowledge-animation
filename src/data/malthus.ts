import type { CourseControl, CourseDefinition, LessonStep, Params, Toggles } from './types'

export type { ChipTone, FormulaLine, LessonStep, StepChip } from './types'

export const HORIZON = 80
export const DEFAULT_N0 = 100
export const DEFAULT_R = 0.028
export const FOOD0 = 100
export const FOOD_RATE = 5

export const lessonMeta = {
  index: '001',
  title: '马尔萨斯人口模型',
  subtitle: '一条微分方程，如何预言人口的爆炸？',
  field: '人口学 · 微分方程',
  duration: '约 8 分钟',
  year: '1798',
  author: 'Thomas Robert Malthus'
}

const raw = String.raw

export const lessonSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 1798',
    title: '人口，会一直涨下去吗？',
    lead: '马尔萨斯关心的不是某一年的人口，而是一个更尖锐的问题：增长速度本身，会不会失控。',
    paragraphs: [
      '1798 年，托马斯·马尔萨斯写下一本薄薄的小册子。他面前没有电脑，也没有人口数据库，只有一条朴素的观察：人会生育，土地却有限。',
      '要回答「会不会失控」，只盯着一个人口数字是不够的。我们需要找到真正描述人口的量——它变化得有多快。'
    ],
    formulas: [
      { math: raw`N(t) = \;?`, note: '一个尚未被解出的函数' }
    ],
    formulaCaption: 'N = N(t)：t 时刻的人口数量',
    insight: '视角的转变：从「有多少人」，转向「增加得多快」。',
    duration: 16000
  },
  {
    id: 'assumption',
    nav: '假设',
    kicker: '01 · 两条假设',
    title: '先让世界变得简单',
    lead: '在一个封闭的人群里，出生与死亡的数量，都正比于现有人数。',
    paragraphs: [
      '把生育与死亡压缩成两个常数：出生率 b 与死亡率 d。两者相减，得到人均增长率 r。',
      '只要 r 为正，下一年新增的人就会比上一年多。人口越多，增长越快——一种自我放大的循环。'
    ],
    formulas: [
      {
        math: raw`r = \htmlClass{hl-a}{b - d}`,
        note: '人均增长率，假设为常数'
      },
      {
        math: raw`N_{t+1} = N_t + \htmlClass{hl-b}{rN_t}`,
        note: '每一年的增量，正比于当年人口'
      }
    ],
    formulaCaption: 'b：出生率　d：死亡率　r：人均增长率',
    chips: [
      { label: 'r > 0　增长', tone: 'mint' },
      { label: 'r = 0　静止', tone: 'cyan' },
      { label: 'r < 0　衰减', tone: 'amber' }
    ],
    insight: 'r 恒定的假设，是这个模型最锋利、也最脆弱的地方。',
    duration: 18000
  },
  {
    id: 'equation',
    nav: '方程',
    kicker: '02 · 连续时间',
    title: '增长的速度，正比于人口本身',
    lead: '把一年一次的跳跃，想象成连续流动的时间，微分方程便出现了。',
    paragraphs: [
      '人口 N 的瞬时变化率 dN/dt，等于 r 乘以此刻的人口 N。这就是马尔萨斯模型的全部内容。',
      '它没有直接给出答案，只是陈述了一件事：人口越多，增长得越快。剩下的工作，是把这个方程解开。'
    ],
    formulas: [
      {
        math: raw`\frac{dN}{dt} = \htmlClass{pulse}{rN}`,
        note: '马尔萨斯方程 · 1798'
      }
    ],
    formulaCaption: 'N(t)：人口数量　r：人均增长率　t：时间（年）',
    insight: '注意：方程描述的是「变化的方式」，而不是「变化的结果」。',
    duration: 18000
  },
  {
    id: 'solution',
    nav: '求解',
    kicker: '03 · 逐行推导',
    title: '解开它，得到一条 e 的曲线',
    lead: '把含 N 的项挪到一边，把时间挪到另一边，再对两边积分。',
    paragraphs: [
      '分离变量之后，两边同时积分，得到 ln N 与 rt 的关系。指数运算把对数还原，常数 C 则被初始人口 N₀ 确定。',
      '答案是一条指数曲线：人口不是匀速增加，而是以与自身大小成正比的加速度膨胀。'
    ],
    formulas: [
      { math: raw`\frac{dN}{N} = r\,dt`, note: '① 分离变量' },
      { math: raw`\int \frac{dN}{N} = \int r\,dt`, note: '② 两边积分' },
      { math: raw`\ln N = rt + C`, note: '③ 取指数' },
      {
        math: raw`N(t) = N_0\,\htmlClass{hl-c}{e^{rt}}`,
        note: '④ 代入初值 N(0) = N₀'
      }
    ],
    formulaCaption: 'C 由初始人口确定；N₀ 即 N(0)',
    insight: '指数曲线是「增长率的增长」：斜率随着高度一起增大。',
    duration: 26000
  },
  {
    id: 'series',
    nav: '两条级数',
    kicker: '04 · 两个级数',
    title: '人口按几何增长，粮食只能按算术增长',
    lead: '马尔萨斯用两个级数，给这场竞赛划出了悬殊的比分：1、2、4、8…… 对 1、2、3、4……',
    paragraphs: [
      '在最乐观的假设下，生活资料也只能每年增加一个固定的量。人口却在按比例复制自己，每翻一次倍，增量就不再是原来的量级。',
      '两条线起初贴得很近，随后越离越远。差距不是慢慢拉开的，而是越拉越快。'
    ],
    formulas: [
      { math: raw`N(t) = N_0\,e^{rt}`, note: '人口 · 几何级数' },
      { math: raw`F(t) = F_0 + a\,t`, note: '食物 · 算术级数' }
    ],
    formulaCaption: 'F₀：初始食物供给　a：每年新增的供给量',
    chips: [
      { label: '人口　×2 ×4 ×8', tone: 'mint' },
      { label: '食物　+a +a +a', tone: 'amber' }
    ],
    insight: '按本课参数，约第 39 年人口追平食物；到第 80 年，人口已接近食物的两倍。',
    duration: 22000
  },
  {
    id: 'doubling',
    nav: '倍增',
    kicker: '05 · 常数翻倍',
    title: '指数增长真正的尺度：翻倍时间',
    lead: '指数增长有一个残酷的性质——「翻一倍」所需的时间，是常数。',
    paragraphs: [
      '令人口变为原来的两倍，两边取对数，就能解出翻倍时间 T_d。它只与增长率 r 有关，与人口规模毫无关系。',
      '若 r = 2.8%，人口每 24.7 年翻一倍。四个翻倍之后是十六倍，八个翻倍之后就是两百五十倍。'
    ],
    formulas: [
      {
        math: raw`N(T_d) = 2N_0 \;\Longrightarrow\; e^{rT_d} = 2`,
        note: '翻倍的定义'
      },
      {
        math: raw`T_d = \frac{\htmlClass{pulse}{\ln 2}}{r} \approx \frac{0.693}{r}`,
        note: '翻倍时间'
      }
    ],
    formulaCaption: '示例：r = 2.8% 时，T_d ≈ 24.7 年',
    insight: '从 1 亿到 2 亿，和从 10 亿到 20 亿，需要的时间完全一样。',
    duration: 22000
  },
  {
    id: 'limits',
    nav: '边界',
    kicker: '06 · 模型的边界',
    title: '现实会给指数增长踩下刹车',
    lead: '资源无限、r 恒定——这两条假设，只在很短的时间、很小的尺度里近似成立。',
    paragraphs: [
      '饥荒、疾病、技术革新与生育意愿，都会改变 r；土地与环境，也给人口设定了无法越过的上限。',
      '更接近现实的修正是逻辑斯蒂模型：人口越多，剩余空间越少，增长自动变慢。马尔萨斯拉响了警报，刹车却藏在括号里。'
    ],
    formulas: [
      {
        math: raw`\frac{dN}{dt} = \htmlClass{hl-d}{rN\left(1 - \frac{N}{K}\right)}`,
        note: '逻辑斯蒂方程 · 带环境容量 K'
      }
    ],
    formulaCaption: 'K：环境容量（carrying capacity）；N 远小于 K 时，近似指数增长',
    chips: [
      { label: '资源存在上限', tone: 'amber' },
      { label: 'r 并非恒定', tone: 'cyan' },
      { label: '技术会移动 K', tone: 'violet' }
    ],
    insight: '下面把参数交给你：拨动 N₀ 与 r，看曲线如何回应。',
    duration: 0
  }
]

const int = (value: number) => Math.round(value).toLocaleString('en-US')
const pct = (value: number) => `${(value * 100).toFixed(1)}%`

const controls: CourseControl[] = [
  { key: 'n0', label: '初始人口 N₀', min: 40, max: 300, step: 10, default: DEFAULT_N0 },
  {
    key: 'r',
    label: '人均增长率 r',
    min: 0.01,
    max: 0.05,
    step: 0.001,
    default: DEFAULT_R,
    format: pct
  }
]

export const malthusCourse: CourseDefinition = {
  id: 'malthus',
  scene: 'malthus',
  stageId: 'ANIMA · LESSON 001 / 人口学',
  meta: lessonMeta,
  steps: lessonSteps,
  controls,
  toggles: [
    {
      key: 'logistic',
      label: '引入环境容量 K',
      caption: '叠加逻辑斯蒂修正曲线',
      default: false
    }
  ],
  annotationFor(index: number, params: Params, toggles: Toggles) {
    switch (lessonSteps[index].id) {
      case 'question':
        return { tag: 'UNKNOWN', text: '未知函数：人口如何随时间变化', tone: 'dim' }
      case 'assumption':
        return { tag: 'HYPOTHESIS', text: 'r = b − d，假设为常数', tone: 'mint' }
      case 'equation':
        return { tag: 'EQUATION', text: '增长速率正比于当前人口', tone: 'mint' }
      case 'solution':
        return { tag: 'SOLUTION', text: '指数解：N₀ · e^rt', tone: 'mint' }
      case 'series':
        return { tag: 'TWO SERIES', text: '几何增长对上算术供给', tone: 'amber' }
      case 'doubling':
        return {
          tag: 'DOUBLING',
          text: `r = ${pct(params.r)}，每 ${(Math.LN2 / params.r).toFixed(1)} 年翻倍`,
          tone: 'mint'
        }
      default:
        return toggles.logistic
          ? { tag: 'BOUNDARY', text: '环境容量把曲线折成 S 形', tone: 'violet' }
          : { tag: 'BOUNDARY', text: '环境容量 K 会折弯曲线', tone: 'violet' }
        }
  },
  hud: {
    cells: [
      { label: '初始人口 N₀', value: (p) => int(p.n0) },
      { label: '增长率 r', value: (p) => pct(p.r) },
      { label: '第 80 年 N', value: (p) => int(p.n0 * Math.exp(p.r * HORIZON)) },
      { label: '翻倍时间 T_d', value: (p) => `${(Math.LN2 / p.r).toFixed(1)} 年` }
    ],
    foot: {
      label: '粮食供给 F(80)',
      value: () => int(FOOD0 + FOOD_RATE * HORIZON)
    }
  },
  liveFormula: (p) => String.raw`N(t) = ${Math.round(p.n0)}\,e^{${p.r.toFixed(3)}t}`,
  stats: [
    {
      label: '第 80 年人口',
      value: (p) => int(p.n0 * Math.exp(p.r * HORIZON))
    },
    {
      label: '翻倍时间 T_d',
      value: (p) => `${(Math.LN2 / p.r).toFixed(1)} 年`
    },
    {
      label: '人口 / 粮食',
      value: (p) => `${((p.n0 * Math.exp(p.r * HORIZON)) / (FOOD0 + FOOD_RATE * HORIZON)).toFixed(2)}×`,
      warn: (p) => (p.n0 * Math.exp(p.r * HORIZON)) / (FOOD0 + FOOD_RATE * HORIZON) > 1
    }
  ],
  exploreTitle: '把参数交给你'
}

