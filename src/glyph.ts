import { Glyph } from "opentype.js";
import { EncryptionCharacterRange } from "./encryption-character-range.enum";
import { ObfuscationOptions } from "./obfuscation-options";

type GlyphObfuscationResult = {
  translation: Map<number, number>,
  glyphs: Glyph[],
}

export function obfuscateGlyphs(
  originalGlyphs: Glyph[],
  characterRange: EncryptionCharacterRange, 
  strength: number
): GlyphObfuscationResult {
  const translation = new Map<number, number>();

  const glyphs = originalGlyphs.map((glyph, index) => {
    const unicode = index + characterRange;

    translation.set(glyph.unicode, unicode);

    const commands = glyph.path.commands.map((cmd) => {
      if (!cmd.x || !cmd.y) {
        return cmd;
      }

      return {
        ...cmd,
        x: cmd.x + Math.random() * strength,
        y: cmd.y + Math.random() * strength,
      };
    });

    return new Glyph({
      index,
      name: Number(unicode).toString(16),
      unicode,
      path: {
        ...glyph.path,
        commands,
      },
      advanceWidth: glyph.advanceWidth,
      leftSideBearing: glyph.leftSideBearing,
    });
  });

  return { translation, glyphs };
}
