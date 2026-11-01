<script setup lang="ts">
import { computed, ref } from 'vue'
import LibraryView from './views/LibraryView.vue'
import LessonPlayer from './views/LessonPlayer.vue'
import DerivationView from './views/DerivationView.vue'
import QuizView from './views/QuizView.vue'
import { getCourse } from './data/courses'
import { quizFor } from './data/quizzes'

type ViewKind = 'library' | 'lesson' | 'notes' | 'quiz'

const view = ref<ViewKind>('library')
const activeCourseId = ref<string | null>(null)
const lessonStep = ref(0)
const quizReturn = ref<'lesson' | 'notes'>('lesson')

const activeCourse = computed(() => (activeCourseId.value ? getCourse(activeCourseId.value) : null))
const questions = computed(() => (activeCourse.value ? quizFor(activeCourse.value.id) : []))

function toTop() {
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function openLesson(id: string) {
  activeCourseId.value = id
  lessonStep.value = 0
  view.value = 'lesson'
  toTop()
}

function closeLesson() {
  view.value = 'library'
  activeCourseId.value = null
  lessonStep.value = 0
  toTop()
}

function openNotes() {
  if (!activeCourse.value) return
  view.value = 'notes'
  toTop()
}

function openQuiz(from: 'lesson' | 'notes') {
  if (!activeCourse.value) return
  quizReturn.value = from
  view.value = 'quiz'
  toTop()
}

function backToLesson() {
  if (!activeCourse.value) {
    closeLesson()
    return
  }
  view.value = 'lesson'
  toTop()
}

function closeQuiz() {
  view.value = quizReturn.value === 'notes' && activeCourse.value ? 'notes' : 'lesson'
  toTop()
}

function rememberStep(index: number) {
  lessonStep.value = index
}
</script>

<template>
  <div class="app-shell">
    <Transition name="page" mode="out-in">
      <LibraryView v-if="view === 'library'" key="library" @open="openLesson" />

      <LessonPlayer
        v-else-if="view === 'lesson' && activeCourse"
        :key="`lesson-${activeCourse.id}`"
        :course="activeCourse"
        :start-index="lessonStep"
        @back="closeLesson"
        @notes="openNotes"
        @quiz="openQuiz('lesson')"
        @step="rememberStep"
      />

      <DerivationView
        v-else-if="view === 'notes' && activeCourse"
        :key="`notes-${activeCourse.id}`"
        :course="activeCourse"
        @back="backToLesson"
        @quiz="openQuiz('notes')"
      />

      <QuizView
        v-else-if="view === 'quiz' && activeCourse"
        :key="`quiz-${activeCourse.id}`"
        :course="activeCourse"
        :questions="questions"
        @back="closeQuiz"
      />

      <LibraryView v-else key="fallback" @open="openLesson" />
    </Transition>
    <div class="grain" aria-hidden="true" />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}
</style>
