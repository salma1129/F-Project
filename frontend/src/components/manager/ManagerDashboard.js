import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../styles/ManagerDashboard.css';
import AttendanceTracker from './AttendanceTracker';
import PayrollManager from './PayrollManager';
import ManageRecruiters from './ManageRecruiters';
import Leave from './Leave';
import Manage from './Manage';
import JobOffering from './JobOffering';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const MainContainer = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 25px;
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .user-name {
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
  }

  .user-role {
    color: #e0e0e0;
    font-size: 0.9rem;
  }
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #3498db;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 2rem;
    color: white;
    font-weight: bold;
  }
`;

const RecentRequests = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 10px;
  margin-top: 30px;
`;

const RequestsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    background: rgba(0, 0, 0, 0.7);
    color: #3498db;
    font-weight: 600;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 500;

  &.pending {
    background: rgba(241, 196, 15, 0.2);
    color: #f1c40f;
  }

  &.approved {
    background: rgba(46, 204, 113, 0.2);
    color: #2ecc71;
  }

  &.rejected {
    background: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 5px;

  &.approve {
    background: #2ecc71;
    color: white;

    &:hover {
      background: #27ae60;
    }
  }

  &.reject {
    background: #e74c3c;
    color: white;

    &:hover {
      background: #c0392b;
    }
  }
`;

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
            <DashboardContent>
              <StatsGrid>
                <StatCard>
                  <h3>Pending Leave Requests</h3>
                  <p className="stat-value">{leaveRequests.filter(r => r.status === 'Pending').length}</p>
                </StatCard>
                <StatCard>
                  <h3>Total Employees</h3>
                  <p className="stat-value">50</p>
                </StatCard>
                <StatCard>
                  <h3>Active Recruiters</h3>
                  <p className="stat-value">5</p>
                </StatCard>
              </StatsGrid>

              <RecentRequests>
                <h2>Recent Leave Requests</h2>
                <RequestsTable>
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
                          <StatusBadge className={request.status.toLowerCase()}>
                            {request.status}
                          </StatusBadge>
                        </td>
                        <td>
                          <ActionButton 
                            className="approve"
                            onClick={() => handleLeaveAction(request.id, 'Approved')}
                          >
                            Approve
                          </ActionButton>
                          <ActionButton 
                            className="reject"
                            onClick={() => handleLeaveAction(request.id, 'Rejected')}
                          >
                            Reject
                          </ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </RequestsTable>
              </RecentRequests>
            </DashboardContent>
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
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Manager Dashboard</Title>
            <UserInfo>
              <div className="user-name">{userName}</div>
              <div className="user-role">Manager</div>
            </UserInfo>
          </Header>
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
        </Content>
      </MainContainer>
    </Container>
  );
};

export default ManagerDashboard;
