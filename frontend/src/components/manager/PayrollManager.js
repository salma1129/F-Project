import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SideBarHR from './SideBarHR';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: '10px',
    marginLeft: '220px', // Add margin to the left to prevent overlap with sidebar
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f2f2f2',
    color: '#000000',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    color: '#000000',
  },
  actionBtn: {
    marginRight: '10px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  },
  edit: {
    backgroundColor: '#ffd966',
  },
  delete: {
    backgroundColor: '#f66',
    color: '#fff',
  },
  add: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
};

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
    <div style={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <SideBarHR />

      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.heading}>💰 Payroll Management</h2>

        {/* Form for Adding/Editing Employee */}
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Employee name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Salary"
            value={newSalary}
            onChange={(e) => setNewSalary(e.target.value)}
            style={styles.input}
          />
          <button style={{ ...styles.button, ...styles.add }} onClick={addEmployee}>
            Add
          </button>
        </div>

        {/* Employee List */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee Name</th>
              <th style={styles.th}>Salary ($)</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.salary}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.delete }}
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Payroll */}
        <h3 style={{ marginTop: '20px' }}>Total Monthly Payroll: ${totalPayroll}</h3>
      </div>
    </div>
  );
};

export default PayrollManager;
