import { loadSync } from "opentype.js";
import { DEFAULT_OPTIONS, ObfuscationOptions } from "./obfuscation-options";
import { obfuscateGlyphs } from "./glyph";
import { generateObfuscatedFont } from "./font";
import value2glyphs from "./value2glyphs";
import { obfuscateValue } from "./obfuscate/value";

type ObfuscationResult = { font: string }

/**
 * @param value object which will be translated
 * @param fontFilePath
 * @returns font-family string
 */
export async function obfuscate<T extends string | number | object>(
  value: T,
  fontFilePath: string,
  options?: ObfuscationOptions
): Promise<{ value: T, font: Buffer }> {
  const { characterRange, strength, lowMemory } = options ?? DEFAULT_OPTIONS;

  const font = loadSync(fontFilePath, { lowMemory: lowMemory ?? false });

  const originalGlyphs = value2glyphs(value, font);

  const { translation, glyphs } = obfuscateGlyphs(originalGlyphs, characterRange, strength);

  const buffer = generateObfuscatedFont(font, glyphs);

  const obj = obfuscateValue(value, translation);
  return {
    value: obj as T,
    font: buffer,
  };
}
