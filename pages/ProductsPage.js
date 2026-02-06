import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";
import { searchProducts } from "../data/variables.js";

export default class ProductsPage {

    constructor(page) {
        this.actions = new CommonActions(page)
        this.page = page

        this.allProductsHeading = page.getByRole('heading', {name: 'All Products'})
        this.searchProduct = '[id="search_product"]'
        this.submitSearch = '[id="submit_search"]'

        this.searchResult = page.getByRole('heading', {name: 'Searched Products'})

        this.continueShopping = page.getByRole('button', {name: 'Continue Shopping'})

        this.relatedSearchResult = page.locator('p').filter({ hasText: searchProducts.existingProduct })

        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });

    }

    async verifyAllProductsHeading(){
        await expect(this.allProductsHeading).toBeVisible()
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



    async searchForProduct(productName){
        await this.actions.fill(this.searchProduct, productName)
        await this.actions.click(this.submitSearch)
    }

    async verifySearchResultsHeading(){
        await expect(this.searchResult).toBeVisible()
    }

    async verifyRelatedSearchResults(relatedSearchResult){
        const items = this.relatedSearchResult
        const count = await items.count()

             for (let i=0; i< count; i++) {
                 await expect(items.nth(i)).toBeVisible()
             }
    }

    async addSearchedProductsToCart(){

        const items = this.page.locator('.product-image-wrapper .single-products:has(.productinfo.text-center p:has-text("' + searchProducts.existingProduct + '"))')

           const count = await items.count()
               for (let i=0; i< count; i++) {
                   await expect(items.nth(i)).toBeVisible()
               }

           console.log('Number of items found: ', count);

           for (let i = 0; i < count; i++) {
             const item = items.nth(i);
             await expect(item).toBeVisible();
             await item.hover();
             await item
               .locator('.product-overlay .overlay-content a.add-to-cart')
               .scrollIntoViewIfNeeded();
             await item
               .locator('.product-overlay .overlay-content a.add-to-cart')
               .click();

             await this.continueShoppingBtn.click();
           }
         }

    async goToCart() {
       await this.cartLink.click();
       }

    async goToCartPopUpMessage() {
       await this.page.locator('.modal-content').locator('a[href="/view_cart"]').click()
    }

    async continueShoppingPopUpMessage() {
       await this.continueShopping.click();
    }


    async verifyProductsInCart(productName) {
        await expect(this.page.locator('#cart_info_table')).toBeVisible();
        const itemRows = this.page.locator('#cart_info_table tr').filter({ hasText: productName })
        const count = await itemRows.count()

        for (let i = 0; i < count; i++) {
            await expect(itemRows.nth(i)).toBeVisible();
        }
    }

    async addRandomProduct(){

       const products = this.page.locator('.product-image-wrapper .overlay-content')
       const count = await products.count()

       const randomIndex = Math.floor(Math.random() * count)
       const selectedItem = products.nth(randomIndex)
       const productName = await selectedItem.locator('p').innerText()

       await products.first().waitFor({ state: 'visible' });

       await selectedItem.locator('a.add-to-cart').evaluate(el => el.click())
    }


}
