import { Page, Locator, expect, test } from '@playwright/test';

interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Element[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
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
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisability() {
    for (const { locator, name } of this.elements) {
      await test.step(`проверка отображения элемента: ${name}`, async () => {
        await expect(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`проверка текста элемента: ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`проверка атрибута href элемента: ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }

  async switchBetweenLightAndDarkMode() {
    await this.page.getByRole('button', { name: 'Switch between dark and light' }).dblclick();
  }

  async checkDataThemeAttributeValue() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }

  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  async checkPageStylesWithLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithLightMode.png`, {
      maxDiffPixelRatio: 0.15,
    });
  }

  async checkPageStylesWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithDarkMode.png`, {
      maxDiffPixelRatio: 0.15,
    });
  }
}
