const { tableNames } = require('../app/constants/tables');
const { PRODUCTS } = tableNames;
const { products } = require('./data');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex(PRODUCTS).del()
        .then(() => {
            return knex(PRODUCTS).insert(products);
        });
};
