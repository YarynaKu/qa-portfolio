import { expect } from '@playwright/test';
import ProductsPage from "./ProductsPage.js"

export default class ProductDetails {
    constructor(page) {

        this.page = page;

        this.writeReviewSelector = page.locator('a[href="#reviews"]')
        this.thanksMessage = page.getByText('Thank you for your review.')
        this.quantitySelector = page.locator('#quantity')

        this.productInfo = page.locator('div.product-information')
        }

    async verifyWriteReviewSection() {
        await expect(this.writeReviewSelector).toBeVisible();
    }

    async writeReview(name, email, review) {
        await this.page.getByRole('textbox', { name: 'Your Name' }).fill(name);
        await this.page.locator('#email').fill(email);
        await this.page.getByRole('textbox', { name: 'Add Review Here!' }).fill(review);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async verifyReviewSubmission() {
        await expect(this.thanksMessage).toBeVisible();
    }

    async setProductQuantity(quantity) {
        await this.quantitySelector.fill(quantity);
    }

    async addToCart() {
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
    }

    async verifyProdInfoDetails(productId, expected){
        await expect(this.productInfo).toBeVisible();

        const prodDetails = this.page.locator('div.product-information')

        await expect(prodDetails.locator('h2')).toHaveText(expected.name);
        await expect(prodDetails.locator('p:has-text("Category")')).toContainText(expected.category);
        await expect(prodDetails.locator('span span:has-text("Rs.")')).toHaveText(expected.price);
        await expect(prodDetails.locator('input[type="number"]')).toHaveValue(expected.quantity);
        await expect(prodDetails.locator('p:has(b:has-text("Availability"))')).toContainText(expected.availability);
        await expect(prodDetails.locator('p:has(b:has-text("Condition"))')).toContainText(expected.condition);
        await expect(prodDetails.locator('p:has(b:has-text("Brand"))')).toContainText(expected.brand);
    }


}