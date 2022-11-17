import { obfuscate } from '../src';
import { EncryptionCharacterRange } from '../src/encryption-character-range.enum';
import fs from 'fs';
import express from 'express';

const app = express()

app.get('/', (req, res) => {
    obfuscate(
        { data: "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|"}, 
        __dirname + "/example.ttf",
        { characterRange: EncryptionCharacterRange.PRIVATE_USE_AREA }
    ).then(({value, font}) => {
        res.send(`
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
})


app.listen(3333, () => {
    console.log('listen on port', 3333)
})



