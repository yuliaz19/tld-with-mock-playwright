import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'
import { faker } from '@faker-js/faker';
import { OrderPage } from './order-page'

export class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly usernameField
  readonly passwordField
  readonly signInButton: Locator
  readonly openStatusPopupButton: Locator
  readonly inputOrderField: Locator
  readonly trackButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.signInButton = page.getByTestId('signIn-button')
    this.openStatusPopupButton = page.getByTestId('openStatusPopup-button')
    this.inputOrderField = page.getByTestId('searchOrder-input')
    this.trackButton = page.getByTestId('searchOrder-submitButton')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn() {
    await this.usernameField.fill(faker.internet.username())
    await this.passwordField.fill(faker.internet.password())
    await this.signInButton.click()
  }

  async trackStatus(id: string) {
    await this.openStatusPopupButton.click()
    await this.inputOrderField.fill(id)
    await this.trackButton.click()
  }
}
