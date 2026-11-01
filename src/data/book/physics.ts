// 书籍实验室共用的物理公式，场景与读数面板都从这里取数，避免两处数值不一致。

export const PLANCK_H_EV = 0.41357 // ν 以 10^14 Hz 计时，hν 的 eV 值
export const HC_EV_NM = 1240 // λ(nm) × E(eV) ≈ 1240

export const photonEnergy = (nu: number) => PLANCK_H_EV * nu

export const photoelectronKmax = (nu: number, work: number) =>
  Math.max(0, photonEnergy(nu) - work)

export const cutoffFrequency = (work: number) => work / PLANCK_H_EV

export const cutoffWavelength = (work: number) => HC_EV_NM / work

// 黑体谱：波长以 nm 计，返回相对谱密度（未归一）
export function planckDensity(lambdaNm: number, temperature: number) {
  const lambda = Math.max(lambdaNm, 20)
  const exponent = 1.4388e7 / (lambda * temperature)
  if (exponent > 700) return 0
  return 1 / (lambda ** 5 * (Math.exp(exponent) - 1))
}

export function rayleighDensity(lambdaNm: number) {
  return 1 / Math.max(lambdaNm, 20) ** 4
}

export function wienDensity(lambdaNm: number, temperature: number) {
  const lambda = Math.max(lambdaNm, 20)
  const exponent = 1.4388e7 / (lambda * temperature)
  if (exponent > 700) return 0
  return Math.exp(-exponent) / lambda ** 5
}

export const wienPeakNm = (temperature: number) => 2.898e6 / temperature

export const bohrEnergy = (n: number) => -13.6 / (n * n)

export function transitionEnergy(ni: number, nf: number) {
  return Math.abs(bohrEnergy(ni) - bohrEnergy(nf))
}

export const transitionWavelength = (ni: number, nf: number) =>
  HC_EV_NM / transitionEnergy(ni, nf)

export const radiusRatio = (n: number) => n * n

// 有限深方势阱：half=true 表示左壁无限高、右壁有限高
export interface WellSolution {
  ratio: number
  parity: 1 | -1 | 0
}

export function finiteWellSolutions(depth: number, half = false, count = 5): WellSolution[] {
  const z0 = 2.9 * Math.sqrt(Math.max(depth, 0.05))
  const solutions: WellSolution[] = []
  const sample = (z: number, parity: 1 | -1 | 0) => {
    const tail = Math.sqrt(Math.max(z0 * z0 - z * z, 0))
    if (half) return Math.tan(2 * z) + z / Math.max(tail, 1e-4)
    return parity === 1 ? z * Math.tan(z) - tail : -z / Math.max(Math.tan(z), 1e-9) - tail
  }
  const scan = (parity: 1 | -1 | 0) => {
    let previousZ = 1e-3
    let previous = sample(previousZ, parity)
    for (let i = 1; i <= 900; i++) {
      const z = 1e-3 + (z0 - 1e-3) * (i / 900)
      const value = sample(z, parity)
      if (Number.isFinite(previous) && Number.isFinite(value) && previous * value < 0) {
        let low = previousZ
        let high = z
        for (let k = 0; k < 40; k++) {
          const mid = (low + high) / 2
          if (sample(low, parity) * sample(mid, parity) <= 0) high = mid
          else low = mid
        }
        solutions.push({ ratio: ((low + high) / 2 / z0) ** 2, parity })
      }
      previousZ = z
      previous = value
    }
  }
  if (half) scan(0)
  else {
    scan(1)
    scan(-1)
  }
  return solutions
    .sort((a, b) => a.ratio - b.ratio)
    .slice(0, count)
}

// 双势阱能级分裂：势垒越高，分裂越小
export const doubleWellSplit = (barrier: number) => 0.26 * Math.exp(-1.9 * barrier)

// 分子振动能级（莫尔斯型，能级间距随 v 递减）
export function vibrationLevel(depth: number, v: number, omega = 0.62, anharmonic = 0.075) {
  const e = omega * (v + 0.5) - omega * anharmonic * (v + 0.5) ** 2
  return Math.min(e, depth)
}

export function vibrationGap(depth: number, v: number) {
  return vibrationLevel(depth, v + 1) - vibrationLevel(depth, v)
}

// 共轭链：长度为 N 个单元的盒中粒子，HOMO→LUMO 吸收波长
export const chainLevel = (n: number, segments: number) => 12 * n * n / (segments + 1) ** 2

export const chainGap = (segments: number) => chainLevel(segments + 1, segments) - chainLevel(segments, segments)

export const chainWavelength = (segments: number) => HC_EV_NM / Math.max(chainGap(segments), 1e-3)

// 扫描隧道电流的相对值（gap 以 0.1 nm 为单位的无量纲量）
export const stmDecay = (work: number) => Math.sqrt(Math.max(work, 0.5))

export const stmCurrent = (work: number, gap: number) => Math.exp(-2 * stmDecay(work) * gap)
