import { expect, test } from '@playwright/test';

// step 1. 반응형 웹 테스트
const viewPortCases = [
  { width: 1280, height: 720, viewportName: 'Desktop' },
  { width: 375, height: 667, viewportName: 'Mobile' },
];

viewPortCases.forEach(({ width, height, viewportName }) => {
  test(`Product Page 테스트 : viewport: ${viewportName}`, async ({ page }) => {
    // 뷰포트 크기 설정
    await page.setViewportSize({ width, height });
    await page.goto('/product');

    const detailButton = page.getByTestId('view-details-button');
    const description = page.getByTestId('description');
    if (viewportName === 'Desktop') {
      await expect(detailButton).not.toBeVisible();
      await expect(detailButton).toBeHidden();
      await expect(description).toBeVisible();
    } else {
      await expect(detailButton).toBeVisible();
      await expect(detailButton).toHaveText('설명 보기');
      await expect(description).toBeHidden();
      await detailButton.click();
      await expect(description).toBeVisible();
    }
  });
});
