import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SideBarHR from "./SideBarHR";

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: '10px',
    marginLeft: '220px', // Adjust to prevent overlap with sidebar
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: '1',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#f2f2f2',
    color: '#000000',
    padding: '10px',
    textAlign: 'left'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    color: '#000000'
  },
  actionBtn: {
    marginRight: '10px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none'
  },
  edit: {
    backgroundColor: '#ffd966'
  },
  delete: {
    backgroundColor: '#f66',
    color: '#fff'
  },
  add: {
    backgroundColor: '#4CAF50',
    color: '#fff'
  },
  listItem: {
    marginBottom: '10px'
  }
};

const PerformanceTracker = () => {
  const [records, setRecords] = useState([
    { id: uuidv4(), name: 'Alice Smith', rating: 4.5 },
    { id: uuidv4(), name: 'Bob Johnson', rating: 3.8 }
  ]);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState('');

  const addRecord = () => {
    if (newName.trim() === '' || newRating.trim() === '') return;
    setRecords([...records, { id: uuidv4(), name: newName, rating: parseFloat(newRating) }]);
    setNewName('');
    setNewRating('');
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <SideBarHR />
      
      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.heading}>📊 Performance Tracker</h2>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Employee Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Performance Rating (1-5)"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
            step="0.1"
            min="1"
            max="5"
            style={styles.input}
          />
          <button style={{ ...styles.button, ...styles.add }} onClick={addRecord}>Add</button>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee Name</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td style={styles.td}>{record.name}</td>
                <td style={styles.td}>{record.rating}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.delete }}
                    onClick={() => deleteRecord(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReportsPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 HR Reports</h2>
      <ul>
        <li style={styles.listItem}>Employee Attendance Summary</li>
        <li style={styles.listItem}>Monthly Payroll Overview</li>
        <li style={styles.listItem}>Department Performance Trends</li>
        <li style={styles.listItem}>Hiring & Turnover Rates</li>
        <li style={styles.listItem}>Leave Requests Summary</li>
      </ul>
    </div>
  );
};

export default PerformanceTracker;
export { ReportsPage };
