import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

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

const ManagerInfo = styled.div`
  color: #3498db;
  text-align: right;

  .name {
    font-size: 1rem;
    margin-bottom: 3px;
  }

  .role {
    color: #95a5a6;
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

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  margin: 0 4px;
`;

const ActionButton = styled(Button)`
  &.approve {
    background-color: #2ecc71;
    color: white;
    &:hover {
      background-color: #27ae60;
    }
  }

  &.reject {
    background-color: #e74c3c;
    color: white;
    &:hover {
      background-color: #c0392b;
    }
  }

  &.pending {
    background-color: #f1c40f;
    color: #2c3e50;
    &:hover {
      background-color: #f39c12;
    }
  }
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 8px;

  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

  input {
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
`;

const SubmitButton = styled(Button)`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  grid-column: 1 / -1;
  width: fit-content;
  justify-self: end;

  &:hover {
    background-color: #2980b9;
  }
`;

const ManageRecruiters = () => {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com",
      department: "IT",
      status: "active"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@example.com",
      department: "HR",
      status: "inactive"
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    status: "active"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.department) {
      alert("Please fill in all fields.");
      return;
    }
    const newRecruiter = {
      id: recruiters.length + 1,
      ...formData,
      status: "active"
    };
    setRecruiters([...recruiters, newRecruiter]);
    setFormData({
      name: "",
      email: "",
      department: "",
      status: "active"
    });
  };

  const handleStatusChange = (id) => {
    setRecruiters(recruiters.map(recruiter => {
      if (recruiter.id === id) {
        const newStatus = recruiter.status === "active" ? "inactive" : "active";
        return { ...recruiter, status: newStatus };
      }
      return recruiter;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      setRecruiters(recruiters.filter(recruiter => recruiter.id !== id));
    }
  };

  return (
    <Container>
      <MainContainer>
        <Content>
          <Header>
            <Title>Manage Recruiters</Title>
            <UserInfo>
              <div className="user-name">Manager Name</div>
              <div className="user-role">Manager</div>
            </UserInfo>
          </Header>
          <StatsContainer>
            <StatCard>
              <div className="stat-title">Total Recruiters</div>
              <div className="stat-value">{recruiters.length}</div>
            </StatCard>
            <StatCard>
              <div className="stat-title">Active Recruiters</div>
              <div className="stat-value">
                {recruiters.filter(r => r.status === 'active').length}
              </div>
            </StatCard>
            <StatCard>
              <div className="stat-title">Departments</div>
              <div className="stat-value">
                {new Set(recruiters.map(r => r.department)).size}
              </div>
            </StatCard>
          </StatsContainer>

          <ContentCard>
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter recruiter name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter recruiter email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter department"
                    required
                  />
                </FormGroup>
                <SubmitButton type="submit">Add Recruiter</SubmitButton>
              </form>
            </FormContainer>

            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map(recruiter => (
                  <tr key={recruiter.id}>
                    <td>{recruiter.name}</td>
                    <td>{recruiter.email}</td>
                    <td>{recruiter.department}</td>
                    <td>
                      <ActionButton
                        className={recruiter.status === 'active' ? 'approve' : 'reject'}
                        onClick={() => handleStatusChange(recruiter.id)}
                      >
                        {recruiter.status}
                      </ActionButton>
                    </td>
                    <td>
                      <ActionButton
                        className="reject"
                        onClick={() => handleDelete(recruiter.id)}
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

export default ManageRecruiters;