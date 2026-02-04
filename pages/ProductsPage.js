import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";
import { searchProducts } from "../data/users.js";

export default class ProductsPage {

    constructor(page) {
        this.actions = new CommonActions(page)

        this.allProductsHeading = page.getByRole('heading', {name: 'All Products'})
        this.searchProduct = '[id="search_product"]'
        this.submitSearch = '[id="submit_search"]'

        this.searchResult = page.getByRole('heading', {name: 'Searched Products'})

        this.relatedSearchResult = page.locator('p').filter({ hasText: searchProducts.existingProduct })
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




}