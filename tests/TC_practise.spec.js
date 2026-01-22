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

const userData = {
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
        };



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


    test(" 6 Contact Us Form", async ({page}) => {
    
    await test.step('Navigate to Contact Us page', async () => {

        await page.getByRole('link', {name: 'Contact us'}).click()
        await expect(page.getByText('Get In Touch')).toBeVisible()
    });
    
    await test.step('Fill in details', async () => {

        await page.getByRole('textbox', { name: 'Name'}).fill(TEST_USER);
        await page.locator('[data-qa="email"]').fill(TEST_EMAIL);
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

        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', {name: 'Submit'}).click()

        await expect(page.locator('.status.alert.alert-success:has-text("Success! Your details have been submitted successfully.")')).toBeVisible()
        await page.locator('#form-section:has-text("Home")').click()

        await expect(page.getByAltText('Website for automation practice')).toBeVisible()

    })

    })

    test(" 7 Verify Test Cases Page", async ({page}) => {

    await page.getByRole('listitem').filter({hasText: " Test Cases"}).click();
    await expect(page.locator('h5:has-text("Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps")')).toBeVisible()

    }) 

    test("10 Verify Subscription in home page", async ({page}) => {

        await test.step('Verify Subscription', async() => {

            await expect(page.getByRole('heading', {name: 'Subscription'})).toBeVisible()
            await page.locator('id=susbscribe_email').fill(TEST_EMAIL)
            await page.locator('id=subscribe').click()
            await expect(page.getByText('You have been successfully subscribed!')).toBeVisible()
           })     
    })

    test("11 Verify Subscription in Cart page", async ({page}) => {
            
        await page.getByRole('link', {name: 'Cart'}).click();

            await test.step('Verify Subscription', async() => {

                await expect(page.getByRole('heading', {name: 'Subscription'})).toBeVisible()
                await page.locator('id=susbscribe_email').fill(TEST_EMAIL)
                await page.locator('id=subscribe').click()
                await expect(page.getByText('You have been successfully subscribed!')).toBeVisible()
            })

    })

    test("21 Add review on product", async({page}) => {
        await page.getByRole('link', {name: 'Products'}).click();

        await expect(page.getByRole('heading', {name: 'All Products'})).toBeVisible()
        await page.locator('a[href="/product_details/1"]').click()

        await expect(page.getByRole('link', {name: 'Write Your Review'})).toBeVisible()

        await page.getByRole('textbox', {name: 'Your Name'}).fill(TEST_USER)
        await page.locator('#email').fill(TEST_EMAIL)
        await page.getByRole('textbox', {name: 'Add Review Here!'}).fill('This is my review. Great product!')

        await page.getByRole('button', {name: 'Submit'}).click()

        await expect(page.getByText('Thank you for your review.')).toBeVisible()

    })

    test("22 Add to cart from Recommended items", async({page}) => {
        await expect(page.getByRole('heading', {name: 'Recommended items'})).toBeVisible()

        const items = page.locator('#recommended-item-carousel .item.active .productinfo')
        const count = await items.count()

        const randomIndex = Math.floor(Math.random() * count)
        const selectedItem = items.nth(randomIndex)
        const productName = await selectedItem.locator('p').innerText()

        await selectedItem.locator('a.add-to-cart').click()
        await page.locator('.modal-content').locator('a[href="/view_cart"]').click()
        await expect(page.locator('#cart_info_table td.cart_description h4 a', {hasText: productName })).toBeVisible()

    })

    test("23 Verify address details in checkout page", async({page}) => {


//        await page.getByRole('link', {name:'Signup / Login'}).click()
//        await expect(page.getByText('Login to your account')).toBeVisible();
//        await pm.loginPage.login(`${TEST_EMAIL}`, `${TEST_PASSWORD}`)
//        await expect(page.getByText(TEST_USER)).toBeVisible()
//        await page.getByRole('link', {name: 'Delete Account'}).click()


        await page.getByRole('link', {name:'Signup / Login'}).click()
        await expect(page.getByText('New User Signup!')).toBeVisible();

        await registerUser (page, {
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

        await expect(page.getByText(TEST_USER)).toBeVisible()

        const products = page.locator('.product-image-wrapper .overlay-content')
        const count = await products.count()
                const randomIndex = Math.floor(Math.random() * count)
                const selectedItem = products.nth(randomIndex)
                const productName = await selectedItem.locator('p').innerText()

        await page.waitForTimeout(5000)

        await selectedItem.locator('a.add-to-cart').click()

        await page.locator('.modal-content').locator('a[href="/view_cart"]').click()
        await expect(page.locator('#cart_info_table td.cart_description h4 a', {hasText: productName })).toBeVisible()

        await page.locator('#do_action .btn.btn-default.check_out').click()

        const deliveryAddress = page.locator('#address_delivery')

        await expect(deliveryAddress).toContainText(/your delivery address/i)
        await expect(deliveryAddress).toContainText(/Mrs\. YaTest User/i)
        await expect(deliveryAddress).toContainText(/Google/i)
        await expect(deliveryAddress).toContainText(/Silicon Valley/i)
        await expect(deliveryAddress).toContainText(/Guess what/i)
        await expect(deliveryAddress).toContainText(/Toronto Atlantica/i)
        await expect(deliveryAddress).toContainText(/46971/i)
        await expect(deliveryAddress).toContainText(/Canada/i)
        await expect(deliveryAddress).toContainText(/0375839284/i)

        const billingAddress = page.locator('#address_invoice')

        await expect(billingAddress).toContainText(/your billing address/i)
        await expect(billingAddress).toContainText(/Mrs\. YaTest User/i)
        await expect(billingAddress).toContainText(/Google/i)
        await expect(billingAddress).toContainText(/Silicon Valley/i)
        await expect(billingAddress).toContainText(/Guess what/i)
        await expect(billingAddress).toContainText(/Toronto Atlantica/i)
        await expect(billingAddress).toContainText(/46971/i)
        await expect(billingAddress).toContainText(/Canada/i)
        await expect(billingAddress).toContainText(/0375839284/i)

        await page.getByRole('link', {name: 'Delete Account'}).click()

    })

    test.only("24 Download Invoice after purchase order", async ({page}) => {

        const products = page.locator('.product-image-wrapper .overlay-content')

        const count = await products.count()
              const randomIndex = Math.floor(Math.random() * count)
              const selectedItem = products.nth(randomIndex)
              const productName = await selectedItem.locator('p').innerText()

        await products.first().waitFor({ state: 'visible' });

        await selectedItem.locator('a.add-to-cart').evaluate(el => el.click())

        await page.locator('.modal-content').locator('a[href="/view_cart"]').click()

        await expect(page.getByText("Shopping Cart")).toBeVisible()

        await page.locator('a[class="btn btn-default check_out"]').click()

        await page.locator('.modal-content').locator('a[href="/login"]').click()

        await page.getByPlaceholder('Name').fill(TEST_USER)
        await page.locator('input[data-qa="signup-email"]').fill(TEST_EMAIL)

        await page.getByRole('button', {name: 'Signup'}).click()

        await registerUser (page, userData);

        await page.getByRole('link', {name: 'Continue'}).click()
        await expect(page.getByText(TEST_USER)).toBeVisible()

        await page.getByRole('link', {name: 'Cart'}).click()
        await page.locator('a[class="btn btn-default check_out"]').click()

        const deliveryAddress = page.locator('#address_delivery')

        expect(deliveryAddress).toContainText(userData.firstname)
        expect(deliveryAddress).toContainText(userData.lastname)
        expect(deliveryAddress).toContainText(userData.company)
        expect(deliveryAddress).toContainText(userData.address)
        expect(deliveryAddress).toContainText(userData.address2)
        expect(deliveryAddress).toContainText(userData.city)
        expect(deliveryAddress).toContainText(userData.state)
        expect(deliveryAddress).toContainText(userData.zipcode)
        expect(deliveryAddress).toContainText(userData.mobilenumber)

        const billingAddress = page.locator('#address_invoice')

        expect(billingAddress).toContainText(userData.firstname)
        expect(billingAddress).toContainText(userData.lastname)
        expect(billingAddress).toContainText(userData.company)
        expect(billingAddress).toContainText(userData.address)
        expect(billingAddress).toContainText(userData.address2)
        expect(billingAddress).toContainText(userData.city)
        expect(billingAddress).toContainText(userData.state)
        expect(billingAddress).toContainText(userData.zipcode)
        expect(billingAddress).toContainText(userData.mobilenumber)

        await expect(page.locator('#cart_info td.cart_description h4 a', {hasText: productName })).toBeVisible()

        await page.locator('textarea[name="message"]').fill('Please, handle with care. Fragile item.')

        await page.getByRole('link', {name: 'Place Order'}).click()

            await Payment (page, {
                nameoncard: 'YaTest',
                cardnumber: '1234567890',
                cvc: '123',
                expmonth: '01',
                expyear: '01',
            });

        await page.getByRole('button', {name: 'Pay and Confirm Order'}).click()
        await expect(page.locator('.alert-success')).toHaveCount(1)

        await page.getByRole('link', {name: 'Download Invoice'}).click()

        const downloadPromise = page.waitForEvent('download');

        const download = await downloadPromise;

        expect(download.suggestedFilename()).toContain('invoice');

        const filePath = `downloads/${download.suggestedFilename()}`;
        await download.saveAs(filePath);

        await page.getByRole('link', {name: 'Continue'}).click()

        await page.getByRole('link', {name: 'Delete Account'}).click()

    })

















