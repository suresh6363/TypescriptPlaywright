import test, { expect } from '../fixtures/baseTest';
import { userAccessMatrix } from "../../testUserTests";


const regions=userAccessMatrix.allRegions
test.describe('Tui home page',()=>{
    //future use
    //test.use({storageState:`userStates/${regions}UserStorageState.json`});

    test('Accept cookies, continue to book departure airport, hotel on the TUI site', async({homePage})=>{
        await homePage.goto();
        expect(await homePage.verifyCookiesWindow('cmCloseBanner')).toBe("Accepts");
        expect(await homePage.verifyCookiesWindow('cmManage')).toBe("Manage");
        expect(await homePage.verifyCookiesWindow('cmDecline')).toBe("Decline");
        await homePage.homePageCookiesButtonValue('cmCloseBanner').click();
        await homePage.page.pause();
        await homePage.clickInputFieldTextBox(0);
        await homePage.selectCity(0);
        await homePage.selectDepartureAirportORHotel('Amsterdam Canal Hotel');
        await homePage.selectDepartureDate();
        await homePage.selectRoomsAndGuests();
        await homePage.clickOnSearch();
        await expect(homePage.elements.holidaysFoundHeaderText).toContainText('Holidays');
        await homePage.confirmHoliday();
        await expect(homePage.elements.verifyErrorMessage).toHaveText("Sorry, this holiday has sold out");
    });
})