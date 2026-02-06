
export const validUser = {
    name: 'YaTestUser',
    password: 'YaTestPassword!',
    email: 'testya@gmail.com'
};

export const invalidUser = {
    email: 'testyaya@gmail.com',
    password: 'YayaTestPassword!'
};

export const registeredUser = {
    birthDate: '5',
    birthMonth: 'June',
    birthYear: '1992',
    firstName: 'YaTest',
    lastName: 'User',
    company: 'Google',
    address: 'Silicon Valley',
    address2: 'Guess what',
    country: 'Canada',
    state: 'Atlantica',
    city: 'Toronto',
    zipcode: '46971',
    mobileNumber: '0375839284'
};

export let searchProducts = {
    existingProduct: 'Dress',
    searchedProduct: /Dress/
};

export const products = {
    product1: {
        id: 1, name: 'Blue Top', category: 'Women > Tops', price: 'Rs. 500', quantity: '1', total: 'Rs. 500'
    },
    product2: {
        id:2, name: 'Men Tshirt', category: 'Men > Tshirts', price: 'Rs. 400', quantity: '1', total: 'Rs. 400'
    }
};

export const payCart = {
    cardName: "YaTest",
    cardNumber: '1234567890',
    cvc: '123',
    expMonth: '01',
    expYear: '01'
}

export const categories = [
    { main: 'Women', sub: ['Dress', 'Tops', 'Saree'] },
    { main: 'Men', sub: ['TShirts', 'Jeans'] },
    { main: 'Kids', sub: ['Dress', 'Tops & Shirts'] }
];

export const brands = [
    'Polo', 'H&M', 'Madame', 'Mast & Harbour', 'Babyhug', 'Allen Solly Junior', 'Kookie Kids', 'Biba' ];
