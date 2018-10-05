const { tableNames } = require('../app/constants/tables');
const { USER_ROLES } = tableNames;
const { user_roles } = require('./data');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex(USER_ROLES).del()
        .then(() => {
            return knex(USER_ROLES).insert(user_roles);
        });
};
