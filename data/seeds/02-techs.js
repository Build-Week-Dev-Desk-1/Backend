exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('techs').del()
        .then(function() {
            // Inserts seed entries
            return knex('techs').insert([{
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe"
                },
                {
                    "id": 2,
                    "firstName": "Sam",
                    "lastName": "Smith"
                },
                {
                    "id": 3,
                    "firstName": "Sara",
                    "lastName": "Wilson"
                }
            ]);
        });
};