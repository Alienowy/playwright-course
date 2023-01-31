import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Currency exchange form',() =>{
    let homePage: HomePage

    test.beforeEach(async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    
    homePage = new HomePage(page)
    })

    test('Should make currency exchange', async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
        await page.click('#pay_bills_tab')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')
        await page.waitForSelector('#sp_sell_rate')

        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 euro (EUR)')
        await page.type('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const converionAmount = await page.locator('#pc_conversion_amount')
        await expect(converionAmount).toContainText('1000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')
        await page.waitForSelector('#alert_content')

        const alertMess = await page.locator('#alert_content')
        await expect(alertMess).toContainText('Foreign currency cash was successfully purchased.')

    })
})