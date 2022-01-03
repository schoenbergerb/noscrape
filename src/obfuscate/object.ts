import _ from "lodash";
import obfuscateNumber from "./number";
import obfuscateString from "./string";

export default function obfuscateObject<T>(
  value: T,
  translation: Map<number, number>
): T {
  const obj = _.clone(value);

  Object.keys(obj).map((key) => {
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
