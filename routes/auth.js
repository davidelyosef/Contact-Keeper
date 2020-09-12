const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", (req, res) => {
    try {
        res.send("Get a new user.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

// @route   POST api/auth
// @desc    Get logged in user
// @access  Public
router.post("/", (req, res) => {
    try {
        res.send("Log in user.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

module.exports = router;