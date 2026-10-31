import type { CourseDefinition, LessonMeta, LessonStep, Params } from './types'

export interface GraphNode {
  id: string
  label: string
  group: 'core' | 'growth' | 'math' | 'meta'
  position: [number, number, number]
  size: number
}

export interface GraphEdge {
  a: string
  b: string
}

export const GRAPH_NODES: GraphNode[] = [
  { id: 'graph', label: '知识图谱', group: 'core', position: [0, 0, 0], size: 0.3 },
  { id: 'malthus', label: '马尔萨斯模型', group: 'growth', position: [-1.5, 1.15, 0.3], size: 0.2 },
  { id: 'ode', label: '微分方程', group: 'math', position: [-2.7, 1.8, -0.4], size: 0.16 },
  { id: 'exp', label: '指数增长', group: 'growth', position: [-0.35, 2.15, -0.5], size: 0.16 },
  { id: 'double', label: '倍增时间', group: 'growth', position: [1.15, 1.85, 0.15], size: 0.16 },
  { id: 'logistic', label: '逻辑斯蒂增长', group: 'growth', position: [1.8, 0.55, 0.55], size: 0.2 },
  { id: 'k', label: '环境容量 K', group: 'growth', position: [1.05, -0.85, 0.2], size: 0.16 },
  { id: 'limit', label: '极限', group: 'math', position: [-1.8, -0.35, 0.8], size: 0.16 },
  { id: 'e', label: '自然常数 e', group: 'math', position: [-0.55, -1.5, -0.3], size: 0.2 },
  { id: 'compound', label: '连续复利', group: 'meta', position: [0.85, -1.7, 0.95], size: 0.16 }
]

export const GRAPH_EDGES: GraphEdge[] = [
  { a: 'graph', b: 'malthus' },
  { a: 'graph', b: 'logistic' },
  { a: 'graph', b: 'limit' },
  { a: 'graph', b: 'compound' },
  { a: 'malthus', b: 'ode' },
  { a: 'malthus', b: 'exp' },
  { a: 'exp', b: 'double' },
  { a: 'logistic', b: 'malthus' },
  { a: 'logistic', b: 'k' },
  { a: 'limit', b: 'e' },
  { a: 'e', b: 'compound' },
  { a: 'compound', b: 'exp' }
]

export const GROWTH_PATH = ['graph', 'malthus', 'logistic', 'k']
export const LIMIT_PATH = ['graph', 'limit', 'e', 'compound']

const raw = String.raw

export const graphMeta: LessonMeta = {
  index: '004',
  title: '知识关系图谱',
  subtitle: '让概念之间的依赖关系，变成可以行走的空间。',
  field: '认知工具 · 图结构',
  duration: '约 6 分钟',
  year: '2026',
  author: 'ANIMA'
}

