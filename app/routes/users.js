const User = require('../models/User');
const { beforeOrgRoute } = require('./organizations');
const { fetchScopes, validateScopes } = require('../auth/scopes');
const scopes = require('../constants/scopes');
const Boom = require('boom');

const DEFAULT_PROPS = ['users.id', 'users.firstName', 'users.lastName', 'users.email'];

exports.routes = {
    name: 'users',
    version: '1.0.0',
    register: async (server, options) => {
        await server.route({
            method: 'GET',
            path: '/users',
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.READ_USER, scopes.ADMIN])
            },
            handler: async (request, h) => {
                request.log(['error'], request.pre.org.$relatedQuery('users').select(DEFAULT_PROPS).toString());
                return await request.pre.org.$relatedQuery('users').select(DEFAULT_PROPS);
            }
        });

        await server.route({
            method: 'GET',
            path: "/users/{userId}",
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.READ_USER, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    const results = await request.pre.org.$relatedQuery('users').select(DEFAULT_PROPS).where({
                        "users.id": request.params.userId
                    });
                    if(results.length === 0) return Boom.notFound();
                    return results[0];
                } catch (err) {
                    request.log(['error', 'routes', 'users'], err);
                    throw err;
                }
            }
        });

        await server.route({
            method: 'POST',
            path: '/users',
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.WRITE_USER, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    return await request.pre.org.$relatedQuery('users').insert(request.payload).returning(DEFAULT_PROPS);
                }
                catch (err) {
                    if(err.name && err.name === 'ValidationError')
                        return Boom.badRequest(err.message, err.data);

                    request.log(['error', 'routes', 'users'], err);
                    throw err;
                }
            }
        });

        await server.route({
            method: 'PATCH',
            path: "/users/{userId}",
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.WRITE_USER, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    const found = await request.pre.org.$relatedQuery('users').select(DEFAULT_PROPS).where({
                        "users.id": request.params.userId
                    });                
                    if(found.length === 0) return Boom.notFound();
                    return await found[0].$query().patch(request.payload).returning(DEFAULT_PROPS);
                } catch (err) {
                    if(err.name && err.name === 'ValidationError')
                        return Boom.badRequest(err.message, err.data);

                    request.log(['error', 'routes', 'users'], err);
                    throw err;
                }
            }
        });
        
        await server.route({
            method: 'DELETE',
            path: "/users/{userId}",
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.DELETE_USER, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    const found = await request.pre.org.$relatedQuery('users').select(DEFAULT_PROPS).where({
                        "users.id": request.params.userId
                    });
                    if(found.length === 0) return Boom.notFound();
                    const deleted = await found[0].$query().delete();
                    return { deleted };
                } catch (err) {
                    request.log(['error', 'routes', 'users'], err);
                    throw err;
                }
            }
        });
    }
}