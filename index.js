const express = require('express')
const TodoTask = require("./models/TodoTask");
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const updateRoute = require('./routes/update')
const removeRoute = require('./routes/remove')
const app = express() 


app.set("view engine", "ejs");
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended:true}))

app.use('/edit', updateRoute)
app.use('/remove', removeRoute)

app.get("/", async (req, res) => {
    try {
        await TodoTask.find({}, (err, tasks) => {
            console.log(tasks)
            res.render("todo.ejs", { todoTasks: tasks });
        });
    } catch(e) {
        console.log(e)
    }
});


app.post('/', async (req, res)=>{
    const todoTask = new TodoTask({
        content: req.body.content
    })

    try {
        await todoTask.save()
        res.redirect('/')
    } catch(e) {
        console.log(e)
    }
})



async function start() {
await mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, ()=>{
    console.log('db')
    app.listen(3000, 
        () => console.log("Server Up and running")
    )
})
}

start()


