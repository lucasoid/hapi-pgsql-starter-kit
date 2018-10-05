
exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('firstName');
        table.string('lastName');
        table.string('email');
        table.timestamps();
    }).then(() => {
        return knex.raw(`
            CREATE TRIGGER update_user_modtime BEFORE UPDATE OR INSERT ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
            CREATE TRIGGER update_user_createdtime BEFORE INSERT ON users FOR EACH ROW EXECUTE PROCEDURE update_created_column();
        `);
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
