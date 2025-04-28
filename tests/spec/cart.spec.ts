import { standardUser } from '@data/credential';
import { test, expect } from '@fixture/fixture';

test.beforeEach('loggin into Application and adding products to cart', async ({ loginPage, productPage, commonPage }) => {
    await loginPage.loginToApplication(standardUser.username, standardUser.password);
    await productPage.cartButton('Sauce Labs Backpack').click();
    await productPage.cartButton('Sauce Labs Bike Light').click();
    await expect(commonPage.numberOfItemInCart).toHaveText("2");
    await productPage.cartLink.click();
    await expect(commonPage.pageTitle).toHaveText("Your Cart");
})

test('Removing a product from cart', async ({ productPage, commonPage, cartPage }) => {
    await commonPage.removeProductFromCart('Sauce Labs Backpack').click();
    await expect(commonPage.numberOfItemInCart).toHaveText("1");
    await expect(cartPage.removeProductFromCart('Sauce Labs Backpack')).toBeHidden();
})

test('returning to Product page', async ({ commonPage }) => {
    await commonPage.goingBackToContinueShoppingButton();
    await expect(commonPage.pageTitle).toHaveText("Products")
})

test('Navigating to checkout page from cart', async ({ commonPage, cartPage }) => {
    await cartPage.clickOnCheckoutButton();
    await expect(commonPage.pageTitle).toHaveText("Checkout: Your Information");
})
