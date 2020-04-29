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
    getTopTen,
    change,
    remove,
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
    return await db('student_tickets as st')
        .where('student_id', id)
        .join('tickets as t', 'st.ticket_id', 't.id')
        .select(
            'st.ticket_id',
            't.title',
            't.description',
            't.tried',
            't.category',
            't.solution'
        );
}
async function add(user) {
    if (user.username && user.password && user.email) {
        const [id] = await db('users').insert(user, "id");
        return findById(id);
    } else {
        return ({ err: "Plese check that all fields are sent." })
    }
}
async function findTicketById(ticket_id) {
    return await db('assigned')
        .select('id', 'techid', 'ticketid')
        .where({ ticket_id })
        .first();
}

function findById(id) {
    //return db('users').select('id', 'username', 'email', 'admin').where({ userid: id }).first();
    return db('users').where({ id: id }).first();
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