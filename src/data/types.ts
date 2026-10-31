export type ChipTone = 'mint' | 'cyan' | 'amber' | 'violet'

export interface StepChip {
  label: string
  tone?: ChipTone
}

export interface FormulaLine {
  math: string
  note?: string
}

export interface LessonStep {
  id: string
  nav: string
  kicker: string
  title: string
  lead: string
  paragraphs: string[]
  formulas?: FormulaLine[]
  formulaCaption?: string
  chips?: StepChip[]
  insight?: string
  annotation?: {
    tag: string
    text: string
    tone: ChipTone | 'dim'
  }
  duration: number
}

export interface LessonMeta {
  index: string
  title: string
  subtitle?: string
  field: string
  duration: string
  year: string
  author?: string
}

export type Params = Record<string, number>
export type Toggles = Record<string, boolean>

export interface CourseControl {
  key: string
  label: string
  min: number
  max: number
  step: number
  default: number
  format?: (value: number) => string
}

export interface CourseToggle {
  key: string
  label: string
  caption: string
  default: boolean
}

export interface CourseAnnotation {
  tag: string
  text: string
  tone: ChipTone | 'dim'
}

export interface CourseHudCell {
  label: string
  value: (params: Params, toggles: Toggles) => string
}

export interface CourseStat {
  label: string
  value: (params: Params, toggles: Toggles) => string
  warn?: (params: Params, toggles: Toggles) => boolean
}

export type SceneKind = 'malthus' | 'logistic' | 'compound' | 'graph'

export interface CourseDefinition {
  id: string
  scene: SceneKind
  stageId: string
  meta: LessonMeta
  steps: LessonStep[]
  controls: CourseControl[]
  toggles?: CourseToggle[]
  annotationFor?: (index: number, params: Params, toggles: Toggles) => CourseAnnotation
  hud: {
    cells: CourseHudCell[]
    foot?: CourseHudCell
  }
  liveFormula: (params: Params, toggles: Toggles) => string
  stats: CourseStat[]
  exploreTitle: string
}
