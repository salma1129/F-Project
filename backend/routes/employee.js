const router = require('express').Router();
const Employee = require('../models/Employee');
const auth = require('../Middleware/auth');
const roleCheck = require('../Middleware/roleCheck');

// Get all employees (HR/Manager only)
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employee by ID (HR/Manager only)
router.get('/:id', auth, roleCheck(['hr', 'manager']), async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new employee (HR/Manager only)
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update employee (HR/Manager only)
router.put('/:id', auth, roleCheck(['hr', 'manager']), async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete employee (HR/Manager only)
router.delete('/:id', auth, roleCheck(['hr', 'manager']), async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current employee profile
router.get('/me', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update current employee profile
router.put('/me/update', auth, async (req, res) => {
  try {
    // Don't allow changing sensitive fields like role, salary, etc.
    const allowedUpdates = ['name', 'email', 'phone', 'address', 'emergencyContact'];
    const updateData = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = req.body[key];
      }
    });
    
    const employee = await Employee.findByIdAndUpdate(
      req.user.employeeId,
      updateData,
      { new: true }
    );
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }
    
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;