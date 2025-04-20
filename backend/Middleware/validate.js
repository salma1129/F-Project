const { check, validationResult } = require('express-validator');


const validateLeaveRequest = [
  check('startDate').isISO8601().toDate(),
  check('endDate').isISO8601().toDate(),
  check('type').isIn(['vacation', 'sick', 'personal']),
  check('reason').isLength({ min: 10 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateLeaveRequest };