const express = require('express')
const TodoTask = require("../models/TodoTask");
const router = express.Router()

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
        });
    } catch(e) {
        console.log(e);
    }
});

module.exports = router