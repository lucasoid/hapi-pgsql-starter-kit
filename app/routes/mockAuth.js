const jwt = require('jsonwebtoken');
const Boom = require('boom');
/**
 * DEV ONLY
 * This is just a simple way to issue tokens during development without all the setup.
 * Absolutely no security provided here. 
 * In production, use Auth0, Azure AD, or similar.
 */
module.exports = {
    name: 'mockAuth',
    version: '1.0.0',
    register: async (server, options) => {
        server.route({
            method: 'POST',
            path: '/mockauth',
            config: { auth: false },
            handler: async (request, h) => {
                const { payload } = request;
                if(!payload) return Boom.badRequest('No payload');
                const { grant_type, username, password, audience, scope, client_id, client_secret } = payload;
                if(!username) return Boom.badRequest('username is required');
                return new Promise((resolve, reject) => {
                    // valid? don't care, just issue the token
                    const options = {
                        audience: process.env.AUTH_AUDIENCE,
                        issuer: process.env.AUTH_ISSUER,
                        algorithm: 'HS256',
                        expiresIn: 3600,
                        subject: username
                    };
                    jwt.sign({ scope }, process.env.AUTH_SECRET, options, (err, access_token) => {
                        if (err) return Boom.internal();
                        else return resolve({
                            access_token   
                        });
                    });
                });
            }
        });
    }
}