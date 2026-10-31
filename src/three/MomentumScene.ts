import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import { MOMENTUM_BOX, MOMENTUM_DEFAULT_AMP, MOMENTUM_DEFAULT_K } from '../data/momentum'

const X_MIN = -3.2
const X_MAX = 3.2
const Y_MIN = -2
const Y_MAX = 2
const SEGMENTS = 220
const K2_RATIO = 1.35
const TIME_SCALE = 0.35

const COLOR = {
  helix: '#74f0c2',
  real: '#74f0c2',
  imag: '#ffbd70',
  modulus: '#8fe8ff',
  second: '#b8a2ff',
  beat: '#8fe8ff',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9',
  marker: '#e7fff7'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [4.8, 2.4, 7.8], look: [0, 0, 0] },
  { pos: [0.9, 1.2, 10], look: [0.2, 0, 0] },
  { pos: [-4.6, 2.2, 8], look: [0, 0.1, 0] },
  { pos: [4.2, 4.4, 7.6], look: [0, 0.1, 0] },
  { pos: [2.4, 0.4, 9.4], look: [0, 0, 0.2] },
  { pos: [0.9, 1.4, 9.8], look: [0.2, 0.1, 0] }
]

function smoothstep(value: number) {
  const x = THREE.MathUtils.clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

export class MomentumScene implements LessonScene {
  private readonly rig: StageRig
  private readonly axesGroup = new THREE.Group()
  private readonly helixGroup = new THREE.Group()
  private readonly projectionGroup = new THREE.Group()
  private readonly modulusGroup = new THREE.Group()
  private readonly secondWaveGroup = new THREE.Group()
  private readonly beatGroup = new THREE.Group()

  private params = { k: MOMENTUM_DEFAULT_K, amp: MOMENTUM_DEFAULT_AMP }
  private stepIndex = 0
  private progress = 0
  private realImag = true
  private dirty = false

  private marker: THREE.Sprite | null = null
  private realLine: THREE.Line | null = null
  private imagLine: THREE.Line | null = null
  private compositeLine: THREE.Line | null = null
  private envelopeUp: THREE.Line | null = null
  private envelopeDown: THREE.Line | null = null

  private helixAlpha = 0
  private projectionAlpha = 0
  private modulusAlpha = 0
  private secondAlpha = 0
  private beatAlpha = 0

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#12242e',
      bloomStrength: 0.85
    })
    this.rig.add(this.axesGroup)
    this.rig.add(this.helixGroup)
    this.rig.add(this.projectionGroup)
    this.rig.add(this.modulusGroup)
    this.rig.add(this.secondWaveGroup)
    this.rig.add(this.beatGroup)

    this.buildAxes()
    this.buildHelix()
    this.buildProjection()
    this.buildSecondWave()
    this.buildModulus()
    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    const next = {
      k: THREE.MathUtils.clamp(params.k ?? this.params.k, 0.2, 4),
      amp: THREE.MathUtils.clamp(params.amp ?? this.params.amp, 0.1, 2)
    }
    if (Math.abs(next.k - this.params.k) < 1e-6 && Math.abs(next.amp - this.params.amp) < 1e-6) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, value: boolean) {
    if (key === 'realImag') this.realImag = value
  }

  dispose() {
    this.rig.dispose()
  }

  private buildAxes() {
    this.rig.clearGroup(this.axesGroup)

    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, 0, 0), new THREE.Vector3(X_MAX, 0, 0)],
        COLOR.axis,
        { opacity: 0.75 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, Y_MIN, 0), new THREE.Vector3(X_MIN, Y_MAX, 0)],
        COLOR.axis,
        { opacity: 0.75 }
      )
    )
    this.axesGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, 0, -1.8), new THREE.Vector3(X_MIN, 0, 1.8)],
        COLOR.axis,
        { opacity: 0.55, dashed: true, dashSize: 0.08, gapSize: 0.06 }
      )
    )

    for (let i = -3; i <= 3; i++) {
      const x = i
      this.axesGroup.add(
        this.rig.makeLine(
          [new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, -0.08, 0)],
          COLOR.axis,
          { opacity: 0.7 }
        )
      )
      const label = this.rig.makeTextSprite(`${i}`, {
        color: COLOR.tick,
        scale: 0.32,
        fontSize: 48
      })
      label.position.set(x, -0.25, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.rig.makeTextSprite('x', {
      color: '#8fa4b8',
      scale: 0.42,
      fontSize: 48
    })
    xTitle.position.set(X_MAX - 0.05, -0.55, 0.02)
    this.axesGroup.add(xTitle)

    const realTitle = this.rig.makeTextSprite('Re ψ', {
      color: '#baffeb',
      scale: 0.5,
      fontSize: 44
    })
    realTitle.position.set(X_MIN - 1.05, Y_MAX - 0.3, 0.02)
    realTitle.material.rotation = Math.PI / 2
    this.axesGroup.add(realTitle)

    const imagTitle = this.rig.makeTextSprite('Im ψ', {
      color: '#ffd7a6',
      scale: 0.5,
      fontSize: 44
    })
    imagTitle.position.set(X_MIN - 0.1, 0.1, 1.95)
    this.axesGroup.add(imagTitle)
  }

  private buildHelix() {
    this.rig.clearGroup(this.helixGroup)
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= SEGMENTS; i++) {
      const x = X_MIN + (i / SEGMENTS) * (X_MAX - X_MIN)
      const theta = this.params.k * x
      points.push(new THREE.Vector3(x, this.params.amp * Math.cos(theta), this.params.amp * Math.sin(theta)))
    }
    this.helixGroup.add(this.rig.makeTube(points, COLOR.helix, 0.024, 0.95))

    this.marker = this.rig.makeGlowSprite(COLOR.marker, 0.46)
    this.marker.position.set(X_MIN, this.params.amp, 0)
    this.helixGroup.add(this.marker)
  }

  private buildProjection() {
    this.rig.clearGroup(this.projectionGroup)
    this.realLine = this.makeDynamicLine(this.projectionGroup, COLOR.real, 0.9)
    this.imagLine = this.makeDynamicLine(this.projectionGroup, COLOR.imag, 0.85)

    const realLabel = this.rig.makeTextSprite('实部 cos(kx − ωt)', {
      color: '#baffeb',
      scale: 0.52,
      fontSize: 40
    })
    realLabel.position.set(X_MAX - 1.55, 0.62, 0.04)
    this.projectionGroup.add(realLabel)

    const imagLabel = this.rig.makeTextSprite('虚部 sin(kx − ωt)', {
      color: '#ffd7a6',
      scale: 0.52,
      fontSize: 40
    })
    imagLabel.position.set(X_MAX - 1.55, 0.08, 1.15)
    this.projectionGroup.add(imagLabel)
  }

  private buildSecondWave() {
    this.rig.clearGroup(this.secondWaveGroup)
    this.rig.clearGroup(this.beatGroup)

    const k2 = this.params.k * K2_RATIO
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= SEGMENTS; i++) {
      const x = X_MIN + (i / SEGMENTS) * (X_MAX - X_MIN)
      const theta = k2 * x
      points.push(new THREE.Vector3(x, this.params.amp * Math.cos(theta), this.params.amp * Math.sin(theta)))
    }
    this.secondWaveGroup.add(this.rig.makeTube(points, COLOR.second, 0.016, 0.6))

    const secondLabel = this.rig.makeTextSprite(`k₂ = ${K2_RATIO} k`, {
      color: '#d5c8ff',
      scale: 0.5,
      fontSize: 42
    })
    secondLabel.position.set(X_MIN + 0.1, Y_MAX - 0.65, 0.6)
    this.beatGroup.add(secondLabel)

    this.compositeLine = this.makeDynamicLine(this.beatGroup, COLOR.beat, 0.85)
    this.envelopeUp = this.makeDynamicLine(this.beatGroup, COLOR.beat, 0.28)
    this.envelopeDown = this.makeDynamicLine(this.beatGroup, COLOR.beat, 0.28)

    const beatLabel = this.rig.makeTextSprite('合成实部 · 拍频包络', {
      color: '#bfefff',
      scale: 0.55,
      fontSize: 40
    })
    beatLabel.position.set(0.2, -1.68, 0.04)
    this.beatGroup.add(beatLabel)
  }

  private buildModulus() {
    this.rig.clearGroup(this.modulusGroup)
    const amp = this.params.amp
    this.modulusGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, amp, 0.03), new THREE.Vector3(X_MAX, amp, 0.03)],
        COLOR.modulus,
        { dashed: true, dashSize: 0.09, gapSize: 0.07, opacity: 0.6 }
      )
    )
    this.modulusGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, -amp, 0.03), new THREE.Vector3(X_MAX, -amp, 0.03)],
        COLOR.modulus,
        { dashed: true, dashSize: 0.09, gapSize: 0.07, opacity: 0.6 }
      )
    )
    this.modulusGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MIN, Y_MIN, 0.03), new THREE.Vector3(X_MIN, Y_MAX, 0.03)],
        COLOR.modulus,
        { dashed: true, dashSize: 0.06, gapSize: 0.05, opacity: 0.45 }
      )
    )
    this.modulusGroup.add(
      this.rig.makeLine(
        [new THREE.Vector3(X_MAX, Y_MIN, 0.03), new THREE.Vector3(X_MAX, Y_MAX, 0.03)],
        COLOR.modulus,
        { dashed: true, dashSize: 0.06, gapSize: 0.05, opacity: 0.45 }
      )
    )

    const modulusLabel = this.rig.makeTextSprite(`|ψ| = ${amp.toFixed(2)}`, {
      color: '#bfefff',
      scale: 0.52,
      fontSize: 42
    })
    modulusLabel.position.set(1.35, amp + 0.22, 0.06)
    this.modulusGroup.add(modulusLabel)

    const boxLabel = this.rig.makeTextSprite(`箱长 L = ${MOMENTUM_BOX.toFixed(2)}`, {
      color: 'rgba(191, 239, 255, 0.66)',
      scale: 0.5,
      fontSize: 40
    })
    boxLabel.position.set(0, Y_MAX - 0.28, 0.06)
    this.modulusGroup.add(boxLabel)
  }

  private makeDynamicLine(group: THREE.Group, color: string, opacity: number) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array((SEGMENTS + 1) * 3), 3)
    )
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      toneMapped: false
    })
    const line = new THREE.Line(geometry, material)
    line.renderOrder = 3
    line.frustumCulled = false
    line.userData.baseOpacity = opacity
    group.add(line)
    return line
  }

  private writeLine(
    line: THREE.Line,
    yOf: (x: number) => number,
    zOf: (x: number) => number
  ) {
    const attr = line.geometry.getAttribute('position') as THREE.BufferAttribute
    const array = attr.array as Float32Array
    for (let i = 0; i <= SEGMENTS; i++) {
      const x = X_MIN + (i / SEGMENTS) * (X_MAX - X_MIN)
      array[i * 3] = x
      array[i * 3 + 1] = yOf(x)
      array[i * 3 + 2] = zOf(x)
    }
    attr.needsUpdate = true
  }

  private rebuild() {
    this.buildHelix()
    this.buildSecondWave()
    this.buildModulus()
  }

  private tick(dt: number, elapsed: number) {
    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const p = smoothstep(this.progress)
    const index = this.stepIndex
    const targets = {
      helix: index === 0 ? 0.42 : 1,
      projection: !this.realImag ? 0 : index === 0 ? 0 : index === 1 ? 0.35 + 0.65 * p : 1,
      modulus: index >= 3 ? 1 : 0,
      second: index >= 4 ? 1 : 0,
      beat: index >= 4 ? 1 : 0
    }

    this.helixAlpha = THREE.MathUtils.damp(this.helixAlpha, targets.helix, 5, dt)
    this.projectionAlpha = THREE.MathUtils.damp(this.projectionAlpha, targets.projection, 5, dt)
    this.modulusAlpha = THREE.MathUtils.damp(this.modulusAlpha, targets.modulus, 5, dt)
    this.secondAlpha = THREE.MathUtils.damp(this.secondAlpha, targets.second, 5, dt)
    this.beatAlpha = THREE.MathUtils.damp(this.beatAlpha, targets.beat, 5, dt)

    const time = elapsed * TIME_SCALE
    const k = this.params.k
    const amp = this.params.amp
    const k2 = k * K2_RATIO
    const omega1 = (k * k) / 2
    const omega2 = (k2 * k2) / 2

    this.helixGroup.rotation.x = -omega1 * time
    this.secondWaveGroup.rotation.x = -omega2 * time

    if (this.marker) {
      const mx = X_MIN + ((elapsed * 0.09) % 1) * (X_MAX - X_MIN)
      this.marker.position.set(mx, amp * Math.cos(k * mx), amp * Math.sin(k * mx))
      const pulse = 0.42 + Math.sin(elapsed * 3.2) * 0.06
      this.marker.scale.set(pulse, pulse, 1)
    }

    if (this.realLine) {
      this.writeLine(
        this.realLine,
        (x) => amp * Math.cos(k * x - omega1 * time),
        () => 0.02
      )
    }
    if (this.imagLine) {
      this.writeLine(
        this.imagLine,
        () => 0,
        (x) => amp * Math.sin(k * x - omega1 * time)
      )
    }
    if (this.compositeLine) {
      this.writeLine(
        this.compositeLine,
        (x) => amp * Math.cos(k * x - omega1 * time) + amp * Math.cos(k2 * x - omega2 * time),
        () => 0.03
      )
    }
    const envelope = (x: number) =>
      2 * amp * Math.cos((((k2 - k) * x) / 2) - (((omega2 - omega1) * time) / 2))
    if (this.envelopeUp) {
      this.writeLine(this.envelopeUp, (x) => envelope(x), () => 0.03)
    }
    if (this.envelopeDown) {
      this.writeLine(this.envelopeDown, (x) => -envelope(x), () => 0.03)
    }

    this.applyGroupAlpha(this.helixGroup, this.helixAlpha)
    this.applyGroupAlpha(this.projectionGroup, this.projectionAlpha)
    this.applyGroupAlpha(this.modulusGroup, this.modulusAlpha)
    this.applyGroupAlpha(this.secondWaveGroup, this.secondAlpha)
    this.applyGroupAlpha(this.beatGroup, this.beatAlpha)
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
