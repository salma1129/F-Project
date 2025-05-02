import React, { useState, useEffect, useRef } from 'react';
import '../styles/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    reason: '',
    type: 'vacation'
  });
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [notification, setNotification] = useState("");
  const lastStatuses = useRef({});

  useEffect(() => {
    if (activeSection === 'dashboard' || activeSection === 'leaveRequests') {
      fetchLeaveRequests();
    }
    // eslint-disable-next-line
  }, [activeSection]);

  // Improved polling for leave request status changes
  useEffect(() => {
    const poll = async () => {
      await fetchLeaveRequests();
      leaveRequests.forEach(req => {
        if (lastStatuses.current[req._id] && lastStatuses.current[req._id] !== req.status) {
          if (req.status === 'Approved') {
            setNotification('Your leave request has been approved!');
          } else if (req.status === 'Declined') {
            setNotification('Your leave request has been declined.');
          }
        }
      });
      lastStatuses.current = Object.fromEntries(leaveRequests.map(req => [req._id, req.status]));
    };
    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [leaveRequests]);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/leave-requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch leave requests');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      setLeaveRequests([]);
    }
  };

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
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString()
        })
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
        reason: '',
        type: 'vacation'
      });

      alert('Leave request submitted successfully!');
      fetchLeaveRequests();
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.length === 0 ? (
                      <tr><td colSpan="6">No leave requests found.</td></tr>
                    ) : (
                      leaveRequests.map((req) => (
                        <tr key={req._id}>
                          <td>{req.name}</td>
                          <td>{req.email}</td>
                          <td>{new Date(req.startDate).toLocaleDateString()}</td>
                          <td>{new Date(req.endDate).toLocaleDateString()}</td>
                          <td>{req.reason}</td>
                          <td className={`status ${req.status ? req.status.toLowerCase() : ''}`}>{req.status}</td>
                        </tr>
                      ))
                    )}
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
              <div className="form-group">
                <label htmlFor="type">Leave Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="vacation">Vacation</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal Leave</option>
                </select>
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
        {notification && (
          <div style={{ position: 'fixed', top: 30, right: 30, zIndex: 9999, background: '#3498db', color: 'white', padding: '16px 28px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            {notification}
            <button style={{ marginLeft: 20, background: 'transparent', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 18 }} onClick={() => setNotification("")}>×</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard; 