import { Locator, Page } from "playwright/test";

const elements = {
    homePageLogo: '//*/img[@alt="Holidays from TUI"]',
    homePageCookiesButton: '#cmCloseBanner',
    departureAirportInputBox: 'div.airport-wrapper div> input',
    destinationInputBox: 'div.destination-wrapper div> input',
    departureAirportLabelText: 'div.airport-wrapper label > span',
    departureAirportwindowSelectCityChkBox: 'div.drop-modal-content div ul li label button.svg-checkbox',
    departureAirportWindowDoneBtn: 'div.drop-modal-content div.footer-container div span.done',
    selectDepartureAirportOrHotel: 'div.destination-wrapper div.suggestion-wrapper div> button >strong',
    selectInputFields: 'div.inputs__textInputWithIcon div input',
    departureDate:'div.departureWrapper div> input',
    activeAvailableDateCallendar:'div.drop-modal-content div.calendar button time.available',
    roomsAndGuestsInputBox:'div.pax-and-rooms-wrapper div input',
    numberOfRoomsDropdownField:'div.drop-modal-content div.input-text-with-icon div.group',
    numberOfRoomsDropdownValues:'div.drop-modal-content div.input-text-with-icon div.group select option',
    childPlusBtn:'div.childrenBlock button[aria-label="nonAdults plus"]',
    chooseChildAge:'div.input-text-with-icon div.group select[id="child-age"]',
    searchBtn:'div.search-button-wrapper button',
    holidaysFoundHeaderText:'div.holidayCount div[aria-label="holiday count"]',
    holidayFoundResultPage:'div.ResultListItemV2__packageInfoInner',
    continueBtn:'div.ProgressbarNavigation__summaryButton button',
    continueToPassengerDetalilsBtn:'div.PriceDiscountBreakDown__continue button',
    verifyErrorMessage:'div#opti-error-page h1',
};

type Elements = Record<keyof typeof elements, Locator>;


export default class HomePage {
    readonly page: Page;
    readonly elements: Elements;
    readonly homePageCookiesButtonValue: (labelName: string) => Locator;
    readonly getTextByPlaceHolder: (placeholderText: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.elements = {} as Elements;
        this.getTextByPlaceHolder = (text: string) => page.getByPlaceholder(text);
        this.homePageCookiesButtonValue = (labelName: string) => page.locator(`//*/button[@id='${labelName}']`);

        Object.entries(elements).forEach(([key, value]) => {
            this.elements[key as keyof typeof elements] = page.locator(value);
        });
    }

    //Navigate to the TUI home page for UK region
    async goto(): Promise<void> {
        await this.page.goto('https://www.tui.co.uk');
        await this.elements.homePageLogo.waitFor();
    }

    //Verifying the buttons on cookie window page
    async verifyCookiesWindow(labelName: string) {
        const text = await this.homePageCookiesButtonValue(labelName).textContent();
        return text ? text.toLowerCase() : '';
    }

    //accepting the cookie window
    async acceptCookies(): Promise<void> {
        await this.elements.homePageCookiesButton.click();
    }

    //This method is for generic to click input text box fields 
    async clickInputFieldTextBox(position: number): Promise<void> {
        await this.elements.selectInputFields.nth(position).click();
    }

    //Select available city based on the index when window displays
    async selectCity(selectByIndex: number): Promise<void> {
        await this.elements.departureAirportwindowSelectCityChkBox.nth(selectByIndex).click();
        await this.elements.departureAirportWindowDoneBtn.click();
    }

    //select Departure airport or hotel 
    async selectDepartureAirportORHotel(departureAirport: string): Promise<void> {
        //Amsterdam Canal Hotel
        await this.clickInputFieldTextBox(1);
        await this.elements.destinationInputBox.fill(departureAirport);
        await this.elements.selectDepartureAirportOrHotel.click();        
    }

    //select available active current date of the month
    async selectDepartureDate():Promise<void>{
        //await this.clickInputFieldTextBox(2);
        await this.elements.departureDate.click();
        await this.elements.activeAvailableDateCallendar.first().click();
        await this.elements.departureAirportWindowDoneBtn.click();
    }
    //select rooms and Guests
    async selectRoomsAndGuests():Promise<void>{
        await this.elements.roomsAndGuestsInputBox.click();
        await this.elements.numberOfRoomsDropdownField.click();
        await this.elements.numberOfRoomsDropdownValues.nth(2).click();
        await this.elements.childPlusBtn.click();
        await this.elements.chooseChildAge.click();
        await this.elements.chooseChildAge.selectOption('15');
        await this.elements.departureAirportWindowDoneBtn.click();
    }
    //click on Search button
    async clickOnSearch():Promise<void>{
        await this.elements.searchBtn.click();
    }
    //Select hotel from the list of result page
    async clickOnFirstAvailableHotel():Promise<void>{
        await this.elements.holidayFoundResultPage.click();
        await this.elements.continueBtn.click();
    }

    async confirmHoliday():Promise<void>{
        await this.elements.continueToPassengerDetalilsBtn.click();
    }

}   