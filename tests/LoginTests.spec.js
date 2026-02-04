import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise.js";
import { validUser, invalidUser } from "../data/variables.js";

let pm;

test.beforeEach(async ({page}) => {

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

    test.afterEach(async ({page}) => {
        await page.close()
    })

test.describe('Login Tests', () => {

    test(" 2 Login User with correct email and password", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await pm.loginPage.expectSuccessfulLogin();

    await pm.loginPage.login(validUser.email, validUser.password)
    await expect(page.getByText(validUser.name)).toBeVisible()

//    await page.getByRole('link', {name: 'Delete Account'}).click()
//    await expect(page.getByText('Account Deleted!')).toBeVisible()
    // await page.pause()
})

    test("3 Login User with incorrect email and password", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await pm.loginPage.expectSuccessfulLogin();

    await pm.loginPage.login(invalidUser.email, invalidUser.password)
    await pm.loginPage.expectLoginError()

    })

    test("4 Logout User", async ({page}) => {

        await page.getByRole('link', {name:'Signup / Login'}).click()
        await pm.loginPage.expectSuccessfulLogin();

        await pm.loginPage.login(validUser.email, validUser.password)
        await expect(page.getByText(validUser.name)).toBeVisible()

        await page.getByRole('link', {name: 'Logout'}).click()
        await pm.loginPage.expectSuccessfulLogin();

    })

})