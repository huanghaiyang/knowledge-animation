import * as THREE from 'three'
import type { LabMode } from '../data/book/types'
import type { Params, Toggles } from '../data/types'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'

const MINT = '#74f0c2'
const CYAN = '#62c9ff'
const AMBER = '#ffbd70'
const VIOLET = '#b8a2ff'
const DIM = '#3d5568'
const MUTED = '#7d97ab'

const CAMERA: Record<LabMode, CameraPreset[]> = {
  duality: [{ pos: [0.9, 2.1, 4.6], look: [0, 0.3, 1.4] }],
  wavepacket: [{ pos: [0, 0.35, 5.4], look: [0, 0, 0] }],
  well: [{ pos: [0, 0.2, 5.2], look: [0, 0.1, 0] }],
  tunneling: [{ pos: [0, 0.2, 5], look: [0, 0.15, 0] }],
  oscillator: [{ pos: [0, 0.3, 5.6], look: [0, -0.2, 0] }],
  coherent: [{ pos: [0, 0.3, 5.6], look: [0, -0.1, 0] }],
  operator: [{ pos: [1.7, 1.7, 5], look: [0, 0, 0] }],
  hydrogen: [{ pos: [2.2, 1.9, 4.8], look: [0, 0, 0] }]
}

interface WaveCurve {
  line: THREE.Line
  geometry: THREE.BufferGeometry
  positions: Float32Array
  samples: Float32Array
}

interface DualityState {
  screen: THREE.ShaderMaterial
  barrier: THREE.Group
  hits: THREE.Points
  hitPositions: Float32Array
  hitColors: Float32Array
  hitCursor: number
  hitTimer: number
  rings: Array<{ mesh: THREE.Mesh; sign: number; offset: number }>
}

interface WellState {
  curves: WaveCurve[]
  levelMaterials: THREE.LineBasicMaterial[]
  levelSprites: THREE.Sprite[]
}

interface HydrogenState {
  group: THREE.Group
  points: THREE.Points | null
}

export class QuantumLabScene implements LessonScene {
  private readonly rig: StageRig
  private readonly mode: LabMode
  private params: Params = {}
  private toggles: Toggles = {}
  private elapsed = 0

  private duality: DualityState | null = null
  private wavepacket: WaveCurve[] = []
  private well: WellState | null = null
  private tunneling: { barrier: THREE.Group; curves: WaveCurve[]; markers: THREE.Line[] } | null = null
  private oscillator: { curves: WaveCurve[]; levelMaterials: THREE.LineBasicMaterial[]; turning: THREE.Line[] } | null = null
  private coherent: { curves: WaveCurve[]; baseline: THREE.Line; dot: THREE.Sprite; trace: THREE.Line } | null = null
  private operator: { helix: WaveCurve; projection: WaveCurve; arrow: THREE.ArrowHelper } | null = null
  private hydrogen: HydrogenState | null = null
  private hydroKey = ''

