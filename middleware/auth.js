const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  // 取得header中的authorization
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer取出token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, `${secretKey}`, (err, user) => {
      if (err) {
          // return res.sendStatus(403);
          return res.status(403).json({ errors: [{ msg: '未授權', param: 'token', location: 'header' }] });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;