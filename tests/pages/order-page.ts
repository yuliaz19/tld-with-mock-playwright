import { Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
// what was added
export class OrderPage {
  readonly page: Page
  readonly statusButton
  readonly nameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  readonly createOrderButton: Locator
  readonly successPopUp: Locator
  readonly openStatusPopupButton: Locator
  readonly inputOrderField: Locator
  readonly trackButton: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.nameField = page.getByTestId('username-input')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.successPopUp = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.openStatusPopupButton = page.getByTestId('openStatusPopup-button')
    this.inputOrderField = page.getByTestId('searchOrder-input')
    this.trackButton = page.getByTestId('searchOrder-submitButton')
  }
  async createOrder() {
    await this.nameField.fill(faker.person.firstName())
    await this.phoneField.fill(faker.phone.number())
    await this.commentField.fill(faker.lorem.words(5))
    await this.createOrderButton.click()
  }
  async trackStatus(id: string) {
    await this.openStatusPopupButton.click()
    await this.inputOrderField.fill(id)
    await this.trackButton.click()
  }
}
