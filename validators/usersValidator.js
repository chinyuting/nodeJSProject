const { body, validationResult } = require('express-validator');

const usersValidate = [
  body('user.email')
    .notEmpty().withMessage('請輸入Email')
    .isEmail().withMessage('Email格式不正確'),
    
  body('user.password')
    .isLength({ min: 6 }).withMessage('密碼長度必須超過6字')
    .notEmpty().withMessage('請輸入密碼'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  usersValidate
};