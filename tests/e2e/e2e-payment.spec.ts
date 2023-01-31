import {test, expect} from '@playwright/test'
import { LoginSecond } from '../../page-objects/LoginSecond'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/Navbar'

test.describe('New Payment', () =>{
    let homePage: HomePage
    let loginToWeb: LoginSecond
    let paymentPage: PaymentPage
    let navbar: Navbar

test.beforeEach(async ({page}) => {
    // await page.goto('http://zero.webappsecurity.com/index.html')
    // await page.click('#signin_button')
    // await page.type('#user_login', 'username')
    // await page.type('#user_password', 'password')
    // await page.click('text=Sign in')

    homePage = new HomePage(page)
    loginToWeb = new LoginSecond(page)
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginToWeb.login('username', 'password')
})

test('Should send new payment', async ({page}) => {
    await navbar.clickOnTab('Pay Bills')
    // await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    // await page.click('#pay_bills_tab')
    // await page.selectOption('#sp_payee', 'Apple')
    // await page.click('.icon-question-sign')
    // await page.waitForSelector('#sp_payee_details')
    // await page.selectOption('#sp_account', '6')
    // await page.type('#sp_amount', '5000')
    // await page.type('#sp_date', '2023-01-13')
    // await page.type('#sp_description', 'some description')
    // await page.click('#pay_saved_payees')
    await paymentPage.createPayment()
    // const alertMessage = await page.locator('#alert_content > span')
    // await expect(alertMessage).toBeVisible()
    // await expect(alertMessage).toContainText('The payment was successfully submitted.')
    await paymentPage.assertSuccesMessage()
})
})