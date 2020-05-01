const db = require("../data/dbConfig.js");

module.exports = {
    add,
    assignTicket,
    findAssignedTickets,
    findUser,
    findBy,
    findById,
    findStudent,
    findAssignedTicketById,
    change,
    remove,
    removeAsgTicket,
    removeTicket,
    setUserLogs,
    findStdTicketById,

};

function findUser() {
    return db('users').select('id', 'username', 'email', 'role');
}

function findBy(filter) {
    return db("users").where(filter);
}

function findStudent(id) {
    return db('stud_tickets as st')
        .where('studentid', id)
        .join('tickets as t', 'st.ticketid', 't.id')
        .select('st.ticketid', 't.title', 't.description', 't.tried', 't.category');
}

function findAssignedTickets(id) {
    return db('asg_tickets as at')
        .where('techid', id)
        .join('tickets as t', 'at.ticketid', 't.id')
        .select(
            'at.ticketid',
            't.title',
            't.description',
            't.tried',
            't.category'
        );
}

async function findAssignedTicketById(ticketid) {
    return await db('asg_tickets')
        .select('id', 'techid', 'ticketid')
        .where({ ticketid })
        .first();
}

async function assignTicket(techid, ticketid) {
    return await db('asg_tickets')
        .insert({ techid, ticketid }, 'id')
        .then(() => findAssignedTickets(techid));
}

// async function findAssignedTickets(id) {
//     return await db('asg_tickets as at')
//         .where('techid', id)
//         .join('tickets as t', 'at.ticketid', 't.id')
//         .select(
//             'at.ticketid',
//             't.title',
//             't.description',
//             't.tried',
//             't.category'
//         );
// }

function findStdTicketById(id) {
    return db('stud_tickets')
        .where({ id })
        .first();
}

function add(user) {
    return db('users').insert(user).then(ids => {
        const [id] = ids;
        return findById(id);
    });
}

function findById(id) {
    return db('users')
        .select('id', 'username', 'role').where({ id }).first();
}

function removeAsgTicket(ticketid) {
    return db('asg_tickets')
        .where({ ticketid })
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