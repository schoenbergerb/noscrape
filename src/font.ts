import { Font, Glyph } from "opentype.js";

/**
 * Generates an obfuscated font based on the provided font and glyphs.
 *
 * @param {Font} font - The original font object to be obfuscated.
 * @param {Glyph[]} glyphs - An array of glyphs used for the obfuscation process.
 * @returns {Buffer} A buffer containing the obfuscated font data.
 */
export function generateObfuscatedFont(font: Font, glyphs: Glyph[]): Buffer {
  // Create a new font object with the necessary properties
  const newFont = new Font({
    familyName: "noscrape",
    styleName: "obfuscated",
    unitsPerEm: font.unitsPerEm,
    ascender: font.ascender,
    descender: font.descender,
    glyphs,
  });

  // Provide original font information if available
  if (font.names) {
    newFont.names = font.names;
  }

  return Buffer.from(newFont.toArrayBuffer());
}
