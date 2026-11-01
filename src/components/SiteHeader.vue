<script setup lang="ts">
const emit = defineEmits<{
  start: []
}>()

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <button class="brand" type="button" @click="go('top')">
        <svg class="mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="brand-grad" x1="4" y1="26" x2="28" y2="6" gradientUnits="userSpaceOnUse">
              <stop stop-color="#74f0c2" stop-opacity="0.35" />
              <stop offset="1" stop-color="#74f0c2" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="14" stroke="rgba(150,179,212,0.22)" />
          <path
            d="M5 24.5C13.5 24 16 17 19.5 10.5C21.5 6.9 23.8 5.4 27 5"
            stroke="url(#brand-grad)"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <circle cx="27" cy="5" r="1.9" fill="#74f0c2" />
        </svg>
        <span class="brand-text">
          <strong>ANIMA</strong>
          <small>知识动画实验室</small>
        </span>
      </button>

      <nav class="nav">
        <button type="button" @click="go('courses')">课程库</button>
        <button type="button" @click="go('book')">书籍</button>
        <button type="button" @click="go('method')">方法</button>
        <button type="button" @click="go('about')">关于</button>
      </nav>

      <button class="header-cta" type="button" @click="emit('start')">
        <span class="live-dot" />
        <span>开始第一课</span>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  height: 76px;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, rgba(4, 7, 12, 0.92) 0%, rgba(4, 7, 12, 0.55) 62%, transparent 100%);
  backdrop-filter: blur(14px);
}

.header-inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0;
  text-align: left;
}

.mark {
  width: 32px;
  height: 32px;
  flex: none;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  line-height: 1;
}

.brand-text strong {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: #eaf3fc;
}

.brand-text small {
  font-size: 9.5px;
  letter-spacing: 0.2em;
  color: var(--muted);
}

.nav {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  margin-right: 12px;
}

.nav button {
  padding: 8px 15px;
  border-radius: 999px;
  font-size: 12.5px;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  transition: color 0.25s ease, background 0.25s ease;
}

.nav button:hover {
  color: var(--text);
  background: rgba(150, 179, 212, 0.08);
}

.header-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px 9px 14px;
  border: 1px solid rgba(116, 240, 194, 0.26);
  border-radius: 999px;
  background: rgba(116, 240, 194, 0.06);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #d7f8ec;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s var(--ease-out);
}

.header-cta:hover {
  background: rgba(116, 240, 194, 0.13);
  border-color: rgba(116, 240, 194, 0.45);
  transform: translateY(-1px);
}

.header-cta svg {
  width: 14px;
  height: 14px;
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 0 4px rgba(116, 240, 194, 0.12);
  animation: dot-pulse 2.4s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(116, 240, 194, 0.1);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(116, 240, 194, 0.03);
  }
}

@media (max-width: 1080px) {
  .nav {
    display: none;
  }
  .header-cta {
    margin-left: auto;
  }
}

@media (max-width: 720px) {
  .header-inner {
    padding: 0 20px;
  }
  .header-cta span:not(.live-dot) {
    display: none;
  }
  .header-cta {
    padding: 10px;
    gap: 0;
  }
  .header-cta svg {
    display: none;
  }
}
</style>
