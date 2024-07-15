const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const todosController = require('../controllers/todosController');

const authenticateJWT = require('../middleware/auth');
// user相關
router.get('/users', userController.rgstUsers);
router.post('/users/sign_in', userController.signInUsers);
// todos相關
router.get('/todos', authenticateJWT, todosController.getTodos);
router.post('/todos', authenticateJWT, todosController.addTodo);
router.put('/todos/complete/:todoId', authenticateJWT, todosController.toggleTodoAsCompleted);
router.put('/todos/edit/:todoId', authenticateJWT, todosController.editTodoContent);
router.delete('/todos/remove/:todoId', authenticateJWT, todosController.removeTodo);

module.exports = router;
