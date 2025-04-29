const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../Middleware/auth");
const roleCheck = require("../Middleware/roleCheck");

// Get All Users (READ) - Admin access only
router.get("/", auth, roleCheck(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

// Get User by ID - Admin access only
router.get("/:id", auth, roleCheck(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error while fetching user" });
  }
});

// Create New User (CREATE) - Admin access only
router.post("/", auth, roleCheck(['admin']), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    const validRoles = ['admin', 'manager', 'employee', 'candidate'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role
    });
    
    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error while creating user" });
  }
});

// Update User (UPDATE) - Admin access only
router.put("/:id", auth, roleCheck(['admin']), async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    
    // Validate input
    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email, and role are required" });
    }

    // Check if trying to update the last admin
    if (role !== 'admin') {
      const currentUser = await User.findById(req.params.id);
      if (currentUser && currentUser.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          return res.status(400).json({ message: "Cannot change role of the last admin" });
        }
      }
    }

    // Prepare update data
    const updateData = { name, email, role };
    
    // If password is provided, hash it and add to update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error while updating user" });
  }
});

// Update User Password - Admin access only
router.put("/:id/password", auth, roleCheck(['admin']), async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error while updating password" });
  }
});

// Delete User (DELETE) - Admin access only
router.delete("/:id", auth, roleCheck(['admin']), async (req, res) => {
  try {
    // Check if trying to delete the last admin
    const userToDelete = await User.findById(req.params.id);
    
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (userToDelete.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: "Cannot delete the last admin" });
      }
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error while deleting user" });
  }
});

// Get current user profile (any authenticated user)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

// Update current user profile (any authenticated user)
router.put("/me/update", auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    
    // Don't allow changing role via this endpoint
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select('-password');
    
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
});

// Create route for employee management for managers
router.get("/employees", auth, roleCheck(['admin', 'manager']), async (req, res) => {
  try {
    // Managers can only see employees and candidates, not admins or other managers
    const employees = await User.find({ 
      role: { $in: ['employee', 'candidate'] } 
    }).select('-password');
    
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Server error while fetching employees" });
  }
});

// Get specific employee - Manager access
router.get("/employees/:id", auth, roleCheck(['admin', 'manager']), async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    // Managers should only be able to access employee/candidate data
    if (!['employee', 'candidate'].includes(employee.role)) {
      return res.status(403).json({ message: "Access denied to this user type" });
    }
    
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ message: "Server error while fetching employee" });
  }
});

// Create/update employee - Manager access
router.post("/employees", auth, roleCheck(['admin', 'manager']), async (req, res) => {
  try {
    const { name, email, password, department, position } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    
    // Check if user exists
    let employee = await User.findOne({ email });
    if (employee) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    
    // Create new employee - always with employee role
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    employee = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: 'employee',
      department,
      position
    });
    
    await employee.save();
    
    // Return user without password
    const employeeResponse = employee.toObject();
    delete employeeResponse.password;
    
    res.status(201).json(employeeResponse);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ message: "Server error while creating employee" });
  }
});

// Update employee - Manager access
router.put("/employees/:id", auth, roleCheck(['admin', 'manager']), async (req, res) => {
  try {
    const { name, email, department, position } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    
    // Verify this is an employee account
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    // Managers should only be able to update employee/candidate data
    if (!['employee', 'candidate'].includes(employee.role)) {
      return res.status(403).json({ message: "Access denied to modify this user type" });
    }
    
    const updatedEmployee = await User.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        email, 
        role: 'employee', 
        department: department || employee.department,
        position: position || employee.position
      },
      { new: true }
    ).select('-password');
    
    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: "Server error while updating employee" });
  }
});

// Delete employee - Manager access
router.delete("/employees/:id", auth, roleCheck(['admin', 'manager']), async (req, res) => {
  try {
    // Verify this is an employee account
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    // Managers should only be able to delete employee/candidate data
    if (!['employee', 'candidate'].includes(employee.role)) {
      return res.status(403).json({ message: "Access denied to delete this user type" });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: "Server error while deleting employee" });
  }
});

module.exports = router;


