export const crossword = {
  id: 'odpisovani',
  title: 'Křížovka',
  subtitle: 'Účtování dlouhodobého majetku',
 
  // Tajenka 'ODPISOVÁNÍ' – každý řádek musí mít správné písmeno na sloupci 5 (0-indexed)
  tajenkaCol: 5,
  tajenkaWord: 'ODPISOVÁNÍ',
  totalCols: 11,
 
  rows: [
    { num: 1,  start: 5, word: 'OBDOBÍ',   hint: 'Účetní ... (časový interval, za který se sestavuje závěrka)' },
    { num: 2,  start: 3, word: 'BUDOVA',   hint: 'Typický dlouhodobý hmotný NEMOVITÝ majetek' },
    { num: 3,  start: 3, word: 'ODPIS',    hint: 'Peněžní vyjádření opotřebení majetku za období' },
    { num: 4,  start: 2, word: 'MAJITEL',  hint: 'Vlastník dlouhodobého majetku (fyzická nebo právnická osoba)' },
    { num: 5,  start: 5, word: 'SOFTWARE', hint: 'Příklad nehmotného majetku, který se odpisuje' },
    { num: 6,  start: 2, word: 'DAŇOVÁ',   hint: '... základna (základ pro výpočet daně z příjmů)' },
    { num: 7,  start: 3, word: 'ODVOD',    hint: 'Povinná platba státu (daň, pojistné apod.)' },
    { num: 8,  start: 4, word: 'ZÁLOHA',   hint: 'Platba předem před dodáním plnění' },
    { num: 9,  start: 1, word: 'LICENCE',   hint: 'Pokuta za porušení daňových nebo účetních předpisů' },
    { num: 10, start: 0, word: 'ÚČETNÍ',   hint: '... závěrka (povinný výkaz sestavovaný na konci roku)' },
  ],
}
 