const express = require('express');
const Logs = require('./logs-model.js');
const router = express.Router();
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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