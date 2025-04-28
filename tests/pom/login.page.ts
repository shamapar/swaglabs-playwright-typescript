import type { Page } from '@playwright/test';

class LoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  inputLocatorByPlaceholder(name: string) {
    return this.page.getByPlaceholder(name);
  }

  get loginError() {
    return this.page.locator("//h3[@data-test='error']");
  }

  productImageLocatorByName(name: string) {
    return this.page.locator(`//img[@alt='${name}']`);
  }

  async loginToApplication(username: string, password: string) {
    await this.page.goto("https://www.saucedemo.com/");
    await this.inputLocatorByPlaceholder("Username").fill(username);
    await this.inputLocatorByPlaceholder("Password").fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

}

export default LoginPage;