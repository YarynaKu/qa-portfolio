import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";


export default class LoginPage {

    constructor(page) {
        this.actions = new CommonActions(page)
        this.userEmailSelector = '[data-qa="login-email"]'
        this.userPasswordSelector = '[type="password"]'
        this.loginButtonSelector = '[data-qa="login-button"]'
    }

    async login(email, password){
        await this.actions.fill(this.userEmailSelector, email)
        await this.actions.fill(this.userPasswordSelector, password)
        await this.actions.click(this.loginButtonSelector)
    }
}

