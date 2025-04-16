import React, { useState } from 'react';
import SideBarHR from '../components/SideBarHR';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '220px', // Add margin to the left to avoid overlapping with the sidebar
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '8px',
    fontSize: '14px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  actionBtn: {
    marginRight: '10px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  },
  edit: {
    backgroundColor: '#ffd966',
  },
  delete: {
    backgroundColor: '#f66',
    color: '#fff',
  },
  add: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
};

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([
    { _id: '1', name: 'Human Resources', head: 'Sarah Johnson' },
    { _id: '2', name: 'Engineering', head: 'John Doe' },
  ]);
  const [name, setName] = useState('');
  const [head, setHead] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept._id === editingId ? { ...dept, name, head } : dept
        )
      );
      setEditingId(null);
    } else {
      setDepartments((prev) => [
        ...prev,
        { _id: Date.now().toString(), name, head },
      ]);
    }
    setName('');
    setHead('');
  };

  const handleEdit = (dept) => {
    setName(dept.name);
    setHead(dept.head);
    setEditingId(dept._id);
  };

  const handleDelete = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept._id !== id));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <SideBarHR />

      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.heading}>📁 Manage Departments</h2>

        {/* Form for Adding/Editing Department */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Head of Department"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{ ...styles.button, ...styles.add }}
          >
            {editingId ? '✏️ Update' : '➕ Add'}
          </button>
        </form>

        {/* Department List */}
        <div>
          {departments.length === 0 ? (
            <p>No departments found.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Head</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept._id}>
                    <td style={styles.td}>{dept.name}</td>
                    <td style={styles.td}>{dept.head}</td>
                    <td style={styles.td}>
                      <button
                        style={{ ...styles.actionBtn, ...styles.edit }}
                        onClick={() => handleEdit(dept)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        style={{ ...styles.actionBtn, ...styles.delete }}
                        onClick={() => handleDelete(dept._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentManager;
