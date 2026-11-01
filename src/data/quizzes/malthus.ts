import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'malthus-q1',
    question: '马尔萨斯方程 dN/dt=rN 中，r 的数学含义是？',
    options: [
      '总人口每年的固定增量',
      '人均增长率，等于出生率减死亡率',
      '环境能容纳的最大人口',
      '人口翻倍所需的时间'
    ],
    answer: 1,
    explanation: 'r=b−d 是人均增长率。方程可写成 (1/N)dN/dt=r，说明每个人平均的增长速率恒定；总增量 rN 会随人口 N 增大，并不是固定值。环境容量与翻倍时间分别对应 K 与 ln2/r。'
  },
  {
    id: 'malthus-q2',
    question: '当 r=0.028 时，倍增时间 T_d=ln2/r 最接近下列哪个值？',
    options: ['12.4 年', '18.0 年', '24.8 年', '35.7 年'],
    answer: 2,
    explanation: 'ln2≈0.693，所以 T_d≈0.693/0.028≈24.75 年，保留一位小数为 24.8 年。倍增时间只由 r 决定，与初始人口 N₀ 无关；35.7 年对应 0.0194 左右的增长率。'
  },
  {
    id: 'malthus-q3',
    question: '用积分因子解 dN/dt=rN 时，下列哪一步是正确的？',
    options: [
      '两边乘 e^{−rt}，得到 d/dt(N e^{−rt})=0',
      '两边乘 e^{rt}，得到 d/dt(N e^{rt})=0',
      '直接积分得到 N=rt+C',
      '两边取对数得到 N=ln(rt)+C'
    ],
    answer: 0,
    explanation: '方程改写为 dN/dt−rN=0，乘以 e^{−rt} 后左端正好是 N e^{−rt} 的导数，故导数为零，积分得 N e^{−rt}=C，再由初值得 N=N₀e^{rt}。用 e^{rt} 不能把两项合并成乘积的导数。'
  },
  {
    id: 'malthus-q4',
    question: '取 r=0.03、Δt=1，按 N_{t+1}=(1+rΔt)N_t 递推。与连续解 N₀e^{rt} 相比，长期的离散解会怎样？',
    options: [
      '长期偏高，因为 (1.03)^t 大于 e^{0.03t}',
      '两者恒等',
      '长期偏低，因为 (1.03)^t 小于 e^{0.03t}',
      '先偏低后偏高，最终相等'
    ],
    answer: 2,
    explanation: '由 ln(1+x)<x（x>0）可得 ln(1.03)<0.03，因此 (1.03)^t<e^{0.03t}。离散复利每一步都少算了“利息在年内继续生息”的部分，误差量级约为 r²tΔt/2；本题中约 0.00045t。'
  },
  {
    id: 'malthus-q5',
    question: '设 r=−0.02、N₀>0，马尔萨斯方程的解具有什么行为？',
    options: [
      'N(t)=N₀e^{−0.02t}，始终为正并趋于 0',
      'N(t) 会穿过 0 并变为负数',
      'N(t)=N₀e^{0.02t}，指数增长',
      'N(t) 恒等于 N₀'
    ],
    answer: 0,
    explanation: '通解为 N=N₀e^{rt}。指数函数恒正，N₀>0 时解始终为正；r=−0.02<0 时单调递减并趋于 0，半衰期为 ln2/0.02≈34.7 年。连续模型不会自行产生负人口。'
  },
  {
    id: 'malthus-q6',
    question: '若初始人口 N₀=0，方程 dN/dt=rN 的解是？',
    options: ['N(t)=e^{rt}', 'N(t)=rt', 'N(t)≡0', '无解，因为不能除以 N'],
    answer: 2,
    explanation: 'N(t)≡0 满足方程与初值。分离变量时除以 N 需要 N>0，因此零解必须单独保留；由解的唯一性，N₀=0 时不可能出现其他解。这说明“除以 N”只是求解技巧，不能丢掉平凡解。'
  }
]

export default questions
