import { Page } from 'playwright-core'

export default class ArtboardSettingsModal {
  private page: Page

  constructor (page: Page) {
    this.page = page
  }

  // Elements
  //-------------------------------------------------------------------------------------------------------------------
  get createButton() {
    return this.page.locator('[data-testid="create-button"]')
  }

  // Actions
  //-------------------------------------------------------------------------------------------------------------------
  async clickCreate() {
    await this.createButton.click()
  }
}

export { ArtboardSettingsModal }