import { expect, test } from '@playwright/test'
import { SERVICE_URL } from '../../../config/env-data'
import { fakeJwt } from '../../utils/jwt-generator'

test('Sign in positive flow with mock', async ({ page }) => {
  const jwt = fakeJwt()

  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      // body not a json but a plain text
      body: jwt,
      status: 200,
    })
  })

  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('12345678')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('qwertyui')
  const signInButton = page.getByTestId('signIn-button')
  await signInButton.click()
  await expect(page.getByTestId('openStatusPopup-button')).toBeVisible()
})

test('Sign in negative flow with mock', async ({ page }) => {
  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      // no body
      status: 401,
    })
  })

  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('12345678')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('qwertyui')
  const signInButton = page.getByTestId('signIn-button')
  await signInButton.click()
  await expect(page.getByTestId('authorizationError-popup-close-button')).toBeVisible()
})

test('Sign in and create order with mock', async ({ page }) => {
  const jwt = fakeJwt()

  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      body: jwt,
      status: 200,
    })
  })

  const orderResponse = {
    status: 'OPEN',
    courierId: null,
    customerName: 'Iulia',
    customerPhone: '123456',
    comment: 'test',
    id: 13998,
  }
  await page.route('**/orders', async (route) => {
    await route.fulfill({
      json: orderResponse,
      status: 200,
    })
  })

  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('12345678')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('qwertyui')
  const signInButton = page.getByTestId('signIn-button')
  await signInButton.click()
  await expect(page.getByTestId('openStatusPopup-button')).toBeVisible()
  const nameField = page.getByTestId('username-input')
  await nameField.fill('Yulia')
  const phoneField = page.getByTestId('phone-input')
  await phoneField.fill('123456')
  const commentField = page.getByTestId('comment-input')
  await commentField.fill('test')
  const createOrderButton = page.getByTestId('createOrder-button')
  await createOrderButton.click()
  await expect(page.getByTestId('orderSuccessfullyCreated-popup-ok-button')).toBeVisible()
})

test('Sign in and get order by id with mock', async ({ page }) => {
  const jwt = fakeJwt()

  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      body: jwt,
      status: 200,
    })
  })

  const orderResponse = {
    status: 'OPEN',
    courierId: null,
    customerName: 'Iulia',
    customerPhone: '123456',
    comment: 'test',
    id: 13998,
  }
  await page.route('**/orders/13998', async (route) => {
    await route.fulfill({
      json: orderResponse,
      status: 200,
    })
  })

  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('12345678')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('qwertyui')
  const signInButton = page.getByTestId('signIn-button')
  await signInButton.click()
  const statusButton = page.getByTestId('openStatusPopup-button')
  await statusButton.click()
  const inputOrderField = page.getByTestId('searchOrder-input')
  await inputOrderField.fill('13998')
  const trackButton = page.getByTestId('searchOrder-submitButton')
  await trackButton.click()
  await expect(page.getByTestId('status-item-0')).toBeVisible()
  await expect(page.getByText('OPEN')).toBeVisible()
})

test('Sign in and get order ACCEPTED order with mock', async ({ page }) => {
  const jwt = fakeJwt()

  await page.route('**/login/student', async (route) => {
    await route.fulfill({
      body: jwt,
      status: 200,
    })
  })

  const orderResponse = {
    status: 'ACCEPTED',
    courierId: null,
    customerName: 'Iulia',
    customerPhone: '123456',
    comment: 'test',
    id: 13998,
  }
  await page.route('**/orders/13998', async (route) => {
    await route.fulfill({
      json: orderResponse,
      status: 200,
    })
  })

  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('12345678')
  const passwordField = page.getByTestId('password-input')
  await passwordField.fill('qwertyui')
  const signInButton = page.getByTestId('signIn-button')
  await signInButton.click()
  const statusButton = page.getByTestId('openStatusPopup-button')
  await statusButton.click()
  const inputOrderField = page.getByTestId('searchOrder-input')
  await inputOrderField.fill('13998')
  const trackButton = page.getByTestId('searchOrder-submitButton')
  await trackButton.click()
  await expect(page.getByTestId('status-item-0')).toBeVisible()
  await expect(page.getByText('ACCEPTED')).toBeVisible()
})
