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
    borderRadius: '10px'
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
  }
};

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
    <div style={{ display: 'flex' }}>
      <SideBarHR />

      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Attendance Tracker</h2>

        <div style={styles.form}>
          <input
            type="text"
            placeholder="Enter employee name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
          />
          <button style={{ ...styles.button, ...styles.add }} onClick={addEntry}>
            Add Employee
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee Name</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((person) => (
              <tr key={person.id}>
                <td style={styles.td}>{person.name}</td>
                <td style={styles.td}>{person.status}</td>
                <td style={styles.td}>
                  <button
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: person.status === 'Present' ? '#f66' : '#4CAF50',
                      color: '#fff'
                    }}
                    onClick={() => toggleStatus(person.id)}
                  >
                    Mark {person.status === 'Present' ? 'Absent' : 'Present'}
                  </button>
                  <button
                    style={{ ...styles.actionBtn, ...styles.delete }}
                    onClick={() => deleteEntry(person.id)}
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

export default AttendanceTracker;
