import { Font, Glyph, Path } from "opentype.js";

/**
 * pick all necessary characters from given value
 * @param {string | number | object} value
 * @param {Set<string>} set
 * @returns
 */
const values = (value: string | number | object, set: Set<string>) => {
  switch (typeof value) {
    case "number":
    case "string":
      `${value}`.split("").forEach((c) => set.add(c));
      break;
    case "object":
      Object.values(value).map((v) => values(v, set));
      break;
    default:
      break;
  }

  return set;
};

/**
 * Converts a value into an array of glyphs based on the provided font.
 *
 * @param {T extends string | number | object} value - The value to be converted into glyphs.
 * @param {Font} font - The font used to convert the value into glyphs.
 * @returns {(Glyph & { path: Path })[]} - An array of glyphs representing the value.
 */
export function value2glyphs<T extends string | number | object>(
  value: T,
  font: Font,
): (Glyph & { path: Path })[] {
  const uniqChars = [...values(value, new Set())];

  const shuffled = uniqChars.sort(() => Math.random() - 0.5);

  const glyphs = font.stringToGlyphs(shuffled.join(""));

  const notDefGlyph = font.glyphs.get(0);

  glyphs.unshift(notDefGlyph);

  return glyphs as (Glyph & { path: Path })[];
}
