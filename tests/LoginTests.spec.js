import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise.js";

let pm;

let TEST_EMAIL = 'testya@gmail.com';
let TEST_PASSWORD = 'YaTestPassword!';
let TEST_USER = 'YaTestUser';
let INCORR_TEST_PASSWORD = 'YayaTestPassword!';
let INCORR_TEST_EMAIL = 'testyaya@gmail.com';


test.beforeEach(async ({page}) => {

    await page.goto("https://automationexercise.com/")
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

test.describe.only('Login Tests', () => {

    test(" 2 Login User with correct email and password", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('Login to your account')).toBeVisible();

    await pm.loginPage.login(`${TEST_EMAIL}`, `${TEST_PASSWORD}`)

    await expect(page.getByText(TEST_USER)).toBeVisible()

//    await page.getByRole('link', {name: 'Delete Account'}).click()
//    await expect(page.getByText('Account Deleted!')).toBeVisible()
    // await page.pause()
})

    test("3 Login User with incorrect email and password", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('Login to your account')).toBeVisible();

    await pm.loginPage.login(INCORR_TEST_EMAIL, INCORR_TEST_PASSWORD)

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()

    })

    test("4 Logout User", async ({page}) => {

        await page.getByRole('link', {name:'Signup / Login'}).click()
        await expect(page.getByText('Login to your account')).toBeVisible();

        await pm.loginPage.login(TEST_EMAIL, TEST_PASSWORD)
        await expect(page.getByText(TEST_USER)).toBeVisible()

        await page.getByRole('link', {name: 'Logout'}).click()
        await expect(page.getByText('Login to your account')).toBeVisible();

    })

})