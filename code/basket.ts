import { Page, Locator, expect } from '@playwright/test';

export class Basket {
    constructor(private page: Page) {}

    get searchInput(): Locator {
        return this.page.locator('#q');
    }

    async search(query: string): Promise<void> {
        console.log('Filling search input...');
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');

        console.log('Waiting for search results...');
        await expect(this.page.locator('//span[contains(text(), "Meklēšanas rezultāti frāzei")]')).toBeVisible();
        console.log('Search successful!');
    }

    async getProductByName(): Promise<Locator> {
        return this.page.locator('[data-sna-id="689032"]');
    }

    async openAndClick(): Promise<void> {
        const productItem = await this.getProductByName();
        await productItem.hover();
        console.log('Hovered over product item');
        await this.page.waitForTimeout(1000);

        const addToCartButtons = productItem.locator('button.catalog-taxons-buy-button__button--add-to-cart');
        const buttonCount = await addToCartButtons.count();
        console.log(`Found ${buttonCount} "Add to Cart" buttons`);

        if (buttonCount > 0) {
            for (let i = 0; i < buttonCount; i++) {
                const addToCartButton = addToCartButtons.nth(i);
                if (await addToCartButton.isVisible()) {
                    await addToCartButton.click();
                    console.log('Item added to basket');
                    return;
                }
            }
        } else {
            console.log('Button "Add to Cart" not found');
        }
    }

    async goToCart(): Promise<void> {
        console.log('Going to basket...');
        await this.page.locator('a.main-button:has-text("Pārlūkot pirkumu grozu")').click();
        await this.page.waitForLoadState('networkidle');
        console.log('Basket opened!');
    }

    async checkBasketTitle(): Promise<void> {
        console.log('Checking basket title...');
        await expect(this.page.locator('h1.cart__page-title')).toHaveText('Pirkumu grozs');
        console.log('Basket title is correct!');
    }

    async checkPaymentButton(): Promise<void> {
        console.log('Checking payment button "Veikt apmaksu"...');
        await expect(this.page.locator('input[type="submit"][value="Veikt apmaksu"]')).toBeVisible();
        console.log('Button "Veikt apmaksu" found!');
    }

    async deleteCartItemAndCheckTotal(): Promise<void> {
        this.page.on('dialog', async dialog => {
            console.log('Dialog message:', dialog.message());
            await dialog.accept();
            console.log('Dialog accepted');
        });

        const deleteButton = this.page.locator('.detailed-cart-item__delete-wrap-link');
        await deleteButton.waitFor({ state: 'visible' });
        await expect(deleteButton).toBeEnabled();
        await deleteButton.click();

        const totalPriceLocator = this.page.locator('#cart-full-total-price');
        await expect(totalPriceLocator).toHaveText('0,00 €');
        console.log('Item deleted, final price: 0,00 €');
    }
}
