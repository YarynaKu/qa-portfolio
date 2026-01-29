import { test, expect } from "@playwright/test"
import  PomManager  from "../pages/POM_practise";
import { Payment } from "../pages/Payment";
import { validUser, registeredUser } from "../data/users.js";

let pm;

test.beforeEach(async ({page}) =>{

    await page.goto("/login")
    await expect(page.getByAltText('Website for automation practice')).toBeVisible()

    page.on('popup', async popup => {
        await popup.waitForLoadState();
        console.log(await popup.title())
    })

    await page.getByText('This site asks for consent to use your data').click();
    await page.getByRole('button', {name: 'Consent'}).click();

    pm = new PomManager(page)
})

test.describe('Register User Tests', () => {

    test(" 1 Register User", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('New User Signup!')).toBeVisible();

    await pm.signupPage.signup(validUser.name, validUser.email)

    await expect(page.getByText('Enter Account Information')).toBeVisible()

    await pm.registerUser.registration (page, {

        password: validUser.password,
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
        mobilenumber: registeredUser.mobileNumber,

    });

    await page.getByRole('link', {name: 'Continue'}).click()

    await expect(page.getByText(validUser.name)).toBeVisible()

//    await deleteUser(page)
})

    test(" 5 Register User with existing email", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('New User Signup!')).toBeVisible();

    await pm.signupPage.signup(validUser.name, validUser.email)

    await pm.signupPage.expectSignupError();

    })

})