import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import {
  LV_DEFAULT_ALPHA,
  LV_DEFAULT_BETA,
  LV_DEFAULT_GAMMA,
  LV_DELTA,
  lvEquilibrium,
  simulateLotkaVolterra,
  type LvPoint
} from '../data/predator'

const PLOT_X0 = -4.15
const PLOT_X1 = 4.15
const PLOT_Y0 = -1.75
const PLOT_Y1 = 2.15
const TRAIL = 26

const COLOR = {
  orbit: ['#74f0c2', '#8fe8ff', '#b8a2ff', '#ffbd70', '#7f9cb5'],
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9',
  field: '#3f6b7c',
  eq: '#ffbd70',
  comet: '#baffeb'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.7, 1.1, 9.8], look: [0.3, 0.08, 0] },
  { pos: [0.9, 1.4, 9.4], look: [0.25, 0.15, 0] },
  { pos: [0.6, 0.9, 9.2], look: [0.2, 0, 0] },
  { pos: [0.5, 1.2, 9.0], look: [0.25, 0.05, 0] },
  { pos: [0.8, 1.6, 9.6], look: [0.4, 0.1, 0] },
  { pos: [0.8, 1.2, 9.8], look: [0.35, 0.08, 0] }
]

interface OrbitView {
  points: LvPoint[]
  world: THREE.Vector3[]
  period: number
  mesh: THREE.Mesh
}

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

const axisNumber = (value: number, max: number) =>
  max >= 10 ? value.toFixed(0) : value.toFixed(1)

