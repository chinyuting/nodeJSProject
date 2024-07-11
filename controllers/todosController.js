const Todos = require('../models/TodosModel');

async function getTodos(req, res) {
  const { userid } = req.params;
  try {
    // Fetch users (example)
    const todos = await Todos.getTodos(userid);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

async function addTodo(req, res) {
  try {
    // Fetch users (example)
    const todos = await Todos.addTodo(req, res);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

async function toggleTodoAsCompleted(req, res) {
  const { todoid } = req.params;
  try {
    // Fetch users (example)
    const todos = await Todos.toggleTodoAsCompleted(todoid);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

async function editTodoContent(req, res) {
  const { todoid } = req.params;
  const { content } = req.body;
  try {
    // Fetch users (example)
    if (!content) {
      return res.status(400).json({ error: 'Content cannot be null!' });
    }
    const todos = await Todos.editTodoContent(todoid, content);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}
async function removeTodo(req, res) {
  const { todoid } = req.params;
  try {
    // Fetch users (example)
    const todos = await Todos.removeTodo(todoid);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

module.exports = {
  getTodos,addTodo,toggleTodoAsCompleted,editTodoContent,removeTodo
  // Add more controller functions as needed
};
