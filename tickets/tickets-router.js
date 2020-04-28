const express = require('express');
const Tickets = require('./tickets-model.js');
const router = express.Router();
const authenticate = require('../auth/authenticate-middleware.js');

// /api/logs/
// localhost: 4000 / api / logs
router.get('/', (req, res) => {
    Tickets.get()
        .then(tickets => {
            res.status(200).json(tickets)
        })
    console.log(error);
    res.status(500).json({
        error: error
    })
});

//  /api/logs/
router.post('/', (req, res) => {
    const tickets = req.body;
    Tickets.add(tickets)
        .then(tickets => {
            res.status(201).json(tickets)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        })
});

// /api/logs/:id
router.get('/:id', (req, res) => {
    Tickets.findById(req.params.id)
        .then(tickets => {
            if (tickets) {
                res.json(tickets)
            } else {
                res.status(404).json({ message: "The log with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get ticket" })
        })
})

// edit an existing ticket log
// /api/logs/:id
router.put('/:id', (req, res) => {
    const tickets = req.body;
    const id = req.params.id;
    Tickets.update(id, tickets)
        .then(tickets => {
            if (tickets) {
                res.status(200).json(tickets)
            } else {
                res.status(404).json({ message: "Ticket with specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Could not update Ticket" })
        })
});


// @route DELETE api/logs/:id/1
// @desc Update User
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
            res.status(500).json({ message: "Ticket could not be removed" })
        })
})


module.exports = router;