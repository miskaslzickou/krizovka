<script setup>
import { ref, computed } from 'vue'
import { crossword } from '../data/crossword.js'

const { tajenkaCol, tajenkaWord, rows, totalCols } = crossword

// ── State ──────────────────────────────────────────────────────────────────
const inputs    = ref(rows.map(r => Array(r.word.length).fill('')))
const rowStates = ref(rows.map(() => 'idle'))  // 'idle' | 'correct' | 'wrong'

// ── Hrany mřížky – každá hrana se smí nakreslit PŘESNĚ JEDNOU ─────────────
// Každá buňka má vždy border-right + border-bottom.
// border-top dostane jen tehdy, když nad ní není jiná buňka (tj. je "na vrcholu" sloupce).
// border-left dostane jen první buňka v řádku (li === 0).
function hasAbove(ri, li) {
  if (ri === 0) return false
  const absCol = rows[ri].start + li
  const prev   = rows[ri - 1]
  const prevLi = absCol - prev.start
  return prevLi >= 0 && prevLi < prev.word.length
}

// ── Validace ───────────────────────────────────────────────────────────────
function checkRow(ri) {
  const correct = rows[ri].word.toUpperCase()
  const typed   = inputs.value[ri].join('').toUpperCase()

  if (typed === correct) {
    rowStates.value[ri] = 'correct'
  } else {
    rowStates.value[ri] = 'wrong'
    setTimeout(() => {
      rowStates.value[ri] = 'idle'
      inputs.value[ri]    = Array(rows[ri].word.length).fill('')
      focusCell(ri, 0)
    }, 1500)
  }
}

// ── Vstup ─────────────────────────────────────────────────────────────────
function handleInput(ri, li, e) {
  if (rowStates.value[ri] !== 'idle') return
  const val = e.target.value.slice(-1).toUpperCase()
  inputs.value[ri][li] = val
  e.target.value = val
  if (val) {
    if (li < rows[ri].word.length - 1) focusCell(ri, li + 1)
    if (inputs.value[ri].every(l => l !== '')) checkRow(ri)
  }
}

function handleKeydown(ri, li, e) {
  if (rowStates.value[ri] !== 'idle') { e.preventDefault(); return }
  switch (e.key) {
    case 'Backspace':
      if (!inputs.value[ri][li]) {
        e.preventDefault()
        if (li > 0) { inputs.value[ri][li - 1] = ''; focusCell(ri, li - 1) }
      }
      break
    case 'ArrowRight': e.preventDefault(); if (li < rows[ri].word.length - 1) focusCell(ri, li + 1); break
    case 'ArrowLeft':  e.preventDefault(); if (li > 0) focusCell(ri, li - 1); break
    case 'ArrowDown':  e.preventDefault(); moveFocusVertical(ri, li,  1); break
    case 'ArrowUp':    e.preventDefault(); moveFocusVertical(ri, li, -1); break
  }
}

function moveFocusVertical(ri, li, dir) {
  const absCol = rows[ri].start + li
  for (let r = ri + dir; r >= 0 && r < rows.length; r += dir) {
    const li2 = absCol - rows[r].start
    if (li2 >= 0 && li2 < rows[r].word.length && rowStates.value[r] === 'idle') {
      focusCell(r, li2); return
    }
  }
}

function focusCell(ri, li) {
  document.querySelector(`[data-cell="${ri}-${li}"]`)?.focus()
}

function resetAll() {
  inputs.value    = rows.map(r => Array(r.word.length).fill(''))
  rowStates.value = rows.map(() => 'idle')
}

// ── Tajenka ────────────────────────────────────────────────────────────────
const tajenkaLetters = computed(() =>
  rows.map((row, ri) => {
    const li = tajenkaCol - row.start
    if (li < 0 || li >= row.word.length) return ''
    return inputs.value[ri][li] || ''
  })
)

const isSolved = computed(() => {
  const assembled = tajenkaLetters.value.join('').toUpperCase()
  return assembled.length === tajenkaWord.length && assembled === tajenkaWord.toUpperCase()
})
</script>

<template>
  <div class="board" :style="{ '--total-cols': totalCols }">

    <!-- ── Mřížka (CSS Grid s explicitním umístěním) ──────────── -->
    <div class="grid" role="grid" :aria-label="crossword.title">
      <template v-for="(row, ri) in rows" :key="ri">
        <div
          v-for="(_, li) in row.word"
          :key="li"
          :class="[
            'cell',
            !hasAbove(ri, li)                       && 'cell--top',
            li === 0                                 && 'cell--left',
            row.start + li === tajenkaCol            && 'cell--tajenka',
            rowStates[ri] === 'wrong'               && 'cell--wrong',
            rowStates[ri] === 'correct'             && 'cell--correct',
          ]"
          :style="{
            gridColumn: row.start + li + 1,
            gridRow:    ri + 1,
          }"
          role="gridcell"
        >
          <span v-if="li === 0" class="cell__num" aria-hidden="true">{{ row.num }}</span>
          <input
            :data-cell="`${ri}-${li}`"
            type="text"
            inputmode="text"
            :value="inputs[ri][li]"
            :readonly="rowStates[ri] !== 'idle'"
            @input="handleInput(ri, li, $event)"
            @keydown="handleKeydown(ri, li, $event)"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="characters"
            spellcheck="false"
            maxlength="2"
            :aria-label="`Řádek ${row.num}, písmeno ${li + 1}`"
          />
        </div>
      </template>
    </div>

    <!-- ── Tajenka ────────────────────────────────────────────── -->
    <div class="tajenka">
      <p class="tajenka__label">Tajenka</p>
      <div class="tajenka__cells" aria-live="polite">
        <div
          v-for="(letter, ri) in tajenkaLetters"
          :key="ri"
          :class="['tajenka__cell', letter && 'tajenka__cell--filled']"
        >{{ letter }}</div>
      </div>
      <Transition name="pop">
        <p v-if="isSolved" class="tajenka__success" role="status">
          Správně! Tajenka je: <strong>{{ tajenkaWord }}</strong>
        </p>
      </Transition>
    </div>

    <!-- ── Reset ──────────────────────────────────────────────── -->
    <button class="btn-reset" type="button" @click="resetAll">Vymazat vše</button>

  </div>
