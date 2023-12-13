import { Font, Glyph, loadSync } from "opentype.js";
import { DEFAULT_OPTIONS, ObfuscationOptions } from "./obfuscation-options";
import { value2glyphs } from "./value2glyphs";
import { obfuscateValue } from "./obfuscate/value";
import { generateObfuscatedFont } from "./font";
import obfuscateGlyphs from "./obfuscateGlyphs";

export class Noscrape {
  private readonly font: Font;

  private options: Required<ObfuscationOptions>;

  private translation = new Map<number, number>();

  private glyphs: Glyph[] = [
    new Glyph({ index: 0, name: "NOTDEF", advanceWidth: 0 }),
  ];

  constructor(fontFilePath: string, options?: ObfuscationOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.font = loadSync(fontFilePath, { lowMemory: this.options.lowMemory });
  }

  public obfuscate<T extends string | number | object>(value: T): T {
    const originalGlyphs = value2glyphs(value, this.font);

    obfuscateGlyphs({
      originalGlyphs,
      translation: this.translation,
      glyphs: this.glyphs,
      characterRange: this.options.characterRange,
      strength: this.options.strength,
    });

    return obfuscateValue<T>(value, this.translation);
  }

  public getFont(): Buffer {
    return generateObfuscatedFont(this.font, this.glyphs);
  }
}
