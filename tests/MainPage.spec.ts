import { test, expect } from '@playwright/test';

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('проверка отображения элементов хедера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
  });

  test('проверка названия элементов хедера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
    await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
    await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });

  test('проверка атрибута href элементов хедера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
      'href',
      '/docs/api/class-playwright',
    );
    await expect(page.getByRole('button', { name: 'Node.js' })).toHaveAttribute('href', '#');
    await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/community/welcome',
    );
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright',
    );
    await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
      'href',
      'https://aka.ms/playwright/discord',
    );
  });

  test('проверка dark/light мода', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Switch between dark and light' }).dblclick();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка элементов основного контента', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.',
    );
    await expect(page.getByText('One API to drive Chromium,')).toBeVisible();
    await expect(page.getByText('One API to drive Chromium,')).toContainText(
      'One API to drive Chromium, Firefox, and WebKit — in your tests, your scripts, and your agent workflows. Available for TypeScript, Python, .NET, and Java.',
    );
  });

  test('Проверка отображения и перехода по ссылке Get started', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  });
});
