import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";


export default class MenuBar {

    constructor(page) {
        this.actions = new CommonActions(page)

 //       this.homeLink = page.getByRole('listitem').filter({hasText: 'Home'})
        this.productsLink = page.getByRole('link', {name: 'Products'})
        this.cartLink = page.getByRole('link', {name: 'Cart'})
        this.contactUsLink = page.getByRole('link', {name: 'Contact us'})
        this.signupLoginLink = page.getByRole('link', {name:'Signup / Login'})
        this.logoutLink = page.getByRole('link', {name: 'Logout'})
        this.testCasesLink = page.getByRole('listitem').filter({hasText: 'Test Cases'})
    }

    async navigateToHome(){
        await this.actions.click(this.homeLink)
    }

    async navigateToProducts(){
        await this.actions.click2(this.productsLink)
    }

    async navigateToCart(){
        await this.actions.click2(this.cartLink)
    }

    async navigateToContactUs(){
        await this.actions.click2(this.contactUsLink)
    }

    async navigateToSignupLogin(){
        await this.actions.click2(this.signupLoginLink)
    }

    async navigateToLogout(){
        await this.actions.click(this.logoutLink)
    }

    async navigateToTestCases(){
        await this.actions.click2(this.testCasesLink)
    }


}