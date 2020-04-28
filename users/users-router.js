const router = require("express").Router();
// const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
// const jwt = require("jsonwebtoken");
// const secrets = require("../api/secrets.js");
//const auth = require('../auth/authenticator.js');


// /api/users/logs
router.post("/", (req, res) => {
    console.log("token", req.decodedToken);
    let logs = req.body
    Users.setUserLogs(logs)
        .then(users => {
            res.status(set.status).json(users.msg);
        })
        .catch(err => res.send(err));
});

// @route GET api/users
// @desc Get all users informatin
// @ access Private
//https://devdeskapi.herokuapp.com/api/users
router.get("/", (req, res) => {
    console.log("token", req.decodedToken);

    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});




// /api/users/topten
router.get("/topten", (req, res) => {
    Users.getTopTen()
        .then(scores => {
            res.json(scores);
        })
        .catch(err => res.json({ err: err }))
});


// @route DELETE api/users/:id/1
// @desc Update User
// @access Private
router.put('/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            if (user) {
                res.json({ message: "User removed" })
            } else {
                res.status(404).json({ message: "User with specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "User could not be removed" })
        })
})


module.exports = router;