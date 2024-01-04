import { Font, Glyph, loadSync } from "opentype.js";
import { DEFAULT_OPTIONS, ObfuscationOptions } from "./obfuscation-options";
import { value2glyphs } from "./value2glyphs";
import { obfuscateValue } from "./obfuscate/value";
import { generateObfuscatedFont } from "./font";
import { obfuscateGlyphs } from "./obfuscateGlyphs";

/**
 * The Noscrape class provides methods for obfuscating text using a custom font.
 * It allows obfuscation of strings, numbers, and objects.
 */
export class Noscrape {
  private readonly font: Font;

  private options: Required<ObfuscationOptions>;

  private translation = new Map<number, number>();

  private glyphs: Glyph[] = [
    new Glyph({ index: 0, name: "NOTDEF", advanceWidth: 0 }),
  ];

  /**
   * Initializes a new instance of the Noscrape class.
   *
   * @param {string} fontFilePath - The file path to the true-type font.
   * @param {ObfuscationOptions} options - Optional configuration options for obfuscation.
   */
  constructor(fontFilePath: string, options?: ObfuscationOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.font = loadSync(fontFilePath, { lowMemory: this.options.lowMemory });
  }

  /**
   * Obfuscates a given value (string, number, or object) using the configured font and options.
   *
   * @param {T extends string | number | object} value - The value to obfuscate.
   * @returns {T extends string | number | object} - The obfuscated value.
   */
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

  /**
   * Generates and returns the obfuscated font as a buffer.
   *
   * @returns {Buffer} - The obfuscated font in buffer format.
   */
  public getFont(): Buffer {
    return generateObfuscatedFont(this.font, this.glyphs);
  }
}
