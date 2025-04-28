import { test as base } from '@playwright/test';
import CartPage from '@pom/cart.page';
import CheckoutPage from '@pom/checkout.page';
import CommonPage from '@pom/commonPage.page';
import LoginPage from '@pom/login.page';
import ProductPage from '@pom/product.page';
import CheckoutCompletePage from '@pom/complete.page';
import CheckoutSummaryPage from '@pom/checkoutSummary.page'

type MyFixtures = {
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    commonPage: CommonPage;
    loginPage: LoginPage;
    productPage: ProductPage;
    checkoutCompletePage: CheckoutCompletePage;
    checkoutSummaryPage: CheckoutSummaryPage

};

export const test = base.extend<MyFixtures>({
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },
    checkoutSummaryPage: async ({ page }, use) => {
        await use(new CheckoutSummaryPage(page));
    }
});

export { expect } from '@playwright/test'