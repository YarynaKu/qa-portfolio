import { expect } from "@playwright/test";

export async function Payment(page, paymentData) {

    await page.locator('[name="name_on_card"]').fill(paymentData.nameoncard)

    await page.locator('[name="card_number"]').fill(paymentData.cardnumber)

    await page.getByRole('textbox', {name: 'ex. 311'}).fill(paymentData.cvc)

    await page.getByRole('textbox', {name: 'MM'}).fill(paymentData.expmonth)

    await page.getByRole('textbox', {name: 'YYYY'}).fill(paymentData.expyear)

    page.getByRole('button', {name: 'Pay and Confirm Order'}).click()

    
}