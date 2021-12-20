import { EncryptionCharakterRange } from '../src/encryption-character-range.enum';
import obfuscate from '../src/obfuscate'

const demoObject = {
  a: "abcdefghijklmnopqrstuvwxyz",
  b: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  c: "s",
  d: "0123456789",
  e: ",.-;:_<>!\"§$%&/()=´`*+'#¯·˜\^ﬁ£#””¬"
}


describe("font obfuscation", () => {

  it('should render example', async () => {

    const object = {
      some: "noscrape",
      to: "obfuscated",
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

    expect(value.some).not.toEqual(object.some)
    expect(value.to).not.toEqual(object.to)

  })


  it("should render all unicode ranges", async () => {

    const ranges = Object.keys(EncryptionCharakterRange)

    for (const val in EncryptionCharakterRange) {

      const characterRange = Number(val)

      if (isNaN(characterRange)) {
        continue
      }

      const { font, value } = await obfuscate(demoObject, 'example/example.ttf', {
        characterRange
      })

      expect(value.a).toHaveLength(26)
      expect(value.b).toHaveLength(26)

    }
  })
});
