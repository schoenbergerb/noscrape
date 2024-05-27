> This repository will be replaced with a new implementation in the near future:
> to to **https://github.com/noscrape** for more informations

<br />
<br />

[![GitHub release](https://img.shields.io/github/release/schoenbergerb/noscrape?include_prereleases=&sort=semver&color=blue)](https://github.com/schoenbergerb/noscrape/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - noscrape](https://img.shields.io/github/issues/schoenbergerb/noscrape)](https://github.com/schoenbergerb/noscrape/issues)
![Known Vulnerabilities](https://snyk.io/test/github/schoenbergerb/noscrape/badge.svg)


## Concept
The primary mechanism behind `noscrape` is the utilization of any true-type font. From this, `noscrape` generates a new version with shuffled unicodes, ensuring that it's impossible to reverse-calculate them. This means that both strings and integers are obfuscated and can only be deciphered using the generated obfuscation-font. 

While the glyph-paths inside the font cannot be entirely removed, they are obfuscated by randomly shifting them slightly. This makes it challenging to reverse-calculate them, but it's not entirely impossible, especially for machine learning algorithms. The developers are open to suggestions for improving this aspect.

## Use-Cases

In an era where artificial intelligence is becoming increasingly integral to our daily lives, it's important to remember
that AI thrives on data, and your data is a valuable commodity that shouldn't be given away lightly.

1. **Anti-Scraping Measures for Websites**: <br />
   Implement `noscrape` on your website to protect against web scrapers. This can be particularly useful for content
   that is unique to your site, so you wish to prevent it from being copied or used without permission. <br />
   - sport results
   - betting results
   - prices (e-commerce)
   - geo-information
   - ...
   <br /><br />
2. **Protecting Sensitive Data** <br />
    Use `noscrape` to obfuscate sensitive information such as personal identifiers, financial details, or confidential 
    text in a way that is visually accessible but protected against scraping and automated data extraction tools.
    <br /><br />
3. **Reduce Bot interactions**  <br />
    Once your data is protected by `noscrape` it makes no sense to scrape them and one can reduce the number of bot 
    interactions and so to lower costs at the end. 
    <br /><br />
4. **Secure Applications** <br />
   In applications where data security is paramount, such as in banking or healthcare apps, `noscrape` can be used to 
   display information in a secure manner.
   - PIN/TAN numbers
   - Bot protection (captcha)

<br /><br />

### [Example code](https://github.com/schoenbergerb/noscrape-example)

### [Live demo](https://noscrape-example.vercel.app)

<br />

## Installation

To install the `@noscrape/noscrape` package, simply run the following command in your project directory:

```bash
npm install @noscrape/noscrape
```

## Basic Usage

##### Server-side
```typescript jsx
const { Noscrape } = require('@noscrape/noscrape');

// create noscrape instance
const noscrape = new Noscrape('path/to/font.ttf', { options })

// obfuscate data
const number = noscrape.obfuscate(123);
const string = noscrape.obfuscate("noscrape");
const object = noscrape.obfuscate({ title: "noscrape", text: "obfuscation" });

// generate obfuscation font buffer after all obfuscation is done
const font = noscrape.getFont();
```

then provide `font` and `data` to the client/frontend

##### Client-side
```html
<style> 
    @font-face {        
        font-family: 'noscrape-obfuscated';        
        src: url('data:font/truetype;charset=utf-8;base64,${font.toString("base64")}');    
    }
</style>
```
The font is delivered in a buffer format. To utilize it in our web pages, we convert it into a `base64` URL and embed it within a custom `@font-face` declaration. Once this is done, we can display the obfuscated data using the specified `font-family` in our styles.
```typescript jsx
<span style="font-family: noscrape-obfuscated">
    <div>{ object.title }</div>
    <div>{ object.text }</div>
</span>
```

## IMPORTANT NOTE
Bots might not be able to process obfuscated text, which can lead to unpredictable analytics results. Therefore, it's advised not to use this technology on content that's essential for indexed pages. The obfuscation process takes some time (around 50-60ms on standard machines). For API requests, it's recommended to put the obfuscation logic into a scheduled task and reuse the results, rather than recalculating everything for every request.

## Options
- **Strength (obfuscation strength multiplier)**<br />
    Default is 1. Values below 0.1 are not recommended as paths can be easily reverse-calculated. 
    Values over 10 might not look visually appealing.<br />
<img src="./docs/obfuscationstrength.jpg" width="500">
  <br />

  
- **Character Range**<br />
    This defines the [character range](https://www.ling.upenn.edu/courses/Spring_2003/ling538/UnicodeRanges.html) used for encryption. Options include:
  - PRIVATE_USE_AREA (default)
  - LATIN
  - GREEK
  - CYRILLIC
  - HIRAGANA
  - KATAKANA
<br /><br />
  
- **Low Memory**<br />
    This option is for situations with limited memory where `noscrape` cannot load the provided font file. 
    Default is false.

<br />

## Contributions
The developers welcome contributions, issues, and feature requests. 
If you've used this package and fixed a bug, they encourage you to submit a PR.

## License
The package is licensed under the [MIT License](https://github.com/schoenbergerb/noscrape/blob/main/LICENSE) by Bernhard Schönberger.
