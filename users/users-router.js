const router = require("express").Router();
//const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
const Tickets = require("../tickets/tickets-model.js");
//const jwt = require("jsonwebtoken");
//const secrets = require("../api/secrets.js");
const Restricted = require('../auth/authenticate-middleware.js');

// @route GET api/users/
// @desc Get all users information
// @ access Private
//https://devdeskapi.herokuapp.com/api/users
router.get('/', Restricted, (req, res) => {
    Users.findUser()
        .then(user => {
            console.log(user);
            res.json({ loggedInUser: req.username, user })
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving these users", err })
        })
});
// @route GET api/users/:id/4
// @desc Get all users informatin
// @ access Private
//https://devdeskapi.herokuapp.com/api/users/id
// router.get('/:id', Restricted, (req, res) => {
//     Users.findById(req.params.id)
//         .then(user => {
//             if (user) {
//                 res.json(user)
//             } else {
//                 res.status(404).json({ message: "The user with the specified ID does not exist" })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: "Could not get user", err })
//         })
// })



//Assign a ticket to user
// @route POST api/users/add/:id/ticket
// @desc Adding ticket to User
// @access 
router.post('/add/:id/ticket', (req, res) => {
    const techid = req.user.id;
    const { id } = req.params;
    req.user.role === 'tech' ?
        Users.findTicketById(id)
        .then(ticket => {
            if (!ticket) {
                Users.addTicket(techid, id)
                    .then(tickets => {
                        Tickets.update(id, { assigned: true })
                        res.status(200).json(tickets);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: "Unable to assign ticket." })
                    })
            } else res.status(400).json({ message: "This ticket has already been assigned." })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "There is an error on assigning ticket." })
        }) :
        res.status(400).json({ message: "Ticket assignment restricted to techs only." });
});





//GET USERS TICKETS
// @route GET api/users/ticket
// @desc GET User
// @access Private
router.get('/ticket', Restricted, (req, res) => {
    const userid = req.user.id;
    if (req.user.role === 'student') {
        Users.findStudent(userid)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Unable to get tickets!!" })
            })
    } else if (req.user.role === 'tech') {
        Users.findTickets(userid)
            .then(tickets => {
                res.status(200).json(tickets)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Unable to get tickets!!" })
            })
    } else res.status(400).json({ message: "Please specify the user role!!" });
})



// @route PUT api/users/:id/1
// @desc Update User
// @access Private
//https://devdeskapi.herokuapp.com/api/users/:id/4
router.put('/:id', (req, res) => {
    Users.change(req.body, req.params.id)
        .then(user => {
            if (user) {
                res.json({ message: "User Updated" })
            } else {
                res.status(404).json({ message: "User with specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "User could not be updated", err })
        })
})

// RESOLVE TICKET
// @route PUT api/users/tickets/:id/resolve
// @desc Update User
// @access Private
router.put('/ticket/:id/resolved', (req, res) => {
    const { id } = req.params;
    const userid = req.user.id;
    const { solution } = req.body;
    if (solution) {
        req.user.role === 'tech' ? Users.findTicketById(id)
            .then(ticket => {
                if (ticket) {
                    if (ticket.techid === userid) {
                        Tickets.update(id, { solution, resolved: true })
                            .then(update => {
                                res.status(200).json(update)
                            });
                    } else res.status(400).json({ message: "Unable to resolve unassigned ticket." })
                } else res.status(404).json({ message: "The ticket not found" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Unable to update ticket." })
            }) :
            res.status(400).json({ message: "Ticket updating restricted to techs only." });
    } else res.status(400).json({ message: "Please add a solution to the resolved ticket." });
});


//reassigned tickets
//@route /tickets/:id/reassign
// @desc reassigned tickets
// @access Private
router.put('/tickets/:id/reassign', (req, res) => {
    const { id } = req.params;
    const userid = req.user.id;
    req.user.role === 'tech' ? Users.findTicketById(id)
        .then(ticket => {
            if (ticket) {
                if (ticket.techid === userid) {
                    Tickets.update(id, { solution: null, assigned: false, resolved: false })
                        .then(update => {
                            Users.removeAsgTicket(id)
                                .then(() => {
                                    res.status(200).json(update)
                                });
                        });
                } else res.status(400).json({ message: "Unable reassign ticket." })
            } else res.status(404).json({ message: "Unable to find ticket" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error updating the ticket." })
        }) :
        res.status(400).json({ message: "Ticket updating restricted to techs." });
});

// @route Delete api/users/tickets/:id
// @desc deletes tickets by id
// @access Private
//https://devdeskapi.herokuapp.com/api/users/tickets/:id/
router.delete('/tickets/:id', Restricted, (req, res) => {
    const { id } = req.params;
    const userid = req.user.id;
    req.user.role === 'student' ? Users.findStdTicketById(id)
        .then(ticket => {
            if (ticket) {
                if (ticket.studentid === userid) {
                    Users.removeTicket(id)
                        .then(() => {
                            Tickets.remove(id)
                                .then(() => {
                                    res.status(200).json({ message: "Ticket was deleted!!." });
                                })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ message: "Error deleting this ticket." })
                        })
                } else res.status(400).json({ message: "You may not delete the ticket it." })
            } else res.status(404).json({ message: "Ticket could not be found." })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Unable to remove...here was an error deleting the ticket ." });
        }) :
        res.status(400).json({ message: "Deleting tickets is restricted to students." })
})

module.exports = router;