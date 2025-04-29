import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import '../../styles/PayrollManager.css';

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

const PayrollContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PayrollForm = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: #2980b9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    background: rgba(0, 0, 0, 0.7);
    color: #3498db;
    font-weight: 600;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  text-align: center;

  h3 {
    color: #3498db;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 2rem;
    color: white;
    font-weight: bold;
  }
`;

const PayrollManager = () => {
  const [employees, setEmployees] = useState([
    { id: '1', name: 'Alice Smith', salary: 3000 },
    { id: '2', name: 'Bob Johnson', salary: 2500 },
  ]);

  const [newName, setNewName] = useState('');
  const [newSalary, setNewSalary] = useState('');

  const addEmployee = () => {
    if (newName.trim() === '' || newSalary.trim() === '') return;
    setEmployees((prev) => [
      ...prev,
      { id: uuidv4(), name: newName, salary: parseFloat(newSalary) },
    ]);
    setNewName('');
    setNewSalary('');
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const totalPayroll = employees.reduce((acc, emp) => acc + emp.salary, 0);

  return (
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Payroll Management</Title>
            <UserInfo>
              <div className="user-name">Manager Name</div>
              <div className="user-role">Manager</div>
            </UserInfo>
          </Header>
          <PayrollContent>
            <PayrollForm>
              <FormRow>
                <FormGroup>
                  <FormInput
                    type="text"
                    placeholder="Employee name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type="number"
                    placeholder="Salary"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                  />
                </FormGroup>
              </FormRow>
              <SubmitButton onClick={addEmployee}>
                Add Employee
              </SubmitButton>
            </PayrollForm>

            <Table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Salary ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <ActionButton onClick={() => deleteEmployee(emp.id)}>
                        Delete
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <StatCard>
              <h3>Total Monthly Payroll</h3>
              <p className="stat-value">${totalPayroll}</p>
            </StatCard>
          </PayrollContent>
        </Content>
      </MainContainer>
    </Container>
  );
};

export default PayrollManager;
