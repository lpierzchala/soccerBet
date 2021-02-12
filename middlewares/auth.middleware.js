const jwt = require('jsonwebtoken');

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization }
  } = req;
  if (authorization) return authorization.split('Bearer ').join('');
  return null;
};

const auth = (req, res, next) => {
  try {
    const decoded = jwt.verify(getTokenFromHeaders(req), 'secret');
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = auth;
