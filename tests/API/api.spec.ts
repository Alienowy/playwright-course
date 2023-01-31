import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing",() => {
    const baseURL = "https://reqres.in/api"

    test("Simple API Test -Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseURL}/user/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test("Simple API TEST - Assert Invalid Endpoint", async ({ request }) =>{
        const response = await request.get(`${baseURL}/user/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseURL}/user/2`)
        const responseBody = JSON.parse(await response.text())    //wyciaganie danych z zapytania 
        
        //aseracja
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.name).toBe('fuchsia rose')
        expect(responseBody.data.year).toBeTruthy()  // ta aseracja sprawdza czy wgl jest jakis email
        console.log(responseBody)  //dane wypisane z consoli
    })

    test("Post Request - Create New User", async ({ request }) =>{
        const response = await request.post(`${baseURL}/user`, {
            data: {
                id: 1000,
            }
        })
        const responseBody = JSON.parse(await response.text())
        // console.log(responseBody) bez konsoli juz w samych testach
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("Post Request - Login", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("Post Request - Login Fail", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "peter@klaven"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })

    test("Put Request - Update User", async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name : 'New Name',
                job: 'New Job'
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('New Name')
        expect(responseBody.job).toBe('New Job')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("Delete Request - Delete User", async ({ request }) => {
        const response = await request.delete(`${baseURL}/users/2`)
        expect(response.status()).toBe(204)
    })
})