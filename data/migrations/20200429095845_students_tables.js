exports.up = function(knex) {
    return knex.schema
        .createTable('students', tbl => {
            tbl.increments();
            tbl
                .integer('studentid')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl
                .integer('ticketid')
                .unsigned()
                .notNullable()
                .unique()
                .references('id')
                .inTable('tickets')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
};