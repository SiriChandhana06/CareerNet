const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded;  // attach decoded user data to request
    next();
  } catch (err) {
    res.status(401).send({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
