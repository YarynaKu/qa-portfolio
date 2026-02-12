import { expect } from "@playwright/test";

export default class ProductsBrands {
    constructor(page) {
        this.page = page;

        this.brandTitle = page.getByRole('heading', {name: "Brands"})

    }

    async verifyBrandsTitle() {
        await expect(this.brandTitle).toBeVisible()
    }

    brandSelector(brandName) {
        return this.page.locator(`a:has-text("${brandName}")`);;
    }

    async chooseBrand(brandName){
        await this.brandSelector(brandName).click()
    }

    displayedBrandHeading(brandName) {
        return ` Brand - ${brandName} Products`;
    }

    async verifyBrandHeading(brandName) {
        await expect(this.page.getByRole('heading', {
            name: this.displayedBrandHeading(brandName)
        })).toBeVisible();
        }


}