import { Font } from "opentype.js";

export function generateObfuscatedFont(font, glyphs) {
  const newFont = new Font({
    familyName: "noscrape",
    styleName: "obfuscated",
    unitsPerEm: font.unitsPerEm,
    ascender: font.ascender,
    descender: font.descender,
    glyphs,
  });

  // provide original font informations if availible
  if (font.names) {
    newFont.names = font.names;
  }

  return Buffer.from(newFont.toArrayBuffer());
}
