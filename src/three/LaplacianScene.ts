import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import { LAPLACIAN_DEFAULT_AMP, LAPLACIAN_DEFAULT_K } from '../data/laplacian'

const X_MIN = -4.2
const X_MAX = 4.2
const Y_MIN = -2
const Y_MAX = 2
const Y_SCALE = 0.6
const CURVE_SEGMENTS = 260
const PROBE_H = 0.45

const COLOR = {
  positive: '#74f0c2',
  negative: '#ffbd70',
  tangent: '#8fe8ff',
  difference: '#b8a2ff',
  probe: '#e7fff7',
  harmonic: '#b8a2ff',
  gradient: '#5f8ea8',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.7, 1.2, 9.8], look: [0.3, 0.1, 0] },
  { pos: [0.9, 1.6, 9.4], look: [0.25, 0.2, 0] },
  { pos: [-3.8, 2.2, 8.4], look: [0, 0, 0] },
  { pos: [4.6, 3.2, 8.2], look: [0, 0, 0] },
  { pos: [0.6, 0.6, 8.9], look: [0.2, 0, 0] },
  { pos: [0.8, 1.3, 9.8], look: [0.35, 0.1, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

export class LaplacianScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly curveGroup = new THREE.Group()
  private readonly tangentGroup = new THREE.Group()
  private readonly gradientGroup = new THREE.Group()
  private readonly differenceGroup = new THREE.Group()
  private readonly curvatureGroup = new THREE.Group()
  private readonly barsGroup = new THREE.Group()
  private readonly harmonicGroup = new THREE.Group()
  private readonly tangentPivot = new THREE.Group()

  private params = { amp: LAPLACIAN_DEFAULT_AMP, k: LAPLACIAN_DEFAULT_K }
  private stepIndex = 0
  private progress = 0
  private showSecond = true
  private dirty = false
  private probeX = 0

  private probeGlow: THREE.Sprite | null = null
  private probeTag: THREE.Sprite | null = null
  private leftDot: THREE.Sprite | null = null
  private midDot: THREE.Sprite | null = null
  private rightDot: THREE.Sprite | null = null
  private chordLine: THREE.Line | null = null
  private dropLine: THREE.Line | null = null
  private ring: THREE.Mesh | null = null

  private curveAlpha = 0
  private tangentAlpha = 0
  private gradientAlpha = 0
  private differenceAlpha = 0
  private curvatureAlpha = 0
  private barsAlpha = 0
  private harmonicAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#1b2230',
      bloomStrength: 0.75
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.curveGroup)
    this.rig.add(this.gradientGroup)
    this.rig.add(this.tangentGroup)
    this.rig.add(this.differenceGroup)
    this.rig.add(this.curvatureGroup)
    this.rig.add(this.barsGroup)
    this.rig.add(this.harmonicGroup)

    this.buildAxes()
    this.buildCurve()
    this.buildGradient()
    this.buildTangent()
    this.buildDifference()
    this.buildCurvature()
    this.buildBars()
    this.buildHarmonic()
    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const next = {
      amp: THREE.MathUtils.clamp(params.amp ?? this.params.amp, 0.1, 3),
      k: THREE.MathUtils.clamp(params.k ?? this.params.k, 0.2, 3.5)
    }
    if (Math.abs(next.amp - this.params.amp) < 1e-6 && Math.abs(next.k - this.params.k) < 1e-6) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'showSecond') this.showSecond = value
  }

  dispose() {
    this.rig.dispose()
  }

  private plot(x: number) {
    return Y_SCALE * this.params.amp * Math.sin(this.params.k * x)
  }

  private slope(x: number) {
    const { amp, k } = this.params
    return Y_SCALE * amp * k * Math.cos(k * x)
  }

  private curvature(x: number) {
    const { amp, k } = this.params
    return -Y_SCALE * amp * k * k * Math.sin(k * x)
  }

  private buildAxes() {
    this.rig.clearGroup(this.axesGroup)

    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, 0, 0), new THREE.Vector3(X_MAX, 0, 0)],
        COLOR.axis,
        { opacity: 0.8 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, Y_MIN, 0), new THREE.Vector3(X_MIN, Y_MAX, 0)],
        COLOR.axis,
        { opacity: 0.8 }
      )
    )

    for (let i = -4; i <= 4; i++) {
      const x = i
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(x, Y_MIN, 0), new THREE.Vector3(x, Y_MAX, 0)],
          COLOR.grid,
          { opacity: 0.5 }
        )
      )
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, -0.09, 0)],
          COLOR.axis,
          { opacity: 0.7 }
        )
      )
      if (i !== 0) {
        const label = this.rig.makeTextSprite(`${i}`, {
          color: COLOR.tick,
          scale: 0.32,
          fontSize: 46
        })
        label.position.set(x, -0.28, 0.02)
        this.axesGroup.add(label)
      }
    }

    for (const y of [-1, 1]) {
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(X_MIN, y, 0), new THREE.Vector3(X_MAX, y, 0)],
          COLOR.grid,
          { opacity: 0.5 }
        )
      )
      const label = this.rig.makeTextSprite(`${y}`, {
        color: COLOR.tick,
        scale: 0.3,
        fontSize: 44
      })
      label.position.set(X_MIN - 0.32, y, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.rig.makeTextSprite('x', {
      color: '#8fa4b8',
      scale: 0.42,
      fontSize: 48
    })
    xTitle.position.set(X_MAX - 0.05, -0.55, 0.02)
    this.axesGroup.add(xTitle)

    const yTitle = this.rig.makeTextSprite('f(x)', {
      color: '#8fa4b8',
      scale: 0.48,
      fontSize: 44
    })
    yTitle.position.set(X_MIN - 0.85, Y_MAX - 0.3, 0.02)
    yTitle.material.rotation = Math.PI / 2
    this.axesGroup.add(yTitle)
  }

  private buildCurve() {
    this.rig.clearGroup(this.curveGroup)
    const k = this.params.k
    let sign = 0
    let chunk: THREE.Vector3[] = []

    const flush = () => {
      if (chunk.length < 2) return
      const color = sign > 0 ? COLOR.positive : COLOR.negative
      this.curveGroup.add(this.rig.makeTube(chunk, color, 0.032, 0.92))
    }

    for (let i = 0; i <= CURVE_SEGMENTS; i++) {
      const x = X_MIN + (i / CURVE_SEGMENTS) * (X_MAX - X_MIN)
      const point = new THREE.Vector3(x, this.plot(x), 0.04)
      const nextSign = Math.sin(k * x) >= 0 ? -1 : 1
      if (sign === 0) {
        sign = nextSign
        chunk = [point]
        continue
      }
      if (nextSign === sign) {
        chunk.push(point)
      } else {
        chunk.push(point)
        flush()
        sign = nextSign
        chunk = [point]
      }
    }
    flush()

    const positiveLabel = this.rig.makeTextSprite('f″ > 0 · 凹向上', {
      color: '#baffeb',
      scale: 0.48,
      fontSize: 38
    })
    positiveLabel.position.set(X_MIN + 0.4, Y_MAX - 0.22, 0.06)
    this.curveGroup.add(positiveLabel)

    const negativeLabel = this.rig.makeTextSprite('f″ < 0 · 凹向下', {
      color: '#ffd7a6',
      scale: 0.48,
      fontSize: 38
    })
    negativeLabel.position.set(X_MIN + 0.4, Y_MAX - 0.58, 0.06)
    this.curveGroup.add(negativeLabel)
  }

  private buildGradient() {
    this.rig.clearGroup(this.gradientGroup)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLOR.gradient),
      transparent: true,
      opacity: 0.45,
      toneMapped: false,
      depthWrite: false
    })

    for (let x = X_MIN + 0.5; x <= X_MAX - 0.5; x += 0.85) {
      const y = this.plot(x)
      const slope = this.slope(x)
      const angle = Math.atan2(slope, 1)
      const length = 0.42
      const end = new THREE.Vector3(
        x + Math.cos(angle) * length,
        y + Math.sin(angle) * length,
        0.03
      )
      this.gradientGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(x, y, 0.03), end],
          COLOR.gradient,
          { opacity: 0.45 }
        )
      )
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.11, 10), material)
      head.position.copy(end)
      head.rotation.z = angle - Math.PI / 2
      this.gradientGroup.add(head)
    }

    const label = this.rig.makeTextSprite('∇f · 切线方向', {
      color: 'rgba(143, 232, 255, 0.7)',
      scale: 0.5,
      fontSize: 38
    })
    label.position.set(X_MAX - 1.45, Y_MAX - 0.22, 0.06)
    this.gradientGroup.add(label)
  }

  private buildTangent() {
    this.rig.clearGroup(this.tangentGroup)
    this.probeGlow = this.rig.makeGlowSprite(COLOR.probe, 0.5)
    this.probeGlow.position.set(0, 0, 0.09)
    this.tangentGroup.add(this.probeGlow)

    this.probeTag = this.rig.makeTextSprite('探针', {
      color: '#d9fff1',
      scale: 0.44,
      fontSize: 40
    })
    this.probeTag.position.set(0.15, 0.34, 0.07)
    this.tangentGroup.add(this.probeTag)

    this.tangentGroup.add(this.tangentPivot)

    const tangent = this.rig.makeLine(
      [new THREE.Vector3(-0.85, 0, 0.06), new THREE.Vector3(0.85, 0, 0.06)],
      COLOR.tangent,
      { opacity: 0.9 }
    )
    this.tangentPivot.add(tangent)

    const head = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.17, 12),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.tangent),
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        depthWrite: false
      })
    )
    head.position.set(0.84, 0, 0.06)
    head.rotation.z = -Math.PI / 2
    this.tangentPivot.add(head)
  }

  private buildDifference() {
    this.rig.clearGroup(this.differenceGroup)
    this.leftDot = this.rig.makeGlowSprite(COLOR.difference, 0.2)
    this.midDot = this.rig.makeGlowSprite(COLOR.difference, 0.22)
    this.rightDot = this.rig.makeGlowSprite(COLOR.difference, 0.2)
    this.differenceGroup.add(this.leftDot, this.midDot, this.rightDot)

    this.chordLine = this.rig.makeLine(
      [new THREE.Vector3(0, 0, 0.05), new THREE.Vector3(0, 0, 0.05)],
      COLOR.difference,
      { opacity: 0.55 }
    )
    this.dropLine = this.rig.makeLine(
      [new THREE.Vector3(0, 0, 0.07), new THREE.Vector3(0, 0, 0.07)],
      COLOR.difference,
      { opacity: 0.85 }
    )
    this.chordLine.frustumCulled = false
    this.dropLine.frustumCulled = false
    this.differenceGroup.add(this.chordLine, this.dropLine)

    const label = this.rig.makeTextSprite('二阶差分 · 弦与垂距', {
      color: '#d5c8ff',
      scale: 0.46,
      fontSize: 38
    })
    label.position.set(2.35, -1.62, 0.05)
    this.differenceGroup.add(label)
  }

  private buildCurvature() {
    this.rig.clearGroup(this.curvatureGroup)
    this.ring = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.012, 8, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.tangent),
        transparent: true,
        opacity: 0.85,
        toneMapped: false,
        depthWrite: false
      })
    )
    this.ring.renderOrder = 3
    this.ring.position.set(0, 0, 0.04)
    this.curvatureGroup.add(this.ring)

    const label = this.rig.makeTextSprite('曲率圆 1/|κ|', {
      color: '#bfefff',
      scale: 0.46,
      fontSize: 38
    })
    label.position.set(2.75, 1.5, 0.05)
    this.curvatureGroup.add(label)
  }

  private buildBars() {
    this.rig.clearGroup(this.barsGroup)
    const baseline = Y_MIN + 0.42
    const count = 32
    for (let i = 0; i < count; i++) {
      const x = X_MIN + ((i + 0.5) / count) * (X_MAX - X_MIN)
      const height = 0.38 * -Math.sin(this.params.k * x)
      const color = height > 0 ? COLOR.positive : COLOR.negative
      this.barsGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(x, baseline, 0.02), new THREE.Vector3(x, baseline + height, 0.02)],
          color,
          { opacity: 0.8 }
        )
      )
    }
    this.barsGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, baseline, 0.02), new THREE.Vector3(X_MAX, baseline, 0.02)],
        COLOR.axis,
        { opacity: 0.6 }
      )
    )

    const label = this.rig.makeTextSprite('Δf 直方 · 正负变号', {
      color: 'rgba(217, 255, 241, 0.66)',
      scale: 0.46,
      fontSize: 38
    })
    label.position.set(X_MAX - 1.85, baseline + 0.16, 0.04)
    this.barsGroup.add(label)
  }

  private buildHarmonic() {
    this.rig.clearGroup(this.harmonicGroup)
    this.harmonicGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, Y_MIN * 0.75, 0.02), new THREE.Vector3(X_MAX, Y_MAX * 0.75, 0.02)],
        COLOR.harmonic,
        { dashed: true, dashSize: 0.1, gapSize: 0.07, opacity: 0.55 }
      )
    )

    const label = this.rig.makeTextSprite('调和对照 · Δf = 0', {
      color: '#d5c8ff',
      scale: 0.5,
      fontSize: 40
    })
    label.position.set(1.3, 1.62, 0.05)
    this.harmonicGroup.add(label)
  }

  private rebuild() {
    this.buildCurve()
    this.buildGradient()
    this.buildBars()
  }

  private updateSegment(line: THREE.Line, a: THREE.Vector3, b: THREE.Vector3) {
    const attr = line.geometry.getAttribute('position') as THREE.BufferAttribute
    attr.setXYZ(0, a.x, a.y, a.z)
    attr.setXYZ(1, b.x, b.y, b.z)
    attr.needsUpdate = true
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const index = this.stepIndex
    const second = this.showSecond ? 1 : 0
    const targets = {
      curve: index === 4 ? 0.5 : 1,
      tangent: index === 0 ? 0.4 + 0.6 * p : 1,
      gradient: index >= 1 ? 1 : 0,
      difference: (index === 0 ? p : index >= 1 ? 1 : 0) * second,
      curvature: (index === 2 ? p : index >= 3 ? 1 : 0) * second,
      bars: (index === 3 ? p : index === 4 ? 0.4 : index >= 5 ? 1 : 0) * second,
      harmonic: index >= 4 ? 1 : 0
    }

    this.curveAlpha = THREE.MathUtils.damp(this.curveAlpha, targets.curve, 5, dt)
    this.tangentAlpha = THREE.MathUtils.damp(this.tangentAlpha, targets.tangent, 5, dt)
    this.gradientAlpha = THREE.MathUtils.damp(this.gradientAlpha, targets.gradient, 5, dt)
    this.differenceAlpha = THREE.MathUtils.damp(this.differenceAlpha, targets.difference, 5, dt)
    this.curvatureAlpha = THREE.MathUtils.damp(this.curvatureAlpha, targets.curvature, 5, dt)
    this.barsAlpha = THREE.MathUtils.damp(this.barsAlpha, targets.bars, 5, dt)
    this.harmonicAlpha = THREE.MathUtils.damp(this.harmonicAlpha, targets.harmonic, 5, dt)

    const sweep = (elapsed * 0.16) % 2
    const fraction = sweep < 1 ? sweep : 2 - sweep
    this.probeX = X_MIN + 0.6 + fraction * (X_MAX - X_MIN - 1.2)

    const x = this.probeX
    const y = this.plot(x)
    const slope = this.slope(x)

    this.tangentPivot.position.set(x, y, 0.05)
    this.tangentPivot.rotation.z = Math.atan2(slope, 1)

    if (this.probeGlow) {
      this.probeGlow.position.set(x, y, 0.09)
      const pulse = 0.46 + Math.sin(elapsed * 3) * 0.05
      this.probeGlow.scale.set(pulse, pulse, 1)
    }
    if (this.probeTag) {
      this.probeTag.position.set(x + 0.15, y + 0.34, 0.07)
    }

    const xl = x - PROBE_H
    const xr = x + PROBE_H
    const yl = this.plot(xl)
    const yr = this.plot(xr)
    const ym = (yl + yr) / 2

    if (this.leftDot) this.leftDot.position.set(xl, yl, 0.05)
    if (this.midDot) this.midDot.position.set(x, y, 0.06)
    if (this.rightDot) this.rightDot.position.set(xr, yr, 0.05)
    if (this.chordLine) {
      this.updateSegment(
        this.chordLine,
        new THREE.Vector3(xl, yl, 0.05),
        new THREE.Vector3(xr, yr, 0.05)
      )
    }
    if (this.dropLine) {
      this.updateSegment(
        this.dropLine,
        new THREE.Vector3(x, y, 0.07),
        new THREE.Vector3(x, ym, 0.07)
      )
    }

    if (this.ring) {
      const f2 = this.curvature(x)
      const kappa = f2 / Math.pow(1 + slope * slope, 1.5)
      const alive = Math.abs(kappa) > 0.04
      this.ring.visible = alive
      if (alive) {
        const radius = THREE.MathUtils.clamp(1 / Math.abs(kappa), 0.22, 1.15)
        const scale = 1 / Math.sqrt(1 + slope * slope)
        const sign = kappa >= 0 ? 1 : -1
        this.ring.position.set(
          x - slope * scale * sign * radius,
          y + scale * sign * radius,
          0.04
        )
        this.ring.scale.set(radius, radius, 1)
      }
    }

    this.applyGroupAlpha(this.curveGroup, this.curveAlpha)
    this.applyGroupAlpha(this.tangentGroup, this.tangentAlpha)
    this.applyGroupAlpha(this.gradientGroup, this.gradientAlpha)
    this.applyGroupAlpha(this.differenceGroup, this.differenceAlpha)
    this.applyGroupAlpha(this.curvatureGroup, this.curvatureAlpha)
    this.applyGroupAlpha(this.barsGroup, this.barsAlpha)
    this.applyGroupAlpha(this.harmonicGroup, this.harmonicAlpha)
  }

  private applyGroupAlpha(group: THREE.Group, alpha: number) {
    group.visible = alpha > 0.01
    group.traverse((object) => {
      if (object instanceof THREE.Sprite) {
        object.material.opacity = alpha
        return
      }
      const material = (object as THREE.Mesh).material as THREE.Material | undefined
      if (material && 'opacity' in material) {
        const base = (object.userData.baseOpacity as number) ?? 0.9
        ;(material as THREE.MeshBasicMaterial).opacity = alpha * base
      }
    })
  }
}
