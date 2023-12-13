import { Glyph, Path } from "opentype.js";
import { EncryptionCharacterRange } from "./encryption-character-range.enum";

type GlyphObfuscationResult = {
  translation: Map<number, number>;
  glyphs: Glyph[];
};

export function obfuscateGlyphs(
  originalGlyphs: (Glyph & { path: Path })[],
  characterRange: EncryptionCharacterRange,
  strength: number,
): GlyphObfuscationResult {
  const translation = new Map<number, number>();

  const glyphs: Glyph[] = [];

  for (let index = 0; index < originalGlyphs.length; index += 1) {
    const glyph = originalGlyphs[index];

    const unicode = index + characterRange;

    if (!glyph.unicode) {
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

  glyphs.unshift(new Glyph({ index: 0, name: "NOTDEF", advanceWidth: 0 }));

  return { translation, glyphs };
}
