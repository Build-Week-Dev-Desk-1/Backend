const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ----> npm i jsonwebtoken

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

//https://devdeskapi.herokuapp.com/api/auth/register
router.post('/register', async(req, res) => {
    const { username, password, role } = req.body;
    if (role === 'tech' || role === 'student') {
        try {
            if (username && password && role) {
                let user = req.body;
                const hash = bcrypt.hashSync(user.password, 10);
                user.password = hash;

                await Users.add(user)
                    .then(saved => {
                        const token = generateToken(saved);
                        res.status(201).json({
                            id: saved.id,
                            username: saved.username,
                            useremail: saved.email,
                            role: saved.role,
                            token
                        })
                    })
            } else res.status(400).json({ message: "Missing some parameters" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'cannot add this user', error });
        }
    } else res.status(400).json({ message: "Invalid role being sent" });
});


//https://devdeskapi.herokuapp.com/api/auth/login
router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // search for the user using the username
    Users.findBy({ username })
        .then(([user]) => {
            // if we find the user, then also check that passwords match
            if (user && bcrypt.compareSync(password, user.password)) {

                // let admin;
                // user.admin ?
                //     user.admin = true :
                //     user.admin = false

                // produce a token
                const token = generateToken(user);

                // send the token to the client
                res.status(200).json({
                    message: `Welcome to the users section, ${user.username}!, here is your token`,
                    token,
                    id: user.id,
                    username: user.username,
                    role: user.role
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

function generateToken(user) {
    // the data
    const payload = {
        userId: user.id,
        username: user.username,
        role: user.role
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;