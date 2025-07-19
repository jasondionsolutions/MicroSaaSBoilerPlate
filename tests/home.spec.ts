// tests/home.spec.ts
import { test, expect } from "@playwright/test";

test("homepage renders correctly", async ({ page }) => {
  await page.goto("/");

  // Check that the main heading is present
  await expect(
    page.getByText("Modular Architecture Ready", { exact: false })
  ).toBeVisible();

  // Check that the server action form is present
  await expect(
    page.getByText("Modular Server Action Example", { exact: false })
  ).toBeVisible();

  // Check that the visitor form input exists
  await expect(page.getByPlaceholder("Enter your name")).toBeVisible();
});
