
import _ from 'lodash'
import { load, Glyph, Font } from "opentype.js";

// glyph names starting from e001 (hex)
const GLYPHINDEXSTART = 57345

interface ObfuscationResult {

}

/**
 * @param value object which will be translated
 * @param fontFilePath 
 * @returns font-family string
 */
export default async function translate<T>(value: T, fontFilePath: string): Promise<string> {

    const charArray = Object.values(value).filter(s => typeof s === 'string').map(s => s.split(''))

    const uniqChars = _.union(...charArray) 

    const font = await load(fontFilePath, null, {})
    
    const oldGlyphs = font.stringToGlyphs(_.shuffle(uniqChars).join(''))

    const translation = new Map<number, number>()

    const glyphs = oldGlyphs.map((glyph, index) => {
        const unicode = index + GLYPHINDEXSTART

        translation.set(glyph.unicode, unicode)

        return new Glyph({
            index,
            name: Number(unicode).toString(16),
            unicode,
            path: glyph.path,
            advanceWidth: glyph.advanceWidth,
        })
    })

    const newFont = new Font({
        familyName: "noscrape",
        styleName: "obfuscated",
        unitsPerEm: font.unitsPerEm,
        ascender: font.ascender,
        descender: font.descender,
        glyphs,
    });

    // provide original font informations if availible
    if (font.names) {
        newFont.names = font.names
    }

    // translate given object
    // TODO: translate recursively
    Object.keys(value).map(key => {
        const val = value[key]
        if (typeof val === 'string') {
            const codes: number[] = value[key].split('').map(c => {
                const code = c.charCodeAt(0)
                return translation.get(code) ?? 0
            })
            value[key] = String.fromCharCode(...codes)
        }
    })
    
    const arraybuffer = newFont.toArrayBuffer();

    const b64 = Buffer.from(arraybuffer).toString('base64')

    return `@font-face {
        font-family: 'noscrape-obfuscated';
        src: url('data:font/truetype;charset=utf-8;base64,${b64}');
    }`
}