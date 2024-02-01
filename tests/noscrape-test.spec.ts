import { test, expect } from "@playwright/test";
import { getComparator, Comparator } from "playwright-core/lib/utils";

/**
 * This test is designed to confirm that the unicodes of the original and obfuscated values differ. The goal is to
 * ensure that, although the visual appearance of the glyphs remains consistent, the underlying unicode values have been
 * successfully altered during the obfuscation process.
 */
test("test original<>obfuscated text is different ", async ({ page }) => {
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

/**
 * This test aims to verify whether the rendered original glyphs and their obfuscated counterparts appear visually
 * identical. The objective is to ensure that while the glyphs undergo obfuscation, their visual representation remains
 * consistent and indistinguishable from the original.
 */
test("test visual equality", async ({ page }) => {
  await page.goto("/");

  const original = await page.locator("table#original").screenshot();
  const obfuscated = await page.locator("table#obfuscated").screenshot();

  const comparator = getComparator("image/png") as Comparator;
  expect(
    comparator(original, obfuscated, { maxDiffPixelRatio: 0.01 }),
  ).toBeNull();
});
