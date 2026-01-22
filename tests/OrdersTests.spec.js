import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { registerUser } from "../pages/Registration";
import { Payment } from "../pages/Payment";
import { deleteUser } from "../pages/DeleteUser";

let pm;

let TEST_USER = 'YaTestUser';
let TEST_EMAIL = 'testya@gmail.com';
let TEST_PASSWORD = 'YaTestPassword!';
let INCORR_TEST_PASSWORD = 'YayaTestPassword!';
let INCORR_TEST_EMAIL = 'testyaya@gmail.com';



test.beforeEach(async ({page}) =>{


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

test.describe("Orders Tests", () => {

    test("14 Place Order: Register while Checkout", async ({page}) => {

    await test.step('Adding products to the cart', async() => {

        await page.locator('.product-image-wrapper').nth(0).hover()
        await page.locator('div.overlay-content').locator('a[data-product-id="1"]').click()

        await page.getByRole('button', {name: 'Continue Shopping'}).click()

        await page.locator('.product-image-wrapper').nth(1).hover()
        await page.locator('div.overlay-content').locator('a[data-product-id="2"]').click()
    })

    await test.step('View Cart', async() => {

        await page.getByRole('link', {name: "View Cart"}).click()

        await expect(page.locator('li[class="active"]')).toHaveText('Shopping Cart')

        await page.locator('a[class="btn btn-default check_out"]').click()

        await page.locator('div.modal-content').locator('a[href="/login"]').click()
    })

    await test.step('Register User', async() => {

        await registerUser(page, {
            password: 'YaTestPassword!',
            firstname: 'YaTest',
            lastname: 'User',
            company: 'Google',
            address: 'Silicon Valley',
            address2: 'Guess what',
            state: 'Atlantica',
            city: 'Toronto',
            zipcode: '46971',
            mobilenumber: '0375839284',
    });

        await page.getByRole('link', {name: 'Continue'}).click()
    })

    await test.step('Place Order', async() => {

        await expect(page.getByText(TEST_USER)).toBeVisible()

        await page.getByRole('link', {name: 'Cart'}).click()

        await page.locator('a[class="btn btn-default check_out"]').click()

        await expect(page.getByRole('heading', {name: 'Address Details'})).toBeVisible()

        await expect(page.getByRole('heading', {name: 'Review Your Order'})).toBeVisible()

        await page.locator('textarea[class="form-control"]').fill('Hello! Please put it in a gift bag')

        await page.getByRole('link', {name: 'Place Order'}).click()

    })

    await test.step('Proceed with a payment', async() => {

        await Payment (page, {
            nameoncard: 'YaTest',
            cardnumber: '1234567890',
            cvc: '123',
            expmonth: '01',
            expyear: '01',
    });

    await expect(page.locator('.alert-success')).toHaveCount(1)
    })

    await deleteUser(page)

    })

    test("15 Place Order: Register before Checkout", async({page}) => {

        await page.getByRole('link', {name:'Signup / Login'}).click()

        await registerUser(page, {
            password: 'YaTestPassword!',
            firstname: 'YaTest',
            lastname: 'User',
            company: 'Google',
            address: 'Silicon Valley',
            address2: 'Guess what',
            state: 'Atlantica',
            city: 'Toronto',
            zipcode: '46971',
            mobilenumber: '0375839284',
        })

        await page.getByRole('link', {name: 'Continue'}).click()

        await expect(page.getByText(TEST_USER)).toBeVisible()

        await test.step('Adding products to the cart', async() => {

            await page.locator('.product-image-wrapper').nth(0).hover()
            await page.locator('div.overlay-content').locator('a[data-product-id="1"]').click()
        })

        await page.getByRole('link', {name: 'Cart'}).click()

        await expect(page.locator('li[class="active"]')).toHaveText('Shopping Cart')

        await page.locator('a[class="btn btn-default check_out"]').click()

        await expect(page.getByRole('heading', {name: 'Address Details'})).toBeVisible()

        await expect(page.getByRole('heading', {name: 'Review Your Order'})).toBeVisible()

        await page.locator('textarea[class="form-control"]').fill('Hello! Please put it in a gift bag')

        await page.getByRole('link', {name: 'Place Order'}).click()

        await test.step('Proceed with a payment', async() => {

            await Payment (page, {
                nameoncard: 'YaTest',
                cardnumber: '1234567890',
                cvc: '123',
                expmonth: '01',
                expyear: '01',
            });

        await expect(page.locator('.alert-success')).toHaveCount(1)
    })

        await deleteUser(page)
    })

    test("16 Place Order: Login Before Checkout", async({page}) => {

        await page.getByRole('link', {name:'Signup / Login'}).click()
        await expect(page.getByText('Login to your account')).toBeVisible();

        await pm.loginPage.login(`${TEST_EMAIL}`, `${TEST_PASSWORD}`)
        await expect(page.getByText(TEST_USER)).toBeVisible()

        await test.step('Adding products to the cart', async() => {

            await page.locator('.product-image-wrapper').nth(0).hover()
            await page.locator('div.overlay-content').locator('a[data-product-id="1"]').click()
        })

        await page.getByRole('link', {name: 'Cart'}).click()

        await expect(page.locator('li[class="active"]')).toHaveText('Shopping Cart')

        await page.locator('a[class="btn btn-default check_out"]').click()

        await expect(page.getByRole('heading', {name: 'Address Details'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Review Your Order'})).toBeVisible()

        await page.locator('textarea[class="form-control"]').fill('Hello! Please put it in a gift bag')

        await page.getByRole('link', {name: 'Place Order'}).click()

        await test.step('Proceed with a payment', async() => {

            await Payment (page, {
                nameoncard: 'YaTest',
                cardnumber: '1234567890',
                cvc: '123',
                expmonth: '01',
                expyear: '01',
            });

        await expect(page.locator('.alert-success')).toHaveCount(1)
        })

        await deleteUser(page)














        })

})