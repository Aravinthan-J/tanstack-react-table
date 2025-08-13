import { test, expect } from "@playwright/test";

test.describe("Table Editing Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/editable");
  });

  test("edits text cell", async ({ page }) => {
    const nameCell = page.locator('td:has-text("John Doe")');
    await nameCell.click();

    const input = page.locator('input[value="John Doe"]');
    await input.clear();
    await input.fill("Jane Doe");
    await input.press("Enter");

    await expect(page.locator('td:has-text("Jane Doe")')).toBeVisible();
  });

  test("edits number cell", async ({ page }) => {
    const ageCell = page.locator('td:has-text("30")');
    await ageCell.click();

    const input = page.locator('input[type="text"][value="30"]');
    await input.clear();
    await input.fill("35");
    await input.press("Enter");

    await expect(page.locator('td:has-text("35")')).toBeVisible();
  });

  test("edits boolean cell", async ({ page }) => {
    const toggleCell = page.locator('[role="button"][aria-pressed]').first();
    await toggleCell.click();

    // Toggle should change state
    await expect(toggleCell).toHaveAttribute("aria-pressed", "true");
  });

  test("cancels edit with Escape key", async ({ page }) => {
    const nameCell = page.locator('td:has-text("John Doe")');
    await nameCell.click();

    const input = page.locator('input[value="John Doe"]');
    await input.clear();
    await input.fill("Changed Name");
    await input.press("Escape");

    // Should revert to original value
    await expect(page.locator('td:has-text("John Doe")')).toBeVisible();
  });
});
