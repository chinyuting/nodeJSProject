const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    todoId: String,
    content: String,
    completeAt: String,
    userId: String
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;