import type { CourseControl, CourseHudCell, CourseToggle, Params } from '../types'
import type { BookLab } from './types'
import {
  bohrEnergy,
  chainGap,
  chainLevel,
  chainWavelength,
  cutoffFrequency,
  cutoffWavelength,
  doubleWellSplit,
  finiteWellSolutions,
  HC_EV_NM,
  photoelectronKmax,
  photonEnergy,
  stmCurrent,
  stmDecay,
  transitionEnergy,
  transitionWavelength,
  vibrationLevel,
  wienPeakNm
} from './physics'

const int = (value: number) => `${Math.round(value)}`
const f1 = (value: number) => value.toFixed(1)
const f2 = (value: number) => value.toFixed(2)

const c = (
  key: string,
  label: string,
  min: number,
  max: number,
  step: number,
  def: number,
  format?: (value: number) => string
): CourseControl => ({ key, label, min, max, step, default: def, format })

const t = (key: string, label: string, caption: string, def = true): CourseToggle => ({
  key,
  label,
  caption,
  default: def
})

const r = (label: string, value: CourseHudCell['value']): CourseHudCell => ({ label, value })

const wellSolutions = (params: Params, half: boolean) => finiteWellSolutions(params.depth ?? 0.9, half)
const wellRatio = (params: Params, half: boolean) => {
  const solutions = wellSolutions(params, half)
  const index = Math.min(Math.max(Math.round(params.n ?? 1) - 1, 0), Math.max(solutions.length - 1, 0))
  return solutions[index]?.ratio ?? 0
}
const wellCount = (params: Params, half: boolean) => wellSolutions(params, half).length
const orbitalN = (p: Params) => Math.round(p.n)
const orbitalL = (p: Params) => Math.min(Math.round(p.l), orbitalN(p) - 1)
const factorial = (value: number) => {
  let result = 1
  for (let i = 2; i <= value; i++) result *= i
  return result
}

