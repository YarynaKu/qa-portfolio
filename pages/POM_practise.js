import LoginPage from "./LoginPage.js";
//import signupPage from "./SignUpPage";

export default class PomManager {

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page)
//        this.signupPage = new signupPage(page)
    }
}