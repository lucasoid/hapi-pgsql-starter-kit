
exports.up = (knex, Promise) => {
    return knex.schema.createTable('orgs', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name');
        table.json('settings');
        table.timestamps();
    }).then(() => {
        return knex.raw(`
            CREATE TRIGGER update_org_modtime BEFORE UPDATE OR INSERT ON orgs FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
            CREATE TRIGGER update_org_createdtime BEFORE INSERT ON orgs FOR EACH ROW EXECUTE PROCEDURE update_created_column();
        `);
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('orgs');
};
