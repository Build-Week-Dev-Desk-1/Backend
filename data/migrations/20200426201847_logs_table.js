exports.up = function(knex) {
    return knex.schema.createTable('logs', logs => {

        logs.increments();

        logs.string("title", 255).notNullable();
        logs.string("description", 800).notNullable();
        logs.boolean("completed").defaultTo(false);

        // define a Foreign Key
        logs.integer('userid') // foreign key to user table
            .unsigned() // integer without negative values, db uses sign bit for larger #s
            .references('id')
            .inTable('users')
            .onDelete('CASCADE') // regards deleting recrod from the primary key table
            // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
            .onUpdate('CASCADE'); // regards chaging the value of the primary key table
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('logs');

};