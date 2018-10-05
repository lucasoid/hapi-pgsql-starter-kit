const { Model } = require('objection');
Model.knex(require('../knex'));
const { tableNames } = require('../constants/tables');

class Product extends Model {
    
    static get tableName() {
        return tableNames.PRODUCTS;
    }
    
    static get jsonSchema() {
        return {
            'type': 'object',
            'required': ['orgId', 'name'],
            'properties': {
                'id': {'type': 'string'},
                'orgId': {'type': 'string'},
                'name': {'type': 'string'},
                'description': {'type': 'string'},
                'cost': {'type': 'number'},
                'createdAt': {'type': 'string', 'format': 'date-time'},
                'updatedAt': {'type': 'string', 'format': 'date-time'}
            }
        };
    }

    static get relationMappings() {
        const Organization = require('./Organization');
        return {
            org: {
                relation: Model.HasOneRelation,
                modelClass: Organization,
                join: {
                    from: `${tableNames.PRODUCTS}.orgId`,
                    to: `${tableNames.ORGS}.id`
                }
            }
        }
    }
}

module.exports = Product;