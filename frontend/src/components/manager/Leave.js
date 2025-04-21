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

  // Handle input changes
  const handleChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  // Add Leave Request
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

  // Handle approve/reject actions
  const handleAction = (id, action) => {
    alert(`Leave request ${action} for ID: ${id}`);
  };

  const titleStyle = {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '40px 0',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0,
    width: '100%'
  };

  return (
    <>
      <h1 className="main-title">Manage Leave Requests</h1>

      <div className="leave-container">
        <div className="content">
          <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleAddRequest}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Employee Name</label>
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
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Employee Email</label>
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
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Leave Type</label>
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
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Duration</label>
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
              <button type="submit" className="submit-button" style={{ marginTop: '10px' }}>Submit Request</button>
            </form>
          </div>

          <div style={{ marginTop: '30px', maxWidth: '800px', margin: '30px auto 0' }}>
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
                        style={{ padding: '4px 8px', margin: '0 2px' }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(request.id, "rejected")}
                        className="status-badge status-rejected"
                        style={{ padding: '4px 8px', margin: '0 2px' }}
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