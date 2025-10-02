import { Locator, Page } from '@playwright/test';
import config from 'config';

const elements = {
 
};
export default class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async goto(): Promise<void> {
    await this.page.goto('https://www.tui.be/nl');
  }
}
