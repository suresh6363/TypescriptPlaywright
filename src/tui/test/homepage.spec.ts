import test, { expect } from '../fixtures/baseTest';
import { userAccessMatrix } from "../../testUserTests";


const regions=userAccessMatrix.allRegions
test.describe('Tui home page',()=>{
    //future use
    //test.use({storageState:`userStates/${regions}UserStorageState.json`});

    test('Accept cookies for the TUI site', async({homePage})=>{
        await homePage.goto();
        expect(await homePage.verifyCookiesWindow('cmCloseBanner')).toBe("Accepts");
        expect(await homePage.verifyCookiesWindow('cmManage')).toBe("Manage");
        expect(await homePage.verifyCookiesWindow('cmDecline')).toBe("Decline");
        await homePage.homePageCookiesButtonValue('cmCloseBanner').click();
        await homePage.page.pause();
        await homePage.page.getByPlaceholder('Choose airports').click();
        
    });
})