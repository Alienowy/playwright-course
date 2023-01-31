import { test, expect } from '@playwright/test'

test.describe("tips and Tricks Section", () => {
    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
        console.log(testInfo)
    })

    test('test Skip Browser', async ({ page, browserName}) => {
        test.skip(browserName === 'chromium', 'Feature not ready in Chrome browser')
        await page.goto('https://www.example.com')
    })

    test('Test FixMe Annotation', async ({ page, browserName}) => {
        test.fixme(browserName === 'chromium', 'Test is not stable, needs revison')
        await page.goto('https://www.example.com')
    })

    const people = ["Mike", "Judy", "Peter", "Alice", "Elon"]
    for (const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test(`Mouse movement symulation`, async ({ page}) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    test('Multiple Browser Tabs inside 1 Browser', async ({ browser }) => {
        const contex = await browser.newContext()
        const page1 = await contex.newPage()
        const page2 = await contex.newPage()
        const page3 = await contex.newPage()
        await page1.goto("https://www.example.com")
        await page2.goto("https://www.google.com")
        await page3.goto("https://www.wykop.pl")
        await page1.waitForTimeout(5000)
    })

    //Symulacja środowiska komenda
    // npx playwright open --device="iPhone 11" wikipedia.org
})