export const graphSteps: LessonStep[] = [
  {
    id: 'question',
    nav: '问题',
    kicker: '序 · 知识的结构',
    title: '知识不是清单，而是一张网络',
    lead: '单独记住一条公式，很快会忘；把它放进关系里，它才开始有位置。',
    paragraphs: [
      '马尔萨斯方程、逻辑斯蒂增长、自然常数 e，并不是三件彼此孤立的知识。它们共享同一条「增长」的骨架。',
      '一门课程可以是一个节点，一个概念也可以是一个节点。节点之间的边，记录它们如何支撑、修正或连接彼此。'
    ],
    formulas: [{ math: raw`G = \left(V,\,E\right)`, note: '一张图：一组节点与一组边' }],
    formulaCaption: 'V：概念节点　E：概念之间的依赖关系',
    insight: '理解一个概念，往往是理解了它与周围概念的距离。',
    annotation: { tag: 'NETWORK', text: '概念不是孤岛，而是一张图', tone: 'dim' },
    duration: 14000
  },
  {
    id: 'nodes',
    nav: '节点',
    kicker: '01 · V 的概念',
    title: '先把概念摆成节点',
    lead: '每一个节点，是一个可以被单独讲解、单独理解的概念。',
    paragraphs: [
      '本平台的四节课、九条核心概念，被压缩成十个节点。它们有大小差异：越核心的概念，连接越多，节点越大。',
      '节点的位置不是随意的。相近的概念，被放在相近的空间区域；数学、生态、金融，各自聚成一团。'
    ],
    formulas: [{ math: raw`V = \left\{v_1, v_2, \dots, v_n\right\}`, note: '节点集合' }],
    formulaCaption: 'n = 10：本图谱包含十个概念节点',
    insight: '先看见有哪些东西，再看见它们如何相连。',
    annotation: { tag: 'NODES', text: '每个节点，都是一个可讲解的概念', tone: 'mint' },
    duration: 16000
  },
  {
    id: 'edges',
    nav: '边',
    kicker: '02 · E 的关系',
    title: '概念之间，长出依赖的边',
    lead: '一条边表示：理解后者，需要前者；或者后者修正了前者的边界。',
    paragraphs: [
      '马尔萨斯模型依赖微分方程，指数增长依赖马尔萨斯模型；逻辑斯蒂增长又修正了马尔萨斯模型，并把环境容量 K 拉了进来。',
      '边让知识从「并列」变成「有方向」。你可以沿着边，从一个问题走到另一个问题。'
    ],
    formulas: [
      {
        math: raw`E \subseteq V \times V`,
        note: '边是节点之间的有序关系'
      }
    ],
    formulaCaption: '有向边表示支撑、推出或修正关系',
    chips: [
      { label: '支撑', tone: 'mint' },
      { label: '推出', tone: 'cyan' },
      { label: '修正', tone: 'violet' }
    ],
    insight: '有方向的边，才让「学习路径」成为可能。',
    annotation: { tag: 'EDGES', text: '依赖关系让概念有了方向', tone: 'amber' },
    duration: 17000
  },
  {
    id: 'path',
    nav: '路径',
    kicker: '03 · 人口的路径',
    title: '沿着边，从问题走到答案',
    lead: '从「知识图谱」出发，经过马尔萨斯模型与逻辑斯蒂增长，最终抵达环境容量 K。',
    paragraphs: [
      '一条路径，就是一串被依赖关系连接起来的节点。它把分散的概念，组织成一次可以跟随的旅程。',
      '在这条人口主线上，你不需要先理解环境容量，才能理解马尔萨斯；顺序由边决定，而不是由目录决定。'
    ],
    formulas: [
      {
        math: raw`\htmlClass{hl-a}{v_0 \to v_1 \to v_2 \to v_3}`,
        note: '一条长度为 3 的学习路径'
      }
    ],
    formulaCaption: 'v₀：知识图谱　v₃：环境容量 K',
    insight: '路径比清单更有用，因为它告诉你下一步该学什么。',
    annotation: { tag: 'PATH', text: '知识图谱 → 马尔萨斯 → 逻辑斯蒂 → K', tone: 'mint' },
    duration: 18000
  },
  {
    id: 'matrix',
    nav: '矩阵',
    kicker: '04 · 图的写法',
    title: '一张矩阵，记录所有连接',
    lead: '把每一对节点是否相连写成 0 和 1，图就变成了一个可以计算的矩阵。',
    paragraphs: [
      '邻接矩阵 A 的行与列都是节点。若第 i 个节点指向第 j 个节点，Aᵢⱼ = 1，否则为 0。',
      '矩阵让「关系」变成「数字」：你可以用乘法寻找两跳关系，用求幂寻找更长的路径。这是推荐系统与知识图谱共同的底层结构。'
    ],
    formulas: [
      {
        math: raw`A_{ij} = \begin{cases} 1 & (v_i,\,v_j) \in E \\ 0 & \text{otherwise} \end{cases}`,
        note: '邻接矩阵的定义'
      }
    ],
    formulaCaption: 'A：10 × 10 的邻接矩阵，记录 12 条有向边',
    chips: [
      { label: '1　存在关系', tone: 'mint' },
      { label: '0　没有关系', tone: 'amber' }
    ],
    insight: '图是看得见的关系，矩阵是算得动的关系。',
    annotation: { tag: 'MATRIX', text: '关系可以被写成 0 与 1', tone: 'violet' },
    duration: 18000
  },
  {
    id: 'explore',
    nav: '探索',
    kicker: '05 · 亲手走一遍',
    title: '沿着关系，自己走一遍',
    lead: '拨动「关联深度」，看看从中心节点出发，能摸到多少概念。',
    paragraphs: [
      '深度为 1，只能到达中心节点的直接邻居；深度为 2，邻居的邻居也被点亮；深度为 3，整张图都被覆盖。',
      '这正是课程设计的隐喻：先看直接相关的内容，再逐层向外扩展。'
    ],
    formulas: [
      {
        math: raw`\deg(v) = \left|\left\{u \;:\; (v, u) \in E\right\}\right|`,
        note: '一个节点的出度'
      }
    ],
    formulaCaption: '中心节点「知识图谱」的出度为 4',
    insight: '下面把图交给你：拖动关联深度，观察点亮范围如何扩张。',
    annotation: { tag: 'DEPTH', text: '从中心出发，逐层扩展', tone: 'violet' },
    duration: 0
  }
]

