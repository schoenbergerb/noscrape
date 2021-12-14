
import { Glyph } from "opentype.js";
import { ObfuscationOptions } from "./obfuscation-options";

// glyph names starting from e001 (hex)
const GLYPHINDEXSTART = 57345

export default function obfuscateGlyphs(originalGlyphs: Glyph[], options?: ObfuscationOptions) {
    
    const translation = new Map<number, number>()

    const glyphs = originalGlyphs.map((glyph, index) => {
        const unicode = index + GLYPHINDEXSTART

        translation.set(glyph.unicode, unicode)

        const commands = glyph.path.commands.map(cmd => {

            if (!cmd.x || !cmd.y) {
                return cmd
            }

            return {
                ...cmd,
                x: cmd.x + Math.random() * (options?.strength ?? 1),
                y: cmd.y + Math.random() * (options?.strength ?? 1),
            }            
        })

        return new Glyph({
            index,
            name: Number(unicode).toString(16),
            unicode,
            path: {
                ...glyph.path,
                commands
            },
            advanceWidth: glyph.advanceWidth,
        })
    })

    return { translation, glyphs }
}