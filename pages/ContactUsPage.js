import { expect } from "@playwright/test";

export default class ContactUsPage{
    constructor(page){
         this.page = page;

         this.userNameSelector =  page.getByRole('textbox', { name: 'Name'})
         this.userEmailSelector = page.locator('[data-qa="email"]')
         this.subjectSelector = page.getByRole('textbox', { name: 'Subject'})
         this.messageSelector = page.locator('id=message')

         this.uploadInput = page.locator('input[name="upload_file"]')
         this.submitBtn = page.locator('[data-qa="submit-button"]');
         this.successMessage = page.locator('.status.alert-success')

    }

    async fillForm(name, email, subject, message){
         await this.userNameSelector.fill(name)
         await this.userEmailSelector.fill(email);
         await this.subjectSelector.fill(subject);
         await this.messageSelector.fill(message);
    }

    async uploadFile(filePath){
        await this.uploadInput.setInputFiles(filePath)
        const filesCount = await this.uploadInput.evaluate(el => el.files.length);
        if (filesCount === 0) throw new Error("File failed to attach to input");
    }

    async submit(){
        await this.submitBtn.click()
    }

    async expectSuccessMessage(){
        await this.successMessage.waitFor({ state: 'visible', timeout:10000 })
        await expect(this.successMessage).toBeVisible()
    }

    }
