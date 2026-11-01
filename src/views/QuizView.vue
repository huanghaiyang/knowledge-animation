<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CourseDefinition } from '../data/types'
import type { QuizQuestion } from '../data/quizTypes'

const props = defineProps<{
  course: CourseDefinition
  questions: QuizQuestion[]
}>()

const emit = defineEmits<{
  back: []
}>()

const index = ref(0)
const selected = ref<number | null>(null)
const revealed = ref(false)
const score = ref(0)
const finished = ref(false)
const answers = ref<number[]>([])

const current = computed(() => props.questions[index.value])
const progress = computed(() =>
  props.questions.length ? ((index.value + (finished.value ? 1 : 0)) / props.questions.length) * 100 : 0
)
const correctCount = computed(() => props.questions.filter((q, i) => answers.value[i] === q.answer).length)

function choose(option: number) {
  if (revealed.value || !current.value) return
  selected.value = option
  revealed.value = true
  answers.value[index.value] = option
  if (option === current.value.answer) score.value += 1
}

function next() {
  if (!revealed.value) return
  if (index.value >= props.questions.length - 1) {
    finished.value = true
    return
  }
  index.value += 1
  selected.value = null
  revealed.value = false
}

function restart() {
  index.value = 0
  selected.value = null
  revealed.value = false
  score.value = 0
  finished.value = false
  answers.value = []
}

function optionClass(option: number) {
  if (!revealed.value) return { chosen: selected.value === option }
  return {
    chosen: selected.value === option,
    correct: option === current.value?.answer,
    wrong: selected.value === option && option !== current.value?.answer
  }
}
</script>

<template>
  <div class="quiz-page">
    <header class="quiz-header">
      <div class="header-inner">
        <button class="ghost-btn" type="button" @click="emit('back')">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14.5 9h-11M8 4.5 3.5 9 8 13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>返回</span>
        </button>

        <div class="title-stack">
          <span class="mono kicker">{{ course.meta.index }} · SELF CHECK</span>
          <h1>{{ course.meta.title }} · 自测</h1>
        </div>

        <div class="header-score mono">
          <span>{{ correctCount }}</span>
          <span>/</span>
          <span>{{ questions.length }}</span>
        </div>
      </div>
      <div class="header-progress"><i :style="{ width: `${progress}%` }" /></div>
    </header>

    <main class="quiz-main">
      <section v-if="questions.length === 0" class="empty-card">
        <span class="mono">QUIZ PENDING</span>
        <h2>自测题目正在准备</h2>
        <p>这节课的题库还没有生成，可以先阅读完整推导讲义。</p>
        <button class="primary-btn" type="button" @click="emit('back')">返回课程</button>
      </section>

      <section v-else-if="finished" class="result-card">
        <div class="score-ring" :style="{ '--score': `${(score / questions.length) * 100}%` }">
          <span class="score-num mono">{{ score }}</span>
          <span class="score-total mono">/ {{ questions.length }}</span>
        </div>
        <h2>自测完成</h2>
        <p class="result-copy">
          答对 {{ score }} 题，共 {{ questions.length }} 题。
          {{ score === questions.length ? '推导细节已经掌握得很牢。' : score >= questions.length * 0.6 ? '基础结论清楚了，再回看错题的推导步骤。' : '建议先读完整推导讲义，再回来重测一次。' }}
        </p>

        <div class="review-list">
          <div v-for="(item, i) in questions" :key="item.id" class="review-item">
            <div class="review-head">
              <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="review-state" :class="{ ok: answers[i] === item.answer }">
                {{ answers[i] === item.answer ? '正确' : '待复习' }}
              </span>
            </div>
            <p class="review-question">{{ item.question }}</p>
            <p class="review-answer">
              你的答案：{{ answers[i] !== undefined ? item.options[answers[i]] : '未作答' }}　|　
              正确答案：{{ item.options[item.answer] }}
            </p>
            <p class="review-explain">{{ item.explanation }}</p>
          </div>
        </div>

        <div class="result-actions">
          <button class="primary-btn" type="button" @click="restart">重新自测</button>
          <button class="ghost-btn" type="button" @click="emit('back')">返回</button>
        </div>
      </section>

      <section v-else class="quiz-card">
        <div class="quiz-meta">
          <span class="mono">QUESTION {{ String(index + 1).padStart(2, '0') }}</span>
          <span class="quiz-count mono">{{ index + 1 }} / {{ questions.length }}</span>
        </div>

        <h2 class="question">{{ current.question }}</h2>

        <div class="options">
          <button
            v-for="(option, i) in current.options"
            :key="option"
            type="button"
            class="option"
            :class="optionClass(i)"
            :disabled="revealed"
            @click="choose(i)"
          >
            <span class="option-letter mono">{{ String.fromCharCode(65 + i) }}</span>
            <span class="option-text">{{ option }}</span>
          </button>
        </div>

        <div v-if="revealed" class="explain-box" :class="{ good: selected === current.answer }">
          <span class="explain-tag mono">{{ selected === current.answer ? 'CORRECT' : 'REVIEW' }}</span>
          <p>{{ current.explanation }}</p>
        </div>

        <div class="quiz-actions">
          <span class="hint">选择后立即显示解析</span>
          <button class="primary-btn" type="button" :disabled="!revealed" @click="next">
            {{ index >= questions.length - 1 ? '查看结果' : '下一题' }}
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background:
    radial-gradient(80% 55% at 70% -8%, rgba(116, 240, 194, 0.05), transparent 60%),
    #04070c;
}

