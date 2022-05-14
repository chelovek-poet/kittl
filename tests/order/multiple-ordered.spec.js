const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CheckoutPage } = require('../../pageobjects/checkout.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Order tests", () => {
  test("Sum of multiple items in order", async ({ page }) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);

    // arrange
    await authPage.openPage();
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    await catalogPage.openPage();
    const itemsCount = await catalogPage.getItemsCount();
    let totalPrice = 0;
    for (let i = 0; i < itemsCount; i++) {
      await catalogPage.clickAddToCart(i);
      totalPrice += await catalogPage.getItemPrice(i);
    }

    await checkoutPage.openPage();

    // action
    await checkoutPage.fillUserInfo(GLITCH_USER);
    await checkoutPage.clickContinueButton();

    // assert
    await checkoutPage.expectUserInfoEntered();
    await checkoutPage.expectItemsInCheckout(itemsCount);
    await checkoutPage.expectSubtotal(totalPrice);
  });
});
