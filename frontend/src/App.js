import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import Forgetpass from "./pages/Forgetpass";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import Leave from "./components/Leave";
import Manage from "./components/Manage";
import HomePage from "./pages/HomePage";
import JobOpportunities from "./pages/JobOpportunities";
import Users from "./components/Users";
import VerifyPage from "./components/VerifyPage";
import AttendanceTracker from "./components/AttendanceTracker";
import ControlAccess from "./components/ContolAccess";
import DepartmentManage from "./pages/DepartmentManage";
import PayrollManager from "./components/PayrollManager";
import PerformanceTracker from "./components/PerformanceTracker";
import DashboardHR from "./pages/DashboardHR";
import TaskController from "./components/TaskController"; 
import PerformanceController from "./components/PerformanceController";
import DashboardUsers from "./pages/DashboardUsers";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Dash from "./components/Dash"
import ApplicationSuccess from "./pages/ApplicationSuccess";

import { Navigate } from 'react-router-dom';
import LeaveRequests from "./components/LeaveRequests";

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking for token in localStorage
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/dash" element={<Dash />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />
        <Route path="/Apply" element={<Apply />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/dashboard" element={<Dashboard />} />*/}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgetpass />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/DashboardHR" element={<DashboardHR/>}/>
        <Route path="/Dashboardmanager" element={
          <ProtectedRoute>
            <DashboardUsers/>
          </ProtectedRoute>
        }/>


        <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>}/>


        

      </Routes>
    </Router>
  );
}

export default App;
