import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

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

const Sidebar = styled.div`
  width: 280px;
  background-color: #1a2b4b;
  height: 100vh;
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
`;

const SidebarHeader = styled.div`
  padding: 0 20px;
  margin-bottom: 40px;
  text-align: center;

  h2 {
    margin: 0;
    padding: 20px 0;
    color: #3498db;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 15px 25px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.1rem;

    &:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }

    &.active {
      background-color: #2c5282;
      color: #3498db;
    }

    span {
      font-weight: 400;
    }
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
  justify-content: center; /* Changed to center */
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
  margin-left: 0; /* you can set this to 20px or so for fine alignment */
`;



const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
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
  const [activeSection, setActiveSection] = useState("manage");
  const [employees, setEmployees] = useState([
    { id: 1, name: "Roua Ladhari", email: "roua.ladhari@horizon-tech.tn", position: "Manager" },
    { id: 2, name: "Salma BenKhamsa", email: "salma.benkhamsa@horizon-tech.tn", position: "Developer" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  const sidebarSections = [
    { id: "dashboard", title: "Dashboard", icon: "📊", path: "/ManagerDashboard" },
    { id: "leave", title: "Leave Management", icon: "📅", path: "/Leave" },
    { id: "recruitment", title: "Recruitment", icon: "👥", path: "/ManageRecruiters" },
    { id: "payroll", title: "Payroll", icon: "💰", path: "/PayrollManager" },
    { id: "attendance", title: "Attendance", icon: "⏰", path: "/AttendanceTracker" },
    { id: "manage", title: "Manage Employees", icon: "👥", path: "/Manage" },
  ];

  const handleSectionClick = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    if (editingEmployee) {
      setEditingEmployee({ ...editingEmployee, [e.target.name]: e.target.value });
    } else {
      setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position) {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = { id: employees.length + 1, ...newEmployee };
    setEmployees([...employees, newEntry]);
    setNewEmployee({ name: "", email: "", position: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingEmployee.name || !editingEmployee.email || !editingEmployee.position) {
      alert("Please fill in all fields.");
      return;
    }
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    setEditingEmployee(null);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <h2>Manager Portal</h2>
        </SidebarHeader>
        <Nav>
          <ul>
            {sidebarSections.map((section) => (
              <li
                key={section.id}
                className={section.id === 'manage' ? 'active' : ''}
                onClick={() => handleSectionClick(section.path)}
              >
                <span>{section.icon}</span>
                {section.title}
              </li>
            ))}
          </ul>
        </Nav>
      </Sidebar>

      <MainContainer>
        <Content>
          <Title>{editingEmployee ? 'Edit Employee' : 'Manage Employees'}</Title>
          
          <FormContainer>
            <form onSubmit={editingEmployee ? handleUpdate : handleAddEmployee}>
              <FormGroup>
                <label>Employee Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={editingEmployee ? editingEmployee.name : newEmployee.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Employee Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter employee email"
                  value={editingEmployee ? editingEmployee.email : newEmployee.email}
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>
                    <EditButton
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </EditButton>
                    <DeleteButton
                      onClick={() => handleDelete(employee.id)}
                    >
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

export default Manage;