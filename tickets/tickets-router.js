const express = require('express');
const Logs = require('./tickets-model.js');
const router = express.Router();
const authenticate = require('../auth/authenticate-middleware.js');

// /api/logs/
// localhost: 4000 / api / logs
router.get('/', (req, res) => {
    Logs.get()
        .then(item => {
            res.status(200).json(logs)
        })
    console.log(error);
    res.status(500).json({
        error: error
    })
});

//  /api/logs/
router.post('/', (req, res) => {
    const logs = req.body;
    Logs.add(logs)
        .then(logs => {
            res.status(201).json(logs)
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
    Logs.findById(req.params.id)
        .then(item => {
            if (item) {
                res.json(item)
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
    const logs = req.body;
    const id = req.params.id;
    Logs.update(id, logs)
        .then(logs => {
            if (logs) {
                res.status(200).json(logs)
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
    Logs.remove(id)
        .then(logs => {
            if (logs) {
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