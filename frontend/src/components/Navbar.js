import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigate('/login');
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1f1f1f',
      color: 'white',
      padding: '1rem 2rem',
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '60px',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
    },
    navbarLeft: {
      display: 'flex',
      gap: '1.5rem',
    },
    navbarRight: {
      display: 'flex',
      gap: '1rem',
    },
    navItem: {
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'color 0.2s ease-in-out',
    },
    navItemHover: {
      color: '#aaa',
    },
    navBtn: {
      backgroundColor: '#333',
      border: 'none',
      color: 'white',
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
    },
    logoutBtn: {
      backgroundColor: '#e63946',
    },
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <div
          style={styles.navItem}
          onClick={() => navigate('/')}
          onMouseOver={e => (e.target.style.color = '#aaa')}
          onMouseOut={e => (e.target.style.color = 'white')}
        >
          Home
        </div>
        <div
          style={styles.navItem}
          onClick={() => navigate('/job-opportunities')}
          onMouseOver={e => (e.target.style.color = '#aaa')}
          onMouseOut={e => (e.target.style.color = 'white')}
        >
          Jobs
        </div>
        <div
          style={styles.navItem}
          onClick={() => navigate('/chat')}
          onMouseOver={e => (e.target.style.color = '#aaa')}
          onMouseOut={e => (e.target.style.color = 'white')}
        >
          Chat
        </div>
        <div
          style={styles.navItem}
          onClick={() => navigate('/search')}
          onMouseOver={e => (e.target.style.color = '#aaa')}
          onMouseOut={e => (e.target.style.color = 'white')}
        >
          Search
        </div>
      </div>
      <div style={styles.navbarRight}>
        <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
        <button
          style={{ ...styles.navBtn, ...styles.logoutBtn }}
          onClick={handleLogout}
          onMouseOver={e => (e.target.style.backgroundColor = '#c92a34')}
          onMouseOut={e => (e.target.style.backgroundColor = '#e63946')}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
