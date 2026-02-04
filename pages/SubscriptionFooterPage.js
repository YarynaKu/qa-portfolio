import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class SubscriptionFooter {

    constructor(page) {
        this.actions = new CommonActions(page)

        this.subscriptionFooter = page.getByRole('heading', {name: 'Subscription'})
        this.subscriptionInputSelector = '#susbscribe_email'
        this.subscribeButtonSelector = '#subscribe'
        this.successMessage = page.getByText('You have been successfully subscribed!')
    }

    async subscribe(email){
        await this.actions.fill(this.subscriptionInputSelector, email)
        await this.actions.click(this.subscribeButtonSelector)
    }

    async expectSuccessfulSubscription(){
        await expect(this.successMessage).toBeVisible()
    }

    async expectSubscriptionFooter(){
        await expect(this.subscriptionFooter).toBeVisible()
    }

}