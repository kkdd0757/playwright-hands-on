import { expect, test } from '@playwright/test';

// step 1. 반응형 웹 테스트
const viewPortCases = [
  // step 2. 크로스 브라우징 테스트 : height 변경해서 스크린샷 찍어보기
  { width: 1280, height: 720, viewportName: 'Desktop' },
  { width: 375, height: 667, viewportName: 'Mobile' },
];

viewPortCases.forEach(({ width, height, viewportName }) => {
  test(`Product Page 테스트 : viewport: ${viewportName}`, async ({ page }) => {
    // 뷰포트 크기 설정
    // page 이동 이후 viewport설정하면 reload 필요 : await page.reload();
    await page.setViewportSize({ width, height });
    await page.goto('/product');

    // 설명 보기 버튼
    const detailButton = page.locator('.view-details-button');
    // 설명 영역
    const description = page.locator('.description');

    if (viewportName === 'Desktop') {
      // hidden과 not.toBeVisible 둘 다 테스트 가능.
      // await expect(detailButton).not.toBeVisible();
      await expect(detailButton).toBeHidden();
      await expect(description).toBeVisible();
    } else {
      await expect(detailButton).toBeVisible();
      await expect(detailButton).toHaveText('설명 보기');
      await expect(description).toBeHidden();
      // step 2. 크로스 브라우징 테스트 : 버튼 클릭 이전 스크린샷 찍어보기
      await expect(page).toHaveScreenshot();
      await detailButton.click();
      await expect(description).toBeVisible();
      await expect(detailButton).toHaveText('설명 가리기');
    }

    // step 2. 크로스 브라우징 테스트
    await expect(page).toHaveScreenshot();
  });
});
