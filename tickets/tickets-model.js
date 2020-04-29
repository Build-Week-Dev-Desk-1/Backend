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

function add(tickets) {
    return db('tickets')
        .insert(tickets)
}

function update(tickets, id) {
    return db('tickets')
        .where({ id })
        .update(tickets);
}

function remove(id) {
    return db('tickets')
        .where({ id })
        .del();
}