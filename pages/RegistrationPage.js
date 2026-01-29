import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class RegisterUser {

    constructor(page) {

        this.actions = new CommonActions(page)
        this.newUserTitleMrSelector = '#id_gender1'
        this.newUserTitleMrsSelector = '#id_gender2'
        this.newUserPasswordSelector = '#password'
        this.newUserDaysSelector = '#days'
        this.newUserMonthsSelector = '#months'
        this.newUserYearsSelector = '#years'
        this.newUserNewsletterSelector = '#newsletter'
        this.newUserOffersSelector = '#optin'
        this.newUserFirstNameSelector = '#first_name'
        this.newUserLastNameSelector = '#last_name'
        this.newUserCompanySelector = '#company'
        this.newUserAddressSelector = '#address1'
        this.newUserAddress2Selector = '#address2'
        this.newUserCountrySelector = '#country'
        this.newUserStateSelector = '#state'
        this.newUserCitySelector = '#city'
        this.newUserZipcodeSelector = '#zipcode'
        this.newUserMobileNumberSelector = '#mobile_number'
        this.createAccountButtonSelector = '[data-qa="create-account"]'
    }

    async registration(page, userData) {

        await this.actions.click(this.newUserTitleMrsSelector);
        await this.actions.fill(this.newUserPasswordSelector, userData.password);
        await this.actions.selectOption(this.newUserDaysSelector, userData.day);
        await this.actions.selectOption(this.newUserMonthsSelector, userData.month);
        await this.actions.selectOption(this.newUserYearsSelector, userData.year);
        await this.actions.isChecked(this.newUserNewsletterSelector);
        await this.actions.isChecked(this.newUserOffersSelector);
        await this.actions.fill(this.newUserFirstNameSelector, userData.firstname);
        await this.actions.fill(this.newUserLastNameSelector, userData.lastname);
        await this.actions.fill(this.newUserCompanySelector, userData.company);
        await this.actions.fill(this.newUserAddressSelector, userData.address);
        await this.actions.fill(this.newUserAddress2Selector, userData.address2);
        await this.actions.selectOption(this.newUserCountrySelector, userData.country);
        await this.actions.fill(this.newUserStateSelector, userData.state);
        await this.actions.fill(this.newUserCitySelector, userData.city);
        await this.actions.fill(this.newUserZipcodeSelector, userData.zipcode);
        await this.actions.fill(this.newUserMobileNumberSelector, userData.mobilenumber);

        await this.actions.click(this.createAccountButtonSelector);

    }
}