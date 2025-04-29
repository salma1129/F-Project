import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from '../../config/axios';


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

const FormContainer = styled.div`
  margin-bottom: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: white;
    font-size: 1.1rem;
  }

  input {
    width: 100%;
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
`;

const SubmitButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
  flex: 1;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background-color: #95a5a6;
  color: white;

  &:hover {
    background-color: #7f8c8d;
  }
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

const ActionButton = styled(Button)`
  padding: 8px 16px;
  font-size: 0.9rem;
  margin: 0 5px;
`;

const EditButton = styled(ActionButton)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

const Manage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    department: "",
    position: "",
    contact: {
      email: "",
      phone: ""
    }
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  // Add debug logging

useEffect(() => {
  console.log('Current auth state:', {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('userRole'),
    userId: localStorage.getItem('userId')
  });
  fetchEmployees();
}, []);

  const fetchEmployees = async () => {
    try {
      console.log('Fetching employees with token:', localStorage.getItem('token'));
      const token = localStorage.getItem("token"); // or from your auth context

      const response = await axios.get('/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Employees data:', response.data);
      setEmployees(response.data);
    } catch (err) {
      console.error('Full error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers
      });
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingEmployee) {
      if (name.startsWith('contact.')) {
        const contactField = name.split('.')[1];
        setEditingEmployee({
          ...editingEmployee,
          contact: {
            ...editingEmployee.contact,
            [contactField]: value
          }
        });
      } else {
        setEditingEmployee({ ...editingEmployee, [name]: value });
      }
    } else {
      if (name.startsWith('contact.')) {
        const contactField = name.split('.')[1];
        setNewEmployee({
          ...newEmployee,
          contact: {
            ...newEmployee.contact,
            [contactField]: value
          }
        });
      } else {
        setNewEmployee({ ...newEmployee, [name]: value });
      }
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.department || 
        !newEmployee.position || !newEmployee.contact.email) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post('/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({
        firstName: "",
        lastName: "",
        department: "",
        position: "",
        contact: {
          email: "",
          phone: ""
        }
      });
      alert('Employee added successfully');
    } catch (err) {
      console.error('Error adding employee:', err);
      alert('Failed to add employee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`/api/employees/${id}`);
        setEmployees(employees.filter(emp => emp._id !== id));
        alert('Employee deleted successfully');
      } catch (err) {
        console.error('Error deleting employee:', err);
        alert('Failed to delete employee');
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingEmployee.firstName || !editingEmployee.lastName || !editingEmployee.department || 
        !editingEmployee.position || !editingEmployee.contact.email) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.put(`/api/employees/${editingEmployee._id}`, editingEmployee);
      setEmployees(employees.map(emp => 
        emp._id === editingEmployee._id ? response.data : emp
      ));
      setEditingEmployee(null);
      alert('Employee updated successfully');
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Failed to update employee');
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Manage Employees</Title>
            <UserInfo>
              <div className="user-name">Manager Name</div>
              <div className="user-role">Manager</div>
            </UserInfo>
          </Header>
          
          <FormContainer>
            <form onSubmit={editingEmployee ? handleUpdate : handleAddEmployee}>
              <FormGroup>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={editingEmployee ? editingEmployee.firstName : newEmployee.firstName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={editingEmployee ? editingEmployee.lastName : newEmployee.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={editingEmployee ? editingEmployee.department : newEmployee.department}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  placeholder="Enter position"
                  value={editingEmployee ? editingEmployee.position : newEmployee.position}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="email"
                  name="contact.email"
                  placeholder="Enter email"
                  value={editingEmployee ? editingEmployee.contact.email : newEmployee.contact.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Phone</label>
                <input
                  type="tel"
                  name="contact.phone"
                  placeholder="Enter phone number"
                  value={editingEmployee ? editingEmployee.contact.phone : newEmployee.contact.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              <ButtonGroup>
                {editingEmployee ? (
                  <>
                    <SubmitButton type="submit">Update Employee</SubmitButton>
                    <CancelButton type="button" onClick={handleCancelEdit}>Cancel</CancelButton>
                  </>
                ) : (
                  <SubmitButton type="submit">Add Employee</SubmitButton>
                )}
              </ButtonGroup>
            </form>
          </FormContainer>

          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td>{`${employee.firstName} ${employee.lastName}`}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.contact.email}</td>
                  <td>{employee.contact.phone}</td>
                  <td>{employee.status}</td>
                  <td>
                    <EditButton onClick={() => handleEdit(employee)}>
                      Edit
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(employee._id)}>
                      Delete
                    </DeleteButton>
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

export default Manage;