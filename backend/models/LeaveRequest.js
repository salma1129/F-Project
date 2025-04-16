const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Declined"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
