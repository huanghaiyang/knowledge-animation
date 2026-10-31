import * as THREE from 'three'
import { StageRig, type CameraPreset, type LessonScene } from './sceneKit'
import { GRAPH_EDGES, GRAPH_NODES, GROWTH_PATH, LIMIT_PATH } from '../data/graph'

const COLOR = {
  core: '#74f0c2',
  growth: '#ffbd70',
  math: '#b8a2ff',
  meta: '#8fe8ff',
  edge: '#3f5c70',
  edgeHot: '#74f0c2',
  axis: '#3d5870',
  tick: '#7c93a9'
}

const CAMERA_PRESETS: CameraPreset[] = [
  { pos: [0.5, 0.8, 9.8], look: [0, 0, 0] },
  { pos: [0.9, 1.1, 9.4], look: [0, 0, 0] },
  { pos: [0.4, 0.6, 9.2], look: [0, 0, 0] },
  { pos: [1.1, 0.9, 9.2], look: [0.35, 0, 0] },
  { pos: [0.4, 0.9, 9.4], look: [0, 0, 0] },
  { pos: [0.8, 1.2, 9.8], look: [0, 0, 0] }
]

function nodeColor(group: string) {
  if (group === 'growth') return COLOR.growth
  if (group === 'math') return COLOR.math
  if (group === 'meta') return COLOR.meta
  return COLOR.core
}

interface NodeRuntime {
  mesh: THREE.Mesh
  glow: THREE.Sprite
  label: THREE.Sprite
  alpha: number
  glowScale: number
}

interface EdgeRuntime {
  line: THREE.Line
  alpha: number
}

export class GraphScene implements LessonScene {
  private readonly rig: StageRig
  private readonly graphGroup = new THREE.Group()
  private readonly nodes: NodeRuntime[] = []
  private readonly edges: EdgeRuntime[] = []
  private readonly distances = new Map<string, number>()
  private readonly pathA = new Set(GROWTH_PATH)
  private readonly pathB = new Set(LIMIT_PATH)

  private stepIndex = 0
  private progress = 0
  private depth = 2
  private rotate = true
  private showPaths = true
  private spin = 0.12

  constructor(canvas: HTMLCanvasElement) {
    this.rig = new StageRig(canvas, {
      presets: CAMERA_PRESETS,
      tint: '#1b2330',
      bloomStrength: 0.7
    })
    this.computeDistances()
    this.rig.add(this.graphGroup)
    this.buildGraph()
    this.rig.start((dt, elapsed) => this.tick(dt, elapsed))
  }

  setStep(index: number, progress: number) {
    this.stepIndex = index
    this.progress = THREE.MathUtils.clamp(progress, 0, 1)
    this.rig.setCamera(index)
  }

  setParams(params: Record<string, number>) {
    this.depth = THREE.MathUtils.clamp(Math.round(params.depth ?? this.depth), 1, 3)
  }

  setToggle(key: string, value: boolean) {
    if (key === 'rotate') this.rotate = value
    if (key === 'showPaths') this.showPaths = value
  }

  dispose() {
    this.rig.dispose()
  }

  private computeDistances() {
    this.distances.set('graph', 0)
    const queue = ['graph']
    while (queue.length) {
      const current = queue.shift()!
      const distance = this.distances.get(current)!
      for (const edge of GRAPH_EDGES) {
        const other = edge.a === current ? edge.b : edge.b === current ? edge.a : null
        if (other && !this.distances.has(other)) {
          this.distances.set(other, distance + 1)
          queue.push(other)
        }
      }
    }
  }

