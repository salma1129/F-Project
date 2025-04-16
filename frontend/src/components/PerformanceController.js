import React, { useState } from 'react';

const PerformanceController = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [newAssessment, setNewAssessment] = useState({
    employeeId: '',
    rating: '',
    feedback: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerformance = {
      ...newAssessment,
      id: performanceData.length + 1,
    };
    setPerformanceData([...performanceData, newPerformance]);
    setNewAssessment({ employeeId: '', rating: '', feedback: '' });
  };

  const styles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
      background: '#f0f6ff',
      minHeight: '100vh',
      padding: '2rem',
      color: '#333',
    },
    header: {
      textAlign: 'center',
      color: '#0b5394',
      fontSize: '2rem',
      marginBottom: '2rem',
    },
    form: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '0 auto 3rem auto',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #cce0ff',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #cce0ff',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '80px',
      resize: 'vertical',
    },
    button: {
      width: '100%',
      background: '#0b5394',
      color: '#fff',
      padding: '10px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background 0.3s',
    },
    buttonHover: {
      background: '#073763',
    },
    list: {
      maxWidth: '700px',
      margin: '0 auto',
    },
    listItem: {
      background: '#ffffff',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      fontSize: '1rem',
    },
    subHeader: {
      color: '#0b5394',
      textAlign: 'center',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📊 Assess Performance</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Employee ID"
          value={newAssessment.employeeId}
          onChange={(e) =>
            setNewAssessment({ ...newAssessment, employeeId: e.target.value })
          }
          required
          style={styles.input}
        />
        <input
          placeholder="Rating (1-5)"
          type="number"
          min="1"
          max="5"
          value={newAssessment.rating}
          onChange={(e) =>
            setNewAssessment({ ...newAssessment, rating: e.target.value })
          }
          required
          style={styles.input}
        />
        <textarea
          placeholder="Feedback"
          value={newAssessment.feedback}
          onChange={(e) =>
            setNewAssessment({ ...newAssessment, feedback: e.target.value })
          }
          style={styles.textarea}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.background = styles.buttonHover.background)
          }
          onMouseOut={(e) =>
            (e.target.style.background = styles.button.background)
          }
        >
          ✅ Submit Assessment
        </button>
      </form>

      <div style={styles.list}>
        <h2 style={styles.subHeader}>📄 Performance Reports</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {performanceData.map((assessment) => (
            <li key={assessment.id} style={styles.listItem}>
              <strong style={{ color: '#0b5394' }}>Employee ID:</strong>{' '}
              {assessment.employeeId} |{' '}
              <strong style={{ color: '#0b5394' }}>Rating:</strong>{' '}
              {assessment.rating} |{' '}
              <strong style={{ color: '#0b5394' }}>Feedback:</strong>{' '}
              {assessment.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerformanceController;
