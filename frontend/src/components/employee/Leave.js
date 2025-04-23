import React, { useState } from "react";
import "../../styles/Leave.css";

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Roua Ladhari", email: "roua.ladhari@horizon-tech.tn", type: "Sick Leave", duration: "2 days" },
    { id: 2, name: "Salma BenKhamsa", email: "salma.benkhamsa@horizon-tech.tn", type: "Annual Leave", duration: "5 days" },
  ]);

  const [newRequest, setNewRequest] = useState({
    name: "",
    email: "",
    type: "",
    duration: "",
  });

  const handleChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!newRequest.name || !newRequest.email || !newRequest.type || !newRequest.duration) {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = { id: leaveRequests.length + 1, ...newRequest };
    setLeaveRequests([...leaveRequests, newEntry]);
    setNewRequest({ name: "", email: "", type: "", duration: "" });
  };

  const handleAction = (id, action) => {
    alert(`Leave request ${action} for ID: ${id}`);
  };

  return (
    <>
      <h1 className="main-title">Manage Leave Requests</h1>

      <div className="leave-container" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }}>
        <div className="content">
          <div className="form-container">
            <form onSubmit={handleAddRequest}>
              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="name"
                  value={newRequest.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter employee name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Employee Email</label>
                <input
                  type="email"
                  name="email"
                  value={newRequest.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter employee email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Leave Type</label>
                <select
                  name="type"
                  value={newRequest.type}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select leave type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={newRequest.duration}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter duration (e.g., 3 days)"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Submit Request</button>
            </form>
          </div>

          <div className="table-wrapper">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.name}</td>
                    <td>{request.email}</td>
                    <td>{request.type}</td>
                    <td>{request.duration}</td>
                    <td>
                      <button
                        onClick={() => handleAction(request.id, "approved")}
                        className="status-badge status-approved"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(request.id, "rejected")}
                        className="status-badge status-rejected"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leave;