  private buildGraph() {
    for (const node of GRAPH_NODES) {
      const color = nodeColor(node.group)
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(node.size, 24, 18),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0,
          toneMapped: false
        })
      )
      mesh.position.set(...node.position)
      mesh.renderOrder = 8
      this.graphGroup.add(mesh)

      const glow = this.rig.makeGlowSprite(color, node.size * 3.4)
      glow.position.set(...node.position)
      glow.material.opacity = 0
      this.graphGroup.add(glow)

      const label = this.rig.makeTextSprite(node.label, {
        color: node.group === 'core' ? '#d9fff1' : '#dbe6f2',
        scale: 0.44,
        fontSize: 42,
        weight: 500
      })
      label.position.set(node.position[0], node.position[1] - node.size - 0.2, node.position[2] + 0.05)
      label.material.opacity = 0
      this.graphGroup.add(label)

      this.nodes.push({ mesh, glow, label, alpha: 0, glowScale: node.size * 3.4 })
    }

    for (const edge of GRAPH_EDGES) {
      const from = GRAPH_NODES.find((node) => node.id === edge.a)!
      const to = GRAPH_NODES.find((node) => node.id === edge.b)!
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...from.position),
        new THREE.Vector3(...to.position)
      ])
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(COLOR.edge),
        transparent: true,
        opacity: 0,
        toneMapped: false
      })
      const line = new THREE.Line(geometry, material)
      line.renderOrder = 4
      this.graphGroup.add(line)
      this.edges.push({ line, alpha: 0 })
    }

    const hub = GRAPH_NODES.find((node) => node.id === 'graph')!
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(hub.size * 1.9, 0.008, 6, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR.core),
        transparent: true,
        opacity: 0.35,
        toneMapped: false
      })
    )
    ring.position.set(...hub.position)
    ring.rotation.x = 0.4
    ring.userData.isHubRing = true
    this.graphGroup.add(ring)
  }

  private isPathNode(id: string) {
    return this.pathA.has(id) || this.pathB.has(id)
  }

  private isPathEdge(index: number) {
    const edge = GRAPH_EDGES[index]
    return (
      (this.pathA.has(edge.a) && this.pathA.has(edge.b)) ||
      (this.pathB.has(edge.a) && this.pathB.has(edge.b))
    )
  }

  private withinDepth(id: string) {
    return (this.distances.get(id) ?? 99) <= this.depth
  }

  private tick(dt: number, elapsed: number) {
    const p = this.progress
    const i = this.stepIndex

    for (let index = 0; index < this.nodes.length; index++) {
      const node = GRAPH_NODES[index]
      const runtime = this.nodes[index]
      let target = 0.6

      if (i === 0) {
        target = node.id === 'graph' ? 0.95 : 0.16
      } else if (i === 1) {
        const visible = p * (GRAPH_NODES.length + 1.2)
        target = index <= visible ? 0.82 : 0.1
      } else if (i === 2) {
        target = 0.72
      } else if (i === 3) {
        target = this.pathA.has(node.id) ? 1 : 0.16
      } else if (i === 4) {
        target = 0.62
      } else {
        if (this.showPaths) {
          target = this.isPathNode(node.id) ? 1 : 0.14
        } else {
          target = this.withinDepth(node.id) ? 0.85 : 0.12
        }
      }

      runtime.alpha = THREE.MathUtils.damp(runtime.alpha, target, 5, dt)
      const meshMaterial = runtime.mesh.material as THREE.MeshBasicMaterial
      meshMaterial.opacity = runtime.alpha
      runtime.glow.material.opacity = runtime.alpha * 0.55
      runtime.label.material.opacity = runtime.alpha * 0.88

      const pulse = 1 + Math.sin(elapsed * 2.1 + index) * 0.05
      runtime.glow.scale.set(
        runtime.glowScale * pulse,
        runtime.glowScale * pulse,
        1
      )
      const scale = 1 + (runtime.alpha > 0.8 ? Math.sin(elapsed * 2.6 + index) * 0.025 : 0)
      runtime.mesh.scale.set(scale, scale, scale)
    }

    for (let index = 0; index < this.edges.length; index++) {
      const runtime = this.edges[index]
      let target = 0.08

      if (i === 0) {
        target = 0.06
      } else if (i === 1) {
        target = 0.05
      } else if (i === 2) {
        const visible = p * (this.edges.length + 2)
        target = index <= visible ? 0.35 : 0.04
      } else if (i === 3) {
        target = this.isPathEdge(index) ? 0.9 : 0.1
      } else if (i === 4) {
        target = 0.3
      } else if (this.showPaths) {
        target = this.isPathEdge(index) ? 0.85 : 0.08
      } else {
        const edge = GRAPH_EDGES[index]
        target = this.withinDepth(edge.a) && this.withinDepth(edge.b) ? 0.42 : 0.06
      }

      runtime.alpha = THREE.MathUtils.damp(runtime.alpha, target, 5, dt)
      ;(runtime.line.material as THREE.LineBasicMaterial).opacity = runtime.alpha
      const hot =
        (i === 3 && this.isPathEdge(index)) ||
        (i >= 5 && this.showPaths && this.isPathEdge(index)) ||
        (i >= 5 && !this.showPaths && this.withinDepth(GRAPH_EDGES[index].a) && this.withinDepth(GRAPH_EDGES[index].b))
      ;(runtime.line.material as THREE.LineBasicMaterial).color.set(hot ? COLOR.edgeHot : COLOR.edge)
    }

    const targetSpin = this.rotate ? (i >= 3 ? 0.05 : 0.12) : 0
    this.spin = THREE.MathUtils.damp(this.spin, targetSpin, 4, dt)
    this.graphGroup.rotation.y += this.spin * dt
    this.graphGroup.rotation.x = -0.06 + Math.sin(elapsed * 0.12) * 0.02
  }
}
