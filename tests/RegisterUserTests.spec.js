import { test, expect } from "@playwright/test"
import  PomManager  from "../pages/POM_practise";
import { validUser, validNewUser, registeredUser } from "../data/variables.js";

let pm;

test.beforeEach(async ({page}) =>{

    await page.goto("/")
    await expect(page.getByAltText('Website for automation practice')).toBeVisible()

    page.on('popup', async popup => {
        await popup.waitForLoadState();
        console.log(await popup.title())
    })

    pm = new PomManager(page)

    await pm.basePage.acceptConsent()
})

test.describe('Register User Tests', () => {

    test("Register User", async ({page}) => {
        await test.step("Navigate to SignUp/Login page", async() => {
            await pm.menuBar.navigateToSignupLogin()
            await expect(page.getByText('New User Signup!')).toBeVisible();
        })

        await test.step("Sign up with valid credentials", async() => {
            await pm.signupPage.signup(validNewUser.name, validNewUser.email)
            await expect(page.getByText('Enter Account Information')).toBeVisible();
        })

        await test.step("Register a new user with valid credentials", async() => {
            await pm.registerUser.registration (page, {
                password: validNewUser.password,
                day: registeredUser.birthDate,
                month: registeredUser.birthMonth,
                year: registeredUser.birthYear,
                firstname: registeredUser.firstName,
                lastname: registeredUser.lastName,
                company: registeredUser.company,
                address: registeredUser.address,
                address2: registeredUser.address2,
                country: registeredUser.country,
                state: registeredUser.state,
                city: registeredUser.city,
                zipcode: registeredUser.zipcode,
                mobilenumber: registeredUser.mobileNumber
            });
        })
            await page.getByRole('link', {name: 'Continue'}).click()

        await test.step("Verify user is logged in", async() => {
            await expect(page.getByText(validNewUser.name)).toBeVisible()
        })

//        await test.step("Delete user", async() => {
//            await pm.deleteUser.deleteUser()
//        })
    })

    test("Register User with existing email", async ({page}) => {
        await test.step("Navigate to SignUp/Login page", async() => {
            await pm.menuBar.navigateToSignupLogin()
            await expect(page.getByText('New User Signup!')).toBeVisible();
        })

        await test.step("Verify user is logged in", async() => {
            await pm.signupPage.signup(validNewUser.name, validNewUser.email)
        })

        await test.step("Verify expected login error", async() => {
            await pm.signupPage.expectSignupError();
        })
    })
})