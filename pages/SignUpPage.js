import { expect } from "@playwright/test";

export default class SignupPage {
    constructor(page) {

        this.page = page;

        this.newUserNameSelector = page.locator('[data-qa="signup-name"]')
        this.newUserEmailSelector = page.locator('[data-qa="signup-email"]')
        this.signupButtonSelector = page.locator('[data-qa="signup-button"]')

        this.errorMessage = page.getByText('Email Address already exist!')
    }

    async signup(name, email){
        await this.newUserNameSelector.fill(name)
        await this.newUserEmailSelector.fill(email)
        await this.signupButtonSelector.click( { timeout: 10000 })
    }

    async expectSignupError(){
        await expect(this.errorMessage).toBeVisible()
    }
}

