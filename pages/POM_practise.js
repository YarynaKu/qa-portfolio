import LoginPage from "./LoginPage";
import signupPage from "./SignUpPage";

export default class PomManager {
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page)
        this.signupPage = new signupPage(page)
    }
}