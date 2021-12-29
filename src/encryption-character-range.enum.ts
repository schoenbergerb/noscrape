/**
 * Unicode Ranges to use for encryption
 * @see https://www.ling.upenn.edu/courses/Spring_2003/ling538/UnicodeRanges.html
 */
export enum EncryptionCharacterRange {
  /* 0000 - 007F  Basic Latin */
  LATIN = 33,

  /* 0370	- 03FF	Greek/Coptic */
  GREEK = 880,

  /* 0400	- 04FF	Cyrillic */
  CYRILLIC = 1024,

  /* E000 - F8FF  Private Use Area - DEFAULT */
  PRIVATE_USE_AREA = 57344,

  /* 3040 - 309F  Hiragana */
  HIRAGANA = 12352,

  /* 30A0	- 30FF	Katakana */
  KATAKANA = 12448,
}
