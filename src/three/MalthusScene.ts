import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { FOOD0, FOOD_RATE, HORIZON } from '../data/malthus'

/** 课程时间视野：0 - 80 年 */
export const T_MAX = HORIZON

const X_MIN = -4.2
const X_MAX = 4.2
const Y_MIN = -2
const Y_MAX = 2

const COLOR = {
  bg: '#04070c',
  curve: '#74f0c2',
  food: '#ffbd70',
  logistic: '#b8a2ff',
  axis: '#3d5870',
  grid: '#16283a',
  tick: '#7c93a9'
}

export interface SceneParams {
  n0: number
  r: number
}

export function formatNumber(value: number) {
  return Math.round(value).toLocaleString('en-US')
}

function smoothstep(x: number) {
  const v = THREE.MathUtils.clamp(x, 0, 1)
  return v * v * (3 - 2 * v)
}

function niceMax(value: number) {
  const raw = Math.max(value, 600)
  const power = Math.pow(10, Math.floor(Math.log10(raw)))
  const f = raw / power
  const factor = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 4 ? 4 : f <= 5 ? 5 : f <= 8 ? 8 : 10
  return factor * power
}

interface CameraPreset {
  pos: [number, number, number]
  look: [number, number, number]
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.5, 0.75, 9.9], look: [0.3, 0.0, 0] },
  { pos: [0.9, 1.05, 9.2], look: [0.15, 0.05, 0] },
  { pos: [0.4, 0.35, 8.7], look: [0.15, -0.22, 0] },
  { pos: [0.7, 0.95, 9.1], look: [0.25, 0.06, 0] },
  { pos: [0.8, 1.7, 10.5], look: [0.45, 0.1, 0] },
  { pos: [0.7, 1.45, 9.7], look: [0.35, 0.15, 0] },
  { pos: [0.8, 1.35, 9.8], look: [0.45, 0.1, 0] }
]

/**
 * 马尔萨斯课程的三维舞台：
 * 坐标轴、指数曲线、食物直线、倍增标记、情境向量箭头与逻辑斯蒂对照。
 * 场景完全由章节索引与章节进度驱动，播放器只需向它推送状态。
 */
export class MalthusScene {
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera: THREE.PerspectiveCamera
  private readonly composer: EffectComposer
  private readonly bloom: UnrealBloomPass
  private readonly host: HTMLElement
  private readonly plot = new THREE.Group()

  private axesGroup = new THREE.Group()
  private curveGroup = new THREE.Group()
  private foodGroup = new THREE.Group()
  private arrowGroup = new THREE.Group()
  private doublingGroup = new THREE.Group()
  private logisticGroup = new THREE.Group()
  private crossingGroup = new THREE.Group()

  private curveMesh: THREE.Mesh | null = null
  private foodMesh: THREE.Mesh | null = null
  private areaMesh: THREE.Mesh | null = null
  private tip: THREE.Sprite | null = null
  private params: SceneParams = { n0: 100, r: 0.028 }
  private yMax = 1000
  private lastAxesYMax = -1
  private stepIndex = 0
  private progress = 0
  private logisticOn = false

  private reveal = 0
  private foodReveal = 0
  private arrowAlpha = 0
  private doublingAlpha = 0
  private logisticAlpha = 0

  private readonly look = new THREE.Vector3(0.3, 0, 0)
  private readonly lookTarget = new THREE.Vector3(0.3, 0, 0)
  private readonly pointer = new THREE.Vector2()
  private readonly pointerTarget = new THREE.Vector2()

  private readonly clock = new THREE.Clock()
  private readonly textCache = new Map<string, THREE.CanvasTexture>()
  private readonly resizeObserver: ResizeObserver
  private raf = 0
  private dirty = false
  private crossingT: number | null = null
  private focusOffset = 0

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.host = canvas.parentElement ?? canvas

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(new THREE.Color(COLOR.bg), 1)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05