</template>

<style scoped>
/* ── Proměnné ────────────────────────────────────────────────────────────── */
.board {
  --cell:   50px;
  --border: #b0bec5;
  --tajenka-yellow:      #fde68a;
  --tajenka-yellow-dark: #fbbf24;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

@media (max-width: 560px) {
  .board { --cell: 36px; }
}

/* ── CSS Grid mřížka ─────────────────────────────────────────────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(var(--total-cols), var(--cell));
  grid-auto-rows: var(--cell);
  /* Šířka přesně ohraničuje obsazené sloupce */
  width: calc(var(--total-cols) * var(--cell));
}

/* ── Políčko ────────────────────────────────────────────────────────────── */
/*
 * Strategie bez zdvojeného okraje:
 *   – každá buňka má VŽDY border-right + border-bottom
 *   – border-top  = jen pokud nad buňkou není jiná buňka  (třída .cell--top)
 *   – border-left = jen první buňka v řádku (li === 0)    (třída .cell--left)
 * → každá hrana mřížky se nakreslí přesně jednou.
 */
.cell {
  box-sizing: border-box;
  width:  var(--cell);
  height: var(--cell);
  border-right:  1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
  background: var(--cell-bg, #ffffff);
  transition: background 0.15s;
}

.cell--top  { border-top:  1px solid var(--border); }
.cell--left { border-left: 1px solid var(--border); }

/* Tajenka sloupec – žlutý */
.cell--tajenka { --cell-bg: var(--tajenka-yellow); }

/* ── Validační stavy ────────────────────────────────────────────────────── */
.cell--wrong {
  --cell-bg: #fee2e2;
  animation: shake 0.45s ease;
}
.cell--wrong.cell--tajenka { --cell-bg: #fca5a5; }
.cell--wrong input          { color: #dc2626; }

.cell--correct              { --cell-bg: #dcfce7; }
.cell--correct.cell--tajenka{ --cell-bg: #86efac; }
.cell--correct input        { color: #15803d; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-5px); }
  35%       { transform: translateX(5px); }
  55%       { transform: translateX(-3px); }
  75%       { transform: translateX(3px); }
}

/* Číslo řádku */
.cell__num {
  position: absolute;
  top: 1px; left: 2px;
  font-size: 9px;
  font-weight: 700;
  color: #78909c;
  pointer-events: none;
  line-height: 1;
  z-index: 1;
}

/* Input */
.cell input {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  border: none;
  background: transparent;
  text-align: center;
  font-size: clamp(0.8rem, 2.8vw, 1.1rem);
  font-weight: 700;
  color: #1a1a2e;
  text-transform: uppercase;
  cursor: text;
  outline: none;
  padding: 0;
  padding-top: 6px;
  caret-color: transparent;
}

.cell input:focus {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
  border-radius: 1px;
}

/* ── Tajenka display ────────────────────────────────────────────────────── */
.tajenka { display: flex; flex-direction: column; gap: 0.6rem; }

.tajenka__label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #78909c;
}

.tajenka__cells { display: flex; gap: 4px; }

.tajenka__cell {
  box-sizing: border-box;
  width: var(--cell); height: var(--cell);
  border: 1.5px solid #fde68a;
  border-radius: 5px;
  background: #fffbeb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.8rem, 2.8vw, 1.1rem);
  font-weight: 700;
  color: #a16207;
  text-transform: uppercase;
  transition: background 0.15s, border-color 0.15s;
}

.tajenka__cell--filled {
  background: var(--tajenka-yellow);
  border-color: var(--tajenka-yellow-dark);
  color: #78350f;
}

.tajenka__success {
  background: #dcfce7;
  border: 2px solid #22c55e;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  color: #14532d;
  font-size: 0.9rem;
  text-align: center;
}

.pop-enter-active { transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pop-enter-from   { opacity: 0; transform: scale(0.8) translateY(8px); }

/* ── Reset ──────────────────────────────────────────────────────────────── */
.btn-reset {
  background: transparent;
  border: 1.5px solid #cfd8dc;
  border-radius: 7px;
  padding: 0.38rem 0.9rem;
  font-size: 0.8rem;
  color: #90a4ae;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.btn-reset:hover { border-color: #ef4444; color: #ef4444; }

/* ── Dark mode ──────────────────────────────────────────────────────────── */
@media (prefers-color-scheme: dark) {
  .board {
    --border: #546e7a;
    --tajenka-yellow:      #92400e;
    --tajenka-yellow-dark: #b45309;
  }

  .cell { background: var(--cell-bg, #1e2a38); }
  .cell input { color: #e0e7ef; }
  .cell input:focus { outline-color: #60a5fa; }
  .cell__num { color: #607d8b; }

  .tajenka__cell        { background: #1c1917; border-color: #78350f; color: #d97706; }
  .tajenka__cell--filled{ background: #78350f; border-color: #b45309; color: #fde68a; }
  .tajenka__label       { color: #546e7a; }
  .btn-reset            { color: #546e7a; border-color: #37474f; }
}
</style>
