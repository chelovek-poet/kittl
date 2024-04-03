import { fixtures as test } from '../../fixture'

test.describe('Draw figure', () => {
  [...['3307', '3313']].forEach(element => {
    test(`Draw element ${element}`, async ({
      context,
      page,
      auth,
      adModal,
      toolsPanel,
      stylesPanel,
    }) => {
      // arrange
      await auth.login('default', context)
      await page.goto('/')
      await adModal.header.waitFor()
      await page.keyboard.press('Escape')

      // action
      await toolsPanel.clickElements()
      await toolsPanel.clickElement(element)

      // assert
      await stylesPanel.checkPanelHeader()
    })
  })
})