export const sectionLabMap: Record<string, BookLab[]> = {
  // ---------- 第一章 ----------
  'qm-1-1': [
    {
      mode: 'wavepacket',
      title: '经典小球 vs 量子波包',
      caption:
        '经典物理把粒子写成一个点，位置与动量可以同时精确；量子力学只能给出一团概率幅。波包越窄，动量谱就越宽。',
      controls: [
        c('k0', '中心波数 k₀', 1, 4, 0.05, 2, f2),
        c('sigma0', '初始宽度 σ₀', 0.4, 1.4, 0.02, 0.7, f2)
      ],
      toggles: [
        t('density', '概率密度', '叠加 |ψ|² 的黄色包络'),
        t('complex', '复相位', '展开虚部，看见波动本身', false)
      ],
      readouts: [
        r('德布罗意波长', (p) => `${(2 * Math.PI / p.k0).toFixed(2)} a`),
        r('群速度', (p) => `${p.k0.toFixed(2)} v₀`),
        r('Δp', (p) => `${(0.5 / p.sigma0).toFixed(2)} p₀`),
        r('Δx·Δp', () => '≥ ħ/2')
      ],
      liveNote: (p) =>
        `σ₀ = ${p.sigma0.toFixed(2)} a 时，这个“粒子”的动量谱宽度约为 ${(0.5 / p.sigma0).toFixed(2)} p₀——经典物理里没有这一项。`
    },
    {
      mode: 'duality',
      title: '从确定轨道到双缝条纹',
      caption:
        '经典力学写出一条确定的轨道；双缝实验给出的却是一张概率分布。单个电子只落一个点，大量电子却自己排成条纹。',
      controls: [
        c('d', '双缝间距 d', 0.2, 1, 0.02, 0.5, f2),
        c('lambda', '电子波长 λ', 380, 750, 1, 532, int)
      ],
      toggles: [
        t('hits', '累积探测点', '电子一个一个落在屏幕上'),
        t('envelope', '单缝包络', '显示每条缝自身的衍射包络')
      ],
      readouts: [
        r('条纹间距', (p) => `${((p.lambda * 1e-6 * 900) / p.d).toFixed(2)} mm`),
        r('可见条纹数', (p) => `${Math.max(1, Math.round(12 / ((p.lambda * 1e-6 * 900) / p.d)))}`),
        r('波长', (p) => `${Math.round(p.lambda)} nm`),
        r('单点落屏', () => '一次只出现一个')
      ],
      liveNote: (p) =>
        `d = ${p.d.toFixed(2)} mm、λ = ${Math.round(p.lambda)} nm 时，条纹间距约 ${((p.lambda * 1e-6 * 900) / p.d).toFixed(2)} mm。`
    }
  ],
  'qm-1-2': [
    {
      mode: 'spectrum',
      title: '黑体谱：温度决定颜色',
      caption:
        '普朗克把谐振子能量切成 $h\\nu$ 的整数倍，才把紫外灾难截断。温度升高时，整条谱线抬高，峰值向短波移动。',
      controls: [c('T', '温度 T', 1000, 6000, 50, 3000, (v) => `${Math.round(v)} K`)],
      toggles: [
        t('rayleigh', '瑞利—金斯曲线', '经典理论：长波吻合，短波发散'),
        t('wien', '维恩近似', '短波吻合，长波失效'),
        t('peak', '维恩位移标记', '标出 λ_max = 2.898 mm·K / T')
      ],
      readouts: [
        r('峰值波长', (p) => `${Math.round(wienPeakNm(p.T))} nm`),
        r('峰值光子能量', (p) => `${(HC_EV_NM / wienPeakNm(p.T)).toFixed(2)} eV`),
        r('总辐射', (p) => `${((p.T / 3000) ** 4).toFixed(2)} ×`),
        r('长波极限', () => '∝ 1/λ⁴')
      ],
      liveNote: (p) =>
        `T = ${Math.round(p.T)} K 时峰值在 ${Math.round(wienPeakNm(p.T))} nm；瑞利—金斯曲线在短波端仍一路向上，这就是紫外灾难。`
    },
    {
      mode: 'photoelectric',
      title: '一个光子换一个电子',
      caption:
        '光强只决定单位时间来的光子数，频率才决定单个光子能交出多少能量。能量低于逸出功时，再强的光也打不出电子。',
      controls: [
        c('nu', '光子频率 ν', 2, 12, 0.1, 5.5, f2),
        c('W', '逸出功 W', 1.6, 5.4, 0.1, 2.3, (v) => `${v.toFixed(1)} eV`),
        c('intensity', '光强', 0.2, 2, 0.05, 1, f2)
      ],
      toggles: [
        t('classical', '经典预言', '光强越大，动能越大', false),
        t('cutoff', '截止频率 ν₀', '标出 hν₀ = W'),
        t('electrons', '发射电子', '让电子沿阳极运动')
      ],
      readouts: [
        r('hν', (p) => `${photonEnergy(p.nu).toFixed(2)} eV`),
        r('最大动能 K', (p) => `${photoelectronKmax(p.nu, p.W).toFixed(2)} eV`),
        r('截止频率 ν₀', (p) => `${cutoffFrequency(p.W).toFixed(2)} ×10¹⁴ Hz`),
        r('截止波长 λ₀', (p) => `${Math.round(cutoffWavelength(p.W))} nm`)
      ],
      liveNote: (p) =>
        `ν = ${p.nu.toFixed(1)} 时每个光子有 ${photonEnergy(p.nu).toFixed(2)} eV；扣掉逸出功 ${p.W.toFixed(1)} eV，电子最多带走 ${photoelectronKmax(p.nu, p.W).toFixed(2)} eV。`
    }
  ],
  'qm-1-3': [
    {
      mode: 'photoelectric',
      title: '截止频率：光强改变不了它',
      caption: '把光强拉满，经典波动预言电子动能继续增大；实验却只看到更多电子，截止频率纹丝不动。',
      controls: [
        c('nu', '光子频率 ν', 2, 12, 0.1, 8, f2),
        c('W', '逸出功 W', 1.6, 5.4, 0.1, 2.3, (v) => `${v.toFixed(1)} eV`),
        c('intensity', '光强', 0.2, 2, 0.05, 0.6, f2)
      ],
      toggles: [
        t('classical', '经典预言', '水平线：动能与频率无关', true),
        t('cutoff', '截止频率', '标出 ν₀ = W/h'),
        t('electrons', '电子流', '强度大小决定电子数')
      ],
      readouts: [
        r('hν', (p) => `${photonEnergy(p.nu).toFixed(2)} eV`),
        r('K_max', (p) => `${photoelectronKmax(p.nu, p.W).toFixed(2)} eV`),
        r('ν₀', (p) => `${cutoffFrequency(p.W).toFixed(2)} ×10¹⁴ Hz`),
        r('电子数', (p) => `${Math.round(p.intensity * 3)} 个 / 批`)
      ],
      liveNote: (p) =>
        `光强 ${p.intensity.toFixed(2)} 只让电子变多；K_max 仍由 ${photonEnergy(p.nu).toFixed(2)} eV − ${p.W.toFixed(1)} eV 决定。`
    },
    {
      mode: 'operator',
      title: '光子动量：$p=h/\\lambda$',
      caption:
        '光子不仅带能量，也带动量。把光子写成平面波 $e^{ikx}$，动量算符作用后给出本征值 $p=\\hbar k$。',
      controls: [c('k', '波数 k', 0.6, 2.6, 0.02, 1.7, f2)],
      toggles: [
        t('complex', '复平面螺旋', '把实部与虚部展开'),
        t('arrow', '动量箭头', '标出 p = ħk 的方向')
      ],
      readouts: [
        r('动量 p', (p) => `${p.k.toFixed(2)} ħ/a`),
        r('波长', (p) => `${(2 * Math.PI / p.k).toFixed(2)} a`),
        r('本征方程', () => 'p̂ψ = ħkψ'),
        r('康普顿关系', () => 'p = E / c')
      ],
      liveNote: (p) =>
        `k = ${p.k.toFixed(2)} 对应波长 ${(2 * Math.PI / p.k).toFixed(2)} a；波长越短，光子动量越大。`
    }
  ],
  'qm-1-4': [
    {
      mode: 'bohr',
      title: '玻尔能级与跃迁',
      caption:
        '玻尔把角动量限制为 ħ 的整数倍，氢原子的能量立刻变成一串离散值。跃迁时放出的光子能量等于两能级之差。',
      controls: [
        c('ni', '初态 nᵢ', 2, 6, 1, 3, int),
        c('nf', '末态 n_f', 1, 5, 1, 2, int)
      ],
      toggles: [t('arrow', '跃迁箭头', '标出从 n_f 到 nᵢ'), t('photon', '光子', '让光点沿跃迁线运动')],
      readouts: [
        r('初态能量', (p) => `${bohrEnergy(Math.max(p.ni, p.nf)).toFixed(2)} eV`),
        r('跃迁能量', (p) => `${transitionEnergy(p.ni, p.nf).toFixed(2)} eV`),
        r('光子波长', (p) => `${Math.round(transitionWavelength(p.ni, p.nf))} nm`),
        r('半径比 rᵢ/r_f', (p) => `${((p.ni / Math.max(p.nf, 1)) ** 2).toFixed(1)}`)
      ],
      liveNote: (p) =>
        `n ${Math.min(p.ni, p.nf)} → ${Math.max(p.ni, p.nf)} 放出 ${transitionEnergy(p.ni, p.nf).toFixed(2)} eV 的光子，波长约 ${Math.round(transitionWavelength(p.ni, p.nf))} nm。`
    },
    {
      mode: 'levels',
      title: '为什么原子光谱是线状的',
      caption:
        '束缚态能量被边界条件切成离散阶梯，跃迁只能发生在两条阶梯之间，于是光谱是一条条线，而不是连续彩带。',
      controls: [
        c('n', '目标能级 n', 1, 8, 1, 2, int),
        c('law', '能级幂次', 1, 2.4, 0.05, 2, f2),
        c('defect', '量子亏损', 0, 1, 0.02, 0, f2)
      ],
      toggles: [t('dense', '显示全部能级', '把 40 条能级一起亮出来', false), t('labels', '能级标签', '显示 n = 1 … 8')],
      readouts: [
        r('能级位置', (p) => `${(Math.pow(Math.round(p.n) + p.defect, p.law) / Math.pow(8 + p.defect, p.law)).toFixed(3)} E_max`),
        r('相邻间隔', (p) => `${(Math.pow(Math.round(p.n) + 1 + p.defect, p.law) - Math.pow(Math.round(p.n) + p.defect, p.law)).toFixed(2)}`),
        r('能级数', () => '8'),
        r('高 n 极限', () => '趋于连续谱')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 的能级位于 ${(Math.pow(Math.round(p.n) + p.defect, p.law) / Math.pow(8 + p.defect, p.law)).toFixed(2)} E_max；随着 n 增大，相邻间隔越来越小。`
    }
  ],
  'qm-1-5': [
    {
      mode: 'duality',
      title: '电子衍射：物质波的确凿证据',
      caption:
        '德布罗意把 $p=h/\\lambda$ 反过来用在电子上：晶格就是天然的雙缝，衍射环就是波动性的签名。',
      controls: [
        c('d', '等效缝距 d', 0.2, 1, 0.02, 0.35, f2),
        c('lambda', '电子波长 λ', 380, 750, 1, 532, int)
      ],
      toggles: [t('hits', '逐个探测', '单电子落点累积成环'), t('envelope', '衍射包络', '显示单缝的宽包络')],
      readouts: [
        r('条纹间距', (p) => `${((p.lambda * 1e-6 * 900) / p.d).toFixed(2)} mm`),
        r('条纹数', (p) => `${Math.max(1, Math.round(12 / ((p.lambda * 1e-6 * 900) / p.d)))}`),
        r('动量', (p) => `${(HC_EV_NM / p.lambda).toFixed(2)} eV/c`),
        r('波长', (p) => `${Math.round(p.lambda)} nm`)
      ],
      liveNote: (p) =>
        `缝距 ${p.d.toFixed(2)} mm 时，波长 ${Math.round(p.lambda)} nm 的电子给出 ${((p.lambda * 1e-6 * 900) / p.d).toFixed(2)} mm 的条纹间距。`
    },
    {
      mode: 'wavepacket',
      title: '物质波的群速度',
      caption:
        '平面波以相速度移动，波包以群速度移动。对自由粒子，群速度正是经典速度 $v=p/m$。',
      controls: [
        c('k0', '中心波数 k₀', 1, 4, 0.05, 2.4, f2),
        c('sigma0', '波包宽度 σ₀', 0.4, 1.4, 0.02, 0.9, f2)
      ],
      toggles: [t('density', '概率密度', '显示波包轮廓'), t('complex', '复相位', '展开波动相位')],
      readouts: [
        r('群速度', (p) => `${p.k0.toFixed(2)} v₀`),
        r('相速度', (p) => `${(p.k0 / 2).toFixed(2)} v₀`),
        r('初始宽度', (p) => `${p.sigma0.toFixed(2)} a`),
        r('t = 8 展宽', (p) => `${Math.sqrt(p.sigma0 ** 2 + (8 / p.sigma0) ** 2).toFixed(2)} a`)
      ],
      liveNote: (p) =>
        `k₀ = ${p.k0.toFixed(2)} 时群速度是 ${p.k0.toFixed(2)} v₀；波包在 t = 8 会展宽到 ${Math.sqrt(p.sigma0 ** 2 + (8 / p.sigma0) ** 2).toFixed(2)} a。`
    }
  ],
  // ---------- 第二章 ----------
  'qm-2-1': [
    {
      mode: 'uncertainty',
      title: '波函数的概率解释',
      caption:
        'ψ 本身不能直接测量，可测的是 $|\\psi|^2$。把位置波包压得越窄，动量空间的分布就被撑得越宽。',
      controls: [c('sigma', '位置宽度 σ', 0.25, 1.6, 0.02, 0.6, f2)],
      toggles: [t('density', '位置概率密度', '显示 |ψ(x)|²'), t('momentum', '动量空间分布', '显示 φ(p) 的宽度')],
      readouts: [
        r('Δx', (p) => `${p.sigma.toFixed(2)} a`),
        r('Δp', (p) => `${(1 / (2 * p.sigma)).toFixed(2)} ħ/a`),
        r('Δx·Δp', () => '= ½ ħ'),
        r('峰值概率', () => '|ψ(0)|²')
      ],
      liveNote: (p) =>
        `σ = ${p.sigma.toFixed(2)} a 时，动量宽度为 ${(1 / (2 * p.sigma)).toFixed(2)} ħ/a；两者乘积保持在 ħ/2。`
    },
    {
      mode: 'wavepacket',
      title: '概率幅不是概率',
      caption:
        '波函数是复数：它有模长，也有相位。只有把实部与虚部一起看，才能理解叠加为何会相消或增强。',
      controls: [
        c('k0', '中心波数 k₀', 1, 4, 0.05, 2.2, f2),
        c('sigma0', '波包宽度 σ₀', 0.4, 1.4, 0.02, 0.9, f2)
      ],
      toggles: [t('density', '概率密度', '|ψ|² 的黄色包络'), t('complex', '复相位', '把虚部展开到深度方向')],
      readouts: [
        r('归一化', () => '∫|ψ|²dx = 1'),
        r('动量宽度', (p) => `${(0.5 / p.sigma0).toFixed(2)} p₀`),
        r('群速度', (p) => `${p.k0.toFixed(2)} v₀`),
        r('相位', () => 'arg ψ(x)')
      ],
      liveNote: (p) =>
        `概率密度只有一条包络，而复相位还给出 ${p.k0.toFixed(2)} v₀ 的移动方向；这正是经典轨迹信息的来源。`
    }
  ],
  'qm-2-2': [
    {
      mode: 'wavepacket',
      title: '自由粒子与 $e^{i(kx-\\omega t)}$',
      caption:
        '自由粒子的定态是平面波。把许多平面波叠加成波包，才得到一个“像粒子”的局域对象。',
      controls: [
        c('k0', '中心波数 k₀', 1, 4, 0.05, 2, f2),
        c('sigma0', '波包宽度 σ₀', 0.4, 1.4, 0.02, 0.8, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('complex', '复相位', '显示 e^{i(kx−ωt)} 的螺旋')],
      readouts: [
        r('色散关系', () => 'ω = ħk²/2m'),
        r('群速度', (p) => `${p.k0.toFixed(2)} v₀`),
        r('相速度', (p) => `${(p.k0 / 2).toFixed(2)} v₀`),
        r('能量', (p) => `${(p.k0 ** 2).toFixed(2)} E₀`)
      ],
      liveNote: (p) =>
        `自由粒子的相速度是群速度的一半：k₀ = ${p.k0.toFixed(2)} 时 v_phase = ${(p.k0 / 2).toFixed(2)} v₀。`
    },
    {
      mode: 'operator',
      title: '定态：算符的本征方程',
      caption:
        '把哈密顿算符作用在 ψ 上，如果结果只是 ψ 乘以一个数，这个数就是能量。定态就是能量算符的本征态。',
      controls: [c('k', '波数 k', 0.6, 2.6, 0.02, 1.6, f2)],
      toggles: [t('complex', '复平面', '显示波函数的实部与虚部'), t('arrow', '动量箭头', '标出本征值 p = ħk')],
      readouts: [
        r('动量本征值', (p) => `${p.k.toFixed(2)} ħ/a`),
        r('动能', (p) => `${(p.k ** 2).toFixed(2)} E₀`),
        r('本征方程', () => 'Ĥψ = Eψ'),
        r('驻波条件', () => 'e^{ikL} = 1')
      ],
      liveNote: (p) =>
        `k = ${p.k.toFixed(2)} 时动能为 ${(p.k ** 2).toFixed(2)} E₀；算符方程把“波数”翻译成了可测量的动量。`
    }
  ],
  'qm-2-3': [
    {
      mode: 'wavepacket',
      title: '束缚态的叠加与拍频',
      caption:
        '两个本征态叠加时，相对相位 $e^{i(E_2-E_1)t/\\hbar}$ 会让概率密度来回拍动。拍频就是能级差。',
      controls: [
        c('k0', '中心波数 k₀', 1, 4, 0.05, 2.1, f2),
        c('sigma0', '波包宽度 σ₀', 0.4, 1.4, 0.02, 0.85, f2)
      ],
      toggles: [t('density', '概率密度', '显示拍动包络'), t('complex', '复相位', '展开复相位')],
      readouts: [
        r('拍频', () => 'ΔE / ħ'),
        r('群速度', (p) => `${p.k0.toFixed(2)} v₀`),
        r('波包宽度', (p) => `${p.sigma0.toFixed(2)} a`),
        r('叠加原理', () => '线性方程')
      ],
      liveNote: (p) =>
        `两个能量相差 ΔE 的本征态会以 ΔE/ħ 的频率拍动；k₀ = ${p.k0.toFixed(2)} 只决定包络移动得多快。`
    },
    {
      mode: 'coherent',
      title: '本征态叠加为何能运动',
      caption:
        '相干态是无数个谐振子本征态按泊松权重叠加的结果。它不扩散，只整体来回摆动，最像经典粒子。',
      controls: [
        c('amp', '振幅 A', 0.4, 2.6, 0.02, 1.4, f2),
        c('speed', '演化速度', 0.2, 2, 0.02, 1, f2)
      ],
      toggles: [t('classical', '经典轨迹', '叠加 A cos ωt 的参考曲线'), t('density', '概率密度', '显示 |ψ(x,t)|²')],
      readouts: [
        r('平均能量', (p) => `(${(p.amp ** 2 + 0.5).toFixed(2)}) ħω`),
        r('周期', () => '2π/ω'),
        r('⟨x⟩ 振幅', (p) => `${p.amp.toFixed(2)} x₀`),
        r('宽度', () => 'σ = x₀/√2')
      ],
      liveNote: (p) =>
        `A = ${p.amp.toFixed(2)} 时平均能量是 ${(p.amp ** 2 + 0.5).toFixed(2)} ħω；波包保持同样宽度，只沿抛物线势来回摆动。`
    }
  ],
  'qm-2-4': [
    {
      mode: 'well',
      title: '正交性与能级分立',
      caption:
        '不同能级的本征函数彼此正交。把两个本征态叠加起来，概率密度会随时间变形，但总概率始终守恒。',
      controls: [
        c('n', '量子数 n', 1, 6, 1, 2, int),
        c('mix', '叠加权重', 0, 1, 0.02, 0.35, f2)
      ],
      toggles: [t('superposition', '叠加 n 与 n+1', '让两个本征态一起振荡', true), t('density', '概率密度', '显示 |ψ|²')],
      readouts: [
        r('能量比', (p) => `Eₙ/E₁ = ${Math.round(p.n) ** 2}`),
        r('节点数', (p) => `${Math.max(0, Math.round(p.n) - 1)}`),
        r('正交性', () => '⟨ψₙ|ψₘ⟩ = 0'),
        r('归一化', () => '∫|ψₙ|²dx = 1')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 有 ${Math.max(0, Math.round(p.n) - 1)} 个内节点；它与相邻能级的重叠积分严格为零。`
    },
    {
      mode: 'ladder',
      title: '离散能级是边界条件的结果',
      caption:
        '以谐振子为例：升阶算符每作用一次，能量就加一个 $\\hbar\\omega$。能级等间距，是代数结构最干净的一类离散谱。',
      controls: [c('n', '能级 n', 0, 6, 1, 2, int)],
      toggles: [t('raise', '升阶算符 a†', '让光点从 n 跳到 n+1'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('Eₙ', (p) => `(${Math.round(p.n)} + ½) ħω`),
        r('间距', () => 'ħω'),
        r('升阶因子', (p) => `√${Math.round(p.n) + 1} = ${Math.sqrt(Math.round(p.n) + 1).toFixed(2)}`),
        r('基态能量', () => '½ ħω')
      ],
      liveNote: (p) =>
        `a†|${Math.round(p.n)}⟩ = ${Math.sqrt(Math.round(p.n) + 1).toFixed(2)}|${Math.round(p.n) + 1}⟩；能量每次加一个 ħω。`
    }
  ],

  // ---------- 第三章 ----------
  'qm-3-1': [
    {
      mode: 'well',
      title: '盒中粒子：驻波与 $n^2$ 能级',
      caption:
        '把粒子关进宽度 L 的盒子，边界要求 ψ 在两端为零，只剩半波长整数倍的驻波。能级按 $n^2$ 上升，基态能量并不为零。',
      controls: [
        c('n', '量子数 n', 1, 6, 1, 2, int),
        c('mix', '叠加权重', 0, 1, 0.02, 0.35, f2)
      ],
      toggles: [
        t('superposition', '叠加 n 与 n+1', '让概率密度随时间来回鼓包'),
        t('density', '概率密度', '显示 |ψₙ|² 的黄色包络')
      ],
      readouts: [
        r('驻波波长', (p) => `λ = ${(2 / Math.round(p.n)).toFixed(2)} L`),
        r('节点数', (p) => `${Math.max(0, Math.round(p.n) - 1)}`),
        r('能级比', (p) => `Eₙ/E₁ = ${Math.round(p.n) ** 2}`),
        r('基态能', () => 'E₁ = π²ħ²/2mL²')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 的驻波在盒内有 ${Math.max(0, Math.round(p.n) - 1)} 个节点；把它与 n+1 叠加，概率密度会以拍频来回变形。`
    },
    {
      mode: 'levels',
      title: '$n^2$ 能级与间距律',
      caption:
        '盒中粒子的能级按 $n^2$ 上升，越往上间距越大。把间距指数调到接近 1，谱线就收拢成谐振子那样的等间距阶梯。',
      controls: [
        c('n', '量子数 n', 1, 8, 1, 3, int),
        c('law', '间距指数 p', 1, 2.4, 0.05, 2, f2),
        c('defect', '量子缺 δ', 0, 1, 0.02, 0, f2)
      ],
      toggles: [
        t('dense', '显示密集能级', '展开 40 条能级，看高阶谱线的堆积', false),
        t('labels', '能级标签', '标出 n = 1 … 8')
      ],
      readouts: [
        r('能级比', (p) => `${Math.pow((Math.round(p.n) + p.defect) / (1 + p.defect), p.law).toFixed(2)}`),
        r('相邻间距', (p) => {
          const n = Math.round(p.n)
          return `${(Math.pow(n + 1 + p.defect, p.law) - Math.pow(n + p.defect, p.law)).toFixed(2)}`
        }),
        r('间距律', (p) => `E ∝ (n+δ)^${p.law.toFixed(2)}`),
        r('高阶堆积', (p) => (Math.round(p.n) >= 5 ? '间距明显拉大' : '近似等间距'))
      ],
      liveNote: (p) =>
        `p = ${p.law.toFixed(2)} 时第 n 与 n+1 级的间距按 (n+δ) 的幂增长；盒中粒子 p = 2，所以越往上越稀疏。`
    }
  ],
  'qm-3-2': [
    {
      mode: 'finitewell',
      title: '半无限深势阱：一边是墙，一边是坡',
      caption:
        '左壁无限高、右壁有限深。波函数在左壁严格为零，在右壁外以指数形式穿透出去——粒子有一部分“跑到墙外”。',
      controls: [
        c('depth', '阱深 V₀', 0.4, 1.6, 0.02, 0.8, f2),
        c('n', '束缚态序号 n', 1, 4, 1, 1, int)
      ],
      toggles: [
        t('half', '半无限阱边界', '左侧无限高、右侧有限高', true),
        t('density', '概率密度', '显示 |ψ|²'),
        t('tail', '阱外衰减', '高亮右壁外的指数尾部')
      ],
      readouts: [
        r('束缚态数', (p) => `${wellCount(p, true)}`),
        r('E/V₀', (p) => wellRatio(p, true).toFixed(2)),
        r('穿透尺度 1/κ', (p) => `${(1 / Math.max(0.3, 2.6 * Math.sqrt(Math.max((1 - wellRatio(p, true)) * (p.depth ?? 0.9), 0.01)))).toFixed(2)} a`),
        r('壁外概率', () => '指数尾部 > 0')
      ],
      liveNote: (p) =>
        `V₀ = ${p.depth.toFixed(2)} 时半无限阱可容纳 ${wellCount(p, true)} 个束缚态；第 ${Math.round(p.n)} 个态有 ${((wellRatio(p, true) * 100).toFixed(0))}% 的能量落在阱内。`
    },
    {
      mode: 'step',
      title: '有限高台阶：全反射与透射',
      caption:
        '把右壁当成台阶：E 低于台阶时波在壁外指数衰减、全部反射；E 高于台阶时才有向右传播的透射波。',
      controls: [
        c('ratio', '能量比 E/V₀', 0.2, 1.8, 0.02, 0.9, f2),
        c('smooth', '台阶光滑度', 0, 0.8, 0.02, 0.1, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('transmitted', '透射波', '只画台阶右侧的波')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('反射系数 R', (p) => {
          const ratio = p.ratio
          if (ratio <= 1) return '1.00'
          const k2 = Math.sqrt(ratio - 1)
          return `${(((1 - k2) / (1 + k2)) ** 2).toFixed(2)}`
        }),
        r('透射系数 T', (p) => {
          const ratio = p.ratio
          if (ratio <= 1) return '0.00'
          const k2 = Math.sqrt(ratio - 1)
          return `${(1 - ((1 - k2) / (1 + k2)) ** 2).toFixed(2)}`
        }),
        r('壁外行为', (p) => (p.ratio < 1 ? '倏逝衰减' : '行波振荡'))
      ],
      liveNote: (p) =>
        p.ratio < 1
          ? `E/V₀ = ${p.ratio.toFixed(2)} < 1：台阶内是倏逝波，反射系数严格为 1，没有净透射流。`
          : `E/V₀ = ${p.ratio.toFixed(2)} > 1：反射与透射同时存在，台阶越陡、能量越接近垒顶，反射越强。`
    }
  ],
  'qm-3-3': [
    {
      mode: 'finitewell',
      title: '对称有限深势阱：偶态与奇态',
      caption:
        '左右两壁都有限高。束缚态按宇称分成偶态与奇态；阱越深，能容纳的束缚态越多，而每个态都在两侧以指数衰减。',
      controls: [
        c('depth', '阱深 V₀', 0.4, 1.6, 0.02, 1.1, f2),
        c('n', '束缚态序号 n', 1, 4, 1, 1, int)
      ],
      toggles: [
        t('half', '半无限阱边界', '关闭后恢复左右对称的有限深阱', false),
        t('density', '概率密度', '显示 |ψ|²'),
        t('tail', '阱外衰减', '高亮两侧的指数尾部')
      ],
      readouts: [
        r('束缚态数', (p) => `${wellCount(p, false)}`),
        r('E/V₀', (p) => wellRatio(p, false).toFixed(2)),
        r('宇称', (p) => {
          const solutions = wellSolutions(p, false)
          const solution = solutions[Math.min(Math.round(p.n) - 1, Math.max(solutions.length - 1, 0))]
          return solution ? (solution.parity === 1 ? '偶 ψ₊' : '奇 ψ₋') : '无束缚态'
        }),
        r('阱外行为', () => '两侧指数衰减')
      ],
      liveNote: (p) =>
        `V₀ = ${p.depth.toFixed(2)} 时对称阱有 ${wellCount(p, false)} 个束缚态；第 ${Math.round(p.n)} 个态的 E/V₀ = ${wellRatio(p, false).toFixed(2)}。`
    },
    {
      mode: 'levels',
      title: '有限深：能级整体下移',
      caption:
        '有限深势阱只有有限条束缚态，且能级比同宽无限深阱略低。用“量子缺”把整条谱线向下移动，观察它怎样向阱口挤压。',
      controls: [
        c('n', '量子数 n', 1, 8, 1, 3, int),
        c('law', '间距指数 p', 1, 2.4, 0.05, 2, f2),
        c('defect', '量子缺 δ', 0, 1, 0.02, 0.3, f2)
      ],
      toggles: [t('dense', '显示密集能级', '展开 40 条能级', false), t('labels', '能级标签', '标出 n = 1 … 8')],
      readouts: [
        r('能级比', (p) => `${Math.pow((Math.round(p.n) + p.defect) / (1 + p.defect), p.law).toFixed(2)}`),
        r('量子缺', (p) => p.defect.toFixed(2)),
        r('有效量子数', (p) => `${(Math.round(p.n) + p.defect).toFixed(2)}`),
        r('阱口', () => '能级在 V₀ 处截断')
      ],
      liveNote: (p) =>
        `δ = ${p.defect.toFixed(2)} 使第 ${Math.round(p.n)} 级的有效量子数变成 ${(Math.round(p.n) + p.defect).toFixed(2)}；有限深阱的能级因此整体偏离无限深阱的 n² 谱。`
    }
  ],
  'qm-3-4': [
    {
      mode: 'step',
      title: 'E<V₀：全反射与倏逝波',
      caption:
        '能量低于台阶时，经典粒子必被弹回；量子波在台阶内仍有指数衰减的倏逝波，但衰减到底，没有净透射流。',
      controls: [
        c('ratio', '能量比 E/V₀', 0.2, 1.8, 0.02, 0.6, f2),
        c('smooth', '台阶光滑度', 0, 0.8, 0.02, 0, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('transmitted', '倏逝尾部', '画出台阶右侧的指数衰减')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('反射系数 R', () => '1.00'),
        r('透射系数 T', () => '0.00'),
        r('衰减长度', (p) => `${(1 / (2.3 * Math.sqrt(Math.max(1 - p.ratio, 0.02)))).toFixed(2)} a`)
      ],
      liveNote: (p) =>
        `E/V₀ = ${p.ratio.toFixed(2)}：台阶内波函数按 e^{−2.3√(1−E/V₀)·x} 衰减，反射系数恒为 1，透射流为零。`
    },
    {
      mode: 'tunneling',
      title: '近垒顶：透射并非突然打开',
      caption:
        '即使 $E<V_0$，势垒越薄、越接近垒顶，透射振幅就越大。$E\\to V_0$ 时垒内衰减变得极慢，隧穿概率迅速上升。',
      controls: [
        c('width', '势垒宽度 a', 0.2, 1.4, 0.02, 0.4, f2),
        c('ratio', '能量比 E/V₀', 0.15, 0.95, 0.01, 0.9, f2)
      ],
      toggles: [t('density', '概率密度', '强调垒内的指数衰减'), t('decay', '衰减长度', '标出 1/κ 的参考位置')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('衰减常数 κ', (p) => `${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)} a⁻¹`),
        r('透射幅度', (p) => Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)),
        r('衰减长度 1/κ', (p) => `${(1 / (1.9 * Math.sqrt(1 - p.ratio))).toFixed(2)} a`)
      ],
      liveNote: (p) =>
        `E/V₀ = ${p.ratio.toFixed(2)}、a = ${p.width.toFixed(2)} 时，垒后振幅约 ${Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)}；越接近垒顶，κ 越小，透射越强。`
    }
  ],
  'qm-3-5': [
    {
      mode: 'tunneling',
      title: '深垒：宽度每增一点，透射就塌一截',
      caption:
        '势垒内的波函数按 $e^{-\\kappa x}$ 衰减。垒越宽、能量越低，κ 越大，穿过后的振幅被指数压低——这就是隧穿对尺寸的极端敏感。',
      controls: [
        c('width', '势垒宽度 a', 0.2, 1.4, 0.02, 1.3, f2),
        c('ratio', '能量比 E/V₀', 0.15, 0.95, 0.01, 0.3, f2)
      ],
      toggles: [t('density', '概率密度', '强调垒内的指数衰减'), t('decay', '衰减长度', '标出 1/κ 的参考位置')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('衰减常数 κ', (p) => `${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)} a⁻¹`),
        r('透射幅度', (p) => Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)),
        r('垒内衰减', () => 'e^{−κx}')
      ],
      liveNote: (p) =>
        `κ = ${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)} a⁻¹、a = ${p.width.toFixed(2)}：每加宽 0.1 a，透射幅度就乘以 ${Math.exp(-0.19 * Math.sqrt(1 - p.ratio)).toFixed(2)}。`
    },
    {
      mode: 'stm',
      title: '扫描隧道显微镜：把隧穿当尺子',
      caption:
        '针尖与样品间只有亚纳米间距，电子靠隧穿形成电流。间距稍微拉大，电流就按指数下降，所以 STM 能分辨单个原子。',
      controls: [
        c('work', '功函数 W / eV', 2, 5, 0.1, 4.2, f1),
        c('gap', '针尖间距 d / nm', 0.1, 1.2, 0.02, 0.5, f2)
      ],
      toggles: [t('marker', '工作点标记', '标出当前间距对应的电流'), t('decay', '数量级参考线', '标出每降一个数量级的位置')],
      readouts: [
        r('功函数 W', (p) => `${p.work.toFixed(1)} eV`),
        r('衰减常数 κ', (p) => `${Math.sqrt(p.work).toFixed(2)} nm⁻¹`),
        r('相对电流', (p) => Math.exp(-20 * Math.sqrt(p.work) * p.gap).toExponential(2)),
        r('电流量级', (p) => `log₁₀ = ${(-20 * Math.sqrt(p.work) * p.gap / Math.LN10).toFixed(1)}`)
      ],
      liveNote: (p) =>
        `W = ${p.work.toFixed(1)} eV、d = ${p.gap.toFixed(2)} nm 时，隧道电流只剩 ${Math.exp(-20 * Math.sqrt(p.work) * p.gap).toExponential(2)} I₀——间距是 STM 最灵敏的旋钮。`
    }
  ],
  'qm-3-6': [
    {
      mode: 'delta',
      title: '$\\delta$ 势阱：唯一束缚态',
      caption:
        '强度可调的 δ 势阱只有一个束缚态，波函数按 $e^{-\\kappa|x|}$ 从中心向两侧衰减。势阱越强，κ 越大，态被压得越紧。',
      controls: [
        c('strength', '势阱强度', 0.2, 1.6, 0.02, 1, f2),
        c('energy', '散射能量', 0.2, 1.4, 0.02, 0.6, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('scattering', '散射态', '叠加同一个 δ 上的连续谱解', false)],
      readouts: [
        r('衰减常数 κ', (p) => `${(1.6 * p.strength).toFixed(2)} a⁻¹`),
        r('束缚能', (p) => `∝ ${(p.strength ** 2).toFixed(2)} E₀`),
        r('束缚态数', () => '1'),
        r('归一化', (p) => `√κ = ${Math.sqrt(1.6 * p.strength).toFixed(2)}`)
      ],
      liveNote: (p) =>
        `强度 = ${p.strength.toFixed(2)} 时 κ = ${(1.6 * p.strength).toFixed(2)}，束缚能正比于强度的平方；δ 阱无论多浅都恰好留一个束缚态。`
    },
    {
      mode: 'delta',
      title: '$\\delta$ 势垒：散射相移',
      caption:
        '同一个 δ 函数改成排斥势时不再有束缚态，只剩散射态：波函数在 $x=0$ 处出现相位跳变，反射概率随能量变化。',
      controls: [
        c('strength', '势垒强度', 0.2, 1.6, 0.02, 0.8, f2),
        c('energy', '入射能量 E', 0.2, 1.4, 0.02, 0.8, f2)
      ],
      toggles: [t('density', '概率密度', '显示束缚态一侧的密度', false), t('scattering', '散射态', '画出 x = 0 两侧的散射波', true)],
      readouts: [
        r('相移 δ', (p) => {
          const kappa = 1.6 * p.strength
          const k = 1.5 * Math.sqrt(2 * p.energy)
          return `${(-Math.atan(kappa / k) * 180 / Math.PI).toFixed(1)}°`
        }),
        r('反射概率 R', (p) => {
          const kappa = 1.6 * p.strength
          const k = 1.5 * Math.sqrt(2 * p.energy)
          return `${(kappa ** 2 / (kappa ** 2 + k ** 2)).toFixed(2)}`
        }),
        r('波数 k', (p) => `${(1.5 * Math.sqrt(2 * p.energy)).toFixed(2)} a⁻¹`),
        r('束缚态', () => '0')
      ],
      liveNote: (p) =>
        `强度 = ${p.strength.toFixed(2)}、E = ${p.energy.toFixed(2)}：δ 垒只给散射态一个相位跳变，反射概率约 ${((1.6 * p.strength) ** 2 / ((1.6 * p.strength) ** 2 + (1.5 * Math.sqrt(2 * p.energy)) ** 2)).toFixed(2)}。`
    }
  ],

  // ---------- 第四章 ----------
  'qm-4-1': [
    {
      mode: 'resonance',
      title: '量子共振腔：驱动频率扫过本征模',
      caption:
        '腔只对特定频率强烈响应。把驱动频率 ω 扫过 $\\omega_n=0.14n^2$，响应曲线出现一串峰；阻尼 γ 决定峰的宽度。',
      controls: [
        c('omega', '驱动频率 ω', 0.2, 2.4, 0.02, 1.26, f2),
        c('gamma', '阻尼 γ', 0.02, 0.25, 0.01, 0.08, f2)
      ],
      toggles: [t('modes', '本征模标记', '标出 n = 1 … 4 的共振峰'), t('marker', '工作点', '标出当前驱动频率')],
      readouts: [
        r('驱动频率', (p) => p.omega.toFixed(2)),
        r('第三模 ω₃', () => '1.26'),
        r('品质因子 Q', (p) => `${(1.26 / (2 * p.gamma)).toFixed(1)}`),
        r('峰宽', (p) => `Δω ≈ 2γ = ${(2 * p.gamma).toFixed(2)}`)
      ],
      liveNote: (p) =>
        `ω = ${p.omega.toFixed(2)} 时最接近第 ${Math.max(1, Math.min(4, Math.round(Math.sqrt(p.omega / 0.14))))} 个本征模；γ = ${p.gamma.toFixed(2)} 越小，峰越尖、品质因子越高。`
    },
    {
      mode: 'well',
      title: '把波关进腔里：模式就是驻波',
      caption:
        '共振腔的本征模等价于盒中的驻波：腔长必须容纳半波长的整数倍。换一个 n，就是换一种驻波图案。',
      controls: [
        c('n', '模式 n', 1, 6, 1, 3, int),
        c('mix', '模式混合', 0, 1, 0.02, 0.3, f2)
      ],
      toggles: [t('superposition', '叠加相邻模式', '看两个驻波如何拍动'), t('density', '概率密度', '显示 |ψ|²')],
      readouts: [
        r('腔长条件', (p) => `L = ${Math.round(p.n)} λ/2`),
        r('节点数', (p) => `${Math.max(0, Math.round(p.n) - 1)}`),
        r('频率比', (p) => `ωₙ/ω₁ = ${Math.round(p.n)}`),
        r('简并', () => '一维腔无简并')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 要求腔长正好容纳 ${Math.round(p.n)} 个半波；节点把腔分成 ${Math.round(p.n)} 段，每段都是一个“小腔”。`
    }
  ],
  'qm-4-2': [
    {
      mode: 'linear',
      title: '线性势：电子在电场中加速',
      caption:
        '均匀电场给出 $V=-e\\mathcal{E}x$。波函数在经典转折点外侧指数衰减，在另一侧变成 Airy 振荡；场强越强，转折点越靠里。',
      controls: [
        c('field', '电场强度 ℰ', 0.4, 1.6, 0.02, 1, f2),
        c('energy', '电子能量 E', 0.2, 1.6, 0.02, 0.6, f2)
      ],
      toggles: [t('wave', '波函数', '显示 Airy 风格的振荡'), t('density', '概率密度', '叠加 |ψ|²', true)],
      readouts: [
        r('转折点 x_t', (p) => `${(-1.222 * p.energy / p.field).toFixed(2)} a`),
        r('势斜率', (p) => `${(0.45 * p.field).toFixed(2)} V₀/a`),
        r('场强', (p) => p.field.toFixed(2)),
        r('能级间距', (p) => `∝ ℰ^{2/3} = ${(p.field ** (2 / 3)).toFixed(2)}`)
      ],
      liveNote: (p) =>
        `ℰ = ${p.field.toFixed(2)} 时转折点在 x = ${(-1.222 * p.energy / p.field).toFixed(2)} a；这里是经典粒子的回头点，量子波却还能往右渗透。`
    },
    {
      mode: 'step',
      title: '加速后的电子遇到电位台阶',
      caption:
        '把线性加速区接上一段台阶：电子能量低于台阶时被反射，高于台阶时透射。台阶的光滑度会改变反射的细节。',
      controls: [
        c('ratio', '能量比 E/V₀', 0.2, 1.8, 0.02, 1.2, f2),
        c('smooth', '台阶光滑度', 0, 0.8, 0.02, 0.3, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('transmitted', '透射波', '只画台阶右侧的行波')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('反射系数 R', (p) => {
          if (p.ratio <= 1) return '1.00'
          const k2 = Math.sqrt(p.ratio - 1)
          const alpha = p.smooth
          if (alpha < 0.05) return `${(((1 - k2) / (1 + k2)) ** 2).toFixed(2)}`
          const numerator = Math.sinh(Math.PI * (1 - k2) * alpha / 2)
          const denominator = Math.sinh(Math.PI * (1 + k2) * alpha / 2)
          return `${Math.min(0.98, (numerator / denominator) ** 2).toFixed(2)}`
        }),
        r('透射系数 T', (p) => {
          if (p.ratio <= 1) return '0.00'
          const k2 = Math.sqrt(p.ratio - 1)
          const alpha = p.smooth
          const reflected = alpha < 0.05
            ? ((1 - k2) / (1 + k2)) ** 2
            : Math.min(0.98, (Math.sinh(Math.PI * (1 - k2) * alpha / 2) / Math.sinh(Math.PI * (1 + k2) * alpha / 2)) ** 2)
          return `${(1 - reflected).toFixed(2)}`
        }),
        r('台阶', (p) => (p.smooth > 0.05 ? '光滑 tanh' : '陡峭'))
      ],
      liveNote: (p) =>
        p.ratio <= 1
          ? `E/V₀ = ${p.ratio.toFixed(2)}：电子被台阶完全反射，线性加速区里的驻波图案就是反射波的干涉。`
          : `E/V₀ = ${p.ratio.toFixed(2)}：电子进入台阶后波长变短，反射由能量比和台阶光滑度共同决定。`
    }
  ],
  'qm-4-3': [
    {
      mode: 'doublewell',
      title: '低势垒：偶态与奇态的强耦合',
      caption:
        '两个相同的势阱被一条低势垒隔开。耦合很强，偶态与奇态能量明显分开，波函数同时覆盖两个阱。',
      controls: [c('barrier', '势垒高度 V_b', 0.2, 1.4, 0.02, 0.3, f2)],
      toggles: [t('antisymmetric', '奇态 ψ₋', '叠加反号组合'), t('density', '概率密度', '显示 |ψ|² 的包络')],
      readouts: [
        r('能级分裂 ΔE', (p) => doubleWellSplit(p.barrier).toFixed(3)),
        r('隧穿频率', (p) => `${(2 * Math.PI / doubleWellSplit(p.barrier)).toFixed(1)} ω₀`),
        r('耦合强度', (p) => (p.barrier < 0.6 ? '强' : p.barrier < 1 ? '中' : '弱')),
        r('波函数', () => '对称/反对称')
      ],
      liveNote: (p) =>
        `V_b = ${p.barrier.toFixed(2)} 时分裂 ΔE = ${doubleWellSplit(p.barrier).toFixed(3)}；低垒耦合强，两个阱的态几乎一起动。`
    },
    {
      mode: 'levels',
      title: '简并如何被耦合拆开',
      caption:
        '两个完全相同的孤立势阱本来有一条二重简并能级。耦合一旦存在，简并消失，分裂成偶态与奇态两条线。',
      controls: [
        c('n', '能级序号 n', 1, 8, 1, 2, int),
        c('law', '势场指数 p', 1, 2.4, 0.05, 2, f2),
        c('defect', '失谐 δ', 0, 1, 0.02, 0, f2)
      ],
      toggles: [t('dense', '显示密集能级', '展开 40 条能级', false), t('labels', '能级标签', '标出 n = 1 … 8')],
      readouts: [
        r('无耦合简并度', () => '2'),
        r('耦合后', () => '分裂为 ψ₊ / ψ₋'),
        r('失谐 δ', (p) => p.defect.toFixed(2)),
        r('当前能级', (p) => `n = ${Math.round(p.n)}`)
      ],
      liveNote: (p) =>
        p.defect > 0.05
          ? `δ = ${p.defect.toFixed(2)} 让两个阱不再完全相同，简并先被失谐拉开，再被耦合推开。`
          : 'δ = 0 时两个阱完全对称；只要耦合不为零，简并就一定会分裂。'
    }
  ],
  'qm-4-4': [
    {
      mode: 'doublewell',
      title: '高势垒：能级几乎简并，隧穿极慢',
      caption:
        '势垒越高，两阱越接近独立，分裂 $\\Delta E$ 指数变小。粒子仍会在两阱之间往返，但周期长得惊人。',
      controls: [c('barrier', '势垒高度 V_b', 0.2, 1.4, 0.02, 1.2, f2)],
      toggles: [t('antisymmetric', '奇态 ψ₋', '显示分裂后的另一条能级'), t('density', '概率密度', '显示 |ψ|² 的包络')],
      readouts: [
        r('能级分裂 ΔE', (p) => doubleWellSplit(p.barrier).toExponential(2)),
        r('振荡周期', (p) => `${(2 * Math.PI / doubleWellSplit(p.barrier)).toExponential(2)}`),
        r('隧穿频率', (p) => `${(doubleWellSplit(p.barrier) / (2 * Math.PI)).toExponential(2)}`),
        r('极限', () => 'V_b→∞ 时两阱独立')
      ],
      liveNote: (p) =>
        `V_b = ${p.barrier.toFixed(2)} 时 ΔE 只有 ${doubleWellSplit(p.barrier).toExponential(2)}，往返周期约 ${(2 * Math.PI / doubleWellSplit(p.barrier)).toExponential(2)}；垒越高，量子振荡越慢。`
    },
    {
      mode: 'tunneling',
      title: '垒高与垒宽：谁更致命',
      caption:
        '把双阱中间的势垒换成可调方垒：能量比越低、垒越宽，透射振幅越小。双阱的分裂正是由这个透射振幅控制。',
      controls: [
        c('width', '势垒宽度 a', 0.2, 1.4, 0.02, 0.8, f2),
        c('ratio', '能量比 E/V₀', 0.15, 0.95, 0.01, 0.5, f2)
      ],
      toggles: [t('density', '概率密度', '强调垒内指数衰减'), t('decay', '衰减长度', '标出 1/κ')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('衰减常数 κ', (p) => `${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)} a⁻¹`),
        r('透射幅度', (p) => Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)),
        r('对分裂的影响', () => 'ΔE ∝ 透射幅度')
      ],
      liveNote: (p) =>
        `κ = ${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)}、a = ${p.width.toFixed(2)} 时透射幅度约 ${Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)}；这正是双阱能级分裂的数量级。`
    }
  ],
  'qm-4-5': [
    {
      mode: 'molecular',
      title: 'Pöschl-Teller 势：光滑得没有反射',
      caption:
        '$\\mathrm{sech}^2$ 势阱光滑、无尖角，波函数在阱内几乎不反射。它的能谱可以精确求出，是少数“完全可解”的光滑势场。',
      controls: [
        c('type', '势场类型', 0, 3, 1, 3, int),
        c('depth', '阱深', 0.5, 1.4, 0.02, 1, f2),
        c('v', '能级 v', 0, 5, 1, 2, int)
      ],
      toggles: [t('levels', '振动能级', '显示 6 条能级'), t('labels', '能级标签', '标出 v = 0 … 5')],
      readouts: [
        r('势型', (p) => (Math.round(p.type) === 3 ? 'sech²' : '其他')),
        r('阱深', (p) => p.depth.toFixed(2)),
        r('能级间距', (p) => {
          const anharmonic = 0.008
          const level = (v: number) => Math.min(0.98, 0.09 + 0.16 * v - anharmonic * v * v)
          return `${(level(Math.round(p.v) + 1) - level(Math.round(p.v))).toFixed(3)}`
        }),
        r('反射系数', () => 'R = 0')
      ],
      liveNote: (p) =>
        `sech² 势没有尖角，入射波可以无反射地穿过；选 v = ${Math.round(p.v)} 看它的波函数在阱底怎样排列节点。`
    },
    {
      mode: 'step',
      title: '光滑台阶为什么仍然反射',
      caption:
        '把 tanh 台阶调得很光滑：反射确实变小，却不会像 $\\mathrm{sech}^2$ 势那样严格为零。平滑只压低反射，不能消除反射。',
      controls: [
        c('ratio', '能量比 E/V₀', 0.2, 1.8, 0.02, 1.2, f2),
        c('smooth', '台阶光滑度', 0, 0.8, 0.02, 0.5, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('transmitted', '透射波', '只画台阶右侧的行波')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('反射系数 R', (p) => {
          if (p.ratio <= 1) return '1.00'
          const k2 = Math.sqrt(p.ratio - 1)
          if (p.smooth < 0.05) return `${(((1 - k2) / (1 + k2)) ** 2).toFixed(2)}`
          const numerator = Math.sinh(Math.PI * (1 - k2) * p.smooth / 2)
          const denominator = Math.sinh(Math.PI * (1 + k2) * p.smooth / 2)
          return `${Math.min(0.98, (numerator / denominator) ** 2).toFixed(3)}`
        }),
        r('光滑度', (p) => p.smooth.toFixed(2)),
        r('对比', () => 'sech²：R = 0')
      ],
      liveNote: (p) =>
        p.ratio <= 1
          ? `E/V₀ = ${p.ratio.toFixed(2)} < 1：任何台阶都会全反射，光滑度只改变穿透的细节。`
          : `E/V₀ = ${p.ratio.toFixed(2)}、光滑度 ${p.smooth.toFixed(2)}：反射被压低但不会消失——这与 sech² 势的严格无反射完全不同。`
    }
  ],
  'qm-4-6': [
    {
      mode: 'step',
      title: 'tanh 势：光滑度如何压低反射',
      caption:
        '用 tanh 把陡台阶磨圆。台阶越宽，波数变化越缓慢，反射越小；但当 E 接近 V₀ 时，反射仍会显著回升。',
      controls: [
        c('ratio', '能量比 E/V₀', 0.2, 1.8, 0.02, 1.1, f2),
        c('smooth', '台阶光滑度 α', 0, 0.8, 0.02, 0.65, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('transmitted', '透射波', '只画台阶右侧的行波')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('光滑台阶 R', (p) => {
          if (p.ratio <= 1) return '1.00'
          const k2 = Math.sqrt(p.ratio - 1)
          if (p.smooth < 0.05) return `${(((1 - k2) / (1 + k2)) ** 2).toFixed(2)}`
          return `${Math.min(0.98, (Math.sinh(Math.PI * (1 - k2) * p.smooth / 2) / Math.sinh(Math.PI * (1 + k2) * p.smooth / 2)) ** 2).toFixed(3)}`
        }),
        r('陡台阶 R', (p) => {
          if (p.ratio <= 1) return '1.00'
          const k2 = Math.sqrt(p.ratio - 1)
          return `${(((1 - k2) / (1 + k2)) ** 2).toFixed(3)}`
        }),
        r('反射比', (p) => {
          if (p.ratio <= 1 || p.smooth < 0.05) return '1.00'
          const k2 = Math.sqrt(p.ratio - 1)
          const sharp = ((1 - k2) / (1 + k2)) ** 2
          const smooth = Math.min(0.98, (Math.sinh(Math.PI * (1 - k2) * p.smooth / 2) / Math.sinh(Math.PI * (1 + k2) * p.smooth / 2)) ** 2)
          return `${(smooth / Math.max(sharp, 1e-6)).toFixed(2)}`
        })
      ],
      liveNote: (p) => {
        if (p.ratio <= 1 || p.smooth < 0.05) return `E/V₀ = ${p.ratio.toFixed(2)}：台阶两侧没有净透射，光滑度只改变倏逝尾部的形状。`
        const k2 = Math.sqrt(p.ratio - 1)
        const sharp = ((1 - k2) / (1 + k2)) ** 2
        const smooth = Math.min(0.98, (Math.sinh(Math.PI * (1 - k2) * p.smooth / 2) / Math.sinh(Math.PI * (1 + k2) * p.smooth / 2)) ** 2)
        return `α = ${p.smooth.toFixed(2)} 时，光滑台阶的反射约 ${smooth.toFixed(3)}，是陡台阶 ${sharp.toFixed(3)} 的 ${(smooth / Math.max(sharp, 1e-6)).toFixed(2)} 倍。`
      }
    },
    {
      mode: 'linear',
      title: '线性势：强场下的 Airy 尾部',
      caption:
        '把电场调强，经典转折点向里移动，波函数在禁区里的指数尾部被压短。场越强，Airy 振荡的节点越密。',
      controls: [
        c('field', '电场强度 ℰ', 0.4, 1.6, 0.02, 1.2, f2),
        c('energy', '电子能量 E', 0.2, 1.6, 0.02, 1, f2)
      ],
      toggles: [t('wave', '波函数', '显示 Airy 振荡'), t('density', '概率密度', '叠加 |ψ|²', true)],
      readouts: [
        r('转折点 x_t', (p) => `${(-1.222 * p.energy / p.field).toFixed(2)} a`),
        r('场强', (p) => p.field.toFixed(2)),
        r('节点密度', (p) => `∝ ℰ^{1/3} = ${(p.field ** (1 / 3)).toFixed(2)}`),
        r('禁区行为', () => '指数衰减')
      ],
      liveNote: (p) =>
        `ℰ = ${p.field.toFixed(2)}、E = ${p.energy.toFixed(2)}：转折点移到 ${(-1.222 * p.energy / p.field).toFixed(2)} a，禁区里的尾部仍按 Airy 函数衰减。`
    }
  ],
  'qm-4-7': [
    {
      mode: 'chain',
      title: '共轭链：π 电子能级与吸收色',
      caption:
        '把共轭链看成一维盒子：π 电子填到 HOMO，最小的吸收跃迁是 HOMO→LUMO。链越长，能隙越小，吸收波长越向红端移动。',
      controls: [c('segments', '共轭单元数 N', 2, 14, 1, 8, int)],
      toggles: [t('labels', 'HOMO/LUMO 标签', '标出最高占据与最低空轨道'), t('gap', '能隙标记', '画出 HOMO–LUMO 间距')],
      readouts: [
        r('π 电子数', (p) => `${Math.round(p.segments)}`),
        r('能隙 ΔE', (p) => {
          const segments = Math.round(p.segments)
          const homo = Math.ceil(segments / 2)
          return `${(chainLevel(homo + 1, segments) - chainLevel(homo, segments)).toFixed(2)} eV`
        }),
        r('吸收波长', (p) => {
          const segments = Math.round(p.segments)
          const homo = Math.ceil(segments / 2)
          const gap = chainLevel(homo + 1, segments) - chainLevel(homo, segments)
          return `${(HC_EV_NM / Math.max(gap, 0.15)).toFixed(0)} nm`
        }),
        r('吸收区', (p) => {
          const segments = Math.round(p.segments)
          const homo = Math.ceil(segments / 2)
          const gap = chainLevel(homo + 1, segments) - chainLevel(homo, segments)
          const lambda = HC_EV_NM / Math.max(gap, 0.15)
          return lambda > 700 ? '红外' : lambda < 400 ? '紫外' : '可见'
        })
      ],
      liveNote: (p) => {
        const segments = Math.round(p.segments)
        const homo = Math.ceil(segments / 2)
        const gap = chainLevel(homo + 1, segments) - chainLevel(homo, segments)
        return `N = ${segments} 时 HOMO 是 n = ${homo}，LUMO 是 n = ${homo + 1}；能隙 ${(gap).toFixed(2)} eV 对应 ${(HC_EV_NM / Math.max(gap, 0.15)).toFixed(0)} nm 的吸收。`
      }
    },
    {
      mode: 'spectrum',
      title: '黑体谱里的可见窗口',
      caption:
        '太阳光近似 5800 K 的黑体谱，可见区只是一个窄窗口。共轭链只吸收其中一段，剩下的波长反射进我们的眼睛。',
      controls: [c('T', '黑体温度 T / K', 1000, 6000, 50, 3600, int)],
      toggles: [
        t('rayleigh', '瑞利–金斯极限', '长波端的经典曲线'),
        t('wien', '维恩近似', '短波端的指数尾部'),
        t('peak', '峰值标记', '标出维恩位移峰')
      ],
      readouts: [
        r('温度', (p) => `${Math.round(p.T)} K`),
        r('峰值波长', (p) => `${wienPeakNm(p.T).toFixed(0)} nm`),
        r('可见窗口', () => '400–700 nm'),
        r('共轭链吸收', () => '约 450–650 nm')
      ],
      liveNote: (p) =>
        `T = ${Math.round(p.T)} K 时黑体峰在 ${wienPeakNm(p.T).toFixed(0)} nm；分子只在这一段里挑走自己需要的波长，其余被散射或透射。`
    }
  ],
  'qm-4-8': [
    {
      mode: 'stm',
      title: '隧道结：电流的指数 I–V',
      caption:
        '两块金属之间夹一层真空，电子靠隧穿形成电流。间距每变化一点点，电流就按指数改变——隧道结是最灵敏的“间距计”。',
      controls: [
        c('work', '功函数 W / eV', 2, 5, 0.1, 4, f1),
        c('gap', '结间距 d / nm', 0.1, 1.2, 0.02, 0.3, f2)
      ],
      toggles: [t('marker', '工作点', '标出当前间距对应的电流'), t('decay', '数量级参考', '标出电流下降的数量级')],
      readouts: [
        r('功函数 W', (p) => `${p.work.toFixed(1)} eV`),
        r('衰减常数 κ', (p) => `${Math.sqrt(p.work).toFixed(2)} nm⁻¹`),
        r('相对电流', (p) => Math.exp(-20 * Math.sqrt(p.work) * p.gap).toExponential(2)),
        r('电流量级', (p) => `log₁₀ = ${(-20 * Math.sqrt(p.work) * p.gap / Math.LN10).toFixed(1)}`)
      ],
      liveNote: (p) =>
        `W = ${p.work.toFixed(1)} eV、d = ${p.gap.toFixed(2)} nm：电流为 ${Math.exp(-20 * Math.sqrt(p.work) * p.gap).toExponential(2)} I₀，稍微拉开一点就会掉好几个数量级。`
    },
    {
      mode: 'tunneling',
      title: '冷电子发射：强电场把势垒压薄',
      caption:
        '外加强电场把真空势垒变成三角形势垒，有效宽度变窄。电子不必加热，就能靠隧穿逸出金属——这就是场致发射。',
      controls: [
        c('width', '等效垒宽 a', 0.2, 1.4, 0.02, 0.6, f2),
        c('ratio', '能量比 E/V₀', 0.15, 0.95, 0.01, 0.4, f2)
      ],
      toggles: [t('density', '概率密度', '强调垒内指数衰减'), t('decay', '衰减长度', '标出 1/κ')],
      readouts: [
        r('E/V₀', (p) => p.ratio.toFixed(2)),
        r('衰减常数 κ', (p) => `${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)} a⁻¹`),
        r('透射幅度', (p) => Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)),
        r('发射机制', () => '场致隧穿')
      ],
      liveNote: (p) =>
        `等效垒宽 ${p.width.toFixed(2)}、κ = ${(1.9 * Math.sqrt(1 - p.ratio)).toFixed(2)} 时，透射幅度约 ${Math.exp(-1.9 * Math.sqrt(1 - p.ratio) * p.width).toExponential(2)}；电场越强，垒越薄，发射电流越大。`
    }
  ],

  // ---------- 第五章 ----------
  'qm-5-1': [
    {
      mode: 'oscillator',
      title: '谐振子：等间距能级与厄米多项式',
      caption:
        '抛物线势阱里的能级严格等间距，波函数是高斯乘以厄米多项式。n 每加一，能量加一个 $\\hbar\\omega$，节点也多一个。',
      controls: [c('n', '量子数 n', 0, 7, 1, 3, int)],
      toggles: [t('density', '概率密度', '显示 |ψₙ|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('能级', (p) => `(${Math.round(p.n)} + ½) ħω`),
        r('能级间距', () => 'ħω'),
        r('节点数', (p) => `${Math.round(p.n)}`),
        r('宇称', (p) => (Math.round(p.n) % 2 === 0 ? '偶' : '奇'))
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 的波函数有 ${Math.round(p.n)} 个节点，宇称是${Math.round(p.n) % 2 === 0 ? '偶' : '奇'}；能量比基态高 ${Math.round(p.n)} 个 ħω。`
    },
    {
      mode: 'ladder',
      title: '升阶算符 $a^\\dagger$：每次加一个 $\\hbar\\omega$',
      caption:
        '$a^\\dagger$ 把 $|n\\rangle$ 变成 $|n+1\\rangle$，系数是 $\\sqrt{n+1}$。从基态出发反复作用，就能搭出整座等间距能级阶梯。',
      controls: [c('n', '能级 n', 0, 6, 1, 3, int)],
      toggles: [t('raise', '升阶算符 a†', '让光点从 n 跳到 n+1'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('Eₙ', (p) => `(${Math.round(p.n)} + ½) ħω`),
        r('矩阵元', (p) => `√${Math.round(p.n) + 1} = ${Math.sqrt(Math.round(p.n) + 1).toFixed(2)}`),
        r('能量增量', () => 'ħω'),
        r('基态能', () => '½ ħω')
      ],
      liveNote: (p) =>
        `a†|${Math.round(p.n)}⟩ = ${Math.sqrt(Math.round(p.n) + 1).toFixed(2)}|${Math.round(p.n) + 1}⟩；连续作用 n 次就到达第 n 级，能量恰好是 (n+½)ħω。`
    }
  ],
  'qm-5-2': [
    {
      mode: 'oscillator',
      title: '概率密度与经典极限',
      caption:
        '量子振子的概率密度在两侧转折点附近最强，经典粒子却在端点处停留最久。n 越大，量子分布越接近经典的 U 形包络。',
      controls: [c('n', '量子数 n', 0, 7, 1, 4, int)],
      toggles: [t('density', '概率密度', '显示 |ψₙ|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('节点数', (p) => `${Math.round(p.n)}`),
        r('转折点', (p) => `x_t = √(2n+1) = ${Math.sqrt(2 * Math.round(p.n) + 1).toFixed(2)} x₀`),
        r('对应原理', (p) => (Math.round(p.n) >= 5 ? '已接近经典' : '量子特征明显')),
        r('能量', (p) => `(${Math.round(p.n)} + ½) ħω`)
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 时转折点在 ${Math.sqrt(2 * Math.round(p.n) + 1).toFixed(2)} x₀；把 n 调到 6 以上，概率密度开始贴着经典 U 形包络。`
    },
    {
      mode: 'coherent',
      title: '相干态：最像经典的量子态',
      caption:
        '相干态是高斯波包，既不扩散也不变形，只沿经典轨道整体摆动。它的平均位置正好跟着 $A\\cos\\omega t$ 走。',
      controls: [
        c('amp', '振幅 A', 0.4, 2.6, 0.02, 1.4, f2),
        c('speed', '演化速度', 0.2, 2, 0.02, 1, f2)
      ],
      toggles: [t('classical', '经典轨迹', '叠加 A cos ωt 的参考曲线'), t('density', '概率密度', '显示 |ψ(x,t)|²')],
      readouts: [
        r('平均能量', (p) => `(${(p.amp ** 2 + 0.5).toFixed(2)}) ħω`),
        r('周期', () => '2π/ω'),
        r('⟨x⟩ 振幅', (p) => `${p.amp.toFixed(2)} x₀`),
        r('宽度', () => 'σ = x₀/√2')
      ],
      liveNote: (p) =>
        `A = ${p.amp.toFixed(2)} 时波包中心按 ${p.amp.toFixed(2)} cos ωt 来回摆动，宽度始终不变；平均能量是 ${(p.amp ** 2 + 0.5).toFixed(2)} ħω。`
    }
  ],
  'qm-5-3': [
    {
      mode: 'oscillator',
      title: '合流超几何级数为什么要截断',
      caption:
        '谐振子方程的解写成合流超几何级数。若不截断，它在无穷远按指数发散，无法归一化；截断条件恰好把能级量子化。',
      controls: [c('n', '截断阶 n', 0, 7, 1, 2, int)],
      toggles: [t('density', '概率密度', '显示 |ψₙ|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('截断项数', (p) => `${Math.round(p.n) + 1}`),
        r('节点数', (p) => `${Math.round(p.n)}`),
        r('发散条件', () => '级数不截断 → ∞'),
        r('量子化结果', (p) => `E = (${Math.round(p.n)} + ½) ħω`)
      ],
      liveNote: (p) =>
        `只有让级数在第 ${Math.round(p.n)} 项截断，波函数才在无穷远衰减；这个数学条件就是能量取 (${Math.round(p.n)}+½)ħω 的原因。`
    },
    {
      mode: 'ladder',
      title: '代数解：从基态生成所有本征态',
      caption:
        '不必解微分方程：从 $a|0\\rangle=0$ 出发，反复用 $a^\\dagger$ 作用，就得到全部 $|n\\rangle$。归一化因子正是 $\\sqrt{n!}$。',
      controls: [c('n', '目标能级 n', 0, 6, 1, 2, int)],
      toggles: [t('raise', '升阶算符 a†', '演示一次升阶'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('构造式', (p) => `|${Math.round(p.n)}⟩ ∝ (a†)^${Math.round(p.n)}|0⟩`),
        r('归一化', (p) => `1/√${Math.round(p.n)}! = ${(1 / Math.sqrt(factorial(Math.round(p.n)))).toFixed(3)}`),
        r('基态条件', () => 'a|0⟩ = 0'),
        r('能量', (p) => `(${Math.round(p.n)} + ½) ħω`)
      ],
      liveNote: (p) =>
        `对 |0⟩ 连续作用 ${Math.round(p.n)} 次 a†，得到 |${Math.round(p.n)}⟩；系数是 √${Math.round(p.n)}!，所以归一化分母正好是 √n!。`
    }
  ],
  'qm-5-4': [
    {
      mode: 'ladder',
      title: '降阶算符把能级打到底',
      caption:
        '$a|n\\rangle=\\sqrt{n}\\,|n-1\\rangle$，作用 n 次就回到 $|0\\rangle$；再作用一次得到零。能谱必须有下界，正是这个代数事实。',
      controls: [c('n', '起始能级 n', 0, 6, 1, 0, int)],
      toggles: [t('raise', '升阶算符 a†', '切换为升阶演示'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('降阶作用', (p) => `a|${Math.round(p.n)}⟩ = √${Math.round(p.n)}|${Math.round(p.n) - 1}⟩`),
        r('基态条件', () => 'a|0⟩ = 0'),
        r('能谱下界', () => '½ ħω'),
        r('降阶次数', (p) => `${Math.round(p.n)} 次到达基态`)
      ],
      liveNote: (p) =>
        Math.round(p.n) === 0
          ? 'n = 0 时 a|0⟩ = 0：再降就归零，谐振子没有更低的状态。'
          : `从 n = ${Math.round(p.n)} 出发，连续降阶 ${Math.round(p.n)} 次到达 |0⟩；每次系数依次是 √n、√(n−1) … 1。`
    },
    {
      mode: 'oscillator',
      title: '基态不是“静止”',
      caption:
        '$n=0$ 的波函数是一个高斯包，能量是 $\\frac{1}{2}\\hbar\\omega$，而不是零。位置与动量的不确定性之和，注定给基态留下零点能。',
      controls: [c('n', '量子数 n', 0, 7, 1, 0, int)],
      toggles: [t('density', '概率密度', '显示 |ψ₀|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('零点能', () => '½ ħω'),
        r('节点数', () => '0'),
        r('宽度', () => 'x₀ = √(ħ/2mω)'),
        r('Δx·Δp', () => 'ħ/2（最小）')
      ],
      liveNote: () =>
        'n = 0 时概率密度是单个高斯峰，没有节点；能量仍有 ½ħω，这是不确定性原理给的最低代价。'
    }
  ],

  // ---------- 第六章 ----------
  'qm-6-1': [
    {
      mode: 'molecular',
      title: 'Lennard-Jones 12-6 势：惰性气体分子',
      caption:
        'LJ 势用 $-1/r^6$ 描述吸引、用 $1/r^{12}$ 描述排斥。势阱底附近近似抛物线，振动能级近似等间距；往上能级逐渐变密。',
      controls: [
        c('type', '势场类型', 0, 3, 1, 0, int),
        c('depth', '阱深', 0.5, 1.4, 0.02, 0.9, f2),
        c('v', '振动能级 v', 0, 5, 1, 1, int)
      ],
      toggles: [t('levels', '振动能级', '显示 6 条振动能级'), t('labels', '能级标签', '标出 v = 0 … 5')],
      readouts: [
        r('势型', (p) => (Math.round(p.type) === 0 ? 'LJ 12-6' : '其他')),
        r('阱深', (p) => p.depth.toFixed(2)),
        r('零点能', () => 'E₀ > 0'),
        r('能级间距', (p) => {
          const level = (v: number) => Math.min(0.98, 0.09 + 0.16 * v - 0.004 * v * v)
          return `${(level(Math.round(p.v) + 1) - level(Math.round(p.v))).toFixed(3)}`
        })
      ],
      liveNote: (p) =>
        `LJ 阱深 ${p.depth.toFixed(2)} 时，v = ${Math.round(p.v)} 附近的能级间距约 ${(Math.min(0.98, 0.09 + 0.16 * (Math.round(p.v) + 1) - 0.004 * (Math.round(p.v) + 1) ** 2) - Math.min(0.98, 0.09 + 0.16 * Math.round(p.v) - 0.004 * Math.round(p.v) ** 2)).toFixed(3)}；阱底越平，谱线越接近等间距。`
    },
    {
      mode: 'oscillator',
      title: '势阱底部的谐振子近似',
      caption:
        '任何光滑势阱在极小值附近都可以展开成抛物线。分子振动的最低几级，几乎就是谐振子的等间距谱。',
      controls: [c('n', '振动量子数 n', 0, 7, 1, 1, int)],
      toggles: [t('density', '概率密度', '显示 |ψₙ|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('近似能级', (p) => `(${Math.round(p.n)} + ½) ħω`),
        r('间距', () => 'ħω'),
        r('适用范围', () => '阱底小振动'),
        r('零点能', () => '½ ħω')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 的低激发态仍落在阱底抛物线区；一旦振动幅度接近阱口，谐振子近似就会失效，能级开始变密。`
    }
  ],
  'qm-6-2': [
    {
      mode: 'molecular',
      title: '莫尔斯势：双原子分子的非谐谱',
      caption:
        '莫尔斯势在 $r\\to\\infty$ 时趋于零，天然描述分子解离。它的能级间距随 v 递减，谱线越往上越密，最后并入连续谱。',
      controls: [
        c('type', '势场类型', 0, 3, 1, 1, int),
        c('depth', '解离能 D_e', 0.5, 1.4, 0.02, 1, f2),
        c('v', '振动能级 v', 0, 5, 1, 2, int)
      ],
      toggles: [t('levels', '振动能级', '显示 6 条振动能级'), t('labels', '能级标签', '标出 v = 0 … 5')],
      readouts: [
        r('势型', (p) => (Math.round(p.type) === 1 ? 'Morse' : '其他')),
        r('解离能', (p) => p.depth.toFixed(2)),
        r('非谐间距', (p) => {
          const level = (v: number) => Math.min(0.98, 0.09 + 0.16 * v - 0.012 * v * v)
          return `${(level(Math.round(p.v) + 1) - level(Math.round(p.v))).toFixed(3)}`
        }),
        r('谱线趋势', () => '越往上越密')
      ],
      liveNote: (p) =>
        `v = ${Math.round(p.v)} 附近，莫尔斯谱的间距已经比 v = 0 时小；v 越大越密，直到能级并入解离连续谱。`
    },
    {
      mode: 'ladder',
      title: '等间距 vs 渐密：两种谱的对照',
      caption:
        '谐振子的能级严格等间距；莫尔斯势的能级越往上越挤。把它们放在一起看，就能理解“非谐修正”到底改了什么。',
      controls: [c('n', '能级 n', 0, 6, 1, 2, int)],
      toggles: [t('raise', '升阶算符 a†', '演示谐振子的等间距升阶'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('谐振子间距', () => 'ħω（常数）'),
        r('莫尔斯间距', (p) => {
          const level = (v: number) => Math.min(0.98, 0.09 + 0.16 * v - 0.012 * v * v)
          return `${(level(Math.round(p.n) + 1) - level(Math.round(p.n))).toFixed(3)}（随 v 减小）`
        }),
        r('当前能级', (p) => `n = ${Math.round(p.n)}`),
        r('高激发态', () => '莫尔斯谱更密')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 处谐振子间距仍是 ħω，而莫尔斯谱只有 ${(Math.min(0.98, 0.09 + 0.16 * (Math.round(p.n) + 1) - 0.012 * (Math.round(p.n) + 1) ** 2) - Math.min(0.98, 0.09 + 0.16 * Math.round(p.n) - 0.012 * Math.round(p.n) ** 2)).toFixed(3)}——非谐性让阶梯越往上越窄。`
    }
  ],
  'qm-6-3': [
    {
      mode: 'molecular',
      title: 'Pöschl-Teller 势阱：$\\mathrm{sech}^2$ 能谱',
      caption:
        '$\\mathrm{sech}^2$ 阱是莫尔斯势的近亲：光滑、可精确求解，能级同样向上变密。它的阱底近似谐振子，高激发态则明显非谐。',
      controls: [
        c('type', '势场类型', 0, 3, 1, 3, int),
        c('depth', '阱深', 0.5, 1.4, 0.02, 1, f2),
        c('v', '振动能级 v', 0, 5, 1, 3, int)
      ],
      toggles: [t('levels', '振动能级', '显示 6 条振动能级'), t('labels', '能级标签', '标出 v = 0 … 5')],
      readouts: [
        r('势型', (p) => (Math.round(p.type) === 3 ? 'sech²' : '其他')),
        r('阱深', (p) => p.depth.toFixed(2)),
        r('能级间距', (p) => {
          const level = (v: number) => Math.min(0.98, 0.09 + 0.16 * v - 0.008 * v * v)
          return `${(level(Math.round(p.v) + 1) - level(Math.round(p.v))).toFixed(3)}`
        }),
        r('高激发态', () => '能级变密')
      ],
      liveNote: (p) =>
        `v = ${Math.round(p.v)} 时 sech² 阱的能级间距约 ${(Math.min(0.98, 0.09 + 0.16 * (Math.round(p.v) + 1) - 0.008 * (Math.round(p.v) + 1) ** 2) - Math.min(0.98, 0.09 + 0.16 * Math.round(p.v) - 0.008 * Math.round(p.v) ** 2)).toFixed(3)}；把 v 拉高，非谐性就越来越明显。`
    },
    {
      mode: 'oscillator',
      title: 'PT 阱底的近谐振子行为',
      caption:
        '把 $\\mathrm{sech}^2$ 阱在底部展开，领头项仍是抛物线。最低几级几乎等间距，这解释了为什么分子振动常被当作谐振子处理。',
      controls: [c('n', '振动量子数 n', 0, 7, 1, 2, int)],
      toggles: [t('density', '概率密度', '显示 |ψₙ|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('近似能级', (p) => `(${Math.round(p.n)} + ½) ħω`),
        r('最低能级', () => '½ ħω'),
        r('适用区', () => 'n 小、振幅小'),
        r('高 n', () => '回归非谐谱')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 不高时，PT 阱底的能级仍近似等间距；n 越大，阱壁的非谐性越难忽略。`
    }
  ],
  'qm-6-4': [
    {
      mode: 'coherent',
      title: '光学钟：相干态的稳定振荡',
      caption:
        '把原子制备到相干态，它的中心按一个非常稳定的频率来回振荡。把这个频率锁定到激光上，就是光学钟的原理。',
      controls: [
        c('amp', '振荡幅度 A', 0.4, 2.6, 0.02, 1.2, f2),
        c('speed', '演化速度', 0.2, 2, 0.02, 1.2, f2)
      ],
      toggles: [t('classical', '经典参考轨迹', '叠加 A cos ωt'), t('density', '概率密度', '显示 |ψ(x,t)|²')],
      readouts: [
        r('振荡频率', () => 'ω/2π'),
        r('周期', () => '2π/ω'),
        r('平均能量', (p) => `(${(p.amp ** 2 + 0.5).toFixed(2)}) ħω`),
        r('稳定性', () => '相干态不扩散')
      ],
      liveNote: (p) =>
        `A = ${p.amp.toFixed(2)} 的相干态每 2π/ω 完成一次往返；振幅越小，波包越接近基态，频率越干净。`
    },
    {
      mode: 'ladder',
      title: '光学钟的能级间隔',
      caption:
        '光学钟的“摆轮”是原子两个能级之间的跃迁。谐振子的等间距阶梯，使跃迁频率与振幅无关，这正是钟走时稳定的原因。',
      controls: [c('n', '能级 n', 0, 6, 1, 2, int)],
      toggles: [t('raise', '升阶算符 a†', '演示一次跃迁'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('跃迁能量', () => 'ħω（与 n 无关）'),
        r('频率', () => 'ω = ΔE/ħ'),
        r('当前能级', (p) => `n = ${Math.round(p.n)}`),
        r('钟的基准', () => '固定跃迁频率')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} → ${Math.round(p.n) + 1} 的跃迁能量仍是 ħω；能级等间距保证了频率不随振幅漂移，这正是时钟需要的性质。`
    }
  ],
  'qm-6-5': [
    {
      mode: 'oscillator',
      title: '微悬臂：一个机械谐振子',
      caption:
        '原子力显微镜的微悬臂可以看成一个谐振子。温度让它振动，量子力学则给它一个不可消除的零点涨落。',
      controls: [c('n', '振动量子数 n', 0, 7, 1, 1, int)],
      toggles: [t('density', '概率密度', '显示 |ψₙ|²'), t('classical', '经典转折点', '标出 |x| = x_t')],
      readouts: [
        r('模式', (p) => `n = ${Math.round(p.n)}`),
        r('零点能', () => '½ ħω'),
        r('热噪声', () => 'k_B T ≫ ħω 时主导'),
        r('量子极限', () => 'Δx·Δp ≥ ħ/2')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)} 时微悬臂的振幅仍围绕经典转折点分布；温度降低到 ħω ≪ k_BT 以下，量子零点涨落才会浮现。`
    },
    {
      mode: 'stm',
      title: 'AFM / STM：把间距变成信号',
      caption:
        '悬臂或针尖的微小位移，被转换成可测的力或隧道电流。间距每变 0.1 nm，隧道电流就指数变化，这是纳米测量的基础。',
      controls: [
        c('work', '功函数 W / eV', 2, 5, 0.1, 4.5, f1),
        c('gap', '针尖间距 d / nm', 0.1, 1.2, 0.02, 0.2, f2)
      ],
      toggles: [t('marker', '工作点', '标出当前间距对应的电流'), t('decay', '数量级参考', '标出电流的数量级')],
      readouts: [
        r('功函数 W', (p) => `${p.work.toFixed(1)} eV`),
        r('衰减常数 κ', (p) => `${Math.sqrt(p.work).toFixed(2)} nm⁻¹`),
        r('相对电流', (p) => Math.exp(-20 * Math.sqrt(p.work) * p.gap).toExponential(2)),
        r('测量原理', () => '间距 → 指数电流')
      ],
      liveNote: (p) =>
        `d = ${p.gap.toFixed(2)} nm 时电流约 ${Math.exp(-20 * Math.sqrt(p.work) * p.gap).toExponential(2)} I₀；把间距增加 0.1 nm，信号就会掉好几个数量级。`
    }
  ],

  // ---------- 第七章 ----------
  'qm-7-1': [
    {
      mode: 'operator',
      title: '动量算符：$-i\\hbar\\partial/\\partial x$ 的本征值',
      caption:
        '动量算符是 $-i\\hbar\\partial/\\partial x$。作用在平面波 $e^{ikx}$ 上，它只把波函数乘上一个数 $\\hbar k$——这就是本征值方程。',
      controls: [c('k', '波数 k', 0.6, 2.6, 0.02, 1.6, f2)],
      toggles: [t('complex', '复平面', '把实部与虚部画成三维螺旋'), t('arrow', '动量箭头', '标出 p = ħk 的方向与大小')],
      readouts: [
        r('动量本征值', (p) => `p = ${p.k.toFixed(2)} ħ`),
        r('波长', (p) => `${(2 * Math.PI / p.k).toFixed(2)} a`),
        r('算符', () => 'p̂ = −iħ d/dx'),
        r('对易子', () => '[x̂, p̂] = iħ')
      ],
      liveNote: (p) =>
        `k = ${p.k.toFixed(2)} 的平面波是本征态：p̂ψ = ${p.k.toFixed(2)}ħ ψ。动量确定，位置就完全不确定。`
    },
    {
      mode: 'ladder',
      title: '算符代数：a 与 a† 不是厄米算符',
      caption:
        '升降算符互为厄米伴，却不是厄米算符，所以它们没有实本征值。真正有物理意义的是组合出来的 $a^\\dagger a=N$。',
      controls: [c('n', '能级 n', 0, 6, 1, 2, int)],
      toggles: [t('raise', '升阶算符 a†', '演示一次升阶'), t('labels', '能级标签', '显示 n = 0 … 7')],
      readouts: [
        r('对易子', () => '[a, a†] = 1'),
        r('数算符', (p) => `N|${Math.round(p.n)}⟩ = ${Math.round(p.n)}|${Math.round(p.n)}⟩`),
        r('厄米性', () => 'a† ≠ a'),
        r('可观测性', () => 'N 才是厄米的')
      ],
      liveNote: (p) =>
        `N = a†a 的本征值是整数 ${Math.round(p.n)}；a 与 a† 改变这个整数，所以它们本身不对应可观测的物理量。`
    }
  ],
  'qm-7-2': [
    {
      mode: 'operator',
      title: '厄米算符：本征值一定是实数',
      caption:
        '动量算符满足 $\\hat p^\\dagger=\\hat p$，所以它的本征值 $\\hbar k$ 是实数。任何可观测量的算符都必须是厄米的。',
      controls: [c('k', '波数 k', 0.6, 2.6, 0.02, 1.6, f2)],
      toggles: [t('complex', '复平面', '显示复相位'), t('arrow', '动量箭头', '标出 p = ħk')],
      readouts: [
        r('厄米性', () => 'p̂† = p̂'),
        r('本征值', (p) => `${p.k.toFixed(2)} ħ（实数）`),
        r('正交性', () => '⟨k′|k⟩ ∝ δ(k−k′)'),
        r('测量结果', () => '必为实数')
      ],
      liveNote: (p) =>
        `k = ${p.k.toFixed(2)} 的本征值是实数 ${p.k.toFixed(2)}ħ；厄米性保证测量结果不会出现虚数。`
    },
    {
      mode: 'levels',
      title: '正交归一的本征态阶梯',
      caption:
        '厄米算符的本征态彼此正交，构成一组完备基。任何态都可以展开到这条能级阶梯上，系数模方就是测量概率。',
      controls: [
        c('n', '本征态 n', 1, 8, 1, 3, int),
        c('law', '谱指数 p', 1, 2.4, 0.05, 2, f2),
        c('defect', '偏移 δ', 0, 1, 0.02, 0, f2)
      ],
      toggles: [t('dense', '显示密集谱', '展开 40 条能级', false), t('labels', '本征态标签', '标出 n = 1 … 8')],
      readouts: [
        r('正交性', () => '⟨m|n⟩ = δmn'),
        r('完备性', () => 'Σ |n⟩⟨n| = 1'),
        r('本征值', (p) => `${Math.pow(Math.round(p.n) + p.defect, p.law).toFixed(2)} E₁`),
        r('展开系数', () => 'cₙ = ⟨n|ψ⟩')
      ],
      liveNote: (p) =>
        `第 ${Math.round(p.n)} 个本征态与其他态全部正交；任意态展开后，|cₙ|² 就是测得第 n 个本征值的概率。`
    }
  ],
  'qm-7-3': [
    {
      mode: 'operator',
      title: '平面波：连续谱的本征函数',
      caption:
        '平面波 $e^{ikx}$ 是动量算符的本征态，但它在全空间不平方可积。连续谱本征函数只能做 δ 函数归一化。',
      controls: [c('k', '波数 k', 0.6, 2.6, 0.02, 2.2, f2)],
      toggles: [t('complex', '复平面', '展开虚部，看行波'), t('arrow', '动量箭头', '标出传播方向')],
      readouts: [
        r('归一化', () => 'δ(k−k′)'),
        r('波长', (p) => `${(2 * Math.PI / p.k).toFixed(2)} a`),
        r('概率密度', () => '|ψ|² = 常数'),
        r('谱', () => '连续')
      ],
      liveNote: (p) =>
        `k = ${p.k.toFixed(2)} 时波长 ${(2 * Math.PI / p.k).toFixed(2)} a；平面波铺满全空间，所以只能按 δ 函数归一化，不能按总概率为 1 归一化。`
    },
    {
      mode: 'wavepacket',
      title: '连续谱叠加成波包',
      caption:
        '把许多平面波按权重叠加，连续谱就“聚”成一个有限宽度的波包。宽度与动量分布的宽度受不确定性原理约束。',
      controls: [
        c('k0', '中心波数 k₀', 1, 4, 0.05, 2.2, f2),
        c('sigma0', '空间宽度 σ₀', 0.4, 1.4, 0.02, 0.8, f2)
      ],
      toggles: [t('density', '概率密度', '显示 |ψ|²'), t('complex', '复相位', '展开虚部')],
      readouts: [
        r('中心动量', (p) => `${p.k0.toFixed(2)} ħ`),
        r('Δx', (p) => `${p.sigma0.toFixed(2)} a`),
        r('Δp', (p) => `${(0.5 / p.sigma0).toFixed(2)} ħ`),
        r('Δx·Δp', (p) => `${(0.5 / p.sigma0 * p.sigma0).toFixed(2)} ħ`)
      ],
      liveNote: (p) =>
        `σ₀ = ${p.sigma0.toFixed(2)} 时动量谱宽约 ${(0.5 / p.sigma0).toFixed(2)} ħ；波包越窄，需要的平面波就越多。`
    }
  ],
  'qm-7-4': [
    {
      mode: 'chain',
      title: '箱归一化：L→∞ 时离散谱变连续',
      caption:
        '把空间装进长度 L 的箱子，动量只能取 $2\\pi\\hbar/L$ 的整数倍。箱子越大，动量谱越密；$L\\to\\infty$ 时离散谱就连续了。',
      controls: [c('segments', '箱子尺度 N', 2, 14, 1, 10, int)],
      toggles: [t('labels', 'HOMO/LUMO 标签', '标出最高占据与最低空轨道'), t('gap', '能隙标记', '画出相邻能级间距')],
      readouts: [
        r('动量间隔', (p) => `Δp ∝ 1/${Math.round(p.segments) + 1}`),
        r('能级间隔', (p) => {
          const segments = Math.round(p.segments)
          const homo = Math.ceil(segments / 2)
          return `${(chainLevel(homo + 1, segments) - chainLevel(homo, segments)).toFixed(2)} eV`
        }),
        r('谱密度', (p) => (p.segments >= 10 ? '接近连续' : '离散明显')),
        r('L→∞ 极限', () => '连续谱')
      ],
      liveNote: (p) =>
        `N = ${Math.round(p.segments)} 时相邻能级间隔仍可见；把 N 拉大，间隔按 1/(N+1)² 缩小，谱线逐渐连成一片。`
    },
    {
      mode: 'operator',
      title: '箱中的动量本征态',
      caption:
        '箱归一化以后，动量本征态可以写成 $e^{ikx}$ 并满足周期边界。k 取离散值，归一化常数有了明确含义。',
      controls: [c('k', '波数 k', 0.6, 2.6, 0.02, 2, f2)],
      toggles: [t('complex', '复平面', '显示复相位'), t('arrow', '动量箭头', '标出 p = ħk')],
      readouts: [
        r('离散条件', () => 'k = 2πn/L'),
        r('动量', (p) => `${p.k.toFixed(2)} ħ`),
        r('归一化', () => '1/√L'),
        r('周期边界', () => 'ψ(x+L) = ψ(x)')
      ],
      liveNote: (p) =>
        `k = ${p.k.toFixed(2)} 在箱中只能取离散值；箱子越大，相邻 k 的间隔越小，平面波就越接近连续谱。`
    }
  ],
  'qm-7-5': [
    {
      mode: 'angular',
      title: '角动量本征态：$|l,m\\rangle$ 的球谐形状',
      caption:
        '$\\hat L^2$ 与 $\\hat L_z$ 共同的本征态是球谐函数 $Y_{lm}$。l 决定总角动量，m 决定它在 z 轴上的投影，形状随之改变。',
      controls: [
        c('l', '角量子数 l', 0, 3, 1, 2, int),
        c('m', '磁量子数 m', -3, 3, 1, 0, int)
      ],
      toggles: [t('cloud', '概率点云', '按 |Yₗₘ|² 撒点'), t('axis', '坐标参考', '显示 x、y、z 轴')],
      readouts: [
        r('L²', (p) => `${(Math.round(p.l) * (Math.round(p.l) + 1))} ħ²`),
        r('Lz', (p) => `${Math.round(p.m)} ħ`),
        r('允许的 m', (p) => `${-Math.round(p.l)} … +${Math.round(p.l)}`),
        r('角向节点', (p) => `${Math.round(p.l) - Math.abs(Math.min(Math.round(p.m), Math.round(p.l)))}`)
      ],
      liveNote: (p) =>
        `l = ${Math.round(p.l)}、m = ${Math.round(p.m)}：L² = ${(Math.round(p.l) * (Math.round(p.l) + 1))} ħ²，Lz = ${Math.round(p.m)} ħ；m 不能超出 ±l，场景会自动钳制。`
    },
    {
      mode: 'ladder',
      title: '角动量的升降算符 L±',
      caption:
        '$L_\\pm=L_x\\pm iL_y$ 把 m 改变一个单位，却不改变 l。它与谐振子的 $a^\\dagger$ 是同一套代数，只是标签换成了角动量。',
      controls: [c('n', '磁量子数 m', 0, 6, 1, 2, int)],
      toggles: [t('raise', '升阶算符 L₊', '演示一次 m → m+1'), t('labels', 'm 标签', '显示 m = 0 … 7')],
      readouts: [
        r('作用', (p) => `L₊|l,${Math.round(p.n)}⟩ ∝ |l,${Math.round(p.n) + 1}⟩`),
        r('对易子', () => '[Lz, L±] = ±ħ L±'),
        r('不变量', () => 'L² 保持不变'),
        r('m 上限', () => 'm ≤ l')
      ],
      liveNote: (p) =>
        `L₊ 把 m = ${Math.round(p.n)} 抬到 ${Math.round(p.n) + 1}，但 l 不变；到达 m = l 后，再升就得到零。`
    }
  ],

  // ---------- 第八章 ----------
  'qm-8-1': [
    {
      mode: 'radial',
      title: '球坐标：径向与角向分离',
      caption:
        '中心势问题可以分离变量：$\\psi=R(r)\\,Y_{lm}(\\theta,\\varphi)$。径向部分决定电子离核多远，角向部分决定电子云的朝向。',
      controls: [
        c('n', '主量子数 n', 1, 4, 1, 2, int),
        c('l', '角量子数 l', 0, 2, 1, 1, int)
      ],
      toggles: [t('density', '径向概率密度', '显示 r²R²')],
      readouts: [
        r('径向节点', (p) => `${Math.round(p.n) - Math.round(p.l) - 1}`),
        r('角向节点', (p) => `${Math.round(p.l)}`),
        r('总节点', (p) => `${Math.round(p.n) - 1}`),
        r('峰值半径', (p) => `${(Math.round(p.n) ** 2 * (1 + Math.sqrt(1 - Math.round(p.l) * (Math.round(p.l) + 1) / (Math.round(p.n) ** 2)))).toFixed(1)} a₀`)
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)}、l = ${Math.round(p.l)} 时径向节点 ${Math.round(p.n) - Math.round(p.l) - 1} 个、角向节点 ${Math.round(p.l)} 个，总数正好是 n−1 = ${Math.round(p.n) - 1}。`
    },
    {
      mode: 'angular',
      title: '球谐函数：角向解的全部内容',
      caption:
        '角向方程的解是球谐函数 $Y_{lm}$。l 固定时 m 只能取 $-l\\ldots l$，共 $2l+1$ 个朝向；它们是 $\\hat L^2$ 与 $\\hat L_z$ 的共同本征态。',
      controls: [
        c('l', '角量子数 l', 0, 3, 1, 1, int),
        c('m', '磁量子数 m', -3, 3, 1, 0, int)
      ],
      toggles: [t('cloud', '概率点云', '按 |Yₗₘ|² 撒点'), t('axis', '坐标参考', '显示 x、y、z 轴')],
      readouts: [
        r('L²', (p) => `${(Math.round(p.l) * (Math.round(p.l) + 1))} ħ²`),
        r('Lz', (p) => `${Math.round(p.m)} ħ`),
        r('简并度', (p) => `2l+1 = ${2 * Math.round(p.l) + 1}`),
        r('角节点', (p) => `${Math.round(p.l)}`)
      ],
      liveNote: (p) =>
        `l = ${Math.round(p.l)} 的球谐函数呈 ${2 * Math.round(p.l) + 1} 重简并；m = ${Math.round(p.m)} 只改变取向，不改变 L²。`
    }
  ],
  'qm-8-2': [
    {
      mode: 'angular',
      title: '连带勒让德函数与电子云形状',
      caption:
        '极角方向的解是连带勒让德函数 $P_l^m(\\cos\\theta)$。$|m|$ 越大，电子云越贴近赤道面；$m=0$ 时沿 z 轴伸展开。',
      controls: [
        c('l', '角量子数 l', 0, 3, 1, 2, int),
        c('m', '磁量子数 m', -3, 3, 1, 1, int)
      ],
      toggles: [t('cloud', '概率点云', '按概率密度撒点'), t('axis', '坐标参考', '显示坐标轴')],
      readouts: [
        r('角动量', (p) => `√${(Math.round(p.l) * (Math.round(p.l) + 1))} ħ`),
        r('投影', (p) => `${Math.round(p.m)} ħ`),
        r('磁矩 μz', (p) => `${(-Math.round(p.m))} μ_B`),
        r('允许 m', (p) => `${-Math.round(p.l)} … +${Math.round(p.l)}`)
      ],
      liveNote: (p) =>
        `l = ${Math.round(p.l)}、m = ${Math.round(p.m)} 时电子云有 ${Math.round(p.l) - Math.abs(Math.min(Math.round(p.m), Math.round(p.l)))} 个角向节点面；m 越大越贴近赤道。`
    },
    {
      mode: 'hydrogen',
      title: '氢原子电子云：角向部分',
      caption:
        '把径向部分固定，就能看清角向电子云的形状。s 态球对称，p 态有哑铃形，d 态更复杂。',
      controls: [
        c('n', '主量子数 n', 1, 3, 1, 2, int),
        c('l', '角量子数 l', 0, 2, 1, 1, int),
        c('m', '磁量子数 m', -2, 2, 1, 0, int)
      ],
      toggles: [t('cloud', '电子云', '按概率密度撒点'), t('axis', '坐标轴', '显示 x、y、z 与原子核')],
      readouts: [
        r('能级', (p) => `${bohrEnergy(orbitalN(p)).toFixed(2)} eV`),
        r('角节点', (p) => `${orbitalL(p)}`),
        r('简并度', () => 'n²'),
        r('轨道', (p) => `${orbitalN(p)}${'spd'[orbitalL(p)] ?? '?'}`)
      ],
      liveNote: (p) =>
        `n = ${orbitalN(p)}、l = ${orbitalL(p)} 的轨道记作 ${orbitalN(p)}${'spd'[orbitalL(p)] ?? '?'}；m = ${Math.round(p.m)} 只改取向，不改能量。`
    }
  ],
  'qm-8-3': [
    {
      mode: 'radial',
      title: '径向方程：库仑场中的拉盖尔多项式',
      caption:
        '库仑势的径向解由广义拉盖尔多项式给出。n 越大、l 越小，径向节点越多，电子云向外铺得越开。',
      controls: [
        c('n', '主量子数 n', 1, 4, 1, 3, int),
        c('l', '角量子数 l', 0, 2, 1, 0, int)
      ],
      toggles: [t('density', '径向概率密度', '显示 r²R²')],
      readouts: [
        r('径向节点', (p) => `${Math.round(p.n) - Math.round(p.l) - 1}`),
        r('多项式', () => '广义拉盖尔 L^{2l+1}_{n−l−1}'),
        r('归一化', () => '∫ r²R² dr = 1'),
        r('峰值半径', (p) => `${(Math.round(p.n) ** 2 * (1 + Math.sqrt(1 - Math.round(p.l) * (Math.round(p.l) + 1) / (Math.round(p.n) ** 2)))).toFixed(1)} a₀`)
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)}、l = ${Math.round(p.l)} 的径向函数有 ${Math.round(p.n) - Math.round(p.l) - 1} 个节点；节点越多，r²R² 的峰越往外。`
    },
    {
      mode: 'hydrogen',
      title: '径向概率密度 $r^2R^2$',
      caption:
        '真正决定“电子离核多远”的是 $r^2R^2$，而不是 $R^2$ 本身。球壳体积因子 $r^2$ 把概率峰推向更大的半径。',
      controls: [
        c('n', '主量子数 n', 1, 3, 1, 2, int),
        c('l', '角量子数 l', 0, 2, 1, 1, int),
        c('m', '磁量子数 m', -2, 2, 1, 0, int)
      ],
      toggles: [t('cloud', '电子云', '按概率密度撒点'), t('axis', '坐标轴', '显示参考轴')],
      readouts: [
        r('平均半径', (p) => `${(0.5 * (3 * orbitalN(p) ** 2 - orbitalL(p) * (orbitalL(p) + 1))).toFixed(1)} a₀`),
        r('径向节点', (p) => `${orbitalN(p) - orbitalL(p) - 1}`),
        r('能级', (p) => `${bohrEnergy(orbitalN(p)).toFixed(2)} eV`),
        r('概率峰', () => 'r²R² 的外移峰')
      ],
      liveNote: (p) =>
        `n = ${orbitalN(p)}、l = ${orbitalL(p)} 时平均半径约 ${(0.5 * (3 * orbitalN(p) ** 2 - orbitalL(p) * (orbitalL(p) + 1))).toFixed(1)} a₀；r² 因子让最可几半径总是比 R² 的峰更靠外。`
    }
  ],
  'qm-8-4': [
    {
      mode: 'hydrogen',
      title: '完整本征函数与电子云',
      caption:
        '把径向与角向乘起来，得到完整本征函数 $\\psi_{nlm}$。$|\\psi|^2$ 才是电子云；不同 m 的云形状不同，但能量完全相同。',
      controls: [
        c('n', '主量子数 n', 1, 3, 1, 2, int),
        c('l', '角量子数 l', 0, 2, 1, 0, int),
        c('m', '磁量子数 m', -2, 2, 1, 0, int)
      ],
      toggles: [t('cloud', '电子云', '按 |ψ|² 撒点'), t('axis', '坐标轴', '显示 x、y、z 与原子核')],
      readouts: [
        r('能级', (p) => `${bohrEnergy(orbitalN(p)).toFixed(2)} eV`),
        r('简并度', (p) => `${orbitalN(p) ** 2}`),
        r('总节点', (p) => `${orbitalN(p) - 1}`),
        r('正交归一', () => '⟨n′l′m′|nlm⟩ = δ')
      ],
      liveNote: (p) =>
        `n = ${orbitalN(p)} 有 ${orbitalN(p) ** 2} 个简并态；换 m 只旋转电子云，能量仍是 ${bohrEnergy(orbitalN(p)).toFixed(2)} eV。`
    },
    {
      mode: 'radial',
      title: '正交归一：径向函数的检查',
      caption:
        '不同 n 的径向函数带不同权重的 $r^2$，在 0 到 ∞ 上彼此正交。归一化条件则保证总概率为 1。',
      controls: [
        c('n', '主量子数 n', 1, 4, 1, 3, int),
        c('l', '角量子数 l', 0, 2, 1, 1, int)
      ],
      toggles: [t('density', '径向概率密度', '显示 r²R²')],
      readouts: [
        r('归一化', () => '∫ r²Rₙₗ² dr = 1'),
        r('正交性', () => '∫ r²RₙₗRₙ′ₗ dr = 0'),
        r('节点', (p) => `${Math.round(p.n) - Math.round(p.l) - 1}`),
        r('峰值半径', (p) => `${(Math.round(p.n) ** 2 * (1 + Math.sqrt(1 - Math.round(p.l) * (Math.round(p.l) + 1) / (Math.round(p.n) ** 2)))).toFixed(1)} a₀`)
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)}、l = ${Math.round(p.l)} 的径向函数已在 0 到 ∞ 上归一；它与其他 n 的径向函数内积为零。`
    }
  ],
  'qm-8-5': [
    {
      mode: 'hydrogen',
      title: '氢原子：能级、简并与电子云',
      caption:
        '氢原子能级只依赖主量子数 n：$E_n=-13.6/n^2\\,\\mathrm{eV}$。同一 n 下的 l、m 全部简并，电子云形状却各不相同。',
      controls: [
        c('n', '主量子数 n', 1, 3, 1, 3, int),
        c('l', '角量子数 l', 0, 2, 1, 2, int),
        c('m', '磁量子数 m', -2, 2, 1, 0, int)
      ],
      toggles: [t('cloud', '电子云', '按 |ψ|² 撒点'), t('axis', '坐标轴', '显示 x、y、z 与原子核')],
      readouts: [
        r('能级 Eₙ', (p) => `${bohrEnergy(orbitalN(p)).toFixed(2)} eV`),
        r('简并度', (p) => `${orbitalN(p) ** 2}`),
        r('径向节点', (p) => `${orbitalN(p) - orbitalL(p) - 1}`),
        r('轨道', (p) => `${orbitalN(p)}${'spd'[orbitalL(p)] ?? '?'}`)
      ],
      liveNote: (p) =>
        `n = ${orbitalN(p)} 的能级是 ${bohrEnergy(orbitalN(p)).toFixed(2)} eV，简并度 ${orbitalN(p) ** 2}；电子云呈 ${orbitalN(p)}${'spd'[orbitalL(p)] ?? '?'} 型。`
    },
    {
      mode: 'bohr',
      title: '巴尔末系：n→2 的谱线',
      caption:
        '电子从高能级跳回 $n=2$，发出可见光。$4\\to 2$ 是 486 nm 的青蓝线，$3\\to 2$ 是 656 nm 的红线，$5\\to 2$ 更靠蓝。',
      controls: [
        c('ni', '初态 nᵢ', 2, 6, 1, 4, int),
        c('nf', '末态 n_f', 1, 5, 1, 2, int)
      ],
      toggles: [t('arrow', '跃迁箭头', '画出从 nᵢ 到 n_f 的跃迁'), t('photon', '光子', '让光子沿跃迁方向飞行')],
      readouts: [
        r('跃迁能量', (p) => `${transitionEnergy(Math.round(p.ni), Math.round(p.nf)).toFixed(2)} eV`),
        r('波长', (p) => `${transitionWavelength(Math.round(p.ni), Math.round(p.nf)).toFixed(0)} nm`),
        r('谱系', (p) => (Math.round(p.nf) === 2 ? '巴尔末系' : Math.round(p.nf) === 1 ? '莱曼系' : '其他系')),
        r('初态能量', (p) => `${bohrEnergy(Math.round(p.ni)).toFixed(2)} eV`)
      ],
      liveNote: (p) =>
        `${Math.round(p.ni)} → ${Math.round(p.nf)} 释放 ${transitionEnergy(Math.round(p.ni), Math.round(p.nf)).toFixed(2)} eV，对应 ${transitionWavelength(Math.round(p.ni), Math.round(p.nf)).toFixed(0)} nm 的谱线。`
    }
  ],
  'qm-8-6': [
    {
      mode: 'radial',
      title: 'l=0：回到一维势阱',
      caption:
        '无限深球形势阱在 $l=0$ 时没有离心势。把 $u(r)=rR(r)$ 代进去，方程与一维盒中粒子完全相同。',
      controls: [
        c('n', '主量子数 n', 1, 4, 1, 2, int),
        c('l', '角量子数 l', 0, 2, 1, 0, int)
      ],
      toggles: [t('density', '径向概率密度', '显示 r²R²')],
      readouts: [
        r('有效方程', () => 'u″ + k²u = 0'),
        r('边界条件', () => 'u(0) = u(a) = 0'),
        r('径向节点', (p) => `${Math.round(p.n) - 1}`),
        r('能级', (p) => `Eₙ ∝ n² = ${Math.round(p.n) ** 2}`)
      ],
      liveNote: (p) =>
        `l = 0 时球形势阱与一维盒子同构：n = ${Math.round(p.n)} 有 ${Math.round(p.n) - 1} 个径向节点，能级按 n² 排列。`
    },
    {
      mode: 'angular',
      title: 'l>0：离心势与角向节点',
      caption:
        '$l>0$ 时角向动能变成离心势 $l(l+1)/r^2$，把径向波函数从原点推开。能级因此抬高，电子云出现角向节点。',
      controls: [
        c('l', '角量子数 l', 0, 3, 1, 2, int),
        c('m', '磁量子数 m', -3, 3, 1, 0, int)
      ],
      toggles: [t('cloud', '概率点云', '按 |Yₗₘ|² 撒点'), t('axis', '坐标参考', '显示坐标轴')],
      readouts: [
        r('离心势', (p) => `l(l+1)/r² = ${Math.round(p.l) * (Math.round(p.l) + 1)}/r²`),
        r('角节点', (p) => `${Math.round(p.l)}`),
        r('能级抬升', () => 'l 越大越高'),
        r('原点行为', (p) => (Math.round(p.l) === 0 ? 'R(0) ≠ 0' : 'R(0) = 0'))
      ],
      liveNote: (p) =>
        `l = ${Math.round(p.l)} 时离心势为 ${Math.round(p.l) * (Math.round(p.l) + 1)}/r²；它在原点附近把波函数压到零，能级因此比 l = 0 的同 n 态更高。`
    }
  ],
  'qm-8-7': [
    {
      mode: 'levels',
      title: '量子缺：碱金属能级为什么下移',
      caption:
        '碱金属的价电子被内层电子屏蔽，感受到的有效核电荷更大。用一个偏移参数就能模拟这种能级下移，l 越小的轨道贯穿越深。',
      controls: [
        c('n', '主量子数 n', 1, 8, 1, 4, int),
        c('law', '谱指数 p', 1, 2.4, 0.05, 2, f2),
        c('defect', '偏移 δ', 0, 1, 0.02, 0.5, f2)
      ],
      toggles: [t('dense', '显示密集谱', '展开 40 条能级', false), t('labels', '能级标签', '标出 n = 1 … 8')],
      readouts: [
        r('有效量子数', (p) => `${(Math.round(p.n) + p.defect).toFixed(2)}`),
        r('偏移 δ', (p) => p.defect.toFixed(2)),
        r('能级', (p) => `${Math.pow(Math.round(p.n) + p.defect, p.law).toFixed(2)} E₁`),
        r('贯穿深度', () => 'l 越小贯穿越深')
      ],
      liveNote: (p) =>
        `δ = ${p.defect.toFixed(2)} 时第 ${Math.round(p.n)} 级的有效量子数被推到 ${(Math.round(p.n) + p.defect).toFixed(2)}；s 轨道贯穿最深，偏移最大，p、d 依次减小。`
    },
    {
      mode: 'radial',
      title: '贯穿轨道与径向节点',
      caption:
        'l 小的轨道能钻到原子实内部，l 大的轨道被离心势挡在外面。径向节点越多，电子云的分层越明显。',
      controls: [
        c('n', '主量子数 n', 1, 4, 1, 3, int),
        c('l', '角量子数 l', 0, 2, 1, 2, int)
      ],
      toggles: [t('density', '径向概率密度', '显示 r²R²')],
      readouts: [
        r('径向节点', (p) => `${Math.round(p.n) - Math.round(p.l) - 1}`),
        r('贯穿程度', (p) => (Math.round(p.l) <= 1 ? '贯穿原子实' : '被离心势挡住')),
        r('峰值半径', (p) => `${(Math.round(p.n) ** 2 * (1 + Math.sqrt(1 - Math.round(p.l) * (Math.round(p.l) + 1) / (Math.round(p.n) ** 2)))).toFixed(1)} a₀`),
        r('屏蔽效应', () => 'l 越小越显著')
      ],
      liveNote: (p) =>
        `n = ${Math.round(p.n)}、l = ${Math.round(p.l)}：${Math.round(p.l) <= 1 ? '这个轨道会钻进原子实，感受到更强的有效核电荷' : '离心势把它挡在原子实外，屏蔽效应较弱'}。`
    }
  ],
  'qm-8-8': [
    {
      mode: 'molecular',
      title: 'Kratzer 势：振动–转动能级',
      caption:
        'Kratzer 势把库仑型的 $1/r$ 吸引和 $1/r^2$ 离心项合在一起，正好描述双原子分子的振动–转动。能级同时带振动与转动指标。',
      controls: [
        c('type', '势场类型', 0, 3, 1, 2, int),
        c('depth', '阱深', 0.5, 1.4, 0.02, 1, f2),
        c('v', '振动能级 v', 0, 5, 1, 3, int)
      ],
      toggles: [t('levels', '振动能级', '显示 6 条振动能级'), t('labels', '能级标签', '标出 v = 0 … 5')],
      readouts: [
        r('势型', (p) => (Math.round(p.type) === 2 ? 'Kratzer' : '其他')),
        r('阱深', (p) => p.depth.toFixed(2)),
        r('振动间距', (p) => {
          const level = (v: number) => Math.min(0.98, 0.09 + 0.16 * v - 0.01 * v * v)
          return `${(level(Math.round(p.v) + 1) - level(Math.round(p.v))).toFixed(3)}`
        }),
        r('转动附加', () => 'E ≈ E_v + L²/2I')
      ],
      liveNote: (p) =>
        `v = ${Math.round(p.v)} 时振动间距约 ${(Math.min(0.98, 0.09 + 0.16 * (Math.round(p.v) + 1) - 0.01 * (Math.round(p.v) + 1) ** 2) - Math.min(0.98, 0.09 + 0.16 * Math.round(p.v) - 0.01 * Math.round(p.v) ** 2)).toFixed(3)}；实际光谱还会叠加转动带，形成一组组谱线。`
    },
    {
      mode: 'angular',
      title: '转动能级与角向分布',
      caption:
        '分子的转动由角动量量子数 l 描述，能量是 $L^2/2I=l(l+1)\\hbar^2/2I$。每个 l 有 $2l+1$ 个取向，在外场中会分裂。',
      controls: [
        c('l', '转动量子数 l', 0, 3, 1, 2, int),
        c('m', '磁量子数 m', -3, 3, 1, 1, int)
      ],
      toggles: [t('cloud', '概率点云', '按 |Yₗₘ|² 撒点'), t('axis', '坐标参考', '显示坐标轴')],
      readouts: [
        r('L²', (p) => `${(Math.round(p.l) * (Math.round(p.l) + 1))} ħ²`),
        r('转动能量', (p) => `${(Math.round(p.l) * (Math.round(p.l) + 1))} ħ²/2I`),
        r('简并度', (p) => `${2 * Math.round(p.l) + 1}`),
        r('投影 Lz', (p) => `${Math.round(p.m)} ħ`)
      ],
      liveNote: (p) =>
        `l = ${Math.round(p.l)} 的转动能量是 ${Math.round(p.l) * (Math.round(p.l) + 1)} ħ²/2I，简并度 ${2 * Math.round(p.l) + 1}；m 把球谐形状倾斜，却不改变能量。`
    }
  ]
}
