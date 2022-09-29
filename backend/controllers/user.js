const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "User created" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: "Invalid email/password pair" });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Invalid email/password pair" });
                    } else {
                        res.status(200).json({ 
                            userId: user._id,
                            role: user.role,
                            token: jwt.sign(
                                { 
                                    userId: user._id,
                                    role: user.role
                                },
                                process.env.JWT_SECRET_KEY,
                                { expiresIn: "24h" }
                            ) 
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}
