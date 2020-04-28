exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tickets').del()
        .then(function() {
            // Inserts seed entries
            return knex('tickets').insert([
                { userid: 1, id: 1, title: 'My mac does not work', description: 'You will figure out what to put when you try it...', completed: "false" },
                { userid: 2, id: 2, title: 'React.js is having issues', description: 'You will figure out when you see this data set...', completed: "false" },
                { userid: 3, id: 3, title: 'The slack migration was not working', description: 'You will figure out when you see this data set...', completed: "false" }
            ]);
        });
};