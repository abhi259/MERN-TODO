const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb://mongo:JU0nhJ8gwIt0iggPyiFL@containers-us-west-109.railway.app:6855"
)

// const Todo = require("./models/Todo")

const TodoSchema = new mongoose.Schema({
  text: String,
  status: { type: Boolean, default: false },
  timeStamp: {
    type: String,
    default: Date.now(),
  },
})

const Todo = new mongoose.model("Todo", TodoSchema)

app.get("/todos", async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})

app.post("/todo/new", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  })

  newTodo.save()
  res.json(newTodo)
})

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id)

  res.json(result)
})

app.get("/todo/status/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  todo.status = !todo.status
  todo.save()
  res.json(todo)
})

app.listen(process.env.PORT || 5000, () =>
  console.log("Server started on port: 5000")
)
