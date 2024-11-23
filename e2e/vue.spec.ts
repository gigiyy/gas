import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('div.greetings > h3')).toHaveText('Welcome')
})

test('can add and view gasoline records', async ({ page }) => {
  // Navigate to gasoline page
  await page.goto('/gasoline')

  // Fill out the form
  await page.getByLabel('Date').fill('2024-01-15')
  await page.getByLabel('Distance (Km)').fill('45')
  await page.getByLabel('Value (¥)').fill('65')

  // Submit the form
  await page.getByRole('button', { name: 'Add' }).click()

  // Verify the new record appears in the list
  const listItem = page.locator('.gasoline-list-item').first()
  await expect(listItem).toContainText('45Km')
  await expect(listItem).toContainText('¥65')
  await expect(listItem).toContainText('2024-01-15')
})
