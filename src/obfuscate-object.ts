import _ from "lodash";
import obfuscateString from "./obfuscate-string";

export default function obfuscateObject<T>(
  value: T,
  translation: Map<number, number>
): T {
  const obj = _.clone(value);

  Object.keys(obj).map((key) => {
    switch (typeof obj[key]) {
      case "string":
        obj[key] = obfuscateString(obj[key], translation);
        break;
      case "object":
        obj[key] = obfuscateObject(obj[key], translation);
        break;
      default:
        break;
    }
  });

  return obj;
}
