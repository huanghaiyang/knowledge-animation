import type { CourseControl, CourseToggle, Params, Toggles } from '../types'
import type { BookLab } from './types'

const int = (value: number) => `${Math.round(value)}`
const fixed = (digits: number) => (value: number) => value.toFixed(digits)

const wavelengthColor = (nm: number) => {
  if (nm < 450) return '约 450 nm · 紫蓝'
  if (nm < 495) return `${Math.round(nm)} nm · 蓝`
  if (nm < 570) return `${Math.round(nm)} nm · 绿`
  if (nm < 590) return `${Math.round(nm)} nm · 黄`
  return `${Math.round(nm)} nm · 橙红`
}

const effectiveOrbital = (params: Params) => {
  const n = Math.round(params.n)
  const l = Math.min(Math.round(params.l), n - 1)
  const m = Math.max(-l, Math.min(l, Math.round(params.m)))
  return { n, l, m }
}

const orbitalLabel = (n: number, l: number, m: number) => {
  const shell = ['s', 'p', 'd'][l] ?? '?'
  if (l === 0) return `${n}s`
  return `${n}${shell} (m=${m >= 0 ? '+' : ''}${m})`
}

export const bookLabs: BookLab[] = [
  {
    mode: 'duality',
    title: '双缝：粒子如何自己排成条纹',
    caption: '单个电子一次只落在屏幕上的一个点，但大量电子的落点会自己长成干涉条纹。',
    controls: [
      { key: 'd', label: '双缝间距 d', min: 0.2, max: 1, step: 0.02, default: 0.45, format: fixed(2) },
      {
        key: 'lambda',
        label: '电子波长 λ',
        min: 380,
        max: 750,
        step: 1,
        default: 532,
        format: (value) => `${Math.round(value)} nm`
      }
    ],
    toggles: [
      { key: 'hits', label: '累积探测点', caption: '让电子一个一个落在屏幕上', default: true },
      { key: 'envelope', label: '单缝包络', caption: '显示每条缝自身的衍射包络', default: true }
    ],
    readouts: [
      { label: '条纹间距', value: (p) => `${((p.lambda * 1e-6 * 900) / p.d).toFixed(2)} mm` },
      { label: '屏幕宽度', value: () => '12.0 mm' },
          { label: '可见条纹数', value: (p) => `${Math.max(1, Math.round(12 / ((p.lambda * 1e-6 * 900) / p.d)))}` },
      { label: '光色标定', value: (p) => wavelengthColor(p.lambda) }
    ],
    liveNote: (p) =>
      `间距 ${p.d.toFixed(2)} mm、波长 ${Math.round(p.lambda)} nm 时，相邻亮纹相距约 ${(
        (p.lambda * 1e-6 * 900) /
        p.d
      ).toFixed(2)} mm。`
  },
  {
    mode: 'wavepacket',
    title: '自由波包：位置是怎样松开的',
    caption: '一个局域波包由许多动量本征态叠加而成。动量越集中，位置越模糊；时间一长，波包还会自行展宽。',
    controls: [
      { key: 'k0', label: '中心波数 k₀', min: 1, max: 4, step: 0.05, default: 2.2, format: fixed(2) },
      { key: 'sigma0', label: '初始宽度 σ₀', min: 0.4, max: 1.4, step: 0.02, default: 0.8, format: fixed(2) }
    ],
    toggles: [
      { key: 'density', label: '显示概率密度', caption: '叠加 |ψ|² 的黄色包络', default: true },
      { key: 'complex', label: '显示复相位', caption: '沿深度方向展开虚部', default: true }
    ],
    readouts: [
      { label: '群速度 v_g', value: (p) => `${p.k0.toFixed(2)} v₀` },
      { label: 't = 8 时宽度', value: (p) => `${Math.sqrt(p.sigma0 ** 2 + (8 / p.sigma0) ** 2).toFixed(2)} a` },
      { label: '动量不确定度', value: (p) => `Δp = ${(0.5 / p.sigma0).toFixed(2)} p₀` },
      { label: 'Δx·Δp', value: () => '≥ ħ/2' }
    ],
    liveNote: (p) =>
      `σ₀ = ${p.sigma0.toFixed(2)} a 时，波包在 t = 8 将展宽到 ${Math.sqrt(
        p.sigma0 ** 2 + (8 / p.sigma0) ** 2
      ).toFixed(2)} a。`
  },
  {
    mode: 'well',
    title: '无限深势阱：一根弦的量子音阶',
    caption: '两端固定的弦只能容纳半整数个波长。边界条件把连续的波数切成一条条离散的能级。',
    controls: [
      { key: 'n', label: '量子数 n', min: 1, max: 6, step: 1, default: 2, format: int },
      { key: 'mix', label: '叠加权重', min: 0, max: 1, step: 0.02, default: 0.35, format: fixed(2) }
    ],
    toggles: [
      { key: 'superposition', label: '叠加相邻能级', caption: '让 n 与 n+1 一起振荡', default: false },
      { key: 'density', label: '显示概率密度', caption: '叠加 |ψₙ|² 的黄色曲线', default: true }
    ],
    readouts: [
      { label: '能量 Eₙ/E₁', value: (p) => `n² = ${Math.round(p.n) ** 2}` },
      { label: '阱内波长', value: (p) => `λ = ${(2 / Math.round(p.n)).toFixed(2)} L` },
      { label: '节点数', value: (p) => `${Math.max(0, Math.round(p.n) - 1)}` },
      { label: '零点能', value: () => 'E₁ = π²ħ²/2mL²' }
    ],
    liveNote: (p) =>
      `第 ${Math.round(p.n)} 个本征态有 ${Math.max(0, Math.round(p.n) - 1)} 个内部节点，能量是基态的 ${Math.round(p.n) ** 2} 倍。`
  },
  {
    mode: 'tunneling',
    title: '势垒贯穿：穿墙的概率',
    caption: '当能量低于势垒，波函数并不会在边界处归零，而是在势垒内指数衰减，并在另一侧重新长出射波。',
    controls: [
      { key: 'width', label: '势垒宽度 a', min: 0.2, max: 1.4, step: 0.02, default: 0.7, format: fixed(2) },
      { key: 'ratio', label: '能量比 E/V₀', min: 0.15, max: 0.95, step: 0.01, default: 0.6, format: fixed(2) }
    ],
    toggles: [
      { key: 'density', label: '显示概率密度', caption: '强调势垒内的指数衰减', default: true },
      { key: 'decay', label: '标记衰减长度', caption: '画出 1/κ 的参考长度', default: true }
    ],
    readouts: [
      { label: '透射系数 T', value: (p) => `${(transmission(p) * 100).toFixed(2)}%` },
      { label: 'κa', value: (p) => (Math.sqrt(1 - p.ratio) * p.width).toFixed(2) },
      { label: '衰减长度 1/κ', value: (p) => `${(1 / Math.sqrt(1 - p.ratio)).toFixed(2)} a` },
      { label: '反射系数 R', value: (p) => `${((1 - transmission(p)) * 100).toFixed(2)}%` }
    ],
    liveNote: (p) =>
      `E/V₀ = ${p.ratio.toFixed(2)}、a = ${p.width.toFixed(2)} 时，透射概率约 ${(
        transmission(p) * 100
      ).toFixed(2)}%。`
  },
  {
    mode: 'oscillator',
    title: '量子谐振子：最低能量不为零',
    caption: '抛物线势场里的波函数是厄米多项式乘以高斯包络。即便降到最低能级，动能与势能也不会同时为零。',
    controls: [
      { key: 'n', label: '能级 n', min: 0, max: 7, step: 1, default: 2, format: int }
    ],
    toggles: [
      { key: 'density', label: '显示概率密度', caption: '比较量子与经典的概率分布', default: true },
      { key: 'classical', label: '经典转折点', caption: '标出 |x| = x_t 的位置', default: true }
    ],
    readouts: [
      { label: '能量 Eₙ', value: (p) => `(${Math.round(p.n)} + ½) ħω` },
      { label: '节点数', value: (p) => `${Math.round(p.n)}` },
      { label: '经典转折点', value: (p) => `${Math.sqrt(2 * Math.round(p.n) + 1).toFixed(2)} x₀` },
      { label: '零点能', value: () => '½ ħω' }
    ],
    liveNote: (p) =>
      `n = ${Math.round(p.n)} 时，粒子出现在经典禁区之外仍有概率；转折点在 ${Math.sqrt(
        2 * Math.round(p.n) + 1
      ).toFixed(2)} x₀。`
  },
  {
    mode: 'coherent',
    title: '相干态：量子波包的经典节拍',
    caption: '把无穷多个谐振子本征态按泊松权重叠加，可以得到一个不扩散的波包：它像单摆一样来回摆动。',
    controls: [
      { key: 'amp', label: '振幅 A', min: 0.4, max: 2.6, step: 0.02, default: 1.4, format: fixed(2) },
      { key: 'speed', label: '演化速度', min: 0.2, max: 2, step: 0.02, default: 1, format: fixed(2) }
    ],
    toggles: [
      { key: 'classical', label: '经典轨迹', caption: '叠加 A cos ωt 的参考曲线', default: true },
      { key: 'density', label: '概率密度', caption: '显示 |ψ(x,t)|²', default: true }
    ],
    readouts: [
      { label: '平均能量', value: (p) => `(${(p.amp ** 2 + 0.5).toFixed(2)}) ħω` },
      { label: '振荡周期', value: () => '2π/ω' },
      { label: '⟨x⟩ 振幅', value: (p) => `${p.amp.toFixed(2)} x₀` },
      { label: '波包宽度', value: () => '保持 σ = x₀/√2' }
    ],
    liveNote: (p) =>
      `相干态的平均能量是 (A² + ½)ħω = ${(p.amp ** 2 + 0.5).toFixed(2)} ħω；它不扩散，只摆动。`
  },
  {
    mode: 'operator',
    title: '动量本征态：复指数为什么是算符的答案',
    caption: '把动量算符作用在 e^{ikx} 上，得到的还是同一个函数乘以一个数。这个数就是一次测量可能得到的动量。',
    controls: [
      { key: 'k', label: '波数 k', min: 0.6, max: 2.6, step: 0.02, default: 1.6, format: fixed(2) }
    ],
    toggles: [
      { key: 'complex', label: '展开复平面', caption: '把实部与虚部画成三维螺旋', default: true },
      { key: 'arrow', label: '动量箭头', caption: '标出 p = ħk 的方向与大小', default: true }
    ],
    readouts: [
      { label: '动量 p', value: (p) => `${p.k.toFixed(2)} ħ/a` },
      { label: '德布罗意波长', value: (p) => `${(2 * Math.PI / p.k).toFixed(2)} a` },
      { label: '本征值方程', value: () => 'p̂ ψ = ħk ψ' },
      { label: '对易关系', value: () => '[x̂, p̂] = iħ' }
    ],
    liveNote: (p) =>
      `k = ${p.k.toFixed(2)} 时，动量本征值是 ${p.k.toFixed(2)} ħ/a，波长为 ${(
        2 * Math.PI / p.k
      ).toFixed(2)} a。`
  },
  {
    mode: 'hydrogen',
    title: '氢原子：电子云的三种形状',
    caption: '径向波函数决定电子离核多远，球谐函数决定电子云朝哪个方向张开。两者相乘，才是完整的三维轨道。',
    controls: [
      { key: 'n', label: '主量子数 n', min: 1, max: 3, step: 1, default: 2, format: int },
      { key: 'l', label: '角量子数 l', min: 0, max: 2, step: 1, default: 1, format: int },
      { key: 'm', label: '磁量子数 m', min: -2, max: 2, step: 1, default: 0, format: (value) => `${value >= 0 ? '+' : ''}${Math.round(value)}` }
    ],
    toggles: [
      { key: 'cloud', label: '电子云', caption: '按概率密度撒点', default: true },
      { key: 'axis', label: '坐标参考', caption: '显示 x、y、z 轴与原子核', default: true }
    ],
    readouts: [
      {
        label: '轨道',
        value: (p) => {
          const { n, l, m } = effectiveOrbital(p)
          return orbitalLabel(n, l, m)
        }
      },
      {
        label: '径向节点',
        value: (p) => {
          const { n, l } = effectiveOrbital(p)
          return `${n - l - 1}`
        }
      },
      {
        label: '角向节点',
        value: (p) => `${effectiveOrbital(p).l}`
      },
      {
        label: '⟨r⟩',
        value: (p) => {
          const { n, l } = effectiveOrbital(p)
          return `${((3 * n * n - l * (l + 1)) / 2).toFixed(1)} a₀`
        }
      }
    ],
    liveNote: (p) => {
      const { n, l, m } = effectiveOrbital(p)
      return `${orbitalLabel(n, l, m)}：${n - l - 1} 个径向节点，${l} 个角向节点；能量只由 n 决定。`
    }
  }
]

function transmission(params: Params) {
  const ratio = params.ratio
  const width = params.width
  const kappa = Math.sqrt(1 - ratio)
  const sinh = Math.sinh(kappa * width)
  const denominator = 1 + (sinh * sinh) / (4 * ratio * (1 - ratio))
  return 1 / denominator
}

export const labControlDefaults = (controls: CourseControl[]) => {
  const params: Params = {}
  for (const control of controls) params[control.key] = control.default
  return params
}

export const labToggleDefaults = (toggles?: CourseToggle[]) => {
  const values: Toggles = {}
  for (const toggle of toggles ?? []) values[toggle.key] = toggle.default
  return values
}
