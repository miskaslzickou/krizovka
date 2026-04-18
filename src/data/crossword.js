export const crossword = {
  id: 'odpisovani_kratke',
  title: 'Křížovka',
  subtitle: 'Účtování dlouhodobého majetku',
 
  // Tajenka 'ODPISOVÁNÍ' – každý řádek musí mít správné písmeno na sloupci 2 (0-indexed)
  tajenkaCol: 2,
  tajenkaWord: 'ODPISOVÁNÍ',
  totalCols: 7, // Nejdelší přesah je u slova STROJ (start 2 + 5 písmen = 7)
 
  rows: [
    { num: 1,  start: 1, word: 'DOBA',  hint: 'Délka v letech, po kterou se majetek postupně odpisuje' },
    { num: 2,  start: 0, word: 'SAD',   hint: 'Pěstitelský celek trvalých porostů (specifický druh dlouhodobého majetku)' },
    { num: 3,  start: 2, word: 'PES',   hint: 'Služební ... (zvíře, které se eviduje jako dlouhodobý majetek)' },
    { num: 4,  start: 1, word: 'MÍRA',   hint: '... opotřebení majetku (vyjadřuje, jak moc majetek fyzicky či morálně ztratil na hodnotě)' },
    { num: 5,  start: 2, word: 'STROJ', hint: 'Výrobní zařízení v továrně (typický hmotný majetek)' },
    { num: 6,  start: 1, word: 'LOĎ',   hint: 'Větší plavidlo (dopravní prostředek evidovaný jako majetek)' },
    { num: 7,  start: 2, word: 'VĚC',   hint: 'Hmotná movitá ... (základní kategorie dlouhodobého majetku)' },
    { num: 8,  start: 0, word: 'PLÁN',  hint: 'Odpisový ... (dokument obsahující rozvrh a sazby odpisování)' },
    { num: 9,  start: 0, word: 'CENA',  hint: 'Vstupní ... (výchozí částka, ze které se počítají odpisy)' },
    { num: 10, start: 1, word: 'DÍLO',  hint: 'Umělecké ... (majetek, který se neodpisuje, protože neztrácí hodnotu)' },
  ],
}