.quiz-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(150, 179, 212, 0.12);
  background: rgba(4, 7, 12, 0.88);
  backdrop-filter: blur(18px);
}

.header-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.ghost-btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 13px;
  border: 1px solid rgba(150, 179, 212, 0.18);
  border-radius: 8px;
  background: rgba(150, 179, 212, 0.05);
  font-size: 11px;
  color: var(--text-dim);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.ghost-btn:hover {
  color: var(--text);
  border-color: rgba(116, 240, 194, 0.35);
}

.ghost-btn svg {
  width: 13px;
  height: 13px;
}

.title-stack {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.kicker {
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--faint);
}

.title-stack h1 {
  font-size: 18px;
  font-weight: 500;
  color: var(--text);
}

.header-score {
  margin-left: auto;
  font-size: 12px;
  color: var(--faint);
}

.header-score span:first-child {
  color: var(--mint);
}

.header-progress {
  height: 1px;
  background: rgba(150, 179, 212, 0.12);
}

.header-progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, rgba(116, 240, 194, 0.5), var(--mint));
  transition: width 0.4s var(--ease-out);
}

.quiz-main {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

.quiz-card,
.result-card,
.empty-card {
  padding: 32px 34px 30px;
  border: 1px solid rgba(150, 179, 212, 0.14);
  border-radius: 18px;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(116, 240, 194, 0.05), transparent 55%),
    rgba(7, 12, 20, 0.68);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px -50px rgba(0, 0, 0, 0.9);
}

.empty-card {
  text-align: center;
  color: var(--muted);
}

.empty-card h2 {
  margin: 12px 0 8px;
  font-size: 20px;
  font-weight: 500;
  color: var(--text);
}

.quiz-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  color: var(--faint);
}

.quiz-count {
  color: var(--muted);
}

