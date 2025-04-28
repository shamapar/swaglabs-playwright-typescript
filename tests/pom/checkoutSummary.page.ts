import { Page } from '@playwright/test'

class CheckoutSummaryPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async checkProductInCart() {
        return await this.page.locator('//*[@data-test="inventory-item-name"]').allInnerTexts();
    }

    async finishCheckout() {
        await this.page.getByRole('button', { name: 'Finish' }).click()
    }

    async totalPriceofProduct() {
        let amountWithoutTax = 0;
        const allProductPrice = await this.page.locator('//*[@data-test="inventory-item-price"]').all();
        for (let i = 0; i < allProductPrice.length; i++) {
            amountWithoutTax = amountWithoutTax + Number((await allProductPrice[i].innerText()).slice(1))
        }
        const tax = ((8 / 100) * amountWithoutTax);
        const amountWithTax = amountWithoutTax + tax;
        return amountWithTax.toFixed(2);
    }
}

export default CheckoutSummaryPage;