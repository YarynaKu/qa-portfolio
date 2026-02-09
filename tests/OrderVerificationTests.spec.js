import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { Payment } from "../pages/Payment";
import { deleteUser } from "../pages/DeleteUser";
import { products, validUser, registeredUser, payCart, expectedAddressFields } from "../data/variables";

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

    test("14 Place Order: Register while Checkout", async ({page}) => {

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

        await expect(page.getByText(validUser.name)).toBeVisible()

        await pm.menuBar.navigateToCart()

        await pm.cartPage.clickCheckOutBtn()

        await pm.cartPage.verifyAddressDetailsHeading()
        await pm.cartPage.verifyReviewOrderHeading()

        await pm.cartPage.writeCommentBox('Hello! Please put it in a gift bag')

    })

    await test.step('Proceed with a payment', async() => {

        await pm.payment.enterPaymentDetails(
            payCart.cardName,
            payCart.cardNumber,
            payCart.cvc,
            payCart.expMonth,
            payCart.expYear
        )

        await pm.payment.clickPayAndConfirm()
        await pm.payment.verifyPaymentSuccess()

    })

    await pm.deleteUser.deleteUser()

    })

    test("15 Place Order: Register before Checkout", async({page}) => {

        await pm.menuBar.navigateToSignupLogin()

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

        await expect(page.getByText(validUser.name)).toBeVisible()

        await pm.productsPage.addRandomProduct()

        await pm.productsPage.goToCartPopUpMessage()

        await pm.cartPage.verifyCartHeading()

        await pm.cartPage.clickCheckOutBtn()

        await pm.cartPage.verifyAddressDetailsHeading()

        await pm.cartPage.verifyReviewOrderHeading()

        await pm.cartPage.writeCommentBox('Hello! Please put it in a gift bag')

        await test.step('Proceed with a payment', async() => {

            await pm.payment.enterPaymentDetails(
                payCart.cardName,
                payCart.cardNumber,
                payCart.cvc,
                payCart.expMonth,
                payCart.expYear
        )

            await pm.payment.clickPayAndConfirm()
            await pm.payment.verifyPaymentSuccess()
        });

        await pm.deleteUser.deleteUser()
    })

    test("16 Place Order: Login Before Checkout", async({page}) => {

        await pm.menuBar.navigateToSignupLogin()
        await expect(page.getByText('Login to your account')).toBeVisible();

        await pm.loginPage.login(validUser.email, validUser.password)
        await expect(page.getByText(validUser.name)).toBeVisible()

        await test.step('Adding products to the cart', async() => {

            await pm.productsPage.addRandomProduct()
        })

        await pm.productsPage.goToCartPopUpMessage()

        await pm.cartPage.verifyCartHeading()

        await pm.cartPage.clickCheckOutBtn()

        await pm.cartPage.verifyAddressDetailsHeading()
        await pm.cartPage.verifyReviewOrderHeading()

        await pm.cartPage.writeCommentBox('Hello! Please put it in a gift bag')


        await test.step('Proceed with a payment', async() => {

          await pm.payment.enterPaymentDetails(
                   payCart.cardName,
                   payCart.cardNumber,
                   payCart.cvc,
                   payCart.expMonth,
                   payCart.expYear
           )

               await pm.payment.clickPayAndConfirm()
               await pm.payment.verifyPaymentSuccess()
        })

        await pm.deleteUser.deleteUser()

        })


    test("17 Remove Products from Cart", async({page}) => {

            const product1 = await pm.productsPage.addRandomProduct()
            await pm.productsPage.continueShoppingPopUpMessage()

            const product2 = await pm.productsPage.addRandomProduct()
            await pm.productsPage.goToCartPopUpMessage()

            await pm.cartPage.verifyCartHeading()

            await pm.productsPage.verifyProductsInCart(product1.productName)
            await pm.productsPage.verifyProductsInCart(product2.productName)

            await pm.cartPage.deleteProductFromCart(product1.productName)
            await pm.cartPage.deleteProductFromCart(product2.productName)

            })

    test("23 Verify address details in checkout page", async({page}) => {

          await pm.menuBar.navigateToSignupLogin()
          await expect(page.getByText('New User Signup!')).toBeVisible();

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

          await expect(page.getByText(validUser.name)).toBeVisible()

                await pm.productsPage.addRandomProduct()
                await pm.productsPage.continueShoppingPopUpMessage()

                await pm.productsPage.addRandomProduct()
                await pm.productsPage.goToCartPopUpMessage()

                await pm.cartPage.verifyCartHeading()

                await pm.cartPage.clickCheckOutBtn()

                await pm.cartPage.verifyDeliveryAddress(registeredUser)

                await pm.cartPage.verifyBillingAddress(registeredUser)

                await pm.deleteUser.deleteUser()

            })


    test.only("24 Download Invoice after purchase order", async ({page}) => {

                const product = await pm.productsPage.addRandomProduct()
                await pm.productsPage.continueShoppingPopUpMessage()

                await pm.productsPage.addRandomProduct()
                await pm.productsPage.goToCartPopUpMessage()

                await pm.cartPage.verifyCartHeading()

                await pm.cartPage.clickCheckOutBtn()

                await pm.cartPage.clickRegisterPopupCheckout()

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
                await expect(page.getByText(validUser.name)).toBeVisible()

                await pm.menuBar.navigateToCart()
                await pm.cartPage.clickCheckOutBtn()

                await pm.cartPage.verifyDeliveryAddress(registeredUser)

                await pm.cartPage.verifyBillingAddress(registeredUser)

                await pm.cartPage.writeCommentBox('Please, handle with care. Fragile item.')

                await pm.payment.enterPaymentDetails (
                    payCart.cardName,
                    payCart.cardNumber,
                    payCart.cvc,
                    payCart.expMonth,
                    payCart.expYear
                );

                await pm.payment.clickPayAndConfirm()
                await pm.payment.verifyPaymentSuccess()

                await pm.payment.downloadInvoice()

                await page.getByRole('link', {name: 'Continue'}).click()

                await pm.deleteUser.deleteUser()

                })

})