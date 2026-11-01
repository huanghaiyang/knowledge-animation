import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export interface CameraPreset {
  pos: [number, number, number]
  look: [number, number, number]
}

export interface LessonScene {
  setStep(index: number, progress: number): void
  setParams(params: Record<string, number>): void
  setToggle(key: string, value: boolean): void
  dispose(): void
}

interface StageRigOptions {
  presets: CameraPreset[]
  background?: string
  top?: string
  bottom?: string
  tint?: string
  bloomStrength?: number
}

/**
 * 三维课程舞台的公共底座：
 * 渲染器、辉光合成、背景星空、相机运镜、文字精灵与绘图工具。
 * 各课程场景只需要构建自己的几何体与状态映射。
 */
export class StageRig {
  readonly scene = new THREE.Scene()
  readonly camera: THREE.PerspectiveCamera
  readonly renderer: THREE.WebGLRenderer
  readonly composer: EffectComposer
  readonly bloom: UnrealBloomPass
  readonly host: HTMLElement
  readonly plot = new THREE.Group()

  focusOffset = 0

  private readonly presets: CameraPreset[]
  private readonly textCache = new Map<string, THREE.CanvasTexture>()
  private readonly pointer = new THREE.Vector2()
  private readonly pointerTarget = new THREE.Vector2()
  private readonly look = new THREE.Vector3()
  private readonly lookTarget = new THREE.Vector3()
  private readonly basePos = new THREE.Vector3()
  private readonly orbitOffset = new THREE.Vector3()
  private readonly spherical = new THREE.Spherical()
  private readonly clock = new THREE.Clock()
  private readonly resizeObserver: ResizeObserver
  private presetIndex = 0
  private raf = 0
  private dragging = false
  private dragX = 0
  private dragY = 0
  private orbitYaw = 0
  private orbitPitch = 0
  private orbitYawTarget = 0
  private orbitPitchTarget = 0
  private update: ((dt: number, elapsed: number) => void) | null = null

  constructor(
    private readonly canvas: HTMLCanvasElement,
    options: StageRigOptions
  ) {
    this.host = canvas.parentElement ?? canvas
    this.presets = options.presets

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const background = options.background ?? '#04070c'
    this.renderer.setClearColor(new THREE.Color(background), 1)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05

    this.scene.background = new THREE.Color(background)

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80)
    this.camera.position.set(0.6, 1, 9.6)

    this.buildBackdrop(options)

