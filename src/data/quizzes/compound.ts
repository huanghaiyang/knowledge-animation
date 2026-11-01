import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'compound-q1',
    question: '自然常数 e 的极限定义是？',
    options: [
      'e=lim(1+1/n)^n，n→∞',
      'e=lim(1+1/n)^(1/n)，n→∞',
      'e=lim n/(n+1)，n→∞',
      'e=lim(1+n)^(1/n)，n→∞'
    ],
    answer: 0,
    explanation: 'e 定义为 (1+1/n)^n 当 n→∞ 时的极限，约 2.71828。它来自“年利率 100%、每年计息 n 次、n 无限增大”的复利极限；该数列单调递增且有上界 3。'
  },
  {
    id: 'compound-q2',
    question: '名义年利率 8%、每月计息一次，有效年利率最接近？',
    options: ['8.00%', '8.16%', '8.30%', '8.33%'],
    answer: 2,
    explanation: '有效年利率为 (1+0.08/12)^12−1≈0.08300，即 8.30%。8.33% 是连续复利的上限 e^{0.08}−1；8.00% 是忽略复利时的名义值。'
  },
  {
    id: 'compound-q3',
    question: '极限 lim(1+r/n)^(nt) 当 n→∞ 等于？',
    options: ['e^{rt}', 'e^{r+t}', '1+rt', 'e^{nrt}'],
    answer: 0,
    explanation: '取对数得 nt ln(1+r/n)=rt·[ln(1+r/n)/(r/n)]。由 ln(1+x)/x→1（x→0），对数趋于 rt，取指数得 e^{rt}。这正是离散复利收敛到连续复利的关键一步。'
  },
  {
    id: 'compound-q4',
    question: '连续复利满足微分方程 dA/dt=rA，且 A(0)=A₀。其解是？',
    options: ['A=A₀(1+rt)', 'A=A₀e^{rt}', 'A=A₀+rt', 'A=A₀e^{r/t}'],
    answer: 1,
    explanation: 'A=A₀e^{rt} 求导得 A′=rA₀e^{rt}=rA，且 t=0 时为 A₀。由解的唯一性，这就是唯一解。A₀(1+rt) 只是线性近似，不满足该微分方程。'
  },
  {
    id: 'compound-q5',
    question: '连续利率 r=5% 时，金额翻倍所需时间最接近？',
    options: ['7.2 年', '10.0 年', '13.9 年', '20.0 年'],
    answer: 2,
    explanation: '翻倍时间 T_d=ln2/r=0.693/0.05≈13.86 年，约 13.9 年。72 法则给出 72/5=14.4 年，只是近似；7.2 年对应约 9.6% 的利率。'
  },
  {
    id: 'compound-q6',
    question: '关于数列 a_n=(1+1/n)^n，下列哪项正确？',
    options: [
      '单调递减，极限为 1',
      '单调递增，且有上界 3',
      '无界，趋于无穷',
      '在 2 与 3 之间振荡，不收敛'
    ],
    answer: 1,
    explanation: '二项式展开后每一项随 n 增大而增大，且新添正项，故数列单调递增；每项不超过 1/k!，而 1+1+Σ1/[k(k−1)]=3，故有上界 3。单调有界数列收敛，其极限就是 e≈2.71828。'
  }
]

export default questions
