const db = require('../data/dbConfig.js');
module.exports = {
    getLogByUserId,
    get,
    getById,
    getBy,
    insert,
    update,
    remove,
};

function getLogByUserId(id) {
    return db('logs').where({ userid: id })
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

function insert(logs) {
    return db('logs')
        .insert(logs)
        .then(ids => {
            return getById(ids[0]);
        });
}

function update(id, changes) {
    return db('logs')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('logs')
        .where('id', id)
        .del();
}