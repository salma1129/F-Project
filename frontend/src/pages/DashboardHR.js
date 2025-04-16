import React from "react";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import { UserCheck, Lock, Building2, DollarSign, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardHR.css";

const pages = [
  { name: "Attendance Tracker", icon: <UserCheck />, path: "/AttendanceTracker" },
  { name: "Control Access", icon: <Lock />, path: "/ControlAccess" },
  { name: "Department Manage", icon: <Building2 />, path: "/DepartmentManage" },
  { name: "Payroll Manage", icon: <DollarSign />, path: "/PayrollManager" },
  { name: "Performance Tracker", icon: <TrendingUp />, path: "/PerformanceTracker" },
];

const DashboardHR = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <h2>HR Manager</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <button
                  className="nav-button"
                  onClick={() => handleNavigation(page.path)}
                >
                  {page.icon} {page.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar-footer">© 2025 HR Portal</div>
      </div>

      {/* Main Content (Optional welcome text or something else) */}
      <div className="main-content">
        <div className="card">
          <div className="text-gray-700 font-semibold text-lg">
            Select an option from the sidebar
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHR;
