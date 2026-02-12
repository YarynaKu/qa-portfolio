import { expect } from "@playwright/test";

export default class ProductsPage {

    constructor(page) {
        this.page = page;

        this.allProductsHeading = page.getByRole('heading', {name: 'All Products'})

        this.continueShopping = page.getByRole('button', {name: 'Continue Shopping'})

        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async verifyAllProductsHeading(){
        await expect(this.allProductsHeading).toBeVisible()
    }

    async viewProductById(productId) {
           const product = this.page.locator('div.product-image-wrapper')
                                 .filter({ has: this.page.locator(`a[data-product-id="${productId}"]`) });
           await expect(product).toBeVisible();
           const productName = await product.locator('div.productinfo p').innerText();
           console.log('Selected product:', productName);
           await product.locator('a:has-text("View Product")').click()

        return { productId, productName }
    }

    async addProductById(productId){
        const productWrapper = this.page.locator('.product-image-wrapper')
                                   .filter({ has: this.page.locator(`a[data-product-id="${productId}"]`) });

        await productWrapper.hover();

        await productWrapper
              .locator('.overlay-content')
              .locator(`a[data-product-id="${productId}"]`)
              .click();
    }

    async verifyProductsInCartById(productId, expected) {
        await expect(this.page.locator('#cart_info_table')).toBeVisible();

           const itemRow = this.page.locator('#cart_info_table tr')
                                     .filter({ has: this.page.locator(`a[data-product-id="${productId}"]`) });

           await expect(itemRow).toBeVisible();

           await expect(itemRow.locator('.cart_description h4 a'))
               .toHaveText(expected.name);

           await expect(itemRow.locator('.cart_description p'))
               .toHaveText(expected.category);

           await expect(itemRow.locator('.cart_price p'))
               .toHaveText(expected.price);

           await expect(itemRow.locator('.cart_quantity button'))
               .toHaveText(expected.quantity);

           await expect(itemRow.locator('.cart_total_price'))
               .toHaveText(expected.total);

    }

    async goToCartPopUpMessage() {
       await this.page.locator('.modal-content').locator('a[href="/view_cart"]').click()
    }

    async continueShoppingPopUpMessage() {
       await this.continueShopping.click();
    }

}
