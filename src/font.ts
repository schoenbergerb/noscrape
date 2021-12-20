import { Font } from "opentype.js";

export default function generateObfuscatedFont(font, glyphs, translation) {
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
