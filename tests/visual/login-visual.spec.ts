import {test} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("Login Page Visual Tests", () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })

    test('Login Form Snapshot', async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test('Error Login Message Snapshot', async ({ page }) => {
        await loginPage.login('error', 'wrongpass')
        await loginPage.snapshotsErrorMessage()
    })
})