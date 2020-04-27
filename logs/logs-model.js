const db = require('../data/dbconfig.js');
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
    return db('log').where({ userid: id })
}

function get() {
    return db('log');
}

function getById(id) {
    return db('log')
        .where({ id })
        .first();
}

function getBy(data) {
    return db('logs')
        .where({ data })
}

function insert(study) {
    return db('log')
        .insert(study)
        .then(ids => {
            return getById(ids[0]);
        });
}

function update(id, changes) {
    return db('log')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('log')
        .where('id', id)
        .del();
}