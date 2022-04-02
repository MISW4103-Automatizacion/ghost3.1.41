import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:2368/ghost');
  });

  test.describe('Crear usuario ghost', () => {
    test('Clic en el boton Create your account', async ({ page }) => {
        page.locator('//*[@id="ember12"]/span').click();
      });
});