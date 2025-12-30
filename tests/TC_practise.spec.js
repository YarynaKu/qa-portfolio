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


test.describe('User Tests', () => {

    test(" 1 Register User", async ({page}) => {

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

//    await deleteUser(page)
})

    test(" 2 Login User with correct email and password", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('Login to your account')).toBeVisible();

    await pm.loginPage.login(`${TEST_EMAIL}`, `${TEST_PASSWORD}`)
    await expect(page.getByText(TEST_USER)).toBeVisible()

     await page.getByRole('link', {name: 'Delete Account'}).click()
     await expect(page.getByText('Account Deleted!')).toBeVisible()
    // await page.pause()
})

    test("3 Login User with incorrect email and password", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('Login to your account')).toBeVisible();

    // await page.locator('[data-qa="login-email"]').fill(TEST_EMAIL);
    // await page.getByRole('textbox', {name: 'Password'}).fill(TEST_PASSWORD);
    await pm.loginPage.login(INCORR_TEST_EMAIL, INCORR_TEST_PASSWORD)

    // await page.getByRole('button', {name: 'Login'}).click()
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

    test(" 5 Register User with existing email", async ({page}) => {

    await page.getByRole('link', {name:'Signup / Login'}).click()
    await expect(page.getByText('New User Signup!')).toBeVisible();

    await pm.signupPage.signup(TEST_USER, TEST_EMAIL)
 //   await page.pause()    
    await expect(page.getByText('Email Address already exist!')).toBeVisible();

    })

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

    test.describe('Products Tests', () => {

    test("8 Verify All Products and product detail page", async ({page}) => {

        await test.step('Navigate to Products page', async () => {
            await page.getByRole('listitem').filter({hasText: " Products"}).click();
            await expect(page.locator('a[href="/products"]')).toHaveCSS('color', 'rgb(255, 165, 0)')
            await expect(page.getByRole('heading', {name: 'All Products'})).toBeVisible()
        });

        await test.step('Open first product details page', async () => {
            await page.locator('a[href="/product_details/1"]').click()
        });

        await test.step('Verify product detail information', async () => {

            await expect(page.locator('div.product-information')).toBeVisible()

            const productInfo = page.locator('div.product-information')

            await expect(productInfo.locator('h2')).toBeVisible()
            await expect(productInfo.locator('p:has-text("Category")')).toBeVisible()
            await expect(productInfo.locator('span span:has-text("Rs.")')).toBeVisible()
            await expect(productInfo.locator('p b:has-text("Availability")')).toBeVisible()
            await expect(productInfo.locator('p b:has-text("Condition")')).toBeVisible()
            await expect(productInfo.locator('p b:has-text("Brand")')).toBeVisible()

        });

    })

    test("9 Search Product", async ({page}) => {

        await test.step('Navigate to Products page', async () => {
            await page.getByRole('listitem').filter({hasText: " Products"}).click();
            await expect(page.locator('a[href="/products"]')).toHaveCSS('color', 'rgb(255, 165, 0)')
            await expect(page.getByRole('heading', {name: 'All Products'})).toBeVisible()
        });

        await test.step('Search Product', async () => {
            await page.getByPlaceholder('Search Product').fill('dress')
            await page.locator('id=submit_search').click()
            await expect(page.getByRole('heading', {name: 'Searched Products'})).toBeVisible()

            const items = page.locator('p:has-text("Dress")')
            const count = await items.count()

                for (let i=0; i< count; i++) {
                    await expect(items.nth(i)).toBeVisible() 
                }
            })
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

    test("18 View Category Products", async({page}) => {

        await expect(page.getByRole('heading', {name: "Category"})).toBeVisible()

        await page.locator('[href="#Women"]').click()
        await page.getByRole('link', {name: "DRESS"}).click()

        await expect(page.getByRole('heading', {name: "Women - Dress Products"})).toBeVisible()

        await page.locator('[href="#Men"]').click()
        await page.getByRole('link', {name: "Tshirts "}).click()

        await expect(page.getByRole('heading', {name: "Men - Tshirts Products"})).toBeVisible()

    })

    test("19 View & Cart Brand Products", async({page}) => {

        await page.getByRole('link', {name: 'Products'}).click();

        await expect(page.getByRole('heading', {name: "Brands"})).toBeVisible()

        await page.locator('[href="/brand_products/H&M"]').click()

        await expect(page.getByRole('heading', {name: "Brand - H&M Products"})).toBeVisible()

        await page.locator('[href="/brand_products/Madame"]').click()

        await expect(page.getByRole('heading', {name: "Brand - Madame Products"})).toBeVisible()
    })

    test("20 Search Products and Verify Cart after Login", async({page}) => {

        await page.getByRole('link', {name: 'Products'}).click();

        await expect(page.getByRole('heading', {name: 'All Products'})).toBeVisible()

        await page.getByRole('textbox', {name: 'Search Product'}).fill('top')
        await page.locator('id=submit_search').click()

        const items = page.locator('.product-image-wrapper .single-products:has(.productinfo.text-center p:has-text("Top"))')
        const count = await items.count()
        for (let i=0; i< count; i++) {
            await expect(items.nth(i)).toBeVisible()
        }
        console.log('Number of items found: ', count)

        for (let i=0; i< count; i++) {
                const item = items.nth(i)
                await item.hover()

                await page.waitForTimeout(200)

                await item
                     .locator('.product-overlay .overlay-content a.add-to-cart').scrollIntoViewIfNeeded()

                await item
                    .locator('.product-overlay .overlay-content a.add-to-cart').click()



              await page.getByRole('button', {name: 'Continue Shopping'}).click()
            }

        await page.getByRole('link', {name: 'Cart'}).click()

        let addedItemsNames = []

        for(const name of addedItemsNames) {
            const cartItem = page.locator('.cart_info_table li:hasText("Top")')
            await expect(cartItem).toBeVisible()
        }

        await page.getByRole('link', {name:'Signup / Login'}).click()

        await pm.loginPage.login(`${TEST_EMAIL}`, `${TEST_PASSWORD}`)

        await page.getByRole('link', {name: 'Cart'}).click()

        for(const name of addedItemsNames) {
            const cartItem = page.locator('.cart_info_table li:hasText("Top")')
            await expect(cartItem).toBeVisible()
        }
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

    test.only("23 Verify address details in checkout page", async({page}) => {


        await page.getByRole('link', {name:'Signup / Login'}).click()
        await expect(page.getByText('Login to your account')).toBeVisible();
        await pm.loginPage.login(`${TEST_EMAIL}`, `${TEST_PASSWORD}`)
        await expect(page.getByText(TEST_USER)).toBeVisible()
        await page.getByRole('link', {name: 'Delete Account'}).click()


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

        await selectedItem.locator('a.add-to-cart').click()

        await page.locator('.modal-content').locator('a[href="/view_cart"]').click()
        await expect(page.locator('#cart_info_table td.cart_description h4 a', {hasText: productName })).toBeVisible()

        await page.locator('#do_action .btn.btn-default.check_out').click()

        const deliveryAddress = await page.locator('#address_delivery').innerText()

        const userData = 'YOUR DELIVERY ADDRESS\nMrs. YaTest User\nGoogle\nSilicon Valley\nGuess what\nToronto Atlantica 46971\nCanada\n0375839284'
        expect(deliveryAddress).toBe(userData)
        await page.pause()







    })











    })













