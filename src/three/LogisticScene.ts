import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import { LOG_DEFAULT_K, LOG_DEFAULT_N0, LOG_DEFAULT_R, LOG_T_MAX } from '../data/logistic'

const X_MIN = -4.2
const X_MAX = 4.2
const Y_MIN = -2
const Y_MAX = 2

const COLOR = {
  curve: '#74f0c2',
  ceiling: '#ffbd70',
  ghost: '#7f9cb5',
  inflection: '#8fe8ff',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.7, 1.1, 9.8], look: [0.3, 0.1, 0] },
  { pos: [0.9, 1.4, 9.4], look: [0.25, 0.2, 0] },
  { pos: [0.6, 0.9, 9.2], look: [0.2, -0.1, 0] },
  { pos: [0.6, 0.7, 8.9], look: [0.2, 0, 0] },
  { pos: [0.8, 1.6, 9.6], look: [0.4, 0.05, 0] },
  { pos: [0.8, 1.3, 9.8], look: [0.35, 0.1, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

const int = (value: number) => Math.round(value).toLocaleString('en-US')

export class LogisticScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly ghostGroup = new THREE.Group()
  private readonly curveGroup = new THREE.Group()
  private readonly ceilingGroup = new THREE.Group()
  private readonly inflectionGroup = new THREE.Group()
  private readonly growthGroup = new THREE.Group()

  private params = { n0: LOG_DEFAULT_N0, r: LOG_DEFAULT_R, k: LOG_DEFAULT_K }
  private stepIndex = 0
  private progress = 0
  private compare = true
  private dirty = false

  private yMax = LOG_DEFAULT_K * 1.18
  private lastYMax = -1
  private curveMesh: THREE.Mesh | null = null
  private areaMesh: THREE.Mesh | null = null
  private ghostLine: THREE.Line | null = null
  private tip: THREE.Sprite | null = null
  private curveLabel: THREE.Sprite | null = null

  private curveReveal = 0
  private ghostAlpha = 0
  private ceilingAlpha = 0
  private inflectionAlpha = 0
  private growthAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#102a28'
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.ghostGroup)
    this.rig.add(this.curveGroup)
    this.rig.add(this.ceilingGroup)
    this.rig.add(this.inflectionGroup)
    this.rig.add(this.growthGroup)

    this.rebuild(true)
    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const next = {
      n0: Math.max(5, params.n0 ?? this.params.n0),
      r: Math.max(0.001, params.r ?? this.params.r),
      k: Math.max(100, params.k ?? this.params.k)
    }
    if (
      Math.abs(next.n0 - this.params.n0) < 1e-6 &&
      Math.abs(next.r - this.params.r) < 1e-6 &&
      Math.abs(next.k - this.params.k) < 1e-6
    ) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'compare') this.compare = value
  }

  dispose() {
    this.rig.dispose()
  }

  private logistic(t: number) {
    const { n0, r, k } = this.params
    return k / (1 + ((k - n0) / n0) * Math.exp(-r * t))
  }

  private inflectionTime() {
    const { n0, r, k } = this.params
    if (n0 <= 0 || n0 >= k) return 0
    return Math.max(0, Math.log((k - n0) / n0) / r)
  }

  private xOf(t: number) {
    return X_MIN + (t / LOG_T_MAX) * (X_MAX - X_MIN)
  }

  private yOf(n: number) {
    const ratio = THREE.MathUtils.clamp(n, 0, this.yMax) / this.yMax
    return Y_MIN + ratio * (Y_MAX - Y_MIN)
  }

  private rebuild(forceAxes = false) {
    this.yMax = this.params.k * 1.18
    if (forceAxes || Math.abs(this.yMax - this.lastYMax) > 1e-6) {
      this.buildAxes()
      this.lastYMax = this.yMax
    }
    this.buildGhost()
    this.buildCurve()
    this.buildCeiling()
    this.buildInflection()
    this.buildGrowth()
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

    const times = [0, 25, 50, 75, 100]
    for (let i = 0; i < times.length; i++) {
      const x = this.xOf(times[i])
      this.axesGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, Y_MIN, 0),
            new THREE.Vector3(x, Y_MIN - 0.09, 0)
          ]),
          lineMaterial
        )
      )
      if (i > 0) {
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
      const label = this.rig.makeTextSprite(`${times[i]}`, {
        color: COLOR.tick,
        scale: 0.38,
        fontSize: 52
      })
      label.position.set(x, Y_MIN - 0.27, 0.02)
      this.axesGroup.add(label)
    }

    const values = [0, this.params.k / 4, this.params.k / 2, (this.params.k * 3) / 4, this.params.k]
    for (let i = 0; i < values.length; i++) {
      const y = this.yOf(values[i])
      this.axesGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(X_MIN - 0.09, y, 0),
            new THREE.Vector3(X_MAX, y, 0)
          ]),
          i === 0 ? lineMaterial : gridMaterial
        )
      )
      if (i === 0) continue
      const label = this.rig.makeTextSprite(int(values[i]), {
        color: i === 4 ? '#ffc983' : COLOR.tick,
        scale: 0.5,
        fontSize: 44
      })
      label.position.set(X_MIN - 0.42, y, 0.02)
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

    const yTitle = this.rig.makeTextSprite('种群 N', {
      color: '#8fa4b8',
      scale: 0.58,
      fontSize: 44,
      weight: 400
    })
    yTitle.position.set(X_MIN - 0.9, Y_MAX - 0.35, 0.02)
    yTitle.material.rotation = Math.PI / 2
    this.axesGroup.add(yTitle)
  }

  private buildGhost() {
    this.rig.clearGroup(this.ghostGroup)
    const { n0, r, k } = this.params
    const cap = k * 1.15
    const tEnd = n0 >= cap ? 0 : Math.min(LOG_T_MAX, Math.log(cap / n0) / r)
    const points: THREE.Vector3[] = []
    const steps = 180
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tEnd
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(n0 * Math.exp(r * t)), 0.02))
    }
    this.ghostLine = this.rig.makeLine(points, COLOR.ghost, {
      dashed: true,
      dashSize: 0.08,
      gapSize: 0.06,
      opacity: 0.6
    })
    this.ghostGroup.add(this.ghostLine)

    const label = this.rig.makeTextSprite('指数增长 · 无上限', {
      color: 'rgba(190, 211, 226, 0.78)',
      scale: 0.62,
      fontSize: 42
    })
    label.position.set(this.xOf(Math.min(tEnd, LOG_T_MAX) * 0.62) + 0.1, Y_MAX - 0.32, 0.04)
    this.ghostGroup.add(label)
  }

  private buildCurve() {
    this.rig.clearGroup(this.curveGroup)
    const points: THREE.Vector3[] = []
    const steps = 240
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * LOG_T_MAX
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(this.logistic(t)), 0.04))
    }
    this.curveMesh = this.rig.makeTube(points, COLOR.curve, 0.032)
    this.curveGroup.add(this.curveMesh)

    const positions: number[] = []
    const segments = 120
    for (let i = 0; i < segments; i++) {
      const t0 = (i / segments) * LOG_T_MAX
      const t1 = ((i + 1) / segments) * LOG_T_MAX
      const y0 = this.yOf(this.logistic(t0))
      const y1 = this.yOf(this.logistic(t1))
      const x0 = this.xOf(t0)
      const x1 = this.xOf(t1)
      positions.push(x0, Y_MIN, 0.01, x1, Y_MIN, 0.01, x1, y1, 0.01)
      positions.push(x0, Y_MIN, 0.01, x1, y1, 0.01, x0, y0, 0.01)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#6fe3c2'),
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    this.areaMesh = new THREE.Mesh(geometry, material)
    this.areaMesh.renderOrder = 2
    geometry.setDrawRange(0, 0)
    this.curveGroup.add(this.areaMesh)

    this.tip = this.rig.makeGlowSprite('#9dffe0', 0.55)
    this.curveGroup.add(this.tip)

    const label = this.rig.makeTextSprite('N(t) 逻辑斯蒂', {
      color: '#baffeb',
      scale: 0.6,
      fontSize: 44,
      weight: 500
    })
    label.position.set(this.xOf(58), this.yOf(this.logistic(58)) + 0.3, 0.06)
    this.curveLabel = label
    this.curveGroup.add(label)
  }

  private buildCeiling() {
    this.rig.clearGroup(this.ceilingGroup)
    const y = this.yOf(this.params.k)
    this.ceilingGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, y, 0.03), new THREE.Vector3(X_MAX, y, 0.03)],
        COLOR.ceiling,
        { dashed: true, dashSize: 0.1, gapSize: 0.07, opacity: 0.8 }
      )
    )

    const label = this.rig.makeTextSprite(`K = ${int(this.params.k)}`, {
      color: '#ffc983',
      scale: 0.62,
      fontSize: 44,
      weight: 500
    })
    label.position.set(this.xOf(82), y + 0.22, 0.06)
    this.ceilingGroup.add(label)

    const capLabel = this.rig.makeTextSprite('环境容量', {
      color: 'rgba(255, 201, 131, 0.62)',
      scale: 0.5,
      fontSize: 40
    })
    capLabel.position.set(this.xOf(82), y - 0.26, 0.06)
    this.ceilingGroup.add(capLabel)
  }

  private buildInflection() {
    this.rig.clearGroup(this.inflectionGroup)
    const t = this.inflectionTime()
    const y = this.yOf(this.params.k / 2)
    const x = this.xOf(t)

    this.inflectionGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, y, 0.03), new THREE.Vector3(X_MAX, y, 0.03)],
        COLOR.inflection,
        { dashed: true, dashSize: 0.08, gapSize: 0.06, opacity: 0.55 }
      )
    )
    this.inflectionGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(x, Y_MIN, 0.03), new THREE.Vector3(x, y, 0.03)],
        COLOR.inflection,
        { dashed: true, dashSize: 0.07, gapSize: 0.05, opacity: 0.4 }
      )
    )

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.11, 0.012, 8, 48),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.inflection),
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        depthWrite: false
      })
    )
    ring.position.set(x, y, 0.06)
    this.inflectionGroup.add(ring)

    const label = this.rig.makeTextSprite('K/2 · 拐点', {
      color: '#bdefff',
      scale: 0.56,
      fontSize: 44,
      weight: 500
    })
    label.position.set(x - 0.1, y - 0.34, 0.07)
    this.inflectionGroup.add(label)
  }

  private buildGrowth() {
    this.rig.clearGroup(this.growthGroup)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8fe8ff'),
      transparent: true,
      opacity: 0.5,
      toneMapped: false,
      depthWrite: false
    })
    const maxRate = (this.params.r * this.params.k) / 4
    for (const t of [10, 25, 40, 55, 70, 85]) {
      const n = this.logistic(t)
      const rate = this.params.r * n * (1 - n / this.params.k)
      const length = 0.12 + (rate / maxRate) * 0.62
      const x = this.xOf(t)
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.005, length, 6),
        material
      )
      shaft.position.set(x, Y_MIN + length / 2, 0.04)
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.11, 10), material)
      head.position.set(x, Y_MIN + length + 0.04, 0.04)
      this.growthGroup.add(shaft, head)
    }
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex
    const targets = {
      ghost: i <= 2 ? 1 : this.compare ? 0.28 : 0,
      ceiling: i >= 1 ? 1 : 0,
      reveal: i === 3 ? smoothstep(p * 1.08) : i >= 4 ? 1 : 0,
      inflection: i === 4 ? smoothstep(p * 1.2) : i >= 5 ? 1 : 0,
      growth: i >= 4 ? 1 : 0
    }

    this.ghostAlpha = THREE.MathUtils.damp(this.ghostAlpha, targets.ghost, 5, dt)
    this.ceilingAlpha = THREE.MathUtils.damp(this.ceilingAlpha, targets.ceiling, 5, dt)
    this.curveReveal = THREE.MathUtils.damp(this.curveReveal, targets.reveal, 5, dt)
    this.inflectionAlpha = THREE.MathUtils.damp(this.inflectionAlpha, targets.inflection, 5, dt)
    this.growthAlpha = THREE.MathUtils.damp(this.growthAlpha, targets.growth, 5, dt)

    if (this.ghostLine) {
      this.ghostLine.material.opacity = this.ghostAlpha * 0.55
    }
    for (const child of this.ghostGroup.children) {
      if (child instanceof THREE.Sprite) child.material.opacity = this.ghostAlpha * 0.8
    }
    this.ghostGroup.visible = this.ghostAlpha > 0.01

    if (this.curveMesh) this.rig.setDrawRange(this.curveMesh, this.curveReveal)
    if (this.areaMesh) {
      const total = this.areaMesh.geometry.getAttribute('position').count
      this.areaMesh.geometry.setDrawRange(0, Math.floor((total * this.curveReveal) / 3) * 3)
      ;(this.areaMesh.material as THREE.MeshBasicMaterial).opacity = this.curveReveal * 0.07
    }
    if (this.tip) {
      const t = this.curveReveal * LOG_T_MAX
      this.tip.position.set(this.xOf(t), this.yOf(this.logistic(t)), 0.08)
      this.tip.material.opacity = this.curveReveal > 0.01 ? Math.min(1, this.curveReveal * 1.6) : 0
      const pulse = 0.45 + Math.sin(elapsed * 3) * 0.07
      this.tip.scale.set(pulse, pulse, 1)
    }

    this.applyGroupAlpha(this.ceilingGroup, this.ceilingAlpha)
    this.applyGroupAlpha(this.inflectionGroup, this.inflectionAlpha)
    this.growthGroup.traverse((object) => {
      const material = (object as THREE.Mesh).material as THREE.Material | undefined
      if (material && 'opacity' in material) {
        ;(material as THREE.MeshBasicMaterial).opacity = this.growthAlpha * 0.5
      }
    })
    this.growthGroup.visible = this.growthAlpha > 0.01

    this.applyPulse(this.inflectionGroup, elapsed)
    if (this.curveLabel) {
      this.curveLabel.material.opacity =
        this.curveReveal > 0.5 ? Math.min(1, (this.curveReveal - 0.5) * 2) : 0
    }
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
        const base = (object.userData.baseOpacity as number) ?? 0.85
        ;(material as THREE.MeshBasicMaterial).opacity = alpha * base
      }
    })
  }

  private applyPulse(group: THREE.Group, elapsed: number) {
    const ring = group.children.find((child) => child instanceof THREE.Mesh && child.type === 'Mesh')
    if (ring) ring.rotation.z = elapsed * 0.35
  }
}
