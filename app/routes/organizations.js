const Organization = require('../models/Organization');
const { fetchScopes, validateScopes } = require('../auth/scopes');
const scopes = require('../constants/scopes');
const Boom = require('boom');

const DEFAULT_PROPS = ['id', 'name', 'settings'];

exports.findOrg = async (id, request) => {
    try {
        const results = await Organization.query().where({ id }).select(DEFAULT_PROPS);
        if(results.length === 0) return Boom.notFound();
        return results[0];
    }
    catch (err) {
        request.log(['error', 'routes', 'organizations'], err);
        throw err;
    }
}

/**
 * Returns an array of `pre` methods to validate a user to a route.
 * Throws the appropriate Boom error on failure:
 * - 404: org not found
 * - 401: scopes not valid
 * Assigns values to request.pre.org, request.pre.userScopes, and request.pre.isValidScope
 * 
 * @param {Array} requiredScopes - list of scopes required for the route
 * @returns {Array}
 */
exports.beforeOrgRoute = (requiredScopes) => [
    {
        method: async (request, h) => await exports.findOrg(request.params.orgId, request),
        assign: 'org',
        failAction: 'error'
    },
    {
        method: fetchScopes({
            getOrgId: (request) => request.params.orgId,
            getUserId: (request) => request.auth.credentials.sub
        }),
        assign: 'userScopes',
        failAction: 'error'
    },
    {
        method: validateScopes({
            getRequiredScopes: (request) => requiredScopes,
            getUserScopes: (request) => request.pre.userScopes
        }),
        assign: 'isValidScope',
        failAction: 'error'
    }
];

exports.routes = {
    name: 'orgs',
    version: '1.0.0',
    register: async (server, options) => {

        await server.route({
            method: 'GET',
            path: "/organizations/{orgId}",
            config: { 
                auth: 'jwt',
                pre: exports.beforeOrgRoute([scopes.READ_ORG, scopes.ADMIN])
            },
            handler: async (request, h) => {
                return request.pre.org;
            }
        });

        await server.route({
            method: 'PATCH',
            path: "/organizations/{orgId}",
            config: {
                auth: 'jwt',
                pre: exports.beforeOrgRoute([scopes.WRITE_ORG, scopes.ADMIN])
            },
            handler: async (request, h) => {
                // the Organization model is validating input against the json schema.
                // TODO: consider replacing Objection's $validate method with Joi
                try {
                    return await request.pre.org.$query().patch(request.payload).returning(DEFAULT_PROPS);
                }
                catch (err) {
                    if(err.name && err.name === 'ValidationError')
                        return Boom.badRequest(err.message, err.data);

                    request.log(['error', 'routes', 'organizations'], err);               
                    return Boom.internal();
                }
            }
        });
    }
}