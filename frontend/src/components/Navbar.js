import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login');
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(4, 4, 4, 0.95)',
      backdropFilter: 'blur(30px)',
      color: 'white',
      padding: '1rem 2rem',
      position: 'fixed',
      top: 0,
      width: '99.5%',
      height: '70px',
      zIndex: 1000,
      borderBottom: '2px solid #3498db',
      boxShadow: '0 0 20px #3498db, 0 0 40px #3498db',
    },
    navbarLeft: {
      display: 'flex',
      gap: '2.5rem',
      alignItems: 'center',
    },
    navbarRight: {
      display: 'flex',
      gap: '1.5rem',
    },
    navItem: {
      cursor: 'pointer',
      fontSize: '0.95rem',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      position: 'relative',
      padding: '0.5rem 0',
    },
    navItemHover: {
      color: '#3498db',
      textShadow: '0 0 10px rgba(52, 152, 219, 0.4)',
    },
    navBtn: {
      backgroundColor: 'rgba(4, 4, 4, 0.15)',
      border: '2px solid #3498db',
      color: 'white',
      padding: '0.8rem 1.5rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 0 10px rgba(52, 152, 219, 0.3)',
    },
    navBtnHover: {
      backgroundColor: 'rgba(52, 152, 219, 0.25)',
      transform: 'translateY(-2px)',
      boxShadow: '0 0 20px rgba(52, 152, 219, 0.4)',
    },
    logoutBtn: {
      border: '2px solid #e74c3c',
      backgroundColor: 'rgba(4, 4, 4, 0.15)',
    },
    logoutBtnHover: {
      backgroundColor: 'rgba(231, 76, 60, 0.25)',
      boxShadow: '0 0 20px rgba(231, 76, 60, 0.4)',
    },
    brand: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textShadow: '0 0 15px rgba(52, 152, 219, 0.6)',
      paddingRight: '2rem',
      borderRight: '2px solid rgba(52, 152, 219, 0.3)',
      transition: 'all 0.3s ease',
    },
    brandHover: {
      color: '#3498db',
      textShadow: '0 0 20px rgba(52, 152, 219, 0.8)',
    }
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <div
          style={styles.brand}
          onClick={() => navigate('/')}
          onMouseOver={e => {
            e.target.style.color = '#3498db';
            e.target.style.textShadow = '0 0 20px rgba(52, 152, 219, 0.8)';
          }}
          onMouseOut={e => {
            e.target.style.color = 'white';
            e.target.style.textShadow = '0 0 15px rgba(52, 152, 219, 0.6)';
          }}
        >
          HR System
        </div>
        <div style={styles.navbarLeft}>
          <div
            style={styles.navItem}
            onClick={() => navigate('/')}
            onMouseOver={e => Object.assign(e.target.style, styles.navItemHover)}
            onMouseOut={e => Object.assign(e.target.style, { color: 'white', textShadow: 'none' })}
          >
            Home
          </div>
          <div
            style={styles.navItem}
            onClick={() => navigate('/about')}
            onMouseOver={e => Object.assign(e.target.style, styles.navItemHover)}
            onMouseOut={e => Object.assign(e.target.style, { color: 'white', textShadow: 'none' })}
          >
            About
          </div>
          <div
            style={styles.navItem}
            onClick={() => navigate('/contact')}
            onMouseOver={e => Object.assign(e.target.style, styles.navItemHover)}
            onMouseOut={e => Object.assign(e.target.style, { color: 'white', textShadow: 'none' })}
          >
            Contact
          </div>
          
        </div>
      </div>
      <div style={styles.navbarRight}>
        
        <button
          style={{...styles.navBtn, ...styles.logoutBtn}}
          onClick={handleLogout}
          onMouseOver={e => Object.assign(e.target.style, {...styles.navBtnHover, ...styles.logoutBtnHover})}
          onMouseOut={e => Object.assign(e.target.style, {...styles.navBtn, ...styles.logoutBtn})}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

