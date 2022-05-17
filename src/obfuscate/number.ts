import { obfuscateString } from "./string";

export function obfuscateNumber(n: number, translation) {
  return obfuscateString(`${n}`, translation);
}
