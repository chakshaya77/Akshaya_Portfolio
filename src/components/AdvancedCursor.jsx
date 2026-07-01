import React, { useEffect, useRef } from 'react';

export default function AdvancedCursor() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const glowRef = useRef(null);
  const canvasRef = useRef(null);
  const rippleContainerRef = useRef(null);

  // Physics state
  const mouse = useRef({ x: -100, y: -100 });
  const halo = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  // Particle system state
  const particles = useRef([]);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    // 1. Setup Event Listeners
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Spawn particles on movement
      const now = Date.now();
      if (now - lastSpawnTime.current > 16) { // limit spawn rate
        const dx = e.movementX;
        const dy = e.movementY;
        const velocity = Math.sqrt(dx * dx + dy * dy);
        
        if (velocity > 2) { // only spawn if moving fast enough
          spawnParticle(e.clientX, e.clientY, dx, dy);
          lastSpawnTime.current = now;
        }
      }
    };

    const onMouseDown = (e) => {
      isClicking.current = true;
      spawnRipple(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      isClicking.current = false;
    };

    // Detect interactive elements
    const updateHoverState = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive') ||
        target.classList.contains('interactive');
      
      isHovering.current = !!isInteractive;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', updateHoverState);

    // 2. Main Physics Loop
    let animationFrameId;
    let canvasCtx = null;
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      canvasCtx = canvasRef.current.getContext('2d');
    }

    const render = () => {
      // Lerp logic for smooth lagging follow
      halo.current.x += (mouse.current.x - halo.current.x) * 0.15;
      halo.current.y += (mouse.current.y - halo.current.y) * 0.15;

      glow.current.x += (mouse.current.x - glow.current.x) * 0.08;
      glow.current.y += (mouse.current.y - glow.current.y) * 0.08;

      // Update DOM directly via refs (bypassing React state for 0 lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) scale(${isHovering.current ? 0.5 : (isClicking.current ? 0.8 : 1)})`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${halo.current.x}px, ${halo.current.y}px, 0) scale(${isHovering.current ? 1.5 : (isClicking.current ? 0.9 : 1)})`;
        haloRef.current.style.borderColor = isHovering.current ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)';
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0)`;
      }

      // Render Canvas Particles
      if (canvasCtx && canvasRef.current) {
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          
          // Physics
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          
          if (p.life <= 0) {
            particles.current.splice(i, 1);
            continue;
          }
          
          // Draw Diamond shape
          canvasCtx.save();
          canvasCtx.translate(p.x, p.y);
          canvasCtx.rotate(p.life * Math.PI); // spin as it dies
          canvasCtx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.5})`;
          
          canvasCtx.beginPath();
          canvasCtx.moveTo(0, -p.size);
          canvasCtx.lineTo(p.size, 0);
          canvasCtx.lineTo(0, p.size);
          canvasCtx.lineTo(-p.size, 0);
          canvasCtx.closePath();
          canvasCtx.fill();
          
          canvasCtx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize handler for canvas
    const onResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', updateHoverState);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const spawnParticle = (x, y, dx, dy) => {
    particles.current.push({
      x,
      y,
      vx: -dx * 0.05 + (Math.random() - 0.5) * 1, // trail opposite to movement
      vy: -dy * 0.05 + (Math.random() - 0.5) * 1,
      life: 1.0,
      size: Math.random() * 3 + 1
    });
  };

  const spawnRipple = (x, y) => {
    if (!rippleContainerRef.current) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'absolute border border-white/40 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.transition = 'all 0.6s cubic-bezier(0.1, 0.9, 0.2, 1)';
    
    rippleContainerRef.current.appendChild(ripple);
    
    // Trigger animation next frame
    requestAnimationFrame(() => {
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.opacity = '0';
    });
    
    // Cleanup
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  };

  return (
    <>
      {/* Canvas for star-dust trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />

      {/* Ripple Container */}
      <div ref={rippleContainerRef} className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden" />

      {/* Ambient Nebula Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)',
          marginLeft: '-200px',
          marginTop: '-200px',
        }}
      />

      {/* Halo */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9999] transition-colors transition-transform duration-200"
        style={{
          marginLeft: '-16px',
          marginTop: '-16px',
          willChange: 'transform'
        }}
      />

      {/* Central Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] transition-transform duration-100"
        style={{
          marginLeft: '-3px',
          marginTop: '-3px',
          willChange: 'transform'
        }}
      />
    </>
  );
}
