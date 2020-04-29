const express = require('express');
const Tickets = require('./tickets-model.js');
const router = express.Router();
//const Restricted = require('../auth/authenticate-middleware.js');



// LIST ALL CLOSED TICKETS
// LIST OPEN TICKETS



/// LIST ALL TICKETS
// @route GET api/tickets/
// @desc get all tickets 
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



// @route GET api/tickets/open
// @desc get OPEN tickets not assigned
// @access Private
router.get('/open', (req, res) => {
    Tickets.find({ assigned: false })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

// @route GET api/tickets/closed
// @desc get OPEN tickets not resolved
// @access Private
router.get('/closed', (req, res) => {
    Tickets.find({ resolved: true })
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json(err)
        });
})


// ADD TICKET
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




// @route GET api/tickets/:id/
// @desc get tickets by id 
// @access Private
//https: //devdeskapi.herokuapp.com/api/tickets/1
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
//https: //devdeskapi.herokuapp.com/api/tickets/1
// router.put('/:id', (req, res) => {
//     Tickets.update(req.body, req.params.id)
//         .then(tickets => {
//             if (tickets) {
//                 res.status(200).json({
//                     message: "Ticket was updated!!!"
//                 })
//             } else {
//                 res.status(404).json({ message: "Ticket with specified ID does not exist" })
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ message: "Could not update Ticket" })
//         })
// });


// DELETE A TICKET
// @route DELETE api/tickets/:id
// @desc delete ticket by :id
// @access Private
//https: //devdeskapi.herokuapp.com/api/tickets/1
router.delete('/:id', (req, res) => {
    Tickets.remove(req.params.id)
        .then(tickets => {
            if (tickets) {
                res.json({ message: "Ticket removed!!!" })
            } else {
                res.status(404).json({ message: "Ticket with specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Ticket could not be removed", err })
        })
})


module.exports = router;