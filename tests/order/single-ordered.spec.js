const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { PdpPage } = require('../../pageobjects/pdp.page');
const { CheckoutPage } = require('../../pageobjects/checkout.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Order tests", () => {
  test("Single item order and taxes", async ({ page }) => {
    const authPage = new AuthPage(page);
    const pdpPage = new PdpPage(page);
    const checkoutPage = new CheckoutPage(page);

    // arrange
    await authPage.openPage();
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    await pdpPage.openPage(Math.floor(Math.random() * 5));
    await pdpPage.clickAddToCart();

    await checkoutPage.openPage();

    // action
    await checkoutPage.fillUserInfo(GLITCH_USER);
    await checkoutPage.clickContinueButton();

    // assert
    await checkoutPage.expectUserInfoEntered();
    await checkoutPage.expectTotal();
  });
});
