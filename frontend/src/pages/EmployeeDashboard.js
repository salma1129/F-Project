import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeDashboard.css';
import { 
  FaHome, 
  FaUser, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaDownload,
  FaEdit
} from 'react-icons/fa';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Information Technology',
    role: 'Software Developer',
    phone: '555-123-4567',
    address: '123 Tech Street, Silicon Valley, CA',
    joiningDate: '2023-01-15',
    employeeId: 'EMP001'
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from backend when component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        
        // Update profile data with fetched user data
        setProfileData(prevState => ({
          ...prevState,
          name: data.name || prevState.name,
          email: data.email || prevState.email
        }));
        
        // Update form data with fetched user data
        setFormData(prevState => ({
          ...prevState,
          name: data.name || prevState.name,
          email: data.email || prevState.email
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setEditingProfile(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('token');
    navigate('/login');
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
        ...formData,
        name:'',
        email:'',
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    setEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleDownloadReport = (reportType) => {
    // This would typically initiate a download from your backend
    alert(`Downloading ${reportType} report...`);
  };

  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <div className={`homepage-sidebar ${sidebarOpen ? "" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Employee </h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="sidebar-menu">
          <div 
            className={`menu-item ${activeSection === 'dashboard' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('dashboard')}
          >
            <FaHome className="menu-icon" />
            <span className="menu-text">Home</span>
          </div>
          <div 
            className={`menu-item ${activeSection === 'profile' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('profile')}
          >
            <FaUser className="menu-icon" />
            <span className="menu-text">My Profile</span>
          </div>
          <div 
            className={`menu-item ${activeSection === 'leaveRequests' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('leaveRequests')}
          >
            <FaCalendarAlt className="menu-icon" />
            <span className="menu-text">Leave Requests</span>
          </div>
          <div 
            className={`menu-item ${activeSection === 'reports' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('reports')}
          >
            <FaFileAlt className="menu-icon" />
            <span className="menu-text">Reports</span>
          </div>
          <div className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" />
            <span className="menu-text">Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`employee-main ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        {activeSection === 'dashboard' ? (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Welcome {profileData.name}</h1>
              <div className="user-info">
                <span className="user-name">{profileData.name}</span>
                <span className="user-role">{profileData.role}</span>
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
          </div>
        ) : activeSection === 'profile' ? (
          <div className="profile-section">
            <h2>My Profile</h2>
            {!editingProfile ? (
              <div className="profile-details">
                <div className="profile-card">
                  <div className="profile-image">
                    <FaUser size={60} />
                  </div>
                  <div className="profile-info">
                    <h3>{profileData.name}</h3>
                    <p>{profileData.role}</p>
                    <p>{profileData.department}</p>
                  </div>
                  <button className="edit-profile-btn" onClick={() => setEditingProfile(true)}>
                    <FaEdit /> Edit Profile
                  </button>
                </div>
                <div className="profile-data-section">
                  <div className="profile-data-card">
                    <h4>Personal Information</h4>
                    <div className="profile-data-row">
                      <span className="profile-label">Employee ID:</span>
                      <span>{profileData.employeeId}</span>
                    </div>
                    <div className="profile-data-row">
                      <span className="profile-label">Name:</span>
                      <span>{profileData.name}</span>
                    </div>
                    <div className="profile-data-row">
                      <span className="profile-label">Email:</span>
                      <span>{profileData.email}</span>
                    </div>
                    <div className="profile-data-row">
                      <span className="profile-label">Phone:</span>
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="profile-data-row">
                      <span className="profile-label">Address:</span>
                      <span>{profileData.address}</span>
                    </div>
                  </div>
                  <div className="profile-data-card">
                    <h4>Employment Information</h4>
                    <div className="profile-data-row">
                      <span className="profile-label">Department:</span>
                      <span>{profileData.department}</span>
                    </div>
                    <div className="profile-data-row">
                      <span className="profile-label">Role:</span>
                      <span>{profileData.role}</span>
                    </div>
                    <div className="profile-data-row">
                      <span className="profile-label">Joining Date:</span>
                      <span>{profileData.joiningDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-edit-form">
                <h3>Edit Profile</h3>
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="profile-btn-group">
                    <button type="submit" className="submit-btn">Save Changes</button>
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => setEditingProfile(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : activeSection === 'leaveRequests' ? (
          <div className="leave-request-section">
            <h2>Leave Requests</h2>
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
            
            <div className="leave-history">
              <h3>Leave History</h3>
              <div className="requests-table">
                <table>
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-03-15</td>
                      <td>2024-03-17</td>
                      <td>3</td>
                      <td>Family vacation</td>
                      <td className="status approved">Approved</td>
                    </tr>
                    <tr>
                      <td>2024-04-01</td>
                      <td>2024-04-03</td>
                      <td>3</td>
                      <td>Medical appointment</td>
                      <td className="status pending">Pending</td>
                    </tr>
                    <tr>
                      <td>2024-01-10</td>
                      <td>2024-01-12</td>
                      <td>3</td>
                      <td>Personal work</td>
                      <td className="status approved">Approved</td>
                    </tr>
                    <tr>
                      <td>2023-11-22</td>
                      <td>2023-11-24</td>
                      <td>3</td>
                      <td>Family event</td>
                      <td className="status approved">Approved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeSection === 'reports' ? (
          <div className="reports-section">
            <h2>Reports</h2>
            <div className="reports-grid">
              <div className="report-card">
                <FaFileAlt className="report-icon" />
                <h3>Leave Summary</h3>
                <p>Summary of your leave requests and balances</p>
                <button 
                  className="download-btn" 
                  onClick={() => handleDownloadReport('Leave Summary')}
                >
                  <FaDownload /> Download PDF
                </button>
                <button 
                  className="view-btn" 
                  onClick={() => alert('Viewing Leave Summary Report')}
                >
                  View Report
                </button>
              </div>
              <div className="report-card">
                <FaFileAlt className="report-icon" />
                <h3>Attendance Report</h3>
                <p>Your attendance records for the current month</p>
                <button 
                  className="download-btn" 
                  onClick={() => handleDownloadReport('Attendance')}
                >
                  <FaDownload /> Download PDF
                </button>
                <button 
                  className="view-btn" 
                  onClick={() => alert('Viewing Attendance Report')}
                >
                  View Report
                </button>
              </div>
              <div className="report-card">
                <FaFileAlt className="report-icon" />
                <h3>Performance Review</h3>
                <p>Your latest performance evaluation</p>
                <button 
                  className="download-btn" 
                  onClick={() => handleDownloadReport('Performance')}
                >
                  <FaDownload /> Download PDF
                </button>
                <button 
                  className="view-btn" 
                  onClick={() => alert('Viewing Performance Report')}
                >
                  View Report
                </button>
              </div>
              <div className="report-card">
                <FaFileAlt className="report-icon" />
                <h3>Payslip</h3>
                <p>Your latest payslip and salary details</p>
                <button 
                  className="download-btn" 
                  onClick={() => handleDownloadReport('Payslip')}
                >
                  <FaDownload /> Download PDF
                </button>
                <button 
                  className="download-excel-btn" 
                  onClick={() => handleDownloadReport('Payslip Excel')}
                >
                  <FaDownload /> Download Excel
                </button>
              </div>
            </div>
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