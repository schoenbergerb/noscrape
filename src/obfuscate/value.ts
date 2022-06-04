import { obfuscateNumber } from "./number";
import { obfuscateObject } from "./object";
import { obfuscateString } from "./string";

export function obfuscateValue<T extends string | number | object>(
  value: T,
  translation: Map<number, number>
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
