const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const todosController = require('../controllers/todosController');

router.get('/users', (req, res) => {userController.rgstUsers(req, res)});
router.get('/users/sign_in', (req, res) => {userController.signInUsers(req, res)});

router.get('/todos/:userid', todosController.getTodos);
router.post('/todos', (req, res) => {todosController.addTodo(req, res)});
router.put('/todos/:todoid/complete', todosController.toggleTodoAsCompleted);
router.put('/todos/:todoid/edit', todosController.editTodoContent);
router.delete('/todos/:todoid/remove', todosController.removeTodo);

module.exports = router;
