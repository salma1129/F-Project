import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value
      });
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      
      // Immediately update the UI with the new user
      setUsers(prevUsers => [...prevUsers, data]);
      
      // Reset the form
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'employee'
      });
      
      alert('User created successfully!');
    } catch (err) {
      console.error('Error creating user:', err);
      alert(`Error: ${err.message}`);
    }
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const token = localStorage.getItem('token');
      const updateBody = {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role
      };
      if (editingUser.password && editingUser.password.length >= 6) {
        updateBody.password = editingUser.password;
      }
      const response = await fetch(`http://localhost:5001/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateBody)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();

      setUsers(prevUsers =>
        prevUsers.map(user => user._id === editingUser._id ? { ...user, ...updatedUser } : user)
      );

      setEditingUser(null);
      alert('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      alert(`Error: ${err.message}`);
    }
  };
  

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page-container">
      <div className="admin-navbar">
        <div className="admin-navbar-brand">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="admin-navbar-menu">
          <button className="admin-nav-item" onClick={() => navigate('/')}>Home</button>
          <button className="admin-nav-item" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </div>

      <div className="home-container full-page">
        <div className="home-content" style={{ paddingTop: "800px" }}>
          <div className="admin-section" style={{ marginTop: '440px' }}>
            <h2>User Management</h2>
            
            <div className="search-box">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {loading ? (
              <div className="loading">Loading users...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="user-table-container">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user._id}>
                        <td>
                          {editingUser && editingUser._id === user._id ? (
                            <input
                              type="text"
                              name="name"
                              value={editingUser.name}
                              onChange={handleInputChange}
                              required
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                        <td>
                          {editingUser && editingUser._id === user._id ? (
                            <input
                              type="email"
                              name="email"
                              value={editingUser.email}
                              onChange={handleInputChange}
                              required
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td>
                          {editingUser && editingUser._id === user._id ? (
                            <select
                              name="role"
                              value={editingUser.role}
                              onChange={handleInputChange}
                              className="role-select"
                            >
                              <option value="admin">Admin</option>
                              <option value="hr">HR</option>
                              <option value="manager">Manager</option>
                              <option value="employee">Employee</option>
                              <option value="candidate">Candidate</option>
                            </select>
                          ) : (
                            <span className={`role-badge ${user.role}`}>{user.role}</span>
                          )}
                        </td>
                        <td className="action-buttons">
                          {editingUser && editingUser._id === user._id ? (
                            <>
                              <input
                                type="password"
                                name="password"
                                value={editingUser.password || ''}
                                onChange={handleInputChange}
                                placeholder="New password "
                                minLength={6}
                                style={{ marginRight: 8 }}
                              />
                              <button className="btn-save" onClick={handleUpdateUser}>
                                <i className="fas fa-check"></i> Save
                              </button>
                              <button className="btn-cancel" onClick={() => setEditingUser(null)}>
                                <i className="fas fa-times"></i> Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="btn-edit" onClick={() => setEditingUser(user)}>
                                <i className="fas fa-edit"></i> Edit
                              </button>
                              <button className="btn-delete" onClick={() => handleDeleteUser(user._id)}>
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="user-form-container">
              <h3>Create New User</h3>
              <form onSubmit={handleCreateUser} className="user-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    required
                    className="role-select-form"
                  >
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                    <option value="candidate">Candidate</option>
                  </select>
                </div>

                <button type="submit" className="btn-submit">
                  <i className="fas fa-user-plus"></i> Create User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 