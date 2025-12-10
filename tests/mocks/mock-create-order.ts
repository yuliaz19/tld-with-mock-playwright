import { Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

export async function mockCreateOrder(page: Page) {
  const orderResponse = {
    status: 'OPEN',
    courierId: null,
    customerName: faker.person.firstName(),
    customerPhone: faker.phone.number(),
    comment: faker.lorem.word(),
    id: faker.number.int(),
  }

  await page.route('**/orders', async (route) => {
    await route.fulfill({
      json: orderResponse,
      status: 200,
    })
  })
}
