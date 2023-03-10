import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir:'tests/visual',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720},
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects: [
        {
            name: 'Chromium',
            use: {browserName: 'chromium'},
        },
        {
            name: 'Firefox',
            use: {browserName: 'firefox'},
        },
        {
            name: 'Webkit',
            use: {browserName: 'webkit'},
        },
    ]
}
 export default config

 //aby wykonac testy zgodnie z ta konfiguracja w terminalu
 //wpisujemy npx playwright test --config=playwright.config.ts --project=firefox
 // 