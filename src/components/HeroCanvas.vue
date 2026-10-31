<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { GrowthField } from '../three/GrowthField'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let field: GrowthField | null = null

onMounted(() => {
  if (canvasRef.value) field = new GrowthField(canvasRef.value)
})

onBeforeUnmount(() => {
  field?.dispose()
  field = null
})
</script>

<template>
  <div class="hero-canvas">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-canvas canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
