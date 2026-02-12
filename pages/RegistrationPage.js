import { expect } from "@playwright/test";

export default class RegisterUser {

    constructor(page) {

        this.page = page;

        this.newUserTitleMrSelector = page.locator('#id_gender1')
        this.newUserTitleMrsSelector = page.locator('#id_gender2')
        this.newUserPasswordSelector = page.locator('#password')
        this.newUserDaysSelector = page.locator('#days')
        this.newUserMonthsSelector = page.locator('#months')
        this.newUserYearsSelector = page.locator('#years')
        this.newUserNewsletterSelector = page.locator('#newsletter')
        this.newUserOffersSelector = page.locator('#optin')
        this.newUserFirstNameSelector = page.locator('#first_name')
        this.newUserLastNameSelector = page.locator('#last_name')
        this.newUserCompanySelector = page.locator('#company')
        this.newUserAddressSelector = page.locator('#address1')
        this.newUserAddress2Selector = page.locator('#address2')
        this.newUserCountrySelector = page.locator('#country')
        this.newUserStateSelector = page.locator('#state')
        this.newUserCitySelector = page.locator('#city')
        this.newUserZipcodeSelector = page.locator('#zipcode')
        this.newUserMobileNumberSelector = page.locator('#mobile_number')
        this.createAccountButtonSelector = page.locator('[data-qa="create-account"]')
    }

    async registration(page, userData) {

        await this.newUserTitleMrsSelector.click()
        await this.newUserPasswordSelector.fill(userData.password);
        await this.newUserDaysSelector.selectOption(userData.day);
        await this.newUserMonthsSelector.selectOption(userData.month);
        await this.newUserYearsSelector.selectOption(userData.year);
        await this.newUserNewsletterSelector.check();
        await this.newUserOffersSelector.check();
        await this.newUserFirstNameSelector.fill(userData.firstname);
        await this.newUserLastNameSelector.fill(userData.lastname);
        await this.newUserCompanySelector.fill(userData.company);
        await this.newUserAddressSelector.fill(userData.address);
        await this.newUserAddress2Selector.fill(userData.address2);
        await this.newUserCountrySelector.selectOption(userData.country);
        await this.newUserStateSelector.fill(userData.state);
        await this.newUserCitySelector.fill(userData.city);
        await this.newUserZipcodeSelector.fill(userData.zipcode);
        await this.newUserMobileNumberSelector.fill(userData.mobilenumber);

        await this.createAccountButtonSelector.click();

    }
}