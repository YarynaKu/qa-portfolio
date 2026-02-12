import { expect } from '@playwright/test';
import { searchProducts } from "../data/variables.js";

export default class AddRandomProduct {
        constructor(page) {

            this.page = page;

            this.searchProduct = page.locator('[id="search_product"]')
            this.submitSearch = page.locator('[id="submit_search"]')

            this.searchResult = page.getByRole('heading', {name: 'Searched Products'})
            this.relatedSearchResult = page.locator('p').filter({ hasText: searchProducts.existingProduct })

            this.continueShoppingBtn = page.getByRole('button', {name: 'Continue Shopping'})
        }


    async searchForProduct(productName){
        await this.searchProduct.fill(productName)
        await this.submitSearch.click()
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

}