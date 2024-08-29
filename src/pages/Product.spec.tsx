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
    const detailButton = page.locator('.view-details');
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

// step 3. 인터렉션 테스트
const userTestCases = [
  { isUser: 'false', redirectUrl: '/login' },
  { isUser: 'true', redirectUrl: '/cart' },
];

userTestCases.forEach(({ isUser, redirectUrl }) => {
  test(`Product Page 인터렉션 테스트: isUser: ${isUser}, redirectUrl: ${redirectUrl}`, async ({
    page,
  }) => {
    // 페이지를 새로고침하거나 이동
    await page.goto('/product');
    // set localStorage
    await page.evaluate(isUser => localStorage.setItem('isLoggedIn', isUser), isUser);

    // 설정된 로컬 스토리지 값을 반영하여 페이지를 새로고침
    // -> 페이지 접근후 localStorage 세팅한것이기 때문
    // 이 부분이 없으면 localStorage 반영되지 않음
    await page.reload();

    // getByRole : role로 element찾기
    const cartButton = page.getByRole('button', { name: '장바구니 담기' });

    await expect(cartButton).toBeVisible();
    // viewport에 해당 element가 잡히는지 확인
    // await expect(cartButton).toBeInViewport();

    await cartButton.click();
    await expect(page).toHaveURL(redirectUrl);
  });
});
