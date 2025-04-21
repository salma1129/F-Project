import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f5f9;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

// Floating Animation
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// Glow Animation
const glow = keyframes`
  0% { box-shadow: 0 0 5px teal, 0 0 10px teal, 0 0 15px teal; }
  50% { box-shadow: 0 0 10px cyan, 0 0 20px cyan, 0 0 30px cyan; }
  100% { box-shadow: 0 0 5px teal, 0 0 10px teal, 0 0 15px teal; }
`;

// Styled Wrapper
const StyledWrapper = styled.div`
  .form-container {
    width: 400px;
    height: auto;
    min-height: 520px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    animation: ${floatAnimation} 4s ease-in-out infinite;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #2d3748;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 10px;
  }

  .input {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 12px 15px;
    transition: all 0.3s ease-in-out;
    outline: none;
    background-color: #f8fafc;
    color: #2d3748;
  }

  .input:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .form-btn {
    padding: 12px 15px;
    border-radius: 8px;
    border: none;
    background: #3498db;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
  }

  .form-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  .sign-up-label {
    font-size: 14px;
    color: #2d3748;
    margin-top: 5px;
  }

  .sign-up-link {
    color: #3498db;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    margin-left: 8px;
  }

  .sign-up-link:hover {
    text-decoration: underline;
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 15px 0;
    width: 100%;
  }

  .apple-login-button,
  .google-login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 25px;
    padding: 12px 15px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  .apple-login-button {
    background: #000000;
    color: white;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .apple-login-button:hover {
    background: #333333;
  }

  .google-login-button {
    background: white;
    color: #3c4043;
    border: 1px solid #dadce0;
    font-family: 'Roboto', sans-serif;
  }

  .google-login-button:hover {
    background: #f8f9fa;
    border-color: #dadce0;
    box-shadow: 0 1px 3px rgba(60,64,67,0.3);
  }
`;

const SignupStyledWrapper = styled(StyledWrapper)`
  .form-container {
    min-height: 420px;
    padding: 20px;
  }

  .buttons-container {
    margin: 10px 0;
  }

  .form {
    gap: 10px;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <GlobalStyle />
      <SignupStyledWrapper>
        <div className="form-container">
          <p className="title">Sign up</p>
          <form className="form">
            <input type="text" className="input" placeholder="Name" />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Password" />
            <button className="form-btn">Create account</button>
          </form>

          <div className="buttons-container">
            <button className="apple-login-button">
              <FaApple size={20} /> Sign up with Apple
            </button>
            <button className="google-login-button">
              <FaGoogle size={20} /> Sign up with Google
            </button>
          </div>

          <p className="sign-up-label">
            Already have an account?
            <span className="sign-up-link" onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </div>
      </SignupStyledWrapper>
    </>
  );
};

export default Signup;