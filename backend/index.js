const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todoList'); 

const app = express();
app.use(cors());
app.use(express.json());


const mongoURI = "mongodb+srv://Haritha:Harithamongodb1@hari.afrzuju.mongodb.net/tododb?retryWrites=true&w=majority&appName=Hari";


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error("MongoDB connection error:", error));


app.get('/getTodoList', (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.json(err));
});


app.post('/addTodoList', (req, res) => {
    TodoModel.create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
    })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});


app.post('/updateTodoList/:id', (req, res) => {
    const id = req.params.id;
    const updateData = {
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
    };
    TodoModel.findByIdAndUpdate(id, updateData, { new: true })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});


app.delete('/deleteTodoList/:id', (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});


const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
