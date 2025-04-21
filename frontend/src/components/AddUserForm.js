import React, { useState } from "react";
import "../styles/AddUserForm.css";

const AddUserForm = ({ onUserAdd }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Employee",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("New User:", user);
      onUserAdd(user);
      setUser({ name: "", email: "", role: "Employee", status: "Active" });
      setErrors({});
    }
  };

  return (
    <div className="add-user-page">
      <div className="form-container">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: '#000' }}>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter name"
              style={{ color: '#fff' }}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label style={{ color: '#000' }}>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter email"
              style={{ color: '#fff' }}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label style={{ color: '#000' }}>Role</label>
            <select name="role" value={user.role} onChange={handleChange} className="form-input">
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ color: '#000' }}>Status</label>
            <div className="status-container">
              <div className={`status-indicator ${user.status === "Active" ? "active" : "inactive"}`}>
                {user.status}
              </div>
              <select name="status" value={user.status} onChange={handleChange} className="form-input">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
