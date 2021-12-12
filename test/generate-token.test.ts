import generateToken from "../src/generate-token";

describe("generate token", () => {
  it("should have given length", () => {
    const token = generateToken(5);
    expect(token).toHaveLength(5);
  });

  it("should should not be equal", () => {
    const token1 = generateToken(5);
    const token2 = generateToken(5);

    expect(token1).toHaveLength(5);
    expect(token2).toHaveLength(5);

    expect(token1).not.toEqual(token2);
  });
});
