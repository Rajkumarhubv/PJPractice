import { test, expect } from '@playwright/test';

test('OrangeHRM Logout Test', async ({ page }) => {

  // Login first of all into the page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // Verify login success
  await expect(page.locator('h6')).toHaveText('Dashboard');

  // Click profile icon
  await page.locator('.oxd-userdropdown-tab').click();

  // Click logout
  await page.locator('text=Logout').click();

  // Verify back to login page
  await expect(page).toHaveURL(/login/);

});