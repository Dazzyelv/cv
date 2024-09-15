// tests/search.spec.ts
import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { basket } from '../code/basket';
import { Login } from '../code/login';


dotenv.config({ path: '.env.home' }); 

test('search item', async ({ page }) => {

    const homePage = new Login(page);
    const searchPage = new basket(page);
    const basketPage = new basket(page);
    
    console.log('eneer home page ...');
    await page.goto(process.env.BASE_URL!);
    console.log('waiting to load page...');
    await page.waitForLoadState('networkidle');
    await homePage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await searchPage.search('s22');
    await searchPage.openAndClick();
    await basketPage.goToCart();
    await basketPage.checkBasketTitle();
    await basketPage.checkPaymentButton();
    await basketPage.deleteCartItemAndCheckTotal();

});