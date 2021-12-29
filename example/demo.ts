import obfuscate from '../src'
import { EncryptionCharacterRange } from '../src/encryption-character-range.enum'
import fs from 'fs'

obfuscate(
    { data: "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!§$%&/()=?¬”#£ﬁ^``-,.-M:;_,,;#+#+äöü"}, 
    __dirname + "/example.ttf",
    { characterRange: EncryptionCharacterRange.KATAKANA }
).then(({value, font}) => {
    fs.writeFileSync('./example.html', `
        <html>
            <head>
                <style>
                    @font-face {        
                        font-family: 'noscrape-obfuscated';        
                        src: url('data:font/truetype;charset=utf-8;base64,${font.toString('base64')}');    
                    }
                </style>      
            </head>
            <body style="font-family: 'noscrape-obfuscated'">
                ${value.data}
            </body>
        </html>    
    `)
})