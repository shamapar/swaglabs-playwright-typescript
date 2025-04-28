import { Page } from '@playwright/test';

class CommonPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get pageError() {
        return this.page.locator("//h3[@data-test='error']");
    }
    get pageTitle() {
        return this.page.locator('.title');
    }

    removeProductFromCart(product: string) {
        const productName = product.split(" ").join("-").toLowerCase();
        return this.page.locator(`#remove-${productName}`);
    }

    get numberOfItemInCart() {
        return this.page.locator("//span[@class='shopping_cart_badge']");
    }

    async goingBackToContinueShoppingButton() {
        await this.page.getByRole('button', { name: 'Go back Continue Shopping' }).click();
    }

    productPriceByName(product: string) {
        return this.page.locator(`//*[text()="${product}"]//..//following-sibling::*[@class="item_pricebar"]//div`);
    }
}
export default CommonPage;