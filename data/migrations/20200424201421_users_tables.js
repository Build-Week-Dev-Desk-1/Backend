exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            //users.integer('userid').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            users.string('username', 128).notNullable().unique();
            users.string('password', 255).notNullable();
            users.string('email', 255).notNullable().unique();
            users.boolean("admin").notNullable().defaultTo(false);
        })
        .createTable('tickets', tickets => {
            tickets.increments();
            tickets
                .integer('userid')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tickets.string("title", 255).notNullable();
            tickets.string("description", 800).notNullable();
            tickets.boolean("completed").defaultTo(false);

            // define a Foreign Key
            // foreign key to user table // integer without negative values, db uses sign bit for larger #s
            // regards deleting record from the primary key table // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
            // regards chaging the value of the primary key table
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('tickets');
};