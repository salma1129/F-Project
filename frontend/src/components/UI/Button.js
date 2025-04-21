import React from "react";
export function Button({ children, onClick, variant = "default", className = "" }) {
    const baseStyles = "px-4 py-2 rounded text-white focus:outline-none";
    const variants = {
      default: "bg-blue-500 hover:bg-blue-600",
      ghost: "bg-transparent text-gray-300 hover:text-white",
    };
  
    return (
      <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  }
  