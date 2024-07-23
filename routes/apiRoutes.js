const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');
const todosController = require('../controllers/todosController');

const { usersValidate } = require('../validators/usersValidator');
const { registerUsersValidator } = require('../validators/registerUsersValidator');
const { authValidator } = require('..//validators/authValidator');
const { todoIdValidator } = require('..//validators/todoIdValidator');
const { todoContentValidator } = require('..//validators/todoContentValidator');

const { authenticateJWT } = require('../middleware/auth');

// user相關
router.post('/users', registerUsersValidator,userController.registerUsers);
router.post('/users/sign_in', usersValidate,userController.signInUsers);

// todos相關
router.get('/todos',authValidator, authenticateJWT, todoContentValidator, todosController.getTodos);
router.post('/todos',authValidator, authenticateJWT, todoContentValidator, todosController.addTodo);
router.put('/todos/complete/:todoId',authValidator ,authenticateJWT ,todoIdValidator , todosController.toggleTodoAsCompleted);
router.put('/todos/edit/:todoId',todoIdValidator ,authValidator, authenticateJWT, todosController.editTodoContent);
router.delete('/todos/:todoId',todoIdValidator ,authValidator, authenticateJWT, todosController.removeTodo);

module.exports = router;
