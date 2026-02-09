import LoginPage from "./LoginPage.js";
import SignupPage from "./SignUpPage.js";
import RegisterUser from "./RegistrationPage.js";
import MenuBar from "./MenuBar.js";
import SubscriptionFooter from "./SubscriptionFooterPage.js";
import ProductsPage from "./ProductsPage.js";
import ProductsCategory from "./ProductsCategory.js";
import ProductsBrands from "./ProductsBrands.js";
import AddRandomProduct from "./AddRandomProduct.js";
import ProductDetails from "./ProductDetails.js";
import RecommendedItems from "./RecommendedItems.js";
import CartPage from "./CartPage.js";
import Payment from "./Payment.js";
import DeleteUser from "./DeleteUser.js"

export default class PomManager {

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page)
        this.signupPage = new SignupPage(page)
        this.registerUser = new RegisterUser(page)
        this.menuBar = new MenuBar(page)
        this.subscriptionFooter = new SubscriptionFooter(page)
//        this.homePage = new HomePage(page)
        this.productsPage = new ProductsPage(page)
        this.productsCategory = new ProductsCategory(page)
        this.productsBrands = new ProductsBrands(page)
        this.addRandomProduct = new AddRandomProduct(page)
        this.productDetails = new ProductDetails(page)
        this.recommendedItems = new RecommendedItems(page)
        this.cartPage = new CartPage(page)
        this.payment = new Payment(page)
        this.deleteUser = new DeleteUser(page)
//        this.contactUsPage = new ContactUsPage(page)
    }
}