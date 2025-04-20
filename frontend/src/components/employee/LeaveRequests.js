import React, { useState, useEffect } from "react";
import "../styles/LeaveRequests.css";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/leave-requests", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leave requests');
      }

      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setError("Failed to load leave requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/leave-requests/${id}/status`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update leave request status');
      }

      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave request status:", error);
      alert("Failed to update leave request status. Please try again.");
    }
  };

  return (
    <div className="leave-requests-container">
      <h2>Manage Leave Requests</h2>
      {loading ? (
        <div className="loading">Loading leave requests...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="leave-requests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.name}</td>
                    <td>{new Date(request.startDate).toLocaleDateString()}</td>
                    <td>{new Date(request.endDate).toLocaleDateString()}</td>
                    <td>{request.reason}</td>
                    <td>
                      <span className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusChange(request._id, 'Approved')}
                          disabled={request.status === 'Approved'}
                        >
                          <i className="fas fa-check"></i>
                          Approve
                        </button>
                        <button
                          className="decline-btn"
                          onClick={() => handleStatusChange(request._id, 'Declined')}
                          disabled={request.status === 'Declined'}
                        >
                          <i className="fas fa-times"></i>
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-requests">No leave requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
