import { test, expect } from "@playwright/test";

test.describe("Basic Table Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/basic");
  });

  test("renders table with correct headers", async ({ page }) => {
    await expect(page.locator("th")).toContainText([
      "#",
      "Name",
      "Email",
      "Age",
    ]);
  });

  test("displays data rows", async ({ page }) => {
    await expect(page.locator("tbody tr")).toHaveCount(3);
    await expect(page.locator("td")).toContainText([
      "John Doe",
      "Jane Smith",
      "Bob Johnson",
    ]);
  });

  test("handles row selection", async ({ page }) => {
    const firstRowCheckbox = page.locator(
      'tbody tr:first-child input[type="checkbox"]',
    );
    await firstRowCheckbox.click();

    await expect(firstRowCheckbox).toBeChecked();
  });

  test("handles column sorting", async ({ page }) => {
    const nameHeader = page.locator('th:has-text("Name")');
    await nameHeader.click();

    // Check if sort indicator appears
    await expect(nameHeader).toContainText(["↑", "↓"]);
  });
});
