const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Auth tests", () => {
  test("Wrong pass", async ({ page }) => {
    const authPage = new AuthPage(page);

    // arrange
    await authPage.openPage();

    // action
    await authPage.enterLoginPass(GLITCH_USER.login, "12345");
    await authPage.clickLogin();

    // assert
    await authPage.expectPageOpened();
    await authPage.expectWrongLoginPassError();
  });
});
