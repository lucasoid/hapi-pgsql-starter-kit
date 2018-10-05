const { Model } = require('objection');
Model.knex(require('../knex'));
const { tableNames } = require('../constants/tables');

class Organization extends Model {
    
    static get tableName() {
        return tableNames.ORGS;
    }
    
    static get jsonSchema() {
        return {
            'type': 'object',
            'required': ['name'],
            'properties': {
                'id': {'type': 'string'},
                'name': {'type': 'string'},
                'settings': {'type': 'object'},
                'createdAt': {'type': 'string', 'format': 'date-time'},
                'updatedAt': {'type': 'string', 'format': 'date-time'}
            }
        };
    }

    static get relationMappings() {
        const Product = require('./Product');
        const User = require('./User');
        return {
            products: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: `${tableNames.PRODUCTS}.orgId`,
                    to: `${tableNames.ORGS}.id`
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.ORGS}.id`,
                    through: {
                        from: `${tableNames.USER_ORGS}.orgId`,
                        to: `${tableNames.USER_ORGS}.userId`
                    },
                    to: `${tableNames.USERS}.id`
                }
            },
        }
    }
}

module.exports = Organization;