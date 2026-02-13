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

    pm = new PomManager(page)

    await pm.basePage.acceptConsent()

    await pm.menuBar.navigateToSignupLogin()
    await pm.loginPage.expectLoginPageVisible();
})


test.describe('Login Tests', () => {

    test("Login User with correct email and password", async ({page}) => {
        await test.step("Login with valid credentials", async() => {
            await pm.loginPage.login(validUser.email, validUser.password)
        })

        await test.step("Verify user is logged in", async() => {
            await expect(page.getByText(validUser.name)).toBeVisible()
        })

//        await test.step("Delete user", async() => {
//            await pm.deleteUser.deleteUser()
//        })
    })

    test("Login User with incorrect email and password", async ({page}) => {
        await test.step("Login with invalid credentials", async() => {
            await pm.loginPage.login(invalidUser.email, invalidUser.password)
        })

        await test.step("Verify expected login error", async() => {
            await pm.loginPage.expectLoginError()
        })
    })

    test("Logout User", async ({page}) => {
        await test.step("Login with valid credentials", async() => {
            await pm.loginPage.login(validUser.email, validUser.password)
        })

        await test.step("Verify user is logged in", async() => {
            await expect(page.getByText(validUser.name)).toBeVisible()
        })

        await test.step("Verify successful user logout", async() => {
            await pm.menuBar.navigateToLogout()
            await pm.loginPage.expectLoginPageVisible();
        })
    })
})