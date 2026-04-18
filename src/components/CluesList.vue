<script setup>
// Přijímá pole rows z crossword.js (má num + hint)
defineProps({
  clues: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <aside class="clues" aria-label="Nápovědy ke křížovce">
    <h2 class="clues__title">Nápovědy</h2>
    <ol class="clues__list">
      <li v-for="row in clues" :key="row.num" class="clues__item">
        <span class="clues__num">{{ row.num }}.</span>
        <span class="clues__text">{{ row.hint }}</span>
      </li>
    </ol>
  </aside>
</template>

<style scoped>
.clues {
  width: 100%;
  max-width: 320px;
  flex-shrink: 0;
}

@media (min-width: 740px) {
  .clues { width: 250px; }
}

.clues__title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #37474f;
  margin-bottom: 0.15rem;
}

.clues__dir {
  font-size: 0.68rem;
  color: #b0bec5;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 0.85rem;
}

.clues__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.clues__item {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  line-height: 1.5;
}

.clues__num {
  font-weight: 700;
  font-size: 0.78rem;
  color: #fbbf24;
  min-width: 1.4rem;
  flex-shrink: 0;
}

.clues__text {
  font-size: 0.87rem;
  color: #455a64;
}

@media (prefers-color-scheme: dark) {
  .clues__title { color: #cfd8dc; }
  .clues__text  { color: #90a4ae; }
  .clues__num   { color: #f59e0b; }
}
</style>
