import { Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

export async function mockOrderStatus(
  page: Page,
  id: number,
  status: string = 'OPEN'
) {
  const orderResponse = {
    status: status,
    courierId: null,
    customerName: faker.person.firstName(),
    customerPhone: faker.phone.number(),
    comment: faker.lorem.words(5),
    id: id
  }

  await page.route(`**/orders/${id}`, async (route) => {
    await route.fulfill({
      json: orderResponse,
      status: 200,
    })
  })

}
