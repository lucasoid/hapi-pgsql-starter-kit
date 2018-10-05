const { tableNames } = require('../app/constants/tables');
const { USERS } = tableNames;
const { users } = require('./data');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex(USERS).del()
        .then(() => {
            return knex(USERS).insert(users);
        });
};
