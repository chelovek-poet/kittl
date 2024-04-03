import { Page } from 'playwright-core'

export default class AdModal {
  private page: Page

  constructor (page: Page) {
    this.page = page
  }

  // Elements
  //-------------------------------------------------------------------------------------------------------------------
  get header() {
    return this.page.getByText("Upgrade Plan")
  }
}

export { AdModal }