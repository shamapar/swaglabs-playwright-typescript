import { problemUser, standardUser } from '@data/credential';
import { test, expect } from '@fixture/fixture';
import productData from "@data/productData.json";

test('product page of problem user', async ({ loginPage }) => {

    await loginPage.loginToApplication(problemUser.username, problemUser.password);
    await expect(loginPage.productImageLocatorByName(productData.backPack.name)).toHaveAttribute('src', productData.backPack.incorrectUrl);
    await expect(loginPage.productImageLocatorByName(productData.bikeLight.name)).toHaveAttribute('src', productData.bikeLight.incorrectUrl);
    await expect(loginPage.productImageLocatorByName(productData.boltTshirt.name)).toHaveAttribute('src', productData.boltTshirt.incorrectUrl);
    await expect(loginPage.productImageLocatorByName(productData.fleeceJacket.name)).toHaveAttribute('src', productData.fleeceJacket.incorrectUrl);
    await expect(loginPage.productImageLocatorByName(productData.onesie.name)).toHaveAttribute('src', productData.onesie.incorrectUrl);
})

test.beforeEach('loggin into Application using standard user', async ({ loginPage, commonPage }) => {

    await loginPage.loginToApplication(standardUser.username, standardUser.password);
    await expect(commonPage.pageTitle).toHaveText("Products");
})


test('Adding single product in the cart', async ({ productPage, commonPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await expect(productPage.cartButton(productData.backPack.name)).toHaveText("Remove");
    await expect(commonPage.numberOfItemInCart).toHaveText("1");
})

test('Adding multiple product in the cart', async ({ productPage, commonPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartButton(productData.bikeLight.name).click();
    await expect(productPage.cartButton(productData.backPack.name)).toHaveText("Remove");
    await expect(productPage.cartButton(productData.bikeLight.name)).toHaveText("Remove");
    await expect(commonPage.numberOfItemInCart).toHaveText("2");
})

test('removing a product from product page', async ({ productPage, commonPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await productPage.cartButton(productData.bikeLight.name).click();
    await expect(productPage.cartButton(productData.backPack.name)).toHaveText("Remove");
    await expect(productPage.cartButton(productData.bikeLight.name)).toHaveText("Remove");
    await expect(commonPage.numberOfItemInCart).toHaveText("2");

    await commonPage.removeProductFromCart(productData.backPack.name).click();
    await expect(commonPage.numberOfItemInCart).toHaveText("1");
    await expect(commonPage.removeProductFromCart(productData.backPack.name)).toBeHidden();
})

test('Navigating to cart link from Product Page', async ({ productPage, commonPage }) => {
    await productPage.cartButton(productData.backPack.name).click();
    await expect(productPage.cartButton(productData.backPack.name)).toHaveText("Remove");
    await productPage.cartLink.click();
    await expect(commonPage.pageTitle).toHaveText("Your Cart");
})
