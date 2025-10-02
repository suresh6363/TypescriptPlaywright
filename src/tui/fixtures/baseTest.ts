import { test as baseTest } from '@playwright/test';
import LoginPage from '../../loginPage';
import HomePage from '../models/HomePage';  

const test = baseTest.extend<{
  loginPage: LoginPage;
  homePage:HomePage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage:async({page},use)=>{
    await use(new HomePage(page));
  }
});
export default test;
export const expect = test.expect;
