import { load, Glyph, Font } from "opentype.js";

import shuffle from "./shuffle";
import generateToken from "./generate-token";
import ScrapeProtectionResult from "./scrape-protection-result";
import ScrapeProtectionOptions from "./scrape-protection-options";

export default async function ({
  fontFile,
  glyphSpectrum,
  numKeys,
}: ScrapeProtectionOptions): Promise<ScrapeProtectionResult[]> {
  const loops = [...Array(numKeys)].map(async (_) => {
    return new Promise<ScrapeProtectionResult>((resolve, reject) => {
      load(fontFile, null, {})
        .then((font) => {
          const keys = shuffle([...Array(glyphSpectrum ?? 500).keys()]);

          const translation = {};

          const glyphs = keys.map((key, i) => {
            const glyph = font.glyphs.glyphs[i];

            const index = glyph.index;

            const unicodeOld = glyph.unicode;
            const unicodeNew = key;

            translation[unicodeOld] = unicodeNew;

            return new Glyph({
              index,
              name: "e" + key,
              unicode: unicodeNew,
              path: glyph.path,
              advanceWidth: glyph.advanceWidth,
            });
          });

          const newFont = new Font({
            familyName: "scrape-protect",
            styleName: "obfuscate",
            unitsPerEm: font.unitsPerEm,
            ascender: font.ascender,
            descender: font.descender,
            glyphs,
          });

          const fontName = generateToken(7);

          const arraybuffer = newFont.toArrayBuffer();

          resolve({
            fontName,
            font: Buffer.from(arraybuffer),
            key: translation,
          });
        })
        .catch(reject);
    });
  });

  return await Promise.all(loops);
}
