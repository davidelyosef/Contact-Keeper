const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        res.send("Registered a new user.");
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