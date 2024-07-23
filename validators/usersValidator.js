const { body, validationResult } = require('express-validator');

// users頁面共用express-validator
const usersValidate = [
  body('user.email')
    // email值為空
    .notEmpty().withMessage('請輸入Email')
    // 註冊email格式不正確
    .isEmail().withMessage('Email格式不正確'),
    
  body('user.password')
    // password值為空
    .notEmpty().withMessage('請輸入密碼')
    // password字數太少
    .isLength({ min: 6 }).withMessage('密碼長度必須超過6字'),
    

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