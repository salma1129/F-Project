import React, { useState } from 'react';
//import './LeaveRequestForm.css';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/leave-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit leave request');

      alert('Leave request submitted!');
      setFormData({ name: '', email: '', startDate: '', endDate: '', reason: '' });
    } catch (err) {
      alert('Error submitting leave request.');
    }
  };

  return (
    <div className="leave-request-form-page">
      <h2>Request Leave</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Start Date</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>End Date</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <label>Reason</label>
        <textarea name="reason" value={formData.reason} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
