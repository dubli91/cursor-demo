# cursor-demo

이메일 추출·검증 유틸리티와 단위 테스트를 제공하는 간단한 Node.js 데모 프로젝트입니다.

## 기능

- `extractEmails(members)`: 사용자 객체 배열에서 이메일만 추출
- `isValidEmail(email)`: RFC 5322 권장 정규식 기반 이메일 형식 검증
- `getValidEmails(members)`: 유효한 이메일만 공백 정리 후 반환

## 요구 사항

- Node.js 18 이상 (내장 `node:test` 사용)

## 설치 및 실행

```bash
# 데모 실행
node src/index.js

# 테스트 실행
npm test
```

## 사용 예시

```javascript
const { extractEmails, isValidEmail, getValidEmails } = require('./src/email');

const members = [
  { name: 'Jane', email: 'jane@example.com' },
  { name: 'Bad', email: 'not-an-email' },
  { name: 'Spacey', email: '  bob@example.com  ' },
];

extractEmails(members);
// → ['jane@example.com', 'not-an-email', '  bob@example.com  ']

isValidEmail('jane@example.com'); // → true
isValidEmail('jane@example');     // → false (TLD 없음)

getValidEmails(members);
// → ['jane@example.com', 'bob@example.com']  (공백 제거됨)
```

## API

| 함수 | 설명 | 반환 |
|------|------|------|
| `extractEmails(members)` | 배열에서 각 항목의 `email` 추출. 배열이 아니면 빈 배열 | `string[]` |
| `isValidEmail(email)` | 이메일 형식 검증. 문자열이 아니면 `false` | `boolean` |
| `getValidEmails(members)` | 유효한 이메일만 골라 `trim()` 후 반환 | `string[]` |

> `isValidEmail`은 RFC 5322가 권고하는 RFC 1035 "preferred" 도메인 문법 기반의 실무 권장 정규식을 사용합니다. ([출처](https://www.regular-expressions.info/email.html))

## 릴리스 노트

### v1.0.0

이메일 추출·검증 유틸리티와 단위 테스트를 도입한 초기 릴리스입니다.

**✨ 기능**

- 사용자 배열에서 이메일을 추출하는 `extractEmails` 추가
- RFC 5322 권장 정규식 기반 이메일 형식 검증 `isValidEmail` 추가
- 유효한 이메일만 공백 정리 후 반환하는 `getValidEmails` 추가

**🧹 기타**

- 이메일 로직을 `src/email.js` 모듈로 분리하고 `index.js`에서 사용
- `node:test` 기반 단위 테스트 7종 추가 (`npm test`)
- `node_modules` 제외용 `.gitignore` 추가

## 라이선스

ISC
