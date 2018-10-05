const Product = require('../models/Product');
const { beforeOrgRoute } = require('./organizations');
const { fetchScopes, validateScopes } = require('../auth/scopes');
const scopes = require('../constants/scopes');
const Boom = require('boom');

const DEFAULT_PROPS = ['products.id', 'products.name', 'products.description', 'products.cost'];

exports.routes = {
    name: 'products',
    version: '1.0.0',
    register: async (server, options) => {
        await server.route({
            method: 'GET',
            path: '/products',
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.READ_PRODUCT, scopes.ADMIN])
            },
            handler: async (request, h) => {
                return await request.pre.org.$relatedQuery('products').select(DEFAULT_PROPS);
            }
        });

        await server.route({
            method: 'GET',
            path: "/products/{productId}",
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.READ_PRODUCT, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    const results = await request.pre.org.$relatedQuery('products').select(DEFAULT_PROPS).where({
                        id: request.params.productId
                    });
                    if(results.length === 0) return Boom.notFound();
                    return results[0];
                } catch (err) {
                    request.log(['error', 'routes', 'products'], err);
                    throw err;
                }
            }
        });

        await server.route({
            method: 'POST',
            path: '/products',
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.WRITE_PRODUCT, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    return await request.pre.org.$relatedQuery('products').insert(Object.assign({}, request.payload, {
                        orgId: request.params.orgId
                    })).returning(DEFAULT_PROPS);
                }
                catch (err) {
                    if(err.name && err.name === 'ValidationError')
                        return Boom.badRequest(err.message, err.data);

                    request.log(['error', 'routes', 'products'], err);
                    throw err;
                }
            }
        });

        await server.route({
            method: 'PATCH',
            path: "/products/{productId}",
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.WRITE_PRODUCT, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    const found = await request.pre.org.$relatedQuery('products').select(DEFAULT_PROPS).where({
                        id: request.params.productId
                    });                
                    if(found.length === 0) return Boom.notFound();
                    return await found[0].$query().patch(request.payload).returning(DEFAULT_PROPS);
                } catch (err) {
                    if(err.name && err.name === 'ValidationError')
                        return Boom.badRequest(err.message, err.data);
                        
                    request.log(['error', 'routes', 'products'], err);
                    throw err;
                }
            }
        });
        
        await server.route({
            method: 'DELETE',
            path: "/products/{productId}",
            config: { 
                auth: 'jwt',
                pre: beforeOrgRoute([scopes.DELETE_PRODUCT, scopes.ADMIN])
            },
            handler: async (request, h) => {
                try {
                    const found = await request.pre.org.$relatedQuery('products').select(DEFAULT_PROPS).where({
                        id: request.params.productId
                    });
                    if(found.length === 0) return Boom.notFound();
                    const deleted = await found[0].$query().delete();
                    return { deleted };
                } catch (err) {
                    request.log(['error', 'routes', 'products'], err);
                    throw err;
                }
            }
        });
    }
}