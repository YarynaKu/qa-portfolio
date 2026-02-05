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

        this.relatedSearchResult = page.locator('p').filter({ hasText: searchProducts.existingProduct })

        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });

    }

    async verifyAllProductsHeading(){
        await expect(this.allProductsHeading).toBeVisible()
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

    async verifyProductsInCart(productName) {
        await expect(this.page.locator('#cart_info_table')).toBeVisible();
        const itemRows = this.page.locator('#cart_info_table tr').filter({ hasText: productName })
        const count = await itemRows.count()

        for (let i = 0; i < count; i++) {
            await expect(itemRows.nth(i)).toBeVisible();
        }
        }

}
