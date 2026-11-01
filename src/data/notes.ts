const files = import.meta.glob<string>('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

export function notesFor(courseId: string): string {
  return files[`../content/${courseId}.md`] ?? ''
}
