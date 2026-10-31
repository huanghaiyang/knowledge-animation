import { malthusCourse } from './malthus'
import { logisticCourse } from './logistic'
import { compoundCourse } from './compound'
import { graphCourse } from './graph'
import { sirCourse } from './sir'
import { pendulumCourse } from './pendulum'
import { predatorCourse } from './predator'
import { vectorOpsCourse } from './vectorops'
import { momentumCourse } from './momentum'
import { laplacianCourse } from './laplacian'
import { polarCourse } from './polar'
import { cylindricalCourse } from './cylindrical'
import type { CourseDefinition } from './types'

export const courses: CourseDefinition[] = [
  malthusCourse,
  logisticCourse,
  compoundCourse,
  graphCourse,
  sirCourse,
  pendulumCourse,
  predatorCourse,
  vectorOpsCourse,
  momentumCourse,
  laplacianCourse,
  polarCourse,
  cylindricalCourse
]

export function getCourse(id: string): CourseDefinition {
  return courses.find((course) => course.id === id) ?? malthusCourse
}
