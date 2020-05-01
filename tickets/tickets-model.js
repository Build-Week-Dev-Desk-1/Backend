const db = require('../data/dbConfig.js');
module.exports = {
    addToStudent,
    count,
    find,
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



function find(filter) {
    return db('tickets').where(filter);
}

function findBy() {
    return db('tickets');
}

function getBy(data) {
    return db('tickets')
        .where({ data })
}




function addToStudent(studentid, ticketid) {
    return db('stud_tickets')
        .insert({ studentid, ticketid }, 'id')
        .then(() => findById(ticketid));
}

// function add(ticket) {
//     const [id] = db('tickets').insert(ticket);
//     return findById(id);
// }

function add(ticket) {
    return db('tickets').insert(ticket).then(ids => { const [id] = ids; return findById(id); });
}

async function update(id, changes) {
    return await db('tickets')
        .where({ id }).update(changes).then(() => findById(id));
}

function findById(id) {
    return db('tickets')
        .select('id', 'title', 'description', 'solution')
        .where({ id })
        .first();
}

function remove(id) {
    return db('tickets')
        .where({ id })
        .del();
}