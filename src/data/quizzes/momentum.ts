import type { QuizQuestion } from '../quizTypes'

const questions: QuizQuestion[] = [
  {
    id: 'momentum-q1',
    question: '在坐标表象中，一维动量算符的正确形式是？',
    options: [
      'iℏ d/dx',
      '−iℏ d/dx',
      '−ℏ d/dx',
      'iℏ d²/dx²'
    ],
    answer: 1,
    explanation: '动量算符 p̂ = −iℏ d/dx。把它作用在 e^{ikx} 上，求导给出 ik，再乘以 −iℏ，得到 ℏk；负号与虚数单位共同保证本征值为实数。若写成 +iℏ d/dx，e^{ikx} 的本征值会变成 −ℏk，与德布罗意关系相反。'
  },
  {
    id: 'momentum-q2',
    question: '取 ψ = A e^{i2x}，p̂ψ 等于？',
    options: [
      '2ℏψ',
      '−2ℏψ',
      'ℏψ',
      '2ψ'
    ],
    answer: 0,
    explanation: 'p̂ψ = −iℏ d/dx(A e^{i2x}) = −iℏ · 2i A e^{i2x} = 2ℏψ。因为 −iℏ · 2i = 2ℏ。波数 k = 2，本征值 p = ℏk = 2ℏ。负号与 i 相乘得正，这是动量本征值为实数的具体体现。'
  },
  {
    id: 'momentum-q3',
    question: '长度 L 的周期箱中，n = 1 的动量本征值是？',
    options: [
      '2πℏ/L',
      'πℏ/L',
      '4πℏ/L',
      'ℏ/L'
    ],
    answer: 0,
    explanation: '周期边界要求 e^{ikL} = 1，即 kL = 2πn。n = 1 时 k = 2π/L，p = ℏk = 2πℏ/L。若换成硬壁边界，驻波的动量成分是 ±πℏ/L，这是另一套量子化，不能与周期箱的 2πℏ/L 混用。'
  },
  {
    id: 'momentum-q4',
    question: '位置算符与动量算符的对易子 [x̂, p̂] 等于？',
    options: [
      '−iℏ',
      'iℏ',
      '0',
      'ℏ'
    ],
    answer: 1,
    explanation: '作用在任意 f 上：[x̂, p̂]f = x(−iℏf′) − (−iℏ)(xf)′ = −iℏxf′ + iℏ(f + xf′) = iℏf。因为对任意 f 成立，所以算符等式 [x̂, p̂] = iℏ 成立。这个非零对易子是 σxσp ≥ ℏ/2 的代数来源。'
  },
  {
    id: 'momentum-q5',
    question: '归一化高斯波包取到不确定性关系的等号，此时 σxσp 等于？',
    options: [
      '0',
      'ℏ/2',
      'ℏ',
      '2ℏ'
    ],
    answer: 1,
    explanation: '取 ψ 为宽度 σ 的高斯波包，则 σx = σ/√2，σp = ℏ/(√2σ)，乘积为 ℏ/2。一般态满足 σxσp ≥ ℏ/2；只有使柯西–施瓦茨等号成立的高斯波包才恰好取到 ℏ/2。把不确定性当成恒等式是常见错误。'
  },
  {
    id: 'momentum-q6',
    question: '硬壁箱中的驻波 sin(nπx/L) 与动量本征态有什么关系？',
    options: [
      '它是动量为 ℏnπ/L 的单一本征态',
      '它不是动量本征态，只含 ±πℏn/L 两个动量成分',
      '它的动量恒为零',
      '它对应连续的动量谱'
    ],
    answer: 1,
    explanation: '硬壁条件要求波函数在两端为零，动量本征函数 A e^{ikx} 无法满足 ψ(0) = 0（除非 A = 0）。把正弦展开为两个复指数，得到 e^{i nπx/L} 与 e^{−i nπx/L} 的等权叠加，对应动量 πℏn/L 与 −πℏn/L。因此 sin 不是动量本征态，测量动量会以各半的概率得到这两个值。'
  }
]

export default questions
