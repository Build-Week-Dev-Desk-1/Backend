exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'CaptTest', password: "password", email: "test@gmail.com", type: "user" },
                { id: 2, username: 'MajorTest', password: "password", email: "test@gmail.com", type: "admin" }
            ]);
        });
};