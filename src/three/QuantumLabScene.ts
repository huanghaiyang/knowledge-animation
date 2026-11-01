import * as THREE from 'three'
import type { LabMode } from '../data/book/types'
import {
  bohrEnergy,
  chainGap,
  chainLevel,
  cutoffFrequency,
  doubleWellSplit,
  finiteWellSolutions,
  HC_EV_NM,
  photoelectronKmax,
  planckDensity,
  photonEnergy,
  rayleighDensity,
  stmDecay,
  vibrationLevel,
  wienDensity,
  wienPeakNm
} from '../data/book/physics'
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
  hydrogen: [{ pos: [2.2, 1.9, 4.8], look: [0, 0, 0] }],
  spectrum: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  photoelectric: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  levels: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  bohr: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  uncertainty: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  finitewell: [{ pos: [0, 0.2, 5.2], look: [0, 0.1, 0] }],
  step: [{ pos: [0, 0.2, 5.2], look: [0, 0.1, 0] }],
  delta: [{ pos: [0, 0.2, 5.2], look: [0, 0.1, 0] }],
  doublewell: [{ pos: [0, 0.2, 5.2], look: [0, 0.1, 0] }],
  molecular: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  angular: [{ pos: [2.1, 1.9, 4.8], look: [0, 0, 0] }],
  ladder: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  radial: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  resonance: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  linear: [{ pos: [0, 0.2, 5.2], look: [0, 0.1, 0] }],
  chain: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }],
  stm: [{ pos: [0, 0.1, 5.2], look: [0, 0.1, 0] }]
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

  private spectrumState: { curves: WaveCurve[]; peak: THREE.Line } | null = null
  private photoState: { curves: WaveCurve[]; cutoff: THREE.Line; electrons: THREE.Sprite[] } | null = null
  private levelsState: { lines: THREE.Line[]; materials: THREE.LineBasicMaterial[]; sprites: THREE.Sprite[] } | null = null
  private bohrState: { materials: THREE.LineBasicMaterial[]; sprites: THREE.Sprite[]; arrow: THREE.Line; photon: THREE.Sprite } | null = null
  private uncertaintyState: { curves: WaveCurve[] } | null = null
  private finiteWellState: { curves: WaveCurve[]; levels: THREE.Line[]; materials: THREE.LineBasicMaterial[] } | null = null
  private stepState: { curves: WaveCurve[]; marker: THREE.Line } | null = null
  private deltaState: { curves: WaveCurve[]; marker: THREE.Line } | null = null
  private doubleWellState: { curves: WaveCurve[]; levels: THREE.Line[] } | null = null
  private molecularState: { curves: WaveCurve[]; levels: THREE.Line[]; sprites: THREE.Sprite[] } | null = null
  private angularState: {
    group: THREE.Group
    surface: THREE.Mesh | null
    points: THREE.Points | null
  } | null = null
  private angularKey = ''
  private ladderState: {
    lines: THREE.Line[]
    materials: THREE.LineBasicMaterial[]
    sprites: THREE.Sprite[]
    arrow: THREE.Line
    glow: THREE.Sprite
  } | null = null
  private radialState: { curves: WaveCurve[]; marker: THREE.Line } | null = null
  private resonanceState: { curves: WaveCurve[]; marker: THREE.Line; sprites: THREE.Sprite[] } | null = null
  private linearState: { curves: WaveCurve[]; marker: THREE.Line } | null = null
  private chainState: {
    levels: THREE.Line[]
    materials: THREE.LineBasicMaterial[]
    sprites: THREE.Sprite[]
    gap: THREE.Line
    swatch: THREE.Mesh
  } | null = null
  private stmState: { curve: WaveCurve; marker: THREE.Line; guide: THREE.Line } | null = null

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
      case 'spectrum':
        this.buildSpectrum()
        break
      case 'photoelectric':
        this.buildPhotoelectric()
        break
      case 'levels':
        this.buildLevels()
        break
      case 'bohr':
        this.buildBohr()
        break
      case 'uncertainty':
        this.buildUncertainty()
        break
      case 'finitewell':
        this.buildFiniteWell()
        break
      case 'step':
        this.buildStep()
        break
      case 'delta':
        this.buildDelta()
        break
      case 'doublewell':
        this.buildDoubleWell()
        break
      case 'molecular':
        this.buildMolecular()
        break
      case 'angular':
        this.buildAngular()
        break
      case 'ladder':
        this.buildLadder()
        break
      case 'radial':
        this.buildRadial()
        break
      case 'resonance':
        this.buildResonance()
        break
      case 'linear':
        this.buildLinear()
        break
      case 'chain':
        this.buildChain()
        break
      case 'stm':
        this.buildStm()
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
    if (this.mode === 'spectrum') this.syncSpectrum()
    if (this.mode === 'photoelectric') this.syncPhotoelectric()
    if (this.mode === 'levels') this.syncLevels()
    if (this.mode === 'bohr') this.syncBohr()
    if (this.mode === 'uncertainty') this.syncUncertainty()
    if (this.mode === 'finitewell') this.syncFiniteWell()
    if (this.mode === 'step') this.syncStep()
    if (this.mode === 'delta') this.syncDelta()
    if (this.mode === 'doublewell') this.syncDoubleWell()
    if (this.mode === 'molecular') this.syncMolecular()
    if (this.mode === 'angular') this.syncAngular()
    if (this.mode === 'ladder') this.syncLadder()
    if (this.mode === 'radial') this.syncRadial()
    if (this.mode === 'resonance') this.syncResonance()
    if (this.mode === 'linear') this.syncLinear()
    if (this.mode === 'chain') this.syncChain()
    if (this.mode === 'stm') this.syncStm()
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
    if (this.mode === 'spectrum' && this.spectrumState) {
      if (key === 'rayleigh') this.spectrumState.curves[1].line.visible = value
      if (key === 'wien') this.spectrumState.curves[2].line.visible = value
      if (key === 'peak') this.spectrumState.peak.visible = value
    }
    if (this.mode === 'photoelectric' && this.photoState) {
      if (key === 'classical') this.photoState.curves[1].line.visible = value
      if (key === 'cutoff') this.photoState.cutoff.visible = value
      if (key === 'electrons') for (const electron of this.photoState.electrons) electron.visible = value
    }
    if (this.mode === 'levels' && this.levelsState) {
      if (key === 'dense') for (const line of this.levelsState.lines) line.visible = true
      if (key === 'labels') for (const sprite of this.levelsState.sprites) sprite.visible = value
    }
    if (this.mode === 'bohr' && this.bohrState) {
      if (key === 'arrow') this.bohrState.arrow.visible = value
      if (key === 'photon') this.bohrState.photon.visible = value
    }
    if (this.mode === 'uncertainty' && this.uncertaintyState) {
      if (key === 'density') this.uncertaintyState.curves[1].line.visible = value
      if (key === 'momentum') this.uncertaintyState.curves[2].line.visible = value
    }
    if (this.mode === 'finitewell' && this.finiteWellState) {
      if (key === 'density') this.finiteWellState.curves[1].line.visible = value
      if (key === 'tail') this.finiteWellState.curves[2].line.visible = value
    }
    if (this.mode === 'step' && this.stepState) {
      if (key === 'density') this.stepState.curves[1].line.visible = value
      if (key === 'transmitted') this.stepState.curves[2].line.visible = value
    }
    if (this.mode === 'delta' && this.deltaState) {
      if (key === 'density') this.deltaState.curves[1].line.visible = value
      if (key === 'scattering') this.deltaState.curves[2].line.visible = value
    }
    if (this.mode === 'doublewell' && this.doubleWellState) {
      if (key === 'antisymmetric') this.doubleWellState.curves[1].line.visible = value
      if (key === 'density') this.doubleWellState.curves[2].line.visible = value
    }
    if (this.mode === 'molecular' && this.molecularState) {
      if (key === 'levels') for (const line of this.molecularState.levels) line.visible = value
      if (key === 'labels') for (const sprite of this.molecularState.sprites) sprite.visible = value
    }
    if (this.mode === 'angular') {
      if (key === 'cloud' && this.angularState?.points) this.angularState.points.visible = value
      if (key === 'axis' && this.angularState) {
        this.angularState.group.getObjectByName('axes')!.visible = value
      }
    }
    if (this.mode === 'ladder' && this.ladderState) {
      if (key === 'labels') for (const sprite of this.ladderState.sprites) sprite.visible = value
    }
    if (this.mode === 'radial' && this.radialState) {
      if (key === 'density') this.radialState.curves[1].line.visible = value
    }
    if (this.mode === 'resonance' && this.resonanceState) {
      if (key === 'modes') for (const sprite of this.resonanceState.sprites) sprite.visible = value
      if (key === 'marker') this.resonanceState.marker.visible = value
    }
    if (this.mode === 'linear' && this.linearState) {
      if (key === 'wave') this.linearState.curves[0].line.visible = value
      if (key === 'density') this.linearState.curves[1].line.visible = value
    }
    if (this.mode === 'chain' && this.chainState) {
      if (key === 'labels') for (const sprite of this.chainState.sprites) sprite.visible = value
      if (key === 'gap') this.chainState.gap.visible = value
    }
    if (this.mode === 'stm' && this.stmState) {
      if (key === 'marker') this.stmState.marker.visible = value
      if (key === 'decay') this.stmState.guide.visible = value
    }
    if (this.mode === 'finitewell' && key === 'half') this.syncFiniteWell()
    if (this.mode === 'ladder' && this.ladderState) {
      if (key === 'raise') {
        this.ladderState.arrow.visible = value
        this.ladderState.glow.visible = value
      }
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
      case 'photoelectric':
        this.tickPhotoelectric(elapsed)
        break
      case 'bohr':
        this.tickBohr(elapsed)
        break
      case 'step':
        this.tickStep(elapsed)
        break
      case 'doublewell':
        this.tickDoubleWell(elapsed)
        break
      case 'angular':
        this.tickAngular()
        break
      case 'ladder':
        this.tickLadder(elapsed)
        break
      case 'linear':
        this.tickLinear(elapsed)
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

  // ---------- 9. 黑体辐射谱 ----------

  private buildSpectrum() {
    const group = new THREE.Group()
    this.horizontal(-3.4, 3.4, -1.5, DIM, 0, 0.4)
    this.vertical(-3.4, -1.5, 1.9, DIM, 0, 0.4)
    for (let i = 1; i < 4; i++) {
      this.vertical(-3.4 + i * 1.7, -1.5, 1.9, DIM, 0, 0.08)
    }

    const planck = this.curve(320, -3.4, 3.4, MINT, 1)
    const rayleigh = this.curve(320, -3.4, 3.4, AMBER, 0.55)
    const wien = this.curve(320, -3.4, 3.4, VIOLET, 0.5)
    group.add(planck.line, rayleigh.line, wien.line)
    const peak = this.vertical(0, -1.48, 1.88, CYAN, 0, 0.55)
    group.add(peak)

    this.label('λ / nm', 2.85, -1.74, 0, MUTED, 0.24)
    this.label('2000', 3.18, -1.74, 0, DIM, 0.18)
    this.label('谱密度', -3.02, 1.72, 0, MUTED, 0.22)
    this.label('普朗克', 1.9, 1.45, 0, MINT, 0.22)
    this.label('瑞利—金斯', 1.9, 1.16, 0, AMBER, 0.22)
    this.label('维恩', 1.9, 0.88, 0, VIOLET, 0.22)
    this.rig.add(group)

    this.spectrumState = { curves: [planck, rayleigh, wien], peak }
    this.syncSpectrum()
  }

  private syncSpectrum() {
    const state = this.spectrumState
    if (!state) return
    const temperature = Math.max(800, Math.min(7000, this.params.T ?? 3000))
    const lambdaOf = (x: number) => 20 + ((x + 3.4) / 6.8) * 1980
    const worldX = (nm: number) => -3.4 + (Math.min(Math.max(nm, 20), 2000) / 2000) * 6.8
    const worldY = (value: number, norm: number) => -1.5 + Math.min(value / norm, 1.05) * 3.3

    let peakValue = 0
    for (let i = 0; i < 320; i++) {
      const nm = lambdaOf(-3.4 + (6.8 * i) / 319)
      peakValue = Math.max(peakValue, planckDensity(nm, temperature))
    }
    const norm = Math.max(peakValue, 1e-12)

    this.paint(state.curves[0], (x) => [worldY(planckDensity(lambdaOf(x), temperature), norm), 0])
    this.paint(state.curves[1], (x) => [worldY(rayleighDensity(lambdaOf(x)), norm), 0])
    this.paint(state.curves[2], (x) => [worldY(wienDensity(lambdaOf(x), temperature), norm), 0])
    state.peak.position.x = worldX(wienPeakNm(temperature))

    state.curves[1].line.visible = this.toggles.rayleigh !== false
    state.curves[2].line.visible = this.toggles.wien !== false
    state.peak.visible = this.toggles.peak !== false
  }

  // ---------- 10. 光电效应 ----------

  private buildPhotoelectric() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.45, DIM, 0, 0.4)
    this.vertical(-3.2, -1.45, 1.9, DIM, 0, 0.4)
    this.vertical(0, -1.45, 1.9, DIM, 0, 0.08)

    const quantum = this.curve(240, -3.2, 3.2, MINT, 1)
    const classical = this.curve(240, -3.2, 3.2, VIOLET, 0.55)
    const cutoff = this.vertical(0, -1.45, 1.9, AMBER, 0, 0.5)
    const electrons: THREE.Sprite[] = []
    for (let i = 0; i < 6; i++) {
      const electron = this.rig.makeGlowSprite(MINT, 0.16)
      electron.position.set(-2.9, -1.1 + i * 0.1, 0.1)
      electrons.push(electron)
      group.add(electron)
    }
    group.add(quantum.line, classical.line, cutoff)
    this.label('ν / 10¹⁴ Hz', 2.4, -1.72, 0, MUTED, 0.24)
    this.label('光电子的最大动能 K / eV', -2.35, 1.78, 0, MUTED, 0.2)
    this.label('ν₀', -2.95, 1.5, 0, AMBER, 0.22)
    this.rig.add(group)

    this.photoState = { curves: [quantum, classical], cutoff, electrons }
    this.syncPhotoelectric()
  }

  private syncPhotoelectric() {
    const state = this.photoState
    if (!state) return
    const nu = Math.max(2, Math.min(12, this.params.nu ?? 6))
    const work = Math.max(1.6, Math.min(5.4, this.params.W ?? 2.3))
    const intensity = Math.max(0.2, Math.min(2, this.params.intensity ?? 1))
    const xOf = (frequency: number) => -3.2 + (frequency / 12) * 6.4
    const yOf = (energy: number) => -1.45 + (Math.max(energy, 0) / 8) * 3.35

    const kMax = photoelectronKmax(nu, work)
    this.paint(state.curves[0], (x) => {
      const frequency = ((x + 3.2) / 6.4) * 12
      return [yOf(photoelectronKmax(frequency, work)), 0]
    })
    this.paint(state.curves[1], (x) => [yOf(0.55 * intensity), 0])
    state.cutoff.position.x = xOf(cutoffFrequency(work))

    const emitting = photonEnergy(nu) > work
    state.curves[1].line.visible = this.toggles.classical === true
    state.cutoff.visible = this.toggles.cutoff !== false
    for (let i = 0; i < state.electrons.length; i++) {
      state.electrons[i].visible = this.toggles.electrons !== false && emitting && i < Math.round(intensity * 3)
    }
    for (const electron of state.electrons) electron.scale.setScalar(0.9 + intensity * 0.2)
  }

  private tickPhotoelectric(elapsed: number) {
    const state = this.photoState
    if (!state) return
    const nu = Math.max(2, Math.min(12, this.params.nu ?? 6))
    const work = Math.max(1.6, Math.min(5.4, this.params.W ?? 2.3))
    const kMax = photoelectronKmax(nu, work)
    if (kMax <= 0 || this.toggles.electrons === false) return
    const speed = 0.25 + kMax * 0.12
    for (let i = 0; i < state.electrons.length; i++) {
      const electron = state.electrons[i]
      const span = 5.6
      const offset = (i * 0.7 + elapsed * speed * 1.4) % span
      electron.position.set(-2.9 + offset, -1.15 + i * 0.09 + Math.sin(elapsed * 2 + i) * 0.06, 0.1)
    }
  }

  // ---------- 11. 通用能级阶梯 ----------

  private buildLevels() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.5, DIM, 0, 0.4)
    this.vertical(-3.2, -1.5, 1.9, DIM, 0, 0.4)

    const lines: THREE.Line[] = []
    const materials: THREE.LineBasicMaterial[] = []
    const sprites: THREE.Sprite[] = []
    for (let i = 1; i <= 40; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-2.6, 0, 0), new THREE.Vector3(2.6, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.4 }
      )
      group.add(line)
      lines.push(line)
      materials.push(line.material as THREE.LineBasicMaterial)
    }
    for (let i = 1; i <= 8; i++) {
      const sprite = this.rig.makeTextSprite(`n=${i}`, { color: MUTED, scale: 0.24, fontSize: 28 })
      sprite.position.set(-2.95, 0, 0)
      group.add(sprite)
      sprites.push(sprite)
    }
    this.label('E', -3.05, 1.78, 0, MUTED, 0.22)
    this.label('能级阶梯', 1.9, 1.78, 0, MUTED, 0.22)
    this.rig.add(group)

    this.levelsState = { lines, materials, sprites }
    this.syncLevels()
  }

  private syncLevels() {
    const state = this.levelsState
    if (!state) return
    const law = Math.max(1, Math.min(2.4, this.params.law ?? 2))
    const defect = Math.max(0, Math.min(1, this.params.defect ?? 0))
    const n = Math.max(1, Math.min(8, Math.round(this.params.n ?? 3)))
    const max = Math.pow(8 + defect, law)
    const dense = this.toggles.dense === true

    for (let i = 1; i <= 40; i++) {
      const ratio = Math.pow(i * 0.2 + defect * 0.2, law) / max
      const y = -1.5 + Math.min(ratio, 1) * 3.3
      const line = state.lines[i - 1]
      line.visible = i <= 8 || dense
      line.position.y = y
      const material = state.materials[i - 1]
      material.opacity = i === n ? 0.9 : dense ? 0.18 : 0.38
      material.color.set(i === n ? MINT : MUTED)
    }
    state.sprites.forEach((sprite, index) => {
      const level = index + 1
      const ratio = Math.pow(level + defect, law) / max
      sprite.position.y = -1.5 + Math.min(ratio, 1) * 3.3
      sprite.material.opacity = level === n ? 1 : 0.55
      sprite.visible = this.toggles.labels !== false
    })
  }

  // ---------- 12. 玻尔能级与跃迁 ----------

  private buildBohr() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.5, DIM, 0, 0.4)
    this.vertical(-3.2, -1.5, 1.9, DIM, 0, 0.4)

    const materials: THREE.LineBasicMaterial[] = []
    const sprites: THREE.Sprite[] = []
    for (let n = 1; n <= 6; n++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.35 }
      )
      line.position.y = bohrLevelY(n)
      group.add(line)
      materials.push(line.material as THREE.LineBasicMaterial)
      const sprite = this.rig.makeTextSprite(`n=${n}`, { color: MUTED, scale: 0.24, fontSize: 28 })
      sprite.position.set(-2.9, bohrLevelY(n), 0)
      group.add(sprite)
      sprites.push(sprite)
    }

    const arrow = this.rig.makeLine(
      [new THREE.Vector3(0.6, 0, 0), new THREE.Vector3(0.6, 0.1, 0)],
      MINT,
      { dashed: true, opacity: 0.7 }
    )
    group.add(arrow)
    const photon = this.rig.makeGlowSprite(AMBER, 0.22)
    group.add(photon)

    this.label('E / eV', -3.05, 1.78, 0, MUTED, 0.22)
    this.label('光子 hν', 1.5, 1.55, 0, AMBER, 0.24)
    this.rig.add(group)

    this.bohrState = { materials, sprites, arrow, photon }
    this.syncBohr()
  }

  private syncBohr() {
    const state = this.bohrState
    if (!state) return
    let ni = Math.max(2, Math.min(6, Math.round(this.params.ni ?? 3)))
    let nf = Math.max(1, Math.min(5, Math.round(this.params.nf ?? 2)))
    if (ni === nf) ni = Math.min(6, nf + 1)
    if (ni < nf) [ni, nf] = [nf, ni]

    state.materials.forEach((material, index) => {
      const n = index + 1
      const active = n === ni || n === nf
      material.opacity = active ? 0.9 : 0.28
      material.color.set(n === ni ? MINT : n === nf ? AMBER : MUTED)
    })
    state.sprites.forEach((sprite, index) => {
      sprite.material.opacity = index + 1 === ni || index + 1 === nf ? 1 : 0.5
    })

    const from = bohrLevelY(nf)
    const to = bohrLevelY(ni)
    state.arrow.geometry.setFromPoints([
      new THREE.Vector3(0.6, from, 0),
      new THREE.Vector3(0.6, to, 0)
    ])
    state.arrow.computeLineDistances()
    state.arrow.visible = this.toggles.arrow !== false
    state.photon.position.set(0.6, (from + to) / 2, 0.1)
    state.photon.visible = this.toggles.photon !== false
  }

  private tickBohr(elapsed: number) {
    const state = this.bohrState
    if (!state || this.toggles.photon === false) return
    let ni = Math.max(2, Math.min(6, Math.round(this.params.ni ?? 3)))
    let nf = Math.max(1, Math.min(5, Math.round(this.params.nf ?? 2)))
    if (ni === nf) ni = Math.min(6, nf + 1)
    if (ni < nf) [ni, nf] = [nf, ni]
    const from = bohrLevelY(nf)
    const to = bohrLevelY(ni)
    const phase = (elapsed * 0.8) % 1
    state.photon.position.y = from + (to - from) * phase
  }

  // ---------- 13. 不确定性原理 ----------

  private buildUncertainty() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.75, DIM, 0, 0.4)
    this.horizontal(-3.2, 3.2, -0.95, DIM, 0, 0.18)
    this.vertical(-3.2, -1.75, 1.9, DIM, 0, 0.4)

    const psi = this.curve(300, -3.2, 3.2, MINT, 1)
    const density = this.curve(300, -3.2, 3.2, AMBER, 0.7)
    const momentum = this.curve(300, -3.2, 3.2, CYAN, 0.9)
    group.add(psi.line, density.line, momentum.line)

    this.label('位置空间 ψ(x)', -3.0, 1.62, 0, MUTED, 0.22)
    this.label('动量空间 φ(p)', -3.0, -1.36, 0, MUTED, 0.22)
    this.label('x', 3.04, -1.75, 0, MUTED, 0.22)
    this.label('p', 3.04, -0.52, 0, MUTED, 0.22)
    this.rig.add(group)

    this.uncertaintyState = { curves: [psi, density, momentum] }
    this.syncUncertainty()
  }

  private syncUncertainty() {
    const state = this.uncertaintyState
    if (!state) return
    const sigma = Math.max(0.25, Math.min(1.6, this.params.sigma ?? 0.6))
    this.paint(state.curves[0], (x) => [-0.1 + Math.exp(-(x * x) / (2 * sigma * sigma)) * 0.95, 0])
    this.paint(state.curves[1], (x) => [-0.1 + Math.exp(-(x * x) / (sigma * sigma)) * 0.85, 0.1])
    this.paint(state.curves[2], (x) => {
      const width = 1 / (2 * sigma)
      return [-1.7 + Math.exp(-(x * x) / (2 * width * width)) * 0.9, 0]
    })
    state.curves[1].line.visible = this.toggles.density !== false
    state.curves[2].line.visible = this.toggles.momentum !== false
  }

  // ---------- 14. 有限深势阱 ----------

  private buildFiniteWell() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.5, DIM, 0, 0.4)
    this.vertical(-3.2, -1.5, 1.9, DIM, 0, 0.4)

    const potential = this.curve(360, -3.2, 3.2, VIOLET, 0.55)
    const psi = this.curve(320, -3.2, 3.2, MINT, 1)
    const density = this.curve(320, -3.2, 3.2, AMBER, 0.62)
    const tail = this.curve(320, -3.2, 3.2, CYAN, 0.85)
    const levels: THREE.Line[] = []
    const materials: THREE.LineBasicMaterial[] = []
    for (let i = 0; i < 5; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-2.65, 0, 0), new THREE.Vector3(2.65, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.25 }
      )
      group.add(line)
      levels.push(line)
      materials.push(line.material as THREE.LineBasicMaterial)
    }
    group.add(potential.line, psi.line, density.line, tail.line)

    this.label('x', 3.1, -1.74, 0, MUTED, 0.22)
    this.label('V(x)', -3.02, 1.7, 0, VIOLET, 0.22)
    this.label('E', -2.94, -1.16, 0, MUTED, 0.2)
    this.rig.add(group)

    this.finiteWellState = { curves: [psi, density, tail, potential], levels, materials }
    this.syncFiniteWell()
  }

  private syncFiniteWell() {
    const state = this.finiteWellState
    if (!state) return
    const depth = Math.max(0.4, Math.min(1.6, this.params.depth ?? 0.9))
    const half = this.toggles.half === true
    const index = Math.max(1, Math.min(4, Math.round(this.params.n ?? 1)))
    const solutions = finiteWellSolutions(depth, half, 6)
    const used = Math.min(index - 1, Math.max(solutions.length - 1, 0))
    const chosen = solutions[used]
    const ratio = chosen ? chosen.ratio : 0.18
    const parity = chosen ? chosen.parity : 1
    const bottom = -1.45
    const top = bottom + 1.9 * depth
    const energyY = bottom + ratio * 1.9 * depth
    const edge = 0.95
    const z = Math.sqrt(Math.max(ratio, 1e-3)) * 2.9 * Math.sqrt(depth)
    const k = Math.max(0.4, z / edge)
    const kappa = Math.max(0.3, Math.sqrt(Math.max(depth - ratio * depth, 0.01)) * 2.6)

    const inside = (x: number) => {
      if (half) return Math.sin(k * (x + edge))
      return parity === -1 ? Math.sin(k * x) : Math.cos(k * x)
    }
    const outside = (x: number) => {
      const bound = inside(edge)
      return bound * Math.exp(-kappa * (x - edge))
    }
    const value = (x: number) => {
      if (x > edge) return outside(x)
      if (x < -edge) {
        if (half) return 0
        return inside(-edge) * Math.exp(-kappa * (-edge - x))
      }
      return inside(x)
    }

    let maxAbs = 1e-4
    for (let i = 0; i <= 140; i++) {
      maxAbs = Math.max(maxAbs, Math.abs(value(-3.2 + (6.4 * i) / 140)))
    }
    const amp = 0.42 / maxAbs

    this.paint(state.curves[0], (x) => [energyY + value(x) * amp, 0])
    this.paint(state.curves[1], (x) => {
      const v = value(x) * amp
      return [energyY + v * v * 0.7, 0.08]
    })
    this.paint(state.curves[2], (x) => {
      const outsideNow = half ? x > edge : Math.abs(x) > edge
      return [outsideNow ? energyY + value(x) * amp : energyY, 0]
    })
    this.paint(state.curves[3], (x) => {
      if (half) return [x < -edge || x > edge ? top : bottom, 0]
      return [Math.abs(x) > edge ? top : bottom, 0]
    })

    state.levels.forEach((line, i) => {
      const solution = solutions[i]
      line.visible = !!solution
      if (!solution) return
      line.position.y = bottom + solution.ratio * 1.9 * depth
      const material = state.materials[i]
      material.opacity = i === used ? 0.9 : 0.24
      material.color.set(i === used ? MINT : MUTED)
    })

    state.curves[1].line.visible = this.toggles.density !== false
    state.curves[2].line.visible = this.toggles.tail !== false
  }

  // ---------- 15. 阶跃势与平滑台阶 ----------

  private buildStep() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.45, DIM, 0, 0.4)
    this.vertical(-3.2, -1.45, 1.9, DIM, 0, 0.4)

    const potential = this.curve(320, -3.2, 3.2, VIOLET, 0.6)
    const psi = this.curve(320, -3.2, 3.2, MINT, 1)
    const density = this.curve(320, -3.2, 3.2, AMBER, 0.55)
    const transmitted = this.curve(260, 0, 3.2, CYAN, 0.9)
    const marker = this.rig.makeLine(
      [new THREE.Vector3(-2.85, 0, 0), new THREE.Vector3(2.85, 0, 0)],
      AMBER,
      { dashed: true, opacity: 0.55 }
    )
    group.add(potential.line, psi.line, density.line, transmitted.line, marker)

    this.label('x', 3.1, -1.72, 0, MUTED, 0.22)
    this.label('V(x)', -3.0, 1.72, 0, VIOLET, 0.22)
    this.label('E', -3.06, 0.42, 0, AMBER, 0.2)
    this.rig.add(group)

    this.stepState = { curves: [psi, density, transmitted, potential], marker }
    this.syncStep()
  }

  private stepWave(phase: number) {
    const state = this.stepState
    if (!state) return
    const ratio = Math.max(0.2, Math.min(1.8, this.params.ratio ?? 0.7))
    const smooth = Math.max(0, Math.min(0.8, this.params.smooth ?? 0.2))
    const bottom = -1.45
    const top = 0.25
    const energyY = bottom + (top - bottom) * Math.min(ratio, 1.95)
    const k = 2.2
    const alpha = smooth > 0.04 ? smooth : 0
    let reflected = 1
    let transmittedWave = (x: number) => Math.exp(-2.3 * Math.sqrt(Math.max(1 - ratio, 0.02)) * x)

    if (ratio > 1) {
      const k2 = Math.sqrt(ratio - 1)
      const sharp = ((1 - k2) / (1 + k2)) ** 2
      if (alpha > 0.04) {
        const numerator = Math.sinh((Math.PI * (1 - k2) * alpha) / 2)
        const denominator = Math.sinh((Math.PI * (1 + k2) * alpha) / 2)
        reflected = Math.min(0.98, (numerator / denominator) ** 2)
      } else {
        reflected = sharp
      }
      const transmit = Math.sqrt(Math.max(1 - reflected, 0))
      transmittedWave = (x: number) => transmit * Math.cos(2.2 * k2 * x - phase)
    } else {
      transmittedWave = (x: number) =>
        Math.exp(-2.3 * Math.sqrt(Math.max(1 - ratio, 0.02)) * x) * Math.cos(phase * 0.2)
    }

    const norm = 1 / (1 + reflected)
    const leftWave = (x: number) =>
      norm * (Math.cos(k * x - phase) + reflected * Math.cos(k * x + phase))

    this.paint(state.curves[0], (x) => [
      energyY + (x >= 0 ? transmittedWave(x) : leftWave(x)) * 0.42,
      0
    ])
    this.paint(state.curves[1], (x) => {
      const v = x >= 0 ? transmittedWave(x) : leftWave(x)
      return [energyY + Math.min(v * v * 0.45, 0.8), 0.08]
    })
    this.paint(state.curves[2], (x) => [energyY + transmittedWave(x) * 0.42, 0])
    this.paint(state.curves[3], (x) => {
      const y =
        alpha > 0.04
          ? bottom + (top - bottom) * 0.5 * (1 + Math.tanh(x / alpha))
          : x > 0
            ? top
            : bottom
      return [y, 0]
    })
    state.marker.position.y = energyY
    state.curves[1].line.visible = this.toggles.density !== false
    state.curves[2].line.visible = this.toggles.transmitted !== false
  }

  private syncStep() {
    this.stepWave(0)
  }

  private tickStep(elapsed: number) {
    this.stepWave(elapsed * 1.4)
  }

  // ---------- 16. δ 势场 ----------

  private buildDelta() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.45, DIM, 0, 0.4)
    this.vertical(-3.2, -1.45, 1.9, DIM, 0, 0.4)

    const bound = this.curve(300, -3.2, 3.2, MINT, 1)
    const density = this.curve(300, -3.2, 3.2, AMBER, 0.6)
    const scattering = this.curve(300, -3.2, 3.2, CYAN, 0.8)
    const marker = this.rig.makeLine(
      [new THREE.Vector3(-2.7, 0, 0), new THREE.Vector3(2.7, 0, 0)],
      MUTED,
      { dashed: true, opacity: 0.3 }
    )
    group.add(marker, bound.line, density.line, scattering.line)
    this.vertical(0, -1.45, 1.72, VIOLET, 0, 0.8)

    this.label('δ(x)', 0.32, 1.6, 0, VIOLET, 0.22)
    this.label('x', 3.1, -1.72, 0, MUTED, 0.22)
    this.label('束缚态', -2.9, -0.82, 0, MINT, 0.2)
    this.label('散射态', -2.9, 1.32, 0, CYAN, 0.2)
    this.rig.add(group)

    this.deltaState = { curves: [bound, density, scattering], marker }
    this.syncDelta()
  }

  private syncDelta() {
    const state = this.deltaState
    if (!state) return
    const strength = Math.max(0.2, Math.min(1.6, this.params.strength ?? 1))
    const energy = Math.max(0.2, Math.min(1.4, this.params.energy ?? 0.6))
    const kappa = strength * 1.6
    const boundY = -1.45 + Math.min(1.0, 0.2 + strength * strength * 0.42)
    const k = 1.5 * Math.sqrt(2 * energy)
    const phase = -Math.atan(kappa / k)
    const scatterY = 0.2 + energy * 0.55
    const normalize = 1 / Math.max(1, 1 / Math.sqrt(kappa))

    this.paint(state.curves[0], (x) => [
      boundY + Math.exp(-kappa * Math.abs(x)) * 0.5 * normalize,
      0
    ])
    this.paint(state.curves[1], (x) => {
      const v = Math.exp(-kappa * Math.abs(x)) * 0.5 * normalize
      return [boundY + v * v * 1.2, 0.08]
    })
    this.paint(state.curves[2], (x) => [
      scatterY + Math.cos(k * Math.abs(x) + phase) * 0.34,
      0
    ])
    state.marker.position.y = boundY

    state.curves[1].line.visible = this.toggles.density !== false
    state.curves[2].line.visible = this.toggles.scattering === true
  }

  // ---------- 17. 双势阱 ----------

  private buildDoubleWell() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.5, DIM, 0, 0.4)
    this.vertical(-3.2, -1.5, 1.9, DIM, 0, 0.4)

    const potential = this.curve(360, -3.2, 3.2, VIOLET, 0.55)
    const even = this.curve(320, -3.2, 3.2, MINT, 1)
    const odd = this.curve(320, -3.2, 3.2, CYAN, 0.7)
    const density = this.curve(240, -3.2, 3.2, AMBER, 0.7)
    const levels: THREE.Line[] = []
    for (let i = 0; i < 2; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.34 }
      )
      group.add(line)
      levels.push(line)
    }
    group.add(potential.line, even.line, odd.line, density.line)

    this.label('V(x)', -3.02, 1.7, 0, VIOLET, 0.22)
    this.label('ψ+ / ψ−', 1.85, 1.42, 0, MUTED, 0.2)
    this.rig.add(group)

    this.doubleWellState = { curves: [even, odd, density, potential], levels }
    this.syncDoubleWell()
  }

  private doubleWellFunctions() {
    const barrier = Math.max(0.2, Math.min(1.4, this.params.barrier ?? 0.8))
    const bottom = -1.45
    const potential = (x: number) =>
      bottom + 1.35 * (x * x - 1.15) ** 2 + barrier * 0.85 * Math.exp(-x * x / 0.18)
    const even = (x: number) =>
      Math.exp(-((x - 1.1) ** 2) / 0.16) + Math.exp(-((x + 1.1) ** 2) / 0.16)
    const odd = (x: number) =>
      Math.exp(-((x - 1.1) ** 2) / 0.16) - Math.exp(-((x + 1.1) ** 2) / 0.16)
    return { barrier, bottom, potential, even, odd }
  }

  private syncDoubleWell() {
    const state = this.doubleWellState
    if (!state) return
    const { barrier, bottom, potential, even, odd } = this.doubleWellFunctions()
    const split = doubleWellSplit(barrier)
    const lower = bottom + 0.9
    const upper = lower + Math.max(split * 2.8, 0.04)

    this.paint(state.curves[0], (x) => [lower + even(x) * 0.5, 0])
    this.paint(state.curves[1], (x) => [upper + odd(x) * 0.45, 0.06])
    this.paint(state.curves[3], (x) => [potential(x), 0])
    state.levels[0].position.y = lower
    state.levels[1].position.y = upper

    state.curves[1].line.visible = this.toggles.antisymmetric !== false
    state.curves[2].line.visible = this.toggles.density !== false
    this.tickDoubleWell(0)
  }

  private tickDoubleWell(elapsed: number) {
    const state = this.doubleWellState
    if (!state) return
    const { bottom } = this.doubleWellFunctions()
    const lower = bottom + 0.9
    const center = 1.05 * Math.cos(elapsed * 0.9)
    this.paint(state.curves[2], (x) => [
      lower + 0.08 + 0.92 * Math.exp(-((x - center) ** 2) / 0.42),
      0.1
    ])
  }

  // ---------- 18. 分子势能曲线 ----------

  private buildMolecular() {
    const group = new THREE.Group()
    this.horizontal(-2.8, 2.8, -1.5, DIM, 0, 0.4)
    this.vertical(-2.8, -1.5, 1.9, DIM, 0, 0.4)

    const potential = this.curve(360, -2.6, 2.6, MINT, 0.75)
    const wave = this.curve(320, -2.6, 2.6, CYAN, 0.9)
    const levels: THREE.Line[] = []
    const sprites: THREE.Sprite[] = []
    for (let i = 0; i < 6; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-2.55, 0, 0), new THREE.Vector3(2.55, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.3 }
      )
      group.add(line)
      levels.push(line)
      const sprite = this.rig.makeTextSprite(`v=${i}`, { color: MUTED, scale: 0.22, fontSize: 28 })
      sprite.position.set(2.18, 0, 0)
      group.add(sprite)
      sprites.push(sprite)
    }
    group.add(potential.line, wave.line)

    this.label('V(r)', -2.72, 1.72, 0, MINT, 0.2)
    this.label('r / r₀', 2.32, -1.74, 0, MUTED, 0.2)
    this.label('振动能级', -2.7, 1.34, 0, MUTED, 0.18)
    this.rig.add(group)

    this.molecularState = { curves: [potential, wave], levels, sprites }
    this.syncMolecular()
  }

  private syncMolecular() {
    const state = this.molecularState
    if (!state) return
    const type = Math.max(0, Math.min(3, Math.round(this.params.type ?? 1)))
    const depth = Math.max(0.5, Math.min(1.4, this.params.depth ?? 0.9))
    const v = Math.max(0, Math.min(5, Math.round(this.params.v ?? 2)))
    const bottom = -1.45

    const rOf = (x: number) => 2.1 + x / 1.6
    const potentialOf = (r: number) => {
      if (type === 0) {
        const rr = r / 1.4
        return depth * (rr ** -12 - 2 * rr ** -6)
      }
      if (type === 1) {
        const u = (r - 1.4) * 1.05
        const e = 1 - Math.exp(-u)
        return depth * (e * e - 1)
      }
      if (type === 2) {
        const rr = 1.4 / Math.max(r, 0.2)
        return depth * (rr * rr - 2 * rr)
      }
      const u = (r - 1.4) / 0.45
      return -depth / Math.cosh(u) ** 2
    }
    const yOfPotential = (value: number) => Math.min(1.88, bottom + (value / depth + 1) * 1.7)

    this.paint(state.curves[0], (x) => [yOfPotential(potentialOf(rOf(x))), 0])

    const anharmonic = type === 1 ? 0.012 : type === 2 ? 0.01 : type === 3 ? 0.008 : 0.004
    const levelEnergy = (index: number) => Math.min(0.98, 0.09 + 0.16 * index - anharmonic * index * index)
    const levelY = (index: number) => bottom + levelEnergy(index) * 1.7

    const uOf = (r: number) => (r - 1.4) * 1.5
    let maxAbs = 1e-4
    for (let i = 0; i <= 120; i++) {
      const u = uOf(rOf(-2.6 + (5.2 * i) / 120))
      maxAbs = Math.max(maxAbs, Math.abs(hermite(v, u) * Math.exp(-u * u / 2)))
    }
    const amp = 0.22 / maxAbs
    this.paint(state.curves[1], (x) => {
      const u = uOf(rOf(x))
      const shape = hermite(v, u) * Math.exp(-u * u / 2) * amp
      return [Math.max(-1.42, Math.min(1.86, levelY(v) + shape)), 0.06]
    })

    state.levels.forEach((line, i) => {
      line.position.y = levelY(i)
      const material = line.material as THREE.LineBasicMaterial
      material.opacity = i === v ? 0.95 : 0.34
      material.color.set(i === v ? MINT : MUTED)
    })
    state.sprites.forEach((sprite, i) => {
      sprite.position.y = levelY(i)
      sprite.material.opacity = i === v ? 1 : 0.55
      sprite.visible = this.toggles.labels !== false
    })
    for (const line of state.levels) line.visible = this.toggles.levels !== false
  }

  // ---------- 19. 角向解与球谐函数 ----------

  private buildAngular() {
    const group = new THREE.Group()
    const axes = new THREE.Group()
    axes.name = 'axes'

    const axisX = this.rig.makeLine(
      [new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)],
      AMBER,
      { opacity: 0.45 }
    )
    const axisZ = this.rig.makeLine(
      [new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0)],
      MINT,
      { opacity: 0.45 }
    )
    const axisY = this.rig.makeLine(
      [new THREE.Vector3(0, 0, -2.5), new THREE.Vector3(0, 0, 2.5)],
      CYAN,
      { opacity: 0.4 }
    )
    axes.add(axisX, axisZ, axisY)
    const zTag = this.rig.makeTextSprite('z', { color: MINT, scale: 0.22, fontSize: 28 })
    zTag.position.set(0, 2.66, 0)
    const xTag = this.rig.makeTextSprite('x', { color: AMBER, scale: 0.22, fontSize: 28 })
    xTag.position.set(2.66, 0, 0)
    const yTag = this.rig.makeTextSprite('y', { color: CYAN, scale: 0.22, fontSize: 28 })
    yTag.position.set(0, 0, 2.66)
    axes.add(zTag, xTag, yTag)
    group.add(axes)

    this.rig.add(group)
    this.angularState = { group, surface: null, points: null }
    this.syncAngular()
  }

  private buildAngularSurface(l: number, m: number): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(1, 64, 40)
    const position = geometry.getAttribute('position')
    const colors = new Float32Array(position.count * 3)
    const maxY = [0.282095, 0.488603, 0.630783, 0.746][l] ?? 0.746
    const positive = new THREE.Color(MINT)
    const negative = new THREE.Color(CYAN)

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)
      const z = position.getZ(i)
      const ylm = realSpherical(l, m, x, z, y)
      const shape = Math.min(1, (ylm / maxY) ** 2)
      const radius = 0.4 + 2.0 * shape
      position.setXYZ(i, x * radius, y * radius, z * radius)
      const color = ylm >= 0 ? positive : negative
      const strength = 0.4 + 0.6 * shape
      colors[i * 3] = color.r * strength
      colors[i * 3 + 1] = color.g * strength
      colors[i * 3 + 2] = color.b * strength
    }
    position.needsUpdate = true
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.renderOrder = 5
    return mesh
  }

  private buildAngularCloud(l: number, m: number): THREE.Points {
    const count = 1600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const maxY = [0.282095, 0.488603, 0.630783, 0.746][l] ?? 0.746
    const positive = new THREE.Color(MINT)
    const negative = new THREE.Color(CYAN)
    let written = 0
    for (let i = 0; i < count * 12 && written < count; i++) {
      const u = Math.random() * 2 - 1
      const phi = Math.random() * Math.PI * 2
      const st = Math.sqrt(1 - u * u)
      const x = st * Math.cos(phi)
      const y = st * Math.sin(phi)
      const z = u
      const ylm = realSpherical(l, m, x, z, y)
      const shape = (ylm / maxY) ** 2
      if (Math.random() > shape) continue
      const radius = 0.4 + 2.0 * Math.min(1, shape)
      positions[written * 3] = x * radius
      positions[written * 3 + 1] = y * radius
      positions[written * 3 + 2] = z * radius
      const color = ylm >= 0 ? positive : negative
      colors[written * 3] = color.r
      colors[written * 3 + 1] = color.g
      colors[written * 3 + 2] = color.b
      written++
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(0, written * 3), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors.slice(0, written * 3), 3))
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.036,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        toneMapped: false
      })
    )
    points.frustumCulled = false
    return points
  }

  private syncAngular() {
    const state = this.angularState
    if (!state) return
    const l = Math.max(0, Math.min(3, Math.round(this.params.l ?? 1)))
    const m = Math.max(-l, Math.min(l, Math.round(this.params.m ?? 0)))
    const key = `${l}-${m}`
    if (key === this.angularKey && state.surface) {
      if (state.points) state.points.visible = this.toggles.cloud !== false
      return
    }
    this.angularKey = key

    if (state.surface) {
      state.group.remove(state.surface)
      state.surface.geometry.dispose()
      ;(state.surface.material as THREE.Material).dispose()
    }
    if (state.points) {
      state.group.remove(state.points)
      state.points.geometry.dispose()
      ;(state.points.material as THREE.Material).dispose()
    }

    state.surface = this.buildAngularSurface(l, m)
    state.points = this.buildAngularCloud(l, m)
    state.points.visible = this.toggles.cloud !== false
    state.group.add(state.surface, state.points)
  }

  private tickAngular() {
    if (!this.angularState) return
    this.angularState.group.rotation.y += 0.0038
  }

  // ---------- 20. 升阶降阶算符 ----------

  private buildLadder() {
    const group = new THREE.Group()
    this.vertical(-2.2, -1.5, 1.9, DIM, 0, 0.4)

    const lines: THREE.Line[] = []
    const materials: THREE.LineBasicMaterial[] = []
    const sprites: THREE.Sprite[] = []
    for (let i = 0; i < 8; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-1.75, 0, 0), new THREE.Vector3(1.75, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.35 }
      )
      group.add(line)
      lines.push(line)
      materials.push(line.material as THREE.LineBasicMaterial)
      const sprite = this.rig.makeTextSprite(`n=${i}`, { color: MUTED, scale: 0.24, fontSize: 28 })
      sprite.position.set(2.16, 0, 0)
      group.add(sprite)
      sprites.push(sprite)
    }

    const arrow = this.rig.makeLine(
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.42, 0)],
      MINT,
      { dashed: true, opacity: 0.85 }
    )
    group.add(arrow)
    const glow = this.rig.makeGlowSprite(MINT, 0.2)
    group.add(glow)

    this.label('E', -2.34, 1.72, 0, MUTED, 0.22)
    this.label('a† 作用一次，能级上升一格', -1.8, 1.58, 0, MUTED, 0.16)
    this.rig.add(group)

    this.ladderState = { lines, materials, sprites, arrow, glow }
    this.syncLadder()
  }

  private ladderY(n: number) {
    return -1.22 + n * 0.42
  }

  private syncLadder() {
    const state = this.ladderState
    if (!state) return
    const n = Math.max(0, Math.min(6, Math.round(this.params.n ?? 2)))

    state.lines.forEach((line, i) => {
      line.position.y = this.ladderY(i)
      const material = state.materials[i]
      material.opacity = i === n ? 0.95 : 0.32
      material.color.set(i === n ? MINT : i === n + 1 ? AMBER : MUTED)
    })
    state.sprites.forEach((sprite, i) => {
      sprite.position.y = this.ladderY(i)
      sprite.material.opacity = i === n ? 1 : 0.5
      sprite.visible = this.toggles.labels !== false
    })

    state.arrow.geometry.setFromPoints([
      new THREE.Vector3(0, this.ladderY(n), 0),
      new THREE.Vector3(0, this.ladderY(n + 1), 0)
    ])
    state.arrow.computeLineDistances()
    state.arrow.visible = this.toggles.raise !== false
    state.glow.visible = this.toggles.raise !== false
    state.glow.position.set(0, (this.ladderY(n) + this.ladderY(n + 1)) / 2, 0.1)
  }

  private tickLadder(elapsed: number) {
    const state = this.ladderState
    if (!state) return
    const n = Math.max(0, Math.min(6, Math.round(this.params.n ?? 2)))
    const progress = this.toggles.raise === false ? 0.5 : 0.5 - 0.5 * Math.cos(elapsed * 2.6)
    state.glow.position.y = this.ladderY(n) + (this.ladderY(n + 1) - this.ladderY(n)) * progress
    ;(state.arrow.material as THREE.LineBasicMaterial).opacity = 0.45 + 0.4 * progress
  }

  // ---------- 21. 径向波函数 ----------

  private buildRadial() {
    const group = new THREE.Group()
    this.horizontal(-2.95, 2.95, -0.62, DIM, 0, 0.28)
    this.horizontal(-2.95, 2.95, -1.45, DIM, 0, 0.4)
    this.vertical(-2.95, -1.45, 1.9, DIM, 0, 0.4)

    const radial = this.curve(340, -2.95, 2.95, MINT, 1)
    const density = this.curve(340, -2.95, 2.95, AMBER, 0.7)
    const marker = this.vertical(-2.95, -1.45, -0.66, CYAN, 0, 0.6)
    group.add(radial.line, density.line, marker)

    this.label('R(r)', -2.82, 1.68, 0, MINT, 0.2)
    this.label('r²R²', -2.86, -0.52, 0, AMBER, 0.2)
    this.label('r / a₀', 2.42, -1.72, 0, MUTED, 0.2)
    this.rig.add(group)

    this.radialState = { curves: [radial, density], marker }
    this.syncRadial()
  }

  private syncRadial() {
    const state = this.radialState
    if (!state) return
    const n = Math.max(1, Math.min(4, Math.round(this.params.n ?? 2)))
    const l = Math.max(0, Math.min(Math.min(2, n - 1), Math.round(this.params.l ?? 1)))
    const rMax = 2.4 * n * n + 3
    const rOf = (x: number) => ((x + 2.95) / 5.9) * rMax
    const radialValue = (r: number) => radialPart(n, l, r)
    const densityValue = (r: number) => (r * radialValue(r)) ** 2

    let maxRadial = 1e-6
    let maxDensity = 1e-6
    let peakR = 0
    for (let i = 0; i <= 600; i++) {
      const r = (rMax * i) / 600
      const radial = Math.abs(radialValue(r))
      const density = densityValue(r)
      maxRadial = Math.max(maxRadial, radial)
      if (density > maxDensity) {
        maxDensity = density
        peakR = r
      }
    }
    const peakX = -2.95 + (peakR / rMax) * 5.9

    this.paint(state.curves[0], (x) => {
      const r = rOf(x)
      return [-0.12 + (radialValue(r) / maxRadial) * 0.62, 0]
    })
    this.paint(state.curves[1], (x) => {
      const r = rOf(x)
      return [-1.45 + (densityValue(r) / maxDensity) * 0.78, 0.08]
    })
    state.marker.position.x = peakX
    state.curves[1].line.visible = this.toggles.density !== false
  }

  // ---------- 22. 量子共振腔 ----------

  private buildResonance() {
    const group = new THREE.Group()
    this.horizontal(-3.0, 3.0, -1.45, DIM, 0, 0.4)
    this.vertical(-3.0, -1.45, 1.9, DIM, 0, 0.4)

    const response = this.curve(360, -3.0, 3.0, MINT, 1)
    const marker = this.vertical(-3.0, -1.45, 1.9, AMBER, 0, 0.6)
    const sprites: THREE.Sprite[] = []
    for (let n = 1; n <= 4; n++) {
      const sprite = this.rig.makeTextSprite(`n=${n}`, { color: MUTED, scale: 0.24, fontSize: 28 })
      sprite.position.set(0, 1.66, 0)
      group.add(sprite)
      sprites.push(sprite)
    }
    group.add(response.line, marker)

    this.label('驱动频率 ω', 2.2, -1.72, 0, MUTED, 0.22)
    this.label('响应幅度', -2.75, 1.72, 0, MUTED, 0.2)
    this.rig.add(group)

    this.resonanceState = { curves: [response], marker, sprites }
    this.syncResonance()
  }

  private resonanceFrequency(n: number) {
    return 0.14 * n * n
  }

  private syncResonance() {
    const state = this.resonanceState
    if (!state) return
    const omega = Math.max(0.2, Math.min(2.4, this.params.omega ?? 0.6))
    const gamma = Math.max(0.02, Math.min(0.25, this.params.gamma ?? 0.08))
    const xOf = (value: number) => -3.0 + (value / 2.6) * 6.0
    const frequencies = [1, 2, 3, 4].map((n) => this.resonanceFrequency(n))
    const amplitude = (value: number) => {
      let total = 0
      for (const frequency of frequencies) {
        total += (gamma * gamma) / ((value - frequency) ** 2 + gamma * gamma)
      }
      return total
    }

    let max = 1e-4
    for (let i = 0; i <= 320; i++) {
      max = Math.max(max, amplitude(((i / 320) * 2.6) as number))
    }
    this.paint(state.curves[0], (x) => {
      const value = ((x + 3.0) / 6.0) * 2.6
      return [-1.45 + (amplitude(value) / max) * 3.2, 0]
    })
    state.marker.position.x = xOf(omega)
    state.sprites.forEach((sprite, index) => {
      sprite.position.x = xOf(frequencies[index])
      sprite.visible = this.toggles.modes !== false
    })
    state.marker.visible = this.toggles.marker !== false
  }

  // ---------- 23. 线性势与电子加速 ----------

  private buildLinear() {
    const group = new THREE.Group()
    this.horizontal(-3.1, 3.1, -1.45, DIM, 0, 0.4)
    this.vertical(-3.1, -1.45, 1.9, DIM, 0, 0.4)

    const psi = this.curve(300, -3.1, 3.1, MINT, 1)
    const density = this.curve(300, -3.1, 3.1, AMBER, 0.55)
    const potential = this.curve(300, -3.1, 3.1, VIOLET, 0.6)
    const energyLine = this.curve(2, -2.9, 2.9, AMBER, 0.5)
    const marker = this.vertical(0, -1.45, 1.9, CYAN, 0, 0.6)
    group.add(psi.line, density.line, potential.line, energyLine.line, marker)

    this.label('x', 3.0, -1.72, 0, MUTED, 0.22)
    this.label('V(x) = -eℰx', -3.0, 1.72, 0, VIOLET, 0.2)
    this.label('经典转折点', -1.35, 1.5, 0, CYAN, 0.18)
    this.rig.add(group)

    this.linearState = { curves: [psi, density, potential, energyLine], marker }
    this.paintLinear(0)
  }

  private linearSetup() {
    const field = Math.max(0.4, Math.min(1.6, this.params.field ?? 1))
    const energy = Math.max(0.2, Math.min(1.6, this.params.energy ?? 0.6))
    const slope = 0.45 * field
    const potential = (x: number) => -0.1 - slope * x
    const energyY = -0.1 + energy * 0.55
    const turning = -(energyY + 0.1) / slope
    return { field, energy, potential, energyY, turning }
  }

  private paintLinear(phase: number) {
    const state = this.linearState
    if (!state) return
    const { potential, energyY, turning } = this.linearSetup()
    this.paint(state.curves[2], (x) => [potential(x), 0])
    this.paint(state.curves[3], () => [energyY, 0])

    const airy = (x: number) => {
      const z = 1.5 * (x - turning)
      if (z > 0) {
        const zz = Math.max(z, 0.05)
        return Math.exp(-(2 / 3) * zz ** 1.5) / zz ** 0.25
      }
      const a = Math.max(-z, 0.03)
      return Math.cos((2 / 3) * a ** 1.5 - Math.PI / 4 + phase) / a ** 0.25
    }
    let maxAbs = 1e-4
    for (let i = 0; i <= 120; i++) {
      maxAbs = Math.max(maxAbs, Math.abs(airy(-3.1 + (6.2 * i) / 120)))
    }
    const amp = 0.38 / maxAbs
    this.paint(state.curves[0], (x) => [energyY + airy(x) * amp, 0])
    this.paint(state.curves[1], (x) => {
      const value = airy(x) * amp
      return [energyY + Math.min(value * value * 0.5, 0.9), 0.08]
    })
    state.marker.position.x = turning
    state.curves[0].line.visible = this.toggles.wave !== false
    state.curves[1].line.visible = this.toggles.density === true
  }

  private syncLinear() {
    this.paintLinear(0)
  }

  private tickLinear(elapsed: number) {
    this.paintLinear(elapsed * 1.1)
  }

  // ---------- 24. 共轭链与吸收谱 ----------

  private buildChain() {
    const group = new THREE.Group()
    this.horizontal(-3.2, 3.2, -1.45, DIM, 0, 0.4)
    this.vertical(-3.2, -1.45, 1.9, DIM, 0, 0.4)

    const levels: THREE.Line[] = []
    const materials: THREE.LineBasicMaterial[] = []
    for (let i = 0; i < 14; i++) {
      const line = this.rig.makeLine(
        [new THREE.Vector3(-2.9, 0, 0), new THREE.Vector3(1.15, 0, 0)],
        MUTED,
        { dashed: true, opacity: 0.35 }
      )
      group.add(line)
      levels.push(line)
      materials.push(line.material as THREE.LineBasicMaterial)
    }
    const sprites: THREE.Sprite[] = []
    const tags = ['HOMO', 'LUMO', 'λ']
    for (let i = 0; i < 3; i++) {
      const sprite = this.rig.makeTextSprite(tags[i], {
        color: i === 0 ? MINT : i === 1 ? AMBER : MUTED,
        scale: 0.2,
        fontSize: 28
      })
      sprite.position.set(1.35, 0, 0)
      group.add(sprite)
      sprites.push(sprite)
    }
    const gap = this.rig.makeLine(
      [new THREE.Vector3(1.9, -1.0, 0), new THREE.Vector3(1.9, -0.8, 0)],
      AMBER,
      { dashed: true, opacity: 0.8 }
    )
    group.add(gap)

    const swatchGeometry = new THREE.PlaneGeometry(0.8, 0.5)
    const swatchMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(AMBER),
      transparent: true,
      opacity: 0.85,
      toneMapped: false
    })
    const swatch = new THREE.Mesh(swatchGeometry, swatchMaterial)
    swatch.position.set(2.45, -0.92, -0.1)
    group.add(swatch)

    this.label('E', -3.1, 1.72, 0, MUTED, 0.2)
    this.label('吸收色', 2.05, -0.42, 0, MUTED, 0.18)
    this.rig.add(group)

    this.chainState = { levels, materials, sprites, gap, swatch }
    this.syncChain()
  }

  private syncChain() {
    const state = this.chainState
    if (!state) return
    const segments = Math.max(2, Math.min(14, Math.round(this.params.segments ?? 6)))
    const bottom = -1.45
    const total = 12
    const homo = Math.ceil(segments / 2)
    const lumo = Math.min(segments + 1, homo + 1)
    const gapEnergy = chainLevel(lumo, segments) - chainLevel(homo, segments)
    const wavelength = HC_EV_NM / Math.max(gapEnergy, 0.15)

    state.levels.forEach((line, i) => {
      const n = i + 1
      line.visible = n <= segments + 1
      line.position.y = bottom + (chainLevel(n, segments) / total) * 3.2
      const material = state.materials[i]
      material.opacity = n === homo || n === lumo ? 0.95 : 0.3
      material.color.set(n === homo ? MINT : n === lumo ? AMBER : MUTED)
    })

    const homoY = bottom + (chainLevel(homo, segments) / total) * 3.2
    const lumoY = bottom + (chainLevel(lumo, segments) / total) * 3.2
    state.gap.geometry.setFromPoints([
      new THREE.Vector3(1.9, homoY, 0),
      new THREE.Vector3(1.9, lumoY, 0)
    ])
    state.gap.computeLineDistances()

    state.sprites.forEach((sprite, index) => {
      sprite.position.y = index === 0 ? homoY : index === 1 ? lumoY : (homoY + lumoY) / 2
      sprite.visible = this.toggles.labels !== false
    })

    ;(state.swatch.material as THREE.MeshBasicMaterial).color.copy(wavelengthColor(wavelength))
    state.gap.visible = this.toggles.gap !== false
  }

  // ---------- 25. 扫描隧道显微镜 ----------

  private buildStm() {
    const group = new THREE.Group()
    this.horizontal(-3.0, 2.8, -1.45, DIM, 0, 0.4)
    this.vertical(-3.0, -1.45, 1.9, DIM, 0, 0.4)

    const curve = this.curve(320, -3.0, 2.8, MINT, 1)
    const marker = this.vertical(-3.0, -1.45, 1.9, AMBER, 0, 0.6)
    const guide = this.rig.makeLine(
      [new THREE.Vector3(-3.0, 0, 0), new THREE.Vector3(2.8, 0, 0)],
      CYAN,
      { dashed: true, opacity: 0.5 }
    )
    group.add(curve.line, marker, guide)

    this.label('针尖—样品间距 d / nm', 0.4, -1.72, 0, MUTED, 0.2)
    this.label('log₁₀(I/I₀)', -2.86, 1.7, 0, MUTED, 0.2)
    this.label('每个数量级', 1.4, -0.55, 0, CYAN, 0.18)
    this.rig.add(group)

    this.stmState = { curve, marker, guide }
    this.syncStm()
  }

  private syncStm() {
    const state = this.stmState
    if (!state) return
    const work = Math.max(2, Math.min(5, this.params.work ?? 4.2))
    const gap = Math.max(0.1, Math.min(1.2, this.params.gap ?? 0.5))
    const decay = stmDecay(work)
    const xOf = (value: number) => -3.0 + (value / 1.2) * 5.6
    const yOf = (logValue: number) => -1.45 + ((logValue + 7) / 7) * 3.25

    this.paint(state.curve, (x) => {
      const distance = Math.max(((x + 3.0) / 5.6) * 1.2, 0.02)
      const logValue = Math.max(-7, -2 * decay * 10 * distance / Math.LN10)
      return [yOf(logValue), 0]
    })
    state.marker.position.x = xOf(gap)
    state.guide.position.y = yOf(-2)
    state.marker.visible = this.toggles.marker !== false
    state.guide.visible = this.toggles.decay !== false
  }
}

// ---------- 数学与颜色工具 ----------

function bohrLevelY(n: number) {
  return -1.5 + (1 - 1 / (n * n)) * 3.25
}

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
