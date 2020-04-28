const express = require('express');
const Logs = require('./logs-model.js');
const router = express.Router();
const authenticate = require('../auth/authenticate-middleware.js');
// /api/logs/
// localhost: 4000 / api / logs
router.get('/', (req, res) => {
    Logs.get()
        .then(logs => {
            res.status(200).json(logs)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        })
});

// middleware autheniticate
// router.get("/r", authenticate, (req, res) => {
//     Logs.getAll()
//         .then(logs => {
//             res.json(logs);
//         })
//         .catch(err => res.status(500).json({ msg: err }))
// });

// /api/logs/count
// localhost:4000/api/logs/count
router.get("/count", (req, res) => {
    Logs.count()
        .then(logs => {
            res.json(logs);
        })
        .catch(err => res.status(500).json({ msg: err }))
});

// /api/logs/:id
router.get('/logs/:id', (req, res) => {
    const id = req.params.id;
    Logs.getLogByUserId(id)
        .then(logs => {
            res.status(200).json(logs)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        })
});

//  /api/logs/
router.post('/', (req, res) => {
    const logs = req.body;
    Logs.insert(logs)
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

// edit an existing ticket log
// /api/logs/
router.put('/', (req, res) => {
    const logs = req.body;
    const id = req.params.id;
    Logs.update(id, logs)
        .then(logs => {
            res.status(200).json(logs)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        })
});
// /api/logs/del/:id
router.delete('/del/:id', (req, res) => {
    const id = req.params.id;
    Logs.remove(id)
        .then(deleted => {
            res.status(200).json({ message: 'This log has been successfully deleted.' })
        })
        .catch(err => {
            console.log('error in delete', err)
            res.status(500).json({ errorMessage: 'The log post could not be removed.' })
        })

});


module.exports = router;