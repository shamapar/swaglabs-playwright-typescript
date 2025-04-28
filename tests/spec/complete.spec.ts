import { userInforamtion } from '@data/checkoutUserInformation';
import { standardUser } from '@data/credential';
import { test, expect } from '@fixture/fixture';

test.beforeEach('loggin into Application and cehckingout the products', async ({ loginPage }) => {
    await loginPage.loginToApplication(standardUser.username, standardUser.password);
})

test('product checkout to final page', async ({ productPage, cartPage, checkoutPage, checkoutSummaryPage, commonPage, checkoutCompletePage }) => {
    await productPage.cartButton('Sauce Labs Backpack').click();
    await productPage.cartLink.click();
    await cartPage.clickOnCheckoutButton();
    await checkoutPage.fillingCheckoutInformation(userInforamtion.firstname, userInforamtion.lastname, userInforamtion.postalCode)
    await checkoutPage.continueToCheckout();
    await checkoutSummaryPage.finishCheckout();
    await expect(commonPage.pageTitle).toHaveText("Checkout: Complete!");
    await expect(checkoutCompletePage.successfullOrderNotification).toHaveText("Thank you for your order!");
})

