const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');
const todosController = require('../controllers/todosController');

const { usersValidate } = require('../validators/usersValidator');
const { registerUsersValidator } = require('../validators/registerUsersValidator');
const { todoIdValidator } = require('..//validators/todoIdValidator');
const { todoContentValidator } = require('..//validators/todoContentValidator');

const { authenticate } = require('../middleware/auth');

// user相關
router.post('/users', registerUsersValidator,userController.registerUsers);
router.post('/users/sign_in', usersValidate,userController.signInUsers);

// todos相關
router.get('/todos', authenticate, todoContentValidator, todosController.getTodos);
router.post('/todos',authenticate, todoContentValidator, todosController.addTodo);
router.put('/todos/complete/:todoId',authenticate ,todoIdValidator , todosController.toggleTodoAsCompleted);
router.put('/todos/edit/:todoId',todoIdValidator ,authenticate, todosController.editTodoContent);
router.delete('/todos/:todoId',todoIdValidator ,authenticate, todosController.removeTodo);

module.exports = router;
