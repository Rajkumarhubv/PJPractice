import { test, expect } from '@playwright/test';

test('OpenCart Homepage Navigation Test', async ({ page }) => {

  // Navigate to OpenCart
  await page.goto('https://demo.opencart.com/');

  // Verify page title
  await expect(page).toHaveTitle(/Your Store/);

  // Click on "Desktops"
  await page.locator('text=Desktops').click();

  // Click on "Mac"
  await page.locator('text=Mac').click();

  // Verify URL contains 'mac'
  await expect(page).toHaveURL(/.*mac/);

});