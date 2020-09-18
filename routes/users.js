const express = require("express");
const router = express.Router();
const {
    check,
    validationResult
} = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

router.post("/", [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({
        min: 6
    })
], async (req, res) => {
    try {
        // if there is errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // Destructure
        const {
            name,
            email,
            password
        } = req.body;

        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                msg: 'User already exist'
            })
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // JWT
        const payload = {
            user: {
                id: user.id
            }
        }
        const secret = config.get('jwtSecret');
        const options = {
            expiresIn: 360000
        }
        const callback = (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        }

        jwt.sign(payload, secret, options, callback)

    } catch (err) {
        console.error("Error: " + err.message);
    }
});

router.get("/", (req, res) => {
    try {
        res.send("Get all users.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

router.patch("/:id", (req, res) => {
    try {
        res.send("Update user.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

module.exports = router;