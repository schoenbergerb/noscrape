import _ from "lodash";
import { Font, Glyph } from "opentype.js";

const values = (object) => {
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

export default function value2glyphs<T>(value: T, font: Font): Glyph[] {
  const chars = values(value).join("").split("");

  const uniqChars = _.union(chars);

  return font.stringToGlyphs(_.shuffle(uniqChars).join(""));
}
