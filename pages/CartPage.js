import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class CartPage {
        constructor(page){
        this.actions = new CommonActions(page)
        this.page = page

        this.cartHeading = 'li[class="active"]'
        this.checkOutBtn = 'a[class="btn btn-default check_out"]'
        this.addressDetailsHeading = page.getByRole('heading', {name: 'Address Details'})
        this.reviewOrderHeading = page.getByRole('heading', {name: 'Review Your Order'})
        this.commentBoxLocator = 'textarea[class="form-control"]'

    }

    async verifyCartHeading() {
        await expect(this.page.locator(this.cartHeading)).toHaveText('Shopping Cart')
    }

    async clickCheckOutBtn(){
        await this.actions.click(this.checkOutBtn)
    }

    async clickRegisterPopupCheckout(){
        await this.page.locator('div.modal-content').locator('a[href="/login"]').click()
    }

    async verifyAddressDetailsHeading(){
        await expect(this.addressDetailsHeading).toBeVisible()
    }

    async verifyReviewOrderHeading(){
        await expect(this.reviewOrderHeading).toBeVisible()
    }

    async writeCommentBox(review){
        await this.actions.fill(this.commentBoxLocator, review)
        await this.page.getByRole('link', {name: 'Place Order'}).click()
    }

}



