import { obfuscateString } from "./string";

export function obfuscateNumber(n: number, translation): string {
  return obfuscateString(`${n}`, translation);
}
