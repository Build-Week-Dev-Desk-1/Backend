const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
const jwt = require("jsonwebtoken");
const secrets = require("../api/secrets.js");
const auth = require('../auth/authenticator.js');
//https://devdeskapi.herokuapp.com/api/users
router.get("/", (req, res) => {
    console.log("token", req.decodedToken);

    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});
router.get('/:id', auth, (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                msg: "Unable to obtain userid",
                userid: id
            })
        })
});
// router.post('/login', (req, res) => {

//     const Users = req.body;
//     Users.insert(users)
//         .then(users => {
//             res.status(201).json({ message: 'This user has been successfully created.' })
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 error: error
//             })
//         })
// });

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // search for the user using the username
    Users.findBy({ username })
        .then(([user]) => {
            // if we find the user, then also check that passwords match
            if (user && bcrypt.compareSync(password, user.password)) {
                // produce a token
                const token = generateToken(user);

                // send the token to the client
                res.status(200).json({
                    message: "Welcome to the Users section!",
                    username,
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


router.put('/:id', (req, res) => {
    const Users = req.body;
    const id = req.params.id;
    Users.update(id, logs)
        .then(users => {
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