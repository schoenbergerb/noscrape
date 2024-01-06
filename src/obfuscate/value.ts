import { obfuscateNumber } from "./number";
import { obfuscateObject } from "./object";
import { obfuscateString } from "./string";

/**
 * Obfuscates a given value based on its type.
 * This function can handle obfuscation of strings, numbers, and objects.
 * It delegates the obfuscation task to specific functions based on the type of the value.
 *
 * @param {T extends string | number | object} value - The value to be obfuscated. Can be a string, number, or object.
 * @param {Map<number, number>} translation - The translation map used for obfuscation.
 * @returns {T extends string | number | object} - The obfuscated value, maintaining the same type as the input.
 * @throws {Error} - Throws an error if the value type is not supported for obfuscation.
 */
export function obfuscateValue<T extends string | number | object>(
  value: T,
  translation: Map<number, number>,
): T {
  switch (typeof value) {
    case "number":
      return obfuscateNumber(value, translation) as T;
    case "string":
      return obfuscateString(value, translation) as T;
    case "object":
      return obfuscateObject(value, translation) as T;
    default:
      throw new Error(`${typeof value} could not be obfuscated`);
  }
}
