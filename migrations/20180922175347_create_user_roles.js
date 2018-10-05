
exports.up = (knex, Promise) => {
    return knex.schema.createTable('user_roles', (table) => {
        table.increments();
        table.uuid('userId');
        table.foreign('userId').references('users.id').onDelete('CASCADE');
        table.uuid('roleId');
        table.foreign('roleId').references('roles.id').onDelete('CASCADE');
        table.timestamps();
    }).then(() => {
        return knex.raw(`
            CREATE TRIGGER update_user_roles_modtime BEFORE UPDATE OR INSERT ON user_roles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
            CREATE TRIGGER update_user_roles_createdtime BEFORE INSERT ON user_roles FOR EACH ROW EXECUTE PROCEDURE update_created_column();
        `);
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('user_roles');
};
