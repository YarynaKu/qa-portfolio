import { expect } from "@playwright/test";

export async function deleteUser (page) {

    await page.getByRole('link', {name: 'Delete Account'}).click()
    await expect(page.getByText('Account Deleted!')).toBeVisible()
    await page.getByRole('link', {name: 'Continue'}).click()
    
}