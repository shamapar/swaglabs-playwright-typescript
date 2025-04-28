import { userInforamtion } from '@data/checkoutUserInformation';
import { standardUser } from '@data/credential';
import { test, expect } from '@fixture/fixture';


test.beforeEach('loggin into Application and product checkout', async ({ loginPage, productPage, cartPage, commonPage }) => {
    await loginPage.loginToApplication(standardUser.username, standardUser.password);
    await productPage.cartButton('Sauce Labs Backpack').click();
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await expect(commonPage.pageTitle).toHaveText("Checkout: Your Information");
})

test('filling product checkout billing with all information', async ({ checkoutPage, commonPage }) => {

    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();
    await expect(commonPage.pageTitle).toHaveText("Checkout: Overview");
})

test('filling product checkout information without firstname', async ({ checkoutPage, commonPage }) => {

    await checkoutPage.fillingCheckoutInformation("", userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();
    await expect(commonPage.pageError).toHaveText("Error: First Name is required");
})

test('filling product checkout information without lastname', async ({ checkoutPage, commonPage }) => {

    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, "", userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();
    await expect(commonPage.pageError).toHaveText("Error: Last Name is required");
})

test('filling product checkout information without postal code', async ({ checkoutPage, commonPage }) => {

    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, "")
    await checkoutPage.continueToCheckout();
    await expect(commonPage.pageError).toHaveText("Error: Postal Code is required");
})

test('filling product checkout without any information', async ({ checkoutPage, commonPage }) => {

    await checkoutPage.fillingCheckoutInformation("", "", "");
    await checkoutPage.continueToCheckout();
    await expect(commonPage.pageError).toHaveText("Error: First Name is required");
})

