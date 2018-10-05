const { Model } = require('objection');
Model.knex(require('../knex'));
const { tableNames } = require('../constants/tables');

class Role extends Model {
    
    static get tableName() {
        return tableNames.ROLES;
    }
    
    static get jsonSchema() {
        return {
            'type': 'object',
            'required': ['uuid', 'orgId', 'name'],
            'properties': {
                'id': {'type': 'string'},
                'orgId': {'type': 'integer'},
                'name': {'type': 'string'},
                'scopes': {'type': 'array', 'items': { 'type': 'string'}},
                'createdAt': {'type': 'string', 'format': 'date-time'},
                'updatedAt': {'type': 'string', 'format': 'date-time'}
            }
        };
    }

    static get relationMappings() {
        const User = require('./User');
        const Organization = require('./Organization');
        return {
            org: {
                relation: Model.HasOneRelation,
                modelClass: Organization,
                join: {
                    from: `${tableNames.ROLES}.orgId`,
                    to: `${tableNames.ORGS}.id`
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.ROLES}.id`,
                    through: {
                        from: `${tableNames.USER_ROLES}.roleId`,
                        to: `${tableNames.USER_ROLES}.userId`
                    },
                    to: `${tableNames.USERS}.id`
                }
            }
        }
    }
}

module.exports = Role;