const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require("express-validator/check");
const auth = require('../middlewares/auth');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        // Get user by id of the decoded token and display it exept the password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error("Error: " + err.message);
        res.status(500).send({msg: 'Server error'});
    }
});

// @route   POST api/auth
// @desc    Get logged in user
// @access  Public
router.post("/", [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    try {
        // if there is errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        // search if the email send from the user is exist
        const {
            email,
            password
        } = req.body;
        let user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        // check if the password sent from the user is match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

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

        jwt.sign(payload, secret, options, callback);
    } catch (err) {
        console.error("Error: " + err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;