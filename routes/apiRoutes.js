const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const todosController = require('../controllers/todosController');

const authenticateJWT = require('../middleware/auth');

router.get('/users', (req, res) => {userController.rgstUsers(req, res)});
router.post('/users/sign_in', (req, res) => {userController.signInUsers(req, res)});

router.get('/todos/:userid', authenticateJWT, todosController.getTodos);
router.post('/todos', authenticateJWT, (req, res) => {todosController.addTodo(req, res)});
router.put('/todos/:todoid/complete', authenticateJWT, todosController.toggleTodoAsCompleted);
router.put('/todos/:todoid/edit', authenticateJWT, todosController.editTodoContent);
router.delete('/todos/:todoid/remove', authenticateJWT, todosController.removeTodo);

module.exports = router;
