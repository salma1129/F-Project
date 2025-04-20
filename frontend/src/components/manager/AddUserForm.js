import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddUserForm.css';

const AddUserForm = () => {
  const navigate = useNavigate();

  return (
    <div className="add-user-page">
      <div className="form-container">
        <h1>Add New User</h1>
        
        <form className="user-form">
          <div className="form-group">
            <h2>Name</h2>
            <input 
              type="text" 
              placeholder="Enter name" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <h2>Email</h2>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <h2>Role</h2>
            <select className="form-input">
              <option>Employee</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>
          
          <div className="form-group">
            <h2>Status</h2>
            <select className="form-input">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          
          <div className="divider"></div>
          
          <button type="submit" className="submit-button">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;