const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
    console.log("token", req.decodedToken);

    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});
router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
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
    Users.insert(logs)
        .then(logs => {
            res.status(201).json({ message: 'This user has been successfully created.' })
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
    Users.update(id, logs)
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
    Users.remove(id)
        .then(deleted => {
            res.status(200).json({ message: 'This user has been successfully deleted.' })
        })
        .catch(err => {
            console.log('error in delete', err)
            res.status(500).json({ errorMessage: 'The user could not be removed.' })
        })

});

module.exports = router;