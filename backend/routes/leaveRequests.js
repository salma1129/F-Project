const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const authMiddleware = require("../routes/authRoutes"); // Optional, if you use auth

// GET all leave requests
router.get("/", authMiddleware, async (req, res) => {
  try {
    const requests = await LeaveRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE status of a leave request
router.put("/:id/status", authMiddleware, async (req, res) => {
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

module.exports = router;
