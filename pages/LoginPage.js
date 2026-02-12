import { expect } from "@playwright/test";

export default class LoginPage {

    constructor(page) {
        this.page = page;

        this.userEmailSelector = page.locator('[data-qa="login-email"]')
        this.userPasswordSelector = page.locator('[type="password"]')
        this.loginButtonSelector = page.locator('[data-qa="login-button"]')

        this.loginPageTitle = page.getByText('Login to your account')
        this.errorMessage = page.getByText('Your email or password is incorrect!')
    }

    async login(email, password){
        await this.userEmailSelector.fill(email)
        await this.userPasswordSelector.fill(password)
        await this.loginButtonSelector.click()
    }

    async expectLoginError(){
        await expect(this.errorMessage).toBeVisible()
    }

    async expectLoginPageVisible(){
        await expect(this.loginPageTitle).toBeVisible()
    }
}

