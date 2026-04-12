import { test, expect } from '@playwright/test';


test.describe('Тесты с использованием beforeEach/afterEach для cookies', () => {
    test.beforeEach(async ({ context }) => {
        await context.addCookies([{ name: 'session', value: '12345', url: 'https://example.com' }]);
    });

    test.afterEach(async ({ context }) => {
        await context.clearCookies();
    });

    test('проверить cookies', async ({ page }) => {
        await page.goto('https://example.com');
        const cookies = await page.context().cookies();
        expect(cookies).toContainEqual(expect.objectContaining({ name: 'session', value: '12345' }));
    });
});