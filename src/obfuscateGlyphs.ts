import { Glyph, Path } from "opentype.js";
import { EncryptionCharacterRange } from "./encryption-character-range.enum";

type Props = {
  originalGlyphs: (Glyph & { path: Path })[];
  characterRange: EncryptionCharacterRange;
  strength: number;
  translation: Map<number, number>;
  glyphs: Glyph[];
};

// eslint-disable-next-line import/no-default-export
export default ({
  originalGlyphs,
  characterRange,
  strength,
  translation,
  glyphs,
}: Props) => {
  for (let index = 0; index < originalGlyphs.length; index += 1) {
    const glyph = originalGlyphs[index];

    const unicode = index + characterRange;

    if (!glyph.unicode || translation.get(glyph.unicode)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    translation.set(glyph.unicode, unicode);

    const commands = glyph.path.commands.map((cmd: any) => {
      if (!cmd.x || !cmd.y) {
        return cmd;
      }

      return {
        ...cmd,
        x: cmd.x + Math.random() * strength,
        y: cmd.y + Math.random() * strength,
      };
    });

    const { path } = glyph;
    path.commands = commands;

    const g = new Glyph({
      index,
      name: Number(unicode).toString(16),
      unicode,
      path,
      advanceWidth: glyph.advanceWidth,
    });

    glyphs.push(g);
  }

  return { translation, glyphs };
};
