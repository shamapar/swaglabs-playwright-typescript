import { Page } from '@playwright/test';
class CheckoutPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async fillingCheckoutInformation(firstname: string, lastname: string, postalCode: string) {
        await this.page.getByPlaceholder("First Name").fill(firstname);
        await this.page.getByPlaceholder("Last Name").fill(lastname);
        await this.page.getByPlaceholder("Zip/Postal Code").fill(postalCode);
    }

    async continueToCheckout() {
        await this.page.getByRole('button', { name: "Continue" }).click()
    }


}
export default CheckoutPage;