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
    marginLeft: '220px', // Adjusting for sidebar
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
    borderCollapse: 'collapse',
    marginTop: '20px'
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

const ControlAccess = () => {
  const [users, setUsers] = useState([
    { id: uuidv4(), name: 'Alice Smith', role: 'Admin' },
    { id: uuidv4(), name: 'Bob Johnson', role: 'Manager' }
  ]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Employee');

  const addUser = () => {
    if (newName.trim() === '') return;
    setUsers([...users, { id: uuidv4(), name: newName, role: newRole }]);
    setNewName('');
    setNewRole('Employee');
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUserRole = (id, role) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <SideBarHR />

      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.heading}>🔒 Control Access</h2>

        <div style={styles.form}>
          <input
            type="text"
            placeholder="User Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={styles.input}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          <button style={{ ...styles.button, ...styles.add }} onClick={addUser}>Add User</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User Name</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>
                  <select
                    value={user.role}
                    onChange={(e) => editUserRole(user.id, e.target.value)}
                    style={styles.input}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.delete }}
                    onClick={() => deleteUser(user.id)}
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

export default ControlAccess;
