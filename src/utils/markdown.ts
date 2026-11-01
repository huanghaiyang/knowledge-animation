import katex from 'katex'

export interface MarkdownHeading {
  level: number
  text: string
  id: string
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function slugify(text: string) {
  return text
    .replace(/@@[DI]\d+@@/g, '')
    .replace(/[*_`#]/g, '')
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function renderTex(expression: string, displayMode: boolean) {
  return katex.renderToString(expression.trim(), {
    displayMode,
    throwOnError: false,
    trust: true,
    strict: false,
    output: 'html'
  })
}

function inline(text: string) {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function tableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function isTableDivider(line: string) {
  return /^\s*\|\s*[:\-]+\s*\|/.test(line) || /^\s*[:\-]{3,}\s*\|/.test(line)
}

function headingLabel(text: string) {
  return text
    .replace(/@@[DI]\d+@@/g, '')
    .replace(/\$([^$]*?)\$/g, '')
    .trim()
}

function createSlugger() {
  const counts = new Map<string, number>()
  return (text: string) => {
    const base = slugify(headingLabel(text)) || 'section'
    const count = counts.get(base) ?? 0
    counts.set(base, count + 1)
    return count ? `${base}-${count + 1}` : base
  }
}

export function extractHeadings(source: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = []
  const nextId = createSlugger()
  let inCode = false
  for (const line of source.replace(/\r\n/g, '\n').split('\n')) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const match = line.match(/^(#{1,4})\s+(.*)$/)
    if (!match) continue
    const id = nextId(match[2])
    const level = match[1].length
    if (level === 1 || level === 4) continue
    headings.push({
      level: match[1].length,
      text: headingLabel(match[2]),
      id
    })
  }
  return headings
}

/** 面向讲义的最小 Markdown 渲染器：标题、表格、列表、引用、代码与 KaTeX。 */
export function renderMarkdown(source: string): string {
  const displayMath: string[] = []
  const inlineMath: string[] = []
  const nextHeadingId = createSlugger()

  let text = source.replace(/\r\n/g, '\n')

  // 先抽取公式再做 HTML 转义，保证公式里的 < > & 原样进入 KaTeX。
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, expression: string) => {
    const index = displayMath.length
    displayMath.push(renderTex(expression, true))
    return `\n@@D${index}@@\n`
  })

  text = text.replace(/\$([^$\n]+?)\$/g, (_, expression: string) => {
    const index = inlineMath.length
    inlineMath.push(renderTex(expression, false))
    return `@@I${index}@@`
  })

  text = escapeHtml(text)

  const lines = text.split('\n')
  const output: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    if (trimmed.startsWith('```')) {
      const code: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      output.push(`<pre><code>${code.join('\n')}</code></pre>`)
      continue
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      const content = heading[2]
      output.push(`<h${level} id="${nextHeadingId(content)}">${inline(content)}</h${level}>`)
      index += 1
      continue
    }

    if (/^(@@D\d+@@)$/.test(trimmed)) {
      output.push(trimmed)
      index += 1
      continue
    }

    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      output.push('<hr />')
      index += 1
      continue
    }

    if (trimmed.startsWith('>')) {
      const quote: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quote.push(lines[index].trim().replace(/^>\s?/, ''))
        index += 1
      }
      output.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`)
      continue
    }

    if (trimmed.startsWith('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const header = tableRow(trimmed)
      index += 2
      const rows: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        const cells = tableRow(lines[index])
        rows.push(
          `<tr>${cells.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`
        )
        index += 1
      }
      output.push(
        `<table><thead><tr>${header
          .map((cell) => `<th>${inline(cell)}</th>`)
          .join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`
      )
      continue
    }

    if (/^- /.test(trimmed)) {
      const items: string[] = []
      while (index < lines.length && /^- /.test(lines[index].trim())) {
        items.push(`<li>${inline(lines[index].trim().slice(2))}</li>`)
        index += 1
      }
      output.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    if (/^\d+\. /.test(trimmed)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) {
        items.push(`<li>${inline(lines[index].trim().replace(/^\d+\.\s/, ''))}</li>`)
        index += 1
      }
      output.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    const paragraph: string[] = []
    while (index < lines.length) {
      const next = lines[index].trim()
      if (
        !next ||
        next.startsWith('#') ||
        next.startsWith('```') ||
        next.startsWith('>') ||
        next.startsWith('|') ||
        /^- /.test(next) ||
        /^\d+\. /.test(next) ||
        /^(@@D\d+@@)$/.test(next) ||
        /^(-{3,}|\*{3,})$/.test(next)
      ) {
        break
      }
      paragraph.push(lines[index])
      index += 1
    }
    if (paragraph.length) output.push(`<p>${inline(paragraph.join(' '))}</p>`)
  }

  return output
    .join('\n')
    .replace(/@@D(\d+)@@/g, (_, value: string) => displayMath[Number(value)])
    .replace(/@@I(\d+)@@/g, (_, value: string) => inlineMath[Number(value)])
}
