const assert = require('assert');
const Boom = require('boom');
const Role = require('../models/Role');

const INSUFFICIENT_PRIVILEGES = 'Insufficient privileges.';

/**
 * Fetches the user's scopes from the database.
 * How to use:
 * route: { config: { pre: [{ method: fetchScopes(options)}]}}
 * 
 * @param {Object} options
 * @param {string} options.getUserId - accessor fn `(request) => userId`
 * @param {number} options.getOrgId - accessor fn `(request) => orgId`
 * @returns {Array}
 */
exports.fetchScopes = (options) => async (request, h) => {
    try {
        this.userId = options.getUserId(request);
        this.orgId = options.getOrgId(request);
        let scopes = await Role.query().select(['scopes']).joinRelation('users').where({
            'users.id': this.userId,
            'orgId': this.orgId
        }).map(result => result.scopes);
        // scopes will be a 2d array like [[scope1], [scope2, scope3]]
        return Array.prototype.concat.apply([], scopes);
    }
    catch (err) {
        request.log(['error', 'auth', 'scopes'], err);
        throw err;
    }
}

/**
 * Validates that client's scopes satisfy the required scopes.
 * returns a Boom.unauthorized in case of failure.
 * How to use:
 * route: { config: { pre: [{ method: validateScope(options)}]}}
 * 
 * @param {Object} options
 * @param {Array} options.getRequiredScopes - accessor fn `(request) => requiredScopes`
 * @param {string} options.getUserScopes - accessor fn `(request) => userScopes`
 * @param {number} options.getOrgId - accessor fn `(request) => orgId`
 * @param {boolean} [options.matchAll] - defaults to false
 * @returns {boolean|Boom}
 */
exports.validateScopes = (options) => async (request, h) => {
    
    const dedupe = arr => arr.filter((el, i) => arr.indexOf(el) === i);

    this.requiredScopes = dedupe(options.getRequiredScopes(request));
    this.userScopes = dedupe(options.getUserScopes(request));
    this.matchAll = options.matchAll || false;
    
    if(this.requiredScopes.length === 0) return true;

    if(this.userScopes.length === 0) return Boom.unauthorized(INSUFFICIENT_PRIVILEGES);
    
    const intersections = this.requiredScopes.reduce((arr, requiredScope) => {
        if(this.userScopes.indexOf(requiredScope) !== -1) arr.push(requiredScope);
        return arr;
    }, []);
    
    if (this.matchAll && intersections.length === this.requiredScopes.length) return true;
    if (!this.matchAll && intersections.length > 0) return true;
    
    return Boom.unauthorized(INSUFFICIENT_PRIVILEGES);
}