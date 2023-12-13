import {obfuscate, EncryptionCharacterRange, Noscrape} from '../src'

const demoObject = {
  a: "abcdefghijklmnopqrstuvwxyz",
  b: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  c: "s",
  d: "0123456789",
  e: ",.-;:_<>!\"§$%&/()=´`*+'#¯·˜\^ﬁ£#””¬"
}


describe("font obfuscation", () => {


  it("should obfuscate simple number", async () => {

    const number = 1234567890
  
    const { value } = await obfuscate(number, 'example/example.ttf')
    
    expect(`${value}`).not.toBeNull()
    expect(`${value}`).not.toBe(number)
  })
  
  it("should obfuscate simple string", async () => {
  
    const simpleString = "noscrape"
  
    const { value } = await obfuscate(simpleString, 'example/example.ttf')
  
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

    const { font, value } = await obfuscate(object, 'example/example.ttf', {
      strength: 5
    })

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

      const { value } = await obfuscate<any>(demoObject, 'example/example.ttf', {
        characterRange
      })

      expect(value.a).toHaveLength(26)
      expect(value.b).toHaveLength(26)

    }
  })

  it ("should match font size", async () => {
    const { font } = await obfuscate(0, 'example/example.ttf')
    expect(font.byteLength).toBe(1884)
  })

  it ("should run on low memory", async () => {
    const { font } = await obfuscate(0, 'example/example.ttf', { lowMemory: true })
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
