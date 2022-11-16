import { Font, Glyph, Path } from "opentype.js";

/**
 * pick all necessary characters from given value
 * @param object 
 * @param set 
 * @returns 
 */
const values = (object, set: Set<any>) => {
  switch (typeof object) {
    case 'number':
    case 'string':
      `${object}`.split('').forEach(c => set.add(c));
      break;
    case 'object':
      Object.values(object).map(v => values(v, set));
      break;
    default:
      break;
  }

  return set
};

export default function value2glyphs<T>(value: T, font: Font): (Glyph & { path: Path })[] {
  const uniqChars = [...values(value, new Set())];

  const shuffled = uniqChars.sort(() => Math.random() - .5);

  const glyphs = font.stringToGlyphs(shuffled.join(''));

  const notDefGlyph = font.glyphs.get(0);

  glyphs.unshift(notDefGlyph);

  return glyphs as (Glyph & { path: Path })[];
}