  constructor(canvas: HTMLCanvasElement, mode: LabMode) {
    this.mode = mode
    this.rig = new StageRig(canvas, {
      presets: CAMERA[mode],
      bloomStrength: mode === 'duality' ? 0.35 : 0.85,
      tint: '#102a30'
    })

    switch (mode) {
      case 'duality':
        this.buildDuality()
        break
      case 'wavepacket':
        this.buildWavepacket()
        break
      case 'well':
        this.buildWell()
        break
      case 'tunneling':
        this.buildTunneling()
        break
      case 'oscillator':
        this.buildOscillator()
        break
      case 'coherent':
        this.buildCoherent()
        break
      case 'operator':
        this.buildOperator()
        break
      case 'hydrogen':
        this.buildHydrogen()
        break
    }

    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep() {
    // 书籍实验台是连续演化的，不跟随讲义步骤切换。
  }

  setParams(params: Params) {
    this.params = { ...params }
    if (this.mode === 'duality') this.syncDuality()
    if (this.mode === 'tunneling') this.syncTunneling()
    if (this.mode === 'oscillator') this.syncOscillator()
    if (this.mode === 'coherent') this.syncCoherent()
    if (this.mode === 'operator') this.syncOperator()
    if (this.mode === 'hydrogen') this.syncHydrogen()
  }

  setToggle(key: string, value: boolean) {
    this.toggles[key] = value
    if (this.mode === 'duality' && key === 'hits' && this.duality) {
      this.duality.hits.visible = value
    }
    if (this.mode === 'duality' && key === 'envelope' && this.duality) {
      this.duality.screen.uniforms.uEnvelope.value = value ? 1 : 0
    }
    if (this.mode === 'wavepacket') {
      const density = this.wavepacket[1]
      if (density) density.line.visible = key === 'density' ? value : density.line.visible
      const imag = this.wavepacket[2]
      if (imag) imag.line.visible = key === 'complex' ? value : imag.line.visible
    }
    if (this.mode === 'well' && this.well) {
      if (key === 'density') this.well.curves[1].line.visible = value
      if (key === 'superposition') this.well.curves[2].line.visible = value
    }
    if (this.mode === 'tunneling' && this.tunneling) {
      if (key === 'density') this.tunneling.curves[1].line.visible = value
      if (key === 'decay') for (const marker of this.tunneling.markers) marker.visible = value
    }
    if (this.mode === 'oscillator' && key === 'density' && this.oscillator) {
      this.oscillator.curves[1].line.visible = value
    }
    if (this.mode === 'oscillator' && key === 'classical' && this.oscillator) {
      for (const marker of this.oscillator.turning) marker.visible = value
    }
    if (this.mode === 'coherent') {
      if (key === 'density' && this.coherent) this.coherent.curves[1].line.visible = value
      if (key === 'classical' && this.coherent) this.coherent.trace.visible = value
    }
    if (this.mode === 'operator' && this.operator) {
      if (key === 'arrow') this.operator.arrow.visible = value
      if (key === 'complex') this.operator.projection.line.visible = value
    }
    if (this.mode === 'hydrogen') {
      if (key === 'axis' && this.hydrogen) {
        this.hydrogen.group.getObjectByName('axes')!.visible = value
      }
      if (key === 'cloud' && this.hydrogen?.points) this.hydrogen.points.visible = value
    }
  }

  dispose() {
    this.rig.dispose()
  }

  // ---------- 公共几何工具 ----------

  private curve(
    count: number,
    xmin: number,
    xmax: number,
    color: string,
    opacity = 1,
    z = 0
  ): WaveCurve {
    const positions = new Float32Array(count * 3)
    const samples = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const x = xmin + ((xmax - xmin) * i) / (count - 1)
      samples[i] = x
      positions[i * 3] = x
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = z
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: opacity < 1,
        opacity,
        toneMapped: false,
        depthWrite: false
      })
    )
    line.frustumCulled = false
    line.renderOrder = 6
    return { line, geometry, positions, samples }
  }

  private paint(curve: WaveCurve, evaluate: (x: number, index: number) => [number, number]) {
    const count = curve.samples.length
    for (let i = 0; i < count; i++) {
      const [y, z] = evaluate(curve.samples[i], i)
      curve.positions[i * 3] = curve.samples[i]
      curve.positions[i * 3 + 1] = y
      curve.positions[i * 3 + 2] = z
    }
    curve.geometry.getAttribute('position').needsUpdate = true
  }

  private horizontal(xmin: number, xmax: number, y: number, color: string, z = 0, opacity = 0.5) {
    const line = this.rig.makeLine(
      [new THREE.Vector3(xmin, y, z), new THREE.Vector3(xmax, y, z)],
      color,
      { opacity }
    )
    this.rig.add(line)
    return line
  }

  private vertical(x: number, ymin: number, ymax: number, color: string, z = 0, opacity = 0.5) {
    const line = this.rig.makeLine(
      [new THREE.Vector3(x, ymin, z), new THREE.Vector3(x, ymax, z)],
      color,
      { opacity }
    )
    this.rig.add(line)
    return line
  }

  private label(text: string, x: number, y: number, z: number, color = MUTED, scale = 0.34) {
    const sprite = this.rig.makeTextSprite(text, { color, scale, fontSize: 34 })
    sprite.position.set(x, y, z)
    this.rig.add(sprite)
    return sprite
  }

  private tick(_dt: number, elapsed: number) {
    this.elapsed = elapsed
    switch (this.mode) {
      case 'duality':
        this.tickDuality(elapsed)
        break
      case 'wavepacket':
        this.tickWavepacket(elapsed)
        break
      case 'well':
        this.tickWell(elapsed)
        break
      case 'tunneling':
        this.tickTunneling(elapsed)
        break
      case 'oscillator':
        this.tickOscillator()
        break
      case 'coherent':
        this.tickCoherent(elapsed)
        break
      case 'operator':
        this.tickOperator(elapsed)
        break
      case 'hydrogen':
        this.tickHydrogen()
        break
    }
  }

  // ---------- 1. 双缝 ----------

  private buildDuality() {
    const group = new THREE.Group()

    const barrier = new THREE.Group()
    group.add(barrier)

    const screenMaterial = new THREE.ShaderMaterial({
      transparent: false,
      uniforms: {
        uD: { value: 0.45 },
        uLambda: { value: 532 },
        uB: { value: 0.06 },
        uColor: { value: new THREE.Color(MINT) },
        uEnvelope: { value: 1 }
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
        uniform float uD;
        uniform float uLambda;
        uniform float uB;
        uniform vec3 uColor;
        uniform float uEnvelope;
        void main() {
          float xmm = (vUv.x - 0.5) * 12.0;
          float phase = 3.14159265 * uD * xmm / (uLambda * 1e-6 * 900.0);
          float fringe = cos(phase);
          fringe = fringe * fringe;
          float beta = 3.14159265 * uB * xmm / (uLambda * 1e-6 * 900.0);
          float sinc = beta <= 0.0001 ? 1.0 : sin(beta) / beta;
          float envelope = mix(1.0, sinc * sinc, uEnvelope);
          float edge = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          float vertical = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
          float intensity = fringe * envelope * edge * vertical;
          gl_FragColor = vec4(uColor * (0.04 + intensity * 0.62), 1.0);
        }
      `
    })

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 3), screenMaterial)
    screen.position.set(0, 0.35, 3)
    group.add(screen)

    const frame = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.4, -1.15, 3.01),
        new THREE.Vector3(2.4, -1.15, 3.01),
        new THREE.Vector3(2.4, 1.85, 3.01),
        new THREE.Vector3(-2.4, 1.85, 3.01)
      ]),
      new THREE.LineBasicMaterial({ color: new THREE.Color(MUTED), transparent: true, opacity: 0.35 })
    )
    group.add(frame)

    const glow = this.rig.makeGlowSprite(MINT, 0.55)
    glow.position.set(0, 0.2, -2.3)
    group.add(glow)
    const source = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.9, 12),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(MINT), transparent: true, opacity: 0.5 })
    )
    source.rotation.x = Math.PI / 2
    source.position.set(0, 0.2, -2.7)
    group.add(source)

    const hitCount = 620
    const hitPositions = new Float32Array(hitCount * 3)
    const hitColors = new Float32Array(hitCount * 3)
    for (let i = 0; i < hitCount; i++) hitPositions[i * 3 + 1] = -10
    const hitGeometry = new THREE.BufferGeometry()
    hitGeometry.setAttribute('position', new THREE.BufferAttribute(hitPositions, 3))
    hitGeometry.setAttribute('color', new THREE.BufferAttribute(hitColors, 3))
    const hits = new THREE.Points(
      hitGeometry,
      new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      })
    )
    group.add(hits)

    const rings: DualityState['rings'] = []
    for (const sign of [-1, 1]) {
      for (let i = 0; i < 9; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(CYAN),
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false
        })
        const mesh = new THREE.Mesh(new THREE.RingGeometry(0.91, 1, 72), material)
        group.add(mesh)
        rings.push({ mesh, sign, offset: i / 9 })
      }
    }

    this.label('电子源', -0.35, 1.5, -2.3, MUTED, 0.3)
    this.label('双缝', -2.55, 2.05, 0, MUTED, 0.38)
    this.label('探测屏', 2.55, 2.05, 3, MUTED, 0.38)
    this.rig.add(group)

    this.duality = {
      screen: screenMaterial,
      barrier,
      hits,
      hitPositions,
      hitColors,
      hitCursor: 0,
      hitTimer: 0,
      rings
    }

    this.syncDuality()
  }

  private syncDuality() {
    const state = this.duality
    if (!state) return
    const d = this.params.d ?? 0.45
    const lambda = this.params.lambda ?? 532
    state.screen.uniforms.uD.value = d
    state.screen.uniforms.uLambda.value = lambda
    const color = wavelengthColor(lambda)
    state.screen.uniforms.uColor.value.copy(color)
    const rgb = color
    for (let i = 0; i < state.hitColors.length / 3; i++) {
      state.hitColors[i * 3] = rgb.r
      state.hitColors[i * 3 + 1] = rgb.g
      state.hitColors[i * 3 + 2] = rgb.b
    }
    state.hits.geometry.getAttribute('color').needsUpdate = true

    const slitX = 0.18 + d * 1.2
    this.rig.clearGroup(state.barrier)
    const gap = 0.07
    const spans: Array<[number, number]> = [
      [-2.2, -slitX - gap],
      [-slitX + gap, slitX - gap],
      [slitX + gap, 2.2]
    ]
    for (const [a, b] of spans) {
      if (b - a < 0.03) continue
      const width = b - a
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(width, 3, 0.05),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(MUTED),
          transparent: true,
          opacity: 0.38,
          toneMapped: false
        })
      )
      slab.position.set((a + b) / 2, 0.35, 0)
      state.barrier.add(slab)
    }
    for (const sign of [-1, 1]) {
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 2.2, 0.02),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(MINT), transparent: true, opacity: 0.8, toneMapped: false })
      )
      edge.position.set(sign * slitX, 0.35, 0.04)
      state.barrier.add(edge)
    }
  }

  private tickDuality(elapsed: number) {
    const state = this.duality
    if (!state) return
    const d = this.params.d ?? 0.45
    const lambda = this.params.lambda ?? 532
    const slitX = 0.18 + d * 1.2

    for (const ring of state.rings) {
      const phase = (elapsed * 0.55 + ring.offset) % 1
      const z = phase * 3
      const radius = 0.18 + z * 0.6
      ring.mesh.position.set(ring.sign * slitX, 0.35, z)
      ring.mesh.scale.setScalar(radius)
      ;(ring.mesh.material as THREE.MeshBasicMaterial).opacity = 0.22 * (1 - phase)
    }

    if (this.toggles.hits !== false) {
      state.hitTimer += 0.016
      if (state.hitTimer > 0.06) {
        state.hitTimer = 0
        for (let k = 0; k < 2; k++) {
          const index = state.hitCursor % (state.hitPositions.length / 3)
          state.hitCursor += 1
          const xmm = sampleFringe(d, lambda)
          state.hitPositions[index * 3] = xmm * 0.4
          state.hitPositions[index * 3 + 1] = (Math.random() - 0.5) * 2.3
          state.hitPositions[index * 3 + 2] = 3.03 + Math.random() * 0.02
        }
        state.hits.geometry.getAttribute('position').needsUpdate = true
      }
    }
  }

  // ---------- 2. 自由波包 ----------

  private buildWavepacket() {
    const real = this.curve(300, -3.8, 3.8, MINT, 0.95)
    const density = this.curve(300, -3.8, 3.8, AMBER, 0.85)
    const imag = this.curve(300, -3.8, 3.8, VIOLET, 0.5, 1.1)
    this.rig.add(real.line)
    this.rig.add(density.line)
    this.rig.add(imag.line)
    this.wavepacket = [real, density, imag]

    this.horizontal(-3.8, 3.8, 0, DIM, 0, 0.4)
    this.label('Re ψ', -3.55, 1.35, 0, MINT, 0.3)
    this.label('|ψ|²', -3.55, -1.5, 0, AMBER, 0.3)
    this.label('Im ψ', 3.3, 1.55, 1.1, VIOLET, 0.28)
    this.label('x', 3.7, -0.25, 0, MUTED, 0.28)
  }

  private tickWavepacket(elapsed: number) {
    const k0 = this.params.k0 ?? 2.2
    const sigma0 = this.params.sigma0 ?? 0.8
    const t = elapsed * 0.55
    const travel = 6.4
    const x0 = -3.4 + ((elapsed * k0 * 0.32) % travel)
    const sigma = Math.min(2, Math.sqrt(sigma0 * sigma0 + (t * 0.42 / sigma0) ** 2))
    const omega = 0.5 * k0 * k0
    const phase = k0 * x0 - omega * t

    const real = this.wavepacket[0]
    const density = this.wavepacket[1]
    const imag = this.wavepacket[2]
    this.paint(real, (x) => {
      const env = Math.exp(-((x - x0) ** 2) / (2 * sigma * sigma))
      return [0.35 + 0.85 * env * Math.cos(k0 * x - phase), 0]
    })
    this.paint(density, (x) => {
      const env = Math.exp(-((x - x0) ** 2) / (sigma * sigma))
      return [-1.05 + 0.72 * env, 0]
    })
    this.paint(imag, (x) => {
      const env = Math.exp(-((x - x0) ** 2) / (2 * sigma * sigma))
      return [0.35 + 0.85 * env * Math.sin(k0 * x - phase), 1.1]
    })
    if (this.toggles.density === false) density.line.visible = false
    if (this.toggles.complex === false) imag.line.visible = false
  }

  // ---------- 3. 无限深势阱 ----------

  private buildWell() {
    const group = new THREE.Group()
    const half = 1.6
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(MUTED),
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false
    })
    for (const sign of [-1, 1]) {
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.02), wallMaterial)
      wall.position.set(sign * half, 0.2, 0)
      wall.rotation.z = Math.PI / 2
      group.add(wall)
    }
    this.vertical(-half, -1.8, 2.1, MINT, 0, 0.55)
    this.vertical(half, -1.8, 2.1, MINT, 0, 0.55)
    this.horizontal(-half, half, -1.8, DIM, 0, 0.35)

    const levelMaterials: THREE.LineBasicMaterial[] = []
    const levelSprites: THREE.Sprite[] = []
    for (let n = 1; n <= 6; n++) {
      const y = levelY(n)
      const line = this.rig.makeLine(
        [new THREE.Vector3(-half, y, -0.05), new THREE.Vector3(half, y, -0.05)],
        n === 1 ? MINT : MUTED,
        { dashed: true, opacity: 0.35 }
      )
      group.add(line)
      levelMaterials.push(line.material as THREE.LineBasicMaterial)
      const sprite = this.rig.makeTextSprite(`n=${n}`, { color: DIM, scale: 0.26, fontSize: 30 })
      sprite.position.set(-2.0, y, 0)
      group.add(sprite)
      levelSprites.push(sprite)
    }

    const psi = this.curve(340, -half, half, MINT, 1)
    const density = this.curve(340, -half, half, AMBER, 0.8)
    const mixed = this.curve(340, -half, half, CYAN, 0.9)
    group.add(psi.line, density.line, mixed.line)

    this.label('−L/2', -half, -2.05, 0, MUTED, 0.26)
    this.label('+L/2', half, -2.05, 0, MUTED, 0.26)
    this.label('E ∝ n²', 1.7, 1.85, 0, AMBER, 0.28)
    this.rig.add(group)

    this.well = { curves: [psi, density, mixed], levelMaterials, levelSprites }
    this.tickWell(0)
  }

  private tickWell(_elapsed: number) {
    const state = this.well
    if (!state) return
    const n = Math.max(1, Math.min(6, Math.round(this.params.n ?? 2)))
    const mix = Math.max(0, Math.min(1, this.params.mix ?? 0.35))
    const half = 1.6
    const length = 3.2

    const shape = (x: number, m: number) => Math.sqrt(2 / length) * Math.sin(m * Math.PI * (x + half) / length)

    const psi = state.curves[0]
    const density = state.curves[1]
    const mixed = state.curves[2]
    const baseline = levelY(n)
    const phase = this.elapsed * 1.6

    this.paint(psi, (x) => {
      if (this.toggles.superposition) {
        const next = Math.min(6, n + 1)
        const normalized = Math.sqrt(1 + mix * mix)
        const value = (shape(x, n) + mix * shape(x, next) * Math.cos(phase)) / normalized
        return [baseline + 0.26 * value, 0]
      }
      return [baseline + 0.26 * shape(x, n), 0]
    })
    this.paint(density, (x) => {
      const value = shape(x, n)
      return [baseline + 0.26 * value * value, 0.12]
    })
    this.paint(mixed, (x) => {
      const next = Math.min(6, n + 1)
      const value = shape(x, n) * Math.cos(phase) + mix * shape(x, next) * Math.sin(phase)
      return [levelY(n + 1) + 0.26 * value, 0]
    })

    state.levelMaterials.forEach((material, index) => {
      const level = index + 1
      material.opacity = level === n || (this.toggles.superposition && level === n + 1) ? 0.8 : 0.22
      material.color.set(level === n ? MINT : MUTED)
    })
    state.levelSprites.forEach((sprite, index) => {
      sprite.material.opacity = index + 1 === n ? 1 : 0.45
    })

    psi.line.visible = true
    density.line.visible = this.toggles.density !== false
    mixed.line.visible = this.toggles.superposition === true
  }

  // ---------- 4. 势垒贯穿 ----------

  private buildTunneling() {
    const group = new THREE.Group()
    const barrier = new THREE.Group()
    group.add(barrier)

    const wave = this.curve(360, -3.8, 3.8, MINT, 0.95)
    const density = this.curve(360, -3.8, 3.8, AMBER, 0.8)
    group.add(wave.line, density.line)

    const markers: THREE.Line[] = []
    for (let i = 0; i < 2; i++) {
      const marker = this.rig.makeLine(
        [new THREE.Vector3(0, -0.4, 0), new THREE.Vector3(0, 1.35, 0)],
        VIOLET,
        { dashed: true, opacity: 0.65 }
      )
      group.add(marker)
      markers.push(marker)
    }

    this.horizontal(-3.8, 3.8, -0.25, DIM, 0, 0.35)
    this.label('入射', -3.4, 1.2, 0, MUTED, 0.3)
    this.label('势垒', 0, 1.75, 0, AMBER, 0.34)
    this.label('透射', 3.25, 1.2, 0, MUTED, 0.3)
    this.rig.add(group)

    this.tunneling = { barrier, curves: [wave, density], markers }
    this.syncTunneling()
    this.tickTunneling(0)
  }

  private syncTunneling() {
    const state = this.tunneling
    if (!state) return
    const width = this.params.width ?? 0.7
    const half = width * 0.65 + 0.18
    this.rig.clearGroup(state.barrier)
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(half * 2, 1.15, 0.6),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(AMBER),
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        toneMapped: false
      })
    )
    block.position.set(0, 0.33, 0)
    state.barrier.add(block)
    const outline = new THREE.LineSegments(
      new THREE.EdgesGeometry(block.geometry),
      new THREE.LineBasicMaterial({ color: new THREE.Color(AMBER), transparent: true, opacity: 0.8, toneMapped: false })
    )
    outline.position.copy(block.position)
    state.barrier.add(outline)

    const decayRate = 1.9 * Math.sqrt(1 - (this.params.ratio ?? 0.6))
    for (let i = 0; i < state.markers.length; i++) {
      const x = Math.min(half, -half + (i + 1) * (0.9 / decayRate))
      state.markers[i].position.x = x
      state.markers[i].visible = this.toggles.decay !== false
    }
  }

  private tickTunneling(elapsed: number) {
    const state = this.tunneling
    if (!state) return
    const width = this.params.width ?? 0.7
    const ratio = this.params.ratio ?? 0.6
    const half = width * 0.65 + 0.18
    const k = 1.4 + ratio * 1.7
    const decayRate = 1.9 * Math.sqrt(1 - ratio)
    const t = elapsed * 1.4
    const amplitude = Math.max(0.12, Math.exp(-decayRate * width))

    const value = (x: number) => {
      if (x < -half) {
        const env = Math.exp(-((x + half) ** 2) / 3.2)
        return env * Math.cos(k * (x + half) - t)
      }
      if (x <= half) {
        const decay = Math.exp(-decayRate * (x + half))
        return decay * Math.cos(-t)
      }
      const phaseShift = k * 2 * half
      return amplitude * Math.cos(k * (x - half) - t + phaseShift)
    }

    this.paint(state.curves[0], (x) => [0.4 + 0.5 * value(x), 0])
    this.paint(state.curves[1], (x) => {
      const v = value(x)
      const norm = x < -half ? 1 : x <= half ? Math.exp(-2 * decayRate * (x + half)) : amplitude * amplitude
      return [-0.5 + 0.55 * norm, 0]
    })
    state.curves[1].line.visible = this.toggles.density !== false
  }

  // ---------- 5. 量子谐振子 ----------

  private buildOscillator() {
    const group = new THREE.Group()
    const parabola: THREE.Vector3[] = []
    for (let i = 0; i <= 180; i++) {
      const x = -4 + (8 * i) / 180
      parabola.push(new THREE.Vector3(x, potential(x), 0))
    }
    const curve = this.rig.makeLine(parabola, AMBER, { opacity: 0.6 })
    group.add(curve)

    const levelMaterials: THREE.LineBasicMaterial[] = []
    for (let n = 0; n <= 7; n++) {
      const y = energy(n)
      const line = this.rig.makeLine(
        [new THREE.Vector3(-4, y, -0.04), new THREE.Vector3(4, y, -0.04)],
        MUTED,
        { dashed: true, opacity: 0.28 }
      )
      group.add(line)
      levelMaterials.push(line.material as THREE.LineBasicMaterial)
    }

    const psi = this.curve(360, -4, 4, MINT, 1)
    const density = this.curve(360, -4, 4, AMBER, 0.8)
    group.add(psi.line, density.line)

    const turning: THREE.Line[] = []
    for (let i = 0; i < 2; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(0, -1.4, 0), new THREE.Vector3(0, 1.2, 0)],
        VIOLET,
        { dashed: true, opacity: 0.55 }
      )
      group.add(line)
      turning.push(line)
    }

    this.horizontal(-4, 4, -1.4, DIM, 0, 0.32)
    this.label('V(x) = ½ mω²x²', -3.4, 1.65, 0, AMBER, 0.28)
    this.label('零点能', 2.9, -1.05, 0, MINT, 0.25)
    this.rig.add(group)

    this.oscillator = { curves: [psi, density], levelMaterials, turning }
    this.syncOscillator()
            this.tickOscillator()
  }

  private syncOscillator() {
    const state = this.oscillator
    if (!state) return
    const n = Math.max(0, Math.min(7, Math.round(this.params.n ?? 2)))
    const xt = Math.sqrt(2 * n + 1)
    for (let i = 0; i < 2; i++) {
      const x = i === 0 ? -xt : xt
      state.turning[i].position.x = x
      state.turning[i].visible = this.toggles.classical !== false
    }
  }

  private tickOscillator() {
    const state = this.oscillator
    if (!state) return
    const n = Math.max(0, Math.min(7, Math.round(this.params.n ?? 2)))
    const baseline = energy(n)
    const xs: number[] = []
    let max = 0
    for (let i = 0; i < 360; i++) {
      const x = -4 + (8 * i) / 359
      const value = hermite(n, x) * Math.exp(-x * x / 2)
      xs.push(value)
      max = Math.max(max, Math.abs(value))
    }
    const scale = max > 0 ? 0.24 / max : 0
    this.paint(state.curves[0], (x, index) => [baseline + scale * xs[index], 0])
    this.paint(state.curves[1], (x, index) => [baseline + 0.24 * (xs[index] / Math.max(max, 1e-6)) ** 2, 0.1])

    state.levelMaterials.forEach((material, index) => {
      material.opacity = index === n ? 0.8 : 0.2
      material.color.set(index === n ? MINT : MUTED)
    })
    state.curves[0].line.visible = true
    state.curves[1].line.visible = this.toggles.density !== false
  }

  // ---------- 6. 相干态 ----------

  private buildCoherent() {
    const group = new THREE.Group()
    const parabola: THREE.Vector3[] = []
    for (let i = 0; i <= 180; i++) {
      const x = -4 + (8 * i) / 180
      parabola.push(new THREE.Vector3(x, potential(x), 0))
    }
    group.add(this.rig.makeLine(parabola, AMBER, { opacity: 0.55 }))

    const trace = this.rig.makeLine(
      [new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)],
      VIOLET,
      { dashed: true, opacity: 0.5 }
    )
    group.add(trace)

    const baseline = this.rig.makeLine(
      [new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0)],
      MINT,
      { opacity: 0.35 }
    )
    group.add(baseline)

    const psi = this.curve(320, -4, 4, MINT, 0.95)
    const density = this.curve(320, -4, 4, AMBER, 0.85)
    group.add(psi.line, density.line)

    const dot = this.rig.makeGlowSprite(MINT, 0.34)
    group.add(dot)

    this.horizontal(-4, 4, -1.4, DIM, 0, 0.3)
    this.label('经典振幅 A', -3.1, 1.6, 0, MUTED, 0.27)
    this.rig.add(group)

    this.coherent = { curves: [psi, density], baseline, dot, trace }
    this.syncCoherent()
  }

  private syncCoherent() {
    const state = this.coherent
    if (!state) return
    const amp = this.params.amp ?? 1.4
    const level = energyFromAmplitude(amp)
    state.baseline.position.y = level
    const trace = state.trace
    trace.geometry.setFromPoints([
      new THREE.Vector3(-amp, level, 0),
      new THREE.Vector3(amp, level, 0)
    ])
    trace.computeLineDistances()
    trace.visible = this.toggles.classical !== false
  }

  private tickCoherent(elapsed: number) {
    const state = this.coherent
    if (!state) return
    const amp = this.params.amp ?? 1.4
    const speed = this.params.speed ?? 1
    const level = energyFromAmplitude(amp)
    const xc = amp * Math.cos(elapsed * speed * 0.9)
    const sigma = 0.5
    const k = 2.4

    this.paint(state.curves[0], (x) => {
      const env = Math.exp(-((x - xc) ** 2) / (2 * sigma * sigma))
      return [level + 0.32 * env * Math.cos(k * (x - xc)), 0]
    })
    this.paint(state.curves[1], (x) => {
      const env = Math.exp(-((x - xc) ** 2) / (sigma * sigma))
      return [level + 0.32 * env, 0.1]
    })
    state.dot.position.set(xc, potential(xc) + 0.12, 0.12)
    state.curves[1].line.visible = this.toggles.density !== false
    state.trace.visible = this.toggles.classical !== false
  }

  // ---------- 7. 算符 ----------

  private buildOperator() {
    const group = new THREE.Group()
    const axis = this.rig.makeLine(
      [new THREE.Vector3(-3.8, 0, 0), new THREE.Vector3(3.8, 0, 0)],
      DIM,
      { opacity: 0.45 }
    )
    group.add(axis)

    const helix = this.curve(420, -3.4, 3.4, MINT, 1)
    const projection = this.curve(420, -3.4, 3.4, CYAN, 0.7)
    group.add(helix.line, projection.line)

    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-2.4, -1.75, 0),
      2,
      new THREE.Color(MINT),
      0.22,
      0.12
    )
    group.add(arrow)

    this.label('Re ψ', -3.6, 1.25, 0, MINT, 0.28)
    this.label('Im ψ', 3.35, 0.1, 1.6, VIOLET, 0.26)
    this.label('p = ħk', 0.45, -2.15, 0, MINT, 0.3)
    this.rig.add(group)

    this.operator = { helix, projection, arrow }
    this.syncOperator()
  }

  private syncOperator() {
    const state = this.operator
    if (!state) return
    const k = this.params.k ?? 1.6
    state.arrow.setLength(k * 1.3, 0.2, 0.11)
    state.projection.line.visible = this.toggles.complex !== false
  }

  private tickOperator(elapsed: number) {
    const state = this.operator
    if (!state) return
    const k = this.params.k ?? 1.6
    const t = elapsed * 1.7
    const complex = this.toggles.complex !== false
    this.paint(state.helix, (x) => [0.55 * Math.cos(k * x - t), complex ? 0.65 * Math.sin(k * x - t) : 0])
    this.paint(state.projection, (x) => [-1.05 + 0.4 * Math.cos(k * x - t), 0])
    state.arrow.visible = this.toggles.arrow !== false
  }

  // ---------- 8. 氢原子 ----------

  private buildHydrogen() {
    const group = new THREE.Group()

    const axes = new THREE.Group()
    axes.name = 'axes'
    const axisMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(MUTED),
      transparent: true,
      opacity: 0.45,
      toneMapped: false
    })
    const xLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.6, 0, 0),
        new THREE.Vector3(2.6, 0, 0)
      ]),
      axisMaterial
    )
    const yLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2.6, 0),
        new THREE.Vector3(0, 2.6, 0)
      ]),
      axisMaterial
    )
    const zLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -2.6),
        new THREE.Vector3(0, 0, 2.6)
      ]),
      axisMaterial
    )
    axes.add(xLine, yLine, zLine)
    const xLabel = this.rig.makeTextSprite('x', { color: MUTED, scale: 0.26, fontSize: 30 })
    xLabel.position.set(2.75, -0.18, 0)
    const yLabel = this.rig.makeTextSprite('z', { color: MUTED, scale: 0.26, fontSize: 30 })
    yLabel.position.set(-0.18, 2.75, 0)
    const zLabel = this.rig.makeTextSprite('y', { color: MUTED, scale: 0.26, fontSize: 30 })
    zLabel.position.set(0, -0.18, 2.75)
    axes.add(xLabel, yLabel, zLabel)
    group.add(axes)

    const nucleus = this.rig.makeGlowSprite(AMBER, 0.42)
    group.add(nucleus)
    const nucleusLabel = this.rig.makeTextSprite('p⁺', { color: MINT, scale: 0.22, fontSize: 28 })
    nucleusLabel.position.set(0, -0.32, 0)
    group.add(nucleusLabel)

    this.rig.add(group)
    this.hydrogen = { group, points: null }
    this.syncHydrogen()
  }

  private syncHydrogen() {
    const state = this.hydrogen
    if (!state) return
    const n = Math.max(1, Math.min(3, Math.round(this.params.n ?? 2)))
    const l = Math.max(0, Math.min(n - 1, Math.round(this.params.l ?? 1)))
    const m = Math.max(-l, Math.min(l, Math.round(this.params.m ?? 0)))
    const key = `${n}-${l}-${m}`
    if (key === this.hydroKey && state.points) return
    this.hydroKey = key
    if (state.points) {
      state.group.remove(state.points)
      state.points.geometry.dispose()
      ;(state.points.material as THREE.Material).dispose()
    }
    state.points = this.buildHydrogenCloud(n, l, m)
    state.group.add(state.points)
  }

  private buildHydrogenCloud(n: number, l: number, m: number): THREE.Points {
    const count = 4600
    const rMax = 2.8 * n * n + 2
    const steps = 900
    const cdf = new Float32Array(steps + 1)
    let total = 0
    for (let i = 0; i <= steps; i++) {
      const r = (rMax * i) / steps
      const radial = radialPart(n, l, r)
      total += radial * radial * r * r
      cdf[i] = total
    }

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scale = 2.25 / rMax
    const positive = new THREE.Color(MINT)
    const negative = new THREE.Color(CYAN)
    const sampleRadial = () => {
      const target = Math.random() * total
      let low = 0
      let high = steps
      while (low < high) {
        const mid = Math.floor((low + high) / 2)
        if (cdf[mid] < target) low = mid + 1
        else high = mid
      }
      return (rMax * low) / steps
    }

    for (let i = 0; i < count; i++) {
      let dx = 0
      let dy = 0
      let dz = 1
      let ylm = 0
      for (let attempt = 0; attempt < 80; attempt++) {
        const u = Math.random() * 2 - 1
        const phi = Math.random() * Math.PI * 2
        const st = Math.sqrt(1 - u * u)
        dx = st * Math.cos(phi)
        dy = st * Math.sin(phi)
        dz = u
        ylm = realSpherical(l, m, dx, dy, dz)
        if (Math.random() < (ylm * ylm) / 0.42) break
      }
      const r = sampleRadial()
      positions[i * 3] = dx * r * scale
      positions[i * 3 + 1] = dz * r * scale
      positions[i * 3 + 2] = dy * r * scale
      const color = ylm >= 0 ? positive : negative
      const strength = 0.35 + 0.65 * Math.min(1, (ylm * ylm) / 0.42)
      colors[i * 3] = color.r * strength
      colors[i * 3 + 1] = color.g * strength
      colors[i * 3 + 2] = color.b * strength
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.042,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        toneMapped: false
      })
    )
    points.frustumCulled = false
    points.visible = this.toggles.cloud !== false
    return points
  }

  private tickHydrogen() {
    if (!this.hydrogen) return
    this.hydrogen.group.rotation.y += 0.0022
    this.hydrogen.group.rotation.x = 0.12
  }
}

// ---------- 数学与颜色工具 ----------

function wavelengthColor(nm: number) {
  let r = 0
  let g = 0
  let b = 0
  if (nm < 440) {
    r = (440 - nm) / 60
    b = 1
  } else if (nm < 490) {
    g = (nm - 440) / 50
    b = 1
  } else if (nm < 510) {
    g = 1
    b = (510 - nm) / 20
  } else if (nm < 580) {
    r = (nm - 510) / 70
    g = 1
    b = 0
  } else if (nm < 645) {
    r = 1
    g = (645 - nm) / 65
    b = 0
  } else {
    r = 1
    g = 0.35
    b = 0
  }
  return new THREE.Color(Math.min(1, r * 0.9 + 0.1), Math.min(1, g * 0.9 + 0.1), Math.min(1, b * 0.9 + 0.1))
}

function sampleFringe(d: number, lambda: number) {
  for (let i = 0; i < 60; i++) {
    const xmm = (Math.random() - 0.5) * 12
    const phase = Math.PI * d * xmm / (lambda * 1e-6 * 900)
    const beta = Math.PI * 0.06 * xmm / (lambda * 1e-6 * 900)
    const sinc = beta <= 0.0001 ? 1 : Math.sin(beta) / beta
    const probability = Math.cos(phase) ** 2 * sinc * sinc
    if (Math.random() < probability) return xmm
  }
  return 0
}

function levelY(n: number) {
  return -1.55 + (n * n / 36) * 3.2
}

function potential(x: number) {
  return -1.4 + 0.25 * x * x
}

function energy(n: number) {
  return -1.4 + 0.5 * (n + 0.5)
}

function energyFromAmplitude(amplitude: number) {
  return -1.4 + 0.5 * (amplitude * amplitude + 1)
}

function hermite(n: number, x: number) {
  if (n === 0) return 1
  if (n === 1) return 2 * x
  let h0 = 1
  let h1 = 2 * x
  for (let k = 1; k < n; k++) {
    const h2 = 2 * x * h1 - 2 * k * h0
    h0 = h1
    h1 = h2
  }
  return h1
}

function laguerre(k: number, alpha: number, x: number) {
  if (k === 0) return 1
  let l0 = 1
  let l1 = 1 + alpha - x
  for (let i = 1; i < k; i++) {
    const l2 = ((2 * i + 1 + alpha - x) * l1 - (i + alpha) * l0) / (i + 1)
    l0 = l1
    l1 = l2
  }
  return l1
}

function radialPart(n: number, l: number, r: number) {
  const x = 2 * r / n
  return Math.pow(x, l) * Math.exp(-x / 2) * laguerre(n - l - 1, 2 * l + 1, x)
}

function realSpherical(l: number, m: number, x: number, y: number, z: number) {
  if (l === 0) return 0.282095
  if (l === 1) {
    if (m === -1) return 0.488603 * y
    if (m === 0) return 0.488603 * z
    return 0.488603 * x
  }
  if (l === 2) {
    if (m === -2) return 1.092548 * x * y
    if (m === -1) return 1.092548 * y * z
    if (m === 0) return 0.315391 * (3 * z * z - 1)
    if (m === 1) return 1.092548 * x * z
    return 0.546395 * (x * x - y * y)
  }
  return 0.282095
}
