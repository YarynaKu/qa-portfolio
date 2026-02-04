import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
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

    test("12 Add Products in cart", async ({page}) => {

            await page.getByRole('link', {name: 'Products'}).click();

                await test.step('Adding products to the cart', async() => {

                    await page.locator('.product-image-wrapper').nth(0).hover()
                    await page.locator('div.overlay-content').locator('a[data-product-id="1"]').click()

                    await page.getByRole('button', {name: 'Continue Shopping'}).click()

                    await page.locator('.product-image-wrapper').nth(1).hover()
                    await page.locator('div.overlay-content').locator('a[data-product-id="2"]').click()

                })

                await test.step('Viewing the cart', async() => {

                    await page.getByRole('link', {name: "View Cart"}).click()

                    const Prod1 = page.locator('tr[id="product-1"]')
                    const Prod2 = page.locator('tr[id="product-2"]')

                    await expect(Prod1).toBeVisible()
                    await expect(Prod2).toBeVisible()

                    await expect(Prod1.locator('td.cart_price')).toContainText('Rs. 500')
                    await expect(Prod1.locator('td.cart_quantity')).toContainText('1')
                    await expect(Prod1.locator('td.cart_total')).toContainText('Rs. 500')

                    await expect(Prod2.locator('td.cart_price')).toContainText('Rs. 400')
                    await expect(Prod2.locator('td.cart_quantity')).toContainText('1')
                    await expect(Prod2.locator('td.cart_total')).toContainText('Rs. 400')

                })
        })

    test("13 Verify Product quantity in Cart", async ({page}) => {

                await page.locator('a[href="/product_details/5"]').click()

                await expect(page.locator('img[src="/get_product_picture/5"]')).toBeVisible()

                await page.locator('#quantity').fill('4')

                await page.getByRole('button', {name: 'Add to cart'}).click()

                await page.getByRole('link', {name: "View Cart"}).click()

                const Prod5 = page.locator('tr[id="product-5"]')

                await expect(Prod5).toBeVisible()

                await expect(Prod5.locator('td.cart_quantity')).toContainText('4')

            })

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


    test("17 Remove Products from Cart", async({page}) => {

                    await test.step('Adding products to the cart', async() => {

                        await page.locator('.product-image-wrapper').nth(0).hover()
                        await page.locator('div.overlay-content').locator('a[data-product-id="1"]').click()

                        await page.getByRole('button', {name: 'Continue Shopping'}).click()

                        await page.locator('.product-image-wrapper').nth(1).hover()
                        await page.locator('div.overlay-content').locator('a[data-product-id="2"]').click()
                    })

                    await page.getByRole('link', {name: 'Cart'}).click()

                    await expect(page.locator('li[class="active"]')).toHaveText('Shopping Cart')

                    await page.locator('[data-product-id="1"]').click()

                    await expect(page.locator('[data-product-id="1"]')).toBeHidden()

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


    test("24 Download Invoice after purchase order", async ({page}) => {

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


})