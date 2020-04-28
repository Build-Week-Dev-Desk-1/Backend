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

// function get(tickets) {
//     return db('tickets');
// }

function getBy(data) {
    return db('tickets')
        .where({ data })
}

function add(ticket) {
    return db('tickets')
        .insert(ticket)
}

async function update(tickets) {
    if (tickets.userid && tickets.id && tickets.title && tickets.description && (tickets.completed !== null)) {
        const id = tickets.id;
        if (await db("tickets").where({ id }).update(tickets)) {
            return { status: 202, success: 1, msg: `id ${id} Update successful.` }
        } else {
            return { status: 500, success: 0, msg: "DB UPDATE Problem." }
        }
    } else {
        return ({ status: 418, success: 0, msg: "Incomplete ticket log details. Check that all fields are sent." })
    }
}


// async function remove(id) {
//     if (await db("logs").where({ id }).del()) {
//         return { status: 202, success: 1, msg: `id${id} DELETE successful.` }
//     } else {
//         return { status: 500, success: 0, msg: "DB DELETE Problem." }
//     }
// }

function remove(id) {
    return db('tickets')
        .where({ id })
        .del();
}