    this.composer = new EffectComposer(this.renderer)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      options.bloomStrength ?? 0.8,
      0.55,
      0.25
    )
    this.composer.addPass(this.bloom)

    this.scene.add(this.plot)

    const first = this.presets[0]
    this.look.set(...first.look)
    this.lookTarget.set(...first.look)
    this.camera.position.set(...first.pos)
    this.basePos.copy(this.camera.position)
    this.camera.lookAt(this.look)

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.host)
    this.resize()

    this.host.addEventListener('pointermove', this.onPointerMove)
    this.host.addEventListener('pointerleave', this.onPointerLeave)
    this.canvas.addEventListener('pointerdown', this.onCanvasPointerDown)
    this.canvas.addEventListener('dblclick', this.onCanvasDoubleClick)
    window.addEventListener('pointermove', this.onWindowPointerMove)
    window.addEventListener('pointerup', this.onWindowPointerUp)
    this.canvas.style.cursor = 'grab'
    this.canvas.style.touchAction = 'none'
  }

  add(group: THREE.Object3D) {
    this.plot.add(group)
  }

  setCamera(index: number) {
    this.presetIndex = THREE.MathUtils.clamp(index, 0, this.presets.length - 1)
  }

  start(update: (dt: number, elapsed: number) => void) {
    this.update = update
    this.clock.start()
    this.raf = requestAnimationFrame(this.loop)
  }

  resize() {
    const width = Math.max(1, this.host.clientWidth)
    const height = Math.max(1, this.host.clientHeight)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.composer.setSize(width, height)
    this.focusOffset = width > 1080 ? -0.7 : 0
  }

  clearGroup(group: THREE.Group) {
    for (const child of [...group.children]) {
      group.remove(child)
      child.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const material = mesh.material
        if (Array.isArray(material)) material.forEach((item) => item.dispose())
        else if (material) material.dispose()
      })
    }
  }

  setDrawRange(mesh: THREE.Mesh, reveal: number) {
    const index = mesh.geometry.index
    if (!index) return
    const total = index.count
    const count = Math.max(0, Math.floor((total * THREE.MathUtils.clamp(reveal, 0, 1)) / 3) * 3)
    mesh.geometry.setDrawRange(0, count)
  }

  makeTube(points: THREE.Vector3[], color: string, radius: number, opacity = 1) {
    const curve = new THREE.CatmullRomCurve3(points)
    const geometry = new THREE.TubeGeometry(curve, Math.max(points.length * 2, 240), radius, 8, false)
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

  makeLine(
    points: THREE.Vector3[],
    color: string,
    options?: { dashed?: boolean; dashSize?: number; gapSize?: number; opacity?: number }
  ) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = options?.dashed
      ? new THREE.LineDashedMaterial({
          color: new THREE.Color(color),
          dashSize: options.dashSize ?? 0.09,
          gapSize: options.gapSize ?? 0.065,
          transparent: true,
          opacity: options.opacity ?? 0.85,
          toneMapped: false
        })
      : new THREE.LineBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: options?.opacity ?? 0.85,
          toneMapped: false
        })
    const line = new THREE.Line(geometry, material)
    if (options?.dashed) line.computeLineDistances()
    line.renderOrder = 3
    return line
  }

  makeGlowSprite(color: string, scale: number) {
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
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(scale, scale, 1)
    return sprite
  }

  makeTextSprite(
    text: string,
    options: { color: string; scale: number; fontSize?: number; weight?: number }
  ) {
    const fontSize = options.fontSize ?? 44
    const weight = options.weight ?? 500
    const key = `${text}|${fontSize}|${weight}|${options.color}`
    let texture = this.textCache.get(key)

    if (!texture) {
      const font = `${weight} ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`
      const measure = document.createElement('canvas').getContext('2d')!
      measure.font = font
      const textWidth = Math.ceil(measure.measureText(text).width)
      const padding = 16
      // 短标签（刻度、单字母）也保留足够的横向留白，避免精灵被拉得过高而与邻近文字重叠。
      const width = Math.max(textWidth + padding * 2, Math.round(fontSize * 3.2))
      const height = Math.ceil(fontSize * 1.9)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = options.color
      ctx.fillText(text, width / 2, height / 2)

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
    const image = texture.image as HTMLCanvasElement
    const aspect = image.width / image.height
    // 统一缩小 10%，给相邻标签留出间距。
    const worldWidth = options.scale * 0.9
    sprite.scale.set(worldWidth, worldWidth / aspect, 1)
    sprite.renderOrder = 20
    return sprite
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    this.host.removeEventListener('pointermove', this.onPointerMove)
    this.host.removeEventListener('pointerleave', this.onPointerLeave)
    this.canvas.removeEventListener('pointerdown', this.onCanvasPointerDown)
    this.canvas.removeEventListener('dblclick', this.onCanvasDoubleClick)
    window.removeEventListener('pointermove', this.onWindowPointerMove)
    window.removeEventListener('pointerup', this.onWindowPointerUp)
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const material = mesh.material
      if (Array.isArray(material)) material.forEach((item) => item.dispose())
      else if (material) material.dispose()
    })
    for (const texture of this.textCache.values()) texture.dispose()
    this.textCache.clear()
    this.bloom.dispose()
    this.composer.dispose()
    this.renderer.dispose()
  }

  private buildBackdrop(options: StageRigOptions) {
    const geometry = new THREE.PlaneGeometry(34, 20)
    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTop: { value: new THREE.Color(options.top ?? '#071018') },
        uBottom: { value: new THREE.Color(options.bottom ?? '#04070c') },
        uTint: { value: new THREE.Color(options.tint ?? '#0d2b2e') }
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
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#6b93ad'),
      size: 0.02,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    stars.renderOrder = -5
    this.scene.add(stars)
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

  private readonly onCanvasPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    this.dragging = true
    this.dragX = event.clientX
    this.dragY = event.clientY
    this.canvas.style.cursor = 'grabbing'
  }

  private readonly onWindowPointerMove = (event: PointerEvent) => {
    if (!this.dragging) return
    const dx = event.clientX - this.dragX
    const dy = event.clientY - this.dragY
    this.dragX = event.clientX
    this.dragY = event.clientY
    // 与 OrbitControls 一致：向右拖动让场景向右转，向下拖动让视角抬高。
    this.orbitYawTarget -= dx * 0.006
    this.orbitPitchTarget = THREE.MathUtils.clamp(
      this.orbitPitchTarget - dy * 0.004,
      -0.55,
      0.7
    )
  }

  private readonly onWindowPointerUp = () => {
    if (!this.dragging) return
    this.dragging = false
    this.canvas.style.cursor = 'grab'
  }

  private readonly onCanvasDoubleClick = () => {
    this.orbitYawTarget = 0
    this.orbitPitchTarget = 0
  }

  private readonly loop = () => {
    const dt = Math.min(this.clock.getDelta(), 0.05)
    const elapsed = this.clock.elapsedTime
    this.update?.(dt, elapsed)
    this.updateCamera(dt)
    this.composer.render()
    this.raf = requestAnimationFrame(this.loop)
  }

  private updateCamera(dt: number) {
    const preset = this.presets[this.presetIndex]
    const aspect = this.camera.aspect || 1
    const pull = aspect < 1.45 ? THREE.MathUtils.clamp(1.5 / aspect, 1, 1.85) : 1.12
    const offset = this.focusOffset

    this.pointer.lerp(this.pointerTarget, 0.04)

    this.basePos.x = THREE.MathUtils.damp(
      this.basePos.x,
      preset.pos[0] + offset + this.pointer.x * 0.22,
      2.6,
      dt
    )
    this.basePos.y = THREE.MathUtils.damp(
      this.basePos.y,
      preset.pos[1] - this.pointer.y * 0.16,
      2.6,
      dt
    )
    this.basePos.z = THREE.MathUtils.damp(
      this.basePos.z,
      preset.pos[2] * pull,
      2.6,
      dt
    )

    this.lookTarget.set(
      preset.look[0] + offset + this.pointer.x * 0.1,
      preset.look[1] - this.pointer.y * 0.07,
      preset.look[2]
    )
    this.look.x = THREE.MathUtils.damp(this.look.x, this.lookTarget.x, 2.6, dt)
    this.look.y = THREE.MathUtils.damp(this.look.y, this.lookTarget.y, 2.6, dt)
    this.look.z = THREE.MathUtils.damp(this.look.z, this.lookTarget.z, 2.6, dt)

    this.orbitYaw = THREE.MathUtils.damp(this.orbitYaw, this.orbitYawTarget, 5, dt)
    this.orbitPitch = THREE.MathUtils.damp(this.orbitPitch, this.orbitPitchTarget, 5, dt)

    this.orbitOffset.copy(this.basePos).sub(this.look)
    if (this.orbitYaw || this.orbitPitch) {
      this.spherical.setFromVector3(this.orbitOffset)
      this.spherical.theta += this.orbitYaw
      this.spherical.phi = THREE.MathUtils.clamp(
        this.spherical.phi + this.orbitPitch,
        0.55,
        2.2
      )
      this.orbitOffset.setFromSpherical(this.spherical)
    }
    this.camera.position.copy(this.look).add(this.orbitOffset)
    this.camera.lookAt(this.look)
  }
}
