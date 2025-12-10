import { Page } from '@playwright/test'
import { fakeJwt } from '../utils/jwt-generator'

export async function mockIncorrLogin(page: Page) {
  const jwt = fakeJwt()

  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      // no body
      status: 401,
    })
  })
}