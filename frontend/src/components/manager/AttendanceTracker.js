import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/AttendanceTracker.css';

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
    <div className="attendance-container">
      <div className="container-overlay"></div>
      <div className="content">
        <h2 className="heading">Attendance Tracker</h2>

        <div className="form">
          <input
            type="text"
            placeholder="Enter employee name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="input"
          />
          <button 
            className="button add-button"
            onClick={addEntry}
          >
            Add Employee
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="th">Employee Name</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((person) => (
              <tr key={person.id}>
                <td className="td">{person.name}</td>
                <td className="td">{person.status}</td>
                <td className="td">
                  <button
                    className={`action-btn ${person.status === 'Present' ? 'absent-btn' : 'present-btn'}`}
                    onClick={() => toggleStatus(person.id)}
                  >
                    Mark {person.status === 'Present' ? 'Absent' : 'Present'}
                  </button>
                  <button
                    className="action-btn delete-btn"
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
