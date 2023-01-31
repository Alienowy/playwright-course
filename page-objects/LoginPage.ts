import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    // Define Selectors for login page
    readonly page: Page
    readonly usernameInput : Locator
    readonly passwordInput : Locator
    readonly submitButton : Locator
    readonly errorMessage : Locator
    readonly loginForm: Locator
    //Init selectors using constructors
    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.submitButton = page.locator('#login-button')
        this.errorMessage = page.locator('h3')
        this.loginForm = page.locator('.login_wrapper-inner')
    }

    //Define login page methods

    async visit() {
        await this.page.goto('https://www.saucedemo.com/')

    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service')
    }

    async snapshotLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot("login-form.png")
    }

    async snapshotsErrorMessage() {
        expect(await this.errorMessage.screenshot()).toMatchSnapshot("error-message.png")
    }
}