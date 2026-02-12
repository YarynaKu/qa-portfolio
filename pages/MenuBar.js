import { expect } from "@playwright/test";

export default class MenuBar {

    constructor(page) {
        this.page = page;

        this.homeLink = page.getByRole('listitem').filter({hasText: 'Home'})
        this.productsLink = page.getByRole('link', {name: 'Products'})
        this.cartLink = page.getByRole('link', {name: 'Cart'})
        this.contactUsLink = page.getByRole('link', {name: 'Contact us'})
        this.signupLoginLink = page.getByRole('link', {name:'Signup / Login'})
        this.logoutLink = page.getByRole('link', {name: 'Logout'})
        this.testCasesLink = page.getByRole('listitem').filter({hasText: 'Test Cases'})
    }

    async navigateToHome(){
        await this.homeLink.click()
    }

    async navigateToProducts(){
        await this.productsLink.click()
    }

    async navigateToCart(){
        await this.cartLink.click()
    }

    async navigateToContactUs(){
        await this.contactUsLink.click()
    }

    async navigateToSignupLogin(){
        await this.signupLoginLink.click()
    }

    async navigateToLogout(){
        await this.logoutLink.click()
    }

    async navigateToTestCases(){
        await this.testCasesLink.click()
    }


}