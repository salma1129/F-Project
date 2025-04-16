import AddUserForm from "../components/AddUserForm";
import Sidebar from "../components/Sidebar";
import React from "react";
import "../styles/Admin.css";
import { User, Briefcase, Clock, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom"; // React Router v6 (for navigation)

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSignUpClick = () => {
    navigate('/signup'); // This will redirect to the "/signup" route
  };

  return (
    <div className="navbar">
      <Menu size={24} className="cursor-pointer" />
      <h1>HR Dashboard</h1>
      <div className="navbar-right">
        <button 
          onClick={handleSignUpClick} 
          className="button-signup">
          Sign Up
        </button>
      </div>
    </div>
  );
};


const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="dashboard">
      <Navbar />

        {/* Add User Form inside a colored box */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md mt-6">
          <AddUserForm />
        </div>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="card-container">
            {/* Add your cards here if needed */}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Admin;
