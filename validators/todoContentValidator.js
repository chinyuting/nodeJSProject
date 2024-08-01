const { body, validationResult } = require('express-validator');

const todoContentValidator = [
  body('content')
    .trim()
    .notEmpty().withMessage('待辦內容不可為空'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
module.exports = {
  todoContentValidator
};