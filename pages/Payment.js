import { expect } from "@playwright/test";

export default class Payment{

     constructor(page){

        this.page = page

        this.cardName = page.locator('[name="name_on_card"]')
        this.cardNumber = page.locator('[name="card_number"]')
        this.cvc = page.locator('[data-qa="cvc"]')
        this.expMonth = page.locator('[data-qa="expiry-month"]')
        this.expYear = page.locator('[data-qa="expiry-year"]')
        this.payBtn = page.locator('[data-qa="pay-button"]')
        this.successMessage = page.locator('[data-qa="order-placed"]')
     }


     async enterPaymentDetails(cardName, cardNumber, cvc, expMonth, expYear) {

        await this.cardName.fill(cardName);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expMonth.fill(expMonth);
        await this.expYear.fill(expYear);
     }

     async clickPayAndConfirm() {
        await this.payBtn.click();
     }

     async verifyPaymentSuccess() {
        await expect(this.page.locator('.alert-success')).toHaveCount(1);
     }

     async downloadInvoice(){

        const fs = require('fs');
        const path = require('path');

        const [download] = await Promise.all([
              this.page.waitForEvent('download'),
              this.page.getByRole('link', {name: 'Download Invoice'}).click()
        ])

        const fileName = download.suggestedFilename();
        expect(fileName).toContain('invoice');

        const tempPath = await download.path();
        const destPath = path.join('downloads', fileName);

        fs.mkdirSync('downloads', { recursive: true });
        fs.copyFileSync(tempPath, destPath);

        console.log('Invoice saved at:', destPath);

     }


}