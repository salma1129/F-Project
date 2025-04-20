
const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied: Insufficient privileges' });
      }
      next();
    };
  };
  
  module.exports = roleCheck;