import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  position: relative;

  &::before {
    content: '';
    position: absolute;
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
  margin-left: 90px;
  margin-right: 90px;
  padding: 40px;
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1200px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
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

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Roua Ladhari", email: "roua.ladhari@horizon-tech.tn", type: "Sick Leave", duration: "2 days" },
    { id: 2, name: "Salma BenKhamsa", email: "salma.benkhamsa@horizon-tech.tn", type: "Annual Leave", duration: "5 days" },
  ]);

  const handleAction = (id, action) => {
    alert(`Leave request ${action} for ID: ${id}`);
  };

  return (
    <Container>
      <MainContainer>
        <Content>
          <Title>Leave Requests Management</Title>
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
                    <ApproveButton onClick={() => handleAction(request.id, "approved")}>Approve</ApproveButton>
                    <RejectButton onClick={() => handleAction(request.id, "rejected")}>Reject</RejectButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </MainContainer>
    </Container>
  );
};

export default Leave;
