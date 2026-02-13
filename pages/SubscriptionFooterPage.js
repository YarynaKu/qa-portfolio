import { expect } from "@playwright/test";

export default class SubscriptionFooter {

    constructor(page) {
        this.page = page;

        this.subscriptionFooter = page.getByRole('heading', {name: 'Subscription'})
        this.subscriptionInputSelector = page.locator('#susbscribe_email')
        this.subscribeButtonSelector = page.locator('#subscribe')
        this.successMessage = page.getByText('You have been successfully subscribed!')

        this.footerText = page.getByText('Copyright © 2021 All rights reserved')
        this.scrollArrow = page.locator('#scrollUp')
        this.verifyTopText = page.locator('#slider-carousel .carousel-inner h2', {hasText: 'Full-Fledged practice website for Automation Engineers'})

        this.headerText = page.locator('#header')
    }

    async subscribe(email){
        await this.subscriptionInputSelector.fill(email)
        await this.subscribeButtonSelector.click()
    }

    async expectSuccessfulSubscription(){
        await expect(this.successMessage).toBeVisible()
    }

    async expectSubscriptionFooter(){
        await expect(this.subscriptionFooter).toBeVisible()
    }

    async navigateToFooterText(){
        await this.footerText.scrollIntoViewIfNeeded()
    }

    async scrollUpWithArrow(){
        await this.scrollArrow.click()
    }

    async verifySuccessTopText(){
        await expect(this.verifyTopText.first()).toBeVisible()
    }

    async navigateToHeaderText(){
        await this.headerText.scrollIntoViewIfNeeded()
    }

}