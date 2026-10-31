import * as THREE from 'three'

/**
 * 首页 Hero 的三维「生长曲线场」。
 * 多条指数曲线沿景深方向层层排布，配合上升的微粒子，
 * 用来暗示「增长率与当前数量成正比」这一课程主题。
 */
export class GrowthField {
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera: THREE.PerspectiveCamera
  private readonly group = new THREE.Group()
  private readonly curves: THREE.Line[] = []
  private particles!: THREE.Points
  private readonly clock = new THREE.Clock()
  private readonly pointer = new THREE.Vector2()
  private readonly pointerTarget = new THREE.Vector2()
  private readonly host: HTMLElement
  private resizeObserver: ResizeObserver
  private raf = 0

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.host = canvas.parentElement ?? canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.15

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60)
    this.camera.position.set(0.2, 1.35, 7.8)

    this.buildCurves()
    this.buildParticles()

    this.scene.add(this.group)
    this.scene.add(this.particles)

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.host)
    this.resize()

    this.host.addEventListener('pointermove', this.onPointerMove)
    this.host.addEventListener('pointerleave', this.onPointerLeave)

    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  private buildCurves() {
    const COUNT = 18
    const segments = 96

    for (let i = 0; i < COUNT; i++) {
      const depth = i / (COUNT - 1)
      const z = -depth * 7.6
      const bend = 2.6 + depth * 3.2
      const spanX = 9.0 - depth * 0.7
      const baseY = -2.7 + depth * 0.55
      const height = 4.3 - depth * 0.7
      const denom = Math.exp(bend) - 1

      const points: THREE.Vector3[] = []
      for (let s = 0; s <= segments; s++) {
        const u = s / segments
        const growth = (Math.exp(bend * u) - 1) / denom
        points.push(
          new THREE.Vector3(-spanX / 2 + u * spanX, baseY + growth * height, z)
        )
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const near = new THREE.Color('#7df3c6')
      const far = new THREE.Color('#2d6f8f')
      const color = far.clone().lerp(near, 1 - depth * 0.82)

      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.16 + (1 - depth) * 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      })

      const line = new THREE.Line(geometry, material)
      line.userData.baseOpacity = material.opacity
      line.userData.phase = i * 0.42
      this.curves.push(line)
      this.group.add(line)
    }

    // 一条更亮的基准曲线，强调「主角」
    const mainPoints: THREE.Vector3[] = []
    const bend = 4.2
    const denom = Math.exp(bend) - 1
    for (let s = 0; s <= 140; s++) {
      const u = s / 140
      mainPoints.push(
        new THREE.Vector3(-4.6 + u * 9.2, -2.55 + ((Math.exp(bend * u) - 1) / denom) * 4.15, 0.15)
      )
    }
    const mainGeo = new THREE.BufferGeometry().setFromPoints(mainPoints)
    const mainMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#a6ffe2'),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    const mainLine = new THREE.Line(mainGeo, mainMat)
    mainLine.userData.baseOpacity = 0.9
    mainLine.userData.phase = 0
    this.curves.push(mainLine)
    this.group.add(mainLine)

    // 主曲线末端的发光点
    const glow = this.makeGlowSprite('#a6ffe2')
    glow.position.set(4.6, 1.6, 0.2)
    glow.scale.set(0.75, 0.75, 1)
    this.group.add(glow)
  }

  private makeGlowSprite(color: string) {
    const size = 128
    const cv = document.createElement('canvas')
    cv.width = size
    cv.height = size
    const ctx = cv.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
    gradient.addColorStop(0.22, 'rgba(166,255,226,0.55)')
    gradient.addColorStop(0.55, 'rgba(125,243,198,0.14)')
    gradient.addColorStop(1, 'rgba(125,243,198,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(cv)
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({
      map: texture,
      color: new THREE.Color(color),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    return new THREE.Sprite(material)
  }

  private buildParticles() {
    const COUNT = 720
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11
      positions[i * 3 + 1] = -3 + Math.random() * 7
      positions[i * 3 + 2] = -8.5 + Math.random() * 10
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#7fd8c0'),
      size: 0.028,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    })
    this.particles = new THREE.Points(geometry, material)
  }

  private resize() {
    const width = Math.max(1, this.host.clientWidth)
    const height = Math.max(1, this.host.clientHeight)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
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

  private loop() {
    const dt = Math.min(this.clock.getDelta(), 0.05)
    const t = this.clock.elapsedTime

    this.pointer.lerp(this.pointerTarget, 0.045)
    this.camera.position.x = 0.2 + this.pointer.x * 0.55
    this.camera.position.y = 1.35 + this.pointer.y * 0.32
    this.camera.lookAt(0, -0.25, -2.4)

    this.group.rotation.y = Math.sin(t * 0.08) * 0.035 + this.pointer.x * 0.04
    this.group.position.y = Math.sin(t * 0.22) * 0.06

    for (const line of this.curves) {
      const material = line.material as THREE.LineBasicMaterial
      material.opacity =
        (line.userData.baseOpacity as number) * (0.82 + Math.sin(t * 0.6 + (line.userData.phase as number)) * 0.18)
    }

    // 粒子缓慢上升，越界后回到底部
    const attr = this.particles.geometry.getAttribute('position') as THREE.BufferAttribute
    const array = attr.array as Float32Array
    for (let i = 0; i < array.length / 3; i++) {
      const iy = i * 3 + 1
      array[iy] += dt * (0.05 + (i % 7) * 0.012)
      array[i * 3] += Math.sin(t * 0.3 + i) * dt * 0.02
      if (array[iy] > 4) {
        array[iy] = -3
        array[i * 3] = (Math.random() - 0.5) * 11
      }
    }
    attr.needsUpdate = true

    this.renderer.render(this.scene, this.camera)
    this.raf = requestAnimationFrame(this.loop)
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    this.host.removeEventListener('pointermove', this.onPointerMove)
    this.host.removeEventListener('pointerleave', this.onPointerLeave)
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const material = (mesh as THREE.Mesh).material
      if (Array.isArray(material)) material.forEach((m) => this.disposeMaterial(m))
      else if (material) this.disposeMaterial(material)
    })
    this.renderer.dispose()
  }

  private disposeMaterial(material: THREE.Material) {
    const map = (material as THREE.MeshBasicMaterial).map
    if (map) map.dispose()
    material.dispose()
  }
}
