import { test as base } from '@playwright/test'
import Auth from './helpers/auth'
import AdModal from './pageobjects/ad-modal'
import ArtboardSettingsModal from './pageobjects/artboard-settings-modal'
import ToolsPanel from './pageobjects/tools-panel'
import StylesPanel from './pageobjects/styles-panel'

const fixtures = base.extend<{
  auth: Auth
  adModal: AdModal
  artboardSettingsModal: ArtboardSettingsModal
  toolsPanel: ToolsPanel
  stylesPanel: StylesPanel
}>({
  auth: async ({ page, context }, use) => {
    const auth = new Auth(page, context)
    await use(auth)
  },
  adModal: async ({ page }, use) => {
    const adModal = new AdModal(page)
    await use(adModal)
  },
  artboardSettingsModal: async ({ page }, use) => {
    const artboardSettingsModal = new ArtboardSettingsModal(page)
    await use(artboardSettingsModal)
  },
  toolsPanel: async ({ page }, use) => {
    const toolsPanel = new ToolsPanel(page)
    await use(toolsPanel)
  },
  stylesPanel: async ({ page }, use) => {
    const stylesPanel = new StylesPanel(page)
    await use(stylesPanel)
  },
})

export { fixtures }
