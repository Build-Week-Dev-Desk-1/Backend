const db = require('../data/dbConfig.js');
module.exports = {
    count,
    getLogByUserId,
    get,
    getById,
    getBy,
    insert,
    update,
    remove,
};

function count() {
    return db("logs")
        .count("title", { as: "count" })
        .first()
}

function getLogByUserId(id) {
    return db('logs').where({ userid: id }).first();
}

function get() {
    return db('logs');
}

function getById(id) {
    return db('logs')
        .where({ id })
        .first();
}

function getBy(data) {
    return db('users')
        .where({ data })
}

async function insert(logs) {
    if (logs.userid && logs.title && logs.description && (logs.completed !== null)) {
        const logs = await db("logs").insert(logs);
        return ({ status: 201, msg: getById(logs) });
    } else {
        return ({ status: 401, msg: "incomplete ticket information. Please check all fields." })
    }

}

// function update(id, changes) {
//     return db('logs')
//         .where({ id })
//         .update(changes);
// }
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

// function remove(id) {
//     return db('logs')
//         .where('id', id)
//         .del();
// }

async function remove(id) {
    if (await db("logs").where({ id }).del()) {
        return { status: 202, success: 1, msg: `id${id} DELETE successful.` }
    } else {
        return { status: 500, success: 0, msg: "DB DELETE Problem." }
    }
}