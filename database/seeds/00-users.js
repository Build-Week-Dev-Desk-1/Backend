exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'CaptElias', password: "password", email: "Elias@gmail.com" },
                { id: 2, username: 'CaptRobbie', password: "password", email: "Robbie@gmail.com" },
                { id: 3, username: 'CaptCaveMan', password: "password", email: "cave@gmail.com" },
                { id: 4, username: 'CaptTime', password: "password", email: "time@gmail.com" },
                { id: 3, username: 'CaptBobs', password: "password", email: "bibs@gmail.com" }
            ]);
        });
};