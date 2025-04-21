import React, { useState } from 'react';
import '../styles/ControlAccess.css';

const ControlAccess = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane Smith', role: 'user' },
    { id: 3, name: 'Bob Johnson', role: 'manager' }
  ]);
  const [newUser, setNewUser] = useState({ name: '', role: 'user' });

  const handleAddUser = () => {
    if (newUser.name.trim() === '') return;
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', role: 'user' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="control-access-container">
      <div className="content">
        <h1 className="heading">User Management</h1>
        <div className="form">
          <input
            type="text"
            className="input"
            placeholder="Enter user name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
          <button className="button add-button" onClick={handleAddUser}>
            Add User
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Role</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="td">{user.name}</td>
                <td className="td">{user.role}</td>
                <td className="td">
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
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
