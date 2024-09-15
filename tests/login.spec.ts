// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Login } from '../code/login';

dotenv.config({ path: '.env.home' }); 

test('login 1a.lv', async ({ page }) => {

  const homePage = new Login(page);

  await page.goto(process.env.BASE_URL!); 
  
  await page.waitForLoadState('networkidle');
  
  // login
  await homePage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

 // expect is login is correct
 await expect(homePage.userName).toContainText('maris'); 
});