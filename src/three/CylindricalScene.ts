import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import {
  CYL_DEFAULT_HEIGHT,
  CYL_DEFAULT_MODE,
  CYL_DEFAULT_RADIUS,
  CYL_HALF_HEIGHT
} from '../data/cylindrical'

const PHI = Math.PI / 4
const H = CYL_HALF_HEIGHT
const GRID_MAX = 3.2

const COLOR = {
  grid: '#1b3a48',
  gridOuter: '#2c5d6c',
  frame: '#2b6070',
  axis: '#3d5870',
  tick: '#7c93a9',
  probe: '#8fe8ff',
  er: '#ffbd70',
  et: '#b8a2ff',
  ez: '#74f0c2',
  helix: '#c7a0ff',
  text: '#8fa4b8'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.4, 1.6, 9.2], look: [0.3, 0.2, 0] },
  { pos: [0.5, 2.0, 8.8], look: [0.3, 0.3, 0] },
  { pos: [0.7, 2.4, 8.4], look: [0.3, 0.4, 0] },
  { pos: [0.5, 1.8, 8.8], look: [0.3, 0.2, 0] },
  { pos: [1.0, 2.6, 8.4], look: [0.3, 0.5, 0] },
  { pos: [0.6, 2.0, 9.4], look: [0.3, 0.25, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

const fmt = (value: number) => value.toFixed(2)

export class CylindricalScene implements LessonScene {
  private readonly rig: StageRig
  private readonly gridGroup = new THREE.Group()
  private readonly frameGroup = new THREE.Group()
  private readonly probeGroup = new THREE.Group()
  private readonly metricGroup = new THREE.Group()
  private readonly vectorGroup = new THREE.Group()
  private readonly composeGroup = new THREE.Group()
  private readonly helixGroup = new THREE.Group()

  private params = {
    radius: CYL_DEFAULT_RADIUS,
    mode: CYL_DEFAULT_MODE,
    height: CYL_DEFAULT_HEIGHT
  }
  private stepIndex = 0
  private progress = 0
  private showGrid = true
  private dirty = false

  private gridAlpha = 1
  private frameAlpha = 1
  private probeAlpha = 0
  private metricAlpha = 0
  private vectorAlpha = 0
  private composeAlpha = 0
  private helixAlpha = 0

  private probeTip: THREE.Sprite | null = null
  private composeRing: THREE.Mesh | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#10242e',
      bloomStrength: 0.8
    })
    this.rig.add(this.frameGroup)
    this.rig.add(this.gridGroup)
    this.rig.add(this.probeGroup)
    this.rig.add(this.metricGroup)
    this.rig.add(this.vectorGroup)
    this.rig.add(this.composeGroup)
    this.rig.add(this.helixGroup)

    this.buildGrid()
    this.buildFrame()
    this.buildProbe()
    this.buildMetric()
    this.buildVectors()
    this.buildCompose()
    this.buildHelix()

    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const radius = THREE.MathUtils.clamp(params.radius ?? this.params.radius, 1.0, 3.0)
    const mode = Math.round(THREE.MathUtils.clamp(params.mode ?? this.params.mode, 0, 4))
    const height = THREE.MathUtils.clamp(params.height ?? this.params.height, -1.5, 1.5)
    if (
      Math.abs(radius - this.params.radius) < 1e-6 &&
      mode === this.params.mode &&
      Math.abs(height - this.params.height) < 1e-6
    ) {
      return
    }
    this.params = { radius, mode, height }
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'showGrid') this.showGrid = value
  }

  dispose() {
    this.rig.dispose()
  }

  private circlePoints(radius: number, z: number, segments = 120) {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
    }
    return points
  }

  private arcPoints(radius: number, z: number, start: number, end: number, segments = 64) {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = start + ((end - start) * i) / segments
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
    }
    return points
  }

  private probePoint() {
    const { radius, height } = this.params
    return new THREE.Vector3(radius * Math.cos(PHI), radius * Math.sin(PHI), height)
  }

  private addLine(
    group: THREE.Group,
    points: THREE.Vector3[],
    color: string,
    options?: { dashed?: boolean; dashSize?: number; gapSize?: number; opacity?: number }
  ) {
    const line = this.rig.makeLine(points, color, options)
    line.userData.baseOpacity = options?.opacity ?? 0.85
    group.add(line)
    return line
  }

  private addTube(
    group: THREE.Group,
    points: THREE.Vector3[],
    color: string,
    radius: number,
    opacity = 1
  ) {
    const mesh = this.rig.makeTube(points, color, radius, opacity)
    mesh.userData.baseOpacity = opacity
    this.rig.setDrawRange(mesh, 1)
    group.add(mesh)
    return mesh
  }

  private addLabel(
    group: THREE.Group,
    text: string,
    position: THREE.Vector3,
    color: string,
    scale = 0.5
  ) {
    const sprite = this.rig.makeTextSprite(text, { color, scale, fontSize: 44 })
    sprite.position.copy(position)
    group.add(sprite)
    return sprite
  }

  private addArrow(
    group: THREE.Group,
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    length: number,
    color: string,
    label: string
  ) {
    const dir = direction.clone().normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    )

    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, length, 10),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
        toneMapped: false,
        depthWrite: false
      })
    )
    shaft.position.copy(origin).addScaledVector(dir, length / 2)
    shaft.quaternion.copy(quaternion)
    shaft.userData.baseOpacity = 0.95
    group.add(shaft)

    const head = new THREE.Mesh(
      new THREE.ConeGeometry(0.055, 0.16, 14),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
        toneMapped: false,
        depthWrite: false
      })
    )
    head.position.copy(origin).addScaledVector(dir, length + 0.08)
    head.quaternion.copy(quaternion)
    head.userData.baseOpacity = 0.95
    group.add(head)

    const sprite = this.rig.makeTextSprite(label, { color, scale: 0.42, fontSize: 46 })
    sprite.position.copy(origin).addScaledVector(dir, length + 0.36)
    group.add(sprite)
  }

  private buildGrid() {
    this.rig.clearGroup(this.gridGroup)
    const radii = [0.8, 1.6, 2.4, GRID_MAX]
    for (let i = 0; i < radii.length; i++) {
      const outer = i === radii.length - 1
      this.addLine(
        this.gridGroup,
        this.circlePoints(radii[i], -H - 0.02),
        outer ? COLOR.gridOuter : COLOR.grid,
        { opacity: outer ? 0.55 : 0.4 }
      )
    }

    const rays = 12
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2
      const end = new THREE.Vector3(
        Math.cos(angle) * GRID_MAX,
        Math.sin(angle) * GRID_MAX,
        -H - 0.03
      )
      this.addLine(
        this.gridGroup,
        [new THREE.Vector3(0, 0, -H - 0.03), end],
        COLOR.grid,
        { dashed: true, dashSize: 0.08, gapSize: 0.07, opacity: 0.34 }
      )
    }

    this.addLabel(
      this.gridGroup,
      '0°',
      new THREE.Vector3(GRID_MAX + 0.3, 0.05, -H),
      COLOR.tick,
      0.36
    )
    this.addLabel(
      this.gridGroup,
      '90°',
      new THREE.Vector3(0.12, GRID_MAX + 0.3, -H),
      COLOR.tick,
      0.36
    )
    this.addLabel(
      this.gridGroup,
      '180°',
      new THREE.Vector3(-GRID_MAX - 0.42, 0.05, -H),
      COLOR.tick,
      0.36
    )
    this.addLabel(
      this.gridGroup,
      '270°',
      new THREE.Vector3(0.12, -GRID_MAX - 0.32, -H),
      COLOR.tick,
      0.36
    )
  }

  private buildFrame() {
    this.rig.clearGroup(this.frameGroup)
    const radius = this.params.radius
    const levels = [-H, -H / 2, 0, H / 2, H]

    for (let i = 0; i < levels.length; i++) {
      const bottom = i === 0
      this.addLine(
        this.frameGroup,
        this.circlePoints(radius, levels[i]),
        bottom ? COLOR.frame : COLOR.grid,
        { opacity: bottom ? 0.8 : 0.45 }
      )
    }

    const generatrices = 12
    for (let i = 0; i < generatrices; i++) {
      const angle = (i / generatrices) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      this.addLine(
        this.frameGroup,
        [new THREE.Vector3(x, y, -H), new THREE.Vector3(x, y, H)],
        COLOR.grid,
        { opacity: 0.38 }
      )
    }

    this.addArrow(
      this.frameGroup,
      new THREE.Vector3(0, 0, -H),
      new THREE.Vector3(0, 0, 1),
      H * 2 + 0.35,
      COLOR.axis,
      'z'
    )

    this.addLabel(
      this.frameGroup,
      'x',
      new THREE.Vector3(GRID_MAX + 0.16, 0.05, -H),
      COLOR.text,
      0.4
    )
    this.addLabel(
      this.frameGroup,
      'y',
      new THREE.Vector3(0.14, GRID_MAX + 0.16, -H),
      COLOR.text,
      0.4
    )
  }

  private buildProbe() {
    this.rig.clearGroup(this.probeGroup)
    const radius = this.params.radius
    const point = this.probePoint()
    const x = point.x
    const y = point.y

    this.addLine(this.probeGroup, [point, new THREE.Vector3(x, y, -H)], COLOR.probe, {
      dashed: true,
      dashSize: 0.07,
      gapSize: 0.055,
      opacity: 0.55
    })
    this.addLine(
      this.probeGroup,
      [new THREE.Vector3(0, 0, point.z), point],
      COLOR.er,
      { dashed: true, dashSize: 0.07, gapSize: 0.055, opacity: 0.7 }
    )
    this.addLine(
      this.probeGroup,
      [new THREE.Vector3(0, 0, -H), new THREE.Vector3(x, y, -H)],
      COLOR.et,
      { dashed: true, dashSize: 0.08, gapSize: 0.06, opacity: 0.4 }
    )

    this.addLine(
      this.probeGroup,
      this.arcPoints(radius, -H + 0.02, 0, PHI, 48),
      COLOR.probe,
      { opacity: 0.6 }
    )

    this.addLabel(
      this.probeGroup,
      'P',
      new THREE.Vector3(x + 0.2, y + 0.2, point.z + 0.1),
      COLOR.probe,
      0.4
    )
    this.addLabel(
      this.probeGroup,
      `r = ${fmt(radius)}`,
      new THREE.Vector3(x * 0.5, y * 0.5, point.z + 0.18),
      COLOR.er,
      0.42
    )
    this.addLabel(
      this.probeGroup,
      `z = ${fmt(point.z)}`,
      new THREE.Vector3(x + 0.18, y + 0.18, (point.z - H) / 2),
      COLOR.probe,
      0.38
    )
    this.addLabel(
      this.probeGroup,
      'φ',
      new THREE.Vector3(
        Math.cos(PHI * 0.5) * (radius + 0.28),
        Math.sin(PHI * 0.5) * (radius + 0.28),
        -H + 0.08
      ),
      COLOR.probe,
      0.36
    )

    const marker = new THREE.Mesh(
      new THREE.TorusGeometry(0.07, 0.012, 10, 36),
      new THREE.MeshBasicMaterial({
        color: COLOR.probe,
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        depthWrite: false
      })
    )
    marker.position.copy(point)
    marker.userData.baseOpacity = 0.9
    this.probeGroup.add(marker)

    const tip = this.rig.makeGlowSprite('#9dffe0', 0.48)
    tip.position.copy(point)
    this.probeTip = tip
    this.probeGroup.add(tip)
  }

  private buildMetric() {
    this.rig.clearGroup(this.metricGroup)
    const radius = this.params.radius

    this.addTube(
      this.metricGroup,
      this.arcPoints(radius, -H + 0.04, 0, PHI, 64),
      COLOR.er,
      0.018,
      0.8
    )
    this.addLabel(
      this.metricGroup,
      'h_φ = r',
      new THREE.Vector3(
        Math.cos(PHI * 0.5) * (radius + 0.4),
        Math.sin(PHI * 0.5) * (radius + 0.4),
        -H + 0.06
      ),
      COLOR.er,
      0.44
    )

    this.addTube(
      this.metricGroup,
      [
        new THREE.Vector3(radius * Math.cos(PHI), radius * Math.sin(PHI), -H),
        new THREE.Vector3(radius * Math.cos(PHI), radius * Math.sin(PHI), H)
      ],
      COLOR.ez,
      0.016,
      0.7
    )
    this.addLabel(
      this.metricGroup,
      'h_z = 1',
      new THREE.Vector3(
        radius * Math.cos(PHI) + 0.18,
        radius * Math.sin(PHI) + 0.18,
        H * 0.5
      ),
      COLOR.ez,
      0.42
    )

    this.addLine(
      this.metricGroup,
      [new THREE.Vector3(0, 0, -H + 0.04), new THREE.Vector3(radius, 0, -H + 0.04)],
      COLOR.er,
      { dashed: true, dashSize: 0.08, gapSize: 0.06, opacity: 0.7 }
    )
    this.addLabel(
      this.metricGroup,
      'r',
      new THREE.Vector3(radius * 0.5, 0.16, -H + 0.06),
      COLOR.er,
      0.38
    )
  }

  private buildVectors() {
    this.rig.clearGroup(this.vectorGroup)
    const point = this.probePoint()
    const er = new THREE.Vector3(Math.cos(PHI), Math.sin(PHI), 0)
    const et = new THREE.Vector3(-Math.sin(PHI), Math.cos(PHI), 0)
    const ez = new THREE.Vector3(0, 0, 1)

    this.addArrow(this.vectorGroup, point, er, 0.8, COLOR.er, 'e_r')
    this.addArrow(this.vectorGroup, point, et, 0.8, COLOR.et, 'e_φ')
    this.addArrow(this.vectorGroup, point, ez, 0.7, COLOR.ez, 'e_z')
  }

  private buildCompose() {
    this.rig.clearGroup(this.composeGroup)
    const point = this.probePoint()
    const radius = this.params.radius

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 8, 128),
      new THREE.MeshBasicMaterial({
        color: COLOR.frame,
        transparent: true,
        opacity: 0.55,
        toneMapped: false,
        depthWrite: false
      })
    )
    ring.position.set(0, 0, point.z)
    ring.userData.baseOpacity = 0.55
    this.composeRing = ring
    this.composeGroup.add(ring)

    this.addLine(
      this.composeGroup,
      this.circlePoints(radius * 0.56, point.z + 0.01, 96),
      COLOR.probe,
      { dashed: true, dashSize: 0.06, gapSize: 0.05, opacity: 0.45 }
    )

    this.addLabel(
      this.composeGroup,
      'Δu',
      new THREE.Vector3(radius + 0.5, 0.05, point.z),
      COLOR.frame,
      0.6
    )
  }

  private buildHelix() {
    this.rig.clearGroup(this.helixGroup)
    const radius = this.params.radius
    const mode = this.params.mode
    const turns = Math.max(0, mode)
    const segments = Math.max(180, 96 * (turns + 1))
    const points: THREE.Vector3[] = []

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = PHI + turns * Math.PI * 2 * t
      const z = -H + H * 2 * t
      points.push(
        new THREE.Vector3(Math.cos(angle) * (radius + 0.03), Math.sin(angle) * (radius + 0.03), z)
      )
    }

    this.addTube(this.helixGroup, points, COLOR.helix, 0.016, 0.7)
    this.addLabel(
      this.helixGroup,
      `m = ${mode}`,
      new THREE.Vector3(
        Math.cos(PHI) * (radius + 0.35),
        Math.sin(PHI) * (radius + 0.35),
        H + 0.18
      ),
      COLOR.helix,
      0.44
    )
  }

  private rebuild() {
    this.buildFrame()
    this.buildProbe()
    this.buildMetric()
    this.buildVectors()
    this.buildCompose()
    this.buildHelix()
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex
    const targets = {
      grid: this.showGrid ? 1 : 0,
      frame: 1,
      probe: i === 0 ? smoothstep(p * 1.05) : 1,
      metric: i === 1 ? smoothstep(p * 1.1) : i >= 2 ? 1 : 0,
      vector: i === 2 ? smoothstep(p * 1.1) : i >= 3 ? 1 : 0,
      compose: i === 3 ? smoothstep(p * 1.15) : i >= 4 ? 1 : 0,
      helix: i >= 4 ? 1 : 0
    }

    this.gridAlpha = THREE.MathUtils.damp(this.gridAlpha, targets.grid, 5, dt)
    this.frameAlpha = THREE.MathUtils.damp(this.frameAlpha, targets.frame, 5, dt)
    this.probeAlpha = THREE.MathUtils.damp(this.probeAlpha, targets.probe, 5, dt)
    this.metricAlpha = THREE.MathUtils.damp(this.metricAlpha, targets.metric, 5, dt)
    this.vectorAlpha = THREE.MathUtils.damp(this.vectorAlpha, targets.vector, 5, dt)
    this.composeAlpha = THREE.MathUtils.damp(this.composeAlpha, targets.compose, 5, dt)
    this.helixAlpha = THREE.MathUtils.damp(this.helixAlpha, targets.helix, 5, dt)

    this.applyAlpha(this.gridGroup, this.gridAlpha)
    this.applyAlpha(this.frameGroup, this.frameAlpha)
    this.applyAlpha(this.probeGroup, this.probeAlpha)
    this.applyAlpha(this.metricGroup, this.metricAlpha)
    this.applyAlpha(this.vectorGroup, this.vectorAlpha)
    this.applyAlpha(this.composeGroup, this.composeAlpha)
    this.applyAlpha(this.helixGroup, this.helixAlpha)

    if (this.probeTip) {
      const pulse = 0.42 + Math.sin(elapsed * 2.6) * 0.05
      this.probeTip.scale.set(pulse, pulse, 1)
      this.probeTip.material.opacity = this.probeAlpha
    }
    if (this.composeRing) {
      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.035
      this.composeRing.scale.setScalar(pulse)
    }
  }

  private applyAlpha(group: THREE.Group, alpha: number) {
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
}
