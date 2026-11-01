export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface QuizOptionState {
  selected: number | null
  revealed: boolean
}
