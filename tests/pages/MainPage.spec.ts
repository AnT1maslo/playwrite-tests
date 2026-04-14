import { test } from '../fixtures/mainPage';

test.describe('тесты главной страницы', () => {
  test('проверка отображения элементов главной страницы', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('проверка текста элементов главной страницы', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('проверка атрибута href элементов хедера', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('проверка переключения с light на dark мод', async ({ mainPage }) => {
    await test.step('нажатие на иконку переключения Light мода', async () => {
      await mainPage.switchBetweenLightAndDarkMode();
    });
    await test.step('проверка значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`проверка стилей активного light мода`, async ({ mainPage }) => {
    await test.step('установка light мода', async () => {
      await mainPage.setLightMode();
    });
    await test.step('проверка стилей light мода', async () => {
      await mainPage.checkPageStylesWithLightMode();
    });
  });

  test(`проверка стилей активного dark мода`, async ({ mainPage }) => {
    await test.step('установка dark мода', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('проверка стилей dark мода', async () => {
      await mainPage.checkPageStylesWithDarkMode();
    });
  });
});
