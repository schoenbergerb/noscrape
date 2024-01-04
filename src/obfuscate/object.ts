import { cloneDeep } from "lodash";
import { obfuscateNumber } from "./number";
import { obfuscateString } from "./string";

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
