import React, { useState } from 'react';
import '../styles/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (section === 'leaveRequests') {
      setShowLeaveForm(true);
    } else {
      setShowLeaveForm(false);
    }
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
    <div className="employee-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Employee Portal</h2>
          <nav className="sidebar-nav">
            <ul>
              <li 
                className={activeSection === 'dashboard' ? 'active' : ''}
                onClick={() => handleSectionClick('dashboard')}
              >
                Dashboard
              </li>
              <li 
                className={activeSection === 'leaveRequests' ? 'active' : ''}
                onClick={() => handleSectionClick('leaveRequests')}
              >
                Leave Requests
              </li>
              <li 
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => handleSectionClick('profile')}
              >
                Profile
              </li>
              <li 
                className={activeSection === 'settings' ? 'active' : ''}
                onClick={() => handleSectionClick('settings')}
              >
                Settings
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="main-content">
        {activeSection === 'dashboard' ? (
          <>
            <div className="dashboard-header">
              <h1>Welcome to Your Dashboard</h1>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Employee</span>
              </div>
            </div>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Leave Balance</h3>
                <p className="stat-value">15 days</p>
              </div>
              <div className="stat-card">
                <h3>Pending Requests</h3>
                <p className="stat-value">2</p>
              </div>
              <div className="stat-card">
                <h3>Approved Requests</h3>
                <p className="stat-value">5</p>
              </div>
            </div>
            <div className="recent-requests">
              <h2>Recent Leave Requests</h2>
              <div className="requests-table">
                <table>
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-03-15</td>
                      <td>2024-03-17</td>
                      <td>Family vacation</td>
                      <td className="status approved">Approved</td>
                    </tr>
                    <tr>
                      <td>2024-04-01</td>
                      <td>2024-04-03</td>
                      <td>Medical appointment</td>
                      <td className="status pending">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeSection === 'leaveRequests' ? (
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
        ) : (
          <div className="section-content">
            <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard; 