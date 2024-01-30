import { test, expect } from "@playwright/test";

test("test original<>obfuscated text-content different ", async ({ page }) => {
  await page.goto("/");

  const count = await page.locator("table#original tr").count();
  for (let i = 0; i < count; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const original = await page
      .locator("table#original tr")
      .nth(i)
      .locator("td")
      .first()
      .textContent();

    // eslint-disable-next-line no-await-in-loop
    const obfuscated = await page
      .locator("table#obfuscated tr")
      .nth(i)
      .locator("td")
      .first()
      .textContent();

    expect(original).not.toBe(obfuscated);
  }
});

test("test original<>obfuscated visual equal", async ({ page }) => {
  await page.goto("/");

  const original = await page
    .locator("table#original")
    .screenshot({ path: "visual-compare.png" });
  const obfuscated = await page
    .locator("table#obfuscated")
    .screenshot({ path: "visual-compare.png" });

  expect(original).toMatchSnapshot({ maxDiffPixels: 5 });
  expect(obfuscated).toMatchSnapshot({ maxDiffPixels: 5 });
});
