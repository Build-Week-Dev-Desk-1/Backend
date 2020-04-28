const db = require('../data/dbConfig.js');
module.exports = {
    count,
    findById,
    // getLogByUserId,
    get,
    //getById,
    getBy,
    add,
    update,
    remove,
};




function count() {
    return db("logs")
        .count("title", { as: "count" })
        .first()
}

function findById(id) {
    return db('logs')
        .where({ id })
        .first();
}

function get() {
    return db('logs');
}

function getBy(data) {
    return db('users')
        .where({ data })
}

function add(item) {
    return db('items')
        .insert(item)
}

async function update(logs) {
    if (logs.id && logs.title && logs.description && (logs.completed !== null)) {
        const id = logs.id;
        if (await db("logs").where({ id }).update(logs)) {
            return { status: 202, success: 1, msg: `id${id} Update successful.` }
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
    return db('logs')
        .where({ id })
        .del();
}