import { load } from "opentype.js";
import { ObfuscationOptions } from "./obfuscation-options";
import obfuscateGlyphs from "./glyph";
import generateObfuscatedFont from "./font";
import value2glyphs from "./value2glyphs";
import obfuscateObject from "./obfuscate-object";

/**
 * @param value object which will be translated
 * @param fontFilePath
 * @returns font-family string
 */
export default async function obfuscate<T>(
  value: T,
  fontFilePath: string,
  options?: ObfuscationOptions
) {
  const font = await load(fontFilePath, null, {});

  const originalGlyphs = value2glyphs(value, font);

  const { translation, glyphs } = obfuscateGlyphs(originalGlyphs, options);

  const buffer = generateObfuscatedFont(font, glyphs, translation);

  const obj = obfuscateObject(value, translation);

  return {
    value: obj,
    font: buffer,
  };
}
