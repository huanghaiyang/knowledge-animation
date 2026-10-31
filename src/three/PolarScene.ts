import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import { POLAR_DEFAULT_M, POLAR_DEFAULT_R0, POLAR_R_MAX } from '../data/polar'

const THETA = Math.PI / 4

const COLOR = {
  grid: '#1c3a48',
  gridOuter: '#2c5d6c',
  axis: '#3d5870',
  tick: '#7c93a9',
  probe: '#8fe8ff',
  er: '#ffbd70',
  et: '#b8a2ff',
  second: '#8fe8ff',
  field: '#74f0c2',
  fieldNeg: '#8f7bff',
  text: '#8fa4b8'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.3, 0.4, 9.8], look: [0.3, 0.15, 0] },
  { pos: [0.4, 0.7, 9.3], look: [0.3, 0.2, 0] },
  { pos: [0.5, 1.0, 9.0], look: [0.3, 0.25, 0] },
  { pos: [0.5, 0.8, 8.8], look: [0.3, 0.2, 0] },
  { pos: [1.1, 1.5, 8.9], look: [0.4, 0.3, 0] },
  { pos: [0.8, 1.1, 9.6], look: [0.35, 0.2, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

const fmt = (value: number) => value.toFixed(2)

export class PolarScene implements LessonScene {
  private readonly rig: StageRig
  private readonly gridGroup = new THREE.Group()
  private readonly axisGroup = new THREE.Group()
  private readonly fieldGroup = new THREE.Group()
  private readonly probeGroup = new THREE.Group()
  private readonly vectorGroup = new THREE.Group()
  private readonly secondGroup = new THREE.Group()
  private readonly composeGroup = new THREE.Group()

  private params = { r0: POLAR_DEFAULT_R0, m: POLAR_DEFAULT_M }
  private stepIndex = 0
  private progress = 0
  private showGrid = true
  private probeDirty = false
  private fieldDirty = false

  private gridAlpha = 1
  private axisAlpha = 1
  private probeAlpha = 0
  private vectorAlpha = 0
  private secondAlpha = 0
  private composeAlpha = 0
  private fieldAlpha = 0

  private probeTip: THREE.Sprite | null = null
  private composeRing: THREE.Mesh | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#0e2430',
      bloomStrength: 0.78
    })
    this.rig.add(this.fieldGroup)
    this.rig.add(this.gridGroup)
    this.rig.add(this.axisGroup)
    this.rig.add(this.probeGroup)
    this.rig.add(this.vectorGroup)
    this.rig.add(this.secondGroup)
    this.rig.add(this.composeGroup)

    this.buildGrid()
    this.buildAxes()
    this.buildField()
    this.buildProbe()
    this.buildVectors()
    this.buildSecond()
    this.buildCompose()

    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const r0 = THREE.MathUtils.clamp(params.r0 ?? this.params.r0, 0.2, 2.5)
    const m = Math.round(THREE.MathUtils.clamp(params.m ?? this.params.m, 0, 4))
    if (Math.abs(r0 - this.params.r0) < 1e-6 && m === this.params.m) return

    const probeChanged = Math.abs(r0 - this.params.r0) > 1e-6
    const fieldChanged = m !== this.params.m
    this.params = { r0, m }
    if (probeChanged) this.probeDirty = true
    if (fieldChanged) this.fieldDirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'showGrid') this.showGrid = value
  }

  dispose() {
    this.rig.dispose()
  }

  private circlePoints(radius: number, z = 0.03, segments = 120) {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
    }
    return points
  }

  private probePoint() {
    const { r0 } = this.params
    return new THREE.Vector3(r0 * Math.cos(THETA), r0 * Math.sin(THETA), 0.06)
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
    sprite.position.z += 0.02
    group.add(sprite)
  }

  private buildGrid() {
    this.rig.clearGroup(this.gridGroup)
    const radii = [0.8, 1.6, 2.4, POLAR_R_MAX]
    for (let i = 0; i < radii.length; i++) {
      const outer = i === radii.length - 1
      this.addLine(
        this.gridGroup,
        this.circlePoints(radii[i]),
        outer ? COLOR.gridOuter : COLOR.grid,
        { opacity: outer ? 0.55 : 0.4 }
      )
    }

    const rays = 12
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2
      const end = new THREE.Vector3(
        Math.cos(angle) * POLAR_R_MAX,
        Math.sin(angle) * POLAR_R_MAX,
        0.02
      )
      this.addLine(this.gridGroup, [new THREE.Vector3(0, 0, 0.02), end], COLOR.grid, {
        dashed: true,
        dashSize: 0.08,
        gapSize: 0.07,
        opacity: 0.34
      })
    }

    this.addLabel(
      this.gridGroup,
      '0°',
      new THREE.Vector3(POLAR_R_MAX + 0.3, 0.05, 0.04),
      COLOR.tick,
      0.38
    )
    this.addLabel(
      this.gridGroup,
      '90°',
      new THREE.Vector3(0.12, POLAR_R_MAX + 0.3, 0.04),
      COLOR.tick,
      0.38
    )
    this.addLabel(
      this.gridGroup,
      '180°',
      new THREE.Vector3(-POLAR_R_MAX - 0.42, 0.05, 0.04),
      COLOR.tick,
      0.38
    )
    this.addLabel(
      this.gridGroup,
      '270°',
      new THREE.Vector3(0.12, -POLAR_R_MAX - 0.32, 0.04),
      COLOR.tick,
      0.38
    )
  }

  private buildAxes() {
    this.rig.clearGroup(this.axisGroup)
    const span = POLAR_R_MAX + 0.55
    this.addLine(
      this.axisGroup,
      [new THREE.Vector3(-span, 0, 0.04), new THREE.Vector3(span, 0, 0.04)],
      COLOR.axis,
      { opacity: 0.75 }
    )
    this.addLine(
      this.axisGroup,
      [new THREE.Vector3(0, -span, 0.04), new THREE.Vector3(0, span, 0.04)],
      COLOR.axis,
      { opacity: 0.75 }
    )
    this.addLabel(
      this.axisGroup,
      'x',
      new THREE.Vector3(span + 0.12, 0.02, 0.05),
      COLOR.text,
      0.42
    )
    this.addLabel(
      this.axisGroup,
      'y',
      new THREE.Vector3(0.14, span + 0.12, 0.05),
      COLOR.text,
      0.42
    )
  }

  private buildProbe() {
    this.rig.clearGroup(this.probeGroup)
    const { r0 } = this.params
    const point = this.probePoint()
    const x = point.x
    const y = point.y

    this.addTube(this.probeGroup, this.circlePoints(r0, 0.06), COLOR.probe, 0.014, 0.7)

    this.addLine(this.probeGroup, [point, new THREE.Vector3(x, 0, 0.06)], COLOR.et, {
      dashed: true,
      dashSize: 0.07,
      gapSize: 0.055,
      opacity: 0.6
    })
    this.addLine(this.probeGroup, [point, new THREE.Vector3(0, y, 0.06)], COLOR.er, {
      dashed: true,
      dashSize: 0.07,
      gapSize: 0.055,
      opacity: 0.6
    })
    this.addLine(
      this.probeGroup,
      [new THREE.Vector3(0, 0, 0.06), point],
      COLOR.er,
      { dashed: true, dashSize: 0.08, gapSize: 0.06, opacity: 0.7 }
    )

    const arcRadius = Math.min(0.55, r0 * 0.62)
    const arcPoints: THREE.Vector3[] = []
    const arcSegments = 36
    for (let i = 0; i <= arcSegments; i++) {
      const angle = (i / arcSegments) * THETA
      arcPoints.push(
        new THREE.Vector3(Math.cos(angle) * arcRadius, Math.sin(angle) * arcRadius, 0.06)
      )
    }
    this.addLine(this.probeGroup, arcPoints, COLOR.probe, { opacity: 0.85 })

    this.addLabel(
      this.probeGroup,
      'P',
      new THREE.Vector3(x + 0.2, y + 0.2, 0.08),
      COLOR.probe,
      0.4
    )
    this.addLabel(
      this.probeGroup,
      `r = ${fmt(r0)}`,
      new THREE.Vector3(x * 0.48, y * 0.48 - 0.2, 0.08),
      COLOR.er,
      0.44
    )
    this.addLabel(
      this.probeGroup,
      'θ',
      new THREE.Vector3(
        Math.cos(THETA * 0.5) * (arcRadius + 0.18),
        Math.sin(THETA * 0.5) * (arcRadius + 0.18),
        0.08
      ),
      COLOR.probe,
      0.36
    )
    this.addLabel(
      this.probeGroup,
      'r cos θ',
      new THREE.Vector3(x, -0.26, 0.08),
      COLOR.et,
      0.34
    )
    this.addLabel(
      this.probeGroup,
      'r sin θ',
      new THREE.Vector3(-0.62, y, 0.08),
      COLOR.er,
      0.34
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
    marker.position.copy(point).setZ(0.08)
    marker.userData.baseOpacity = 0.9
    this.probeGroup.add(marker)

    const tip = this.rig.makeGlowSprite('#9dffe0', 0.48)
    tip.position.copy(point).setZ(0.1)
    this.probeTip = tip
    this.probeGroup.add(tip)
  }

  private buildVectors() {
    this.rig.clearGroup(this.vectorGroup)
    const point = this.probePoint()
    const er = new THREE.Vector3(Math.cos(THETA), Math.sin(THETA), 0)
    const et = new THREE.Vector3(-Math.sin(THETA), Math.cos(THETA), 0)

    this.addArrow(this.vectorGroup, point, er, 0.85, COLOR.er, 'e_r')
    this.addArrow(this.vectorGroup, point, et, 0.85, COLOR.et, 'e_θ')
  }

  private buildSecond() {
    this.rig.clearGroup(this.secondGroup)
    const point = this.probePoint()
    const er = new THREE.Vector3(Math.cos(THETA), Math.sin(THETA), 0)
    const et = new THREE.Vector3(-Math.sin(THETA), Math.cos(THETA), 0)

    this.addArrow(this.secondGroup, point, et, 0.62, COLOR.et, '∂θ e_r')
    this.addArrow(this.secondGroup, point, er.clone().negate(), 0.62, COLOR.second, '∂θ e_θ')

    const arcPoints: THREE.Vector3[] = []
    const arcSegments = 30
    for (let i = 0; i <= arcSegments; i++) {
      const angle = THETA + (i / arcSegments) * Math.PI * 0.5
      arcPoints.push(
        new THREE.Vector3(
          point.x + Math.cos(angle) * 0.26,
          point.y + Math.sin(angle) * 0.26,
          0.1
        )
      )
    }
    this.addLine(this.secondGroup, arcPoints, COLOR.second, { opacity: 0.5 })
  }

  private buildCompose() {
    this.rig.clearGroup(this.composeGroup)
    const { r0 } = this.params

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r0, 0.012, 8, 128),
      new THREE.MeshBasicMaterial({
        color: COLOR.field,
        transparent: true,
        opacity: 0.55,
        toneMapped: false,
        depthWrite: false
      })
    )
    ring.position.z = 0.07
    ring.userData.baseOpacity = 0.55
    this.composeRing = ring
    this.composeGroup.add(ring)

    this.addLine(
      this.composeGroup,
      this.circlePoints(r0 * 0.56, 0.07, 96),
      COLOR.probe,
      { dashed: true, dashSize: 0.06, gapSize: 0.05, opacity: 0.45 }
    )

    const label = this.addLabel(
      this.composeGroup,
      'Δf',
      new THREE.Vector3(
        r0 * Math.cos(THETA) + 0.35,
        r0 * Math.sin(THETA) + 0.32,
        0.09
      ),
      COLOR.field,
      0.62
    )
    label.userData.baseOpacity = 0.9
  }

  private buildField() {
    this.rig.clearGroup(this.fieldGroup)
    const size = 6.4
    const segments = 72
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
    const position = geometry.getAttribute('position') as THREE.BufferAttribute
    const colors = new Float32Array(position.count * 3)
    const positive = new THREE.Color(COLOR.field)
    const negative = new THREE.Color(COLOR.fieldNeg)
    const neutral = new THREE.Color('#162c3a')
    const sample = new THREE.Color()
    const m = this.params.m

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)
      const radius = Math.hypot(x, y)
      const ratio = Math.min(radius / POLAR_R_MAX, 1)
      const angle = Math.atan2(y, x)
      const value =
        m === 0
          ? 1
          : Math.pow(ratio, m) * Math.cos(m * angle)
      position.setZ(i, -0.22 + value * 0.42)

      sample.copy(neutral).lerp(value >= 0 ? positive : negative, Math.min(1, Math.abs(value)))
      colors[i * 3] = sample.r
      colors[i * 3 + 1] = sample.g
      colors[i * 3 + 2] = sample.b
    }

    position.needsUpdate = true
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.renderOrder = 1
    mesh.userData.baseOpacity = 0.18
    this.fieldGroup.add(mesh)
  }

  private tick(dt: number, elapsed: number) {
    if (this.probeDirty) {
      this.probeDirty = false
      this.buildProbe()
      this.buildVectors()
      this.buildSecond()
      this.buildCompose()
    }
    if (this.fieldDirty) {
      this.fieldDirty = false
      this.buildField()
    }

    const p = smoothstep(this.progress)
    const i = this.stepIndex
    const targets = {
      grid: this.showGrid ? 1 : 0,
      axis: 1,
      probe: i === 0 ? smoothstep(p * 1.05) : 1,
      vector: i === 1 ? smoothstep(p * 1.1) : i >= 2 ? 1 : 0,
      second: i === 2 ? smoothstep(p * 1.15) : i >= 3 ? 1 : 0,
      compose: i === 3 ? smoothstep(p * 1.15) : i >= 4 ? 1 : 0,
      field: i >= 4 ? 1 : 0
    }

    this.gridAlpha = THREE.MathUtils.damp(this.gridAlpha, targets.grid, 5, dt)
    this.axisAlpha = THREE.MathUtils.damp(this.axisAlpha, targets.axis, 5, dt)
    this.probeAlpha = THREE.MathUtils.damp(this.probeAlpha, targets.probe, 5, dt)
    this.vectorAlpha = THREE.MathUtils.damp(this.vectorAlpha, targets.vector, 5, dt)
    this.secondAlpha = THREE.MathUtils.damp(this.secondAlpha, targets.second, 5, dt)
    this.composeAlpha = THREE.MathUtils.damp(this.composeAlpha, targets.compose, 5, dt)
    this.fieldAlpha = THREE.MathUtils.damp(this.fieldAlpha, targets.field, 5, dt)

    this.applyAlpha(this.gridGroup, this.gridAlpha)
    this.applyAlpha(this.axisGroup, this.axisAlpha)
    this.applyAlpha(this.fieldGroup, this.fieldAlpha)
    this.applyAlpha(this.probeGroup, this.probeAlpha)
    this.applyAlpha(this.vectorGroup, this.vectorAlpha)
    this.applyAlpha(this.secondGroup, this.secondAlpha)
    this.applyAlpha(this.composeGroup, this.composeAlpha)

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
