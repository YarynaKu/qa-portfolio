import { expect } from "@playwright/test";

let TEST_USER = 'YaTestUser';
let TEST_EMAIL = 'testya@gmail.com';

export async function registerUser(page, userData) {

    await page.getByRole('textbox', {name: 'name'}).fill(TEST_USER);
    await page.locator('[data-qa="signup-email"]').fill(TEST_EMAIL);    
    await page.getByRole('button', {name: 'Signup'}).click()
    await expect(page.getByText('Enter Account Information')).toBeVisible()

    await page.getByRole('radio', { name: 'Mrs.' }).check();
    await page.getByRole('textbox', {name: 'Password'}).fill(userData.password);
    await page.selectOption('id=days','6');
    await page.selectOption('id=months','May');
    await page.selectOption('id=years','1960');
    await page.getByLabel('Sign up for our newsletter!').check()
    await page.getByLabel('Receive special offers from our partners!').check()
//    await page.pause()
    await page.getByRole('textbox', { name: 'First name' }).fill(userData.firstname);
    await page.getByRole('textbox', { name: 'Last name' }).fill(userData.lastname);
    await page.locator('[data-qa="company"]').fill(userData.company);
    await page.locator('[data-qa="address"]').fill(userData.address);
    await page.getByRole('textbox', { name: 'Address 2' }).fill(userData.address2);
    await page.selectOption('id=country','Canada');
    await page.getByRole('textbox', { name: 'State' }).fill(userData.state);
    await page.getByLabel('City').fill(userData.city);
    await page.locator('[data-qa="zipcode"]').fill(userData.zipcode);
    await page.getByLabel('Mobile Number').fill(userData.mobilenumber);

    await page.getByRole('button', {name: 'Create Account'}).click()

    await expect(page.getByText('Account Created!')).toBeVisible()
    
}