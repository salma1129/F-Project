import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;
const MainContainer = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 40px 40px 40px 40px;
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1800px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  align-self: center;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;

  th {
    background-color: rgba(0, 0, 0, 0.5);
    color: #3498db;
    font-weight: 600;
    text-align: left;
    padding: 15px;
    font-size: 1.1rem;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
  }

  tr:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const ActionButton = styled.button`
  padding: 8px 20px;
  font-size: 0.9rem;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 100px;
`;

const ApproveButton = styled(ActionButton)`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const RejectButton = styled(ActionButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .user-name {
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
  }

  .user-role {
    color: #e0e0e0;
    font-size: 0.9rem;
  }
`;

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState('Manager Name');

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/api/leave-requests", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch leave requests');
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        setLeaveRequests([]);
      }
    };
    fetchLeaveRequests();

    // Get user data from localStorage if available
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleAction = async (id, action) => {
    const newStatus = action === "approved" ? "Approved" : "Declined";
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/leave-requests/${id}/status`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update leave request status');
      // Update local state
      setLeaveRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
    } catch (error) {
      alert('Failed to update leave request status.');
    }
  };

  return (
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Manager Dashboard</Title>
            <UserInfo>
              <div className="user-name">{userName}</div>
              <div className="user-role">Manager</div>
            </UserInfo>
          </Header>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length === 0 ? (
                <tr><td colSpan="9">No leave requests found.</td></tr>
              ) : (
                leaveRequests.map((request, idx) => (
                  <tr key={request._id}>
                    <td>{idx + 1}</td>
                    <td>{request.name}</td>
                    <td>{request.email}</td>
                    <td>{request.type}</td>
                    <td>{new Date(request.startDate).toLocaleDateString()}</td>
                    <td>{new Date(request.endDate).toLocaleDateString()}</td>
                    <td>{request.reason}</td>
                    <td className={`status ${request.status ? request.status.toLowerCase() : ''}`}>{request.status}</td>
                    <td>
                      {request.status === 'Pending' ? (
                        <>
                          <ApproveButton onClick={() => handleAction(request._id, "approved")}>Approve</ApproveButton>
                          <RejectButton onClick={() => handleAction(request._id, "rejected")}>Reject</RejectButton>
                        </>
                      ) : (
                        <span style={{ fontWeight: 'bold', color: request.status === 'Approved' ? '#28a745' : '#dc3545' }}>{request.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Content>
      </MainContainer>
    </Container>
  );
};

export default Leave;
