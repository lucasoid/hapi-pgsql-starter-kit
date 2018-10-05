module.exports = async (server) => {

    await server.register(require('./organizations').routes);
    
    await server.register(require('./products').routes, {
        routes: {
            prefix: "/organizations/{orgId}"
        }
    });
    
    await server.register(require('./users').routes, {
        routes: {
            prefix: "/organizations/{orgId}"
        }
    });

    // dev-only plugins
    if(process.env.NODE_ENV === 'development') {
        await server.register({
            plugin: require('./mockAuth')
        });    
    }

}