import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'logistic-q1',
    question: '逻辑斯蒂方程 dN/dt=rN(1−N/K) 中，人均增长率是？',
    options: ['r', 'r(1−N/K)', 'rN', 'rK/4'],
    answer: 1,
    explanation: '把方程两边除以 N，得 (1/N)dN/dt=r(1−N/K)，所以人均增长率随 N 线性下降。r 是 N 很小时的内禀增长率，rN 是绝对增长率，rK/4 是拐点处的最大绝对增长率。'
  },
  {
    id: 'logistic-q2',
    question: '部分分式分解 1/[N(1−N/K)] 等于下列哪一项？',
    options: [
      '1/N − 1/(K−N)',
      '1/N + 1/(K−N)',
      '1/(K−N) − 1/N',
      'K/N + K/(K−N)'
    ],
    answer: 1,
    explanation: '通分得 1/N+1/(K−N)=(K−N+N)/[N(K−N)]=K/[N(K−N)]。而 N(1−N/K)=N(K−N)/K，其倒数为 K/[N(K−N)]，故恒等式成立。积分时注意 ∫dN/(K−N)=−ln(K−N)。'
  },
  {
    id: 'logistic-q3',
    question: '设 K=1000、r=0.06。逻辑斯蒂增长的最大绝对增长率 rK/4 是多少？',
    options: ['15 个/年', '30 个/年', '60 个/年', '7.5 个/年'],
    answer: 0,
    explanation: '最大增长率出现在 N=K/2=500 处，值为 rN(1−N/K)=0.06×500×0.5=15 个/年，也等于 rK/4=0.06×1000/4=15。rK/2=30 不是本模型的结论。'
  },
  {
    id: 'logistic-q4',
    question: '逻辑斯蒂方程的两个平衡点 N=0 与 N=K 的稳定性如何？',
    options: [
      'N=0 稳定，N=K 不稳定',
      'N=0 不稳定，N=K 渐近稳定',
      '两个都稳定',
      '两个都不稳定'
    ],
    answer: 1,
    explanation: '令 f(N)=rN(1−N/K)，则 f′(N)=r(1−2N/K)。f′(0)=r>0，故 0 不稳定；f′(K)=−r<0，故 K 渐近稳定。并且只要 N₀>0，解都趋于 K；N₀=0 时停留在 0。'
  },
  {
    id: 'logistic-q5',
    question: '取步长使 rΔt=1.5，且 N₀<K，对逻辑斯蒂方程使用显式欧拉迭代。最可能出现什么现象？',
    options: [
      '始终不超过 K，且单调上升',
      '越过 K，并以阻尼振荡的方式收敛到 K',
      '第一步就恒等于 K',
      '单调下降至 0'
    ],
    answer: 1,
    explanation: 'rΔt=1.5>1 时区间 [0,K] 不再不变，单步可能把种群推到 K 以上，例如 N₀=100、K=1000 时前几步可达 1038。由于 1−rΔt=−0.5，K 处的乘子绝对值小于 1，迭代会以阻尼振荡收敛到 K；若 rΔt>2 才出现周期倍化。'
  },
  {
    id: 'logistic-q6',
    question: '设 K=1200、r=0.05，恒定收获率 h=16。该种群的长期行为最可能是？',
    options: [
      '稳定在 K/2=600',
      '有两个正平衡点，稳定在上根',
      '没有正平衡点，种群最终灭绝',
      '稳定在 K=1200'
    ],
    answer: 2,
    explanation: '最大可持续恒定产量为 h_c=rK/4=0.05×1200/4=15。h=16>15 时方程 rN(1−N/K)−h=0 的判别式为负，没有正平衡点；且 dN/dt≤−(16−15)=−1，种群在有限时间内降到 0。'
  }
]

export default questions
