import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/PayrollManager.css';

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
    <div className="payroll-content">
      <div className="payroll-header">
        <h1>Payroll Manager</h1>
      </div>

      <div className="payroll-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Employee name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-input"
              placeholder="Salary"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
            />
          </div>
        </div>
        <button className="submit-btn" onClick={addEmployee}>
          Add Employee
        </button>
      </div>

      <table>
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
                <button
                  className="action-btn"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="stat-card">
        <h3>Total Monthly Payroll</h3>
        <p className="stat-value">${totalPayroll}</p>
      </div>
    </div>
  );
};

export default PayrollManager;