import type { Page } from '@playwright/test'

class ProductPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    cartButton(product: string) {
        const productName = product.split(" ").join("-").toLowerCase();
        return this.page.locator(`//*[contains(@id,'${productName}')]`)
    }

    get cartLink() {
        return this.page.locator("//a[@class='shopping_cart_link']");
    }
}
export default ProductPage;