// 설정 문서 : https://playwright.dev/docs/test-configuration
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './',
  // Run all tests in parallel.
  fullyParallel: true,
  // 리포트 파일(예: HTML 리포트, 테스트 실행 로그 등)을 저장할 디렉토리 지정
  reporter: [['html', { outputFolder: 'playwright' }]],
  use: {
    // 실패 시만 스크린샷 찍기 (필요시 변경 가능)
    screenshot: 'only-on-failure',
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // 서버 실행 옵션
  // 문서 : https://playwright.dev/docs/test-webserver#configuring-a-web-server
  webServer: {
    command: 'vite preview --port 3000', // Vite의 프리뷰 서버 실행
    port: 3000,
    reuseExistingServer: !process.env.CI, // CI 환경에서는 서버를 재사용하지 않음
  },
  // screenshot 저장할 위치
  snapshotDir: '__screenshot__',
  // 필요한 브라우저와 환경을 설정
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
