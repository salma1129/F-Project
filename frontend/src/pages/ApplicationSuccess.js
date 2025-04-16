import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Apply.css';

const ApplicationSuccess = () => {
  return (
    <div className="wrapper">
      <div className="form">
        <p className="title">Application Submitted!</p>
        <p className="message">Thank you for your application. We will review it and get back to you soon.</p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" className="submit" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess; 