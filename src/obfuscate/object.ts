import { cloneDeep } from "lodash";
import { obfuscateNumber } from "./number";
import { obfuscateString } from "./string";

/**
 * Obfuscates an object by recursively obfuscating each of its properties.
 * The function handles numbers, strings, and nested objects.
 *
 * @param {T extends string | number | object} value - The object to be obfuscated.
 * @param {Map<number, number>} translation - The translation map used for obfuscation.
 * @returns {T extends string | number | object} - The obfuscated object, maintaining the same structure as the input.
 */
export function obfuscateObject<T extends object>(
  value: T,
  translation: Map<number, number>,
): T {
  const obj = cloneDeep(value);

  Object.keys(obj).forEach((key) => {
    switch (typeof obj[key]) {
      case "number":
        obj[key] = obfuscateNumber(value[key], translation);
        break;
      case "string":
        obj[key] = obfuscateString(value[key], translation);
        break;
      case "object":
        obj[key] = obfuscateObject(value[key], translation);
        break;
      default:
        break;
    }
  });

  return obj;
}
