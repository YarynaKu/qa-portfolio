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

    })