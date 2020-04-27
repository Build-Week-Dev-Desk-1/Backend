const db = require("../data/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    //getById,
    // insert,
    update,
    remove
};

function find() {
    return db('users').select('id', 'username', 'email', 'type');
}



function findBy(filter) {
    return db("users").select('*').where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function findById(id) {
    return db('users').select('id', 'username', 'email', 'type').where({ userid: id }).first();
    //return db('users').where({ id: id }).first();
}

// function getById(id) {
//     return db('users').where({ id: id }).first();
// }

function update(changes, id) {
    return db('users').where({ id: id }).update(changes);
}

// function insert(user) {
//     return db('users')
//         .insert(user)
//         .then(ids => {
//             return getById(ids[0]);
//         });
// }

function remove(id) {
    return db('users')
        .where({ id: id })
        .del();
}