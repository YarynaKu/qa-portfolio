export default class CommonActions {
    constructor(page){
        this.page = page;
    }

    async navigate(url){
        // await this.page.pause()
        await this.page.goto(url)
    }

    async click(selector){
        await this.page.click(selector)
    }

    async click2(locator){
        await locator.click()
    }

    async fill(selector, text){
        await this.page.fill(selector, text)
    }

    async getText(selector){
        return await this.page.textContext(selector)
    }

    async isChecked(selector){
        return await this.page.isChecked(selector)
    }

    async selectOption(selector, value){
        await this.page.selectOption(selector, value)
    }


}