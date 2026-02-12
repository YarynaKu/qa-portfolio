import { expect } from "@playwright/test";

export default class DeleteUser{
    constructor(page){

        this.page = page;
    }

    async deleteUser(){
        await this.page.getByRole('link', {name: 'Delete Account'}).click()
        await expect(this.page.getByText('Account Deleted!')).toBeVisible()
        await this.page.getByRole('link', {name: 'Continue'}).click()
    }
}
