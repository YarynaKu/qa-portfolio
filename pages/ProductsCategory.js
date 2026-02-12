import { expect } from "@playwright/test";

export default class ProductsCategory {
    constructor(page) {
        this.page = page;

        this.categoryTitle = page.getByRole('heading', {name: "Category"})

    }

    async verifyCategoryTitle(name) {
        await expect(this.categoryTitle).toBeVisible()
    }

    categorySelector(name) {
        return this.page.locator(`.panel-title a[href="#${name}"]`);
    }

    subCategorySelector(categoryName, subName) {
        return this.page.locator(`#${categoryName} ul li a:has-text("${subName}")`);
    }

    async openCategory(name){
            const category = this.categorySelector(name)
       //     const panel = this.page.locator(`#${name}`)
            await category.click()

    }

    async openSubCategory(categoryName, subName){
        const subCategory = this.subCategorySelector(categoryName, subName)
        await expect(subCategory).toBeVisible({timeout: 1000 })
        await subCategory.click()
    }

    displayedCategoryHeading(name, subName) {
        return `${name} - ${subName}`;
    }

    async verifyCategoryHeading(name, subName) {
        const expectedHeading = this.displayedCategoryHeading(name, subName);
        const headingLocator = this.page.getByRole('heading', { name: new RegExp(expectedHeading, 'i') })
        await expect(headingLocator).toBeVisible();
        }


}