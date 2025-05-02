import React from 'react';
import Navbar from './Navbar';
import '../styles/Home.css'; // Reuse Home styling

const About = () => {
  return (
    <div className="home-page-container">
      <Navbar />
      <div className="home-container full-page">
        <div className="home-content">
          <h1>About Our HR System</h1>
          <p>
          Our HR Management System is built to simplify and optimize every aspect of human resources operations — from recruitment to performance management — helping organizations enhance efficiency and drive growth.
          </p>

          <div className="about-image-section" style={{ marginTop: '2rem' }}>
            
          </div>

          <p style={{ marginTop: '2rem' }}>
            Designed to scale with your business, whether small or large, the system offers comprehensive modules for attendance tracking, payroll management, leave requests, recruitment processes, and employee evaluations.
            With a user-friendly interface and powerful backend support, it adapts seamlessly to your evolving HR needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;