.question {
  margin: 22px 0 26px;
  font-size: 21px;
  font-weight: 500;
  line-height: 1.7;
  color: #edf4fc;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  width: 100%;
  padding: 13px 16px;
  border: 1px solid rgba(150, 179, 212, 0.16);
  border-radius: 10px;
  background: rgba(150, 179, 212, 0.035);
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.option:not(:disabled):hover {
  border-color: rgba(116, 240, 194, 0.34);
  background: rgba(116, 240, 194, 0.07);
  transform: translateX(2px);
}

.option-letter {
  flex: none;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: rgba(150, 179, 212, 0.12);
  font-size: 10px;
  color: var(--text-dim);
}

.option-text {
  padding-top: 2px;
  font-size: 13.5px;
  line-height: 1.65;
  color: #c8d6e4;
}

.option.chosen {
  border-color: rgba(150, 179, 212, 0.4);
}

.option.correct {
  border-color: rgba(116, 240, 194, 0.55);
  background: rgba(116, 240, 194, 0.1);
}

.option.correct .option-letter {
  background: rgba(116, 240, 194, 0.2);
  color: var(--mint);
}

.option.wrong {
  border-color: rgba(255, 154, 122, 0.5);
  background: rgba(255, 154, 122, 0.09);
}

.option.wrong .option-letter {
  background: rgba(255, 154, 122, 0.18);
  color: #ff9d7a;
}

.explain-box {
  margin-top: 20px;
  padding: 14px 16px;
  border-left: 2px solid rgba(255, 154, 122, 0.55);
  border-radius: 0 10px 10px 0;
  background: rgba(255, 154, 122, 0.055);
}

.explain-box.good {
  border-left-color: rgba(116, 240, 194, 0.5);
  background: rgba(116, 240, 194, 0.055);
}

.explain-tag {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.explain-box p {
  margin: 7px 0 0;
  font-size: 12.5px;
  line-height: 1.8;
  color: #b8c9d8;
}

.quiz-actions {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.hint {
  font-size: 10.5px;
  color: var(--faint);
}

.primary-btn {
  padding: 10px 20px;
  border: 1px solid rgba(116, 240, 194, 0.32);
  border-radius: 8px;
  background: rgba(116, 240, 194, 0.1);
  font-size: 12px;
  color: #d7f8ec;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.primary-btn:hover:not(:disabled) {
  background: rgba(116, 240, 194, 0.18);
  border-color: rgba(116, 240, 194, 0.5);
}

.primary-btn:disabled {
  opacity: 0.4;
}

.score-ring {
  --score: 0%;
  width: 132px;
  height: 132px;
  margin: 8px auto 26px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  padding-top: 42px;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(7, 12, 20, 0.92) 60%, transparent 61%),
    conic-gradient(var(--mint) var(--score), rgba(150, 179, 212, 0.12) 0);
}

.score-num {
  font-size: 34px;
  color: var(--mint);
}

.score-total {
  font-size: 12px;
  color: var(--faint);
}

.result-card h2 {
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  color: var(--text);
}

.result-copy {
  margin: 10px auto 30px;
  max-width: 520px;
  text-align: center;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 26px;
}

.review-item {
  padding: 14px 16px;
  border: 1px solid rgba(150, 179, 212, 0.12);
  border-radius: 10px;
  background: rgba(150, 179, 212, 0.03);
}

.review-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9.5px;
  color: var(--faint);
}

.review-state {
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 154, 122, 0.12);
  color: #ff9d7a;
  font-size: 9.5px;
}

.review-state.ok {
  background: rgba(116, 240, 194, 0.12);
  color: var(--mint);
}

.review-question {
  margin: 9px 0 6px;
  font-size: 13.5px;
  line-height: 1.7;
  color: #dbe7f3;
}

.review-answer {
  margin: 0;
  font-size: 11.5px;
  color: var(--muted);
}

.review-explain {
  margin: 7px 0 0;
  font-size: 11.5px;
  line-height: 1.75;
  color: #9fb3c6;
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

@media (max-width: 720px) {
  .header-inner {
    padding: 14px 16px;
    gap: 12px;
  }
  .ghost-btn span {
    display: none;
  }
  .quiz-main {
    padding: 28px 16px 80px;
  }
  .quiz-card,
  .result-card,
  .empty-card {
    padding: 22px 18px;
  }
  .question {
    font-size: 17px;
  }
}
</style>
