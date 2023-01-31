import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel("Login/Logout Flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage

    //Before Hook
    test.beforeEach(async ({ page }) => {
        
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await loginPage.visit()
        // await page.goto('https://www.saucedemo.com/')

    })

    //Negative Scenario
    test('Negative Scenario for Login', async ({ page }) => {
        // await page.type('#user-name', 'invalid login')
        // await page.type('#password', 'invalid password')
        // await page.click('#login-button')
        await loginPage.login('invalid username', 'invalid password')

        // const errorMessage = await page.locator('h3')
        // await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service')
        await loginPage.assertErrorMessage()
    })
    //Positive Scenario + Logout

    test('Positive Scenario for Login + Logout', async ({ page }) => {
        // await page.type('#user-name', 'standard_user')
        // await page.type('#password', 'secret_sauce')
        // await page.click('#login-button')
        await loginPage.login('standard_user', 'secret_sauce')

        const cart = await page.locator('.shopping_cart_link')
        await expect(cart).toBeVisible()

        await page.click('#react-burger-menu-btn')
        await page.click('#logout_sidebar_link')
        await expect(page).toHaveURL('https://www.saucedemo.com/')
    })

})