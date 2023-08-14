import { test as setup, expect,  } from '@playwright/test';

const authFile = 'playwright/.auth/gmail-auth.json';

setup('authenticate', async ({ page }) => {
  // Perform Gmail authentication steps here.
  await page.goto('https://mail.google.com/');
  await page.fill('[type="email"]', 'So.Yummy.BestRecipes@gmail.com');
  await page.getByRole('button', { name: 'next' }).click();
  await page.fill('[type="password"]', 'BestRecipes');
  await page.click('[type="submit"]');
  // Optionally, you can perform checks to ensure authentication was successful.
  // For example, wait for a specific element that is visible after authentication.
  await expect(page.locator('.your-selector')).toBeVisible();

  // Save authentication state.
  await page.context().storageState({ path: authFile });
});