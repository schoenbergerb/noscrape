import { obfuscate } from '../src';
import { EncryptionCharacterRange } from '../src';
import express from 'express';
import {Noscrape} from "../src/noscrape";

const app = express()

app.get('/', (req, res) => {
    const noscrape = new Noscrape(__dirname + "/example.ttf");

    const test3 = noscrape.obfuscate({ data: "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|"});
    const test1= noscrape.obfuscate("test1");
    const test2= noscrape.obfuscate(123456789);

    // language=HTML
    res.send(`
        <html lang="en">
            <head>
                <title>Noscrape - DEMO</title>   
                <style>
                    @font-face {        
                        font-family: 'noscrape-obfuscated';        
                        src: url('data:font/truetype;charset=utf-8;base64,${noscrape.getFont().toString('base64')}');    
                    }
                </style>   
            </head>
            <body style="font-family: 'noscrape-obfuscated'">
                <p>${test1}</p>
                <p>${test2}</p>
                <p>${test3.data}</p>
            </body>
        </html>    
    `)
})


app.listen(1337, () => {
    console.log('listen on port', 1337)
})



