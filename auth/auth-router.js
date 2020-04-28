const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ----> npm i jsonwebtoken

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

//https://devdeskapi.herokuapp.com/api/auth/register
router.post("/register", (req, res) => {
        let user = req.body; // username, password

        // rounds are 2 to the N times
        const rounds = process.env.HASH_ROUNDS || 14;

        // hash the user.password
        const hash = bcrypt.hashSync(user.password, rounds);

        // update the user to use the hash
        user.password = hash;

        Users.add(user)
            .then(saved => {
                const token = generateToken(saved)
                res.status(201).json({ id: saved.id, username: saved.username, token });
            })
            .catch(err => {
                res.status(500).json({ msg: err })
            })
    })
    //https://devdeskapi.herokuapp.com/api/auth/login
router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // search for the user using the username
    Users.findBy({ username })
        .then(([user]) => {
            // if we find the user, then also check that passwords match
            if (user && bcrypt.compareSync(password, user.password)) {

                // let admin;
                user.admin ?
                    user.admin = true :
                    user.admin = false

                // produce a token
                const token = generateToken(user);

                // send the token to the client
                res.status(200).json({
                    message: `Welcome to the users section, ${user.username}!, here is your token`,
                    token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    admin: user.admin
                });
            } else {
                res.status(401).json({ message: "You cannot pass!" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
        });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({
                    errorMessage: "Unable to log out!!",
                });
            } else {
                res.status(204).end();
            }
        });
    } else {
        res.status(204).end();
    }
});

function generateToken(user) {
    // the data
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;