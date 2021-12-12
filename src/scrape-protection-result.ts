export default interface ScrapeProtectionResult {
  fontName: string;

  font: Buffer;

  key: { [key: string]: string };
}
