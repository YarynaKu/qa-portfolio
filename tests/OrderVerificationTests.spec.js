import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { Payment } from "../pages/Payment";
import { deleteUser } from "../pages/DeleteUser";
import { products, validUser, registerUser } from "../data/variables";

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

test.describe("Orders Tests", () => {

    test("12 Add Products in cart", async ({page}) => {

        await pm.menuBar.navigateToProducts()

           await test.step('Adding 1 and 2 products to the cart', async() => {

               await pm.productsPage.addProductById(1)

               await pm.productsPage.continueShoppingPopUpMessage()

               await pm.productsPage.addProductById(2)
           })

           await test.step('Viewing the cart', async() => {

              await pm.productsPage.goToCartPopUpMessage()

              await pm.productsPage.verifyProductsInCartById(products.product1.id,
              {
                    name: products.product1.name,
                    category: products.product1.category,
                    price: products.product1.price,
                    quantity: products.product1.quantity,
                    total: products.product1.total
              })

              await pm.productsPage.verifyProductsInCartById(products.product2.id,
              {
                    name: products.product2.name,
                    category: products.product2.category,
                    price: products.product2.price,
                    quantity: products.product2.quantity,
                    total: products.product2.total
              })
           })
        })

    test("13 Verify Product quantity in Cart", async ({page}) => {

               const captureName = await pm.addRandomProduct.clickRandomViewProduct()
               const isMatch = await pm.addRandomProduct.verifyProductDetails(captureName.productName)
               expect(isMatch).toBe(true)

               await pm.productDetails.setProductQuantity('4')

               await pm.productDetails.addToCart()

               await pm.productsPage.goToCartPopUpMessage()

               await pm.addRandomProduct.verifyProductInCart(captureName.productName)

            })

    test.only("14 Place Order: Register while Checkout", async ({page}) => {

    await test.step('Adding products to the cart', async() => {

        await pm.productsPage.addRandomProduct()

        await pm.productsPage.continueShoppingPopUpMessage()

        await pm.productsPage.addRandomProduct()
    })

    await test.step('View Cart', async() => {

        await pm.productsPage.goToCartPopUpMessage()

        await pm.cartPage.verifyCartHeading()

        await pm.cartPage.clickCheckOutBtn()

        await pm.cartPage.clickRegisterPopupCheckout()
    })

    await test.step('Register User', async() => {

    await pm.signupPage.signup(validUser.name, validUser.email)

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