const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.secret");

// Load input validation
const validateJwtToken = require("../../validation/validateJwtToken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load user model
const User = require("../../models/user.model");

// @route GET api/users/
// @desc Get a list of profiles of the user
// @access PUBLIC
router.get("/", (req, res) => {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            let userItems = [];

            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                const userItem = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    __v: user.__v
                };
                userItems.push(userItem);
            }

            res.json(userItems);
        }
    });
});

// @route GET api/users/:id
// @desc Get the profile of the user
// @access PRIVATE
router.get("/:id", (req, res) => {
    const auth = req.headers.authorization;
    const jwtToken = validateJwtToken(auth);

    let tokenId = jwtToken && jwtToken.id;

    if (tokenId !== req.params.id) {
        res.status(400).send("Unauthorized request");
        return;
    }
    
    User.findById(tokenId, function(err, user) {
        if (!user) {
            // HTTP status 404 means "NOT FOUND" error
            res.status(404).send("data is not found");
            if (err) { 
                console.log(err); 
            }
        } else {
            // Sanitize the user object so that the password 
            // (even though its encrypted) is not shown to the public.
            const userItem = {
                _id: user._id,
                name: user.name,
                email: user.email,
                __v: user.__v
            };
            res.json(userItem);
        }
    });
});

// @route POST api/users/remove/:id
// @desc Remove a user item from the server's database by id
// @access PRIVATE
router.post('/remove/:id', (req, res) => {
    const auth = req.headers.authorization;
    const jwtToken = validateJwtToken(auth);

    let tokenId = jwtToken && jwtToken.id;

    console.log(tokenId);

    if (tokenId !== req.params.id) {
        res.status(400).send("Unauthorized request");
        return;
    }

    User.findByIdAndRemove(tokenId, function(err, user) {
        if (user) {
            // If user is NOT null, that means that the user object is removed.
            res.status(200).send('removal successful');
        } else if (err) {
            // If err is NOT null, that means that something has gone wrong, so report it.
            res.status(err.status).send(err);
        } else {
            // If NEITHER user nor err is valid, then we assume that the user object is not found.
            res.status(404).send('user not found');
        }
    });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // If the server can find another user by
            // the email used for registering, then output an error
            return res.status(400).json(errors);
        } else {
            // If the server found no other user with that email,
            // proceed to create the user.
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 yr in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.status(400)
                                    .json({ passwordincorrect: "Password incorrect" });
                    }
                });
        });
});

module.exports = router;
