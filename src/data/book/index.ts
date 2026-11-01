import type { BookChapter, BookLab, BookMeta, BookSection } from './types'
import { bookLabs } from './labs'
import { sectionLabMap } from './sectionLabs'
import { ch1Sections } from './ch1'
import { ch2Sections } from './ch2'
import { ch3Sections } from './ch3'
import { ch4Sections } from './ch4'
import { ch5Sections } from './ch5'
import { ch6Sections } from './ch6'
import { ch7Sections } from './ch7'
import { ch8Sections } from './ch8'

export const bookMeta: BookMeta = {
  title: '量子力学 I',
  volume: '第一卷 · 基础与一维问题',
  author: '顾樵',
  authorNote: 'Qiao GU · 德国国际生物物理研究所',
  pages: 334,
  chapterCount: 8,
  sectionCount: 45,
  description:
    '从经典物理的裂缝出发，沿着波函数、一维势场、谐振子、算符与三维中心势场一路推进，把《量子力学 I》的八章内容重写成 45 节可以逐节阅读与动手实验的课程。',
  approach:
    '每一节保留原书的推导骨架与例题方向，但用更适合屏幕阅读的方式重述：先给出问题，再拆开符号与假设，最后把结论落回可观察的物理图像。'
}

interface ChapterSeed {
  id: string
  no: number
  title: string
  pages: string
  tagline: string
  abstract: string
  sections: BookSection[]
}

const seeds: ChapterSeed[] = [
  {
    id: 'ch1',
    no: 1,
    title: '量子力学基础',
    pages: '12–66',
    tagline: '经典物理的三处裂缝',
    abstract:
      '从牛顿力学到麦克斯韦方程，经典物理在宏观世界无往不利，却在黑体辐射、光电效应与原子光谱前接连失手。本章沿着这些裂缝，引出作用量子、光子、玻尔模型与物质波。',
    sections: ch1Sections
  },
  {
    id: 'ch2',
    no: 2,
    title: '波函数与薛定谔方程',
    pages: '67–109',
    tagline: '量子力学的语法',
    abstract:
      '波函数如何编码概率，叠加原理如何制造干涉，定态方程如何把能量变成本征值问题。本章建立整套形式语言，并讨论束缚态、散射态与波包的一般解。',
    sections: ch2Sections
  },
  {
    id: 'ch3',
    no: 3,
    title: '一维势场模型',
    pages: '110–161',
    tagline: '最简可解的世界',
    abstract:
      '无限深势阱、半无限深势阱、有限深势阱、阶跃、方势垒与 δ 势。六个模型构成量子力学的“题库”：边界条件如何挑选能级，衰减波如何变成隧穿。',
    sections: ch3Sections
  },
  {
    id: 'ch4',
    no: 4,
    title: '一维势场模型的应用',
    pages: '162–206',
    tagline: '从模型到器件',
    abstract:
      '把上一章的模型接到真实体系：量子共振腔、电子加速、双势阱振荡、无反射势、有机物着色、冷电子发射、核聚变与扫描隧道显微镜。',
    sections: ch4Sections
  },
  {
    id: 'ch5',
    no: 5,
    title: '量子谐振子',
    pages: '207–242',
    tagline: '零点能与算符代数',
    abstract:
      '抛物线势场是量子力学中最重要的可解模型。本章用厄米多项式解出波函数，讨论概率密度与经典极限，再用升阶、降阶算符把同一套能级重新算一遍。',
    sections: ch5Sections
  },
  {
    id: 'ch6',
    no: 6,
    title: '谐振子模型的应用',
    pages: '243–262',
    tagline: '分子、光学钟与显微镜',
    abstract:
      '惰性气体分子的伦纳德—琼斯势、双原子分子的莫尔斯势、普薛耳—特勒势阱，以及相干态波包在光学钟与原子力显微镜中的角色。',
    sections: ch6Sections
  },
  {
    id: 'ch7',
    no: 7,
    title: '力学量的算符表示',
    pages: '263–282',
    tagline: '测量写成算符',
    abstract:
      '算符如何代表力学量，厄米性如何保证实本征值，连续谱本征函数如何处理归一化，箱归一化如何把动量谱离散化，角动量算符又如何登场。',
    sections: ch7Sections
  },
  {
    id: 'ch8',
    no: 8,
    title: '三维空间的量子力学',
    pages: '283–329',
    tagline: '球谐函数与氢原子',
    abstract:
      '在中心势场中分离变量，得到径向方程与角向方程。球谐函数、拉盖尔多项式与氢原子电子云随后展开，最后落到无限深球形势阱、碱金属与双原子分子。',
    sections: ch8Sections
  }
]

export const bookChapters: BookChapter[] = seeds.map((seed) => ({
  ...seed,
  lab: bookLabs[seed.no - 1]
}))

export const allBookSections: Array<BookSection & { chapterId: string; chapterNo: number; chapterTitle: string }> =
  bookChapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      ...section,
      chapterId: chapter.id,
      chapterNo: chapter.no,
      chapterTitle: chapter.title
    }))
  )

export function getBookChapter(id: string): BookChapter {
  return bookChapters.find((chapter) => chapter.id === id) ?? bookChapters[0]
}

export function getBookSection(sectionId: string) {
  return allBookSections.find((section) => section.id === sectionId) ?? allBookSections[0]
}

export function chapterOfSection(sectionId: string): BookChapter {
  const section = getBookSection(sectionId)
  return getBookChapter(section.chapterId)
}

const flatIndex = (sectionId: string) => allBookSections.findIndex((section) => section.id === sectionId)

export function bookNeighbors(sectionId: string) {
  const index = flatIndex(sectionId)
  return {
    index,
    total: allBookSections.length,
    prev: index > 0 ? allBookSections[index - 1] : null,
    next: index >= 0 && index < allBookSections.length - 1 ? allBookSections[index + 1] : null
  }
}

export function labsForSection(sectionId: string): BookLab[] {
  const sectionLabs = sectionLabMap[sectionId]
  if (sectionLabs?.length) return sectionLabs
  return [chapterOfSection(sectionId).lab]
}

export function labForSection(sectionId: string) {
  return labsForSection(sectionId)[0]
}
