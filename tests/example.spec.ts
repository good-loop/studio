import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('DataStore', async ({ page }) => {
	await page.goto('http://127.0.0.1:3000/datastore-test/DataStore.test.html');
    
	// Expects page to have an OK
	await expect(page.getByText("pass").first()).toBeVisible();

	// TODO check for a fail
  });
  