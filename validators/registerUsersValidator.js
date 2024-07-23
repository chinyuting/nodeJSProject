const { body, validationResult } = require('express-validator');
const Users = require('../models/UsersModel');
const { usersValidate } = require('./usersValidator');

// registerUsers 的 express-validator
const registerUsersValidator = [
  // 註冊的電子信箱已被使用
  body('user.email').custom(async value => {
    const user = await Users.findUserByEmail(value);
    if (user) {
      throw new Error('電子信箱已被使用');
    }
  }),
  // 引入users頁面共用express-validator
  ...usersValidate,
  
  async (req, res, next) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  registerUsersValidator
};