const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //1:  npm i jsonwebtoken

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

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
            res.status(201).json({
                id: saved.id,
                username: saved.username,
                email: saved.email,
                token
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // search for the user using the username
    Users.findBy({ username })
        .then(([user]) => {
            // if we find the user, then also check that passwords match
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.loggedIn = true;
                const token = generateToken([user]);
                res.status(200).json({
                    id: saved.id,
                    username: saved.username,
                    email: saved.email,
                    token
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

    const payload = user;

    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secret, options);
}
// router.get("/logout", (req, res) => {

//     if (req.session) {
//         req.session.destroy(error => {
//             if (error) {
//                 res.status(500).json({
//                     errorMessage: "Unable to log out!!",
//                 });
//             } else {
//                 res.status(204).json({ message: "you are logged out!!!" });
//             }
//         });
//     } else {
//         res.status(204).end();
//     }
// });

module.exports = router;