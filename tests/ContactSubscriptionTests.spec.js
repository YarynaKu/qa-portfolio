import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { validUser } from "../data/users.js";

let pm;

    test.beforeEach(async ({page}) =>{

    await page.goto("/")
    await expect(page.getByAltText('Website for automation practice')).toBeVisible()

    page.on('popup', async popup => {
        await popup.waitForLoadState();
        console.log(await popup.title())
    })

    await page.getByText('This site asks for consent to use your data').click();
    await page.getByRole('button', {name: 'Consent'}).click();

    pm = new PomManager(page)
})

//    test.afterEach(async ({page}) => {
//        await page.close()
//    })

test.describe("Contact Us and Subscription Tests", () => {

    test("6 Contact Us Form", async ({page}) => {

        await pm.menuBar.navigateToContactUs()
        await expect(page.getByText('Get In Touch')).toBeVisible()
    
        await test.step('Fill in details', async () => {

        await page.getByRole('textbox', { name: 'Name'}).fill(validUser.name);
        await page.locator('[data-qa="email"]').fill(validUser.email);
        await page.getByRole('textbox', { name: 'Subject'}).fill('Testing Contact Us Form');
        await page.locator('id=message').fill('I am testing Contact Us Form');

    });

        await test.step('Upload file', async () => {

        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator('[name="upload_file"]').click()

        const path = require('path');

        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join('/Users/yuriikushniruk/Documents/Courses/Testing', 'testContactUs.doc'));
    })

        await test.step('Submit information', async () => {

        await page.waitForTimeout(2000);
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', {name: 'Submit'}).click()

        await expect(page.locator('.status.alert.alert-success:has-text("Success! Your details have been submitted successfully.")')).toBeVisible()
        await page.locator('#form-section:has-text("Home")').click()

        await expect(page.getByAltText('Website for automation practice')).toBeVisible()
    })
    })

    test("7 Verify Test Cases Page", async ({page}) => {

    await pm.menuBar.navigateToTestCases()
    await expect(page.locator('h5:has-text("Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps")')).toBeVisible()
    }) 

    test("10 Verify Subscription in home page", async ({page}) => {

        await pm.subscriptionFooter.expectSubscriptionFooter()
        await pm.subscriptionFooter.subscribe(validUser.email)
        await pm.subscriptionFooter.expectSuccessfulSubscription()
    })

    test("11 Verify Subscription in Cart page", async ({page}) => {
            
        await pm.menuBar.navigateToCart()

            await test.step('Verify Subscription', async() => {
                await pm.subscriptionFooter.expectSubscriptionFooter()
                await pm.subscriptionFooter.subscribe(validUser.email)
                await pm.subscriptionFooter.expectSuccessfulSubscription()
            })
    })

    test("25 Verify scroll up using 'Arrow' button and scroll down functionality", async ({page}) => {

        await page.getByText('Copyright © 2021 All rights reserved').scrollIntoViewIfNeeded();
        await pm.subscriptionFooter.expectSubscriptionFooter()
        await page.locator('#scrollUp').click()
        await expect(page.locator('#slider-carousel .carousel-inner h2', {hasText: 'Full-Fledged practice website for Automation Engineers'}).first()).toBeVisible()
    })

    test(" 26 Verify scroll up without 'Arrow' button and scroll down functionality", async ({page}) => {

        await page.getByText('Copyright © 2021 All rights reserved').scrollIntoViewIfNeeded();
        await pm.subscriptionFooter.expectSubscriptionFooter()
        await page.locator('#header').scrollIntoViewIfNeeded()
        await expect(page.locator('#slider-carousel .carousel-inner h2', {hasText: 'Full-Fledged practice website for Automation Engineers'}).first()).toBeVisible()
    })

})

















