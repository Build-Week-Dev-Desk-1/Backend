const router = require("express").Router();
//const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
//const jwt = require("jsonwebtoken");
// const secrets = require("../api/secrets.js");
const Restricted = require('../auth/authenticator.js');

// @route GET api/users
// @desc Get all users informatin
// @ access Private
//https://devdeskapi.herokuapp.com/api/users
router.get('/', Restricted, (req, res) => {
    Users.find()
        .then(user => {
            console.log(user);
            res.json({ loggedInUser: req.username, user })
        })
        .catch(err => {
            res.json(err)
        })
});
// @route GET api/users/:id
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

// @route PUT api/users/:id/1
// @desc Update User
// @access Private
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