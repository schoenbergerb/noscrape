import translate from "../src/translate";

describe("font obfuscation", () => {

  it('should render example', async () => {

    const object = {
      some: "string",
      to: "obfuscate"
    }

    const original = { ...object }

    const style = await translate(object, 'example/example.ttf')

    expect(style).toContain('noscrape-obfuscated')

    expect(object).not.toBeNull()
    expect(object.some).not.toBeNull()
    expect(object.to).not.toBeNull()

    expect(object.some).not.toEqual(original.some)
    expect(object.to).not.toEqual(original.to)

  })

});
