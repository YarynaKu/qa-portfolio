import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';

export default class RecommendedItems {
    constructor(page) {
        this.commonActions = new CommonActions(page);
        this.page = page;

        this.recommendedItemsSection = page.getByRole('heading', {name: 'Recommended items'})

    }

    async verifyRecommendedItemsSection() {
        await expect(this.recommendedItemsSection).toBeVisible()
    }

    async addRandomRecommendedItemToCart() {

        const items = this.page.locator('#recommended-item-carousel .item.active .productinfo')
        const count = await items.count()

        const randomIndex = Math.floor(Math.random() * count)
        const selectedItem = items.nth(randomIndex)
        const productName = await selectedItem.locator('p').innerText()

        await selectedItem.locator('a.add-to-cart').click()
    }

    async goToCartFromRecommendedItems() {
        await this.page.locator('.modal-content').locator('a[href="/view_cart"]').click()
    }

    async VerifyProduct(productName) {
        await expect(this.page.locator('#cart_info_table td.cart_description h4 a', {hasText: productName })).toBeVisible()
    }



}