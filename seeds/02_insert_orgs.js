const { tableNames } = require('../app/constants/tables');
const { ORGS } = tableNames;
const { orgs } = require('./data');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex(ORGS).del()
        .then(() => {
            return knex(ORGS).insert(orgs);
        });
};
