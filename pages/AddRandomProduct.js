import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';

export default class AddRandomProduct {
        constructor(page) {
            this.actions = new CommonActions(page);
            this.page = page;

        }

        async clickRandomViewProduct() {
            const products = this.page.locator('a', { hasText: 'View Product' })
                const count = await products.count()
                const randomIndex = Math.floor(Math.random() * count)
                const selectedItem = products.nth(randomIndex)

                await selectedItem.click()
        }

}