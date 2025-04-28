import { Page } from '@playwright/test'
class CheckoutCompletePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get successfullOrderNotification() {
        return this.page.getByRole("heading", { level: 2 });
    }
}
export default CheckoutCompletePage;