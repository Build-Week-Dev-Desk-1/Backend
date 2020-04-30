const db = require("../data/dbConfig.js");

module.exports = {
    add,
    addTicket,
    findUser,
    findTickets,
    findBy,
    findById,
    findStudent,
    findTicketById,
    change,
    remove,
    removeAsgTicket,
    removeTicket,
    setUserLogs,
    findStdTicketById
};


async function addTicket(techid, ticketid) {
    return await db('asg_tickets')
        .insert({ techid, ticketid }, 'id')
        .then(() => findTickets(techid));
}

function findUser() {
    return db('users').select('id', 'username', 'email', 'role');
}



function findBy(filter) {
    return db("users").where(filter);
}


async function findTickets(id) {
    return await db('asg_tickets as asg')
        .where('techid', id)
        .join('tickets as t', 'asg.ticketid', 't.id')
        .select('asg.ticketid', 't.title', 't.description', 't.tried', 't.category', 't.solution');
}

async function findStudent(id) {
    return await db('stud_tickets as st')
        .where('studentid', id)
        .join('tickets as t', 'st.ticketid', 't.id')
        .select('st.ticketid', 't.title', 't.description', 't.tried', 't.category', 't.solution');
}

async function findStdTicketById(ticketid) {
    return await db('stud_tickets')
        .select('id', 'studentid', 'ticketid')
        .where({ ticketid })
        .first();
}
// async function add(user) {
//     if (user.username && user.password && user.email && user.role) {
//         const [id] = await db('users').insert(user, "id");
//         return findById(id);
//     } else {
//         return ({ err: "Please check that all fields are sent." })
//     }
// }
async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

async function findTicketById(ticketid) {
    return await db('asg_tickets')
        .select('id', 'techid', 'ticketid')
        .where({ ticketid })
        .first();
}

function findById(id) {
    return db('users')
        .select('id', 'username', 'role').where({ id }).first();
}


async function removeAsgTicket(ticket_id) {
    return await db('asg_tickets')
        .where({ ticket_id })
        .del();
}
async function removeTicket(ticketid) {
    return await db('stud_tickets')
        .where({ ticketid })
        .del();
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