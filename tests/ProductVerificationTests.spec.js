import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { validUser, searchProducts, categories, brands, products } from "../data/variables.js";

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

    test.describe('Products Tests', () => {

    test("Verify All Products and product detail page", async ({page}) => {
        await test.step('Navigate to Products page', async () => {
            await pm.menuBar.navigateToProducts()
            await pm.productsPage.verifyAllProductsHeading()
        });
        await test.step('Open first product details page', async () => {
            await pm.productsPage.viewProductById(1)
        });
        await test.step('Verify product detail information corresponds th chosen product', async () => {
            await pm.productDetails.verifyProdInfoDetails(products.product1.id,
                {
                  name: products.product1.name,
                  category: products.product1.category,
                  price: products.product1.price,
                  quantity: products.product1.quantity,
                  availability: products.product1.availability,
                  condition: products.product1.condition,
                  brand: products.product1.brand
                })
            })
        });

    test("Search Product", async ({page}) => {
        await test.step('Navigate to Products page', async () => {
            await pm.menuBar.navigateToProducts()
            await pm.productsPage.verifyAllProductsHeading()
        });
        await test.step('Search product by name', async () => {
            await pm.search.searchForProduct(searchProducts.existingProduct)
        })
        await test.step('Verify related search results', async () => {
            await pm.search.verifySearchResultsHeading()
            await pm.search.verifyRelatedSearchResults(searchProducts.existingProduct)
        })
    })

    test("View Category Products", async({page}) => {
        await test.step('Verify category title is displayed', async () => {
           await pm.productsCategory.verifyCategoryTitle()
        })
        await test.step('Verify category page is displayed after click', async () => {
            await pm.productsCategory.openCategory(categories[0].main)
            await pm.productsCategory.openSubCategory(categories[0].main, categories[0].sub[0])
            await pm.productsCategory.verifyCategoryHeading(categories[0].main, categories[0].sub[0])
        })
        await test.step('Verify that user is navigated to another category page', async () => {
           await pm.productsCategory.openCategory(categories[1].main)
           await pm.productsCategory.openSubCategory(categories[1].main, categories[1].sub[0])
           await pm.productsCategory.verifyCategoryHeading(categories[1].main, categories[1].sub[0])
        })
    })

    test("View & Cart Brand Products", async({page}) => {
        await test.step('Navigate to Products page', async () => {
            await pm.menuBar.navigateToProducts()
        })
        await test.step('Verify brand title is displayed', async () => {
            await pm.productsBrands.verifyBrandsTitle()
        })
        await test.step('Verify brand page is displayed after click', async () => {
            await pm.productsBrands.chooseBrand(brands[1])
            await pm.productsBrands.verifyBrandHeading(brands[1])
        })
        await test.step('Verify that user is navigated to another brand page', async () => {
            await pm.productsBrands.chooseBrand(brands[2])
            await pm.productsBrands.verifyBrandHeading(brands[2])
        })
    })

    test("Search Products and Verify Cart after Login", async({page}) => {
       await test.step('Navigate to Products page', async () => {
            await pm.menuBar.navigateToProducts()
            await pm.productsPage.verifyAllProductsHeading()
       })
       await test.step('Search product by name', async () => {
            await pm.search.searchForProduct(searchProducts.existingProduct)
       })
       await test.step('Verify related search results', async () => {
            await pm.search.verifySearchResultsHeading()
       })
       await test.step('Add searched products to the cart', async () => {
            await pm.search.addSearchedProductsToCart()
       })
       await test.step('Verify Products are visible in the cart before login', async () => {
            await pm.menuBar.navigateToCart()
            await pm.cartPage.verifyProductsInCart(searchProducts.searchedProduct)
       })
       await test.step('Login in with valid credentials', async () => {
            await pm.menuBar.navigateToSignupLogin()
            await pm.loginPage.login(validUser.email, validUser.password)
       })
       await test.step('Verify Products are visible in the cart after login', async () => {
            await pm.menuBar.navigateToCart()
            await pm.cartPage.verifyProductsInCart(searchProducts.searchedProduct)
       })
    })

    test("Add review on product", async({page}) => {
        await test.step('Navigate to Products page', async () => {
           await pm.menuBar.navigateToProducts()
           await pm.productsPage.verifyAllProductsHeading()
        })
        await test.step('Add random product to the cart', async () => {
           await pm.addRandomProduct.clickRandomViewProduct()
        })
        await test.step('Write a review and submit', async () => {
           await pm.productDetails.verifyWriteReviewSection()
           await pm.productDetails.writeReview(validUser.name, validUser.email, 'Great product!')
           await pm.productDetails.verifyReviewSubmission()
        })

    })

    test("Add to cart from Recommended items", async({page}) => {
        await test.step('Verify recommended item section is visible', async () => {
          await pm.recommendedItems.verifyRecommendedItemsSection()
        })
        await test.step('Add random product from recommended item section to the cart', async () => {
          await pm.recommendedItems.addRandomRecommendedItemToCart()
        })
        await test.step('Verify chosen products are visible in the cart', async () => {
          await pm.productsPage.goToCartPopUpMessage()
          await pm.recommendedItems.VerifyProductInCart()
        })
    })

})

