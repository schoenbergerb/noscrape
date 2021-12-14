import obfuscate from '../src/obfuscate'

describe("font obfuscation", () => {

  it('should render example', async () => {

    const object = {
      some: "noscrape",
      to: "obfuscated",
      deep: {
        nested: {
          string: ":-)"
        }
      }
    }

    const { font, value } = await obfuscate(object, 'example/example.ttf')

    expect(font).not.toBeNull()
    expect(value).not.toBeNull()
    expect(value.deep.nested.string).not.toBeNull()

    expect(value.some).not.toEqual(object.some)
    expect(value.to).not.toEqual(object.to)

  })

});
