import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { searchProducts, categories, brands } from "../data/variables.js";

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

    test.describe('Products Tests', () => {

    test("8 Verify All Products and product detail page", async ({page}) => {

        await test.step('Navigate to Products page', async () => {
            await pm.menuBar.navigateToProducts()
            await pm.productsPage.verifyAllProductsHeading()
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
            pm.menuBar.navigateToProducts()
            pm.productsPage.verifyAllProductsHeading()
        });

        await test.step('Search Product', async () => {

            await pm.productsPage.searchForProduct(searchProducts.existingProduct)
            await pm.productsPage.verifySearchResultsHeading()

            await pm.productsPage.verifyRelatedSearchResults(searchProducts.existingProduct)
            })
    })

    test("18 View Category Products", async({page}) => {

           await pm.productsCategory.verifyCategoryTitle()

           await test.step('Verify that category page is displayed after click', async () => {

           pm.productsCategory.openCategory(categories[0].main)
           pm.productsCategory.openSubCategory(categories[0].sub[0])
           await page.waitForTimeout(1000)

           await pm.productsCategory.verifyCategoryHeading(categories[0].main, categories[0].sub[0])
           })

           await test.step('Verify that user is navigated to another category page', async () => {

           pm.productsCategory.openCategory(categories[1].main)
           pm.productsCategory.openSubCategory(categories[1].sub[0])
           await page.waitForTimeout(1000)

           await pm.productsCategory.verifyCategoryHeading(categories[1].main, categories[1].sub[0])
           })
    })

    test.only("19 View & Cart Brand Products", async({page}) => {

//                        await page.getByRole('link', {name: 'Products'}).click();
        pm.menuBar.navigateToProducts()

        await pm.productsBrands.verifyBrandsTitle()

        pm.productsBrands.chooseBrand(brands[1])
//        await page.locator('[href="/brand_products/H&M"]').click()
        await pm.productsBrands.verifyBrandHeading(brands[1])
//        await expect(page.getByRole('heading', {name: "Brand - H&M Products"})).toBeVisible()
        pm.productsBrands.chooseBrand(brands[2])
//        await page.locator('[href="/brand_products/Madame"]').click()
        await pm.productsBrands.verifyBrandHeading(brands[2])
//        await expect(page.getByRole('heading', {name: "Brand - Madame Products"})).toBeVisible()
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

    })