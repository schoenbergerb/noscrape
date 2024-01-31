import { test, expect } from "@playwright/test";
import { getComparator, Comparator } from "playwright-core/lib/utils";

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

  const original = await page.locator("table#original").screenshot();
  const obfuscated = await page.locator("table#obfuscated").screenshot();

  const comparator = getComparator("image/png") as Comparator;
  expect(
    comparator(original, obfuscated, { maxDiffPixelRatio: 0.01 }),
  ).toBeNull();
});
