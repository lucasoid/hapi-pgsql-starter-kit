require('dotenv').config();

const config = {
  client: 'pg',
  connection: {
    host: process.env.SQL_HOST,
    database: process.env.SQL_DB,
    user:     process.env.SQL_USER,
    password: process.env.SQL_PASSWORD
  },
  //searchPath: [process.env.SQL_DB, 'public'],
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = {
  development: config,
  staging: config,
  production: config
};