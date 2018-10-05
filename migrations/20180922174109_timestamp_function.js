
exports.up = (knex, Promise) => {
    return knex.raw(`
        CREATE OR REPLACE FUNCTION update_modified_column() 
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE OR REPLACE FUNCTION update_created_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.created_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
    `);
}

exports.down = (knex, Promise) => {
    return knex.raw(`
        DROP FUNCTION IF EXISTS update_modified_column;
        DROP FUNCTION IF EXISTS update_created_column;
    `);
};
