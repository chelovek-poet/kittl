const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CheckoutPage } = require('../../pageobjects/checkout.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Order tests", () => {
  test("Remove items", async ({ page }) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);

    // arrange
    await authPage.openPage();
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    await catalogPage.openPage();
    await catalogPage.clickAddToCart(0);
    await catalogPage.clickAddToCart(1);

    // action
    const firstItemPrice = await catalogPage.getItemPrice(0);
    await catalogPage.clickAddToCart(1);

    await checkoutPage.openPage();
    await checkoutPage.fillUserInfo(GLITCH_USER);
    await checkoutPage.clickContinueButton();

    // assert
    await checkoutPage.expectSubtotal(firstItemPrice);
  });
});
