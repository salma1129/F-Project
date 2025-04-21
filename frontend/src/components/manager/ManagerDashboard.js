import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ManagerDashboard.css';
import AttendanceTracker from './AttendanceTracker';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Roua Ladhari", email: "roua.ladhari@horizon-tech.tn", type: "Sick Leave", duration: "2 days", status: "Pending" },
    { id: 2, name: "Salma BenKhamsa", email: "salma.benkhamsa@horizon-tech.tn", type: "Annual Leave", duration: "5 days", status: "Pending" },
  ]);

  const handleSectionClick = (section) => {
    if (section === 'attendance') {
      navigate('/AttendanceTracker');
    } else {
      setActiveSection(section);
    }
  };

  const handleLeaveAction = (id, action) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  const sidebarSections = [
    {
      title: "Dashboard",
      icon: "📊",
      id: "dashboard"
    },
    {
      title: "Leave Management",
      icon: "📅",
      id: "leaveRequests"
    },
    {
      title: "Recruitment",
      icon: "👥",
      id: "recruiters"
    },
    {
      title: "Payroll",
      icon: "💰",
      id: "payroll"
    },
    {
      title: "Attendance",
      icon: "⏰",
      id: "attendance"
    }
  ];

  return (
    <div className="manager-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Manager Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {sidebarSections.map(section => (
              <li 
                key={section.id}
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => handleSectionClick(section.id)}
              >
                <span style={{ marginRight: '10px' }}>{section.icon}</span>
                {section.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="main-content">
        {activeSection === 'dashboard' ? (
          <>
            <div className="dashboard-header">
              <h1>Manager Dashboard</h1>
              <div className="user-info">
                <span className="user-name">Manager Name</span>
                <span className="user-role">Manager</span>
              </div>
            </div>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Pending Leave Requests</h3>
                <p className="stat-value">{leaveRequests.filter(r => r.status === 'Pending').length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Employees</h3>
                <p className="stat-value">50</p>
              </div>
              <div className="stat-card">
                <h3>Active Recruiters</h3>
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
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map(request => (
                      <tr key={request.id}>
                        <td>{request.name}</td>
                        <td>{request.email}</td>
                        <td>{request.type}</td>
                        <td>{request.duration}</td>
                        <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
                        <td>
                          <button 
                            className="action-btn approve"
                            onClick={() => handleLeaveAction(request.id, 'Approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className="action-btn reject"
                            onClick={() => handleLeaveAction(request.id, 'Rejected')}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeSection === 'leaveRequests' ? (
          <div className="section-content">
            <h2>Leave Requests Management</h2>
            <div className="leave-requests-container">
              <table className="leave-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map(request => (
                    <tr key={request.id}>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.type}</td>
                      <td>{request.duration}</td>
                      <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
                      <td>
                        <button 
                          className="action-btn approve"
                          onClick={() => handleLeaveAction(request.id, 'Approved')}
                        >
                          Approve
                        </button>
                        <button 
                          className="action-btn reject"
                          onClick={() => handleLeaveAction(request.id, 'Rejected')}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeSection === 'attendance' ? (
          <AttendanceTracker />
        ) : (
          <div className="section-content">
            <h2>{sidebarSections.find(s => s.id === activeSection)?.title}</h2>
            <p>This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard; 