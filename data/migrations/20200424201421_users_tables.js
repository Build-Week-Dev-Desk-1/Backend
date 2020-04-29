exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            //users.integer('userid').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            users.string('username', 128).notNullable().unique();
            users.string('password', 255).notNullable();
            users.string('email', 255).notNullable().unique();
            users.boolean("role", 128).notNullable();
        })
        .createTable('tickets', tickets => {
            tickets.increments();

            tickets.string('title', 128).notNullable();
            tickets.string('description', 800);
            tickets.string('tried', 800);
            tickets.string('category', 128);
            tickets.string('solution', 800);
            tickets.boolean('assigned').defaultTo(false);
            tickets.boolean('resolved').defaultTo(false);

            // define a Foreign Key
            // foreign key to user table // integer without negative values, db uses sign bit for larger #s
            // regards deleting record from the primary key table // onDelete() can take 'RESTRICT', 'NO ACTION', 'SET NULL', 'CASCADE'
            // regards chaging the value of the primary key table
        })
        // .createTable('techs', techs => {
        //     techs.increments();
        //     //users.integer('userid').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        //     techs.string('username', 128).notNullable().unique();
        //     techs.string('password', 255).notNullable();
        //     techs.string('email', 255).notNullable().unique();
        //     techs.boolean("admin").notNullable().defaultTo(true);
        // })
};

exports.down = function(knex) {
    return knex.schema
        //.dropTableIfExists('techs');
        .dropTableIfExists('users')
        .dropTableIfExists('tickets');

};