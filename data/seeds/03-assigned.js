exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('table_name').del()
        .then(function() {
            // Inserts seed entries
            return knex('table_name').insert([
                { techid: 1, ticketid: 1 },
                { techid: 2, ticketid: 2 },
                { techid: 3, ticketid: 3 },
                { techid: 4, ticketid: 4 }
            ]);
        });
};