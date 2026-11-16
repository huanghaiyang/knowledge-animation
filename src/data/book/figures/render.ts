import type { FigEl, FigTone, FigureSpec } from './types'

const TONE_COLOR: Record<FigTone, string> = {
  mint: 'var(--mint)',
  violet: 'var(--violet)',
  amber: 'var(--amber)',
  cyan: 'var(--cyan)',
  danger: 'var(--danger)',
  dim: 'var(--muted)',
  muted: 'var(--muted)',
  faint: 'var(--faint)',
  text: 'var(--text)'
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const color = (tone?: FigTone) => TONE_COLOR[tone ?? 'mint']

const n = (value: number) => Number(value.toFixed(2))

const arrowHead = (el: Extract<FigEl, { t: 'arrow' }>) => {
  const dx = el.x2 - el.x1
  const dy = el.y2 - el.y1
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const size = 7
  const half = 3.4
  const bx = el.x2 - ux * size
  const by = el.y2 - uy * size
  return `M ${n(el.x2)} ${n(el.y2)} L ${n(bx - uy * half)} ${n(by + ux * half)} L ${n(bx + uy * half)} ${n(by - ux * half)} Z`
}

const renderEl = (el: FigEl): string => {
  const c = color(el.tone)
  switch (el.t) {
    case 'rect': {
      const fill = el.fill ? c : 'none'
      const opacity = el.fill ? ` fill-opacity="${el.opacity ?? 0.1}"` : ''
      const dash = el.dash ? ' stroke-dasharray="5 4"' : ''
      return `<rect x="${n(el.x)}" y="${n(el.y)}" width="${n(el.w)}" height="${n(el.h)}" rx="${el.r ?? 4}" fill="${fill}"${opacity} stroke="${c}" stroke-opacity="0.5" stroke-width="1"${dash} />`
    }
    case 'band':
      return `<rect x="${n(el.x)}" y="${n(el.y)}" width="${n(el.w)}" height="${n(el.h)}" rx="${el.r ?? 6}" fill="${c}" fill-opacity="${el.opacity ?? 0.1}" />`
    case 'line': {
      const dash = el.dash ? ' stroke-dasharray="5 4"' : ''
      return `<line x1="${n(el.x1)}" y1="${n(el.y1)}" x2="${n(el.x2)}" y2="${n(el.y2)}" stroke="${c}" stroke-width="${el.weight ?? 1.2}" stroke-linecap="round" stroke-opacity="${el.opacity ?? 0.85}"${dash} />`
    }
    case 'arrow': {
      const dash = el.dash ? ' stroke-dasharray="5 4"' : ''
      return `<line x1="${n(el.x1)}" y1="${n(el.y1)}" x2="${n(el.x2)}" y2="${n(el.y2)}" stroke="${c}" stroke-width="${el.weight ?? 1.6}" stroke-linecap="round"${dash} /><path d="${arrowHead(el)}" fill="${c}" />`
    }
    case 'circle':
      return `<circle cx="${n(el.x)}" cy="${n(el.y)}" r="${n(el.r)}" fill="${el.fill ? c : 'none'}" stroke="${c}" stroke-width="1.3"${el.dash ? ' stroke-dasharray="5 4"' : ''}${el.fill ? ` fill-opacity="${el.opacity ?? 0.14}"` : ` stroke-opacity="${el.opacity ?? 0.85}"`} />`
    case 'dot':
      return `<circle cx="${n(el.x)}" cy="${n(el.y)}" r="${el.r ?? 2.6}" fill="${c}" />`
    case 'ellipse': {
      const transform = el.rotate ? ` transform="rotate(${el.rotate} ${n(el.x)} ${n(el.y)})"` : ''
      return `<ellipse cx="${n(el.x)}" cy="${n(el.y)}" rx="${n(el.rx)}" ry="${n(el.ry)}" fill="${el.fill ? c : 'none'}" stroke="${c}" stroke-width="1.3"${el.dash ? ' stroke-dasharray="5 4"' : ''}${el.fill ? ` fill-opacity="${el.opacity ?? 0.12}"` : ` stroke-opacity="${el.opacity ?? 0.85}"`}${transform} />`
    }
    case 'curve': {
      if (el.pts.length < 2) return ''
      const points = el.pts.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')
      return `<polyline points="${points}" fill="none" stroke="${c}" stroke-width="${el.weight ?? 1.8}" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="${el.opacity ?? 0.95}"${el.dash ? ' stroke-dasharray="5 4"' : ''} />`
    }
    case 'path': {
      const dash = el.dash ? ' stroke-dasharray="5 4"' : ''
      return `<path d="${esc(el.d)}" fill="none" stroke="${c}" stroke-width="${el.weight ?? 1.6}" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="${el.opacity ?? 0.9}"${dash} />`
    }
    case 'text':
      return `<text x="${n(el.x)}" y="${n(el.y)}" fill="${c}" font-size="${el.size ?? 12}" font-family="${el.mono ? 'var(--font-mono)' : 'var(--font-sans)'}" font-weight="${el.weight ?? 400}" text-anchor="${el.anchor ?? 'start'}" dominant-baseline="middle" opacity="${el.opacity ?? 1}">${esc(el.text)}</text>`
    case 'tag': {
      const size = el.size ?? 10.5
      const width = el.text.length * size * 0.72 + 16
      const anchor = el.anchor ?? 'start'
      const x = anchor === 'middle' ? el.x - width / 2 : anchor === 'end' ? el.x - width : el.x
      return `<g><rect x="${n(x)}" y="${n(el.y - size - 4)}" width="${n(width)}" height="${n(size + 10)}" rx="${n((size + 10) / 2)}" fill="${c}" fill-opacity="0.12" stroke="${c}" stroke-opacity="0.42" stroke-width="1" /><text x="${n(x + 8)}" y="${n(el.y)}" fill="${c}" font-size="${size}" font-family="var(--font-mono)" dominant-baseline="middle">${esc(el.text)}</text></g>`
    }
    default:
      return ''
  }
}

const cache = new Map<string, string>()

export function renderFigure(spec: FigureSpec): string {
  const cached = cache.get(spec.id)
  if (cached) return cached

  const w = spec.w ?? 640
  const h = spec.h ?? 300
  const body = spec.els.map(renderEl).filter(Boolean).join('')
  const svg =
    `<svg class="figure-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(spec.title)}">` +
    `<title>${esc(spec.title)}</title>` +
    `<g shape-rendering="geometricPrecision">${body}</g>` +
    `</svg>`

  cache.set(spec.id, svg)
  return svg
}
