import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";


export default class SignupPage {
    constructor(page) {

        this.actions = new CommonActions(page)

        this.newUserNameSelector = '[data-qa="signup-name"]'
        this.newUserEmailSelector = '[data-qa="signup-email"]'
        this.signupButtonSelector = '[data-qa="signup-button"]'

        this.errorMessage = page.getByText('Email Address already exist!')
    }

    async signup(name, email){
        await this.actions.fill(this.newUserNameSelector, name)
        await this.actions.fill(this.newUserEmailSelector, email)
        await this.actions.click(this.signupButtonSelector)
    }

    async expectSignupError(){
        await expect(this.errorMessage).toBeVisible()
    }
}

