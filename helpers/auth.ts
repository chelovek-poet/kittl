import { Page, BrowserContext, request } from "playwright-core"
import { usersData } from "../testData/users.data"

export default class Auth {
  public page: Page
  public browserContext: BrowserContext
  
  constructor (page: Page, browserContext: BrowserContext) {
    this.page = page
    this.browserContext = browserContext
  }
  
  async login (user: string, context: BrowserContext) {
    await context.clearCookies()
    const req = await request.newContext({
      baseURL: "https://api.kittl.com/",
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'accept': "*/*",
      },
    })
  
  await req.post('/sessions/create', { data: usersData[user] }).then(async (res) => {
    try {
      const token = await res.json()
      await context.addCookies([
        {
          name: "htcUserAccessToken",
          value: token.accessToken,
          url: "http://app.kittl.com",
        },
        {
          name: "htcProfileAccessToken",
          value: token.accessToken,
          url: "http://app.kittl.com",
        },
      ])
      } catch (error) {
        console.log(`Failed to login: ${error}`)
      }
    })
  }
}

export { Auth }