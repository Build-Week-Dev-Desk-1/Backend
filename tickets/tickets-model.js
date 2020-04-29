const db = require('../data/dbConfig.js');
module.exports = {
    count,
    findBy,
    findById,
    getBy,
    add,
    update,
    remove,
};

function count() {
    return db("tickets")
        .count("title", { as: "count" })
        .first()
}

function findById(id) {
    return db('tickets')
        .where({ id })
        .first();
}

function findBy() {
    return db('tickets');
}

function getBy(data) {
    return db('tickets')
        .where({ data })
}

async function add(ticket) {
    return await db('tickets')
        .insert(ticket, 'id')
        .then(([id]) => findById(id));
}

async function update(id, changes) {
    return await db('tickets')
        .where({ id })
        .update(changes)
        .then(() => findById(id));
}

function remove(id) {
    return db('tickets')
        .where({ id })
        .del();
}