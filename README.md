
<img src="./docs/preview.png">
<br />
<br />

[![GitHub release](https://img.shields.io/github/release/schoenbergerb/noscrape?include_prereleases=&sort=semver&color=blue)](https://github.com/schoenbergerb/noscrape/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - noscrape](https://img.shields.io/github/issues/schoenbergerb/noscrape)](https://github.com/schoenbergerb/noscrape/issues)
![Known Vulnerabilities](https://snyk.io/test/github/schoenbergerb/noscrape/badge.svg)



# @noscrape/noscrape 

## Concept
The primary mechanism behind `noscrape` is the utilization of any true-type font. From this, `noscrape` generates a new version with shuffled unicodes, ensuring that it's impossible to reverse-calculate them. This means that both strings and integers are obfuscated and can only be deciphered using the generated obfuscation-font. 

While the glyph-paths inside the font cannot be entirely removed, they are obfuscated by randomly shifting them slightly. This makes it challenging to reverse-calculate them, but it's not entirely impossible, especially for machine learning algorithms. The developers are open to suggestions for improving this aspect.


## Installation

To install the `@noscrape/noscrape` package, simply run the following command in your project directory:

```bash
npm install @noscrape/noscrape
```

## Basic Usage

##### Server-side
```typescript
const { obfuscate } = require('@noscrape/noscrape');

// Sample object to obfuscate
const object = { title: "noscrape", text: "obfuscation" };

// Server-side obfuscation
const { font, value } = obfuscate(object, 'path/to/your/font.ttf');
```

##### Client-side
```typescript
<style> 
    @font-face {        
        font-family: 'noscrape-obfuscated';        
        src: url('data:font/truetype;charset=utf-8;base64,${font.toString("base64")}');    
    }
</style>
```
The font is delivered in a buffer format. To utilize it in our web pages, we convert it into a `base64` URL and embed it within a custom `@font-face` declaration. Once this is done, we can display the obfuscated data using the specified `font-family` in our styles.
```typescript
<span style="font-family: noscrape-obfuscated">
    <div>{ value.title }</div>
    <div>{ value.text }</div>
</span>
```

#### [example-code](https://github.com/schoenbergerb/noscrape-example) 

#### [live demo](https://noscrape-example.vercel.app) 

## IMPORTANT NOTE
Bots might not be able to process obfuscated text, which can lead to unpredictable analytics results. Therefore, it's advised not to use this technology on content that's essential for indexed pages. The obfuscation process takes some time (around 50-60ms on standard machines). For API requests, it's recommended to put the obfuscation logic into a scheduled task and reuse the results, rather than recalculating everything for every request.

## Options
- **Strength (obfuscation strength multiplier)**: Default is 1. Values below 0.1 are not recommended as paths can be easily reverse-calculated. Values over 10 might not look visually appealing.
<img src="./docs/obfuscationstrength.jpg" width="500">
<br />

  
- **Character Range**: This defines the [character range](https://www.ling.upenn.edu/courses/Spring_2003/ling538/UnicodeRanges.html) used for encryption. Options include:
  - PRIVATE_USE_AREA (default)
  - LATIN
  - GREEK
  - CYRILLIC
  - HIRAGANA
  - KATAKANA
<br />
  
- **Low Memory**: This option is for situations with limited memory where `noscrape` cannot load the provided font file. Default is false.

<br />

## Contributions
The developers welcome contributions, issues, and feature requests. If you've used this package and fixed a bug, they encourage you to submit a PR.

## License
The package is licensed under the [MIT License](https://github.com/schoenbergerb/noscrape/blob/main/LICENSE) by Bernhard Schönberger.
