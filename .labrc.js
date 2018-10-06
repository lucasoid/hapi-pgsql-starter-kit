module.exports = {
    // knex uses babel, which creates a global. tell lab to ignore it...
    globals: '__core-js_shared__',
    // define assert library, to support using { plan: count }
    assert: 'code'
}