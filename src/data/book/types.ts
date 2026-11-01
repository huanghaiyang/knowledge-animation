import type {
  CourseControl,
  CourseHudCell,
  CourseToggle,
  Params,
  Toggles
} from '../types'

export type LabMode =
  | 'duality'
  | 'wavepacket'
  | 'well'
  | 'tunneling'
  | 'oscillator'
  | 'coherent'
  | 'operator'
  | 'hydrogen'

export interface BookFormula {
  math: string
  note?: string
}

export interface BookBeat {
  title: string
  paragraphs: string[]
  formulas?: BookFormula[]
  insight?: string
}

export interface BookSection {
  id: string
  no: string
  title: string
  pages: string
  tag: string
  abstract: string
  keyIdeas: string[]
  beats: BookBeat[]
  takeaways: string[]
  exercise?: {
    question: string
    hint: string
  }
}

export interface BookLab {
  mode: LabMode
  title: string
  caption: string
  controls: CourseControl[]
  toggles?: CourseToggle[]
  readouts: CourseHudCell[]
  liveNote: (params: Params, toggles: Toggles) => string
}

export interface BookChapter {
  id: string
  no: number
  title: string
  pages: string
  tagline: string
  abstract: string
  lab: BookLab
  sections: BookSection[]
}

export interface BookMeta {
  title: string
  volume: string
  author: string
  authorNote: string
  pages: number
  chapterCount: number
  sectionCount: number
  description: string
  approach: string
}
