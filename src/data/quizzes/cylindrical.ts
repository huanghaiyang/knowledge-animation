import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'cylindrical-q1',
    question: '柱坐标 (ρ, φ, z) 中，角向尺度因子 h_φ 等于？',
    options: [
      '1',
      'ρ',
      'ρ²',
      '1/ρ'
    ],
    answer: 1,
    explanation: 'φ 增加 1 弧度时，半径为 ρ 的圆周上实际走过的弧长是 ρ，所以 h_φ = ρ。径向与轴向的尺度因子都是 1。梯度角向分量因此写成 (1/ρ)∂u/∂φ，体积元也带因子 ρ。'
  },
  {
    id: 'cylindrical-q2',
    question: '柱坐标下拉普拉斯算子的正确形式是？',
    options: [
      '∂²/∂ρ² + (1/ρ)∂/∂ρ + (1/ρ²)∂²/∂φ² + ∂²/∂z²',
      '∂²/∂ρ² + ∂²/∂φ² + ∂²/∂z²',
      '(1/ρ)∂/∂ρ(ρ∂/∂ρ) + (1/ρ)∂²/∂φ² + ∂²/∂z²',
      '∂²/∂ρ² + (1/ρ²)∂/∂ρ + (1/ρ)∂²/∂φ² + ∂²/∂z²'
    ],
    answer: 0,
    explanation: '柱坐标的平面部分与极坐标完全相同，为 ∂ρ² + (1/ρ)∂ρ + (1/ρ²)∂φ²，再补上独立的 ∂z²。等价写法是 (1/ρ)∂ρ(ρ∂ρ) + (1/ρ²)∂φ² + ∂z²。角向项的分母必须是 ρ²，不是 ρ。'
  },
  {
    id: 'cylindrical-q3',
    question: '分离变量时取 Z″ − k²Z = 0，径向 R(ρ) 满足的方程是？',
    options: [
      'ρ²R″ + ρR′ − (k²ρ² + m²)R = 0',
      'ρ²R″ + ρR′ + (k²ρ² − m²)R = 0',
      'R″ + R′ − m²R = 0',
      'ρ²R″ + ρR′ + (m² − k²ρ²)R = 0'
    ],
    answer: 1,
    explanation: 'Z″/Z = k² 时，代入 ρ²R″/R + ρR′/R − m² + ρ²Z″/Z = 0，得 ρ²R″ + ρR′ + (k²ρ² − m²)R = 0，这是标准 Bessel 方程，解为 J_m(kρ) 与 Y_m(kρ)。若取 Z″ + κ²Z = 0，才会得到修正 Bessel 方程。'
  },
  {
    id: 'cylindrical-q4',
    question: '实心圆柱包含 ρ = 0 的轴线，径向解应保留哪一个？',
    options: [
      'J_m(kρ)',
      'Y_m(kρ)',
      'J_m 与 Y_m 都要保留',
      'I_m(kρ) 与 K_m(kρ) 都要保留'
    ],
    answer: 0,
    explanation: 'J_m 在 ρ = 0 处有界，Y_m 在 ρ = 0 处无界并含 ln ρ 项。实心圆柱要求解在轴上有限，所以只能保留 J_m。只有在挖去轴的圆环区域，Y_m 才可能作为独立解保留。'
  },
  {
    id: 'cylindrical-q5',
    question: '取 u = ρ²z，在 ρ = 2、z = 1 处 Δu 等于？',
    options: [
      '0',
      '2',
      '4',
      '8'
    ],
    answer: 2,
    explanation: 'Δ(ρ^m z) = m²ρ^{m−2}z。这里 m = 2，所以 Δu = 4z；在 z = 1 处等于 4，且与 ρ = 2 无关。直接逐项算：平面部分 Δ₂(ρ²) = 4，轴向二阶导为零，故 Δu = 4z。'
  },
  {
    id: 'cylindrical-q6',
    question: '半径 a 的圆柱侧壁取 u = 0，J_0 的第一个正零点约为 2.405。最小的径向特征值 k² 是？',
    options: [
      '(2.405/a)²',
      '(π/a)²',
      '(2.405a)²',
      '(3.832/a)²'
    ],
    answer: 0,
    explanation: '侧壁条件给出 J_0(ka) = 0，所以 ka = j_{0,1} ≈ 2.405，k = 2.405/a，特征值为 k² = (2.405/a)²。π/a 是正弦函数的零点，不是 J_0 的零点；3.832 是 J_1 的第一个零点。'
  }
]

export default questions
