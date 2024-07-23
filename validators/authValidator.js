const { header, validationResult } = require('express-validator');

const authValidator = [
  // 驗證是否帶有Bearer 且格式正確
  header('Authorization')
    .exists().withMessage('未正確授權')
    .matches(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/).withMessage('未正確授權'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  authValidator
};