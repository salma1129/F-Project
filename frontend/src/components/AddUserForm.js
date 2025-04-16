import React, { useState } from "react";

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
      onUserAdd(user); // Send user data to parent component
      setUser({ name: "", email: "", role: "Employee", status: "Active" }); // Reset form
      setErrors({});
    }
  };

  // Inline Styles
  const formContainerStyle = {
    backgroundColor:"rgb(208, 230, 249)",
    padding: "60px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "450px",
    margin: "auto",
    border: "1px solid #e0e0e0",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    marginTop: "10px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Add New User</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Name Field */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter name"
          />
          {errors.name && <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter email"
          />
          {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
        </div>

        {/* Role Field */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Role</label>
          <select name="role" value={user.role} onChange={handleChange} style={inputStyle}>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Status Field */}
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>Status</label>
          <select name="status" value={user.status} onChange={handleChange} style={inputStyle}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" style={buttonStyle} onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
