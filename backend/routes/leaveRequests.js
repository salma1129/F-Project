const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const auth = require("../Middleware/auth"); // Fixed casing for Middleware folder

// GET all leave requests
router.get("/", auth, async (req, res) => {
  try {
    const requests = await LeaveRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new leave request
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, startDate, endDate, reason } = req.body;
    
    const newLeaveRequest = new LeaveRequest({
      name,
      email,
      startDate,
      endDate,
      reason,
      status: "pending",
      userId: req.user.id // from auth middleware
    });

    const savedRequest = await newLeaveRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE status of a leave request
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET leave request by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a leave request
router.delete("/:id", auth, async (req, res) => {
  try {
    const request = await LeaveRequest.findByIdAndDelete(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
