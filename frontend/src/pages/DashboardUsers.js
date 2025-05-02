import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardUsers.css";
import LeaveRequests from "../components/LeaveRequests";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("users");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/users", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser
      ? `http://localhost:5001/api/users/${editingUser._id}`
      : "http://localhost:5001/api/users/create";

    const userData = editingUser
      ? { name: form.name, email: form.email }
      : { name: form.name, email: form.email, password: form.password };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process request');
      }

      fetchUsers();
      setForm({ name: "", email: "", password: "" });
      setEditingUser(null);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to create/update user. Please try again.");
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/users/${id}`, { 
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const editUser = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <>
            <div className="card">
              <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
              <form className="user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {!editingUser && (
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <button type="submit" className="submit-btn">
                  {editingUser ? "Update" : "Create"} User
                </button>
              </form>
            </div>

            <div className="card">
              <h2>Users List</h2>
              {loading ? (
                <div className="loading">Loading users...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <div className="table-responsive">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <div className="actions">
                                <button 
                                  className="edit-btn" 
                                  onClick={() => editUser(user)}
                                  title="Edit User"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="delete-btn" 
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this user?')) {
                                      deleteUser(user._id);
                                    }
                                  }}
                                  title="Delete User"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="no-users">No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        );
      case "leave":
        return <LeaveRequests />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Recruiter Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li 
            className={activeSection === "users" ? "active" : ""}
            onClick={() => setActiveSection("users")}
          >
            <i className="fas fa-users"></i>
            <span>Users</span>
          </li>
          <li 
            className={activeSection === "leave" ? "active" : ""}
            onClick={() => setActiveSection("leave")}
          >
            <i className="fas fa-calendar-alt"></i>
            <span>Leave Requests</span>
          </li>
          <li>
            <i className="fas fa-file-alt"></i>
            <span>Applications</span>
          </li>
          <li onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-area">
          <div className="page-header">
            <h1>Dashboard</h1>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers; 