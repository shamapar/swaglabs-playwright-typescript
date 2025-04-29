import { userInforamtion } from '@data/checkoutUserInformation';
import { standardUser } from '@data/credential';
import productData from "@data/productData.json";
import { test, expect } from '@fixture/fixture';

test.beforeEach('loggin into Application ', async ({ loginPage }) => {
    await loginPage.loginToApplication(standardUser.username, standardUser.password);
})

test('verifying number of products in  summary cart', async ({ productPage, cartPage, checkoutPage, checkoutSummaryPage }) => {

    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartButton(productData.bikeLight.name).click()
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    const allProducts = await checkoutSummaryPage.checkProductInCart();
    expect(allProducts).toContain(productData.backPack.name);
    expect(allProducts).toContain(productData.bikeLight.name);

})

test('verifying product price by its name', async ({ commonPage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartButton(productData.bikeLight.name).click()
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    await expect(commonPage.productPriceByName(productData.backPack.name)).toHaveText(productData.backPack.price);
    await expect(commonPage.productPriceByName(productData.bikeLight.name)).toHaveText(productData.bikeLight.price);
})

test('verifying total purchase amount including 8% tax of a product', async ({ checkoutSummaryPage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    expect(await checkoutSummaryPage.totalPriceofProduct()).toEqual("32.39")
})

test('verifying total purchase amount including 8% tax of multiple product', async ({ checkoutSummaryPage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartButton(productData.bikeLight.name).click()
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    expect(await checkoutSummaryPage.totalPriceofProduct()).toEqual("43.18")
})

test('final product checkout to complete page ', async ({ checkoutSummaryPage, checkoutCompletePage, productPage, cartPage, checkoutPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();

    await checkoutSummaryPage.finishCheckout();
    await expect(checkoutCompletePage.successfullOrderNotification).toHaveText("Thank you for your order!");
})

