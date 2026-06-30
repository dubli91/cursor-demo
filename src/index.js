const { extractEmails, isValidEmail, getValidEmails } = require('./email');

console.log('hello cursor');

const members = [
    { name: 'Jane', email: 'jane@example.com' },
    { name: 'Bad', email: 'not-an-email' },
    { name: 'Spacey', email: '  bob@example.com  ' },
];

console.log('모든 이메일:', extractEmails(members));
console.log('유효한 이메일:', getValidEmails(members));
