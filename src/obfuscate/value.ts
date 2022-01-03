import _ from "lodash";
import obfuscateNumber from "./number";
import obfuscateObject from "./object";
import obfuscateString from "./string";

export default function obfuscateValue<T>(
  value: T | string | number,
  translation: Map<number, number>
): T | string | number {
  switch (typeof value) {
    case "number":
      return obfuscateNumber(value, translation);
    case "string":
      return obfuscateString(value, translation);
    case "object":
      return obfuscateObject(value, translation);
    default:
      throw new Error(typeof value + " could not be obfuscated");
  }
}
