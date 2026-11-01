import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import {
  PEN_DEFAULT_L,
  PEN_DEFAULT_THETA,
  PEN_DEG,
  nonlinearPeriod,
  simulatePendulum,
  smallPeriod,
  type PendulumSample
} from '../data/pendulum'

const PIVOT_X = -2.35
const PIVOT_Y = 2.3

const PLOT_X0 = 0.75
const PLOT_X1 = 4.15
const PLOT_Y0 = -1.5
const PLOT_Y1 = 1.75
const ZERO_Y = (PLOT_Y0 + PLOT_Y1) / 2

const COLOR = {
  curve: '#74f0c2',
  ghost: '#ffbd70',
  copper: '#f2a765',
  glow: '#ffc27d',
  arc: '#ffb36b',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9',
  period: '#8fe8ff'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [-0.2, 1.2, 9.6], look: [-0.5, 0.35, 0] },
  { pos: [0.2, 1.5, 9.2], look: [-0.35, 0.5, 0] },
  { pos: [-0.5, 1.0, 9.4], look: [-0.6, 0.3, 0] },
  { pos: [0.1, 1.8, 9.0], look: [-0.3, 0.25, 0] },
  { pos: [0.4, 1.6, 9.4], look: [-0.1, 0.4, 0] },
  { pos: [0.3, 1.3, 9.8], look: [-0.2, 0.3, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

export class PendulumScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly arcGroup = new THREE.Group()
  private readonly pendulumGroup = new THREE.Group()
  private readonly curveGroup = new THREE.Group()
  private readonly ghostGroup = new THREE.Group()
  private readonly markerGroup = new THREE.Group()

  private params = { l: PEN_DEFAULT_L, theta0: PEN_DEFAULT_THETA }
  private stepIndex = 0
  private progress = 0
  private smallAngle = true
  private dirty = false

  private sim: PendulumSample[] = []
  private tMax = 10
  private thetaScale = 0.5
  private swingTime = 0

  private curveMesh: THREE.Mesh | null = null
  private rodLine: THREE.Line | null = null
  private ballMesh: THREE.Mesh | null = null
  private ballGlow: THREE.Sprite | null = null
  private tip: THREE.Sprite | null = null

  private curveReveal = 0
  private ghostAlpha = 0
  private markerAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#2a1e12',
      bloomStrength: 0.85
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.arcGroup)
    this.rig.add(this.pendulumGroup)
    this.rig.add(this.curveGroup)
    this.rig.add(this.ghostGroup)
    this.rig.add(this.markerGroup)

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
      l: THREE.MathUtils.clamp(params.l ?? this.params.l, 0.5, 3),
      theta0: THREE.MathUtils.clamp(params.theta0 ?? this.params.theta0, 5, 60)
    }
    if (Math.abs(next.l - this.params.l) < 1e-6 && Math.abs(next.theta0 - this.params.theta0) < 1e-6) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'smallAngle') this.smallAngle = value
  }

  dispose() {
    this.rig.dispose()
  }

  private worldLen() {
    return 0.75 + 0.5 * this.params.l
  }

  private xOf(t: number) {
    return PLOT_X0 + (t / this.tMax) * (PLOT_X1 - PLOT_X0)
  }

  private yOf(theta: number) {
    const half = (PLOT_Y1 - PLOT_Y0) / 2
    const ratio = THREE.MathUtils.clamp(theta / this.thetaScale, -1.15, 1.15)
    return ZERO_Y + ratio * half
  }

  private rebuild() {
    const { l, theta0 } = this.params
    const thetaRad = theta0 * PEN_DEG
    const t0 = smallPeriod(l)

    this.tMax = Math.max(4 * t0, 6)
    this.thetaScale = Math.max(thetaRad * 1.14, 0.12)
    this.sim = simulatePendulum(l, theta0, this.tMax, 720)
    this.swingTime = 0

    this.buildAxes(t0)
    this.buildArc(thetaRad)
    this.buildPendulum()
    this.buildCurve()
    this.buildGhost(thetaRad, t0)
    this.buildMarkers(t0)
  }

  private buildAxes(t0: number) {
    this.rig.clearGroup(this.axesGroup)

    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(PLOT_X0, PLOT_Y0, 0), new THREE.Vector3(PLOT_X1, PLOT_Y0, 0)],
        COLOR.axis,
        { opacity: 0.9 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(PLOT_X0, PLOT_Y0, 0), new THREE.Vector3(PLOT_X0, PLOT_Y1 + 0.12, 0)],
        COLOR.axis,
        { opacity: 0.9 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(PLOT_X0, ZERO_Y, 0.01), new THREE.Vector3(PLOT_X1, ZERO_Y, 0.01)],
        COLOR.grid,
        { dashed: true, dashSize: 0.05, gapSize: 0.05, opacity: 0.8 }
      )
    )

    for (let k = 0; k <= 4; k++) {
      const t = k * t0
      if (t > this.tMax + 1e-6) continue
      const x = this.xOf(t)
      if (k > 0) {
        this.axesGroup.add(
          this.rig.makeLine(
            [new THREE.Vector3(x, PLOT_Y0, 0), new THREE.Vector3(x, PLOT_Y1, 0)],
            COLOR.grid,
            { opacity: 0.85 }
          )
        )
      }
      const label = this.rig.makeTextSprite(k === 0 ? '0' : `${k}T₀`, {
        color: COLOR.tick,
        scale: 0.44,
        fontSize: 46
      })
      label.position.set(x, PLOT_Y0 - 0.26, 0.02)
      this.axesGroup.add(label)
    }

    const theta0 = Math.round(this.params.theta0)
    const rows: Array<{ value: number; label: string; accent: boolean }> = [
      { value: this.thetaScale * 0.85, label: `${theta0}°`, accent: true },
      { value: 0, label: '0', accent: false },
      { value: -this.thetaScale * 0.85, label: `−${theta0}°`, accent: true }
    ]

    for (const row of rows) {
      const y = this.yOf(row.value)
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(PLOT_X0, y, 0), new THREE.Vector3(PLOT_X1, y, 0)],
          row.accent ? COLOR.axis : COLOR.grid,
          { opacity: row.accent ? 0.75 : 0.85 }
        )
      )
      const label = this.rig.makeTextSprite(row.label, {
        color: row.accent ? '#ffc983' : COLOR.tick,
        scale: 0.48,
        fontSize: 42
      })
      label.position.set(PLOT_X0 - 0.55, y, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.rig.makeTextSprite('时间 t', {
      color: '#8fa4b8',
      scale: 0.62,
      fontSize: 44,
      weight: 400
    })
    xTitle.position.set((PLOT_X0 + PLOT_X1) / 2, PLOT_Y0 - 0.56, 0.02)
    this.axesGroup.add(xTitle)

    const yTitle = this.rig.makeTextSprite('摆角 θ', {
      color: '#8fa4b8',
      scale: 0.6,
      fontSize: 44,
      weight: 400
    })
    yTitle.position.set(PLOT_X0 - 1.15, PLOT_Y1 - 0.3, 0.02)
    this.axesGroup.add(yTitle)
  }

  private buildArc(thetaRad: number) {
    this.rig.clearGroup(this.arcGroup)
    const radius = this.worldLen()
    const points: THREE.Vector3[] = []
    const steps = 88
    for (let i = 0; i <= steps; i++) {
      const theta = -thetaRad + (2 * thetaRad * i) / steps
      points.push(
        new THREE.Vector3(
          PIVOT_X + Math.sin(theta) * radius,
          PIVOT_Y - Math.cos(theta) * radius,
          -0.02
        )
      )
    }
    const arc = this.rig.makeTube(points, COLOR.arc, 0.012, 0.34)
    this.arcGroup.add(arc)
  }

  private buildPendulum() {
    this.rig.clearGroup(this.pendulumGroup)

    this.pendulumGroup.add(
      this.rig.makeLine(
        [
          new THREE.Vector3(PIVOT_X - 0.95, PIVOT_Y + 0.04, 0),
          new THREE.Vector3(PIVOT_X + 0.95, PIVOT_Y + 0.04, 0)
        ],
        COLOR.axis,
        { opacity: 0.85 }
      )
    )

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.07, 0.012, 8, 32),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#cbd7e4'),
        transparent: true,
        opacity: 0.85,
        toneMapped: false,
        depthWrite: false
      })
    )
    ring.position.set(PIVOT_X, PIVOT_Y, 0.04)
    this.pendulumGroup.add(ring)

    const rodGeometry = new THREE.BufferGeometry()
    rodGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [PIVOT_X, PIVOT_Y, 0.03, PIVOT_X, PIVOT_Y - this.worldLen(), 0.03],
        3
      )
    )
    this.rodLine = new THREE.Line(
      rodGeometry,
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#d6e2ee'),
        transparent: true,
        opacity: 0.75,
        toneMapped: false
      })
    )
    this.rodLine.renderOrder = 3
    this.pendulumGroup.add(this.rodLine)

    this.ballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 24, 18),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.copper),
        toneMapped: false
      })
    )
    this.ballMesh.renderOrder = 5
    this.ballMesh.position.set(PIVOT_X, PIVOT_Y - this.worldLen(), 0.05)
    this.pendulumGroup.add(this.ballMesh)

    this.ballGlow = this.rig.makeGlowSprite(COLOR.glow, 0.95)
    this.ballGlow.position.set(PIVOT_X, PIVOT_Y - this.worldLen(), 0.09)
    this.pendulumGroup.add(this.ballGlow)
  }

  private buildCurve() {
    this.rig.clearGroup(this.curveGroup)
    const points: THREE.Vector3[] = []
    for (const sample of this.sim) {
      points.push(new THREE.Vector3(this.xOf(sample.t), this.yOf(sample.theta), 0.04))
    }
    this.curveMesh = this.rig.makeTube(points, COLOR.curve, 0.03)
    this.curveGroup.add(this.curveMesh)

    this.tip = this.rig.makeGlowSprite('#9dffe0', 0.5)
    this.tip.position.set(PLOT_X0, ZERO_Y, 0.09)
    this.curveGroup.add(this.tip)

    const label = this.rig.makeTextSprite('真实解 · RK4', {
      color: '#baffeb',
      scale: 0.56,
      fontSize: 42,
      weight: 500
    })
    label.position.set(this.xOf(this.tMax * 0.58) + 0.1, PLOT_Y1 - 0.22, 0.06)
    this.curveGroup.add(label)
  }

  private buildGhost(thetaRad: number, t0: number) {
    this.rig.clearGroup(this.ghostGroup)
    const omega = (2 * Math.PI) / t0
    const points: THREE.Vector3[] = []
    const steps = 240
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * this.tMax
      const theta = thetaRad * Math.cos(omega * t)
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(theta), 0.065))
    }
    this.ghostGroup.add(
      this.rig.makeLine(points, COLOR.ghost, {
        dashed: true,
        dashSize: 0.075,
        gapSize: 0.055,
        opacity: 0.8
      })
    )

    const label = this.rig.makeTextSprite('小角近似', {
      color: 'rgba(255, 201, 131, 0.82)',
      scale: 0.54,
      fontSize: 42
    })
    label.position.set(this.xOf(this.tMax * 0.24), ZERO_Y + 0.42, 0.07)
    this.ghostGroup.add(label)
  }

  private buildMarkers(t0: number) {
    this.rig.clearGroup(this.markerGroup)
    const tn = nonlinearPeriod(this.params.l, this.params.theta0)
    const marks: Array<{ t: number; label: string; color: string }> = [
      { t: t0, label: 'T₀', color: COLOR.period },
      { t: tn, label: 'T', color: COLOR.ghost }
    ]

    for (const [index, mark] of marks.entries()) {
      if (mark.t > this.tMax) continue
      const x = this.xOf(mark.t)
      this.markerGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(x, PLOT_Y0, 0.03), new THREE.Vector3(x, PLOT_Y1, 0.03)],
          mark.color,
          { dashed: true, dashSize: 0.07, gapSize: 0.055, opacity: 0.65 }
        )
      )
      const label = this.rig.makeTextSprite(mark.label, {
        color: mark.color,
        scale: 0.46,
        fontSize: 44
      })
      // 小角周期 T₀ 与精确周期 T 在接近时几乎重合，两条标签上下错开，避免互相压字。
      label.position.set(x, PLOT_Y1 + 0.16 + index * 0.22, 0.05)
      this.markerGroup.add(label)
    }
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex

    const revealTarget =
      i === 0
        ? 0.18 + 0.22 * p
        : i === 1
          ? 0.4 + 0.18 * p
          : i === 2
            ? 0.58 + 0.42 * p
            : 1
    const ghostTarget = i === 2 ? 1 : this.smallAngle ? (i >= 3 ? 0.7 : 0.45) : 0
    const markerTarget = i >= 4 ? 1 : 0

    this.curveReveal = THREE.MathUtils.damp(this.curveReveal, revealTarget, 5, dt)
    this.ghostAlpha = THREE.MathUtils.damp(this.ghostAlpha, ghostTarget, 5, dt)
    this.markerAlpha = THREE.MathUtils.damp(this.markerAlpha, markerTarget, 5, dt)

    if (this.curveMesh) this.rig.setDrawRange(this.curveMesh, this.curveReveal)
    this.applyGroupAlpha(this.ghostGroup, this.ghostAlpha)
    this.applyGroupAlpha(this.markerGroup, this.markerAlpha)

    if (this.tip && this.sim.length > 0) {
      const idx = Math.min(
        this.sim.length - 1,
        Math.max(0, Math.floor(this.curveReveal * (this.sim.length - 1)))
      )
      const sample = this.sim[idx]
      this.tip.position.set(this.xOf(sample.t), this.yOf(sample.theta), 0.09)
      const pulse = 0.4 + Math.sin(elapsed * 3.4) * 0.06
      this.tip.scale.set(pulse, pulse, 1)
      this.tip.material.opacity = Math.min(1, this.curveReveal * 1.8)
    }

    this.swingTime += dt * 1.15
    if (this.swingTime > this.tMax) this.swingTime -= this.tMax

    if (this.sim.length > 1 && this.rodLine && this.ballMesh && this.ballGlow) {
      const idx = Math.min(
        this.sim.length - 1,
        Math.floor((this.swingTime / this.tMax) * (this.sim.length - 1))
      )
      const theta = this.sim[idx].theta
      const radius = this.worldLen()
      const bx = PIVOT_X + Math.sin(theta) * radius
      const by = PIVOT_Y - Math.cos(theta) * radius

      const attribute = this.rodLine.geometry.getAttribute('position') as THREE.BufferAttribute
      attribute.setXYZ(0, PIVOT_X, PIVOT_Y, 0.03)
      attribute.setXYZ(1, bx, by, 0.05)
      attribute.needsUpdate = true

      this.ballMesh.position.set(bx, by, 0.05)
      this.ballGlow.position.set(bx, by, 0.09)
    }
  }

  private applyGroupAlpha(group: THREE.Group, alpha: number) {
    group.visible = alpha > 0.02
    group.traverse((object) => {
      if (object instanceof THREE.Sprite) {
        object.material.opacity = alpha
        return
      }
      const mesh = object as THREE.Mesh
      const material = mesh.material as THREE.Material | undefined
      if (material && 'opacity' in material) {
        const base = (object.userData.baseOpacity as number | undefined) ?? 0.85
        ;(material as THREE.MeshBasicMaterial).opacity = alpha * base
      }
    })
  }
}
