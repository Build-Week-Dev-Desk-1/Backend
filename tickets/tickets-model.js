const db = require('../data/dbConfig.js');
module.exports = {
    addToStudent,
    //addTicketToStudent,
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

// async function add(ticket) {
//     const [id] = await db('tickets').insert(ticket);

//     return find(id);
// }


async function addToStudent(studentid, ticketid) {
    return await db('stud_tickets')
        .insert({ studentid, ticketid }, 'id')
        .then(() => findById(ticketid));
}

async function add(ticket) {
    const [id] = await db('tickets').insert(ticket);

    return findById(id);
}

async function update(id, changes) {
    return await db('tickets')
        .where({ id }).update(changes).then(() => findById(id));
}

function findById(id) {
    return db('tickets')
        .select('id', 'title', 'description')
        .where({ id })
        .first();
}

function remove(id) {
    return db('tickets')
        .where({ id })
        .del();
}