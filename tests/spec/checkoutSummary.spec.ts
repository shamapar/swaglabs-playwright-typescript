import { userInforamtion } from '@data/checkoutUserInformation';
import { standardUser } from '@data/credential';
import { productNames, productPrice } from '@data/productData';
import { test, expect } from '@fixture/fixture';

test.beforeEach('loggin into Application ', async ({ loginPage }) => {
    await loginPage.loginToApplication(standardUser.username, standardUser.password);
})

test('verifying number of products in  summary cart', async ({ productPage, cartPage, checkoutPage, checkoutSummaryPage }) => {

    await productPage.cartButton(productNames.backPack).click();
    await productPage.cartButton(productNames.bikeLight).click()
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    const allProducts = await checkoutSummaryPage.checkProductInCart();
    expect(allProducts).toContain(productNames.backPack);
    expect(allProducts).toContain(productNames.bikeLight);

})

test('verifying product price by its name', async ({ commonPage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productNames.backPack).click();
    await productPage.cartButton(productNames.bikeLight).click()
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    await expect(commonPage.productPriceByName(productNames.backPack)).toHaveText(productPrice.SauceLabsBackpack);
    await expect(commonPage.productPriceByName(productNames.bikeLight)).toHaveText(productPrice.SauceLabsBikeLight);
})

test('verifying total purchase amount including 8% tax of a product', async ({ checkoutSummaryPage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productNames.backPack).click();
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    expect(await checkoutSummaryPage.totalPriceofProduct()).toEqual("32.39")
})

test('verifying total purchase amount including 8% tax of multiple product', async ({ checkoutSummaryPage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productNames.backPack).click();
    await productPage.cartButton(productNames.bikeLight).click()
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    expect(await checkoutSummaryPage.totalPriceofProduct()).toEqual("43.18")
})

test('final product checkout to complete page ', async ({ checkoutSummaryPage, checkoutCompletePage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productNames.backPack).click();
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    await checkoutSummaryPage.finishCheckout();
    await expect(checkoutCompletePage.successfullOrderNotification).toHaveText("Thank you for your order!");
})

