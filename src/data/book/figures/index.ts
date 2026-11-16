import type { FigureMap, SectionFigureSet } from './types'
import { ch1Figures } from './ch1'
import { ch1bFigures } from './ch1b'
import { ch2Figures } from './ch2'
import { ch3Figures } from './ch3'
import { ch4aFigures } from './ch4a'
import { ch4bFigures } from './ch4b'
import { ch5Figures } from './ch5'
import { ch6Figures } from './ch6'
import { ch7Figures } from './ch7'
import { ch8aFigures } from './ch8a'
import { ch8bFigures } from './ch8b'

/** 单节插图文件：sections/qm-1-3.ts 默认导出一节的插图集。 */
const sectionModules = import.meta.glob('./sections/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  SectionFigureSet
>

const sectionFigures: FigureMap = {}
for (const [path, set] of Object.entries(sectionModules)) {
  const match = /\/sections\/(qm-[\d-]+)\.ts$/.exec(path)
  if (match) sectionFigures[match[1]] = set
}

export const bookFigures: FigureMap = {
  ...ch1Figures,
  ...ch1bFigures,
  ...ch2Figures,
  ...ch3Figures,
  ...ch4aFigures,
  ...ch4bFigures,
  ...ch5Figures,
  ...ch6Figures,
  ...ch7Figures,
  ...ch8aFigures,
  ...ch8bFigures,
  ...sectionFigures
}

export const figuresForSection = (sectionId: string) => bookFigures[sectionId]
