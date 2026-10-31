import { malthusCourse } from './malthus'
import { logisticCourse } from './logistic'
import { compoundCourse } from './compound'
import { graphCourse } from './graph'
import type { CourseDefinition } from './types'

export const courses: CourseDefinition[] = [
  malthusCourse,
  logisticCourse,
  compoundCourse,
  graphCourse
]

export function getCourse(id: string): CourseDefinition {
  return courses.find((course) => course.id === id) ?? malthusCourse
}
