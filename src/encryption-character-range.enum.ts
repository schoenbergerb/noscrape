/**
 * Unicode Ranges to use for encryption
 * @see https://www.ling.upenn.edu/courses/Spring_2003/ling538/UnicodeRanges.html
 */
export enum EncryptionCharakterRange {
  /* 0000 - 007F  Basic Latin */
  LATIN = 33,

  /* 0370	- 03FF	Greek/Coptic */
  GREEK = 880,

  /* 0400	- 04FF	Cyrillic */
  CYRILLIC = 1024,

  /* 0590	- 05FF	Hebrew */
  HEBREW = 1424,

  /* E000 - F8FF  Private Use Area */
  DEFAULT = 57344,

  /* 3040 - 309F  Hiragana */
  HIRAGANA = 12352,

  /* 30A0	- 30FF	Katakana */
  KATAKANA = 12448,
}
