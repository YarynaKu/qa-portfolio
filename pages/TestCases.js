import { expect } from "@playwright/test";

export default class TestCasesPage{
    constructor(page){
         this.page = page;
    }

    async expectVisibleTestCasePage(){
         await expect(this.page.locator('h5:has-text("Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps")')).toBeVisible()
    }
}