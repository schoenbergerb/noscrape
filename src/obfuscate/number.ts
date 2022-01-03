import obfuscateString from "./string";

export default function obfuscateNumber(n: number, translation) {
  return obfuscateString(`${n}`, translation);
}
