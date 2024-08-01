const { param, body, validationResult } = require('express-validator');
const Todos = require('../models/TodosModel');

const todoIdValidator = [
  param('todoId')
    .notEmpty().withMessage('查無資料')
    .isUUID().withMessage('查無資料')
    .bail()
    .custom(async value => {
      const todo = await Todos.findTodosByID(value);
      if (!todo) {
        throw new Error('查無資料');
      }
    }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    next();
  }
];
module.exports = {
  todoIdValidator
};