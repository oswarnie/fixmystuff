
import React from 'react';

const Screwdriver = ({ className = "", size = 24, color = "currentColor" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 22 9.3-9.3" />
      <path d="M10.5 13.5 12 15" />
      <path d="M15.7 10.8 18 13.1" />
      <path d="m10 5.3 8.8 8.8" />
      <path d="M13.8 2c-.2.1-.3.2-.3.4 0 .2.1.3.3.4l.2.1c.2.1.3.2.3.4 0 .2-.1.3-.3.4l-.2.1c-.2.1-.3.2-.3.4 0 .2.1.3.3.4l2.2 1.3c.2.1.3.2.3.4 0 .2-.1.3-.3.4l-1.2.7c-.2.1-.3.2-.3.4s.1.3.3.4l1.2.7c.2.1.3.2.3.4 0 .2-.1.3-.3.4l-1.2.7c-.2.1-.3.2-.3.4s.1.3.3.4l.5.3" />
    </svg>
  );
};

export default Screwdriver;
