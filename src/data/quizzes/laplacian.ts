import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'laplacian-q1',
    question: '标量拉普拉斯算子 Δf 的定义是哪一个？',
    options: [
      '∇×(∇f)',
      '∇·(∇f)',
      '∇(∇·f)',
      '(∇f)²'
    ],
    answer: 1,
    explanation: 'Δf = ∇·(∇f)：先取梯度得到向量场，再取散度回到标量。∇×(∇f) 恒为零，∇(∇·f) 对标量没有意义，而 (∇f)² 是梯度模长的平方，不是二阶算子。'
  },
  {
    id: 'laplacian-q2',
    question: '在三维直角坐标中，Δ(x² + y² + z²) 等于多少？',
    options: [
      '2',
      '4',
      '6',
      '0'
    ],
    answer: 2,
    explanation: '对 x² 求二阶导得 2，y² 与 z² 各得 2，三项相加为 6。也可以先求梯度 2(x, y, z)，再求散度 2 + 2 + 2 = 6。结果与点的位置无关。'
  },
  {
    id: 'laplacian-q3',
    question: '设 f、g 具有连续二阶偏导，Δ(fg) 的正确展开是？',
    options: [
      'fΔg + gΔf',
      'fΔg + gΔf + ∇f·∇g',
      'fΔg + gΔf + 2∇f·∇g',
      '2fΔg + 2gΔf'
    ],
    answer: 2,
    explanation: '由 ∇(fg) = f∇g + g∇f，再对两项分别用散度的乘积法则，得到 fΔg + ∇f·∇g 与 gΔf + ∇g·∇f。两个点积相等，合并后交叉项系数为 2。漏掉 2 是最常见的错误。'
  },
  {
    id: 'laplacian-q4',
    question: '三维球面平均的泰勒展开中，⟨f⟩ 与中心值 f 的差主项是？',
    options: [
      'r²Δf/2',
      'r²Δf/4',
      'r²Δf/6',
      'r²Δf/12'
    ],
    answer: 2,
    explanation: '球面上 s_i s_j 的平均是 (r²/3)δ_ij，二次项贡献为 (1/2)(r²/3)Δf = r²Δf/6。二维圆周的系数是 1/4，一维两端的系数是 1/2，三者不能混用。'
  },
  {
    id: 'laplacian-q5',
    question: '在三维中，当 r = |x| ≠ 0 时，Δ(1/r) 等于？',
    options: [
      '0',
      '−4πδ',
      '1/r²',
      'δ'
    ],
    answer: 0,
    explanation: '三个二阶偏导相加时交叉项相消，得到 Δ(1/r) = 0（r ≠ 0）。在原点处函数奇异，作为分布才有 Δ(1/r) = −4πδ；−4πδ 不能用来回答 r ≠ 0 的取值。'
  },
  {
    id: 'laplacian-q6',
    question: '设 f 在圆盘内调和、在闭圆盘上连续。它的最大值一定在哪里取得？',
    options: [
      '圆盘中心',
      '圆周边界上',
      '任意内部点',
      '所有点都相同'
    ],
    answer: 1,
    explanation: '极值原理指出调和函数在有界连通区域的内部不能取得最大值或最小值，除非函数为常数。因此最大值必在边界上取得；常数情形下边界也取到同一个值。'
  }
]

export default questions
