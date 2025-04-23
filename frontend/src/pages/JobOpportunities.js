import React, { useState } from "react";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const jobs = [
  { 
    title: "Network Engineer / Software Developer", 
    description: "Designs and maintains network infrastructures while also developing software applications using languages like Java, Python, and C++."
  },
  { 
    title: "Cybersecurity Analyst / Web Developer", 
    description: "Protects systems from cyber threats while building and maintaining websites using front-end and back-end technologies such as HTML, CSS, JavaScript, and Node.js."
  },
  { 
    title: "Data Analyst / Database Administrator", 
    description: "Analyzes large datasets to provide insights and manages and optimizes databases for performance, security, and data integrity."
  },
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
      
      <div className="home-container full-page" style={{ minHeight: "100vh", overflowY: "auto" }}>
        <div className="home-content" style={{ paddingTop: "280px", paddingBottom: "60px" }}>
          <h1>IT Job Opportunities</h1>
          <p>Unlock your future with exciting job opportunities that match your skills and passion!</p>
          
          <div style={{ 
            width: "100%", 
            maxWidth: "1200px", 
            margin: "40px auto", 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: "25px", 
            justifyContent: "center",
            alignItems: "stretch"
          }}>
            {jobs.map((job, index) => (
              <Card key={index} className="feature-card job-card" style={{ 
                display: "flex", 
                flexDirection: "column", 
                height: "100%", 
                margin: "0", 
                textAlign: "center",
                boxShadow: "0 6px 10px rgba(6, 6, 6, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#2d3748"
              }}>
                <CardContent className="job-content" style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between", 
                  height: "100%", 
                  padding: "25px",
                  backgroundColor: "#2d3748"
                }}>
                  <div>
                    <h3 className="job-card-title" style={{ color: "white" }}>{job.title}</h3>
                    <p className="job-card-description" style={{ color: "#cbd5e0" }}>{job.description}</p>
                  </div>
                  <div>
                    <label className="checkbox-label" style={{ margin: "20px 0", color: "white", display: "block" }}>
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.title)}
                        onChange={() => handleCheckboxChange(job.title)}
                        style={{ marginRight: "10px" }}
                      />
                      Select this job
                    </label>
                    <button 
                      className="btn" 
                      style={{ 
                        display: "inline-flex",
                        justifyContent:"center",
                        backgroundColor: "#3182ce", 
                        color: "white", 
                        padding: "12px 50px", 
                        borderRadius: "5px",
                        border: "2px solid #3182ce",
                        fontWeight: "700",
                        fontSize: "20px",
                        lineHeight: "1.2",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease-in-out"
                      }} 
                      onClick={() => navigate("/Apply")}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#2b6cb0"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#3182ce"}
                    >
                      Apply
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="home-buttons" style={{ marginTop: "40px", marginBottom: "40px" }}>
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
