module.exports = {
    // knex uses babel, which creates '__core-js-shared__': https://github.com/tgriesser/knex/issues/2678
    // swagger-parser creates 'core' global
    globals: '__core-js_shared__,core',
    // define assert library, to support using { plan: count }
    assert: 'code'
}