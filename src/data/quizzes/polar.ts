import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'polar-q1',
    question: '极坐标中，∂θ/∂x 等于哪一个？',
    options: [
      'sin θ / r',
      '−sin θ / r',
      'cos θ / r',
      '−cos θ / r'
    ],
    answer: 1,
    explanation: '由 θ = arctan(y/x) 或对 x = r cos θ 作隐函数微分，可得 ∂θ/∂x = −y/(x² + y²) = −sin θ/r。∂θ/∂y = x/(x² + y²) = cos θ/r。角向导数总带 1/r。'
  },
  {
    id: 'polar-q2',
    question: '极坐标下拉普拉斯算子的正确形式是？',
    options: [
      '∂²/∂r² + (1/r)∂/∂r + (1/r²)∂²/∂θ²',
      '∂²/∂r² + (1/r²)∂²/∂θ²',
      '∂²/∂r² + (2/r)∂/∂r + (1/r²)∂²/∂θ²',
      '(1/r)∂/∂r(r∂/∂r) + ∂²/∂θ²'
    ],
    answer: 0,
    explanation: '逐项展开 ∂²/∂x² 与 ∂²/∂y² 后交叉项抵消，得到 ∂r² + (1/r)∂r + (1/r²)∂θ²。等价写法是 (1/r)∂r(r∂r) + (1/r²)∂θ²。系数 2/r 是三维球坐标的径向项，不是二维极坐标。'
  },
  {
    id: 'polar-q3',
    question: '极坐标拉普拉斯中一阶项 (1/r)∂/∂r 的主要来源是？',
    options: [
      '角向导数本身自带 1/r',
      '一阶算子中的系数 cos θ 与 sin θ/r 在第二次求导时也被求导',
      '雅可比行列式等于 r',
      '对 x 的链式法则只有一项'
    ],
    answer: 1,
    explanation: '∂/∂x = cos θ∂r − (sin θ/r)∂θ 中的两个系数都依赖 r、θ。再作用一次时必须对整个乘积用乘积法则，系数导数分别给出 sin²θ/r 与 cos²θ/r，相加即 1/r。只把 ∂r 换成 ∂x 会漏掉这一项。'
  },
  {
    id: 'polar-q4',
    question: '当 r > 0 时，Δ(ln r) 等于？',
    options: [
      '0',
      '1/r²',
      '2πδ',
      '1/r'
    ],
    answer: 0,
    explanation: 'Δ(ln r) = −1/r² + (1/r)(1/r) = 0，在 r > 0 上处处调和。作为分布才有 Δ(ln r) = 2πδ，强度集中在原点；2πδ 不是 r > 0 时的点值。'
  },
  {
    id: 'polar-q5',
    question: '对哪些整数 n，函数 r^n cos nθ 在 r > 0 上调和？',
    options: [
      '只有 n = 0',
      '只有 n = 1',
      '所有整数 n ≥ 0',
      '只有 n ≥ 2'
    ],
    answer: 2,
    explanation: 'Δ(r^n cos nθ) = [n(n−1) + n − n²]r^{n−2}cos nθ = 0，对任意整数 n 都成立，包括 n = 0 的常数。注意纯径向的 r^n 只在 n = 0 时调和；n = 1 的 r 不调和，但 r cos θ 与 r sin θ 调和。'
  },
  {
    id: 'polar-q6',
    question: '半径 R 的圆盘内 Δu = 0，边界 u(R, θ) = cos²θ。圆心处的 u(0, θ) 等于？',
    options: [
      '0',
      '1/2',
      '1',
      '1/4'
    ],
    answer: 1,
    explanation: '调和函数的中心值等于边界平均值。cos²θ = (1 + cos 2θ)/2，在一个周期上的平均是 1/2，所以 u(0) = 1/2。也可以由解 u = 1/2 + (r/R)²(1/2)cos 2θ 直接代入 r = 0 得到 1/2。'
  }
]

export default questions
