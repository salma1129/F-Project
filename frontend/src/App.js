import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Forgetpass from "./pages/Forgetpass";
import Apply from "./pages/Apply";
import HomePage from "./pages/HomePage";
import JobOpportunities from "./pages/JobOpportunities";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import { Navigate } from 'react-router-dom';
import LeaveRequests from "./components/LeaveRequests";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import Leave from "./components/manager/Leave";
import JobOffering from "./components/manager/JobOffering";
import AdminDashboard from "./pages/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Route - Check if user is an admin
const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  // In a real app, you would decode the JWT to check the role
  // For simplicity, this is just a basic check
  const userRole = localStorage.getItem('userRole'); // You'd need to store this during login

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/job-opportunities" element={<JobOpportunities />} />
        <Route path="/leave" element={<Leave />} />

        <Route path="/Apply" element={<Apply />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpass" element={<Forgetpass />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/job-offering" element={<JobOffering />} />
        <Route path="/leave-requests" element={<LeaveRequests />} />
        
        <Route path="/admin-dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/manager-dashboard" element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/EmployeeDashboard" element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />        
       
      </Routes>
    </Router>
  );
}

export default App;