function distancesFromHub() {
  const distances = new Map<string, number>([['graph', 0]])
  const queue: string[] = ['graph']
  while (queue.length) {
    const current = queue.shift()!
    const distance = distances.get(current)!
    for (const edge of GRAPH_EDGES) {
      const other = edge.a === current ? edge.b : edge.b === current ? edge.a : null
      if (other && !distances.has(other)) {
        distances.set(other, distance + 1)
        queue.push(other)
      }
    }
  }
  return distances
}

const graphDistances = distancesFromHub()

function countWithinDepth(depth: number) {
  return GRAPH_NODES.filter((node) => (graphDistances.get(node.id) ?? 99) <= depth).length
}

export const graphCourse: CourseDefinition = {
  id: 'graph',
  scene: 'graph',
  stageId: 'ANIMA · LESSON 004 / 认知工具',
  meta: graphMeta,
  steps: graphSteps,
  controls: [
    {
      key: 'depth',
      label: '关联深度',
      min: 1,
      max: 3,
      step: 1,
      default: 2,
      format: (value) => `${Math.round(value)} 层`
    }
  ],
  toggles: [
    {
      key: 'rotate',
      label: '自动旋转',
      caption: '让图谱缓慢转动，观察空间结构',
      default: true
    },
    {
      key: 'showPaths',
      label: '高亮两条主线',
      caption: '人口主线与自然常数主线',
      default: true
    }
  ],
  annotationFor(index, params: Params) {
    if (index === 5) {
      return {
        tag: 'DEPTH',
        text: `深度 ${Math.round(params.depth)}：点亮 ${countWithinDepth(params.depth)} / ${GRAPH_NODES.length} 个节点`,
        tone: 'violet'
      }
    }
    return graphSteps[index].annotation ?? { tag: '', text: '', tone: 'mint' }
  },
  hud: {
    cells: [
      { label: '节点 |V|', value: () => `${GRAPH_NODES.length}` },
      { label: '边 |E|', value: () => `${GRAPH_EDGES.length}` },
      {
        label: '关联深度',
        value: (p) => `${Math.round(p.depth)} 层`
      },
      {
        label: '点亮节点',
        value: (p) => `${countWithinDepth(p.depth)} / ${GRAPH_NODES.length}`
      }
    ],
    foot: {
      label: '人口主线',
      value: () => '马尔萨斯 → 逻辑斯蒂 → K'
    }
  },
  liveFormula: (p) =>
    String.raw`G=(V,E),\quad |V|=${GRAPH_NODES.length},\quad |E|=${GRAPH_EDGES.length},\quad d=${Math.round(p.depth)}`,
  stats: [
    {
      label: '节点 |V|',
      value: () => `${GRAPH_NODES.length}`
    },
    {
      label: '边 |E|',
      value: () => `${GRAPH_EDGES.length}`
    },
    {
      label: '覆盖节点',
      value: (p) => `${countWithinDepth(p.depth)} / ${GRAPH_NODES.length}`
    }
  ],
  exploreTitle: '沿着关系走一遍'
}
