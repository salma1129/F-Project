import React, { useState } from 'react';

const TaskController = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskItem = {
      ...newTask,
      id: tasks.length + 1,
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask({ title: '', description: '' });
  };

  const styles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
      background: '#f0f8ff',
      minHeight: '100vh',
      padding: '2rem',
      color: '#333',
    },
    header: {
      textAlign: 'center',
      color: '#0b5394',
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    form: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      margin: '0 auto 2rem auto',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #cce0ff',
      borderRadius: '8px',
      fontSize: '1rem',
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
      maxWidth: '600px',
      margin: '0 auto',
    },
    taskItem: {
      background: '#ffffff',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📝 Task Manager</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseOut={(e) => (e.target.style.background = styles.button.background)}
          type="submit"
        >
          ➕ Add Task
        </button>
      </form>

      <div style={styles.list}>
        <h3 style={{ textAlign: 'center', color: '#0b5394' }}>📋 Tasks List</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.taskItem}>
              <strong style={{ color: '#0b5394' }}>{task.title}</strong>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskController;
