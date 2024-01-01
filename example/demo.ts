import express from 'express';
import {Noscrape} from "../src";

const app = express()

app.get('/', (req, res) => {
    const noscrape = new Noscrape(__dirname + "/example.ttf");

    const test1= noscrape.obfuscate("test1");
    const test2= noscrape.obfuscate(123456789);
    const test3 = noscrape.obfuscate({ data: "aniceobject" });
    const test4 = noscrape.obfuscate( "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|");

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
                <p>${test4}</p>
            </body>
        </html>    
    `)
})


app.listen(1337, () => {
    console.log('listen on port', 1337)
})



