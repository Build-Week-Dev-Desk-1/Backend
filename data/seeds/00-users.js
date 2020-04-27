exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    username: 'EliasAdmin',
                    password: 'ammotek',
                    email: 'eliastest@gmail.com',
                    type: 'admin',

                },
                {
                    username: 'RobbieUser',
                    password: 'password',
                    email: 'robbie@gmail.com',
                    type: 'user',
                }
            ]);
        });
};