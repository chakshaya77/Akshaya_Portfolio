import React from 'react';

export default function EmblemLogo({ className, onClick, style }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className} 
      onClick={onClick}
      aria-label="Akshaya Emblem"
      style={{ 
        background: '#000', 
        color: '#fff', 
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.05)',
        ...style
      }}
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeWidth="1.5" />
      {/* Inner Ring */}
      <circle cx="50" cy="50" r="39" fill="none" stroke="#fff" strokeWidth="1" />
      
      {/* Left Star */}
      <path d="M 23 40 L 24 43 L 27 44 L 24 45 L 23 48 L 22 45 L 19 44 L 22 43 Z" fill="#fff" />
      {/* Right Star */}
      <path d="M 77 40 L 78 43 L 81 44 L 78 45 L 77 48 L 76 45 L 73 44 L 76 43 Z" fill="#fff" />

      {/* Face outline / Neck */}
      <path d="M 40 70 C 40 55, 43 50, 43 45 C 43 35, 38 28, 45 22 C 55 12, 60 25, 58 35 C 56 45, 57 55, 57 70" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 43 50 C 48 55, 53 55, 57 50" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Left Hair */}
      <path d="M 45 22 C 30 25, 25 40, 32 55 C 35 60, 30 65, 32 72 C 35 77, 40 72, 40 70" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Right Hair */}
      <path d="M 55 20 C 65 25, 70 35, 65 48 C 62 55, 68 60, 65 68 C 62 75, 57 72, 57 70" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Shoulders */}
      <path d="M 37 71 C 25 75, 20 82, 18 90" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 71 C 72 75, 77 82, 79 90" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 37 71 Q 48.5 78 60 71" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 18 90 Q 48.5 105 79 90" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
