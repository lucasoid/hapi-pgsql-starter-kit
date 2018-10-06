const knex = require('knex');
const knexFile = require('../knexfile');
module.exports = knex(knexFile[process.env.NODE_ENV] || knexFile['development']);