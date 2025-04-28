import { problemUser, standardUser, visualUser } from '@data/credential';
import { productURL, productURLOfProblemUser } from '@data/productsURL';
import { test, expect } from '@fixture/fixture';

test('product page of problem user', async ({ loginPage }) => {

    await loginPage.loginToApplication(problemUser.username, problemUser.passowrd);
    await expect(loginPage.productImageLocatorByName('Sauce Labs Backpack')).toHaveAttribute('src', productURLOfProblemUser.SauceLabsBackpack);
    await expect(loginPage.productImageLocatorByName('Sauce Labs Bike Light')).toHaveAttribute('src', productURLOfProblemUser.SauceLabsBikeLight);
    await expect(loginPage.productImageLocatorByName('Sauce Labs Bolt T-Shirt')).toHaveAttribute('src', productURLOfProblemUser.SauceLabsBoltTShirt);
    await expect(loginPage.productImageLocatorByName('Sauce Labs Fleece Jacket')).toHaveAttribute('src', productURLOfProblemUser.SauceLabsFleeceJacket);
    await expect(loginPage.productImageLocatorByName('Sauce Labs Fleece Jacket')).toHaveAttribute('src', productURLOfProblemUser.SauceLabsFleeceJacket);
})

test('product page of visual user', async ({ loginPage }) => {
    await loginPage.loginToApplication(visualUser.username, visualUser.passowrd);
    await expect(loginPage.productImageLocatorByName('Sauce Labs Backpack')).toHaveAttribute('src', productURL.SauceLabsBackpacks);
})

test.beforeEach('loggin into Application using standard user', async ({ loginPage, commonPage }) => {

    await loginPage.loginToApplication(standardUser.username, standardUser.password);
    await expect(commonPage.pageTitle).toHaveText("Products");
})


test('Adding single product in the cart', async ({ productPage, commonPage }) => {
    await productPage.cartButton('Sauce Labs Backpack').click();
    await expect(productPage.cartButton('Sauce Labs Backpack')).toHaveText("Remove");
    await expect(commonPage.numberOfItemInCart).toHaveText("1");
})

test('Adding multiple product in the cart', async ({ productPage, commonPage }) => {
    await productPage.cartButton('Sauce Labs Backpack').click();
    await productPage.cartButton('Sauce Labs Bike Light').click();
    await expect(productPage.cartButton('Sauce Labs Backpack')).toHaveText("Remove");
    await expect(productPage.cartButton('Sauce Labs Bike Light')).toHaveText("Remove");
    await expect(commonPage.numberOfItemInCart).toHaveText("2");
})

test('removing a product from product page', async ({ productPage, commonPage }) => {
    await productPage.cartButton('Sauce Labs Backpack').click();
    await productPage.cartButton('Sauce Labs Bike Light').click();
    await expect(productPage.cartButton('Sauce Labs Backpack')).toHaveText("Remove");
    await expect(productPage.cartButton('Sauce Labs Bike Light')).toHaveText("Remove");
    await expect(commonPage.numberOfItemInCart).toHaveText("2");

    await commonPage.removeProductFromCart("Sauce Labs Backpack").click();
    await expect(commonPage.numberOfItemInCart).toHaveText("1");
    await expect(commonPage.removeProductFromCart('Sauce Labs Backpack')).toBeHidden();
})

test('Navigating to cart link from Product Page', async ({ productPage, commonPage }) => {
    await productPage.cartButton('Sauce Labs Backpack').click();
    await expect(productPage.cartButton('Sauce Labs Backpack')).toHaveText("Remove");
    await productPage.cartLink.click();
    await expect(commonPage.pageTitle).toHaveText("Your Cart");
})
