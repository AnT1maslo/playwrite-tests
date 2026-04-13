import { test, expect, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('проверка отображения элементов главной страницы', async () => {
    await mainPage.checkElementsVisability();
  });

  test('проверка текста элементов главной страницы', async () => {
    await mainPage.checkElementsText();
  });

  test('проверка атрибута href элементов хедера', async () => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('проверка переключения с light на dark мод', async () => {
    await test.step('нажатие на иконку переключения Light мода', async () => {
      await mainPage.switchBetweenLightAndDarkMode();
    });
    await test.step('проверка значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`проверка стилей активного light мода`, async () => {
    await test.step('установка light мода', async () => {
      await mainPage.setLightMode();
    });
    await test.step('проверка стилей light мода', async () => {
      await mainPage.checkPageStylesWithLightMode();
    });
  });

  test(`проверка стилей активного dark мода`, async () => {
    await test.step('установка dark мода', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('проверка стилей dark мода', async () => {
      await mainPage.checkPageStylesWithDarkMode();
    });
  });
});
