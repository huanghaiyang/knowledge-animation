import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import {
  COMP_DEFAULT_A0,
  COMP_DEFAULT_N,
  COMP_DEFAULT_R,
  COMP_T_MAX
} from '../data/compound'

const X_MIN = -4.2
const X_MAX = 4.2
const Y_MIN = -2
const Y_MAX = 2

const COLOR = {
  stairs: '#ffbd70',
  smooth: '#74f0c2',
  gap: '#ffbd70',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.7, 1.1, 9.8], look: [0.3, 0.05, 0] },
  { pos: [0.6, 0.9, 9.4], look: [0.25, 0.05, 0] },
  { pos: [0.8, 1.2, 9.3], look: [0.3, 0.1, 0] },
  { pos: [0.6, 0.8, 9], look: [0.2, 0, 0] },
  { pos: [0.8, 1.5, 9.6], look: [0.4, 0.1, 0] },
  { pos: [0.8, 1.2, 9.8], look: [0.35, 0.1, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

const int = (value: number) => Math.round(value).toLocaleString('en-US')

export class CompoundScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly stairsGroup = new THREE.Group()
  private readonly smoothGroup = new THREE.Group()

  private params = { a0: COMP_DEFAULT_A0, r: COMP_DEFAULT_R, n: COMP_DEFAULT_N }
  private stepIndex = 0
  private progress = 0
  private continuousOnly = false
  private dirty = false

  private yMax = COMP_DEFAULT_A0 * Math.exp(COMP_DEFAULT_R * COMP_T_MAX) * 1.08
  private stairsLine: THREE.Line | null = null
  private smoothMesh: THREE.Mesh | null = null
  private gapMesh: THREE.Mesh | null = null
  private tip: THREE.Sprite | null = null
  private stairsLabel: THREE.Sprite | null = null
  private smoothLabel: THREE.Sprite | null = null

  private stairsReveal = 0
  private stairsAlpha = 0
  private smoothReveal = 0
  private gapReveal = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#2b2112',
      bloomStrength: 0.75
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.stairsGroup)
    this.rig.add(this.smoothGroup)

    this.rebuild()
    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const next = {
      a0: Math.max(10, params.a0 ?? this.params.a0),
      r: Math.max(0.001, params.r ?? this.params.r),
      n: Math.max(1, Math.round(params.n ?? this.params.n))
    }
    if (
      Math.abs(next.a0 - this.params.a0) < 1e-6 &&
      Math.abs(next.r - this.params.r) < 1e-6 &&
      Math.abs(next.n - this.params.n) < 1e-6
    ) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'continuousOnly') this.continuousOnly = value
  }

  dispose() {
    this.rig.dispose()
  }

  private discrete(t: number) {
    return this.params.a0 * Math.pow(1 + this.params.r / this.params.n, this.params.n * t)
  }

  private continuous(t: number) {
    return this.params.a0 * Math.exp(this.params.r * t)
  }

  private xOf(t: number) {
    return X_MIN + (t / COMP_T_MAX) * (X_MAX - X_MIN)
  }

  private yOf(value: number) {
    const ratio = THREE.MathUtils.clamp(value, 0, this.yMax) / this.yMax
    return Y_MIN + ratio * (Y_MAX - Y_MIN)
  }

  private rebuild() {
    this.yMax = this.params.a0 * Math.exp(this.params.r * COMP_T_MAX) * 1.08
    this.buildAxes()
    this.buildStairs()
    this.buildSmooth()
  }

  private buildAxes() {
    this.rig.clearGroup(this.axesGroup)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLOR.axis),
      transparent: true,
      opacity: 0.9,
      toneMapped: false
    })
    const gridMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLOR.grid),
      transparent: true,
      opacity: 0.9,
      toneMapped: false
    })

    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, Y_MIN, 0), new THREE.Vector3(X_MAX, Y_MIN, 0)],
        COLOR.axis,
        { opacity: 0.9 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, Y_MIN, 0), new THREE.Vector3(X_MIN, Y_MAX + 0.12, 0)],
        COLOR.axis,
        { opacity: 0.9 }
      )
    )

    for (const t of [0, 10, 20, 30, 40]) {
      const x = this.xOf(t)
      this.axesGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, Y_MIN, 0),
            new THREE.Vector3(x, Y_MIN - 0.09, 0)
          ]),
          lineMaterial
        )
      )
      if (t > 0) {
        this.axesGroup.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(x, Y_MIN, 0),
              new THREE.Vector3(x, Y_MAX, 0)
            ]),
            gridMaterial
          )
        )
      }
      const label = this.rig.makeTextSprite(`${t}`, {
        color: COLOR.tick,
        scale: 0.38,
        fontSize: 52
      })
      label.position.set(x, Y_MIN - 0.27, 0.02)
      this.axesGroup.add(label)
    }

    for (const ratio of [0, 0.25, 0.5, 0.75, 1]) {
      const y = Y_MIN + ratio * (Y_MAX - Y_MIN)
      this.axesGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(X_MIN - 0.09, y, 0),
            new THREE.Vector3(X_MAX, y, 0)
          ]),
          ratio === 0 ? lineMaterial : gridMaterial
        )
      )
      if (ratio === 0) continue
      const label = this.rig.makeTextSprite(int(this.yMax * ratio), {
        color: COLOR.tick,
        scale: 0.5,
        fontSize: 44
      })
      label.position.set(X_MIN - 0.45, y, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.rig.makeTextSprite('时间 t / 年', {
      color: '#8fa4b8',
      scale: 0.62,
      fontSize: 44,
      weight: 400
    })
    xTitle.position.set(0.2, Y_MIN - 0.55, 0.02)
    this.axesGroup.add(xTitle)

    const yTitle = this.rig.makeTextSprite('金额 A', {
      color: '#8fa4b8',
      scale: 0.58,
      fontSize: 44,
      weight: 400
    })
    yTitle.position.set(X_MIN - 0.88, Y_MAX - 0.35, 0.02)
    yTitle.material.rotation = Math.PI / 2
    this.axesGroup.add(yTitle)
  }

  private buildStairs() {
    this.rig.clearGroup(this.stairsGroup)
    const { a0, r, n } = this.params
    const intervals = Math.max(1, Math.round(n * COMP_T_MAX))
    const points: THREE.Vector3[] = [new THREE.Vector3(this.xOf(0), this.yOf(a0), 0.03)]
    const base = 1 + r / n
    let value = a0
    for (let i = 1; i <= intervals; i++) {
      const t = i / n
      const next = a0 * Math.pow(base, i)
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(value), 0.03))
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(next), 0.03))
      value = next
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLOR.stairs),
      transparent: true,
      opacity: 0.8,
      toneMapped: false
    })
    this.stairsLine = new THREE.Line(geometry, material)
    this.stairsLine.renderOrder = 4
    this.stairsLine.geometry.setDrawRange(0, 0)
    this.stairsGroup.add(this.stairsLine)

    const label = this.rig.makeTextSprite(`离散复利 · n = ${Math.round(n)}`, {
      color: '#ffc983',
      scale: 0.62,
      fontSize: 44,
      weight: 500
    })
    label.position.set(this.xOf(27), this.yOf(this.discrete(27)) - 0.34, 0.06)
    this.stairsLabel = label
    this.stairsGroup.add(label)
  }

  private buildSmooth() {
    this.rig.clearGroup(this.smoothGroup)
    const points: THREE.Vector3[] = []
    const steps = 240
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * COMP_T_MAX
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(this.continuous(t)), 0.05))
    }
    this.smoothMesh = this.rig.makeTube(points, COLOR.smooth, 0.03)
    this.smoothGroup.add(this.smoothMesh)

    const positions: number[] = []
    const segments = 120
    for (let i = 0; i < segments; i++) {
      const t0 = (i / segments) * COMP_T_MAX
      const t1 = ((i + 1) / segments) * COMP_T_MAX
      const x0 = this.xOf(t0)
      const x1 = this.xOf(t1)
      const yStairs0 = this.yOf(this.discrete(t0))
      const yStairs1 = this.yOf(this.discrete(t1))
      const ySmooth0 = this.yOf(this.continuous(t0))
      const ySmooth1 = this.yOf(this.continuous(t1))
      positions.push(x0, yStairs0, 0.02, x1, yStairs1, 0.02, x1, ySmooth1, 0.02)
      positions.push(x0, yStairs0, 0.02, x1, ySmooth1, 0.02, x0, ySmooth0, 0.02)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLOR.gap),
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    this.gapMesh = new THREE.Mesh(geometry, material)
    this.gapMesh.renderOrder = 2
    geometry.setDrawRange(0, 0)
    this.smoothGroup.add(this.gapMesh)

    this.tip = this.rig.makeGlowSprite('#9dffe0', 0.55)
    this.smoothGroup.add(this.tip)

    const label = this.rig.makeTextSprite('连续复利 · A₀ eʳᵗ', {
      color: '#baffeb',
      scale: 0.62,
      fontSize: 44,
      weight: 500
    })
    label.position.set(this.xOf(33), this.yOf(this.continuous(33)) + 0.3, 0.06)
    this.smoothLabel = label
    this.smoothGroup.add(label)
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex
    const stairsOn = !this.continuousOnly
    const targets = {
      stairsReveal: i === 0 ? smoothstep(p * 1.8) * 0.14 : i >= 1 ? 1 : 0,
      stairsAlpha: stairsOn ? (i === 0 ? 0.9 : i >= 4 ? 0.8 : 0.65) : 0,
      smoothReveal: i === 2 ? smoothstep(p * 1.1) : i >= 3 ? 1 : 0,
      gapReveal: i === 2 ? smoothstep(p * 1.1) : i >= 3 ? 1 : 0
    }

    this.stairsReveal = THREE.MathUtils.damp(this.stairsReveal, targets.stairsReveal, 5, dt)
    this.stairsAlpha = THREE.MathUtils.damp(this.stairsAlpha, targets.stairsAlpha, 5, dt)
    this.smoothReveal = THREE.MathUtils.damp(this.smoothReveal, targets.smoothReveal, 5, dt)
    this.gapReveal = THREE.MathUtils.damp(this.gapReveal, targets.gapReveal, 5, dt)

    if (this.stairsLine) {
      const total = this.stairsLine.geometry.getAttribute('position').count
      this.stairsLine.geometry.setDrawRange(
        0,
        Math.max(0, Math.floor(total * this.stairsReveal))
      )
      ;(this.stairsLine.material as THREE.LineBasicMaterial).opacity =
        this.stairsAlpha * 0.8
      this.stairsLine.visible = this.stairsAlpha > 0.01 && this.stairsReveal > 0.005
    }
    if (this.stairsLabel) {
      this.stairsLabel.material.opacity = this.stairsAlpha > 0.1 ? Math.min(1, this.stairsAlpha) : 0
    }

    if (this.smoothMesh) this.rig.setDrawRange(this.smoothMesh, this.smoothReveal)
    if (this.gapMesh) {
      const total = this.gapMesh.geometry.getAttribute('position').count
      this.gapMesh.geometry.setDrawRange(0, Math.floor((total * this.gapReveal) / 3) * 3)
      ;(this.gapMesh.material as THREE.MeshBasicMaterial).opacity = this.gapReveal * 0.05
    }
    if (this.tip) {
      const t = this.smoothReveal * COMP_T_MAX
      this.tip.position.set(this.xOf(t), this.yOf(this.continuous(t)), 0.09)
      this.tip.material.opacity = this.smoothReveal > 0.01 ? Math.min(1, this.smoothReveal * 1.6) : 0
      const pulse = 0.45 + Math.sin(elapsed * 3) * 0.07
      this.tip.scale.set(pulse, pulse, 1)
    }
    if (this.smoothLabel) {
      this.smoothLabel.material.opacity =
        this.smoothReveal > 0.5 ? Math.min(1, (this.smoothReveal - 0.5) * 2) : 0
    }
  }
}
