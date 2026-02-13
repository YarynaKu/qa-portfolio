import {test,expect} from "@playwright/test"

test("API 1: Get All Products List", async ({request}) => {

    const response = await request.get("https://automationexercise.com/api/productsList")

    const respCode = response.status()
    const respStatusText = response.statusText()

    expect(respCode).toBe(200)
    expect(respStatusText).toBe("OK")

    const respJson = await response.json()

    expect(respJson).toHaveProperty("products")
    expect(Array.isArray(respJson.products)).toBeTruthy()
    expect(respJson.products.length).toBeGreaterThan(0)

    const firstProd = respJson.products[0]

    expect(firstProd).toHaveProperty("id")
    expect(firstProd).toHaveProperty("name")
    expect(firstProd).toHaveProperty("price")
    expect(firstProd).toHaveProperty("brand")
    expect(firstProd).toHaveProperty("category")

    console.log(respCode)
    console.log(respStatusText)
//    console.log(respJson)
    console.log(firstProd)
})

test("API 2: POST To All Products List", async ({request}) => {

    const response = await request.post("https://automationexercise.com/api/productsList")

    expect(response.status()).toBe(200)

    const respJson = await response.json();
    console.log(respJson);

    expect(respJson).toHaveProperty("responseCode", 405);
    expect(respJson).toHaveProperty("message", "This request method is not supported.");

})



