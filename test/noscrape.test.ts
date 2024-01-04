import { EncryptionCharacterRange, Noscrape } from '../src'

const demoObject = {
  a: "abcdefghijklmnopqrstuvwxyz",
  b: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  c: "s",
  d: "0123456789",
  e: ",.-;:_<>!\"§$%&/()=´`*+'#¯·˜\^ﬁ£#””¬"
}


describe("font obfuscation", () => {

  let noscrape: Noscrape;
  beforeEach(() => {
    noscrape = new Noscrape('example/example.ttf')
  })

  it("should obfuscate simple number", async () => {
    const number = 1234567890

    const value = noscrape.obfuscate(1234567890)
    
    expect(`${value}`).not.toBeNull()
    expect(`${value}`).not.toBe(number)
  })
  
  it("should obfuscate simple string", async () => {
    const simpleString = "noscrape"
  
    const value = noscrape.obfuscate(simpleString)
  
    expect(value).not.toBeNull()
    expect(value).not.toBe(simpleString)

  })

  it('should obfuscate object', async () => {
    const object = {
      string: "noscrape",
      integer: 1234567890,
      deep: {
        nested: demoObject
      }
    }

    const value = noscrape.obfuscate(object);
    const font = noscrape.getFont();

    expect(font).not.toBeNull()
    expect(value).not.toBeNull()
    expect(value.deep.nested.a).not.toBeNull()

    expect(value.string).not.toEqual(object.string)
    expect(value.integer).not.toEqual(object.integer)

  })

  it("should render all unicode ranges", async () => {
    for (const val in EncryptionCharacterRange) {

      const characterRange = Number(val)

      if (isNaN(characterRange)) {
        continue
      }
      const noscrape = new Noscrape('example/example.ttf', { characterRange })

      const value = noscrape.obfuscate(demoObject);

      expect(value.a).toHaveLength(26)
      expect(value.b).toHaveLength(26)
    }
  })

  it ("should match font size", async () => {
    noscrape.obfuscate(0)
    const font = noscrape.getFont()
    expect(font.byteLength).toBe(1884)
  })

  it ("should run on low memory", async () => {
    const noscrape =  new Noscrape('example/example.ttf', { lowMemory: true })
    noscrape.obfuscate(0);
    const font = noscrape.getFont();
    expect(font.byteLength).toBe(1884)
  })


  it ("should run on low memory", async () => {
    const noscrape = new Noscrape('example/example.ttf')
    noscrape.obfuscate("test123");
    noscrape.obfuscate(1234567890)
    noscrape.obfuscate({ nested: "data" })
    noscrape.getFont();
    expect((noscrape as any).glyphs.length).toBe(16);
    expect(((noscrape as any).translation as Map<number, number>).size).toBe(15);
  })
});
