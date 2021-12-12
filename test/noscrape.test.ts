import obfuscation from "../src/index";

jest.setTimeout(20000);

describe("font obfuscation", () => {
  it("should generate translation", async () => {
    const result = await obfuscation({
      fontFile: "examples/example.ttf",
      numKeys: 1,
    });

    const res = result[0]

    expect(res.key).not.toBeNull();
    expect(res.font).not.toBeNull();
    expect(res.fontName).toHaveLength(7);

  });
});
