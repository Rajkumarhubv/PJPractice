import { test, expect } from '@playwright/test';

test('OrangeHRM Login Test', async ({ page }) => {

  // Navigate to login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  

  // Enter username
  await page.locator('input[name="username"]').fill('Admin');

  // Enter password
  await page.locator('input[name="password"]').fill('admin123');

  // Click login button
  await page.locator('button[type="submit"]').click();

  // Verify dashboard is visible
  await expect(page.locator('h6')).toHaveText('Dashboard');

});