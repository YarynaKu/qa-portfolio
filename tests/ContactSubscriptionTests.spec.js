import { test, expect } from "@playwright/test"
import PomManager from "../pages/POM_practise";
import { validUser } from "../data/variables.js";
import path from "path"

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


test.describe("Contact Us and Subscription Tests", () => {

    test("Verify Test Cases Page", async ({page}) => {
        await test.step('Verify Test Cases  are visible on Test Case Page', async () => {
            await pm.menuBar.navigateToTestCases()
            await pm.testCases.expectVisibleTestCasePage()
        })
    })

    test("Verify Subscription in home page", async ({page}) => {
        await test.step('Verify Subscription in footer in visible', async () => {
            await pm.subscriptionFooter.expectSubscriptionFooter()
        })
        await test.step('Subscribe with valid credentials', async () => {
            await pm.subscriptionFooter.subscribe(validUser.email)
        })
        await test.step('Verify successfull subscription message', async () => {
        await pm.subscriptionFooter.expectSuccessfulSubscription()
        })
    })

    test("Verify Subscription in Cart page", async ({page}) => {
        await test.step('Navigate to Cart Page', async () => {
            await pm.menuBar.navigateToCart()
        })
        await test.step('Verify Subscription in footer in visible', async () => {
            await pm.subscriptionFooter.expectSubscriptionFooter()
        })
        await test.step('Subscribe with valid credentials', async () => {
            await pm.subscriptionFooter.subscribe(validUser.email)
        })
        await test.step('Verify successfull subscription message', async () => {
        await pm.subscriptionFooter.expectSuccessfulSubscription()
        })
    })

    test("Verify scroll up using 'Arrow' button and scroll down functionality", async ({page}) => {
        await test.step('Navigate to Footer', async () => {
            await pm.subscriptionFooter.navigateToFooterText()
        })
        await test.step('Verify Subscription in footer in visible', async () => {
            await pm.subscriptionFooter.expectSubscriptionFooter()
        })
        await test.step('Scroll up using "Arrow" button', async () => {
            await pm.subscriptionFooter.scrollUpWithArrow()
        })
        await test.step('Verifying successfull text on top', async () => {
            await pm.subscriptionFooter.verifySuccessTopText()
        })
    })

    test("Verify scroll up without 'Arrow' button and scroll down functionality", async ({page}) => {
        await test.step('Navigate to Footer', async () => {
            await pm.subscriptionFooter.navigateToFooterText()
        })
        await test.step('Verify Subscription in footer in visible', async () => {
            await pm.subscriptionFooter.expectSubscriptionFooter()
        })
        await test.step('Scroll up without using "Arrow" button', async () => {
            await pm.subscriptionFooter.navigateToHeaderText()
        })
        await test.step('Verifying successfull text on top', async () => {
            await pm.subscriptionFooter.verifySuccessTopText()
        })
    })

    test("Contact Us Form", async ({page}) => {
        await test.step('Navigate to ContactUs Page', async () => {
              await pm.menuBar.navigateToContactUs()
              await expect(page.getByText('Get In Touch')).toBeVisible()
        })
        await test.step('Fill in details', async () => {
              await pm.contactUs.fillForm(
                        validUser.name,
                        validUser.email,
                        "Testing Contact Us Form",
                        "I am testing Contact Us Form"
              )});
        await test.step('Upload file', async () => {
              const filePath = path.resolve("data/testContactUs.docx");
              await pm.contactUs.uploadFile(filePath)

              page.once("dialog", dialog => dialog.accept())
              })
        await test.step('Submit information', async () => {
              await pm.contactUs.submit()
              await pm.contactUs.expectSuccessMessage()
              })
        await test.step('Return to Home page', async () => {
              await pm.menuBar.navigateToHome()
              await expect(page.getByAltText('Website for automation practice')).toBeVisible()
              })
        })


})

















