import React from 'react';

const NavItem = ({ icon, text, showText }) => {
  return (
    <div className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded-md">
      {icon}
      {showText && <span className="text-white">{text}</span>}
    </div>
  );
};

export default NavItem;
