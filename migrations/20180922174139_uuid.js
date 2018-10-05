
exports.up = (knex, Promise) => {
    return knex.raw(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
}

exports.down = (knex, Promise) => {
    return knex.raw(`
        DROP EXTENSION IF EXISTS "uuid-ossp"
    `);
};
