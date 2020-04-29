const router = require("express").Router();
//const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
const Tickets = require("./ticket-model.js");
//const jwt = require("jsonwebtoken");
// const secrets = require("../api/secrets.js");
const Restricted = require('../auth/authenticate-middleware.js');

// @route GET api/users/
// @desc Get all users information
// @ access Private
//https://devdeskapi.herokuapp.com/api/users
router.get('/', Restricted, (req, res) => {
    Users.find()
        .then(user => {
            console.log(user);
            res.json({ loggedInUser: req.username, user })
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving this users", err })
        })
});
// @route GET api/users/:id/4
// @desc Get all users informatin
// @ access Private
//https://devdeskapi.herokuapp.com/api/users/id
router.get('/:id', Restricted, (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get user", err })
        })
})



//Assign a ticket to user
// @route POST api/users/add/:id/ticket
// @desc Assings ticket to User
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
// @route GET api/users/tickets
// @desc GET User
// @access Private
router.get('/tickets', (req, res) => {
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
                res.status(500).json({ message: "Unagle to get tickets!!" })
            })
    } else res.status(400).json({ message: "Please specify the user role!!" });
})



// @route PUT api/users/:id/1
// @desc Update User
// @access Private
//https://devdeskapi.herokuapp.com/api/users/:id/4
router.put('/:id', Restricted, (req, res) => {
    Users.update(req.body, req.params.id)
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

// @route Delete api/users/:id/1
// @desc deletes User
// @access Private
//https://devdeskapi.herokuapp.com/api/users/:id/2
router.delete('/:id', Restricted, (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            if (user) {
                res.json({ message: "User removed" })
            } else {
                res.status(404).json({ message: "User with specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "User could not be removed", err })
        })
})

module.exports = router;