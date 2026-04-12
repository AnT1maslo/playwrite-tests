import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';

interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Element[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js',
    text: 'Node.js',
    attribute: {
      type: 'href',
      value: '#',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search (Ctrl+K)',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Title',
    text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
  },
  {
    locator: (page: Page): Locator => page.getByText('One API to drive Chromium,'),
    name: 'Description',
    text: 'One API to drive Chromium, Firefox, and WebKit — in your tests, your scripts, and your agent workflows. Available for TypeScript, Python, .NET, and Java.',
  },
];

const lightMode = ['light', 'dark'];

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('проверка отображения элементов главной страницы', async ({ page }) => {
    for (const { locator, name } of elements) {
      await test.step(`проверка отображения элемента: ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    }
  });

  test('проверка текста элементов главной страницы', async ({ page }) => {
    for (const { locator, name, text } of elements) {
      if (text) {
        await test.step(`проверка текста элемента: ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    }
  });

  test('проверка атрибута href элементов хедера', async ({ page }) => {
    for (const { locator, name, attribute } of elements) {
      if (attribute) {
        await test.step(`проверка атрибута href элемента: ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  });

  test('проверка dark/light мода', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Switch between dark and light' }).dblclick();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('проверка отображения и перехода по ссылке Get started', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  });
  lightMode.forEach((value) => {
    test(`проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`, {
        maxDiffPixelRatio: 0.15
      });
    });
  });
});
