import React, { useState } from "react";
import styled from "styled-components";
import '../styles/Apply.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cv: null
  });
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv' && files && files[0]) {
      setFileName(files[0].name);
    }
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('cv', formData.cv);
    
    console.log('FormData contents:');
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      console.log('Sending request to:', 'http://localhost:5001/api/apply');
      const response = await axios.post('http://localhost:5001/api/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response received:', response.data);
      // Redirect to success page after successful submission
      navigate('/application-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error response:', error.response);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Apply for Job</p>
        <p className="message">Please fill in your details to apply.</p>
        
        <label>
          <input 
            required 
            placeholder="" 
            type="text" 
            className="input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span>Full Name</span>
        </label>

        <label>
          <input 
            required 
            placeholder="" 
            type="email" 
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label className="file-upload-label">
          <div className="file-upload-container">
            <input 
              required 
              type="file" 
              className="file-input"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
            <div className="file-upload-text">
              {fileName || 'Upload your CV (PDF or Word)'}
            </div>
            <div className="file-upload-button">Upload</div>
          </div>
          <span>Upload CV</span>
        </label>

        <button className="submit" type="submit">Submit Application</button>
      </form>
    </div>
  );
};

/*const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width:500px;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
  }

  // .title::before,
  // .title::after {
  //   position: absolute;
  //   content: "";
  //   height: 16px;
  //   width: 16px;
  //   border-radius: 50%;
  //   left: -25px;
  //   background-color: royalblue;
  // }

  .title::before {
    width: 18px;
    height: 18px;
  }

  

  .message {
    color: green;
    font-size: 14px;
  }

  .form label {
    position: relative;
    display: block;
    width: 100%;
  }

  .input {
    width: 90%;
    padding: 10px;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
    outline: none;
  }

  .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    transition: 0.3s ease;
  }

  .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .input:focus + span,
  .input:valid + span {
    top: 5px;
    font-size: 0.8em;
    font-weight: 600;
  }

  .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;*/

export default Apply;
