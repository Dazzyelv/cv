import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.home' }); 

test('home page 1a.lv', async ({ page }) => {
  await page.goto(process.env.BASE_URL!); 
  await page.waitForLoadState('networkidle');

  // wait logo
  await expect(page.locator('a.main-logo img[alt="1a.lv - interneta veikals"]')).toBeVisible();

  // check title
  await expect(page).toHaveTitle("Lielākais interneta veikals Latvijā | 1a.lv");
});