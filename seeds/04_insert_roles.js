const { tableNames } = require('../app/constants/tables');
const { ROLES } = tableNames;
const { roles } = require('./data');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex(ROLES).del()
        .then(() => {
            return knex(ROLES).insert(roles);
        });
};