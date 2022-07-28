import _ from "lodash";
import { Font, Glyph, Path } from "opentype.js";

const values = (object) => {
  if (typeof object === "number") {
    object = `${object}`;
  }

  return _.flatten(
    _.values(object).map((v) => {
      switch (typeof v) {
        case "string":
          return v;
        case "object":
          return values(v);
        default:
          break;
      }
    })
  );
};

export default function value2glyphs<T>(value: T, font: Font): (Glyph & { path: Path })[] {
  const chars = values(value).join("").split("");

  const uniqChars = _.union(chars);

  const glyphs = font.stringToGlyphs(_.shuffle(uniqChars).join(""));

  const notDefGlyph = font.glyphs.get(0);

  glyphs.unshift(notDefGlyph);

  return glyphs as (Glyph & { path: Path })[];
}
