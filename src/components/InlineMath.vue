<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'

const props = defineProps<{
  text: string
}>()

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const renderMath = (expression: string) =>
  katex.renderToString(expression.trim(), {
    displayMode: false,
    throwOnError: false,
    trust: true,
    strict: false,
    output: 'html'
  })

/** 把文本中的 $...$、$$...$$ 或 \(...\) 渲染成行内 KaTeX，其余部分保持纯文本。 */
const html = computed(() => {
  const source = props.text ?? ''
  const pattern = /\$\$([^$\n]+?)\$\$|\$([^$\n]+?)\$|\\\(([^\n]*?)\\\)/g
  let output = ''
  let cursor = 0

  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0
    output += escapeHtml(source.slice(cursor, index))
    output += renderMath(match[1] ?? match[2] ?? match[3] ?? '')
    cursor = index + match[0].length
  }

  output += escapeHtml(source.slice(cursor))
  return output
})
</script>

<template>
  <span class="inline-math-text" v-html="html" />
</template>

<style scoped>
.inline-math-text {
  display: inline;
}

.inline-math-text :deep(.katex) {
  font-size: 1em;
  color: inherit;
}
</style>
