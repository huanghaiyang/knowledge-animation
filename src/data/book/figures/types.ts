export type FigTone = 'mint' | 'violet' | 'amber' | 'cyan' | 'danger' | 'dim' | 'muted' | 'faint' | 'text'

export type FigEl =
  | {
      t: 'rect' | 'band'
      x: number
      y: number
      w: number
      h: number
      tone?: FigTone
      r?: number
      dash?: boolean
      fill?: boolean
      opacity?: number
    }
  | { t: 'line'; x1: number; y1: number; x2: number; y2: number; tone?: FigTone; dash?: boolean; weight?: number; opacity?: number }
  | { t: 'arrow'; x1: number; y1: number; x2: number; y2: number; tone?: FigTone; weight?: number; dash?: boolean }
  | { t: 'circle'; x: number; y: number; r: number; tone?: FigTone; fill?: boolean; dash?: boolean; opacity?: number }
  | { t: 'ellipse'; x: number; y: number; rx: number; ry: number; tone?: FigTone; fill?: boolean; dash?: boolean; opacity?: number; rotate?: number }
  | { t: 'dot'; x: number; y: number; r?: number; tone?: FigTone }
  | { t: 'curve'; pts: [number, number][]; tone?: FigTone; weight?: number; dash?: boolean; opacity?: number }
  | { t: 'path'; d: string; tone?: FigTone; weight?: number; dash?: boolean; opacity?: number }
  | { t: 'text'; x: number; y: number; text: string; size?: number; tone?: FigTone; anchor?: 'start' | 'middle' | 'end'; mono?: boolean; opacity?: number; weight?: number }
  | { t: 'tag'; x: number; y: number; text: string; tone?: FigTone; size?: number; anchor?: 'start' | 'middle' | 'end' }

export interface FigureSpec {
  id: string
  title: string
  caption: string
  w?: number
  h?: number
  els: FigEl[]
}

export interface SectionFigureSet {
  overview?: FigureSpec
  paragraphs?: Record<string, FigureSpec>
  formulas?: Record<string, FigureSpec>
}

export type FigureMap = Record<string, SectionFigureSet>

export interface PlotBox {
  x: number
  y: number
  w: number
  h: number
}
