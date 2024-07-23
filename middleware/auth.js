const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  // 取得header中的authorization
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer取出token
    const token = authHeader.split(' ')[1];
    // 驗證Bearer是否有效
    jwt.verify(token, `${secretKey}`, (err, user) => {
      if (err) {
        return res.status(403).json({ errors: [{ msg: '未正確授權', param: 'token' }] });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json({ errors: [{ msg: '未正確授權', param: 'token' }] });
  }
};

module.exports = {
  authenticateJWT
};