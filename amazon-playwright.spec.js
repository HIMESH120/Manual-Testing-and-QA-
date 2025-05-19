const { test, expect } = require('@playwright/test');

test('Amazon Product Flow', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByPlaceholder('Search Amazon.in').fill('laptop');
  await page.getByPlaceholder('Search Amazon.in').press('Enter');

  // Wait for search results and click first product
  await page.waitForSelector('.s-title-instructions-style');
  const firstProduct = page.locator('.s-title-instructions-style h2 a').first();
  await firstProduct.click();

  // Assert product title
  await expect(page.locator('#productTitle')).toBeVisible();

  // Assert Add to Cart button
  await expect(page.locator('#add-to-cart-button')).toBeVisible();
});
