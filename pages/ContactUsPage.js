import { expect } from "@playwright/test";

export default class ContactUsPage{
    constructor(page){
         this.page = page;

         this.userNameSelector =  page.getByRole('textbox', { name: 'Name'})
         this.userEmailSelector = page.locator('[data-qa="email"]')
         this.subjectSelector = page.getByRole('textbox', { name: 'Subject'})
         this.messageSelector = page.locator('id=message')

         this.uploadInput = page.locator('input[type="file"]')
         this.submitBtn = page.getByRole('button', {name: 'Submit'})
         this.successMessage = page.locator('.status.alert.alert-success:has-text("Success! Your details have been submitted successfully.")')

    }

    async fillForm(name, email, subject, message){
         await this.userNameSelector.fill(name)
         await this.userEmailSelector.fill(email);
         await this.subjectSelector.fill(subject);
         await this.messageSelector.fill(message);
    }

    async uploadFile(filePath){
         await this.uploadInput.setInputFiles(filePath)
    }

    async submit(){
        await this.submitBtn.click()
    }

    async expectSuccessMessage(){
        await this.successMessage.waitFor({ state: 'visible', timeout:10000 })
        await expect(this.successMessage).toBeVisible()
    }


}