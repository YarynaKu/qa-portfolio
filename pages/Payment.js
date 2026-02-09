import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class Payment{

     constructor(page){
        this.actions = new CommonActions(page)
        this.page = page

        this.cardName = '[name="name_on_card"]'
        this.cardNumber = '[name="card_number"]'
        this.cvc = '[data-qa="cvc"]'
        this.expMonth = '[data-qa="expiry-month"]'
        this.expYear = '[data-qa="expiry-year"]'
        this.payBtn = '[data-qa="pay-button"]'
        this.successMessage = '[data-qa="order-placed"]'
     }


     async enterPaymentDetails(cardName, cardNumber, cvc, expMonth, expYear) {

        await this.actions.fill(this.cardName, cardName);
        await this.actions.fill(this.cardNumber, cardNumber);
        await this.actions.fill(this.cvc, cvc);
        await this.actions.fill(this.expMonth, expMonth);
        await this.actions.fill(this.expYear, expYear);
     }

     async clickPayAndConfirm() {
        await this.actions.click(this.payBtn);
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