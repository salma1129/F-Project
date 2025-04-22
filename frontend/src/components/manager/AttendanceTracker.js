import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/ManagerDashboard.css';

const AttendanceTracker = () => {
  const navigate = useNavigate();
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
    <div className="manager-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Manager Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/ManagerDashboard')}>
              <span style={{ marginRight: '10px' }}>📊</span>
              Dashboard
            </li>
            <li onClick={() => navigate('/Leave')}>
              <span style={{ marginRight: '10px' }}>📅</span>
              Leave Management
            </li>
            <li onClick={() => navigate('/ManageRecruiters')}>
              <span style={{ marginRight: '10px' }}>👥</span>
              Recruitment
            </li>
            <li onClick={() => navigate('/PayrollManager')}>
              <span style={{ marginRight: '10px' }}>💰</span>
              Payroll
            </li>
            <li className="active">
              <span style={{ marginRight: '10px' }}>⏰</span>
              Attendance
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
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
                {attendance.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td className={`status ${person.status.toLowerCase()}`}>{person.status}</td>
                    <td>
                      <button
                        className={`action-btn ${person.status === 'Present' ? 'reject' : 'approve'}`}
                        onClick={() => toggleStatus(person.id)}
                      >
                        Mark {person.status === 'Present' ? 'Absent' : 'Present'}
                      </button>
                      <button
                        className="action-btn reject"
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
      </div>
    </div>
  );
};

export default AttendanceTracker;
