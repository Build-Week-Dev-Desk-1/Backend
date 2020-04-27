exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    userid: '1',
                    username: 'EliasAdmin',
                    password: 'ammotek',
                    email: 'eliastest@gmail.com',
                    type: 'admin',

                },
                {
                    userid: '2',
                    username: 'RobbieUser',
                    password: 'password',
                    email: 'robbie@gmail.com',
                    type: 'user',
                }
            ]);
        });
};