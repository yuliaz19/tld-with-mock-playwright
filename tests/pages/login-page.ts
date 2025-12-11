import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'
import { faker } from '@faker-js/faker'
import { OrderPage } from './order-page'
// what was added
export class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly usernameField
  readonly passwordField
  readonly signInButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.signInButton = page.getByTestId('signIn-button')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn() {
    await this.usernameField.fill(faker.internet.username())
    await this.passwordField.fill(faker.internet.password())
    await this.signInButton.click()
  }
}
