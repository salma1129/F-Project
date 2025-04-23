import React, { useState } from "react";
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

    try {
      console.log('Sending request to:', 'http://localhost:5001/api/apply');
      const response = await axios.post('http://localhost:5001/api/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response received:', response.data);
      navigate('/application-success');
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error response:', error.response);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="homepage-container">
      <div className="page-container">
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
    <div className="back-button-container">
      <button 
        className="back-button"
        onClick={() => navigate("/job-opportunities")}
      >
        Back to Job Opportunities
      </button>
    </div>
  </div>
</div>
  );
};

export default Apply;

