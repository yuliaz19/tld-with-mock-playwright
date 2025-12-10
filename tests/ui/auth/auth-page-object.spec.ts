import { expect, test } from '@playwright/test'
import { SERVICE_URL } from '../../../config/env-data'
import { fakeJwt } from '../../utils/jwt-generator'
import { mockLogin } from '../../mocks/mock-login'
import { mockIncorrLogin } from '../../mocks/mock-incorr-login'
import { mockCreateOrder } from '../../mocks/mock-create-order'
import { mockOrderStatus } from '../../mocks/mock-order-status'
import { LoginPage } from '../../pages/login-page'
import { runInNewContext } from 'node:vm'
import { OrderPage } from '../../pages/order-page'

let loginPage: LoginPage

test('Sign in negative flow with mock WITHOUT BEFOREEACH', async ({ page }) => {
  await mockIncorrLogin(page);
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.signIn()
  await expect(page.getByTestId('authorizationError-popup-close-button')).toBeVisible()
})

test.describe('tests WITH BEFOREEACH', () => {

test.beforeEach(async ({ page }) => {
  await mockLogin(page)
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.signIn()
});

test('Sign in positive flow with mock', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await expect(loginPage.openStatusPopupButton).toBeVisible()
})

test('Sign in and create order with mock', async ({ page }) => {
  await mockCreateOrder(page)
  const orderPage = new OrderPage(page)
  await orderPage.createOrder()
  await expect(orderPage.successPopUp).toBeVisible()
})

test('Sign in and get order by id with mock', async ({ page }) => {

  await mockOrderStatus(page, 13998, 'OPEN')
  const loginPage = new LoginPage(page)
  await loginPage.trackStatus('13998')
  await expect (page.getByTestId('status-item-0')).toBeVisible()
  await expect (page.getByText('OPEN')).toBeVisible()
})

test('Sign in and get order ACCEPTED order with mock', async ({ page }) => {

  await mockOrderStatus(page, 13998, 'ACCEPTED')
  const loginPage = new LoginPage(page)
  await loginPage.trackStatus('13998')
  await expect (page.getByTestId('status-item-0')).toBeVisible()
  await expect (page.getByText('ACCEPTED')).toBeVisible()
})
  })