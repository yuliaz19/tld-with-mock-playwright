import { fakeJwt } from '../utils/jwt-generator'
import { Page } from '@playwright/test'

export async function mockLogin(page: Page) {
  const jwt = fakeJwt()

  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      body: jwt, // plain text token
      status: 200,
    })
  })
}
