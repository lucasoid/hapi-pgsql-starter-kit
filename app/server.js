'use strict';
require('dotenv').config();

const Hapi = require('hapi');
const routes = require('./routes');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    debug: {
        request: process.env.NODE_ENV === 'development' ? ['error'] : false,
        log: process.env.NODE_ENV === 'development' ? ['error'] : false
    }
});

const init = async () => {

    await server.start();

    // register JWT auth plugin
    await server.register(require('hapi-auth-jwt2'));
    // define JWT strategy
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.AUTH_SECRET,
        verifyOptions: {
            algorithms: [ 'HS256' ],
            issuer: [process.env.AUTH_ISSUER],
            audience: [process.env.AUTH_AUDIENCE]
        },
        // valid if token is verified; granular scopes can be handled at the route level
        validate: (decoded, request) => ({ isValid: true })
    });
    // set JWT auth as default
    server.auth.default('jwt');
    
    // routes
    require('./routes')(server);

    // error logger
    server.events.on('log', (event, tags) => {
        if (tags.error) {
            console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
        }
    });
    
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();