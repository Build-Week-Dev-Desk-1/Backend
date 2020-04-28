const db = require("../data/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    getAllLogsForUser,
    getTopTen,
    //getById,
    // insert,
    update,
    remove,
    setUserLogs
};

function find() {
    return db('users').select('id', 'username', 'email', 'type');
}



function findBy(filter) {
    return db("users").select('*').where(filter);
}

// async function add(user) {
//     const [id] = await db("users").insert(user, "id");

//     return findById(id);
// }

async function add(user) {
    // sends info, gets id back
    // id is destructured from an array?
    if (user.username && user.password && user.email) {
        const [id] = await db('users').insert(user);
        return getById(id);
    } else {
        return ({ err: "Incomplete registration info. Check that all fields are sent." })
    }
}

function findById(id) {
    return db('users').select('id', 'username', 'email', 'type').where({ userid: id }).first();
    //return db('users').where({ id: id }).first();
}


function getAllLogsForUser(userid) {
    return db("logs").where({ userid })
}

function getTopTen() {
    /* 
    SELECT userid, title, users.username FROM logs
    JOIN users on logs.userid = users.id
    ORDER BY logs DESC LIMIT 5;
     */
    // return db("scores").orderBy('score', 'desc').limit(3);

    return db("logs")
        .select("title", "description", "users.username")
        .join("users", "logs.userid", "users.id")
        .orderBy('title', 'desc').limit(5);
}

function update(changes, id) {
    return db('users').where({ id: id }).update(changes);
}

async function setUserLogs(data) {
    if (data.userid && data.title && data.description) {
        const [logs] = await db('logs').insert(data);
        return ({ status: 201, msg: logs });
    } else {
        return ({ status: 418, msg: "Incomplete query data. Check that all fields are sent." })
    }
}

function remove(id) {
    return db('users')
        .where({ id: id })
        .del();
}