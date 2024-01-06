/**
 * Obfuscates a string by translating each character based on the provided translation map.
 *
 * @param {string} value - The string to be obfuscated.
 * @param {Map<number, number>} translation - The translation map used for obfuscation.
 * @returns {string} - The obfuscated string.
 */
export function obfuscateString(
  value: string,
  translation: Map<number, number>,
): string {
  const codes: number[] = value.split("").map((c) => {
    const code = c.charCodeAt(0);
    return translation.get(code) ?? 0;
  });

  return String.fromCharCode(...codes);
}