export class PredatorScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly fieldGroup = new THREE.Group()
  private readonly orbitGroup = new THREE.Group()
  private readonly labelGroup = new THREE.Group()
  private readonly eqGroup = new THREE.Group()
  private readonly cometGroup = new THREE.Group()

  private params = {
    alpha: LV_DEFAULT_ALPHA,
    beta: LV_DEFAULT_BETA,
    gamma: LV_DEFAULT_GAMMA
  }
  private stepIndex = 0
  private progress = 0
  private fieldOn = true
  private dirty = false

  private orbits: OrbitView[] = []
  private xMax = 15
  private yMax = 30

  private cometPoints: THREE.Vector3[] = []
  private cometPeriod = 15
  private cometTime = 0
  private cometGlow: THREE.Sprite | null = null
  private trailLine: THREE.Line | null = null
  private eqRing: THREE.Mesh | null = null

  private orbitAlpha = 0
  private labelAlpha = 0
  private eqAlpha = 0
  private cometAlpha = 0
  private fieldAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#102a28',
      bloomStrength: 0.8
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.fieldGroup)
    this.rig.add(this.orbitGroup)
    this.rig.add(this.labelGroup)
    this.rig.add(this.eqGroup)
    this.rig.add(this.cometGroup)

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
      alpha: THREE.MathUtils.clamp(params.alpha ?? this.params.alpha, 0.2, 1.5),
      beta: THREE.MathUtils.clamp(params.beta ?? this.params.beta, 0.05, 0.6),
      gamma: THREE.MathUtils.clamp(params.gamma ?? this.params.gamma, 0.2, 1.5)
    }
    if (
      Math.abs(next.alpha - this.params.alpha) < 1e-6 &&
      Math.abs(next.beta - this.params.beta) < 1e-6 &&
      Math.abs(next.gamma - this.params.gamma) < 1e-6
    ) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'field') this.fieldOn = value
  }

  dispose() {
    this.rig.dispose()
  }

  private xOf(x: number) {
    const ratio = THREE.MathUtils.clamp(x / this.xMax, 0, 1.04)
    return PLOT_X0 + ratio * (PLOT_X1 - PLOT_X0)
  }

  private yOf(y: number) {
    const ratio = THREE.MathUtils.clamp(y / this.yMax, 0, 1.04)
    return PLOT_Y0 + ratio * (PLOT_Y1 - PLOT_Y0)
  }

  private rebuild() {
    const { alpha, beta, gamma } = this.params
    const delta = LV_DELTA
    const { xStar, yStar } = lvEquilibrium(alpha, beta, gamma, delta)
    let maxX = xStar
    let maxY = yStar

    const lanes = [
      { mx: 0.55, my: 1.15 },
      { mx: 0.72, my: 1.35 },
      { mx: 1.35, my: 0.78 },
      { mx: 1.55, my: 0.62 }
    ]

    const raw = lanes.map((lane) => {
      const x0 = xStar * lane.mx
      const y0 = yStar * lane.my
      const orbit = simulateLotkaVolterra(alpha, beta, gamma, delta, x0, y0)
      for (const point of orbit.points) {
        if (point.x > maxX) maxX = point.x
        if (point.y > maxY) maxY = point.y
      }
      return { points: orbit.points, period: orbit.period }
    })

    this.xMax = Math.max(xStar * 1.12, maxX * 1.06)
    this.yMax = Math.max(yStar * 1.12, maxY * 1.06)

    this.rig.clearGroup(this.orbitGroup)
    const built: OrbitView[] = []
    raw.forEach((orbit, index) => {
      const world = this.sampleOrbit(orbit.points)
      const mesh = this.rig.makeTube(world, COLOR.orbit[index], 0.02, 0.8)
      mesh.userData.baseOpacity = 0.8
      this.orbitGroup.add(mesh)

      built.push({
        points: orbit.points,
        world,
        period: orbit.period,
        mesh
      })
    })

    this.orbits = built

    this.buildAxes()
    this.buildField()
    this.buildLabels()
    this.buildEquilibrium(xStar, yStar)
    this.buildComet()

    this.orbitAlpha = 0
    this.labelAlpha = 0
    this.eqAlpha = 0
    this.cometAlpha = 0
    this.fieldAlpha = 0
  }

  private sampleOrbit(points: LvPoint[]) {
    const limit = 520
    const stride = Math.max(1, Math.floor(points.length / limit))
    const sampled: LvPoint[] = []
    for (let i = 0; i < points.length; i += stride) sampled.push(points[i])
    if (sampled[sampled.length - 1] !== points[points.length - 1]) {
      sampled.push(points[points.length - 1])
    }
    const world = sampled.map(
      (point) => new THREE.Vector3(this.xOf(point.x), this.yOf(point.y), 0.03)
    )
    if (world.length > 2) world.push(world[0].clone())
    return world
  }

  private buildAxes() {
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

    for (let k = 0; k <= 4; k++) {
      const x = PLOT_X0 + (k / 4) * (PLOT_X1 - PLOT_X0)
      const value = (k / 4) * this.xMax
      if (k > 0) {
        this.axesGroup.add(
          this.rig.makeLine(
            [new THREE.Vector3(x, PLOT_Y0, 0), new THREE.Vector3(x, PLOT_Y1, 0)],
            COLOR.grid,
            { opacity: 0.85 }
          )
        )
      }
      const label = this.rig.makeTextSprite(axisNumber(value, this.xMax), {
        color: COLOR.tick,
        scale: 0.46,
        fontSize: 44
      })
      label.position.set(x, PLOT_Y0 - 0.25, 0.02)
      this.axesGroup.add(label)
    }

    for (let k = 0; k <= 3; k++) {
      const y = PLOT_Y0 + (k / 3) * (PLOT_Y1 - PLOT_Y0)
      const value = (k / 3) * this.yMax
      if (k > 0) {
        this.axesGroup.add(
          this.rig.makeLine(
            [new THREE.Vector3(PLOT_X0, y, 0), new THREE.Vector3(PLOT_X1, y, 0)],
            COLOR.grid,
            { opacity: 0.85 }
          )
        )
      }
      const label = this.rig.makeTextSprite(axisNumber(value, this.yMax), {
        color: COLOR.tick,
        scale: 0.46,
        fontSize: 44
      })
      label.position.set(PLOT_X0 - 0.48, y, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.rig.makeTextSprite('猎物 x', {
      color: '#8fa4b8',
      scale: 0.62,
      fontSize: 44,
      weight: 400
    })
    xTitle.position.set((PLOT_X0 + PLOT_X1) / 2, PLOT_Y0 - 0.56, 0.02)
    this.axesGroup.add(xTitle)

    const yTitle = this.rig.makeTextSprite('捕食者 y', {
      color: '#8fa4b8',
      scale: 0.6,
      fontSize: 44,
      weight: 400
    })
    yTitle.position.set(PLOT_X0 - 1.15, PLOT_Y1 - 0.28, 0.02)
    this.axesGroup.add(yTitle)
  }

  private buildField() {
    this.rig.clearGroup(this.fieldGroup)
    const { alpha, beta, gamma } = this.params
    const delta = LV_DELTA
    const positions: number[] = []
    const cols = 13
    const rows = 9

    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x = this.xMax * (0.07 + (0.86 * ix) / (cols - 1))
        const y = this.yMax * (0.07 + (0.86 * iy) / (rows - 1))
        const dx = alpha * x - beta * x * y
        const dy = -gamma * y + delta * x * y
        const magnitude = Math.hypot(dx, dy)
        if (magnitude < 1e-6) continue

        const worldX = (dx / this.xMax) * (PLOT_X1 - PLOT_X0)
        const worldY = (dy / this.yMax) * (PLOT_Y1 - PLOT_Y0)
        const length = Math.hypot(worldX, worldY)
        if (length < 1e-6) continue

        const ux = (worldX / length) * 0.14
        const uy = (worldY / length) * 0.14
        const sx = this.xOf(x)
        const sy = this.yOf(y)

        positions.push(sx - ux / 2, sy - uy / 2, 0.02, sx + ux / 2, sy + uy / 2, 0.02)

        const px = -uy * 0.32
        const py = ux * 0.32
        const hx = sx + ux / 2
        const hy = sy + uy / 2
        positions.push(
          hx, hy, 0.02, hx - ux * 0.6 + px, hy - uy * 0.6 + py, 0.02,
          hx, hy, 0.02, hx - ux * 0.6 - px, hy - uy * 0.6 - py, 0.02
        )
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLOR.field),
      transparent: true,
      opacity: 0.45,
      toneMapped: false
    })
    const field = new THREE.LineSegments(geometry, material)
    field.renderOrder = 1
    field.userData.baseOpacity = 0.45
    this.fieldGroup.add(field)
  }

  private buildLabels() {
    this.rig.clearGroup(this.labelGroup)
    this.orbits.forEach((orbit, index) => {
      let anchor = orbit.points[0]
      for (const point of orbit.points) {
        if (point.x > anchor.x) anchor = point
      }
      const label = this.rig.makeTextSprite(`V${index + 1}`, {
        color: 'rgba(160, 188, 210, 0.72)',
        scale: 0.42,
        fontSize: 38
      })
      label.position.set(this.xOf(anchor.x) + 0.18, this.yOf(anchor.y), 0.06)
      this.labelGroup.add(label)
    })
  }

  private buildEquilibrium(xStar: number, yStar: number) {
    this.rig.clearGroup(this.eqGroup)
    const ex = this.xOf(xStar)
    const ey = this.yOf(yStar)

    this.eqGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(ex, PLOT_Y0, 0.03), new THREE.Vector3(ex, PLOT_Y1, 0.03)],
        COLOR.eq,
        { dashed: true, dashSize: 0.075, gapSize: 0.06, opacity: 0.55 }
      )
    )
    this.eqGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(PLOT_X0, ey, 0.03), new THREE.Vector3(PLOT_X1, ey, 0.03)],
        COLOR.eq,
        { dashed: true, dashSize: 0.075, gapSize: 0.06, opacity: 0.55 }
      )
    )

    this.eqGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(ex - 0.14, ey, 0.05), new THREE.Vector3(ex + 0.14, ey, 0.05)],
        COLOR.eq,
        { opacity: 0.95 }
      )
    )
    this.eqGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(ex, ey - 0.14, 0.05), new THREE.Vector3(ex, ey + 0.14, 0.05)],
        COLOR.eq,
        { opacity: 0.95 }
      )
    )

    this.eqRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.012, 8, 44),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.eq),
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        depthWrite: false
      })
    )
    this.eqRing.position.set(ex, ey, 0.06)
    this.eqGroup.add(this.eqRing)

    const xLabel = this.rig.makeTextSprite(`x* = ${xStar.toFixed(1)}`, {
      color: '#ffc983',
      scale: 0.5,
      fontSize: 40
    })
    xLabel.position.set(ex + 0.05, PLOT_Y0 - 0.27, 0.05)
    this.eqGroup.add(xLabel)

    const yLabel = this.rig.makeTextSprite(`y* = ${yStar.toFixed(1)}`, {
      color: '#ffc983',
      scale: 0.5,
      fontSize: 40
    })
    yLabel.position.set(PLOT_X1 - 0.72, ey + 0.22, 0.05)
    this.eqGroup.add(yLabel)
  }

  private buildComet() {
    this.rig.clearGroup(this.cometGroup)
    const orbit = this.orbits[this.orbits.length - 1]
    if (!orbit) return

    this.cometPoints = orbit.world
    this.cometPeriod = Math.max(1, orbit.period)
    this.cometTime = 0

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(new Float32Array(TRAIL * 3), 3)
    )
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLOR.comet),
      transparent: true,
      opacity: 0.7,
      toneMapped: false
    })
    this.trailLine = new THREE.Line(geometry, material)
    this.trailLine.renderOrder = 3
    this.trailLine.userData.baseOpacity = 0.7
    this.cometGroup.add(this.trailLine)

    this.cometGlow = this.rig.makeGlowSprite(COLOR.comet, 0.62)
    this.cometGroup.add(this.cometGlow)
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex

    const revealTarget = i === 0 ? 0.15 + 0.45 * p : i === 1 ? 0.65 + 0.35 * p : 1
    const orbitTarget = i === 0 ? 1 : i >= 4 ? 0.95 : 0.6
    const labelTarget = i >= 3 ? 1 : 0
    const eqTarget = i >= 2 ? 1 : 0
    const cometTarget = i >= 4 ? 1 : 0
    const fieldTarget = this.fieldOn ? (i === 0 ? 0 : i >= 4 ? 0.55 : 0.35) : 0

    this.orbitAlpha = THREE.MathUtils.damp(this.orbitAlpha, orbitTarget, 5, dt)
    this.labelAlpha = THREE.MathUtils.damp(this.labelAlpha, labelTarget, 5, dt)
    this.eqAlpha = THREE.MathUtils.damp(this.eqAlpha, eqTarget, 5, dt)
    this.cometAlpha = THREE.MathUtils.damp(this.cometAlpha, cometTarget, 5, dt)
    this.fieldAlpha = THREE.MathUtils.damp(this.fieldAlpha, fieldTarget, 5, dt)

    this.orbits.forEach((orbit, index) => {
      this.rig.setDrawRange(orbit.mesh, revealTarget)
      orbit.mesh.visible = i > 0 || index === 0
    })

    this.applyGroupAlpha(this.orbitGroup, this.orbitAlpha)
    this.applyGroupAlpha(this.labelGroup, this.labelAlpha)
    this.applyGroupAlpha(this.eqGroup, this.eqAlpha)
    this.applyGroupAlpha(this.fieldGroup, this.fieldAlpha)
    this.applyGroupAlpha(this.cometGroup, this.cometAlpha)

    if (this.eqRing) this.eqRing.rotation.z = elapsed * 0.4

    if (this.cometPoints.length > 1 && this.trailLine && this.cometGlow) {
      this.cometTime += (dt * this.cometPeriod) / 14
      if (this.cometTime > this.cometPeriod) this.cometTime -= this.cometPeriod

      const count = this.cometPoints.length
      const idx = Math.min(
        count - 1,
        Math.floor((this.cometTime / this.cometPeriod) * (count - 1))
      )
      const current = this.cometPoints[idx]

      const attribute = this.trailLine.geometry.getAttribute('position') as THREE.BufferAttribute
      for (let k = 0; k < TRAIL; k++) {
        const source = (((idx - (TRAIL - 1 - k)) % count) + count) % count
        const point = this.cometPoints[source]
        attribute.setXYZ(k, point.x, point.y, 0.06)
      }
      attribute.needsUpdate = true

      this.cometGlow.position.set(current.x, current.y, 0.09)
      const pulse = 0.42 + Math.sin(elapsed * 3.2) * 0.05
      this.cometGlow.scale.set(pulse, pulse, 1)
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
