import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';

export default class AddRandomProduct {
        constructor(page) {
            this.actions = new CommonActions(page);
            this.page = page;

        }

        async clickRandomViewProduct() {
//            const products = this.page.locator('a', { hasText: 'View Product' })
                const products = this.page.locator('div.product-image-wrapper')
                const count = await products.count()
                const randomIndex = Math.floor(Math.random() * count)
                const selectedItem = products.nth(randomIndex)

                const productName = await selectedItem.locator('div.productinfo p').innerText();
                console.log('Selected product:', productName);
                await selectedItem.locator('a:has-text("View Product")').click()

                return { productName }
        }

        async verifyProductDetails(productName) {
                const selectedItem = this.page.locator('div.product-information h2');
                await selectedItem.waitFor({ state: 'visible' });
                const titleText = await selectedItem.innerText();
                console.log('Product title on page:', titleText);
                console.log(`Selected product: ${productName}`);

                return titleText.includes(productName);
        }

        async verifyProductInCart(productName) {
                const cartItem = this.page.locator('#cart_info tbody tr').filter({ hasText: productName});
                await expect(cartItem).toBeVisible();
                const quantityInCart = this.page.locator('td.cart_quantity')
                const quantityText = await quantityInCart.innerText();
                console.log('Quantity in cart:', quantityText);
                await expect(quantityInCart).toContainText('4')
        }

}