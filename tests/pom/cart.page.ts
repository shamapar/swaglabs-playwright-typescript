import { Page } from '@playwright/test'
class CartPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    removeProductFromCart(product: string) {
        const productName = product.split(" ").join("-").toLowerCase();
        return this.page.locator(`#remove-${productName}`);
    }

    async clickOnCheckoutButton() {
        await this.page.getByRole('button', { name: 'Checkout' }).click()
    }

}
export default CartPage;