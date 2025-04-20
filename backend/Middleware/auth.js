// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('x-auth-token');
    
    // 2. Verify token exists
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach user to request object
    req.user = decoded;
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;