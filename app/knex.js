const env = process.env.NODE_ENV || 'development';
const knex = require('knex');
const knexFile = require('../knexfile');
module.exports = knex(knexFile[env]);