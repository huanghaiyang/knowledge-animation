import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import {
  SIR_DEFAULT_BETA,
  SIR_DEFAULT_GAMMA,
  SIR_DEFAULT_I0,
  SIR_T_MAX,
  simulateSir,
  type SirPoint
} from '../data/sir'

const X_MIN = -4.2
const X_MAX = 4.2
const Y_MIN = -2
const Y_MAX = 2

const COLOR = {
  s: '#8fe8ff',
  i: '#ffab70',
  r: '#b8a2ff',
  threshold: '#ffbd70',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.7, 1.1, 9.8], look: [0.3, 0.05, 0] },
  { pos: [0.9, 1.4, 9.4], look: [0.25, 0.1, 0] },
  { pos: [0.6, 0.9, 9.2], look: [0.2, 0, 0] },
  { pos: [0.5, 0.8, 9], look: [0.25, 0.05, 0] },
  { pos: [0.8, 1.5, 9.6], look: [0.4, 0.1, 0] },
  { pos: [0.8, 1.2, 9.8], look: [0.35, 0.1, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

const pct = (value: number) => `${(value * 100).toFixed(0)}%`

export class SirScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly curveGroup = new THREE.Group()
  private readonly thresholdGroup = new THREE.Group()
  private readonly peakGroup = new THREE.Group()

  private params = {
    beta: SIR_DEFAULT_BETA,
    gamma: SIR_DEFAULT_GAMMA,
    i0: SIR_DEFAULT_I0
  }
  private points: SirPoint[] = []
  private stepIndex = 0
  private progress = 0
  private thresholdOn = true
  private dirty = false

  private sMesh: THREE.Mesh | null = null
  private iMesh: THREE.Mesh | null = null
  private rMesh: THREE.Mesh | null = null
  private areaMesh: THREE.Mesh | null = null
  private sTip: THREE.Sprite | null = null
  private iTip: THREE.Sprite | null = null
  private rTip: THREE.Sprite | null = null
  private sLabel: THREE.Sprite | null = null
  private iLabel: THREE.Sprite | null = null
  private rLabel: THREE.Sprite | null = null
  private thresholdLine: THREE.Line | null = null
  private thresholdLabel: THREE.Sprite | null = null
  private peakLine: THREE.Line | null = null
  private peakLabel: THREE.Sprite | null = null
  private peakRing: THREE.Mesh | null = null

  private reveal = 0
  private thresholdAlpha = 0
  private peakAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#10283a',
      bloomStrength: 0.75
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.curveGroup)
    this.rig.add(this.thresholdGroup)
    this.rig.add(this.peakGroup)

    this.buildAxes()
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
      beta: THREE.MathUtils.clamp(params.beta ?? this.params.beta, 0.01, 1),
      gamma: THREE.MathUtils.clamp(params.gamma ?? this.params.gamma, 0.005, 1),
      i0: Math.max(1, Math.round(params.i0 ?? this.params.i0))
    }
    if (
      Math.abs(next.beta - this.params.beta) < 1e-6 &&
      Math.abs(next.gamma - this.params.gamma) < 1e-6 &&
      Math.abs(next.i0 - this.params.i0) < 1e-6
    ) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'threshold') this.thresholdOn = value
  }

  dispose() {
    this.rig.dispose()
  }

  private xOf(t: number) {
    return X_MIN + (t / SIR_T_MAX) * (X_MAX - X_MIN)
  }

  private yOf(ratio: number) {
    return Y_MIN + THREE.MathUtils.clamp(ratio, 0, 1) * (Y_MAX - Y_MIN)
  }

  private sample(t: number) {
    if (!this.points.length) return { t: 0, s: 1, i: 0, r: 0 }
    const ratio = THREE.MathUtils.clamp(t / SIR_T_MAX, 0, 1)
    return this.points[Math.round(ratio * (this.points.length - 1))]
  }

  private rebuild() {
    this.points = simulateSir(this.params.beta, this.params.gamma, this.params.i0)
    this.buildCurves()
    this.buildThreshold()
    this.buildPeak()
  }

  private buildAxes() {
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

    for (const t of [0, 40, 80, 120, 160]) {
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
      const y = this.yOf(ratio)
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
      const label = this.rig.makeTextSprite(pct(ratio), {
        color: COLOR.tick,
        scale: 0.46,
        fontSize: 44
      })
      label.position.set(X_MIN - 0.48, y, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.rig.makeTextSprite('时间 t / 天', {
      color: '#8fa4b8',
      scale: 0.62,
      fontSize: 44,
      weight: 400
    })
    xTitle.position.set(0.2, Y_MIN - 0.55, 0.02)
    this.axesGroup.add(xTitle)

    const yTitle = this.rig.makeTextSprite('占总人口比例', {
      color: '#8fa4b8',
      scale: 0.58,
      fontSize: 44,
      weight: 400
    })
    yTitle.position.set(X_MIN - 1.05, Y_MAX - 0.3, 0.02)
    yTitle.material.rotation = Math.PI / 2
    this.axesGroup.add(yTitle)
  }

  private buildCurves() {
    this.rig.clearGroup(this.curveGroup)
    const pts = this.points
    const stride = 4
    const sampled = pts.filter((_, index) => index % stride === 0)
    if (sampled[sampled.length - 1] !== pts[pts.length - 1]) sampled.push(pts[pts.length - 1])

    const toVector = (t: number, value: number) =>
      new THREE.Vector3(this.xOf(t), this.yOf(value), 0.04)

    this.sMesh = this.rig.makeTube(
      sampled.map((point) => toVector(point.t, point.s)),
      COLOR.s,
      0.026
    )
    this.iMesh = this.rig.makeTube(
      sampled.map((point) => toVector(point.t, point.i)),
      COLOR.i,
      0.036
    )
    this.rMesh = this.rig.makeTube(
      sampled.map((point) => toVector(point.t, point.r)),
      COLOR.r,
      0.026
    )
    this.curveGroup.add(this.sMesh, this.iMesh, this.rMesh)

    const positions: number[] = []
    const segments = 160
    for (let index = 0; index < segments; index++) {
      const t0 = (index / segments) * SIR_T_MAX
      const t1 = ((index + 1) / segments) * SIR_T_MAX
      const a = this.sample(t0)
      const b = this.sample(t1)
      positions.push(
        this.xOf(t0), Y_MIN, 0.01,
        this.xOf(t1), Y_MIN, 0.01,
        this.xOf(t1), this.yOf(b.i), 0.01,
        this.xOf(t0), Y_MIN, 0.01,
        this.xOf(t1), this.yOf(b.i), 0.01,
        this.xOf(t0), this.yOf(a.i), 0.01
      )
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLOR.i),
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    this.areaMesh = new THREE.Mesh(geometry, material)
    this.areaMesh.renderOrder = 2
    geometry.setDrawRange(0, 0)
    this.curveGroup.add(this.areaMesh)

    this.sTip = this.rig.makeGlowSprite('#baf0ff', 0.5)
    this.iTip = this.rig.makeGlowSprite('#ffd2b0', 0.62)
    this.rTip = this.rig.makeGlowSprite('#d5c8ff', 0.5)
    this.curveGroup.add(this.sTip, this.iTip, this.rTip)

    let peak = pts[0]
    for (const point of pts) if (point.i > peak.i) peak = point

    const sLabel = this.rig.makeTextSprite('S 易感', {
      color: '#baf0ff',
      scale: 0.52,
      fontSize: 42,
      weight: 500
    })
    const sPoint = this.sample(Math.min(SIR_T_MAX, peak.t * 1.7))
    sLabel.position.set(this.xOf(sPoint.t), this.yOf(sPoint.s) + 0.24, 0.07)
    this.sLabel = sLabel

    const iLabel = this.rig.makeTextSprite('I 感染', {
      color: '#ffd2b0',
      scale: 0.52,
      fontSize: 42,
      weight: 500
    })
    iLabel.position.set(this.xOf(peak.t) + 0.1, this.yOf(peak.i) + 0.32, 0.07)
    this.iLabel = iLabel

    const rLabel = this.rig.makeTextSprite('R 移出', {
      color: '#d5c8ff',
      scale: 0.52,
      fontSize: 42,
      weight: 500
    })
    const rPoint = this.sample(Math.min(SIR_T_MAX, peak.t * 1.6))
    rLabel.position.set(this.xOf(rPoint.t), this.yOf(rPoint.r) - 0.3, 0.07)
    this.rLabel = rLabel

    this.curveGroup.add(sLabel, iLabel, rLabel)
  }

  private buildThreshold() {
    this.rig.clearGroup(this.thresholdGroup)
    const threshold = 1 / (this.params.beta / this.params.gamma)
    const shown = THREE.MathUtils.clamp(threshold, 0, 1)
    const y = this.yOf(shown)

    this.thresholdLine = this.rig.makeLine(
      [new THREE.Vector3(X_MIN, y, 0.03), new THREE.Vector3(X_MAX, y, 0.03)],
      COLOR.threshold,
      { dashed: true, dashSize: 0.1, gapSize: 0.07, opacity: 0.8 }
    )
    this.thresholdGroup.add(this.thresholdLine)

    const label = this.rig.makeTextSprite(
      threshold > 1 ? 'S/N = 1/R₀ > 100%' : `S/N = 1/R₀ = ${pct(threshold)}`,
      {
        color: '#ffc983',
        scale: 0.54,
        fontSize: 42,
        weight: 500
      }
    )
    label.position.set(this.xOf(74), y + 0.2, 0.07)
    this.thresholdLabel = label
    this.thresholdGroup.add(label)
  }

  private buildPeak() {
    this.rig.clearGroup(this.peakGroup)
    let peak = this.points[0]
    for (const point of this.points) if (point.i > peak.i) peak = point

    const x = this.xOf(peak.t)
    const y = this.yOf(peak.i)
    this.peakLine = this.rig.makeLine(
      [new THREE.Vector3(x, Y_MIN, 0.03), new THREE.Vector3(x, y, 0.03)],
      COLOR.r,
      { dashed: true, dashSize: 0.07, gapSize: 0.05, opacity: 0.5 }
    )
    this.peakGroup.add(this.peakLine)

    this.peakRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.11, 0.012, 8, 48),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.r),
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        depthWrite: false
      })
    )
    this.peakRing.position.set(x, y, 0.08)
    this.peakGroup.add(this.peakRing)

    const label = this.rig.makeTextSprite(`峰值 ${pct(peak.i)} · 第 ${peak.t.toFixed(0)} 天`, {
      color: '#ded4ff',
      scale: 0.56,
      fontSize: 42,
      weight: 500
    })
    label.position.set(x + 0.12, y + 0.3, 0.08)
    this.peakLabel = label
    this.peakGroup.add(label)
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex
    const targets = {
      reveal:
        i === 0 ? 0.32 + p * 0.14 : i === 1 ? 0.46 + p * 0.16 : i === 2 ? 0.62 + p * 0.38 : 1,
      threshold: i >= 3 && (i < 5 || this.thresholdOn) ? 1 : 0,
      peak: i >= 4 && (i < 5 || this.thresholdOn) ? 1 : 0
    }

    this.reveal = THREE.MathUtils.damp(this.reveal, targets.reveal, 5, dt)
    this.thresholdAlpha = THREE.MathUtils.damp(this.thresholdAlpha, targets.threshold, 5, dt)
    this.peakAlpha = THREE.MathUtils.damp(this.peakAlpha, targets.peak, 5, dt)

    if (this.sMesh) this.rig.setDrawRange(this.sMesh, this.reveal)
    if (this.iMesh) this.rig.setDrawRange(this.iMesh, this.reveal)
    if (this.rMesh) this.rig.setDrawRange(this.rMesh, this.reveal)

    if (this.areaMesh) {
      const total = this.areaMesh.geometry.getAttribute('position').count
      this.areaMesh.geometry.setDrawRange(0, Math.floor((total * this.reveal) / 3) * 3)
      ;(this.areaMesh.material as THREE.MeshBasicMaterial).opacity = this.reveal * 0.05
    }

    const t = this.reveal * SIR_T_MAX
    const point = this.sample(t)
    const tips: [THREE.Sprite | null, number][] = [
      [this.sTip, point.s],
      [this.iTip, point.i],
      [this.rTip, point.r]
    ]
    for (const [tip, value] of tips) {
      if (!tip) continue
      tip.position.set(this.xOf(t), this.yOf(value), 0.1)
      tip.material.opacity = this.reveal > 0.04 ? Math.min(1, this.reveal * 1.8) : 0
      const pulse = 0.4 + Math.sin(elapsed * 3) * 0.06
      tip.scale.set(pulse, pulse, 1)
    }

    const labelAlpha = this.reveal > 0.7 ? Math.min(1, (this.reveal - 0.7) / 0.3) : 0
    if (this.sLabel) this.sLabel.material.opacity = labelAlpha
    if (this.iLabel) this.iLabel.material.opacity = labelAlpha
    if (this.rLabel) this.rLabel.material.opacity = labelAlpha

    this.thresholdGroup.visible = this.thresholdAlpha > 0.01
    if (this.thresholdLine) {
      ;(this.thresholdLine.material as THREE.LineDashedMaterial).opacity = this.thresholdAlpha * 0.75
    }
    if (this.thresholdLabel) this.thresholdLabel.material.opacity = this.thresholdAlpha

    this.peakGroup.visible = this.peakAlpha > 0.01
    if (this.peakLine) {
      ;(this.peakLine.material as THREE.LineDashedMaterial).opacity = this.peakAlpha * 0.5
    }
    if (this.peakLabel) this.peakLabel.material.opacity = this.peakAlpha
    if (this.peakRing) {
      this.peakRing.rotation.z = elapsed * 0.35
      ;(this.peakRing.material as THREE.MeshBasicMaterial).opacity = this.peakAlpha * 0.9
    }
  }
}
