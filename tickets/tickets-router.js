const express = require('express');
const Tickets = require('./tickets-model.js');
const router = express.Router();
//const Restricted = require('../auth/authenticate-middleware.js');

// @route GET api/tickets/
// @desc get tickets 
// @access Private
router.get('/', (req, res) => {
    Tickets.findBy()
        .then(tickets => {
            res.json(tickets)
        })
        .catch(err => {
            res.json(err)
        })
});

// @route PUT api/tickets/
// @desc POST new ticket 
// @access Private
router.post('/', (req, res) => {
    const tickets = req.body;
    Tickets.add(tickets)
        .then(item => {
            res.status(201).json({
                msg: "ticket created!!",
                item
            })
        })
        .catch(err => {
            res.status(500).json({ message: "Could not add ticket", err })
        })
});

// @route GET api/tickets/:id/1
// @desc get tickets by id 
// @access Private
router.get('/:id', (req, res) => {
    Tickets.findById(req.params.id)
        .then(tickets => {
            if (tickets) {
                res.json({
                    msg: "Ticket was found!!",
                    tickets
                })
            } else {
                res.status(404).json({ message: "The log with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get ticket" })
        })
})

// @route PUT api/tickets/:id/1
// @desc Update ticket by id 
// @access Private
router.put('/:id', (req, res) => {
    Tickets.update(req.body, req.params.id)
        .then(tickets => {
            if (tickets) {
                res.status(200).json({
                    message: "Ticket was updated!!!"
                })
            } else {
                res.status(404).json({ message: "Ticket with specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Could not update Ticket" })
        })
});

// @route DELETE api/tickets/:id/1
// @desc delete ticket by :id
// @access Private
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Tickets.remove(id)
        .then(tickets => {
            if (tickets) {
                res.json({ message: "Ticket removed" })
            } else {
                res.status(404).json({ message: "Ticket with specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Ticket could not be removed", err })
        })
})


module.exports = router;