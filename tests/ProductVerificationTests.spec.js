import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { validUser, searchProducts, categories, brands } from "../data/variables.js";

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

    test("19 View & Cart Brand Products", async({page}) => {

        pm.menuBar.navigateToProducts()

        await pm.productsBrands.verifyBrandsTitle()

        pm.productsBrands.chooseBrand(brands[1])
        await pm.productsBrands.verifyBrandHeading(brands[1])

        pm.productsBrands.chooseBrand(brands[2])
        await pm.productsBrands.verifyBrandHeading(brands[2])

    })

    test("20 Search Products and Verify Cart after Login", async({page}) => {

       await pm.menuBar.navigateToProducts()

       await pm.productsPage.verifyAllProductsHeading()
       await pm.productsPage.searchForProduct(searchProducts.existingProduct)
       await pm.productsPage.verifySearchResultsHeading()

       await pm.productsPage.addSearchedProductsToCart()

       await pm.productsPage.goToCart()
       await pm.productsPage.verifyProductsInCart(searchProducts.searchedProduct)

       await pm.menuBar.navigateToSignupLogin()
       await pm.loginPage.login(validUser.email, validUser.password)

       await pm.productsPage.goToCart()
       await pm.productsPage.verifyProductsInCart(searchProducts.searchedProduct)

       })

    test("21 Add review on product", async({page}) => {

           await pm.menuBar.navigateToProducts()
           await pm.productsPage.verifyAllProductsHeading()

           await pm.addRandomProduct.clickRandomViewProduct()

           await pm.productDetails.verifyWriteReviewSection()
           await pm.productDetails.writeReview(validUser.name, validUser.email, 'Great product!')

           await pm.productDetails.verifyReviewSubmission()

    })

    test("22 Add to cart from Recommended items", async({page}) => {

          await pm.recommendedItems.verifyRecommendedItemsSection()

          await pm.recommendedItems.addRandomRecommendedItemToCart()
          await pm.productsPage.goToCartFromPopUpMessage()

          await pm.recommendedItems.VerifyProductInCart()
    })

})

