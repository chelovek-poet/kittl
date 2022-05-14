const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Add to cart tests", () => {
  test("Remove items", async ({ page }) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);

    // arrange
    await authPage.openPage();
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();

    await catalogPage.openPage();
    await catalogPage.clickAddToCart(0);
    await catalogPage.clickAddToCart(1);
    await catalogPage.clickAddToCart(2);

    // action
    await catalogPage.clickAddToCart(0);

    // assert
    await catalogPage.expectAddToCartButtonPressed(0, false);
    await catalogPage.expectItemsOnCartBadge(2);

    // action
    await catalogPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();

    // action
    await cartPage.clickRemove(0);

    // assert
    await cartPage.expectItemsInCart(1);
    await cartPage.expectItemsOnCartBadge(1);
  });
});
