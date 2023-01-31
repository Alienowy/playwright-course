import { test, expect} from '@playwright/test'
import { HomePage } from "../../page-objects/HomePage"
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe("Feedback Form", () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async ({ page }) => {
        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.click('#feedback')
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })

    // Reset Feedback Form

    test('Reset feedback form', async ({ page }) => {
        // await page.type('#name', 'Adrian')
        // await page.type('#email', 'some@email.com')
        // await page.type('#subject', 'some subject')
        // await page.type('#comment', 'some comment')
        // await page.click("input[name='clear']")

        // const nameInput = await page.locator('#name')
        // const commentInput = await page.locator('#comment')
        // await expect(nameInput).toBeEmpty()
        // await expect(commentInput).toBeEmpty()

        await feedbackPage.fillForm('Adrian', 'some@email.com', 'some subject', 'some comment')
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })

    //Submit Feedback Form

    test('Sumbit Feedback form', async ({ page }) => {
        // await page.type('#name', 'Adrian')
        // await page.type('#email', 'some@email.com')
        // await page.type('#subject', 'some subject')
        // await page.type('#comment', 'some comment')
        // await page.click("input[type='submit']")

        // await page.waitForSelector('#feedback-title')
        // aseracja zamiast tworzyc stala mozna uzyc wait.for.selector
        // test czeka az pokaze sie taki selektor
        // jesli nie testy sie nie powiedzie
        await feedbackPage.fillForm('Adrian', 'some@email.com', 'some subject', 'some comment')
        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSend()
    })
})