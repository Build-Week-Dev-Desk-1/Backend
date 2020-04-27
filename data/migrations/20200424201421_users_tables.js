exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
            users.increments();

            users.string('username', 128).notNullable().unique();
            users.string('password', 255).notNullable();
            users.string('email', 255).notNullable().unique();
            users.string('type', 32).notNullable().defaultTo('user');
        })
        .createTable("logs", logs => {
            logs.increments();
            logs.integer("logid").unsigned().notNullable().references("id").inTable("users");
            logs.string("title", 255).notNullable();
            logs.string("description", 800).notNullable();
        });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users')
        .dropTableIfExists("logs");
};