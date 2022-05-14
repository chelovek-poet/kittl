const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Auth tests", () => {
  test("Normal login", async ({ page }) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);

    // arrange
    await authPage.openPage();

    // action
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    // assert
    await catalogPage.expectPageOpened();
  });
});
