import React, { useState } from "react";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
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
    <div className="home-page-container">
      <Navbar />
      
      <div className="home-container full-page">
        <div className="home-content" style={{ paddingTop: "100px" }}>
          <h1>IT Job Opportunities</h1>
          <p>Unlock your future with exciting job opportunities that match your skills and passion!</p>
          
          <div className="job-grid" style={{ justifyContent: "center", margin: "0 auto", maxWidth: "1200px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {jobs.map((job, index) => (
              <Card key={index} className="feature-card job-card" style={{ display: "flex", flexDirection: "column", height: "100%", margin: "10px", textAlign: "center" }}>
                <CardContent className="job-content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "20px" }}>
                  <div>
                    <h3 className="job-card-title">{job.title}</h3>
                    <p className="job-card-description">{job.description}</p>
                  </div>
                  <div>
                    <label className="checkbox-label" style={{ margin: "15px 0", color: "white" }}>
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.title)}
                        onChange={() => handleCheckboxChange(job.title)}
                      />
                      Select this job
                    </label>
                    <button 
                      className="btn" 
                      style={{ 
                        backgroundColor: "#2c3e50", 
                        color: "white", 
                        padding: "8px 16px", 
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out"
                      }} 
                      onClick={() => navigate("/Apply")}
                    >
                      Apply
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="home-buttons" style={{ marginTop: "30px", marginBottom: "30px" }}>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities; 