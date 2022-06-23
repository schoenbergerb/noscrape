import { Glyph, Path, PathCommand } from "opentype.js";
import { EncryptionCharacterRange } from "./encryption-character-range.enum";

type GlyphObfuscationResult = {
  translation: Map<number, number>,
  glyphs: Glyph[],
}

export function obfuscateGlyphs(
  originalGlyphs: Glyph[],
  characterRange?: EncryptionCharacterRange,
  strength?: number,
): GlyphObfuscationResult {
  const translation = new Map<number, number>();

  const startFromUnicode = characterRange ?? EncryptionCharacterRange.PRIVATE_USE_AREA;

  const glyphs = originalGlyphs.map((glyph: Glyph, index) => {
    const unicode = index + startFromUnicode;

    translation.set(glyph.unicode, unicode);

    const commands: PathCommand[] = [];

    for (const cmd of glyph.getPath().commands) {

      switch (cmd.type) {
        case 'M':
        case 'L':
        case 'C':
        case 'Q':
          commands.push({
            ...cmd,
            x: cmd.x + Math.random() * (strength ?? 1),
            y: cmd.y + Math.random() * (strength ?? 1),
          })
          break;
        case 'Z':
          commands.push(cmd);
          break;
      }
    }

    const path = new Path()
    path.commands = commands;

    return new Glyph({
      index,
      name: Number(unicode).toString(16),
      unicode,
      path,
      advanceWidth: glyph.advanceWidth,
    });
  });

  return { translation, glyphs };
}
