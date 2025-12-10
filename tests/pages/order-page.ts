import { Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

export class OrderPage {
  readonly page: Page
  readonly statusButton
  readonly nameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  readonly createOrderButton: Locator
  readonly successPopUp: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.nameField = page.getByTestId('username-input')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.successPopUp = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
  }
  async createOrder() {
    await this.nameField.fill(faker.person.firstName())
    await this.phoneField.fill(faker.phone.number())
    await this.commentField.fill(faker.lorem.words(5))
    await this.createOrderButton.click()
  }
}
