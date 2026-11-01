import type { QuizQuestion } from './quizTypes'

const modules = import.meta.glob<{ default: QuizQuestion[] }>('./quizzes/*.ts', {
  eager: true
})

export function quizFor(courseId: string): QuizQuestion[] {
  return modules[`./quizzes/${courseId}.ts`]?.default ?? []
}
