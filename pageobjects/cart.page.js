const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  /**
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Elements
  //--------------------------------------------------------------------------------------------------------------------
  get itemsHeaders() {
    return this.page.locator('.inventory_item_name');
  }

  get itemsPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get removeButtons() {
    return this.page.locator('.cart_button');
  }

  get checkoutButton() {
    return this.page.locator('#checkout');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  // Actions
  //--------------------------------------------------------------------------------------------------------------------
  async openPage() {
    await this.page.goto('/cart.html');
  }

  async getItemsCount() {
    return await this.itemsHeaders.count();
  }

  async clickRemove(itemNumber) {
    await this.removeButtons.nth(itemNumber).click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

 // Expects
  //--------------------------------------------------------------------------------------------------------------------
  async expectPageOpened() {
    await expect(this.page).toHaveURL("/cart.html");
  }

  async expectAddToCartButtonPresssed(itemNumber, isPressed) {
    if(!isPressed) {
      expect(this.addToCartButtons.nth(itemNumber)).toHaveText("ADD TO CART");
    } else {
      expect(this.addToCartButtons.nth(itemNumber)).toHaveText("REMOVE");
    }
  }

  async expectItemsInCart(count) {
    await expect(this.itemsHeaders).toHaveCount(count);
  }

  async expectItemsOnCartBadge(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectItemTitle(itemNumber, title) {
    await expect(this.itemsHeaders.nth(itemNumber)).toHaveText(title);
  }

  async expectItemPrice(itemNumber, price) {
    await expect(this.itemsPrices.nth(itemNumber)).toHaveText(price);
  }
}
