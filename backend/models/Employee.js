const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String }
  },
  joinDate: { type: Date, default: Date.now },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

module.exports = mongoose.model('Employee', EmployeeSchema);