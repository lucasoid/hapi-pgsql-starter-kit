const { Model } = require('objection');
Model.knex(require('../knex'));
const { tableNames } = require('../constants/tables');

class User extends Model {
    
    static get tableName() {
        return tableNames.USERS;
    }

    static get jsonSchema() {
        return {
            'type': 'object',
            'required': ['firstName', 'lastName', 'email'],
            'properties': {
                'id': {'type': 'string'},
                'firstName': {'type': 'string'},
                'lastName': {'type': 'string'},
                'email': {'type': 'email'},
                'createdAt': {'type': 'string', 'format': 'date-time'},
                'updatedAt': {'type': 'string', 'format': 'date-time'}
            }
        };
    }

    static get relationMappings() {
        const Organization = require('./Organization');
        const Role = require('./Role');
        return {
            orgs: {
                relation: Model.ManyToManyRelation,
                modelClass: Organization,
                join: {
                    from: `${tableNames.USERS}.id`,
                    through: {
                        from: `${tableNames.USER_ORGS}.userId`,
                        to: `${tableNames.USER_ORGS}.orgId`
                    },
                    to: `${tableNames.ORGS}.id`
                }
            },
            
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: `${tableNames.USERS}.id`,
                    through: {
                        from: `${tableNames.USER_ROLES}.userId`,
                        to: `${tableNames.USER_ROLES}.roleId`
                    },
                    to: `${tableNames.ROLES}.id`
                }
            }
        }
    }

}

module.exports = User;