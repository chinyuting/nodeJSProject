const Todos = require('../models/TodosModel');

/* 
  取得todos 引用TodosModel.getTodos
  @param request and response
*/
async function getTodos(req, res) {
  const { id } = req.user;
  try {
    // Fetch users (example)
    const todos = await Todos.getTodos({ id });
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  新增todos 引用TodosModel.addTodo
  @param request and response
*/
async function addTodo(req, res) {
  const { content, completed_at } = req.body;
  const { id } = req.user;
  try {
    // Fetch users (example)
    const todos = await Todos.addTodo({ content, completed_at, id });
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  toggle todo 完成狀態 引用TodosModel.toggleTodoAsCompleted
  @param request and response
*/
async function toggleTodoAsCompleted(req, res) {
  const { todoId } = req.params;
  const { id } = req.user;
  try {
    // Fetch users (example)
    const todos = await Todos.toggleTodoAsCompleted({ todoId, id });
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  修改todo content 引用TodosModel.editTodoContent
  @param request and response
*/
async function editTodoContent(req, res) {
  const { todoId } = req.params;
  const { content } = req.body;
  const { id } = req.user;
  if (!content) {
    return res.status(400).json({ error: 'Content cannot be null!' });
  }
  try {
    // Fetch users (example)
    const todos = await Todos.editTodoContent({ todoId, content, id });
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  移除todo 引用TodosModel.removeTodo
  @param request and response
*/
async function removeTodo(req, res) {
  const { todoId } = req.params;
  const { id } = req.user;
  try {
    // Fetch users (example)
    const todos = await Todos.removeTodo({ todoId, id });
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
