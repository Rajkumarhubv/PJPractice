import { test, expect } from '@playwright/test';

const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const username = 'Admin';
const password = 'admin123';

async function login(page) {
  await page.goto(URL);
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
}

test('1. Verify login page loads', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveURL(/login/);
});

test('2. Verify username field is visible', async ({ page }) => {
  await page.goto(URL);
  await expect(page.locator('input[name="username"]')).toBeVisible();
});

test('3. Verify password field is visible', async ({ page }) => {
  await page.goto(URL);
  await expect(page.locator('input[name="password"]')).toBeVisible();
});

test('4. Verify login button is visible', async ({ page }) => {
  await page.goto(URL);
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('5. Successful login', async ({ page }) => {
  await login(page);
  await expect(page.locator('h6')).toHaveText('Dashboard');
});

test('6. Invalid username login', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="username"]', 'WrongUser');
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
});

test('7. Invalid password login', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', 'wrongpass');
  await page.click('button[type="submit"]');

  await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
});

test('8. Empty login submission', async ({ page }) => {
  await page.goto(URL);
  await page.click('button[type="submit"]');

  await expect(page.locator('text=Required').nth(1)).toBeVisible();
});

test('9. Verify error message for invalid login', async ({ page }) => {
  await page.goto(URL);
  await page.fill('input[name="username"]', 'wrong');
  await page.fill('input[name="password"]', 'wrong');
  await page.click('button[type="submit"]');

  await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid');
});

test('10. Verify dashboard after login', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/dashboard/);
});

test('11. Verify user profile dropdown visible after login', async ({ page }) => {
  await login(page);
  await expect(page.locator('.oxd-userdropdown-tab')).toBeVisible();
});

test('12. Logout functionality', async ({ page }) => {
  await login(page);

  await page.locator('.oxd-userdropdown-tab').click();
  await page.locator('text=Logout').click();

  await expect(page).toHaveURL(/login/);
});

test('13. Verify URL does not allow dashboard without login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await expect(page).toHaveURL(/login/);
});

test('14. Verify input fields accept typing', async ({ page }) => {
  await page.goto(URL);

  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);

  await expect(page.locator('input[name="username"]')).toHaveValue(username);
  await expect(page.locator('input[name="password"]')).toHaveValue(password);
});

test('15. Verify login button click redirects properly', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/dashboard/);
});