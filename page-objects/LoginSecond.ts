import { expect, Locator, Page} from '@playwright/test'


export class LoginSecond {
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput : Locator
    readonly signInButton: Locator
    

    constructor(page:Page) {
        this.page = page
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.signInButton = page.locator('text=Sign in')
    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.signInButton.click()
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

}
