
exports.up = (knex, Promise) => {
    return knex.schema.createTable('roles', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('orgId');
        table.foreign('orgId').references('orgs.id').onDelete('CASCADE');
        table.string('name');    
        table.json('scopes');
        table.timestamps();
    }).then(() => {
        return knex.raw(`
            CREATE TRIGGER update_roles_modtime BEFORE UPDATE OR INSERT ON roles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
            CREATE TRIGGER update_roles_createdtime BEFORE INSERT ON roles FOR EACH ROW EXECUTE PROCEDURE update_created_column();
        `);
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('roles');
};
