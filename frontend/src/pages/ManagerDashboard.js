import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ManagerDashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="sidebar">
        <div className="user-info">
          <h3>Manager Dashboard</h3>
          <p>{userData?.name || 'Loading...'}</p>
        </div>
        <nav>
          <button
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeSection === 'team' ? 'active' : ''}
            onClick={() => setActiveSection('team')}
          >
            Team Management
          </button>
          <button
            className={activeSection === 'leave' ? 'active' : ''}
            onClick={() => setActiveSection('leave')}
          >
            Leave Requests
          </button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </div>
      <div className="main-content">
        {activeSection === 'dashboard' && (
          <div className="dashboard-content">
            <h2>Welcome, {userData?.name || 'Manager'}</h2>
            <div className="stats">
              <div className="stat-card">
                <h3>Team Members</h3>
                <p>Loading...</p>
              </div>
              <div className="stat-card">
                <h3>Pending Requests</h3>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'team' && (
          <div className="team-content">
            <h2>Team Management</h2>
            <p>Team management features will be implemented here.</p>
          </div>
        )}
        {activeSection === 'leave' && (
          <div className="leave-content">
            <h2>Leave Requests</h2>
            <p>Leave request management will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard; 