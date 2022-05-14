const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { GLITCH_USER } = require('../../testData/users.data');

test.describe("Add to cart tests", () => {
  test("Multiple items added", async ({ page }) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);

    // arrange
    await authPage.openPage();
    await authPage.enterLoginPass(GLITCH_USER.login, GLITCH_USER.password);
    await authPage.clickLogin();
    await catalogPage.expectPageOpened();

    // action
    const itemsCount = await catalogPage.getItemsCount();

    for (let i = 0; i < itemsCount; i++) {
      await catalogPage.clickAddToCart(i);
    }

    // assert
    for (let i = 0; i < itemsCount; i++) {
      await catalogPage.expectAddToCartButtonPressed(i, true);
    }
    await catalogPage.expectItemsOnCartBadge(itemsCount);

    // action
    await catalogPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();
    await cartPage.expectItemsInCart(itemsCount);
    await cartPage.expectItemsOnCartBadge(itemsCount);
  });
});
