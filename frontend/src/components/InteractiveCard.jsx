import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InteractiveCard = ({ children, className = '', style = {} }) => {
  const cardRef = useRef(null);
  
  // Motion values for tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Springs for smooth physics-based return and movement
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Transforms: 0 to 1 mapped to -4 to 4 degrees for tilt
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);
  
  // Transform for inner light position
  const lightX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const lightY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize coordinates to 0-1
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'var(--border-color)',
        backdropFilter: isHovered ? 'blur(16px)' : 'blur(12px)',
        WebkitBackdropFilter: isHovered ? 'blur(16px)' : 'blur(12px)',
      }}
      animate={{
        y: isHovered ? -8 : 0,
        boxShadow: isHovered 
          ? '0 12px 40px rgba(255, 255, 255, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.05)' 
          : '0 4px 30px rgba(255, 255, 255, 0.03)',
        background: isHovered 
          ? 'var(--glass-hover)' 
          : 'var(--glass-bg)',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className={`glass-card ${className}`}
    >
      {/* Inner radial light tracking cursor */}
      <motion.div
        style={{
          position: 'absolute',
          left: lightX,
          top: lightY,
          width: '300px',
          height: '300px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default InteractiveCard;
