<script setup lang="ts">
import { ref } from 'vue'
import LibraryView from './views/LibraryView.vue'
import MalthusLesson from './views/MalthusLesson.vue'

const lessonOpen = ref(false)

function openLesson() {
  lessonOpen.value = true
}

function closeLesson() {
  lessonOpen.value = false
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>

<template>
  <div class="app-shell">
    <Transition name="page" mode="out-in">
      <LibraryView v-if="!lessonOpen" key="library" @open="openLesson" />
      <MalthusLesson v-else key="lesson" @back="closeLesson" />
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
