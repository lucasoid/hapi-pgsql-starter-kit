# hapi + PostgreSQL starter kit

Sample API using PostgreSQL, hapi, and JWT auth. Supports:
* multi-tenancy
* user-defined access levels per tenant
* JWT-based auth (assumes there is a third-party auth server)
* database migrations using Knex
* database models and queries using Objection.js
* unit tests using Lab
* OpenAPI documentation

# Auth

JWT FTW!

In dev mode, there is a mock auth endpoint to facilitate testing access levels without the rigamarole of setting up a whole auth server. Just post client credentials to /mockAuth to receive an access token.

In production, it's assumed that you'd use a solution like Auth0 or Azure AD to grant tokens.

# Database

This demo uses the Knex and Objection.js libraries, which support various SQL implementations. This demo contains some PostgreSQL-specific data types like JSON and arrays.

## Migrations

A few handy commands to run the knex migrations:
```
npm run migrate:make -- filename
npm run migrate:latest
npm run migrate:rollback
npm run seed:make -- filename
npm run seed
```

# Tests

Uses hapijs/lab for unit tests. Run with:
```
npm test
npm test -- test/path/filename.js
```

# Docs

Provides docs according to the OpenApi spec. Access them at /docs.json or /docs.yml.