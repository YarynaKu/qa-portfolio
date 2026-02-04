import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class ProductsCategory {
    constructor(page) {
        this.actions = new CommonActions(page)
        this.page = page

        this.categoryTitle = page.getByRole('heading', {name: "Category"})

    }

    async verifyCategoryTitle(name) {
        await expect(this.categoryTitle).toBeVisible()
    }

    categorySelector(name) {
        return `a[href="#${name}"]`;
    }

    subCategorySelector(subName) {
        return `a:has-text("${subName}")`;
    }

    async openCategory(name){
        await this.actions.click(this.categorySelector(name))
    }

    async openSubCategory(subName){
        await this.actions.click(this.subCategorySelector(subName))
    }

    displayedCategoryHeading(name, subName) {
        return ` ${name} - ${subName} Products`;
    }

    async verifyCategoryHeading(name, subName) {

        await expect(this.page.getByRole('heading', {
            name: this.displayedCategoryHeading(name, subName)
            })).toBeVisible();
        }


}