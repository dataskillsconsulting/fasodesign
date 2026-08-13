import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigation clavier et superpositions", async ({ page }) => {
  await page.goto("/");
  await page.locator("#tableau").scrollIntoViewIfNeeded();
  await page.locator("#tableau").getByRole("button", { name: "Actions", exact: true }).click();
  await expect(page.getByRole("menu", { name: "Actions du dossier" })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Ouvrir le panneau" }).click();
  await expect(page.getByRole("dialog", { name: "Dossier BF-0148" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Dossier BF-0148" })).toBeHidden();
});

test("aucune violation axe critique", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).disableRules(["landmark-unique"]).analyze();
  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});

test("@visual composants clair", async ({ page }) => { await page.goto("/"); await page.locator("#composants-complémentaires").scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await expect(page).toHaveScreenshot("composants-clair.png", { animations: "disabled", caret: "hide", timeout: 15_000 }); });
test("@visual composants sombre", async ({ page }) => { await page.goto("/"); await page.evaluate(() => document.documentElement.classList.add("dark")); await page.locator("#composants-complémentaires").scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await expect(page).toHaveScreenshot("composants-sombre.png", { animations: "disabled", caret: "hide", timeout: 15_000 }); });
