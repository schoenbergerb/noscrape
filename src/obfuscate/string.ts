export function obfuscateString(str: string, translation) {
  const codes: number[] = str.split("").map((c) => {
    const code = c.charCodeAt(0);
    return translation.get(code) ?? 0;
  });
  return String.fromCharCode(...codes);
}
