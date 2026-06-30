// 사용자 배열에서 이메일만 추출하는 함수
function extractEmails(members) {
    if (!Array.isArray(members)) {
        return [];
    }
    return members.map(member => member.email);
}

// 이메일 형식을 검증하는 함수
// RFC 5322가 권고하는 RFC 1035 "preferred" 도메인 문법 기반의 실무 권장 정규식.
// 출처: https://www.regular-expressions.info/email.html
// (도메인 라벨은 1~63자, 최소 1개의 점을 요구하도록 마지막 그룹을 + 로 적용해 TLD를 강제)
function isValidEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }
    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(trimmed);
}

// 사용자 배열에서 유효한 이메일만 추출하는 함수 (앞뒤 공백 제거 후 반환)
function getValidEmails(members) {
    return extractEmails(members)
        .filter(isValidEmail)
        .map(email => email.trim());
}

module.exports = { extractEmails, isValidEmail, getValidEmails };
