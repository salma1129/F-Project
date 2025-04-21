import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FaApple, FaGoogle } from "react-icons/fa";
import "../styles/signup.css";

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    margin: 0;
    padding: 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
    height: 520px;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 30px;
    text-align: center;
    animation: ${floatAnimation} 4s ease-in-out infinite;
    border: 2px solid transparent;
    animation: ${glow} 3s infinite alternate;
  }

  .title {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
    color: black;
    padding: 8px;
  }

  .sub-title {
    font-size: 12px;
    margin-bottom: 20px;
    color: #666;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input {
    border-radius: 25px;
    border: 2px solid #c0c0c0;
    padding: 12px 15px;
    transition: all 0.3s ease-in-out;
    outline: none;
  }

  .input:focus {
    border-color: teal;
    box-shadow: 0 0 8px teal;
  }

  .form-btn {
    padding: 12px 15px;
    border-radius: 25px;
    border: none;
    background: teal;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
  }

  .form-btn:hover {
    background: rgb(10, 72, 74);
    transform: scale(1.05);
    box-shadow: 0 0 10px #747474;
  }

  .sign-up-label {
    font-size: 16px;
    color: #747474;
    padding: 8px;
  }

  .sign-up-link {
    color: teal;
    cursor: pointer;
    font-weight: 800;
    text-decoration: underline;
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }

  .apple-login-button,
  .google-login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 25px;
    padding: 12px 15px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease-in-out;
  }
 .forgot-password {
    color: red;
    font-size: 16px;
    cursor: pointer;
    text-align: right;
    margin-top: -10px;
    margin-bottom: 10px;
    text-decoration:underline;
  }

  .apple-login-button {
    background: black;
    color: white;
    border: 2px solid black;
  }

  .apple-login-button:hover {
    background: white;
    color: black;
    border-color: black;
  }

  .google-login-button {
    border: 2px solid #747474;
  }

  .google-login-button:hover {
    border-color: teal;
    color: teal;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/EmployeeDashboard"); // Redirect to dashboard after successful login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred");
    }
  };

  // Navigate to Sign Up page
  const handleSignUp = () => {
    navigate("/Signup");
  };

  // Navigate to Forgot Password page
  const handleForgotPassword = () => {
    navigate("/forgetpassword");
  };

  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <div className="form-container">
          <p className="title">Login</p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="forgot-password" onClick={() => navigate("/forgetpassword")}>
              Forgot Password?
            </p>
            <button type="submit" className="form-btn">Login</button>
          </form>

          <div className="buttons-container">
            <div className="apple-login-button">
              <FaApple size={20} /> Login with Apple
            </div>
            <div className="google-login-button">
              <FaGoogle size={20} /> Login with Google
            </div>
          </div>

          <p className="sign-up-label">
            Don't have an account?
            <span className="sign-up-link" onClick={() => navigate("/Signup")}>Sign up</span>
          </p>
        </div>
      </StyledWrapper>
    </>
  );
};

export default Login;