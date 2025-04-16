import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/leave-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit leave request');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        startDate: '',
        endDate: '',
        reason: ''
      });

      alert('Leave request submitted successfully!');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Employee Dashboard</h2>
        <div className="leave-request-form">
          <h3>Request Leave</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit Request</button>
          </form>
        </div>
      </div>
      <div className="main-content">
        {/* Main content area - can be customized based on needs */}
        <h2>Welcome to your Dashboard</h2>
        <p>Your leave requests and other information will appear here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
