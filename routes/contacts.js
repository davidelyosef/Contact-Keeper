const express = require("express");
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", (req, res) => {
    try {
        res.send("Get all contacts.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

// @route   POST api/contacts
// @desc    Add contact
// @access  Private
router.post("/", (req, res) => {
    try {
        res.send("Add new contact.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

// @route   PATCH api/contacts/:id
// @desc    Update contact
// @access  Private
router.patch("/:id", (req, res) => {
    try {
        res.send("Update contact.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", (req, res) => {
    try {
        res.send("Delete contact.");
    } catch (err) {
        console.error("Error: " + err.message);
    }
});

module.exports = router;