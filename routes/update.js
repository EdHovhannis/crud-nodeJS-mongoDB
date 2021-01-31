const express = require('express')
const TodoTask = require("../models/TodoTask");
const router = express.Router()

router.get('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        await TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
            
    } catch(e) {
        console.log(e);
    }
})

router.post('/:id', async (req, res) => {
        const id = req.params.id;
        await TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
        });
})

module.exports = router