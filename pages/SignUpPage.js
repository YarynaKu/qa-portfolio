import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";


export default class signupPage {
    constructor(page) {
        this.actions = new CommonActions(page)
        this.newUserNameSelector = '[data-qa="signup-name"]'
        this.newUserEmailSelector = '[data-qa="signup-email"]'
    }

    async signup(name, email){
        await this.actions.fill(this.newUserNameSelector, name)
        await this.actions.fill(this.newUserEmailSelector, email)
        await this.actions.click('[data-qa="signup-button"]')
    }
}

