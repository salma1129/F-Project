import React, { useState } from "react";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import "../styles/Home.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const jobs = [
  { title: "Software Developer", description: "Designs and develops software applications using programming languages like Java, Python, and C++." },
  { title: "Web Developer", description: "Builds and maintains websites using front-end and back-end technologies such as HTML, CSS, JavaScript, and Node.js." },
  { title: "Database Administrator (DBA)", description: "Manages and optimizes databases for performance, security, and data integrity." },
  { title: "Network Engineer", description: "Designs and maintains network infrastructures, ensuring security and performance." },
  { title: "Cybersecurity Analyst", description: "Protects systems and networks from cyber threats through monitoring and security measures." },
  { title: "Data Analyst", description: "Analyzes large datasets to provide insights and support data-driven decision-making." },
  { title: "Cloud Engineer", description: "Manages cloud-based infrastructures on platforms like AWS, Azure, and Google Cloud." },
  { title: "IT Support Specialist", description: "Provides technical support and troubleshooting for IT systems." },
  { title: "AI/ML Engineer", description: "Develops artificial intelligence and machine learning models to automate tasks and analyze data." },
  { title: "DevOps Engineer", description: "Works with development and operations teams to automate and improve software deployment." }
];

const JobOpportunities = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (jobTitle) => {
    setSelectedJobs((prev) =>
      prev.includes(jobTitle)
        ? prev.filter((title) => title !== jobTitle)
        : [...prev, jobTitle]
    );
  };

  return (
    <>
      <div><Navbar /></div>
      <div className="body-border" /> 
      <div className="page-container">
        <div className="dream-job-box">
          <div className="centered-paragraph">
            <p style={{ color: "black", fontSize: "20px", textAlign: "center" }}>
              Unlock your future with exciting job opportunities that match your skills and passion! Whether you're looking to innovate as a software developer, shape the future of design, or analyze the world of data, our platform connects you with top employers in the tech industry. Explore a range of dynamic positions and take the first step towards your dream career today!
            </p>
          </div>
        </div>
        <h1 className="job-title">IT Job Opportunities</h1>
        <div className="job-grid">
          {jobs.map((job, index) => (
            <Card key={index} className="job-card">
              <CardContent className="job-content">
                <h2 className="job-card-title">{job.title}</h2>
                <p className="job-card-description">{job.description}</p>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.title)}
                    onChange={() => handleCheckboxChange(job.title)}
                  />
                  Select this job
                </label>
                {/* Apply Button */}
                <button className="info-button" onClick={() => navigate("/Apply")}>Apply</button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default JobOpportunities; 