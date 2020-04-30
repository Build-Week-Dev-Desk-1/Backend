exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    //userid: '1',
                    username: 'EliasAdmin',
                    password: 'ammotek',
                    email: 'eliastest@gmail.com',
                    role: 'tech',

                },
                {
                    //userid: '2',
                    username: 'RobbieUser',
                    password: 'password',
                    email: 'robbie@gmail.com',
                    role: 'student',
                },
                {
                    //userid: '3',
                    username: 'TonyUser',
                    password: 'password2',
                    email: 'test3@gmail.com',
                    role: 'student',
                },
                {
                    //userid: '3',
                    username: 'Claudis',
                    password: 'password3',
                    email: 'test4@gmail.com',
                    role: 'student',
                }
            ]);
        });
};