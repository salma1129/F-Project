import React, { useState } from 'react';

const AskForLeaveForm = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    reason: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5001/api/leave-requests", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Failed to submit leave request");
      }

      alert("Leave request submitted!");
      setForm({
        name: '',
        address: '',
        email: '',
        reason: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting leave request.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Ask for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for leave"
          value={form.reason}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
            required
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default AskForLeaveForm;
