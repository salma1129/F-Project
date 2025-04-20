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

const Manage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Roua Ladhari", email: "roua.ladhari@horizon-tech.tn", position: "Manager" },
    { id: 2, name: "Salma BenKhamsa", email: "salma.benkhamsa@horizon-tech.tn", position: "Developer" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // Add Employee
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

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h2>Manage Employees</h2>
        <Form onSubmit={handleAddEmployee}>
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={newEmployee.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Employee Email"
            value={newEmployee.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newEmployee.position}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Employee</button>
        </Form>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
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
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
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

export default Manage;