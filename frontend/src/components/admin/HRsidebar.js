import React from 'react';
import './DashboardHR.css'; 

function HRSidebar({ pages, handleNavigation }) {
  return (
    <div className="sidebar">
      <div>
        <h2>HR Manager</h2>
        <ul>
          {pages.map((page) => (
            <li key={page.path}>
              <button
                className="nav-button"
                onClick={() => handleNavigation(page.path)}
              >
                {page.icon} {page.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">© 2025 HR Portal</div>
    </div>
  );
}

export default HRSidebar;
