import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import { VEC_SCALE_DEFAULT, VEC_SPIN_DEFAULT } from '../data/vectorops'

const UP = new THREE.Vector3(0, 1, 0)

const COLOR = {
  gradient: '#74f0c2',
  divergence: '#ffbd70',
  curl: '#b8a2ff',
  compose: '#8fe8ff',
  identity: '#7f9cb5',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [2.8, 2.4, 8.4], look: [0, 0.2, 0] },
  { pos: [3.6, 3.6, 7.2], look: [0, 0.05, 0] },
  { pos: [0.4, 4.4, 7.2], look: [0, 0, 0.1] },
  { pos: [0.3, 1.3, 7.6], look: [0, 0.05, 0.1] },
  { pos: [4.2, 3.4, 7.4], look: [0, 0.1, 0] },
  { pos: [2.6, 2.2, 8.2], look: [0, 0.25, 0.2] }
]

interface ArrowPart {
  group: THREE.Group
  shaft: THREE.Mesh
  head: THREE.Mesh
  dir: THREE.Vector3
  base: number
  current: number
}

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

export class VectorOpsScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly nablaGroup = new THREE.Group()
  private readonly gradGroup = new THREE.Group()
  private readonly divGroup = new THREE.Group()
  private readonly curlGroup = new THREE.Group()
  private readonly composeGroup = new THREE.Group()
  private readonly identityGroup = new THREE.Group()

  private readonly gradArrows: ArrowPart[] = []
  private readonly divArrows: ArrowPart[] = []
  private readonly curlArrows: ArrowPart[] = []
  private readonly curlFlow: THREE.Sprite[] = []
  private readonly labels: THREE.Sprite[] = []

  private curlRing: THREE.Mesh | null = null
  private composeRing: THREE.Mesh | null = null

  private stepIndex = 0
  private progress = 0
  private scale = VEC_SCALE_DEFAULT
  private spin = VEC_SPIN_DEFAULT
  private showLabels = true
  private spinPhase = 0

  private nablaAlpha = 0
  private gradAlpha = 0
  private divAlpha = 0
  private curlAlpha = 0
  private composeAlpha = 0
  private identityAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#10282e',
      bloomStrength: 0.85
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.nablaGroup)
    this.rig.add(this.gradGroup)
    this.rig.add(this.divGroup)
    this.rig.add(this.curlGroup)
    this.rig.add(this.composeGroup)
    this.rig.add(this.identityGroup)

    this.buildAxes()
    this.buildNabla()
    this.buildGradient()
    this.buildDivergence()
    this.buildCurl()
    this.buildCompose()
    this.buildIdentity()

    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const scale = THREE.MathUtils.clamp(params.scale ?? this.scale, 0.5, 2)
    const spin = THREE.MathUtils.clamp(params.spin ?? this.spin, 0, 1)
    if (Math.abs(scale - this.scale) < 1e-6 && Math.abs(spin - this.spin) < 1e-6) {
      return
    }
    this.scale = scale
    this.spin = spin
  }

  setToggle(key: string, value: boolean) {
    if (key === 'showLabels') this.showLabels = value
  }

  dispose() {
    this.rig.dispose()
  }

  private buildAxes() {
    const ext = 2.9
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(-ext, 0, 0), new THREE.Vector3(ext, 0, 0)],
        COLOR.axis,
        { opacity: 0.75 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(0, -ext, 0), new THREE.Vector3(0, ext, 0)],
        COLOR.axis,
        { opacity: 0.75 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.9, 0)],
        COLOR.axis,
        { opacity: 0.6 }
      )
    )

    for (const t of [-2.4, -1.6, -0.8, 0.8, 1.6, 2.4]) {
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(t, -2.4, 0), new THREE.Vector3(t, 2.4, 0)],
          COLOR.grid,
          { opacity: 0.35 }
        )
      )
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(-2.4, t, 0), new THREE.Vector3(2.4, t, 0)],
          COLOR.grid,
          { opacity: 0.35 }
        )
      )
    }

    const xLabel = this.rig.makeTextSprite('x', {
      color: COLOR.tick,
      scale: 0.4,
      fontSize: 44
    })
    xLabel.position.set(ext + 0.18, 0.1, 0.05)
    this.axesGroup.add(xLabel)

    const yLabel = this.rig.makeTextSprite('y', {
      color: COLOR.tick,
      scale: 0.4,
      fontSize: 44
    })
    yLabel.position.set(0.16, ext + 0.16, 0.05)
    this.axesGroup.add(yLabel)

    const zLabel = this.rig.makeTextSprite('z', {
      color: COLOR.tick,
      scale: 0.4,
      fontSize: 44
    })
    zLabel.position.set(0.18, 2.02, 0.05)
    this.axesGroup.add(zLabel)
  }

  private buildNabla() {
    const glow = this.rig.makeGlowSprite(COLOR.compose, 1.5)
    glow.position.set(0, 2.5, 0.02)
    glow.userData.baseAlpha = 0.4
    this.nablaGroup.add(glow)

    this.addLabel(this.nablaGroup, '∇ = (∂x, ∂y, ∂z)', '#bdefff', 1.5, 0, 2.5, 0.12)
    this.addLabel(this.nablaGroup, '三个偏导组成的矢量算子', 'rgba(143, 232, 255, 0.6)', 1.0, 0, 2.08, 0.12)
  }

  private buildGradient() {
    const levels = [0.35, 0.7, 1.05, 1.4, 1.75]
    for (let k = 0; k < levels.length; k++) {
      const radius = levels[k]
      const points: THREE.Vector3[] = []
      for (let s = 0; s <= 72; s++) {
        const angle = (s / 72) * Math.PI * 2
        points.push(
          new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.012)
        )
      }
      this.gradGroup.add(
        this.rig.makeLine(points, COLOR.gradient, { opacity: 0.16 + k * 0.07 })
      )
    }

    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const x = ix * 0.8
        const y = iy * 0.8
        const radius = Math.hypot(x, y)
        if (radius < 0.05) continue
        const base = Math.min(0.5, 0.1 + radius * 0.16)
        const dir = new THREE.Vector3(x, y, 0).normalize()
        this.addArrow(
          this.gradGroup,
          this.gradArrows,
          COLOR.gradient,
          dir,
          base,
          new THREE.Vector3(x, y, 0.02)
        )
      }
    }

    this.addLabel(this.gradGroup, 'φ = x² + y²', '#baffeb', 0.9, -2.25, 1.55, 0.12)
    this.addLabel(this.gradGroup, '∇f', '#74f0c2', 1.0, 2.02, 1.62, 0.12)
    this.addLabel(this.gradGroup, '梯度 · 最陡上升', 'rgba(116, 240, 194, 0.62)', 0.9, 1.55, 1.22, 0.12)
  }

  private buildDivergence() {
    const glow = this.rig.makeGlowSprite(COLOR.divergence, 1.1)
    glow.position.set(0, 0, 0.03)
    glow.userData.baseAlpha = 0.7
    this.divGroup.add(glow)

    const ringPoints: THREE.Vector3[] = []
    for (let s = 0; s <= 72; s++) {
      const angle = (s / 72) * Math.PI * 2
      ringPoints.push(new THREE.Vector3(Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, 0.012))
    }
    this.divGroup.add(
      this.rig.makeLine(ringPoints, COLOR.divergence, {
        dashed: true,
        dashSize: 0.1,
        gapSize: 0.08,
        opacity: 0.28
      })
    )

    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const x = ix * 0.8
        const y = iy * 0.8
        const radius = Math.hypot(x, y)
        if (radius < 0.05) continue
        const base = Math.min(0.48, 0.1 + radius * 0.15)
        const dir = new THREE.Vector3(x, y, 0).normalize()
        this.addArrow(
          this.divGroup,
          this.divArrows,
          COLOR.divergence,
          dir,
          base,
          new THREE.Vector3(x, y, 0.02)
        )
      }
    }

    this.addLabel(this.divGroup, 'div F = 2', '#ffd6a0', 1.0, 2.0, 1.62, 0.12)
    this.addLabel(this.divGroup, '源', '#ffbd70', 0.72, 0.16, 0.3, 0.16)
    this.addLabel(this.divGroup, 'F = (x, y, 0)', 'rgba(255, 189, 112, 0.66)', 0.9, 1.5, 1.24, 0.12)
  }

  private buildCurl() {
    for (const radius of [0.65, 1.25, 1.8]) {
      const points: THREE.Vector3[] = []
      for (let s = 0; s <= 72; s++) {
        const angle = (s / 72) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.012))
      }
      this.curlGroup.add(
        this.rig.makeLine(points, COLOR.curl, { opacity: 0.2 })
      )
    }

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLOR.curl),
      transparent: true,
      opacity: 0.5,
      toneMapped: false,
      depthWrite: false
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.018, 8, 120), ringMaterial)
    ring.userData.baseOpacity = 0.5
    ring.position.z = 0.03
    this.curlRing = ring
    this.curlGroup.add(ring)

    for (let k = 0; k < 4; k++) {
      const dot = this.rig.makeGlowSprite(COLOR.curl, 0.42)
      dot.position.set(Math.cos((k * Math.PI) / 2) * 1.35, Math.sin((k * Math.PI) / 2) * 1.35, 0.06)
      dot.userData.baseAlpha = 0.75
      this.curlFlow.push(dot)
      this.curlGroup.add(dot)
    }

    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const x = ix * 0.8
        const y = iy * 0.8
        if (Math.hypot(x, y) < 0.3) continue
        const dir = new THREE.Vector3(-y, x, 0).normalize()
        this.addArrow(
          this.curlGroup,
          this.curlArrows,
          COLOR.curl,
          dir,
          0.4,
          new THREE.Vector3(x, y, 0.02)
        )
      }
    }

    this.addLabel(this.curlGroup, 'curl F = (0, 0, 2)', '#d5c8ff', 1.0, 1.85, 1.62, 0.12)
    this.addLabel(this.curlGroup, '环流 · 绕 z 轴', 'rgba(184, 162, 255, 0.66)', 0.9, 1.5, 1.24, 0.12)
    this.addLabel(this.curlGroup, 'F = (−y, x, 0)', '#b8a2ff', 0.9, -2.3, 1.55, 0.12)
  }

  private buildCompose() {
    const glow = this.rig.makeGlowSprite(COLOR.compose, 0.9)
    glow.position.set(0, 0, 0.04)
    glow.userData.baseAlpha = 0.5
    this.composeGroup.add(glow)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLOR.compose),
      transparent: true,
      opacity: 0.55,
      toneMapped: false,
      depthWrite: false
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.016, 8, 120), ringMaterial)
    ring.userData.baseOpacity = 0.55
    ring.position.z = 0.04
    this.composeRing = ring
    this.composeGroup.add(ring)

    const dashed: THREE.Vector3[] = []
    for (let s = 0; s <= 72; s++) {
      const angle = (s / 72) * Math.PI * 2
      dashed.push(new THREE.Vector3(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.012))
    }
    this.composeGroup.add(
      this.rig.makeLine(dashed, COLOR.compose, {
        dashed: true,
        dashSize: 0.09,
        gapSize: 0.08,
        opacity: 0.26
      })
    )

    this.addLabel(this.composeGroup, 'Δf = div(∇f)', '#bdefff', 1.2, 0, 2.15, 0.14)
    this.addLabel(this.composeGroup, '先梯度，再散度', 'rgba(143, 232, 255, 0.62)', 0.9, 0, 1.76, 0.14)
  }

  private buildIdentity() {
    this.addLabel(this.identityGroup, 'curl(∇φ) = 0', '#bdefff', 1.0, -1.95, 2.05, 0.14)
    this.addLabel(this.identityGroup, 'div(∇×F) = 0', '#d5c8ff', 1.0, 1.0, 2.05, 0.14)
    this.addLabel(this.identityGroup, '混合偏导成对抵消', 'rgba(127, 156, 181, 0.8)', 0.95, 0, 1.62, 0.14)
    this.addLabel(this.identityGroup, '梯度场无旋', 'rgba(116, 240, 194, 0.7)', 0.85, -2.05, 0.25, 0.14)
    this.addLabel(this.identityGroup, '旋度场无源', 'rgba(184, 162, 255, 0.7)', 0.85, 2.05, 0.25, 0.14)
  }

  private addLabel(
    group: THREE.Group,
    text: string,
    color: string,
    scale: number,
    x: number,
    y: number,
    z: number
  ) {
    const sprite = this.rig.makeTextSprite(text, {
      color,
      scale,
      fontSize: 42,
      weight: 500
    })
    sprite.position.set(x, y, z)
    sprite.userData.baseAlpha = 1
    group.add(sprite)
    this.labels.push(sprite)
  }

  private addArrow(
    group: THREE.Group,
    list: ArrowPart[],
    color: string,
    dir: THREE.Vector3,
    base: number,
    origin: THREE.Vector3
  ) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      toneMapped: false
    })
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 1, 6), material)
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 8), material)
    shaft.userData.baseOpacity = 0.9
    head.userData.baseOpacity = 0.9

    const arrow = new THREE.Group()
    arrow.add(shaft, head)
    arrow.position.copy(origin)
    group.add(arrow)

    const part: ArrowPart = {
      group: arrow,
      shaft,
      head,
      dir: dir.clone(),
      base,
      current: base * 0.35
    }
    this.orientArrow(part, part.dir, part.current)
    list.push(part)
  }

  private orientArrow(part: ArrowPart, dir: THREE.Vector3, length: number) {
    const len = Math.max(0.03, length)
    const headLen = Math.min(0.16, len * 0.45)
    part.shaft.scale.y = Math.max(0.001, len - headLen)
    part.shaft.position.y = (len - headLen) * 0.5
    part.head.scale.y = headLen / 0.16
    part.head.position.y = len - headLen * 0.5
    part.group.quaternion.setFromUnitVectors(UP, dir)
  }

  private updateArrows(list: ArrowPart[], factor: number, dt: number) {
    for (const part of list) {
      const target = part.base * factor
      part.current = THREE.MathUtils.damp(part.current, target, 6, dt)
      this.orientArrow(part, part.dir, part.current)
    }
  }

  private applyAlpha(group: THREE.Group, alpha: number) {
    group.visible = alpha > 0.01
    group.traverse((object) => {
      if (object instanceof THREE.Sprite) {
        const base = (object.userData.baseAlpha as number) ?? 1
        object.material.opacity = alpha * base
        return
      }
      const mesh = object as THREE.Mesh
      const material = mesh.material
      if (Array.isArray(material)) {
        for (const item of material) {
          if (mesh.userData.baseOpacity === undefined) {
            mesh.userData.baseOpacity = item.opacity
          }
          item.opacity = alpha * (mesh.userData.baseOpacity as number)
        }
        return
      }
      if (material && 'opacity' in material) {
        if (mesh.userData.baseOpacity === undefined) {
          mesh.userData.baseOpacity = material.opacity
        }
        ;(material as THREE.MeshBasicMaterial).opacity =
          alpha * (mesh.userData.baseOpacity as number)
      }
    })
  }

  private tick(dt: number, elapsed: number) {
    const p = smoothstep(this.progress)
    const i = this.stepIndex
    const targets = {
      nabla: i === 0 ? 0.4 + 0.6 * p : i === 6 ? 0.45 : 0,
      grad: i === 1 ? 0.4 + 0.6 * p : i === 4 ? 0.7 : i === 5 ? 0.3 : i === 6 ? 1 : 0,
      div: i === 2 ? 0.4 + 0.6 * p : i === 4 ? 0.3 : i === 6 ? 1 : 0,
      curl: i === 3 ? 0.4 + 0.6 * p : i === 5 ? 0.3 : i === 6 ? 1 : 0,
      compose: i === 4 ? 0.4 + 0.6 * p : i === 6 ? 0.3 : 0,
      identity: i === 5 ? 0.4 + 0.6 * p : 0
    }

    this.nablaAlpha = THREE.MathUtils.damp(this.nablaAlpha, targets.nabla, 5, dt)
    this.gradAlpha = THREE.MathUtils.damp(this.gradAlpha, targets.grad, 5, dt)
    this.divAlpha = THREE.MathUtils.damp(this.divAlpha, targets.div, 5, dt)
    this.curlAlpha = THREE.MathUtils.damp(this.curlAlpha, targets.curl, 5, dt)
    this.composeAlpha = THREE.MathUtils.damp(this.composeAlpha, targets.compose, 5, dt)
    this.identityAlpha = THREE.MathUtils.damp(this.identityAlpha, targets.identity, 5, dt)

    this.applyAlpha(this.nablaGroup, this.nablaAlpha)
    this.applyAlpha(this.gradGroup, this.gradAlpha)
    this.applyAlpha(this.divGroup, this.divAlpha)
    this.applyAlpha(this.curlGroup, this.curlAlpha)
    this.applyAlpha(this.composeGroup, this.composeAlpha)
    this.applyAlpha(this.identityGroup, this.identityAlpha)

    this.spinPhase += dt * (0.25 + this.spin * 1.3)

    const gradGrow = i === 1 ? 0.5 + 0.5 * p : 1
    const divGrow = i === 2 ? 0.5 + 0.5 * p : 1
    const curlGrow = i === 3 ? 0.5 + 0.5 * p : 1
    this.updateArrows(this.gradArrows, this.scale * gradGrow, dt)
    this.updateArrows(this.divArrows, this.scale * divGrow, dt)
    this.updateArrows(this.curlArrows, this.scale * curlGrow, dt)

    for (let k = 0; k < this.curlFlow.length; k++) {
      const angle = this.spinPhase + (k * Math.PI) / 2
      this.curlFlow[k].position.set(Math.cos(angle) * 1.35, Math.sin(angle) * 1.35, 0.06)
    }

    if (this.curlRing) this.curlRing.rotation.z = this.spinPhase * 0.35
    if (this.composeRing) this.composeRing.rotation.z = elapsed * 0.25

    for (const label of this.labels) {
      label.visible = this.showLabels
    }
  }
}
