import React from 'react';
import './button.css';

const Button = ({ type, onClick, children, className }) => {
  return (
    <button
      className={`button ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
