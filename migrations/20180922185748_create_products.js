
exports.up = (knex, Promise) => {
    return knex.schema.createTable('products', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('orgId');
        table.foreign('orgId').references('orgs.id').onDelete('CASCADE');
        table.string('name');
        table.string('description');
        table.decimal('cost', 11, 2);
        table.timestamps();
    }).then(() => {
        return knex.raw(`
            CREATE TRIGGER update_products_modtime BEFORE UPDATE OR INSERT ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
            CREATE TRIGGER update_products_createdtime BEFORE INSERT ON products FOR EACH ROW EXECUTE PROCEDURE update_created_column();
        `);
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('products');
};
