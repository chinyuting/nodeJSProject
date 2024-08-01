const jwt = require('jsonwebtoken');
const { header, validationResult } = require('express-validator');
const secretKey = process.env.JWT_SECRET_KEY;

const authenticate = [
  // 验证是否带有 Bearer 且格式正确
  header('Authorization')
    .exists().withMessage('未正確授權')
    .matches(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/).withMessage('未正確授權'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    next();
  },

  (req, res, next) => {
    // 取得header中的authorization
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Bearer取出token
      const token = authHeader.split(' ')[1];
      // 驗證Bearer是否有效
      jwt.verify(token, `${secretKey}`, (err, user) => {
        if (err) {
          return res.status(401).json({ errors: [{ msg: '未正確授權', param: 'token' }] });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ errors: [{ msg: '未正確授權', param: 'token' }] });
    }
  }
];

module.exports = {
  authenticate
};