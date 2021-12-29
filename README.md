<img src="./docs/preview.png">


<br />
<br />

this projects goal is to prevent anyone to scrape content from your html output

<br />
<br />

[example-code](https://github.com/schoenbergerb/noscrape-nexample) 

[live demo](https://noscrape-nexample.vercel.app) 

<br />
<br />

## _IMPORTANT NOTE_

Bots are not able to process obfuscated text or it comes to unpredictable analytics results etc. 
<br>
So please beware of using this technology on relevant content for indexed pages!

<br />
<br />
<br />



## Example

```typescript
// server-side obfuscation
const object = { title: "noscrape", text: "obfuscation" }
const { font, value }  = obfuscate(object, 'path/to/your/font.ttf')

```
⬇⬇⬇⬇ provide data ⬇⬇⬇⬇
```javascript
// font will be provided as buffer
const b64 = font.toString(`base64`)
```
```html
<!-- client-side visualization-->


<style> 
    @font-face {        
        font-family: 'noscrape-obfuscated';        
        src: url('data:font/truetype;charset=utf-8;base64,${b64}');    
    }
</style>

...

<span style="font-family: noscrape-obfuscated">
    <div>{ value.title }</div>
    <div>{ value.text }</div>
</span>    
```

<br />
<br />
<br />

# Options

<br />

### **strength**
     * obfuscation strength multiplier ( default: 1 )
     * all under 0.1 makes no sense ( paths can be simply back calculated )
     * all over 10 makes no sense ( looks like 💩 )

<img src="./docs/obfuscationstrength.jpg">

<br />
<br />

### **characterRange**
character range used for encryption


- PRIVATE_USE_AREA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ___DEFAULT___
- LATIN
- GREEK
- CYRILLIC
- HIRAGANA
- KATAKANA

<br />
<br />
<br />

## Contributions

Contributions, issues and feature requests are very welcome. If you are using this package and fixed a bug for yourself, please consider submitting a PR!

<br />
<br />
<br />

## License

[MIT](https://github.com/schoenbergerb/noscrape/blob/main/LICENSE) @ Bernhard Schönberger