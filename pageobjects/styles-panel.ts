import { Page } from 'playwright-core'
import { expect } from 'playwright/test'

export default class StylesPanel {
  private page: Page

  constructor (page: Page) {
    this.page = page
  }

  // Elements
  //-------------------------------------------------------------------------------------------------------------------
  get panelHeader() {
    return this.page.locator('[data-testid="styles-panel"] > div').nth(0)
  }

  // Expects
  //-------------------------------------------------------------------------------------------------------------------
  async checkPanelHeader() {
    await expect(this.panelHeader).toHaveText("Settings")
  }
}

export { StylesPanel }