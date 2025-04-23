import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/ManagerDashboard.css';

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
    <div className="section-content">
      <div className="dashboard-header">
        <h1>Attendance Tracker</h1>
        <div className="user-info">
          <span className="user-name">Manager Name</span>
          <span className="user-role">Manager</span>
        </div>
      </div>

      <div className="attendance-form">
        <input
          type="text"
          placeholder="Enter employee name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input"
        />
        <button 
          className="action-btn approve"
          onClick={addEntry}
        >
          Add Employee
        </button>
      </div>

      <div className="attendance-table">
        <table>
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
                  <button
                    className="action-btn"
                    onClick={() => toggleStatus(entry.id)}
                  >
                    Toggle Status
                  </button>
                  <button
                    className="action-btn reject"
                    onClick={() => deleteEntry(entry.id)}
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
