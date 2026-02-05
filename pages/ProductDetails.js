import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';

export default class ProductDetails {
    constructor(page) {
        this.actions = new CommonActions(page);
        this.page = page;

        this.writeReviewSelector = 'a[href="#reviews"]'
        this.thanksMessage = page.getByText('Thank you for your review.')

    }

    async verifyWriteReviewSection() {
        await expect(this.page.locator(this.writeReviewSelector)).toBeVisible();
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
}