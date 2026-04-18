<script setup>
import CrosswordBoard from './components/CrosswordBoard.vue'
import CluesList from './components/CluesList.vue'
import { crossword } from './data/crossword.js'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-header__title">{{ crossword.title }}</h1>
      <p class="app-header__sub">{{ crossword.subtitle }}</p>
    </header>

    <main class="app-main">
      <CrosswordBoard />
      <CluesList :clues="crossword.rows" />
    </main>
  </div>
</template>

<style scoped>

.app {
  padding: 1.5rem 1rem 4rem;
  max-width: 960px;
  margin: 0 auto;
   overflow-x: hidden;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-header__title {
  font-size: clamp(1.5rem, 5vw, 2.1rem);
  font-weight: 800;
  color: #1a237e;
  letter-spacing: -0.5px;
}

.app-header__sub {
  color: #78909c;
  font-size: 0.88rem;
  margin-top: 0.25rem;
}

/* Mobilní layout: vše pod sebou */
.app-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
}

/* Desktop: mřížka vlevo, nápovědy vpravo */
@media (min-width: 740px) {
  .app-main {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 3rem;
  }
}

@media (prefers-color-scheme: dark) {
  .app-header__title { color: #c5cae9; }
  .app-header__sub   { color: #546e7a; }
}
</style>
