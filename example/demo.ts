import express from 'express';
import {Noscrape} from "../src";
import * as fs from "fs";

const app = express()

app.get('/example.ttf', (_, res) => {
    res.sendFile(__dirname + '/example.ttf')
})

app.get('/', (req, res) => {
    const noscrape = new Noscrape(__dirname + "/example.ttf");


    const test1 = noscrape.obfuscate("test1");
    const test2 = noscrape.obfuscate(123456789);
    const test3 = noscrape.obfuscate({data: "a-nice-object"});
    const test4 = noscrape.obfuscate("abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|");

    // language=HTML
    res.send(`
        <html lang="en">
        <head>
            <title>Noscrape - DEMO</title>
            <style>
                @font-face {
                    font-family: 'original-font';
                    src: url('/example.ttf');
                }

                @font-face {
                    font-family: 'noscrape-obfuscated';
                    src: url('data:font/truetype;charset=utf-8;base64,${noscrape.getFont().toString('base64')}');
                }
            </style>
        </head>
        <body>
        <table id="original">
            <tr>
                <td style="font-family: 'original-font'">test1</td>
            </tr>
            <tr>
                <td style="font-family: 'original-font'">123456789</td>
            </tr>
            <tr>
                <td style="font-family: 'original-font'">a-nice-object</td>
            </tr>
            <tr>
                <td style="font-family: 'original-font'">
                    abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|
                </td>
            </tr>
        </table>
        <table id="obfuscated">
            <tr>
                <td style="font-family: 'noscrape-obfuscated'">${test1}</td>
            </tr>
            <tr>
                <td style="font-family: 'noscrape-obfuscated'">${test2}</td>
            </tr>
            <tr>
                <td style="font-family: 'noscrape-obfuscated'">${test3.data}</td>
            </tr>
            <tr>
                <td style="font-family: 'noscrape-obfuscated'">${test4}</td>
            </tr>
        </table>
        </body>
        </html>
    `)
})


app.listen(1337, () => {
    console.log('listen on port', 1337)
})



