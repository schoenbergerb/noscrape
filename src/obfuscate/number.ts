import { obfuscateString } from "./string";

/**
 * Obfuscates a number by converting it to a string and then obfuscating the string.
 * This function leverages the string obfuscation method for numbers.
 *
 * @param {number} num - The number to be obfuscated.
 * @param {Map<number, number>} translation - The translation map used for obfuscation.
 * @returns {string} - The obfuscated number represented as a string.
 */
export function obfuscateNumber(
  num: number,
  translation: Map<number, number>,
): string {
  return obfuscateString(`${num}`, translation);
}
