const test = require('node:test');
const assert = require('node:assert');
const { extractEmails, isValidEmail, getValidEmails } = require('./email');

test('extractEmails: 멤버 배열에서 이메일만 추출한다', () => {
    const members = [
        { name: 'Jane', email: 'jane@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
    ];
    assert.deepStrictEqual(extractEmails(members), [
        'jane@example.com',
        'bob@example.com',
    ]);
});

test('extractEmails: 배열이 아니면 빈 배열을 반환한다', () => {
    assert.deepStrictEqual(extractEmails(null), []);
    assert.deepStrictEqual(extractEmails(undefined), []);
    assert.deepStrictEqual(extractEmails('nope'), []);
});

test('isValidEmail: 올바른 형식은 true', () => {
    assert.strictEqual(isValidEmail('jane@example.com'), true);
    assert.strictEqual(isValidEmail('  bob@example.com  '), true);
});

test('isValidEmail: 잘못된 형식은 false', () => {
    assert.strictEqual(isValidEmail('not-an-email'), false);
    assert.strictEqual(isValidEmail('jane@example'), false);
    assert.strictEqual(isValidEmail('jane @example.com'), false);
    assert.strictEqual(isValidEmail(null), false);
    assert.strictEqual(isValidEmail(123), false);
});

test('isValidEmail: RFC 5322 로컬파트 특수문자를 허용한다', () => {
    assert.strictEqual(isValidEmail("user.name+tag@example.com"), true);
    assert.strictEqual(isValidEmail("john!#$%&'*+/=?^_`{|}~-@sub.example.co.uk"), true);
    assert.strictEqual(isValidEmail('a@b.c@example.com'), false);
    assert.strictEqual(isValidEmail('user@-bad.com'), false);
});

test('getValidEmails: 유효한 이메일만 추출한다', () => {
    const members = [
        { name: 'Jane', email: 'jane@example.com' },
        { name: 'Bad', email: 'not-an-email' },
        { name: 'Bob', email: 'bob@example.com' },
    ];
    assert.deepStrictEqual(getValidEmails(members), [
        'jane@example.com',
        'bob@example.com',
    ]);
});

test('getValidEmails: 유효한 이메일은 앞뒤 공백을 제거해 반환한다', () => {
    const members = [
        { name: 'Spacey', email: '  bob@example.com  ' },
        { name: 'Bad', email: 'not-an-email' },
        { name: 'NoEmail', email: undefined },
    ];
    assert.deepStrictEqual(getValidEmails(members), ['bob@example.com']);
});
