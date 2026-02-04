import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class ProductsBrands {
    constructor(page) {
        this.actions = new CommonActions(page)
        this.page = page

        this.brandTitle = page.getByRole('heading', {name: "Brands"})

    }

    async verifyBrandsTitle() {
        await expect(this.brandTitle).toBeVisible()
    }

    brandSelector(brandName) {
        return `a:has-text("${brandName}")`;;
    }

    async chooseBrand(brandName){
        await this.actions.click(this.brandSelector(brandName))
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