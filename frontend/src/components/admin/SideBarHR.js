// SideBarHR.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBarHR.css';

const SideBarHR = () => {
  return (
    <div className="sidebar">
      <h2>HR Menu</h2>
      <ul>
        <li><Link to="/AttendanceTracker">Attendance Tracker</Link></li>
        <li><Link to="/AccessControl">Control Access</Link></li>
        <li><Link to="/DepartmentManagement">Department Management</Link></li>
        <li><Link to="/PayrollManagement">Payroll Management</Link></li>
        <li><Link to="/PerformanceTracker">Performance Tracker</Link></li>
      </ul>
    </div>
  );
};

export default SideBarHR;
