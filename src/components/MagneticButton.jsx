import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, className = '', style = {}, onClick, isNav = false }) => {
  const buttonRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    // Calculate distance from center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Translate a max of 10px based on distance (magnetic pull)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Attenuate the pull slightly
    mouseX.set(distanceX * 0.2);
    mouseY.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    
    // Add ripple
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        x: smoothX,
        y: smoothY,
        cursor: 'none',
        background: 'transparent',
        border: 'none',
        padding: 0,
        color: 'inherit',
        fontFamily: 'inherit',
      }}
      animate={{
        filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
        boxShadow: isHovered && !isNav ? '0 0 15px rgba(255,255,255,0.1)' : 'none',
        opacity: isHovered && isNav ? 1 : (isNav ? 0.7 : 1),
      }}
      className={className}
    >
      {/* Ripple effect layer */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: '50px',
            height: '50px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.button>
  );
};

export default MagneticButton;
