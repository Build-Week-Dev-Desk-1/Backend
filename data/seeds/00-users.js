exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{

                    username: 'EliasAdmin',
                    password: 'ammotek',
                    email: "test1@gmail.com",
                    role: 'tech',

                },
                {

                    username: 'RobbieUser',
                    password: 'password',
                    email: "test2@gmail.com",
                    role: 'student',
                },
                {

                    username: 'TonyUser',
                    password: 'password2',
                    email: 'test3@gmail.com',
                    role: 'student',
                },
                {

                    username: 'Claudia',
                    password: 'password3',
                    email: 'test4@gmail.com',
                    role: 'student',
                }
            ]);
        });
};