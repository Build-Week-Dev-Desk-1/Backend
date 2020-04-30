exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('stud_tickets').del()
        .then(function() {
            // Inserts seed entries
            return knex('stud_tickets').insert([
                { studentid: 1, ticketid: 1 },
                { studentid: 2, ticketid: 2 },
                { studentid: 3, ticketid: 3 },
                { studentid: 4, ticketid: 4 }
            ]);
        });
};