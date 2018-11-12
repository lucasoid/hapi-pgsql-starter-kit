const User = require('../models/User');
const Boom = require('boom');

const DEFAULT_PROPS = ['id', 'firstName', 'lastName', 'email'];

exports.routes = {
    name: 'me',
    version: '1.0.0',
    register: async (server, options) => {
        
        await server.route({
            method: 'GET',
            path: "/me",
            config: { 
                auth: 'jwt',
            },
            handler: async (request, h) => {
                try {
                    const users = await User.query()
                        .select(DEFAULT_PROPS).where({id: request.auth.credentials.sub})
                        .eager('[roles(selectRoles), orgs(selectOrgs)]', {
                            selectRoles: (builder) => builder.select(['roles.id', 'roles.orgId', 'roles.name', 'scopes']),
                            selectOrgs: (builder) => builder.select(['orgs.id', 'orgs.name'])
                        });
                    return users[0];
                }
                catch (err) {
                    request.log(['error', 'routes', 'me'], err);
                    throw err;
                }
            }
        });

        await server.route({
            method: 'PATCH',
            path: "/me",
            config: {
                auth: 'jwt'
            },
            handler: async (request, h) => {
                // the User model is validating input against the json schema.
                // TODO: consider replacing Objection's $validate method with Joi
                try {
                    const users = await User.query().select(DEFAULT_PROPS).where({id: request.auth.credentials.sub});
                    return await users[0].$query().patch(request.payload).returning(DEFAULT_PROPS);
                }
                catch (err) {
                    if(err.name && err.name === 'ValidationError')
                        return Boom.badRequest(err.message, err.data);

                    request.log(['error', 'routes', 'me'], err);               
                    return Boom.internal();
                }
            }
        });
    }
}