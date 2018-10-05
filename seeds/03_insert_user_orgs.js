const { tableNames } = require('../app/constants/tables');
const { USER_ORGS } = tableNames;
const { user_orgs } = require('./data');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex(USER_ORGS).del()
        .then(() => {
            return knex(USER_ORGS).insert(user_orgs);
        });
};
