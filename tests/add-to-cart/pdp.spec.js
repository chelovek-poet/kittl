const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { PdpPage } = require('../../pageobjects/pdp.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Add to cart tests", () => {
  test("Add to cart from PDP", async ({ page }) => {
    const authPage = new AuthPage(page);
    const pdpPage = new PdpPage(page);
    const cartPage = new CartPage(page);

    // arrange
    await authPage.openPage();
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    await pdpPage.openPage(Math.floor(Math.random() * 5));

    // action
    const itemTitle = await pdpPage.getItemTitle();
    const itemPrice = await pdpPage.getItemPrice();
    await pdpPage.clickAddToCart();

    // assert
    await pdpPage.expectAddToCartButtonPressed(true);
    await pdpPage.expectItemsInCart(1);

    // action
    await pdpPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();
    await cartPage.expectItemTitle(0, itemTitle);
    await cartPage.expectItemPrice(0, itemPrice);
  });
});
