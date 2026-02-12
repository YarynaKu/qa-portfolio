import { expect } from "@playwright/test";
import { expectedAddressFields } from "../data/variables.js"
import { normalizeText } from "../utils/utils.js"

export default class CartPage {

        constructor(page){
        this.page = page;

        this.cartHeading = page.locator('li[class="active"]')
        this.checkOutBtn = page.locator('a[class="btn btn-default check_out"]')
        this.addressDetailsHeading = page.getByRole('heading', {name: 'Address Details'})
        this.reviewOrderHeading = page.getByRole('heading', {name: 'Review Your Order'})
        this.commentBoxLocator = page.locator('textarea[class="form-control"]')
    }

    async verifyCartHeading() {
        await expect(this.cartHeading).toHaveText('Shopping Cart')
    }

    async verifyProductsInCart(productName) {
            await expect(this.page.locator('#cart_info_table')).toBeVisible();
            const itemRows = this.page.locator('#cart_info_table tr').filter({ hasText: productName })
            const count = await itemRows.count()

            for (let i = 0; i < count; i++) {
                await expect(itemRows.nth(i)).toBeVisible();
            }
        }

    async clickCheckOutBtn(){
        await this.checkOutBtn.click()
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
        await this.commentBoxLocator.fill(review)
        await this.page.getByRole('link', {name: 'Place Order'}).click()
    }

    async deleteProductFromCart(productName) {

        const cartItem = this.page.locator('#cart_info tbody tr').filter({ hasText: productName});
        await expect(cartItem).toBeVisible();

        await cartItem.locator('.cart_quantity_delete').click()
        await expect(cartItem).toBeHidden()
    }


    async verifyDeliveryAddress(registeredUser) {
        const deliveryAddress = this.page.locator('#address_delivery')

        const deliveryText = (await deliveryAddress.innerText())
                                 .split('\n')
                                 .map(line => normalizeText(line))
                                 .filter(Boolean);

        const deliveryFullText = deliveryText.join(' ');
        for (const field of expectedAddressFields) {
            expect(deliveryFullText).toContain(field)
        }
    }

    async verifyBillingAddress(){
       const billingAddress = this.page.locator('#address_invoice')

       const invoiceText = (await billingAddress.innerText())
                                .split('\n')
                                .map(line => normalizeText(line))
                                .filter(Boolean);

       const invoiceFullText = invoiceText.join(' ');

       for (const field of expectedAddressFields) {
             expect(invoiceFullText).toContain(field)
       }
    }

}



