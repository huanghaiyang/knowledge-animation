import type { FigEl, FigTone, FigureSpec, PlotBox } from './types'

export const PALETTE_TONES: FigTone[] = ['mint', 'violet', 'amber', 'cyan', 'danger', 'dim', 'muted', 'faint', 'text']

export const T = (
  x: number,
  y: number,
  text: string,
  o: { size?: number; tone?: FigTone; anchor?: 'start' | 'middle' | 'end'; mono?: boolean; opacity?: number; weight?: number } = {}
): FigEl => ({ t: 'text', x, y, text, ...o })

export const R = (
  x: number,
  y: number,
  w: number,
  h: number,
  o: { tone?: FigTone; r?: number; dash?: boolean; fill?: boolean; opacity?: number } = {}
): FigEl => ({ t: 'rect', x, y, w, h, ...o })

export const BAND = (
  x: number,
  y: number,
  w: number,
  h: number,
  o: { tone?: FigTone; r?: number; opacity?: number } = {}
): FigEl => ({ t: 'band', x, y, w, h, ...o })

export const L = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: { tone?: FigTone; dash?: boolean; weight?: number; opacity?: number } = {}
): FigEl => ({ t: 'line', x1, y1, x2, y2, ...o })

export const A = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: { tone?: FigTone; weight?: number; dash?: boolean } = {}
): FigEl => ({ t: 'arrow', x1, y1, x2, y2, ...o })

export const C = (
  x: number,
  y: number,
  r: number,
  o: { tone?: FigTone; fill?: boolean; dash?: boolean; opacity?: number } = {}
): FigEl => ({ t: 'circle', x, y, r, ...o })

export const DOT = (x: number, y: number, o: { r?: number; tone?: FigTone } = {}): FigEl => ({
  t: 'dot',
  x,
  y,
  ...o
})

export const E = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  o: { tone?: FigTone; fill?: boolean; dash?: boolean; opacity?: number; rotate?: number } = {}
): FigEl => ({ t: 'ellipse', x, y, rx, ry, ...o })

export const P = (
  d: string,
  o: { tone?: FigTone; weight?: number; dash?: boolean; opacity?: number } = {}
): FigEl => ({ t: 'path', d, ...o })

export const TAG = (
  x: number,
  y: number,
  text: string,
  o: { tone?: FigTone; size?: number; anchor?: 'start' | 'middle' | 'end' } = {}
): FigEl => ({ t: 'tag', x, y, text, ...o })

/** 坐标轴：横轴箭头向右，纵轴箭头向上。 */
export const AXIS = (
  b: PlotBox,
  o: { xLabel?: string; yLabel?: string; tone?: FigTone } = {}
): FigEl[] => {
  const tone = o.tone ?? 'dim'
  const els: FigEl[] = [
    L(b.x, b.y + b.h, b.x + b.w, b.y + b.h, { tone }),
    A(b.x + b.w - 18, b.y + b.h, b.x + b.w, b.y + b.h, { tone }),
    L(b.x, b.y + b.h, b.x, b.y, { tone }),
    A(b.x, b.y + 16, b.x, b.y, { tone })
  ]
  if (o.xLabel) els.push(T(b.x + b.w + 8, b.y + b.h + 2, o.xLabel, { size: 11, tone }))
  if (o.yLabel) els.push(T(b.x - 10, b.y - 6, o.yLabel, { size: 11, tone, anchor: 'end' }))
  return els
}

/** 把函数采样成折线；超出 yRange 的值会被钳制在框内。 */
export const CURVE = (
  fn: (x: number) => number,
  b: PlotBox,
  xRange: [number, number],
  yRange: [number, number],
  o: { tone?: FigTone; steps?: number; weight?: number; dash?: boolean; opacity?: number } = {}
): FigEl => {
  const steps = o.steps ?? 96
  const [x0, x1] = xRange
  const [y0, y1] = yRange
  const pts: [number, number][] = []
  for (let i = 0; i <= steps; i += 1) {
    const x = x0 + ((x1 - x0) * i) / steps
    let y = fn(x)
    if (!Number.isFinite(y)) continue
    if (y < y0) y = y0
    if (y > y1) y = y1
    const px = b.x + ((x - x0) / (x1 - x0)) * b.w
    const py = b.y + b.h - ((y - y0) / (y1 - y0)) * b.h
    pts.push([Number(px.toFixed(2)), Number(py.toFixed(2))])
  }
  return { t: 'curve', pts, tone: o.tone ?? 'mint', weight: o.weight, dash: o.dash, opacity: o.opacity }
}

/** 能级横线 + 右侧标签。 */
export const LEVEL = (
  x1: number,
  x2: number,
  y: number,
  label?: string,
  o: { tone?: FigTone; size?: number; dash?: boolean } = {}
): FigEl[] => {
  const els: FigEl[] = [L(x1, y, x2, y, { tone: o.tone ?? 'mint', dash: o.dash ?? false, weight: 1.6 })]
  if (label) els.push(T(x2 + 8, y + 1, label, { size: o.size ?? 11, tone: o.tone ?? 'mint' }))
  return els
}

/** 带底色的分区面板，用于多图并置或推导步骤。 */
export const PANEL = (
  x: number,
  y: number,
  w: number,
  h: number,
  label?: string,
  o: { tone?: FigTone; size?: number } = {}
): FigEl[] => {
  const els: FigEl[] = [R(x, y, w, h, { tone: o.tone ?? 'dim', r: 10, fill: true, opacity: 0.14 })]
  if (label) els.push(T(x + 12, y + 18, label, { size: o.size ?? 10.5, tone: o.tone ?? 'dim', mono: true }))
  return els
}

export const fig = (
  id: string,
  title: string,
  caption: string,
  els: (FigEl | FigEl[])[],
  o: { w?: number; h?: number } = {}
): FigureSpec => ({
  id,
  title,
  caption,
  w: o.w ?? 640,
  h: o.h ?? 300,
  els: els.flat() as FigEl[]
})

export const flat = (...groups: (FigEl | FigEl[])[]): FigEl[] =>
  groups.flatMap((g) => (Array.isArray(g) ? g : [g]))
