import obfuscation from "./index";

jest.setTimeout(20000);

describe("font obfuscation", () => {
  it("should generate translation", async () => {
    const result = await obfuscation({
      fontFile: "examples/example.ttf",
      numKeys: 1,
      keysOutFolder: "out/keys",
      fontsFolder: "out/fonts",
    });

    expect(result[0].fontName).toHaveLength(7);
  });
});
