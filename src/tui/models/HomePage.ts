import { Locator, Page } from "playwright/test";

const elements = {
    homePageLogo: '//*/img[@alt="Holidays from TUI"]',
    homePageCookiesButton: '#cmCloseBanner',
    departureAirportDropDown: '//*/div[@class="departure-airport-select__control"]',
    destinationDropDown: '//*/div[@class="destination-select__control"]',
    searchButton: '//*/button[@data-test-id="search-button"]',  
    departureAirportLabelText:'div.airport-wrapper label > span'
};

type Elements = Record<keyof typeof elements, Locator>;


export default class HomePage {
    readonly page: Page;
    readonly elements: Elements;
    readonly homePageCookiesButtonValue: (labelName: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.elements = {} as Elements;
        this.homePageCookiesButtonValue = (labelName: string) => page.locator(`//*/button[@id='${labelName}']`);

        Object.entries(elements).forEach(([key, value]) => {
            this.elements[key as keyof typeof elements] = page.locator(value);
        });
    }
    async goto(): Promise<void> {
        await this.page.goto('https://www.tui.be/nl');
        await this.elements.homePageLogo.waitFor();
    }
    async verifyCookiesWindow(labelName:string) {
        const text = await this.homePageCookiesButtonValue(labelName).textContent();
        return text ? text.toLowerCase() : '';
    }
    async acceptCookies(): Promise<void> {
        await this.elements.homePageCookiesButton.click();
    }
}   