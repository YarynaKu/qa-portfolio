import { expect } from "@playwright/test";

export default class BasePage{
    constructor(page){
        this.page = page;
    }

    async acceptConsent(){
        await this.page.getByText('This site asks for consent to use your data').click();
        await this.page.getByRole('button', {name: 'Consent'}).click();
    }
}