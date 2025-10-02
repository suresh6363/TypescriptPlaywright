import { userAccessMatrix } from "./src/testUserTests";
import setup from './src/tui/fixtures/baseTest';

for (const userRole of userAccessMatrix.allRegions) {
  setup(`setup for ${userRole}`, async ({ loginPage }) => {
    console.log(`---- BASE URL ---- : https://www.tui.be/nl`);
    await loginPage.goto();
  });
}