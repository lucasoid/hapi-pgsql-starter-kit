const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { validateScopes } = require('../../app/auth/scopes');

lab.suite('scopes', () => {
    lab.test('validateScopes returns true if no required scopes are provided', { plan: 1 }, () => {
        let request = {};
        let result = validateScopes({
            getRequiredScopes: (request) => [],
            getUserScopes: (request) => [],
            matchAll: false
        })(request);
        expect(result).to.be.true();
    });

    lab.test('validateScopes returns true if one of the user scopes match one of the required scopes', { plan: 1 }, () => {
        let request = {};
        let result = validateScopes({
            getRequiredScopes: (request) => ['a', 'b', 'c', 'd'],
            getUserScopes: (request) => ['a', 'e', 'f', 'g'],
            matchAll: false
        })(request);
        expect(result).to.be.true();
    });

    lab.test('validateScopes returns false if none of the user scopes match any of the required scopes', { plan: 1 }, () => {
        let request = {};
        let result = validateScopes({
            getRequiredScopes: (request) => ['a', 'b', 'c', 'd'],
            getUserScopes: (request) => ['e', 'f', 'g'],
            matchAll: false
        })(request);
        expect(result).to.be.an.error();
    });
    
    lab.test('validateScopes returns false if not all required scopes are met, and the matchAll flag is true', { plan: 1 }, () => {
        let request = {};
        let result = validateScopes({
            getRequiredScopes: (request) => ['a', 'b', 'c', 'd'],
            getUserScopes: (request) => ['a', 'b', 'c'],
            matchAll: true
        })(request);
        expect(result).to.be.an.error();
    });
    
    lab.test('validateScopes returns false if all required scopes are met, and the matchAll flag is true', { plan: 1 }, () => {
        let request = {};
        let result = validateScopes({
            getRequiredScopes: (request) => ['a', 'b', 'c', 'd'],
            getUserScopes: (request) => ['a', 'b', 'c', 'd', 'e'],
            matchAll: true
        })(request);
        expect(result).to.be.true();
    });

    lab.test('validateScopes throws an error if the configuration is bad', { plan: 2 }, () => {
        let request = {log: (tags, message) => {}};
        expect(validateScopes({
            getRequiredScopes: ['a', 'b', 'c', 'd'],
            getUserScopes: (request) => ['a', 'b', 'c', 'd'],
            matchAll: false
        })(request)).to.be.an.error();

        expect(validateScopes({
            getRequiredScopes: (request) => ['a', 'b', 'c', 'd'],
            getUserScopes: ['a', 'b', 'c', 'd'],
            matchAll: false
        })(request)).to.be.an.error();

    });

});