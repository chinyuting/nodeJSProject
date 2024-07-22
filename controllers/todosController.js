const Todos = require('../models/TodosModel');

/* 
  取得todos 引用TodosModel.getTodos
  @param {Object} request
         {Object} response
*/
async function getTodos(req, res) {
  // 取得Bearer token的id
  const { id } = req.user;
  try {
    const todos = await Todos.getTodos({ id });
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  新增todos 引用TodosModel.addTodo
  @param {Object} request
         {Object} response
*/
async function addTodo(req, res) {
  const { content, completed_at } = req.body;
  // 取得Bearer token的id
  const { id } = req.user;
  try {
    const todos = await Todos.addTodo({ content, completed_at, id });
    // res.json(todos);
    res.status(200).json({
      todos: {
        id: todos.id,
        content: todos.content,
      },
      message: `新增成功`
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  toggle todo 完成狀態 引用TodosModel.toggleTodoAsCompleted
  @param {Object} request
         {Object} response
*/
async function toggleTodoAsCompleted(req, res) {
  // 取得參數todoId
  const { todoId } = req.params;
  // 取得Bearer token的id
  const { id } = req.user;
  try {
    const todos = await Todos.toggleTodoAsCompleted({ todoId, id });
    res.status(200).json({
      todos: {
        id: todos.id,
        content: todos.content,
        completed_at: todos.completed_at,
      },
      message: `成功更改狀態`
    });
    
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  修改todo content 引用TodosModel.editTodoContent
  @param {Object} request
         {Object} response
*/
async function editTodoContent(req, res) {
  // 取得參數todoId
  const { todoId } = req.params;
  // 取得Bearer token的id
  const { id } = req.user;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content cannot be null!' });
  }
  try {
    const todos = await Todos.editTodoContent({ todoId, content, id });
    res.status(200).json({
      todos: {
        id: todos.id,
        content: todos.content,
      },
      message: `修改成功`
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

/* 
  移除todo 引用TodosModel.removeTodo
  @param {Object} request
         {Object} response
*/
async function removeTodo(req, res) {
  // 取得參數todoId
  const { todoId } = req.params;
  const { id } = req.user;
  try {
    const todos = await Todos.removeTodo({ todoId, id });
    res.status(200).json({
      todos: {
        id: todos.id,
        content: todos.content,
      },
      message: `刪除成功`
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
}

module.exports = {
  getTodos,addTodo,toggleTodoAsCompleted,editTodoContent,removeTodo
};
