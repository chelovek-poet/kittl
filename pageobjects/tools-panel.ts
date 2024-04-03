import { Page } from 'playwright-core'

export default class ToolsPanel {
  private page: Page

  constructor (page: Page) {
    this.page = page
  }

  // Elements
  //-------------------------------------------------------------------------------------------------------------------
  get elementsButton() {
    return this.page.locator('[data-testid="elements-panel-trigger"]')
  }

  getElementById(id: string) {
    return this.page.locator(`[data-testid="element-${id}"]`)
  }

  // Actions
  //-------------------------------------------------------------------------------------------------------------------
  async clickElements() {
    await this.elementsButton.click()
  }

  async clickElement(id: string) {
    await this.getElementById(id).click()
  }
}

export { ToolsPanel }