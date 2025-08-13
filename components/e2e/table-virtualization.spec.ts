import { test, expect } from "@playwright/test";

test.describe("Table Virtualization", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/virtualized");
  });

  test("loads large dataset", async ({ page }) => {
    // Wait for data to load
    await expect(page.locator("tbody tr")).toHaveCountGreaterThan(10);
  });

  test("handles virtual scrolling", async ({ page }) => {
    const tableContainer = page.locator(".table-scroll-container");

    // Scroll to bottom
    await tableContainer.evaluate((el) => el.scrollTo(0, el.scrollHeight));

    // Should load more data
    await expect(page.locator('td:has-text("Loading...")')).toBeVisible();
  });

  test("maintains performance with large datasets", async ({ page }) => {
    // Measure performance
    const startTime = Date.now();

    // Scroll multiple times
    const tableContainer = page.locator(".table-scroll-container");
    for (let i = 0; i < 10; i++) {
      await tableContainer.evaluate((el) =>
        el.scrollTo(0, Math.random() * el.scrollHeight),
      );
      await page.waitForTimeout(100);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should complete scrolling operations within reasonable time
    expect(duration).toBeLessThan(5000);
  });
});
