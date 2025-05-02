import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom";

// Same floating animation as login page
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// Exact same GlobalStyle as login page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') no-repeat center center fixed;
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
`;

const StyledWrapper = styled.div`
  .form-container {
    width: 380px;
    height: auto;
    min-height: 350px;
    background: white;
    border-radius: 10px;
    padding: 25px;
    text-align: center;
    animation: ${floatAnimation} 4s ease-in-out infinite;
    box-shadow: 0 8px 32px rgba(86, 145, 255, 0.2);
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #2d3748;
  }

  .subtitle {
    font-size: 0.95rem;
    color: #64748b;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    color: #2d3748;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 12px 15px;
    transition: all 0.3s ease-in-out;
    outline: none;
    background-color: #f8fafc;
    color: #2d3748;
    font-size: 0.95rem;
    box-sizing: border-box;
  }

  .input:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .input::placeholder {
    color: #111;
    opacity: 1;
  }

  .form-btn {
    padding: 12px 15px;
    border-radius: 8px;
    border: none;
    background: #3498db;
    color: white;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    margin-top: 10px;
  }

  .form-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  .back-to-login {
    font-size: 0.9rem;
    color: #2d3748;
    margin-top: 15px;
  }

  .login-link {
    color: #3498db;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    margin-left: 5px;
  }

  .login-link:hover {
    text-decoration: underline;
  }
`;

const Forgetpass = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the API request to the backend
    try {
      const response = await fetch("http://localhost:5001/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message); // Display success message
        setError(''); // Clear any previous errors
      } else {
        setError(data.message); // Display error message
        setSuccess('');
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setSuccess('');
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <div className="form-container">
          <h2 className="title">Reset Password</h2>
          <p className="subtitle">
            Enter your email address and we'll send you a link to reset your password
          </p>

          {/* Display success or error message */}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-btn">
              Send Reset Link
            </button>
          </form>

          <p className="back-to-login">
            Remember your password?
            <span className="login-link" onClick={() => navigate("/login")}>
              Back to Login
            </span>
          </p>
        </div>
      </StyledWrapper>
    </>
  );
};

export default Forgetpass;
