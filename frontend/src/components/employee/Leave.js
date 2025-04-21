import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

// Global styles to set the entire page background to #2d3748
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2d3748;
    color: white;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;

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

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h2>Manage Leave Requests</h2>
        <Form onSubmit={handleAddRequest}>
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={newRequest.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Employee Email"
            value={newRequest.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Leave Type"
            value={newRequest.type}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3 days)"
            value={newRequest.duration}
            onChange={handleChange}
            required
          />
          <button type="submit">Request Leave</button>
        </Form>

        <Table>
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
                  <button onClick={() => handleAction(request.id, "approved")} style={{ marginRight: "5px", background: "green", color: "white", border: "none", padding: "5px", cursor: "pointer" }}>Approve</button>
                  <button onClick={() => handleAction(request.id, "rejected")} style={{ background: "red", color: "white", border: "none", padding: "5px", cursor: "pointer" }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </>
  );
};

// Styled Components
const Wrapper = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px white;
  text-align: center;
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    color: black;
  }

  button {
    background-color: royalblue;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: darkblue;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    color: black;
  }

  th {
    background-color: royalblue;
    color: white;
  }
`;

export default Leave;