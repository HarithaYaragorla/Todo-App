const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    status: { type: Boolean, default: false }, 
    deadline: { type: Date, required: false }
});

module.exports = mongoose.model('TodoList', todoSchema);
