# Playwright Hands On

## Playwright란?

- Chromium, WebKit, Firefox 등 모든 주요 브라우저에서 End-to-End 테스트 지원합니다.
- UI 차이를 시각적으로 확인할 수 있어, 변경 사항을 쉽게 파악 가능한 테스트입니다.
- 자세한 설명은 (여기를)[https://playwright.dev/] 참조해주세요.

## 용어 설명

- Viewport : 웹페이지가 화면에 보여지는 부분을 의미합니다. 뷰포트 크기(width, height)를 설정하여 데스크톱, 태블릿, 모바일 장치 등 다양한 화면 크기에서 웹 페이지가 어떻게 보이는지를 테스트할 수 있습니다.

- Locator : Playwright > Locator 객체는 DOM 요소를 참조하고, 그 요소에 대한 상호작용(e.g. click)을 수행할 수 있도록 도와줍니다.

- Page: Playwright > Page는 웹 애플리케이션을 제어하는 주요 인터페이스입니다. 웹 페이지를 로드하고, 페이지 내에서의 상호작용(예: 클릭, 입력, 스크린샷 캡처 등)을 처리하며, 네트워크 요청 및 응답을 제어할 수 있습니다.

- Evaluate : evaluate 메서드는 웹 페이지의 컨텍스트에서 JavaScript 코드를 실행할 수 있게 합니다. 이를 통해 페이지의 DOM이나 전역 변수에 접근하고 조작할 수 있습니다.

- test : 테스트를 정의하는 함수입니다. test 함수 안에서 테스트의 목적, 준비 작업, 실행 내용, 그리고 검증 내용을 작성합니다.

- expect : 테스트 결과를 검증하는 데 사용됩니다.

## 실습하기 전 몸풀기

- App.tsx > h1 요소에 'hello'라는 텍스트가 존재하는지 테스트
- screenshot이 브라우저별로 생성되는지 확인
- hello라는 텍스트를 수정했을 때, 테스트가 fail 하는지 확인

## 실습 시나리오 및 목표

### 목표

1. 다양한 뷰포트와 브라우저 환경에서 웹 애플리케이션의 UI와 기능이 일관되게 동작하는지 확인
2. 사용자의 로그인 상태에 따른 페이지 전환을 검증

### 시나리오

#### step 1. 반응형 웹 테스트 (viewport)

- viewport 크기에 따라 버튼이 노출 여부 확인
  - MWeb :
    - 최초 > '설명 보기' 버튼 노출 + 설명 미노출
    - 해당 버튼 클릭 시 > '설명 가리기' 버튼 노출 + 설명 노출
  - PC :
    - 설명 보기 미노출 + 설명 노출

#### step 2. 크로스 브라우징 테스트 (Cross-browser)

- screenshot이 브라우저별로 생성되는지 확인

#### step 3. 인터렉션 테스트 (login)

- product 페이지
  - 로그인 유저 : cart 페이지로 이동
  - 미로그인 유저 : login 페이지로 이동

### 브랜치별 설명

**기초 테스트**

- feat/simple-test : simple test에서 놓친 분들을 위한 branch

**playwright 테스트 마크업**

- feat/playwright-markup: 전반적인 실습을 위한 마크업 브랜치

**step 1 테스트**

- feat/test1 : 반응형 웹 테스트 놓친 분들을 위한 테스트

**step 2 테스트**

- feat/test2 : 크로스 브라우징 테스트 놓친 분들을 위한 테스트

**step 3 테스트**

- feat/test3 : 인터렉션 테스트 놓친 분들을 위한 테스트
