import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { Payment } from "../pages/Payment";
import { deleteUser } from "../pages/DeleteUser";
import { products, validUser, validNewUser, registeredUser, payCart, expectedAddressFields } from "../data/variables";

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

test.describe("Orders Tests", () => {

    test("Add Products in cart", async ({page}) => {
        await test.step('Navigate to Products page', async () => {
            await pm.menuBar.navigateToProducts()
        })
        await test.step('Adding 1 and 2 products to the cart', async() => {
            await pm.productsPage.addProductById(1)
            await pm.productsPage.continueShoppingPopUpMessage()
            await pm.productsPage.addProductById(2)
        })
        await test.step('View the cart', async() => {
            await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('Verify products info are visible in the cart', async () => {
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

    test("Verify Product quantity in Cart", async ({page}) => {

        const captureName = await test.step('View random product and verify details', async () => {
            const product = await pm.addRandomProduct.clickRandomViewProduct()
            const isMatch = await pm.addRandomProduct.verifyProductDetails(product.productName)
            expect(isMatch).toBe(true)
            return product;
        })
        await test.step('Set product quantity to 4 and add to the cart', async () => {
               await pm.productDetails.setProductQuantity('4')
               await pm.productDetails.addToCart()
               await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('Verify product is added to the cart', async () => {
               await pm.addRandomProduct.verifyProductInCart(captureName.productName)
        })
        await test.step('Verify product quantity as it was in product details page', async () => {
               await pm.addRandomProduct.verifyProductQuantityInCart(captureName.productName)
        })
    })

    test("Place Order: Register while Checkout", async ({page}) => {
        await test.step('Adding random products to the cart', async() => {
            await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.continueShoppingPopUpMessage()
            await pm.addRandomProduct.addRandomProduct()
        })
        await test.step('View Cart and start checkout', async() => {
            await pm.productsPage.goToCartPopUpMessage()
            await pm.cartPage.verifyCartHeading()
            await pm.cartPage.clickCheckOutBtn()
            await pm.cartPage.clickRegisterPopupCheckout()
        })
        await test.step('Register a new User', async() => {
            await pm.signupPage.signup(validNewUser.name, validNewUser.email)
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
                    mobilenumber: registeredUser.mobileNumber,
                });
            await page.getByRole('link', {name: 'Continue'}).click()
        })
        await test.step('Place Order with a comment', async() => {
            await expect(page.getByText(validNewUser.name)).toBeVisible()
            await pm.menuBar.navigateToCart()
            await pm.cartPage.clickCheckOutBtn()
            await pm.cartPage.verifyAddressDetailsHeading()
            await pm.cartPage.verifyReviewOrderHeading()
            await pm.cartPage.writeCommentBox('Hello! Please put it in a gift bag')
        })
        await test.step('Enter payment details and confirm', async() => {
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
        await test.step('Delete the registered user', async() => {
            await pm.deleteUser.deleteUser()
        })
    })

    test("Place Order: Register before Checkout", async({page}) => {
        await test.step('Register a new User', async() => {
            await pm.menuBar.navigateToSignupLogin()
            await pm.signupPage.signup(validNewUser.name, validNewUser.email)
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
                        mobilenumber: registeredUser.mobileNumber,

                    });
            await page.getByRole('link', {name: 'Continue'}).click()
            await expect(page.getByText(validNewUser.name)).toBeVisible()
        })
        await test.step('Adding random products to the cart', async() => {
            await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('View Cart and start checkout', async() => {
            await pm.cartPage.verifyCartHeading()
            await pm.cartPage.clickCheckOutBtn()
        })
        await test.step('View Address and Review Order Details', async() => {
            await pm.cartPage.verifyAddressDetailsHeading()
            await pm.cartPage.verifyReviewOrderHeading()
        })
        await test.step('Write a comment and place order', async() => {
            await pm.cartPage.writeCommentBox('Hello! Please put it in a gift bag')
        })
        await test.step('Enter payment details and confirm', async() => {
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
        await test.step('Delete the registered user', async() => {
            await pm.deleteUser.deleteUser()
        })
    })

    test("Place Order: Login Before Checkout", async({page}) => {
        await test.step("Login with valid credentials", async() => {
            await pm.menuBar.navigateToSignupLogin()
            await expect(page.getByText('Login to your account')).toBeVisible();
            await pm.loginPage.login(validUser.email, validUser.password)
            await expect(page.getByText(validUser.name)).toBeVisible()
        })
        await test.step('Adding products to the cart', async() => {
            await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('View Cart and start checkout', async() => {
            await pm.cartPage.verifyCartHeading()
            await pm.cartPage.clickCheckOutBtn()
        })
        await test.step('View Address and Review Order Details', async() => {
            await pm.cartPage.verifyAddressDetailsHeading()
            await pm.cartPage.verifyReviewOrderHeading()
        })
        await test.step('Write a comment and place order', async() => {
            await pm.cartPage.writeCommentBox('Hello! Please put it in a gift bag')
        })
        await test.step('Enter payment details and confirm', async() => {
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
        await test.step('Delete the registered user', async() => {
            await pm.deleteUser.deleteUser()
        })
    })

    test("Remove Products from Cart", async({page}) => {
        let product1;
        let product2;

        await test.step('Adding products to the cart', async() => {
            product1 = await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.continueShoppingPopUpMessage()
            product2 = await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('View Cart page is displayed', async() => {
            await pm.cartPage.verifyCartHeading()
        })
        await test.step('Verify both products are in the cart', async() => {
            await pm.cartPage.verifyProductsInCart(product1.productName)
            await pm.cartPage.verifyProductsInCart(product2.productName)
        })
        await test.step('Remove both products from the cart', async() => {
            await pm.cartPage.deleteProductFromCart(product1.productName)
            await pm.cartPage.deleteProductFromCart(product2.productName)
        })
    })

    test("Verify address details in checkout page", async({page}) => {
        await test.step("Register a new User", async() => {
            await pm.menuBar.navigateToSignupLogin()
            await expect(page.getByText('New User Signup!')).toBeVisible();
            await pm.signupPage.signup(validNewUser.name, validNewUser.email)
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
                        mobilenumber: registeredUser.mobileNumber,
                    });
            await page.getByRole('link', {name: 'Continue'}).click()
            await expect(page.getByText(validNewUser.name)).toBeVisible()
        })
        await test.step('Adding products to the cart', async() => {
            await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.continueShoppingPopUpMessage()

            await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('View Cart and start checkout', async() => {
            await pm.cartPage.verifyCartHeading()
            await pm.cartPage.clickCheckOutBtn()
        })
        await test.step('Verify Delivery and Billing address corresponds to registered user', async() => {
            await pm.cartPage.verifyDeliveryAddress(registeredUser)
            await pm.cartPage.verifyBillingAddress(registeredUser)
        })
        await test.step('Delete the registered user', async() => {
            await pm.deleteUser.deleteUser()
        })
    })


    test("Download Invoice after purchase order", async ({page}) => {
        await test.step('Adding products to the cart', async() => {
            const product = await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.continueShoppingPopUpMessage()

            await pm.addRandomProduct.addRandomProduct()
            await pm.productsPage.goToCartPopUpMessage()
        })
        await test.step('View Cart and start checkout before login/registration', async() => {
            await pm.cartPage.verifyCartHeading()
            await pm.cartPage.clickCheckOutBtn()
        })
        await test.step("Register a new User", async() => {
            await pm.cartPage.clickRegisterPopupCheckout()
            await pm.signupPage.signup(validNewUser.name, validNewUser.email)
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
                     mobilenumber: registeredUser.mobileNumber,
            });
            await page.getByRole('link', {name: 'Continue'}).click()
            await expect(page.getByText(validNewUser.name)).toBeVisible()
        })
        await test.step('View Cart and start checkout', async() => {
            await pm.menuBar.navigateToCart()
            await pm.cartPage.clickCheckOutBtn()
        })
        await test.step('Verify Delivery and Billing address corresponds to registered user', async() => {
            await pm.cartPage.verifyDeliveryAddress(registeredUser)
            await pm.cartPage.verifyBillingAddress(registeredUser)
        })
        await test.step('Write a comment and place order', async() => {
            await pm.cartPage.writeCommentBox('Please, handle with care. Fragile item')
        })
        await test.step('Enter payment details and confirm', async() => {
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
        await test.step('Download invoice', async() => {
            await pm.payment.downloadInvoice()
            await page.getByRole('link', {name: 'Continue'}).click()
        })
        await test.step('Delete the registered user', async() => {
            await pm.deleteUser.deleteUser()
        })
    })

})