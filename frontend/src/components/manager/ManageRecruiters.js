import React, { useState } from "react";
import "../../styles/ManageRecruiters.css";

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com",
      department: "IT",
      status: "active"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@example.com",
      department: "HR",
      status: "inactive"
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    status: "active"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.department) {
      alert("Please fill in all fields.");
      return;
    }
    const newRecruiter = {
      id: recruiters.length + 1,
      ...formData,
      status: "active"
    };
    setRecruiters([...recruiters, newRecruiter]);
    setFormData({
      name: "",
      email: "",
      department: "",
      status: "active"
    });
  };

  const handleStatusChange = (id) => {
    setRecruiters(recruiters.map(recruiter => {
      if (recruiter.id === id) {
        const newStatus = recruiter.status === "active" ? "inactive" : "active";
        return { ...recruiter, status: newStatus };
      }
      return recruiter;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      setRecruiters(recruiters.filter(recruiter => recruiter.id !== id));
    }
  };

  return (
    <div className="recruiters-container">
      <h1 className="main-title">Manage Recruiters</h1>
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter recruiter name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter recruiter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter department"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Add Recruiter
            </button>
          </form>
        </div>

        <table className="recruiters-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map(recruiter => (
              <tr key={recruiter.id}>
                <td>{recruiter.id}</td>
                <td>{recruiter.name}</td>
                <td>{recruiter.email}</td>
                <td>{recruiter.department}</td>
                <td>
                  <span 
                    className={`status-badge status-${recruiter.status}`}
                    onClick={() => handleStatusChange(recruiter.id)}
                  >
                    {recruiter.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(recruiter.id)}
                    className="submit-button"
                    style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#f44336' }}
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

export default ManageRecruiters; 