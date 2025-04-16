import React from 'react';
import styled from 'styled-components';
import '../styles/Forgetpass.css';

const Forgetpass = () => {
  return (
    <StyledWrapper>
      <div className="form-container">
        <div className="logo-container">
          Forgot Password
        </div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <button className="form-submit-btn" type="submit">Send Email</button>
        </form>
        <p className="signup-link">
          Don&apos;t have an account?
        </p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(124, 125, 128);

  .form-container {
    background-color: white;
    padding: 30px 40px;
    border-radius: 15px;
    width: 380px;
    height: 320px; /* ⬅️ Reduced height */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }

  .logo-container {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #1a1a1a;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 5px;
    color: #333;
    font-weight: 500;
  }

  .form-group input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #aaa;
    outline: none;
    transition: border-color 0.3s;
  }

  .form-group input:focus {
    border-color: teal;
  }

  .form-submit-btn {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
    font-weight: bold;
  }

  .form-submit-btn:hover {
    background-color: #006666;
  }

  .signup-link {
    font-size: 14px;
    text-align: center;
    color: #333;
    margin-top: 10px;
  }
`;

export default Forgetpass;
