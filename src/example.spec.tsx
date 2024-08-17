import { test, expect } from '@playwright/test';

test('App 컴포넌트는 hello라는 h1 요소가 존재한다.', async ({ page }) => {
  // 애플리케이션의 루트 페이지로 이동
  // 로컬 서버 주소 (vite preview를 실행 중이라고 가정)
  // await page.goto('http://localhost:3000');
  // baseURL을 설정해서 full url을 적을 필요가 없음
  await page.goto('/');

  // "hello" 텍스트가 포함된 h1 요소가 있는지 확인
  const h1 = page.locator('h1');
  await expect(h1).toHaveText('hello');

  // 스크린샷 추가
  await expect(page).toHaveScreenshot();
});
