/**
 * Data křížovky.
 *
 * Každý řádek má:
 *   num   – číslo řádku (zobrazí se v prvním políčku)
 *   start – o kolik sloupců (0-based) je řádek odsazen od levého kraje
 *   word  – správná odpověď (VELKÁ PÍSMENA)
 *   hint  – nápověda
 *
 * tajenkaCol – absolutní index sloupce (0-based), kde je žlutý pruh.
 * Písmena v tom sloupci shora dolů tvoří tajenku.
 *
 * Ověření tajenky pro níže uvedená data (tajenkaCol = 5):
 *
 *   řádek 1  VRCHOL   start=2  index 5-2=3  → VRCHOL[3]  = H
 *   řádek 2  ARCHIV   start=0  index 5-0=5  → ARCHIV[5]  = V
 *   řádek 3  SVĚTLO   start=3  index 5-3=2  → SVĚTLO[2]  = Ě
 *   řádek 4  HORIZONT start=1  index 5-1=4  → HORIZONT[4]= Z
 *   řádek 5  HVĚZDÁŘ  start=1  index 5-1=4  → HVĚZDÁŘ[4] = D
 *   řádek 6  ZÁLEŽÍ   start=4  index 5-4=1  → ZÁLEŽÍ[1]  = Á
 *   řádek 7  METEOR   start=0  index 5-0=5  → METEOR[5]  = R
 *   řádek 8  NEPTUN   start=0  index 5-0=5  → NEPTUN[5]  = N
 *   řádek 9  KOMETA   start=0  index 5-0=5  → KOMETA[5]  = A
 *                                                           ↓
 *                                                     HVĚZDÁRNA
 */
export const crossword = {
  title: 'Křížovka',
  subtitle: 'Dlouhodobý majetek',

  // Absolutní index sloupce, kde se nachází tajenka (0-based)
  tajenkaCol: 5,

  // Správné tajné slovo (písmena z tajenkaCol čtená shora dolů)
  tajenkaWord: 'HVĚZDÁRNA',

  // Celkový počet sloupců mřížky (pro správné šířkové vykreslení)
  totalCols: 11,

  // ── Řádky ──────────────────────────────────────────────────────────────
  // Chceš přidat/změnit otázky? Uprav 'word' a 'hint'. Zkontroluj, že
  // písmeno na pozici (tajenkaCol - start) odpovídá zamýšlené tajence.
  rows: [
    { num: 1, start: 2, word: 'VRCHOL',   hint: 'Nejvyšší bod hory nebo křivky' },
    { num: 2, start: 0, word: 'ARCHIV',   hint: 'Místo pro uchovávání dokumentů a záznamů' },
    { num: 3, start: 3, word: 'SVĚTLO',   hint: 'Elektromagnetické záření viditelné okem' },
    { num: 4, start: 1, word: 'HORIZONT', hint: 'Pomyslná linie, kde se stýká nebe se zemí' },
    { num: 5, start: 1, word: 'HVĚZDÁŘ',  hint: 'Nadšenec nebo odborník pozorující hvězdy' },
    { num: 6, start: 4, word: 'ZÁLEŽÍ',   hint: 'Na tom výsledek velmi …' },
    { num: 7, start: 0, word: 'METEOR',   hint: 'Záblesk světla při průletu tělesa atmosférou' },
    { num: 8, start: 0, word: 'NEPTUN',   hint: 'Nejvzdálenější planeta sluneční soustavy' },
    { num: 9, start: 0, word: 'KOMETA',   hint: 'Nebeské těleso s jasným ocasem na obloze' },
  ],
}
