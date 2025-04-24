import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page-container">
      {/* Use the Navbar component */}
      <Navbar 
        onAboutClick={() => scrollToSection(aboutSectionRef)}
        onServicesClick={() => scrollToSection(servicesSectionRef)}
        onContactClick={() => scrollToSection(contactSectionRef)}
      />

  {/* Full page container with background */}
  <div className="home-container full-page">
    <div className="home-content">
      <h1>HR Management System</h1>
      <p>Streamline your HR operations with our comprehensive solution</p>
      
      <div className="home-buttons">
        <button 
          className="btn btn-primary" 
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/job-opportunities")}
        >
          IT Opportunities
        </button>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <i className="fas fa-users"></i>
          <h3>Employee Management</h3>
          <p>Easily manage all your employee records in one place</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-chart-line"></i>
          <h3>Performance Tracking</h3>
          <p>Monitor and improve employee performance</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-calendar-alt"></i>
          <h3>Leave Management</h3>
          <p>Streamline leave requests and approvals</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-file-alt"></i>
          <h3>Application Tracking</h3>
          <p>Manage job applications efficiently</p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default HomePage;

