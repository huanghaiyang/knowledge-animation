import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'vectorops-q1',
    question: '∇ 作用在标量场上时，输出是什么类型？它对应的名称是什么？',
    options: [
      '标量，散度',
      '矢量，梯度',
      '矢量，旋度',
      '标量，拉普拉斯'
    ],
    answer: 1,
    explanation: '∇f 的三个分量是 f 对 x、y、z 的偏导，整体是一个矢量，称为梯度。散度 ∇·F 的输入是矢量、输出是标量；旋度 ∇×F 的输入与输出都是矢量；拉普拉斯 Δf 是梯度再取散度，输入与输出都是标量。'
  },
  {
    id: 'vectorops-q2',
    question: '取 F = (x², xy, z)，在点 (1, 1, 1) 处 div F 等于？',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    answer: 2,
    explanation: 'div F = ∂x(x²) + ∂y(xy) + ∂z(z) = 2x + x + 1 = 3x + 1。把 x = 1 代入得 4。注意第二项对 y 求导时 x 视为常数，结果是 x 而不是 1。'
  },
  {
    id: 'vectorops-q3',
    question: '取 F = (−y, x, 0)，curl F 等于？',
    options: [
      '(0, 0, 0)',
      '(0, 0, 1)',
      '(0, 0, 2)',
      '(2, 0, 0)'
    ],
    answer: 2,
    explanation: '旋度的 z 分量为 ∂x F_y − ∂y F_x = ∂x(x) − ∂y(−y) = 1 − (−1) = 2，x 与 y 分量都为零。这个场是绕 z 轴的刚性旋转，角速度为 1，旋度是角速度的两倍，即 (0, 0, 2)。'
  },
  {
    id: 'vectorops-q4',
    question: '恒等式 curl(grad φ) = 0 成立的根本原因是？',
    options: [
      '梯度场一定是常矢量场',
      '二阶混合偏导连续时可以对易，φ_zy = φ_yz',
      '旋度的定义里有一个负号',
      '标量场没有方向，所以旋度必然为零'
    ],
    answer: 1,
    explanation: '旋度的 x 分量为 φ_zy − φ_yz，y 分量为 φ_xz − φ_zx，z 分量为 φ_yx − φ_xy。只要二阶偏导连续，每一对混合偏导相等，三个分量都为零。这个结论与场是否常数无关。'
  },
  {
    id: 'vectorops-q5',
    question: '在挖去原点的平面上，取 F = (−y, x, 0)/(x² + y²)。下列判断正确的是？',
    options: [
      'curl F = 0，且 F 是保守场',
      'curl F 不为零，所以不是保守场',
      'curl F = 0，但沿单位圆的环量为 2π，故不是保守场',
      'curl F = 0，沿任意闭合曲线的环量都为零'
    ],
    answer: 2,
    explanation: '直接计算可得 curl F = 0，但沿单位圆逆时针积分得到 2π。定义域挖去了原点，不是单连通的，单位圆无法在定义域内张成曲面，斯托克斯定理不能使用。因此「无旋则保守」的等价性只在单连通区域成立。'
  },
  {
    id: 'vectorops-q6',
    question: '取 f = x、F = (x, y, z)，div(fF) 等于？',
    options: [
      'x',
      '3x',
      '4x',
      'x² + y² + z²'
    ],
    answer: 2,
    explanation: 'fF = (x², xy, xz)，逐项求导得 div(fF) = 2x + x + x = 4x。用恒等式验证：∇f = (1, 0, 0)，∇f·F = x；div F = 1 + 1 + 1 = 3，f div F = 3x；相加得 4x，与直接计算一致。'
  }
]

export default questions
