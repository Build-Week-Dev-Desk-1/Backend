exports.up = function(knex) {
    return knex.schema.createTable('logs', logs => {

        logs.increments();
        logs.integer('userid').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        logs.string("title", 255).notNullable();
        logs.string("description", 800).notNullable();
        logs.boolean("completed").defaultTo(false);

        // define a Foreign Key
        // foreign key to user table // integer without negative values, db uses sign bit for larger #s
        // regards deleting record from the primary key table // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
        // regards chaging the value of the primary key table
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('logs');

};