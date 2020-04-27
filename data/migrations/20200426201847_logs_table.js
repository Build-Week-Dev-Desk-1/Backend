exports.up = function(knex) {
    return knex.schema.createTable('logs', logs => {

        logs.increments();
        logs.integer("userid").notNullable().references("id").inTable("users");
        logs.string("title", 255).notNullable();
        logs.string("description", 800).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('logs');

};