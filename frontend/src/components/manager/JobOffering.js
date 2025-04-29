// CreateJobOffering.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import '../../styles/ManagerDashboard.css';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const MainContainer = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 25px;
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .user-name {
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
  }

  .user-role {
    color: #e0e0e0;
    font-size: 0.9rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
`;

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 8px;
  text-align: center;

  .stat-title {
    color: #3498db;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .stat-value {
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const ContentCard = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 15px;
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 8px;

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  label {
    display: block;
    color: #3498db;
    margin-bottom: 6px;
    font-size: 0.9rem;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  grid-column: 1 / -1;
  width: fit-content;
  justify-self: end;

  &:hover {
    background-color: #2980b9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;

  th {
    color: #3498db;
    text-align: left;
    padding: 12px;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  td {
    padding: 12px;
    color: white;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  margin: 0 4px;
  
  &.edit {
    background-color: #2ecc71;
    color: white;
    &:hover {
      background-color: #27ae60;
    }
  }

  &.delete {
    background-color: #e74c3c;
    color: white;
    &:hover {
      background-color: #c0392b;
    }
  }
`;

const JobOffering = () => {
  const navigate = useNavigate();
  const [jobOfferings, setJobOfferings] = useState([
    { 
      id: 1, 
      name: "Senior React Developer", 
      description: "We are looking for an experienced React developer...",
      salary: "$80,000 - $100,000"
    },
    { 
      id: 2, 
      name: "UI/UX Designer", 
      description: "Creative UI/UX designer needed for our growing team...",
      salary: "$70,000 - $90,000"
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.salary) {
      alert("Please fill in all fields.");
      return;
    }
    
    const newJobOffering = {
      id: jobOfferings.length + 1,
      ...formData
    };
    
    setJobOfferings([...jobOfferings, newJobOffering]);
    setFormData({ name: "", description: "", salary: "" });
    alert("Job posted successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job offering?")) {
      setJobOfferings(jobOfferings.filter(job => job.id !== id));
    }
  };

  return (
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Job Offering</Title>
            <UserInfo>
              <div className="user-name">Manager Name</div>
              <div className="user-role">Manager</div>
            </UserInfo>
          </Header>

          <StatsContainer>
            <StatCard>
              <div className="stat-title">Total Job Offerings</div>
              <div className="stat-value">{jobOfferings.length}</div>
            </StatCard>
            <StatCard>
              <div className="stat-title">Average Salary</div>
              <div className="stat-value">
                ${jobOfferings.reduce((acc, job) => {
                  const salary = parseInt(job.salary.replace(/[^0-9]/g, ''));
                  return acc + salary;
                }, 0) / (jobOfferings.length || 1)}
              </div>
            </StatCard>
            <StatCard>
              <div className="stat-title">Departments</div>
              <div className="stat-value">
                {new Set(jobOfferings.map(job => job.name.split(' ')[0])).size}
              </div>
            </StatCard>
          </StatsContainer>

          <ContentCard>
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary range"
                    required
                  />
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <label>Job Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter job description"
                    required
                  />
                </FormGroup>
                <SubmitButton type="submit">Post Job</SubmitButton>
              </form>
            </FormContainer>

            <Table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Description</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobOfferings.map(job => (
                  <tr key={job.id}>
                    <td>{job.name}</td>
                    <td>{job.description.substring(0, 50)}...</td>
                    <td>{job.salary}</td>
                    <td>
                      <ActionButton
                        className="delete"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentCard>
        </Content>
      </MainContainer>
    </Container>
  );
};

export default JobOffering;