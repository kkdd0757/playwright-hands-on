# 🧪 이 UI 깨지는데요? 테스트가 나보다 먼저 QA 하게 하기 (feat. Playwright)

## 🛠 System Requirements

- Node.js 18+
- Windows 10+, Windows Server 2016+ 또는 Windows Subsystem for Linux (WSL).
- macOS 13 Ventura, 또는 macOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 또는 Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

**실습을 위해 npm을 사용합니다.**

```bash
npm run setup
```

## 🎭 Playwright란?

- Chromium, WebKit, Firefox 등 모든 주요 브라우저에서 End-to-End 테스트를 지원합니다.
- UI 차이를 시각적으로 확인할 수 있어, 변경 사항을 쉽게 파악할 수 있는 테스트입니다.
- 자세한 설명은 [여기를](https://playwright.dev/) 참조해주세요.

## 💡 Playwright의 장점

1. **수정 / 추가된 UI가 바로 보인다**

   - 따로 screenshot을 PR에 붙이지 않아도 되고, 리뷰어도 변경 사항이 바로 보여서 코드 리뷰하기도 편하다.
   - 코드 작성자 입장에서도 본인의 수정 사항을 바로 발견할 수 있다.

2. **로컬에서 테스트하기 어려운 또는 귀찮은 케이스**

   - UI가 다 찍혀서 local을 킬 수 없는 상황에서 유용하다.

3. **Playwright Codegen**

## 📚 용어 설명

- **Viewport**:
  - 웹페이지가 화면에 보여지는 부분을 의미합니다.
  - 뷰포트 크기(width, height)를 설정하여 데스크톱, 태블릿, 모바일 장치 등 다양한 화면 크기에서 웹 페이지가 어떻게 보이는지를 테스트할 수 있습니다.
- **Locator**:
  - Playwright의 Locator 객체는 DOM 요소를 참조하고, 그 요소에 대한 상호작용(e.g. click)을 수행할 수 있도록 도와줍니다.
- **Page**:
  - Playwright의 Page는 웹 애플리케이션을 제어하는 주요 인터페이스입니다.
  - 웹 페이지를 로드하고, 페이지 내에서의 상호작용(예: 클릭, 입력, 스크린샷 캡처 등)을 처리하며, 네트워크 요청 및 응답을 제어할 수 있습니다.
- **Evaluate**:
  - evaluate 메서드는 웹 페이지의 컨텍스트에서 JavaScript 코드를 실행할 수 있게 합니다.
  - 이를 통해 페이지의 DOM이나 전역 변수에 접근하고 조작할 수 있습니다.
- **Test**:
  - 테스트를 정의하는 함수입니다.
  - test 함수 안에서 테스트의 목적, 준비 작업, 실행 내용, 그리고 검증 내용을 작성합니다.
- **Expect**:
  - 테스트 결과를 검증하는 데 사용됩니다.

## ⚙️ Playwright config 설명

1. **fullyParallel**

   - 모든 테스트를 병렬로 실행할지 여부를 설정합니다.

2. **use**

   - 객체 내에 기본적으로 사용될 테스트 환경의 옵션을 설정합니다.
   - `baseURL`: 테스트에서 사용하는 기본 URL을 지정합니다.
   - `screenshot`: 실패 시에만 reports를 열리도록 설정합니다.

3. **webServer**

   - 테스트를 실행하기 전에 웹 서버를 자동으로 시작하는 방법을 정의합니다.
   - 이 설정은 실제 서버가 실행되지 않은 상태에서도 테스트를 수행할 수 있게 해줍니다.

4. **projects**
   - 여러 브라우저와 환경에서 테스트를 실행할 수 있도록 설정합니다.

더 자세히 알고 싶다면 `playwright.config.ts`에 주석을 추가해두었으니 해당 파일을 참고 부탁드립니다.

## 🧪 기초 테스트

**브랜치**: `feat/simple-test`

- **1 + 1 = 2 테스트**

  ```typescript
  expect(1 + 1).toBe(2);
  ```

## 🤸 실습하기 전 몸풀기

- h1 element가 존재하는지 확인
- 'hello'라는 텍스트가 존재하는지 확인

```typescript
const headingElement = page.locator('h1');
expect(headingElement).toBeVisible();
expect(headingElement).toHaveText('hello');
```

- **Screenshot 생성**
- 'hello'에서 'playwright'로 변경 후 테스트

```bash
npm test
npm test:update
```

## 🎯 실습 시나리오 및 목표

### 목표

1. 다양한 뷰포트와 브라우저 환경에서 웹 애플리케이션의 UI와 기능이 일관되게 동작하는지 확인
2. 사용자의 로그인 상태에 따른 페이지 전환을 검증

**브랜치**: `feat/playwright-markup`

## 🧩 시나리오

### Step 1. 반응형 웹 테스트 (viewport)

**브랜치**: `feat/test1`

- **Viewport에 따라 노출되는 UI가 달라진다.**

  - Detail Button className = `view-details`;
  - Description className = `description`;
  - isMobile: `window.innerWidth <= 480px`;

- **Viewport 크기에 따라 버튼 노출 여부 확인**
  - **Mobile**: `(width: 380px, height: 800px)`
    - 최초 > '설명 보기' 버튼 노출 + 설명 미노출
    - 해당 버튼 클릭 시 > '설명 가리기' 버튼 노출 + 설명 노출
  - **PC**: `(width: 1020px, height: 800px)`
    - 설명 보기 미노출 + 설명 노출

### Step 2. 크로스 브라우징 테스트 (Cross-browser)

**브랜치**: `feat/test2`

- **Chrome, Safari, Firefox에서 Screenshot을 생성해 각 브라우저의 UI를 확인한다.**

#### Test 1.

- **Mobile**: 설명 보기 클릭 이전에 screenshot 생성
- **PC**: 설명 보기 클릭 이후에 screenshot 생성

#### Test 2.

- **Webkit**에서만 이미지 영역 텍스트가 상단에 붙어있음을 확인한다.

- **해결 방법**

  - `Product.css` > `.product-image`에 아래를 수정

**AS-IS**

```css
.product-image {
  text-align: center;
  align-content: center;
}
```

**TO-BE**

```css
.product-image {
  display: -webkit-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Step 3. 인터랙션 테스트

**브랜치**: `feat/test3`

- **로그인 여부에 따라 redirect되는 URL이 달라진다**

#### 명세

- **로그인**

- `localStorage`에 `('isLoggedIn', 'true')`를 set한다.
- `page`를 reload한다.
- Redirect: `'/cart'`로 이동한다.

- **미로그인**
- `localStorage`에 `('isLoggedIn', 'true')` -> 생략 가능
- `page`를 reload한다.
- Redirect: `'/login'`으로 이동한다.

## 🚧 Playwright 테스트의 현실적 한계

### 브랜치별 설명

- **기초 테스트**
  - `feat/simple-test`: Simple test에서 놓친 분들을 위한 브랜치
- **Step 1 테스트**
  - `feat/test1`: 반응형 웹 테스트 놓친 분들을 위한 브랜치
- **Step 2 테스트**
  - `feat/test2`: 크로스 브라우징 테스트 놓친 분들을 위한 브랜치
- **Step 3 테스트**
  - `feat/test3`: 인터랙션 테스트 놓친 분들을 위한 브랜치
