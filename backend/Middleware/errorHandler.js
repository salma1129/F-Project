// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        msg: 'Validation Error',
        errors: Object.values(err.errors).map(val => val.message)
      });
    }
  
    // JWT error
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  
    // Default server error
    res.status(500).json({ msg: 'Server Error' });
  };
  
  module.exports = errorHandler;