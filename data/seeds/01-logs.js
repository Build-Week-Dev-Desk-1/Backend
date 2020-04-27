exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('logs').del()
        .then(function() {
            // Inserts seed entries
            return knex('logs').insert([
                { id: 1, userid: 1, title: 'My mac does not work', description: 'You will figure out what to put when you try it...', completed: "false" },
                { id: 2, userid: 2, title: 'React.js is having issues', description: 'You will figure out when you see this data set...', completed: "false" },
                { id: 3, userid: 3, title: 'The slack migration was not working', description: 'You will figure out when you see this data set...', completed: "false" }
            ]);
        });
};