import { test, expect } from '@playwright/test'

test('Simple basic test', async ({page}) => {
    //Here  goes the test code
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})


test.skip('Selectors', async ({ page }) => {
    //text
    await page.click('text=some text')

    //CSS Selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    //Only visible Css Selector
    await page.click('.submit-button:visible')


    //Combinations
    await page.click('#username . first')

    //XPath
    await page.click('//button')
})


test.describe('My first test suit', () => {
    test('Working with Inputs, async', async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
    
        await page.type("#user_login","some username")
        await page.type("#user_password", "some password")
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    
    })
    
    
    //aseracja potwierdzamy tekst zazwyczaj lub adres strony
    
    test('Asserations', async ({page}) => {
        await page.goto("https://example.com/")
        await expect(page).toHaveURL("https://example.com/")  //aseracja czy ma adres strony prawidłowy
        await expect(page).toHaveTitle("Example Domain")   //aseracja czy ma title
    
        const element = await page.locator('h1')  //aseracja na elemencie czy jest widoczny w tym przypadku h1
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Example Domain") // czy element zawiera prawidlowy text
        await expect(element).toHaveCount(1) // ile jest takich elementów
    
        //sprawdzenie nieisniejącego elementu (oposite for visible element)
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    
    })
    
})



//test.skip - ignoruje test

//test.only - robi tylko ten test, można uzywac do kilku testow

//test.describe(jakis opis grupy testów,() ==> {
//      TUTAJ WKLEJAMY TESTY JAKIE CHCEMY ZGRUPOWAC
//})

//egzekucja konkretnego testu
//test('jakasnazwa @idtestu', async({page}) => {

//})
// w konsoli wpisujemy npx playwright test --grep @idetestu
// w konsoli wpisujemy npx playwright --grep-invert @idetestu ---ignoruje testy z id i odpala reszteclear


//RAPORTY
//npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html
// czy za kazdym razem trzeba definiowac konfig i przegladarke?


test('Screenshots', async ({ page }) => {
    // step 1 is load website
    await page.goto('https://example.com/')
    //2 step is take screenshot of full page
    await page.screenshot({ path: 'screenshot.png', fullPage: true})
})


test('Single element screenshot', async ({ page }) => {
    await page.goto('https:example.com/')
    const element = await page.locator('a')
    await element.screenshot({ path: 'single_element_screenshot.png' })
})
