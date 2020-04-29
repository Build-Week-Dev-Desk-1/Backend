const db = require("../data/dbConfig.js");

module.exports = {
    add,
    addTicket,
    find,
    findTickets,
    findBy,
    findById,
    findStudent,
    findTicketById,
    getAllLogsForUser,
    change,
    remove,
    removeAsgTicket,
    setUserLogs
};


async function addTicket(techid, ticketid) {
    return await db('assigned')
        .insert({ techid, ticketid }, 'id')
        .then(() => findTickets(techid));
}

function find() {
    return db('users').select('id', 'username', 'email', 'admin');
}



function findBy(filter) {
    return db("users").select('*').where(filter);
}


async function findTickets(id) {
    return await db('assigned as asg')
        .where('techid', id)
        .join('tickets as t', 'asg.ticketid', 't.id')
        .select('asg.ticketid', 't.title', 't.description', 't.tried', 't.category', 't.solution');
}

async function findStudent(id) {
    return await db('students as st')
        .where('studentid', id)
        .join('tickets as t', 'st.ticketid', 't.id')
        .select('st.ticketid', 't.title', 't.description', 't.tried', 't.category', 't.solution');
}
async function add(user) {
    if (user.username && user.password && user.email) {
        const [id] = await db('users').insert(user, "id");
        return findById(id);
    } else {
        return ({ err: "Plese check that all fields are sent." })
    }
}
async function findTicketById(ticketid) {
    return await db('assigned')
        .select('id', 'techid', 'ticketid')
        .where({ ticketid })
        .first();
}

function findById(id) {
    //return db('users').select('id', 'username', 'email', 'admin').where({ userid: id }).first();
    return db('users').where({ id: id }).first();
}


async function removeAsgTicket(ticket_id) {
    return await db('assigned')
        .where({ ticket_id })
        .del();
}


function getAllLogsForUser(userid) {
    return db("logs").where({ userid })
}


return db("logs")
    .select("title", "description", "users.username")
    .join("users", "logs.userid", "users.id")
    .orderBy('title', 'desc').limit(5);
}

function change(user, id) {
    return db('users')
        .where({ id })
        .change(user);
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