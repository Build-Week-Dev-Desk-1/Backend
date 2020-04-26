const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
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
    return db("users").where({ id }).first();
}

function update(changes, id) {
    return db('users')
        .where({ id: id })
        .update(changes);
}

function remove(id) {
    return db('users')
        .where({ id: id })
        .del();
}