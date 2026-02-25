import {test,expect} from "@playwright/test"
import {validUser, validNewUser, registeredUser} from "../data/variables.js";

test("API 1: Get All Products List", async ({request}) => {

    const response = await request.get("https://automationexercise.com/api/productsList")

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe("OK")

    const body = await response.json()

    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty("products")
    expect(Array.isArray(body.products)).toBeTruthy()
    expect(body.products.length).toBeGreaterThan(0)

    body.products.forEach(product => {
        expect(product).toHaveProperty("id")
        expect(product).toHaveProperty("name")
        expect(product).toHaveProperty("price")
        expect(product).toHaveProperty("brand")
        expect(product).toHaveProperty("category")
    })

    body.products.forEach(product => {
        expect(typeof product.id).toBe('number')
        expect(typeof product.name).toBe('string')
        expect(product.name.length).toBeGreaterThan(0)
        expect(typeof product.price).toBe('string')
        expect(product.brand).not.toBeNull()
        expect(product.category).not.toBeNull()
    })

    const ids = body.products.map(p => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)

    console.log(body)
})

test("API 2: POST To All Products List", async ({request}) => {

    const response = await request.post("https://automationexercise.com/api/productsList")

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");

})

test("API 3: GET All Brands List", async ({request}) => {

    const response = await request.get("https://automationexercise.com/api/brandsList")

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe("OK")

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('brands');
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0)

    body.brands.forEach(brand => {
        expect(brand).toHaveProperty("id")
        expect(brand).toHaveProperty("brand")
    })

    body.brands.forEach(brand => {
        expect(typeof brand.id).toBe('number')
        expect(typeof brand.brand).toBe('string')
        expect(brand.brand.length).toBeGreaterThan(0)
    })

    const allBrands = body.brands.map(item => item.brand)

    const uniqueBrands = new Set(allBrands)

    console.log('All brands', allBrands);
    console.log('Unique brands',  uniqueBrands)
})

test("API 4: PUT To All Brands List", async ({request}) => {
    const response = await request.put("https://automationexercise.com/api/brandsList")

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
})

test("API 5: POST To Search Product", async ({request}) => {
    const searchKeyword = 'top'

    const response = await request.post("https://automationexercise.com/api/searchProduct", {
        form: {
            search_product: searchKeyword
        }
    })
    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty("products")
    expect(Array.isArray(body.products)).toBeTruthy()
    expect(body.products.length).toBeGreaterThan(0)

    body.products.forEach(product => {
       expect(product).toHaveProperty("id")
       expect(product).toHaveProperty("name")
       expect(product).toHaveProperty("price")
       expect(product).toHaveProperty("brand")
       expect(product).toHaveProperty("category")
    })

    const matched = body.products.some(p =>
        p.name.toLowerCase().includes(searchKeyword)
    );

    expect(matched).toBeTruthy();
})

test("API 6: POST To Search Product without search_product parameter", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/searchProduct")

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");
})

test("API 7: POST To Verify Login with valid details", async ({request}) => {
    const email = 'ytest@gmail.com'
    const password = 'YTEST123!'

    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
        form: {
            email: email,
            password: password
        }
    })

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
})

test("API 8: POST To Verify Login without email parameter", async ({request}) => {
     const password = 'YTEST123!'

     const response = await request.post("https://automationexercise.com/api/verifyLogin", {
            form: {
                password: password
            }
     })

     expect(response.status()).toBe(200)

     const body = await response.json();
     console.log(body);

     expect(body.responseCode).toBe(400);
     expect(body.message).toBe("Bad request, email or password parameter is missing in POST request.");
})

test("API 9: DELETE To Verify Login", async ({request}) => {
     const response = await request.delete("https://automationexercise.com/api/verifyLogin")
    expect(response.status()).toBe(200)

     const body = await response.json();
     console.log(body);

     expect(body.responseCode).toBe(405);
     expect(body.message).toBe("This request method is not supported.");
})

test("API 10: POST To Verify Login with invalid details", async ({request}) => {
    const email = 'yy@gmail.com'
    const password = 'YY123!!!'

    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
        form: {
            email: email,
            password: password
        }
    })

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
})

test("API 11: POST To Create/Register User Account", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/createAccount", {
        form: {
            name: validNewUser.name,
            email: validNewUser.email,
            password: validNewUser.password,
            title: 'Mrs',
            birth_date: registeredUser.birthDate,
            birth_month: registeredUser.birthMonth,
            birth_year: registeredUser.birthYear,
            firstname: registeredUser.firstName,
            lastname: registeredUser.lastName,
            company: registeredUser.company,
            address1: registeredUser.address,
            address2: registeredUser.address2,
            country: registeredUser.country,
            zipcode: registeredUser.zipcode,
            state: registeredUser.state,
            city: registeredUser.city,
            mobile_number: registeredUser.mobileNumber
        }
    })

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(201);
    console.log(body.message);
    expect(body.message).toBe("User created!");
})

test("API 12: DELETE METHOD To Delete User Account", async ({request}) => {
    const response = await request.delete("https://automationexercise.com/api/deleteAccount", {
        form: {
            email: validNewUser.email,
            password: validNewUser.password
        }
    })

        expect(response.status()).toBe(200)

        const body = await response.json();
        console.log(body);

        expect(body.responseCode).toBe(200);
        console.log(body.message);
        expect(body.message).toBe("Account deleted!");
})

test("API 13: PUT METHOD To Update User Account", async ({request}) => {
    const response = await request.put("https://automationexercise.com/api/updateAccount", {
        form: {
            name: validNewUser.name,
            email: validNewUser.email,
            password: validNewUser.password,
            title: 'Mr',
            birth_date: registeredUser.birthDate,
            birth_month: registeredUser.birthMonth,
            birth_year: registeredUser.birthYear,
            firstname: registeredUser.firstName,
            lastname: registeredUser.lastName,
            company: registeredUser.company,
            address1: registeredUser.address,
            address2: registeredUser.address2,
            country: registeredUser.country,
            zipcode: registeredUser.zipcode,
            state: registeredUser.state,
            city: registeredUser.city,
            mobile_number: registeredUser.mobileNumber
        }
    })

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(body.responseCode).toBe(200);
    console.log(body.message);
    expect(body.message).toBe("User updated!");
})

test("API 14: GET user account detail by email", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/getUserDetailByEmail", {
        params: {
            email: validNewUser.email
        }
    })

        expect(response.status()).toBe(200)

        const body = await response.json();
        console.log(body);

        expect(body.responseCode).toBe(200);
        expect(body.user.email).toBe(validNewUser.email);
})












