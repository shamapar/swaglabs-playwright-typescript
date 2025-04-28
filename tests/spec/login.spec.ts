import { test, expect } from '@fixture/fixture';
import { lockedOutUser, problemUser, standardUser, visualUser } from '@data/credential';
import { productURL, productURLOfProblemUser } from '@data/productsURL';

test('logging into application with valid username and password', async ({ loginPage, commonPage }) => {
    await loginPage.loginToApplication(standardUser.username, standardUser.password);
    await expect(commonPage.pageTitle).toHaveText("Products");
})

test('logging into application with lockedout user and password', async ({ loginPage }) => {
    await loginPage.loginToApplication(lockedOutUser.username, lockedOutUser.password);
    await expect(loginPage.loginError).toHaveText("Epic sadface: Sorry, this user has been locked out.");
})

test('logging into Application with problem user and password', async ({ loginPage, commonPage }) => {

    await loginPage.loginToApplication(problemUser.username, problemUser.passowrd);
    await expect(commonPage.pageTitle).toHaveText("Products");

})

test('logging into application without username and with password', async ({ loginPage }) => {

    await loginPage.loginToApplication("", standardUser.password);
    await expect(loginPage.loginError).toHaveText("Epic sadface: Username is required");
})

test('logging into application without password and with username ', async ({ loginPage }) => {

    await loginPage.loginToApplication(standardUser.username, "");
    await expect(loginPage.loginError).toHaveText("Epic sadface: Password is required");
})

test('logging into application without password and without username', async ({ loginPage }) => {

    await loginPage.loginToApplication("", "");
    await expect(loginPage.loginError).toHaveText("Epic sadface: Username is required")
})


