import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import Forgetpass from "./pages/Forgetpass";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import HomePage from "./pages/HomePage";
import JobOpportunities from "./pages/JobOpportunities";
import Users from "./components/Users";
import VerifyPage from "./components/VerifyPage";
import ControlAccess from "./components/ContolAccess";
import DepartmentManage from "./pages/DepartmentManage";
import PerformanceTracker from "./components/PerformanceTracker";
import DashboardHR from "./pages/DashboardHR";
import TaskController from "./components/TaskController"; 
import PerformanceController from "./components/PerformanceController";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Dash from "./components/Dash"
import ApplicationSuccess from "./pages/ApplicationSuccess";
import { Navigate } from 'react-router-dom';
import LeaveRequests from "./components/LeaveRequests";
import AddUserForm from "./components/AddUserForm"; 
import ManagerDashboard from "./components/manager/ManagerDashboard";
import Leave from "./components/manager/Leave";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
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
        <Route path="/leave" element={<Leave />} />

        <Route path="/Apply" element={<Apply />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpass" element={<Forgetpass />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />
        
        {/* Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ManagerDashboard" element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/EmployeeDashboard" element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hr" element={<DashboardHR />} />
        <Route path="/users" element={<Users />} />
        <Route path="/control-access" element={<ControlAccess />} />
        <Route path="/department-manage" element={<DepartmentManage />} />
        <Route path="/performance-tracker" element={<PerformanceTracker />} />
        <Route path="/task-controller" element={<TaskController />} />
        <Route path="/performance-controller" element={<PerformanceController />} />
        <Route path="/leave-requests" element={<LeaveRequests />} />
        <Route path="/add-user" element={<AddUserForm />} />
        <Route path="/leave" element={
          <ProtectedRoute>
            <Leave />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
