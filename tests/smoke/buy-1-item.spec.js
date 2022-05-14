const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { CheckoutPage } = require('../../pageobjects/checkout.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Smoke test", () => {
  test("Buy 1 item", async ({ page }) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // arrange
    await authPage.openPage();

    // action
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    // assert
    await catalogPage.expectPageOpened();

    // action
    await catalogPage.clickAddToCart(0);
    await catalogPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();

    // action
    await cartPage.clickCheckoutButton();

    // assert
    await checkoutPage.expectPageOpened();

    // action
    await checkoutPage.fillUserInfo(GLITCH_USER);
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();

    // assert
    await checkoutPage.expectCheckoutCompleted();
  });
});
