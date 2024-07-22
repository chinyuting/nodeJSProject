const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');
const todosController = require('../controllers/todosController');

const { usersValidate } = require('../validators/usersValidator');
const { rgstUsersValidator } = require('../validators/rgstUsersValidator');

const authenticateJWT = require('../middleware/auth');

// user相關
router.post('/users', rgstUsersValidator,userController.rgstUsers);
router.post('/users/sign_in', usersValidate,userController.signInUsers);

// todos相關
router.get('/todos', authenticateJWT, todosController.getTodos);
router.post('/todos', authenticateJWT, todosController.addTodo);
router.put('/todos/complete/:todoId', authenticateJWT, todosController.toggleTodoAsCompleted);
router.put('/todos/edit/:todoId', authenticateJWT, todosController.editTodoContent);
router.delete('/todos/:todoId', authenticateJWT, todosController.removeTodo);

module.exports = router;
