import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import '../../styles/PayrollManager.css';

const PayrollManager = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    { id: '1', name: 'Alice Smith', salary: 3000 },
    { id: '2', name: 'Bob Johnson', salary: 2500 },
  ]);

  const [newName, setNewName] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [activeSection, setActiveSection] = useState('payroll');

  const handleSectionClick = (section) => {
    setActiveSection(section);
    switch(section) {
      case 'dashboard':
        navigate('/ManagerDashboard');
        break;
      case 'leaveRequests':
        navigate('/LeaveManagement');
        break;
      case 'recruiters':
        navigate('/ManageRecruiters');
        break;
      case 'payroll':
        navigate('/PayrollManager');
        break;
      case 'attendance':
        navigate('/AttendanceTracker');
        break;
      case 'Leave':
        navigate('/Leave');
        break;
      default:
        break;
    }
  };

  const addEmployee = () => {
    if (newName.trim() === '' || newSalary.trim() === '') return;
    setEmployees((prev) => [
      ...prev,
      { id: uuidv4(), name: newName, salary: parseFloat(newSalary) },
    ]);
    setNewName('');
    setNewSalary('');
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const totalPayroll = employees.reduce((acc, emp) => acc + emp.salary, 0);

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
    <div className="payroll-page-container">
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
      <div className="main-container">
        <div className="payroll-content">
          <div className="payroll-header">
            <h1>Payroll Manager</h1>
          </div>

          <div className="payroll-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Employee name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-input"
                  placeholder="Salary"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                />
              </div>
            </div>
            <button className="submit-btn" onClick={addEmployee}>
              Add Employee
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Salary ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="stat-card">
            <h3>Total Monthly Payroll</h3>
            <p className="stat-value">${totalPayroll}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollManager;
