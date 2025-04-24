import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FaApple, FaGoogle } from "react-icons/fa";
import "../styles/signup.css";

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
    width: 380px;
    height: auto;
    min-height: 450px;
    background-color: white;
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

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 8px;
  }

  .input {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 10px 12px;
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
    padding: 10px 12px;
    border-radius: 8px;
    border: none;
    background: #3498db;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
  }

  .form-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  .forgot-password {
    color: #e74c3c;
    font-size: 13px;
    cursor: pointer;
    text-align: right;
    margin-top: -8px;
    margin-bottom: 8px;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .forgot-password:hover {
    color: #c0392b;
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 12px 0;
    width: 100%;
  }

  .apple-login-button,
  .google-login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    padding: 10px 12px;
    cursor: pointer;
    font-size: 14px;
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

  .sign-up-label {
    font-size: 13px;
    color: #2d3748;
    margin-top: 5px;
  }

  .sign-up-link {
    color: #3498db;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    margin-left: 5px;
  }

  .sign-up-link:hover {
    text-decoration: underline;
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
    
    // Store user data
    localStorage.setItem("userRole", data.user.role);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("userId", data.user.id);
    
    // Role-based redirection
    const userRole = data.user.role;
    switch(userRole) {
      case 'admin':
        navigate("/admin-dashboard");
        break;
      case 'hr':
        navigate("/hr-dashboard");
        break;
      case 'manager':
        navigate("/manager-dashboard");
        break;
      case 'employee':
        navigate("/EmployeeDashboard");
        break;
      case 'candidate':
        navigate("/job-opportunities");
        break;
      default:
        navigate("/"); // Default to home page if role is unknown
    }
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
        <button className="apple-login-button">
          <FaApple size={20} /> Login with Apple
        </button>
        <button className="google-login-button">
          <FaGoogle size={20} /> Login with Google
        </button>
      </div>

      <p className="sign-up-label">
        Don't have an account?
        <span className="sign-up-link" onClick={() => navigate("/Signup")}>
          Sign up
        </span>
      </p>
    </div>
  </StyledWrapper>
</>
  );
};

export default Login;