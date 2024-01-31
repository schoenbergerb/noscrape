import express from 'express';
import {EncryptionCharacterRange, Noscrape} from "../src";

const app = express()

app.get('/example.ttf', (_, res) => {
    res.sendFile(__dirname + '/example.ttf')
})

app.get('/', (req, res) => {
    const noscrape = new Noscrape(__dirname + "/example.ttf", {
        characterRange: EncryptionCharacterRange.PRIVATE_USE_AREA,
        strength: 0.00000000000001
    });

    const test1 = noscrape.obfuscate("ftest1");
    const test2 = noscrape.obfuscate(123456789);
    const test3 = noscrape.obfuscate({data: "a-nice-object"});
    const test4 = noscrape.obfuscate("abcdefghijklmnopqrstuvwxyz");
    const test5 = noscrape.obfuscate("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const test6 = noscrape.obfuscate("!\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|");

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
        <body class="">
        
        <div style="width: 270px; height: 150px; overflow: hidden;">
            <table id="original">
                <tr>
                    <td style="font-family: 'original-font'">ftest1</td>
                </tr>
                <tr>
                    <td style="font-family: 'original-font'">123456789</td>
                </tr>
                <tr>
                    <td style="font-family: 'original-font'">a-nice-object</td>
                </tr>
                <tr>
                    <td style="font-family: 'original-font'">
                        abcdefghijklmnopqrstuvwxyz
                    </td>
                </tr>
                <tr>
                    <td style="font-family: 'original-font'">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    </td>
                </tr>
                <tr>
                    <td style="font-family: 'original-font'">
                        !\"§$%&/()=¹²³¼½¬{[]},.-;:_·…–<>|
                    </td>
                </tr>
            </table>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <div style="width: 270px; height: 150px; overflow: hidden;">
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
                <tr>
                    <td style="font-family: 'noscrape-obfuscated'">${test5}</td>
                </tr>
                <tr>
                    <td style="font-family: 'noscrape-obfuscated'">${test6}</td>
                </tr>
            </table>
        </div>
        </body>
        </html>
    `)
})


app.listen(1337, () => {
    console.log('listen on port', 1337)
})



