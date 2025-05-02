const { check, validationResult } = require('express-validator');

const validateLeaveRequest = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('startDate').isISO8601().toDate().withMessage('Valid start date is required'),
  check('endDate').isISO8601().toDate().withMessage('Valid end date is required'),
  check('type').isIn(['vacation', 'sick', 'personal']).withMessage('Invalid leave type'),
  check('reason').isLength({ min: 10 }).withMessage('Reason must be at least 10 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateLeaveRequest };