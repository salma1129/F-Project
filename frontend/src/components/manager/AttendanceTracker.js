import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

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
  padding: 25px;
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
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

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
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

const Form = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;

  input {
    flex: 1;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    color: white;
    font-size: 1rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  button {
    padding: 12px 24px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;

  th {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-weight: 600;
    text-align: left;
    padding: 15px;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
  }

  .status.present {
    background-color: rgba(167, 243, 208, 0.2);
    color: #a7f3d0;
    border: 1px solid rgba(167, 243, 208, 0.4);
  }

  .status.absent {
    background-color: rgba(252, 165, 165, 0.2);
    color: #fca5a5;
    border: 1px solid rgba(252, 165, 165, 0.4);
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0 5px;
    color: white;
    transition: all 0.3s;
  }

  button:first-child {
    background-color: #3498db;
    &:hover {
      background-color: #2980b9;
    }
  }

  button.reject {
    background-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
    }
  }
`;

const AttendanceTracker = () => {
  const [attendance, setAttendance] = useState([
    { id: '1', name: 'Alice Smith', status: 'Present' },
    { id: '2', name: 'Bob Johnson', status: 'Absent' },
  ]);
  const [newName, setNewName] = useState('');

  const toggleStatus = (id) => {
    setAttendance((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, status: entry.status === 'Present' ? 'Absent' : 'Present' }
          : entry
      )
    );
  };

  const deleteEntry = (id) => {
    setAttendance((prev) => prev.filter((entry) => entry.id !== id));
  };

  const addEntry = () => {
    if (newName.trim() === '') return;
    setAttendance((prev) => [...prev, { id: uuidv4(), name: newName, status: 'Absent' }]);
    setNewName('');
  };

  return (
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Attendance Tracker</Title>
            <UserInfo>
              <span className="user-name">Manager Name</span>
              <span className="user-role">Manager</span>
            </UserInfo>
          </Header>

          <Form>
            <input
              type="text"
              placeholder="Enter employee name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addEntry();
                }
              }}
            />
            <button onClick={addEntry}>
              Add Employee
            </button>
          </Form>

          <Table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>
                    <span className={`status ${entry.status.toLowerCase()}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toggleStatus(entry.id)}>
                      Toggle Status
                    </button>
                    <button className="reject" onClick={() => deleteEntry(entry.id)}>
                      Delete
                    </button>
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

export default AttendanceTracker;
