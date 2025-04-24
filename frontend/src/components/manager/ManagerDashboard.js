import React, { useState, useEffect } from 'react';
import '../../styles/ManagerDashboard.css';
import AttendanceTracker from './AttendanceTracker';
import PayrollManager from './PayrollManager';
import ManageRecruiters from './ManageRecruiters';
import Leave from './Leave';
import Manage from './Manage';
import JobOffering from './JobOffering';

const ManagerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'Roua Ladhari', email: 'roua.ladhari@horizon-tech.tn', type: 'Sick Leave', duration: '2 days', status: 'Pending' },
    { id: 2, name: 'Salma BenKhamsa', email: 'salma.benkhamsa@horizon-tech.tn', type: 'Annual Leave', duration: '5 days', status: 'Pending' },
  ]);
  
  // Get user data from localStorage (if available)
  const [userName, setUserName] = useState('Manager Name');
  
  useEffect(() => {
    // Get user data from localStorage if available
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLeaveAction = (id, action) => {
    setLeaveRequests(prev => prev.map(r => (r.id === id ? { ...r, status: action } : r)));
  };

  const sidebarSections = [
    { title: 'Dashboard', icon: '📊', id: 'dashboard' },
    { title: 'Manage Employees', icon: '👥', id: 'manage' },
    { title: 'Leave Management', icon: '📅', id: 'leave' },
    { title: 'Recruitment', icon: '🔍', id: 'recruiters' },
    { title: 'Job Offering', icon: '💼', id: 'jobOffering' },
    { title: 'Payroll', icon: '💰', id: 'payroll' },
    { title: 'Attendance', icon: '⏰', id: 'attendance' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="dashboard-header">
              <h1>Manager Dashboard</h1>
              <div className="user-info">
                <span className="user-name">{userName}</span>
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
                        <td>
                          <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span>
                        </td>
                        <td>
                          <button className="action-btn approve" onClick={() => handleLeaveAction(request.id, 'Approved')}>
                            <i className="fas fa-check"></i> Approve
                          </button>
                          <button className="action-btn reject" onClick={() => handleLeaveAction(request.id, 'Rejected')}>
                            <i className="fas fa-times"></i> Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'manage':
        return <Manage />;
      case 'leave':
        return <Leave />;
      case 'recruiters':
        return <ManageRecruiters />;
      case 'jobOffering':
        return <JobOffering />;
      case 'payroll':
        return <PayrollManager />;
      case 'attendance':
        return <AttendanceTracker />;
      default:
        return null;
    }
  };

  return (
    <div className="manager-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Manager </h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {sidebarSections.map(section => (
              <li 
                key={section.id} 
                className={activeSection === section.id ? 'active' : ''} 
                onClick={() => setActiveSection(section.id)}
              >
                <span style={{ marginRight: '10px' }}>{section.icon}</span>
                {section.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default ManagerDashboard;