    this.scene.background = new THREE.Color(COLOR.bg)

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80)
    this.camera.position.set(0.6, 1, 9.6)

    this.buildBackdrop()

    this.composer = new EffectComposer(this.renderer)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.8, 0.55, 0.25)
    this.composer.addPass(this.bloom)

    this.scene.add(this.plot)
    for (const group of [
      this.axesGroup,
      this.curveGroup,
      this.foodGroup,
      this.arrowGroup,
      this.doublingGroup,
      this.logisticGroup,
      this.crossingGroup
    ]) {
      this.plot.add(group)
    }

    this.rebuild(true)

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.host)
    this.resize()

    this.host.addEventListener('pointermove', this.onPointerMove)
    this.host.addEventListener('pointerleave', this.onPointerLeave)

    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  /* ------------------------------------------------------ 对外接口 */

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
  }

  setParams(params: Record<string, number>) {
    const next = {
      n0: Math.max(1, params.n0 ?? this.params.n0),
      r: Math.max(0.0001, params.r ?? this.params.r)
    }
    if (Math.abs(next.n0 - this.params.n0) < 1e-6 && Math.abs(next.r - this.params.r) < 1e-6) {
      return
    }
    this.params = next
    this.dirty = true
  }

  setToggle(key: string, enabled: boolean) {
    if (key === 'logistic') this.logisticOn = enabled
  }

  setLogistic(enabled: boolean) {
    this.logisticOn = enabled
  }

  /* ------------------------------------------------------ 数学与坐标 */

  private expN(t: number) {
    return this.params.n0 * Math.exp(this.params.r * t)
  }

  private foodN(t: number) {
    return FOOD0 + FOOD_RATE * t
  }

  private logisticN(t: number, k: number) {
    const { n0, r } = this.params
    return k / (1 + ((k - n0) / n0) * Math.exp(-r * t))
  }

  private xOf(t: number) {
    return X_MIN + (t / T_MAX) * (X_MAX - X_MIN)
  }

  private yOf(n: number) {
    const ratio = THREE.MathUtils.clamp(n, 0, this.yMax) / this.yMax
    return Y_MIN + ratio * (Y_MAX - Y_MIN)
  }

  /* ------------------------------------------------------ 构建场景 */

  private rebuild(forceAxes = false) {
    const peak = Math.max(this.expN(T_MAX), this.foodN(T_MAX), 600)
    this.yMax = niceMax(peak)
    this.crossingT = this.findCrossing()

    if (forceAxes || this.yMax !== this.lastAxesYMax) {
      this.buildAxes()
      this.lastAxesYMax = this.yMax
    }

    this.buildCurves()
    this.buildFood()
    this.buildArrows()
    this.buildDoubling()
    this.buildLogistic()
    this.buildCrossingMarker()
    this.applyStaticStates()
  }

  private clearGroup(group: THREE.Group) {
    for (const child of [...group.children]) {
      group.remove(child)
      child.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const material = (mesh as THREE.Mesh).material
        if (Array.isArray(material)) material.forEach((m) => m.dispose())
        else if (material) material.dispose()
      })
    }
  }

  private buildAxes() {
    this.clearGroup(this.axesGroup)
    const yMax = this.yMax

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

    const xAxis = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(X_MIN, Y_MIN, 0),
      new THREE.Vector3(X_MAX, Y_MIN, 0)
    ])
    const yAxis = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(X_MIN, Y_MIN, 0),
      new THREE.Vector3(X_MIN, Y_MAX + 0.12, 0)
    ])
    this.axesGroup.add(new THREE.Line(xAxis, lineMaterial))
    this.axesGroup.add(new THREE.Line(yAxis, lineMaterial))

    const tTicks = [0, 20, 40, 60, 80]
    for (let i = 0; i < tTicks.length; i++) {
      const t = tTicks[i]
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
      if (i !== 0) {
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
      const label = this.makeTextSprite(`${t}`, {
        color: COLOR.tick,
        scale: 0.38,
        fontSize: 52
      })
      label.position.set(x, Y_MIN - 0.27, 0.02)
      this.axesGroup.add(label)
    }

    const nTicks = [0, 0.25, 0.5, 0.75, 1]
    for (let i = 0; i < nTicks.length; i++) {
      const ratio = nTicks[i]
      const value = yMax * ratio
      const y = Y_MIN + ratio * (Y_MAX - Y_MIN)
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
      const label = this.makeTextSprite(formatNumber(value), {
        color: COLOR.tick,
        scale: 0.5,
        fontSize: 44
      })
      label.position.set(X_MIN - 0.3, y, 0.02)
      this.axesGroup.add(label)
    }

    const xTitle = this.makeTextSprite('时间 t / 年', {
      color: '#8fa4b8',
      scale: 0.62,
      fontSize: 44,
      weight: 400
    })
    xTitle.position.set(0.2, Y_MIN - 0.55, 0.02)
    this.axesGroup.add(xTitle)

    const yTitle = this.makeTextSprite('人口 N', {
      color: '#8fa4b8',
      scale: 0.58,
      fontSize: 44,
      weight: 400
    })
    yTitle.position.set(X_MIN - 0.78, Y_MAX - 0.35, 0.02)
    yTitle.material.rotation = Math.PI / 2
    this.axesGroup.add(yTitle)

  }

  private tubeFor(
    sampler: (t: number) => number,
    color: string,
    radius: number,
    opacity = 1
  ) {
    const points: THREE.Vector3[] = []
    const steps = 240
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * T_MAX
      const n = Math.max(0, sampler(t))
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(n), 0.03))
    }
    const curve = new THREE.CatmullRomCurve3(points)
    const geometry = new THREE.TubeGeometry(curve, 420, radius, 8, false)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: opacity < 1,
      opacity,
      toneMapped: false,
      depthWrite: false
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.renderOrder = 4
    this.setDrawRange(mesh, 0)
    return mesh
  }

  private setDrawRange(mesh: THREE.Mesh, reveal: number) {
    const index = mesh.geometry.index
    if (!index) return
    const total = index.count
    const count = Math.max(0, Math.floor((total * THREE.MathUtils.clamp(reveal, 0, 1)) / 3) * 3)
    mesh.geometry.setDrawRange(0, count)
  }

  private buildCurves() {
    this.clearGroup(this.curveGroup)
    this.curveMesh = this.tubeFor((t) => this.expN(t), COLOR.curve, 0.032)
    this.curveGroup.add(this.curveMesh)

    this.tip = this.makeGlowSprite('#9dffe0', 0.55)
    this.curveGroup.add(this.tip)
  }

  private buildFood() {
    this.clearGroup(this.foodGroup)
    this.foodMesh = this.tubeFor((t) => this.foodN(t), COLOR.food, 0.022, 0.9)
    this.foodGroup.add(this.foodMesh)

    const foodLabel = this.makeTextSprite('粮食 F(t)', {
      color: '#ffc983',
      scale: 0.58,
      fontSize: 42,
      weight: 500
    })
    foodLabel.position.set(this.xOf(66), this.yOf(this.foodN(66)) - 0.24, 0.05)
    foodLabel.userData.isFoodLabel = true
    this.foodGroup.add(foodLabel)

    const segments = 120
    const positions: number[] = []
    for (let i = 0; i < segments; i++) {
      const t0 = (i / segments) * T_MAX
      const t1 = ((i + 1) / segments) * T_MAX
      const nt0 = this.yOf(this.expN(t0))
      const nt1 = this.yOf(this.expN(t1))
      const ft0 = this.yOf(this.foodN(t0))
      const ft1 = this.yOf(this.foodN(t1))
      const x0 = this.xOf(t0)
      const x1 = this.xOf(t1)
      positions.push(
        x0, nt0, 0.015, x0, ft0, 0.015, x1, nt1, 0.015,
        x0, ft0, 0.015, x1, ft1, 0.015, x1, nt1, 0.015
      )
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#6fe3c2'),
      transparent: true,
      opacity: 0.075,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    this.areaMesh = new THREE.Mesh(geometry, material)
    this.areaMesh.renderOrder = 2
    geometry.setDrawRange(0, 0)
    this.foodGroup.add(this.areaMesh)
  }

  private buildArrows() {
    this.clearGroup(this.arrowGroup)
    const times = [10, 24, 38, 52, 66]
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8ff6d2'),
      transparent: true,
      opacity: 0.55,
      toneMapped: false,
      depthWrite: false
    })

    for (const t of times) {
      const ratio = THREE.MathUtils.clamp(this.expN(t) / this.yMax, 0.03, 0.98)
      const length = 0.16 + ratio * 1.55
      const x = this.xOf(t)

      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, length, 6), material)
      shaft.position.set(x, Y_MIN + length / 2, 0.04)
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.14, 10), material)
      head.position.set(x, Y_MIN + length + 0.05, 0.04)
      this.arrowGroup.add(shaft, head)

      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.022, 16), material)
      dot.position.set(x, Y_MIN, 0.05)
      this.arrowGroup.add(dot)
    }

    this.arrowGroup.visible = false
  }

  private buildDoubling() {
    this.clearGroup(this.doublingGroup)
    const td = Math.LN2 / this.params.r
    if (!isFinite(td) || td <= 0) return

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a5ffe1'),
      transparent: true,
      opacity: 0.95,
      toneMapped: false,
      depthWrite: false
    })
    const guideMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#3f7d70'),
      transparent: true,
      opacity: 0.5,
      toneMapped: false
    })

    let k = 1
    while (k <= 5) {
      const t = td * k
      if (t > T_MAX) break
      const n = this.expN(t)
      if (n > this.yMax * 1.001) break
      const x = this.xOf(t)
      const y = this.yOf(n)

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.012, 8, 48), ringMaterial)
      ring.position.set(x, y, 0.05)
      ring.userData.phase = k
      ring.userData.baseScale = 1
      this.doublingGroup.add(ring)

      const glow = this.makeGlowSprite('#9dffe0', 0.34)
      glow.position.set(x, y, 0.04)
      glow.userData.phase = k
      glow.userData.baseScale = 0.34
      this.doublingGroup.add(glow)

      this.doublingGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, Y_MIN, 0.02),
            new THREE.Vector3(x, y - 0.11, 0.02)
          ]),
          guideMaterial
        )
      )

      const label = this.makeTextSprite(`×${2 ** k}`, {
        color: '#baffeb',
        scale: k < 3 ? 0.42 : 0.5,
        fontSize: 46,
        weight: 500
      })
      label.position.set(x + 0.26, y + 0.19, 0.06)
      this.doublingGroup.add(label)

      k += 1
    }

    this.doublingGroup.visible = false
  }

  private buildLogistic() {
    this.clearGroup(this.logisticGroup)
    const k = this.yMax
    const points: THREE.Vector3[] = []
    const steps = 200
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * T_MAX
      points.push(new THREE.Vector3(this.xOf(t), this.yOf(this.logisticN(t, k)), 0.04))
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color(COLOR.logistic),
      dashSize: 0.09,
      gapSize: 0.065,
      transparent: true,
      opacity: 0.9,
      toneMapped: false
    })
    const line = new THREE.Line(geometry, material)
    line.computeLineDistances()
    line.renderOrder = 5
    this.logisticGroup.add(line)

    const label = this.makeTextSprite(`K = ${formatNumber(k)}`, {
      color: '#cbbaff',
      scale: 0.7,
      fontSize: 44,
      weight: 500
    })
    label.position.set(this.xOf(64), this.yOf(this.logisticN(64, k)) - 0.27, 0.06)
    this.logisticGroup.add(label)

    this.logisticGroup.visible = false
  }

  private buildCrossingMarker() {
    this.clearGroup(this.crossingGroup)
    if (this.crossingT === null) return
    const x = this.xOf(this.crossingT)
    const y = this.yOf(this.foodN(this.crossingT))

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.012, 8, 48),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ffd9a3'),
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
        depthWrite: false
      })
    )
    ring.position.set(x, y, 0.06)
    this.crossingGroup.add(ring)

    const label = this.makeTextSprite('N = F', {
      color: '#ffe4b8',
      scale: 0.52,
      fontSize: 42
    })
    label.position.set(x - 0.05, y - 0.34, 0.07)
    this.crossingGroup.add(label)

    this.crossingGroup.visible = false
  }

  private findCrossing(): number | null {
    let prevT = 0
    let prev = this.expN(prevT) - this.foodN(prevT)
    for (let t = 1; t <= T_MAX; t += 1) {
      const dir = this.expN(t) - this.foodN(t)
      if (prev <= 0 && dir >= 0) {
        let lo = prevT
        let hi = t
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2
          if (this.expN(mid) - this.foodN(mid) > 0) hi = mid
          else lo = mid
        }
        return (lo + hi) / 2
      }
      prevT = t
      prev = dir
    }
    return null
  }

  /* ------------------------------------------------------ 背景与标注 */

  private buildBackdrop() {
    const geometry = new THREE.PlaneGeometry(34, 20)
    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTop: { value: new THREE.Color('#071018') },
        uBottom: { value: new THREE.Color('#04070c') },
        uTint: { value: new THREE.Color('#0d2b2e') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uTop;
        uniform vec3 uBottom;
        uniform vec3 uTint;
        void main() {
          vec3 base = mix(uBottom, uTop, vUv.y);
          float d = distance(vUv, vec2(0.68, 0.5));
          float glow = smoothstep(0.62, 0.02, d);
          vec3 color = base + uTint * glow * 0.7;
          gl_FragColor = vec4(color, 1.0);
        }
      `
    })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(0, 1.6, -9)
    plane.renderOrder = -10
    this.scene.add(plane)

    const starCount = 760
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = -5 + Math.random() * 12
      positions[i * 3 + 2] = -8.5 + Math.random() * 6
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({
      color: new THREE.Color('#6b93ad'),
      size: 0.02,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    const stars = new THREE.Points(starGeo, starMat)
    stars.renderOrder = -5
    this.scene.add(stars)
  }

  private makeGlowSprite(color: string, scale: number) {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    const tint = new THREE.Color(color)
    const rgb = `${Math.round(tint.r * 255)}, ${Math.round(tint.g * 255)}, ${Math.round(tint.b * 255)}`
    gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
    gradient.addColorStop(0.2, `rgba(${rgb},0.65)`)
    gradient.addColorStop(0.55, `rgba(${rgb},0.14)`)
    gradient.addColorStop(1, `rgba(${rgb},0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({
      map: texture,
      color: new THREE.Color('#ffffff'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(scale, scale, 1)
    return sprite
  }

  private makeTextSprite(
    text: string,
    options: { color: string; scale: number; fontSize?: number; weight?: number }
  ) {
    const fontSize = options.fontSize ?? 48
    const weight = options.weight ?? 500
    const key = `${text}|${fontSize}|${weight}|${options.color}`
    let texture = this.textCache.get(key)

    if (!texture) {
      const canvas = document.createElement('canvas')
      const font = `${weight} ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`
      const ctxMeasure = document.createElement('canvas').getContext('2d')!
      ctxMeasure.font = font
      const width = Math.ceil(ctxMeasure.measureText(text).width) + 36
      canvas.width = width
      canvas.height = 96
      const ctx = canvas.getContext('2d')!
      ctx.font = font
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = options.color
      ctx.fillText(text, 18, 50)

      texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      this.textCache.set(key, texture)
    }

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      toneMapped: false
    })
    const sprite = new THREE.Sprite(material)
    const aspect = texture.image.width / texture.image.height
    sprite.scale.set(options.scale, options.scale / aspect, 1)
    sprite.renderOrder = 20
    return sprite
  }

  /* ------------------------------------------------------ 尺寸与交互 */

  private resize() {
    const width = Math.max(1, this.host.clientWidth)
    const height = Math.max(1, this.host.clientHeight)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.composer.setSize(width, height)
    this.focusOffset = width > 1080 ? -0.7 : 0
  }

  private readonly onPointerMove = (event: PointerEvent) => {
    const rect = this.host.getBoundingClientRect()
    this.pointerTarget.set(
      ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      ((event.clientY - rect.top) / rect.height - 0.5) * 2
    )
  }

  private readonly onPointerLeave = () => {
    this.pointerTarget.set(0, 0)
  }

  /* ------------------------------------------------------ 状态映射 */

  private targetsForStep() {
    const p = smoothstep(this.progress)
    const i = this.stepIndex

    let reveal = 0
    let food = 0
    let arrows = 0
    let doubling = 0
    let logistic = 0

    if (i <= 2) {
      arrows = i === 1 ? 0.85 * smoothstep(p * 3) : i === 2 ? 1 : 0
    }
    if (i === 3) {
      reveal = smoothstep(p * 1.15)
    } else if (i >= 4) {
      reveal = 1
    }
    if (i === 4) {
      food = smoothstep(p * 1.4)
    } else if (i >= 5) {
      food = 1
    }
    if (i >= 5) {
      doubling = i === 5 ? smoothstep(p * 1.5) : 1
    }
    if (i === 6 && this.logisticOn) {
      logistic = 1
    }

    return { reveal, food, arrows, doubling, logistic }
  }

  private applyStaticStates() {
    if (this.areaMesh) {
      this.setDrawRange(this.areaMesh, this.foodReveal)
      this.areaMesh.geometry.setDrawRange(0, Math.floor((this.areaMesh.geometry.getAttribute('position').count * this.foodReveal) / 3) * 3)
    }
    if (this.curveMesh) this.setDrawRange(this.curveMesh, this.reveal)
    if (this.foodMesh) this.setDrawRange(this.foodMesh, this.foodReveal)
    this.arrowGroup.visible = this.arrowAlpha > 0.01
    this.doublingGroup.visible = this.doublingAlpha > 0.01
    this.crossingGroup.visible = this.foodReveal > 0.72 && this.crossingT !== null
    this.logisticGroup.visible = this.logisticAlpha > 0.01
  }

  /* ------------------------------------------------------ 主循环 */

  private loop() {
    const dt = Math.min(this.clock.getDelta(), 0.05)
    const t = this.clock.elapsedTime

    if (this.dirty) {
      this.dirty = false
      this.rebuild()
    }

    const targets = this.targetsForStep()
    this.reveal = THREE.MathUtils.damp(this.reveal, targets.reveal, 5, dt)
    this.foodReveal = THREE.MathUtils.damp(this.foodReveal, targets.food, 5, dt)
    this.arrowAlpha = THREE.MathUtils.damp(this.arrowAlpha, targets.arrows, 5, dt)
    this.doublingAlpha = THREE.MathUtils.damp(this.doublingAlpha, targets.doubling, 5, dt)
    this.logisticAlpha = THREE.MathUtils.damp(this.logisticAlpha, targets.logistic, 6, dt)

    this.applyStaticStates()

    // 曲线绘制进度
    if (this.curveMesh) this.setDrawRange(this.curveMesh, this.reveal)
    if (this.foodMesh) this.setDrawRange(this.foodMesh, this.foodReveal)
    if (this.areaMesh) {
      const total = this.areaMesh.geometry.getAttribute('position').count
      this.setDrawRange(this.areaMesh, this.foodReveal)
      this.areaMesh.geometry.setDrawRange(0, Math.floor((total * this.foodReveal) / 3) * 3)
    }

    // 曲线末端的光点
    if (this.tip) {
      const revealT = this.reveal * T_MAX
      const n = Math.min(this.expN(revealT), this.yMax)
      this.tip.position.set(this.xOf(revealT), this.yOf(n), 0.08)
      this.tip.material.opacity = this.reveal > 0.01 ? Math.min(1, this.reveal * 1.6) : 0
      const pulse = 0.45 + Math.sin(t * 3) * 0.07
      this.tip.scale.set(pulse, pulse, 1)
    }

    // 概念箭头透明度
    this.arrowGroup.traverse((object) => {
      const material = (object as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined
      if (!material) return
      const list = Array.isArray(material) ? material : [material]
      for (const item of list) {
        const meshMaterial = item as THREE.MeshBasicMaterial
        meshMaterial.opacity = this.arrowAlpha * 0.55
      }
    })
    this.arrowGroup.visible = this.arrowAlpha > 0.01

    // 倍增标记
    this.doublingGroup.traverse((object) => {
      const material = (object as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined
      if (!material) return
      const list = Array.isArray(material) ? material : [material]
      for (const item of list) {
        const basic = item as THREE.MeshBasicMaterial
        if ('opacity' in basic) {
          basic.opacity = this.doublingAlpha * (basic.transparent ? 0.9 : 1)
        }
      }
      if (object instanceof THREE.Sprite) {
        object.material.opacity = this.doublingAlpha
      }
      if (object.userData.phase) {
        const base = (object.userData.baseScale as number) ?? 1
        const pulse = 1 + Math.sin(t * 2.2 + (object.userData.phase as number)) * 0.045
        object.scale.set(base * pulse, base * pulse, 1)
      }
    })
    this.doublingGroup.visible = this.doublingAlpha > 0.01

    // 食物线区域与交点
    if (this.foodMesh) {
      const material = this.foodMesh.material as THREE.MeshBasicMaterial
      material.opacity = this.foodReveal * 0.9
    }
    if (this.areaMesh) {
      const material = this.areaMesh.material as THREE.MeshBasicMaterial
      material.opacity = this.foodReveal * 0.075
    }
    for (const child of this.foodGroup.children) {
      if (child instanceof THREE.Sprite) {
        child.material.opacity = this.foodReveal
      }
    }
    this.crossingGroup.visible = this.foodReveal > 0.75 && this.crossingT !== null
    this.crossingGroup.traverse((object) => {
      const material = (object as THREE.Mesh).material as THREE.Material | undefined
      if (material && 'opacity' in material) {
        ;(material as THREE.MeshBasicMaterial).opacity = this.foodReveal * 0.9
      }
      if (object instanceof THREE.Sprite) {
        object.material.opacity = this.foodReveal
      }
    })

    // 逻辑斯蒂对照曲线
    this.logisticGroup.visible = this.logisticAlpha > 0.01
    this.logisticGroup.traverse((object) => {
      const material = (object as THREE.Mesh).material as THREE.Material | undefined
      if (material && 'opacity' in material) {
        ;(material as THREE.LineDashedMaterial).opacity = this.logisticAlpha * 0.9
      }
      if (object instanceof THREE.Sprite) {
        object.material.opacity = this.logisticAlpha
      }
    })

    this.updateCamera(dt)

    this.composer.render()
    this.raf = requestAnimationFrame(this.loop)
  }

  private updateCamera(dt: number) {
    const preset = CAMERA_PRESETS[Math.min(this.stepIndex, CAMERA_PRESETS.length - 1)]
    const aspect = this.camera.aspect || 1
    const pull = aspect < 1.45 ? THREE.MathUtils.clamp(1.5 / aspect, 1, 1.85) : 1.12
    const offset = this.focusOffset

    const targetX = preset.pos[0] + offset
    const targetY = preset.pos[1]
    const targetZ = preset.pos[2] * pull

    this.pointer.lerp(this.pointerTarget, 0.04)

    this.camera.position.x = THREE.MathUtils.damp(
      this.camera.position.x,
      targetX + this.pointer.x * 0.22,
      2.6,
      dt
    )
    this.camera.position.y = THREE.MathUtils.damp(
      this.camera.position.y,
      targetY - this.pointer.y * 0.16,
      2.6,
      dt
    )
    this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, targetZ, 2.6, dt)

    this.lookTarget.set(
      preset.look[0] + offset + this.pointer.x * 0.1,
      preset.look[1] - this.pointer.y * 0.07,
      preset.look[2]
    )
    this.look.x = THREE.MathUtils.damp(this.look.x, this.lookTarget.x, 2.6, dt)
    this.look.y = THREE.MathUtils.damp(this.look.y, this.lookTarget.y, 2.6, dt)
    this.look.z = THREE.MathUtils.damp(this.look.z, this.lookTarget.z, 2.6, dt)
    this.camera.lookAt(this.look)

    this.plot.rotation.y = Math.sin(this.clock.elapsedTime * 0.1) * 0.015
  }

  /* ------------------------------------------------------ 销毁 */

  dispose() {
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    this.host.removeEventListener('pointermove', this.onPointerMove)
    this.host.removeEventListener('pointerleave', this.onPointerLeave)
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const material = (mesh as THREE.Mesh).material
      if (Array.isArray(material)) material.forEach((m) => m.dispose())
      else if (material) material.dispose()
    })
    for (const texture of this.textCache.values()) texture.dispose()
    this.textCache.clear()
    this.bloom.dispose()
    this.composer.dispose()
    this.renderer.dispose()
  }
}
