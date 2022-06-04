import { load } from "opentype.js";
import { ObfuscationOptions } from "./obfuscation-options";
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
  const font = await load(fontFilePath, null, {});

  const originalGlyphs = value2glyphs(value, font);

  const { translation, glyphs } = obfuscateGlyphs(originalGlyphs, options);

  const buffer = generateObfuscatedFont(font, glyphs);

  const obj = obfuscateValue(value, translation);

  return {
    value: obj as T,
    font: buffer,
  };
}
